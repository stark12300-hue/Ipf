import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import type {
  Inquiry,
  CompanyConfig,
  ConversionEvent,
  AnalyticsSummary,
  InquiryStatus,
  LeadSource,
} from '../types/index.ts';
import {
  generateInquiryId,
  determineLeadSource,
  exportInquiriesToCSV,
  type LeadUTM,
} from '../utils/validation.ts';

const isVercel = Boolean(process.env.VERCEL);
const DATA_DIR = isVercel ? path.join('/tmp', 'ipf_data') : path.resolve(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'database.json');

const INITIAL_CONFIG: CompanyConfig = {
  companyName: 'Gopal Singh Parihar',
  tagLine: 'IEPF Recovery Expert & Business Associate of Stockholding (A Central Government Company)',
  contactNumber: '+91 94509 08004',
  whatsappNumber: '+91 94509 08004',
  businessEmail: 'gopaliepf@gmail.com',
  officeAddress: 'Arail-82 New Nankari, IIT Kalyanpur, Kanpur, Uttar Pradesh - 208016',
  businessHours: 'Mon - Sat: 9:00 AM - 7:00 PM IST',
  instagramHandle: '@gopal_iepf_recovery',
  instagramUrl: 'https://www.instagram.com',
  googleAdsId: 'AW-1122334455',
  metaPixelId: '998877665544332',
  seoTitle: 'Gopal Singh Parihar | IEPF Recovery Expert & Stockholding Associate',
  seoDescription: 'IEPF Recovery Expert & Business Associate of Stockholding (A Central Government Company). Unclaimed share retrieval, IEPF-5 claim assistance, physical share demat, duplicate certificates in Kanpur & across India.',
  disclaimerNotice: 'Gopal Singh Parihar is an authorized Business Associate of Stockholding (A Central Government Company) providing procedural guidance and documentation assistance for IEPF share claims under MCA regulations.',
  services: [
    {
      id: 'srv-1',
      title: 'IPF Stock Recovery Assistance',
      slug: 'ipf-stock-recovery-assistance',
      badge: 'Core Service',
      summary: 'End-to-end procedural guidance for reclaiming equity shares and accrued dividends transferred to the IEPF Authority.',
      description: 'Under Section 124(6) of the Companies Act, shares where dividends remain unclaimed for 7 consecutive years are transferred to the IEPF Authority. We assist clients in navigating the statutory verification protocol, e-Form IEPF-5 submission, and RTA verification reports.',
      iconName: 'ShieldCheck',
      whoIsItFor: [
        'Shareholders who missed dividend warrants for 7+ years',
        'Holders whose shares no longer appear in their Demat holding statement',
        'Senior citizens with legacy physical share certificates',
      ],
      steps: [
        'Folio and unclaimed dividend verification against company registers',
        'Preparation of statutory e-Form IEPF-5 on MCA V3 Portal',
        'Compilation of indemnity bond, affidavit, and advance receipt',
        'Submission of physical docket to company Nodal Officer and RTA',
      ],
      keyDocuments: [
        'Copy of Client Master List (CML) of active Demat account',
        'Original/Duplicate share certificate or counterfoil',
        'Self-attested PAN card & Aadhaar card',
        'Original cancelled cheque leaf with printed name',
      ],
    },
    {
      id: 'srv-2',
      title: 'Recovery Process Guidance',
      slug: 'recovery-process-guidance',
      badge: 'Consultation',
      summary: 'Structured advisory on corporate restructuring, stock splits, demergers, and bonus share reconciliation.',
      description: 'Over decades, companies undergo demergers, splits, and amalgamations (e.g. Reliance, L&T, HDFC). We clarify your accrued entitlement so you understand the exact number of shares and cumulative dividends eligible for claim.',
      iconName: 'Compass',
      whoIsItFor: [
        'Investors unaware of multiple corporate restructurings over decades',
        'Holders of historical share certificates with altered ISINs',
      ],
      steps: [
        'Historical corporate action mapping (bonus, split, demerger ratios)',
        'Dividend register audit spanning past 7 to 15 financial years',
        'Reconciliation with Registrar and Transfer Agent (RTA) records',
      ],
      keyDocuments: ['Historical share certificates', 'Old dividend warrant counterfoils', 'Proof of registered address'],
    },
    {
      id: 'srv-3',
      title: 'Case Assessment & Folio Audit',
      slug: 'case-assessment',
      badge: 'Initial Step',
      summary: 'Independent audit of documentation completeness, name discrepancies, and statutory eligibility.',
      description: 'Before lodging any statutory claim, our case specialists review folio details, signature variations, and KYC records to identify bottlenecks that typically lead to government rejection.',
      iconName: 'FileSearch',
      whoIsItFor: [
        'Anyone holding old certificates with unclear legal status',
        'Cases with minor spelling variations between PAN, Aadhaar, and share certificates',
      ],
      steps: [
        'Preliminary folio status check with RTAs (Link Intime, KFintech, etc.)',
        'Identification of signature mismatch or outdated address records',
        'Formulation of rectification roadmap',
      ],
      keyDocuments: ['Copy of certificates/folio numbers', 'Current government ID proof'],
    },
    {
      id: 'srv-4',
      title: 'Documentation Assistance',
      slug: 'documentation-assistance',
      badge: 'Compliance',
      summary: 'Professional drafting of affidavits, indemnity bonds, surety documents, and Form ISR-1/2/4.',
      description: 'SEBI and IEPF authorities enforce rigid formatting. We prepare legal drafts in accordance with current statutory circulars, eliminating rejection due to technical document defects.',
      iconName: 'FileText',
      whoIsItFor: [
        'Investors needing duplicate share certificate issuance',
        'Cases requiring signature attestation by bank managers (Form ISR-2)',
        'Legal heirs requiring Form ISR-4 transmission requests',
      ],
      steps: [
        'Drafting of non-judicial stamp paper indemnities & affidavits',
        'Banker KYC verification coordination (Form ISR-2)',
        'Public notice and police FIR guidance for lost original certificates',
      ],
      keyDocuments: ['Standard KYC documents', 'Form ISR-1, ISR-2, ISR-4', 'Bank verification letter'],
    },
    {
      id: 'srv-5',
      title: 'Customer Consultation & Legal Heir Advisory',
      slug: 'customer-consultation',
      badge: 'Advisory',
      summary: 'Guidance for deceased shareholder transmission, succession certificates, and joint-holder claims.',
      description: 'Navigating inheritance of shares without nomination requires careful adherence to SEBI transmission guidelines, legal heir declarations, or succession certificates. We clarify your statutory rights and procedural routes.',
      iconName: 'Users',
      whoIsItFor: [
        'Surviving spouses or children claiming deceased parents’ shares',
        'Holders where joint holders have passed away',
      ],
      steps: [
        'Assessment of existing wills, family settlement deeds, or intestate status',
        'Application of SEBI simplified transmission limits threshold',
        'Preparation of no-objection certificates (NOC) from legal co-heirs',
      ],
      keyDocuments: ['Notarized Death Certificate', 'Legal Heir Certificate / Succession Certificate / Will', 'NOC affidavits from co-heirs'],
    },
    {
      id: 'srv-6',
      title: 'Recovery Case Follow-up',
      slug: 'recovery-case-follow-up',
      badge: 'Tracking',
      summary: 'Systematic tracking of RTA verification reports and IEPF Authority approval workflows.',
      description: 'Submitting IEPF-5 is only the initial milestone. We monitor RTA verification turnaround times, assist in responding to resubmission queries, and help ensure smooth credit to your Demat account.',
      iconName: 'TrendingUp',
      whoIsItFor: [
        'Applicants who have lodged claims and are awaiting RTA verification',
        'Claimants facing MCA/IEPF resubmission queries',
      ],
      steps: [
        'Tracking SRN (Service Request Number) on MCA Portal',
        'Follow-up with company Nodal Officer for Verification Report dispatch',
        'Drafting response clarification letters for document queries',
      ],
      keyDocuments: ['MCA SRN acknowledgement receipt', 'RTA dispatch reference number'],
    },
  ],
  faqs: [
    {
      id: 'faq-1',
      category: 'General',
      question: 'What is IPF stock recovery?',
      answer: 'IPF (commonly referred to in Indian corporate law as IEPF – Investor Education and Protection Fund) stock recovery refers to the legal, procedural process of reclaiming shares and unpaid dividends transferred by publicly listed companies to the government under Section 124(6) of the Companies Act, 2013 after remaining unclaimed for 7 consecutive years. Recovery involves filing statutory forms, verifying KYC with the company RTA, and securing approval from the IEPF Authority.',
    },
    {
      id: 'faq-2',
      category: 'Process',
      question: 'How can I enquire about a recovery case with your team?',
      answer: 'You can submit an inquiry through our verified online form, message our advisory desk on WhatsApp at +91 98200 11223, or call during business hours. Please mention the name of the company/shares, approximate quantity, and whether you possess physical certificates or folio numbers.',
    },
    {
      id: 'faq-3',
      category: 'Documents',
      question: 'What documents may be required for the claim process?',
      answer: 'Standard documentation includes: (1) Client Master List (CML) of your active Demat account, (2) Original physical share certificates or indemnity for duplicate issuance, (3) Self-attested PAN and Aadhaar, (4) Cancelled cheque leaf matching bank details, (5) Form ISR-1 and ISR-2 (bank signature attestation), and (6) for deceased shareholders, notarized death certificate and legal heir documentation.',
    },
    {
      id: 'faq-4',
      category: 'General',
      question: 'How can I contact the company directly?',
      answer: 'You can contact Veritas Advisory via official WhatsApp (+91 98200 11223), phone call (+91 98200 11223), email (advisory@veritasrecovery.in), or visit our corporate office at Level 7, Fortune Towers, BKC, Mumbai during business hours.',
    },
    {
      id: 'faq-5',
      category: 'Status & Security',
      question: 'How can I check the status of my inquiry?',
      answer: 'Upon submitting your inquiry, you receive a unique Inquiry Tracking ID (e.g. IPF-2026-0001-XXXX). You can quote this ID anytime to our coordinators via WhatsApp or phone for immediate status updates.',
    },
    {
      id: 'faq-6',
      category: 'Status & Security',
      question: 'Do you ask for my trading passwords, OTPs, or bank credentials?',
      answer: 'NEVER. Veritas Advisory will NEVER ask for your Demat account passwords, trading login credentials, OTPs, or net banking passwords. We only assist with legitimate paper filings, MCA portal documentation, and RTA submissions.',
    },
    {
      id: 'faq-7',
      category: 'Process',
      question: 'Do you guarantee 100% recovery or fixed completion timelines?',
      answer: 'No. As a transparent and ethical corporate consultancy, we strictly adhere to legal guidelines. Statutory approvals rest entirely with company Nodal Officers, RTAs, and the Ministry of Corporate Affairs (IEPF Authority). We ensure flawless documentation, procedural compliance, and persistent follow-up, but no legitimate entity can guarantee government approval times or outcomes.',
    },
  ],
};

const SEED_INQUIRIES: Inquiry[] = [
  {
    id: 'IPF-2026-0001-K9X2',
    fullName: 'Harishchandra Deshmukh',
    contactNumber: '+91 98201 44556',
    email: 'h.deshmukh@yahoo.com',
    companyStockName: 'Reliance Industries Ltd.',
    approxSharesCount: '250 shares',
    issueType: 'Shares transferred to IEPF under 7-year rule',
    message: 'Father held 250 shares in physical form. Received notice that dividends were unclaimed for 8 years and transferred to IEPF. Need assistance in filing claim.',
    source: 'Google',
    utm: { utm_source: 'google', utm_medium: 'cpc', utm_campaign: 'ipf_reliance_recovery' },
    status: 'In Progress',
    internalNotes: 'Client Master List received. Form ISR-1 & ISR-2 shared. Waiting for banker attestation on signature.',
    createdAt: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
  },
  {
    id: 'IPF-2026-0002-M4V8',
    fullName: 'Pooja Venkatesh',
    contactNumber: '+91 97412 88990',
    email: 'pooja.v@gmail.com',
    companyStockName: 'Tata Consultancy Services',
    approxSharesCount: '100 shares',
    issueType: 'Deceased shareholder legal heir claim',
    message: 'Inherited physical certificates of TCS from late grandfather. Need advice regarding transmission and duplicate certificate process as one counterfoil is missing.',
    source: 'Instagram',
    utm: { utm_source: 'instagram', utm_medium: 'story_ad', utm_campaign: 'legal_heir_advisory' },
    status: 'Contacted',
    internalNotes: 'Called customer on Oct 23. Explained SEBI simplified transmission process without succession certificate under threshold.',
    createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
  },
  {
    id: 'IPF-2026-0003-R7P1',
    fullName: 'Kiran Patel',
    contactNumber: '+91 98980 12345',
    email: 'kiranpatel@outlook.com',
    companyStockName: 'Larsen & Toubro Ltd.',
    approxSharesCount: '300 shares',
    issueType: 'Physical shares lost or damaged',
    message: 'Original share certificates misplaced during house relocation. Need guidance on obtaining duplicate certificates and subsequent dematerialization.',
    source: 'WhatsApp',
    utm: { utm_source: 'whatsapp', utm_medium: 'direct_chat' },
    status: 'New',
    internalNotes: 'Fresh lead from WhatsApp. Need to request folio number and RTA contact record.',
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
  },
  {
    id: 'IPF-2026-0004-T2W5',
    fullName: 'Ananya Sen',
    contactNumber: '+91 98300 77112',
    email: 'ananya.sen@rediffmail.com',
    companyStockName: 'ITC Limited',
    approxSharesCount: '1200 shares',
    issueType: 'Unclaimed dividend warrants',
    message: 'Dividend warrants from 2016-2023 expired without encashment. Company confirms shares transferred to IEPF. Looking for professional submission assistance.',
    source: 'Campaign Ad',
    utm: { utm_source: 'google', utm_medium: 'search', utm_campaign: 'ipf_unclaimed_dividends' },
    status: 'Resolved',
    internalNotes: 'IEPF-5 successfully vetted and uploaded. SRN acknowledgement generated. Client credited directly in Demat.',
    createdAt: new Date(Date.now() - 7 * 86400 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 86400 * 1000).toISOString(),
  },
];

interface DatabaseSchema {
  config: CompanyConfig;
  inquiries: Inquiry[];
  conversions: ConversionEvent[];
  adminSessionTokens: Record<string, { createdAt: number; expiresAt: number }>;
}

class DataStore {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.loadData();
  }

  private ensureDirectory() {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
    } catch (err) {
      console.warn('[DataStore] Notice: Directory creation skipped or read-only filesystem:', err);
    }
  }

  private loadData(): DatabaseSchema {
    this.ensureDirectory();
    if (fs.existsSync(DATA_FILE)) {
      try {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        return {
          config: { ...INITIAL_CONFIG, ...(parsed.config || {}) },
          inquiries: Array.isArray(parsed.inquiries) && parsed.inquiries.length > 0 ? parsed.inquiries : SEED_INQUIRIES,
          conversions: Array.isArray(parsed.conversions) ? parsed.conversions : [],
          adminSessionTokens: parsed.adminSessionTokens || {},
        };
      } catch (err) {
        console.error('Failed to read database.json, initializing fresh store:', err);
      }
    }

    // Check project data/database.json for initial seed
    const rootDataFile = path.resolve(process.cwd(), 'data', 'database.json');
    if (rootDataFile !== DATA_FILE && fs.existsSync(rootDataFile)) {
      try {
        const raw = fs.readFileSync(rootDataFile, 'utf-8');
        const parsed = JSON.parse(raw);
        const seeded: DatabaseSchema = {
          config: { ...INITIAL_CONFIG, ...(parsed.config || {}) },
          inquiries: Array.isArray(parsed.inquiries) && parsed.inquiries.length > 0 ? parsed.inquiries : SEED_INQUIRIES,
          conversions: Array.isArray(parsed.conversions) ? parsed.conversions : [],
          adminSessionTokens: parsed.adminSessionTokens || {},
        };
        this.saveData(seeded);
        return seeded;
      } catch (err) {
        console.warn('Could not read seed database from root directory:', err);
      }
    }

    const initial: DatabaseSchema = {
      config: INITIAL_CONFIG,
      inquiries: SEED_INQUIRIES,
      conversions: [
        {
          id: 'conv-1',
          eventType: 'whatsapp_click',
          channel: 'WhatsApp',
          path: '/',
          timestamp: new Date(Date.now() - 3600 * 1000).toISOString(),
        },
        {
          id: 'conv-2',
          eventType: 'phone_click',
          channel: 'Phone',
          path: '/landing/ipf-assistance',
          timestamp: new Date(Date.now() - 7200 * 1000).toISOString(),
        },
      ],
      adminSessionTokens: {},
    };
    this.saveData(initial);
    return initial;
  }

  private saveData(dataToSave: DatabaseSchema) {
    try {
      this.ensureDirectory();
      fs.writeFileSync(DATA_FILE, JSON.stringify(dataToSave, null, 2), 'utf-8');
    } catch (err) {
      console.warn('[DataStore] Notice: Disk write skipped (ephemeral/serverless mode):', err);
    }
  }

  // Customer inquiries contain personal contact and share information.
  // Never write CRM data to a public repository, even if the token has write access.
  private async assertPrivateGitHubRepository(token: string, repository: string): Promise<void> {
    const response = await fetch('https://api.github.com/repos/' + repository, {
      headers: {
        Authorization: 'Bearer ' + token,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      cache: 'no-store',
    });
    if (!response.ok) {
      throw new Error('GitHub repository check failed (' + response.status + '). Check GITHUB_REPOSITORY and token permissions.');
    }
    const details = await response.json() as { private?: boolean };
    if (details.private !== true) {
      throw new Error('CRM storage repository must be private before customer inquiries can be saved.');
    }
  }

  // GitHub JSON is the durable store for serverless deployments.
  public async syncFromGitHub(): Promise<void> {
    const token = process.env.GITHUB_TOKEN || process.env.GITHUB_PAT;
    const repository = process.env.GITHUB_REPOSITORY || 'stark12300-hue/Ipf';
    if (!token) return;

    const response = await fetch(`https://api.github.com/repos/${repository}/contents/data/crm-database.json`, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' },
      cache: 'no-store',
    });
    if (response.status === 404) {
      await this.persistToGitHub();
      return;
    }
    if (!response.ok) throw new Error(`GitHub data read failed (${response.status})`);
    const file = await response.json() as { content?: string };
    if (!file.content) throw new Error('GitHub CRM data file is empty or unreadable');
    const decoded = Buffer.from(file.content.replace(/\s/g, ''), 'base64').toString('utf8');
    const parsed = JSON.parse(decoded) as Partial<DatabaseSchema>;
    this.data = {
      config: { ...INITIAL_CONFIG, ...(parsed.config || {}) },
      inquiries: Array.isArray(parsed.inquiries) ? parsed.inquiries : [],
      conversions: Array.isArray(parsed.conversions) ? parsed.conversions : [],
      adminSessionTokens: parsed.adminSessionTokens || {},
    };
    this.saveData(this.data);
  }

  public async persistToGitHub(): Promise<void> {
    const token = process.env.GITHUB_TOKEN || process.env.GITHUB_PAT;
    const repository = process.env.GITHUB_REPOSITORY || 'stark12300-hue/Ipf';
    if (!token) {
      // Local/preview mode: changes are already persisted to local storage via saveData()
      return;
    }

    await this.assertPrivateGitHubRepository(token, repository);

    const endpoint = `https://api.github.com/repos/${repository}/contents/data/crm-database.json`;
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
    };
    const current = await fetch(endpoint, { headers: { ...headers, 'Content-Type': 'application/vnd.github+json' }, cache: 'no-store' });
    let sha: string | undefined;
    if (current.ok) {
      const file = await current.json() as { sha?: string };
      sha = file.sha;
    } else if (current.status !== 404) {
      throw new Error(`GitHub data metadata request failed (${current.status})`);
    }

    const payload: Record<string, unknown> = {
      message: 'Update CRM data from admin portal',
      content: Buffer.from(JSON.stringify(this.data, null, 2), 'utf8').toString('base64'),
    };
    if (sha) payload.sha = sha;
    const saved = await fetch(endpoint, {
      method: 'PUT',
      headers,
      body: JSON.stringify(payload),
    });
    if (!saved.ok) {
      const detail = await saved.text();
      throw new Error(`GitHub CRM save failed (${saved.status}): ${detail.slice(0, 240)}`);
    }
  }

  public deleteInquiry(id: string): boolean {
    const before = this.data.inquiries.length;
    this.data.inquiries = this.data.inquiries.filter((inquiry) => inquiry.id !== id);
    if (this.data.inquiries.length === before) return false;
    this.saveData(this.data);
    return true;
  }

  public getConfig(): CompanyConfig {
    return this.data.config;
  }

  public updateConfig(newConfig: Partial<CompanyConfig>): CompanyConfig {
    this.data.config = {
      ...this.data.config,
      ...newConfig,
    };
    this.saveData(this.data);
    return this.data.config;
  }

  public getInquiries(params?: { search?: string; status?: string; source?: string }): Inquiry[] {
    let list = [...this.data.inquiries];

    if (params?.status && params.status !== 'All') {
      list = list.filter((i) => i.status.toLowerCase() === params.status?.toLowerCase());
    }

    if (params?.source && params.source !== 'All') {
      list = list.filter((i) => i.source.toLowerCase() === params.source?.toLowerCase());
    }

    if (params?.search && params.search.trim() !== '') {
      const q = params.search.toLowerCase().trim();
      list = list.filter(
        (i) =>
          i.fullName.toLowerCase().includes(q) ||
          i.contactNumber.includes(q) ||
          (i.companyStockName && i.companyStockName.toLowerCase().includes(q)) ||
          i.id.toLowerCase().includes(q) ||
          i.message.toLowerCase().includes(q)
      );
    }

    // Sort descending by date
    list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return list;
  }

  public addInquiry(payload: {
    fullName: string;
    contactNumber: string;
    email?: string;
    companyStockName?: string;
    approxSharesCount?: string;
    issueType?: string;
    message: string;
    source?: LeadSource;
    utm?: LeadUTM;
  }): Inquiry {
    const id = generateInquiryId(this.data.inquiries.length);
    const resolvedSource = determineLeadSource(payload.utm, payload.source);

    const now = new Date().toISOString();
    const newInquiry: Inquiry = {
      id,
      fullName: payload.fullName.trim(),
      contactNumber: payload.contactNumber.trim(),
      email: payload.email?.trim() || undefined,
      companyStockName: payload.companyStockName?.trim() || undefined,
      approxSharesCount: payload.approxSharesCount?.trim() || undefined,
      issueType: payload.issueType?.trim() || undefined,
      message: payload.message.trim(),
      source: resolvedSource,
      utm: payload.utm,
      status: 'New',
      internalNotes: '',
      createdAt: now,
      updatedAt: now,
    };

    this.data.inquiries.unshift(newInquiry);

    // Also record a form_submission conversion
    this.recordConversion({
      eventType: 'form_submission',
      channel: resolvedSource,
      path: payload.utm?.utm_campaign ? '/landing/ipf-assistance' : '/',
      utm: payload.utm,
    });

    this.saveData(this.data);
    return newInquiry;
  }

  public updateInquiryStatus(id: string, status?: InquiryStatus, internalNotes?: string): Inquiry | null {
    const idx = this.data.inquiries.findIndex((i) => i.id === id);
    if (idx === -1) return null;

    if (status) {
      this.data.inquiries[idx].status = status;
    }
    if (internalNotes !== undefined) {
      this.data.inquiries[idx].internalNotes = internalNotes;
    }
    this.data.inquiries[idx].updatedAt = new Date().toISOString();

    this.saveData(this.data);
    return this.data.inquiries[idx];
  }

  public recordConversion(event: Omit<ConversionEvent, 'id' | 'timestamp'>): ConversionEvent {
    const newEvent: ConversionEvent = {
      id: 'conv-' + Math.random().toString(36).substring(2, 9),
      eventType: event.eventType,
      channel: event.channel || 'Direct Visit',
      path: event.path || '/',
      utm: event.utm,
      timestamp: new Date().toISOString(),
    };

    this.data.conversions.unshift(newEvent);
    if (this.data.conversions.length > 500) {
      this.data.conversions = this.data.conversions.slice(0, 500);
    }
    this.saveData(this.data);
    return newEvent;
  }

  public getAnalytics(): AnalyticsSummary {
    const totalInquiries = this.data.inquiries.length;
    let newLeadsCount = 0;
    let inProgressCount = 0;
    let resolvedCount = 0;

    const byStatus: Record<string, number> = {
      New: 0,
      Contacted: 0,
      'In Progress': 0,
      Resolved: 0,
      Closed: 0,
    };

    const bySource: Record<string, number> = {
      Google: 0,
      Instagram: 0,
      WhatsApp: 0,
      'Direct Visit': 0,
      'Campaign Ad': 0,
      Other: 0,
    };

    for (const inq of this.data.inquiries) {
      if (inq.status === 'New') newLeadsCount++;
      if (inq.status === 'In Progress') inProgressCount++;
      if (inq.status === 'Resolved') resolvedCount++;

      byStatus[inq.status] = (byStatus[inq.status] || 0) + 1;
      const s = inq.source || 'Direct Visit';
      bySource[s] = (bySource[s] || 0) + 1;
    }

    // Generate 7-day trend
    const dailyMap: Record<string, { inquiries: number; conversions: number }> = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date(Date.now() - i * 86400 * 1000);
      const dateKey = d.toISOString().slice(0, 10);
      dailyMap[dateKey] = { inquiries: 0, conversions: 0 };
    }

    for (const inq of this.data.inquiries) {
      const dKey = inq.createdAt.slice(0, 10);
      if (dailyMap[dKey]) {
        dailyMap[dKey].inquiries++;
      }
    }

    for (const conv of this.data.conversions) {
      const dKey = conv.timestamp.slice(0, 10);
      if (dailyMap[dKey]) {
        dailyMap[dKey].conversions++;
      }
    }

    const dailyTrend = Object.keys(dailyMap)
      .sort()
      .map((k) => ({
        date: k,
        inquiries: dailyMap[k].inquiries,
        conversions: dailyMap[k].conversions,
      }));

    return {
      totalInquiries,
      newLeadsCount,
      inProgressCount,
      resolvedCount,
      byStatus,
      bySource,
      conversionsCount: this.data.conversions.length,
      dailyTrend,
    };
  }

  public exportCSV(): string {
    return exportInquiriesToCSV(this.data.inquiries);
  }

  // Session token management
  public createSessionToken(): string {
    const token = crypto.randomBytes(32).toString('hex');
    const now = Date.now();
    this.data.adminSessionTokens[token] = {
      createdAt: now,
      expiresAt: now + 7 * 24 * 3600 * 1000, // 7 days validity
    };
    this.saveData(this.data);
    return token;
  }

  public validateSessionToken(token?: string): boolean {
    if (!token) return false;
    const session = this.data.adminSessionTokens[token];
    if (!session) return false;
    if (Date.now() > session.expiresAt) {
      delete this.data.adminSessionTokens[token];
      this.saveData(this.data);
      return false;
    }
    return true;
  }

  public revokeSessionToken(token: string) {
    if (this.data.adminSessionTokens[token]) {
      delete this.data.adminSessionTokens[token];
      this.saveData(this.data);
    }
  }
}

export const dataStore = new DataStore();
