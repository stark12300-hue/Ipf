import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BrandLogo } from './BrandLogo';
import { LiveRecoveryMarquee } from './LiveRecoveryMarquee';
import {
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Send,
  Building2,
  FileText,
  Clock,
  Instagram,
  AlertCircle,
} from 'lucide-react';
import { validateContactNumber } from '../utils/validation';

export const AdLandingPage: React.FC = () => {
  const { config, utm, showToast, trackConversion, whatsAppChatUrl } = useApp();

  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [companyStockName, setCompanyStockName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const campaignSource = utm.utm_source || 'Campaign Ad';
  const campaignName = utm.utm_campaign || 'ipf_special_recovery_desk';

  const handleWhatsApp = () => {
    trackConversion('whatsapp_click', `Ad_Landing_${campaignSource}`);
    window.open(whatsAppChatUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCall = () => {
    trackConversion('phone_click', `Ad_Landing_${campaignSource}`);
    window.location.href = `tel:${config.contactNumber.replace(/\s+/g, '')}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || fullName.trim().length < 2) {
      showToast({ type: 'error', title: 'Name Required', message: 'Please enter your name.' });
      return;
    }
    const phoneCheck = validateContactNumber(contactNumber);
    if (!phoneCheck.valid) {
      showToast({ type: 'error', title: 'Invalid Phone', message: phoneCheck.error || 'Check your phone number.' });
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
          companyStockName,
          message: message || 'Urgent consultation requested from Ad Campaign Landing Page.',
          source: campaignSource.toLowerCase().includes('instagram') ? 'Instagram' : 'Google',
          utm,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmittedId(data.inquiryId);
        trackConversion('form_submission', `Ad_Landing_${campaignSource}`);
        showToast({
          type: 'success',
          title: 'Consultation Booked',
          message: `Your Inquiry ID: ${data.inquiryId}`,
        });
      } else {
        showToast({ type: 'error', title: 'Error', message: data.error || 'Failed to submit' });
      }
    } catch (e) {
      showToast({ type: 'error', title: 'Error', message: 'Could not connect. Please message via WhatsApp.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B192C] text-white">
      {/* Campaign Header Notification */}
      <div className="bg-emerald-950/80 border-b border-emerald-800/80 py-2 px-4 text-center text-xs text-emerald-300">
        <span className="font-bold">Campaign Access:</span> Specialized Priority Consultation Desk for{' '}
        <span className="text-white font-extrabold uppercase">{campaignSource}</span> visitors
        {utm.utm_campaign && <span className="opacity-75"> ({campaignName})</span>}
      </div>

      <LiveRecoveryMarquee />

      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
        
        {/* Brand Banner with custom Logo */}
        <div className="flex items-center justify-between pb-8 border-b border-slate-800">
          <BrandLogo variant="large" />

          <div className="flex items-center gap-2">
            <button
              onClick={handleCall}
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold flex items-center gap-1.5 border border-slate-700"
            >
              <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Call Now:</span> {config.contactNumber}
            </button>
          </div>
        </div>

        {/* Hero Copy */}
        <div className="text-center mt-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/60 text-blue-300 text-xs font-bold uppercase">
            <span>Fast-Track Folio Assessment</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display">
            Recover Unclaimed IPF Shares & Lost Stock Dividends
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Did you or your family miss dividend payments for 7 years? Are your shares transferred to IEPF, or certificates lost? Get verified procedural guidance and step-by-step assistance.
          </p>
        </div>

        {/* Direct Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleWhatsApp}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2.5 transition transform hover:scale-105"
          >
            <MessageCircle className="w-5 h-5 fill-slate-950" />
            <span>Chat on WhatsApp Directly</span>
          </button>

          <button
            onClick={handleCall}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm uppercase tracking-wider shadow-lg flex items-center justify-center gap-2.5 transition transform hover:scale-105"
          >
            <PhoneCall className="w-5 h-5" />
            <span>Call Advisory Team</span>
          </button>
        </div>

        {/* Success Alert if submitted */}
        {submittedId && (
          <div className="mt-8 p-6 rounded-2xl bg-emerald-950 border border-emerald-700 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Your Request Has Been Assigned!</h3>
            <p className="text-xs text-emerald-200">
              Reference ID: <strong className="font-mono text-white text-sm">{submittedId}</strong>
            </p>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Our case specialist will review your stock details and contact you via phone or WhatsApp shortly.
            </p>
          </div>
        )}

        {/* Quick Inquiry Form */}
        {!submittedId && (
          <div className="mt-10 bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
            <div className="text-center mb-6">
              <h2 className="text-lg font-bold text-white">Request Immediate Callback & Case Review</h2>
              <p className="text-xs text-slate-400 mt-1">
                Enter your details below to schedule an initial consultation with our documentation desk.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Anand K. Joshi"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Mobile / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="e.g. +91 98200 55667"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Company / Shares Name</label>
                <input
                  type="text"
                  value={companyStockName}
                  onChange={(e) => setCompanyStockName(e.target.value)}
                  placeholder="e.g. Reliance, ITC, Tata Steel, L&T"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Brief Details / Folio Notes</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Briefly state your concern: e.g. shares in IEPF, physical certificate lost, father deceased, etc."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Registering...' : 'Submit Request For Priority Consultation'}
              </button>
            </form>
          </div>
        )}

        {/* Trust & Transparency Badges */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <strong className="text-white block">Official Guidelines</strong>
              <p className="text-[11px] text-slate-400 mt-0.5">Compliant with MCA e-Form IEPF-5 and SEBI demat circulars.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
            <Lock className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <strong className="text-white block">Zero Credential Policy</strong>
              <p className="text-[11px] text-slate-400 mt-0.5">We NEVER ask for Demat passwords, trading OTPs, or bank PINs.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <strong className="text-white block">Transparent Advisory</strong>
              <p className="text-[11px] text-slate-400 mt-0.5">Clear documentation guidance without misleading recovery guarantees.</p>
            </div>
          </div>
        </div>

        {/* Clear Privacy Notice */}
        <div className="mt-8 p-4 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 text-center leading-relaxed">
          <strong className="text-slate-300">Privacy Notice:</strong> Information provided is used solely by Veritas Advisory coordinators to evaluate your inquiry and discuss legal procedural options. We do not sell or distribute personal data to third parties.
        </div>

      </div>
    </div>
  );
};
