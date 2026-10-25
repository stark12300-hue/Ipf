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
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0B192C] via-[#0E223D] to-[#0A1626] text-white pt-10 pb-16 lg:pt-14 lg:pb-24">
      {/* Background Animated Gradient Orbs */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
      
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/25 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Main Content Column */}
          <div className="lg:col-span-7 space-y-6 animate-fadeIn">
            
            {/* Regulatory Compliance Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-medium text-slate-200 shadow-sm backdrop-blur-sm hover:border-emerald-500/50 transition-colors">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Investor Education & Protection Fund (IEPF) Procedural Advisory</span>
              <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            </div>

            {/* Exact Required Headline with Dynamic Gradient Glow */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-white font-display">
              Looking for Assistance With{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400 bg-clip-text text-transparent animate-gradient-text">
                IPF Stock Recovery?
              </span>
            </h1>

            {/* Exact Required Description */}
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              Explore the available recovery process, understand your options, and connect with our team for assistance.
            </p>

            {/* Strict Transparency Micro-Notice with Glow Border */}
            <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 backdrop-blur-md shadow-inner hover:border-slate-700 transition">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-white">Advisory Transparency:</strong> We provide lawful procedural consultancy, documentation drafting, and RTA follow-up. We do not make misleading guarantees or ask for personal trading credentials.
              </span>
            </div>

            {/* CTAs Column: WhatsApp, Call Our Team, Request a Consultation */}
            <div className="pt-2 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5">
              {/* WhatsApp Button with hover glow & pulse */}
              <button
                onClick={handleWhatsApp}
                className="relative flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20ba5a] hover:to-[#0f7a6d] text-slate-950 font-black text-sm tracking-wide shadow-xl shadow-emerald-950/50 hover:-translate-y-1 hover:scale-102 active:scale-98 transition-all duration-200 cursor-pointer overflow-hidden group"
                aria-label="Contact Veritas Advisory on WhatsApp"
              >
                <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <MessageCircle className="w-5 h-5 fill-slate-950" />
                <span>Contact on WhatsApp</span>
              </button>

              {/* Call Our Team Button */}
              <button
                onClick={handleCall}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 shadow-md hover:-translate-y-1 hover:scale-102 active:scale-98 transition-all duration-200 cursor-pointer"
                aria-label="Call Our Advisory Team"
              >
                <PhoneCall className="w-4 h-4 text-blue-400" />
                <span>Call Our Team</span>
              </button>

              {/* Request a Consultation Button */}
              <button
                onClick={handleConsultation}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-blue-950/50 hover:-translate-y-1 hover:scale-102 active:scale-98 transition-all duration-200 cursor-pointer"
              >
                <span>Request a Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Trust Highlights Checklist */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>MCA e-Form IEPF-5 Guidance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>RTA Verification Assistance</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Deceased Legal Heir Advisory</span>
              </div>
            </div>

            {/* Animated KPI Metrics Bar */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-1 p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/60 hover:border-slate-700 transition">
                <div className="text-xl font-black text-white font-display">₹50+ Cr</div>
                <div className="text-[11px] text-slate-400">Share Folios Assessed</div>
              </div>
              <div className="space-y-1 p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/60 hover:border-slate-700 transition">
                <div className="text-xl font-black text-emerald-400 font-display">2,400+</div>
                <div className="text-[11px] text-slate-400">Claims Guided</div>
              </div>
              <div className="space-y-1 p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/60 hover:border-slate-700 transition">
                <div className="text-xl font-black text-blue-400 font-display">100%</div>
                <div className="text-[11px] text-slate-400">Statutory Protocol</div>
              </div>
              <div className="space-y-1 p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/60 hover:border-slate-700 transition">
                <div className="text-xl font-black text-amber-400 font-display">24-48h</div>
                <div className="text-[11px] text-slate-400">Initial Review</div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Initial Case Assessment & Floating Live Indicator Card */}
          <div className="lg:col-span-5 relative">
            
            {/* Floating Live Recovery Ticker Badge */}
            <div className="absolute -top-5 -right-3 z-20 bg-slate-800/90 border border-slate-700 shadow-xl px-3.5 py-1.5 rounded-xl backdrop-blur-md hidden sm:flex items-center gap-2 text-[11px] animate-float">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-slate-300">Live IEPF Desk:</span>
              <span className="text-emerald-400 font-bold font-mono">SEBI KYC Compliant</span>
            </div>

            {/* Main Interactive Glass Card with animated border glow */}
            <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 sm:p-7 shadow-2xl backdrop-blur-md relative overflow-hidden group hover:border-blue-500/50 transition-all duration-300 hover:shadow-blue-900/20">
              {/* Shimmer Border Light */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-emerald-400 to-indigo-500" />

              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-900/60 border border-blue-700/60 flex items-center justify-center text-blue-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                      Initial Case Assessment
                    </h2>
                    <p className="text-[11px] text-slate-400">Identify your recovery route</p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800/80 flex items-center gap-1 shadow-sm">
                  <Sparkles className="w-3 h-3 text-emerald-400 animate-pulse" />
                  <span>Complimentary</span>
                </span>
              </div>

              <div className="mt-5 space-y-4">
                <p className="text-xs text-slate-300 leading-relaxed">
                  Have shares been transferred to IEPF under the 7-year unpaid dividend rule, or are you holding physical share certificates?
                </p>

                <div className="space-y-2.5 text-xs">
                  <div
                    onClick={() => setCurrentPage('assessment')}
                    className="p-3.5 rounded-xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/50 cursor-pointer flex items-center justify-between transition-all duration-200 group shadow-sm hover:translate-x-1"
                  >
                    <div>
                      <div className="font-semibold text-white group-hover:text-emerald-400 transition flex items-center gap-1.5">
                        <span>Unclaimed Dividends & IEPF Shares</span>
                      </div>
                      <div className="text-[11px] text-slate-400">Transferred after 7 consecutive years</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition" />
                  </div>

                  <div
                    onClick={() => setCurrentPage('assessment')}
                    className="p-3.5 rounded-xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/50 cursor-pointer flex items-center justify-between transition-all duration-200 group shadow-sm hover:translate-x-1"
                  >
                    <div>
                      <div className="font-semibold text-white group-hover:text-emerald-400 transition flex items-center gap-1.5">
                        <span>Deceased Shareholder / Transmission</span>
                      </div>
                      <div className="text-[11px] text-slate-400">Legal heir claims without nomination</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition" />
                  </div>

                  <div
                    onClick={() => setCurrentPage('assessment')}
                    className="p-3.5 rounded-xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/50 cursor-pointer flex items-center justify-between transition-all duration-200 group shadow-sm hover:translate-x-1"
                  >
                    <div>
                      <div className="font-semibold text-white group-hover:text-emerald-400 transition flex items-center gap-1.5">
                        <span>Lost / Damaged Physical Certificates</span>
                      </div>
                      <div className="text-[11px] text-slate-400">Duplicate certificate issuance & demat</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition" />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setCurrentPage('assessment')}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800 hover:from-blue-600 hover:to-indigo-500 text-white font-bold text-xs tracking-wider uppercase transition shadow-lg hover:shadow-blue-900/50 hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Open Case Assessment Tool</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                  <Lock className="w-3 h-3 text-slate-400" />
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
