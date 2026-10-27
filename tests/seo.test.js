import { test } from 'node:test';
import assert from 'node:assert/strict';

import { metaForPath, pageMeta, publicPaths } from '../src/data/seo.js';
import { applyPageMeta, buildRobots, buildSitemap, pageFile, pageUrl } from '../scripts/static-pages.js';

const SITE = 'https://serenovatech.github.io/';

const TEMPLATE = `<head>
<title>Old</title>
<meta name="title" content="Old" />
<meta name="description" content="Old description" />
<link rel="canonical" href="https://example.com/" />
<meta property="og:url" content="https://example.com/" />
<meta property="og:title" content="Old" />
<meta property="og:description" content="Old" />
<meta property="twitter:url" content="https://example.com/" />
<meta property="twitter:title" content="Old" />
<meta property="twitter:description" content="Old" />
</head>`;

test('every page has a title and a description of sensible length', () => {
  for (const path of publicPaths()) {
    const meta = metaForPath(path);
    assert.ok(meta.title.includes('Serenova Tech'), `${path} title should name the brand`);
    assert.ok(meta.description.length >= 70 && meta.description.length <= 160, `${path} description is ${meta.description.length} chars`);
  }
});

test('titles are unique across pages', () => {
  const titles = publicPaths().map((p) => metaForPath(p).title);
  assert.equal(new Set(titles).size, titles.length);
});

test('service pages and trailing slashes resolve', () => {
  assert.match(metaForPath('/services/linux-server-support').title, /^Linux Server Support/);
  assert.equal(metaForPath('/about/').title, pageMeta['/about'].title);
  assert.equal(metaForPath('/does-not-exist').title, pageMeta['/'].title);
});

test('page URLs and output files match GitHub Pages folder layout', () => {
  assert.equal(pageUrl(SITE, '/'), SITE);
  assert.equal(pageUrl(SITE, '/about'), `${SITE}about/`);
  assert.equal(pageUrl(SITE, '/services/website-development'), `${SITE}services/website-development/`);
  assert.equal(pageFile('/'), 'index.html');
  assert.equal(pageFile('/contact'), 'contact/index.html');
});

test('page meta is written into the HTML and escaped', () => {
  const html = applyPageMeta(TEMPLATE, { title: 'A & B "Co"', description: 'Desc <x>', url: `${SITE}about/` });
  assert.ok(html.includes('<title>A &amp; B &quot;Co&quot;</title>'));
  assert.ok(html.includes('<meta name="description" content="Desc &lt;x&gt;" />'));
  assert.ok(html.includes(`<link rel="canonical" href="${SITE}about/" />`));
  assert.ok(html.includes(`<meta property="og:url" content="${SITE}about/" />`));
  assert.ok(html.includes('<meta property="twitter:title" content="A &amp; B &quot;Co&quot;" />'));
  assert.ok(!html.includes('Old'));
});

test('the 404 page is noindex and has no canonical', () => {
  const html = applyPageMeta(TEMPLATE, { title: 'T', description: 'D', noindex: true });
  assert.ok(html.includes('<meta name="robots" content="noindex" />'));
  assert.ok(!html.includes('rel="canonical"'));
});

test('sitemap lists every page once and robots points to it', () => {
  const xml = buildSitemap(SITE, publicPaths(), '2026-10-28');
  assert.equal((xml.match(/<loc>/g) || []).length, publicPaths().length);
  assert.ok(xml.includes(`<loc>${SITE}about/</loc>`));
  assert.ok(xml.includes('<lastmod>2026-10-28</lastmod>'));
  assert.equal(buildRobots(SITE), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}sitemap.xml\n`);
});
