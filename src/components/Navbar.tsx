import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Calculator, 
  Layers, 
  Phone, 
  Menu, 
  X, 
  Building2, 
  ShieldCheck, 
  Truck,
  Box,
  FileSpreadsheet
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Navbar: React.FC = () => {
  const { 
    isB2BMode, 
    setIsB2BMode, 
    cartCount, 
    setIsCartOpen, 
    setIsCalculatorOpen,
    setIsSampleBoxOpen,
    setIsInquiryOpen,
    totalCartBrutto,
    totalCartNetto
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Banner - Light & Fresh */}
      <div className="bg-emerald-50/90 border-b border-emerald-100 text-emerald-950 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Polski Producent • Zakład Winduga (woj. kujawsko-pomorskie)
            </span>
            <span className="hidden md:inline text-emerald-300">•</span>
            <span className="hidden md:flex items-center gap-1 text-emerald-800">
              <Truck className="w-3.5 h-3.5 text-emerald-600" />
              Wysyłka paletowa 24-48h | Dostawy całopojazdowe FTL
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <a 
              href="tel:+48537200630" 
              className="flex items-center gap-1.5 text-emerald-900 hover:text-emerald-700 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Dział Handlowy: <strong>+48 537 200 630</strong></span>
            </a>
            <span className="text-emerald-200">|</span>
            <button
              onClick={() => setIsSampleBoxOpen(true)}
              className="flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-bold cursor-pointer"
            >
              <Box className="w-3.5 h-3.5" />
              <span>Zamów Box Próbek (dla firm)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 font-heading">
                  OPLAST
                </span>
                <span className="font-bold text-xl sm:text-2xl text-emerald-600 font-heading">
                  GARDEN
                </span>
              </div>
              <p className="text-[10px] font-semibold tracking-wider uppercase text-slate-500">
                Kratki Parkingowe & Obrzeża
              </p>
            </div>
          </a>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
            <a href="#kratki" className="hover:text-emerald-600 transition-colors py-1">
              Kratki Trawnikowe
            </a>
            <a href="#obrzeza" className="hover:text-emerald-600 transition-colors py-1">
              Obrzeża Eko-Bord
            </a>
            <a href="#akcesoria" className="hover:text-emerald-600 transition-colors py-1">
              Akcesoria
            </a>
            <button 
              onClick={() => setIsCalculatorOpen(true)}
              className="flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 px-3 py-1.5 rounded-lg border border-emerald-200/80 transition-all cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-emerald-600" />
              <span>Kalkulator m²</span>
            </button>
            <a href="#montaz" className="hover:text-emerald-600 transition-colors py-1">
              Instrukcja Montażu
            </a>
            <a href="#b2b" className="hover:text-emerald-600 transition-colors py-1 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              Dla Firm & B2B
            </a>
            <a href="#kontakt" className="hover:text-emerald-600 transition-colors py-1">
              Kontakt
            </a>
          </nav>

          {/* Action Area: B2C / B2B Switcher & Cart */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Dual Mode Switcher B2C / B2B */}
            <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 flex items-center shadow-inner">
              <button
                onClick={() => setIsB2BMode(false)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  !isB2BMode
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Detal (Brutto)
              </button>
              <button
                onClick={() => setIsB2BMode(true)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  isB2BMode
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-emerald-800'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                Hurt B2B (Netto)
              </button>
            </div>

            {/* Quick B2B Quote Button (Desktop) */}
            <button
              onClick={() => {
                setIsInquiryOpen(true);
              }}
              className="hidden xl:flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-200" />
              <span>Wycena Inwestycji</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 transition-all flex items-center gap-2 cursor-pointer group"
              title="Otwórz koszyk"
            >
              <ShoppingBag className="w-5 h-5 text-emerald-700 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <>
                  <span className="absolute -top-1.5 -right-1.5 bg-emerald-600 text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                    {cartCount}
                  </span>
                  <span className="hidden md:inline text-xs font-bold text-emerald-900">
                    {(isB2BMode ? totalCartNetto : totalCartBrutto).toFixed(2)} zł
                  </span>
                </>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200/80 mb-4">
            <p className="text-xs text-emerald-900 font-semibold mb-2">Tryb wyświetlania cen i oferty:</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setIsB2BMode(false)}
                className={`py-2 text-xs font-bold rounded-lg border ${
                  !isB2BMode ? 'bg-white border-emerald-600 text-emerald-900 shadow-xs' : 'bg-slate-100 text-slate-600 border-transparent'
                }`}
              >
                Klient Indywidualny (Brutto)
              </button>
              <button
                onClick={() => setIsB2BMode(true)}
                className={`py-2 text-xs font-bold rounded-lg border ${
                  isB2BMode ? 'bg-emerald-700 border-emerald-700 text-white shadow-xs' : 'bg-slate-100 text-slate-600 border-transparent'
                }`}
              >
                Firma / Hurt B2B (Netto)
              </button>
            </div>
          </div>

          <div className="flex flex-col space-y-2 text-base font-semibold text-slate-800">
            <a 
              href="#kratki" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              Kratki Trawnikowo-Parkingowe
            </a>
            <a 
              href="#obrzeza" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              Obrzeża Trawnikowe Eko-Bord
            </a>
            <a 
              href="#akcesoria" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              Kotwy & Znaczniki
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsCalculatorOpen(true);
              }}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 text-emerald-800 font-bold"
            >
              <Calculator className="w-5 h-5 text-emerald-600" />
              <span>Kalkulator Zapotrzebowania m²</span>
            </button>
            <a 
              href="#montaz" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              Instrukcja Montażu Podbudowy
            </a>
            <a 
              href="#b2b" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center justify-between"
            >
              <span>Strefa Hurtowa B2B & Przetargi</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">HURT</span>
            </a>
            <a 
              href="#kontakt" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              Kontakt z Producentem
            </a>
          </div>

          <div className="pt-3 border-t border-slate-200 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsSampleBoxOpen(true);
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-emerald-600 text-emerald-800 text-xs font-bold bg-white"
            >
              <Box className="w-4 h-4 text-emerald-600" />
              Box Próbek
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsInquiryOpen(true);
              }}
              className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-700 text-white text-xs font-bold"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-200" />
              Wycena B2B
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
