import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Lock, AlertTriangle, ArrowRight } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  const { config, setCurrentPage } = useApp();

  return (
    <div className="py-16 bg-white text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="border-b border-slate-200 pb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase mb-2 shadow-sm animate-badge-pop">
            <Lock className="w-3.5 h-3.5 text-blue-600" />
            <span>Data Protection & Privacy</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#0B192C] font-display">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Last Updated: October 2026 • Veritas IPF Stock Recovery & Advisory
          </p>
        </div>

        <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">1. Information We Collect</h2>
            <p>
              When you submit an inquiry through our website, WhatsApp, or telephone, we collect only the necessary contact and case details required to evaluate your share entitlement. This includes your name, phone number, email address, the name of the company or shares, approximate share count, and a brief description of the issue.
            </p>
            <p className="font-semibold text-rose-800 bg-rose-50 p-3 rounded-xl border border-rose-200 text-xs">
              Strict Non-Collection Rule: Veritas will NEVER ask for or collect your Demat account passwords, trading PINs, bank OTPs, or debit/credit card CVVs. Any communication requesting such details is fraudulent and not authorized by us.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">2. How We Use Your Information</h2>
            <p>
              Your information is used exclusively to:
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Conduct preliminary folio verification against publicly accessible registers and RTA records.</li>
              <li>Contact you via phone or WhatsApp to explain the statutory recovery process.</li>
              <li>Prepare prescribed procedural drafts (such as indemnity bonds and e-Form IEPF-5 dockets) upon mutual engagement.</li>
              <li>Assign a unique Inquiry Tracking ID to manage your case records internally.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">3. Non-Disclosure & Third-Party Sharing</h2>
            <p>
              We do not sell, rent, or trade your personal or financial data to marketing aggregators or unrelated commercial entities. Information is shared only with statutory bodies (Registrar and Transfer Agents, Company Nodal Officers, and the IEPF Authority) strictly in accordance with your explicit instructions for case filing.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">4. Contact For Privacy Inquiries</h2>
            <p>
              For questions regarding your personal data or to request deletion of your inquiry records, please contact our Data Compliance Desk at <a href={`mailto:${config.businessEmail}`} className="text-blue-700 underline">{config.businessEmail}</a>.
            </p>
          </section>
        </div>

        <div className="pt-6 border-t border-slate-200">
          <button
            onClick={() => setCurrentPage('home')}
            className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1.5"
          >
            <span>Return to Home</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};

export const TermsOfService: React.FC = () => {
  const { config, setCurrentPage } = useApp();

  return (
    <div className="py-16 bg-white text-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="border-b border-slate-200 pb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase mb-2 shadow-sm animate-badge-pop">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Consultancy Terms & Disclosures</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#0B192C] font-display">
            Terms of Service & Regulatory Transparency
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Standard Consultancy Agreement Guidelines • {config.companyName}
          </p>
        </div>

        <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">1. Nature of Consultancy Services</h2>
            <p>
              {config.companyName} is an independent corporate advisory and legal documentation facilitation consultancy. We provide expert assistance with paper drafting, KYC formatting (Form ISR-1, ISR-2, ISR-4), MCA e-Form IEPF-5 filing preparation, and procedural liaison with company Registrar and Transfer Agents (RTAs).
            </p>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <strong className="block font-bold">Statutory Independence Notice:</strong>
              <p>
                We are an independent consulting enterprise. We are not a government agency, not affiliated with the Ministry of Corporate Affairs (MCA), the Investor Education and Protection Fund Authority (IEPF), or any public stock exchange.
              </p>
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">2. No Guarantee of Recovery or Approval Timelines</h2>
            <p>
              In accordance with corporate ethical standards and regulatory frameworks, we do not and cannot guarantee 100% recovery of shares, dividends, or funds. Final approval, verification reports, and share transfers depend entirely on:
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>The authenticity and accuracy of records maintained by company registrar transfer agents.</li>
              <li>Verification by the designated company Nodal Officer under MCA rules.</li>
              <li>Sanction and credit authorization by the statutory IEPF Authority.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">3. Fee Transparency</h2>
            <p>
              All professional fees, out-of-pocket documentation charges (such as non-judicial stamp papers, notarization, and newspaper advertisements for lost certificates), and payment milestones are clearly outlined in writing prior to commencing formal paperwork. We do not engage in hidden fee practices.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">4. Direct Credit to Investor Demat</h2>
            <p>
              In all approved IEPF and transmission cases, shares and funds are credited directly by the depository (NSDL/CDSL) into the investor's verified Demat account and linked bank account. No funds or shares pass through Veritas accounts.
            </p>
          </section>
        </div>

        <div className="pt-6 border-t border-slate-200">
          <button
            onClick={() => setCurrentPage('home')}
            className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1.5"
          >
            <span>Return to Home</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
