import React from 'react';

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
  const isLarge = variant === 'large';
  const isFooter = variant === 'footer';
  const isIconOnly = variant === 'iconOnly';

  return (
    <div className={`flex items-center gap-3 select-none group ${className}`}>
      {/* Premium Multi-Layer Vector Emblem */}
      <div
        className={`relative rounded-2xl p-[1.5px] bg-gradient-to-tr from-cyan-500 via-emerald-400 via-blue-500 to-indigo-500 shadow-[0_0_15px_rgba(56,189,248,0.25)] group-hover:shadow-[0_0_30px_rgba(52,211,153,0.5)] transition-all duration-300 group-hover:scale-105 shrink-0 ${
          isLarge ? 'w-14 h-14' : 'w-11 h-11'
        }`}
      >
        {/* Outer subtle rotating pulse glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-30 group-hover:opacity-75 transition duration-500" />

        {/* Inner Midnight Glass Core */}
        <div className="w-full h-full bg-[#050D1A] rounded-[14px] flex items-center justify-center relative overflow-hidden z-10 border border-white/10">
          
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(56,189,248,0.18),transparent_70%)] pointer-events-none" />

          {/* Diagonal Glass Reflection Sweep */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />

          {/* SVG Vector Emblem: Veritas 'V' Wing + Growth Bars + Security Shield + Star of Trust */}
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${isLarge ? 'w-9 h-9' : 'w-7 h-7'} transform group-hover:rotate-1 transition-transform duration-300`}
          >
            <defs>
              {/* Shield Outline Gradient */}
              <linearGradient id="shieldBorder" x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
                <stop stopColor="#38BDF8" />
                <stop offset="0.45" stopColor="#3B82F6" />
                <stop offset="0.8" stopColor="#34D399" />
                <stop offset="1" stopColor="#F59E0B" />
              </linearGradient>

              {/* V Left Wing Gradient */}
              <linearGradient id="vLeftWing" x1="12" y1="16" x2="24" y2="38" gradientUnits="userSpaceOnUse">
                <stop stopColor="#38BDF8" />
                <stop offset="1" stopColor="#1E40AF" />
              </linearGradient>

              {/* V Right Ascent Wing Gradient */}
              <linearGradient id="vRightWing" x1="24" y1="38" x2="38" y2="10" gradientUnits="userSpaceOnUse">
                <stop stopColor="#3B82F6" />
                <stop offset="0.5" stopColor="#10B981" />
                <stop offset="0.85" stopColor="#34D399" />
                <stop offset="1" stopColor="#FCD34D" />
              </linearGradient>

              {/* Growth Bars Gradients */}
              <linearGradient id="barGrad1" x1="16" y1="28" x2="16" y2="20" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0284C7" />
                <stop offset="1" stopColor="#38BDF8" />
              </linearGradient>
              <linearGradient id="barGrad2" x1="22" y1="32" x2="22" y2="16" gradientUnits="userSpaceOnUse">
                <stop stopColor="#059669" />
                <stop offset="1" stopColor="#34D399" />
              </linearGradient>
              <linearGradient id="barGrad3" x1="28" y1="30" x2="28" y2="12" gradientUnits="userSpaceOnUse">
                <stop stopColor="#D97706" />
                <stop offset="1" stopColor="#FBBF24" />
              </linearGradient>

              {/* Core Star Radial Glow */}
              <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#67E8F9" />
                <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Protective Shield Outer Contour */}
            <path
              d="M24 4.5L9 10.5V22C9 32.5 15.5 40.5 24 43.5C32.5 40.5 39 32.5 39 22V10.5L24 4.5Z"
              stroke="url(#shieldBorder)"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-60 group-hover:opacity-100 transition-opacity"
            />

            {/* Inner Shield Micro-Grid Arc */}
            <path
              d="M24 9L13 14V22C13 29.5 17.8 35.8 24 38.5C30.2 35.8 35 29.5 35 22V14L24 9Z"
              fill="rgba(8, 20, 38, 0.45)"
              stroke="#38BDF8"
              strokeWidth="0.6"
              strokeDasharray="2 2"
              className="opacity-40"
            />

            {/* Ascending Share Capital Growth Pillars in Background */}
            <rect x="15" y="21" width="3" height="9" rx="1.5" fill="url(#barGrad1)" opacity="0.85" />
            <rect x="21" y="16" width="3" height="14" rx="1.5" fill="url(#barGrad2)" opacity="0.9" />
            <rect x="27" y="12" width="3" height="18" rx="1.5" fill="url(#barGrad3)" opacity="0.95" />

            {/* The Veritas "V" Crest Wing (Dynamic Interlocking Polyline) */}
            <path
              d="M13 17L23 35L35 12"
              stroke="url(#vRightWing)"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13 17L23 35"
              stroke="url(#vLeftWing)"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Recovery Ascent Arrowhead Pointer */}
            <path
              d="M29 12H35V18"
              stroke="#FDE047"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Foundation Security Anchor Dot */}
            <circle cx="23" cy="35" r="2.2" fill="#38BDF8" stroke="#050D1A" strokeWidth="1" />
          </svg>
        </div>
      </div>

      {/* Luxury Typography & Statutory Trust Seal */}
      {!isIconOnly && (
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-2 leading-none">
            <span
              className={`font-black tracking-[0.08em] font-display bg-gradient-to-r from-white via-cyan-100 to-slate-200 bg-clip-text text-transparent group-hover:to-cyan-200 transition-all ${
                isLarge ? 'text-2xl sm:text-3xl' : 'text-xl'
              }`}
            >
              VERITAS
            </span>

            {/* Clean Premium IPF Badge */}
            <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-400/30">
              IPF
            </span>
          </div>

          {showSubtitle && (
            <div className="flex items-center gap-1.5 mt-1">
              <span
                className={`font-bold tracking-[0.18em] uppercase text-slate-400 group-hover:text-cyan-300 transition-colors ${
                  isLarge ? 'text-[11px]' : 'text-[9.5px]'
                }`}
              >
                Stock Recovery & Advisory
              </span>
              <span className="text-[10px] text-emerald-400/80 font-bold hidden sm:inline">
                • Verified
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
