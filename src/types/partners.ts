export type PartnerType = 'building_depot' | 'garden_center' | 'paving_depot' | 'regional_distributor';

export interface Partner {
  id: string;
  name: string;
  type: PartnerType;
  badge?: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
    voivodeship: string;
  };
  phone: string;
  email: string;
  website?: string;
  openingHours: {
    weekdays: string;
    saturday: string;
  };
  stockedProducts: string[];
  services: string[];
  googleMapsQuery: string;
  featured?: boolean;
}

export interface PartnerInquiry {
  id: string;
  partnerId: string;
  partnerName: string;
  customerName: string;
  phone: string;
  email: string;
  requestedProduct: string;
  estimatedQuantity: string;
  message: string;
  createdAt: string;
}
