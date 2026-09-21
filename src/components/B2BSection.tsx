import React from 'react';
import { 
  Building2, 
  Truck, 
  Box, 
  CheckCircle2, 
  ArrowRight, 
  FileSpreadsheet,
  HardHat,
  Compass,
  Store
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const B2BSection: React.FC = () => {
  const { setIsSampleBoxOpen, setIsInquiryOpen, setIsB2BMode } = useShop();

  return (
    <section id="b2b" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-700/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-semibold">
            <Building2 className="w-4 h-4" />
            <span>Strefa Hurtowa i Inwestycyjna Oplast Garden</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading">
            Dedykowane warunki dla branży budowlanej i projektowej
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Współpracujemy z generalnymi wykonawcami, składami budowlanymi, brukarzami oraz biurami architektonicznymi w Polsce i całej Europie. Oferujemy niezawodne łańcuchy dostaw prosto z fabryki w Windudze.
          </p>
        </div>

        {/* 4 Professional Target Groups */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Generalni Wykonawcy */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 hover:border-emerald-500/40 transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <HardHat className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-heading">Generalni Wykonawcy</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Inwestycje komercyjne, hale logistyczne, osiedla deweloperskie i drogi pożarowe.
                </p>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-700/60">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Dostawy FTL 24t just-in-time</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Komplet dokumentacji KDWU & ITB</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Faktury z odroczonym terminem</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => { setIsB2BMode(true); setIsInquiryOpen(true); }}
              className="mt-6 w-full text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-emerald-950/40 border border-emerald-800/50 hover:bg-emerald-950/80 transition-colors"
            >
              <span>Wycena inwestycji</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Składy i Hurtownie */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 hover:border-emerald-500/40 transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Store className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-heading">Hurtownie i Składy</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Materiały budowlane, centra ogrodnicze i dystrybutorzy kruszywa.
                </p>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-700/60">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Maksymalne rabaty dystrybutorskie</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Ekspozytory i stojaki próbek</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Stała dostępność stanów magazynowych</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => { setIsB2BMode(true); setIsInquiryOpen(true); }}
              className="mt-6 w-full text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-emerald-950/40 border border-emerald-800/50 hover:bg-emerald-950/80 transition-colors"
            >
              <span>Zostań dystrybutorem</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Brukarze i Wykonawcy */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 hover:border-emerald-500/40 transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-heading">Brukarze i Instalatorzy</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Firmy wykonawcze układające podjazdy, parkingi i stabilizacje gruntu.
                </p>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-700/60">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Program lojalnościowy wykonawców</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Szybki montaż na zaczepy Quick-Lock</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Komplety: kratki + obrzeża + kotwy</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => { setIsB2BMode(true); setIsInquiryOpen(true); }}
              className="mt-6 w-full text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-emerald-950/40 border border-emerald-800/50 hover:bg-emerald-950/80 transition-colors"
            >
              <span>Program wykonawcy</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 4: Architekci Krajobrazu */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 hover:border-emerald-500/40 transition-all group flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-heading">Biura Projektowe</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Architekci krajobrazu, projektanci dróg, specjaliści retencji wód.
                </p>
              </div>
              <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-700/60">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>88% pow. biologicznie czynnej</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Modele CAD (DWG) i przekroje PDF</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Darmowy próbnik do biura projektowego</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setIsSampleBoxOpen(true)}
              className="mt-6 w-full text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-emerald-950/40 border border-emerald-800/50 hover:bg-emerald-950/80 transition-colors"
            >
              <span>Zamów Box Próbek</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Free Sample Box Promo CTA Banner */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-green-800 rounded-3xl p-8 sm:p-10 shadow-2xl border border-emerald-600/50 relative overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-bold uppercase tracking-wider border border-white/20">
                Dla Firm & Projektantów
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
                Zamów Bezpłatny „Oplast Box” z Próbkami Kratek
              </h3>
              <p className="text-emerald-100 text-sm sm:text-base leading-relaxed max-w-2xl">
                Otrzymaj bezpłatny zestaw demonstracyjny zawierający fizyczne próbki kratek H30, H40, H50, obrzeża Eko-Bord, kotwy oraz katalog techniczny z aprobatami. Wysyłamy kurierem w 24h na koszt fabryki!
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={() => setIsSampleBoxOpen(true)}
                className="flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-emerald-950 font-extrabold py-4 px-6 rounded-xl shadow-lg transition-all hover:scale-105 cursor-pointer text-sm"
              >
                <Box className="w-5 h-5 text-emerald-700" />
                <span>Zamów Bezpłatny Box</span>
              </button>

              <button
                onClick={() => setIsInquiryOpen(true)}
                className="flex items-center justify-center gap-2 bg-emerald-950/60 hover:bg-emerald-950 text-white font-bold py-4 px-6 rounded-xl border border-emerald-500/50 transition-colors cursor-pointer text-sm"
              >
                <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                <span>Zapytanie Ofertowe</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
