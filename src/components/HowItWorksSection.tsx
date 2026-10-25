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
      icon: <Send className="w-5 h-5 text-cyan-400" />,
      detail: 'Includes unique inquiry tracking ID generation for instant status reference.',
      gradient: 'from-cyan-500 to-blue-600',
      badgeColor: 'text-cyan-600 bg-cyan-50 border-cyan-200',
      ringColor: 'group-hover:border-cyan-400',
    },
    {
      number: '02',
      title: 'The team reviews the information',
      description: 'Our case coordinators examine the folio status against MCA / IEPF databases and RTA records to identify statutory requirements and potential bottlenecks.',
      icon: <Search className="w-5 h-5 text-indigo-400" />,
      detail: 'Verifies whether shares are currently lodged with the IEPF Authority or company unpaid dividend ledger.',
      gradient: 'from-indigo-500 to-purple-600',
      badgeColor: 'text-indigo-600 bg-indigo-50 border-indigo-200',
      ringColor: 'group-hover:border-indigo-400',
    },
    {
      number: '03',
      title: 'The customer receives an explanation of the applicable process',
      description: 'We outline the exact statutory route, required SEBI forms (ISR-1/2/4), indemnity requirements, and realistic procedural workflow tailored to your situation.',
      icon: <BookOpen className="w-5 h-5 text-emerald-400" />,
      detail: 'Complete transparency regarding government statutory fees and procedural steps.',
      gradient: 'from-emerald-500 to-teal-600',
      badgeColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      ringColor: 'group-hover:border-emerald-400',
    },
    {
      number: '04',
      title: 'The team provides appropriate assistance and updates',
      description: 'We assist with document drafting, e-Form IEPF-5 filing preparation, RTA coordination, and provide systematic updates until the procedure is finalized.',
      icon: <HeadphonesIcon className="w-5 h-5 text-amber-400" />,
      detail: 'Direct communication via dedicated advisory coordinator on phone and WhatsApp.',
      gradient: 'from-amber-500 to-orange-600',
      badgeColor: 'text-amber-600 bg-amber-50 border-amber-200',
      ringColor: 'group-hover:border-amber-400',
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-slate-50 to-white text-slate-800 border-b border-slate-200 relative overflow-hidden">
      {/* Decorative ambient color spots */}
      <div className="absolute top-1/2 -left-20 w-80 h-80 bg-cyan-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-80 h-80 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-100 via-teal-100 to-cyan-100 border border-emerald-300 text-emerald-950 text-xs font-black tracking-wider uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
            <span>Transparent 4-Step Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B192C] tracking-tight font-display">
            How It Works
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            A clear, structured workflow designed to make complex share recovery procedures transparent and manageable.
          </p>
        </div>

        {/* 4 Steps Grid with Step Timeline Track */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting gradient bar behind steps on large screens */}
          <div className="hidden lg:block absolute top-14 left-16 right-16 h-1 bg-gradient-to-r from-cyan-400 via-indigo-400 via-emerald-400 to-amber-400 z-0 opacity-40 rounded-full" />

          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`relative p-6 rounded-3xl bg-white border-2 border-slate-200 ${step.ringColor} hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group shadow-md z-10`}
            >
              {/* Colorful Top Indicator Ribbon */}
              <div className={`absolute top-0 left-8 right-8 h-1.5 bg-gradient-to-r ${step.gradient} rounded-b-lg shadow-sm`} />

              <div className="space-y-4 pt-2">
                {/* Step Header with Vibrant Gradient Circle */}
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.gradient} text-white flex items-center justify-center font-black text-lg shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    {step.number}
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 shadow-md flex items-center justify-center group-hover:scale-105 transition-transform">
                    {step.icon}
                  </div>
                </div>

                {/* Step Title & Description */}
                <div>
                  <h3 className="text-base font-black text-slate-900 group-hover:text-blue-900 transition-colors leading-snug">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Step Subdetail */}
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-semibold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>{step.detail}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Mandatory Transparency & Anti-Guarantee Disclaimer with Colorful Accents */}
        <div className="mt-12 p-7 rounded-3xl bg-gradient-to-r from-[#060D17] via-[#0E1E38] to-[#060D17] text-white border-2 border-blue-500/30 shadow-2xl hover:border-cyan-400 transition-all duration-300">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4 max-w-3xl">
              <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 shrink-0 shadow-inner">
                <ShieldAlert className="w-6 h-6 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-black text-white tracking-wide uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Important Procedural & Regulatory Disclosure</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We do not promise successful recovery or guaranteed timelines. Government approval processes and share transfers are governed by statutory authorities (IEPF Authority under the Ministry of Corporate Affairs and company Registrars). Veritas provides independent documentation consultancy and lawful liaison services.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto">
              <button
                onClick={() => setCurrentPage('contact')}
                className="w-full lg:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-xs tracking-wider uppercase transition shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Start Step 1 Now</span>
                <ArrowRight className="w-4 h-4 text-cyan-300" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
