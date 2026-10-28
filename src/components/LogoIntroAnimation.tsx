import React, { useEffect, useState } from 'react';
import { ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

interface LogoIntroAnimationProps {
  onFinished?: () => void;
  forceShow?: boolean;
}

export const LogoIntroAnimation: React.FC<LogoIntroAnimationProps> = ({
  onFinished,
  forceShow = false,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // If not forced and already shown in this tab session, we can skip or show quickly
    // But user requested: "website open kare toh logo animation aaye"
    // So whenever website opens (new session or reload), show it cleanly!
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 2.5; // reaches 100 in ~2 seconds (40 steps * 50ms)
      });
    }, 50);

    const completeTimeout = setTimeout(() => {
      handleComplete();
    }, 2400);

    return () => {
      clearInterval(timer);
      clearTimeout(completeTimeout);
    };
  }, []);

  const handleComplete = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsOpen(false);
      if (onFinished) {
        onFinished();
      }
    }, 450);
  };

  if (!isOpen) return null;

  return (
    <aside
      aria-label="Website Intro Animation"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-[#051326] via-[#0A2240] to-[#030B17] text-white transition-opacity duration-500 overflow-hidden select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Animated Ambient Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="w-[600px] h-[600px] rounded-full border border-amber-400/10 animate-ping opacity-25" />
        <div className="absolute w-[450px] h-[450px] rounded-full border border-amber-300/20 animate-pulse" />
        <div className="absolute w-[320px] h-[320px] rounded-full bg-gradient-to-tr from-amber-500/10 to-blue-500/10 blur-3xl" />
      </div>

      {/* Skip Button */}
      <button
        onClick={handleComplete}
        className="absolute top-6 right-6 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold backdrop-blur-md border border-white/15 transition-all hover:scale-105 active:scale-95 cursor-pointer z-10"
      >
        <span>Skip</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>

      {/* Main Center Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-lg mx-auto">
        
        {/* Animated Circular Authority Crest */}
        <div className="relative mb-6">
          {/* Rotating Golden Boundary Aura */}
          <div className="absolute -inset-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 opacity-70 blur-md animate-pulse" />
          
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-[#C5A059] via-[#FFD700] to-[#FFFFFF] shadow-2xl transform transition-transform duration-700 animate-in zoom-in-75">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden p-1 shadow-inner">
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Outer Blue Ring */}
                <circle cx="50" cy="50" r="46" stroke="#0A2240" strokeWidth="4" fill="#FFFFFF" />
                <circle cx="50" cy="50" r="41" stroke="#C5A059" strokeWidth="1" strokeDasharray="2 2" fill="none" />

                {/* Circular Text Top */}
                <path id="introPathTop" d="M 17,50 A 33,33 0 1,1 83,50" fill="none" />
                <text fill="#0A2240" fontSize="7" fontWeight="900" letterSpacing="0.8">
                  <textPath href="#introPathTop" startOffset="50%" textAnchor="middle">
                    INVESTOR EDUCATION & PROTECTION
                  </textPath>
                </text>

                {/* Circular Text Bottom */}
                <path id="introPathBottom" d="M 82,53 A 33,33 0 0,1 18,53" fill="none" />
                <text fill="#0A2240" fontSize="6.5" fontWeight="900" letterSpacing="0.6">
                  <textPath href="#introPathBottom" startOffset="50%" textAnchor="middle">
                    FUND AUTHORITY
                  </textPath>
                </text>

                {/* Center Navy Disc */}
                <circle cx="50" cy="50" r="23" fill="#0A2240" />

                {/* Silhouettes */}
                <circle cx="50" cy="37" r="3.2" fill="#FFC107" />
                <circle cx="43" cy="39" r="2.6" fill="#FFFFFF" />
                <circle cx="57" cy="39" r="2.6" fill="#FFFFFF" />

                <path d="M 45 44 C 45 41.5, 55 41.5, 55 44 Z" fill="#FFC107" />
                <path d="M 39 46 C 39 43.5, 47 43.5, 47 46 Z" fill="#FFFFFF" opacity="0.85" />
                <path d="M 53 46 C 53 43.5, 61 43.5, 61 46 Z" fill="#FFFFFF" opacity="0.85" />

                {/* Rupee Symbol */}
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

                {/* Cupped Hands */}
                <path
                  d="M 36 53 C 39 58, 47 62, 50 62 C 53 62, 61 58, 64 53 C 60 56, 54 58, 50 58 C 46 58, 40 56, 36 53 Z"
                  fill="#FFC107"
                />

                {/* Bottom IEPF Badge */}
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
        </div>

        {/* Name with Metallic Gold Shimmer */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-display tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FFF1B8] to-[#C5A059] drop-shadow-md">
          GOPAL SINGH PARIHAR
        </h1>

        {/* Red Ribbon Subtitle */}
        <div className="mt-3.5 inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-red-950/80 border border-red-700/60 shadow-lg text-[11px] sm:text-xs font-black tracking-widest text-red-200 uppercase">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>IEPF Recovery Expert & Business Associate</span>
        </div>

        {/* Central Govt Company Tag */}
        <div className="mt-2.5 px-4 py-1 rounded-lg bg-amber-400 text-slate-950 text-[10px] sm:text-[11px] font-black uppercase tracking-wider shadow-md">
          STOCKHOLDING (A CENTRAL GOVERNMENT COMPANY)
        </div>

        {/* Tagline */}
        <p className="mt-3 text-xs sm:text-sm text-slate-300 font-medium tracking-wide flex items-center justify-center gap-2">
          <span>Securing Investors</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>Securing Futures</span>
        </p>

        {/* Animated Progress Bar */}
        <div className="w-48 sm:w-60 h-1.5 bg-slate-800 rounded-full mt-7 overflow-hidden border border-slate-700/60">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-amber-200 rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-[10px] text-slate-400 tracking-widest mt-2 uppercase">
          पोर्टल प्रारंभ हो रहा है...
        </p>
      </div>

      {/* Statutory Trust Footnote */}
      <div className="absolute bottom-4 text-center text-[10px] text-slate-400/80 px-4">
        Ministry of Corporate Affairs • Government of India • www.iepf.gov.in
      </div>
    </aside>
  );
};
