import React, { useState, useMemo } from 'react';
import { 
  X, 
  Calculator, 
  ShoppingBag, 
  Building2 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types/shop';

export const CalculatorModal: React.FC = () => {
  const { 
    isCalculatorOpen, 
    setIsCalculatorOpen, 
    isB2BMode, 
    addToCart,
    setIsCartOpen,
    setIsInquiryOpen,
    setInquiryPreselectedProduct 
  } = useShop();

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

  // Calculations
  const calculations = useMemo(() => {
    // 4.4 pcs per m2 + 5% reserve for cutting
    const rawPieces = totalM2 * 4.4;
    const piecesWithReserve = Math.ceil(rawPieces * 1.05);

    const pcsPerPallet = recommendedProduct.piecesPerPallet || 200;
    const palletsNeeded = Math.ceil(piecesWithReserve / pcsPerPallet);

    // Filler volume: m2 * height in meters * ~0.9 internal volume
    const heightM = recommendedProduct.heightMm / 1000;
    const fillerVolumeM3 = Math.round(totalM2 * heightM * 0.9 * 10) / 10;
    const fillerWeightTonnes = Math.round(fillerVolumeM3 * 1.6 * 10) / 10; // ~1.6 t/m3 for aggregate

    // Borders & Anchors
    const bordersNeeded = includeBorders ? Math.ceil(perimeterM || Math.sqrt(totalM2) * 4) : 0;
    // 3-4 anchors per border meter, or 2 per m2 on slopes
    const anchorsNeeded = includeAnchors 
      ? (usageType === 'slope' ? Math.ceil(totalM2 * 2 + bordersNeeded * 3) : Math.ceil(bordersNeeded * 3))
      : 0;

    // Geotextile: totalM2 + 10% overlap
    const geotextileM2 = includeGeotextile ? Math.ceil(totalM2 * 1.1) : 0;
    const geotextileRolls = includeGeotextile ? Math.ceil(geotextileM2 / 50) : 0;

    // Total weight
    const gridWeight = piecesWithReserve * recommendedProduct.weightKg;
    const bordersWeight = bordersNeeded * 0.4;
    const totalWeightKg = Math.round(gridWeight + bordersWeight + (geotextileRolls * 7.5));

    // Pricing
    const unitPriceNetto = recommendedProduct.priceNettoUnit;
    const unitPriceBrutto = recommendedProduct.priceBruttoUnit;
    const gridCostNetto = piecesWithReserve * unitPriceNetto;
    const gridCostBrutto = piecesWithReserve * unitPriceBrutto;

    // Borders cost (Oplast Eko-Bord 45)
    const borderProduct = PRODUCTS.find(p => p.id === 'obrzeze-eko-45');
    const borderCostNetto = borderProduct ? bordersNeeded * borderProduct.priceNettoUnit : 0;
    const borderCostBrutto = borderProduct ? bordersNeeded * borderProduct.priceBruttoUnit : 0;

    // Anchors cost (Kotwy 18cm)
    const anchorProduct = PRODUCTS.find(p => p.id === 'kotwy-oplast-18');
    const anchorPacks = Math.ceil(anchorsNeeded / 50);
    const anchorCostNetto = anchorProduct ? anchorPacks * anchorProduct.priceNettoUnit : 0;
    const anchorCostBrutto = anchorProduct ? anchorPacks * anchorProduct.priceBruttoUnit : 0;

    // Geotextile cost
    const geoProduct = PRODUCTS.find(p => p.id === 'geowłóknina-150');
    const geoCostNetto = geoProduct ? geotextileRolls * geoProduct.priceNettoUnit : 0;
    const geoCostBrutto = geoProduct ? geotextileRolls * geoProduct.priceBruttoUnit : 0;

    const totalEstimateNetto = gridCostNetto + borderCostNetto + anchorCostNetto + geoCostNetto;
    const totalEstimateBrutto = gridCostBrutto + borderCostBrutto + anchorCostBrutto + geoCostBrutto;

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
      totalEstimateBrutto,
      borderProduct,
      anchorProduct,
      geoProduct,
    };
  }, [totalM2, recommendedProduct, includeBorders, perimeterM, includeAnchors, includeGeotextile, usageType]);

  if (!isCalculatorOpen) return null;

  const handleAddAllToCart = () => {
    // 1. Add Grids
    addToCart(recommendedProduct, recommendedProduct.colors[0], 'piece', calculations.piecesWithReserve);

    // 2. Add Borders if selected
    if (includeBorders && calculations.bordersNeeded > 0 && calculations.borderProduct) {
      addToCart(calculations.borderProduct, calculations.borderProduct.colors[0], 'piece', calculations.bordersNeeded);
    }

    // 3. Add Anchors if selected
    if (includeAnchors && calculations.anchorPacks > 0 && calculations.anchorProduct) {
      addToCart(calculations.anchorProduct, calculations.anchorProduct.colors[0], 'piece', calculations.anchorPacks);
    }

    // 4. Add Geotextile if selected
    if (includeGeotextile && calculations.geotextileRolls > 0 && calculations.geoProduct) {
      addToCart(calculations.geoProduct, calculations.geoProduct.colors[0], 'piece', calculations.geotextileRolls);
    }

    setIsCalculatorOpen(false);
    setIsCartOpen(true);
  };

  const handleOpenB2BQuote = () => {
    setInquiryPreselectedProduct(`${recommendedProduct.name} (${calculations.piecesWithReserve} szt. / ${totalM2} m²)`);
    setIsCalculatorOpen(false);
    setIsInquiryOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-green-900 text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-white/10 text-white border border-white/10">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading">
                Kalkulator Powierzchni i Podbudowy Oplast
              </h2>
              <p className="text-emerald-200 text-xs sm:text-sm">
                Precyzyjny dobór modelu kratki, liczby palet, kruszywa i akcesoriów
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCalculatorOpen(false)}
            className="p-2 rounded-xl text-emerald-100 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[80vh] overflow-y-auto grid md:grid-cols-12 gap-6">
          
          {/* Left Column: Form Controls */}
          <div className="md:col-span-7 space-y-5">
            
            {/* 1. Surface Input */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <span>1. Wymiary powierzchni</span>
                </label>
                <div className="flex text-xs bg-slate-200 p-0.5 rounded-lg font-medium">
                  <button
                    onClick={() => setInputMode('m2')}
                    className={`px-2.5 py-1 rounded-md transition-colors ${inputMode === 'm2' ? 'bg-white shadow-xs font-bold text-emerald-800' : 'text-slate-600'}`}
                  >
                    Podaj w m²
                  </button>
                  <button
                    onClick={() => setInputMode('dimensions')}
                    className={`px-2.5 py-1 rounded-md transition-colors ${inputMode === 'dimensions' ? 'bg-white shadow-xs font-bold text-emerald-800' : 'text-slate-600'}`}
                  >
                    Długość × Szerokość
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
                    <span className="text-slate-600 font-semibold">m² powierzchni</span>
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
                    <label className="text-xs text-slate-500 mb-1 block">Długość (m):</label>
                    <input
                      type="number"
                      min="1"
                      value={lengthM}
                      onChange={(e) => setLengthM(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-500 mb-1 block">Szerokość (m):</label>
                    <input
                      type="number"
                      min="1"
                      value={widthM}
                      onChange={(e) => setWidthM(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-bold"
                    />
                  </div>
                  <p className="col-span-2 text-xs text-emerald-700 font-semibold">
                    Obliczona powierzchnia: <strong>{totalM2} m²</strong> (obwód: ~{Math.round((lengthM + widthM) * 2)} mb)
                  </p>
                </div>
              )}
            </div>

            {/* 2. Usage Type */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-900 block">
                2. Przeznaczenie i obciążenie nawierzchni:
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
                  <p className="font-bold text-slate-900">Podjazd & Parking Osobowy</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Ruch aut do 3.5t (Oplast H40)</p>
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
                  <p className="font-bold text-slate-900">Transport Ciężki / Straż</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Droga pożarowa, TIR (Oplast H50)</p>
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
                  <p className="font-bold text-slate-900">Ścieżki & Ogrody</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Ruch pieszy, rowerowy (Oplast H30)</p>
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
                  <p className="font-bold text-slate-900">Skarpy i Zbocza</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Stabilizacja przed erozją</p>
                </button>
              </div>
            </div>

            {/* 3. Filler Type */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-900 block">
                3. Planowane wypełnienie oczek kratki:
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
                  Kruszywo / Grys (8-16 mm)
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
                  Trawnik (Ziemia + Nasiona)
                </button>
              </div>
            </div>

            {/* 4. Accessories checkboxes */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
              <p className="font-bold text-slate-900 text-sm">4. Akcesoria montażowe i obrzeża:</p>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeBorders}
                  onChange={(e) => setIncludeBorders(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded-sm focus:ring-emerald-500"
                />
                <span className="text-slate-800 font-medium">
                  Dołącz elastyczne obrzeża Oplast Eko-Bord (np. obwód: 
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
                  Dołącz kotwy mocujące z tworzywa Oplast (szpilki stabilizujące)
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
                  Dołącz rolki geowłókniny drenażowo-separacyjnej 150g/m²
                </span>
              </label>
            </div>

          </div>

          {/* Right Column: Calculation Summary (Light Theme) */}
          <div className="md:col-span-5 bg-gradient-to-b from-emerald-50 via-emerald-50/60 to-white text-slate-900 p-5 rounded-2xl border border-emerald-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              
              <div>
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-md">
                  Rekomendowany Produkt
                </span>
                <h3 className="text-lg font-bold font-heading text-slate-900 mt-1.5">
                  {recommendedProduct.name}
                </h3>
                <p className="text-xs text-slate-600">
                  Nośność: <strong>{recommendedProduct.loadCapacityTonnes} t/m²</strong> • Wysokość: <strong>{recommendedProduct.heightMm} mm</strong>
                </p>
              </div>

              {/* Specification Grid */}
              <div className="space-y-2.5 border-y border-emerald-200/80 py-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Powierzchnia:</span>
                  <span className="font-bold text-slate-900">{totalM2} m²</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Liczba kratek (z 5% zapasem):</span>
                  <span className="font-extrabold text-emerald-700 text-sm">
                    {calculations.piecesWithReserve} szt.
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Wymiar logistyczny:</span>
                  <span className="font-semibold text-slate-800">
                    {calculations.palletsNeeded} {calculations.palletsNeeded === 1 ? 'paleta' : 'palet'} (~{calculations.totalWeightKg} kg)
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Wypełnienie ({fillerType === 'gravel' ? 'grys' : 'ziemia'}):</span>
                  <span className="font-semibold text-slate-800">
                    ok. {calculations.fillerVolumeM3} m³ (~{calculations.fillerWeightTonnes} t)
                  </span>
                </div>

                {includeBorders && (
                  <div className="flex justify-between items-center pt-1 border-t border-emerald-200/60">
                    <span className="text-slate-500">Obrzeża Eko-Bord:</span>
                    <span className="font-semibold text-slate-900">{calculations.bordersNeeded} mb</span>
                  </div>
                )}

                {includeAnchors && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Kotwy mocujące:</span>
                    <span className="font-semibold text-slate-900">
                      {calculations.anchorsNeeded} szt. ({calculations.anchorPacks} paczek)
                    </span>
                  </div>
                )}

                {includeGeotextile && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Geowłóknina 150g/m²:</span>
                    <span className="font-semibold text-slate-900">
                      {calculations.geotextileRolls} {calculations.geotextileRolls === 1 ? 'rolka (50m²)' : 'rolek'}
                    </span>
                  </div>
                )}
              </div>

              {/* Price Estimate */}
              <div className="p-4 bg-white rounded-xl border border-emerald-300/90 shadow-xs">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-slate-600 font-medium">Szacowany koszt zestawu:</span>
                  <span className="text-xl font-extrabold text-emerald-700 font-heading">
                    {isB2BMode 
                      ? `${calculations.totalEstimateNetto.toFixed(2)} zł netto`
                      : `${calculations.totalEstimateBrutto.toFixed(2)} zł brutto`
                    }
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  {isB2BMode 
                    ? '* Ceny hurtowe netto. Transport wyliczany w koszyku.' 
                    : '* Ceny zawierają 23% VAT. Dostawa z windą rozładunkową.'
                  }
                </p>
              </div>

            </div>

            {/* Actions */}
            <div className="space-y-2 pt-4">
              <button
                onClick={handleAddAllToCart}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer text-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Dodaj kompletny zestaw do koszyka</span>
              </button>

              <button
                onClick={handleOpenB2BQuote}
                className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-semibold py-2.5 px-4 rounded-xl border border-slate-300 transition-colors cursor-pointer text-xs shadow-xs"
              >
                <Building2 className="w-4 h-4 text-emerald-700" />
                <span>Poproś o indywidualną wycenę FTL / NIP</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
