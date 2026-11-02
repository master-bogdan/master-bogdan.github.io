# Personal Website

A static React terminal portfolio built with Vite, TypeScript, Material UI, and local Markdown posts.

## Requirements

- Node.js `>=24.15.0 <25`
- npm `>=11 <12`

Both requirements are enforced by `engines` and `devEngines`. Dependency versions are pinned exactly in `package.json` and `package-lock.json`.

## Setup

```bash
npm ci
npx playwright install chromium
npm run dev
```

The production site is served below `/personal-website/` by default. Override it with `VITE_BASE_PATH` when a deployment uses a different root-relative path. Traversal, protocol-relative paths, query strings, fragments, and special characters fail the build.

## GitHub Pages

This standalone repository is the home for the public portfolio. The original homelab copy is retained separately; changes are not synchronized automatically.

The deployment URL is `https://master-bogdan.github.io/personal-website/` once Pages is enabled and the workflow succeeds.

1. Push this repository to `master-bogdan/personal-website` on `main`.
2. In **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source.
3. Run **Validate and deploy website** from the Actions tab, or rerun the first workflow if it ran before Pages was enabled.

The workflow installs the Node version in `.nvmrc` and npm `11.17.0`, then runs formatting, lint, TypeScript, coverage, the production build, and Chromium tests. Pull requests run validation only. Successful pushes to `main` publish `build/` using GitHub's Pages actions and the built-in `GITHUB_TOKEN`; no personal access token is needed.

The workflow sets `VITE_BASE_PATH=/personal-website/`. For a custom domain, configure the domain in Pages settings and set the repository Actions variable `VITE_BASE_PATH` to `/`, then redeploy. The same override works locally:

```bash
VITE_BASE_PATH=/ npm run validate
```

For the standard repository URL, use `npm run validate`. The browser tests use the production base path, including overrides from `.env.production` or the environment. Do not commit local environment files or put secrets in `VITE_` variables; their values can become part of the browser bundle.

### Public CV

The current public CV is `public/Bogdan_Shchavinskyi_CV.pdf`. The `resume` command downloads it with that filename and also links to LinkedIn. The no-JavaScript profile includes the same download. The PDF is copied into the published site during the build.

When replacing the CV, keep the public filename stable and update `whoami`, banner text, and SEO/profile metadata in `index.html` to match. Run `npm run assets:generate` after banner changes so the social preview stays current, then run `npm run validate`.

## Favicon, Sharing, and Search

`index.html` contains the page title, description, canonical URL, Open Graph and Twitter sharing metadata, and Person structured data using the existing public profile details. These are present in the initial HTML without running JavaScript. A `noscript` profile gives visitors with JavaScript disabled a short introduction and links to GitHub and LinkedIn.

The favicon uses the banner's cyan and green terminal styling. The sharing preview uses the existing banner on a 1200 × 630 background. After editing `public/favicon.svg` or `public/banner.svg`, regenerate the committed PNG assets:

```bash
npm run assets:generate
```

This uses the existing Playwright Chromium installation; it is not part of the production build.

The homepage sitemap is published at `https://master-bogdan.github.io/personal-website/sitemap.xml`. Add the site as a URL-prefix property in Google Search Console, verify ownership using Google's supplied HTML verification file in `public/` or meta tag in `index.html`, then submit the sitemap. Indexing and search appearance are controlled by search engines, not guaranteed by these files.

When changing the public domain or deployment path, update the absolute URLs in `index.html` and `public/sitemap.xml` along with `VITE_BASE_PATH`. Favicon and touch-icon links already follow the Vite base path. The canonical and sharing URLs intentionally point to production even during local development.

GitHub Pages project sites live under a subdirectory. A `robots.txt` inside this repository would not control crawling: search engines read it from the hostname root. Google also chooses search-result favicons per hostname, so this project's browser favicon may not appear separately in Google results. A custom domain gives the site its own hostname.

The sitemap includes only the homepage because blog posts currently open inside the terminal, without individual URLs. Independent post indexing would require real post URLs and crawlable post content.

## Commands

| Command                   | Purpose                                                           |
| ------------------------- | ----------------------------------------------------------------- |
| `npm run assets:generate` | Regenerate favicon PNGs, Apple touch icon, and sharing preview    |
| `npm run dev`             | Start the Vite development server                                 |
| `npm run build`           | Type-check, validate posts, and write the static site to `build/` |
| `npm run preview`         | Preview the production build                                      |
| `npm test`                | Run Vitest once                                                   |
| `npm run test:watch`      | Run Vitest in watch mode                                          |
| `npm run test:coverage`   | Enforce 80% statements, branches, functions, and lines            |
| `npm run test:e2e`        | Run the Chromium Playwright journey                               |
| `npm run lint`            | Run ESLint with zero warnings                                     |
| `npm run format:check`    | Check Prettier formatting                                         |
| `npm run validate`        | Run every production gate                                         |

## Write A Blog Post

Add a `.md` file to `content/blog/`:

```markdown
---
title: A Useful Title
date: 2026-08-10
slug: useful-title
---

# A Useful Title

Post content goes here.
```

Commit and push a post to `main` to rebuild and deploy it. Markdown is bundled at build time; GitHub Pages needs no application server or Jekyll configuration. All posts in this directory become public. Posts open inside the terminal and do not currently have individual page URLs.

`title`, `date`, and `slug` are required non-empty strings. Dates use `YYYY-MM-DD`. Slugs are normalized to lowercase, must contain only letters, numbers, and single hyphens, and must be unique. Posts must be regular `.md` files; symbolic links and YAML aliases are rejected. Invalid posts fail the production build. Posts are sorted newest first, then by slug. GitHub Flavored Markdown is supported. Put local post images under `public/blog/` and reference them as `/blog/image-name.png`.

## Structure

```text
content/blog/       authored Markdown
e2e/                Playwright journeys
public/              static assets
src/app/             composition root and providers
src/config/          runtime configuration
src/modules/blog/    post parsing, lookup, and rendering
src/modules/terminal terminal commands and interaction
src/shared/          cross-module theme primitives
src/test/            shared test setup
```

Each non-trivial component owns a PascalCase folder, colocated `styles.ts`, tests where useful, and a public `index.ts` barrel.

## Documentation

- [Architecture](docs/architecture.md)
- [How the system works](docs/how-system-works.md)
- [Models](docs/models.md)
- [Patterns](docs/patterns.md)
- [Onboarding](docs/onboarding.md)
- [Code standards](docs/code-standards.md)
- [Code quality scorecard](docs/code-quality-scorecard.md)
