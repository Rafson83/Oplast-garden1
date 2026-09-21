import React, { useState } from 'react';
import { 
  Layers, 
  Grid, 
  Box, 
  Search, 
  Building2, 
  Calculator
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCategory } from '../types/shop';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';

export const ProductCatalog: React.FC = () => {
  const { isB2BMode, setIsCalculatorOpen } = useShop();
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
              Katalog Fabryczny Oplast Garden
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 font-heading">
              Kratki Trawnikowo-Parkingowe i Obrzeża
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-2xl">
              Sprawdzone rozwiązania inżynierii drogowej i ogrodowej z certyfikatem GOZ. Dostępne natychmiast prosto z linii produkcyjnej.
            </p>
          </div>

          <button
            onClick={() => setIsCalculatorOpen(true)}
            className="self-start md:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-sm transition-colors cursor-pointer"
          >
            <Calculator className="w-4 h-4" />
            <span>Nie wiesz ile zamówić? Uruchom kalkulator m²</span>
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
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Wszystkie ({PRODUCTS.length})
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
              Kratki Parkingowe & Drogowe (H30 / H40 / H50)
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
              Obrzeża Trawnikowe Eko-Bord
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
              Akcesoria (Kotwy, Znaczniki, Geowłóknina)
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Szukaj produktu lub modelu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-800 placeholder-slate-400"
            />
          </div>

        </div>

        {/* B2B In-Catalog Advisory Box */}
        {isB2BMode && (
          <div className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white p-4 rounded-2xl border border-emerald-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Aktywny tryb B2B – Ceny hurtowe netto</p>
                <p className="text-xs text-slate-300">
                  Wyświetlane ceny uwzględniają rabaty paletowe. W koszyku możesz wygenerować zapytanie o dostawę FTL z rozładunkiem HDS.
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-3 py-1.5 rounded-lg border border-emerald-700/50">
              Ceny Fabryczne Oplast Winduga
            </span>
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
            <p className="text-slate-500 text-sm">Nie znaleziono produktów odpowiadających zapytaniu "{searchQuery}".</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
              className="mt-3 text-xs font-bold text-emerald-700 hover:underline"
            >
              Wyczyść filtry
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
