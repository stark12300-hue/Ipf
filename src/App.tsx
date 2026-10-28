import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { IEPFPosterShowcase } from './components/IEPFPosterShowcase';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdLandingPage } from './components/AdLandingPage';
import { AdminDashboard } from './components/AdminDashboard';
import { PrivacyPolicy, TermsOfService } from './components/LegalPages';
import { Footer } from './components/Footer';
import { LogoIntroAnimation } from './components/LogoIntroAnimation';
import { LanguageSelectionModal } from './components/LanguageSelectionModal';
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
  const { currentPage, showLanguageModal, setLanguage } = useApp();
  const [introFinished, setIntroFinished] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F6F9] text-slate-900 font-sans">
      {/* Website Open Logo Animation */}
      <LogoIntroAnimation onFinished={() => setIntroFinished(true)} />

      {/* First-Time User Language Selection Modal (Asked only once) */}
      <LanguageSelectionModal
        isOpen={showLanguageModal && introFinished}
        onSelectLanguage={setLanguage}
      />

      <Navbar />
      <ToastContainer />

      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            <IEPFPosterShowcase />
            <FAQSection />
          </>
        )}

        {currentPage === 'services' && (
          <>
            <IEPFPosterShowcase />
            <FAQSection />
          </>
        )}

        {currentPage === 'assessment' && (
          <>
            <IEPFPosterShowcase />
            <FAQSection />
          </>
        )}

        {currentPage === 'how-it-works' && (
          <>
            <IEPFPosterShowcase />
            <FAQSection />
          </>
        )}

        {currentPage === 'faqs' && (
          <>
            <IEPFPosterShowcase />
            <FAQSection />
          </>
        )}

        {currentPage === 'contact' && (
          <>
            <div className="bg-gradient-to-b from-blue-50/80 via-white to-slate-50 text-slate-900 py-10 px-4 text-center border-b border-slate-200">
              <h1 className="text-3xl font-black font-display text-slate-950">Direct Consultation Desk</h1>
              <p className="text-xs text-slate-600 mt-2 max-w-xl mx-auto">
                Connect directly with Gopal Singh Parihar at IIT Kalyanpur, Kanpur or reach our WhatsApp desk immediately.
              </p>
            </div>
            <ContactSection />
            <IEPFPosterShowcase />
          </>
        )}

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
