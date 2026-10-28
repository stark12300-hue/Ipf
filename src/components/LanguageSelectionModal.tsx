import React from 'react';
import { useApp } from '../context/AppContext';
import { Globe, Check, ShieldCheck, Sparkles } from 'lucide-react';
import { Language } from '../translations/translations';

interface LanguageSelectionModalProps {
  isOpen: boolean;
  onSelectLanguage: (lang: Language) => void;
}

export const LanguageSelectionModal: React.FC<LanguageSelectionModalProps> = ({
  isOpen,
  onSelectLanguage,
}) => {
  const { showToast } = useApp();

  if (!isOpen) return null;

  const handleSelect = (lang: Language) => {
    onSelectLanguage(lang);
    showToast({
      type: 'success',
      title: lang === 'hi' ? 'भाषा सेट की गई: हिंदी' : 'Language Selected: English',
      message:
        lang === 'hi'
          ? 'आप बाद में भी ऊपर नेविगेशन बार से भाषा बदल सकते हैं।'
          : 'You can change your preferred language anytime from the top bar.',
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lang-modal-title"
      className="fixed inset-0 z-[95] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-300"
    >
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border-2 border-[#C5A059]/40 overflow-hidden transform animate-in zoom-in-95 duration-200">
        {/* Decorative Top Banner */}
        <div className="bg-gradient-to-r from-[#0A2240] via-[#0E3566] to-[#0A2240] text-white p-6 text-center relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-amber-400/20 blur-xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-blue-400/20 blur-lg pointer-events-none" />

          {/* Icon Badge */}
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-3 shadow-inner">
            <Globe className="w-6 h-6 text-amber-400 animate-pulse" />
          </div>

          <h2 id="lang-modal-title" className="text-xl sm:text-2xl font-black font-display tracking-tight text-white">
            भाषा चुनें / Select Language
          </h2>
          <p className="text-xs text-amber-200/90 mt-1 font-medium">
            गोपाल सिंह परिहार - आईईपीएफ रिकवरी विशेषज्ञ पोर्टल
          </p>
          <p className="text-[11px] text-slate-300 mt-0.5">
            Gopal Singh Parihar - Official Investor Portal
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 bg-white">
          <p className="text-xs text-center text-slate-600 font-medium">
            कृपया अपनी पसंदीदा भाषा का चयन करें (यह केवल एक बार पूछा जाएगा):
            <br />
            <span className="text-[11px] text-slate-400">
              Please choose your preferred language (asked only once):
            </span>
          </p>

          <div className="grid grid-cols-1 gap-3.5">
            {/* Hindi Option */}
            <button
              onClick={() => handleSelect('hi')}
              className="w-full group p-4 rounded-xl border-2 border-slate-200 hover:border-amber-500 bg-slate-50/50 hover:bg-amber-50/60 transition-all duration-200 text-left flex items-start gap-3.5 shadow-xs hover:shadow-md cursor-pointer hover:scale-[1.01]"
            >
              <div className="text-2xl shrink-0 mt-0.5">🇮🇳</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-base font-black text-slate-900 group-hover:text-amber-950 font-display">
                    हिंदी (Hindi)
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                    अनुशंसित
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  शेयर व डिविडेंड रिकवरी, प्रक्रिया चरण और सरकारी नियमों की पूरी जानकारी हिंदी में पढ़ें।
                </p>
              </div>
            </button>

            {/* English Option */}
            <button
              onClick={() => handleSelect('en')}
              className="w-full group p-4 rounded-xl border-2 border-slate-200 hover:border-blue-500 bg-slate-50/50 hover:bg-blue-50/60 transition-all duration-200 text-left flex items-start gap-3.5 shadow-xs hover:shadow-md cursor-pointer hover:scale-[1.01]"
            >
              <div className="text-2xl shrink-0 mt-0.5">🇬🇧</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-base font-black text-slate-900 group-hover:text-blue-950 font-display">
                    English
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-300">
                    Official
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Explore IEPF recovery workflow, 8 specialized services, forms, and legal checklist in English.
                </p>
              </div>
            </button>
          </div>

          <div className="pt-2 text-center">
            <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>आप कभी भी शीर्ष मेनू से भाषा बदल सकते हैं • Stockholding Associate</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
