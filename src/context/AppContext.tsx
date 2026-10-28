import React, { createContext, useContext, useState, useEffect } from 'react';
import { CompanyConfig, LeadUTM, Inquiry } from '../types';
import { extractUTMParameters, buildWhatsAppChatUrl } from '../utils/validation';

export type PageRoute =
  | 'home'
  | 'services'
  | 'assessment'
  | 'how-it-works'
  | 'faqs'
  | 'contact'
  | 'landing'
  | 'admin'
  | 'privacy'
  | 'terms'
  | 'checklist';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
}

interface AppContextType {
  config: CompanyConfig;
  currentPage: PageRoute;
  setCurrentPage: (page: PageRoute) => void;
  utm: LeadUTM;
  toasts: Toast[];
  showToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  trackConversion: (eventType: string, channel?: string) => Promise<void>;
  whatsAppChatUrl: string;
  reloadConfig: () => Promise<void>;
  preselectedService?: string;
  setPreselectedService: (serviceTitle?: string) => void;
  adminToken: string | null;
  setAdminToken: (token: string | null) => void;
}

const DEFAULT_CONFIG: CompanyConfig = {
  companyName: 'Gopal Singh Parihar - IEPF Recovery Expert',
  tagLine: 'Business Associate of Stockholding (A Central Government Company)',
  contactNumber: '+91 94509 08004',
  whatsappNumber: '+91 94509 08004',
  businessEmail: 'gopaliepf@gmail.com',
  officeAddress: 'Arail-82 New Nankari, IIT Kalyanpur, Kanpur, Uttar Pradesh - 208016',
  businessHours: 'Mon - Sat: 9:00 AM - 7:00 PM IST',
  instagramHandle: '@gopaliepf',
  instagramUrl: 'https://www.instagram.com',
  googleAdsId: 'AW-1122334455',
  metaPixelId: '998877665544332',
  seoTitle: 'Gopal Singh Parihar | IEPF Recovery Expert & Stockholding Associate',
  seoDescription: 'Your Shares, Your Right – We Help You Claim It Back. Professional IEPF share retrieval, unclaimed dividends, and stock transmission services in Kanpur and across India.',
  disclaimerNotice: 'Gopal Singh Parihar is an authorized Business Associate of Stockholding (A Central Government Company) providing procedural guidance and documentation assistance for IEPF claims, share dematerialization, and transmission. All recovered shares are credited directly by the depository to the investor\'s own Demat account.',
  services: [],
  faqs: [],
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<CompanyConfig>(DEFAULT_CONFIG);
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [utm, setUtm] = useState<LeadUTM>({});
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);
  const [adminToken, setAdminTokenState] = useState<string | null>(() => {
    return localStorage.getItem('veritas_admin_token') || null;
  });

  const setAdminToken = (token: string | null) => {
    setAdminTokenState(token);
    if (token) {
      localStorage.setItem('veritas_admin_token', token);
    } else {
      localStorage.removeItem('veritas_admin_token');
    }
  };

  // Parse path & UTM parameters on initial load
  useEffect(() => {
    const search = window.location.search;
    const pathname = window.location.pathname;

    const extracted = extractUTMParameters(search, document.referrer);
    setUtm(extracted);

    if (pathname.includes('/landing')) {
      setCurrentPage('landing');
    } else if (pathname.includes('/admin')) {
      setCurrentPage('admin');
    } else if (pathname.includes('/services')) {
      setCurrentPage('services');
    } else if (pathname.includes('/assessment')) {
      setCurrentPage('assessment');
    } else if (pathname.includes('/how-it-works')) {
      setCurrentPage('how-it-works');
    } else if (pathname.includes('/faqs')) {
      setCurrentPage('faqs');
    } else if (pathname.includes('/contact')) {
      setCurrentPage('contact');
    } else if (pathname.includes('/checklist')) {
      setCurrentPage('checklist');
    } else if (pathname.includes('/privacy')) {
      setCurrentPage('privacy');
    } else if (pathname.includes('/terms')) {
      setCurrentPage('terms');
    }

    // Handle browser popstate
    const handlePopState = () => {
      const p = window.location.pathname;
      if (p.includes('/landing')) setCurrentPage('landing');
      else if (p.includes('/admin')) setCurrentPage('admin');
      else if (p.includes('/services')) setCurrentPage('services');
      else if (p.includes('/assessment')) setCurrentPage('assessment');
      else if (p.includes('/how-it-works')) setCurrentPage('how-it-works');
      else if (p.includes('/faqs')) setCurrentPage('faqs');
      else if (p.includes('/contact')) setCurrentPage('contact');
      else if (p.includes('/checklist')) setCurrentPage('checklist');
      else if (p.includes('/privacy')) setCurrentPage('privacy');
      else if (p.includes('/terms')) setCurrentPage('terms');
      else setCurrentPage('home');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Update browser history when page changes
  const navigateTo = (page: PageRoute) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let newPath = '/';
    if (page === 'landing') newPath = '/landing/ipf-assistance';
    else if (page === 'admin') newPath = '/admin';
    else if (page === 'services') newPath = '/services';
    else if (page === 'assessment') newPath = '/assessment';
    else if (page === 'how-it-works') newPath = '/how-it-works';
    else if (page === 'faqs') newPath = '/faqs';
    else if (page === 'contact') newPath = '/contact';
    else if (page === 'checklist') newPath = '/checklist';
    else if (page === 'privacy') newPath = '/privacy';
    else if (page === 'terms') newPath = '/terms';

    if (window.location.pathname !== newPath) {
      window.history.pushState(null, '', newPath + (window.location.search || ''));
    }
  };

  // Load config from backend
  const reloadConfig = async () => {
    try {
      const res = await fetch('/api/config');
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.config) {
          setConfig(data.config);
        }
      }
    } catch (e) {
      console.warn('Using local fallback config:', e);
    }
  };

  useEffect(() => {
    reloadConfig();
  }, []);

  // Conversion tracker
  const trackConversion = async (eventType: string, channel: string = 'Website') => {
    try {
      await fetch('/api/track-conversion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventType,
          channel,
          path: window.location.pathname,
          utm,
        }),
      });
    } catch (err) {
      // Non-blocking
    }
  };

  const showToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const whatsAppChatUrl = buildWhatsAppChatUrl(
    config.whatsappNumber,
    'Hello, I visited your website and would like to enquire about IPF stock recovery assistance.'
  );

  return (
    <AppContext.Provider
      value={{
        config,
        currentPage,
        setCurrentPage: navigateTo,
        utm,
        toasts,
        showToast,
        removeToast,
        trackConversion,
        whatsAppChatUrl,
        reloadConfig,
        preselectedService,
        setPreselectedService,
        adminToken,
        setAdminToken,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
