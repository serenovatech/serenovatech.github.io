import { useEffect } from 'react';
import { SITE_URL, USE_HASH_ROUTER } from '../config/site';

const META_TAGS = [
  ['name', 'description', 'description'],
  ['property', 'og:title', 'title'],
  ['property', 'og:description', 'description'],
  ['property', 'og:url', 'url'],
  ['property', 'twitter:title', 'title'],
  ['property', 'twitter:description', 'description'],
  ['property', 'twitter:url', 'url']
];

function pageUrl(path) {
  if (!SITE_URL) return '';
  const route = path.replace(/^\/+/, '');
  if (!route) return SITE_URL;
  return USE_HASH_ROUTER ? `${SITE_URL}#/${route}` : `${SITE_URL}${route}`;
}

// Sets the document title, description, canonical URL and social tags for a
// page, and restores the previous values when the page unmounts.
export default function usePageMeta({ title, description, path = '/' }) {
  useEffect(() => {
    const values = { title, description, url: pageUrl(path) };
    const previousTitle = document.title;
    const restore = [];

    document.title = title;

    for (const [attr, key, field] of META_TAGS) {
      const value = values[field];
      if (!value) continue;
      let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      restore.push([tag, tag.getAttribute('content')]);
      tag.setAttribute('content', value);
    }

    let canonical = document.head.querySelector('link[rel="canonical"]');
    const previousCanonical = canonical?.getAttribute('href');
    if (values.url) {
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', values.url);
    }

    return () => {
      document.title = previousTitle;
      for (const [tag, content] of restore) {
        if (content === null) tag.remove();
        else tag.setAttribute('content', content);
      }
      if (canonical && values.url) {
        if (previousCanonical) canonical.setAttribute('href', previousCanonical);
        else canonical.remove();
      }
    };
  }, [title, description, path]);
}
