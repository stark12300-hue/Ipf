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
    <div className="bg-slate-100 border-y border-slate-200 py-2.5 overflow-hidden select-none relative z-20">
      {/* Left/Right Fade Masks */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-slate-100 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-slate-100 to-transparent z-10 pointer-events-none" />

      <div className="flex items-center">
        {/* Fixed Title Label */}
        <div className="hidden md:flex items-center gap-2 px-5 text-xs font-black uppercase tracking-wider text-blue-900 shrink-0 bg-slate-100 z-10 border-r border-slate-200">
          <Activity className="w-4 h-4 text-blue-600 animate-pulse" />
          <span className="font-display">Live Desk</span>
        </div>

        {/* Continuous Seamless Scrolling Track */}
        <div className="animate-marquee flex items-center gap-8 text-xs">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-4 py-1.5 rounded-full bg-white border border-slate-200 hover:border-blue-400 text-slate-700 transition-all duration-200 shrink-0 shadow-2xs hover:scale-102 cursor-default"
            >
              <span
                className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-2xs ${
                  item.tag === 'IEPF Claim'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : item.tag === 'Dividend Claim'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : item.tag === 'Legal Heir'
                    ? 'bg-purple-50 text-purple-700 border border-purple-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full animate-ping ${
                    item.tag === 'IEPF Claim'
                      ? 'bg-blue-600'
                      : item.tag === 'Dividend Claim'
                      ? 'bg-emerald-600'
                      : item.tag === 'Legal Heir'
                      ? 'bg-purple-600'
                      : 'bg-amber-600'
                  }`}
                />
                {item.tag}
              </span>

              <span className="font-extrabold text-slate-900 tracking-tight">{item.company}</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600 text-[11px]">{item.scope}</span>
              <span className="text-slate-300">•</span>
              <span className="text-emerald-700 font-bold text-[11px] flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
