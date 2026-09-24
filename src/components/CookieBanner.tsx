import React, { useState, useEffect } from 'react';
import { Cookie, ShieldCheck, X, Check, Settings2, Sliders } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

const COOKIE_STORAGE_KEY = 'oplast_cookie_consent_v1';

export const CookieBanner: React.FC = () => {
  const { 
    isCookieSettingsOpen, 
    setIsCookieSettingsOpen, 
    setIsPrivacyPolicyOpen 
  } = useShop();
  const { t } = useLanguage();

  const [hasConsent, setHasConsent] = useState<boolean>(true); // start true to prevent SSR/hydration flash
  const [analyticsAllowed, setAnalyticsAllowed] = useState<boolean>(true);
  const [marketingAllowed, setMarketingAllowed] = useState<boolean>(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COOKIE_STORAGE_KEY);
      if (!stored) {
        setHasConsent(false);
      } else {
        const parsed: CookiePreferences = JSON.parse(stored);
        setAnalyticsAllowed(parsed.analytics ?? true);
        setMarketingAllowed(parsed.marketing ?? false);
        setHasConsent(true);
      }
    } catch {
      setHasConsent(false);
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(prefs));
    } catch (e) {
      console.warn('Failed to save cookie consent to localStorage', e);
    }
    setAnalyticsAllowed(prefs.analytics);
    setMarketingAllowed(prefs.marketing);
    setHasConsent(true);
    setIsCookieSettingsOpen(false);
  };

  const handleAcceptAll = () => {
    saveConsent({
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now(),
    });
  };

  const handleEssentialOnly = () => {
    saveConsent({
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
    });
  };

  const handleSaveCustom = () => {
    saveConsent({
      essential: true,
      analytics: analyticsAllowed,
      marketing: marketingAllowed,
      timestamp: Date.now(),
    });
  };

  return (
    <>
      {/* Floating Bottom Cookie Banner (Shown when user has not yet consented) */}
      {!hasConsent && (
        <div 
          className="fixed bottom-0 inset-x-0 z-45 p-3 sm:p-4 animate-in slide-in-from-bottom-5 duration-300 pointer-events-none"
          role="region"
          aria-label="Baner plików cookies"
        >
          <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-md border border-slate-300/80 rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-5 pointer-events-auto flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Banner Left Info */}
            <div className="flex items-start gap-3 sm:gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                <Cookie className="w-5 h-5 text-emerald-700" />
              </div>
              <div className="space-y-1 text-left">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900 text-sm sm:text-base font-heading">
                    {t.cookieBanner.title}
                  </h3>
                  <span className="hidden sm:inline-block text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    RODO
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                  {t.cookieBanner.desc}{' '}
                  <button
                    onClick={() => setIsPrivacyPolicyOpen(true)}
                    className="text-emerald-700 font-bold hover:underline cursor-pointer"
                  >
                    Dowiedz się więcej w Polityce Prywatności
                  </button>.
                </p>
              </div>
            </div>

            {/* Banner Actions */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 w-full md:w-auto shrink-0 justify-end">
              <button
                onClick={() => setIsCookieSettingsOpen(true)}
                className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sliders className="w-3.5 h-3.5 text-slate-500" />
                <span>{t.cookieBanner.manage}</span>
              </button>

              <button
                onClick={handleEssentialOnly}
                className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100 border border-slate-300 transition-colors cursor-pointer text-center"
              >
                {t.cookieBanner.rejectNonEssential}
              </button>

              <button
                onClick={handleAcceptAll}
                className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all cursor-pointer text-center flex items-center justify-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{t.cookieBanner.acceptAll}</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Detailed Cookie Settings Modal */}
      {isCookieSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="relative w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-settings-title"
          >
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Settings2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 id="cookie-settings-title" className="font-bold text-base sm:text-lg font-heading">
                    {t.cookieBanner.settingsTitle}
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Oplast-Recykling Sp. z o.o. • Ochrona prywatności i RODO
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCookieSettingsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Zamknij"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Settings Body */}
            <div className="p-6 space-y-4 overflow-y-auto text-xs sm:text-sm text-slate-700">
              
              {/* Category 1: Essential */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-slate-900">{t.cookieBanner.essentialTitle}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-200 text-slate-700 uppercase">
                    Zawsze aktywne
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.cookieBanner.essentialDesc} Umożliwiają prawidłową nawigację, obsługę formularzy wycen, zapamiętanie zgody oraz instalację aplikacji PWA na ekranie początkowym.
                </p>
              </div>

              {/* Category 2: Analytics */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cookie className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-slate-900">{t.cookieBanner.analyticsTitle}</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={analyticsAllowed}
                      onChange={(e) => setAnalyticsAllowed(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {t.cookieBanner.analyticsDesc} Zbierane dane są w pełni zanonimizowane i pomagają nam diagnozować wydajność działania kalkulatora oraz katalogu kratek.
                </p>
              </div>

              {/* Category 3: Marketing & Partners */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-slate-900">Personalizacja i sieć partnerska</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={marketingAllowed}
                      onChange={(e) => setMarketingAllowed(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ułatwia zapamiętanie najbliższego wybranego partnera handlowego oraz filtrowanie magazynów lokalnych z kratkami Oplast w Twojej okolicy.
                </p>
              </div>

              {/* Link to Privacy Policy */}
              <div className="pt-2 text-center">
                <button
                  onClick={() => {
                    setIsCookieSettingsOpen(false);
                    setIsPrivacyPolicyOpen(true);
                  }}
                  className="text-xs text-emerald-700 hover:text-emerald-900 font-bold underline cursor-pointer"
                >
                  Przeczytaj pełną treść Polityki Prywatności i Informacji RODO
                </button>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shrink-0">
              <button
                onClick={handleEssentialOnly}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                {t.cookieBanner.rejectNonEssential}
              </button>

              <button
                onClick={handleSaveCustom}
                className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                {t.cookieBanner.savePreferences}
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
