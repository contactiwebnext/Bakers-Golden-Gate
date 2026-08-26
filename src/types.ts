export interface ServiceCategory {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  features: string[];
  imageUrl: string;
  detailedOverview: string;
  whatsIncluded: string[];
}

export interface PriceItem {
  id: string;
  name: string;
  priceDisplay: string;
  priceValue: number;
  category: 'base' | 'mileage' | 'addon' | 'specialized';
  description?: string;
  note?: string;
}

export interface Obituary {
  id: string;
  fullName: string;
  years: string;
  birthDate?: string;
  passingDate: string;
  serviceDateLocation: string;
  summary: string;
  fullObituary: string;
  imageUrl: string;
  serviceType: string;
  virtualCandlesCount: number;
}

export interface TributeItem {
  id: string;
  obituaryId: string;
  author: string;
  relation: string;
  message: string;
  candleLit: boolean;
  timestamp: string;
}

export interface AppointmentFormState {
  fullName: string;
  phone: string;
  email: string;
  serviceType: string;
  consultationType: 'in-person' | 'phone' | 'virtual';
  preferredDate: string;
  preferredTime: string;
  notes: string;
}

export interface ContactFormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface GriefArticle {
  id: string;
  title: string;
  readTime: string;
  category: string;
  summary: string;
  content: string[];
}
