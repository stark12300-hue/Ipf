import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  PhoneCall,
  MessageCircle,
  Instagram,
  Mail,
  MapPin,
  Clock,
  Send,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  Lock,
} from 'lucide-react';
import { validateContactNumber, validateEmail } from '../utils/validation';

export const ContactSection: React.FC = () => {
  const { config, utm, showToast, trackConversion, whatsAppChatUrl, preselectedService } = useApp();

  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [companyStockName, setCompanyStockName] = useState('');
  const [approxSharesCount, setApproxSharesCount] = useState('');
  const [issueType, setIssueType] = useState(preselectedService || 'IPF Stock Recovery Assistance');
  const [message, setMessage] = useState('');
  const [consentGiven, setConsentGiven] = useState(true);
  const [honeypot, setHoneypot] = useState(''); // Anti-spam

  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submittedInquiry, setSubmittedInquiry] = useState<{ id: string; name: string } | null>(null);

  const issueOptions = [
    'IPF Stock Recovery Assistance',
    'Recovery Process Guidance',
    'Case Assessment & Folio Audit',
    'Documentation Assistance',
    'Customer Consultation & Legal Heir Advisory',
    'Recovery Case Follow-up',
    'Lost Physical Share Certificate',
    'Name Mismatch / Signature Verification',
    'Other Share / Dividend Issue',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});

    // Client-side validations
    const errors: Record<string, string> = {};

    if (!fullName || fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name (at least 2 characters)';
    }

    const phoneCheck = validateContactNumber(contactNumber);
    if (!phoneCheck.valid) {
      errors.contactNumber = phoneCheck.error || 'Please enter a valid phone number';
    }

    if (email) {
      const emailCheck = validateEmail(email);
      if (!emailCheck.valid) {
        errors.email = emailCheck.error || 'Invalid email';
      }
    }

    if (!message || message.trim().length < 5) {
      errors.message = 'Please provide brief details of your shares or inquiry (at least 5 characters)';
    }

    if (!consentGiven) {
      errors.consent = 'Please confirm consent for procedural consultation contact';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      showToast({ type: 'error', title: 'Incomplete Form', message: 'Please correct the highlighted fields.' });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          contactNumber,
          email,
          companyStockName,
          approxSharesCount,
          issueType,
          message,
          source: utm.utm_source ? undefined : 'Direct Visit',
          utm,
          honeypot,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmittedInquiry({ id: data.inquiryId, name: fullName });
        trackConversion('form_submission', 'Contact_Form');
        showToast({
          type: 'success',
          title: 'Inquiry Lodged Successfully',
          message: `Inquiry Reference: ${data.inquiryId}`,
        });
        // Reset form
        setFullName('');
        setContactNumber('');
        setEmail('');
        setCompanyStockName('');
        setApproxSharesCount('');
        setMessage('');
      } else {
        showToast({
          type: 'error',
          title: 'Submission Failed',
          message: data.error || 'Unable to submit inquiry. Please try again.',
        });
      }
    } catch (err: any) {
      showToast({
        type: 'error',
        title: 'Connection Error',
        message: 'Could not reach server. Please connect with us directly on WhatsApp.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    trackConversion('whatsapp_click', 'Contact_Section');
    window.open(whatsAppChatUrl, '_blank', 'noopener,noreferrer');
  };

  const handleInstagram = () => {
    trackConversion('instagram_click', 'Contact_Section');
    window.open(config.instagramUrl, '_blank', 'noopener,noreferrer');
  };

  const handlePhoneCall = () => {
    trackConversion('phone_click', 'Contact_Section');
    window.location.href = `tel:${config.contactNumber.replace(/\s+/g, '')}`;
  };

  return (
    <section id="contact-section" className="py-20 bg-slate-50 text-slate-800 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 border border-blue-200 text-xs font-bold tracking-wider uppercase">
            <span>Direct Client Coordination</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B192C] tracking-tight font-display">
            Contact Our Advisory Desk
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Reach out through WhatsApp, official telephone, or submit an online inquiry. Our coordinators examine folio records and outline the verified recovery roadmap.
          </p>
        </div>

        {/* Success Modal / Banner */}
        {submittedInquiry && (
          <div className="mt-8 max-w-2xl mx-auto p-6 rounded-2xl bg-emerald-900 text-white shadow-xl border border-emerald-700 animate-fadeIn space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                <div>
                  <h3 className="text-lg font-bold">Inquiry Successfully Registered!</h3>
                  <p className="text-xs text-emerald-200">Thank you, {submittedInquiry.name}. Your case has been logged.</p>
                </div>
              </div>
              <button
                onClick={() => setSubmittedInquiry(null)}
                className="text-emerald-300 hover:text-white text-xs underline"
              >
                Close
              </button>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-emerald-300 font-bold block">
                  Your Inquiry Reference ID
                </span>
                <span className="text-xl font-mono font-bold text-white tracking-wider">
                  {submittedInquiry.id}
                </span>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(submittedInquiry.id);
                  showToast({ type: 'info', title: 'Copied to Clipboard' });
                }}
                className="p-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-emerald-200"
                title="Copy Inquiry ID"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-emerald-100 leading-relaxed">
              An advisory specialist will review your details. For immediate assistance, quote this Inquiry ID directly to our WhatsApp desk.
            </p>

            <button
              onClick={() => {
                const url = `https://wa.me/${config.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
                  `Hello, I just submitted an inquiry on your website with ID: ${submittedInquiry.id}. Please assist me with my IPF stock recovery case.`
                )}`;
                window.open(url, '_blank', 'noopener,noreferrer');
              }}
              className="w-full py-2.5 rounded-xl bg-white text-emerald-950 font-bold text-xs uppercase tracking-wider shadow hover:bg-emerald-50 transition flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366] fill-[#25D366]" />
              <span>Connect on WhatsApp With This Inquiry ID</span>
            </button>
          </div>
        )}

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact & Verified Office Details */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact Buttons Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span>Instant Communication Channels</span>
              </h3>

              <div className="space-y-3">
                {/* WhatsApp Button */}
                <button
                  onClick={handleWhatsApp}
                  className="w-full p-4 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 hover:border-[#25D366] transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#25D366] text-slate-950 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <MessageCircle className="w-5 h-5 fill-slate-950" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 transition">
                        WhatsApp Advisory Desk
                      </div>
                      <div className="text-xs text-slate-600 font-mono">
                        {config.whatsappNumber}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded">
                    Active
                  </span>
                </button>

                {/* Call Team Button */}
                <button
                  onClick={handlePhoneCall}
                  className="w-full p-4 rounded-xl bg-blue-50/70 hover:bg-blue-100/70 border border-blue-200 hover:border-blue-400 transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <PhoneCall className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold text-slate-900 group-hover:text-blue-900 transition">
                        Official Telephone Hotline
                      </div>
                      <div className="text-xs text-slate-600 font-mono">
                        {config.contactNumber}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded">
                    Call Now
                  </span>
                </button>

                {/* Instagram Profile Button */}
                <button
                  onClick={handleInstagram}
                  className="w-full p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border border-pink-200 hover:border-pink-400 transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white flex items-center justify-center shadow-sm">
                      <Instagram className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold text-slate-900 group-hover:text-purple-900 transition">
                        Official Instagram Profile
                      </div>
                      <div className="text-xs text-slate-600">
                        {config.instagramHandle} • Educational Updates
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-purple-700 bg-purple-100 px-2 py-1 rounded flex items-center gap-1">
                    <span>Visit</span>
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </button>
              </div>
            </div>

            {/* Office & Operations Card */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Corporate Office Details
              </h3>

              <div className="space-y-3.5 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block mb-0.5">Physical Registered Office:</strong>
                    <span>{config.officeAddress}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block mb-0.5">Advisory Business Hours:</strong>
                    <span>{config.businessHours}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block mb-0.5">Corporate Email:</strong>
                    <a href={`mailto:${config.businessEmail}`} className="text-blue-700 underline font-medium">
                      {config.businessEmail}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Appointments recommended for in-person document verification.</span>
              </div>
            </div>

          </div>

          {/* Right Column: Secure Inquiry Submission Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-lg p-6 sm:p-8">
            <div className="mb-6 border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900">
                Request a Recovery Consultation
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Please provide your contact information and details regarding your shares. All information is held in strict corporate confidence.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Anti-spam honeypot */}
              <input
                type="text"
                name="honeypot"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Customer Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ramesh Chandra Verma"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 ${
                      formErrors.fullName
                        ? 'border-rose-400 bg-rose-50/50 focus:ring-rose-500'
                        : 'border-slate-300 focus:ring-blue-600'
                    }`}
                  />
                  {formErrors.fullName && (
                    <p className="text-[11px] text-rose-600 mt-1">{formErrors.fullName}</p>
                  )}
                </div>

                {/* Contact Number */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Contact Number (Phone / WhatsApp) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="e.g. +91 98200 12345"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 ${
                      formErrors.contactNumber
                        ? 'border-rose-400 bg-rose-50/50 focus:ring-rose-500'
                        : 'border-slate-300 focus:ring-blue-600'
                    }`}
                  />
                  {formErrors.contactNumber && (
                    <p className="text-[11px] text-rose-600 mt-1">{formErrors.contactNumber}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email Address */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. ramesh@example.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 ${
                      formErrors.email ? 'border-rose-400 focus:ring-rose-500' : 'border-slate-300 focus:ring-blue-600'
                    }`}
                  />
                  {formErrors.email && (
                    <p className="text-[11px] text-rose-600 mt-1">{formErrors.email}</p>
                  )}
                </div>

                {/* Stock Name */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Company / Stock Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={companyStockName}
                    onChange={(e) => setCompanyStockName(e.target.value)}
                    placeholder="e.g. Reliance, Tata Motors, L&T"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Approximate Quantity */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Approximate Number of Shares (Optional)
                  </label>
                  <input
                    type="text"
                    value={approxSharesCount}
                    onChange={(e) => setApproxSharesCount(e.target.value)}
                    placeholder="e.g. 200 shares / 4 certificates"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                {/* Primary Category */}
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Primary Issue Category
                  </label>
                  <select
                    value={issueType}
                    onChange={(e) => setIssueType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    {issueOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message Details */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Inquiry Details / Folio Notes <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Please specify any available details: e.g. whether dividends stopped coming, folio numbers, if the registered shareholder is deceased, or whether you received an intimation letter from the company."
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 ${
                    formErrors.message
                      ? 'border-rose-400 bg-rose-50/50 focus:ring-rose-500'
                      : 'border-slate-300 focus:ring-blue-600'
                  }`}
                />
                {formErrors.message && (
                  <p className="text-[11px] text-rose-600 mt-1">{formErrors.message}</p>
                )}
              </div>

              {/* Strict Trust & Privacy Warning Box */}
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <Lock className="w-3.5 h-3.5 text-amber-700" />
                  <span>Important Privacy & Security Standard</span>
                </div>
                <p className="leading-relaxed">
                  Do not submit Demat passwords, trading PINs, bank OTPs, or confidential credentials. Veritas will never request passwords or brokerage logins.
                </p>
              </div>

              {/* Consent checkbox */}
              <label className="flex items-start gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={consentGiven}
                  onChange={(e) => setConsentGiven(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-[11px] text-slate-600">
                  I consent to receiving procedural guidance from Veritas Advisory via phone or WhatsApp regarding my inquiry in accordance with the Privacy Policy.
                </span>
              </label>
              {formErrors.consent && (
                <p className="text-[11px] text-rose-600">{formErrors.consent}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-6 rounded-xl bg-[#0B192C] hover:bg-blue-900 text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span>Submitting Inquiry...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-emerald-400" />
                    <span>Submit Recovery Inquiry For Folio Review</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
