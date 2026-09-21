import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { ShopProvider } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { B2BSection } from './components/B2BSection';
import { InstallationGuide } from './components/InstallationGuide';
import { WhyOplast } from './components/WhyOplast';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CalculatorModal } from './components/CalculatorModal';
import { SampleBoxModal } from './components/SampleBoxModal';
import { B2BInquiryModal } from './components/B2BInquiryModal';

export const AppContent: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-600 selection:text-white">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        <Hero />
        <ProductCatalog />
        <B2BSection />
        <InstallationGuide />
        <WhyOplast />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <CalculatorModal />
      <SampleBoxModal />
      <B2BInquiryModal />
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
