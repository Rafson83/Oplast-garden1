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
  status?: 'active' | 'pending' | 'inactive';
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
  status?: 'new' | 'in_progress' | 'completed';
  notes?: string;
}

export interface ClientContactLog {
  id: string;
  clientId: string;
  date: string;
  type: 'call' | 'meeting' | 'offer' | 'order' | 'note';
  title: string;
  summary: string;
  nextFollowUpDate?: string;
  repName?: string;
}

export interface ClientImportantDate {
  id: string;
  clientId: string;
  type: 'birthday' | 'anniversary' | 'contract_renewal' | 'tender_deadline' | 'season_stock' | 'other';
  title: string;
  date: string; // YYYY-MM-DD or MM-DD
  isRecurringYearly: boolean;
  notes?: string;
}

export type SalesClientCategory = 'building_depot' | 'paving_contractor' | 'garden_center' | 'developer' | 'wholesaler';

export interface SalesClient {
  id: string;
  repId: string;
  name: string;
  contactPerson: string;
  roleTitle?: string;
  phone: string;
  email: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
    voivodeship: string;
  };
  nip?: string;
  category: SalesClientCategory;
  status: 'vip' | 'active' | 'prospect' | 'dormant' | 'lead';
  assignedDiscount: number; // np. 15 (%)
  lastOrderDate?: string; // ISO lub YYYY-MM-DD
  lastContactDate?: string;
  nextPlannedContact?: string;
  totalRevenueYtd: number; // PLN netto
  favoriteProducts: string[];
  notes?: string;
  birthdayMonthDay?: string; // MM-DD np. 09-28
  contactLogs: ClientContactLog[];
  importantDates: ClientImportantDate[];
}

export interface SalesRep {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'sales_rep' | 'sales_director';
  region: string;
  assignedVoivodeships: string[];
  monthlyTarget: number;
  avatar?: string;
}

export interface PartnerUser {
  email: string;
  name: string;
  role: 'admin' | 'sales_rep' | 'partner';
  partnerId?: string;
  repId?: string;
  region?: string;
}

