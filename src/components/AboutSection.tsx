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
    <section className="py-20 bg-white text-slate-800 border-b border-slate-200 relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold tracking-wider uppercase shadow-sm">
            <Building2 className="w-3.5 h-3.5 text-blue-700" />
            <span>Corporate Background & Ethos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight font-display">
            About Our Company
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Professional guidance for shareholders navigating complex corporate actions, IEPF regulations, and share recovery workflows with complete integrity.
          </p>
        </div>

        {/* Narrative & Credentials Grid */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight leading-snug">
              Bridging the Gap Between Shareholders and Statutory Authorities
            </h3>
            
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Every year, thousands of investors discover that their equity shares or accrued dividends have been transferred to the Investor Education and Protection Fund (IEPF) under Section 124(6) of the Companies Act, or remain inaccessible due to lost physical certificates, outdated signatures, or incomplete Demat transmission.
            </p>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              At <strong className="text-slate-900">{config.companyName}</strong>, our advisory team focuses strictly on lawful procedural guidance, accurate document drafting, and systematic follow-up with Registrar and Transfer Agents (RTAs) and company Nodal Officers.
            </p>

            <div className="pt-2 space-y-3">
              {[
                {
                  title: 'Rigorous Folio & Entitlement Verification',
                  desc: 'We inspect company master records and historical corporate actions (splits, bonuses, mergers) to map exact claimant entitlements.',
                },
                {
                  title: 'Standardized Legal & KYC Drafting',
                  desc: 'Preparation of non-judicial stamp affidavits, Form ISR-1/2/4, indemnity bonds, and surety documents conforming to SEBI norms.',
                },
                {
                  title: 'Transparent & Ethical Practice',
                  desc: 'No fabricated success percentages. No false promises of expedited government clearance. Just methodical, compliant execution.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition hover:translate-x-1 duration-200"
                >
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 mt-0.5 shadow-sm">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={() => setCurrentPage('services')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-bold transition border border-blue-200 cursor-pointer hover:scale-102 active:scale-98"
              >
                <span>Explore Our Dedicated Services</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Pillars of Integrity Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {[
              {
                icon: <Scale className="w-5 h-5 text-blue-700" />,
                bg: 'bg-blue-100',
                title: 'Legal Compliance',
                desc: 'All filings strictly follow the Ministry of Corporate Affairs (MCA) guidelines, Companies Act 2013, and SEBI circulars on share dematerialization.',
              },
              {
                icon: <FileCheck2 className="w-5 h-5 text-indigo-700" />,
                bg: 'bg-indigo-100',
                title: 'Document Verification',
                desc: 'Every docket undergoes a multi-point audit to eliminate common errors in signature attestation, Client Master List, and bank branch KYC.',
              },
              {
                icon: <Briefcase className="w-5 h-5 text-emerald-800" />,
                bg: 'bg-emerald-100',
                title: 'RTA Coordination',
                desc: 'Systematic liaison with registrars including Link Intime, KFin Technologies, Cameo, and Bigshare Services for verification report dispatch.',
              },
              {
                icon: <Users2 className="w-5 h-5 text-amber-800" />,
                bg: 'bg-amber-100',
                title: 'Client-First Privacy',
                desc: 'We handle confidential financial paperwork with strict non-disclosure. We never ask for Demat passwords, trading OTPs, or banking access.',
              },
            ].map((pillar, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 hover:border-blue-400 hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300"
              >
                <div className={`w-11 h-11 rounded-xl ${pillar.bg} flex items-center justify-center shadow-inner`}>
                  {pillar.icon}
                </div>
                <h4 className="text-base font-bold text-slate-900">{pillar.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}

          </div>

        </div>

        {/* Ethical Transparency Banner */}
        <div className="mt-12 p-5 rounded-2xl bg-[#0B192C] text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800 shadow-xl hover:border-blue-700/50 transition">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
              <AlertCircle className="w-6 h-6" />
            </div>
            <p className="text-xs text-slate-200">
              <strong className="text-white">Notice to Investors:</strong> Filing claims with the IEPF Authority does not require broker passwords. All recovered shares are credited directly to your registered personal Demat account by the depository (NSDL/CDSL).
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('contact')}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-md cursor-pointer hover:scale-105 active:scale-95"
          >
            Speak With An Advisor
          </button>
        </div>

      </div>
    </section>
  );
};
