import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getFaqsList } from '../translations/contentData';
import { ScrollReveal } from './ScrollReveal';
import {
  HelpCircle,
  Search,
  ChevronDown,
  MessageCircle,
  PhoneCall,
  Sparkles,
} from 'lucide-react';

export const FAQSection: React.FC = () => {
  const { config, whatsAppChatUrl, trackConversion, language } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const categories = ['All', 'General', 'Process', 'Documents', 'Status & Security'];

  const categoryLabels: Record<string, { en: string; hi: string }> = {
    All: { en: 'All Questions', hi: 'सभी प्रश्न' },
    General: { en: 'General', hi: 'सामान्य' },
    Process: { en: 'Process Flow', hi: 'प्रक्रिया' },
    Documents: { en: 'Documents', hi: 'दस्तावेज' },
    'Status & Security': { en: 'Status & Security', hi: 'सुरक्षा एवं स्थिति' },
  };

  const allFaqs = getFaqsList(language);

  const filteredFaqs = allFaqs.filter((faq) => {
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
    const msg = language === 'hi'
      ? 'नमस्ते गोपाल सिंह परिहार जी, मुझे आईईपीएफ एवं शेयरों की प्रक्रिया के संबंध में जानकारी चाहिए।'
      : 'Hello Gopal Singh Parihar Sir, I have a question regarding IEPF recovery.';
    window.open(`https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  const categoryThemes: Record<string, string> = {
    All: 'from-blue-600 to-indigo-600 text-white',
    General: 'from-blue-500 to-cyan-500 text-white',
    Process: 'from-emerald-500 to-teal-500 text-white',
    Documents: 'from-amber-500 to-orange-500 text-white',
    'Status & Security': 'from-purple-500 to-pink-500 text-white',
  };

  return (
    <section id="faqs-section" className="py-16 sm:py-20 bg-gradient-to-b from-white via-slate-50 to-white text-slate-800 border-b border-slate-200 relative overflow-hidden scroll-mt-24">
      {/* Decorative ambient glows */}
      <div className="absolute top-1/3 -left-20 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-2/3 -right-20 w-80 h-80 bg-purple-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with ScrollReveal */}
        <ScrollReveal direction="down" duration={700}>
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 text-indigo-950 border border-indigo-200 text-xs font-black tracking-wider uppercase shadow-sm">
              <HelpCircle className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
              <span>{language === 'hi' ? 'निवेशक ज्ञान केंद्र' : 'Investor Knowledge Base'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B192C] tracking-tight font-display">
              {language === 'hi' ? 'अक्सर पूछे जाने वाले महत्वपूर्ण प्रश्न (FAQs)' : 'Frequently Asked Questions'}
            </h2>
            <p className="text-slate-600 text-base leading-relaxed max-w-2xl mx-auto">
              {language === 'hi'
                ? 'आईईपीएफ में फंसे शेयरों की वसूली प्रक्रिया, आवश्यक दस्तावेजों और सत्यापन समय सीमा के बारे में स्पष्ट एवं प्रामाणिक उत्तर।'
                : 'Clear, transparent answers regarding the IEPF stock recovery process, required documentation, and verification timeline.'}
            </p>
          </div>
        </ScrollReveal>

        {/* Search & Colorful Filter Controls with ScrollReveal */}
        <ScrollReveal direction="up" delay={80} duration={650}>
          <div className="mt-10 space-y-4">
            <div className="relative max-w-xl mx-auto">
              <Search className="w-5 h-5 text-indigo-500 absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={
                  language === 'hi'
                    ? 'विषय द्वारा खोजें (जैसे दस्तावेज, IEPF-5, प्रक्रिया, समय-सीमा)...'
                    : 'Search by topic (e.g. documents, IEPF-5, contact, timelines)...'
                }
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-slate-200 text-sm focus:outline-none focus:border-blue-500 bg-white shadow-md focus:shadow-xl transition-all"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                const label = categoryLabels[cat] ? categoryLabels[cat][language] : cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all duration-200 cursor-pointer ${
                      isActive
                        ? `bg-gradient-to-r ${categoryThemes[cat] || 'from-blue-600 to-indigo-600 text-white'} shadow-lg scale-105`
                        : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* FAQs Accordion with Staggered ScrollReveal */}
        <div className="mt-10 space-y-3.5">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
              {language === 'hi'
                ? `"${searchTerm}" के लिए कोई प्रश्न नहीं मिला। आप सीधे हमारे विशेषज्ञ से व्हाट्सएप पर संपर्क कर सकते हैं।`
                : `No matching questions found for "${searchTerm}". You can chat directly with our coordinators on WhatsApp.`}
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openFaqId === faq.id;
              const borderColors = [
                'border-l-blue-500',
                'border-l-emerald-500',
                'border-l-purple-500',
                'border-l-amber-500',
                'border-l-teal-500',
                'border-l-rose-500',
              ];
              const leftColor = borderColors[index % borderColors.length];

              return (
                <ScrollReveal
                  key={faq.id}
                  direction="up"
                  delay={Math.min(index * 60, 300)}
                  duration={500}
                >
                  <div
                    className={`rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? `border-blue-400 bg-white shadow-xl ${leftColor} border-l-4`
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                        {faq.question}
                      </span>
                      <span
                        className={`p-2 rounded-xl border shrink-0 transition-all duration-300 ${
                          isOpen
                            ? 'bg-gradient-to-br from-blue-600 to-indigo-600 text-white border-blue-500 rotate-180 shadow-md'
                            : 'bg-slate-100 border-slate-200 text-slate-600'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50 animate-fadeIn">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })
          )}
        </div>

        {/* Bottom Contact Prompt with Aurora Gradient & ScrollReveal */}
        <ScrollReveal direction="zoom" delay={150} duration={650}>
          <div className="mt-14 p-7 rounded-3xl bg-gradient-to-r from-blue-100 via-indigo-100 to-emerald-100 border-2 border-indigo-200 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-lg hover:shadow-xl transition-all">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-base font-black text-indigo-950 flex items-center gap-2 justify-center sm:justify-start">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>
                  {language === 'hi' ? 'क्या आपका कोई विशिष्ट केस या सवाल है?' : 'Have a specific case question?'}
                </span>
              </h4>
              <p className="text-xs text-slate-700 font-medium">
                {language === 'hi'
                  ? 'सीधे परामर्श के लिए हमारा सहायता डेस्क व्हाट्सएप और फोन पर हमेशा उपलब्ध है।'
                  : 'Our advisory desk is available on WhatsApp and phone for direct inquiries.'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleWhatsApp}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#25D366] via-[#10B981] to-[#059669] hover:from-[#20ba5a] hover:to-[#047857] text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg cursor-pointer hover:scale-106 active:scale-95 transition"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>{language === 'hi' ? 'व्हाट्सएप पर पूछें' : 'Ask on WhatsApp'}</span>
              </button>

              <a
                href={`tel:${config.contactNumber.replace(/\s+/g, '')}`}
                className="px-5 py-3 rounded-xl bg-white border-2 border-blue-300 hover:border-blue-500 text-blue-950 font-black text-xs flex items-center gap-2 shadow-md hover:scale-106 active:scale-95 transition"
              >
                <PhoneCall className="w-4 h-4 text-blue-600 animate-pulse" />
                <span>{language === 'hi' ? 'हमें कॉल करें' : 'Call Us'}</span>
              </a>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

