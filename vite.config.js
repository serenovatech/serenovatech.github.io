import fs from 'node:fs'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { metaForPath, publicPaths } from './src/data/seo.js'
import { applyPageMeta, buildRobots, buildSitemap, pageFile, pageUrl } from './scripts/static-pages.js'

// index.html uses __PLACEHOLDER__ tokens for values that differ per deployment
// (site URL, search-engine verification codes). A line whose token has no value
// is dropped, e.g. canonical/Open Graph URLs on the VPS build, which has no VITE_SITE_URL.
function htmlPlaceholders(values) {
  return {
    name: 'html-placeholders',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html
          .split('\n')
          .filter((line) => !Object.entries(values).some(([token, value]) => !value && line.includes(token)))
          .join('\n')
          .replace(/__[A-Z_]+__/g, (token) => values[token] ?? token)
      }
    }
  }
}

// Static hosting has no server to render pages, so after the build write a copy
// of index.html for every public page (about/index.html, contact/index.html, …)
// with that page's title, description and canonical URL. Search engines and link
// previews then see the right details, and every page URL returns HTTP 200.
// Also writes 404.html (served by GitHub Pages for unknown URLs), sitemap.xml and robots.txt.
function staticPages(siteUrl) {
  return {
    name: 'static-pages',
    apply: 'build',
    writeBundle(options) {
      const outDir = options.dir
      const template = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8')
      const paths = publicPaths()

      for (const route of paths) {
        const meta = metaForPath(route)
        const file = path.join(outDir, pageFile(route))
        fs.mkdirSync(path.dirname(file), { recursive: true })
        fs.writeFileSync(file, applyPageMeta(template, { ...meta, url: pageUrl(siteUrl, route) }))
      }

      // The app still loads on unknown URLs and its catch-all route sends visitors home.
      fs.writeFileSync(path.join(outDir, '404.html'), applyPageMeta(template, { ...metaForPath('/'), noindex: true }))

      const today = new Date().toISOString().slice(0, 10)
      fs.writeFileSync(path.join(outDir, 'sitemap.xml'), buildSitemap(siteUrl, paths, today))
      fs.writeFileSync(path.join(outDir, 'robots.txt'), buildRobots(siteUrl))
    }
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // The static GitHub Pages build reads its settings from deploy/github-pages/
  // only, so the server's .env (secrets, NODE_ENV=development) never affects it.
  const envDir = mode === 'ghpages' ? 'deploy/github-pages' : process.cwd()
  const env = loadEnv(mode, envDir, 'VITE_')
  const base = env.VITE_BASE_PATH || '/'

  return {
    base,
    envDir,
    plugins: [
      react(),
      htmlPlaceholders({
        __SITE_URL__: env.VITE_SITE_URL,
        __GOOGLE_SITE_VERIFICATION__: env.VITE_GOOGLE_SITE_VERIFICATION,
        __BING_SITE_VERIFICATION__: env.VITE_BING_SITE_VERIFICATION
      }),
      env.VITE_STATIC_SITE === 'true' && env.VITE_SITE_URL && staticPages(env.VITE_SITE_URL)
    ],
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:5000',
          changeOrigin: true,
          secure: false
        },
        '/uploads': {
          target: 'http://127.0.0.1:5000',
          changeOrigin: true,
          secure: false
        }
      }
    }
  }
})
