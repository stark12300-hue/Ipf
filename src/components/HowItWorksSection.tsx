import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Send,
  Search,
  BookOpen,
  HeadphonesIcon,
  ShieldAlert,
  ArrowRight,
  MessageCircle,
  Sparkles,
} from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const { setCurrentPage, whatsAppChatUrl, trackConversion } = useApp();

  const steps = [
    {
      number: '01',
      title: 'Customer submits an inquiry',
      description: 'Provide basic details about the company shares, certificate or folio number, and your contact information through our secure website form, WhatsApp, or phone.',
      icon: <Send className="w-5 h-5 text-blue-600" />,
      detail: 'Includes unique inquiry tracking ID generation for instant status reference.',
    },
    {
      number: '02',
      title: 'The team reviews the information',
      description: 'Our case coordinators examine the folio status against MCA / IEPF databases and RTA records to identify statutory requirements and potential bottlenecks.',
      icon: <Search className="w-5 h-5 text-indigo-600" />,
      detail: 'Verifies whether shares are currently lodged with the IEPF Authority or company unpaid dividend ledger.',
    },
    {
      number: '03',
      title: 'The customer receives an explanation of the applicable process',
      description: 'We outline the exact statutory route, required SEBI forms (ISR-1/2/4), indemnity requirements, and realistic procedural workflow tailored to your situation.',
      icon: <BookOpen className="w-5 h-5 text-emerald-600" />,
      detail: 'Complete transparency regarding government statutory fees and procedural steps.',
    },
    {
      number: '04',
      title: 'The team provides appropriate assistance and updates',
      description: 'We assist with document drafting, e-Form IEPF-5 filing preparation, RTA coordination, and provide systematic updates until the procedure is finalized.',
      icon: <HeadphonesIcon className="w-5 h-5 text-teal-600" />,
      detail: 'Direct communication via dedicated advisory coordinator on phone and WhatsApp.',
    },
  ];

  return (
    <section className="py-20 bg-white text-slate-800 border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wider uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Transparent 4-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight font-display">
            How It Works
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            A clear, structured workflow designed to make complex share recovery procedures transparent and manageable.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:bg-white hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group shadow-sm"
            >
              {/* Subtle top indicator bar */}
              <div className="absolute top-0 left-6 right-6 h-1 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-b opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="space-y-4">
                {/* Step Header */}
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-slate-300 group-hover:text-blue-600 transition-colors font-display">
                    {step.number}
                  </span>
                  <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                </div>

                {/* Step Title & Description */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors leading-snug">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Step Subdetail */}
              <div className="mt-4 pt-3 border-t border-slate-200/80 text-[11px] text-slate-500 font-medium">
                {step.detail}
              </div>
            </div>
          ))}
        </div>

        {/* Mandatory Transparency & Anti-Guarantee Disclaimer */}
        <div className="mt-12 p-6 rounded-2xl bg-[#0B192C] text-white border border-slate-800 shadow-xl hover:border-blue-700/40 transition">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-start gap-3.5 max-w-3xl">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white tracking-wide uppercase">
                  Important Procedural & Regulatory Disclosure
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We do not promise successful recovery or guaranteed timelines. Government approval processes and share transfers are governed by statutory authorities (IEPF Authority under the Ministry of Corporate Affairs and company Registrars). Veritas provides independent documentation consultancy and lawful liaison services.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto">
              <button
                onClick={() => setCurrentPage('contact')}
                className="w-full lg:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs tracking-wider uppercase transition shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Start Step 1 Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
