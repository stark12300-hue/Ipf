import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Building2,
  Scale,
  Award,
  CheckCircle,
  FileCheck2,
  Users2,
  Briefcase,
  AlertCircle,
  ArrowRight,
  Shield,
  Sparkles,
  PhoneCall,
  MessageCircle,
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { config, setCurrentPage, whatsAppChatUrl, trackConversion } = useApp();

  const handleWhatsApp = () => {
    trackConversion('whatsapp_click', 'About_Section');
    window.open(whatsAppChatUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCall = () => {
    trackConversion('phone_click', 'About_Section');
    window.location.href = `tel:${config.contactNumber.replace(/\s+/g, '')}`;
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white via-slate-50 to-white text-slate-800 border-b border-slate-200 relative overflow-hidden">
      {/* Decorative background glow circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-amber-900 text-xs font-black tracking-wider uppercase shadow-xs">
            <Building2 className="w-3.5 h-3.5 text-amber-700" />
            <span>Authorized Advisory & Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B192C] tracking-tight font-display">
            About Gopal Singh Parihar
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            IEPF Recovery Expert & Business Associate of Stockholding (A Central Government Company), dedicated to helping Indian shareholders retrieve their rightful investments.
          </p>
        </div>

        {/* Narrative & Credentials Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
              Bridging the Gap Between Shareholders and IEPF Authority
            </h3>
            
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Every year, thousands of investors discover that their equity shares or accrued dividends have been transferred to the Investor Education and Protection Fund (IEPF) under Section 124(6) of the Companies Act, or remain inaccessible due to lost physical certificates, outdated signatures, or incomplete Demat transmission.
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              As an authorized <strong className="text-slate-950 font-black">Business Associate of Stockholding (A Central Government Company)</strong> based at Arail-82 New Nankari, IIT Kalyanpur, Kanpur, <strong className="text-blue-900 font-extrabold">Gopal Singh Parihar</strong> provides complete procedural guidance, documentation drafting, and RTA liaison for claims across India.
            </p>

            <div className="pt-2 space-y-3">
              {[
                {
                  title: 'Rigorous Folio & Entitlement Verification',
                  desc: 'We inspect company records and corporate actions (splits, bonuses, mergers) to map exact claimant share entitlements.',
                  color: 'from-emerald-500 to-teal-600',
                  bg: 'bg-emerald-50 border-emerald-200',
                },
                {
                  title: 'Standardized Legal & KYC Drafting (Forms IEPF-5 to 5D)',
                  desc: 'Preparation of non-judicial stamp affidavits, Form ISR-1/2/4, indemnity bonds, surety documents, and Client Master List verification.',
                  color: 'from-blue-500 to-indigo-600',
                  bg: 'bg-blue-50 border-blue-200',
                },
                {
                  title: 'Transparent & Compliant Execution',
                  desc: 'Direct liaison with Registrar & Transfer Agents (Link Intime, KFintech, Bigshare) and company Nodal Officers without middleman markups.',
                  color: 'from-amber-500 to-orange-600',
                  bg: 'bg-amber-50 border-amber-200',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3.5 p-3 rounded-2xl border ${item.bg} hover:shadow-md transition-all duration-200`}
                >
                  <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shrink-0 mt-0.5 shadow-md`}>
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer hover:scale-102"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>WhatsApp Gopal Singh Parihar</span>
              </button>
              <button
                onClick={handleCall}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer hover:scale-102"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call Helpline: +91 94509 08004</span>
              </button>
            </div>
          </div>

          {/* Pillars of Integrity Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {[
              {
                icon: <Scale className="w-6 h-6 text-blue-600" />,
                iconBg: 'bg-blue-100',
                border: 'border-blue-200 hover:border-blue-500',
                topGrad: 'from-blue-500 to-cyan-500',
                title: 'Ministry of Corporate Affairs Alignment',
                desc: 'All procedural filings strictly follow MCA guidelines, Companies Act Section 124/125, and SEBI circulars for direct Demat crediting.',
              },
              {
                icon: <FileCheck2 className="w-6 h-6 text-purple-600" />,
                iconBg: 'bg-purple-100',
                border: 'border-purple-200 hover:border-purple-500',
                topGrad: 'from-purple-500 to-pink-500',
                title: 'Multi-Point Document Audit',
                desc: 'Every file undergoes systematic checks to prevent rejections due to name mismatches, outdated signatures, or incomplete KYC.',
              },
              {
                icon: <Briefcase className="w-6 h-6 text-emerald-600" />,
                iconBg: 'bg-emerald-100',
                border: 'border-emerald-200 hover:border-emerald-500',
                topGrad: 'from-emerald-500 to-teal-500',
                title: 'RTA & Nodal Officer Liaison',
                desc: 'End-to-end follow-up with registrars (KFin Technologies, Link Intime, Cameo, Bigshare) for verification reports.',
              },
              {
                icon: <Users2 className="w-6 h-6 text-amber-600" />,
                iconBg: 'bg-amber-100',
                border: 'border-amber-200 hover:border-amber-500',
                topGrad: 'from-amber-500 to-orange-500',
                title: 'Client Data Privacy',
                desc: 'Strict non-disclosure. We never request your broker login passwords, Demat PINs, or bank credentials. Total investor protection.',
              },
            ].map((pillar, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-3xl bg-white border-2 ${pillar.border} shadow-md space-y-3 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group`}
              >
                <div className={`h-1.5 w-full absolute top-0 left-0 bg-gradient-to-r ${pillar.topGrad}`} />
                <div className={`w-12 h-12 rounded-2xl ${pillar.iconBg} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                  {pillar.icon}
                </div>
                <h4 className="text-base font-black text-slate-900">{pillar.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}

          </div>

        </div>

        {/* Notice to Investors */}
        <div className="mt-12 p-6 rounded-3xl bg-[#06152B] text-white flex flex-col sm:flex-row items-center justify-between gap-5 border-2 border-amber-400/40 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 shrink-0 shadow-inner">
              <AlertCircle className="w-6 h-6" />
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              <strong className="text-amber-300 font-black">Notice to Investors:</strong> All claims filed with the IEPF Authority are credited directly by the depository (NSDL/CDSL) to your own Demat account. We do not handle your money or shares directly.
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('contact')}
            className="shrink-0 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-lg cursor-pointer"
          >
            Speak With Gopal Singh Parihar
          </button>
        </div>

      </div>
    </section>
  );
};
