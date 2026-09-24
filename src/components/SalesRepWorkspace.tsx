import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Phone, 
  MapPin, 
  Calendar, 
  AlertTriangle, 
  Cake, 
  TrendingUp, 
  Briefcase, 
  FileText, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Copy, 
  ShieldCheck, 
  ChevronRight, 
  ArrowRight, 
  X, 
  Trash2, 
  Sparkles, 
  Truck, 
  MessageSquare, 
  RefreshCw, 
  CalendarPlus, 
  BadgeAlert, 
  UserCheck 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { 
  SalesClient, 
  SalesClientCategory 
} from '../types/partners';
import { PRODUCTS } from '../data/products';
import { VOIVODESHIPS } from '../data/partners';

type SalesWorkspaceTab = 'dashboard' | 'clients' | 'catalog_offer' | 'team_admin';

export const SalesRepWorkspace: React.FC = () => {
  const { 
    partnerUser, 
    salesReps, 
    salesClients, 
    activeRepFilter, 
    setActiveRepFilter,
    addSalesClient,
    addClientContactLog,
    addClientImportantDate,
    deleteClientImportantDate,
    addSalesRep,
    resetSalesDataToDefault
  } = useShop();

  // Active top tab
  const [activeTab, setActiveTab] = useState<SalesWorkspaceTab>('dashboard');

  // Selected client for detailed drawer/modal
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  // Search & Filters for clients
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Contact Log Modal
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [targetLogClientId, setTargetLogClientId] = useState<string | null>(null);
  const [logFormData, setLogFormData] = useState({
    type: 'call' as 'call' | 'meeting' | 'offer' | 'order' | 'note',
    title: '',
    summary: '',
    nextFollowUpDate: '',
  });

  // Important Date Modal
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [targetDateClientId, setTargetDateClientId] = useState<string | null>(null);
  const [dateFormData, setDateFormData] = useState({
    type: 'birthday' as 'birthday' | 'anniversary' | 'contract_renewal' | 'tender_deadline' | 'season_stock' | 'other',
    title: '',
    date: '',
    isRecurringYearly: true,
    notes: '',
  });

  // New Client Modal
  const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);
  const [newClientData, setNewClientData] = useState({
    repId: activeRepFilter !== 'all' ? activeRepFilter : (salesReps[0]?.id || 'rep-1'),
    name: '',
    contactPerson: '',
    roleTitle: 'Kierownik Zaopatrzenia',
    phone: '+48 ',
    email: '',
    street: '',
    postalCode: '',
    city: '',
    voivodeship: 'kujawsko-pomorskie',
    nip: '',
    category: 'building_depot' as SalesClientCategory,
    status: 'active' as 'vip' | 'active' | 'prospect' | 'dormant' | 'lead',
    assignedDiscount: 15,
    birthdayMonthDay: '',
    notes: '',
  });

  // Offer Generator State
  const [offerSelectedClientId, setOfferSelectedClientId] = useState<string>(salesClients[0]?.id || '');
  const [offerItems, setOfferItems] = useState<{ productId: string; palletQuantity: number }[]>([
    { productId: 'oplast-h40', palletQuantity: 6 },
    { productId: 'border-eko-45', palletQuantity: 2 },
  ]);
  const [customDiscount, setCustomDiscount] = useState<number | null>(null);
  const [copiedOfferSuccess, setCopiedOfferSuccess] = useState(false);

  // New Sales Rep Modal (Admin)
  const [isNewRepModalOpen, setIsNewRepModalOpen] = useState(false);
  const [newRepData, setNewRepData] = useState({
    name: '',
    email: '',
    phone: '+48 ',
    role: 'sales_rep' as 'sales_rep' | 'sales_director',
    region: 'Region Południe',
    assignedVoivodeships: ['małopolskie', 'śląskie'],
    monthlyTarget: 150000,
  });

  // Current active rep details
  const activeRep = useMemo(() => {
    if (activeRepFilter === 'all') return null;
    return salesReps.find(r => r.id === activeRepFilter) || null;
  }, [salesReps, activeRepFilter]);

  // Clients filtered by selected Sales Rep (or all if admin view)
  const repFilteredClients = useMemo(() => {
    if (activeRepFilter === 'all') {
      return salesClients;
    }
    return salesClients.filter(c => c.repId === activeRepFilter);
  }, [salesClients, activeRepFilter]);

  // Selected client object
  const selectedClient = useMemo(() => {
    if (!selectedClientId) return null;
    return salesClients.find(c => c.id === selectedClientId) || null;
  }, [salesClients, selectedClientId]);

  // Search and status filtered clients
  const filteredClients = useMemo(() => {
    return repFilteredClients.filter(client => {
      const matchesSearch = 
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.address.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (client.nip && client.nip.includes(searchQuery));
      
      const matchesCategory = filterCategory === 'all' || client.category === filterCategory;
      const matchesStatus = filterStatus === 'all' || client.status === filterStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [repFilteredClients, searchQuery, filterCategory, filterStatus]);

  // ==========================================
  // SMART ALERTS COMPUTATION
  // ==========================================
  const today = new Date();

  // Helper: check if a MM-DD is upcoming within next N days
  const isBirthdaySoon = (monthDayStr?: string, withinDays: number = 7): { isUpcoming: boolean; daysRemaining: number } => {
    if (!monthDayStr || !monthDayStr.includes('-')) return { isUpcoming: false, daysRemaining: -1 };
    const [mStr, dStr] = monthDayStr.split('-');
    const m = parseInt(mStr, 10);
    const d = parseInt(dStr, 10);

    const bdayThisYear = new Date(today.getFullYear(), m - 1, d);
    if (bdayThisYear < today) {
      // Check if it's today
      if (bdayThisYear.getMonth() === today.getMonth() && bdayThisYear.getDate() === today.getDate()) {
        return { isUpcoming: true, daysRemaining: 0 };
      }
      bdayThisYear.setFullYear(today.getFullYear() + 1);
    }
    const diffTime = bdayThisYear.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return {
      isUpcoming: diffDays >= 0 && diffDays <= withinDays,
      daysRemaining: diffDays,
    };
  };

  // Helper: calculate days since last order
  const getDaysSinceOrder = (dateStr?: string): number => {
    if (!dateStr) return 999;
    const orderDate = new Date(dateStr);
    const diffTime = today.getTime() - orderDate.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };

  // 1. Birthday Alerts
  const birthdayAlerts = useMemo(() => {
    const alerts: { client: SalesClient; daysRemaining: number; person: string }[] = [];
    repFilteredClients.forEach(client => {
      // Check client level birthday
      const { isUpcoming, daysRemaining } = isBirthdaySoon(client.birthdayMonthDay, 7);
      if (isUpcoming) {
        alerts.push({ client, daysRemaining, person: client.contactPerson });
      }
      // Check important dates birthdays
      client.importantDates?.forEach(idate => {
        if (idate.type === 'birthday') {
          const res = isBirthdaySoon(idate.date, 7);
          if (res.isUpcoming && !alerts.some(a => a.client.id === client.id)) {
            alerts.push({ client, daysRemaining: res.daysRemaining, person: idate.title });
          }
        }
      });
    });
    return alerts.sort((a, b) => a.daysRemaining - b.daysRemaining);
  }, [repFilteredClients]);

  // 2. Dormant Client Alerts ("Dawno nic nie kupił - warto dopytać")
  const dormantAlerts = useMemo(() => {
    const alerts: { client: SalesClient; daysSinceOrder: number }[] = [];
    repFilteredClients.forEach(client => {
      const days = getDaysSinceOrder(client.lastOrderDate);
      if (days >= 40 || client.status === 'dormant') {
        alerts.push({ client, daysSinceOrder: days });
      }
    });
    return alerts.sort((a, b) => b.daysSinceOrder - a.daysSinceOrder);
  }, [repFilteredClients]);

  // 3. Planned Follow-ups Due Today or Overdue
  const plannedFollowups = useMemo(() => {
    const todayStr = today.toISOString().split('T')[0];
    return repFilteredClients.filter(c => c.nextPlannedContact && c.nextPlannedContact <= todayStr);
  }, [repFilteredClients]);

  // Pipeline metrics
  const totalRevenue = useMemo(() => {
    return repFilteredClients.reduce((sum, c) => sum + (c.totalRevenueYtd || 0), 0);
  }, [repFilteredClients]);

  const targetAmount = activeRep ? activeRep.monthlyTarget : (salesReps.reduce((sum, r) => sum + r.monthlyTarget, 0));
  const targetPercent = Math.min(100, Math.round((totalRevenue / (targetAmount || 1)) * 100));

  // Quick Action: open log contact modal for client
  const handleOpenContactModal = (clientId: string, defaultTitle?: string) => {
    setTargetLogClientId(clientId);
    setLogFormData({
      type: 'call',
      title: defaultTitle || 'Rozmowa telefoniczna z klientem',
      summary: '',
      nextFollowUpDate: '',
    });
    setIsLogModalOpen(true);
  };

  // Quick Action: open important date modal
  const handleOpenDateModal = (clientId: string) => {
    setTargetDateClientId(clientId);
    setDateFormData({
      type: 'birthday',
      title: '',
      date: '',
      isRecurringYearly: true,
      notes: '',
    });
    setIsDateModalOpen(true);
  };

  // Submit Contact Log
  const handleSaveContactLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetLogClientId || !logFormData.title.trim()) return;

    addClientContactLog(targetLogClientId, {
      clientId: targetLogClientId,
      date: new Date().toISOString().split('T')[0],
      type: logFormData.type,
      title: logFormData.title.trim(),
      summary: logFormData.summary.trim() || 'Brak dodatkowych uwag.',
      nextFollowUpDate: logFormData.nextFollowUpDate || undefined,
      repName: partnerUser?.name || 'Przedstawiciel Handlowy',
    });

    setIsLogModalOpen(false);
  };

  // Submit Important Date
  const handleSaveImportantDate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetDateClientId || !dateFormData.title.trim() || !dateFormData.date) return;

    addClientImportantDate(targetDateClientId, {
      clientId: targetDateClientId,
      type: dateFormData.type,
      title: dateFormData.title.trim(),
      date: dateFormData.date,
      isRecurringYearly: dateFormData.isRecurringYearly,
      notes: dateFormData.notes.trim() || undefined,
    });

    setIsDateModalOpen(false);
  };

  // Submit New Client
  const handleSaveNewClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientData.name.trim() || !newClientData.contactPerson.trim()) return;

    addSalesClient({
      repId: newClientData.repId,
      name: newClientData.name.trim(),
      contactPerson: newClientData.contactPerson.trim(),
      roleTitle: newClientData.roleTitle,
      phone: newClientData.phone,
      email: newClientData.email,
      address: {
        street: newClientData.street,
        postalCode: newClientData.postalCode,
        city: newClientData.city,
        voivodeship: newClientData.voivodeship,
      },
      nip: newClientData.nip || undefined,
      category: newClientData.category,
      status: newClientData.status,
      assignedDiscount: Number(newClientData.assignedDiscount) || 10,
      totalRevenueYtd: 0,
      favoriteProducts: ['oplast-h40', 'border-eko-45'],
      notes: newClientData.notes,
      birthdayMonthDay: newClientData.birthdayMonthDay || undefined,
    });

    setIsNewClientModalOpen(false);
  };

  // Submit New Sales Rep
  const handleSaveNewRep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRepData.name.trim() || !newRepData.email.trim()) return;

    addSalesRep({
      name: newRepData.name.trim(),
      email: newRepData.email.trim(),
      phone: newRepData.phone,
      role: newRepData.role,
      region: newRepData.region,
      assignedVoivodeships: newRepData.assignedVoivodeships,
      monthlyTarget: Number(newRepData.monthlyTarget) || 150000,
    });

    setIsNewRepModalOpen(false);
  };

  // Offer calculation logic
  const offerClient = useMemo(() => {
    return salesClients.find(c => c.id === offerSelectedClientId) || salesClients[0];
  }, [salesClients, offerSelectedClientId]);

  const effectiveDiscount = customDiscount !== null ? customDiscount : (offerClient?.assignedDiscount || 15);

  const calculatedOffer = useMemo(() => {
    let subtotalNetto = 0;
    let totalPallets = 0;
    let totalWeightKg = 0;

    const items = offerItems.map(item => {
      const prod = PRODUCTS.find(p => p.id === item.productId) || PRODUCTS[0];
      const basePalletNetto = prod.priceNettoPallet || (prod.priceNettoUnit * (prod.piecesPerPallet || 1));
      const lineNettoCatalog = basePalletNetto * item.palletQuantity;
      const lineNettoAfterDiscount = lineNettoCatalog * (1 - effectiveDiscount / 100);
      const lineBrutto = lineNettoAfterDiscount * 1.23;
      const weight = (prod.piecesPerPallet || 1) * item.palletQuantity * prod.weightKg;

      subtotalNetto += lineNettoAfterDiscount;
      totalPallets += item.palletQuantity;
      totalWeightKg += weight;

      return {
        product: prod,
        palletQuantity: item.palletQuantity,
        totalPieces: (prod.piecesPerPallet || 1) * item.palletQuantity,
        basePalletNetto,
        lineNettoAfterDiscount,
        lineBrutto,
        weight,
      };
    });

    const totalBrutto = subtotalNetto * 1.23;

    return {
      items,
      subtotalNetto,
      totalBrutto,
      totalPallets,
      totalWeightTonnes: Math.round((totalWeightKg / 1000) * 10) / 10,
    };
  }, [offerItems, effectiveDiscount]);

  // Copy offer to clipboard
  const handleCopyOfferText = () => {
    if (!offerClient) return;
    const textLines = [
      `Dzień dobry Panie/Pani ${offerClient.contactPerson},`,
      `W nawiązaniu do naszej rozmowy przesyłam dedykowaną wycenę fabryczną Oplast Garden dla ${offerClient.name}:`,
      ``,
      ...calculatedOffer.items.map(it => 
        `• ${it.product.name}: ${it.palletQuantity} palet (${it.totalPieces} szt.) -> ${it.lineNettoAfterDiscount.toLocaleString('pl-PL', { minimumFractionDigits: 2 })} zł netto`
      ),
      ``,
      `Rabat handlowy: ${effectiveDiscount}%`,
      `Razem netto: ${calculatedOffer.subtotalNetto.toLocaleString('pl-PL', { minimumFractionDigits: 2 })} zł`,
      `Razem brutto: ${calculatedOffer.totalBrutto.toLocaleString('pl-PL', { minimumFractionDigits: 2 })} zł (VAT 23%)`,
      `Łączna liczba palet: ${calculatedOffer.totalPallets} pal. (waga ~${calculatedOffer.totalWeightTonnes} t)`,
      `Dostawa: bezpośrednio z fabryki Oplast (Winduga) pod wskazany adres budowy / magazynu.`,
      ``,
      `W razie pytań pozostaję do dyspozycji!`,
      `${partnerUser?.name || 'Przedstawiciel Handlowy Oplast Garden'}`,
      `Tel: ${partnerUser?.email ? '+48 601 234 567' : '+48 56 654 32 10'}`
    ];

    navigator.clipboard.writeText(textLines.join('\n'));
    setCopiedOfferSuccess(true);
    setTimeout(() => setCopiedOfferSuccess(false), 3000);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-16 pt-2 sm:pt-4">
      {/* Top Bar / Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-sm border border-slate-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                  <Briefcase className="w-3.5 h-3.5" />
                  Strefa Przedstawiciela Handlowego & CRM
                </span>
                {partnerUser?.role === 'admin' ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-100 text-indigo-800">
                    <ShieldCheck className="w-3 h-3" />
                    Profil Administracyjny (Wszystkie Regiony)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <UserCheck className="w-3 h-3" />
                    {activeRep?.region || 'Przedstawiciel Terenowy'}
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading">
                {partnerUser?.name || 'Michał Kaczmarek'}
              </h1>
              <p className="text-slate-500 text-sm mt-0.5">
                Panel zarządzania portfelem klientów Oplast, ofertowania i relacji handlowych.
              </p>
            </div>

            {/* Rep Selector (for Admin or Switching Views) */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-2 border border-slate-200">
                <span className="text-xs font-bold text-slate-600 pl-2 hidden sm:inline">Handlowiec:</span>
                <select
                  value={activeRepFilter}
                  onChange={(e) => setActiveRepFilter(e.target.value)}
                  className="bg-white text-xs sm:text-sm font-semibold text-slate-800 py-1.5 px-3 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value="all">Wszyscy handlowcy (Cała Polska)</option>
                  {salesReps.map(rep => (
                    <option key={rep.id} value={rep.id}>
                      {rep.name} – {rep.region}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={() => setIsNewClientModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Nowy Klient</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-slate-100">
            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center justify-between">
                <span>Przypisani Klienci</span>
                <Users className="w-4 h-4 text-emerald-600" />
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900">{repFilteredClients.length}</span>
                <span className="text-xs text-slate-500 font-medium">kontrahentów</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center justify-between">
                <span>Obrót YTD (Netto)</span>
                <DollarSign className="w-4 h-4 text-emerald-600" />
              </p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-slate-900">
                  {(totalRevenue / 1000).toFixed(1)}k
                </span>
                <span className="text-xs text-slate-500 font-medium">PLN</span>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center justify-between">
                <span>Realizacja Miesięczna</span>
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </p>
              <div className="flex items-baseline gap-2 mb-1.5">
                <span className="text-2xl font-black text-slate-900">{targetPercent}%</span>
                <span className="text-xs text-slate-400">z {(targetAmount / 1000).toFixed(0)}k</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-600 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${targetPercent}%` }}
                />
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1 flex items-center justify-between">
                <span>Smart Alerty</span>
                <BadgeAlert className="w-4 h-4 text-amber-500" />
              </p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black text-amber-600">
                  {birthdayAlerts.length + dormantAlerts.length}
                </span>
                <div className="text-[10px] text-slate-500 leading-tight">
                  <span className="block font-semibold text-slate-700">{birthdayAlerts.length} urodziny</span>
                  <span className="block font-semibold text-amber-700">{dormantAlerts.length} do kontaktu</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 sm:gap-2 mt-6 overflow-x-auto pb-1 border-b border-slate-100 text-xs sm:text-sm">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 py-2.5 px-4 rounded-xl font-bold transition-all cursor-pointer shrink-0 ${
                activeTab === 'dashboard'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Pulpit & Przypomnienia</span>
              {(birthdayAlerts.length + dormantAlerts.length > 0) && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${activeTab === 'dashboard' ? 'bg-emerald-900 text-emerald-200' : 'bg-amber-100 text-amber-800'}`}>
                  {birthdayAlerts.length + dormantAlerts.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('clients')}
              className={`flex items-center gap-2 py-2.5 px-4 rounded-xl font-bold transition-all cursor-pointer shrink-0 ${
                activeTab === 'clients'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Baza Klientów & Historia ({repFilteredClients.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('catalog_offer')}
              className={`flex items-center gap-2 py-2.5 px-4 rounded-xl font-bold transition-all cursor-pointer shrink-0 ${
                activeTab === 'catalog_offer'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Oferta Handlowa & Generator Wycen</span>
            </button>

            <button
              onClick={() => setActiveTab('team_admin')}
              className={`flex items-center gap-2 py-2.5 px-4 rounded-xl font-bold transition-all cursor-pointer shrink-0 ${
                activeTab === 'team_admin'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Zespół Handlowy & Administracja</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ======================================================== */}
        {/* TAB 1: DASHBOARD & SMART ALERTS                          */}
        {/* ======================================================== */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            
            {/* SMART ALERTS SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* 1. BIRTHDAY ALERTS (🎂 Ważne daty / Urodziny) */}
              <div className="bg-gradient-to-br from-rose-50 to-pink-50/50 rounded-3xl p-6 border border-rose-200/80 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-sm">
                      <Cake className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-slate-900">
                        Urodziny Klientów (Najbliższe 7 dni)
                      </h2>
                      <p className="text-xs text-rose-700">
                        Budowanie relacji: zadzwoń z życzeniami i zaoferuj rabat partnerski.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold bg-rose-200 text-rose-800 px-2.5 py-1 rounded-full">
                    {birthdayAlerts.length} {birthdayAlerts.length === 1 ? 'alert' : 'alerty'}
                  </span>
                </div>

                {birthdayAlerts.length === 0 ? (
                  <div className="bg-white/80 rounded-2xl p-6 text-center text-slate-500 text-xs">
                    Brak nadchodzących urodzin w ciągu najbliższego tygodnia.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {birthdayAlerts.map(({ client, daysRemaining, person }) => (
                      <div 
                        key={client.id}
                        className="bg-white rounded-2xl p-4 border border-rose-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{person}</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              daysRemaining === 0 
                                ? 'bg-red-600 text-white animate-pulse' 
                                : daysRemaining === 1 
                                ? 'bg-amber-500 text-white' 
                                : 'bg-rose-100 text-rose-800'
                            }`}>
                              {daysRemaining === 0 ? '🎉 DZISIAJ!' : daysRemaining === 1 ? 'Jutro' : `za ${daysRemaining} dni`}
                            </span>
                          </div>
                          <p className="text-xs font-medium text-slate-600 mt-0.5">{client.name} • {client.address.city}</p>
                          <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                            <span>Tel: <a href={`tel:${client.phone}`} className="text-rose-700 font-bold hover:underline">{client.phone}</a></span>
                            <span>•</span>
                            <span>Rabat: {client.assignedDiscount}%</span>
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenContactModal(client.id, `Życzenia urodzinowe dla ${person}`)}
                            className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer shrink-0"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Zadzwoń z życzeniami</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedClientId(client.id)}
                            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                            title="Szczegóły klienta"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. DORMANT CLIENT ALERTS (⚠️ Klient dawno nic nie kupił) */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-3xl p-6 border border-amber-200/80 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-sm">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-slate-900">
                        Uśpieni Klienci (&gt;40 dni bez zakupu)
                      </h2>
                      <p className="text-xs text-amber-800">
                        Przypomnienie: dopytaj o stan magazynowy i nowe budowy.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold bg-amber-200 text-amber-900 px-2.5 py-1 rounded-full">
                    {dormantAlerts.length} {dormantAlerts.length === 1 ? 'klient' : 'klientów'}
                  </span>
                </div>

                {dormantAlerts.length === 0 ? (
                  <div className="bg-white/80 rounded-2xl p-6 text-center text-slate-500 text-xs">
                    Wszyscy klienci zamawiają regularnie! Brak kontrahentów uśpionych.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {dormantAlerts.map(({ client, daysSinceOrder }) => (
                      <div 
                        key={client.id}
                        className="bg-white rounded-2xl p-4 border border-amber-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{client.name}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                              {daysSinceOrder > 200 ? 'Brak zakupów' : `${daysSinceOrder} dni temu`}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-0.5">
                            Osoba: <span className="font-semibold">{client.contactPerson}</span> ({client.roleTitle || 'Zaopatrzenie'})
                          </p>
                          <p className="text-[11px] text-amber-800 font-medium mt-1">
                            💡 Sugestia: Zapytaj o zapotrzebowanie na kratki H40/H50 lub zaoferuj darmowy transport fabryczny.
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleOpenContactModal(client.id, 'Dopytanie o stany magazynowe (Klient uśpiony)')}
                            className="flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Zadzwoń teraz</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setOfferSelectedClientId(client.id);
                              setActiveTab('catalog_offer');
                            }}
                            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                            title="Przygotuj ofertę reaktywacyjną"
                          >
                            <FileText className="w-4 h-4 text-emerald-700" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* PLANNED FOLLOW-UPS & RECENT TIMELINE */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Planned Contacts Column */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-bold text-slate-900 text-base">Planowane Kontakty (Dziś)</h3>
                  </div>
                  <span className="text-xs font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                    {plannedFollowups.length}
                  </span>
                </div>

                {plannedFollowups.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-6">
                    Brak zaplanowanych rozmów na dzień dzisiejszy.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {plannedFollowups.map(client => (
                      <div key={client.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900">{client.name}</span>
                          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-md">
                            Dziś
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">{client.contactPerson} ({client.phone})</p>
                        <button
                          type="button"
                          onClick={() => handleOpenContactModal(client.id, 'Zaplanowany follow-up z klientem')}
                          className="mt-2 w-full py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Phone className="w-3 h-3" />
                          <span>Wykonaj telefon</span>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Recent Activity Timeline Column (2 cols width) */}
              <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-bold text-slate-900 text-base">Ostatnia Aktywność w Portfelu Handlowym</h3>
                  </div>
                  <span className="text-xs text-slate-500">Ostatnie interakcje</span>
                </div>

                <div className="space-y-3">
                  {repFilteredClients.flatMap(c => c.contactLogs.map(l => ({ ...l, clientName: c.name, clientId: c.id })))
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .slice(0, 5)
                    .map((log) => (
                      <div 
                        key={log.id}
                        className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/70 flex items-start gap-3 hover:bg-slate-100/70 transition-colors"
                      >
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white shrink-0 mt-0.5 ${
                          log.type === 'call' ? 'bg-blue-600' :
                          log.type === 'meeting' ? 'bg-emerald-600' :
                          log.type === 'offer' ? 'bg-purple-600' :
                          log.type === 'order' ? 'bg-amber-600' : 'bg-slate-600'
                        }`}>
                          {log.type === 'call' && <Phone className="w-4 h-4" />}
                          {log.type === 'meeting' && <Users className="w-4 h-4" />}
                          {log.type === 'offer' && <FileText className="w-4 h-4" />}
                          {log.type === 'order' && <CheckCircle2 className="w-4 h-4" />}
                          {log.type === 'note' && <MessageSquare className="w-4 h-4" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-slate-900 truncate">
                              {log.clientName}
                            </span>
                            <span className="text-[10px] text-slate-400 shrink-0">{log.date}</span>
                          </div>
                          <p className="text-xs font-semibold text-slate-700 mt-0.5">{log.title}</p>
                          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{log.summary}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedClientId(log.clientId)}
                          className="text-slate-400 hover:text-slate-700 p-1"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: CLIENT DIRECTORY & TIMELINE                       */}
        {/* ======================================================== */}
        {activeTab === 'clients' && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Szukaj klienta po nazwie, osobie kontaktowej, mieście lub NIP..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="bg-slate-50 text-xs sm:text-sm font-medium text-slate-700 py-2 px-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value="all">Wszystkie branże</option>
                  <option value="building_depot">Skład budowlany</option>
                  <option value="paving_contractor">Wykonawca brukarstwa</option>
                  <option value="garden_center">Centrum ogrodnicze</option>
                  <option value="developer">Deweloper / Generalny</option>
                  <option value="wholesaler">Hurtownia regionalna</option>
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-slate-50 text-xs sm:text-sm font-medium text-slate-700 py-2 px-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                >
                  <option value="all">Wszystkie statusy</option>
                  <option value="vip">⭐ VIP Partner</option>
                  <option value="active">Aktywny</option>
                  <option value="dormant">⚠️ Uśpiony (&gt;40 dni)</option>
                  <option value="prospect">Nowy prospekt / Lead</option>
                </select>
              </div>
            </div>

            {/* Clients Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredClients.map(client => {
                const daysSinceOrder = getDaysSinceOrder(client.lastOrderDate);
                const isDormant = daysSinceOrder >= 40 || client.status === 'dormant';
                const bdaySoon = isBirthdaySoon(client.birthdayMonthDay, 7);

                return (
                  <div 
                    key={client.id}
                    className={`bg-white rounded-3xl p-5 border transition-all hover:shadow-md flex flex-col justify-between ${
                      isDormant ? 'border-amber-300 ring-1 ring-amber-200' : 'border-slate-200'
                    }`}
                  >
                    <div>
                      {/* Status Badges */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          client.status === 'vip' ? 'bg-amber-100 text-amber-800' :
                          client.status === 'dormant' ? 'bg-red-100 text-red-800' :
                          client.status === 'prospect' ? 'bg-indigo-100 text-indigo-800' :
                          'bg-emerald-100 text-emerald-800'
                        }`}>
                          {client.status === 'vip' ? '⭐ Klient VIP' :
                           client.status === 'dormant' ? '⚠️ Uśpiony' :
                           client.status === 'prospect' ? 'Nowy Lead' : 'Aktywny Stały'}
                        </span>

                        {bdaySoon.isUpcoming && (
                          <span className="text-[10px] font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Cake className="w-3 h-3 text-rose-600" />
                            <span>Urodziny {bdaySoon.daysRemaining === 0 ? 'DZIŚ!' : `za ${bdaySoon.daysRemaining}d`}</span>
                          </span>
                        )}
                      </div>

                      {/* Client Name & Category */}
                      <h4 className="font-extrabold text-slate-900 text-base leading-snug line-clamp-1">
                        {client.name}
                      </h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{client.address.city}, woj. {client.address.voivodeship}</span>
                      </p>

                      {/* Contact Person Box */}
                      <div className="mt-3.5 p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-800">{client.contactPerson}</span>
                          <span className="text-[10px] font-medium text-slate-500">{client.roleTitle || 'Osoba decyzyjna'}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-600">
                          <a href={`tel:${client.phone}`} className="flex items-center gap-1 text-emerald-700 font-semibold hover:underline">
                            <Phone className="w-3 h-3" />
                            <span>{client.phone}</span>
                          </a>
                          <span className="text-[11px] font-bold text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                            Rabat: -{client.assignedDiscount}%
                          </span>
                        </div>
                      </div>

                      {/* Alerts or notes snippet */}
                      {isDormant && (
                        <div className="mt-2.5 p-2 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-800 font-medium flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-600" />
                          <span>Brak zamówień od {daysSinceOrder} dni! Warto dopytać.</span>
                        </div>
                      )}

                      {/* Metric info */}
                      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span>Obrót YTD: <strong className="text-slate-900">{client.totalRevenueYtd.toLocaleString()} zł</strong></span>
                        <span>{client.contactLogs.length} kontaktów</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenContactModal(client.id)}
                        className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Zadzwoń / Notatka</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedClientId(client.id)}
                        className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>Szczegóły</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: CATALOG, WHOLESALE PRICING & OFFER GENERATOR      */}
        {/* ======================================================== */}
        {activeTab === 'catalog_offer' && (
          <div className="space-y-8">
            {/* Factory Stock & B2B Wholesale Pricing */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                    Katalog Fabryczny Oplast (Winduga)
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading mt-2">
                    Cennik Hurtowy B2B & Dostępność na Magazynie
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                    Aktualne stany produkcyjne i cenniki bazowe dla handlowców.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-100 p-2 rounded-xl">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span>Wysyłka kurierska / FTL 24-48h</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {PRODUCTS.map(product => (
                  <div key={product.id} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold bg-white text-slate-700 px-2.5 py-0.5 rounded-full border border-slate-200">
                          {product.category === 'kratki' ? 'Kratka parkingowa' : 'Obrzeże ogrodowe'}
                        </span>
                        <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Na stanie fabryki
                        </span>
                      </div>

                      <h4 className="font-extrabold text-slate-900 text-base">{product.name}</h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{product.subtitle}</p>

                      <div className="mt-4 p-3 bg-white rounded-xl border border-slate-200/80 space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Cena fabryczna netto/szt.:</span>
                          <span className="font-bold text-slate-900">{product.priceNettoUnit.toFixed(2)} zł</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Paleta przemysłowa ({product.piecesPerPallet} szt.):</span>
                          <span className="font-bold text-emerald-700">{product.priceNettoPallet?.toFixed(2)} zł</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Waga palety:</span>
                          <span className="font-medium text-slate-700">~{Math.round((product.piecesPerPallet || 1) * product.weightKg)} kg</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        // Add or replace item in offerItems
                        if (!offerItems.some(it => it.productId === product.id)) {
                          setOfferItems([...offerItems, { productId: product.id, palletQuantity: 2 }]);
                        }
                      }}
                      className="mt-4 w-full py-2 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Dodaj do kalkulatora wyceny</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick B2B Offer Generator */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
              <div className="max-w-3xl mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
                  Generator Proformy / Wyceny B2B
                </span>
                <h2 className="text-2xl sm:text-3xl font-black font-heading mt-2">
                  Szybka Oferta Handlowa dla Klienta
                </h2>
                <p className="text-slate-300 text-xs sm:text-sm mt-1">
                  Wybierz kontrahenta, skalkuluj palety i skopiuj gotowy tekst oferty do wysłania e-mailem lub SMS-em.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Form Controls */}
                <div className="lg:col-span-2 space-y-4">
                  {/* Select Client */}
                  <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                    <label className="block text-xs font-bold uppercase tracking-wider text-emerald-300 mb-1.5">
                      1. Wybierz kontrahenta z bazy:
                    </label>
                    <select
                      value={offerSelectedClientId}
                      onChange={(e) => {
                        setOfferSelectedClientId(e.target.value);
                        const cl = salesClients.find(c => c.id === e.target.value);
                        if (cl) setCustomDiscount(cl.assignedDiscount);
                      }}
                      className="w-full bg-slate-800 text-white rounded-xl px-3.5 py-2.5 text-sm border border-slate-700 focus:outline-hidden focus:border-emerald-500 cursor-pointer"
                    >
                      {salesClients.map(c => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.contactPerson} – rabat bazowy {c.assignedDiscount}%)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Selected Products in Offer */}
                  <div className="bg-white/10 rounded-2xl p-4 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                        2. Pozycje ofertowe (Palety):
                      </label>
                      <button
                        type="button"
                        onClick={() => setOfferItems([...offerItems, { productId: 'oplast-h50', palletQuantity: 2 }])}
                        className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Dodaj kolejny produkt</span>
                      </button>
                    </div>

                    {offerItems.map((item, idx) => {
                      return (
                        <div key={idx} className="flex items-center gap-3 bg-slate-900/60 p-3 rounded-xl border border-white/5">
                          <select
                            value={item.productId}
                            onChange={(e) => {
                              const updated = [...offerItems];
                              updated[idx].productId = e.target.value;
                              setOfferItems(updated);
                            }}
                            className="flex-1 bg-slate-800 text-white rounded-lg px-3 py-1.5 text-xs border border-slate-700"
                          >
                            {PRODUCTS.map(p => (
                              <option key={p.id} value={p.id}>{p.name} ({p.piecesPerPallet} szt./pal)</option>
                            ))}
                          </select>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="text-xs text-slate-400">Palet:</span>
                            <input
                              type="number"
                              min="1"
                              max="100"
                              value={item.palletQuantity}
                              onChange={(e) => {
                                const updated = [...offerItems];
                                updated[idx].palletQuantity = Math.max(1, parseInt(e.target.value, 10) || 1);
                                setOfferItems(updated);
                              }}
                              className="w-16 bg-slate-800 text-white rounded-lg px-2 py-1.5 text-xs text-center border border-slate-700 font-bold"
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              setOfferItems(offerItems.filter((_, i) => i !== idx));
                            }}
                            className="p-1 text-slate-400 hover:text-red-400 cursor-pointer"
                            title="Usuń pozycję"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Discount Slider */}
                  <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                        3. Przyznany rabat handlowy:
                      </label>
                      <span className="text-base font-extrabold text-emerald-400">
                        {effectiveDiscount}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="30"
                      step="1"
                      value={effectiveDiscount}
                      onChange={(e) => setCustomDiscount(parseInt(e.target.value, 10))}
                      className="w-full accent-emerald-500 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>Cennik bazowy (0%)</span>
                      <span>Standard B2B (15%)</span>
                      <span>FTL / Inwestor (25%+)</span>
                    </div>
                  </div>
                </div>

                {/* Offer Summary & Quick Actions */}
                <div className="bg-white/10 rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span>Podsumowanie Wyceny</span>
                    </h3>

                    <div className="space-y-2.5 text-sm pb-4 border-b border-white/10">
                      <div className="flex justify-between text-slate-300">
                        <span>Liczba palet:</span>
                        <strong className="text-white">{calculatedOffer.totalPallets} palet</strong>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Szacowana waga:</span>
                        <strong className="text-white">~{calculatedOffer.totalWeightTonnes} t</strong>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Rabat handlowy:</span>
                        <strong className="text-emerald-400">-{effectiveDiscount}%</strong>
                      </div>
                    </div>

                    <div className="pt-4 space-y-1">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs text-slate-300">Wartość NETTO:</span>
                        <span className="text-2xl font-black text-emerald-400">
                          {calculatedOffer.subtotalNetto.toLocaleString('pl-PL', { minimumFractionDigits: 2 })} zł
                        </span>
                      </div>
                      <div className="flex justify-between items-baseline text-xs text-slate-400">
                        <span>Wartość BRUTTO (23%):</span>
                        <span>
                          {calculatedOffer.totalBrutto.toLocaleString('pl-PL', { minimumFractionDigits: 2 })} zł
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2.5">
                    <button
                      type="button"
                      onClick={handleCopyOfferText}
                      className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Copy className="w-4 h-4" />
                      <span>{copiedOfferSuccess ? '✓ Skopiowano do schowka!' : 'Kopiuj gotową wycenę (SMS/Email)'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (offerClient) {
                          addClientContactLog(offerClient.id, {
                            clientId: offerClient.id,
                            date: new Date().toISOString().split('T')[0],
                            type: 'offer',
                            title: `Przesłanie wyceny na ${calculatedOffer.totalPallets} palet (${calculatedOffer.subtotalNetto.toFixed(2)} zł netto)`,
                            summary: `Przyznany rabat: ${effectiveDiscount}%. Produkty: ${calculatedOffer.items.map(i => `${i.product.name} x${i.palletQuantity} pal.`).join(', ')}.`,
                            repName: partnerUser?.name || 'Przedstawiciel Handlowy',
                          });
                          alert('Wycena została zapisana w historii kontaktów klienta!');
                        }
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/15"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Zapisz w historii klienta</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: SALES TEAM MANAGEMENT & ADMIN PROFILE             */}
        {/* ======================================================== */}
        {activeTab === 'team_admin' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full">
                    Zarządzanie Siłami Sprzedaży
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-heading mt-2">
                    Zespół Handlowy & Rewiry Wojewódzkie
                  </h2>
                  <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                    Struktura przedstawicieli terenowych Oplast Garden w podziale na makroregiony.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setIsNewRepModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Dodaj Przedstawiciela</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Czy na pewno chcesz przywrócić domyślne dane handlowców i klientów?')) {
                        resetSalesDataToDefault();
                      }
                    }}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                    title="Zresetuj do danych fabrycznych demo"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Reps Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {salesReps.map(rep => {
                  const repClients = salesClients.filter(c => c.repId === rep.id);
                  const repRev = repClients.reduce((sum, c) => sum + c.totalRevenueYtd, 0);
                  const percent = Math.min(100, Math.round((repRev / (rep.monthlyTarget || 1)) * 100));

                  return (
                    <div 
                      key={rep.id}
                      className={`bg-slate-50 rounded-3xl p-6 border transition-all ${
                        activeRepFilter === rep.id ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/20' : 'border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3.5 mb-4">
                        <img 
                          src={rep.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'} 
                          alt={rep.name}
                          className="w-13 h-13 rounded-2xl object-cover border-2 border-white shadow-xs"
                        />
                        <div>
                          <h4 className="font-extrabold text-slate-900 text-base">{rep.name}</h4>
                          <span className="text-xs font-semibold text-emerald-700">{rep.region}</span>
                          <p className="text-[11px] text-slate-400">{rep.email}</p>
                        </div>
                      </div>

                      {/* Voivodeships Tiers */}
                      <div className="mb-4">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                          Przypisane województwa:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {rep.assignedVoivodeships.map(v => (
                            <span key={v} className="text-[10px] font-medium bg-white text-slate-700 px-2 py-0.5 rounded-md border border-slate-200">
                              {v}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Performance */}
                      <div className="p-3.5 bg-white rounded-2xl border border-slate-200/80 space-y-2 mb-4">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Klienci w portfelu:</span>
                          <strong className="text-slate-900">{repClients.length} firm</strong>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Sprzedaż YTD:</span>
                          <strong className="text-emerald-700">{(repRev / 1000).toFixed(1)}k PLN</strong>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Cel miesięczny:</span>
                          <strong className="text-slate-700">{(rep.monthlyTarget / 1000).toFixed(0)}k PLN</strong>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
                          <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${percent}%` }} />
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setActiveRepFilter(rep.id);
                          setActiveTab('clients');
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Przełącz widok na tego handlowca</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* MODAL: CLIENT DETAIL DRAWER                              */}
      {/* ======================================================== */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedClientId(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    selectedClient.status === 'vip' ? 'bg-amber-100 text-amber-800' :
                    selectedClient.status === 'dormant' ? 'bg-red-100 text-red-800' :
                    'bg-emerald-100 text-emerald-800'
                  }`}>
                    {selectedClient.status === 'vip' ? '⭐ Partner VIP' :
                     selectedClient.status === 'dormant' ? '⚠️ Klient Uśpiony' : 'Aktywny'}
                  </span>
                  {selectedClient.nip && (
                    <span className="text-[11px] text-slate-400 font-mono">NIP: {selectedClient.nip}</span>
                  )}
                </div>
                <h3 className="text-2xl font-black text-slate-900 font-heading">{selectedClient.name}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedClient.address.street}, {selectedClient.address.postalCode} {selectedClient.address.city}</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenContactModal(selectedClient.id)}
                  className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Nowy Wpis / Telefon</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenDateModal(selectedClient.id)}
                  className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <CalendarPlus className="w-3.5 h-3.5" />
                  <span>Ważna Data</span>
                </button>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-b border-slate-100 text-xs">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1.5">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] block">Kontakt Decyzyjny</span>
                <p className="font-bold text-slate-900 text-sm">{selectedClient.contactPerson}</p>
                <p className="text-slate-600">{selectedClient.roleTitle || 'Zaopatrzenie'}</p>
                <p className="text-emerald-700 font-semibold pt-1">Tel: <a href={`tel:${selectedClient.phone}`}>{selectedClient.phone}</a></p>
                <p className="text-slate-500">Email: {selectedClient.email}</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-1.5">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] block">Warunki Handlowe</span>
                <p className="text-slate-600">Przypisany rabat: <strong className="text-emerald-700 font-bold text-sm">-{selectedClient.assignedDiscount}%</strong></p>
                <p className="text-slate-600">Obrót YTD: <strong className="text-slate-900">{selectedClient.totalRevenueYtd.toLocaleString()} zł</strong></p>
                <p className="text-slate-600">Ostatnie zamówienie: <strong>{selectedClient.lastOrderDate || 'Brak danych'}</strong></p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px] block">Ważne Daty & Urodziny</span>
                {selectedClient.birthdayMonthDay && (
                  <p className="text-slate-700 flex items-center gap-1.5 font-medium">
                    <Cake className="w-3.5 h-3.5 text-rose-600" />
                    <span>Urodziny: <strong>{selectedClient.birthdayMonthDay}</strong></span>
                  </p>
                )}
                {selectedClient.importantDates?.map(d => (
                  <div key={d.id} className="flex items-center justify-between text-[11px] text-slate-600 pt-1 border-t border-slate-200">
                    <span>{d.title} ({d.date})</span>
                    <button
                      type="button"
                      onClick={() => deleteClientImportantDate(selectedClient.id, d.id)}
                      className="text-slate-400 hover:text-red-600"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact History Timeline */}
            <div className="pt-6">
              <h4 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>Historia Kontaktów & Interakcji Handlowych</span>
              </h4>

              {selectedClient.contactLogs.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-6">Brak zapisanych wpisów kontaktu.</p>
              ) : (
                <div className="space-y-3">
                  {selectedClient.contactLogs.map((log) => (
                    <div key={log.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white shrink-0 mt-0.5 ${
                        log.type === 'call' ? 'bg-blue-600' :
                        log.type === 'meeting' ? 'bg-emerald-600' :
                        log.type === 'offer' ? 'bg-purple-600' :
                        log.type === 'order' ? 'bg-amber-600' : 'bg-slate-600'
                      }`}>
                        {log.type === 'call' && <Phone className="w-4 h-4" />}
                        {log.type === 'meeting' && <Users className="w-4 h-4" />}
                        {log.type === 'offer' && <FileText className="w-4 h-4" />}
                        {log.type === 'order' && <CheckCircle2 className="w-4 h-4" />}
                        {log.type === 'note' && <MessageSquare className="w-4 h-4" />}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900">{log.title}</span>
                          <span className="text-[10px] text-slate-400 font-mono">{log.date}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">{log.summary}</p>
                        {log.nextFollowUpDate && (
                          <p className="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>Kolejny kontakt: {log.nextFollowUpDate}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD CONTACT LOG                                   */}
      {/* ======================================================== */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl relative">
            <button
              onClick={() => setIsLogModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-slate-900 mb-1">Dodaj Wpis do Historii Kontaktu</h3>
            <p className="text-xs text-slate-500 mb-4">Zapisz wynik rozmowy telefonicznej, spotkania lub oferty.</p>

            <form onSubmit={handleSaveContactLog} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Typ interakcji:</label>
                <select
                  value={logFormData.type}
                  onChange={(e) => setLogFormData({ ...logFormData, type: e.target.value as any })}
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-300 bg-slate-50"
                >
                  <option value="call">📞 Rozmowa telefoniczna</option>
                  <option value="meeting">🤝 Spotkanie u klienta / budowa</option>
                  <option value="offer">📄 Wysłana oferta / wycena</option>
                  <option value="order">📦 Zamówienie klienta</option>
                  <option value="note">📝 Notatka wewnętrzna</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tytuł wpisu:</label>
                <input
                  type="text"
                  required
                  value={logFormData.title}
                  onChange={(e) => setLogFormData({ ...logFormData, title: e.target.value })}
                  placeholder="np. Rozmowa o stanach magazynowych H40"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Podsumowanie i ustalenia:</label>
                <textarea
                  rows={3}
                  value={logFormData.summary}
                  onChange={(e) => setLogFormData({ ...logFormData, summary: e.target.value })}
                  placeholder="Klient potrzebuje 4 palet na wtorek rano..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Data kolejnego kontaktu (Follow-up):</label>
                <input
                  type="date"
                  value={logFormData.nextFollowUpDate}
                  onChange={(e) => setLogFormData({ ...logFormData, nextFollowUpDate: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer mt-2"
              >
                Zapisz w CRM
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD IMPORTANT DATE                                */}
      {/* ======================================================== */}
      {isDateModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl relative">
            <button
              onClick={() => setIsDateModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-black text-slate-900 mb-1">Dodaj Ważną Datę / Przypomnienie</h3>
            <p className="text-xs text-slate-500 mb-4">Urodziny, rocznica, termin przetargu lub zatowarowanie.</p>

            <form onSubmit={handleSaveImportantDate} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Typ daty:</label>
                <select
                  value={dateFormData.type}
                  onChange={(e) => setDateFormData({ ...dateFormData, type: e.target.value as any })}
                  className="w-full text-xs font-semibold p-2.5 rounded-xl border border-slate-300 bg-slate-50"
                >
                  <option value="birthday">🎂 Urodziny osoby decyzyjnej</option>
                  <option value="tender_deadline">🏗️ Termin przetargu / dużej inwestycji</option>
                  <option value="season_stock">📦 Przypomnienie o zatowarowaniu sezonowym</option>
                  <option value="contract_renewal">🤝 Rocznica / Renegocjacja umowy</option>
                  <option value="other">📌 Inna ważna data</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nazwa przypomnienia:</label>
                <input
                  type="text"
                  required
                  value={dateFormData.title}
                  onChange={(e) => setDateFormData({ ...dateFormData, title: e.target.value })}
                  placeholder="np. Urodziny p. Marka lub Przetarg Parking 3000m²"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Data (YYYY-MM-DD lub MM-DD):</label>
                <input
                  type="text"
                  required
                  value={dateFormData.date}
                  onChange={(e) => setDateFormData({ ...dateFormData, date: e.target.value })}
                  placeholder="np. 09-28 lub 2026-10-15"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isRecurring"
                  checked={dateFormData.isRecurringYearly}
                  onChange={(e) => setDateFormData({ ...dateFormData, isRecurringYearly: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded-sm"
                />
                <label htmlFor="isRecurring" className="text-xs text-slate-700 font-medium">
                  Powtarzaj corocznie (np. urodziny/rocznica)
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer mt-2"
              >
                Dodaj do kalendarza CRM
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD NEW CLIENT                                    */}
      {/* ======================================================== */}
      {isNewClientModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 border border-slate-200 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsNewClientModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-slate-900 mb-1 font-heading">Nowy Kontrahent Handlowy</h3>
            <p className="text-xs text-slate-500 mb-5">Wprowadź dane firmy do portfela Oplast CRM.</p>

            <form onSubmit={handleSaveNewClient} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nazwa Firmy / Składu:</label>
                <input
                  type="text"
                  required
                  value={newClientData.name}
                  onChange={(e) => setNewClientData({ ...newClientData, name: e.target.value })}
                  placeholder="np. Drew-Bud Materiały Budowlane"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Osoba Kontaktowa:</label>
                  <input
                    type="text"
                    required
                    value={newClientData.contactPerson}
                    onChange={(e) => setNewClientData({ ...newClientData, contactPerson: e.target.value })}
                    placeholder="Imię i Nazwisko"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Stanowisko:</label>
                  <input
                    type="text"
                    value={newClientData.roleTitle}
                    onChange={(e) => setNewClientData({ ...newClientData, roleTitle: e.target.value })}
                    placeholder="np. Właściciel / Zaopatrzenie"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Telefon:</label>
                  <input
                    type="text"
                    required
                    value={newClientData.phone}
                    onChange={(e) => setNewClientData({ ...newClientData, phone: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">E-mail:</label>
                  <input
                    type="email"
                    value={newClientData.email}
                    onChange={(e) => setNewClientData({ ...newClientData, email: e.target.value })}
                    placeholder="biuro@firma.pl"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Miasto:</label>
                  <input
                    type="text"
                    required
                    value={newClientData.city}
                    onChange={(e) => setNewClientData({ ...newClientData, city: e.target.value })}
                    placeholder="np. Toruń"
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Województwo:</label>
                  <select
                    value={newClientData.voivodeship}
                    onChange={(e) => setNewClientData({ ...newClientData, voivodeship: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300 bg-slate-50"
                  >
                    {VOIVODESHIPS.filter(v => v.id !== 'all').map(v => (
                      <option key={v.id} value={v.id}>{v.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Rabat handlowy (%):</label>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    value={newClientData.assignedDiscount}
                    onChange={(e) => setNewClientData({ ...newClientData, assignedDiscount: Number(e.target.value) })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Urodziny decydenta (MM-DD):</label>
                  <input
                    type="text"
                    placeholder="np. 09-28"
                    value={newClientData.birthdayMonthDay}
                    onChange={(e) => setNewClientData({ ...newClientData, birthdayMonthDay: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer mt-2"
              >
                Dodaj kontrahenta do portfela
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: ADD SALES REPRESENTATIVE (ADMIN)                  */}
      {/* ======================================================== */}
      {isNewRepModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl relative">
            <button
              onClick={() => setIsNewRepModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-black text-slate-900 mb-1 font-heading">Nowy Przedstawiciel Handlowy</h3>
            <p className="text-xs text-slate-500 mb-4">Utwórz konto przedstawiciela i przypisz rewir.</p>

            <form onSubmit={handleSaveNewRep} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Imię i Nazwisko:</label>
                <input
                  type="text"
                  required
                  value={newRepData.name}
                  onChange={(e) => setNewRepData({ ...newRepData, name: e.target.value })}
                  placeholder="np. Piotr Nowak"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Adres E-mail:</label>
                <input
                  type="email"
                  required
                  value={newRepData.email}
                  onChange={(e) => setNewRepData({ ...newRepData, email: e.target.value })}
                  placeholder="p.nowak@oplast.pl"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nazwa Regionu / Rewiru:</label>
                <input
                  type="text"
                  required
                  value={newRepData.region}
                  onChange={(e) => setNewRepData({ ...newRepData, region: e.target.value })}
                  placeholder="np. Region Wschód & Podlasie"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Miesięczny Cel Sprzedaży (PLN Netto):</label>
                <input
                  type="number"
                  step="10000"
                  value={newRepData.monthlyTarget}
                  onChange={(e) => setNewRepData({ ...newRepData, monthlyTarget: Number(e.target.value) })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs shadow-md transition-all cursor-pointer mt-2"
              >
                Utwórz profil handlowca
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
