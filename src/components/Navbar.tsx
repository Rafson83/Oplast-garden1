import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Layers, 
  Phone, 
  Menu, 
  X, 
  Building2, 
  ShieldCheck, 
  Box,
  MapPin,
  LogIn,
  LogOut,
  UserCheck,
  Download,
  Shield,
  Cookie
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Navbar: React.FC = () => {
  const { 
    currentView,
    setCurrentView,
    isB2BMode, 
    setIsB2BMode, 
    setIsCalculatorOpen,
    setIsSampleBoxOpen,
    partnerUser,
    logoutPartner,
    setIsLoginModalOpen,
    setIsPrivacyPolicyOpen,
    setIsCookieSettingsOpen
  } = useShop();

  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      
      {/* Sleek Single-Line Top Bar (Hidden on tiny screens to prevent multi-line clutter) */}
      <div className="hidden sm:block bg-emerald-50/80 border-b border-emerald-100/80 text-emerald-950 text-xs py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Left: Concise Factory Info */}
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-900 truncate">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">Polski Producent • Zakład Produkcyjny Winduga (kujawsko-pomorskie)</span>
          </div>

          {/* Right: Hotline & Sample Box */}
          <div className="flex items-center gap-4 shrink-0 text-xs font-semibold">
            <a 
              href="tel:+48537200630" 
              className="flex items-center gap-1.5 text-emerald-900 hover:text-emerald-700 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Infolinia: <strong>+48 537 200 630</strong></span>
            </a>
            <span className="text-emerald-300">|</span>
            <button
              onClick={() => setIsSampleBoxOpen(true)}
              className="flex items-center gap-1.5 text-emerald-700 hover:text-emerald-900 font-bold cursor-pointer transition-colors"
            >
              <Box className="w-3.5 h-3.5 text-emerald-600" />
              <span>{t.nav.orderSampleBox}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-3">
          
          {/* Logo */}
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              setCurrentView('home');
            }}
            className="flex items-center gap-2.5 group shrink-0 cursor-pointer"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 font-heading">
                  OPLAST
                </span>
                <span className="font-bold text-lg sm:text-xl text-emerald-600 font-heading">
                  GARDEN
                </span>
              </div>
              <p className="text-[9px] font-semibold tracking-wider uppercase text-slate-400">
                Fabryka Kratek i Obrzeży
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 text-sm font-semibold text-slate-700">
            <a 
              href="#produkty" 
              onClick={() => {
                if (currentView !== 'home') setCurrentView('home');
              }}
              className="hover:text-emerald-600 transition-colors py-1 hover:underline underline-offset-4"
            >
              {t.nav.products}
            </a>

            <button 
              onClick={() => setCurrentView('partners')}
              className={`flex items-center gap-1.5 py-1 transition-colors cursor-pointer font-bold ${
                currentView === 'partners'
                  ? 'text-emerald-700 underline underline-offset-4 decoration-2'
                  : 'text-slate-700 hover:text-emerald-600'
              }`}
            >
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>{t.partners.navLink}</span>
            </button>

            <button 
              onClick={() => setIsCalculatorOpen(true)}
              className="flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 py-1 transition-colors cursor-pointer font-bold"
            >
              <Calculator className="w-4 h-4 text-emerald-600" />
              <span>{t.nav.m2Calculator}</span>
            </button>

            <a 
              href="#b2b" 
              onClick={() => {
                if (currentView !== 'home') setCurrentView('home');
              }}
              className="hover:text-emerald-600 transition-colors py-1 flex items-center gap-1"
            >
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span>{t.nav.forB2B}</span>
            </a>

            <a 
              href="#montaz" 
              onClick={() => {
                if (currentView !== 'home') setCurrentView('home');
              }}
              className="hover:text-emerald-600 transition-colors py-1"
            >
              {t.nav.installGuideShort}
            </a>

            <a 
              href="#kontakt" 
              onClick={() => {
                if (currentView !== 'home') setCurrentView('home');
              }}
              className="hover:text-emerald-600 transition-colors py-1"
            >
              {t.nav.contact}
            </a>
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            
            {/* Language Switcher */}
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            {/* Price Mode Toggle (B2C / B2B) */}
            <div className="bg-slate-100 p-0.5 sm:p-1 rounded-xl border border-slate-200 flex items-center shadow-inner">
              <button
                onClick={() => setIsB2BMode(false)}
                className={`px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  !isB2BMode
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200/60'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {t.nav.b2cMode}
              </button>
              <button
                onClick={() => setIsB2BMode(true)}
                className={`px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  isB2BMode
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-emerald-800'
                }`}
              >
                <Building2 className="w-3 h-3" />
                {t.nav.b2bMode}
              </button>
            </div>

            {/* Partner Login / CRM Button (Replaces Cart) */}
            {partnerUser ? (
              /* User Logged In: CRM Badge + Actions */
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentView('admin')}
                  className={`flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
                    currentView === 'admin'
                      ? 'bg-slate-900 text-white ring-2 ring-emerald-500/50'
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                  }`}
                  title="Otwórz panel zarządzania siecią i CRM"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span className="hidden lg:inline">{partnerUser.role === 'admin' ? 'Panel CRM (Admin)' : 'Panel Partnera'}</span>
                  <span className="lg:hidden">CRM</span>
                </button>

                <button
                  onClick={logoutPartner}
                  className="p-1.5 sm:p-2 rounded-xl text-slate-500 hover:text-red-700 hover:bg-red-50 border border-slate-200 transition-colors cursor-pointer"
                  title="Wyloguj się"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              /* User Logged Out: Partner Login Button */
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="flex items-center gap-1.5 py-1.5 sm:py-2 px-3 sm:px-3.5 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                title="Logowanie do Strefy Partnera i CRM"
              >
                <LogIn className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">{t.nav.partnerZone}</span>
                <span className="sm:hidden">{t.nav.partnerLogin}</span>
              </button>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? "Zamknij menu" : "Otwórz menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-emerald-700" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer Overlay Backdrop */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-30 md:hidden animate-in fade-in duration-200"
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Menu - Clean, Modern, Scrollable */}
      {mobileMenuOpen && (
        <div className="relative z-40 md:hidden border-t border-slate-200 bg-white/98 backdrop-blur-xl px-4 pt-3 pb-8 space-y-4 animate-in slide-in-from-top-4 duration-200 shadow-2xl max-h-[calc(100vh-4rem)] overflow-y-auto">
          
          {/* Controls Bar: Language + Mode Switcher */}
          <div className="space-y-2 p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700">Język / Language:</span>
              <LanguageSwitcher compact />
            </div>

            <div className="pt-2 border-t border-slate-200/80">
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => setIsB2BMode(false)}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    !isB2BMode ? 'bg-white border-emerald-600 text-emerald-900 shadow-xs' : 'bg-slate-100 text-slate-600 border-transparent'
                  }`}
                >
                  {t.nav.b2cMode}
                </button>
                <button
                  onClick={() => setIsB2BMode(true)}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
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
              onClick={() => {
                setMobileMenuOpen(false);
                if (currentView !== 'home') setCurrentView('home');
              }}
              className="px-3 py-2.5 rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-between"
            >
              <span>{t.nav.products}</span>
              <span className="text-xs text-slate-400 font-normal">H30 • H40 • H50</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setCurrentView('partners');
              }}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-emerald-50 text-emerald-900 font-bold hover:bg-emerald-100 transition-colors text-left cursor-pointer border border-emerald-200/60"
            >
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t.partners.navLink}</span>
              </div>
              <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">Mapa</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsCalculatorOpen(true);
              }}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl hover:bg-slate-100 text-slate-800 font-semibold transition-colors text-left cursor-pointer"
            >
              <Calculator className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{t.nav.m2Calculator}</span>
            </button>

            <a 
              href="#b2b" 
              onClick={() => {
                setMobileMenuOpen(false);
                if (currentView !== 'home') setCurrentView('home');
              }}
              className="px-3 py-2.5 rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-slate-500" />
                <span>{t.nav.forB2B}</span>
              </div>
              <span className="text-[10px] bg-slate-200 text-slate-800 px-2 py-0.5 rounded-full font-bold">Inwestycje</span>
            </a>

            <a 
              href="#montaz" 
              onClick={() => {
                setMobileMenuOpen(false);
                if (currentView !== 'home') setCurrentView('home');
              }}
              className="px-3 py-2.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              {t.nav.installGuideShort}
            </a>

            <a 
              href="#kontakt" 
              onClick={() => {
                setMobileMenuOpen(false);
                if (currentView !== 'home') setCurrentView('home');
              }}
              className="px-3 py-2.5 rounded-xl hover:bg-slate-100 transition-colors"
            >
              {t.nav.contact}
            </a>
          </div>

          {/* PWA Mobile Install CTA in Drawer */}
          <div className="p-3 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border border-emerald-200/80 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Download className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-900 leading-tight">Aplikacja Oplast</p>
                <p className="text-[10px] text-emerald-700 font-medium">Kalkulator m² offline</p>
              </div>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                window.dispatchEvent(new Event('trigger-pwa-install'));
              }}
              className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Zainstaluj
            </button>
          </div>

          {/* Partner Zone / CRM CTA in Mobile Drawer */}
          <div className="pt-2 border-t border-slate-200 space-y-2">
            {partnerUser ? (
              <div className="space-y-1.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCurrentView('admin');
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  <span>Otwórz Panel CRM ({partnerUser.name})</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logoutPartner();
                  }}
                  className="w-full text-center text-xs font-semibold text-red-600 py-1.5 hover:underline"
                >
                  Wyloguj się
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsLoginModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-md cursor-pointer"
              >
                <LogIn className="w-4 h-4 text-emerald-400" />
                <span>Strefa Partnera (Zaloguj się do CRM)</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsSampleBoxOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-emerald-600 text-emerald-800 text-xs font-bold bg-white hover:bg-emerald-50 transition-colors cursor-pointer"
            >
              <Box className="w-4 h-4 text-emerald-600" />
              <span>{t.nav.orderSampleBox}</span>
            </button>
          </div>

          {/* Drawer Privacy & RODO Links */}
          <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsPrivacyPolicyOpen(true);
              }}
              className="hover:text-emerald-700 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Shield className="w-3 h-3 text-emerald-600" />
              <span>Polityka prywatności (RODO)</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsCookieSettingsOpen(true);
              }}
              className="hover:text-emerald-700 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Cookie className="w-3 h-3 text-slate-400" />
              <span>Cookies</span>
            </button>
          </div>

        </div>
      )}
    </header>
  );
};
