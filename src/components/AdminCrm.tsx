import React, { useState, useMemo } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  RotateCcw, 
  ArrowLeft, 
  ShieldCheck, 
  Layers, 
  Eye, 
  Save, 
  X, 
  Users, 
  Package
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Partner, PartnerType } from '../types/partners';
import { VOIVODESHIPS } from '../data/partners';
import { PRODUCTS } from '../data/products';

type AdminTab = 'partners' | 'inquiries' | 'factory_b2b';

export const AdminCrm: React.FC = () => {
  const { 
    partnersList, 
    addPartner, 
    updatePartner, 
    deletePartner, 
    resetPartnersToDefault,
    partnerInquiries,
    updateInquiryStatus,
    deleteInquiry,
    b2bInquiries,
    sampleOrders,
    partnerUser,
    logoutPartner,
    setCurrentView
  } = useShop();

  const [activeTab, setActiveTab] = useState<AdminTab>('partners');

  // Search & Filter state for Partners
  const [partnerSearch, setPartnerSearch] = useState('');
  const [filterVoivodeship, setFilterVoivodeship] = useState('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'pending' | 'inactive'>('all');

  // Lead CRM state
  const [inquirySearch, setInquirySearch] = useState('');
  const [filterInquiryStatus, setFilterInquiryStatus] = useState<'all' | 'new' | 'in_progress' | 'completed'>('all');
  const [activeNoteEditId, setActiveNoteEditId] = useState<string | null>(null);
  const [noteContent, setNoteContent] = useState('');

  // Partner Editor State (Modal / Live Card Preview)
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingPartnerId, setEditingPartnerId] = useState<string | null>(null); // null = new
  const [editorData, setEditorData] = useState<Omit<Partner, 'id'>>({
    name: '',
    type: 'building_depot',
    badge: 'Autoryzowany Punkt Partnerski',
    featured: false,
    status: 'active',
    address: {
      street: '',
      postalCode: '',
      city: '',
      voivodeship: 'kujawsko-pomorskie',
    },
    phone: '',
    email: '',
    website: '',
    openingHours: {
      weekdays: '7:00 - 17:00',
      saturday: '8:00 - 13:00',
    },
    stockedProducts: ['grid-h40', 'grid-h50', 'border-eko-45'],
    services: ['Odbiór od ręki', 'Transport z HDS', 'Doradztwo techniczne'],
    googleMapsQuery: '',
  });

  // Services presets for quick tagging
  const AVAILABLE_SERVICES = [
    'Odbiór od ręki',
    'Transport z HDS',
    'Dostawa na budowę',
    'Płatność kartą',
    'Doradztwo techniczne',
    'Próbki materiałów',
    'Usługa montażu kratek',
  ];

  // Open editor for new partner
  const handleAddNew = () => {
    setEditingPartnerId(null);
    setEditorData({
      name: '',
      type: 'building_depot',
      badge: 'Autoryzowany Skład Partnerski',
      featured: false,
      status: 'active',
      address: {
        street: '',
        postalCode: '',
        city: '',
        voivodeship: 'kujawsko-pomorskie',
      },
      phone: '+48 ',
      email: '',
      website: '',
      openingHours: {
        weekdays: '7:00 - 17:00',
        saturday: '8:00 - 13:00',
      },
      stockedProducts: ['grid-h40', 'grid-h50', 'border-eko-45'],
      services: ['Odbiór od ręki', 'Transport z HDS', 'Płatność kartą'],
      googleMapsQuery: '',
    });
    setIsEditorOpen(true);
  };

  // Open editor for existing partner
  const handleEdit = (partner: Partner) => {
    setEditingPartnerId(partner.id);
    setEditorData({
      name: partner.name,
      type: partner.type,
      badge: partner.badge || '',
      featured: partner.featured || false,
      status: partner.status || 'active',
      address: { ...partner.address },
      phone: partner.phone,
      email: partner.email,
      website: partner.website || '',
      openingHours: { ...partner.openingHours },
      stockedProducts: [...partner.stockedProducts],
      services: [...partner.services],
      googleMapsQuery: partner.googleMapsQuery || `${partner.name} ${partner.address.street} ${partner.address.city}`,
    });
    setIsEditorOpen(true);
  };

  // Save Partner (Create or Update)
  const handleSavePartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editorData.name.trim() || !editorData.address.city.trim()) {
      alert('Proszę podać przynajmniej nazwę firmy oraz miasto.');
      return;
    }

    const finalQuery = editorData.googleMapsQuery.trim() || 
      `${editorData.name} ${editorData.address.street} ${editorData.address.city}`;

    const payload = {
      ...editorData,
      googleMapsQuery: finalQuery,
    };

    if (editingPartnerId) {
      updatePartner(editingPartnerId, payload);
    } else {
      addPartner(payload);
    }

    setIsEditorOpen(false);
  };

  // Toggle stocked product in editor
  const handleToggleProduct = (prodId: string) => {
    setEditorData(prev => {
      const exists = prev.stockedProducts.includes(prodId);
      return {
        ...prev,
        stockedProducts: exists
          ? prev.stockedProducts.filter(id => id !== prodId)
          : [...prev.stockedProducts, prodId],
      };
    });
  };

  // Toggle service in editor
  const handleToggleService = (srv: string) => {
    setEditorData(prev => {
      const exists = prev.services.includes(srv);
      return {
        ...prev,
        services: exists
          ? prev.services.filter(s => s !== srv)
          : [...prev.services, srv],
      };
    });
  };

  // Filtered partners list
  const filteredPartners = useMemo(() => {
    return partnersList.filter(p => {
      if (filterVoivodeship !== 'all' && p.address.voivodeship !== filterVoivodeship) return false;
      if (filterStatus !== 'all') {
        const pStatus = p.status || 'active';
        if (pStatus !== filterStatus) return false;
      }
      if (partnerSearch.trim()) {
        const q = partnerSearch.toLowerCase().trim();
        const inName = p.name.toLowerCase().includes(q);
        const inCity = p.address.city.toLowerCase().includes(q);
        const inStreet = p.address.street.toLowerCase().includes(q);
        const inBadge = (p.badge || '').toLowerCase().includes(q);
        if (!inName && !inCity && !inStreet && !inBadge) return false;
      }
      return true;
    });
  }, [partnersList, filterVoivodeship, filterStatus, partnerSearch]);

  // Filtered leads
  const filteredInquiries = useMemo(() => {
    return partnerInquiries.filter(inq => {
      if (filterInquiryStatus !== 'all') {
        const s = inq.status || 'new';
        if (s !== filterInquiryStatus) return false;
      }
      if (inquirySearch.trim()) {
        const q = inquirySearch.toLowerCase().trim();
        const inCust = inq.customerName.toLowerCase().includes(q);
        const inPhone = inq.phone.includes(q);
        const inEmail = inq.email.toLowerCase().includes(q);
        const inPartner = inq.partnerName.toLowerCase().includes(q);
        const inProd = inq.requestedProduct.toLowerCase().includes(q);
        if (!inCust && !inPhone && !inEmail && !inPartner && !inProd) return false;
      }
      return true;
    });
  }, [partnerInquiries, filterInquiryStatus, inquirySearch]);

  const newInquiriesCount = partnerInquiries.filter(i => (i.status || 'new') === 'new').length;

  const getPartnerTypeLabel = (type: PartnerType): string => {
    switch (type) {
      case 'building_depot': return 'Skład Materiałów Budowlanych';
      case 'paving_depot': return 'Skład Kostki i Kruszyw';
      case 'garden_center': return 'Centrum Ogrodnicze';
      case 'regional_distributor': return 'Główny Dystrybutor Regionalny';
      default: return 'Punkt Partnerski';
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 pb-24 text-slate-900">
      
      {/* Top Admin Navigation Header */}
      <div className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between h-16 sm:h-20 gap-3">
            
            {/* Title & Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white font-heading">
                    OPLAST CRM
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Panel Dystrybucji
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Zalogowany: <strong className="text-slate-200">{partnerUser?.name || 'Administrator'}</strong>
                </p>
              </div>
            </div>

            {/* Quick Actions & Navigation */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setCurrentView('home')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Wróć do sklepu</span>
              </button>

              <button
                onClick={() => setCurrentView('partners')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-950/60 border border-emerald-800/60 hover:bg-emerald-900/60 transition-colors cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">Podgląd wizytówek na stronie</span>
              </button>

              <button
                onClick={logoutPartner}
                className="px-3 py-2 rounded-xl text-xs font-bold text-red-300 hover:text-white hover:bg-red-900/40 border border-red-800/40 transition-colors cursor-pointer"
              >
                Wyloguj
              </button>
            </div>

          </div>
        </div>

        {/* Tab Switcher */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800">
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto py-2">
            <button
              onClick={() => setActiveTab('partners')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'partners'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Baza Partnerów & Wizytówki ({partnersList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'inquiries'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Leady Klientów Detalicznych ({partnerInquiries.length})</span>
              {newInquiriesCount > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full animate-pulse">
                  {newInquiriesCount} nowe
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('factory_b2b')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'factory_b2b'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Zapytania Fabryczne B2B ({b2bInquiries.length + sampleOrders.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main CRM Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        {/* ========================================================================= */}
        {/* TAB 1: PARTNER MANAGEMENT & BUSINESS CARDS                                */}
        {/* ========================================================================= */}
        {activeTab === 'partners' && (
          <div className="space-y-6">
            
            {/* Top Bar: Summary KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Wszystkie punkty</p>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-3xl font-extrabold text-slate-900 font-heading">{partnersList.length}</span>
                  <Building2 className="w-6 h-6 text-emerald-600" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Aktywne wizytówki</p>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-3xl font-extrabold text-emerald-600 font-heading">
                    {partnersList.filter(p => (p.status || 'active') === 'active').length}
                  </span>
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Województwa</p>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-3xl font-extrabold text-slate-900 font-heading">
                    {new Set(partnersList.map(p => p.address.voivodeship)).size} / 16
                  </span>
                  <MapPin className="w-6 h-6 text-emerald-600" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Złożone leady</p>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-3xl font-extrabold text-slate-900 font-heading">{partnerInquiries.length}</span>
                  <Users className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </div>

            {/* Filter and Action Header */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={partnerSearch}
                    onChange={(e) => setPartnerSearch(e.target.value)}
                    placeholder="Szukaj partnera po nazwie, mieście, ulicy..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 bg-slate-50 focus:bg-white transition-all"
                  />
                </div>

                {/* Filter Controls */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <select
                    value={filterVoivodeship}
                    onChange={(e) => setFilterVoivodeship(e.target.value)}
                    className="px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 bg-slate-50 focus:outline-hidden focus:border-emerald-600 cursor-pointer"
                  >
                    <option value="all">Wszystkie województwa</option>
                    {VOIVODESHIPS.map(v => (
                      <option key={v.id} value={v.id}>{v.label}</option>
                    ))}
                  </select>

                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value as any)}
                    className="px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 bg-slate-50 focus:outline-hidden focus:border-emerald-600 cursor-pointer"
                  >
                    <option value="all">Wszystkie statusy</option>
                    <option value="active">Tylko Aktywne</option>
                    <option value="pending">Oczekujące</option>
                    <option value="inactive">Wstrzymane / Nieaktywne</option>
                  </select>

                  {/* Add Partner Button */}
                  <button
                    onClick={handleAddNew}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-700/20 hover:scale-[1.02] transition-all cursor-pointer shrink-0"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Dodaj nowy punkt handlowy</span>
                  </button>
                </div>

              </div>

              {/* Secondary Actions Bar */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                <span>
                  Wyświetlono: <strong>{filteredPartners.length}</strong> z {partnersList.length} partnerów
                </span>
                <button
                  onClick={() => {
                    if (confirm('Czy na pewno chcesz przywrócić fabryczną listę partnerów? Twoje zmiany zostaną zastąpione domyślnymi danymi.')) {
                      resetPartnersToDefault();
                    }
                  }}
                  className="flex items-center gap-1.5 text-slate-600 hover:text-red-700 font-semibold cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Przywróć domyślną bazę partnerów</span>
                </button>
              </div>
            </div>

            {/* Partners Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPartners.map((partner) => {
                const isActive = (partner.status || 'active') === 'active';
                return (
                  <div 
                    key={partner.id}
                    className={`bg-white rounded-2xl border transition-all flex flex-col justify-between p-5 relative overflow-hidden shadow-xs hover:shadow-md ${
                      !isActive 
                        ? 'border-slate-300 opacity-75 bg-slate-50' 
                        : partner.featured 
                          ? 'border-emerald-500 ring-2 ring-emerald-500/20' 
                          : 'border-slate-200'
                    }`}
                  >
                    <div>
                      {/* Top Badges & Status */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex flex-wrap gap-1.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            isActive 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : 'bg-slate-200 text-slate-700'
                          }`}>
                            {isActive ? '● Wizytówka aktywna' : '○ Wstrzymana'}
                          </span>
                          {partner.featured && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-0.5">
                              <Sparkles className="w-3 h-3 text-amber-600" />
                              Wyróżniony
                            </span>
                          )}
                        </div>

                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                          {partner.address.voivodeship}
                        </span>
                      </div>

                      {/* Partner Name & Type */}
                      <h3 className="font-extrabold text-base text-slate-900 leading-snug">
                        {partner.name}
                      </h3>
                      <p className="text-xs text-emerald-800 font-semibold mt-0.5">
                        {getPartnerTypeLabel(partner.type)}
                      </p>

                      {partner.badge && (
                        <div className="mt-2 inline-block px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200/80 text-[11px] font-bold">
                          {partner.badge}
                        </div>
                      )}

                      {/* Address & Contact */}
                      <div className="mt-4 space-y-1.5 text-xs text-slate-600">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                          <span>{partner.address.street}, {partner.address.postalCode} {partner.address.city}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="font-semibold text-slate-800">{partner.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{partner.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>Pn-Pt: {partner.openingHours.weekdays} | Sob: {partner.openingHours.saturday}</span>
                        </div>
                      </div>

                      {/* Stocked Items Badges */}
                      <div className="mt-4 pt-3 border-t border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                          Towar na stanie:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {partner.stockedProducts.map(pId => {
                            const prod = PRODUCTS.find(p => p.id === pId);
                            return (
                              <span 
                                key={pId}
                                className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[10px] font-bold"
                              >
                                {prod ? prod.name.replace('Oplast ', '') : pId}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => {
                          const nextStatus = isActive ? 'inactive' : 'active';
                          updatePartner(partner.id, { status: nextStatus });
                        }}
                        className={`text-xs font-bold px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                          isActive 
                            ? 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200' 
                            : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                        }`}
                      >
                        {isActive ? 'Wstrzymaj' : 'Aktywuj'}
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleEdit(partner)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs transition-all cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edytuj wizytówkę</span>
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Czy na pewno usunąć partnera "${partner.name}"?`)) {
                              deletePartner(partner.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Usuń partnera"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

            {filteredPartners.length === 0 && (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">Nie znaleziono partnerów spełniających kryteria</h3>
                <p className="text-xs text-slate-500 mt-1">Zmień wyszukiwaną frazę lub zresetuj filtry.</p>
                <button
                  onClick={() => {
                    setPartnerSearch('');
                    setFilterVoivodeship('all');
                    setFilterStatus('all');
                  }}
                  className="mt-4 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
                >
                  Wyczyść filtry
                </button>
              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: CUSTOMER LEADS & PARTNER INQUIRIES                                 */}
        {/* ========================================================================= */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            
            {/* Header & Filter */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 font-heading">
                    Zapytania o dostępność w punktach (Leady)
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Wiadomości wysłane przez klientów ze strony "Gdzie kupić" bezpośrednio do składów partnerskich.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={filterInquiryStatus}
                    onChange={(e) => setFilterInquiryStatus(e.target.value as any)}
                    className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 bg-slate-50 focus:outline-hidden cursor-pointer"
                  >
                    <option value="all">Wszystkie statusy</option>
                    <option value="new">Tylko Nowe</option>
                    <option value="in_progress">W trakcie kontaktu</option>
                    <option value="completed">Zrealizowane</option>
                  </select>
                </div>
              </div>

              <div className="relative">
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={inquirySearch}
                  onChange={(e) => setInquirySearch(e.target.value)}
                  placeholder="Szukaj po nazwisku klienta, telefonie, partnerze lub produkcie..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-emerald-600 bg-slate-50 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Inquiries List */}
            <div className="space-y-4">
              {filteredInquiries.map((inq) => {
                const status = inq.status || 'new';
                const isEditingThisNote = activeNoteEditId === inq.id;

                return (
                  <div 
                    key={inq.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-sm transition-all space-y-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                            status === 'new'
                              ? 'bg-blue-100 text-blue-800 border border-blue-200'
                              : status === 'in_progress'
                                ? 'bg-amber-100 text-amber-900 border border-amber-200'
                                : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          }`}>
                            {status === 'new' && '● Nowe zapytanie'}
                            {status === 'in_progress' && '◐ W trakcie kontaktu'}
                            {status === 'completed' && '✓ Zrealizowane'}
                          </span>

                          <span className="text-xs text-slate-400">
                            Wpłynęło: {new Date(inq.createdAt).toLocaleString('pl-PL')}
                          </span>
                        </div>

                        <div className="mt-2">
                          <p className="text-xs text-slate-500">Skierowane do punktu:</p>
                          <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                            <Building2 className="w-4 h-4 text-emerald-600" />
                            {inq.partnerName}
                          </h4>
                        </div>
                      </div>

                      {/* Status Selector Dropdown */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-500">Zmień status:</span>
                        <select
                          value={status}
                          onChange={(e) => updateInquiryStatus(inq.id, e.target.value as any)}
                          className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-slate-50 focus:outline-hidden cursor-pointer"
                        >
                          <option value="new">Nowe</option>
                          <option value="in_progress">W trakcie kontaktu</option>
                          <option value="completed">Zrealizowane</option>
                        </select>
                        <button
                          onClick={() => {
                            if (confirm('Czy na pewno chcesz usunąć to zapytanie?')) {
                              deleteInquiry(inq.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Usuń zapytanie"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Customer & Product Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-xs">
                      <div>
                        <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-1">
                          Dane Klienta:
                        </p>
                        <p className="font-bold text-slate-900 text-sm">{inq.customerName}</p>
                        <div className="mt-1 space-y-1">
                          <a 
                            href={`tel:${inq.phone}`} 
                            className="flex items-center gap-1.5 text-emerald-700 hover:underline font-bold"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>{inq.phone}</span>
                          </a>
                          <a 
                            href={`mailto:${inq.email}`} 
                            className="flex items-center gap-1.5 text-slate-600 hover:underline"
                          >
                            <Mail className="w-3.5 h-3.5" />
                            <span>{inq.email}</span>
                          </a>
                        </div>
                      </div>

                      <div>
                        <p className="font-bold text-slate-400 uppercase tracking-wider text-[10px] mb-1">
                          Zamawiany Towar:
                        </p>
                        <p className="font-bold text-slate-900 text-sm">{inq.requestedProduct}</p>
                        {inq.estimatedQuantity && (
                          <p className="text-slate-600 mt-1">
                            Szacowana ilość: <strong>{inq.estimatedQuantity}</strong>
                          </p>
                        )}
                        {inq.message && (
                          <div className="mt-2 p-2 bg-white rounded-lg border border-slate-200 text-slate-700 italic">
                            "{inq.message}"
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Internal CRM Notes */}
                    <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                      <div className="flex-1 w-full">
                        {isEditingThisNote ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={noteContent}
                              onChange={(e) => setNoteContent(e.target.value)}
                              placeholder="Wpisz notatkę (np. Klient zadzwonił, zamówienie odebrane)..."
                              className="flex-1 px-3 py-1.5 rounded-lg border border-emerald-500 text-xs bg-white"
                            />
                            <button
                              onClick={() => {
                                updateInquiryStatus(inq.id, inq.status || 'new', noteContent);
                                setActiveNoteEditId(null);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white font-bold text-xs cursor-pointer"
                            >
                              Zapisz
                            </button>
                            <button
                              onClick={() => setActiveNoteEditId(null)}
                              className="px-2 py-1.5 text-slate-500 hover:text-slate-800 text-xs cursor-pointer"
                            >
                              Anuluj
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="text-slate-500 font-semibold">Notatka handlowa:</span>
                            <span className="text-slate-800 italic">
                              {inq.notes || 'Brak notatek'}
                            </span>
                            <button
                              onClick={() => {
                                setActiveNoteEditId(inq.id);
                                setNoteContent(inq.notes || '');
                              }}
                              className="text-emerald-700 hover:underline font-bold text-[11px] ml-2 cursor-pointer"
                            >
                              Edytuj
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                );
              })}

              {filteredInquiries.length === 0 && (
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
                  <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-slate-800">Brak zapytań o dostępność</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Zapytania klientów wysłane przez formularz "Zapytaj o dostępność" na wizytówkach partnerów pojawią się w tym miejscu.
                  </p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: DIRECT FACTORY B2B INQUIRIES & SAMPLES                             */}
        {/* ========================================================================= */}
        {activeTab === 'factory_b2b' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <h2 className="text-xl font-black text-slate-900 font-heading">
                Zapytania Ofertowe B2B & Zamówienia Wzorników
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Bezpośrednie zapytania inwestycyjne, hurtowe zamówienia paletowe FTL oraz zamówione bezpłatne wzorniki (Sample Box).
              </p>
            </div>

            {/* B2B Inquiries Section */}
            <div className="space-y-3">
              <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-600" />
                Wyceny Inwestycyjne B2B ({b2bInquiries.length})
              </h3>

              {b2bInquiries.map((inq) => (
                <div key={inq.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">{inq.companyName} (NIP: {inq.nip})</h4>
                      <p className="text-xs text-slate-500">Kontakt: {inq.contactPerson} • {inq.phone} • {inq.email}</p>
                    </div>
                    <span className="text-[11px] text-slate-400">{new Date(inq.createdAt).toLocaleDateString('pl-PL')}</span>
                  </div>
                  <div className="text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex flex-wrap gap-4">
                    <span>Typ: <strong>{inq.investmentType}</strong></span>
                    <span>Produkt: <strong>{inq.preferredProduct}</strong></span>
                    <span>Powierzchnia: <strong>{inq.estimatedM2} m²</strong></span>
                    <span>Transport: <strong>{inq.requiresTransport ? 'Wymagany' : 'Własny odbiór'}</strong></span>
                  </div>
                  {inq.notes && <p className="text-xs text-slate-600 italic">"{inq.notes}"</p>}
                </div>
              ))}

              {b2bInquiries.length === 0 && (
                <p className="text-xs text-slate-400 bg-white p-6 rounded-xl text-center border border-slate-200">
                  Brak bezpośrednich zapytań B2B.
                </p>
              )}
            </div>

            {/* Sample Box Orders */}
            <div className="space-y-3 pt-4">
              <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Package className="w-4 h-4 text-emerald-600" />
                Wysłane Wzorniki / Sample Box ({sampleOrders.length})
              </h3>

              {sampleOrders.map((smp) => (
                <div key={smp.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1 text-xs">
                  <div className="flex justify-between items-start">
                    <span className="font-extrabold text-slate-900">{smp.companyName} (NIP: {smp.nip})</span>
                    <span className="text-slate-400">{new Date(smp.createdAt).toLocaleDateString('pl-PL')}</span>
                  </div>
                  <p className="text-slate-600">Adres wysyłki: {smp.street}, {smp.postalCode} {smp.city}</p>
                  <p className="text-slate-600">Odbiorca: {smp.recipientName} • tel: {smp.phone}</p>
                </div>
              ))}

              {sampleOrders.length === 0 && (
                <p className="text-xs text-slate-400 bg-white p-6 rounded-xl text-center border border-slate-200">
                  Brak zamówień wzorników.
                </p>
              )}
            </div>

          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* PARTNER BUSINESS CARD EDITOR MODAL WITH LIVE PREVIEW                      */}
      {/* ========================================================================= */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
          <div 
            className="relative bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[92vh] flex flex-col border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-xs">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 font-heading">
                    {editingPartnerId ? 'Edycja wizytówki partnera' : 'Nowy punkt handlowy w sieci Oplast'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Wprowadź dane punktu dystrybucji. Podgląd wizytówki aktualizuje się w czasie rzeczywistym.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsEditorOpen(false)}
                className="text-slate-400 hover:text-slate-700 bg-white p-2 rounded-full border border-slate-200 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: 2 Columns (Form Left, Live Card Preview Right) */}
            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Form Column */}
              <form onSubmit={handleSavePartner} id="partner-form" className="lg:col-span-7 space-y-4">
                
                {/* Basic info */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nazwa Składu / Punktu Handlowego: *
                  </label>
                  <input
                    type="text"
                    required
                    value={editorData.name}
                    onChange={(e) => setEditorData({ ...editorData, name: e.target.value })}
                    placeholder="np. Hurtownia Budowlana PRO-BUD"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:border-emerald-600 bg-slate-50 focus:bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Typ punktu:
                    </label>
                    <select
                      value={editorData.type}
                      onChange={(e) => setEditorData({ ...editorData, type: e.target.value as PartnerType })}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold bg-slate-50 focus:outline-hidden focus:border-emerald-600 cursor-pointer"
                    >
                      <option value="building_depot">Skład Materiałów Budowlanych</option>
                      <option value="paving_depot">Skład Kostki i Kruszyw</option>
                      <option value="garden_center">Centrum Ogrodnicze</option>
                      <option value="regional_distributor">Główny Dystrybutor Regionalny</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Etykieta wyróżniająca (Badge):
                    </label>
                    <input
                      type="text"
                      value={editorData.badge}
                      onChange={(e) => setEditorData({ ...editorData, badge: e.target.value })}
                      placeholder="np. Punkt Fabryczny, Główny Dystrybutor"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:border-emerald-600 bg-slate-50 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Status & Featured toggle */}
                <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Status wizytówki:
                    </label>
                    <select
                      value={editorData.status}
                      onChange={(e) => setEditorData({ ...editorData, status: e.target.value as any })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold bg-white cursor-pointer"
                    >
                      <option value="active">Aktywna (widoczna na stronie)</option>
                      <option value="pending">Oczekująca na weryfikację</option>
                      <option value="inactive">Wstrzymana (ukryta)</option>
                    </select>
                  </div>

                  <div className="flex items-center pt-5">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                      <input
                        type="checkbox"
                        checked={editorData.featured}
                        onChange={(e) => setEditorData({ ...editorData, featured: e.target.checked })}
                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                      />
                      <span>Wyróżnij na samej górze listy</span>
                    </label>
                  </div>
                </div>

                {/* Address Section */}
                <div className="pt-2 border-t border-slate-200">
                  <p className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">
                    Adres lokalizacji
                  </p>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-2">
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Ulica i numer: *
                        </label>
                        <input
                          type="text"
                          required
                          value={editorData.address.street}
                          onChange={(e) => setEditorData({
                            ...editorData,
                            address: { ...editorData.address, street: e.target.value }
                          })}
                          placeholder="np. ul. Toruńska 88"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-slate-50 focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Kod pocztowy: *
                        </label>
                        <input
                          type="text"
                          required
                          value={editorData.address.postalCode}
                          onChange={(e) => setEditorData({
                            ...editorData,
                            address: { ...editorData.address, postalCode: e.target.value }
                          })}
                          placeholder="87-100"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-slate-50 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Miejscowość: *
                        </label>
                        <input
                          type="text"
                          required
                          value={editorData.address.city}
                          onChange={(e) => setEditorData({
                            ...editorData,
                            address: { ...editorData.address, city: e.target.value }
                          })}
                          placeholder="np. Toruń"
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-slate-50 focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-600 mb-1">
                          Województwo: *
                        </label>
                        <select
                          value={editorData.address.voivodeship}
                          onChange={(e) => setEditorData({
                            ...editorData,
                            address: { ...editorData.address, voivodeship: e.target.value }
                          })}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-slate-50 focus:bg-white cursor-pointer"
                        >
                          {VOIVODESHIPS.map(v => (
                            <option key={v.id} value={v.id}>{v.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact details */}
                <div className="pt-2 border-t border-slate-200">
                  <p className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">
                    Kontakt i godziny otwarcia
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Telefon:</label>
                      <input
                        type="text"
                        value={editorData.phone}
                        onChange={(e) => setEditorData({ ...editorData, phone: e.target.value })}
                        placeholder="+48 56 655 44 33"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-slate-50 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Adres e-mail:</label>
                      <input
                        type="email"
                        value={editorData.email}
                        onChange={(e) => setEditorData({ ...editorData, email: e.target.value })}
                        placeholder="sklep@probud.pl"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-slate-50 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Godziny Pn - Pt:</label>
                      <input
                        type="text"
                        value={editorData.openingHours.weekdays}
                        onChange={(e) => setEditorData({
                          ...editorData,
                          openingHours: { ...editorData.openingHours, weekdays: e.target.value }
                        })}
                        placeholder="7:00 - 17:00"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-slate-50 focus:bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Godziny Sobota:</label>
                      <input
                        type="text"
                        value={editorData.openingHours.saturday}
                        onChange={(e) => setEditorData({
                          ...editorData,
                          openingHours: { ...editorData.openingHours, saturday: e.target.value }
                        })}
                        placeholder="8:00 - 13:00 lub Zamknięte"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs bg-slate-50 focus:bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Stocked Products Checkboxes */}
                <div className="pt-2 border-t border-slate-200">
                  <p className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">
                    Dostępny asortyment Oplast (na stanie magazynowym)
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {PRODUCTS.map(prod => {
                      const isChecked = editorData.stockedProducts.includes(prod.id);
                      return (
                        <label 
                          key={prod.id}
                          className={`flex items-center gap-2 p-2 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                            isChecked 
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-2xs' 
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleToggleProduct(prod.id)}
                            className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
                          />
                          <span className="truncate">{prod.name.replace('Oplast ', '')}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Services Checkboxes */}
                <div className="pt-2 border-t border-slate-200">
                  <p className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">
                    Udogodnienia i Usługi w punkcie
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {AVAILABLE_SERVICES.map(srv => {
                      const isSelected = editorData.services.includes(srv);
                      return (
                        <button
                          key={srv}
                          type="button"
                          onClick={() => handleToggleService(srv)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-700 text-white shadow-xs'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          {isSelected ? '✓ ' : '+ '}{srv}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </form>

              {/* Right Column: Live Card Preview */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="sticky top-0 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-emerald-600" />
                      Podgląd wizytówki na żywo:
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                      Live Preview
                    </span>
                  </div>

                  {/* Render the Exact Card As Seen on Public Website */}
                  <div className="bg-white rounded-3xl border-2 border-emerald-500/80 shadow-xl overflow-hidden flex flex-col justify-between p-6">
                    <div>
                      {/* Badge & Type */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300">
                          {editorData.badge || 'Punkt Partnerski'}
                        </span>
                        {editorData.featured && (
                          <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                            Polecany
                          </span>
                        )}
                      </div>

                      <h3 className="font-extrabold text-lg text-slate-900 font-heading leading-tight">
                        {editorData.name || 'Nazwa Punktu Handlowego'}
                      </h3>
                      <p className="text-xs text-emerald-800 font-bold mt-1">
                        {getPartnerTypeLabel(editorData.type)}
                      </p>

                      {/* Address */}
                      <div className="mt-4 space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>
                            {editorData.address.street || 'ul. Przykładowa 1'},{' '}
                            {editorData.address.postalCode || '00-000'}{' '}
                            {editorData.address.city || 'Miejscowość'}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="font-bold text-slate-900">
                            {editorData.phone || '+48 000 000 000'}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>
                            Pn-Pt: {editorData.openingHours.weekdays} | Sob: {editorData.openingHours.saturday}
                          </span>
                        </div>
                      </div>

                      {/* Stocked Items */}
                      <div className="mt-4 pt-3 border-t border-slate-100">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                          Dostępne na miejscu:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {editorData.stockedProducts.map(pId => {
                            const p = PRODUCTS.find(prod => prod.id === pId);
                            return (
                              <span 
                                key={pId}
                                className="px-2 py-0.5 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-md text-[10px] font-bold"
                              >
                                {p ? p.name.replace('Oplast ', '') : pId}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      {/* Services */}
                      {editorData.services.length > 0 && (
                        <div className="mt-3">
                          <div className="flex flex-wrap gap-1">
                            {editorData.services.map((srv, idx) => (
                              <span 
                                key={idx}
                                className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[9.5px] font-medium"
                              >
                                ✓ {srv}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Preview Buttons */}
                    <div className="mt-6 pt-3 border-t border-slate-100 space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          className="py-2.5 px-3 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5"
                        >
                          <Phone className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Zadzwoń</span>
                        </button>
                        <button
                          type="button"
                          className="py-2.5 px-3 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5"
                        >
                          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Nawiguj</span>
                        </button>
                      </div>

                      <button
                        type="button"
                        className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Zapytaj o dostępność w punkcie</span>
                      </button>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 text-center italic">
                    Podgląd odzwierciedla styl wizytówki w katalogu "Gdzie kupić".
                  </p>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setIsEditorOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs sm:text-sm cursor-pointer transition-colors"
              >
                Anuluj
              </button>

              <button
                type="submit"
                form="partner-form"
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-emerald-700/20 hover:scale-[1.02] transition-all cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Zapisz wizytówkę partnera</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
