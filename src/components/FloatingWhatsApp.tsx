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
        <div className="hidden sm:flex mb-2.5 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border border-slate-200 text-xs text-slate-800 max-w-xs relative items-start gap-3 animate-fadeIn">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="absolute -top-1.5 -right-1.5 p-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 border border-slate-300 cursor-pointer shadow-xs"
            aria-label="Close tooltip"
          >
            <X className="w-3 h-3" />
          </button>
          
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 mt-1 animate-ping" />
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

      {/* Main Floating WhatsApp Button with Breathing/Pulsing Animation */}
      <button
        onClick={handleClick}
        className="flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#20ba5a] text-slate-950 font-extrabold text-sm shadow-2xl shadow-emerald-950/40 hover:scale-108 active:scale-95 transition-all duration-300 cursor-pointer group"
        aria-label="Chat with Veritas Advisory on WhatsApp"
        title="Chat on WhatsApp"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-900" />
        </span>
        <MessageCircle className="w-5 h-5 fill-slate-950 text-[#25D366]" />
        <span className="hidden sm:inline tracking-wide font-display">WhatsApp Advisory</span>
      </button>
    </aside>
  );
};
