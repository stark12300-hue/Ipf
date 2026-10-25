import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { dataStore } from './src/server/dataStore.ts';
import { validateInquirySubmission, InquiryFormData, extractUTMParameters } from './src/utils/validation.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT || 3000);
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Refresh durable CRM state from GitHub before each API request.
app.use('/api', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    await dataStore.syncFromGitHub();
    next();
  } catch (error) {
    console.error('[CRM] GitHub sync failed:', error);
    res.status(503).json({ success: false, error: 'CRM data store is unavailable. Check the GitHub token and repository permissions.' });
  }
});

// Simple in-memory rate limiting map
const ipRateLimitMap = new Map<string, { count: number; resetTime: number }>();
const loginFailedAttempts = new Map<string, { count: number; lockUntil: number }>();

function rateLimit(limit: number, windowMs: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const now = Date.now();
    const record = ipRateLimitMap.get(ip);

    if (!record || now > record.resetTime) {
      ipRateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
      return next();
    }

    if (record.count >= limit) {
      return res.status(429).json({
        success: false,
        error: 'Too many requests. Please wait a few moments before trying again.',
      });
    }

    record.count++;
    next();
  };
}

// Authentication middleware
function requireAdminAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, error: 'Authorization token required' });
  }

  const token = authHeader.split(' ')[1];
  const isValid = dataStore.validateSessionToken(token);
  if (!isValid) {
    return res.status(401).json({ success: false, error: 'Invalid or expired session. Please log in again.' });
  }

  next();
}

// --- PUBLIC API ROUTES ---

// 1. Company Configuration
app.get('/api/config', (_req: Request, res: Response) => {
  const config = dataStore.getConfig();
  res.json({ success: true, config });
});

// 2. Submit Inquiry
app.post('/api/inquiries', rateLimit(15, 10 * 60 * 1000), async (req: Request, res: Response) => {
  try {
    const body: InquiryFormData = req.body;
    const validation = validateInquirySubmission(body);

    if (!validation.valid) {
      return res.status(400).json({
        success: false,
        errors: validation.errors,
        error: Object.values(validation.errors)[0] || 'Invalid submission details',
      });
    }

    // Capture referrer and UTM tags
    const referrer = req.headers.referer || req.headers.referrer;
    const rawUtm = body.utm || {};
    if (referrer && !rawUtm.referrer) {
      rawUtm.referrer = typeof referrer === 'string' ? referrer : undefined;
    }

    const inquiry = dataStore.addInquiry({
      fullName: body.fullName,
      contactNumber: body.contactNumber,
      email: body.email,
      companyStockName: body.companyStockName,
      approxSharesCount: body.approxSharesCount,
      issueType: body.issueType,
      message: body.message,
      source: body.source,
      utm: rawUtm,
    });

    await dataStore.persistToGitHub();
    res.status(201).json({
      success: true,
      inquiryId: inquiry.id,
      inquiry,
      message: 'Inquiry registered successfully. An advisory coordinator will review your folio details.',
    });
  } catch (err: any) {
    console.error('Error in /api/inquiries:', err);
    res.status(500).json({ success: false, error: 'Internal server error while recording inquiry' });
  }
});

// 3. Track Conversion Event (WhatsApp click, Call click, etc.)
app.post('/api/track-conversion', rateLimit(60, 60 * 1000), async (req: Request, res: Response) => {
  try {
    const { eventType, channel, path: reqPath, utm } = req.body;
    if (!eventType) {
      return res.status(400).json({ success: false, error: 'Event type required' });
    }

    const event = dataStore.recordConversion({
      eventType,
      channel: channel || 'Unknown',
      path: reqPath || '/',
      utm,
    });

    await dataStore.persistToGitHub();
    res.json({ success: true, eventId: event.id });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Failed to log conversion' });
  }
});

// --- ADMIN API ROUTES ---

// 4. Admin Login
app.post('/api/admin/login', async (req: Request, res: Response) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const attempt = loginFailedAttempts.get(ip);

  if (attempt && now < attempt.lockUntil) {
    const waitSec = Math.ceil((attempt.lockUntil - now) / 1000);
    return res.status(429).json({
      success: false,
      error: `Too many failed attempts. Account locked for ${waitSec} seconds.`,
    });
  }

  const { password } = req.body;
  if (!password || typeof password !== 'string') {
    return res.status(400).json({ success: false, error: 'Password required' });
  }

  if (password === ADMIN_PASSWORD) {
    loginFailedAttempts.delete(ip);
    const token = dataStore.createSessionToken();
    await dataStore.persistToGitHub();
    return res.json({
      success: true,
      token,
      admin: {
        role: 'Administrator',
        email: dataStore.getConfig().businessEmail,
      },
    });
  } else {
    const current = loginFailedAttempts.get(ip) || { count: 0, lockUntil: 0 };
    current.count++;
    if (current.count >= 5) {
      current.lockUntil = now + 5 * 60 * 1000; // 5 min lockout
    }
    loginFailedAttempts.set(ip, current);

    return res.status(401).json({
      success: false,
      error: 'Invalid administrator password',
      remainingAttempts: Math.max(0, 5 - current.count),
    });
  }
});

// 5. Admin Logout
app.post('/api/admin/logout', requireAdminAuth, async (req: Request, res: Response) => {
  const token = req.headers.authorization!.split(' ')[1];
  dataStore.revokeSessionToken(token);
  await dataStore.persistToGitHub();
  res.json({ success: true, message: 'Logged out successfully' });
});

// 6. Get Inquiries (with Search, Status, Source filters)
app.get('/api/admin/inquiries', requireAdminAuth, (req: Request, res: Response) => {
  const { search, status, source } = req.query;
  const inquiries = dataStore.getInquiries({
    search: typeof search === 'string' ? search : undefined,
    status: typeof status === 'string' ? status : undefined,
    source: typeof source === 'string' ? source : undefined,
  });
  res.json({ success: true, inquiries });
});

// 7. Update Inquiry Status & Internal Notes
app.patch('/api/admin/inquiries/:id', requireAdminAuth, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, internalNotes } = req.body;

  const updated = dataStore.updateInquiryStatus(id, status, internalNotes);
  if (!updated) {
    return res.status(404).json({ success: false, error: 'Inquiry record not found' });
  }

  await dataStore.persistToGitHub();
  res.json({ success: true, inquiry: updated });
});

// 8. Admin Analytics
app.get('/api/admin/analytics', requireAdminAuth, (_req: Request, res: Response) => {
  const analytics = dataStore.getAnalytics();
  res.json({ success: true, analytics });
});

// 9. Export Inquiries as CSV
app.get('/api/admin/export', requireAdminAuth, (_req: Request, res: Response) => {
  const csv = dataStore.exportCSV();
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename="veritas_ipf_inquiries_${Date.now()}.csv"`);
  res.send(csv);
});

// 10. Update Company Config
app.post('/api/admin/config', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const updated = dataStore.updateConfig(req.body);
    await dataStore.persistToGitHub();
    res.json({ success: true, config: updated });
  } catch (err: any) {
    res.status(500).json({ success: false, error: 'Failed to update company configuration' });
  }
});


// 11. Delete a lead permanently from the CRM dataset
app.delete('/api/admin/inquiries/:id', requireAdminAuth, async (req: Request, res: Response) => {
  try {
    const deleted = dataStore.deleteInquiry(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Inquiry record not found' });
    }
    await dataStore.persistToGitHub();
    return res.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (error) {
    console.error('[CRM] Failed to delete inquiry:', error);
    return res.status(500).json({ success: false, error: 'Could not save the deletion to GitHub. The lead was removed from the current instance; refresh and retry after fixing GitHub storage.' });
  }
});

// --- SEO & SEARCH ENGINE FILES ---

// Dynamic XML Sitemap
app.get('/sitemap.xml', (_req: Request, res: Response) => {
  const baseUrl = process.env.APP_URL || 'https://veritas-ipf-recovery.com';
  const currentDate = new Date().toISOString().split('T')[0];

  const routes = [
    { path: '/', priority: '1.0', changefreq: 'daily' },
    { path: '/services', priority: '0.9', changefreq: 'weekly' },
    { path: '/assessment', priority: '0.9', changefreq: 'weekly' },
    { path: '/how-it-works', priority: '0.8', changefreq: 'monthly' },
    { path: '/faqs', priority: '0.8', changefreq: 'weekly' },
    { path: '/contact', priority: '0.9', changefreq: 'monthly' },
    { path: '/landing/ipf-assistance', priority: '0.9', changefreq: 'weekly' },
    { path: '/checklist', priority: '0.6', changefreq: 'monthly' },
    { path: '/privacy', priority: '0.5', changefreq: 'monthly' },
    { path: '/terms', priority: '0.5', changefreq: 'monthly' },
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${baseUrl}${r.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  res.header('Content-Type', 'application/xml');
  res.send(sitemapXml);
});

// Robots.txt
app.get('/robots.txt', (_req: Request, res: Response) => {
  const baseUrl = process.env.APP_URL || 'https://veritas-ipf-recovery.com';
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/admin/
Disallow: /admin

Sitemap: ${baseUrl}/sitemap.xml
`;
  res.header('Content-Type', 'text/plain');
  res.send(robotsTxt);
});

// --- VITE MIDDLEWARE & STATIC SERVING ---
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        port: PORT,
        host: '0.0.0.0',
        hmr: process.env.DISABLE_HMR !== 'true',
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Veritas IPF Advisory] Server running on http://0.0.0.0:${PORT}`);
  });
}

export { app };
export default app;

if (!process.env.VERCEL) {
  startServer().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
}
