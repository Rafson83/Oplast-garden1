import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { B2BSection } from './components/B2BSection';
import { InstallationGuide } from './components/InstallationGuide';
import { WhyOplast } from './components/WhyOplast';
import { ContactSection } from './components/ContactSection';
import { PartnersDirectory } from './components/PartnersDirectory';
import { AdminCrm } from './components/AdminCrm';
import { Footer } from './components/Footer';
import { CalculatorModal } from './components/CalculatorModal';
import { SampleBoxModal } from './components/SampleBoxModal';
import { B2BInquiryModal } from './components/B2BInquiryModal';
import { PartnerInquiryModal } from './components/PartnerInquiryModal';
import { PartnerLoginModal } from './components/PartnerLoginModal';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { CookieBanner } from './components/CookieBanner';
import { PwaInstallPrompt } from './components/PwaInstallPrompt';

export const AppContent: React.FC = () => {
  const { currentView } = useShop();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-600 selection:text-white">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {currentView === 'partners' ? (
          <PartnersDirectory />
        ) : currentView === 'admin' ? (
          <AdminCrm />
        ) : (
          <>
            <Hero />
            <ProductCatalog />
            <B2BSection />
            <InstallationGuide />
            <WhyOplast />
            <ContactSection />
          </>
        )}
      </main>

      {/* Footer */}
      {currentView !== 'admin' && <Footer />}

      {/* Global Modals */}
      <CalculatorModal />
      <SampleBoxModal />
      <B2BInquiryModal />
      <PartnerInquiryModal />
      <PartnerLoginModal />
      <PrivacyPolicyModal />

      {/* RODO / GDPR Cookie Banner */}
      <CookieBanner />

      {/* PWA Progressive Web App Install Banner */}
      <PwaInstallPrompt />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ShopProvider>
        <AppContent />
      </ShopProvider>
    </LanguageProvider>
  );
};

export default App;
