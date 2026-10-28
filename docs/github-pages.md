# GitHub Pages deployment

The public website is a free static site on GitHub Pages:

**https://serenovatech.github.io/**

It is an *organization site*: the repository is `serenovatech/serenovatech.github.io`,
so the site is served from the root of the address (no `/repo-name/` path).
The old VMware/VPS deployment (`.github/workflows/deploy.yml`) only runs when started manually from the Actions tab.

## How the static build works

`npm run build:pages` builds in the `ghpages` mode, using the settings in
[`deploy/github-pages/.env.ghpages`](../deploy/github-pages/.env.ghpages):

| Setting | Value | Why |
| --- | --- | --- |
| `VITE_BASE_PATH` | `/` | An organization site is served from the root |
| `VITE_SITE_URL` | `https://serenovatech.github.io/` | Absolute canonical, Open Graph and sitemap URLs |
| `VITE_STATIC_SITE` | `true` | There is no Express API, so API calls, the admin CMS and API-backed forms are switched off |
| `VITE_ROUTER` | `browser` | Real page URLs such as `/about/` that search engines can index |
| `VITE_GOOGLE_SITE_VERIFICATION` | *(empty)* | Google Search Console verification code |
| `VITE_BING_SITE_VERIFICATION` | *(empty)* | Bing Webmaster Tools verification code |

After the build, `vite.config.js` (using [`scripts/static-pages.js`](../scripts/static-pages.js)) writes:

- **One HTML file per page** (`about/index.html`, `contact/index.html`, `services/<slug>/index.html`, …)
  with that page's title, description, canonical URL and social preview tags from
  [`src/data/seo.js`](../src/data/seo.js). Every page URL returns HTTP 200, so refreshing or sharing any page works.
- **`404.html`**, which GitHub serves for unknown URLs. It is marked `noindex`, and the app sends visitors to the home page.
- **`sitemap.xml`** and **`robots.txt`** for search engines.

Links in the old format (`…/#/about`) are redirected to the real page (`/about`) by `src/main.jsx`.

### Adding a page

Add its route in `src/App.jsx` and its title and description in `src/data/seo.js`.
The page file and sitemap entry are generated automatically. Unit tests check that every page has a unique title and a description under 160 characters.

## Updating the site

1. Make your changes on a branch.
2. Check them locally:
   ```bash
   npm test
   npm run preview:pages   # builds, then serves http://localhost:4173/
   ```
3. Push the branch, open a pull request and wait for the **Lint, test & build** check.
4. Merge into `main`. The **Deploy static site to GitHub Pages** workflow publishes the site in about a minute.
   If any step fails, the site is not updated and the failed run shows up in the Actions tab.

## Contact details

Public contact details live in [`src/data/companyInfo.js`](../src/data/companyInfo.js).
An empty value (`""`) hides that contact method and social link on the live site.

## Search engine verification

1. In Google Search Console, add a **URL prefix** property for `https://serenovatech.github.io/`
   and choose the **HTML tag** verification method.
2. Copy only the `content="…"` value into `VITE_GOOGLE_SITE_VERIFICATION` in `deploy/github-pages/.env.ghpages`
   (for Bing Webmaster Tools, use `VITE_BING_SITE_VERIFICATION`).
3. Merge the change, wait for the deployment, then click **Verify**.

The codes are public by design (they appear in the page source), so committing them is safe.

Google Search Console is currently verified with the **HTML file** method instead:
`public/googled01d7b930a509d66.html`. Keep that file, or Google will drop the verification.

## Adding a custom domain later (e.g. serenovatech.com)

1. Buy the domain.
2. At your DNS provider, add a `CNAME` record pointing `www` to `serenovatech.github.io`,
   and `A` records for the bare domain to GitHub's Pages IPs:
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
3. In **Settings → Pages → Custom domain**, enter the domain and save. Tick **Enforce HTTPS** once the certificate is issued.
4. Update `deploy/github-pages/.env.ghpages`:
   ```
   VITE_SITE_URL=https://www.serenovatech.com/
   ```
   `VITE_BASE_PATH` stays `/`.
5. Commit and merge. Then add the new domain as a property in Google Search Console and submit its sitemap.
