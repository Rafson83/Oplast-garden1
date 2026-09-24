import React, { useState, useMemo } from 'react';
import { 
  X, 
  Calculator, 
  Store,
  Send,
  MapPin 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types/shop';
import { getLocalizedProduct } from '../i18n/productTranslations';

export const CalculatorModal: React.FC = () => {
  const { 
    isCalculatorOpen, 
    setIsCalculatorOpen, 
    isB2BMode, 
    setIsInquiryOpen,
    setInquiryPreselectedProduct,
    setCurrentView,
    setPartnerProductFilter
  } = useShop();
  const { language, t } = useLanguage();

  // Mode: direct m2 or length x width
  const [inputMode, setInputMode] = useState<'m2' | 'dimensions'>('m2');
  const [surfaceM2Input, setSurfaceM2Input] = useState<number>(60);
  const [lengthM, setLengthM] = useState<number>(10);
  const [widthM, setWidthM] = useState<number>(6);

  // Usage type
  const [usageType, setUsageType] = useState<'parking_passenger' | 'heavy_truck' | 'light_garden' | 'slope'>('parking_passenger');

  // Fill type
  const [fillerType, setFillerType] = useState<'gravel' | 'grass'>('gravel');

  // Add-ons
  const [includeBorders, setIncludeBorders] = useState<boolean>(true);
  const [perimeterM, setPerimeterM] = useState<number>(32);
  const [includeAnchors, setIncludeAnchors] = useState<boolean>(true);
  const [includeGeotextile, setIncludeGeotextile] = useState<boolean>(true);

  // Effective surface calculation
  const totalM2 = useMemo(() => {
    if (inputMode === 'm2') {
      return Math.max(1, surfaceM2Input || 1);
    }
    return Math.max(1, Math.round((lengthM || 1) * (widthM || 1) * 10) / 10);
  }, [inputMode, surfaceM2Input, lengthM, widthM]);

  // Determine recommended grid product
  const recommendedProduct = useMemo((): Product => {
    if (usageType === 'heavy_truck') {
      return PRODUCTS.find(p => p.id === 'oplast-h50') || PRODUCTS[1];
    }
    if (usageType === 'light_garden') {
      return PRODUCTS.find(p => p.id === 'oplast-h30') || PRODUCTS[2];
    }
    return PRODUCTS.find(p => p.id === 'oplast-h40') || PRODUCTS[0];
  }, [usageType]);

  const localizedRecProduct = getLocalizedProduct(recommendedProduct, language);

  // Calculations
  const calculations = useMemo(() => {
    const rawPieces = totalM2 * 4.4;
    const piecesWithReserve = Math.ceil(rawPieces * 1.05);

    const pcsPerPallet = recommendedProduct.piecesPerPallet || 200;
    const palletsNeeded = Math.ceil(piecesWithReserve / pcsPerPallet);

    const heightM = recommendedProduct.heightMm / 1000;
    const fillerVolumeM3 = Math.round(totalM2 * heightM * 0.92 * 10) / 10;
    const fillerWeightTonnes = fillerType === 'gravel' 
      ? Math.round(fillerVolumeM3 * 1.6 * 10) / 10 
      : Math.round(fillerVolumeM3 * 1.2 * 10) / 10;

    const bordersNeeded = includeBorders ? perimeterM : 0;
    const anchorsNeeded = (includeBorders ? perimeterM * 3 : 0) + (includeAnchors ? Math.ceil(totalM2 * 1.5) : 0);
    const anchorPacks = Math.ceil(anchorsNeeded / 50);

    const geotextileRolls = includeGeotextile ? Math.ceil(totalM2 / 50) : 0;

    const totalWeightKg = Math.round(
      (piecesWithReserve * recommendedProduct.weightKg) +
      (bordersNeeded * 0.4) +
      (anchorPacks * 1.5) +
      (geotextileRolls * 7.5)
    );

    let totalEstimateNetto = 0;
    let totalEstimateBrutto = 0;

    if (palletsNeeded >= 1 && recommendedProduct.priceNettoPallet && recommendedProduct.priceBruttoPallet) {
      const fullPalletCount = Math.floor(piecesWithReserve / pcsPerPallet);
      const remainingPcs = piecesWithReserve % pcsPerPallet;
      totalEstimateNetto += (fullPalletCount * recommendedProduct.priceNettoPallet) + (remainingPcs * recommendedProduct.priceNettoUnit);
      totalEstimateBrutto += (fullPalletCount * recommendedProduct.priceBruttoPallet) + (remainingPcs * recommendedProduct.priceBruttoUnit);
    } else {
      totalEstimateNetto += piecesWithReserve * recommendedProduct.priceNettoUnit;
      totalEstimateBrutto += piecesWithReserve * recommendedProduct.priceBruttoUnit;
    }

    if (includeBorders && bordersNeeded > 0) {
      const borderProduct = PRODUCTS.find(p => p.id === 'obrzeze-eko-45');
      if (borderProduct) {
        totalEstimateNetto += bordersNeeded * borderProduct.priceNettoUnit;
        totalEstimateBrutto += bordersNeeded * borderProduct.priceBruttoUnit;
      }
    }

    if (includeAnchors && anchorPacks > 0) {
      const anchorProduct = PRODUCTS.find(p => p.id === 'kotwy-oplast-18');
      if (anchorProduct) {
        totalEstimateNetto += anchorPacks * anchorProduct.priceNettoUnit;
        totalEstimateBrutto += anchorPacks * anchorProduct.priceBruttoUnit;
      }
    }

    if (includeGeotextile && geotextileRolls > 0) {
      const geoProduct = PRODUCTS.find(p => p.id === 'geowłóknina-150');
      if (geoProduct) {
        totalEstimateNetto += geotextileRolls * geoProduct.priceNettoUnit;
        totalEstimateBrutto += geotextileRolls * geoProduct.priceBruttoUnit;
      }
    }

    return {
      piecesWithReserve,
      palletsNeeded,
      fillerVolumeM3,
      fillerWeightTonnes,
      bordersNeeded,
      anchorsNeeded,
      anchorPacks,
      geotextileRolls,
      totalWeightKg,
      totalEstimateNetto,
      totalEstimateBrutto
    };
  }, [totalM2, recommendedProduct, perimeterM, includeBorders, includeAnchors, includeGeotextile, fillerType]);

  if (!isCalculatorOpen) return null;

  const handleOpenB2BQuote = () => {
    setInquiryPreselectedProduct(`Zestaw kalkulatora: ${localizedRecProduct.name} - ${totalM2} m² (${calculations.piecesWithReserve} szt.)`);
    setIsCalculatorOpen(false);
    setIsInquiryOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-50/50 p-6 border-b border-emerald-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 font-heading">
                {t.calculator.title}
              </h2>
              <p className="text-xs text-slate-600">
                {t.calculator.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCalculatorOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-white/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 grid md:grid-cols-12 gap-8">
          
          {/* Left Column: Form Inputs */}
          <div className="md:col-span-7 space-y-6">
            
            {/* 1. Dimensions input */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <span>1. {t.calculator.dimLabel}</span>
                </label>
                <div className="flex text-xs bg-slate-200 p-0.5 rounded-lg font-medium">
                  <button
                    onClick={() => setInputMode('m2')}
                    className={`px-2.5 py-1 rounded-md transition-colors ${inputMode === 'm2' ? 'bg-white shadow-xs font-bold text-emerald-800' : 'text-slate-600'}`}
                  >
                    {t.calculator.m2Mode}
                  </button>
                  <button
                    onClick={() => setInputMode('dimensions')}
                    className={`px-2.5 py-1 rounded-md transition-colors ${inputMode === 'dimensions' ? 'bg-white shadow-xs font-bold text-emerald-800' : 'text-slate-600'}`}
                  >
                    {t.calculator.dimMode}
                  </button>
                </div>
              </div>

              {inputMode === 'm2' ? (
                <div>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="1"
                      max="10000"
                      value={surfaceM2Input}
                      onChange={(e) => setSurfaceM2Input(Number(e.target.value))}
                      className="w-32 px-3 py-2 text-lg font-bold bg-white border border-slate-300 rounded-lg text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                    <span className="text-slate-600 font-semibold">m²</span>
                  </div>
                  {/* Preset buttons */}
                  <div className="flex flex-wrap gap-1.5 mt-2.5 text-xs">
                    {[25, 50, 100, 250, 500, 1000].map(val => (
                      <button
                        key={val}
                        onClick={() => setSurfaceM2Input(val)}
                        className={`px-2.5 py-1 rounded-md border text-xs cursor-pointer ${
                          surfaceM2Input === val 
                            ? 'bg-emerald-600 text-white border-emerald-600 font-bold' 
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {val} m²
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-slate-500 mb-1 block">{t.calculator.length}:</label>
                    <input
                      type="number"
                      min="1"
                      value={lengthM}
                      onChange={(e) => setLengthM(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 mb-1 block">{t.calculator.width}:</label>
                    <input
                      type="number"
                      min="1"
                      value={widthM}
                      onChange={(e) => setWidthM(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-bold"
                    />
                  </div>
                  <p className="col-span-2 text-xs text-emerald-700 font-semibold">
                    {t.calculator.calcSurface}: <strong>{totalM2} m²</strong> (~{Math.round((lengthM + widthM) * 2)} mb)
                  </p>
                </div>
              )}
            </div>

            {/* 2. Usage Type */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-900 block">
                2. {t.calculator.usageTitle}
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setUsageType('parking_passenger')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    usageType === 'parking_passenger'
                      ? 'border-emerald-600 bg-emerald-50/70 text-slate-900 ring-2 ring-emerald-500'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <p className="font-bold text-slate-900">{t.calculator.parkingPassenger}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{t.calculator.parkingPassengerSub}</p>
                </button>

                <button
                  type="button"
                  onClick={() => setUsageType('heavy_truck')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    usageType === 'heavy_truck'
                      ? 'border-emerald-600 bg-emerald-50/70 text-slate-900 ring-2 ring-emerald-500'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <p className="font-bold text-slate-900">{t.calculator.heavyTruck}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{t.calculator.heavyTruckSub}</p>
                </button>

                <button
                  type="button"
                  onClick={() => setUsageType('light_garden')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    usageType === 'light_garden'
                      ? 'border-emerald-600 bg-emerald-50/70 text-slate-900 ring-2 ring-emerald-500'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <p className="font-bold text-slate-900">{t.calculator.lightGarden}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{t.calculator.lightGardenSub}</p>
                </button>

                <button
                  type="button"
                  onClick={() => setUsageType('slope')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    usageType === 'slope'
                      ? 'border-emerald-600 bg-emerald-50/70 text-slate-900 ring-2 ring-emerald-500'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <p className="font-bold text-slate-900">{t.calculator.slope}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{t.calculator.slopeSub}</p>
                </button>
              </div>
            </div>

            {/* 3. Filler Type */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-900 block">
                3. {t.calculator.fillerTitle}
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setFillerType('gravel')}
                  className={`p-2.5 rounded-xl border text-center transition-colors cursor-pointer ${
                    fillerType === 'gravel'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  {t.calculator.gravelFiller}
                </button>
                <button
                  type="button"
                  onClick={() => setFillerType('grass')}
                  className={`p-2.5 rounded-xl border text-center transition-colors cursor-pointer ${
                    fillerType === 'grass'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  {t.calculator.grassFiller}
                </button>
              </div>
            </div>

            {/* 4. Accessories checkboxes */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
              <p className="font-bold text-slate-900 text-sm">4. {t.calculator.accTitle}</p>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeBorders}
                  onChange={(e) => setIncludeBorders(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded-sm focus:ring-emerald-500"
                />
                <span className="text-slate-800 font-medium">
                  {t.calculator.borderCheckbox}
                </span>
                <input
                  type="number"
                  disabled={!includeBorders}
                  value={perimeterM}
                  onChange={(e) => setPerimeterM(Number(e.target.value))}
                  className="w-16 px-2 py-0.5 bg-white border border-slate-300 rounded text-center font-bold"
                />
                <span className="text-slate-600">mb)</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeAnchors}
                  onChange={(e) => setIncludeAnchors(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded-sm focus:ring-emerald-500"
                />
                <span className="text-slate-800 font-medium">
                  {t.calculator.anchorCheckbox}
                </span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeGeotextile}
                  onChange={(e) => setIncludeGeotextile(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded-sm focus:ring-emerald-500"
                />
                <span className="text-slate-800 font-medium">
                  {t.calculator.geotextileCheckbox}
                </span>
              </label>
            </div>

          </div>

          {/* Right Column: Calculation Summary (Light Theme) */}
          <div className="md:col-span-5 bg-gradient-to-b from-emerald-50 via-emerald-50/60 to-white text-slate-900 p-5 rounded-2xl border border-emerald-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              
              <div>
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-md">
                  {t.calculator.recommendedProduct}
                </span>
                <h3 className="text-lg font-bold font-heading text-slate-900 mt-1.5">
                  {localizedRecProduct.name}
                </h3>
                <p className="text-xs text-slate-600">
                  {t.calculator.capacityLabel}: <strong>{recommendedProduct.loadCapacityTonnes} t/m²</strong> • {t.calculator.heightLabel}: <strong>{recommendedProduct.heightMm} mm</strong>
                </p>
              </div>

              {/* Specification Grid */}
              <div className="space-y-2.5 border-y border-emerald-200/80 py-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">{t.calculator.surfaceLabel}:</span>
                  <span className="font-bold text-slate-900">{totalM2} m²</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">{t.calculator.piecesLabel}:</span>
                  <span className="font-extrabold text-emerald-700 text-sm">
                    {calculations.piecesWithReserve} {t.catalog.piece.toLowerCase()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">{t.calculator.logisticLabel}:</span>
                  <span className="font-semibold text-slate-800">
                    {calculations.palletsNeeded} {t.catalog.pallet.toLowerCase()} (~{calculations.totalWeightKg} kg)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">{t.calculator.fillerVolLabel}:</span>
                  <span className="font-semibold text-slate-800">
                    ~{calculations.fillerVolumeM3} m³ (~{calculations.fillerWeightTonnes} t)
                  </span>
                </div>

                {includeBorders && (
                  <div className="flex justify-between items-center pt-1 border-t border-emerald-200/60">
                    <span className="text-slate-500">{t.calculator.bordersLabel}:</span>
                    <span className="font-semibold text-slate-900">{calculations.bordersNeeded} mb</span>
                  </div>
                )}

                {includeAnchors && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">{t.calculator.anchorsLabel}:</span>
                    <span className="font-semibold text-slate-900">
                      {calculations.anchorsNeeded} szt. ({calculations.anchorPacks} op.)
                    </span>
                  </div>
                )}

                {includeGeotextile && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">{t.calculator.geoLabel}:</span>
                    <span className="font-semibold text-slate-900">
                      {calculations.geotextileRolls} rol. (50m²)
                    </span>
                  </div>
                )}
              </div>

              {/* Price Estimate: Shown Only in B2B Mode; Hidden in Retail (No Imposed Margins) */}
              {isB2BMode ? (
                <div className="p-4 bg-white rounded-xl border border-emerald-300/90 shadow-xs">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-slate-600 font-medium">{t.calculator.totalCostEst} (Hurt):</span>
                    <span className="text-xl font-extrabold text-emerald-700 font-heading">
                      {calculations.totalEstimateNetto.toFixed(2)} zł netto
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {t.calculator.vatNoticeB2B}
                  </p>
                </div>
              ) : (
                <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
                      <Store className="w-4 h-4 text-emerald-700" />
                      Wycena zestawu u lokalnego partnera
                    </span>
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-white text-emerald-800 border border-emerald-200">
                      Zakup w punkcie
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Ceny detaliczne ustalane są indywidualnie przez lokalnych partnerów — fabryka Oplast nie narzuca sztywnych marż dystrybutorom. Kup zestaw w najbliższym składzie z odbiorem od ręki.
                  </p>
                </div>
              )}

            </div>

            {/* Actions */}
            <div className="space-y-2 pt-4">
              {!isB2BMode ? (
                <>
                  <button
                    onClick={() => {
                      setPartnerProductFilter(recommendedProduct.id);
                      setIsCalculatorOpen(false);
                      setCurrentView('partners');
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md shadow-emerald-700/20 hover:scale-[1.01] transition-all cursor-pointer text-sm"
                  >
                    <MapPin className="w-4 h-4 text-emerald-200" />
                    <span>Znajdź partnera i sprawdź cenę w Twojej okolicy</span>
                  </button>

                  <button
                    onClick={handleOpenB2BQuote}
                    className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-semibold py-2.5 px-4 rounded-xl border border-slate-300 transition-colors cursor-pointer text-xs shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Dostawa paletowa z fabryki → Poproś o wycenę</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleOpenB2BQuote}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all cursor-pointer text-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>Wyślij zapytanie o wycenę hurtową B2B (zestaw)</span>
                  </button>
                </>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
