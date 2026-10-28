import React from 'react';
import { useApp } from '../context/AppContext';
import {
  MessageCircle,
  PhoneCall,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Lock,
  Sparkles,
  TrendingUp,
  Activity,
  Layers,
  Clock,
  Award,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { config, setCurrentPage, trackConversion, whatsAppChatUrl } = useApp();

  const handleWhatsApp = () => {
    trackConversion('whatsapp_click', 'Hero_Section');
    window.open(whatsAppChatUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCall = () => {
    trackConversion('phone_click', 'Hero_Section');
    window.location.href = `tel:${config.contactNumber.replace(/\s+/g, '')}`;
  };

  const handleConsultation = () => {
    trackConversion('consultation_request_click', 'Hero_Section');
    setCurrentPage('contact');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-slate-50 text-slate-900 pt-10 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200">
      {/* Dynamic Multi-Color Background Aurora Glows */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:28px_28px]" />
      
      {/* Multi-Color Floating Ambient Orbs */}
      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-gradient-to-br from-blue-200/40 via-indigo-100/30 to-purple-100/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 -right-32 w-[450px] h-[450px] bg-gradient-to-bl from-emerald-100/40 via-teal-100/30 to-cyan-100/20 rounded-full blur-3xl pointer-events-none animate-float-delay" />
      <div className="absolute -bottom-24 left-1/4 w-[380px] h-[380px] bg-gradient-to-tr from-purple-100/30 via-pink-100/20 to-amber-100/20 rounded-full blur-3xl pointer-events-none animate-float" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Content Column */}
          <div className="lg:col-span-7 space-y-6 animate-fadeIn">
            
            {/* Regulatory Compliance Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-amber-300 text-xs font-semibold text-amber-900 shadow-xs hover:border-amber-400 transition-all duration-200">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span className="font-bold text-slate-900 tracking-wide">
                Gopal Singh Parihar • Business Associate of Stockholding (A Central Govt Co.)
              </span>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-amber-800">
                Kanpur, UP
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.14] text-slate-900 font-display">
              Looking for Assistance With{' '}
              <span className="bg-gradient-to-r from-blue-700 via-indigo-700 to-amber-600 bg-clip-text text-transparent">
                IPF Stock Recovery?
              </span>
            </h1>

            {/* Exact Required Description */}
            <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed max-w-2xl">
              <strong>Your Shares, Your Right – We Help You Claim It Back.</strong> Explore the available recovery process, understand your options, and connect with our team for assistance.
            </p>

            {/* Strict Transparency Notice with Emerald Glow */}
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-slate-700 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                <ShieldCheck className="w-5 h-5 text-amber-700" />
              </div>
              <div className="leading-relaxed">
                <strong className="text-amber-950 font-bold">Authorized Stockholding Business Associate:</strong> We assist shareholders with procedural documentation for e-Form IEPF-5, duplicate certificates, physical share demat, and RTA follow-up across India.
              </div>
            </div>

            {/* CTAs Column */}
            <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5">
              {/* WhatsApp Button */}
              <button
                onClick={handleWhatsApp}
                className="relative flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-black text-sm tracking-wide shadow-md hover:-translate-y-0.5 hover:scale-102 active:scale-98 transition-all duration-200 cursor-pointer overflow-hidden group"
                aria-label="Contact Gopal Singh Parihar on WhatsApp"
              >
                <MessageCircle className="w-5 h-5 fill-slate-950" />
                <span>WhatsApp: +91 94509 08004</span>
              </button>

              {/* Call Our Team Button */}
              <button
                onClick={handleCall}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 shadow-xs hover:-translate-y-0.5 hover:scale-102 active:scale-98 transition-all duration-200 cursor-pointer"
                aria-label="Call Gopal Singh Parihar"
              >
                <PhoneCall className="w-4 h-4 text-blue-600" />
                <span>Call: +91 94509 08004</span>
              </button>

              {/* Request a Consultation Button */}
              <button
                onClick={handleConsultation}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md hover:-translate-y-0.5 hover:scale-102 active:scale-98 transition-all duration-200 cursor-pointer"
              >
                <span>Free Folio Review</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Trust Highlights Checklist */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-700">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>MCA e-Form IEPF-5 Guidance</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>RTA Verification Assistance</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Deceased Legal Heir Advisory</span>
              </div>
            </div>

            {/* 4 Distinct KPI Theme Boxes */}
            <div className="pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {/* Card 1: Emerald Theme */}
              <div className="space-y-1 p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-400 transition-all duration-200 hover:-translate-y-0.5 shadow-sm group">
                <div className="text-2xl font-black text-emerald-600 font-display">
                  ₹50+ Cr
                </div>
                <div className="text-[11px] font-semibold text-slate-500">Share Folios Assessed</div>
              </div>

              {/* Card 2: Sapphire Theme */}
              <div className="space-y-1 p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 transition-all duration-200 hover:-translate-y-0.5 shadow-sm group">
                <div className="text-2xl font-black text-blue-600 font-display">
                  2,400+
                </div>
                <div className="text-[11px] font-semibold text-slate-500">Claims Guided</div>
              </div>

              {/* Card 3: Violet Theme */}
              <div className="space-y-1 p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-purple-400 transition-all duration-200 hover:-translate-y-0.5 shadow-sm group">
                <div className="text-2xl font-black text-purple-600 font-display">
                  100%
                </div>
                <div className="text-[11px] font-semibold text-slate-500">Statutory Protocol</div>
              </div>

              {/* Card 4: Amber Theme */}
              <div className="space-y-1 p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-amber-400 transition-all duration-200 hover:-translate-y-0.5 shadow-sm group">
                <div className="text-2xl font-black text-amber-600 font-display">
                  24-48h
                </div>
                <div className="text-[11px] font-semibold text-slate-500">Initial Review</div>
              </div>
            </div>

          </div>

          {/* Right Column: Clean Interactive Initial Case Assessment Card */}
          <div className="lg:col-span-5 relative">
            
            {/* Floating Live Recovery Ticker Badge */}
            <div className="absolute -top-5 -right-3 z-20 bg-white border border-blue-200 shadow-lg px-4 py-2 rounded-2xl hidden sm:flex items-center gap-2 text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-slate-600 font-medium">Live IEPF Desk:</span>
              <span className="text-blue-700 font-extrabold font-mono">SEBI KYC Compliant</span>
            </div>

            {/* Main Interactive Card */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden group hover:border-blue-300 transition-all duration-300">
              
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500" />

              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center shadow-xs">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                      Initial Case Assessment
                    </h2>
                    <p className="text-[11px] text-blue-600 font-semibold">Identify your recovery route</p>
                  </div>
                </div>
                <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Complimentary</span>
                </span>
              </div>

              <div className="mt-5 space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Have shares been transferred to IEPF under the 7-year unpaid dividend rule, or are you holding physical share certificates?
                </p>

                {/* 3 Scenario Selection Cards */}
                <div className="space-y-2.5 text-xs">
                  {/* Option 1: Emerald theme */}
                  <div
                    onClick={() => setCurrentPage('assessment')}
                    className="p-3.5 rounded-2xl bg-slate-50 hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-300 cursor-pointer flex items-center justify-between transition-all duration-200 group shadow-2xs hover:translate-x-1"
                  >
                    <div>
                      <div className="font-bold text-slate-900 group-hover:text-emerald-700 transition flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>Unclaimed Dividends & IEPF Shares</span>
                      </div>
                      <div className="text-[11px] text-slate-500 pl-4">Transferred after 7 consecutive years</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition" />
                  </div>

                  {/* Option 2: Purple theme */}
                  <div
                    onClick={() => setCurrentPage('assessment')}
                    className="p-3.5 rounded-2xl bg-slate-50 hover:bg-purple-50/60 border border-slate-200 hover:border-purple-300 cursor-pointer flex items-center justify-between transition-all duration-200 group shadow-2xs hover:translate-x-1"
                  >
                    <div>
                      <div className="font-bold text-slate-900 group-hover:text-purple-700 transition flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500" />
                        <span>Deceased Shareholder / Transmission</span>
                      </div>
                      <div className="text-[11px] text-slate-500 pl-4">Legal heir claims without nomination</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition" />
                  </div>

                  {/* Option 3: Amber theme */}
                  <div
                    onClick={() => setCurrentPage('assessment')}
                    className="p-3.5 rounded-2xl bg-slate-50 hover:bg-amber-50/60 border border-slate-200 hover:border-amber-300 cursor-pointer flex items-center justify-between transition-all duration-200 group shadow-2xs hover:translate-x-1"
                  >
                    <div>
                      <div className="font-bold text-slate-900 group-hover:text-amber-700 transition flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500" />
                        <span>Lost / Damaged Physical Certificates</span>
                      </div>
                      <div className="text-[11px] text-slate-500 pl-4">Duplicate certificate issuance & demat</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-1 transition" />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setCurrentPage('assessment')}
                    className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs tracking-wider uppercase transition shadow-md hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>Open Case Assessment Tool</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
                  <Lock className="w-3.5 h-3.5 text-blue-600" />
                  <span>Confidential inquiry • No broker passwords requested</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
