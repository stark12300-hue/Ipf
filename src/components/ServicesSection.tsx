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
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Service Color Themes mapping
  const serviceThemes: Record<string, {
    border: string;
    hoverBorder: string;
    iconBg: string;
    iconColor: string;
    topGradient: string;
    badgeBg: string;
    badgeText: string;
    badgeBorder: string;
    buttonGradient: string;
  }> = {
    'srv-1': {
      border: 'border-emerald-200',
      hoverBorder: 'hover:border-emerald-500',
      iconBg: 'bg-emerald-50 group-hover:bg-emerald-100',
      iconColor: 'text-emerald-600',
      topGradient: 'from-emerald-400 via-teal-400 to-cyan-500',
      badgeBg: 'bg-emerald-100',
      badgeText: 'text-emerald-800',
      badgeBorder: 'border-emerald-300',
      buttonGradient: 'from-emerald-700 to-teal-700 hover:from-emerald-600 hover:to-teal-600',
    },
    'srv-2': {
      border: 'border-blue-200',
      hoverBorder: 'hover:border-blue-500',
      iconBg: 'bg-blue-50 group-hover:bg-blue-100',
      iconColor: 'text-blue-600',
      topGradient: 'from-blue-500 via-indigo-500 to-cyan-400',
      badgeBg: 'bg-blue-100',
      badgeText: 'text-blue-800',
      badgeBorder: 'border-blue-300',
      buttonGradient: 'from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600',
    },
    'srv-3': {
      border: 'border-purple-200',
      hoverBorder: 'hover:border-purple-500',
      iconBg: 'bg-purple-50 group-hover:bg-purple-100',
      iconColor: 'text-purple-600',
      topGradient: 'from-purple-500 via-fuchsia-500 to-pink-500',
      badgeBg: 'bg-purple-100',
      badgeText: 'text-purple-800',
      badgeBorder: 'border-purple-300',
      buttonGradient: 'from-purple-700 to-fuchsia-700 hover:from-purple-600 hover:to-fuchsia-600',
    },
    'srv-4': {
      border: 'border-amber-200',
      hoverBorder: 'hover:border-amber-500',
      iconBg: 'bg-amber-50 group-hover:bg-amber-100',
      iconColor: 'text-amber-600',
      topGradient: 'from-amber-400 via-orange-400 to-yellow-400',
      badgeBg: 'bg-amber-100',
      badgeText: 'text-amber-800',
      badgeBorder: 'border-amber-300',
      buttonGradient: 'from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-slate-950',
    },
    'srv-5': {
      border: 'border-rose-200',
      hoverBorder: 'hover:border-rose-500',
      iconBg: 'bg-rose-50 group-hover:bg-rose-100',
      iconColor: 'text-rose-600',
      topGradient: 'from-rose-500 via-pink-500 to-purple-500',
      badgeBg: 'bg-rose-100',
      badgeText: 'text-rose-800',
      badgeBorder: 'border-rose-300',
      buttonGradient: 'from-rose-700 to-pink-700 hover:from-rose-600 hover:to-pink-600',
    },
    'srv-6': {
      border: 'border-teal-200',
      hoverBorder: 'hover:border-teal-500',
      iconBg: 'bg-teal-50 group-hover:bg-teal-100',
      iconColor: 'text-teal-600',
      topGradient: 'from-teal-400 via-emerald-400 to-cyan-400',
      badgeBg: 'bg-teal-100',
      badgeText: 'text-teal-800',
      badgeBorder: 'border-teal-300',
      buttonGradient: 'from-teal-700 to-emerald-700 hover:from-teal-600 hover:to-emerald-600',
    },
  };

  const getIcon = (name: string, iconColor: string) => {
    switch (name) {
      case 'ShieldCheck':
        return <ShieldCheck className={`w-6 h-6 ${iconColor}`} />;
      case 'Compass':
        return <Compass className={`w-6 h-6 ${iconColor}`} />;
      case 'FileSearch':
        return <FileSearch className={`w-6 h-6 ${iconColor}`} />;
      case 'FileText':
        return <FileText className={`w-6 h-6 ${iconColor}`} />;
      case 'Users':
        return <Users className={`w-6 h-6 ${iconColor}`} />;
      case 'TrendingUp':
        return <TrendingUp className={`w-6 h-6 ${iconColor}`} />;
      default:
        return <ShieldCheck className={`w-6 h-6 ${iconColor}`} />;
    }
  };

  const handleInquire = (service: ServiceItem) => {
    setPreselectedService(service.title);
    setCurrentPage('contact');
  };

  const filterCategories = ['All', 'Core Recovery', 'Corporate Actions', 'Documentation & Transmission'];

  const filteredServices = config.services.filter((service) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Core Recovery') return service.id === 'srv-1' || service.id === 'srv-6';
    if (activeCategory === 'Corporate Actions') return service.id === 'srv-2' || service.id === 'srv-3';
    if (activeCategory === 'Documentation & Transmission') return service.id === 'srv-4' || service.id === 'srv-5';
    return true;
  });

  return (
    <section id="services-section" className="py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-800 border-b border-slate-200 relative overflow-hidden">
      {/* Decorative colorful ambient background blobs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 text-indigo-950 border border-indigo-200 text-xs font-black tracking-wider uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
            <span>Specialized Financial Advisory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B192C] tracking-tight font-display">
            Our Recovery & Advisory Services
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Methodical procedural support for reclaiming shares from the Investor Education and Protection Fund, resolving folio discrepancies, and completing transmission procedures.
          </p>

          {/* Interactive Filter Pills */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-950/20 scale-105'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid with Multi-Color Theming */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => {
            const isExpanded = expandedId === service.id;
            const theme = serviceThemes[service.id] || serviceThemes['srv-1'];

            return (
              <div
                key={service.id}
                className={`bg-white rounded-3xl border-2 ${theme.border} ${theme.hoverBorder} shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between overflow-hidden relative group`}
              >
                {/* Vivid Top Accent Bar */}
                <div className={`h-2 w-full bg-gradient-to-r ${theme.topGradient}`} />

                <div className="p-6 sm:p-7 space-y-4">
                  {/* Service Top Bar */}
                  <div className="flex items-center justify-between">
                    <div className={`w-14 h-14 rounded-2xl ${theme.iconBg} flex items-center justify-center border border-slate-200 transition-colors shadow-md group-hover:scale-110 group-hover:rotate-3 duration-300`}>
                      {getIcon(service.iconName, theme.iconColor)}
                    </div>
                    {service.badge && (
                      <span className={`text-[11px] font-black px-3 py-1 rounded-full ${theme.badgeBg} ${theme.badgeText} border ${theme.badgeBorder} shadow-xs uppercase tracking-wider`}>
                        {service.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Summary */}
                  <div>
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-900 transition-colors tracking-tight">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {service.summary}
                    </p>
                  </div>

                  {/* Key procedural steps */}
                  <div className="pt-2">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                      <span>Procedural Scope:</span>
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
                    className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>{isExpanded ? 'Less Details' : 'View Checklist'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => handleInquire(service)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r ${theme.buttonGradient} text-white text-xs font-black transition-all shadow-md cursor-pointer hover:scale-106 active:scale-95`}
                  >
                    <span>Inquire Now</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
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
