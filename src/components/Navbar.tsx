import React, { useState } from 'react';
import { useApp, PageRoute } from '../context/AppContext';
import { BrandLogo } from './BrandLogo';
import {
  ShieldCheck,
  PhoneCall,
  MessageCircle,
  Menu,
  X,
  Lock,
  ChevronRight,
  Clock,
  Sparkles,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { config, currentPage, setCurrentPage, trackConversion, whatsAppChatUrl } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { name: string; route: PageRoute }[] = [
    { name: 'Home', route: 'home' },
    { name: 'Services', route: 'services' },
    { name: 'Check Eligibility', route: 'assessment' },
    { name: 'How It Works', route: 'how-it-works' },
    { name: 'Process FAQs', route: 'faqs' },
    { name: 'Contact & Office', route: 'contact' },
  ];

  const handleCallClick = () => {
    trackConversion('phone_click', 'Navbar');
    window.location.href = `tel:${config.contactNumber.replace(/\s+/g, '')}`;
  };

  const handleWhatsAppClick = () => {
    trackConversion('whatsapp_click', 'Navbar');
    window.open(whatsAppChatUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0B192C]/95 backdrop-blur-md text-white border-b border-slate-800/80 shadow-xl transition-all">
      {/* Top Advisory Notice Bar */}
      <div className="bg-[#07111E] text-xs text-slate-300 py-1.5 px-4 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-emerald-950/90 text-emerald-400 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-emerald-700/50 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Verified Corporate Advisory
            </span>
            <span className="hidden sm:inline text-slate-400 text-[11px]">
              MCA / IEPF-5 Documentation Guidance & Share Claim Support
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>Desk: {config.businessHours.split('|')[0] || 'Mon-Fri 9:30 AM - 6:30 PM'}</span>
            </div>
            <button
              onClick={() => setCurrentPage('admin')}
              className="text-slate-400 hover:text-white transition flex items-center gap-1 font-medium cursor-pointer"
              title="Secure Staff Portal"
            >
              <Lock className="w-3 h-3 text-slate-400" />
              <span>CRM Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo with BrandLogo Component */}
          <button
            onClick={() => setCurrentPage('home')}
            className="focus:outline-none transition-transform hover:scale-[1.02] cursor-pointer"
            aria-label="Veritas Home"
          >
            <BrandLogo variant="navbar" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.route;
              return (
                <button
                  key={link.route}
                  onClick={() => setCurrentPage(link.route)}
                  className={`relative px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-emerald-400 bg-blue-950/80 border border-emerald-500/40 shadow-inner'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-full animate-fadeIn" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Call Button */}
            <button
              onClick={handleCallClick}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700/80 text-xs font-semibold tracking-wide transition shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
              title="Call Veritas Advisory"
            >
              <PhoneCall className="w-4 h-4 text-blue-400" />
              <span>Call Our Team</span>
            </button>

            {/* WhatsApp CTA Button with gentle glowing pulse */}
            <button
              onClick={handleWhatsAppClick}
              className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20ba5a] hover:to-[#0f7a6d] text-slate-950 text-xs font-extrabold tracking-wide transition shadow-lg shadow-emerald-950/50 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping absolute -top-1 -right-1" />
              <MessageCircle className="w-4 h-4 fill-slate-950 text-[#25D366]" />
              <span>WhatsApp Us</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={handleWhatsAppClick}
              className="p-2.5 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-slate-950 font-bold shadow-md cursor-pointer hover:scale-105 transition"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5 fill-slate-950" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 focus:outline-none cursor-pointer"
              aria-label="Open Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A1626] border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.route}
                onClick={() => {
                  setCurrentPage(link.route);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                  currentPage === link.route
                    ? 'bg-blue-950 text-emerald-400 border border-emerald-500/40'
                    : 'text-slate-200 hover:bg-slate-800/80'
                }`}
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2.5">
            <button
              onClick={() => {
                handleCallClick();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800 text-slate-100 font-semibold text-sm cursor-pointer hover:bg-slate-700 transition"
            >
              <PhoneCall className="w-4 h-4 text-blue-400" />
              <span>Call Desk: {config.contactNumber}</span>
            </button>

            <button
              onClick={() => {
                handleWhatsAppClick();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-slate-950 font-extrabold text-sm shadow-md cursor-pointer hover:scale-[1.02] transition"
            >
              <MessageCircle className="w-5 h-5 fill-slate-950" />
              <span>Chat on WhatsApp Directly</span>
            </button>

            <div className="pt-2 flex justify-between text-xs text-slate-400">
              <button
                onClick={() => {
                  setCurrentPage('admin');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-1 hover:text-white cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" /> Staff CRM Portal
              </button>
              <button
                onClick={() => {
                  setCurrentPage('checklist');
                  setMobileMenuOpen(false);
                }}
                className="hover:text-white cursor-pointer"
              >
                Pre-launch Audit
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
