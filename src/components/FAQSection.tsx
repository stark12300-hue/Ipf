import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  PhoneCall,
  Sparkles,
} from 'lucide-react';

export const FAQSection: React.FC = () => {
  const { config, whatsAppChatUrl, trackConversion } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const categories = ['All', 'General', 'Process', 'Documents', 'Status & Security'];

  const filteredFaqs = config.faqs.filter((faq) => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const handleWhatsApp = () => {
    trackConversion('whatsapp_click', 'FAQ_Section');
    window.open(whatsAppChatUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-20 bg-white text-slate-800 border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold tracking-wider uppercase shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-blue-700" />
            <span>Investor Knowledge Base</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight font-display">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-base leading-relaxed max-w-2xl mx-auto">
            Clear, transparent answers regarding the IPF stock recovery process, required documentation, and verification timeline.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="mt-10 space-y-4">
          <div className="relative max-w-xl mx-auto">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by topic (e.g. documents, IEPF-5, contact, timelines)..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50 focus:bg-white shadow-sm transition"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0B192C] text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="mt-8 space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              No matching questions found for "{searchTerm}". You can chat directly with our coordinators on WhatsApp.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen ? 'border-blue-400 bg-white shadow-md' : 'border-slate-200 bg-slate-50/70 hover:bg-slate-50'
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-bold text-slate-900">
                      {faq.question}
                    </span>
                    <span
                      className={`p-1.5 rounded-full border text-slate-600 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'bg-blue-50 border-blue-200 text-blue-600 rotate-180' : 'bg-white border-slate-200'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white animate-fadeIn">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Bottom Contact Prompt */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-emerald-50 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm hover:border-blue-300 transition">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-sm font-bold text-slate-900">Have a specific case question?</h4>
            <p className="text-xs text-slate-600">Our advisory desk is available on WhatsApp and phone for direct inquiries.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleWhatsApp}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20ba5a] hover:to-[#0f7a6d] text-slate-950 font-bold text-xs flex items-center gap-2 shadow-md cursor-pointer hover:scale-105 active:scale-95 transition"
            >
              <MessageCircle className="w-4 h-4 fill-slate-950" />
              <span>Ask on WhatsApp</span>
            </button>

            <a
              href={`tel:${config.contactNumber.replace(/\s+/g, '')}`}
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold text-xs flex items-center gap-2 shadow-sm hover:scale-105 active:scale-95 transition"
            >
              <PhoneCall className="w-4 h-4 text-blue-600" />
              <span>Call Us</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
