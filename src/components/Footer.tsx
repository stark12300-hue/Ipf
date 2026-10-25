import React from 'react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from './BrandLogo';
import {
  ShieldCheck,
  PhoneCall,
  MessageCircle,
  Instagram,
  Mail,
  MapPin,
  Clock,
  Lock,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { config, setCurrentPage, trackConversion, whatsAppChatUrl } = useApp();

  const handleWhatsApp = () => {
    trackConversion('whatsapp_click', 'Footer');
    window.open(whatsAppChatUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCall = () => {
    trackConversion('phone_click', 'Footer');
    window.location.href = `tel:${config.contactNumber.replace(/\s+/g, '')}`;
  };

  const handleInstagram = () => {
    trackConversion('instagram_click', 'Footer');
    window.open(config.instagramUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-[#07111E] text-slate-400 border-t border-slate-800 text-xs">
      
      {/* Top Pre-Footer Advisory Highlight */}
      <div className="border-b border-slate-800/80 py-8 bg-[#091524]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-sm font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Need Immediate Guidance on an Unclaimed Share Folio?</span>
            </h3>
            <p className="text-slate-400 text-xs">
              Connect with our verification desk directly on WhatsApp or call our hotline.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleWhatsApp}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20ba5a] text-slate-950 font-bold shadow-lg hover:scale-105 active:scale-95 transition cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>WhatsApp Desk</span>
            </button>
            <button
              onClick={handleCall}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold border border-slate-700 hover:scale-105 active:scale-95 transition cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-blue-400" />
              <span>Call: {config.contactNumber}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Brand & Introduction with BrandLogo */}
          <div className="lg:col-span-4 space-y-4">
            <button
              onClick={() => setCurrentPage('home')}
              className="text-left focus:outline-none cursor-pointer"
            >
              <BrandLogo variant="large" />
            </button>

            <p className="text-slate-400 leading-relaxed text-xs">
              Professional consultancy specializing in procedural assistance for recovery of shares and unclaimed dividends transferred to the Investor Education and Protection Fund (IEPF).
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleInstagram}
                className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-pink-400 border border-slate-700 shadow-sm hover:scale-110 hover:-translate-y-0.5 transition cursor-pointer"
                title="Instagram Channel"
              >
                <Instagram className="w-4 h-4" />
              </button>
              <button
                onClick={handleWhatsApp}
                className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-[#25D366] border border-slate-700 shadow-sm hover:scale-110 hover:-translate-y-0.5 transition cursor-pointer"
                title="WhatsApp Contact"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
              <button
                onClick={handleCall}
                className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-blue-400 border border-slate-700 shadow-sm hover:scale-110 hover:-translate-y-0.5 transition cursor-pointer"
                title="Direct Phone"
              >
                <PhoneCall className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Core Services Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Recovery Services
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { name: 'IPF Stock Recovery Assistance', page: 'services' as const },
                { name: 'Recovery Process Guidance', page: 'services' as const },
                { name: 'Case Assessment & Folio Audit', page: 'assessment' as const },
                { name: 'Documentation Assistance', page: 'services' as const },
                { name: 'Legal Heir Transmission Advisory', page: 'services' as const },
                { name: 'Recovery Case Follow-up', page: 'services' as const },
              ].map((s, i) => (
                <li key={i}>
                  <button
                    onClick={() => setCurrentPage(s.page)}
                    className="hover:text-emerald-400 transition cursor-pointer"
                  >
                    {s.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links & Legal */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Information
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setCurrentPage('home')} className="hover:text-white transition cursor-pointer">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('how-it-works')} className="hover:text-white transition cursor-pointer">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('faqs')} className="hover:text-white transition cursor-pointer">
                  Process FAQs
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('contact')} className="hover:text-white transition cursor-pointer">
                  Contact & Office
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('checklist')} className="hover:text-white transition cursor-pointer">
                  Pre-Launch Audit
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('privacy')} className="hover:text-white transition cursor-pointer">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('terms')} className="hover:text-white transition cursor-pointer">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentPage('admin')} className="text-slate-400 hover:text-emerald-400 flex items-center gap-1 font-semibold cursor-pointer">
                  <Lock className="w-3 h-3" /> Staff CRM
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Corporate Desk
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{config.officeAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${config.contactNumber.replace(/\s+/g, '')}`} className="hover:text-white font-mono">
                  {config.contactNumber}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <a href={`mailto:${config.businessEmail}`} className="hover:text-white">
                  {config.businessEmail}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{config.businessHours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Mandatory Transparency & Regulatory Disclaimer Box */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-[11px] text-slate-500 space-y-3">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 leading-relaxed">
            <strong className="text-slate-300 block mb-1">
              Important Regulatory Disclosure & Customer Protection Notice:
            </strong>
            <p>
              {config.companyName} is an independent corporate advisory providing documentation and procedural liaison support for Investor Education and Protection Fund (IEPF) claims and share transmission. We are NOT a government authority, not affiliated with the Ministry of Corporate Affairs (MCA), SEBI, or the IEPF Authority. We do NOT guarantee successful recovery or specific approval timelines. Recovered shares and dividends are credited directly to your registered personal Demat account by the depository. We will NEVER request trading credentials, Demat passwords, or bank OTPs.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 pt-2">
            <div>
              © {new Date().getFullYear()} {config.companyName}. All Rights Reserved.
            </div>
            <div className="flex items-center gap-4 text-slate-400">
              <button onClick={() => setCurrentPage('privacy')} className="hover:text-white cursor-pointer">
                Privacy Policy
              </button>
              <span>•</span>
              <button onClick={() => setCurrentPage('terms')} className="hover:text-white cursor-pointer">
                Terms of Service
              </button>
              <span>•</span>
              <button onClick={() => setCurrentPage('checklist')} className="hover:text-white cursor-pointer">
                Launch Checklist
              </button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
