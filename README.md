# Serenova Tech website

React 19 + Vite 8 frontend (React Router 7, lucide-react, custom CSS) with an optional Express + MySQL API and admin CMS in `server/`.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Vite dev server (proxies `/api` to the Express server on port 5000) |
| `npm run server` | Express API |
| `npm run build` | Full build for the VPS (API, admin CMS, clean URLs) |
| `npm run build:pages` | Static build for GitHub Pages (no API, hash routing, `/Serenova-techno/` base path) |
| `npm run preview:pages` | Build the static site and preview it at http://localhost:4173/Serenova-techno/ |
| `npm test` | Unit tests (Node's built-in test runner) |
| `npm run lint` | oxlint |

## Deployment

- **VPS:** `.github/workflows/deploy.yml` (self-hosted runner, PM2, Nginx)
- **GitHub Pages:** `.github/workflows/pages.yml`. See [docs/github-pages.md](docs/github-pages.md).
