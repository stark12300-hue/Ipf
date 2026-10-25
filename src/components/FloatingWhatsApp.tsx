import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const { trackConversion, whatsAppChatUrl } = useApp();
  const [showTooltip, setShowTooltip] = useState(true);

  const handleClick = () => {
    trackConversion('whatsapp_click', 'Floating_Widget');
    window.open(whatsAppChatUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <aside aria-label="WhatsApp Quick Contact" className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Speech Prompt Bubble */}
      {showTooltip && (
        <div className="hidden sm:flex mb-3 bg-white rounded-2xl p-3.5 shadow-xl border border-slate-200 text-xs text-slate-800 max-w-xs relative items-start gap-2.5 animate-fadeIn">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="absolute -top-2 -right-2 p-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 border border-slate-300 cursor-pointer shadow-xs hover:scale-110 transition-transform"
            aria-label="Close tooltip"
          >
            <X className="w-3 h-3" />
          </button>
          
          <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <MessageCircle className="w-4 h-4 fill-emerald-600 text-emerald-600" />
          </div>
          <div>
            <p className="font-bold text-slate-900 leading-tight">
              Inquiring about IPF Shares?
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
              Chat directly with our verified advisory desk on WhatsApp.
            </p>
          </div>
        </div>
      )}

      {/* Main Floating WhatsApp Button - Clean & Simple */}
      <button
        onClick={handleClick}
        className="flex items-center gap-2.5 px-4.5 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-bold text-xs tracking-wide shadow-xl hover:shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        aria-label="Chat with Veritas Advisory on WhatsApp"
        title="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5 fill-slate-950 text-slate-950" />
        <span className="hidden sm:inline font-bold">WhatsApp Advisory</span>
      </button>
    </aside>
  );
};
