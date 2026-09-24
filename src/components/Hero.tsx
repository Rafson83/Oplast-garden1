import React from 'react';
import { 
  Calculator, 
  Building2, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2,
  MapPin
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';

export const Hero: React.FC = () => {
  const { isB2BMode, setIsB2BMode, setIsCalculatorOpen, setIsInquiryOpen, setCurrentView } = useShop();
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-slate-50 text-slate-900 pt-12 pb-20 lg:pt-16 lg:pb-24 border-b border-slate-200/80">
      {/* Background Subtle Pattern & Soft Glows */}
      <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-green-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs sm:text-sm font-bold shadow-xs">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>{t.hero.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading leading-tight text-slate-900">
              {t.hero.title1}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-green-600">
                {t.hero.titleHighlight}
              </span>{' '}
              {t.hero.title2}
            </h1>

            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {t.hero.subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => setIsCalculatorOpen(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-emerald-700/20 hover:shadow-emerald-700/30 hover:scale-[1.02] transition-all cursor-pointer text-base"
              >
                <Calculator className="w-5 h-5" />
                <span>{t.hero.ctaCalc}</span>
              </button>

              <a
                href="#kratki"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-300 hover:border-emerald-600 text-slate-800 font-bold px-7 py-3.5 rounded-xl shadow-xs transition-all hover:scale-[1.02] text-base"
              >
                <span>{t.hero.ctaProducts}</span>
                <ArrowRight className="w-4 h-4 text-emerald-700" />
              </a>
            </div>

            {/* Feature Highlights */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">{t.hero.specAxle}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">{t.hero.specCert}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">{t.hero.specShipping}</span>
              </div>
            </div>

          </div>

          {/* Right Hero Side - Interactive B2B/B2C Advantage Card */}
          <div className="lg:col-span-5">
            <div className="relative bg-white/95 border border-slate-200/90 rounded-3xl p-6 sm:p-7 shadow-xl shadow-slate-200/60 backdrop-blur-md">
              
              {/* Header inside card */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                <div>
                  <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-700">
                    {isB2BMode ? t.hero.zoneBusiness : t.hero.zoneRetail}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 font-heading">
                    {isB2BMode ? t.hero.b2bOfferTitle : t.hero.b2cOfferTitle}
                  </h3>
                </div>
                <button
                  onClick={() => setIsB2BMode(!isB2BMode)}
                  className="text-xs font-bold px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors cursor-pointer"
                >
                  {isB2BMode ? t.hero.switchToRetail : t.hero.switchToWholesale}
                </button>
              </div>

              {isB2BMode ? (
                /* B2B Mode Card */
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 text-slate-800 text-xs sm:text-sm space-y-2">
                    <p className="font-bold text-emerald-900 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-emerald-700" />
                      {t.hero.b2bDescTitle}
                    </p>
                    <ul className="space-y-1.5 text-slate-700 text-xs">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        {t.hero.b2bBullet1}
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        {t.hero.b2bBullet2}
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        {t.hero.b2bBullet3}
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        {t.hero.b2bBullet4}
                      </li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <p className="text-[11px] text-slate-500 uppercase font-semibold">{t.hero.b2bMinOrder}</p>
                      <p className="text-lg font-bold text-slate-900 mt-0.5">1 Paleta</p>
                      <p className="text-[11px] text-emerald-700 font-bold">{t.hero.b2bMinOrderVal}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      <p className="text-[11px] text-slate-500 uppercase font-semibold">{t.hero.b2bShipping}</p>
                      <p className="text-lg font-bold text-slate-900 mt-0.5">24h - 48h</p>
                      <p className="text-[11px] text-emerald-700 font-bold">{t.hero.b2bShippingVal}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsInquiryOpen(true)}
                    className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition-all cursor-pointer text-sm shadow-md"
                  >
                    <Building2 className="w-4 h-4" />
                    <span>{t.hero.b2bCta}</span>
                  </button>
                </div>
              ) : (
                /* B2C Detal Card */
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs sm:text-sm space-y-1.5">
                    <p className="font-bold text-emerald-800">
                      {t.hero.b2cDescTitle}
                    </p>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {t.hero.b2cDescText}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <p className="text-[10px] text-slate-500 uppercase font-bold">H30 Garden</p>
                      <p className="text-base font-extrabold text-emerald-700">9,10 zł</p>
                      <p className="text-[10px] text-slate-500">brutto / {t.catalog.piece.toLowerCase()}</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-300 ring-1 ring-emerald-500/30">
                      <p className="text-[10px] text-emerald-800 uppercase font-bold">H40 Auto</p>
                      <p className="text-base font-extrabold text-slate-900">10,95 zł</p>
                      <p className="text-[10px] text-slate-600">brutto / {t.catalog.piece.toLowerCase()}</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      <p className="text-[10px] text-slate-500 uppercase font-bold">H50 Heavy</p>
                      <p className="text-base font-extrabold text-emerald-700">14,51 zł</p>
                      <p className="text-[10px] text-slate-500">brutto / {t.catalog.piece.toLowerCase()}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentView('partners')}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold py-3.5 px-4 rounded-xl transition-all cursor-pointer text-sm shadow-md shadow-emerald-700/20 hover:scale-[1.01]"
                  >
                    <MapPin className="w-4 h-4 text-emerald-200" />
                    <span>{t.hero.b2cCtaPartner}</span>
                  </button>

                  <div className="flex items-center justify-center pt-0.5">
                    <button
                      onClick={() => setIsCalculatorOpen(true)}
                      className="text-xs text-slate-500 hover:text-emerald-700 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Calculator className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{t.hero.b2cCta}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Bottom Quick Contact */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>{t.hero.advisoryHotline}</span>
                <a href="tel:+48537200630" className="text-emerald-700 font-bold hover:underline">
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
