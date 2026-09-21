import React, { useState } from 'react';
import { 
  Layers, 
  CheckCircle2, 
  Hammer, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';

export const InstallationGuide: React.FC = () => {
  const { setIsCalculatorOpen } = useShop();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'cross_section' | 'steps' | 'mistakes'>('cross_section');

  return (
    <section id="montaz" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <Hammer className="w-3.5 h-3.5" />
            {t.guide.badge}
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            {t.guide.title}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {t.guide.subtitle}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center">
          <div className="bg-slate-100 p-1 rounded-2xl flex gap-1 border border-slate-200 text-xs sm:text-sm font-bold">
            <button
              onClick={() => setActiveTab('cross_section')}
              className={`px-4 sm:px-6 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'cross_section'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.guide.tabCrossSection}
            </button>
            <button
              onClick={() => setActiveTab('steps')}
              className={`px-4 sm:px-6 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'steps'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.guide.tabSteps}
            </button>
            <button
              onClick={() => setActiveTab('mistakes')}
              className={`px-4 sm:px-6 py-2 rounded-xl transition-all cursor-pointer ${
                activeTab === 'mistakes'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.guide.tabMistakes}
            </button>
          </div>
        </div>

        {/* Tab 1: Cross-Section Diagram */}
        {activeTab === 'cross_section' && (
          <div className="grid lg:grid-cols-12 gap-8 items-center bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200">
            
            {/* Visual Cross-Section Layers Stack */}
            <div className="lg:col-span-6 space-y-2">
              <h3 className="text-base font-bold text-slate-900 mb-4 font-heading flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-600" />
                {t.guide.crossSectionTitle}
              </h3>

              {/* Layer 1: Top filler */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200">{t.guide.layer1Title}</span>
                  <p className="font-bold text-sm">{t.guide.layer1Sub}</p>
                </div>
                <span className="text-xs bg-white/20 px-2 py-1 rounded-md font-bold">Top</span>
              </div>

              {/* Layer 2: Oplast Grid */}
              <div className="p-3.5 rounded-xl bg-slate-900 text-white shadow-sm flex items-center justify-between border-2 border-emerald-400">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">{t.guide.layer2Title}</span>
                  <p className="font-bold text-sm">{t.guide.layer2Sub}</p>
                </div>
                <span className="text-xs bg-emerald-600 px-2 py-1 rounded-md font-bold">3 - 5 cm</span>
              </div>

              {/* Layer 3: Bedding layer */}
              <div className="p-3 rounded-xl bg-amber-100 border border-amber-300 text-amber-950 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">{t.guide.layer3Title}</span>
                  <p className="font-bold text-xs">{t.guide.layer3Sub}</p>
                </div>
                <span className="text-xs font-bold text-amber-800">3-4 cm</span>
              </div>

              {/* Layer 4: Geotextile */}
              <div className="p-2.5 rounded-xl bg-slate-200 border-2 border-dashed border-slate-400 text-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{t.guide.layer4Title}</span>
                  <p className="font-bold text-xs">{t.guide.layer4Sub}</p>
                </div>
                <span className="text-[11px] font-bold text-slate-600">Filter</span>
              </div>

              {/* Layer 5: Main Sub-base */}
              <div className="p-4 rounded-xl bg-slate-300 border border-slate-400 text-slate-900 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">{t.guide.layer5Title}</span>
                  <p className="font-bold text-xs">{t.guide.layer5Sub}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold block">15-40 cm</span>
                </div>
              </div>

              {/* Layer 6: Native Soil */}
              <div className="p-3 rounded-xl bg-amber-900/10 border border-amber-900/20 text-amber-900 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">{t.guide.layer6Title}</span>
                  <p className="font-bold text-xs">{t.guide.layer6Sub}</p>
                </div>
                <span className="text-xs font-bold">1-2%</span>
              </div>

            </div>

            {/* Practical Advice Beside Diagram */}
            <div className="lg:col-span-6 space-y-4">
              <h4 className="text-lg font-bold text-slate-900 font-heading">
                {t.guide.keyPointsTitle}
              </h4>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-semibold">{t.guide.point1Title}</strong>
                    {t.guide.point1Desc}
                  </div>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-semibold">{t.guide.point2Title}</strong>
                    {t.guide.point2Desc}
                  </div>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block font-semibold">{t.guide.point3Title}</strong>
                    {t.guide.point3Desc}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsCalculatorOpen(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-5 rounded-xl text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  <span>{t.guide.calcLayersBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        )}

        {/* Tab 2: Step-by-step instructions */}
        {activeTab === 'steps' && (
          <div className="grid md:grid-cols-4 gap-6">
            
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-extrabold flex items-center justify-center font-heading">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-sm">{t.guide.step1Title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.guide.step1Desc}
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-extrabold flex items-center justify-center font-heading">
                2
              </div>
              <h4 className="font-bold text-slate-900 text-sm">{t.guide.step2Title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.guide.step2Desc}
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-extrabold flex items-center justify-center font-heading">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-sm">{t.guide.step3Title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.guide.step3Desc}
              </p>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-extrabold flex items-center justify-center font-heading">
                4
              </div>
              <h4 className="font-bold text-slate-900 text-sm">{t.guide.step4Title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.guide.step4Desc}
              </p>
            </div>

          </div>
        )}

        {/* Tab 3: Common Mistakes */}
        {activeTab === 'mistakes' && (
          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="p-5 bg-red-50/70 border border-red-200 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-red-700 font-bold text-sm">
                <ShieldAlert className="w-5 h-5" />
                <span>{t.guide.err1Title}</span>
              </div>
              <p className="text-xs text-red-900 leading-relaxed">
                {t.guide.err1Desc}
              </p>
            </div>

            <div className="p-5 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
                <ShieldAlert className="w-5 h-5" />
                <span>{t.guide.err2Title}</span>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed">
                {t.guide.err2Desc}
              </p>
            </div>

            <div className="p-5 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
                <ShieldAlert className="w-5 h-5" />
                <span>{t.guide.err3Title}</span>
              </div>
              <p className="text-xs text-amber-900 leading-relaxed">
                {t.guide.err3Desc}
              </p>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
