import React from 'react';
import { 
  Calculator, 
  Building2, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Hero: React.FC = () => {
  const { isB2BMode, setIsB2BMode, setIsCalculatorOpen, setIsInquiryOpen } = useShop();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-slate-900 to-slate-900 text-white pt-12 pb-20 lg:pt-16 lg:pb-24">
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Polska Produkcja • Zakład Oplast Winduga k. Włocławka</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading leading-tight">
              Ekologiczne <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-300">kratki parkingowe</span> i trawnikowe
            </h1>

            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Stabilizacja nawierzchni pod parkingi, podjazdy przydomowe oraz drogi pożarowe. Nośność do <strong>450 t/m²</strong>, 100% recykling PP/PE, certyfikaty ITB oraz 88% powierzchni biologicznie czynnej.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => setIsCalculatorOpen(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-emerald-900/30 hover:shadow-emerald-900/50 hover:scale-[1.02] transition-all cursor-pointer text-base"
              >
                <Calculator className="w-5 h-5" />
                <span>Kalkulator Zapotrzebowania m²</span>
              </button>

              <a
                href="#kratki"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-bold px-7 py-3.5 rounded-xl transition-all hover:scale-[1.02] text-base"
              >
                <span>Przeglądaj Modele H30/H40/H50</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Feature Highlights */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Nośność do 45 ton/oś</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Certyfikat KDWU & PZH</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Wysyłka w 24-48h</span>
              </div>
            </div>

          </div>

          {/* Right Hero Side - Interactive B2B/B2C Advantage Card */}
          <div className="lg:col-span-5">
            <div className="relative bg-gradient-to-b from-slate-800/90 to-slate-900/90 border border-slate-700/80 rounded-2xl p-6 sm:p-7 shadow-2xl backdrop-blur-xl">
              
              {/* Header inside card */}
              <div className="flex items-center justify-between border-b border-slate-700/70 pb-4 mb-5">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
                    {isB2BMode ? 'Strefa Biznesowa' : 'Kupuj jako Klient'}
                  </span>
                  <h3 className="text-lg font-bold text-white font-heading">
                    {isB2BMode ? 'Oferta Hurtowa & Inwestycyjna' : 'Zakup Detaliczny i Przydomowy'}
                  </h3>
                </div>
                <button
                  onClick={() => setIsB2BMode(!isB2BMode)}
                  className="text-xs font-bold px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors"
                >
                  Zmień na {isB2BMode ? 'Detal' : 'Hurt'}
                </button>
              </div>

              {isB2BMode ? (
                /* B2B Mode Card */
                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-slate-200 text-xs sm:text-sm space-y-2">
                    <p className="font-semibold text-emerald-300 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4" />
                      Warunki dla Wykonawców i Hurtowni:
                    </p>
                    <ul className="space-y-1.5 text-slate-300 text-xs">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Rabaty paletowe do <strong>-24%</strong> na kratki H40 i H50
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Dostawy całopojazdowe FTL (do 24 palet / 4 800 szt.)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Odroczony termin płatności dla stałych partnerów
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Krajowa Deklaracja Właściwości Użytkowych (KDWU) pod odbiory
                      </li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                      <p className="text-[11px] text-slate-400 uppercase font-semibold">Min. zamówienie hurt</p>
                      <p className="text-lg font-bold text-white mt-0.5">1 Paleta</p>
                      <p className="text-[11px] text-emerald-400 font-medium">od 200 szt. (45 m²)</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                      <p className="text-[11px] text-slate-400 uppercase font-semibold">Transport FTL</p>
                      <p className="text-lg font-bold text-white mt-0.5">24h - 48h</p>
                      <p className="text-[11px] text-emerald-400 font-medium">Cała Polska i UE</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsInquiryOpen(true)}
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl transition-all cursor-pointer text-sm shadow-md"
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Zapytaj o Ofertę Przetargową / FTL</span>
                  </button>
                </div>
              ) : (
                /* B2C Detal Card */
                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700 text-slate-200 text-xs sm:text-sm space-y-2">
                    <p className="font-semibold text-emerald-400">
                      Szybki zakup na metry kwadratowe:
                    </p>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      Kupuj dokładnie tyle kratek, ile potrzebujesz na podjazd lub ogród. Ceny zawierają podatek VAT 23%. Możliwy odbiór w Windudze lub szybka dostawa kurierem / paletą z windą rozładunkową.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/60">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">H30 Ogród</p>
                      <p className="text-base font-extrabold text-emerald-400">9,10 zł</p>
                      <p className="text-[10px] text-slate-400">brutto / szt.</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/60 ring-1 ring-emerald-500/40">
                      <p className="text-[10px] text-emerald-400 uppercase font-bold">H40 Auto</p>
                      <p className="text-base font-extrabold text-white">10,95 zł</p>
                      <p className="text-[10px] text-slate-400">brutto / szt.</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-800/40 border border-slate-700/60">
                      <p className="text-[10px] text-slate-400 uppercase font-bold">H50 Ciężki</p>
                      <p className="text-base font-extrabold text-emerald-400">14,51 zł</p>
                      <p className="text-[10px] text-slate-400">brutto / szt.</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsCalculatorOpen(true)}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold py-3 px-4 rounded-xl transition-all cursor-pointer text-sm shadow-md"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>Dobierz kratkę do mojego podjazdu</span>
                  </button>
                </div>
              )}

              {/* Bottom Quick Contact */}
              <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                <span>Infolinia doradcza:</span>
                <a href="tel:+48537200630" className="text-emerald-400 font-bold hover:underline">
                  +48 537 200 630
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
