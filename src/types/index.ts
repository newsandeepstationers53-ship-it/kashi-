export type Language = 'en' | 'hi';

export interface ShopDetails {
  name: string;
  nameHindi: string;
  tagline: string;
  taglineHindi: string;
  phone: string;
  phoneFormatted: string;
  address: string;
  addressHindi: string;
  landmark: string;
  city: string;
  state: string;
  pincode: string;
  email: string;
  hours: {
    weekdays: string;
    sunday: string;
  };
  mapCoords: {
    lat: number;
    lng: number;
  };
}

export type RepairStatus =
  | 'received'
  | 'diagnostic'
  | 'waiting_approval'
  | 'in_repair'
  | 'testing'
  | 'ready'
  | 'delivered';

export interface RepairTicket {
  id: string; // e.g. KC-1082
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  deviceType: 'laptop' | 'desktop' | 'printer' | 'monitor' | 'cctv' | 'other';
  brand: string;
  model: string;
  issueDescription: string;
  receivedDate: string;
  estimatedDate: string;
  status: RepairStatus;
  technicianNotes: string;
  estimatedCost: number;
  advancePaid: number;
  isPriority: boolean;
  updates: {
    date: string;
    status: RepairStatus;
    note: string;
  }[];
}

export interface Product {
  id: string;
  name: string;
  nameHindi?: string;
  category: 'laptop' | 'desktop' | 'component' | 'accessory' | 'printer' | 'storage' | 'cctv';
  brand: string;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  warranty: string;
  features: string[];
  image: string;
  isPopular?: boolean;
}

export interface PCComponent {
  id: string;
  category: 'cpu' | 'motherboard' | 'ram' | 'storage_primary' | 'storage_secondary' | 'gpu' | 'cabinet' | 'psu' | 'monitor' | 'accessories';
  name: string;
  brand: string;
  price: number;
  specs: string;
  wattage?: number;
  socket?: string;
  memoryType?: 'DDR4' | 'DDR5';
}

export interface PCPreset {
  id: string;
  title: string;
  titleHindi: string;
  tag: string;
  tagHindi: string;
  description: string;
  targetPrice: number;
  components: {
    cpu: string;
    motherboard: string;
    ram: string;
    storage_primary: string;
    storage_secondary?: string;
    gpu?: string;
    cabinet: string;
    psu: string;
    monitor?: string;
    accessories?: string;
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  titleHindi: string;
  category: string;
  description: string;
  descriptionHindi: string;
  turnaround: string;
  startingPrice: number;
  iconName: string;
  warranty: string;
}

export interface CSCService {
  id: string;
  title: string;
  titleHindi: string;
  department: string;
  fee: string;
  turnaround: string;
  requiredDocuments: string[];
  description: string;
}
