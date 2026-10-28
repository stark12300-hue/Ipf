import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from './BrandLogo';
import {
  ShieldCheck,
  PhoneCall,
  MessageCircle,
  Menu,
  X,
  ChevronRight,
  Clock,
  MapPin,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { config, trackConversion, whatsAppChatUrl, setCurrentPage, language, setLanguage, t } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCallClick = () => {
    trackConversion('phone_click', 'Navbar');
    window.location.href = `tel:${config.contactNumber.replace(/\s+/g, '')}`;
  };

  const handleWhatsAppClick = () => {
    trackConversion('whatsapp_click', 'Navbar');
    window.open(whatsAppChatUrl, '_blank', 'noopener,noreferrer');
  };

  const toggleLanguage = () => {
    const nextLang = language === 'hi' ? 'en' : 'hi';
    setLanguage(nextLang);
  };

  const scrollToSection = (id: string) => {
    setCurrentPage('home');
    setMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md text-slate-800 border-b border-slate-200 shadow-xs transition-all">
      {/* Top Advisory Notice Bar */}
      <div className="bg-[#FAF8F5] text-xs text-slate-700 py-1.5 px-4 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-[11px] font-black px-2.5 py-0.5 rounded-full border border-amber-300">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
              {t.advisoryStockholding}
            </span>
            <span className="hidden md:inline text-slate-700 text-[11px] font-semibold">
              {t.addressShort}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            {/* Language Switcher Pill in Top Bar */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold border border-slate-300 transition cursor-pointer text-[10.5px]"
              title="Change Language / भाषा बदलें"
            >
              <span>{language === 'hi' ? '🇬🇧 English' : '🇮🇳 हिंदी'}</span>
            </button>

            <a
              href={`tel:${config.contactNumber.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 text-blue-800 font-extrabold hover:underline"
            >
              <PhoneCall className="w-3 h-3 text-blue-700" />
              <span>{t.helpline}: {config.contactNumber}</span>
            </a>
            <div className="hidden sm:flex items-center gap-1.5 text-slate-600">
              <Clock className="w-3 h-3 text-emerald-600" />
              <span>{t.businessHours}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo with BrandLogo Component */}
          <button
            onClick={() => scrollToSection('iepf-poster')}
            className="focus:outline-none transition-transform hover:scale-102 active:scale-98 cursor-pointer text-left"
            aria-label="Gopal Singh Parihar Home"
          >
            <BrandLogo variant="navbar" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => scrollToSection('iepf-poster')}
              className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-blue-800 hover:bg-slate-100 transition cursor-pointer"
            >
              {t.navProcess}
            </button>
            <button
              onClick={() => scrollToSection('poster-services')}
              className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-blue-800 hover:bg-slate-100 transition cursor-pointer"
            >
              {t.navServices}
            </button>
            <button
              onClick={() => scrollToSection('poster-forms')}
              className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-blue-800 hover:bg-slate-100 transition cursor-pointer"
            >
              {t.navForms}
            </button>
            <button
              onClick={() => scrollToSection('poster-pillars')}
              className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-blue-800 hover:bg-slate-100 transition cursor-pointer"
            >
              {t.navPillars}
            </button>
            <button
              onClick={() => scrollToSection('faqs-section')}
              className="px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-blue-800 hover:bg-slate-100 transition cursor-pointer"
            >
              {t.navFaqs}
            </button>
            <button
              onClick={() => scrollToSection('poster-inquiry')}
              className="px-3.5 py-2 rounded-xl text-xs font-black text-amber-900 bg-amber-50 border border-amber-300 hover:bg-amber-100 transition cursor-pointer"
            >
              {t.navInquiry}
            </button>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Quick Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-xs font-bold text-slate-800 transition cursor-pointer"
              title="Switch language / भाषा बदलें"
            >
              <span className="text-sm">{language === 'hi' ? '🇮🇳' : '🇬🇧'}</span>
              <span>{language === 'hi' ? 'हिंदी' : 'EN'}</span>
            </button>

            {/* Call Button */}
            <button
              onClick={handleCallClick}
              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 text-xs font-black tracking-wide transition-all duration-200 shadow-2xs hover:scale-102 active:scale-98 cursor-pointer"
              title="Call Gopal Singh Parihar"
            >
              <PhoneCall className="w-3.5 h-3.5 text-blue-700" />
              <span>{t.callBtn}</span>
            </button>

            {/* WhatsApp CTA Button */}
            <button
              onClick={handleWhatsAppClick}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 text-xs font-black tracking-wide transition-all duration-200 shadow-md hover:scale-102 active:scale-98 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950 text-slate-950" />
              <span>{t.whatsappBtn}</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={handleWhatsAppClick}
              className="p-2.5 rounded-xl bg-[#25D366] text-slate-950 font-bold shadow-md cursor-pointer hover:scale-105 transition"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5 fill-slate-950" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 focus:outline-none cursor-pointer"
              aria-label="Open Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="space-y-1">
            <button
              onClick={() => scrollToSection('iepf-poster')}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100 text-left"
            >
              <span>IEPF Process Flow</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => scrollToSection('poster-services')}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100 text-left"
            >
              <span>Our 8 Recovery Services</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => scrollToSection('poster-inquiry')}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100 text-left"
            >
              <span>Instant Case Inquiry Desk</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => scrollToSection('poster-forms')}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100 text-left"
            >
              <span>IEPF Forms (IEPF-5 to 5D)</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => scrollToSection('faqs-section')}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-100 text-left"
            >
              <span>Common Questions (FAQs)</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2.5">
            <button
              onClick={() => {
                handleCallClick();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-50 text-blue-900 font-bold text-sm cursor-pointer hover:bg-blue-100 transition"
            >
              <PhoneCall className="w-4 h-4 text-blue-700" />
              <span>Call: {config.contactNumber}</span>
            </button>

            <button
              onClick={() => {
                handleWhatsAppClick();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#25D366] text-slate-950 font-black text-sm shadow-md cursor-pointer hover:scale-[1.01] transition"
            >
              <MessageCircle className="w-5 h-5 fill-slate-950" />
              <span>WhatsApp Gopal Singh Parihar</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
