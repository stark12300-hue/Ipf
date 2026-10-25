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
      <div className="bg-gradient-to-r from-[#060D17] via-[#0F1E36] to-[#060D17] text-xs text-slate-300 py-1.5 px-4 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-slate-900/90 text-emerald-300 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Verified Corporate Advisory
            </span>
            <span className="hidden sm:inline text-slate-300 text-[11px]">
              MCA / IEPF-5 Documentation Guidance & Share Claim Support
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3 h-3 text-cyan-400 animate-pulse" />
              <span>Desk: {config.businessHours.split('|')[0] || 'Mon-Fri 9:30 AM - 6:30 PM'}</span>
            </div>
            <button
              onClick={() => setCurrentPage('admin')}
              className="px-2.5 py-0.5 rounded-lg bg-slate-800/80 hover:bg-indigo-950 hover:text-cyan-300 border border-slate-700/60 transition-all flex items-center gap-1 font-medium cursor-pointer shadow-xs"
              title="Secure Staff Portal"
            >
              <Lock className="w-3 h-3 text-cyan-400" />
              <span>CRM Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo with BrandLogo Component & Subtle Ambient Glow */}
          <button
            onClick={() => setCurrentPage('home')}
            className="focus:outline-none transition-transform hover:scale-105 active:scale-95 cursor-pointer relative group"
            aria-label="Veritas Home"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-indigo-500/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <BrandLogo variant="navbar" />
          </button>

          {/* Desktop Navigation Links with Colorful Active States */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = currentPage === link.route;
              return (
                <button
                  key={link.route}
                  onClick={() => setCurrentPage(link.route)}
                  className={`relative px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-cyan-300 bg-gradient-to-r from-blue-950/90 via-indigo-950/90 to-blue-950/90 border border-cyan-400/50 shadow-md shadow-cyan-950/40 scale-105'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/70 hover:scale-102'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute -bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 rounded-full animate-shimmer" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs with vibrant glows */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Call Button */}
            <button
              onClick={handleCallClick}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 hover:from-blue-900 hover:to-indigo-900 text-slate-100 border border-blue-500/30 hover:border-blue-400 text-xs font-bold tracking-wide transition-all duration-200 shadow-md hover:shadow-blue-950/50 hover:-translate-y-0.5 hover:scale-105 active:scale-95 cursor-pointer"
              title="Call Veritas Advisory"
            >
              <PhoneCall className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>Call Our Team</span>
            </button>

            {/* WhatsApp CTA Button */}
            <button
              onClick={handleWhatsAppClick}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20ba5a] text-slate-950 text-xs font-bold tracking-wide transition-all duration-200 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950 text-slate-950" />
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
