import React from 'react';
import { 
  Building2, 
  Truck, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  FileSpreadsheet,
  HardHat,
  Compass,
  Store
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';

export const B2BSection: React.FC = () => {
  const { setIsInquiryOpen, setIsB2BMode, setCurrentView } = useShop();
  const { t } = useLanguage();

  return (
    <section id="b2b" className="py-20 bg-gradient-to-b from-slate-50 via-white to-emerald-50/40 text-slate-900 border-b border-slate-200/80 relative overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-100/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs sm:text-sm font-bold shadow-xs">
            <Building2 className="w-4 h-4 text-emerald-700" />
            <span>{t.b2b.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading text-slate-900">
            {t.b2b.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {t.b2b.subtitle}
          </p>
        </div>

        {/* 4 Professional Target Groups */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Generalni Wykonawcy */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-emerald-500/40 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <HardHat className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-heading">{t.b2b.contractorTitle}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  {t.b2b.contractorDesc}
                </p>
              </div>
              <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{t.b2b.contractorPoint1}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{t.b2b.contractorPoint2}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{t.b2b.contractorPoint3}</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => { setIsB2BMode(true); setIsInquiryOpen(true); }}
              className="mt-6 w-full text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
            >
              <span>{t.b2b.contractorCta}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: Składy i Hurtownie */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-emerald-500/40 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Store className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-heading">{t.b2b.wholesaleTitle}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  {t.b2b.wholesaleDesc}
                </p>
              </div>
              <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{t.b2b.wholesalePoint1}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{t.b2b.wholesalePoint2}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{t.b2b.wholesalePoint3}</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => { setIsB2BMode(true); setIsInquiryOpen(true); }}
              className="mt-6 w-full text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
            >
              <span>{t.b2b.wholesaleCta}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 3: Brukarze i Wykonawcy */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-emerald-500/40 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-heading">{t.b2b.paverTitle}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  {t.b2b.paverDesc}
                </p>
              </div>
              <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{t.b2b.paverPoint1}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{t.b2b.paverPoint2}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{t.b2b.paverPoint3}</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => { setIsB2BMode(true); setIsInquiryOpen(true); }}
              className="mt-6 w-full text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
            >
              <span>{t.b2b.paverCta}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 4: Architekci Krajobrazu */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-emerald-500/40 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-heading">{t.b2b.architectTitle}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  {t.b2b.architectDesc}
                </p>
              </div>
              <ul className="text-xs text-slate-700 space-y-2 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{t.b2b.architectPoint1}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{t.b2b.architectPoint2}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{t.b2b.architectPoint3}</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => {
                setIsB2BMode(true);
                setIsInquiryOpen(true);
              }}
              className="mt-6 w-full text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
            >
              <span>Zapytaj o specyfikację projektową</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* B2B Direct Factory Wholesale & FTL Investment Banner */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-700 rounded-3xl p-8 sm:p-10 shadow-xl border border-emerald-500/40 relative overflow-hidden text-white">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider border border-white/30 backdrop-blur-xs">
                Dla Generalnych Wykonawców i Inwestorów
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
                Bezpośrednie Dostawy Pełnosamochodowe z Fabryki (FTL 24t)
              </h3>
              <p className="text-emerald-50 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
                Gwarantujemy ciągłość dostaw na wielkopowierzchniowe inwestycje, parkingi i drogi dojazdowe. Zapewniamy komplet dokumentacji odbiorowej: deklaracje KDWU, atesty PZH oraz badania wytrzymałościowe ITB do 450 t/m².
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={() => {
                  setIsB2BMode(true);
                  setIsInquiryOpen(true);
                }}
                className="flex items-center justify-center gap-2 bg-white hover:bg-emerald-50 text-emerald-950 font-extrabold py-4 px-6 rounded-xl shadow-lg transition-all hover:scale-105 cursor-pointer text-sm"
              >
                <FileSpreadsheet className="w-5 h-5 text-emerald-700" />
                <span>Wyceń Inwestycję Hurtową</span>
              </button>

              <button
                onClick={() => setCurrentView('partners')}
                className="flex items-center justify-center gap-2 bg-emerald-900/80 hover:bg-emerald-900 text-white font-bold py-4 px-6 rounded-xl border border-emerald-400/40 transition-colors cursor-pointer text-sm"
              >
                <MapPin className="w-5 h-5 text-emerald-300" />
                <span>{t.partners.navLink}</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
