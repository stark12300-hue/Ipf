import React from 'react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from './BrandLogo';
import {
  ShieldCheck,
  PhoneCall,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
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

  const scrollToSection = (id: string) => {
    setCurrentPage('home');
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <footer className="bg-white text-slate-600 border-t border-slate-200 text-xs relative overflow-hidden">
      {/* Top accent line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#0A2240] via-[#C5A059] to-[#0A2240]" />
      
      {/* Top Pre-Footer Advisory Highlight */}
      <div className="border-b border-slate-200 py-6 sm:py-8 bg-[#FAF8F5]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-sm font-black text-slate-900 flex items-center justify-center md:justify-start gap-2">
              <span className="p-1 rounded-lg bg-amber-100 border border-amber-300 text-amber-800">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <span>Need Direct Guidance on an Unclaimed Share Folio or IEPF Claim?</span>
            </h3>
            <p className="text-slate-600 text-xs">
              Connect directly with Gopal Singh Parihar, IEPF Recovery Expert & Stockholding Associate.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleWhatsApp}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-black shadow-md hover:scale-102 transition cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>WhatsApp Desk</span>
            </button>
            <button
              onClick={handleCall}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md hover:scale-102 transition cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call: {config.contactNumber}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Brand & Introduction with BrandLogo */}
          <div className="lg:col-span-5 space-y-3">
            <button
              onClick={() => scrollToSection('iepf-poster')}
              className="text-left focus:outline-none cursor-pointer group"
            >
              <BrandLogo variant="large" />
            </button>

            <p className="text-slate-600 leading-relaxed text-xs">
              Gopal Singh Parihar is an authorized Business Associate of Stockholding (A Central Government Company), providing lawful procedural assistance for recovery of shares and unclaimed dividends transferred to the IEPF Authority under Section 124 of the Companies Act.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleWhatsApp}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold hover:bg-emerald-100 transition cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>+91 94509 08004</span>
              </button>
              <button
                onClick={handleCall}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 border border-blue-300 font-bold hover:bg-blue-100 transition cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-blue-600" />
                <span>Call Helpline</span>
              </button>
            </div>
          </div>

          {/* Quick Navigation to Poster Sections */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              Quick Sections
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => scrollToSection('iepf-process')}
                  className="hover:text-blue-700 transition cursor-pointer text-slate-600 hover:translate-x-1 duration-150 flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  IEPF Process Flow
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('poster-services')}
                  className="hover:text-blue-700 transition cursor-pointer text-slate-600 hover:translate-x-1 duration-150 flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  Our 8 Recovery Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('poster-inquiry')}
                  className="hover:text-blue-700 transition cursor-pointer text-slate-600 hover:translate-x-1 duration-150 flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  Instant Case Inquiry Desk
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('poster-forms')}
                  className="hover:text-blue-700 transition cursor-pointer text-slate-600 hover:translate-x-1 duration-150 flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  IEPF Forms (5 to 5D)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('faqs-section')}
                  className="hover:text-blue-700 transition cursor-pointer text-slate-600 hover:translate-x-1 duration-150 flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              Office & Contact
            </h4>
            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{config.officeAddress}</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200">
                <PhoneCall className="w-4 h-4 text-blue-600 shrink-0" />
                <a href={`tel:${config.contactNumber.replace(/\s+/g, '')}`} className="hover:text-blue-700 font-mono font-bold">
                  {config.contactNumber}
                </a>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200">
                <Mail className="w-4 h-4 text-rose-600 shrink-0" />
                <a href={`mailto:${config.businessEmail}`} className="hover:text-rose-700 font-mono">
                  {config.businessEmail}
                </a>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200">
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{config.businessHours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Regulatory Disclaimer Box */}
        <div className="mt-8 pt-6 border-t border-slate-200 text-[11px] text-slate-600 space-y-3">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 leading-relaxed">
            <div className="flex items-center gap-1.5 text-slate-900 font-bold mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Statutory Compliance Notice:</span>
            </div>
            <p>
              Gopal Singh Parihar is an authorized Business Associate of Stockholding (A Central Government Company). We provide procedural documentation assistance and RTA follow-up for IEPF claims, share demat, and transmission. All recovered shares and dividends are credited directly by the depository (NSDL/CDSL) to the investor's verified Demat account. We never ask for broker passwords or banking OTPs.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 pt-2">
            <div>
              © {new Date().getFullYear()} Gopal Singh Parihar. All Rights Reserved.
            </div>
            <div className="flex items-center gap-4 text-slate-600 font-semibold">
              <button onClick={() => setCurrentPage('privacy')} className="hover:text-blue-700 cursor-pointer">
                Privacy Policy
              </button>
              <span>•</span>
              <button onClick={() => setCurrentPage('terms')} className="hover:text-blue-700 cursor-pointer">
                Terms of Service
              </button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
