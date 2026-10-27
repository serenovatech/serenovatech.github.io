import { test } from 'node:test';
import assert from 'node:assert/strict';

import { getContactMethods } from '../src/data/contactData.js';

test('unconfigured contact methods are unavailable and have no link', () => {
  const methods = getContactMethods({ email: '', whatsappUrl: '', socials: { linkedin: '', github: '' } });
  assert.equal(methods.length, 4);
  for (const method of methods) {
    assert.equal(method.available, false);
    assert.equal(method.href, '');
  }
});

test('configured contact methods link to the right destinations', () => {
  const methods = getContactMethods({
    email: 'hello@example.com',
    whatsappUrl: 'https://wa.me/94770000000',
    socials: { linkedin: 'https://www.linkedin.com/company/example', github: 'https://github.com/example' }
  });
  const byId = Object.fromEntries(methods.map((m) => [m.id, m]));
  assert.equal(byId.email.href, 'mailto:hello@example.com');
  assert.equal(byId.whatsapp.href, 'https://wa.me/94770000000');
  assert.equal(byId.linkedin.href, 'https://www.linkedin.com/company/example');
  assert.equal(byId.github.href, 'https://github.com/example');
  assert.ok(methods.every((m) => m.available));
});

test('placeholder-looking values never leak because empty strings are ignored', () => {
  const methods = getContactMethods({ email: '   ', socials: {} });
  assert.equal(methods.find((m) => m.id === 'email').available, false);
});
