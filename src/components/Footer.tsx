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
    <footer className="bg-[#07111E] text-slate-400 border-t border-slate-800 text-xs relative overflow-hidden">
      {/* Top multi-color accent rainbow line */}
      <div className="h-1 w-full bg-gradient-to-r from-emerald-400 via-cyan-400 via-purple-500 via-amber-400 to-emerald-400 animate-shimmer-fast" />

      {/* Subtle ambient colored backdrop glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* Top Pre-Footer Advisory Highlight */}
      <div className="border-b border-slate-800/80 py-8 bg-gradient-to-r from-[#081527] via-[#0D1C34] to-[#081527] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-1.5 text-center md:text-left">
            <h3 className="text-sm font-bold text-white flex items-center justify-center md:justify-start gap-2.5">
              <span className="p-1 rounded-lg bg-emerald-500/20 border border-emerald-400/40 text-emerald-300">
                <ShieldCheck className="w-4 h-4 animate-pulse-glow" />
              </span>
              <span>Need Immediate Guidance on an Unclaimed Share Folio?</span>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-400/30 text-emerald-300 animate-pulse-gentle">
                Active 24/7 Desk
              </span>
            </h3>
            <p className="text-slate-300 text-xs">
              Connect with our verification desk directly on WhatsApp or call our senior advisory helpline.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleWhatsApp}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-bold shadow-[0_0_20px_rgba(52,211,153,0.35)] hover:shadow-[0_0_25px_rgba(52,211,153,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>WhatsApp Desk</span>
            </button>
            <button
              onClick={handleCall}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 hover:from-blue-950 hover:to-indigo-950 text-white font-semibold border border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(56,189,248,0.25)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-cyan-400" />
              <span>Call: {config.contactNumber}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Brand & Introduction with BrandLogo */}
          <div className="lg:col-span-4 space-y-4">
            <button
              onClick={() => setCurrentPage('home')}
              className="text-left focus:outline-none cursor-pointer group"
            >
              <div className="group-hover:scale-[1.02] transition-transform">
                <BrandLogo variant="large" />
              </div>
            </button>

            <p className="text-slate-400 leading-relaxed text-xs">
              Professional consultancy specializing in procedural assistance for recovery of shares and unclaimed dividends transferred to the Investor Education and Protection Fund (IEPF).
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleInstagram}
                className="p-2.5 rounded-xl bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-amber-500/10 hover:from-pink-500/25 hover:via-purple-500/25 hover:to-amber-500/25 text-pink-400 border border-pink-500/30 shadow-sm hover:scale-110 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-all cursor-pointer"
                title="Instagram Channel"
              >
                <Instagram className="w-4 h-4" />
              </button>
              <button
                onClick={handleWhatsApp}
                className="p-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 shadow-sm hover:scale-110 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(52,211,153,0.3)] transition-all cursor-pointer"
                title="WhatsApp Contact"
              >
                <MessageCircle className="w-4 h-4" />
              </button>
              <button
                onClick={handleCall}
                className="p-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/25 text-cyan-400 border border-cyan-500/30 shadow-sm hover:scale-110 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all cursor-pointer"
                title="Direct Phone"
              >
                <PhoneCall className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Core Services Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
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
                    className="hover:text-emerald-300 hover:translate-x-1 transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-slate-400 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-emerald-400 transition-colors" />
                    {s.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links & Legal */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              Information
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { name: 'About Us', page: 'home' as const },
                { name: 'How It Works', page: 'how-it-works' as const },
                { name: 'Process FAQs', page: 'faqs' as const },
                { name: 'Contact & Office', page: 'contact' as const },
                { name: 'Pre-Launch Audit', page: 'checklist' as const },
                { name: 'Privacy Policy', page: 'privacy' as const },
                { name: 'Terms of Service', page: 'terms' as const },
              ].map((item, i) => (
                <li key={i}>
                  <button
                    onClick={() => setCurrentPage(item.page)}
                    className="hover:text-cyan-300 hover:translate-x-1 transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-slate-400 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition-colors" />
                    {item.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => setCurrentPage('admin')}
                  className="text-purple-400 hover:text-purple-300 flex items-center gap-1.5 font-semibold cursor-pointer pt-1 hover:translate-x-1 transition-all"
                >
                  <Lock className="w-3 h-3 text-purple-400" /> Staff CRM Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Corporate Desk
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <span>{config.officeAddress}</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-emerald-500/30 transition-colors">
                <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
                  <PhoneCall className="w-3.5 h-3.5" />
                </div>
                <a href={`tel:${config.contactNumber.replace(/\s+/g, '')}`} className="hover:text-emerald-300 font-mono font-bold">
                  {config.contactNumber}
                </a>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/30 transition-colors">
                <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <a href={`mailto:${config.businessEmail}`} className="hover:text-indigo-300">
                  {config.businessEmail}
                </a>
              </div>
              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0 mt-0.5">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <span>{config.businessHours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Mandatory Transparency & Regulatory Disclaimer Box */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-4">
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900/90 via-[#0A1628]/80 to-slate-900/90 border border-emerald-500/20 leading-relaxed shadow-lg">
            <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Important Regulatory Disclosure & Customer Protection Notice:</span>
            </div>
            <p className="text-slate-400">
              {config.companyName} is an independent corporate advisory providing documentation and procedural liaison support for Investor Education and Protection Fund (IEPF) claims and share transmission. We are NOT a government authority, not affiliated with the Ministry of Corporate Affairs (MCA), SEBI, or the IEPF Authority. We do NOT guarantee successful recovery or specific approval timelines. Recovered shares and dividends are credited directly to your registered personal Demat account by the depository. We will NEVER request trading credentials, Demat passwords, or bank OTPs.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 pt-2">
            <div>
              © {new Date().getFullYear()} {config.companyName}. All Rights Reserved.
            </div>
            <div className="flex items-center gap-4 text-slate-400 font-medium">
              <button onClick={() => setCurrentPage('privacy')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                Privacy Policy
              </button>
              <span>•</span>
              <button onClick={() => setCurrentPage('terms')} className="hover:text-cyan-300 transition-colors cursor-pointer">
                Terms of Service
              </button>
              <span>•</span>
              <button onClick={() => setCurrentPage('checklist')} className="hover:text-emerald-300 transition-colors cursor-pointer">
                Launch Checklist
              </button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
