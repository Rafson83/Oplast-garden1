import React, { useState, useMemo } from 'react';
import { 
  MapPin, 
  Phone, 
  ExternalLink, 
  Search, 
  Clock, 
  CheckCircle2, 
  Store, 
  Truck, 
  ArrowLeft, 
  Layers, 
  Send,
  Building2,
  Sparkles,
  ChevronRight,
  FilterX
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import { PARTNERS, VOIVODESHIPS } from '../data/partners';
import { PRODUCTS } from '../data/products';
import { Partner, PartnerType } from '../types/partners';

export const PartnersDirectory: React.FC = () => {
  const { 
    setCurrentView, 
    setSelectedPartner, 
    setIsPartnerInquiryOpen, 
    partnerProductFilter, 
    setPartnerProductFilter,
    setIsInquiryOpen 
  } = useShop();
  const { t } = useLanguage();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVoivodeship, setSelectedVoivodeship] = useState('all');
  const [selectedType, setSelectedType] = useState<string>('all');

  // Filtered partners
  const filteredPartners = useMemo(() => {
    return PARTNERS.filter((partner) => {
      // Voivodeship match
      if (selectedVoivodeship !== 'all' && partner.address.voivodeship !== selectedVoivodeship) {
        return false;
      }

      // Type match
      if (selectedType !== 'all' && partner.type !== selectedType) {
        return false;
      }

      // Product filter match
      if (partnerProductFilter && !partner.stockedProducts.includes(partnerProductFilter)) {
        return false;
      }

      // Search term match (city, postalCode, street, name)
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase().trim();
        const matchesName = partner.name.toLowerCase().includes(query);
        const matchesCity = partner.address.city.toLowerCase().includes(query);
        const matchesStreet = partner.address.street.toLowerCase().includes(query);
        const matchesPostal = partner.address.postalCode.includes(query);
        if (!matchesName && !matchesCity && !matchesStreet && !matchesPostal) {
          return false;
        }
      }

      return true;
    });
  }, [selectedVoivodeship, selectedType, partnerProductFilter, searchTerm]);

  const handleOpenInquiry = (partner: Partner) => {
    setSelectedPartner(partner);
    setIsPartnerInquiryOpen(true);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedVoivodeship('all');
    setSelectedType('all');
    setPartnerProductFilter(undefined);
  };

  const getPartnerTypeLabel = (type: PartnerType): string => {
    switch (type) {
      case 'building_depot':
        return t.partners.typeBuildingDepot;
      case 'paving_depot':
        return t.partners.typePavingDepot;
      case 'garden_center':
        return t.partners.typeGardenCenter;
      case 'regional_distributor':
        return t.partners.typeRegionalDistributor;
      default:
        return 'Punkt Partnerski';
    }
  };

  const activeFiltersCount = (selectedVoivodeship !== 'all' ? 1 : 0) + 
    (selectedType !== 'all' ? 1 : 0) + 
    (partnerProductFilter ? 1 : 0) + 
    (searchTerm.trim() ? 1 : 0);

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Top Header & Breadcrumbs */}
      <div className="bg-white border-b border-slate-200/80 sticky top-18 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <button
            onClick={() => setCurrentView('home')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-emerald-700 transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-600 transition-transform group-hover:-translate-x-1" />
            <span>{t.partners.backToHome}</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
            <span>Sklep</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-emerald-700 font-bold">{t.partners.navLink}</span>
          </div>
        </div>
      </div>

      {/* Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/80 via-white to-slate-50 pt-10 pb-12 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-900 text-xs font-bold shadow-xs">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            <span>{t.partners.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-heading tracking-tight max-w-3xl mx-auto">
            {t.partners.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t.partners.subtitle}
          </p>

          {/* Quick Notice Banner on Retail Purchase */}
          <div className="max-w-3xl mx-auto mt-4 p-4 rounded-2xl bg-white border border-emerald-200 shadow-sm text-left flex flex-col sm:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div className="text-xs sm:text-sm">
              <p className="font-bold text-slate-900">
                Zakup detaliczny bez drogiej przesyłki paletowej z fabryki
              </p>
              <p className="text-slate-600 mt-0.5 leading-relaxed">
                Zamawiając pojedyncze sztuki lub kilka m² na podjazd, skorzystaj z odbioru od ręki lub lokalnego transportu w jednym z poniższych punktów. Hurtownie i centra brukarskie posiadają towar na stanie magazynowym!
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Filter and Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-md space-y-4">
          
          {/* Main Search Input */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t.partners.searchPlaceholder}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium focus:outline-hidden focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 focus:bg-white transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-700"
              >
                Wyczyść
              </button>
            )}
          </div>

          {/* Filter Selectors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            
            {/* Voivodeship Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.partners.filterVoivodeship}:</span>
              </label>
              <select
                value={selectedVoivodeship}
                onChange={(e) => setSelectedVoivodeship(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-hidden focus:border-emerald-600 focus:bg-white cursor-pointer"
              >
                {VOIVODESHIPS.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Outlet Type Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                <Store className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.partners.filterType}:</span>
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-hidden focus:border-emerald-600 focus:bg-white cursor-pointer"
              >
                <option value="all">{t.partners.allTypes}</option>
                <option value="paving_depot">{t.partners.typePavingDepot}</option>
                <option value="building_depot">{t.partners.typeBuildingDepot}</option>
                <option value="garden_center">{t.partners.typeGardenCenter}</option>
                <option value="regional_distributor">{t.partners.typeRegionalDistributor}</option>
              </select>
            </div>

            {/* Product Stocked Filter */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.partners.filterProduct}:</span>
              </label>
              <select
                value={partnerProductFilter || 'all'}
                onChange={(e) => setPartnerProductFilter(e.target.value === 'all' ? undefined : e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-hidden focus:border-emerald-600 focus:bg-white cursor-pointer"
              >
                <option value="all">{t.partners.allProducts}</option>
                {PRODUCTS.map((prod) => (
                  <option key={prod.id} value={prod.id}>
                    {prod.name}
                  </option>
                ))}
              </select>
            </div>

          </div>

          {/* Active Filters Summary & Reset */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
            <span className="font-bold text-slate-700">
              {t.partners.resultsCount} <span className="text-emerald-700 text-sm font-extrabold">{filteredPartners.length}</span>
            </span>

            {activeFiltersCount > 0 && (
              <button
                onClick={handleClearFilters}
                className="flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 px-3 py-1 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
              >
                <FilterX className="w-3.5 h-3.5" />
                <span>{t.partners.resetFilters} ({activeFiltersCount})</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Partner Cards Directory ("Wizytówki Partnerów") */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {filteredPartners.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Store className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 font-heading">
              {t.partners.noResults}
            </h3>
            <p className="text-xs text-slate-500">
              Spróbuj zmienić parametry wyszukiwania, wybrać sąsiednie województwo lub wyczyścić filtry.
            </p>
            <button
              onClick={handleClearFilters}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs transition-all cursor-pointer"
            >
              {t.partners.resetFilters}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPartners.map((partner) => {
              const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${partner.googleMapsQuery}`;
              const cleanPhone = partner.phone.replace(/\s+/g, '');

              return (
                <div
                  key={partner.id}
                  className={`bg-white rounded-3xl border transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-lg ${
                    partner.featured 
                      ? 'border-emerald-300 ring-1 ring-emerald-500/20' 
                      : 'border-slate-200/90 hover:border-emerald-400/50'
                  }`}
                >
                  {/* Card Header & Badges */}
                  <div>
                    <div className="p-5 pb-3 border-b border-slate-100 bg-gradient-to-br from-slate-50/80 via-white to-emerald-50/20">
                      
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-slate-800 text-white tracking-wider">
                          {getPartnerTypeLabel(partner.type)}
                        </span>

                        {partner.badge && (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                            {partner.badge}
                          </span>
                        )}
                      </div>

                      {/* Partner Name */}
                      <h3 className="text-lg font-bold text-slate-900 font-heading leading-snug group-hover:text-emerald-700 transition-colors">
                        {partner.name}
                      </h3>

                      {/* Address */}
                      <div className="mt-2.5 flex items-start gap-2 text-xs text-slate-600">
                        <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-slate-800">{partner.address.street}</p>
                          <p>{partner.address.postalCode} {partner.address.city}</p>
                          <p className="text-[11px] text-slate-400 capitalize">Woj. {partner.address.voivodeship}</p>
                        </div>
                      </div>

                    </div>

                    {/* Card Content & Details */}
                    <div className="p-5 space-y-4">
                      
                      {/* Hours & Phone Bar */}
                      <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-500" />
                            {t.partners.hoursLabel}
                          </p>
                          <p className="font-semibold text-slate-800 text-[11px] mt-0.5">
                            {partner.openingHours.weekdays}
                          </p>
                          <p className="text-[10px] text-slate-500">
                            Sob: {partner.openingHours.saturday}
                          </p>
                        </div>

                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
                            <Phone className="w-3 h-3 text-slate-500" />
                            Kontakt:
                          </p>
                          <a
                            href={`tel:${cleanPhone}`}
                            className="font-extrabold text-emerald-700 hover:text-emerald-800 text-xs mt-0.5 block"
                          >
                            {partner.phone}
                          </a>
                          {partner.website && (
                            <a
                              href={partner.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] text-slate-500 hover:text-emerald-700 flex items-center gap-0.5 mt-0.5"
                            >
                              <span>Strona www</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Stocked Products Pills */}
                      <div>
                        <p className="text-[11px] font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{t.partners.stockedLabel}</span>
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {partner.stockedProducts.map((prodId) => {
                            const prod = PRODUCTS.find((p) => p.id === prodId);
                            const isFiltered = partnerProductFilter === prodId;
                            return (
                              <span
                                key={prodId}
                                className={`text-[10.5px] font-semibold px-2 py-0.5 rounded-md border transition-all ${
                                  isFiltered
                                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                                    : 'bg-emerald-50 text-emerald-900 border-emerald-200/80'
                                }`}
                              >
                                {prod ? prod.name.replace('Kratka Parkingowa ', '').replace('Obrzeże Trawnikowe ', '') : prodId}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      {/* Services & Facilities */}
                      {partner.services.length > 0 && (
                        <div>
                          <p className="text-[11px] font-bold text-slate-500 mb-1">
                            {t.partners.servicesLabel}
                          </p>
                          <ul className="space-y-0.5 text-[11px] text-slate-600">
                            {partner.services.map((srv, idx) => (
                              <li key={idx} className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                <span>{srv}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="p-5 pt-0 border-t border-slate-100 mt-2 space-y-2">
                    
                    <div className="grid grid-cols-2 gap-2 pt-3">
                      {/* Direct Call Button */}
                      <a
                        href={`tel:${cleanPhone}`}
                        className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{t.partners.callBtn}</span>
                      </a>

                      {/* Directions Google Maps */}
                      <a
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white border border-slate-300 hover:border-emerald-600 hover:text-emerald-700 text-slate-700 font-bold text-xs transition-all shadow-xs cursor-pointer"
                      >
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{t.partners.directionsBtn}</span>
                      </a>
                    </div>

                    {/* Ask Availability Modal Trigger */}
                    <button
                      onClick={() => handleOpenInquiry(partner)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{t.partners.inquireBtn}</span>
                    </button>

                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Educational Section: Why Buy Locally */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-8">
          
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 font-heading">
              {t.partners.whyBuyLocalTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
              {t.partners.whyBuyLocalSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                1
              </div>
              <h4 className="text-base font-bold text-slate-900 font-heading">
                {t.partners.whyBuyLocalPoint1Title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.partners.whyBuyLocalPoint1Desc}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                2
              </div>
              <h4 className="text-base font-bold text-slate-900 font-heading">
                {t.partners.whyBuyLocalPoint2Title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.partners.whyBuyLocalPoint2Desc}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                3
              </div>
              <h4 className="text-base font-bold text-slate-900 font-heading">
                {t.partners.whyBuyLocalPoint3Title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.partners.whyBuyLocalPoint3Desc}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Become a Partner CTA Banner for B2B Dealers */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-emerald-800/40 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <Building2 className="w-3.5 h-3.5" />
              <span>{t.partners.becomePartnerBadge}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
              {t.partners.becomePartnerTitle}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {t.partners.becomePartnerDesc}
            </p>

            <div className="pt-2">
              <button
                onClick={() => setIsInquiryOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-7 rounded-xl text-sm transition-all shadow-lg shadow-emerald-900/40 cursor-pointer"
              >
                {t.partners.becomePartnerBtn}
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};
