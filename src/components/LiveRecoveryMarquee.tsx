import React from 'react';
import { ShieldCheck, TrendingUp, CheckCircle, Sparkles, Activity } from 'lucide-react';

interface TickerItem {
  company: string;
  scope: string;
  status: string;
  tag: 'IEPF Claim' | 'Demat KYC' | 'Dividend Claim' | 'Legal Heir';
}

const TICKER_ITEMS: TickerItem[] = [
  { company: 'Reliance Industries Ltd.', scope: '250 Shares Transferred under 7-Yr Rule', status: 'e-Form IEPF-5 Docket Submitted', tag: 'IEPF Claim' },
  { company: 'Tata Motors Limited', scope: '400 Physical Shares (Legacy Certificates)', status: 'Form ISR-4 Duplicate LOC Issued', tag: 'Demat KYC' },
  { company: 'Larsen & Toubro Ltd.', scope: 'Accrued Dividends FY 2017-2024', status: 'RTA Verification Report Sanctioned', tag: 'Dividend Claim' },
  { company: 'ITC Limited', scope: '1,200 Equity Shares (Bonus Accruals)', status: 'MCA SRN Approved & Credited to Demat', tag: 'IEPF Claim' },
  { company: 'Hindustan Unilever Ltd.', scope: 'Deceased Shareholder Intestate Holding', status: 'SEBI Transmission Notice Cleared', tag: 'Legal Heir' },
  { company: 'Asian Paints Ltd.', scope: 'Signature Variation & Name Spelling', status: 'Banker Verification ISR-2 Attested', tag: 'Demat KYC' },
  { company: 'Infosys Limited', scope: 'Bonus & Split Entitlement Reconciliation', status: 'Folio Status Audit Finalized', tag: 'IEPF Claim' },
];

export const LiveRecoveryMarquee: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-[#060D17] via-[#0C1B33] to-[#060D17] border-y border-blue-900/50 py-3 overflow-hidden select-none relative z-20 shadow-inner">
      {/* Left/Right Fade Masks */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#060D17] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#060D17] to-transparent z-10 pointer-events-none" />

      <div className="flex items-center">
        {/* Fixed Title Label with Glowing Pulse */}
        <div className="hidden md:flex items-center gap-2 px-5 text-xs font-black uppercase tracking-wider text-cyan-300 shrink-0 bg-[#060D17]/95 z-10 border-r border-blue-900/60 shadow-lg">
          <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="font-display">Live Desk</span>
        </div>

        {/* Continuous Seamless Scrolling Track */}
        <div className="animate-marquee flex items-center gap-8 text-xs">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 hover:border-cyan-400 text-slate-200 transition-all duration-200 shrink-0 shadow-md hover:scale-105 cursor-default"
            >
              <span
                className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm ${
                  item.tag === 'IEPF Claim'
                    ? 'bg-gradient-to-r from-blue-950 to-cyan-950 text-cyan-300 border border-cyan-500/50'
                    : item.tag === 'Dividend Claim'
                    ? 'bg-gradient-to-r from-emerald-950 to-teal-950 text-emerald-300 border border-emerald-500/50'
                    : item.tag === 'Legal Heir'
                    ? 'bg-gradient-to-r from-purple-950 to-pink-950 text-purple-300 border border-purple-500/50'
                    : 'bg-gradient-to-r from-amber-950 to-orange-950 text-amber-300 border border-amber-500/50'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full animate-ping ${
                    item.tag === 'IEPF Claim'
                      ? 'bg-cyan-400'
                      : item.tag === 'Dividend Claim'
                      ? 'bg-emerald-400'
                      : item.tag === 'Legal Heir'
                      ? 'bg-purple-400'
                      : 'bg-amber-400'
                  }`}
                />
                {item.tag}
              </span>

              <span className="font-extrabold text-white tracking-tight">{item.company}</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300 text-[11px]">{item.scope}</span>
              <span className="text-slate-600">•</span>
              <span className="text-emerald-400 font-bold text-[11px] flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
