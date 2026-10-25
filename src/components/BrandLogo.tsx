import React from 'react';

interface BrandLogoProps {
  variant?: 'navbar' | 'large' | 'footer' | 'iconOnly';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ variant = 'navbar', className = '' }) => {
  const isLarge = variant === 'large';
  const isFooter = variant === 'footer';
  const isIconOnly = variant === 'iconOnly';

  return (
    <div className={`flex items-center gap-3 select-none group ${className}`}>
      {/* Custom Vector Emblem */}
      <div
        className={`relative rounded-xl p-0.5 bg-gradient-to-br from-emerald-400 via-blue-500 to-indigo-600 shadow-md group-hover:shadow-emerald-500/25 transition-all duration-300 group-hover:scale-105 shrink-0 ${
          isLarge ? 'w-14 h-14' : 'w-11 h-11'
        }`}
      >
        {/* Inner Dark Capsule */}
        <div className="w-full h-full bg-[#081322] rounded-[10px] flex items-center justify-center relative overflow-hidden">
          {/* Subtle Diagonal Shimmer */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

          {/* SVG Custom Logo: Shield + Rising Asset Bars + Security Star */}
          <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={isLarge ? 'w-8 h-8' : 'w-6 h-6'}
          >
            {/* Background Shield Path */}
            <path
              d="M20 4L7 9.5V19C7 27.5 12.5 35 20 37C27.5 35 33 27.5 33 19V9.5L20 4Z"
              stroke="url(#shieldGrad)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-80"
            />
            {/* Rising Geometric Stock Pillars / Recovery V-Wing */}
            <path
              d="M13 22L17.5 17L21.5 21L27 14.5"
              stroke="url(#arrowGrad)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Recovery Arrowhead */}
            <path
              d="M23 14.5H27V18.5"
              stroke="#34D399"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Foundation Core Pillar Base */}
            <circle cx="13" cy="22" r="1.8" fill="#60A5FA" />
            <circle cx="17.5" cy="17" r="1.8" fill="#38BDF8" />
            <circle cx="21.5" cy="21" r="1.8" fill="#34D399" />
            <circle cx="27" cy="14.5" r="2" fill="#10B981" />

            <defs>
              <linearGradient id="shieldGrad" x1="7" y1="4" x2="33" y2="37" gradientUnits="userSpaceOnUse">
                <stop stopColor="#38BDF8" />
                <stop offset="0.5" stopColor="#3B82F6" />
                <stop offset="1" stopColor="#10B981" />
              </linearGradient>
              <linearGradient id="arrowGrad" x1="13" y1="22" x2="27" y2="14.5" gradientUnits="userSpaceOnUse">
                <stop stopColor="#60A5FA" />
                <stop offset="0.6" stopColor="#38BDF8" />
                <stop offset="1" stopColor="#34D399" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Typography Brand Mark */}
      {!isIconOnly && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5 leading-none">
            <span
              className={`font-black tracking-tight font-display bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent ${
                isLarge ? 'text-2xl' : 'text-xl'
              }`}
            >
              VERITAS
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/40 shadow-sm">
              IPF
            </span>
          </div>
          <span
            className={`font-semibold tracking-wider uppercase text-slate-400 group-hover:text-slate-300 transition-colors ${
              isLarge ? 'text-xs mt-1' : 'text-[10px] mt-0.5'
            }`}
          >
            Stock Recovery & Advisory
          </span>
        </div>
      )}
    </div>
  );
};
