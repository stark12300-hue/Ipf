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
    <div className="bg-[#07111E] border-y border-slate-800/80 py-2.5 overflow-hidden select-none relative z-20">
      {/* Left/Right Fade Mask */}
      <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-[#07111E] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-[#07111E] to-transparent z-10 pointer-events-none" />

      <div className="flex items-center">
        {/* Fixed Title Label */}
        <div className="hidden md:flex items-center gap-1.5 px-4 text-[11px] font-bold uppercase tracking-wider text-emerald-400 shrink-0 bg-[#07111E] z-10 border-r border-slate-800">
          <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>Case Updates</span>
        </div>

        {/* Continuous Seamless Scrolling Track */}
        <div className="animate-marquee flex items-center gap-8 text-xs">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2.5 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-slate-300 hover:border-emerald-500/50 transition-colors shrink-0"
            >
              <span
                className={`text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded ${
                  item.tag === 'IEPF Claim'
                    ? 'bg-blue-950 text-blue-300 border border-blue-700/60'
                    : item.tag === 'Dividend Claim'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
                    : item.tag === 'Legal Heir'
                    ? 'bg-purple-950 text-purple-300 border border-purple-700/60'
                    : 'bg-amber-950 text-amber-300 border border-amber-700/60'
                }`}
              >
                {item.tag}
              </span>

              <span className="font-bold text-white tracking-tight">{item.company}</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400 text-[11px]">{item.scope}</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400 font-medium text-[11px] flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
