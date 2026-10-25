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
    <section className="py-20 bg-slate-100 text-slate-800 border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200 text-xs font-bold tracking-wider uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-700 animate-pulse" />
            <span>Interactive Assessment Tool</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight font-display">
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
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Select Your Case Category:</span>
              <span className="text-emerald-700 font-mono text-[11px] font-bold">5 Scenarios</span>
            </h3>

            {SCENARIOS.map((scenario) => {
              const isSelected = scenario.id === selectedScenarioId;
              return (
                <div
                  key={scenario.id}
                  onClick={() => setSelectedScenarioId(scenario.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all duration-200 relative overflow-hidden group ${
                    isSelected
                      ? 'bg-white border-blue-600 shadow-md ring-2 ring-blue-600/20 translate-x-1'
                      : 'bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300 hover:translate-x-0.5'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-blue-600 to-emerald-500" />
                  )}

                  <div className="flex items-start justify-between gap-3 pl-1">
                    <div className="space-y-1">
                      <div className={`text-sm font-bold leading-snug transition-colors ${isSelected ? 'text-blue-900' : 'text-slate-900'}`}>
                        {scenario.label}
                      </div>
                      <div className="text-xs text-slate-500 line-clamp-2">
                        {scenario.description}
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shrink-0 transition-transform ${
                        isSelected ? 'scale-105' : ''
                      } ${
                        scenario.estimatedDifficulty === 'Standard'
                          ? 'bg-emerald-100 text-emerald-800'
                          : scenario.estimatedDifficulty === 'Moderate'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-indigo-100 text-indigo-800'
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
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
            {/* Subtle Top Glow Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500" />

            <div className="border-b border-slate-200 pb-4">
              <div className="flex items-center justify-between text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
                <span>Selected Scenario Overview</span>
                <span className="text-[11px] bg-blue-50 text-blue-800 px-2.5 py-0.5 rounded-full font-bold">
                  {currentScenario.documentsRequired.length} Requirements
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">
                {currentScenario.label}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {currentScenario.description}
              </p>
            </div>

            {/* Forms Required */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Prescribed Statutory Forms:
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentScenario.statutoryForms.map((form, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-900 border border-blue-200 text-xs font-semibold hover:border-blue-300 transition"
                  >
                    <FileText className="w-3.5 h-3.5 text-blue-700" />
                    <span>{form}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Checklist of Supporting Documents */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Document Verification Checklist:
              </h4>
              <ul className="space-y-2">
                {currentScenario.documentsRequired.map((doc, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 p-1.5 rounded-lg hover:bg-slate-50 transition">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Summary Roadmap */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1 hover:border-slate-300 transition">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Procedural Pathway:</span>
              </div>
              <p className="leading-relaxed">{currentScenario.summaryRoadmap}</p>
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
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
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
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                  />
                </div>
              </div>

              <button
                onClick={handleProceedToInquiry}
                className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#0B192C] via-blue-900 to-[#0B192C] hover:from-blue-900 hover:to-indigo-900 text-white font-bold text-xs tracking-wider uppercase transition-all duration-200 shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Assisted Case Review For This Scenario</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
