import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, ProductColor, UnitType, CartItem, B2BInquiry, SampleBoxOrder } from '../types/shop';
import { Partner, PartnerInquiry } from '../types/partners';

export type AppView = 'home' | 'partners';

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
  partnerProductFilter?: string;
  setPartnerProductFilter: (productId?: string) => void;
  selectedPartner?: Partner;
  setSelectedPartner: (partner?: Partner) => void;
  isPartnerInquiryOpen: boolean;
  setIsPartnerInquiryOpen: (open: boolean) => void;
  partnerInquiries: PartnerInquiry[];
  addPartnerInquiry: (inquiry: Omit<PartnerInquiry, 'id' | 'createdAt'>) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // View state: 'home' | 'partners'
  const [currentView, setCurrentViewState] = useState<AppView>(() => {
    if (typeof window !== 'undefined' && (window.location.hash === '#partnerzy' || window.location.hash === '#gdzie-kupic')) {
      return 'partners';
    }
    return 'home';
  });

  const setCurrentView = (view: AppView) => {
    setCurrentViewState(view);
    if (typeof window !== 'undefined') {
      if (view === 'partners') {
        window.location.hash = 'partnerzy';
      } else if (window.location.hash === '#partnerzy' || window.location.hash === '#gdzie-kupic') {
        window.history.pushState(null, '', window.location.pathname);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#partnerzy' || window.location.hash === '#gdzie-kupic') {
        setCurrentViewState('partners');
      } else if (currentView === 'partners' && (window.location.hash === '' || window.location.hash === '#produkty' || window.location.hash === '#kratki' || window.location.hash === '#obrzeza')) {
        setCurrentViewState('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentView]);

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
    };
    const updated = [newInquiry, ...partnerInquiries];
    setPartnerInquiries(updated);
    localStorage.setItem('oplast_garden_partner_inquiries', JSON.stringify(updated));
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
        partnerProductFilter,
        setPartnerProductFilter,
        selectedPartner,
        setSelectedPartner,
        isPartnerInquiryOpen,
        setIsPartnerInquiryOpen,
        partnerInquiries,
        addPartnerInquiry,
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
