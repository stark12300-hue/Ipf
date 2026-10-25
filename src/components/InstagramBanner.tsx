import React from 'react';
import { useApp } from '../context/AppContext';
import { Instagram, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';

export const InstagramBanner: React.FC = () => {
  const { config, trackConversion } = useApp();

  const handleInstagramClick = () => {
    trackConversion('instagram_click', 'Social_Banner');
    window.open(config.instagramUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="py-12 bg-gradient-to-r from-[#405DE6] via-[#833AB4] via-[#E1306C] via-[#FD1D1D] to-[#F77737] text-white border-y border-pink-400/40 relative overflow-hidden shadow-2xl">
      {/* Floating Sparkle Particles */}
      <div className="absolute top-2 left-10 w-3 h-3 bg-white/30 rounded-full animate-float-delay" />
      <div className="absolute bottom-3 right-1/4 w-4 h-4 bg-white/20 rounded-full animate-float" />
      <div className="absolute top-1/2 right-10 w-2 h-2 bg-yellow-300/40 rounded-full animate-pulse-fast" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-2xl shrink-0 group hover:scale-110 hover:rotate-6 transition-all duration-300">
              <Instagram className="w-9 h-9 animate-badge-pop" />
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2.5">
                <h3 className="text-xl font-black text-white font-display tracking-tight drop-shadow-md">
                  Follow {config.companyName} on Instagram
                </h3>
                <span className="text-[11px] uppercase font-black bg-white/25 text-white px-3 py-0.5 rounded-full border border-white/40 backdrop-blur-md shadow-sm">
                  {config.instagramHandle}
                </span>
              </div>
              <p className="text-xs text-white/90 mt-1 max-w-xl font-medium leading-relaxed">
                Stay updated with SEBI circulars, IEPF claim tutorials, common RTA rejection pitfalls, and company announcements.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleInstagramClick}
              className="px-6 py-3.5 rounded-2xl bg-white text-slate-950 font-black text-xs uppercase tracking-wider shadow-2xl flex items-center gap-2.5 hover:scale-108 active:scale-95 transition-all duration-200 cursor-pointer hover:bg-slate-50"
            >
              <Instagram className="w-4 h-4 text-[#E1306C]" />
              <span>Open Instagram Channel</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
