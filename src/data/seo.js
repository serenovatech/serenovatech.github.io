// Page titles and descriptions, used in the browser (RouteMeta in App.jsx) and at
// build time to write a real HTML file per page for search engines and link
// previews (scripts/static-pages.js). Keep descriptions accurate and under ~160
// characters; never promise rankings or results.
import { servicesData } from './servicesData.js';

export const SITE_NAME = 'Serenova Tech';

const DESCRIPTION_LIMIT = 158;

export const pageMeta = {
  '/': {
    title: 'Serenova Tech | IT Infrastructure, Server Support & Web Development',
    description:
      'Websites and IT support for small businesses in Sri Lanka and worldwide: we build websites, keep them online and secure, and fix server and network problems.'
  },
  '/services': {
    title: 'IT & Web Services | Serenova Tech',
    description:
      'Linux server support, NGINX web hosting, website development, deployment and maintenance, cloud servers, Windows Server, networking and IT consulting.'
  },
  '/solutions': {
    title: 'Technology Solutions for Small Businesses | Serenova Tech',
    description:
      'Practical technology solutions for small businesses, startups, agencies and freelancers that need reliable websites, servers and IT infrastructure.'
  },
  '/projects': {
    title: 'Projects & Experience | Serenova Tech',
    description:
      'Serenova Tech projects and hands-on experience: business websites, a poultry farm management application, Windows Server labs and network infrastructure work.'
  },
  '/about': {
    title: 'About Serenova Tech | IT Infrastructure & Web Development in Sri Lanka',
    description:
      'Serenova Tech helps small businesses build reliable digital foundations with IT infrastructure support, Linux and NGINX administration and web development.'
  },
  '/how-we-work': {
    title: 'How We Work | Serenova Tech',
    description:
      'How Serenova Tech approaches a project: understanding your requirements, agreeing scope and cost, delivering the work and supporting it afterwards.'
  },
  '/faq': {
    title: 'Frequently Asked Questions | Serenova Tech',
    description:
      'Plain answers to common questions about working with Serenova Tech: who we help, remote support, prices, quotes and what happens after a project.'
  },
  '/contact': {
    title: 'Contact Serenova Tech | Website, Server & IT Support Enquiries',
    description:
      'Tell Serenova Tech about your website, Linux or NGINX server, hosting, networking or IT infrastructure project and explore a practical next step.'
  }
};

function trimDescription(text) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  if (clean.length <= DESCRIPTION_LIMIT) return clean;
  return `${clean.slice(0, DESCRIPTION_LIMIT - 1).replace(/[\s,.;:]+\S*$/, '')}…`;
}

function serviceMeta(service) {
  return {
    title: `${service.title} | ${SITE_NAME}`,
    description: trimDescription(service.plainDesc || service.shortDesc || service.fullDesc)
  };
}

// Meta for a route path such as "/about" or "/services/linux-server-support".
export function metaForPath(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (pageMeta[path]) return { path, ...pageMeta[path] };

  const serviceMatch = path.match(/^\/services\/([^/]+)$/);
  const service = serviceMatch && servicesData.find((s) => s.slug === serviceMatch[1]);
  if (service) return { path, ...serviceMeta(service) };

  return { path: '/', ...pageMeta['/'] };
}

// Every public page that should get its own HTML file and sitemap entry.
export function publicPaths() {
  return [...Object.keys(pageMeta), ...servicesData.map((s) => `/services/${s.slug}`)];
}
