export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ConversationContext {
  leadId?: string;
  propertyId?: string;
  lastEntities?: {
    name?: string;
    email?: string;
    phone?: string;
    source?: string;
    preferences?: string[];
  };
  lastIntent?: string;
  messages: Message[];
}

export interface Property {
  id: string;
  address: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  propertyType: string;
  location: string;
  description: string;
  features: string[];
  images: string[];
  status: 'available' | 'pending' | 'sold';
  createdAt: Date;
  updatedAt: Date;
}

export interface MarketData {
  location: string;
  averagePrice: number;
  medianPrice: number;
  inventory: number;
  daysOnMarket: number;
  pricePerSqft: number;
  trends: MarketTrend[];
  demographics: Demographics;
  schools: School[];
}

export interface MarketTrend {
  date: Date;
  averagePrice: number;
  inventory: number;
  daysOnMarket: number;
}

export interface Demographics {
  population: number;
  medianAge: number;
  medianIncome: number;
  homeownershipRate: number;
}

export interface School {
  name: string;
  type: 'elementary' | 'middle' | 'high';
  rating: number;
  distance: number;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: 'website' | 'chatbot' | 'voicebot' | 'referral' | 'other';
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'closed';
  lastContact: Date;
  interactions: Interaction[];
  preferences?: LeadPreferences;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Interaction {
  type: 'chat' | 'call' | 'email' | 'viewing';
  date: Date;
  notes?: string;
}

export interface LeadPreferences {
  propertyType?: string[];
  priceRange?: [number, number];
  locations?: string[];
  beds?: number;
  baths?: number;
}

export interface VerifyCallback {
  (error: Error | null, success: boolean): void;
}

export interface Contact {
  id: string;
  Name: string;
  Email: string;
  Phone: string;
  Company: string;
  Status: 'New' | 'Contacted' | 'Qualified' | 'Proposal' | 'Closed';
  Notes?: string;
  createdTime?: string;
  lastModifiedTime?: string;
}

export interface Deal {
  id: string;
  'Deal Name': string;
  Amount: number;
  Stage: string;
  Contact: string[];
  'Close Date': string;
  Notes?: string;
  createdTime?: string;
  lastModifiedTime?: string;
}

export interface Activity {
  id: string;
  Type: string;
  Subject: string;
  Contact: string[];
  Deal: string[];
  'Due Date': string;
  Status: string;
  Notes?: string;
  createdTime?: string;
  lastModifiedTime?: string;
} 