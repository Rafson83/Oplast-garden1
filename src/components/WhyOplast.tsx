import React from 'react';
import { 
  Factory, 
  Recycle, 
  ShieldCheck, 
  Truck
} from 'lucide-react';

export const WhyOplast: React.FC = () => {
  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Factory className="w-3.5 h-3.5" />
            Produkcja w Polsce • Winduga 6, Bobrowniki
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            Dlaczego warto wybrać kratki Oplast Garden?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Łączymy ponad 25 lat doświadczenia w przetwórstwie tworzyw sztucznych z nowoczesnym parkiem wtryskarek i własnym surowcem z certyfikowanego recyklingu.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Factory className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">Prosto od Producenta</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Kupujesz bezpośrednio w fabryce w Windudze bez marż pośredników. Gwarancja natychmiastowej dostępności tysięcy metrów kwadratowych na placu.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Recycle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">100% Recykling & GOZ</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Nasze kratki i obrzeża powstają ze starannie wyselekcjonowanego regranulatu PP/PE o wysokiej elastyczności, odpornego na pękanie pod naciskiem mrozowym.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">Atesty & Certyfikaty ITB</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Posiadamy Krajową Deklarację Właściwości Użytkowych (KDWU), badania wytrzymałościowe oraz atest PZH. Pełna zgodność z wymogami odbiorów budowlanych.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">Sprawna Logistyka 24-48h</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Zapewniamy dostawy paletowe autami z windą hydrauliczną na terenie całego kraju oraz własne naczepy firanki 24t dla kontraktów całopojazdowych.
            </p>
          </div>

        </div>

        {/* Big Numbers Banner */}
        <div className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white p-8 sm:p-10 rounded-3xl border border-emerald-800/60 shadow-xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
            
            <div className="pt-4 lg:pt-0">
              <p className="text-3xl sm:text-5xl font-extrabold text-emerald-400 font-heading">
                450 t/m²
              </p>
              <p className="text-xs sm:text-sm text-slate-300 font-semibold mt-1">
                Maksymalna nośność z wypełnieniem
              </p>
            </div>

            <div className="pt-4 lg:pt-0">
              <p className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
                88%
              </p>
              <p className="text-xs sm:text-sm text-slate-300 font-semibold mt-1">
                Powierzchni biologicznie czynnej
              </p>
            </div>

            <div className="pt-4 lg:pt-0">
              <p className="text-3xl sm:text-5xl font-extrabold text-emerald-400 font-heading">
                1500 t
              </p>
              <p className="text-xs sm:text-sm text-slate-300 font-semibold mt-1">
                Miesięczne moce przerobowe tworzyw
              </p>
            </div>

            <div className="pt-4 lg:pt-0">
              <p className="text-3xl sm:text-5xl font-extrabold text-white font-heading">
                25+ lat
              </p>
              <p className="text-xs sm:text-sm text-slate-300 font-semibold mt-1">
                Gwarantowanej trwałości w gruncie
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
