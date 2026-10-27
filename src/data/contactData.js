// Content and helpers for the Contact Us page.

// Builds the list of contact methods from companyInfo. Methods without a
// configured value are marked unavailable so the page can hide them in
// production and flag them during development, instead of rendering broken links.
export function getContactMethods(info) {
  const email = (info.email || '').trim();
  const whatsappUrl = (info.whatsappUrl || '').trim();
  const linkedin = (info.socials?.linkedin || '').trim();
  const github = (info.socials?.github || '').trim();

  return [
    {
      id: 'email',
      label: 'Business email',
      description: 'Best for project details, quotes and files.',
      value: email,
      href: email ? `mailto:${email}` : '',
      action: 'Send an email',
      external: false
    },
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      description: 'For quick questions and follow-ups.',
      value: whatsappUrl ? 'Chat on WhatsApp' : '',
      href: whatsappUrl,
      action: 'Open WhatsApp chat',
      external: true
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      description: 'Professional background and updates.',
      value: linkedin ? 'Serenova Tech on LinkedIn' : '',
      href: linkedin,
      action: 'View LinkedIn profile',
      external: true
    },
    {
      id: 'github',
      label: 'GitHub',
      description: 'Public code and technical work.',
      value: github ? 'Serenova Tech on GitHub' : '',
      href: github,
      action: 'View GitHub profile',
      external: true
    }
  ].map((method) => ({ ...method, available: Boolean(method.href) }));
}

export const serviceCategories = [
  'Website design & development',
  'Linux & NGINX support',
  'Server hosting & management',
  'IT infrastructure & networking',
  'Cloud & deployment support',
  'Technical consulting'
];

export const quoteTips = [
  'What you want to achieve, or the problem you are facing',
  'Your current setup, such as hosting provider, server OS or website platform',
  'Any deadline or important dates',
  'A rough budget range, if you have one',
  'Links to your existing website or examples you like'
];

export const contactFaqs = [
  {
    question: 'What kind of projects can I enquire about?',
    answer:
      'Websites for small businesses, Linux and NGINX server support, website hosting and deployment, SSL and DNS configuration, IT infrastructure and networking help, and general technical consulting. If you are not sure whether your project fits, send a short description and we will tell you honestly.'
  },
  {
    question: 'How is pricing decided?',
    answer:
      'Every project is different, so scope, timelines and pricing depend on your requirements. After understanding what you need, we will explain the recommended approach, what is included and what it is likely to cost before any work begins.'
  },
  {
    question: 'Do you work with businesses outside Sri Lanka?',
    answer:
      'Yes. Many services, such as server administration, hosting and website work, can be delivered remotely for businesses in Sri Lanka and internationally.'
  },
  {
    question: 'What happens when I use the enquiry form?',
    answer:
      'The form does not send anything by itself. It prepares an email draft in your own email app with your details filled in. You review it and press Send. If your email app does not open, you can copy the details and email them to us directly.'
  },
  {
    question: 'I only need a small fix. Is that okay?',
    answer:
      'Yes. Small, well-defined tasks, such as fixing an SSL certificate, an NGINX configuration problem or a DNS issue, are welcome enquiries.'
  }
];
