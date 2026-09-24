import React from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  FileText, 
  Cookie, 
  Server, 
  UserCheck, 
  ExternalLink,
  Mail,
  Phone,
  Building2,
  Printer
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';

export const PrivacyPolicyModal: React.FC = () => {
  const { isPrivacyPolicyOpen, setIsPrivacyPolicyOpen, setIsCookieSettingsOpen } = useShop();
  const { t } = useLanguage();

  if (!isPrivacyPolicyOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-policy-title"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4.5 bg-gradient-to-r from-emerald-800 to-green-900 text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <ShieldCheck className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="privacy-policy-title" className="text-lg sm:text-xl font-bold font-heading">
                  {t.rodo.policyTitle}
                </h2>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/30 text-emerald-200 border border-emerald-400/30">
                  RODO / GDPR
                </span>
              </div>
              <p className="text-xs text-emerald-100/90">
                {t.rodo.policySubtitle} • {t.rodo.lastUpdated}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
              title="Drukuj politykę prywatności"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Drukuj</span>
            </button>
            <button
              onClick={() => setIsPrivacyPolicyOpen(false)}
              className="p-2 rounded-xl text-emerald-100 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Zamknij"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Scrollable Document Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 text-xs sm:text-sm text-slate-700 leading-relaxed">
          
          {/* Quick Info Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
              <Lock className="w-4 h-4 text-emerald-700" />
              <span>Najważniejsze informacje w pigułce:</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-700">
              Szanujemy Twoją prywatność. Twoje dane osobowe przekazywane w formularzach (zapytania ofertowe B2B, bezpośredni kontakt z partnerem handlowym, zapytania o kalkulację nawierzchni) są chronione zgodnie z <strong>Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 (RODO)</strong> oraz polską Ustawą o ochronie danych osobowych. Nie handlujemy danymi ani nie przekazujemy ich osobom nieuprawnionym.
            </p>
          </div>

          {/* Section 1: Administrator */}
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading flex items-center gap-2 border-b border-slate-200 pb-2">
              <Building2 className="w-4 h-4 text-emerald-600" />
              <span>1. Administrator Danych Osobowych (ADO)</span>
            </h3>
            <p>
              Administratorem Twoich danych osobowych jest:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-1.5 font-medium">
              <p className="text-slate-900 font-bold text-sm">Przedsiębiorstwo Produkcyjno-Handlowo-Usługowe „OPLAST-RECYKLING” Sp. z o.o.</p>
              <p>Zakład Produkcyjny: <strong>Winduga 6, 87-617 Bobrowniki</strong>, woj. kujawsko-pomorskie, Polska</p>
              <p>NIP: <strong>891-160-59-92</strong> • REGON: <strong>340578129</strong> • Numer BDO: <strong>000014298</strong></p>
              <p>Właściciel marki handlowej: <strong>Oplast Garden</strong></p>
              <div className="pt-2 flex flex-wrap gap-4 text-emerald-800 font-bold">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> E-mail: biuro@oplast.pl / rodo@oplast.pl
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> Infolinia RODO / Dział Handlowy: +48 537 200 630
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Podstawy prawne */}
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading flex items-center gap-2 border-b border-slate-200 pb-2">
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>2. Cele i podstawy prawne przetwarzania danych</span>
            </h3>
            <p>
              Dane przetwarzane są wyłącznie w ściśle określonych, prawnie uzasadnionych celach:
            </p>
            <div className="grid gap-3 sm:grid-cols-2 text-xs">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-1">
                <p className="font-bold text-emerald-800">A. Obsługa zapytań ofertowych i wycen B2B / Detal</p>
                <p className="text-slate-600">
                  Podstawa: <strong>art. 6 ust. 1 lit. b RODO</strong> (czynności zmierzające do zawarcia i realizacji umowy lub przygotowanie wyceny na żądanie osoby).
                </p>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-1">
                <p className="font-bold text-emerald-800">B. Realizacja zamówień hurtowych i dostaw FTL 24t</p>
                <p className="text-slate-600">
                  Podstawa: <strong>art. 6 ust. 1 lit. b RODO</strong> (realizacja dostaw paletowych i całopojazdowych kratek oraz obrzeży na plac budowy lub do magazynu).
                </p>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-1">
                <p className="font-bold text-emerald-800">C. Przekierowanie do lokalnego partnera handlowego</p>
                <p className="text-slate-600">
                  Podstawa: <strong>art. 6 ust. 1 lit. b oraz lit. f RODO</strong> (prawnie uzasadniony interes – umożliwienie klientowi zakupu na sztuki bez kosztownego frachtu fabrycznego).
                </p>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white shadow-xs space-y-1">
                <p className="font-bold text-emerald-800">D. Rozliczenia podatkowo-księgowe i archiwizacja</p>
                <p className="text-slate-600">
                  Podstawa: <strong>art. 6 ust. 1 lit. c RODO</strong> (wypełnienie ciążących na Administratorze obowiązków prawnych, w tym ustawy o rachunkowości).
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Odbiorcy danych */}
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading flex items-center gap-2 border-b border-slate-200 pb-2">
              <Server className="w-4 h-4 text-emerald-600" />
              <span>3. Odbiorcy danych i podmioty przetwarzające</span>
            </h3>
            <p>
              Dane osobowe mogą być udostępniane podmiotom współpracującym wyłącznie w zakresie niezbędnym do realizacji celów:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
              <li>
                <strong>Operatorom logistycznym, kurierom i spedycji paletowej:</strong> w celu doręczenia zamówień hurtowych, transportów paletowych lub dostaw pełnosamochodowych (FTL 24t).
              </li>
              <li>
                <strong>Autoryzowanym punktom partnerskim:</strong> w przypadku wysłania zapytania do konkretnego lokalnego składu lub centrum brukarskiego.
              </li>
              <li>
                <strong>Dostawcom usług IT i hostingu:</strong> podmiotom zapewniającym utrzymanie bezpiecznej infrastruktury serwerowej i pocztowej.
              </li>
              <li>
                <strong>Kancelariom prawnym i biuru księgowemu:</strong> w zakresie niezbędnym do obsługi rozliczeń i obrony przed ewentualnymi roszczeniami.
              </li>
            </ul>
          </div>

          {/* Section 4: Prawa użytkownika */}
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading flex items-center gap-2 border-b border-slate-200 pb-2">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              <span>4. Twoje prawa wynikające z RODO</span>
            </h3>
            <p>Każdej osobie, której dane dotyczą, przysługują następujące uprawnienia:</p>
            <div className="grid sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <strong>Prawo dostępu do danych (art. 15 RODO)</strong> – możliwość uzyskania informacji, jakie dane przetwarzamy.
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <strong>Prawo do sprostowania (art. 16 RODO)</strong> – możliwość poprawienia nieprawidłowych lub niekompletnych danych.
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <strong>Prawo do usunięcia („bycia zapomnianym”, art. 17)</strong> – gdy dane nie są już potrzebne do celów, dla których zostały zebrane.
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <strong>Prawo do ograniczenia przetwarzania (art. 18 RODO)</strong> – wstrzymanie operacji na danych na wniosek klienta.
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <strong>Prawo do sprzeciwu (art. 21 RODO)</strong> – sprzeciw wobec przetwarzania w ramach uzasadnionego interesu.
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                <strong>Prawo wniesienia skargi do PUODO</strong> – Urząd Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa.
              </div>
            </div>
            <p className="text-xs text-slate-500 pt-1">
              W celu realizacji powyższych praw wystarczy przesłać wiadomość e-mail na adres: <strong>rodo@oplast.pl</strong> lub listownie na adres siedziby fabryki.
            </p>
          </div>

          {/* Section 5: Cookies & PWA */}
          <div className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading flex items-center gap-2 border-b border-slate-200 pb-2">
              <Cookie className="w-4 h-4 text-emerald-600" />
              <span>5. Pliki Cookies i Aplikacja Progresywna (PWA)</span>
            </h3>
            <p className="text-xs">
              Serwis internetowy Oplast Garden korzysta z plików cookies (ciasteczek) oraz technologii Web App Service Worker:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
              <li>
                <strong>Niezbędne (techniczne):</strong> Zapewniają sprawne działanie kalkulatora m², zapamiętywanie trybu hurtowego (B2B) lub detalicznego oraz pamięć podręczną PWA dla działania offline.
              </li>
              <li>
                <strong>Analityczne i funkcjonalne:</strong> Anonimowe statystyki wejść, ułatwiające dostosowanie wydajności serwisu do najczęściej używanych urządzeń.
              </li>
            </ul>
            <div className="pt-2">
              <button
                onClick={() => {
                  setIsPrivacyPolicyOpen(false);
                  setIsCookieSettingsOpen(true);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 underline underline-offset-4 cursor-pointer"
              >
                <span>Dostosuj preferencje plików cookies w naszym banerze</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <p className="text-[11px] text-slate-500 text-center sm:text-left">
            Oplast-Recykling Sp. z o.o. • NIP: 891-160-59-92 • Winduga 6, Bobrowniki
          </p>
          <button
            onClick={() => setIsPrivacyPolicyOpen(false)}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
          >
            {t.rodo.close}
          </button>
        </div>

      </div>
    </div>
  );
};
