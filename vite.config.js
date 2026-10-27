import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// GitHub Pages serves a 404.html for unknown paths. With hash routing, a link such
// as /Serenova-techno/about (no "#") would otherwise show GitHub's 404 page, so we
// emit a tiny page that forwards it to /Serenova-techno/#/about.
function hashRouteFallback(base) {
  return {
    name: 'hash-route-404-fallback',
    apply: 'build',
    generateBundle() {
      const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Serenova Tech</title>
<meta name="robots" content="noindex">
<script>
  (function () {
    var base = ${JSON.stringify(base)};
    var path = window.location.pathname;
    var route = path.indexOf(base) === 0 ? path.slice(base.length) : '';
    window.location.replace(base + (route ? '#/' + route : '') + window.location.search);
  })();
</script>
</head>
<body><p><a href="${base}">Go to the Serenova Tech home page</a></p></body>
</html>
`
      this.emitFile({ type: 'asset', fileName: '404.html', source: html })
    }
  }
}

// index.html uses __SITE_URL__ for canonical, Open Graph and JSON-LD URLs, which
// must be absolute. Without VITE_SITE_URL (e.g. the VPS build) those tags are dropped.
function siteUrlTags(siteUrl) {
  return {
    name: 'site-url-tags',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        if (siteUrl) return html.replaceAll('__SITE_URL__', siteUrl)
        return html.split('\n').filter((line) => !line.includes('__SITE_URL__')).join('\n')
      }
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
      siteUrlTags(env.VITE_SITE_URL),
      env.VITE_ROUTER === 'hash' && hashRouteFallback(base)
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
