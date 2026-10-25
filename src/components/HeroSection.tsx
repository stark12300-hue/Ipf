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
    <section className="relative overflow-hidden bg-gradient-to-b from-[#060D17] via-[#0B1A30] to-[#081322] text-white pt-10 pb-16 lg:pt-14 lg:pb-24">
      {/* Dynamic Multi-Color Background Aurora Glows */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:28px_28px]" />
      
      {/* 4 Multi-Color Floating Ambient Orbs */}
      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-gradient-to-br from-blue-600/30 via-indigo-600/20 to-purple-600/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 -right-32 w-[450px] h-[450px] bg-gradient-to-bl from-emerald-500/25 via-teal-500/20 to-cyan-500/15 rounded-full blur-3xl pointer-events-none animate-float-delay" />
      <div className="absolute -bottom-24 left-1/4 w-[380px] h-[380px] bg-gradient-to-tr from-purple-600/20 via-pink-600/15 to-amber-500/10 rounded-full blur-3xl pointer-events-none animate-float" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Content Column */}
          <div className="lg:col-span-7 space-y-6 animate-fadeIn">
            
            {/* Regulatory Compliance Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-xs font-semibold text-slate-200 shadow-sm backdrop-blur-md hover:border-emerald-400/50 transition-all duration-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-white tracking-wide">
                Investor Education & Protection Fund (IEPF) Procedural Advisory
              </span>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300">
                MCA Compliant
              </span>
            </div>

            {/* Exact Required Headline with Dynamic Colorful Gradient Text */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.14] text-white font-display">
              Looking for Assistance With{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-cyan-300 via-blue-400 to-indigo-300 bg-clip-text text-transparent animate-gradient-text drop-shadow-[0_2px_15px_rgba(56,189,248,0.25)]">
                IPF Stock Recovery?
              </span>
            </h1>

            {/* Exact Required Description */}
            <p className="text-base sm:text-lg text-slate-200 font-normal leading-relaxed max-w-2xl">
              Explore the available recovery process, understand your options, and connect with our team for assistance.
            </p>

            {/* Strict Transparency Notice with Emerald Glow */}
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-gradient-to-r from-slate-900/95 via-blue-950/70 to-slate-900/95 border border-emerald-500/30 text-xs text-slate-300 backdrop-blur-md shadow-xl hover:border-emerald-400/50 transition">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 shadow-inner">
                <ShieldCheck className="w-5 h-5 text-emerald-400 animate-pulse" />
              </div>
              <div className="leading-relaxed">
                <strong className="text-emerald-300 font-bold">Advisory Transparency:</strong> We provide lawful procedural consultancy, documentation drafting, and RTA follow-up. We do not make misleading guarantees or ask for personal trading credentials.
              </div>
            </div>

            {/* CTAs Column with Colorful Vibrant Glows */}
            <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5">
              {/* WhatsApp Button with Breathing Glow & Shimmer */}
              <button
                onClick={handleWhatsApp}
                className="relative flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#25D366] via-[#10B981] to-[#059669] hover:from-[#20ba5a] hover:to-[#047857] text-slate-950 font-black text-sm tracking-wide shadow-xl shadow-emerald-950/60 hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden group"
                aria-label="Contact Veritas Advisory on WhatsApp"
              >
                <div className="absolute inset-0 bg-white/25 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <MessageCircle className="w-5 h-5 fill-slate-950 group-hover:rotate-12 transition-transform duration-200" />
                <span>Contact on WhatsApp</span>
              </button>

              {/* Call Our Team Button with Sapphire Glow */}
              <button
                onClick={handleCall}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-slate-800 to-slate-900 hover:from-blue-900 hover:to-indigo-900 text-white font-bold text-sm border border-cyan-500/30 hover:border-cyan-400 shadow-lg shadow-blue-950/40 hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                aria-label="Call Our Advisory Team"
              >
                <PhoneCall className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>Call Our Team</span>
              </button>

              {/* Request a Consultation Button with Indigo Glow */}
              <button
                onClick={handleConsultation}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-indigo-950/60 hover:-translate-y-1 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <span>Request a Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Trust Highlights Checklist with Colorful Checkmarks */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-200">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/40 border border-slate-800/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>MCA e-Form IEPF-5 Guidance</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/40 border border-slate-800/60">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>RTA Verification Assistance</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/40 border border-slate-800/60">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Deceased Legal Heir Advisory</span>
              </div>
            </div>

            {/* 4 Distinct Vibrant KPI Color Theme Boxes */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {/* Card 1: Emerald Theme */}
              <div className="space-y-1 p-3.5 rounded-2xl bg-gradient-to-b from-emerald-950/40 to-slate-900/80 border border-emerald-500/30 hover:border-emerald-400 transition-all duration-300 hover:-translate-y-1 shadow-md shadow-emerald-950/30 group">
                <div className="text-2xl font-black bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent font-display group-hover:scale-105 transition-transform">
                  ₹50+ Cr
                </div>
                <div className="text-[11px] font-semibold text-emerald-300/80">Share Folios Assessed</div>
              </div>

              {/* Card 2: Sapphire Theme */}
              <div className="space-y-1 p-3.5 rounded-2xl bg-gradient-to-b from-blue-950/40 to-slate-900/80 border border-blue-500/30 hover:border-cyan-400 transition-all duration-300 hover:-translate-y-1 shadow-md shadow-blue-950/30 group">
                <div className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent font-display group-hover:scale-105 transition-transform">
                  2,400+
                </div>
                <div className="text-[11px] font-semibold text-cyan-300/80">Claims Guided</div>
              </div>

              {/* Card 3: Violet Theme */}
              <div className="space-y-1 p-3.5 rounded-2xl bg-gradient-to-b from-purple-950/40 to-slate-900/80 border border-purple-500/30 hover:border-purple-400 transition-all duration-300 hover:-translate-y-1 shadow-md shadow-purple-950/30 group">
                <div className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent font-display group-hover:scale-105 transition-transform">
                  100%
                </div>
                <div className="text-[11px] font-semibold text-purple-300/80">Statutory Protocol</div>
              </div>

              {/* Card 4: Amber Theme */}
              <div className="space-y-1 p-3.5 rounded-2xl bg-gradient-to-b from-amber-950/40 to-slate-900/80 border border-amber-500/30 hover:border-amber-400 transition-all duration-300 hover:-translate-y-1 shadow-md shadow-amber-950/30 group">
                <div className="text-2xl font-black bg-gradient-to-r from-amber-400 to-orange-300 bg-clip-text text-transparent font-display group-hover:scale-105 transition-transform">
                  24-48h
                </div>
                <div className="text-[11px] font-semibold text-amber-300/80">Initial Review</div>
              </div>
            </div>

          </div>

          {/* Right Column: Colorful Interactive Initial Case Assessment Card */}
          <div className="lg:col-span-5 relative">
            
            {/* Floating Live Recovery Ticker Badge */}
            <div className="absolute -top-6 -right-3 z-20 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-cyan-400/50 shadow-2xl px-4 py-2 rounded-2xl backdrop-blur-md hidden sm:flex items-center gap-2 text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-200 font-medium">Live IEPF Desk:</span>
              <span className="text-cyan-300 font-extrabold font-mono">SEBI KYC Compliant</span>
            </div>

            {/* Main Interactive Glass Card with Colorful Shimmer Border */}
            <div className="bg-gradient-to-b from-slate-900/95 via-[#0D1E36]/95 to-slate-900/95 border-2 border-cyan-500/30 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-md relative overflow-hidden group hover:border-cyan-400 transition-all duration-300 hover:shadow-cyan-900/30">
              
              {/* Shimmer Border Light with Dynamic Color Gradient */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-400 via-cyan-400 via-blue-500 to-purple-500 animate-shimmer" />

              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-lg shadow-blue-900/40 group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6 text-cyan-300" />
                  </div>
                  <div>
                    <h2 className="text-sm font-black text-white uppercase tracking-wider">
                      Initial Case Assessment
                    </h2>
                    <p className="text-[11px] text-cyan-300">Identify your recovery route</p>
                  </div>
                </div>
                <span className="text-[11px] font-extrabold text-emerald-300 bg-gradient-to-r from-emerald-950 to-teal-950 px-3 py-1.5 rounded-full border border-emerald-500/50 flex items-center gap-1.5 shadow-md shadow-emerald-950/50 animate-badge-pop">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Complimentary</span>
                </span>
              </div>

              <div className="mt-5 space-y-4">
                <p className="text-xs text-slate-200 leading-relaxed">
                  Have shares been transferred to IEPF under the 7-year unpaid dividend rule, or are you holding physical share certificates?
                </p>

                {/* 3 Colorful Scenario Selection Cards */}
                <div className="space-y-2.5 text-xs">
                  {/* Option 1: Emerald / Cyan theme */}
                  <div
                    onClick={() => setCurrentPage('assessment')}
                    className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-800/80 to-blue-950/70 hover:from-emerald-950/60 hover:to-slate-800/80 border border-slate-700/70 hover:border-emerald-400 cursor-pointer flex items-center justify-between transition-all duration-200 group shadow-md hover:translate-x-1.5"
                  >
                    <div>
                      <div className="font-bold text-white group-hover:text-emerald-300 transition flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span>Unclaimed Dividends & IEPF Shares</span>
                      </div>
                      <div className="text-[11px] text-slate-300 pl-4">Transferred after 7 consecutive years</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-300 group-hover:translate-x-1 transition" />
                  </div>

                  {/* Option 2: Purple / Pink theme */}
                  <div
                    onClick={() => setCurrentPage('assessment')}
                    className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-800/80 to-blue-950/70 hover:from-purple-950/60 hover:to-slate-800/80 border border-slate-700/70 hover:border-purple-400 cursor-pointer flex items-center justify-between transition-all duration-200 group shadow-md hover:translate-x-1.5"
                  >
                    <div>
                      <div className="font-bold text-white group-hover:text-purple-300 transition flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-400" />
                        <span>Deceased Shareholder / Transmission</span>
                      </div>
                      <div className="text-[11px] text-slate-300 pl-4">Legal heir claims without nomination</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-300 group-hover:translate-x-1 transition" />
                  </div>

                  {/* Option 3: Amber / Orange theme */}
                  <div
                    onClick={() => setCurrentPage('assessment')}
                    className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-800/80 to-blue-950/70 hover:from-amber-950/60 hover:to-slate-800/80 border border-slate-700/70 hover:border-amber-400 cursor-pointer flex items-center justify-between transition-all duration-200 group shadow-md hover:translate-x-1.5"
                  >
                    <div>
                      <div className="font-bold text-white group-hover:text-amber-300 transition flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-400" />
                        <span>Lost / Damaged Physical Certificates</span>
                      </div>
                      <div className="text-[11px] text-slate-300 pl-4">Duplicate certificate issuance & demat</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-300 group-hover:translate-x-1 transition" />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setCurrentPage('assessment')}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-xs tracking-wider uppercase transition shadow-xl hover:shadow-indigo-900/60 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>Open Case Assessment Tool</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-300 pt-1">
                  <Lock className="w-3.5 h-3.5 text-cyan-400" />
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
