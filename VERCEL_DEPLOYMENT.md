# Vercel Deployment Guide | Veritas IPF Stock Recovery

Haan! Yeh project **Vercel par 100% smoothly run karega**. Sabhi Vercel configurations (`vercel.json`, `/api/index.ts`, serverless `/tmp` database fallback) already pre-configure kar diye gaye hain.

---

## 🚀 Steps to Deploy on Vercel (2 Minute Guide)

### Option 1: GitHub Se Direct Deploy (Recommended)
1. **GitHub par push karein**: Apne is code ko apne GitHub repository me push karein.
2. **Vercel par jaayein**: [vercel.com](https://vercel.com) par login karein.
3. **New Project**: **"Add New..."** -> **"Project"** par click karein.
4. **Import Repository**: Apne GitHub repository ko select karein.
5. **Project Settings**:
   - **Framework Preset**: `Vite` (Vercel automatically detect kar leta hai)
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. **Environment Variables (Optional)**:
   - `ADMIN_PASSWORD` = `admin123` (Apna pasandida admin password set karein)
   - `APP_URL` = Apka Vercel production URL (e.g. `https://your-app.vercel.app`)
7. **Deploy**: **"Deploy"** button par click karein!

---

### Option 2: Vercel CLI Se Deploy
Terminal me ye command run karein:
```bash
npm i -g vercel
vercel
```
Production deployment ke liye:
```bash
vercel --prod
```

---

## 🛠️ Is Project Me Vercel Ke Liye Kya Configure Kiya Gaya Hai?

1. **`vercel.json`**:
   - Frontend static assets (`dist`) ko serve karta hai.
   - Sabhi `/api/*` requests ko automatic serverless function (`/api/index.ts`) par route karta hai.
   - Dynamic `/sitemap.xml` aur `/robots.txt` ko handle karta hai.
   - SPA (Single Page Application) routing ke liye `/(.*) -> /index.html` rewrites pre-configured hain.

2. **Serverless API Compatibility (`/api/index.ts` & `src/server/dataStore.ts`)**:
   - Vercel Serverless environment me disk read-only hoti hai, isliye humne automatically `/tmp` storage aur resilient fallback add kiya hai taaki form submissions kabhi fail na ho.
   - WhatsApp aur Instagram direct conversions hamesha 100% reliably kaam karte hain.

3. **Production Fast Build**:
   - `npm run build` se optimized client build (`dist`) generate hoti hai with zero warnings.
