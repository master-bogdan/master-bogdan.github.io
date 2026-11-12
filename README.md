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

The production site is served at `/` by default. Override it with `VITE_BASE_PATH` when a deployment uses a different root-relative path. Traversal, protocol-relative paths, query strings, fragments, and special characters fail the build.

## GitHub Pages

This standalone repository is the home for the public portfolio. The original homelab copy is retained separately; changes are not synchronized automatically.

The deployment URL is `https://master-bogdan.github.io/` once Pages is enabled and the workflow succeeds.

1. Push this repository to `master-bogdan/master-bogdan.github.io` on `main`.
2. In **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source.
3. Run **Validate and deploy website** from the Actions tab, or rerun the first workflow if it ran before Pages was enabled.

The workflow installs the Node version in `.nvmrc` and npm `11.17.0`, then runs formatting, lint, TypeScript, coverage, the production build, and Chromium tests. Browser tests cover the terminal, CV downloads, SEO metadata, and the no-JavaScript profile at both a test subdirectory (`/preview/`) and the configured deployment path (normally `/`). The final validation rebuilds the configured deployment path before uploading the site. Pull requests run validation only. Successful pushes to `main` publish `build/` using GitHub's Pages actions and the built-in `GITHUB_TOKEN`; no personal access token is needed.

The workflow defaults to `VITE_BASE_PATH=/` for the user site. For a custom domain, configure the domain in Pages settings and keep the root base path. To test a subdirectory deployment locally:

```bash
VITE_BASE_PATH=/preview/ npm run validate
```

For the standard repository URL, use `npm run validate`. The browser tests use the production base path, including overrides from `.env.production` or the environment. Do not commit local environment files or put secrets in `VITE_` variables; their values can become part of the browser bundle.

### Public CV

The current public CV is `public/Bogdan_Shchavinskyi_CV.pdf`. The `resume` command and `/resume/` show a short professional presentation with the PDF download, LinkedIn, main technologies, selected impact, and certification artwork. The no-JavaScript profile includes the same download. The PDF is copied into the published site during the build.

When replacing the CV, keep the public filename stable and update `whoami`, banner text, and SEO/profile metadata in `index.html` to match. Run `npm run assets:generate` after banner changes so the social preview stays current, then run `npm run validate`.

## Favicon, Sharing, and Search

`src/config/profile.ts` holds the shared identity and production URL. `index.html` provides the homepage defaults; `src/app/pageMetadata.ts` derives titles, descriptions, canonical URLs, sharing metadata, and structured data for each public route. These are present in the initial HTML without running JavaScript. A `noscript` profile gives visitors with JavaScript disabled a short introduction and links to GitHub and LinkedIn.

The favicon uses the banner's cyan and green terminal styling. The sharing preview uses the existing banner on a 1200 × 630 background. After editing `public/favicon.svg` or `public/banner.svg`, regenerate the committed PNG assets:

```bash
npm run assets:generate
```

This uses the existing Playwright Chromium installation; it is not part of the production build.

The terminal selects `public/banner-mobile.svg` below 600px, `public/banner-tablet.svg` below 900px, and `public/banner.svg` for desktop. Keep their profile wording consistent when editing the banner; the social preview continues to use the desktop artwork.

The sitemap is generated from all published public routes and is available at `https://master-bogdan.github.io/sitemap.xml`. Add the site as a URL-prefix property in Google Search Console, verify ownership using Google's supplied HTML verification file in `public/` or meta tag in `index.html`, then submit the sitemap. Indexing and search appearance are controlled by search engines, not guaranteed by these files.

When changing the public domain or deployment path, update `profile.url` in `src/config/profile.ts` and the absolute sharing-image URLs in `index.html`, along with `VITE_BASE_PATH`. Favicon and touch-icon links already follow the Vite base path. The canonical and sharing URLs intentionally point to production even during local development.

### Public terminal URLs

The terminal stays the interface at every URL:

- `/blog/` lists posts; `/blog/<slug>/` opens an article.
- `/resume/` shows a short introduction with the CV download.
- `/projects/` lists featured work; `/projects/<slug>/` opens a project.

Links and corresponding commands update the URL without reloading the terminal. Browser Back and Forward restore earlier views. Direct visits skip boot and immediately show the requested content. The homepage keeps its boot sequence and hidden commands.

After Vite builds, `scripts/prerender.mjs` renders the same React terminal into an `index.html` for each content URL, plus `sitemap.xml`. GitHub Pages therefore serves deep links and refreshes directly. Pages include their content and metadata before JavaScript runs; hydration adds keyboard commands and in-terminal navigation. Preview base paths are kept separate from `profile.url`, which always describes the actual production address.

### Featured projects

Edit `src/modules/projects/projects.ts` to maintain project descriptions, features, technologies, examples, and curated updates. Each update records a real date and a GitHub release or commit link. Project pages build from this local content; visiting the website does not fetch GitHub data. Put local preview assets in `public/projects/`.

Certification and project-image sources are recorded in [Asset sources](docs/asset-credits.md).

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

Commit and push a post to `main` to rebuild and deploy it. Markdown is bundled at build time; GitHub Pages needs no application server or Jekyll configuration. All posts in this directory become public. Posts open inside the terminal at `/blog/<slug>/`; their HTML pages and sitemap entries are generated automatically during the build.

`title`, `date`, and `slug` are required non-empty strings. Dates use `YYYY-MM-DD`. Slugs are normalized to lowercase, must contain only letters, numbers, and single hyphens, and must be unique. Posts must be regular `.md` files; symbolic links and YAML aliases are rejected. Invalid posts fail the production build. Posts are sorted newest first, then by slug. GitHub Flavored Markdown is supported. Put local post images under `public/blog/` and reference them as `/blog/image-name.png`.

## Structure

```text
content/blog/       authored Markdown
e2e/                Playwright journeys
public/              static assets
src/app/             composition root and providers
src/config/          runtime configuration
src/modules/blog/    post parsing, lookup, and rendering
src/modules/projects/ project descriptions, examples, and updates
src/modules/navigation/ public terminal URL mapping
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
