// Build-time helpers for the static (GitHub Pages) site: give every page its own
// HTML file with the right title, description, canonical and social tags, plus a
// sitemap.xml and robots.txt. Used by vite.config.js; tested in tests/.

const escapeAttr = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Absolute URL for a route. GitHub Pages serves /about/ (and redirects /about to
// it), so every page except the home page ends with a slash.
export function pageUrl(siteUrl, path) {
  const route = path.replace(/^\/+|\/+$/g, '');
  return route ? `${siteUrl}${route}/` : siteUrl;
}

// Output file for a route: "/" -> "index.html", "/about" -> "about/index.html".
export function pageFile(path) {
  const route = path.replace(/^\/+|\/+$/g, '');
  return route ? `${route}/index.html` : 'index.html';
}

function setMetaContent(html, attr, key, value) {
  const pattern = new RegExp(`(<meta\\s+${attr}="${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"\\s+content=")[^"]*(")`);
  return html.replace(pattern, `$1${escapeAttr(value)}$2`);
}

export function applyPageMeta(html, { title, description, url, noindex = false }) {
  let out = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(title)}</title>`);
  out = setMetaContent(out, 'name', 'title', title);
  out = setMetaContent(out, 'name', 'description', description);
  for (const key of ['og:title', 'twitter:title']) out = setMetaContent(out, 'property', key, title);
  for (const key of ['og:description', 'twitter:description']) out = setMetaContent(out, 'property', key, description);
  if (url) {
    for (const key of ['og:url', 'twitter:url']) out = setMetaContent(out, 'property', key, url);
    out = out.replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/, `$1${escapeAttr(url)}$2`);
  }
  if (noindex) {
    out = out.replace(/<link\s+rel="canonical"[^>]*>\s*/, '');
    out = out.replace('</head>', '  <meta name="robots" content="noindex" />\n  </head>');
  }
  return out;
}

export function buildSitemap(siteUrl, paths, lastmod) {
  const urls = paths
    .map((path) => `  <url>\n    <loc>${escapeAttr(pageUrl(siteUrl, path))}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
    .join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function buildRobots(siteUrl) {
  return `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}sitemap.xml\n`;
}
