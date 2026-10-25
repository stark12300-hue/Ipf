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
    <div className="min-h-screen bg-[#071322] text-white relative overflow-hidden">
      {/* Dynamic Ambient Background Orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none animate-float-slow" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] pointer-events-none animate-float-reverse" />
      <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none animate-float-gentle" />

      {/* Campaign Header Notification */}
      <div className="bg-gradient-to-r from-emerald-950/90 via-teal-900/80 to-emerald-950/90 border-b border-emerald-500/40 py-2.5 px-4 text-center text-xs text-emerald-200 relative z-20 backdrop-blur-md">
        <div className="inline-flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span className="font-bold text-white uppercase tracking-wider text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30">
            Campaign Access
          </span>
          <span>Priority Consultation Desk for</span>
          <span className="text-white font-extrabold uppercase px-2 py-0.5 rounded bg-white/10 border border-white/20">
            {campaignSource}
          </span>
          <span>visitors</span>
          {utm.utm_campaign && <span className="opacity-75 font-mono text-[10px]">({campaignName})</span>}
        </div>
      </div>

      <LiveRecoveryMarquee />

      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16 relative z-10">
        
        {/* Brand Banner with custom Logo */}
        <div className="flex items-center justify-between pb-8 border-b border-slate-800/80">
          <div className="hover:scale-[1.02] transition-transform">
            <BrandLogo variant="large" />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCall}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 hover:from-blue-950 hover:to-indigo-950 text-xs font-semibold flex items-center gap-2 border border-cyan-500/40 text-cyan-300 hover:text-white hover:border-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.15)] hover:shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-cyan-400 animate-pulse-gentle" />
              <span className="hidden sm:inline">Call Helpline:</span> <span className="font-mono font-bold">{config.contactNumber}</span>
            </button>
          </div>
        </div>

        {/* Hero Copy */}
        <div className="text-center mt-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-950/80 via-indigo-950/80 to-purple-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(56,189,248,0.2)] animate-badge-pop">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Fast-Track Folio Assessment & Claim Protocol</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white font-display leading-tight">
            Recover Unclaimed <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300">IPF Shares</span> & Lost Stock Dividends
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Did you or your family miss dividend payments for 7 consecutive years? Are your shares transferred to IEPF, or certificates lost? Get verified procedural guidance and step-by-step assistance.
          </p>
        </div>

        {/* Direct Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleWhatsApp}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(52,211,153,0.4)] hover:shadow-[0_0_35px_rgba(52,211,153,0.6)] flex items-center justify-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-slate-950" />
            <span>Chat on WhatsApp Directly</span>
          </button>

          <button
            onClick={handleCall}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(59,130,246,0.35)] hover:shadow-[0_0_35px_rgba(59,130,246,0.55)] flex items-center justify-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <PhoneCall className="w-5 h-5" />
            <span>Call Advisory Desk</span>
          </button>
        </div>

        {/* Success Alert if submitted */}
        {submittedId && (
          <div className="mt-8 p-6 rounded-2xl bg-gradient-to-br from-emerald-950/90 to-teal-950/90 border border-emerald-500/50 text-center space-y-3 shadow-[0_0_30px_rgba(52,211,153,0.25)] animate-badge-pop">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="text-xl font-bold text-white">Your Request Has Been Assigned!</h3>
            <p className="text-xs text-emerald-200">
              Reference Tracking ID: <strong className="font-mono text-white text-sm bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-500/40">{submittedId}</strong>
            </p>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Our case specialist will review your stock details and contact you via phone or WhatsApp shortly.
            </p>
          </div>
        )}

        {/* Quick Inquiry Form */}
        {!submittedId && (
          <div className="mt-10 bg-slate-900/90 border border-cyan-500/30 rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur-md relative">
            {/* Top rainbow accent line */}
            <div className="h-1.5 w-full bg-gradient-to-r from-cyan-400 via-emerald-400 via-purple-400 to-amber-400 animate-shimmer-fast" />

            <div className="p-6 sm:p-8">
              <div className="text-center mb-6">
                <span className="text-[11px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 uppercase tracking-wider block mb-1">
                  Confidential Verification
                </span>
                <h2 className="text-xl font-extrabold text-white">Request Immediate Callback & Case Review</h2>
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 focus:outline-none transition-all"
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Company / Shares Name</label>
                  <input
                    type="text"
                    value={companyStockName}
                    onChange={(e) => setCompanyStockName(e.target.value)}
                    placeholder="e.g. Reliance, ITC, Tata Steel, L&T, HDFC"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Brief Details / Folio Notes</label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Briefly state your concern: e.g. shares in IEPF, physical certificate lost, father deceased, etc."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-white text-xs focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 focus:outline-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(52,211,153,0.3)] hover:shadow-[0_0_30px_rgba(52,211,153,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99]"
                >
                  {loading ? 'Registering...' : 'Submit Request For Priority Consultation'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Trust & Transparency Badges with rich colors */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-950/40 to-slate-900/60 border border-blue-500/30 flex items-start gap-3 hover:border-blue-400/60 transition-all hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(59,130,246,0.15)] group">
            <div className="p-2 rounded-lg bg-blue-500/20 text-cyan-400 border border-blue-400/30 shrink-0 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-white block font-bold text-sm">Official Guidelines</strong>
              <p className="text-[11px] text-slate-400 mt-0.5">Compliant with MCA e-Form IEPF-5 and SEBI demat circulars.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-amber-950/40 to-slate-900/60 border border-amber-500/30 flex items-start gap-3 hover:border-amber-400/60 transition-all hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(245,158,11,0.15)] group">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-400/30 shrink-0 group-hover:scale-110 transition-transform">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-white block font-bold text-sm">Zero Credential Policy</strong>
              <p className="text-[11px] text-slate-400 mt-0.5">We NEVER ask for Demat passwords, trading OTPs, or bank PINs.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-gradient-to-br from-purple-950/40 to-slate-900/60 border border-purple-500/30 flex items-start gap-3 hover:border-purple-400/60 transition-all hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(168,85,247,0.15)] group">
            <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-400/30 shrink-0 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <strong className="text-white block font-bold text-sm">Transparent Advisory</strong>
              <p className="text-[11px] text-slate-400 mt-0.5">Clear documentation guidance without misleading recovery guarantees.</p>
            </div>
          </div>
        </div>

        {/* Clear Privacy Notice */}
        <div className="mt-8 p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 text-center leading-relaxed">
          <strong className="text-slate-300">Privacy Notice:</strong> Information provided is used solely by Veritas Advisory coordinators to evaluate your inquiry and discuss legal procedural options. We do not sell or distribute personal data to third parties.
        </div>

      </div>
    </div>
  );
};
