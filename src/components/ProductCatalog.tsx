import React, { useState } from 'react';
import { 
  Layers, 
  Grid, 
  Box, 
  Search, 
  Building2, 
  Calculator,
  Store,
  MapPin
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCategory } from '../types/shop';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';

export const ProductCatalog: React.FC = () => {
  const { isB2BMode, setIsCalculatorOpen, setCurrentView } = useShop();
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCat = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="produkty" className="py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-100/80 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Layers className="w-3.5 h-3.5" />
              {t.catalog.badge}
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
              {t.catalog.title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-2xl">
              {t.catalog.subtitle}
            </p>
          </div>

          <button
            onClick={() => setIsCalculatorOpen(true)}
            className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-sm transition-colors cursor-pointer"
          >
            <Calculator className="w-4 h-4" />
            <span>{t.catalog.notSureCta}</span>
          </button>
        </div>

        {/* Category Tabs & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {t.catalog.all} ({PRODUCTS.length})
            </button>

            <button
              id="kratki"
              onClick={() => setActiveCategory('kratki')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'kratki'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Grid className="w-4 h-4" />
              {t.catalog.grids}
            </button>

            <button
              id="obrzeza"
              onClick={() => setActiveCategory('obrzeza')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'obrzeza'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-4 h-4" />
              {t.catalog.borders}
            </button>

            <button
              id="akcesoria"
              onClick={() => setActiveCategory('akcesoria')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'akcesoria'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              <Box className="w-4 h-4" />
              {t.catalog.accessories}
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={t.catalog.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-800 placeholder-slate-400"
            />
          </div>

        </div>

        {/* B2B Wholesale Banner */}
        {isB2BMode ? (
          <div className="bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-100/60 text-slate-900 p-4 rounded-2xl border border-emerald-300 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-600 text-white shadow-xs">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{t.catalog.b2bBannerTitle}</p>
                <p className="text-xs text-slate-600">
                  {t.catalog.b2bBannerDesc}
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-900 bg-white px-3.5 py-1.5 rounded-lg border border-emerald-300 shadow-xs">
              {t.catalog.b2bBannerBadge}
            </span>
          </div>
        ) : (
          /* Retail Partner Network Banner - Explains No Imposed Margins */
          <div className="bg-gradient-to-r from-emerald-50/90 via-slate-50 to-emerald-50/80 text-slate-900 p-4 rounded-2xl border border-emerald-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-600 text-white shadow-xs">
                <Store className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Sprzedaż detaliczna w autoryzowanych punktach partnerskich</p>
                <p className="text-xs text-slate-600 mt-0.5">
                  Ceny detaliczne ustalane są indywidualnie przez lokalne składy — fabryka Oplast nie narzuca sztywnych marż. Kupuj na sztuki i m² z odbiorem osobistym.
                </p>
              </div>
            </div>
            <button
              onClick={() => setCurrentView('partners')}
              className="text-xs font-bold text-emerald-900 bg-white hover:bg-emerald-100 px-4 py-2.5 rounded-xl border border-emerald-300 shadow-xs transition-all shrink-0 cursor-pointer flex items-center gap-1.5"
            >
              <MapPin className="w-4 h-4 text-emerald-700" />
              <span>Gdzie kupić w Twojej okolicy</span>
            </button>
          </div>
        )}

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-sm">{t.catalog.noResults} "{searchQuery}".</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="mt-3 text-xs font-bold text-emerald-700 hover:underline"
            >
              {t.catalog.clearFilters}
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
