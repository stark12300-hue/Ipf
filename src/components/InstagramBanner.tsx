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
    <section className="py-12 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-lg shrink-0">
              <Instagram className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <h3 className="text-lg font-bold text-white font-display">
                  Follow {config.companyName} on Instagram
                </h3>
                <span className="text-[10px] uppercase font-bold bg-purple-900/80 text-purple-200 px-2 py-0.5 rounded border border-purple-700/60">
                  {config.instagramHandle}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-xl">
                Stay updated with SEBI circulars, IEPF claim tutorials, common RTA rejection pitfalls, and company announcements.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleInstagramClick}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 hover:scale-[1.02] transition"
            >
              <Instagram className="w-4 h-4" />
              <span>Open Instagram Channel</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
