import React from 'react';
import { Layers, ArrowUp } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { setIsCalculatorOpen, setIsSampleBoxOpen, setIsInquiryOpen, setIsB2BMode } = useShop();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-100 text-slate-600 pt-16 pb-12 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main 4 Columns */}
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
                  Producent Kratek & Obrzeży Ogrodowych
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed max-w-sm">
              Bezpośredni producent ekologicznych kratek trawnikowo-parkingowych (ekokratek) i elastycznych obrzeży ogrodowych z tworzywa pochodzącego w 100% z polskiego recyklingu.
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
              Asortyment
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
              Strefa Klienta & B2B
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setIsCalculatorOpen(true)}
                  className="hover:text-emerald-700 transition-colors text-left cursor-pointer"
                >
                  Kalkulator Powierzchni m²
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsSampleBoxOpen(true)}
                  className="hover:text-emerald-700 transition-colors text-left cursor-pointer"
                >
                  Darmowy Box Próbek dla Firm
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setIsB2BMode(true); setIsInquiryOpen(true); }}
                  className="hover:text-emerald-700 transition-colors text-left cursor-pointer"
                >
                  Zapytanie o Wycenę FTL (24t)
                </button>
              </li>
              <li>
                <a href="#montaz" className="hover:text-emerald-700 transition-colors">
                  Instrukcja Montażu Podbudowy
                </a>
              </li>
              <li>
                <a href="#b2b" className="hover:text-emerald-700 transition-colors">
                  Warunki Współpracy Hurtowej
                </a>
              </li>
              <li>
                <button
                  onClick={() => setIsB2BMode(true)}
                  className="text-emerald-700 font-bold hover:underline cursor-pointer"
                >
                  Przełącz na Ceny Netto (Hurt B2B)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Kontakt & Godziny */}
          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider font-heading">
              Dział Handlowy
            </h4>
            <div className="space-y-2 text-slate-600">
              <p>
                <span className="block text-slate-500">Infolinia Inwestycyjna:</span>
                <a href="tel:+48537200630" className="text-slate-900 font-bold hover:text-emerald-700 transition-colors">
                  +48 537 200 630
                </a>
              </p>
              <p>
                <span className="block text-slate-500">Biuro Obsługi / Detal:</span>
                <a href="tel:+48542371298" className="text-slate-900 font-bold hover:text-emerald-700 transition-colors">
                  +48 54 237 12 98
                </a>
              </p>
              <p>
                <span className="block text-slate-500">Adres E-mail:</span>
                <a href="mailto:biuro@oplast-garden.pl" className="text-emerald-700 font-semibold hover:underline">
                  biuro@oplast-garden.pl
                </a>
              </p>
              <p className="text-[11px] text-slate-500 pt-1">
                Wysyłki realizujemy z magazynu głównego: Winduga 6 (Bobrowniki).
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} <strong>Oplast-Recykling Sp. z o.o.</strong> Wszelkie prawa zastrzeżone. Marka <strong>Oplast Garden</strong>.
          </div>

          <div className="flex items-center gap-4">
            <span>Ekologiczne rozwiązania dla budownictwa</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white hover:bg-slate-50 text-slate-700 hover:text-emerald-700 border border-slate-300 transition-colors cursor-pointer shadow-xs"
              title="Przewiń do góry"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
