import React, { useState } from 'react';
import { Search, ExternalLink, FileText, ShieldCheck, Building2, UserRound, Hash, ArrowRight, ClipboardCheck } from 'lucide-react';

type SearchMode = 'company' | 'shareholder' | 'folio';

const INDIAN_STATES_AND_UTS = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands',
  'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Jammu and Kashmir',
  'Ladakh', 'Lakshadweep', 'Puducherry', 'Outside India / Other country',
];

export const IEPFSearchSection: React.FC = () => {
  const [mode, setMode] = useState<SearchMode>('company');
  const [company, setCompany] = useState('');
  const [shareholder, setShareholder] = useState('');
  const [folio, setFolio] = useState('');
  const [stateName, setStateName] = useState('');
  const [searched, setSearched] = useState(false);
  const [searchStatus, setSearchStatus] = useState<'idle' | 'unavailable'>('idle');

  const officialHomeUrl = 'https://www.iepf.gov.in/content/iepf/global/master/Home/Home.html';
  const officialSearchUrl = 'https://iepfa.gov.in/login';
  const mcaUrl = 'https://www.mca.gov.in/content/mca/global/en/foportal/fologin.html';

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setSearched(true);
    // Never invent matches. An authorized IEPFA data/API connection must be configured
    // before this page can return live government records.
    setSearchStatus('unavailable');
  };

  return (
    <section id="iepf-search" className="bg-slate-50 text-slate-800 py-16 sm:py-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#0B192C] shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> IEPF Search & Recovery Guidance
          </span>
          <h2 className="mt-5 text-3xl sm:text-4xl font-black tracking-tight text-[#0B192C] font-display">Search for Unclaimed Shares & Dividends</h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
            Choose a search type and enter the available details. State is selectable from the list. Live government-record matching will only be enabled when an authorized IEPFA data source is connected.
          </p>
        </div>

        <div className="mt-10 grid lg:grid-cols-[1.05fr_.95fr] gap-6 items-start">
          <div className="rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 overflow-hidden">
            <div className="bg-[#0B192C] px-6 py-5 text-white">
              <h3 className="text-lg font-bold">Find your investment</h3>
              <p className="mt-1 text-sm text-slate-300">Choose a search type to get the right next steps.</p>
            </div>
            <div className="p-5 sm:p-7">
              <div className="grid grid-cols-3 gap-2" role="tablist" aria-label="Search type">
                {([
                  ['company', 'Company', Building2],
                  ['shareholder', 'Name', UserRound],
                  ['folio', 'Folio / DP ID', Hash],
                ] as const).map(([value, label, Icon]) => (
                  <button key={value} type="button" role="tab" aria-selected={mode === value} onClick={() => { setMode(value); setSearched(false); }}
                    className={`min-h-16 rounded-xl border px-2 py-3 text-xs sm:text-sm font-bold flex flex-col sm:flex-row items-center justify-center gap-2 transition-all cursor-pointer ${mode === value ? 'bg-[#0B192C] text-white border-[#0B192C] shadow-sm' : 'bg-white text-slate-700 border-slate-200 hover:border-blue-400'}`}>
                    <Icon className="w-4 h-4" />{label}
                  </button>
                ))}
              </div>

              <form className="mt-6 space-y-4" onSubmit={submitSearch}>
                {mode === 'company' && <div>
                  <label htmlFor="iepf-company" className="block text-sm font-semibold text-slate-700 mb-1.5">Company name</label>
                  <input id="iepf-company" value={company} onChange={e => setCompany(e.target.value)} required placeholder="e.g. Reliance Industries" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition" />
                </div>}
                {mode === 'shareholder' && <div>
                  <label htmlFor="iepf-shareholder" className="block text-sm font-semibold text-slate-700 mb-1.5">Shareholder name</label>
                  <input id="iepf-shareholder" value={shareholder} onChange={e => setShareholder(e.target.value)} required placeholder="Enter name as shown on share records" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition" />
                </div>}
                {mode === 'folio' && <div>
                  <label htmlFor="iepf-folio" className="block text-sm font-semibold text-slate-700 mb-1.5">Folio number / DP ID + Client ID</label>
                  <input id="iepf-folio" value={folio} onChange={e => setFolio(e.target.value)} required placeholder="Enter folio or demat reference" className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition" />
                </div>}
                <div>
                  <label htmlFor="iepf-state" className="block text-sm font-semibold text-slate-700 mb-1.5">State / country of registered address</label>
                  <select id="iepf-state" value={stateName} onChange={e => { setStateName(e.target.value); setSearched(false); setSearchStatus('idle'); }} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition">
                    <option value="">Select state / UT</option>
                    {INDIAN_STATES_AND_UTS.map(state => <option key={state} value={state}>{state}</option>)}
                  </select>
                </div>
                <button type="submit" className="w-full rounded-xl bg-[#0B192C] hover:bg-[#152e4d] text-white px-5 py-3.5 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md transition">
                  <Search className="w-4 h-4" /> Search unclaimed records
                </button>
              </form>

              {searched && searchStatus === 'unavailable' && <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50/60 p-4" role="status" aria-live="polite">
                <h4 className="font-bold text-[#0B192C]">Search public company / RTA records</h4>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">There is no verified, publicly documented universal API available here for searching all IEPFA or RTA shareholder records by name. These links search publicly indexed pages only; they do not confirm entitlement or current status. Some company/RTA portals require their own form, login, or CAPTCHA.</p>
                {mode === 'shareholder' && shareholder.trim().length >= 2 ? <div className="mt-4 space-y-2">
                  <a href={`https://www.google.com/search?q=${encodeURIComponent('"' + shareholder.trim() + '" unclaimed dividend shares RTA India')}`} target="_blank" rel="noreferrer" className="w-full rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-[#0B192C] px-4 py-3 text-sm font-bold flex items-center justify-between gap-2 shadow-xs">Search public web records <ExternalLink className="w-4 h-4 shrink-0" /></a>
                  <a href={`https://www.google.com/search?q=${encodeURIComponent('site:ris.kfintech.com "' + shareholder.trim() + '" IEPF OR dividend')}`} target="_blank" rel="noreferrer" className="w-full rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-[#0B192C] px-4 py-3 text-sm font-bold flex items-center justify-between gap-2 shadow-xs">Search KFintech public pages <ExternalLink className="w-4 h-4 shrink-0" /></a>
                  <a href={`https://www.google.com/search?q=${encodeURIComponent('site:linkintime.co.in "' + shareholder.trim() + '" dividend OR IEPF')}`} target="_blank" rel="noreferrer" className="w-full rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-[#0B192C] px-4 py-3 text-sm font-bold flex items-center justify-between gap-2 shadow-xs">Search Link Intime public pages <ExternalLink className="w-4 h-4 shrink-0" /></a>
                  <p className="text-xs text-slate-500">Your name is included in a search URL only when you tap a link, and will be sent to that search provider. Results may be incomplete or unrelated.</p>
                </div> : <p className="mt-3 text-sm text-slate-600">Choose “Name” and enter at least two characters to create public-record search links. Company-specific RTA pages can be searched more precisely when you know the company.</p>}
                <a href={officialSearchUrl} target="_blank" rel="noreferrer" className="mt-4 w-full rounded-xl bg-[#0B192C] hover:bg-[#152e4d] text-white px-5 py-3 text-sm font-bold flex items-center justify-center gap-2 shadow-sm"><ExternalLink className="w-4 h-4" /> Open official IEPFA Search Facility</a>
                <p className="mt-2 text-xs text-slate-500">This website does not scrape login-protected pages, bypass CAPTCHA, or invent matches. Verify any possible match directly with the company/RTA or IEPFA.</p>
              </div>}
              <p className="mt-4 text-xs text-slate-500">Privacy tip: do not enter PAN, Aadhaar, OTPs, passwords or bank details here. Use sensitive details only on verified official portals.</p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xl shadow-slate-900/5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center"><ClipboardCheck className="w-5 h-5" /></div>
                <div><h3 className="text-lg font-black text-[#0B192C]">What happens if you find a match?</h3><p className="text-xs text-slate-500">General claim guidance</p></div>
              </div>
              <ol className="mt-5 space-y-4">
                {[
                  ['1', 'Verify the record', 'Check company name, shareholder details and whether the asset was transferred to IEPFA or remains with the company/RTA.'],
                  ['2', 'Prepare documents', 'Common items may include identity/KYC, entitlement proof, bank proof and demat details. Exact requirements depend on the case.'],
                  ['3', 'File the claim', 'If the asset is with IEPFA, follow the official Form IEPF-5 process and retain the SRN/acknowledgement.'],
                  ['4', 'Follow up', 'Track the application through official channels and respond to any company/RTA or authority query.']
                ].map(([n, title, detail]) => <li key={n} className="flex gap-3">
                  <span className="shrink-0 w-8 h-8 rounded-full bg-[#0B192C] text-white flex items-center justify-center text-sm font-bold">{n}</span>
                  <div><h4 className="font-bold text-slate-800 text-sm">{title}</h4><p className="mt-1 text-sm text-slate-600 leading-relaxed">{detail}</p></div>
                </li>)}
              </ol>
              <a href={mcaUrl} target="_blank" rel="noreferrer" className="mt-6 w-full rounded-xl bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 font-extrabold text-sm flex items-center justify-center gap-2 shadow-md transition">Open MCA portal for IEPF-5 <ArrowRight className="w-4 h-4" /></a>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5 flex items-start gap-3 shadow-xs">
              <FileText className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div><h4 className="font-bold text-[#0B192C]">Official resources</h4><p className="mt-1 text-sm text-slate-600">Use the authority’s website for current instructions, forms and claim status.</p><a href={officialHomeUrl} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-800 underline">IEPFA official website <ExternalLink className="w-3.5 h-3.5" /></a></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
