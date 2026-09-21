export type ProductCategory = 'kratki' | 'obrzeza' | 'akcesoria';

export type UnitType = 'piece' | 'm2' | 'pallet';

export interface ProductColor {
  id: string;
  name: string;
  hex: string;
  inStock: boolean;
}

export interface B2BDiscountTier {
  minUnits: number;
  unitLabel: string;
  discountPercent: number;
  label: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  subtitle: string;
  description: string;
  dimensions: string;
  heightMm: number;
  weightKg: number;
  loadCapacityTonnes?: number;
  coveragePerM2?: number; // e.g. 4.4 pcs per m2 or 1 for borders
  piecesPerPallet?: number;
  colors: ProductColor[];
  priceNettoUnit: number;
  priceBruttoUnit: number;
  priceNettoPallet?: number;
  priceBruttoPallet?: number;
  b2bDiscountTiers: B2BDiscountTier[];
  features: string[];
  technicalSpecs: { [key: string]: string };
  isPopular?: boolean;
  isB2BRecommended?: boolean;
  badge?: string;
}

export interface CartItem {
  id: string; // unique cart item id (product.id + color + unitType)
  product: Product;
  selectedColor: ProductColor;
  unitType: UnitType;
  quantity: number;
  effectiveUnitPriceNetto: number;
  effectiveUnitPriceBrutto: number;
  totalPieces: number;
}

export type DeliveryMethod = 'courier' | 'pallet' | 'ftl' | 'pickup';

export interface B2BInquiry {
  id: string;
  createdAt: string;
  companyName: string;
  nip: string;
  contactPerson: string;
  phone: string;
  email: string;
  city: string;
  postalCode: string;
  investmentType: string;
  estimatedM2: number;
  preferredProduct: string;
  requiresTransport: boolean;
  notes: string;
}

export interface SampleBoxOrder {
  id: string;
  createdAt: string;
  companyName: string;
  nip: string;
  recipientName: string;
  phone: string;
  email: string;
  street: string;
  postalCode: string;
  city: string;
  profession: 'architect' | 'paving_contractor' | 'construction_company' | 'gardener' | 'distributor' | 'other';
  selectedModels: string[];
  comments?: string;
}

export interface CalculationInputs {
  surfaceM2: number;
  usageType: 'light_garden' | 'parking_passenger' | 'heavy_truck' | 'slope_reinforcement';
  fillerType: 'grass' | 'gravel';
  includeAnchors: boolean;
  includeBorders: boolean;
  perimeterM: number;
}

export interface CalculationResult {
  surfaceM2: number;
  recommendedProduct: Product;
  piecesNeeded: number;
  palletsNeeded: number;
  anchorsNeeded: number;
  bordersNeeded: number;
  fillerVolumeM3: number;
  totalWeightKg: number;
}
