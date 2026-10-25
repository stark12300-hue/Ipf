import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Building,
  HelpCircle,
  FileCheck2,
  RefreshCw,
  Sparkles,
  Layers,
} from 'lucide-react';

interface Scenario {
  id: string;
  label: string;
  description: string;
  statutoryForms: string[];
  documentsRequired: string[];
  estimatedDifficulty: 'Standard' | 'Moderate' | 'Complex';
  summaryRoadmap: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'iepf-shares',
    label: 'Shares transferred to IEPF under 7-year unpaid dividend rule',
    description: 'You missed dividend payments for 7 consecutive years, and the company has transferred your shares to the government IEPF Authority.',
    statutoryForms: ['e-Form IEPF-5 (MCA V3)', 'Form ISR-1 (KYC registration)', 'Form ISR-2 (Bank signature attestation)'],
    documentsRequired: [
      'Client Master List (CML) of active Demat account with depository seal',
      'Original share certificates or indemnity bond for lost certificates',
      'Cancelled cheque with printed name & IFSC code',
      'Self-attested PAN and Aadhaar copies',
      'Indemnity Bond on non-judicial stamp paper as prescribed',
    ],
    estimatedDifficulty: 'Moderate',
    summaryRoadmap: 'Requires filing e-Form IEPF-5 on the MCA portal, generating an SRN, submitting physical documentation docket to company Nodal Officer and RTA within 30 days, and tracking verification report.',
  },
  {
    id: 'lost-certificates',
    label: 'Original physical share certificates lost or destroyed',
    description: 'You or your family hold registered shares, but the original physical share certificates are misplaced, damaged, or lost.',
    statutoryForms: ['Form ISR-4 (Request for duplicate certificates)', 'Form ISR-1 & ISR-2', 'Police FIR / Lost Certificate Affidavit'],
    documentsRequired: [
      'Copy of Police FIR / General Diary entry citing lost share certificates',
      'Affidavit & Indemnity bond on non-judicial stamp paper by registered holder',
      'Public notice in English & regional newspaper (if threshold exceeded)',
      'Client Master List (CML) for mandatory dematerialization credit',
    ],
    estimatedDifficulty: 'Complex',
    summaryRoadmap: 'RTA issues a Letter of Confirmation (LOC) in lieu of duplicate certificates. You then submit demat request form (DRF) to your Depository Participant within 120 days.',
  },
  {
    id: 'deceased-holder',
    label: 'Deceased shareholder (transmission to legal heirs / spouse)',
    description: 'The registered shareholder has passed away, and heirs need to transmit shares to legal heir Demat accounts without existing nomination.',
    statutoryForms: ['Form ISR-5 (Transmission request)', 'No-Objection Certificate (NOC) by legal co-heirs', 'Surety Affidavit'],
    documentsRequired: [
      'Notarized copy of Death Certificate of the deceased holder',
      'Legal Heir Certificate or Succession Certificate / Probate of Will (based on market value)',
      'KYC documents (PAN, Aadhaar, CML) of all claiming legal heirs',
      'Indemnity bond from claimants and solvent sureties',
    ],
    estimatedDifficulty: 'Complex',
    summaryRoadmap: 'Transmission is governed by SEBI simplified limits (up to INR 5,00,000 without succession certificate for physical shares; higher for demat). Documents are verified by RTA and company board.',
  },
  {
    id: 'name-mismatch',
    label: 'Name mismatch between share certificate and current PAN / Aadhaar',
    description: 'Minor or major spelling discrepancies, maiden vs married name changes, or middle name omissions preventing dematerialization.',
    statutoryForms: ['Form ISR-1 (KYC updating)', 'Name Mismatch Affidavit', 'Form ISR-2'],
    documentsRequired: [
      'Gazette notification or Marriage Certificate (for surname change after marriage)',
      'Affidavit on stamp paper declaring both names belong to the same person',
      'Self-attested copies of both old and updated government photo IDs',
    ],
    estimatedDifficulty: 'Standard',
    summaryRoadmap: 'Requires updating company records via Form ISR-1 with supporting affidavit and banker signature attestation before submitting dematerialization or IEPF claim.',
  },
  {
    id: 'unclaimed-dividends',
    label: 'Unclaimed dividends only (shares still in demat or physical)',
    description: 'Shares are intact in your portfolio, but older dividend warrants (under 7 years) were unencashed or returned by postal services.',
    statutoryForms: ['Letter of Request to Company RTA', 'Form ISR-1 / Banker Mandate'],
    documentsRequired: [
      'Proof of shareholding (Demat holding statement or certificate copy)',
      'Updated bank account mandate with cancelled cheque',
      'Original expired dividend warrants (if in possession)',
    ],
    estimatedDifficulty: 'Standard',
    summaryRoadmap: 'Direct electronic credit (NEFT/NACH) from the company upon verification of current bank mandate, without needing IEPF-5 if under the 7-year mark.',
  },
];

export const CaseAssessmentTool: React.FC = () => {
  const { setCurrentPage, setPreselectedService } = useApp();
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(SCENARIOS[0].id);
  const [companyNameInput, setCompanyNameInput] = useState('');
  const [sharesInput, setSharesInput] = useState('');

  const currentScenario = SCENARIOS.find((s) => s.id === selectedScenarioId) || SCENARIOS[0];

  const handleProceedToInquiry = () => {
    let msg = `Case Assessment Inquiry: ${currentScenario.label}. `;
    if (companyNameInput) msg += `Company: ${companyNameInput}. `;
    if (sharesInput) msg += `Shares: approx ${sharesInput}. `;
    msg += `Need assistance navigating documentation and RTA submission.`;

    setPreselectedService(currentScenario.label);
    setCurrentPage('contact');
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-100 via-blue-50/40 to-slate-100 text-slate-800 border-b border-slate-200 relative overflow-hidden">
      {/* Dynamic ambient color glows */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 text-indigo-950 border border-indigo-200 text-xs font-black tracking-wider uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
            <span>Interactive Assessment Tool</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B192C] tracking-tight font-display">
            Check Your Case Status & Required Documents
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Select the situation that best matches your holding to review the applicable statutory roadmap and document requirements before lodging an inquiry.
          </p>
        </div>

        {/* Assessment Interface */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Step 1: Scenario Selector */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-black text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Select Your Case Category:</span>
              <span className="text-indigo-600 font-mono text-[11px] font-bold bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">5 Scenarios</span>
            </h3>

            {SCENARIOS.map((scenario) => {
              const isSelected = scenario.id === selectedScenarioId;
              return (
                <div
                  key={scenario.id}
                  onClick={() => setSelectedScenarioId(scenario.id)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 relative overflow-hidden group ${
                    isSelected
                      ? 'bg-white border-blue-600 shadow-xl ring-4 ring-blue-500/20 translate-x-1.5 scale-[1.01]'
                      : 'bg-white/90 border-slate-200 hover:bg-white hover:border-blue-400 hover:translate-x-1 hover:shadow-md'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-gradient-to-b from-blue-600 via-indigo-600 to-emerald-500" />
                  )}

                  <div className="flex items-start justify-between gap-3 pl-1.5">
                    <div className="space-y-1">
                      <div className={`text-sm font-black leading-snug transition-colors ${isSelected ? 'text-blue-900' : 'text-slate-900'}`}>
                        {scenario.label}
                      </div>
                      <div className="text-xs text-slate-500 line-clamp-2">
                        {scenario.description}
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 transition-transform shadow-xs ${
                        isSelected ? 'scale-110 shadow-sm' : ''
                      } ${
                        scenario.estimatedDifficulty === 'Standard'
                          ? 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 border border-emerald-300'
                          : scenario.estimatedDifficulty === 'Moderate'
                          ? 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border border-amber-300'
                          : 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-300'
                      }`}
                    >
                      {scenario.estimatedDifficulty}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Step 2: Detailed Roadmap & Checklist Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl border-2 border-blue-200 shadow-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
            {/* Vivid Top Glow Accent */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-purple-600 via-pink-500 to-emerald-400 animate-shimmer" />

            <div className="border-b border-slate-200 pb-4">
              <div className="flex items-center justify-between text-xs font-black text-blue-700 uppercase tracking-wider mb-1">
                <span>Selected Scenario Overview</span>
                <span className="text-[11px] bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-900 px-3 py-1 rounded-full font-black border border-blue-200 shadow-xs">
                  {currentScenario.documentsRequired.length} Requirements
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                {currentScenario.label}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {currentScenario.description}
              </p>
            </div>

            {/* Forms Required with colorful tags */}
            <div className="space-y-2">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span>Prescribed Statutory Forms:</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentScenario.statutoryForms.map((form, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-950 border border-blue-300 text-xs font-bold hover:scale-105 transition-transform shadow-xs"
                  >
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    <span>{form}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Checklist of Supporting Documents with colorful checkmarks */}
            <div className="space-y-2">
              <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>Document Verification Checklist:</span>
              </h4>
              <ul className="space-y-2">
                {currentScenario.documentsRequired.map((doc, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs text-slate-700 p-2 rounded-xl bg-slate-50/80 hover:bg-emerald-50/50 hover:text-slate-900 border border-transparent hover:border-emerald-200 transition-all">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Summary Roadmap */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/80 to-indigo-50/80 border border-blue-200 text-xs text-slate-700 space-y-1 shadow-sm">
              <div className="font-black text-blue-950 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Procedural Pathway:</span>
              </div>
              <p className="leading-relaxed pl-6">{currentScenario.summaryRoadmap}</p>
            </div>

            {/* Quick Consultation Builder */}
            <div className="pt-2 border-t border-slate-200 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Company / Stock Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={companyNameInput}
                    onChange={(e) => setCompanyNameInput(e.target.value)}
                    placeholder="e.g. Reliance, ITC, Tata Motors"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50 focus:bg-white transition"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Approximate Quantity (Optional)
                  </label>
                  <input
                    type="text"
                    value={sharesInput}
                    onChange={(e) => setSharesInput(e.target.value)}
                    placeholder="e.g. 150 shares"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50 focus:bg-white transition"
                  />
                </div>
              </div>

              <button
                onClick={handleProceedToInquiry}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black text-xs tracking-wider uppercase transition-all duration-200 shadow-xl hover:shadow-indigo-950/40 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Request Assisted Case Review For This Scenario</span>
                <ArrowRight className="w-4 h-4 text-cyan-200" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
