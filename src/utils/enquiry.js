// Project enquiry helpers for the Contact page.
//
// There is no backend: the form never sends anything itself. It validates the
// visitor's input and turns it into an email draft (mailto:) or plain text the
// visitor can copy. Nothing here touches storage, analytics or the network.

export const SERVICE_OPTIONS = [
  'Website Design and Development',
  'Linux and NGINX Support',
  'Server Hosting and Management',
  'IT Infrastructure and Networking',
  'Cloud and Deployment Support',
  'Technical Consulting',
  'Other'
];

export const BUDGET_OPTIONS = [
  'Not sure yet',
  'Under LKR 50,000',
  'LKR 50,000 – 150,000',
  'LKR 150,000 – 500,000',
  'Above LKR 500,000',
  'Prefer to discuss'
];

export const CONTACT_METHOD_OPTIONS = ['Email', 'Phone call', 'WhatsApp', 'Video call'];

// Methods that need a phone number to be useful.
export const PHONE_METHODS = ['Phone call', 'WhatsApp'];

export const DESCRIPTION_MIN = 20;
export const DESCRIPTION_MAX = 2000;

export const EMPTY_ENQUIRY = {
  name: '',
  email: '',
  company: '',
  service: '',
  budget: '',
  contactMethod: 'Email',
  phone: '',
  description: '',
  consent: false
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[0-9\s()-]{7,20}$/;

export function isValidEmail(value) {
  return EMAIL_PATTERN.test(String(value).trim());
}

// Returns { fieldName: message } for every invalid field; empty object when valid.
export function validateEnquiry(values) {
  const errors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const description = values.description.trim();

  if (!name) {
    errors.name = 'Please enter your full name.';
  } else if (name.length < 2) {
    errors.name = 'Your name should be at least 2 characters.';
  }

  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (!isValidEmail(email)) {
    errors.email = 'Please enter a valid email address, for example name@company.com.';
  }

  if (!values.service) {
    errors.service = 'Please choose the service you need.';
  }

  if (PHONE_METHODS.includes(values.contactMethod)) {
    const phone = values.phone.trim();
    if (!phone) {
      errors.phone = `Please add a phone number so we can reach you by ${values.contactMethod.toLowerCase()}.`;
    } else if (!PHONE_PATTERN.test(phone)) {
      errors.phone = 'Please enter a valid phone number, including the country code if outside Sri Lanka.';
    }
  }

  if (!description) {
    errors.description = 'Please describe your project or the problem you need help with.';
  } else if (description.length < DESCRIPTION_MIN) {
    errors.description = `Please add a little more detail (at least ${DESCRIPTION_MIN} characters).`;
  } else if (description.length > DESCRIPTION_MAX) {
    errors.description = `Please keep the description under ${DESCRIPTION_MAX} characters.`;
  }

  if (!values.consent) {
    errors.consent = 'Please confirm you understand how your enquiry is sent.';
  }

  return errors;
}

export function buildEnquirySubject(values) {
  return `Project enquiry: ${values.service || 'General'} – ${values.name.trim()}`;
}

export function buildEnquiryBody(values) {
  const lines = [
    'Hello Serenova Tech,',
    '',
    'I would like to discuss a project.',
    '',
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`
  ];

  if (values.company.trim()) lines.push(`Company / organization: ${values.company.trim()}`);
  lines.push(`Service required: ${values.service}`);
  if (values.budget) lines.push(`Project budget: ${values.budget}`);
  lines.push(`Preferred contact method: ${values.contactMethod}`);
  if (PHONE_METHODS.includes(values.contactMethod) && values.phone.trim()) {
    lines.push(`Phone: ${values.phone.trim()}`);
  }

  lines.push('', 'Project description:', values.description.trim(), '', 'Thank you.');
  return lines.join('\n');
}

// Plain-text version for the "copy details" fallback.
export function buildEnquiryText(values, recipient) {
  return [
    recipient ? `To: ${recipient}` : null,
    `Subject: ${buildEnquirySubject(values)}`,
    '',
    buildEnquiryBody(values)
  ].filter((line) => line !== null).join('\n');
}

export function buildMailtoUrl(recipient, values) {
  // encodeURIComponent (not URLSearchParams) so spaces become %20, which every
  // mail client understands, and line breaks become %0A.
  const subject = encodeURIComponent(buildEnquirySubject(values));
  const body = encodeURIComponent(buildEnquiryBody(values).replace(/\n/g, '\r\n'));
  return `mailto:${encodeURIComponent(recipient).replace(/%40/g, '@')}?subject=${subject}&body=${body}`;
}

// Maps free text (e.g. a service title from another page) to the closest form option.
const SERVICE_KEYWORDS = [
  [/linux|nginx/i, 'Linux and NGINX Support'],
  [/cloud|deploy|devops/i, 'Cloud and Deployment Support'],
  [/web ?site|web development|web app|design/i, 'Website Design and Development'],
  [/network|infrastructure|wifi|wireless/i, 'IT Infrastructure and Networking'],
  [/hosting|server|vps|maintenance/i, 'Server Hosting and Management'],
  [/consult|audit|advice/i, 'Technical Consulting']
];

export function matchService(text) {
  if (!text || typeof text !== 'string') return '';
  if (SERVICE_OPTIONS.includes(text)) return text;
  const match = SERVICE_KEYWORDS.find(([pattern]) => pattern.test(text));
  return match ? match[1] : '';
}
