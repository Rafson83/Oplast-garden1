import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductColor, UnitType, CartItem, B2BInquiry, SampleBoxOrder } from '../types/shop';
import { Partner, PartnerInquiry, PartnerUser, SalesRep, SalesClient, ClientContactLog, ClientImportantDate } from '../types/partners';
import { PARTNERS } from '../data/partners';
import { SALES_REPS, INITIAL_SALES_CLIENTS } from '../data/salesReps';

export type AppView = 'home' | 'partners' | 'admin';

interface ShopContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  isB2BMode: boolean;
  setIsB2BMode: (val: boolean) => void;
  cart: CartItem[];
  addToCart: (product: Product, selectedColor: ProductColor, unitType: UnitType, quantity: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  totalCartNetto: number;
  totalCartBrutto: number;
  totalPallets: number;
  totalWeightKg: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCalculatorOpen: boolean;
  setIsCalculatorOpen: (open: boolean) => void;
  isSampleBoxOpen: boolean;
  setIsSampleBoxOpen: (open: boolean) => void;
  isInquiryOpen: boolean;
  setIsInquiryOpen: (open: boolean) => void;
  inquiryPreselectedProduct?: string;
  setInquiryPreselectedProduct: (name?: string) => void;
  b2bInquiries: B2BInquiry[];
  addB2BInquiry: (inquiry: Omit<B2BInquiry, 'id' | 'createdAt'>) => void;
  sampleOrders: SampleBoxOrder[];
  addSampleBoxOrder: (order: Omit<SampleBoxOrder, 'id' | 'createdAt'>) => void;
  // Partner Directory & Retail Store Finder
  partnersList: Partner[];
  addPartner: (partner: Omit<Partner, 'id'>) => void;
  updatePartner: (id: string, updatedData: Partial<Partner>) => void;
  deletePartner: (id: string) => void;
  resetPartnersToDefault: () => void;
  partnerProductFilter?: string;
  setPartnerProductFilter: (productId?: string) => void;
  selectedPartner?: Partner;
  setSelectedPartner: (partner?: Partner) => void;
  isPartnerInquiryOpen: boolean;
  setIsPartnerInquiryOpen: (open: boolean) => void;
  partnerInquiries: PartnerInquiry[];
  addPartnerInquiry: (inquiry: Omit<PartnerInquiry, 'id' | 'createdAt'>) => void;
  updateInquiryStatus: (id: string, status: 'new' | 'in_progress' | 'completed', notes?: string) => void;
  deleteInquiry: (id: string) => void;
  // Partner / Admin Portal Authentication
  partnerUser: PartnerUser | null;
  loginPartner: (
    email: string, 
    role?: 'admin' | 'sales_rep' | 'partner', 
    name?: string, 
    partnerId?: string,
    repId?: string,
    region?: string
  ) => void;
  logoutPartner: () => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  // Sales Rep & CRM Clients Portfolio
  salesReps: SalesRep[];
  salesClients: SalesClient[];
  activeRepFilter: string;
  setActiveRepFilter: (repId: string) => void;
  addSalesClient: (client: Omit<SalesClient, 'id' | 'contactLogs' | 'importantDates'>) => void;
  updateSalesClient: (id: string, updatedData: Partial<SalesClient>) => void;
  deleteSalesClient: (id: string) => void;
  addClientContactLog: (clientId: string, log: Omit<ClientContactLog, 'id'>) => void;
  addClientImportantDate: (clientId: string, importantDate: Omit<ClientImportantDate, 'id'>) => void;
  deleteClientImportantDate: (clientId: string, dateId: string) => void;
  updateSalesRep: (id: string, updated: Partial<SalesRep>) => void;
  addSalesRep: (rep: Omit<SalesRep, 'id'>) => void;
  resetSalesDataToDefault: () => void;
  // Privacy Policy & Cookies
  isPrivacyPolicyOpen: boolean;
  setIsPrivacyPolicyOpen: (open: boolean) => void;
  isCookieSettingsOpen: boolean;
  setIsCookieSettingsOpen: (open: boolean) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // View state: 'home' | 'partners' | 'admin'
  const [currentView, setCurrentViewState] = useState<AppView>(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '#admin' || window.location.hash === '#crm') {
        return 'admin';
      }
      if (window.location.hash === '#partnerzy' || window.location.hash === '#gdzie-kupic') {
        return 'partners';
      }
    }
    return 'home';
  });

  const setCurrentView = (view: AppView) => {
    setCurrentViewState(view);
    if (typeof window !== 'undefined') {
      if (view === 'admin') {
        window.location.hash = 'admin';
      } else if (view === 'partners') {
        window.location.hash = 'partnerzy';
      } else {
        window.history.pushState(null, '', window.location.pathname);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin' || window.location.hash === '#crm') {
        setCurrentViewState('admin');
      } else if (window.location.hash === '#partnerzy' || window.location.hash === '#gdzie-kupic') {
        setCurrentViewState('partners');
      } else if (
        (currentView === 'partners' || currentView === 'admin') &&
        (window.location.hash === '' || window.location.hash === '#produkty' || window.location.hash === '#kratki' || window.location.hash === '#obrzeza')
      ) {
        setCurrentViewState('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentView]);

  // Partners List (persisted in localStorage for live CRM edits)
  const [partnersList, setPartnersList] = useState<Partner[]>(() => {
    try {
      const saved = localStorage.getItem('oplast_garden_partners_data');
      return saved ? JSON.parse(saved) : PARTNERS;
    } catch {
      return PARTNERS;
    }
  });

  const savePartnersList = (list: Partner[]) => {
    setPartnersList(list);
    localStorage.setItem('oplast_garden_partners_data', JSON.stringify(list));
  };

  const addPartner = (newPartnerData: Omit<Partner, 'id'>) => {
    const id = `partner-${Date.now()}`;
    const newPartner: Partner = {
      ...newPartnerData,
      id,
      status: newPartnerData.status || 'active',
    };
    const updated = [newPartner, ...partnersList];
    savePartnersList(updated);
  };

  const updatePartner = (id: string, updatedData: Partial<Partner>) => {
    const updated = partnersList.map(p => p.id === id ? { ...p, ...updatedData } : p);
    savePartnersList(updated);
  };

  const deletePartner = (id: string) => {
    const updated = partnersList.filter(p => p.id !== id);
    savePartnersList(updated);
  };

  const resetPartnersToDefault = () => {
    savePartnersList(PARTNERS);
  };

  // Partner filter and modal states
  const [partnerProductFilter, setPartnerProductFilter] = useState<string | undefined>();
  const [selectedPartner, setSelectedPartner] = useState<Partner | undefined>();
  const [isPartnerInquiryOpen, setIsPartnerInquiryOpen] = useState(false);

  // Stored Partner Inquiries
  const [partnerInquiries, setPartnerInquiries] = useState<PartnerInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('oplast_garden_partner_inquiries');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const addPartnerInquiry = (inquiry: Omit<PartnerInquiry, 'id' | 'createdAt'>) => {
    const newInquiry: PartnerInquiry = {
      ...inquiry,
      id: `PINQ-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    const updated = [newInquiry, ...partnerInquiries];
    setPartnerInquiries(updated);
    localStorage.setItem('oplast_garden_partner_inquiries', JSON.stringify(updated));
  };

  const updateInquiryStatus = (id: string, status: 'new' | 'in_progress' | 'completed', notes?: string) => {
    const updated = partnerInquiries.map(inq => 
      inq.id === id ? { ...inq, status, ...(notes !== undefined ? { notes } : {}) } : inq
    );
    setPartnerInquiries(updated);
    localStorage.setItem('oplast_garden_partner_inquiries', JSON.stringify(updated));
  };

  const deleteInquiry = (id: string) => {
    const updated = partnerInquiries.filter(inq => inq.id !== id);
    setPartnerInquiries(updated);
    localStorage.setItem('oplast_garden_partner_inquiries', JSON.stringify(updated));
  };

  // Partner / Admin Portal Authentication
  const [partnerUser, setPartnerUser] = useState<PartnerUser | null>(() => {
    try {
      const saved = localStorage.getItem('oplast_partner_auth');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Sales Representatives State
  const [salesReps, setSalesReps] = useState<SalesRep[]>(() => {
    try {
      const saved = localStorage.getItem('oplast_garden_sales_reps');
      return saved ? JSON.parse(saved) : SALES_REPS;
    } catch {
      return SALES_REPS;
    }
  });

  const saveSalesReps = (reps: SalesRep[]) => {
    setSalesReps(reps);
    localStorage.setItem('oplast_garden_sales_reps', JSON.stringify(reps));
  };

  const updateSalesRep = (id: string, updated: Partial<SalesRep>) => {
    const updatedList = salesReps.map(r => r.id === id ? { ...r, ...updated } : r);
    saveSalesReps(updatedList);
  };

  const addSalesRep = (repData: Omit<SalesRep, 'id'>) => {
    const newRep: SalesRep = {
      ...repData,
      id: `rep-${Date.now()}`,
    };
    saveSalesReps([...salesReps, newRep]);
  };

  // Sales Clients State
  const [salesClients, setSalesClients] = useState<SalesClient[]>(() => {
    try {
      const saved = localStorage.getItem('oplast_garden_sales_clients');
      return saved ? JSON.parse(saved) : INITIAL_SALES_CLIENTS;
    } catch {
      return INITIAL_SALES_CLIENTS;
    }
  });

  const saveSalesClients = (clients: SalesClient[]) => {
    setSalesClients(clients);
    localStorage.setItem('oplast_garden_sales_clients', JSON.stringify(clients));
  };

  // Active filter by Sales Rep ('all' or specific repId)
  const [activeRepFilter, setActiveRepFilter] = useState<string>(() => {
    if (partnerUser?.role === 'sales_rep' && partnerUser.repId) {
      return partnerUser.repId;
    }
    return 'all';
  });

  const addSalesClient = (clientData: Omit<SalesClient, 'id' | 'contactLogs' | 'importantDates'>) => {
    const newClient: SalesClient = {
      ...clientData,
      id: `sclient-${Date.now()}`,
      contactLogs: [
        {
          id: `log-init-${Date.now()}`,
          clientId: `sclient-${Date.now()}`,
          date: new Date().toISOString().split('T')[0],
          type: 'note',
          title: 'Utworzenie profilu klienta w systemie Oplast CRM',
          summary: 'Kontrahent dodany do bazy handlowej Oplast Garden.',
          repName: partnerUser?.name || 'Przedstawiciel Handlowy',
        }
      ],
      importantDates: clientData.birthdayMonthDay ? [
        {
          id: `date-init-${Date.now()}`,
          clientId: `sclient-${Date.now()}`,
          type: 'birthday',
          title: `Urodziny: ${clientData.contactPerson}`,
          date: clientData.birthdayMonthDay,
          isRecurringYearly: true,
          notes: 'Przypomnienie o życzeniach i kontakcie relacyjnym.',
        }
      ] : [],
    };
    const updated = [newClient, ...salesClients];
    saveSalesClients(updated);
  };

  const updateSalesClient = (id: string, updatedData: Partial<SalesClient>) => {
    const updated = salesClients.map(c => c.id === id ? { ...c, ...updatedData } : c);
    saveSalesClients(updated);
  };

  const deleteSalesClient = (id: string) => {
    const updated = salesClients.filter(c => c.id !== id);
    saveSalesClients(updated);
  };

  const addClientContactLog = (clientId: string, logData: Omit<ClientContactLog, 'id'>) => {
    const newLog: ClientContactLog = {
      ...logData,
      id: `log-${Date.now()}`,
    };
    const updated = salesClients.map(client => {
      if (client.id === clientId) {
        return {
          ...client,
          lastContactDate: newLog.date,
          ...(newLog.nextFollowUpDate ? { nextPlannedContact: newLog.nextFollowUpDate } : {}),
          contactLogs: [newLog, ...(client.contactLogs || [])],
        };
      }
      return client;
    });
    saveSalesClients(updated);
  };

  const addClientImportantDate = (clientId: string, dateData: Omit<ClientImportantDate, 'id'>) => {
    const newDate: ClientImportantDate = {
      ...dateData,
      id: `date-${Date.now()}`,
    };
    const updated = salesClients.map(client => {
      if (client.id === clientId) {
        return {
          ...client,
          importantDates: [...(client.importantDates || []), newDate],
        };
      }
      return client;
    });
    saveSalesClients(updated);
  };

  const deleteClientImportantDate = (clientId: string, dateId: string) => {
    const updated = salesClients.map(client => {
      if (client.id === clientId) {
        return {
          ...client,
          importantDates: (client.importantDates || []).filter(d => d.id !== dateId),
        };
      }
      return client;
    });
    saveSalesClients(updated);
  };

  const resetSalesDataToDefault = () => {
    saveSalesReps(SALES_REPS);
    saveSalesClients(INITIAL_SALES_CLIENTS);
  };

  const loginPartner = (
    email: string, 
    role: 'admin' | 'sales_rep' | 'partner' = 'admin', 
    name?: string, 
    partnerId?: string,
    repId?: string,
    region?: string
  ) => {
    const user: PartnerUser = {
      email,
      role,
      name: name || (role === 'admin' ? 'Administrator Oplast' : role === 'sales_rep' ? 'Przedstawiciel Handlowy' : 'Partner Handlowy'),
      partnerId,
      repId,
      region,
    };
    setPartnerUser(user);
    if (role === 'sales_rep' && repId) {
      setActiveRepFilter(repId);
    } else if (role === 'admin') {
      setActiveRepFilter('all');
    }
    localStorage.setItem('oplast_partner_auth', JSON.stringify(user));
    setIsLoginModalOpen(false);
  };

  const logoutPartner = () => {
    setPartnerUser(null);
    localStorage.removeItem('oplast_partner_auth');
    if (currentView === 'admin') {
      setCurrentView('home');
    }
  };

  // B2B Mode: Persisted in localStorage
  const [isB2BMode, setIsB2BModeState] = useState<boolean>(() => {
    const saved = localStorage.getItem('oplast_garden_b2b_mode');
    return saved === 'true';
  });

  const setIsB2BMode = (val: boolean) => {
    setIsB2BModeState(val);
    localStorage.setItem('oplast_garden_b2b_mode', String(val));
  };

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('oplast_garden_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('oplast_garden_cart', JSON.stringify(cart));
  }, [cart]);

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isSampleBoxOpen, setIsSampleBoxOpen] = useState(false);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [inquiryPreselectedProduct, setInquiryPreselectedProduct] = useState<string | undefined>();
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const [isCookieSettingsOpen, setIsCookieSettingsOpen] = useState(false);

  // Stored Inquiries & Samples
  const [b2bInquiries, setB2BInquiries] = useState<B2BInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('oplast_garden_inquiries');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [sampleOrders, setSampleOrders] = useState<SampleBoxOrder[]>(() => {
    try {
      const saved = localStorage.getItem('oplast_garden_sample_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const addB2BInquiry = (inquiry: Omit<B2BInquiry, 'id' | 'createdAt'>) => {
    const newInquiry: B2BInquiry = {
      ...inquiry,
      id: `INQ-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [newInquiry, ...b2bInquiries];
    setB2BInquiries(updated);
    localStorage.setItem('oplast_garden_inquiries', JSON.stringify(updated));
  };

  const addSampleBoxOrder = (order: Omit<SampleBoxOrder, 'id' | 'createdAt'>) => {
    const newOrder: SampleBoxOrder = {
      ...order,
      id: `SMP-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [newOrder, ...sampleOrders];
    setSampleOrders(updated);
    localStorage.setItem('oplast_garden_sample_orders', JSON.stringify(updated));
  };

  // Helper to compute effective unit price
  const calculateEffectivePrice = (product: Product, unitType: UnitType, qty: number) => {
    if (unitType === 'pallet' && product.priceNettoPallet && product.priceBruttoPallet) {
      // Check tier discount for pallets
      let discountPct = 0;
      for (const tier of product.b2bDiscountTiers) {
        if (qty >= tier.minUnits) {
          discountPct = Math.max(discountPct, tier.discountPercent);
        }
      }
      const netto = product.priceNettoPallet * (1 - discountPct / 100);
      const brutto = netto * 1.23;
      return { netto, brutto };
    }

    if (unitType === 'm2') {
      const pcsPerM2 = product.coveragePerM2 || 4.4;
      const netto = product.priceNettoUnit * pcsPerM2;
      const brutto = product.priceBruttoUnit * pcsPerM2;
      return { netto, brutto };
    }

    // Piece
    let discountPct = 0;
    for (const tier of product.b2bDiscountTiers) {
      if (qty >= tier.minUnits && !tier.unitLabel.includes('palet')) {
        discountPct = Math.max(discountPct, tier.discountPercent);
      }
    }
    const netto = product.priceNettoUnit * (1 - discountPct / 100);
    const brutto = netto * 1.23;
    return { netto, brutto };
  };

  const addToCart = (product: Product, selectedColor: ProductColor, unitType: UnitType, quantity: number) => {
    const itemId = `${product.id}-${selectedColor.id}-${unitType}`;
    const piecesMultiplier = unitType === 'pallet' ? (product.piecesPerPallet || 1) : (unitType === 'm2' ? (product.coveragePerM2 || 1) : 1);

    setCart(prev => {
      const existing = prev.find(item => item.id === itemId);
      const newQty = existing ? existing.quantity + quantity : quantity;
      const { netto, brutto } = calculateEffectivePrice(product, unitType, newQty);

      if (existing) {
        return prev.map(item =>
          item.id === itemId
            ? {
                ...item,
                quantity: newQty,
                effectiveUnitPriceNetto: netto,
                effectiveUnitPriceBrutto: brutto,
                totalPieces: Math.round(newQty * piecesMultiplier),
              }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: itemId,
          product,
          selectedColor,
          unitType,
          quantity: newQty,
          effectiveUnitPriceNetto: netto,
          effectiveUnitPriceBrutto: brutto,
          totalPieces: Math.round(newQty * piecesMultiplier),
        };
        return [...prev, newItem];
      }
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev =>
      prev.map(item => {
        if (item.id === id) {
          const { netto, brutto } = calculateEffectivePrice(item.product, item.unitType, newQty);
          const piecesMultiplier = item.unitType === 'pallet' ? (item.product.piecesPerPallet || 1) : (item.unitType === 'm2' ? (item.product.coveragePerM2 || 1) : 1);
          return {
            ...item,
            quantity: newQty,
            effectiveUnitPriceNetto: netto,
            effectiveUnitPriceBrutto: brutto,
            totalPieces: Math.round(newQty * piecesMultiplier),
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalCartNetto = cart.reduce((sum, item) => sum + item.effectiveUnitPriceNetto * item.quantity, 0);
  const totalCartBrutto = cart.reduce((sum, item) => sum + item.effectiveUnitPriceBrutto * item.quantity, 0);

  const totalWeightKg = cart.reduce((sum, item) => {
    return sum + (item.totalPieces * item.product.weightKg);
  }, 0);

  const totalPallets = cart.reduce((sum, item) => {
    if (item.unitType === 'pallet') return sum + item.quantity;
    if (item.product.piecesPerPallet) {
      return sum + (item.totalPieces / item.product.piecesPerPallet);
    }
    return sum;
  }, 0);

  return (
    <ShopContext.Provider
      value={{
        currentView,
        setCurrentView,
        isB2BMode,
        setIsB2BMode,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        totalCartNetto,
        totalCartBrutto,
        totalPallets: Math.ceil(totalPallets * 10) / 10,
        totalWeightKg: Math.round(totalWeightKg),
        isCartOpen,
        setIsCartOpen,
        isCalculatorOpen,
        setIsCalculatorOpen,
        isSampleBoxOpen,
        setIsSampleBoxOpen,
        isInquiryOpen,
        setIsInquiryOpen,
        inquiryPreselectedProduct,
        setInquiryPreselectedProduct,
        b2bInquiries,
        addB2BInquiry,
        sampleOrders,
        addSampleBoxOrder,
        partnersList,
        addPartner,
        updatePartner,
        deletePartner,
        resetPartnersToDefault,
        partnerProductFilter,
        setPartnerProductFilter,
        selectedPartner,
        setSelectedPartner,
        isPartnerInquiryOpen,
        setIsPartnerInquiryOpen,
        partnerInquiries,
        addPartnerInquiry,
        updateInquiryStatus,
        deleteInquiry,
        partnerUser,
        loginPartner,
        logoutPartner,
        isLoginModalOpen,
        setIsLoginModalOpen,
        // Sales Rep & CRM
        salesReps,
        salesClients,
        activeRepFilter,
        setActiveRepFilter,
        addSalesClient,
        updateSalesClient,
        deleteSalesClient,
        addClientContactLog,
        addClientImportantDate,
        deleteClientImportantDate,
        updateSalesRep,
        addSalesRep,
        resetSalesDataToDefault,
        isPrivacyPolicyOpen,
        setIsPrivacyPolicyOpen,
        isCookieSettingsOpen,
        setIsCookieSettingsOpen,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
