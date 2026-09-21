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
  Box
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Navbar: React.FC = () => {
  const { 
    isB2BMode, 
    setIsB2BMode, 
    cartCount, 
    setIsCartOpen, 
    setIsCalculatorOpen,
    setIsSampleBoxOpen,
    totalCartBrutto,
    totalCartNetto
  } = useShop();

  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      {/* Top Banner - Subtle & Clean */}
      <div className="bg-emerald-50/90 border-b border-emerald-100 text-emerald-950 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-3 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-emerald-800">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              {t.nav.topBannerProducer}
            </span>
            <span className="hidden md:inline text-emerald-300">•</span>
            <span className="hidden md:flex items-center gap-1 text-emerald-800">
              <Truck className="w-3.5 h-3.5 text-emerald-600" />
              {t.nav.topBannerShipping}
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <a 
              href="tel:+48537200630" 
              className="flex items-center gap-1.5 text-emerald-900 hover:text-emerald-700 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span><strong>+48 537 200 630</strong></span>
            </a>
            <span className="text-emerald-200">|</span>
            <button
              onClick={() => setIsSampleBoxOpen(true)}
              className="flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-bold cursor-pointer"
            >
              <Box className="w-3.5 h-3.5" />
              <span>{t.nav.orderSampleBox}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 font-heading">
                  OPLAST
                </span>
                <span className="font-bold text-xl text-emerald-600 font-heading">
                  GARDEN
                </span>
              </div>
              <p className="text-[9px] font-semibold tracking-wider uppercase text-slate-500">
                Kratki & Obrzeża
              </p>
            </div>
          </a>

          {/* Desktop Links: 5 Clean, Spacious Navigation Items */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-semibold text-slate-700">
            <a 
              href="#produkty" 
              className="hover:text-emerald-600 transition-colors py-1 hover:underline underline-offset-4"
            >
              {t.nav.products}
            </a>

            <button 
              onClick={() => setIsCalculatorOpen(true)}
              className="flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 py-1 transition-colors cursor-pointer font-bold"
            >
              <Calculator className="w-4 h-4 text-emerald-600" />
              <span>{t.nav.m2Calculator}</span>
            </button>

            <a 
              href="#b2b" 
              className="hover:text-emerald-600 transition-colors py-1 flex items-center gap-1"
            >
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span>{t.nav.forB2B}</span>
            </a>

            <a 
              href="#montaz" 
              className="hover:text-emerald-600 transition-colors py-1"
            >
              {t.nav.installGuideShort}
            </a>

            <a 
              href="#kontakt" 
              className="hover:text-emerald-600 transition-colors py-1"
            >
              {t.nav.contact}
            </a>
          </nav>

          {/* Action Area: Language Switcher, Price Mode Toggle & Cart */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Language Switcher (Desktop) */}
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            {/* Clean Price Mode Toggle (B2C / B2B) */}
            <div className="bg-slate-100 p-1 rounded-xl border border-slate-200 flex items-center shadow-inner">
              <button
                onClick={() => setIsB2BMode(false)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  !isB2BMode
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {t.nav.b2cMode}
              </button>
              <button
                onClick={() => setIsB2BMode(true)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  isB2BMode
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-emerald-800'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                {t.nav.b2bMode}
              </button>
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 transition-all flex items-center gap-2 cursor-pointer group"
              title={t.nav.cart}
            >
              <ShoppingBag className="w-5 h-5 text-emerald-700 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <>
                  <span className="absolute -top-1.5 -right-1.5 bg-emerald-600 text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                    {cartCount}
                  </span>
                  <span className="hidden lg:inline text-xs font-bold text-emerald-900">
                    {(isB2BMode ? totalCartNetto : totalCartBrutto).toFixed(2)} zł
                  </span>
                </>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu - Simplified & Clean */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-200 shadow-xl">
          
          {/* Controls Bar: Language + Mode Switcher */}
          <div className="space-y-2.5 p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Język / Language:</span>
              <LanguageSwitcher compact />
            </div>

            <div className="pt-2 border-t border-slate-200/80">
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => setIsB2BMode(false)}
                  className={`py-2 text-xs font-bold rounded-xl border ${
                    !isB2BMode ? 'bg-white border-emerald-600 text-emerald-900 shadow-xs' : 'bg-slate-100 text-slate-600 border-transparent'
                  }`}
                >
                  {t.nav.b2cMode}
                </button>
                <button
                  onClick={() => setIsB2BMode(true)}
                  className={`py-2 text-xs font-bold rounded-xl border ${
                    isB2BMode ? 'bg-emerald-700 border-emerald-700 text-white shadow-xs' : 'bg-slate-100 text-slate-600 border-transparent'
                  }`}
                >
                  {t.nav.b2bMode}
                </button>
              </div>
            </div>
          </div>

          {/* Simple Navigation List */}
          <div className="flex flex-col space-y-1 text-sm font-semibold text-slate-800">
            <a 
              href="#produkty" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              {t.nav.products} (H30, H40, H50, Eko-Bord)
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsCalculatorOpen(true);
              }}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-emerald-50 text-emerald-800 font-bold hover:bg-emerald-100 transition-colors text-left"
            >
              <Calculator className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.nav.m2Calculator}</span>
            </button>

            <a 
              href="#b2b" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-between"
            >
              <span>{t.nav.forB2B}</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">B2B</span>
            </a>

            <a 
              href="#montaz" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              {t.nav.installGuide}
            </a>

            <a 
              href="#kontakt" 
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              {t.nav.contact}
            </a>
          </div>

          {/* Quick Sample Box CTA */}
          <div className="pt-2 border-t border-slate-200">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsSampleBoxOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-emerald-600 text-emerald-800 text-xs font-bold bg-white hover:bg-emerald-50 transition-colors"
            >
              <Box className="w-4 h-4 text-emerald-600" />
              <span>{t.nav.orderSampleBox}</span>
            </button>
          </div>

        </div>
      )}
    </header>
  );
};
