import React from 'react';
import { Layers, ArrowUp, MapPin, ShieldCheck, Cookie, Download } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { 
    setIsCalculatorOpen, 
    setIsSampleBoxOpen, 
    setIsInquiryOpen, 
    setIsB2BMode, 
    setCurrentView,
    setIsPrivacyPolicyOpen,
    setIsCookieSettingsOpen
  } = useShop();
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePwaInstall = () => {
    window.dispatchEvent(new Event('trigger-pwa-install'));
  };

  return (
    <footer className="bg-slate-100 text-slate-600 pt-16 pb-12 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1 & 2: Brand & Legal */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-green-700 flex items-center justify-center text-white shadow-md">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-slate-900 font-heading">
                  OPLAST <span className="text-emerald-600">GARDEN</span>
                </span>
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                  {t.footer.legalName}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              {t.footer.desc}
            </p>

            <div className="pt-2 text-xs text-slate-600 space-y-1 border-t border-slate-200">
              <p className="font-bold text-slate-900">Oplast-Recykling Sp. z o.o.</p>
              <p>Winduga 6, 87-617 Bobrowniki</p>
              <p>woj. kujawsko-pomorskie, Polska</p>
              <p className="text-[11px] text-slate-500 pt-1">
                NIP: 891-160-59-92 • REGON: 340578129 • BDO: 000014298
              </p>
            </div>
          </div>

          {/* Col 3: Asortyment */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider font-heading">
              {t.footer.assortment}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#kratki" className="hover:text-emerald-700 transition-colors">
                  Kratka Parkingowa H40 (250 t/m²)
                </a>
              </li>
              <li>
                <a href="#kratki" className="hover:text-emerald-700 transition-colors">
                  Kratka Ciężka H50 Heavy (450 t/m²)
                </a>
              </li>
              <li>
                <a href="#kratki" className="hover:text-emerald-700 transition-colors">
                  Kratka Ogrodowa H30 (160 t/m²)
                </a>
              </li>
              <li>
                <a href="#obrzeza" className="hover:text-emerald-700 transition-colors">
                  Obrzeża Trawnikowe Eko-Bord 45/58/78
                </a>
              </li>
              <li>
                <a href="#akcesoria" className="hover:text-emerald-700 transition-colors">
                  Kotwy Tworzywowe 18 cm i 24 cm
                </a>
              </li>
              <li>
                <a href="#akcesoria" className="hover:text-emerald-700 transition-colors">
                  Znaczniki Parkingowe (Białe / Żółte)
                </a>
              </li>
              <li>
                <a href="#akcesoria" className="hover:text-emerald-700 transition-colors">
                  Geowłóknina Drenażowa 150g/m²
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Narzędzia & B2B */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider font-heading">
              {t.footer.clientZone}
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setIsCalculatorOpen(true)}
                  className="hover:text-emerald-700 transition-colors text-left cursor-pointer"
                >
                  {t.nav.m2Calculator}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsSampleBoxOpen(true)}
                  className="hover:text-emerald-700 transition-colors text-left cursor-pointer"
                >
                  {t.nav.orderSampleBox}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setIsB2BMode(true); setIsInquiryOpen(true); }}
                  className="hover:text-emerald-700 transition-colors text-left cursor-pointer"
                >
                  {t.nav.investmentQuote}
                </button>
              </li>
              <li>
                <a href="#montaz" className="hover:text-emerald-700 transition-colors">
                  {t.nav.installGuide}
                </a>
              </li>
              <li>
                <a href="#b2b" className="hover:text-emerald-700 transition-colors">
                  {t.nav.forB2B}
                </a>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('partners')}
                  className="text-emerald-800 font-bold hover:underline cursor-pointer flex items-center gap-1"
                >
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{t.partners.navLink}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={handlePwaInstall}
                  className="text-emerald-700 font-bold hover:underline cursor-pointer flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Zainstaluj aplikację PWA</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Kontakt & Godziny */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider font-heading">
              {t.footer.salesDept}
            </h4>
            <div className="space-y-2 text-slate-600">
              <p>
                <span className="block text-slate-500">Infolinia:</span>
                <a href="tel:+48537200630" className="text-slate-900 font-bold hover:text-emerald-700 transition-colors">
                  +48 537 200 630
                </a>
              </p>
              <p>
                <span className="block text-slate-500">Biuro Obsługi:</span>
                <a href="tel:+48542371298" className="text-slate-900 font-bold hover:text-emerald-700 transition-colors">
                  +48 54 237 12 98
                </a>
              </p>
              <p>
                <span className="block text-slate-500">E-mail:</span>
                <a href="mailto:biuro@oplast-garden.pl" className="text-emerald-700 font-semibold hover:underline">
                  biuro@oplast-garden.pl
                </a>
              </p>
              <p className="text-[11px] text-slate-500 pt-1">
                Magazyn i wysyłki: Winduga 6 (Bobrowniki).
              </p>
            </div>
          </div>

        </div>

        {/* Legal & Compliance Strip */}
        <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => setIsPrivacyPolicyOpen(true)}
              className="text-slate-700 hover:text-emerald-700 font-medium transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{t.footer.privacyPolicy}</span>
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={() => setIsCookieSettingsOpen(true)}
              className="text-slate-700 hover:text-emerald-700 font-medium transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Cookie className="w-4 h-4 text-slate-400" />
              <span>{t.footer.cookieSettings}</span>
            </button>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500">{t.rodo.adminNotice}</span>
          </div>

          <div className="text-[11px] text-slate-400">
            Certyfikaty ITB • Zakład Przetwórstwa Tworzyw Sztucznych Winduga
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} <strong>Oplast-Recykling Sp. z o.o.</strong> {t.footer.allRights}. Marka <strong>Oplast Garden</strong>.
          </div>

          <div className="flex items-center gap-4">
            <span>{t.footer.tagline}</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white hover:bg-slate-50 text-slate-700 hover:text-emerald-700 border border-slate-300 transition-colors cursor-pointer shadow-xs"
              title="Top"
              aria-label="Przewiń do góry"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
