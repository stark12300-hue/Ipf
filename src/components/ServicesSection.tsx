import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ServiceItem } from '../types';
import {
  ShieldCheck,
  Compass,
  FileSearch,
  FileText,
  Users,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  FileCheck,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const { config, setCurrentPage, setPreselectedService } = useApp();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-emerald-600" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-blue-600" />;
      case 'FileSearch':
        return <FileSearch className="w-6 h-6 text-indigo-600" />;
      case 'FileText':
        return <FileText className="w-6 h-6 text-amber-600" />;
      case 'Users':
        return <Users className="w-6 h-6 text-purple-600" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-teal-600" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-blue-600" />;
    }
  };

  const handleInquire = (service: ServiceItem) => {
    setPreselectedService(service.title);
    setCurrentPage('contact');
  };

  return (
    <section id="services-section" className="py-20 bg-slate-50 text-slate-800 border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200 text-xs font-bold tracking-wider uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-700" />
            <span>Specialized Financial Advisory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight font-display">
            Our Recovery & Advisory Services
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Methodical procedural support for reclaiming shares from the Investor Education and Protection Fund, resolving folio discrepancies, and completing transmission procedures.
          </p>
        </div>

        {/* Services Grid with CSS Hover Lift */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {config.services.map((service) => {
            const isExpanded = expandedId === service.id;

            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-slate-200 hover:border-blue-400 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden relative group"
              >
                {/* Subtle top accent bar */}
                <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 opacity-80 group-hover:opacity-100 transition-opacity" />

                <div className="p-6 sm:p-7 space-y-4">
                  {/* Service Top Bar */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-blue-50 flex items-center justify-center border border-slate-200 group-hover:border-blue-200 transition-colors shadow-sm">
                      {getIcon(service.iconName)}
                    </div>
                    {service.badge && (
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 shadow-xs">
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Summary */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-900 transition-colors tracking-tight">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {service.summary}
                    </p>
                  </div>

                  {/* Key procedural steps */}
                  <div className="pt-2">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                      Procedural Scope:
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {service.steps.slice(0, 3).map((step, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Expandable Details */}
                  {isExpanded && (
                    <div className="pt-3 border-t border-slate-100 space-y-3 text-xs animate-fadeIn">
                      <div>
                        <h4 className="font-bold text-slate-900 mb-1">Applicable For:</h4>
                        <ul className="list-disc list-inside space-y-1 text-slate-600">
                          {service.whoIsItFor.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 mb-1">Standard Documents:</h4>
                        <ul className="space-y-1 text-slate-600">
                          {service.keyDocuments.map((doc, i) => (
                            <li key={i} className="flex items-center gap-1.5">
                              <FileCheck className="w-3.5 h-3.5 text-blue-600" />
                              <span>{doc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Action Footer */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : service.id)}
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                  >
                    <span>{isExpanded ? 'Less Details' : 'View Checklist'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => handleInquire(service)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0B192C] hover:bg-blue-900 text-white text-xs font-bold transition shadow-sm cursor-pointer hover:scale-105 active:scale-95"
                  >
                    <span>Inquire Now</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informative Guidance Footer */}
        <div className="mt-12 text-center text-xs text-slate-500 max-w-2xl mx-auto">
          Need assistance determining which service fits your specific share folio?{' '}
          <button
            onClick={() => setCurrentPage('assessment')}
            className="text-blue-700 font-bold underline hover:text-blue-900 cursor-pointer"
          >
            Launch the Interactive Case Assessment Tool
          </button>{' '}
          or chat directly with our coordinators on WhatsApp.
        </div>

      </div>
    </section>
  );
};
