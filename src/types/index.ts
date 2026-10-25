import type { LeadSource, InquiryStatus, LeadUTM } from '../utils/validation.ts';

export type { LeadSource, InquiryStatus, LeadUTM };

export interface Inquiry {
  id: string;
  fullName: string;
  contactNumber: string;
  email?: string;
  companyStockName?: string;
  approxSharesCount?: string;
  issueType?: string;
  message: string;
  source: LeadSource;
  utm?: LeadUTM;
  status: InquiryStatus;
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  iconName: string;
  badge?: string;
  whoIsItFor: string[];
  steps: string[];
  keyDocuments: string[];
}

export interface FAQItem {
  id: string;
  category: 'General' | 'Process' | 'Documents' | 'Status & Security';
  question: string;
  answer: string;
}

export interface CompanyConfig {
  companyName: string;
  tagLine: string;
  contactNumber: string;
  whatsappNumber: string;
  businessEmail: string;
  officeAddress: string;
  businessHours: string;
  instagramHandle: string;
  instagramUrl: string;
  googleAdsId: string;
  metaPixelId: string;
  seoTitle: string;
  seoDescription: string;
  disclaimerNotice: string;
  services: ServiceItem[];
  faqs: FAQItem[];
}

export interface ConversionEvent {
  id: string;
  eventType: 'whatsapp_click' | 'phone_click' | 'instagram_click' | 'form_submission' | 'landing_view';
  channel: string;
  path: string;
  utm?: LeadUTM;
  timestamp: string;
}

export interface AnalyticsSummary {
  totalInquiries: number;
  newLeadsCount: number;
  inProgressCount: number;
  resolvedCount: number;
  byStatus: Record<string, number>;
  bySource: Record<string, number>;
  conversionsCount: number;
  dailyTrend: { date: string; inquiries: number; conversions: number }[];
}
