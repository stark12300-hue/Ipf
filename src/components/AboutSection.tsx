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
} from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { config, setCurrentPage } = useApp();

  return (
    <section className="py-20 bg-gradient-to-b from-white via-slate-50 to-white text-slate-800 border-b border-slate-200 relative overflow-hidden">
      {/* Decorative background multi-color glow circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 border border-blue-200 text-blue-900 text-xs font-black tracking-wider uppercase shadow-sm">
            <Building2 className="w-3.5 h-3.5 text-blue-700 animate-pulse" />
            <span>Corporate Background & Ethos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B192C] tracking-tight font-display">
            About Our Company
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Professional guidance for shareholders navigating complex corporate actions, IEPF regulations, and share recovery workflows with complete integrity.
          </p>
        </div>

        {/* Narrative & Credentials Grid */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
              Bridging the Gap Between Shareholders and Statutory Authorities
            </h3>
            
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Every year, thousands of investors discover that their equity shares or accrued dividends have been transferred to the Investor Education and Protection Fund (IEPF) under Section 124(6) of the Companies Act, or remain inaccessible due to lost physical certificates, outdated signatures, or incomplete Demat transmission.
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              At <strong className="text-blue-900 font-extrabold">{config.companyName}</strong>, our advisory team focuses strictly on lawful procedural guidance, accurate document drafting, and systematic follow-up with Registrar and Transfer Agents (RTAs) and company Nodal Officers.
            </p>

            <div className="pt-2 space-y-3">
              {[
                {
                  title: 'Rigorous Folio & Entitlement Verification',
                  desc: 'We inspect company master records and historical corporate actions (splits, bonuses, mergers) to map exact claimant entitlements.',
                  color: 'from-emerald-500 to-teal-600',
                  iconColor: 'text-emerald-700',
                  bg: 'bg-emerald-50 border-emerald-200',
                },
                {
                  title: 'Standardized Legal & KYC Drafting',
                  desc: 'Preparation of non-judicial stamp affidavits, Form ISR-1/2/4, indemnity bonds, and surety documents conforming to SEBI norms.',
                  color: 'from-blue-500 to-indigo-600',
                  iconColor: 'text-blue-700',
                  bg: 'bg-blue-50 border-blue-200',
                },
                {
                  title: 'Transparent & Ethical Practice',
                  desc: 'No fabricated success percentages. No false promises of expedited government clearance. Just methodical, compliant execution.',
                  color: 'from-purple-500 to-pink-600',
                  iconColor: 'text-purple-700',
                  bg: 'bg-purple-50 border-purple-200',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3.5 p-3 rounded-2xl border ${item.bg} hover:shadow-md transition-all duration-200 hover:translate-x-1`}
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

            <div className="pt-4">
              <button
                onClick={() => setCurrentPage('services')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-black uppercase tracking-wider transition-all shadow-lg hover:shadow-indigo-950/30 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Explore Our Dedicated Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Pillars of Integrity Cards with 4 Rich Color Schemes */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {[
              {
                icon: <Scale className="w-6 h-6 text-blue-600" />,
                iconBg: 'bg-blue-100',
                border: 'border-blue-200 hover:border-blue-500',
                topGrad: 'from-blue-500 to-cyan-500',
                title: 'Legal Compliance',
                desc: 'All filings strictly follow the Ministry of Corporate Affairs (MCA) guidelines, Companies Act 2013, and SEBI circulars on share dematerialization.',
              },
              {
                icon: <FileCheck2 className="w-6 h-6 text-purple-600" />,
                iconBg: 'bg-purple-100',
                border: 'border-purple-200 hover:border-purple-500',
                topGrad: 'from-purple-500 to-pink-500',
                title: 'Document Verification',
                desc: 'Every docket undergoes a multi-point audit to eliminate common errors in signature attestation, Client Master List, and bank branch KYC.',
              },
              {
                icon: <Briefcase className="w-6 h-6 text-emerald-600" />,
                iconBg: 'bg-emerald-100',
                border: 'border-emerald-200 hover:border-emerald-500',
                topGrad: 'from-emerald-500 to-teal-500',
                title: 'RTA Coordination',
                desc: 'Systematic liaison with registrars including Link Intime, KFin Technologies, Cameo, and Bigshare Services for verification report dispatch.',
              },
              {
                icon: <Users2 className="w-6 h-6 text-amber-600" />,
                iconBg: 'bg-amber-100',
                border: 'border-amber-200 hover:border-amber-500',
                topGrad: 'from-amber-500 to-orange-500',
                title: 'Client-First Privacy',
                desc: 'We handle confidential financial paperwork with strict non-disclosure. We never ask for Demat passwords, trading OTPs, or banking access.',
              },
            ].map((pillar, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-3xl bg-white border-2 ${pillar.border} shadow-md space-y-3 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group`}
              >
                <div className={`h-1.5 w-full absolute top-0 left-0 bg-gradient-to-r ${pillar.topGrad}`} />
                <div className={`w-12 h-12 rounded-2xl ${pillar.iconBg} flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  {pillar.icon}
                </div>
                <h4 className="text-base font-black text-slate-900">{pillar.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}

          </div>

        </div>

        {/* Ethical Transparency Banner with Aurora Styling */}
        <div className="mt-14 p-6 rounded-3xl bg-gradient-to-r from-[#060D17] via-[#0E1E38] to-[#060D17] text-white flex flex-col sm:flex-row items-center justify-between gap-5 border-2 border-emerald-500/30 shadow-2xl hover:border-emerald-400 transition-all duration-300">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 shrink-0 shadow-inner">
              <AlertCircle className="w-6 h-6 animate-pulse" />
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              <strong className="text-emerald-300 font-black">Notice to Investors:</strong> Filing claims with the IEPF Authority does not require broker passwords. All recovered shares are credited directly to your registered personal Demat account by the depository (NSDL/CDSL).
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('contact')}
            className="shrink-0 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider transition shadow-xl hover:scale-106 active:scale-95 cursor-pointer"
          >
            Speak With An Advisor
          </button>
        </div>

      </div>
    </section>
  );
};
