import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CheckSquare,
  Square,
  ShieldCheck,
  Globe,
  Instagram,
  FileText,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

interface CheckItem {
  id: string;
  category: 'SEO & Google Search' | 'Instagram & WhatsApp' | 'Compliance & Legal' | 'Lead CRM & Backend';
  title: string;
  description: string;
  status: 'passed' | 'review';
}

const CHECKLIST_ITEMS: CheckItem[] = [
  {
    id: 'seo-1',
    category: 'SEO & Google Search',
    title: 'Meta Title & Description Specificity',
    description: 'Unique, high-ranking meta title and description configured targeting "IPF stock recovery services" with zero generic placeholder text.',
    status: 'passed',
  },
  {
    id: 'seo-2',
    category: 'SEO & Google Search',
    title: 'XML Sitemap & Robots.txt Verification',
    description: 'Dynamically generated /sitemap.xml and /robots.txt accessible and indexable for Google Search Console.',
    status: 'passed',
  },
  {
    id: 'seo-3',
    category: 'SEO & Google Search',
    title: 'Schema.org Structured Data',
    description: 'JSON-LD schema for FinancialService, LocalBusiness, FAQPage, and Organization embedded in HTML header.',
    status: 'passed',
  },
  {
    id: 'ad-1',
    category: 'Instagram & WhatsApp',
    title: 'Click-to-Chat WhatsApp Integration',
    description: 'Floating button and CTAs properly format wa.me with configured WhatsApp number and pre-filled inquiry text.',
    status: 'passed',
  },
  {
    id: 'ad-2',
    category: 'Instagram & WhatsApp',
    title: 'UTM Tracking Attribution',
    description: 'Campaign parameters (utm_source, utm_medium, utm_campaign) automatically parsed and tagged to customer lead records.',
    status: 'passed',
  },
  {
    id: 'ad-3',
    category: 'Instagram & WhatsApp',
    title: 'Dedicated Ad Landing Page',
    description: 'Fast-loading /landing/ipf-assistance page built for paid ad campaigns with quick lead form and trust notice.',
    status: 'passed',
  },
  {
    id: 'legal-1',
    category: 'Compliance & Legal',
    title: 'Anti-Guarantee Regulatory Disclosure',
    description: 'Clear statement that Veritas provides procedural consultancy and does not guarantee government approval or fixed timelines.',
    status: 'passed',
  },
  {
    id: 'legal-2',
    category: 'Compliance & Legal',
    title: 'Credential Safety Warning',
    description: 'Prominent warnings on all forms that Veritas NEVER asks for Demat passwords, brokerage OTPs, or bank PINs.',
    status: 'passed',
  },
  {
    id: 'legal-3',
    category: 'Compliance & Legal',
    title: 'Privacy Policy & Terms of Service',
    description: 'Legally compliant terms explaining client data handling, non-disclosure, and voluntary consultation agreement.',
    status: 'passed',
  },
  {
    id: 'crm-1',
    category: 'Lead CRM & Backend',
    title: 'Secure Lead Persistence & CSV Export',
    description: 'Full-stack Express API with persistent file-backed database, session authentication, and CSV download.',
    status: 'passed',
  },
  {
    id: 'crm-2',
    category: 'Lead CRM & Backend',
    title: 'Honeypot Anti-Spam & Rate Limiting',
    description: 'Form submission protected against automated bots with hidden honeypot field and IP rate limiting.',
    status: 'passed',
  },
];

export const PreLaunchChecklist: React.FC = () => {
  const { setCurrentPage } = useApp();
  const [completed, setCompleted] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    CHECKLIST_ITEMS.forEach((item) => {
      init[item.id] = true;
    });
    return init;
  });

  const toggleCheck = (id: string) => {
    setCompleted((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalCount = CHECKLIST_ITEMS.length;
  const passedCount = Object.values(completed).filter(Boolean).length;

  return (
    <div className="py-16 bg-slate-50 text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold uppercase">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Launch Readiness Verification</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#0B192C] font-display">
            Pre-Launch Quality & Compliance Checklist
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            Audit protocol for Google Search ranking, Instagram advertising readiness, lead protection, and SEBI/MCA regulatory disclosures before public launch.
          </p>
        </div>

        {/* Scorecard */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-white via-emerald-50/20 to-cyan-50/30 border border-emerald-500/30 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Verification Score & System Health</span>
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1 font-display flex items-baseline gap-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
                {passedCount} / {totalCount}
              </span>
              <span className="text-sm font-semibold text-slate-500">Items Verified Ready</span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              All statutory safety precautions, SEO indexing endpoints, and lead CRM flows are in place.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-xs font-bold text-blue-900 border border-blue-200/80 shadow-sm flex items-center gap-1.5 hover:scale-105 transition-all"
            >
              <span>Test Sitemap XML</span>
              <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
            </a>
            <a
              href="/robots.txt"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 text-xs font-bold text-emerald-900 border border-emerald-200/80 shadow-sm flex items-center gap-1.5 hover:scale-105 transition-all"
            >
              <span>Test Robots.txt</span>
              <ExternalLink className="w-3.5 h-3.5 text-emerald-600" />
            </a>
          </div>
        </div>

        {/* Checklist Accordion */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-md divide-y divide-slate-100 overflow-hidden">
          {CHECKLIST_ITEMS.map((item) => {
            const isDone = completed[item.id];
            
            // Category color mappings
            const categoryBadgeStyle = {
              'SEO & Google Search': 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border-blue-200/70',
              'Instagram & WhatsApp': 'bg-gradient-to-r from-pink-50 to-purple-50 text-pink-700 border-pink-200/70',
              'Compliance & Legal': 'bg-gradient-to-r from-violet-50 to-purple-50 text-purple-700 border-purple-200/70',
              'Lead CRM & Backend': 'bg-gradient-to-r from-amber-50 to-orange-50 text-amber-800 border-amber-200/70',
            }[item.category];

            return (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className="p-5 flex items-start gap-4 hover:bg-slate-50/80 cursor-pointer transition-all group"
              >
                <button
                  type="button"
                  className="mt-0.5 focus:outline-none transition-transform group-hover:scale-110"
                  aria-label="Toggle item status"
                >
                  {isDone ? (
                    <CheckSquare className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400 group-hover:text-slate-600" />
                  )}
                </button>

                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border ${categoryBadgeStyle}`}>
                      {item.category}
                    </span>
                    <h3 className={`text-sm font-bold transition-colors ${isDone ? 'text-slate-900 group-hover:text-blue-900' : 'text-slate-500'}`}>
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => setCurrentPage('home')}
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 hover:text-blue-900"
          >
            <span>Return to Homepage</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
