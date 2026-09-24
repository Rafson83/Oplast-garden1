import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Layers, 
  Check, 
  Percent, 
  ChevronDown, 
  ChevronUp, 
  Package, 
  FileText,
  Building2,
  MapPin
} from 'lucide-react';
import { Product, ProductColor, UnitType } from '../types/shop';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedProduct } from '../i18n/productTranslations';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    isB2BMode, 
    addToCart, 
    setIsInquiryOpen, 
    setInquiryPreselectedProduct,
    setCurrentView,
    setPartnerProductFilter 
  } = useShop();
  const { language, t } = useLanguage();

  const localized = getLocalizedProduct(product, language);

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [unitType, setUnitType] = useState<UnitType>(isB2BMode && product.priceNettoPallet ? 'pallet' : 'piece');
  const [quantity, setQuantity] = useState<number>(1);
  const [showSpecs, setShowSpecs] = useState<boolean>(false);
  const [isAddedAnimation, setIsAddedAnimation] = useState<boolean>(false);

  // Price calculations
  let basePriceNetto = product.priceNettoUnit;
  let basePriceBrutto = product.priceBruttoUnit;
  let unitLabel = t.catalog.piece;

  if (unitType === 'pallet' && product.priceNettoPallet && product.priceBruttoPallet) {
    basePriceNetto = product.priceNettoPallet;
    basePriceBrutto = product.priceBruttoPallet;
    unitLabel = `${t.catalog.pallet} (${product.piecesPerPallet} ${t.catalog.piece.toLowerCase()})`;
  } else if (unitType === 'm2') {
    const mult = product.coveragePerM2 || 4.4;
    basePriceNetto = product.priceNettoUnit * mult;
    basePriceBrutto = product.priceBruttoUnit * mult;
    unitLabel = 'm²';
  }

  // Active discount calculation
  let activeDiscountPct = 0;
  for (const tier of product.b2bDiscountTiers) {
    if (unitType === 'pallet' && tier.unitLabel.includes('palet') && quantity >= tier.minUnits) {
      activeDiscountPct = Math.max(activeDiscountPct, tier.discountPercent);
    } else if (unitType !== 'pallet' && !tier.unitLabel.includes('palet') && quantity >= tier.minUnits) {
      activeDiscountPct = Math.max(activeDiscountPct, tier.discountPercent);
    }
  }

  const effectivePriceNetto = basePriceNetto * (1 - activeDiscountPct / 100);
  const effectivePriceBrutto = basePriceBrutto * (1 - activeDiscountPct / 100);

  const handleAddToCart = () => {
    addToCart(product, selectedColor, unitType, quantity);
    setIsAddedAnimation(true);
    setTimeout(() => setIsAddedAnimation(false), 1200);
  };

  const handleB2BInquiry = () => {
    setInquiryPreselectedProduct(`${localized.name} - ${quantity} ${unitLabel}`);
    setIsInquiryOpen(true);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-emerald-500/40 transition-all duration-200 flex flex-col justify-between overflow-hidden group">
      
      {/* Product Header & Visual Representation */}
      <div>
        
        {/* Visual Product Banner / Graphic Box */}
        <div className="relative h-52 bg-gradient-to-br from-slate-100 via-slate-50 to-emerald-50/40 p-5 flex flex-col justify-between border-b border-slate-100">
          
          <div className="flex items-start justify-between gap-2">
            {/* Badges */}
            <div className="flex flex-wrap gap-1.5">
              {localized.badge && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-600 text-white tracking-wide shadow-xs">
                  {localized.badge}
                </span>
              )}
              {product.loadCapacityTonnes && (
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-800 text-slate-200">
                  {product.loadCapacityTonnes} t/m²
                </span>
              )}
            </div>

            {/* Recycled Tag */}
            <span className="text-[10px] font-bold uppercase text-emerald-800 bg-emerald-100/90 px-2 py-0.5 rounded-md">
              100% Recykling PP/PE
            </span>
          </div>

          {/* SVG Illustration of Grid / Border */}
          <div className="flex items-center justify-center my-auto">
            {product.category === 'kratki' ? (
              <div className="relative w-36 h-28 flex items-center justify-center">
                {/* Honeycomb Grid Simulation */}
                <svg viewBox="0 0 100 80" className="w-full h-full drop-shadow-md transition-transform duration-300 group-hover:scale-105">
                  <defs>
                    <pattern id={`hex-pattern-${product.id}`} width="20" height="23" patternUnits="userSpaceOnUse">
                      <polygon 
                        points="10,0 20,6 20,18 10,24 0,18 0,6" 
                        fill={selectedColor.hex}
                        stroke="#475569" 
                        strokeWidth="1.2"
                      />
                    </pattern>
                  </defs>
                  <rect width="100" height="80" rx="4" fill={`url(#hex-pattern-${product.id})`} />
                  <rect width="100" height="80" rx="4" fill="none" stroke={selectedColor.id === 'green' ? '#14532d' : '#0f172a'} strokeWidth="3" />
                </svg>
                <div className="absolute -bottom-2 bg-slate-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
                  H: {product.heightMm} mm
                </div>
              </div>
            ) : product.category === 'obrzeza' ? (
              <div className="relative w-40 h-24 flex items-center justify-center">
                <svg viewBox="0 0 120 40" className="w-full h-full drop-shadow-sm group-hover:scale-105 transition-transform">
                  <rect x="5" y="15" width="110" height="18" rx="2" fill={selectedColor.hex} />
                  <path d="M15 15 L25 5 L35 15 M45 15 L55 5 L65 15 M75 15 L85 5 L95 15" stroke="#334155" strokeWidth="2.5" fill="none" />
                  <circle cx="20" cy="24" r="3" fill="#cbd5e1" />
                  <circle cx="60" cy="24" r="3" fill="#cbd5e1" />
                  <circle cx="100" cy="24" r="3" fill="#cbd5e1" />
                </svg>
                <div className="absolute -bottom-1 bg-slate-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                  100 cm • H: {product.heightMm} mm
                </div>
              </div>
            ) : (
              <div className="relative w-32 h-24 flex items-center justify-center">
                <div className="p-4 rounded-xl bg-white/80 shadow-xs border border-slate-200/80 flex items-center justify-center">
                  <Layers className="w-12 h-12 text-emerald-700" />
                </div>
              </div>
            )}
          </div>

          {/* Color Switcher */}
          <div className="flex items-center justify-between text-xs pt-1">
            <span className="text-[11px] font-semibold text-slate-500">{t.catalog.colorLabel}:</span>
            <div className="flex items-center gap-2">
              {product.colors.map(color => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color)}
                  className={`flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                    selectedColor.id === color.id
                      ? 'border-emerald-600 bg-white text-emerald-900 shadow-xs font-bold'
                      : 'border-transparent text-slate-600 hover:bg-slate-200/60'
                  }`}
                >
                  <span 
                    className="w-3 h-3 rounded-full border border-slate-400" 
                    style={{ backgroundColor: color.hex }}
                  />
                  <span>{color.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Content Box */}
        <div className="p-5 space-y-4">
          
          <div>
            <h3 className="text-lg font-bold text-slate-900 font-heading leading-snug group-hover:text-emerald-700 transition-colors">
              {localized.name}
            </h3>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
              {localized.subtitle}
            </p>
          </div>

          {/* Unit Selection Pills (Szt / m² / Paleta) */}
          <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setUnitType('piece')}
              className={`flex-1 py-1.5 text-center rounded-lg transition-all cursor-pointer ${
                unitType === 'piece' ? 'bg-white shadow-xs font-bold text-slate-900' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.catalog.piece}
            </button>
            {product.coveragePerM2 && (
              <button
                onClick={() => setUnitType('m2')}
                className={`flex-1 py-1.5 text-center rounded-lg transition-all cursor-pointer ${
                  unitType === 'm2' ? 'bg-white shadow-xs font-bold text-slate-900' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                1 m² ({product.coveragePerM2} {t.catalog.piece.toLowerCase()})
              </button>
            )}
            {product.priceNettoPallet && (
              <button
                onClick={() => setUnitType('pallet')}
                className={`flex-1 py-1.5 text-center rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1 ${
                  unitType === 'pallet' 
                    ? 'bg-emerald-700 text-white shadow-xs font-bold' 
                    : 'text-emerald-800 hover:text-emerald-950 font-bold'
                }`}
              >
                <Package className="w-3 h-3" />
                {t.catalog.pallet}
              </button>
            )}
          </div>

          {/* Price Display */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-2xl font-extrabold text-slate-900 font-heading">
                  {isB2BMode 
                    ? `${effectivePriceNetto.toFixed(2)} zł` 
                    : `${effectivePriceBrutto.toFixed(2)} zł`
                  }
                </span>
                <span className="text-xs text-slate-500 font-semibold ml-1.5">
                  {isB2BMode ? 'netto' : 'brutto'} / {unitLabel}
                </span>
              </div>

              {activeDiscountPct > 0 && (
                <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-xs font-extrabold flex items-center gap-0.5">
                  <Percent className="w-3 h-3" /> -{activeDiscountPct}%
                </span>
              )}
            </div>

            <div className="text-[11px] text-slate-500 mt-1 flex justify-between">
              <span>
                {isB2BMode 
                  ? `Brutto: ${effectivePriceBrutto.toFixed(2)} zł`
                  : `Netto: ${effectivePriceNetto.toFixed(2)} zł`
                }
              </span>
              {product.piecesPerPallet && unitType === 'pallet' && (
                <span className="text-emerald-700 font-medium">
                  ~{(effectivePriceNetto / product.piecesPerPallet).toFixed(2)} zł netto/{t.catalog.piece.toLowerCase()}
                </span>
              )}
            </div>
          </div>

          {/* B2B Tier Discounts Accordion / Hints */}
          {isB2BMode && product.b2bDiscountTiers.length > 0 && (
            <div className="text-[11px] bg-emerald-50/60 rounded-xl p-2.5 border border-emerald-200/60 space-y-1">
              <p className="font-bold text-emerald-900 flex items-center gap-1">
                <Building2 className="w-3 h-3 text-emerald-700" />
                <span>{t.catalog.tierHeading}</span>
              </p>
              <div className="space-y-0.5 text-slate-600">
                {product.b2bDiscountTiers.map((tier, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[10.5px]">
                    <span>Od {tier.minUnits} {tier.unitLabel}:</span>
                    <span className="font-bold text-emerald-700">-{tier.discountPercent}% ({tier.label})</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Specs Toggle */}
          <div>
            <button
              onClick={() => setShowSpecs(!showSpecs)}
              className="w-full flex items-center justify-between text-xs font-bold text-slate-700 hover:text-emerald-700 py-1 cursor-pointer transition-colors"
            >
              <span className="flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" />
                {t.catalog.viewSpecs}
              </span>
              {showSpecs ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showSpecs && (
              <div className="mt-2 text-xs border-t border-slate-200 pt-2 space-y-1 animate-in fade-in duration-150">
                {Object.entries(product.technicalSpecs).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-0.5 border-b border-slate-100 text-slate-600">
                    <span className="text-slate-500">{key}:</span>
                    <span className="font-semibold text-slate-800 text-right">{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Card Footer: B2C Partner Purchasing vs B2B Pallet Direct */}
      <div className="p-5 pt-0 space-y-2.5">
        {!isB2BMode ? (
          /* B2C Retail Mode - Partner First */
          <div className="space-y-2">
            <button
              onClick={() => {
                setPartnerProductFilter(product.id);
                setCurrentView('partners');
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-700/15 hover:shadow-emerald-700/25 transition-all cursor-pointer group"
            >
              <MapPin className="w-4 h-4 text-emerald-200 group-hover:scale-110 transition-transform" />
              <span>{t.catalog.buyFromPartner}</span>
            </button>

            {/* Direct Factory Order Secondary Option */}
            <div className="flex items-center gap-2 pt-1">
              <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50 p-0.5">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center cursor-pointer transition-colors text-xs"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-10 text-center text-xs font-bold bg-transparent focus:outline-hidden"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center cursor-pointer transition-colors text-xs"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-slate-200 hover:border-emerald-600 text-slate-600 hover:text-emerald-800 bg-slate-50 hover:bg-white text-xs font-bold transition-all cursor-pointer ${
                  isAddedAnimation ? 'bg-emerald-50 border-emerald-600 text-emerald-800' : ''
                }`}
                title="Zamów prosto z fabryki (wysyłka paletowa)"
              >
                {isAddedAnimation ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{t.catalog.addedToCart}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5 text-slate-500" />
                    <span>{t.catalog.addToCart}</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-[10px] text-slate-400 text-center leading-tight">
              {t.catalog.retailNotice}
            </p>
          </div>
        ) : (
          /* B2B Wholesale Mode - Direct Pallet / Bulk Purchasing */
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center cursor-pointer transition-colors"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-12 text-center text-sm font-bold bg-transparent focus:outline-hidden"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center cursor-pointer transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer shadow-sm ${
                  isAddedAnimation
                    ? 'bg-emerald-600 text-white scale-[1.02]'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {isAddedAnimation ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>{t.catalog.addedToCart}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>{t.catalog.addToCart}</span>
                  </>
                )}
              </button>
            </div>

            <button
              onClick={handleB2BInquiry}
              className="w-full text-center text-xs text-slate-600 hover:text-emerald-700 font-semibold py-1 transition-colors cursor-pointer"
            >
              {t.catalog.ftlPrompt}
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
