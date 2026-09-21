import React from 'react';
import { 
  Factory, 
  Recycle, 
  ShieldCheck, 
  Truck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const WhyOplast: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Factory className="w-3.5 h-3.5" />
            {t.why.badge}
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            {t.why.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {t.why.subtitle}
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Factory className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">{t.why.p1Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.why.p1Desc}
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Recycle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">{t.why.p2Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.why.p2Desc}
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">{t.why.p3Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.why.p3Desc}
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-heading">{t.why.p4Title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {t.why.p4Desc}
            </p>
          </div>

        </div>

        {/* Big Numbers Banner - Light Theme */}
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-emerald-200/80 shadow-md">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
            
            <div className="pt-4 lg:pt-0">
              <p className="text-3xl sm:text-5xl font-extrabold text-emerald-700 font-heading">
                {t.why.stat1Val}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 font-bold mt-1">
                {t.why.stat1Label}
              </p>
            </div>

            <div className="pt-4 lg:pt-0">
              <p className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading">
                {t.why.stat2Val}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 font-bold mt-1">
                {t.why.stat2Label}
              </p>
            </div>

            <div className="pt-4 lg:pt-0">
              <p className="text-3xl sm:text-5xl font-extrabold text-emerald-700 font-heading">
                {t.why.stat3Val}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 font-bold mt-1">
                {t.why.stat3Label}
              </p>
            </div>

            <div className="pt-4 lg:pt-0">
              <p className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-heading">
                {t.why.stat4Val}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 font-bold mt-1">
                {t.why.stat4Label}
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
