// Build-time switches for the public website.
//
// The GitHub Pages build (`npm run build:pages`, see .env.ghpages) is a purely
// static site: there is no Express API behind it, so API calls, the admin CMS
// and API-backed forms are disabled. Every page gets its own HTML file at build
// time (see vite.config.js), so real URLs such as /about/ work on refresh.
// VITE_ROUTER=hash is still supported for hosts that can't serve per-page files.

export const IS_STATIC_SITE = import.meta.env.VITE_STATIC_SITE === 'true';

export const USE_HASH_ROUTER = import.meta.env.VITE_ROUTER === 'hash';

// Public URL of the deployed site (with trailing slash), used for canonical
// and Open Graph tags. Empty when not configured.
export const SITE_URL = import.meta.env.VITE_SITE_URL || '';

// Resolve a file from /public against the deployment base path, so that
// "/assets/logo.png" also works when the site is served from a sub-path such as /repo-name/.
export function assetUrl(path) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
}
