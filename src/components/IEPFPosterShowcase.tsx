import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ScrollReveal } from './ScrollReveal';
import {
  PhoneCall,
  Mail,
  MapPin,
  QrCode,
  ShieldCheck,
  Building2,
  Users,
  FileText,
  FileCheck2,
  CheckCircle2,
  Banknote,
  HelpCircle,
  RotateCw,
  Clock,
  Award,
  HeadphonesIcon,
  TrendingUp,
  Lock,
  ExternalLink,
  MessageCircle,
  Eye,
  X,
  Send,
  Sparkles,
  Copy,
  Check,
  ArrowRight,
  Download,
  Info,
  ChevronRight,
  AlertTriangle,
  FileSpreadsheet,
} from 'lucide-react';

import {
  StepDetail,
  ServiceDetail,
  FormDetail,
  DocDetail,
  PillarDetail,
  getStepDetails,
  getServicesList,
  getFormsList,
  getDocsList,
  getPillarsList,
  getCertificateExamples,
} from '../translations/contentData';

export const IEPFPosterShowcase: React.FC = () => {
  const { config, whatsAppChatUrl, trackConversion, showToast, language, t } = useApp();

  // Modals state
  const [showPosterModal, setShowPosterModal] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [activeStep, setActiveStep] = useState<StepDetail | null>(null);
  const [activeService, setActiveService] = useState<ServiceDetail | null>(null);
  const [activeForm, setActiveForm] = useState<FormDetail | null>(null);
  const [activeDoc, setActiveDoc] = useState<DocDetail | null>(null);
  const [activePillar, setActivePillar] = useState<PillarDetail | null>(null);

  // Instant Inquiry Form State
  const [fullName, setFullName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [caseType, setCaseType] = useState('The claim of unclaimed shares from IEPF');
  const [folioNumber, setFolioNumber] = useState('');
  const [sharesCount, setSharesCount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<{
    id: string;
    name: string;
    phone: string;
    company: string;
    service: string;
  } | null>(null);

  // Copy feedback state
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    showToast({ title: `${label} copied to clipboard!`, type: 'success' });
    setTimeout(() => setCopiedItem(null), 2500);
  };

  const handleWhatsApp = (customMessage?: string) => {
    trackConversion('whatsapp_click', 'Poster_Showcase');
    const cleanNumber = config.contactNumber.replace(/[^0-9]/g, '');
    const defaultMsg = `Hello Gopal Singh Parihar Sir, I am contacting you regarding IEPF stock recovery and share assistance. Please advise procedural steps.`;
    const targetMsg = customMessage || defaultMsg;
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(targetMsg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCall = () => {
    trackConversion('phone_click', 'Poster_Showcase');
    window.location.href = `tel:${config.contactNumber.replace(/\s+/g, '')}`;
  };

  const handleSelectService = (serviceTitle: string) => {
    setCaseType(serviceTitle);
    showToast({ title: `Selected: ${serviceTitle}`, type: 'info' });
    // Scroll smoothly to inquiry desk
    const desk = document.getElementById('poster-inquiry');
    if (desk) {
      desk.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Download Contact Card (vCard)
  const downloadVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Gopal Singh Parihar - IEPF Expert
ORG:Stockholding Business Associate (Central Govt Company)
TITLE:IEPF Recovery & Share Advisory Expert
TEL;TYPE=CELL,VOICE:${config.contactNumber.replace(/\s+/g, '')}
EMAIL;TYPE=WORK,INTERNET:${config.businessEmail}
ADR;TYPE=WORK:;;Arail-82 New Nankari;IIT Kalyanpur;Kanpur;Uttar Pradesh;208016;India
NOTE:IEPF Recovery Expert & Business Associate of Stockholding. 100% Legal Claims & Transmission.
URL:https://www.iepf.gov.in
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Gopal_Singh_Parihar_IEPF_Expert.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast({ title: 'Contact vCard downloaded to your phone/PC!', type: 'success' });
  };

  // Handle Form Submit
  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientPhone.trim() || clientPhone.replace(/\D/g, '').length < 10) {
      showToast({ title: 'Please enter a valid 10-digit mobile number', type: 'error' });
      return;
    }

    const clientName = fullName.trim() || 'Investor';
    setIsSubmitting(true);

    const messageDetails = `Inquiry via IEPF Poster Desk:
Company: ${companyName || 'Not specified'}
Service: ${caseType}
Folio/Certificate: ${folioNumber || 'Will provide on call'}
Shares Count: ${sharesCount || 'Not specified'}`;

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: clientName,
          contactNumber: clientPhone.trim(),
          companyStockName: companyName.trim() || undefined,
          approxSharesCount: sharesCount.trim() || undefined,
          issueType: caseType,
          message: messageDetails,
          source: 'Direct Visit',
        }),
      });

      const data = await res.json();
      const generatedId = data?.inquiryId || `GSP-${Math.floor(100000 + Math.random() * 900000)}`;

      trackConversion('inquiry_submitted', 'Poster_Inquiry_Desk');
      setSubmissionSuccess({
        id: generatedId,
        name: clientName,
        phone: clientPhone,
        company: companyName,
        service: caseType,
      });
      showToast({ title: 'Case Inquiry registered successfully!', type: 'success' });
    } catch {
      // Offline fallback
      const fallbackId = `GSP-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmissionSuccess({
        id: fallbackId,
        name: clientName,
        phone: clientPhone,
        company: companyName,
        service: caseType,
      });
      showToast({ title: 'Inquiry noted! Please continue on WhatsApp.', type: 'info' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Dynamic Bilingual Data Structures based on selected language (Hindi / English)
  const stepDetails: StepDetail[] = getStepDetails(language);

  const servicesList: ServiceDetail[] = getServicesList(language);

  const formsList: FormDetail[] = getFormsList(language);

  const docsList: DocDetail[] = getDocsList(language);
  const pillarsList: PillarDetail[] = getPillarsList(language);
  const certExample = getCertificateExamples(language);

  return (
    <section id="iepf-poster" className="w-full bg-[#F4F6F9] text-slate-800 py-6 sm:py-10">
      <div className="max-w-6xl mx-auto px-3 sm:px-6">

        {/* Main Poster Canvas with Gold Border */}
        <div className="bg-white rounded-3xl border-4 border-[#C5A059] shadow-2xl overflow-hidden relative">

          {/* ========================================================
              TOP HEADER: ROYAL NAVY BANNER WITH GOPAL SINGH PARIHAR
             ======================================================== */}
          <ScrollReveal direction="down" duration={700}>
            <div className="bg-gradient-to-r from-[#041122] via-[#081E3B] to-[#041122] text-white p-6 sm:p-8 relative overflow-hidden border-b-2 border-[#C5A059]">
              {/* Ambient gold glow */}
              <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
                
                {/* Left: Authentic Circular IEPF Authority Logo Seal */}
                <div className="flex items-center gap-4">
                  <div
                    className="relative group cursor-pointer"
                    onClick={() => setShowPosterModal(true)}
                    title="Click to view original brochure poster"
                  >
                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white p-1 shadow-2xl border-2 border-[#C5A059] flex items-center justify-center shrink-0 hover:scale-105 transition-transform duration-300">
                      <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="46" stroke="#0A2240" strokeWidth="4" fill="#FFFFFF" />
                        <circle cx="50" cy="50" r="41" stroke="#C5A059" strokeWidth="1" strokeDasharray="2 2" fill="none" />
                        
                        <path id="posterIepfTop" d="M 18,50 A 32,32 0 1,1 82,50" fill="none" />
                        <text fill="#0A2240" fontSize="7" fontWeight="900" letterSpacing="0.8">
                          <textPath href="#posterIepfTop" startOffset="50%" textAnchor="middle">
                            INVESTOR EDUCATION & PROTECTION
                          </textPath>
                        </text>

                        <path id="posterIepfBottom" d="M 81,53 A 32,32 0 0,1 19,53" fill="none" />
                        <text fill="#0A2240" fontSize="6.5" fontWeight="900" letterSpacing="0.6">
                          <textPath href="#posterIepfBottom" startOffset="50%" textAnchor="middle">
                            FUND AUTHORITY
                          </textPath>
                        </text>

                        <circle cx="50" cy="50" r="23" fill="#0A2240" />

                        <circle cx="50" cy="37" r="3.2" fill="#FFC107" />
                        <circle cx="43" cy="39" r="2.6" fill="#FFFFFF" />
                        <circle cx="57" cy="39" r="2.6" fill="#FFFFFF" />

                        <path d="M 45 44 C 45 41.5, 55 41.5, 55 44 Z" fill="#FFC107" />
                        <path d="M 39 46 C 39 43.5, 47 43.5, 47 46 Z" fill="#FFFFFF" opacity="0.85" />
                        <path d="M 53 46 C 53 43.5, 61 43.5, 61 46 Z" fill="#FFFFFF" opacity="0.85" />

                        <circle cx="50" cy="49" r="4" fill="#C5A059" />
                        <text x="50" y="51.8" fill="#0A2240" fontSize="4.8" fontWeight="900" textAnchor="middle">₹</text>

                        <path d="M 36 53 C 39 58, 47 62, 50 62 C 53 62, 61 58, 64 53 C 60 56, 54 58, 50 58 C 46 58, 40 56, 36 53 Z" fill="#FFC107" />

                        <rect x="33" y="66" width="34" height="9" rx="2" fill="#8B0000" />
                        <text x="50" y="73" fill="#FFFFFF" fontSize="6.5" fontWeight="900" letterSpacing="1.2" textAnchor="middle">
                          IEPF
                        </text>
                      </svg>
                    </div>
                  </div>

                  {/* Mobile view badge */}
                  <div className="lg:hidden text-left">
                    <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
                      Government Of India Regulated
                    </span>
                    <span className="text-xs font-semibold text-slate-300">
                      IEPF Authority Procedural Desk
                    </span>
                  </div>
                </div>

                {/* Center: Large Gopal Singh Parihar & Stockholding Associate Banners */}
                <div className="text-center space-y-2.5 max-w-2xl flex-1">
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight font-display leading-tight">
                    {language === 'hi' ? (
                      <span className="text-[#FFB800] drop-shadow-[0_2px_10px_rgba(255,184,0,0.4)]">
                        गोपाल सिंह परिहार
                      </span>
                    ) : (
                      <>
                        <span className="text-white">GOPAL </span>
                        <span className="text-[#FFB800] drop-shadow-[0_2px_10px_rgba(255,184,0,0.4)]">
                          SINGH PARIHAR
                        </span>
                      </>
                    )}
                  </h1>

                  {/* Maroon Subtitle Banner */}
                  <div>
                    <div className="inline-block px-4 py-1.5 rounded-md bg-[#8B0000] text-white font-black text-xs sm:text-sm tracking-wider uppercase border border-red-400/30 shadow-md">
                      {language === 'hi'
                        ? 'आईईपीएफ रिकवरी विशेषज्ञ एवं बिजनेस एसोसिएट'
                        : 'IEPF RECOVERY EXPERT & BUSINESS ASSOCIATE OF'}
                    </div>
                  </div>

                  {/* Gold Pill Banner with Shimmer Effect */}
                  <div>
                    <div className="inline-block px-5 py-2 rounded-md animate-gold-shimmer text-black font-black text-xs sm:text-sm tracking-wide uppercase shadow-lg border border-amber-300 hover:scale-102 transition-transform">
                      {language === 'hi'
                        ? 'स्टॉकहोल्डिंग (भारत सरकार की एक केंद्रीय उपक्रम कंपनी)'
                        : 'STOCKHOLDING (A CENTRAL GOVERNMENT COMPANY)'}
                    </div>
                  </div>
                </div>

                {/* Right: Securing Investors, Securing Futures Emblem */}
                <div className="hidden lg:flex flex-col items-center text-center space-y-2 shrink-0">
                  <div 
                    onClick={() => setShowPosterModal(true)}
                    className="w-24 h-24 rounded-full bg-gradient-to-b from-emerald-950 to-[#041122] border-2 border-[#C5A059] p-1 shadow-xl flex items-center justify-center relative overflow-hidden group cursor-pointer hover:scale-105 transition-transform"
                    title={language === 'hi' ? 'मूल विवरण पोस्टर देखें' : 'Click to view brochure'}
                  >
                    <div className="w-full h-full rounded-full bg-emerald-900/40 flex flex-col items-center justify-center text-emerald-400 p-2 text-center">
                      <TrendingUp className="w-8 h-8 text-emerald-400 mb-1 animate-pulse" />
                      <span className="text-[9px] font-black uppercase text-amber-300 leading-tight">
                        {language === 'hi' ? '100% कानूनी' : '100% Legal'}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs font-black text-amber-400 leading-tight">
                    <div>{language === 'hi' ? 'निवेशकों की सुरक्षा' : 'Securing Investors'}</div>
                    <div className="text-emerald-400 font-extrabold">
                      {language === 'hi' ? 'सुरक्षित भविष्य' : 'Securing Futures'}
                    </div>
                  </div>
                </div>

              </div>

              {/* View Original Poster Trigger Button */}
              <div className="mt-4 flex items-center justify-between">
                <div className="text-[11px] font-bold text-amber-300/80 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>
                    {language === 'hi'
                      ? 'इंटरैक्टिव एडवाइजरी पोर्टल • किसी भी सेक्शन पर क्लिक करके संपूर्ण विवरण देखें'
                      : 'Interactive Advisory Portal • Click Any Section to Inspect Details'}
                  </span>
                </div>
                <button
                  onClick={() => setShowPosterModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[11px] font-bold text-amber-300 border border-amber-400/40 backdrop-blur-md transition-all cursor-pointer hover:scale-105"
                >
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                  <span>{language === 'hi' ? 'मूल ब्रोशर पोस्टर देखें' : 'View Original Brochure Poster'}</span>
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* ========================================================
              CONTACT BAR: DIRECT HELPLINE, EMAIL, KANPUR ADDRESS, QR
              (Every element is fully functional with click-to-call, copy, map, QR modal)
             ======================================================== */}
          <ScrollReveal direction="up" delay={80} duration={650}>
            <div className="bg-[#FAF8F5] border-b-2 border-slate-200 px-4 py-3.5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                
                {/* Phone + Copy Button */}
                <div className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-blue-50/80 transition group bg-white border border-slate-200">
                  <a
                    href={`tel:${config.contactNumber.replace(/\s+/g, '')}`}
                    onClick={handleCall}
                    className="flex items-center gap-3 pr-2 cursor-pointer"
                    title="Click to call Gopal Singh Parihar directly"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform shrink-0">
                      <PhoneCall className="w-5 h-5 animate-pulse" />
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] font-extrabold uppercase text-slate-500 block">
                        {language === 'hi' ? 'सीधी हेल्पलाइन' : 'Direct Helpline'}
                      </span>
                      <span className="text-sm sm:text-base font-black text-slate-900 font-mono tracking-tight group-hover:text-blue-700">
                        {config.contactNumber}
                      </span>
                    </div>
                  </a>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(config.contactNumber, 'Phone number')}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-700 transition"
                    title={language === 'hi' ? 'फोन नंबर कॉपी करें' : 'Copy Phone Number'}
                  >
                    {copiedItem === 'Phone number' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Email + Copy Button */}
                <div className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-red-50/80 transition group bg-white border border-slate-200">
                  <a
                    href={`mailto:${config.businessEmail}`}
                    className="flex items-center gap-3 pr-2 cursor-pointer"
                    title={language === 'hi' ? 'ईमेल भेजें' : 'Click to email Gopal Singh Parihar'}
                  >
                    <div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] font-extrabold uppercase text-slate-500 block">
                        {language === 'hi' ? 'ईमेल केस परामर्श' : 'Email Case Desk'}
                      </span>
                      <span className="text-xs sm:text-sm font-black text-slate-900 font-mono group-hover:text-rose-700">
                        {config.businessEmail}
                      </span>
                    </div>
                  </a>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(config.businessEmail, 'Email address')}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-rose-700 transition"
                    title={language === 'hi' ? 'ईमेल कॉपी करें' : 'Copy Email'}
                  >
                    {copiedItem === 'Email address' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Address + Google Maps / Copy */}
                <div className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-emerald-50/80 transition group bg-white border border-slate-200 max-w-sm">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Arail-82+New+Nankari+IIT+Kalyanpur+Kanpur+Uttar+Pradesh+208016"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 pr-1 cursor-pointer"
                    title={language === 'hi' ? 'गूगल मैप्स पर कार्यालय देखें' : 'Open location on Google Maps'}
                  >
                    <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md shrink-0 group-hover:scale-110 transition-transform">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] font-extrabold uppercase text-slate-500 block">
                        {language === 'hi' ? 'कार्यालय का पता' : 'Office Location'}
                      </span>
                      <span className="text-xs font-bold text-slate-800 leading-tight group-hover:text-emerald-700">
                        {language === 'hi' ? t.addressFull : config.officeAddress}
                      </span>
                    </div>
                  </a>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(config.officeAddress, 'Office address')}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-700 transition shrink-0"
                    title={language === 'hi' ? 'पता कॉपी करें' : 'Copy Address'}
                  >
                    {copiedItem === 'Office address' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* QR Code Scan to Connect with Modal trigger */}
                <button
                  onClick={() => setShowQrModal(true)}
                  className="flex items-center gap-2.5 p-2 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl shadow-md transition cursor-pointer hover:scale-103"
                  title={language === 'hi' ? 'क्यूआर कोड खोलें और संपर्क सेव करें' : 'Click to expand QR Code and save contact'}
                >
                  <div className="p-1 bg-amber-400 text-slate-950 rounded-lg">
                    <QrCode className="w-7 h-7" />
                  </div>
                  <div className="text-left pr-2">
                    <span className="text-[10px] font-black uppercase text-amber-300 block leading-tight">
                      {language === 'hi' ? 'संपर्क हेतु स्कैन करें' : 'Scan to Connect'}
                    </span>
                    <span className="text-[11px] font-extrabold text-white block underline">
                      {language === 'hi' ? 'क्यूआर व संपर्क कार्ड' : 'Open QR & vCard'}
                    </span>
                  </div>
                </button>

              </div>
            </div>
          </ScrollReveal>

          {/* ========================================================
              MINISTRY OF CORPORATE AFFAIRS / TRUSTED STRIP
             ======================================================== */}
          <ScrollReveal direction="fade" delay={120} duration={600}>
            <div className="bg-white border-b border-slate-200 py-3 px-6 flex flex-wrap items-center justify-between gap-4">
              {/* Government Authority Emblem */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-300 p-1 flex items-center justify-center shrink-0">
                  <Building2 className="w-6 h-6 text-slate-800" />
                </div>
                <div>
                  <div className="text-[10px] font-serif font-bold text-slate-700 leading-none">
                    सत्यमेव जयते
                  </div>
                  <div className="text-xs font-extrabold text-slate-900 leading-tight mt-0.5">
                    {language === 'hi' ? 'कॉरपोरेट कार्य मंत्रालय' : 'Ministry of Corporate Affairs'}
                  </div>
                  <div className="text-[10px] text-slate-500 leading-none">
                    {language === 'hi' ? 'भारत सरकार द्वारा विनियमित' : 'Government of India Regulated'}
                  </div>
                </div>
              </div>

              {/* Central Badge with pulse ring */}
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-black uppercase tracking-wider animate-pulse-glow">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>
                  {language === 'hi' ? 'विश्वसनीय • सुरक्षित • प्रामाणिक' : 'Trusted • Secure • Reliable'}
                </span>
              </div>

              {/* Quick Action Button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleWhatsApp()}
                  className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-black text-xs uppercase tracking-wider shadow-sm flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>{language === 'hi' ? 'व्हाट्सएप करें' : 'WhatsApp Now'}</span>
                </button>
                <button
                  onClick={handleCall}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider shadow-sm flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
                  <span>{language === 'hi' ? 'हेल्पलाइन कॉल करें' : 'Call Helpline'}</span>
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* ========================================================
              CORE SECTION:
              1. IEPF PROCESS FLOW (Column 1 - Slides from Left)
              2. RECOVERY OF SHARES – OUR SERVICES (Column 2 - Slides from Bottom)
              3. INSTANT CASE CONSULTATION DESK (Column 3 - Slides from Right)
             ======================================================== */}
          <div className="p-4 sm:p-6 bg-[#FCFDFE]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">

              {/* ----------------------------------------------------
                  COLUMN 1: IEPF PROCESS FLOW (Deep Navy Header)
                  (Slides in from Left + Cascading Step Animations)
                 ---------------------------------------------------- */}
              <ScrollReveal direction="left" duration={750} delay={100} className="lg:col-span-4 flex flex-col">
                <div id="iepf-process" className="bg-white rounded-2xl border-2 border-slate-300 shadow-md flex flex-col justify-between overflow-hidden h-full scroll-mt-24">
                  <div>
                    <div className="bg-[#0A2240] text-white font-black py-2.5 px-4 text-center text-xs sm:text-sm tracking-wider uppercase border-b-2 border-amber-400 flex items-center justify-between">
                      <span className="w-4" />
                      <span>{language === 'hi' ? 'आईईपीएफ दावा प्रक्रिया प्रवाह (चरण 1-6)' : 'IEPF PROCESS FLOW'}</span>
                      <span className="text-[10px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded font-black">
                        {language === 'hi' ? 'विवरण देखें' : 'CLICK A STEP'}
                      </span>
                    </div>

                    <div className="p-3.5 space-y-2 text-xs">
                      {stepDetails.map((step, idx) => {
                        const icons = [
                          <Users key={1} className="w-4 h-4" />,
                          <Building2 key={2} className="w-4 h-4" />,
                          <FileText key={3} className="w-4 h-4" />,
                          <FileCheck2 key={4} className="w-4 h-4" />,
                          <ShieldCheck key={5} className="w-4 h-4" />,
                          <Banknote key={6} className="w-4 h-4" />,
                        ];

                        const colors = [
                          'bg-blue-600',
                          'bg-emerald-600',
                          'bg-amber-600',
                          'bg-rose-600',
                          'bg-purple-600',
                          'bg-teal-600',
                        ];

                        return (
                          <React.Fragment key={step.number}>
                            <ScrollReveal direction="left" delay={idx * 50} duration={500}>
                              <div
                                onClick={() => setActiveStep(step)}
                                className="group flex items-center justify-between gap-3 p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 bg-white hover:bg-blue-50/70 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5"
                                title={`Click to read details on Step ${step.number}`}
                              >
                                <div className="flex items-center gap-3">
                                  <div className={`w-8 h-8 rounded-full ${colors[idx]} text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform duration-300 font-bold text-xs`}>
                                    {icons[idx]}
                                  </div>
                                  <div className="text-left">
                                    <div className="text-[9px] font-black uppercase text-slate-500 tracking-wider">
                                      {language === 'hi' ? `चरण ${step.number} (कुल 6)` : `Step ${step.number} of 6`}
                                    </div>
                                    <span className="font-extrabold text-slate-900 leading-tight block group-hover:text-blue-900 transition">
                                      {step.title}
                                    </span>
                                  </div>
                                </div>
                                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition shrink-0" />
                              </div>
                            </ScrollReveal>

                            {idx < stepDetails.length - 1 && (
                              <div className="flex justify-center items-center py-0.5">
                                <div className="text-slate-400 font-black text-xs animate-flow-arrow flex items-center gap-1">
                                  <span>↓</span>
                                </div>
                              </div>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </div>
                  </div>

                  <div 
                    onClick={() => setActiveStep(stepDetails[0])}
                    className="bg-[#0A2240] hover:bg-[#071930] text-amber-300 hover:text-amber-200 font-black py-2.5 px-4 text-center text-xs tracking-wider uppercase border-t-2 border-amber-400 cursor-pointer transition flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>
                      {language === 'hi'
                        ? 'हम हर कदम पर आपका मार्गदर्शन करते हैं • विवरण देखें'
                        : 'WE GUIDE YOU AT EVERY STEP • CLICK TO EXPLORE'}
                    </span>
                  </div>
                </div>
              </ScrollReveal>

              {/* ----------------------------------------------------
                  COLUMN 2: RECOVERY OF SHARES – OUR SERVICES (Forest Green Header)
                  (Slides in from Bottom + Cascading Service Items)
                 ---------------------------------------------------- */}
              <ScrollReveal direction="up" duration={750} delay={180} className="lg:col-span-4 flex flex-col">
                <div id="poster-services" className="bg-white rounded-2xl border-2 border-slate-300 shadow-md flex flex-col justify-between overflow-hidden h-full scroll-mt-24">
                  <div>
                    <div className="bg-[#155724] text-white font-black py-2.5 px-4 text-center text-xs sm:text-sm tracking-wider uppercase border-b-2 border-emerald-400 flex items-center justify-between">
                      <span className="w-4" />
                      <span>{language === 'hi' ? 'शेयरों की वसूली – हमारी 8 सेवाएं' : 'RECOVERY OF SHARES – OUR SERVICES'}</span>
                      <span className="text-[10px] bg-emerald-400 text-emerald-950 px-2 py-0.5 rounded font-black">
                        {language === 'hi' ? '8 सेवाएं' : '8 SERVICES'}
                      </span>
                    </div>

                    <div className="p-3.5 space-y-1.5 text-xs">
                      {servicesList.map((service, idx) => {
                        const icons = [
                          <Users key={1} className="w-3.5 h-3.5 text-white" />,
                          <FileText key={2} className="w-3.5 h-3.5 text-white" />,
                          <HelpCircle key={3} className="w-3.5 h-3.5 text-white" />,
                          <FileCheck2 key={4} className="w-3.5 h-3.5 text-white" />,
                          <Building2 key={5} className="w-3.5 h-3.5 text-white" />,
                          <Banknote key={6} className="w-3.5 h-3.5 text-white" />,
                          <Clock key={7} className="w-3.5 h-3.5 text-white" />,
                          <RotateCw key={8} className="w-3.5 h-3.5 text-white" />,
                        ];

                        const colors = [
                          'bg-blue-600',
                          'bg-emerald-600',
                          'bg-amber-600',
                          'bg-rose-600',
                          'bg-purple-600',
                          'bg-teal-600',
                          'bg-orange-600',
                          'bg-green-700',
                        ];

                        const isSelected = caseType === service.title;

                        return (
                          <ScrollReveal key={service.id} direction="up" delay={idx * 40} duration={450}>
                            <div
                              className={`flex items-center justify-between gap-2 p-2 rounded-xl transition cursor-pointer border group ${
                                isSelected
                                  ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-300/60 shadow-sm'
                                  : 'bg-white border-slate-100 hover:border-emerald-200 hover:bg-slate-50'
                              }`}
                            >
                              <div 
                                onClick={() => handleSelectService(service.title)}
                                className="flex items-center gap-2.5 flex-1"
                              >
                                <div className={`w-7 h-7 rounded-full ${colors[idx]} flex items-center justify-center shrink-0 shadow-xs group-hover:scale-110 transition-transform`}>
                                  {icons[idx]}
                                </div>
                                <span className={`font-bold text-xs leading-tight transition ${
                                  isSelected ? 'text-emerald-950 font-black' : 'text-slate-800 group-hover:text-emerald-900'
                                }`}>
                                  {service.title}
                                </span>
                              </div>

                              <button
                                type="button"
                                onClick={() => setActiveService(service)}
                                className="p-1 rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-500 hover:text-emerald-700 transition shrink-0"
                                title="View Requirements & Documents for this service"
                              >
                                <Info className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </ScrollReveal>
                        );
                      })}
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-50 border-t border-emerald-200 flex items-center justify-between text-center">
                    <span className="text-[11px] font-extrabold text-emerald-900">
                      {language === 'hi'
                        ? 'सेवा चुनने के लिए क्लिक करें • चेकलिस्ट हेतु ℹ दबाएं'
                        : 'Click service to select • Click ℹ for checklist'}
                    </span>
                    <button
                      onClick={() => setActiveService(servicesList[0])}
                      className="text-[11px] font-black text-emerald-700 hover:text-emerald-900 underline cursor-pointer"
                    >
                      {language === 'hi' ? 'सभी देखें' : 'View All'}
                    </button>
                  </div>
                </div>
              </ScrollReveal>

              {/* ----------------------------------------------------
                  COLUMN 3: DIRECT CASE CONSULTATION DESK (REPLACES FAKE EXAMPLES!)
                  (Slides in from Right + Active Form with Backend Submission)
                 ---------------------------------------------------- */}
              <ScrollReveal direction="right" duration={750} delay={260} className="lg:col-span-4 flex flex-col">
                <div id="poster-inquiry" className="bg-white rounded-2xl border-2 border-slate-300 shadow-md flex flex-col justify-between overflow-hidden h-full scroll-mt-24">
                  <div>
                    <div className="bg-[#0F2942] text-white font-black py-2.5 px-4 text-center text-xs sm:text-sm tracking-wider uppercase border-b-2 border-amber-400 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>{language === 'hi' ? 'निःशुल्क केस परामर्श एवं जांच डेस्क' : 'INSTANT CASE INQUIRY DESK'}</span>
                      </div>
                      <span className="text-[10px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded font-black">
                        {language === 'hi' ? 'सक्रिय' : 'ACTIVE'}
                      </span>
                    </div>

                    <form onSubmit={handleInquirySubmit} className="p-3.5 space-y-2.5 text-xs">
                      
                      {/* Full Name */}
                      <div>
                        <label className="block text-[11px] font-extrabold uppercase text-slate-700 mb-0.5">
                          {language === 'hi' ? 'दावेदार / शेयरधारक का नाम *' : 'Claimant / Shareholder Name *'}
                        </label>
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder={language === 'hi' ? 'उदा. रमेश कुमार / कानूनी वारिस' : 'e.g. Ramesh Kumar / Legal Heir'}
                          className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
                        />
                      </div>

                      {/* Mobile Number */}
                      <div>
                        <label className="block text-[11px] font-extrabold uppercase text-slate-700 mb-0.5">
                          {language === 'hi' ? 'मोबाइल नंबर (व्हाट्सएप) *' : 'Your Mobile Number *'}
                        </label>
                        <input
                          type="tel"
                          required
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          placeholder={language === 'hi' ? '10 अंकों का मोबाइल नंबर (उदा. 9450908004)' : '10-digit Mobile (e.g. 9820011223)'}
                          className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-black placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono transition"
                        />
                      </div>

                      {/* Service Category */}
                      <div>
                        <label className="block text-[11px] font-extrabold uppercase text-slate-700 mb-0.5">
                          {language === 'hi' ? 'केस का प्रकार / आवश्यक सेवा *' : 'Select Case Category'}
                        </label>
                        <select
                          value={caseType}
                          onChange={(e) => setCaseType(e.target.value)}
                          className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-bold focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
                        >
                          {servicesList.map((s) => (
                            <option key={s.id} value={s.title}>
                              {s.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Company Name */}
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-extrabold uppercase text-slate-700 mb-0.5">
                            {language === 'hi' ? 'कंपनी का नाम' : 'Company Name'}
                          </label>
                          <input
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder={language === 'hi' ? 'उदा. Reliance, ITC, Tata' : 'e.g. Reliance, ITC'}
                            className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 focus:outline-none transition text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-extrabold uppercase text-slate-700 mb-0.5">
                            {language === 'hi' ? 'शेयरों की संख्या' : 'Shares Count'}
                          </label>
                          <input
                            type="text"
                            value={sharesCount}
                            onChange={(e) => setSharesCount(e.target.value)}
                            placeholder={language === 'hi' ? 'उदा. 100 शेयर' : 'e.g. 100 shares'}
                            className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 focus:outline-none transition text-xs"
                          />
                        </div>
                      </div>

                      {/* Folio Details */}
                      <div>
                        <label className="block text-[10px] font-extrabold uppercase text-slate-700 mb-0.5">
                          {language === 'hi' ? 'फोलियो नं. / प्रमाण पत्र विवरण (वैकल्पिक)' : 'Folio No. / Certificate Details (Optional)'}
                        </label>
                        <input
                          type="text"
                          value={folioNumber}
                          onChange={(e) => setFolioNumber(e.target.value)}
                          placeholder={language === 'hi' ? 'उदा. फोलियो 004521 या सर्टिफिकेट संख्या' : 'e.g. Folio 004521 or Physical Cert. No.'}
                          className="w-full p-2 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 font-medium placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600 focus:outline-none transition text-xs"
                        />
                      </div>

                      {/* Submit Buttons */}
                      <div className="pt-1 space-y-2">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer hover:scale-102 active:scale-98 disabled:opacity-60"
                        >
                          {isSubmitting ? (
                            <RotateCw className="w-4 h-4 animate-spin text-slate-950" />
                          ) : (
                            <MessageCircle className="w-4 h-4 fill-slate-950" />
                          )}
                          <span>
                            {isSubmitting
                              ? (language === 'hi' ? 'केस विवरण दर्ज हो रहा है...' : 'Registering Case...')
                              : (language === 'hi' ? 'व्हाट्सएप पर निशुल्क जांच विवरण भेजें' : 'Submit & Connect on WhatsApp')}
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={handleCall}
                          className="w-full py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer hover:scale-102 active:scale-98"
                        >
                          <PhoneCall className="w-3.5 h-3.5" />
                          <span>{language === 'hi' ? 'सीधे कॉल करें: +91 94509 08004' : 'Direct Call: +91 94509 08004'}</span>
                        </button>
                      </div>
                    </form>
                  </div>

                  <div className="p-2.5 bg-slate-100 border-t border-slate-200 text-center">
                    <div className="flex items-center justify-center gap-2 text-[10px] text-slate-600 font-bold">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>
                        {language === 'hi'
                          ? 'अधिकृत स्टॉकहोल्डिंग बिजनेस एसोसिएट डेस्क • 100% गोपनीय'
                          : 'Official Stockholding Associate Desk • 100% Confidential'}
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

            </div>

            {/* ========================================================
                IEPF PROCESS FORMS ROW (Maroon Banner)
                (Slides in from Bottom with Cascading Form Cards)
               ======================================================== */}
            <ScrollReveal direction="up" duration={750} delay={100}>
              <div id="poster-forms" className="mt-8 rounded-2xl border-2 border-slate-300 overflow-hidden shadow-md bg-white scroll-mt-24">
                <div className="bg-[#8B0000] text-white font-black py-2.5 px-4 text-center text-xs sm:text-sm tracking-wider uppercase border-b-2 border-red-400 flex items-center justify-between">
                  <span className="w-4" />
                  <span>{language === 'hi' ? 'आईईपीएफ प्रक्रिया फॉर्म (Form IEPF-5 to 5D)' : 'IEPF PROCESS FORMS'}</span>
                  <span className="text-[10px] bg-red-400 text-white px-2 py-0.5 rounded font-black">
                    {language === 'hi' ? 'फॉर्म देखें' : 'CLICK ANY FORM'}
                  </span>
                </div>

                <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {formsList.map((form, idx) => (
                    <ScrollReveal key={form.code} direction="zoom" delay={idx * 75} duration={500}>
                      <div
                        onClick={() => setActiveForm(form)}
                        className={`p-3 rounded-xl ${form.bgGrad} text-white text-center space-y-1.5 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1.5 group border border-white/10 hover:border-amber-400 h-full flex flex-col justify-between`}
                        title={`Click to view checklist for ${form.code}`}
                      >
                        <div>
                          <div className={`text-xs font-black uppercase ${form.badgeColor} group-hover:scale-105 transition-transform`}>
                            {form.code}
                          </div>
                          <div className="text-[10px] text-slate-200 leading-tight min-h-[32px] flex items-center justify-center font-medium mt-1">
                            {form.title.length > 45 ? `${form.title.slice(0, 45)}...` : form.title}
                          </div>
                        </div>
                        <div className="w-10 h-10 mx-auto rounded bg-white/10 border border-white/20 flex items-center justify-center text-amber-300 my-1 group-hover:bg-white/20 transition">
                          <FileText className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </div>
                        <div className="text-[9px] font-bold text-amber-300/80 pt-1 flex items-center justify-center gap-1">
                          <span>View Checklist</span>
                          <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition" />
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* ========================================================
                DOCUMENTS WE WORK WITH BAR
                (Slides in from Left + Interactive Guidelines)
               ======================================================== */}
            <ScrollReveal direction="left" duration={650} delay={100}>
              <div className="mt-5 p-3 rounded-2xl bg-[#FFFDF7] border-2 border-amber-300 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="px-3 py-1.5 rounded-lg bg-[#C27803] text-white text-xs font-black uppercase tracking-wider shadow-xs">
                    DOCUMENTS WE WORK WITH:
                  </span>

                  <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-800">
                    {docsList.map((doc) => (
                      <button
                        key={doc.title}
                        onClick={() => setActiveDoc(doc)}
                        className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-slate-800 hover:text-amber-900 transition flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95"
                        title={`Click to inspect guidelines for ${doc.title}`}
                      >
                        <FileText className="w-3.5 h-3.5 text-amber-700" />
                        <span>{doc.title}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Online Portal Button */}
                <a
                  href="https://www.iepf.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-1.5 rounded-full bg-[#0A2240] hover:bg-[#061528] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition shrink-0 hover:scale-105 shadow-sm"
                >
                  <span>SUBMITTED AT: www.iepf.gov.in</span>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                </a>

              </div>
            </ScrollReveal>

            {/* ========================================================
                5 TRUST PILLARS (Safe & Secure, Expert Guidance, etc.)
                (Slides in from Bottom with Cascading Pillar Cards)
               ======================================================== */}
            <ScrollReveal direction="up" duration={750} delay={100}>
              <div id="poster-pillars" className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 text-xs scroll-mt-24">
                {pillarsList.map((pillar, idx) => {
                  const pillarIcons = {
                    Lock: <Lock className="w-5 h-5" />,
                    Award: <Award className="w-5 h-5" />,
                    HeadphonesIcon: <HeadphonesIcon className="w-5 h-5" />,
                    Clock: <Clock className="w-5 h-5" />,
                    TrendingUp: <TrendingUp className="w-5 h-5" />,
                  };

                  return (
                    <ScrollReveal key={pillar.title} direction="up" delay={idx * 75} duration={500}>
                      <div
                        onClick={() => setActivePillar(pillar)}
                        className={`p-3.5 rounded-xl ${pillar.color} text-white flex items-center gap-3 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 group border border-white/10 hover:border-amber-400 h-full`}
                        title={`Click to view ${pillar.title} commitment`}
                      >
                        <div className="w-9 h-9 rounded-full bg-white/10 text-amber-300 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          {pillarIcons[pillar.iconName as keyof typeof pillarIcons]}
                        </div>
                        <div>
                          <div className="font-black text-amber-300 uppercase tracking-wide group-hover:text-amber-200">
                            {pillar.title}
                          </div>
                          <div className="text-[11px] text-slate-300 leading-tight">
                            {pillar.subtitle}
                          </div>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
              </div>
            </ScrollReveal>

          </div>

          {/* ========================================================
              BOTTOM SLOGAN RIBBON (Royal Navy with Gold Flourishes)
              (Shimmering animation with smooth inquiry anchor)
             ======================================================== */}
          <ScrollReveal direction="up" duration={600}>
            <div 
              onClick={() => {
                const el = document.getElementById('poster-inquiry');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#051325] text-amber-400 py-3.5 px-6 text-center border-t-2 border-[#C5A059] flex items-center justify-center gap-4 cursor-pointer hover:bg-[#081a30] transition group relative overflow-hidden"
            >
              {/* Shimmer line */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              <span className="hidden sm:inline text-amber-500 font-serif text-lg group-hover:scale-125 transition-transform">✦ ───</span>
              <span className="text-sm sm:text-base font-black uppercase tracking-widest text-[#FFC107] group-hover:text-amber-200 transition">
                {language === 'hi'
                  ? 'आपके शेयर, आपका अधिकार – हम दिलाएंगे आपका हक'
                  : 'YOUR SHARES, YOUR RIGHT – WE HELP YOU CLAIM IT BACK'}
              </span>
              <span className="hidden sm:inline text-amber-500 font-serif text-lg group-hover:scale-125 transition-transform">─── ✦</span>
            </div>
          </ScrollReveal>

        </div>

      </div>

      {/* ========================================================
          MODAL 1: INTERACTIVE STEP DETAIL VIEWER
         ======================================================== */}
      {activeStep && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="relative max-w-xl w-full bg-white rounded-3xl border-2 border-blue-600 overflow-hidden shadow-2xl animate-fadeIn">
            {/* Header */}
            <div className="bg-[#0A2240] text-white p-5 flex items-start justify-between border-b-2 border-amber-400">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-sm shadow-md shrink-0">
                  {activeStep.number}
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block">
                    {language === 'hi' ? `आईईपीएफ दावा प्रक्रिया • चरण ${activeStep.number} (कुल 6)` : `IEPF Process Flow • Stage ${activeStep.number} of 6`}
                  </span>
                  <h3 className="text-base font-black leading-tight text-white">
                    {activeStep.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActiveStep(null)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer transition"
                title={language === 'hi' ? 'बंद करें' : 'Close'}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 text-xs text-slate-700 max-h-[75vh] overflow-y-auto">
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
                <span className="font-extrabold text-blue-950 block text-xs mb-1">
                  {activeStep.subtitle}
                </span>
                <p className="text-slate-700 leading-relaxed">
                  {activeStep.description}
                </p>
              </div>

              <div>
                <div className="font-black text-slate-900 uppercase text-xs mb-2 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>{language === 'hi' ? 'अनुमानित वैधानिक समय सीमा:' : 'Estimated Statutory Duration:'} {activeStep.duration}</span>
                </div>
              </div>

              <div>
                <div className="font-black text-slate-900 uppercase text-xs mb-2 flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4 text-emerald-600" />
                  <span>{language === 'hi' ? 'आवश्यक मुख्य दस्तावेज एवं साक्ष्य:' : 'Key Documents & Artifacts Required:'}</span>
                </div>
                <ul className="space-y-1.5 pl-2">
                  {activeStep.requiredDocuments.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-950">
                <span className="font-black block text-[11px] mb-0.5">
                  {language === 'hi' ? 'प्रक्रियात्मक मार्गदर्शन नोट:' : 'Procedural Guidance Note:'}
                </span>
                <p className="leading-relaxed">{activeStep.proceduralNotes}</p>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => {
                    handleWhatsApp(language === 'hi'
                      ? `नमस्ते गोपाल सिंह परिहार जी, मुझे चरण ${activeStep.number}: ${activeStep.title} में सहायता चाहिए। कृपया मार्गदर्शन करें।`
                      : `Hello Gopal Singh Parihar Sir, I need assistance with Step ${activeStep.number}: ${activeStep.title}. Please guide me.`);
                    setActiveStep(null);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition cursor-pointer hover:scale-102"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>{activeStep.ctaText}</span>
                </button>

                <button
                  onClick={() => {
                    handleSelectService(language === 'hi' ? 'आईईपीएफ में फंसे अनक्लेम्ड शेयरों की कानूनी वसूली' : 'The claim of unclaimed shares from IEPF');
                    setActiveStep(null);
                  }}
                  className="py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  {language === 'hi' ? 'केस फॉर्म में चुनें' : 'Pre-fill Inquiry Desk'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 2: INTERACTIVE SERVICE REQUIREMENTS & CHECKLIST
         ======================================================== */}
      {activeService && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="relative max-w-xl w-full bg-white rounded-3xl border-2 border-emerald-600 overflow-hidden shadow-2xl animate-fadeIn">
            {/* Header */}
            <div className="bg-[#155724] text-white p-5 flex items-start justify-between border-b-2 border-emerald-400">
              <div>
                <span className="text-[10px] font-black uppercase text-emerald-300 tracking-wider block">
                  {language === 'hi' ? 'सेवा चेकलिस्ट एवं आवश्यकताएं' : 'Service Checklist'} • {activeService.category}
                </span>
                <h3 className="text-base font-black leading-tight text-white">
                  {activeService.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveService(null)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer transition"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 text-xs text-slate-700 max-h-[75vh] overflow-y-auto">
              <p className="text-slate-800 text-sm leading-relaxed font-medium">
                {activeService.description}
              </p>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-100 font-bold text-slate-800">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>
                  {language === 'hi' ? 'अनुमानित प्रक्रिया अवधि:' : 'Typical Processing Window:'} {activeService.timeline}
                </span>
              </div>

              <div>
                <div className="font-black text-slate-900 uppercase text-xs mb-2 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span>
                    {language === 'hi' ? 'इस सेवा हेतु अनिवार्य दस्तावेज चेकलिस्ट:' : 'Mandatory Checklist for this Service:'}
                  </span>
                </div>
                <ul className="space-y-1.5 pl-2">
                  {activeService.mandatoryDocs.map((doc, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                <span className="font-black block text-[11px] mb-0.5">
                  {language === 'hi' ? 'गोपाल सिंह परिहार कैसे सहायता करते हैं:' : 'How Gopal Singh Parihar Delivers:'}
                </span>
                <p className="leading-relaxed">{activeService.howWeHelp}</p>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => {
                    handleSelectService(activeService.title);
                    handleWhatsApp(
                      language === 'hi'
                        ? `नमस्ते गोपाल सिंह परिहार जी, मुझे इस सेवा के संबंध में परामर्श चाहिए: ${activeService.title}। कृपया मार्गदर्शन करें।`
                        : `Hello Gopal Singh Parihar Sir, I am inquiring about: ${activeService.title}. Please review my case.`
                    );
                    setActiveService(null);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition cursor-pointer hover:scale-102"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>{language === 'hi' ? 'इस सेवा पर परामर्श लें' : 'Consult On This Service'}</span>
                </button>

                <button
                  onClick={() => {
                    handleSelectService(activeService.title);
                    setActiveService(null);
                  }}
                  className="py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  {language === 'hi' ? 'पूछताछ डेस्क में चुनें' : 'Select in Inquiry Desk'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 3: INTERACTIVE IEPF FORM REQUIREMENTS
         ======================================================== */}
      {activeForm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="relative max-w-xl w-full bg-white rounded-3xl border-2 border-red-700 overflow-hidden shadow-2xl animate-fadeIn">
            {/* Header */}
            <div className="bg-[#8B0000] text-white p-5 flex items-start justify-between border-b-2 border-amber-400">
              <div>
                <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider block">
                  {language === 'hi' ? 'आधिकारिक IEPF फॉर्म गाइड' : 'Official IEPF Form Guide'} • {activeForm.code}
                </span>
                <h3 className="text-base font-black leading-tight text-white">
                  {activeForm.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveForm(null)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer transition"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 text-xs text-slate-700 max-h-[75vh] overflow-y-auto">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">
                  {language === 'hi' ? 'लागू कानूनी नियम' : 'Governing Rule'}
                </span>
                <span className="font-extrabold text-slate-900 text-xs">{activeForm.legalRule}</span>
                <p className="mt-2 text-slate-700 leading-relaxed font-medium">
                  {activeForm.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-amber-50 border border-amber-200">
                <div>
                  <span className="text-[10px] uppercase font-black text-amber-900 block">
                    {language === 'hi' ? 'हस्ताक्षरकर्ता' : 'Signing Authority'}
                  </span>
                  <span className="font-bold text-slate-900 text-xs">{activeForm.whoSigns}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-black text-amber-900 block">
                    {language === 'hi' ? 'स्टांप / नोटरी शुल्क' : 'Stamp / Notary Value'}
                  </span>
                  <span className="font-bold text-slate-900 text-xs">{activeForm.stampDuty}</span>
                </div>
              </div>

              <div>
                <div className="font-black text-slate-900 uppercase text-xs mb-2 flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4 text-red-600" />
                  <span>
                    {language === 'hi' ? 'अनिवार्य संलग्नक एवं अनुलग्नक:' : 'Mandatory Enclosures & Annexures:'}
                  </span>
                </div>
                <ul className="space-y-1.5 pl-2">
                  {activeForm.mandatoryAttachments.map((att, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0" />
                      <span>{att}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => {
                    handleWhatsApp(
                      language === 'hi'
                        ? `नमस्ते गोपाल सिंह परिहार जी, मुझे ${activeForm.code}: ${activeForm.title} को तैयार करने और फाइल करने में सहायता चाहिए। कृपया मार्गदर्शन करें।`
                        : `Hello Gopal Singh Parihar Sir, I need assistance with preparing and filing ${activeForm.code}: ${activeForm.title}. Please guide me.`
                    );
                    setActiveForm(null);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition cursor-pointer hover:scale-102"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>
                    {language === 'hi' ? `हमारे साथ ${activeForm.code} फाइल करें` : `File ${activeForm.code} With Us`}
                  </span>
                </button>

                <a
                  href="https://www.iepf.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-4 rounded-xl bg-[#0A2240] hover:bg-[#061528] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition cursor-pointer"
                >
                  <span>{language === 'hi' ? 'एमसीए पोर्टल' : 'MCA Portal'}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 4: INTERACTIVE DOCUMENT GUIDELINES & PITFALLS
         ======================================================== */}
      {activeDoc && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="relative max-w-lg w-full bg-white rounded-3xl border-2 border-amber-500 overflow-hidden shadow-2xl animate-fadeIn">
            {/* Header */}
            <div className="bg-[#C27803] text-white p-5 flex items-start justify-between border-b-2 border-amber-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-100 tracking-wider block">
                    {language === 'hi' ? 'दस्तावेज चेकलिस्ट एवं दिशानिर्देश' : 'Document Checklist & Guidelines'}
                  </span>
                  <h3 className="text-base font-black leading-tight text-white">
                    {activeDoc.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActiveDoc(null)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer transition"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 text-xs text-slate-700">
              <p className="text-slate-800 text-sm font-medium leading-relaxed">
                {activeDoc.description}
              </p>

              <div>
                <span className="font-black text-rose-700 uppercase text-xs mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>
                    {language === 'hi' ? 'सामान्य आपत्तियां एवं अस्वीकृति के कारण:' : 'Common Issues & Rejection Causes:'}
                  </span>
                </span>
                <ul className="space-y-1.5 pl-2 mt-1">
                  {activeDoc.commonIssues.map((issue, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-600 mt-1.5 shrink-0" />
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                <span className="font-black block text-[11px] mb-0.5">
                  {language === 'hi' ? 'गोपाल सिंह परिहार इसे कैसे हल करते हैं:' : 'How Gopal Singh Parihar Solves This:'}
                </span>
                <p className="leading-relaxed">{activeDoc.solution}</p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    handleWhatsApp(
                      language === 'hi'
                        ? `नमस्ते गोपाल सिंह परिहार जी, मुझे इस दस्तावेज के संबंध में सलाह चाहिए: ${activeDoc.title}। कृपया मार्गदर्शन करें।`
                        : `Hello Gopal Singh Parihar Sir, I have a query regarding my document: ${activeDoc.title}. Please guide me.`
                    );
                    setActiveDoc(null);
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition cursor-pointer hover:scale-102"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>
                    {language === 'hi' ? 'इस दस्तावेज पर विशेषज्ञ से पूछें' : 'Ask Expert About This Document'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 5: TRUST PILLARS & CREDENTIALS PLEDGE
         ======================================================== */}
      {activePillar && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="relative max-w-lg w-full bg-white rounded-3xl border-2 border-slate-700 overflow-hidden shadow-2xl animate-fadeIn">
            {/* Header */}
            <div className={`${activePillar.color} text-white p-5 flex items-start justify-between border-b-2 border-amber-400`}>
              <div>
                <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider block">
                  {language === 'hi' ? 'विश्वसनीयता एवं सेवा मानक' : 'Trust Pillar & Service Standard'}
                </span>
                <h3 className="text-base font-black leading-tight text-white">
                  {activePillar.title}
                </h3>
              </div>
              <button
                onClick={() => setActivePillar(null)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer transition"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 text-xs text-slate-700">
              <p className="text-slate-800 text-sm font-semibold leading-relaxed">
                {activePillar.details}
              </p>

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950">
                <span className="font-black block text-[11px] uppercase mb-1">
                  {language === 'hi' ? 'हमारा आधिकारिक स्टॉकहोल्डिंग एसोसिएट संकल्प:' : 'Our Official Stockholding Associate Pledge:'}
                </span>
                <p className="leading-relaxed font-medium">
                  {activePillar.pledge}
                </p>
              </div>

              <div className="flex items-center gap-2 text-slate-600 text-[11px] font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {language === 'hi'
                    ? 'आईआईटी कल्याणपुर, कानपुर (उ.प्र.) से संचालित • अखिल भारतीय स्तर पर सेवाएं'
                    : 'Operating from Kanpur, Uttar Pradesh • Servicing Clients Pan-India'}
                </span>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => {
                    handleCall();
                    setActivePillar(null);
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{language === 'hi' ? 'गोपाल सिंह परिहार को कॉल करें' : 'Call Gopal Singh Parihar'}</span>
                </button>
                <button
                  onClick={() => {
                    handleWhatsApp();
                    setActivePillar(null);
                  }}
                  className="py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 6: HIGH-RES QR CODE & CONTACT VCARD CARD
         ======================================================== */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="relative max-w-md w-full bg-white rounded-3xl border-2 border-amber-400 overflow-hidden shadow-2xl animate-fadeIn">
            {/* Header */}
            <div className="bg-[#041122] text-white p-5 flex items-center justify-between border-b-2 border-amber-400">
              <div className="flex items-center gap-2.5">
                <QrCode className="w-5 h-5 text-amber-400" />
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-300 block">
                    {language === 'hi' ? 'डिजिटल संपर्क कार्ड' : 'Digital Contact Card'}
                  </span>
                  <h3 className="text-sm font-black text-white">
                    {language === 'hi'
                      ? 'गोपाल सिंह परिहार से तुरंत जुड़ें'
                      : 'Scan to Connect with Gopal Singh Parihar'}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setShowQrModal(false)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer transition"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 text-center space-y-4 text-xs">
              {/* High-res generated QR code simulation */}
              <div className="w-52 h-52 mx-auto p-3 bg-white border-2 border-slate-300 rounded-2xl shadow-inner flex flex-col items-center justify-center relative">
                <svg viewBox="0 0 100 100" className="w-full h-full text-slate-950" fill="currentColor">
                  {/* Top-left position marker */}
                  <rect x="5" y="5" width="26" height="26" rx="3" fill="#0A2240" />
                  <rect x="8" y="8" width="20" height="20" rx="2" fill="#FFFFFF" />
                  <rect x="12" y="12" width="12" height="12" rx="1" fill="#0A2240" />

                  {/* Top-right position marker */}
                  <rect x="69" y="5" width="26" height="26" rx="3" fill="#0A2240" />
                  <rect x="72" y="8" width="20" height="20" rx="2" fill="#FFFFFF" />
                  <rect x="76" y="12" width="12" height="12" rx="1" fill="#0A2240" />

                  {/* Bottom-left position marker */}
                  <rect x="5" y="69" width="26" height="26" rx="3" fill="#0A2240" />
                  <rect x="8" y="72" width="20" height="20" rx="2" fill="#FFFFFF" />
                  <rect x="12" y="76" width="12" height="12" rx="1" fill="#0A2240" />

                  {/* Center authentic data bits */}
                  <rect x="36" y="8" width="5" height="5" fill="#0A2240" />
                  <rect x="46" y="8" width="5" height="5" fill="#0A2240" />
                  <rect x="56" y="8" width="5" height="5" fill="#0A2240" />
                  <rect x="36" y="18" width="8" height="5" fill="#0A2240" />
                  <rect x="48" y="18" width="5" height="8" fill="#0A2240" />
                  <rect x="58" y="18" width="6" height="5" fill="#0A2240" />

                  <rect x="8" y="36" width="5" height="8" fill="#0A2240" />
                  <rect x="18" y="36" width="8" height="5" fill="#0A2240" />
                  <rect x="28" y="36" width="5" height="5" fill="#0A2240" />

                  {/* Center Logo Shield */}
                  <circle cx="50" cy="50" r="14" fill="#C5A059" />
                  <circle cx="50" cy="50" r="11" fill="#0A2240" />
                  <text x="50" y="54" fill="#FFC107" fontSize="10" fontWeight="900" textAnchor="middle">₹</text>

                  {/* Bottom data bits */}
                  <rect x="36" y="72" width="8" height="5" fill="#0A2240" />
                  <rect x="48" y="72" width="6" height="8" fill="#0A2240" />
                  <rect x="58" y="72" width="5" height="5" fill="#0A2240" />
                  <rect x="72" y="36" width="5" height="8" fill="#0A2240" />
                  <rect x="82" y="36" width="8" height="5" fill="#0A2240" />
                  <rect x="72" y="48" width="8" height="5" fill="#0A2240" />
                  <rect x="85" y="48" width="5" height="8" fill="#0A2240" />
                  <rect x="72" y="60" width="5" height="5" fill="#0A2240" />
                  <rect x="80" y="60" width="8" height="5" fill="#0A2240" />
                  <rect x="36" y="84" width="5" height="8" fill="#0A2240" />
                  <rect x="46" y="84" width="8" height="5" fill="#0A2240" />
                  <rect x="60" y="84" width="8" height="5" fill="#0A2240" />
                  <rect x="72" y="72" width="6" height="6" fill="#0A2240" />
                  <rect x="84" y="72" width="6" height="6" fill="#0A2240" />
                  <rect x="72" y="84" width="6" height="6" fill="#0A2240" />
                  <rect x="84" y="84" width="6" height="6" fill="#0A2240" />
                </svg>
              </div>

              <div className="space-y-1">
                <div className="font-black text-slate-900 text-sm">
                  {language === 'hi' ? 'गोपाल सिंह परिहार' : 'Gopal Singh Parihar'}
                </div>
                <div className="text-[11px] font-bold text-slate-600">
                  {language === 'hi'
                    ? 'आईईपीएफ रिकवरी विशेषज्ञ एवं स्टॉकहोल्डिंग के बिजनेस एसोसिएट'
                    : 'IEPF Recovery Expert & Business Associate of Stockholding'}
                </div>
                <div className="text-xs font-mono font-black text-blue-700">
                  {config.contactNumber}
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={downloadVCard}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition cursor-pointer hover:scale-102"
                >
                  <Download className="w-4 h-4 text-amber-400" />
                  <span>
                    {language === 'hi' ? 'संपर्क फोन में सहेजें (.vCard)' : 'Save Contact to Phone (.vCard)'}
                  </span>
                </button>

                <button
                  onClick={() => {
                    handleWhatsApp();
                    setShowQrModal(false);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition cursor-pointer hover:scale-102"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>
                    {language === 'hi' ? 'सीधा व्हाट्सएप चैट खोलें' : 'Open WhatsApp Direct Chat'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 7: CASE SUBMISSION SUCCESS CELEBRATION MODAL
         ======================================================== */}
      {submissionSuccess && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="relative max-w-md w-full bg-white rounded-3xl border-2 border-emerald-500 overflow-hidden shadow-2xl animate-fadeIn">
            {/* Header */}
            <div className="bg-[#0F5132] text-white p-6 text-center border-b-2 border-emerald-400">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-400/20 border-2 border-emerald-300 flex items-center justify-center text-emerald-300 mb-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black text-white">
                {language === 'hi' ? 'केस विवरण सफलतापूर्वक दर्ज हुआ!' : 'Case Inquiry Registered!'}
              </h3>
              <p className="text-xs text-emerald-200 mt-1">
                {language === 'hi'
                  ? 'आपका विवरण हमारे रिकवरी सिस्टम में सुरक्षित रूप से दर्ज कर लिया गया है।'
                  : 'Your details have been logged in our recovery system.'}
              </p>
            </div>

            {/* Body */}
            <div className="p-6 space-y-4 text-xs text-slate-700">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <span className="text-[10px] uppercase font-bold text-slate-500">
                    {language === 'hi' ? 'केस संदर्भ संख्या' : 'Official Case Ref'}
                  </span>
                  <span className="font-mono font-black text-blue-700 text-sm">
                    {submissionSuccess.id}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold text-slate-500">
                    {language === 'hi' ? 'दावेदार का नाम' : 'Claimant'}
                  </span>
                  <span className="font-bold text-slate-900">{submissionSuccess.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold text-slate-500">
                    {language === 'hi' ? 'संपर्क मोबाइल' : 'Contact Number'}
                  </span>
                  <span className="font-mono font-bold text-slate-900">{submissionSuccess.phone}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold text-slate-500">
                    {language === 'hi' ? 'चयनित सेवा' : 'Service Category'}
                  </span>
                  <span className="font-bold text-slate-900 text-right truncate max-w-[200px]">
                    {submissionSuccess.service}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-center">
                <span className="font-extrabold block text-xs mb-0.5">
                  {language === 'hi' ? 'अगला अनुशंसित कदम:' : 'Next Recommended Step:'}
                </span>
                <span>
                  {language === 'hi'
                    ? 'त्वरित जांच और प्राथमिकता हेतु यह केस ड्राफ्ट गोपाल सिंह परिहार को व्हाट्सएप पर भेजें।'
                    : 'Send this case draft to Gopal Singh Parihar on WhatsApp for priority verification.'}
                </span>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    const msg = language === 'hi'
                      ? `नमस्ते गोपाल सिंह परिहार जी, मैंने केस संदर्भ ${submissionSuccess.id} दर्ज किया है:
• दावेदार: ${submissionSuccess.name}
• फोन: ${submissionSuccess.phone}
• कंपनी: ${submissionSuccess.company || 'चर्चा की जाएगी'}
• सेवा: ${submissionSuccess.service}
कृपया प्रक्रियात्मक मार्गदर्शन प्रदान करें।`
                      : `Hello Gopal Singh Parihar Sir, I registered case Ref ${submissionSuccess.id}:
• Claimant: ${submissionSuccess.name}
• Phone: ${submissionSuccess.phone}
• Company: ${submissionSuccess.company || 'To be discussed'}
• Service: ${submissionSuccess.service}
Please advise the procedural requirements.`;
                    handleWhatsApp(msg);
                    setSubmissionSuccess(null);
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition cursor-pointer hover:scale-102"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>
                    {language === 'hi' ? 'व्हाट्सएप पर केस विवरण भेजें' : 'Send Case Details on WhatsApp'}
                  </span>
                </button>

                <button
                  onClick={() => setSubmissionSuccess(null)}
                  className="w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  {language === 'hi' ? 'विंडो बंद करें' : 'Close Window'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 8: VIEW ORIGINAL FULL-SIZE FLYER/BROCHURE
         ======================================================== */}
      {showPosterModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-3xl border border-amber-400/50 overflow-hidden shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between p-4 bg-slate-950 border-b border-slate-800 text-white">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <span className="font-bold text-sm">
                  {language === 'hi'
                    ? 'गोपाल सिंह परिहार - आधिकारिक विवरणिका / ब्रोशर'
                    : 'Gopal Singh Parihar - Official Advisory Brochure'}
                </span>
              </div>
              <button
                onClick={() => setShowPosterModal(false)}
                className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 bg-slate-950 flex flex-col items-center">
              <img
                src="/assets/aistudio/IMG-20261028-WA0000_5ee6995d.jpg"
                alt="Gopal Singh Parihar - Official IEPF Recovery Expert Brochure"
                className="max-h-[75vh] w-auto rounded-xl shadow-2xl border border-slate-700 object-contain"
              />
              
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300">
                <a
                  href={`tel:${config.contactNumber.replace(/\s+/g, '')}`}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{language === 'hi' ? `कॉल करें: ${config.contactNumber}` : `Call ${config.contactNumber}`}</span>
                </a>
                <button
                  onClick={() => handleWhatsApp()}
                  className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-black flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-slate-950" />
                  <span>{language === 'hi' ? 'गोपाल सिंह परिहार से व्हाट्सएप करें' : 'WhatsApp Gopal Singh Parihar'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
