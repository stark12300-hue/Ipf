import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { IEPFSearchSection } from './components/IEPFSearchSection';
import { LiveRecoveryMarquee } from './components/LiveRecoveryMarquee';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { CaseAssessmentTool } from './components/CaseAssessmentTool';
import { HowItWorksSection } from './components/HowItWorksSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { InstagramBanner } from './components/InstagramBanner';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdLandingPage } from './components/AdLandingPage';
import { AdminDashboard } from './components/AdminDashboard';
import { PreLaunchChecklist } from './components/PreLaunchChecklist';
import { PrivacyPolicy, TermsOfService } from './components/LegalPages';
import { Footer } from './components/Footer';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

function ToastContainer() {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-24 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-4 rounded-xl shadow-xl border flex items-start gap-3 transition-all transform translate-y-0 text-xs ${
            toast.type === 'success'
              ? 'bg-emerald-950 text-emerald-100 border-emerald-800'
              : toast.type === 'error'
              ? 'bg-rose-950 text-rose-100 border-rose-800'
              : 'bg-slate-900 text-slate-100 border-slate-700'
          }`}
        >
          {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
          {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
          {toast.type === 'info' && <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />}

          <div className="flex-1">
            <h4 className="font-bold text-white">{toast.title}</h4>
            {toast.message && <p className="text-[11px] opacity-90 mt-0.5">{toast.message}</p>}
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-white p-0.5"
            aria-label="Close notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}

function MainLayout() {
  const { currentPage } = useApp();

  if (currentPage === 'landing') {
    return (
      <main className="min-h-screen">
        <AdLandingPage />
        <FloatingWhatsApp />
        <ToastContainer />
      </main>
    );
  }

  if (currentPage === 'admin') {
    return (
      <main className="min-h-screen">
        <AdminDashboard />
        <FloatingWhatsApp />
        <ToastContainer />
      </main>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />
      <ToastContainer />

      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            <HeroSection />
            <IEPFSearchSection />
            <LiveRecoveryMarquee />
            <AboutSection />
            <ServicesSection />
            <CaseAssessmentTool />
            <HowItWorksSection />
            <FAQSection />
            <InstagramBanner />
            <ContactSection />
          </>
        )}

        {currentPage === 'services' && (
          <>
            <div className="bg-[#0B192C] text-white py-12 px-4 text-center">
              <h1 className="text-3xl font-bold font-display">Specialized Recovery Services</h1>
              <p className="text-xs text-slate-300 mt-2 max-w-xl mx-auto">
                Detailed procedural guidance for IEPF claims, lost share certificates, name mismatches, and legal heir succession.
              </p>
            </div>
            <ServicesSection />
            <CaseAssessmentTool />
            <ContactSection />
          </>
        )}

        {currentPage === 'assessment' && (
          <>
            <div className="bg-[#0B192C] text-white py-12 px-4 text-center">
              <h1 className="text-3xl font-bold font-display">Check Case Eligibility & Document Requirements</h1>
              <p className="text-xs text-slate-300 mt-2 max-w-xl mx-auto">
                Understand the exact SEBI and MCA forms required for your specific share folio situation.
              </p>
            </div>
            <CaseAssessmentTool />
            <ServicesSection />
            <ContactSection />
          </>
        )}

        {currentPage === 'how-it-works' && (
          <>
            <div className="bg-[#0B192C] text-white py-12 px-4 text-center">
              <h1 className="text-3xl font-bold font-display">Our 4-Step Recovery Process</h1>
              <p className="text-xs text-slate-300 mt-2 max-w-xl mx-auto">
                Structured, transparent, and compliant procedural workflow from inquiry to depository credit.
              </p>
            </div>
            <HowItWorksSection />
            <FAQSection />
            <ContactSection />
          </>
        )}

        {currentPage === 'faqs' && (
          <>
            <div className="bg-[#0B192C] text-white py-12 px-4 text-center">
              <h1 className="text-3xl font-bold font-display">Process & Procedural FAQs</h1>
              <p className="text-xs text-slate-300 mt-2 max-w-xl mx-auto">
                Authentic information answering common questions regarding IEPF stock recovery.
              </p>
            </div>
            <FAQSection />
            <ContactSection />
          </>
        )}

        {currentPage === 'contact' && (
          <>
            <div className="bg-[#0B192C] text-white py-12 px-4 text-center">
              <h1 className="text-3xl font-bold font-display">Connect With Veritas Advisory</h1>
              <p className="text-xs text-slate-300 mt-2 max-w-xl mx-auto">
                Official phone hotline, WhatsApp desk, corporate office location, and inquiry submission.
              </p>
            </div>
            <ContactSection />
            <FAQSection />
          </>
        )}

        {currentPage === 'checklist' && <PreLaunchChecklist />}
        {currentPage === 'privacy' && <PrivacyPolicy />}
        {currentPage === 'terms' && <TermsOfService />}
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
