/**
 * Pure utility functions for validation, lead classification, 
 * UTM extraction, spam protection, and CSV export.
 */

export interface LeadUTM {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
}

export type LeadSource = 'Google' | 'Instagram' | 'WhatsApp' | 'Direct Visit' | 'Campaign Ad' | 'Other';

export type InquiryStatus = 'New' | 'Contacted' | 'In Progress' | 'Resolved' | 'Closed';

export interface InquiryFormData {
  fullName: string;
  contactNumber: string;
  email?: string;
  companyStockName?: string;
  approxSharesCount?: string;
  issueType?: string;
  message: string;
  source?: LeadSource;
  utm?: LeadUTM;
  honeypot?: string; // For anti-spam
}

/**
 * Validates customer phone numbers (supports Indian 10-digit mobile and international numbers)
 */
export function validateContactNumber(phone: string): { valid: boolean; normalized?: string; error?: string } {
  if (!phone || typeof phone !== 'string') {
    return { valid: false, error: 'Contact number is required' };
  }

  // Remove spaces, dashes, parentheses
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');

  // Must contain only digits and optional leading +
  if (!/^\+?[0-9]{7,15}$/.test(cleaned)) {
    return { valid: false, error: 'Please enter a valid phone number (7 to 15 digits)' };
  }

  return { valid: true, normalized: cleaned };
}

/**
 * Validates email format if provided
 */
export function validateEmail(email?: string): { valid: boolean; error?: string } {
  if (!email || email.trim() === '') {
    return { valid: true }; // Optional field
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { valid: false, error: 'Please enter a valid email address' };
  }
  return { valid: true };
}

/**
 * Generates an inquiry tracking ID (e.g. IPF-2026-A8K9)
 */
export function generateInquiryId(existingCount: number = 0, timestamp: number = Date.now()): string {
  const year = new Date(timestamp).getFullYear();
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  const sequence = String(existingCount + 1).padStart(4, '0');
  return `IPF-${year}-${sequence}-${randomPart}`;
}

/**
 * Parses and extracts UTM parameters from a search string or URL query
 */
export function extractUTMParameters(searchString: string, referrerHeader?: string): LeadUTM {
  const params: LeadUTM = {};
  if (!searchString) {
    if (referrerHeader) {
      params.referrer = referrerHeader;
    }
    return params;
  }

  const query = searchString.startsWith('?') ? searchString.slice(1) : searchString;
  const searchParams = new URLSearchParams(query);

  if (searchParams.get('utm_source')) params.utm_source = searchParams.get('utm_source') || undefined;
  if (searchParams.get('utm_medium')) params.utm_medium = searchParams.get('utm_medium') || undefined;
  if (searchParams.get('utm_campaign')) params.utm_campaign = searchParams.get('utm_campaign') || undefined;
  if (searchParams.get('utm_content')) params.utm_content = searchParams.get('utm_content') || undefined;
  if (searchParams.get('utm_term')) params.utm_term = searchParams.get('utm_term') || undefined;
  if (referrerHeader) params.referrer = referrerHeader;

  return params;
}

/**
 * Classifies lead source based on UTM parameters and referrer
 */
export function determineLeadSource(utm: LeadUTM = {}, explicitSource?: LeadSource): LeadSource {
  if (explicitSource && explicitSource !== 'Other') {
    return explicitSource;
  }

  const source = (utm.utm_source || '').toLowerCase();
  const medium = (utm.utm_medium || '').toLowerCase();
  const referrer = (utm.referrer || '').toLowerCase();

  if (source.includes('instagram') || medium.includes('instagram') || referrer.includes('instagram.com')) {
    return 'Instagram';
  }
  if (source.includes('whatsapp') || medium.includes('whatsapp') || referrer.includes('whatsapp')) {
    return 'WhatsApp';
  }
  if (source.includes('google') || medium.includes('cpc') || referrer.includes('google.')) {
    return 'Google';
  }
  if (utm.utm_campaign) {
    return 'Campaign Ad';
  }

  return 'Direct Visit';
}

/**
 * Anti-spam and content validator for form submissions
 */
export function validateInquirySubmission(data: InquiryFormData): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  // Honeypot check (must be empty)
  if (data.honeypot && data.honeypot.trim() !== '') {
    errors.bot = 'Automated submission rejected';
    return { valid: false, errors };
  }

  // Name check
  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters)';
  } else if (data.fullName.length > 80) {
    errors.fullName = 'Name exceeds maximum length (80 characters)';
  }

  // Contact number check
  const phoneRes = validateContactNumber(data.contactNumber);
  if (!phoneRes.valid) {
    errors.contactNumber = phoneRes.error || 'Invalid contact number';
  }

  // Email check
  if (data.email) {
    const emailRes = validateEmail(data.email);
    if (!emailRes.valid) {
      errors.email = emailRes.error || 'Invalid email address';
    }
  }

  // Message check
  if (!data.message || data.message.trim().length < 5) {
    errors.message = 'Please provide details about your shares or inquiry (at least 5 characters)';
  } else if (data.message.length > 2000) {
    errors.message = 'Message exceeds maximum length (2000 characters)';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Formats inquiries to CSV conforming with RFC 4180
 */
export function exportInquiriesToCSV(records: Array<{
  id: string;
  fullName: string;
  contactNumber: string;
  email?: string;
  companyStockName?: string;
  source: string;
  status: string;
  createdAt: string;
  message: string;
  internalNotes?: string;
}>): string {
  const headers = [
    'Inquiry ID',
    'Customer Name',
    'Contact Number',
    'Email Address',
    'Stock / Company',
    'Lead Source',
    'Status',
    'Submitted Date (UTC)',
    'Inquiry Message',
    'Internal Notes',
  ];

  const escapeCSV = (val: string | undefined | null): string => {
    if (val === undefined || val === null) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = records.map((r) => [
    escapeCSV(r.id),
    escapeCSV(r.fullName),
    escapeCSV(r.contactNumber),
    escapeCSV(r.email || ''),
    escapeCSV(r.companyStockName || ''),
    escapeCSV(r.source),
    escapeCSV(r.status),
    escapeCSV(r.createdAt),
    escapeCSV(r.message),
    escapeCSV(r.internalNotes || ''),
  ]);

  return [headers.join(','), ...rows.map((row) => row.join(','))].join('\r\n');
}

/**
 * Prepares click-to-chat WhatsApp URL with pre-filled enquiry message
 */
export function buildWhatsAppChatUrl(phoneNumber: string, prefilledText?: string): string {
  // Clean phone number: remove '+' or non-digit chars
  const cleanPhone = (phoneNumber || '').replace(/\D/g, '');
  const defaultMessage = 'Hello, I visited your website and would like to enquire about IPF stock recovery assistance.';
  const message = encodeURIComponent(prefilledText || defaultMessage);
  return `https://wa.me/${cleanPhone}?text=${message}`;
}
