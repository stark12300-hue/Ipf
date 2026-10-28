import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateContactNumber,
  validateEmail,
  generateInquiryId,
  extractUTMParameters,
  determineLeadSource,
  validateInquirySubmission,
  exportInquiriesToCSV,
  buildWhatsAppChatUrl,
} from './validation.ts';

test('validateContactNumber accepts valid mobile & phone formats', () => {
  assert.equal(validateContactNumber('+919876543210').valid, true);
  assert.equal(validateContactNumber('9876543210').valid, true);
  assert.equal(validateContactNumber('+1-555-0199').valid, true);
  assert.equal(validateContactNumber('   98765 43210  ').valid, true);
});

test('validateContactNumber rejects invalid phone numbers', () => {
  assert.equal(validateContactNumber('').valid, false);
  assert.equal(validateContactNumber('123').valid, false);
  assert.equal(validateContactNumber('abcdefghij').valid, false);
});

test('validateEmail validates correctly', () => {
  assert.equal(validateEmail('test@example.com').valid, true);
  assert.equal(validateEmail(undefined).valid, true); // Optional
  assert.equal(validateEmail('').valid, true); // Optional
  assert.equal(validateEmail('invalid-email').valid, false);
});

test('generateInquiryId creates standard IPF format ID', () => {
  const id1 = generateInquiryId(5, 1770000000000);
  assert.match(id1, /^IPF-\d{4}-0006-[A-Z0-9]{4}$/);
});

test('extractUTMParameters extracts campaign and referrer tags', () => {
  const query = '?utm_source=instagram&utm_medium=cpc&utm_campaign=ipf_shares_oct';
  const utm = extractUTMParameters(query, 'https://l.instagram.com/');
  assert.equal(utm.utm_source, 'instagram');
  assert.equal(utm.utm_medium, 'cpc');
  assert.equal(utm.utm_campaign, 'ipf_shares_oct');
  assert.equal(utm.referrer, 'https://l.instagram.com/');
});

test('determineLeadSource identifies Instagram and Google channels', () => {
  assert.equal(determineLeadSource({ utm_source: 'instagram' }), 'Instagram');
  assert.equal(determineLeadSource({ utm_source: 'google', utm_medium: 'cpc' }), 'Google');
  assert.equal(determineLeadSource({ utm_source: 'whatsapp' }), 'WhatsApp');
  assert.equal(determineLeadSource({}), 'Direct Visit');
});

test('validateInquirySubmission detects bot honeypot submissions', () => {
  const result = validateInquirySubmission({
    fullName: 'Spam Bot',
    contactNumber: '+919876543210',
    message: 'Buy cheap watches',
    honeypot: 'filled_by_bot',
  });
  assert.equal(result.valid, false);
  assert.ok(result.errors.bot);
});

test('validateInquirySubmission accepts valid inquiry', () => {
  const result = validateInquirySubmission({
    fullName: 'Rajesh Sharma',
    contactNumber: '+91 98200 55443',
    email: 'rajesh@example.com',
    message: 'Need help with 200 shares of Reliance transferred to IEPF.',
  });
  assert.equal(result.valid, true);
  assert.equal(Object.keys(result.errors).length, 0);
});

test('exportInquiriesToCSV formats with RFC-4180 escaping', () => {
  const csv = exportInquiriesToCSV([
    {
      id: 'IPF-2026-0001-A1B2',
      fullName: 'Sunil "Sunny" Mehta',
      contactNumber: '+919876543210',
      email: 'sunil@example.com',
      companyStockName: 'Tata Motors Ltd.',
      source: 'Google',
      status: 'New',
      createdAt: '2026-10-24T12:00:00.000Z',
      message: 'Line 1, with comma\nLine 2',
      internalNotes: 'Contacted via phone',
    },
  ]);

  assert.ok(csv.includes('Inquiry ID,Customer Name'));
  assert.ok(csv.includes('"Sunil ""Sunny"" Mehta"'));
  assert.ok(csv.includes('"IPF-2026-0001-A1B2"'));
});

test('buildWhatsAppChatUrl generates valid wa.me link with encoded text', () => {
  const url = buildWhatsAppChatUrl('+91 98200-11223', 'Testing inquiry');
  assert.ok(url.startsWith('https://wa.me/919820011223?text=Testing%20inquiry'));
});
