import React, { useState, useEffect } from 'react';
import { Download, Share, PlusSquare, X, Smartphone, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

export const PwaInstallPrompt: React.FC = () => {
  const { t } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [isIos, setIsIos] = useState<boolean>(false);
  const [showIosGuide, setShowIosGuide] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('oplast_pwa_dismissed') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    // Check if running in standalone mode (already installed)
    const checkStandalone = () => {
      const isStandaloneMode = 
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
        document.referrer.includes('android-app://');
      setIsStandalone(!!isStandaloneMode);
    };

    checkStandalone();

    // Check if iOS
    const ua = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(ua);
    setIsIos(isIosDevice);

    // Listen for Chrome/Edge/Samsung beforeinstallprompt event
    const handleBeforeInstall = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    // Listen for manual trigger from navbar / drawer
    const handleCustomTrigger = () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
      } else if (isIosDevice) {
        setShowIosGuide(true);
      } else {
        alert('Aby zainstalować aplikację, otwórz menu przeglądarki (trzy kropki) i wybierz "Zainstaluj aplikację" lub "Dodaj do ekranu głównego".');
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('trigger-pwa-install', handleCustomTrigger);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('trigger-pwa-install', handleCustomTrigger);
    };
  }, [deferredPrompt]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setDeferredPrompt(null);
        setIsStandalone(true);
      }
    } else if (isIos) {
      setShowIosGuide(true);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      sessionStorage.setItem('oplast_pwa_dismissed', 'true');
    } catch {
      // ignore
    }
  };

  // If already installed or dismissed, do not show floating banner
  if (isStandalone || isDismissed) {
    // Still render iOS guide modal if opened
    if (showIosGuide) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Smartphone className="w-5 h-5 text-emerald-600" />
                <span>Instalacja na iOS (Safari)</span>
              </div>
              <button 
                onClick={() => setShowIosGuide(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-xs text-slate-600 space-y-3">
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="p-1.5 rounded-lg bg-white border border-slate-200 text-blue-600">
                  <Share className="w-4 h-4" />
                </div>
                <div>
                  <strong>Krok 1:</strong> Kliknij przycisk <strong>Udostępnij</strong> na dolnym pasku przeglądarki Safari.
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="p-1.5 rounded-lg bg-white border border-slate-200 text-emerald-600">
                  <PlusSquare className="w-4 h-4" />
                </div>
                <div>
                  <strong>Krok 2:</strong> Przewiń w dół i wybierz <strong>„Do ekranu początkowego”</strong>.
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowIosGuide(false)}
              className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs"
            >
              Rozumiem
            </button>
          </div>
        </div>
      );
    }
    return null;
  }

  // Only show the floating prompt if we have a deferred prompt OR on mobile iOS
  const canInstall = !!deferredPrompt || isIos;
  if (!canInstall) return null;

  return (
    <>
      {/* Floating PWA Install Banner */}
      <aside 
        className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-40 bg-white/95 backdrop-blur-md rounded-2xl border border-emerald-200/90 shadow-2xl p-4 animate-in slide-in-from-bottom-4 duration-300"
        aria-label="Powiadomienie o instalacji aplikacji"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 text-white flex items-center justify-center shrink-0 shadow-md">
            <Download className="w-5 h-5" />
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm font-heading">
                {t.pwa.installTitle}
              </h4>
              <button
                onClick={handleDismiss}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
                aria-label="Zamknij powiadomienie"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              {t.pwa.installDesc}
            </p>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={handleInstallClick}
                className="flex-1 py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t.pwa.installBtn}</span>
              </button>
              <button
                onClick={handleDismiss}
                className="py-1.5 px-2.5 text-slate-500 hover:text-slate-700 text-xs font-semibold"
              >
                {t.pwa.dismiss}
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* iOS Safari Instruction Modal */}
      {showIosGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Smartphone className="w-5 h-5 text-emerald-600" />
                <span>Instalacja na iOS (Safari)</span>
              </div>
              <button 
                onClick={() => setShowIosGuide(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-xs text-slate-600 space-y-3">
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="p-1.5 rounded-lg bg-white border border-slate-200 text-blue-600">
                  <Share className="w-4 h-4" />
                </div>
                <div>
                  <strong>Krok 1:</strong> Kliknij ikonę <strong>Udostępnij</strong> na dolnym pasku przeglądarki Safari.
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="p-1.5 rounded-lg bg-white border border-slate-200 text-emerald-600">
                  <PlusSquare className="w-4 h-4" />
                </div>
                <div>
                  <strong>Krok 2:</strong> Przewiń w dół i wybierz <strong>„Do ekranu początkowego”</strong>.
                </div>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-900 text-[11px] flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Aplikacja pojawi się obok Twoich ikon na pulpicie.</span>
            </div>
            <button
              onClick={() => setShowIosGuide(false)}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs cursor-pointer shadow-md"
            >
              Rozumiem, zamknij
            </button>
          </div>
        </div>
      )}
    </>
  );
};
