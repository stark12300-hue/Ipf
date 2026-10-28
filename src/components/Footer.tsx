import React from 'react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from './BrandLogo';
import { ScrollReveal } from './ScrollReveal';
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
  const { config, setCurrentPage, trackConversion, whatsAppChatUrl, language } = useApp();

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
      <ScrollReveal direction="up" duration={650}>
        <div className="border-b border-slate-200 py-6 sm:py-8 bg-[#FAF8F5]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="text-sm font-black text-slate-900 flex items-center justify-center md:justify-start gap-2">
                <span className="p-1 rounded-lg bg-amber-100 border border-amber-300 text-amber-800">
                  <ShieldCheck className="w-4 h-4" />
                </span>
                <span>
                  {language === 'hi'
                    ? 'अनक्लेम्ड शेयर या IEPF क्लेम पर सीधा मार्गदर्शन चाहिए?'
                    : 'Need Direct Guidance on an Unclaimed Share Folio or IEPF Claim?'}
                </span>
              </h3>
              <p className="text-slate-600 text-xs">
                {language === 'hi'
                  ? 'गोपाल सिंह परिहार (आईईपीएफ विशेषज्ञ एवं स्टॉकहोल्डिंग बिजनेस एसोसिएट) से सीधे संपर्क करें।'
                  : 'Connect directly with Gopal Singh Parihar, IEPF Recovery Expert & Stockholding Associate.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleWhatsApp}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-black shadow-md hover:scale-102 transition cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>{language === 'hi' ? 'व्हाट्सएप डेस्क' : 'WhatsApp Desk'}</span>
              </button>
              <button
                onClick={handleCall}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md hover:scale-102 transition cursor-pointer"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{language === 'hi' ? `कॉल करें: ${config.contactNumber}` : `Call: ${config.contactNumber}`}</span>
              </button>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Main Footer Links & Info */}
      <ScrollReveal direction="up" delay={80} duration={650}>
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
              {language === 'hi'
                ? 'गोपाल सिंह परिहार स्टॉकहोल्डिंग (केंद्र सरकार की कंपनी) के अधिकृत बिजनेस एसोसिएट हैं। वे कंपनी अधिनियम की धारा 124 के तहत आईईपीएफ प्राधिकरण को स्थानांतरित शेयरों और अनक्लेम्ड लाभांश की कानूनी वसूली में पूर्ण प्रक्रियात्मक मार्गदर्शन प्रदान करते हैं।'
                : 'Gopal Singh Parihar is an authorized Business Associate of Stockholding (A Central Government Company), providing lawful procedural assistance for recovery of shares and unclaimed dividends transferred to the IEPF Authority under Section 124 of the Companies Act.'}
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
                <span>{language === 'hi' ? 'हेल्पलाइन कॉल करें' : 'Call Helpline'}</span>
              </button>
            </div>
          </div>

          {/* Quick Navigation to Poster Sections */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              <span>{language === 'hi' ? 'महत्वपूर्ण अनुभाग' : 'Quick Sections'}</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => scrollToSection('iepf-process')}
                  className="hover:text-blue-700 transition cursor-pointer text-slate-600 hover:translate-x-1 duration-150 flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span>{language === 'hi' ? 'आईईपीएफ प्रक्रिया प्रवाह' : 'IEPF Process Flow'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('poster-services')}
                  className="hover:text-blue-700 transition cursor-pointer text-slate-600 hover:translate-x-1 duration-150 flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span>{language === 'hi' ? 'हमारी 8 रिकवरी सेवाएं' : 'Our 8 Recovery Services'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('poster-inquiry')}
                  className="hover:text-blue-700 transition cursor-pointer text-slate-600 hover:translate-x-1 duration-150 flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span>{language === 'hi' ? 'त्वरित केस पूछताछ डेस्क' : 'Instant Case Inquiry Desk'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('poster-forms')}
                  className="hover:text-blue-700 transition cursor-pointer text-slate-600 hover:translate-x-1 duration-150 flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span>{language === 'hi' ? 'आईईपीएफ फॉर्म (IEPF-5 से 5D)' : 'IEPF Forms (5 to 5D)'}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('faqs-section')}
                  className="hover:text-blue-700 transition cursor-pointer text-slate-600 hover:translate-x-1 duration-150 flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span>{language === 'hi' ? 'महत्वपूर्ण प्रश्न (FAQs)' : 'Frequently Asked Questions'}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span>{language === 'hi' ? 'कार्यालय एवं संपर्क' : 'Office & Contact'}</span>
            </h4>
            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  {language === 'hi'
                    ? 'अराइल-82 न्यू ननकारी, आईआईटी कल्याणपुर, कानपुर, उत्तर प्रदेश - 208016'
                    : config.officeAddress}
                </span>
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
                <span>
                  {language === 'hi'
                    ? 'सोमवार - शनिवार: सुबह 9:30 - शाम 6:30'
                    : config.businessHours}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Regulatory Disclaimer Box */}
        <div className="mt-8 pt-6 border-t border-slate-200 text-[11px] text-slate-600 space-y-3">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 leading-relaxed">
            <div className="flex items-center gap-1.5 text-slate-900 font-bold mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{language === 'hi' ? 'वैधानिक अनुपालन सूचना:' : 'Statutory Compliance Notice:'}</span>
            </div>
            <p>
              {language === 'hi'
                ? 'गोपाल सिंह परिहार स्टॉकहोल्डिंग (केंद्र सरकार की कंपनी) के अधिकृत बिजनेस एसोसिएट हैं। हम आईईपीएफ दावों, शेयर डीमैट और ट्रांसमिशन के लिए प्रक्रियात्मक दस्तावेजीकरण और आरटीए फॉलो-अप सहायता प्रदान करते हैं। सभी बरामद शेयर और लाभांश सीधे डिपॉजिटरी (NSDL/CDSL) द्वारा निवेशक के सत्यापित डिमैट और बैंक खाते में जमा किए जाते हैं। हम कभी भी आपसे गोपनीय ट्रेडिंग पासवर्ड या बैंकिंग ओटीपी नहीं मांगते।'
                : "Gopal Singh Parihar is an authorized Business Associate of Stockholding (A Central Government Company). We provide procedural documentation assistance and RTA follow-up for IEPF claims, share demat, and transmission. All recovered shares and dividends are credited directly by the depository (NSDL/CDSL) to the investor's verified Demat account. We never ask for broker passwords or banking OTPs."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 pt-2">
            <div>
              {language === 'hi'
                ? `© ${new Date().getFullYear()} गोपाल सिंह परिहार. सर्वाधिकार सुरक्षित.`
                : `© ${new Date().getFullYear()} Gopal Singh Parihar. All Rights Reserved.`}
            </div>
            <div className="flex items-center gap-4 text-slate-600 font-semibold">
              <button onClick={() => setCurrentPage('privacy')} className="hover:text-blue-700 cursor-pointer">
                {language === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'}
              </button>
              <span>•</span>
              <button onClick={() => setCurrentPage('terms')} className="hover:text-blue-700 cursor-pointer">
                {language === 'hi' ? 'सेवा की शर्तें' : 'Terms of Service'}
              </button>
            </div>
          </div>
        </div>
      </div>
      </ScrollReveal>
    </footer>
  );
};
