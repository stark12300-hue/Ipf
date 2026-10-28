import React from 'react';
import { useApp } from '../context/AppContext';

interface BrandLogoProps {
  variant?: 'navbar' | 'large' | 'footer' | 'iconOnly';
  className?: string;
  showSubtitle?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'navbar',
  className = '',
  showSubtitle = true,
}) => {
  const { language } = useApp();
  const isLarge = variant === 'large';
  const isFooter = variant === 'footer';
  const isIconOnly = variant === 'iconOnly';

  return (
    <div className={`flex items-center gap-3 select-none group ${className}`}>
      {/* Authentic Circular IEPF Authority Logo Emblem */}
      <div
        className={`relative rounded-full p-[2px] bg-gradient-to-tr from-[#C5A059] via-[#FFB800] to-[#0A2240] shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105 shrink-0 ${
          isLarge ? 'w-14 h-14' : isFooter ? 'w-12 h-12' : 'w-11 h-11'
        }`}
      >
        <div className="w-full h-full bg-white rounded-full flex items-center justify-center relative overflow-hidden border border-[#C5A059]/40 p-0.5">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Blue Ring */}
            <circle cx="50" cy="50" r="46" stroke="#0A2240" strokeWidth="4" fill="#FFFFFF" />
            <circle cx="50" cy="50" r="41" stroke="#C5A059" strokeWidth="1" strokeDasharray="2 2" fill="none" />

            {/* Circular Path for Text */}
            <path
              id="iepfTextPathTop"
              d="M 17,50 A 33,33 0 1,1 83,50"
              fill="none"
            />
            <text fill="#0A2240" fontSize="7" fontWeight="900" letterSpacing="0.8">
              <textPath href="#iepfTextPathTop" startOffset="50%" textAnchor="middle">
                INVESTOR EDUCATION & PROTECTION
              </textPath>
            </text>

            <path
              id="iepfTextPathBottom"
              d="M 82,53 A 33,33 0 0,1 18,53"
              fill="none"
            />
            <text fill="#0A2240" fontSize="6.5" fontWeight="900" letterSpacing="0.6">
              <textPath href="#iepfTextPathBottom" startOffset="50%" textAnchor="middle">
                FUND AUTHORITY
              </textPath>
            </text>

            {/* Center Blue Circle Shield */}
            <circle cx="50" cy="50" r="23" fill="#0A2240" />

            {/* Investor Silhouettes (3 heads/figures) */}
            <circle cx="50" cy="37" r="3.2" fill="#FFC107" />
            <circle cx="43" cy="39" r="2.6" fill="#FFFFFF" />
            <circle cx="57" cy="39" r="2.6" fill="#FFFFFF" />

            {/* People body arcs */}
            <path
              d="M 45 44 C 45 41.5, 55 41.5, 55 44 Z"
              fill="#FFC107"
            />
            <path
              d="M 39 46 C 39 43.5, 47 43.5, 47 46 Z"
              fill="#FFFFFF"
              opacity="0.85"
            />
            <path
              d="M 53 46 C 53 43.5, 61 43.5, 61 46 Z"
              fill="#FFFFFF"
              opacity="0.85"
            />

            {/* Rupee Symbol Badge in Center */}
            <circle cx="50" cy="49" r="4" fill="#C5A059" />
            <text
              x="50"
              y="51.8"
              fill="#0A2240"
              fontSize="4.8"
              fontWeight="900"
              textAnchor="middle"
              fontFamily="system-ui, sans-serif"
            >
              ₹
            </text>

            {/* Protective Cupped Hands underneath */}
            <path
              d="M 36 53 C 39 58, 47 62, 50 62 C 53 62, 61 58, 64 53 C 60 56, 54 58, 50 58 C 46 58, 40 56, 36 53 Z"
              fill="#FFC107"
            />

            {/* Bottom IEPF Bold Text Ribbon */}
            <rect x="33" y="66" width="34" height="9" rx="2" fill="#8B0000" />
            <text
              x="50"
              y="73"
              fill="#FFFFFF"
              fontSize="6.5"
              fontWeight="900"
              letterSpacing="1.2"
              textAnchor="middle"
              fontFamily="system-ui, sans-serif"
            >
              IEPF
            </text>
          </svg>
        </div>
      </div>

      {/* Authority Typography & Statutory Trust Seal */}
      {!isIconOnly && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-2 leading-none">
            <span
              className={`font-black tracking-[0.03em] font-display text-slate-900 group-hover:text-blue-900 transition-all ${
                isLarge ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'
              }`}
            >
              {language === 'hi' ? 'गोपाल सिंह परिहार' : 'GOPAL SINGH PARIHAR'}
            </span>

            {/* Official IEPF Expert Badge */}
            <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 border border-amber-500 shadow-2xs">
              {language === 'hi' ? 'आईईपीएफ विशेषज्ञ' : 'IEPF EXPERT'}
            </span>
          </div>

          {showSubtitle && (
            <div className="flex items-center gap-1.5 mt-1">
              <span
                className={`font-bold tracking-[0.03em] uppercase text-slate-600 group-hover:text-slate-900 transition-colors ${
                  isLarge ? 'text-[11px]' : 'text-[9.5px]'
                }`}
              >
                {language === 'hi'
                  ? 'स्टॉकहोल्डिंग बिजनेस एसोसिएट (केंद्र सरकार की कंपनी)'
                  : 'Stockholding Associate (A Central Govt Co.)'}
              </span>
              <span className="text-[10px] text-emerald-700 font-extrabold hidden sm:inline">
                {language === 'hi' ? '• आईआईटी कल्याणपुर, कानपुर' : '• IIT Kalyanpur, Kanpur'}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
