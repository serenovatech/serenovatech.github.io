import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  EMPTY_ENQUIRY,
  buildEnquiryBody,
  buildEnquiryText,
  buildMailtoUrl,
  isValidEmail,
  validateEnquiry
} from '../src/utils/enquiry.js';

const valid = {
  ...EMPTY_ENQUIRY,
  name: 'Nimal Perera',
  email: 'nimal@example.com',
  service: 'Linux and NGINX Support',
  description: 'Our NGINX site shows 502 errors after the last update.',
  consent: true
};

test('a complete enquiry has no errors', () => {
  assert.deepEqual(validateEnquiry(valid), {});
});

test('required fields are reported when empty', () => {
  const errors = validateEnquiry(EMPTY_ENQUIRY);
  assert.deepEqual(Object.keys(errors).sort(), ['consent', 'description', 'email', 'name', 'service']);
});

test('email format is checked', () => {
  assert.equal(isValidEmail('name@company.com'), true);
  assert.equal(isValidEmail('name@company'), false);
  assert.equal(isValidEmail('name company@x.com'), false);
  assert.ok(validateEnquiry({ ...valid, email: 'not-an-email' }).email);
});

test('description must have enough detail', () => {
  assert.ok(validateEnquiry({ ...valid, description: 'Help' }).description);
  assert.ok(validateEnquiry({ ...valid, description: 'x'.repeat(2001) }).description);
});

test('phone is required only for phone or WhatsApp contact', () => {
  assert.equal(validateEnquiry({ ...valid, contactMethod: 'Email' }).phone, undefined);
  assert.ok(validateEnquiry({ ...valid, contactMethod: 'WhatsApp' }).phone);
  assert.ok(validateEnquiry({ ...valid, contactMethod: 'Phone call', phone: 'abc' }).phone);
  assert.equal(validateEnquiry({ ...valid, contactMethod: 'Phone call', phone: '+94 77 123 4567' }).phone, undefined);
});

test('optional fields are left out of the email when empty', () => {
  const body = buildEnquiryBody(valid);
  assert.ok(!body.includes('Company'));
  assert.ok(!body.includes('Project budget'));
  assert.ok(!body.includes('Phone:'));
  assert.ok(body.includes('Service required: Linux and NGINX Support'));
});

test('phone number is only included for phone-based contact methods', () => {
  assert.ok(!buildEnquiryBody({ ...valid, phone: '0771234567' }).includes('Phone:'));
  assert.ok(buildEnquiryBody({ ...valid, contactMethod: 'WhatsApp', phone: '0771234567' }).includes('Phone: 0771234567'));
});

test('mailto URL is addressed and encoded correctly', () => {
  const url = buildMailtoUrl('hello@example.com', { ...valid, company: 'A & B Traders' });
  assert.ok(url.startsWith('mailto:hello@example.com?subject='));
  assert.ok(url.includes('A%20%26%20B%20Traders'));
  assert.ok(url.includes('%0D%0A'));
  assert.ok(!url.includes(' '));
  const body = decodeURIComponent(url.split('&body=')[1]);
  assert.ok(body.includes('Name: Nimal Perera'));
});

test('copy text includes recipient and subject', () => {
  const text = buildEnquiryText(valid, 'hello@example.com');
  assert.ok(text.startsWith('To: hello@example.com\nSubject: Project enquiry: Linux and NGINX Support – Nimal Perera'));
});

test('service names from other pages map to form options', async () => {
  const { matchService } = await import('../src/utils/enquiry.js');
  assert.equal(matchService('Linux Server Support'), 'Linux and NGINX Support');
  assert.equal(matchService('Website Development'), 'Website Design and Development');
  assert.equal(matchService('Cloud Server Management'), 'Cloud and Deployment Support');
  assert.equal(matchService('Technical Consulting'), 'Technical Consulting');
  assert.equal(matchService('Something unrelated'), '');
  assert.equal(matchService(undefined), '');
});
