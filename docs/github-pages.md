# GitHub Pages deployment

The public website can be published as a free static site on GitHub Pages:

**https://teenshirt.github.io/Serenova-techno/**

GitHub Pages is now the live host. The old VMware/VPS deployment (`.github/workflows/deploy.yml`) only runs when started manually from the Actions tab.

## How the static build differs

`npm run build:pages` builds in the `ghpages` mode, using the settings in
[`deploy/github-pages/.env.ghpages`](../deploy/github-pages/.env.ghpages):

| Setting | Value | Why |
| --- | --- | --- |
| `VITE_BASE_PATH` | `/Serenova-techno/` | A project site is served from `/<repo-name>/` |
| `VITE_SITE_URL` | `https://teenshirt.github.io/Serenova-techno/` | Absolute canonical and Open Graph URLs |
| `VITE_STATIC_SITE` | `true` | There is no Express API, so API calls, the admin CMS and API-backed forms are switched off |
| `VITE_ROUTER` | `hash` | URLs look like `/#/about`, so refreshing any page works without server rewrites |

The static build also writes a `404.html` that forwards links without the hash
(for example `/Serenova-techno/about`) to `/Serenova-techno/#/about`.

The `ghpages` build reads env files only from `deploy/github-pages/`, so the server's `.env` (which holds secrets and `NODE_ENV=development`) never affects it.

## One-time setup

1. Push the branch with these changes to GitHub, then merge it into `main` (see below).
2. On GitHub, open **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Open the **Actions** tab. The **Deploy static site to GitHub Pages** workflow runs on every push to `main`. You can also start it by hand with **Run workflow**.
5. When the run finishes, the site URL is shown on the deploy job.

## Updating the site

1. Make your changes on a branch.
2. Check them locally:
   ```bash
   npm test
   npm run build:pages
   npx vite preview --mode ghpages   # open the printed URL, e.g. http://localhost:4173/Serenova-techno/
   ```
3. Commit, push and merge into `main`. The workflow lints, tests, builds and publishes the site automatically. If any step fails, the site is not updated and the failed run shows up in the Actions tab.

## Contact details

Public contact details live in [`src/data/companyInfo.js`](../src/data/companyInfo.js).
An empty value (`""`) hides that contact method and social link on the live site.
Fill in `whatsappUrl`, `socials.linkedin` and `socials.github` once the public business profiles exist.

## Adding a custom domain later

1. Buy a domain and decide on the host name, e.g. `www.example.com`.
2. At your DNS provider, add a `CNAME` record pointing `www` to `teenshirt.github.io`.
   For the bare domain (`example.com`), add `A` records for GitHub's Pages IPs:
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
3. In **Settings → Pages → Custom domain**, enter the domain and save. Tick **Enforce HTTPS** once the certificate is issued.
4. The site will then be served from the domain root, so update `deploy/github-pages/.env.ghpages`:
   ```
   VITE_BASE_PATH=/
   VITE_SITE_URL=https://www.example.com/
   ```
5. Commit and push. With a custom domain you could also switch to clean URLs, but hash routing keeps working and needs no extra setup.
