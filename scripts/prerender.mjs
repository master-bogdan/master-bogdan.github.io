import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import { log } from 'node:console';
import { createHash } from 'node:crypto';

import { createServer } from 'vite';

const projectDirectory = fileURLToPath(new URL('../', import.meta.url));
const buildDirectory = path.join(projectDirectory, 'build');
const builtHtml = await readFile(path.join(buildDirectory, 'index.html'), 'utf8');
const escapeHtml = (text) =>
  text.replace(
    /[&<>"']/g,
    (character) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character],
  );

const inlineScriptHashes = [...builtHtml.matchAll(/<script>([\s\S]*?)<\/script>/gi)]
  .map(([, script]) => `'sha256-${createHash('sha256').update(script).digest('base64')}'`)
  .join(' ');
const contentSecurityPolicy = [
  "default-src 'self'",
  `script-src 'self' ${inlineScriptHashes}`,
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "img-src 'self' https:",
  "object-src 'none'",
  "frame-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
].join('; ');
const template = builtHtml.replace(
  /<meta charset="UTF-8"\s*\/?>/,
  (charset) =>
    `${charset}\n<meta http-equiv="Content-Security-Policy" content="${escapeHtml(contentSecurityPolicy)}">\n<meta name="referrer" content="strict-origin-when-cross-origin">`,
);

const renderPage = ({ metadata, html }) => {
  let page = template.replace(
    /<title>[\s\S]*?<\/title>/,
    () => `<title>${escapeHtml(metadata.title)}</title>`,
  );
  const contentByAttribute = {
    'name="description"': metadata.description,
    'name="robots"': metadata.noindex
      ? 'noindex, follow'
      : 'index, follow, max-image-preview:large',
    'property="og:title"': metadata.title,
    'property="og:description"': metadata.description,
    'property="og:url"': metadata.canonical,
    'property="og:type"': metadata.ogType,
    'name="twitter:title"': metadata.title,
    'name="twitter:description"': metadata.description,
  };
  for (const [attribute, content] of Object.entries(contentByAttribute)) {
    page = page.replace(
      new RegExp(`<meta\\s+${attribute}\\s+content="[^"]*"\\s*/?>`),
      () => `<meta ${attribute} content="${escapeHtml(content)}">`,
    );
  }
  page = page.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    () => `<link rel="canonical" href="${escapeHtml(metadata.canonical)}">`,
  );
  page = page.replace(
    /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
    () => `<script type="application/ld+json">${metadata.structuredData}</script>`,
  );
  if (html) {
    page = page
      .replace('<div id="root"></div>', () => `<div id="root">${html}</div>`)
      .replace(/<noscript>[\s\S]*?<\/noscript>/, '');
  }
  return page;
};

const server = await createServer({
  root: projectDirectory,
  mode: 'production',
  server: { middlewareMode: true, watch: null, ws: false },
  appType: 'custom',
});
try {
  const { renderPortfolioPages } = await server.ssrLoadModule('/src/app/renderPortfolio.tsx');
  const pages = renderPortfolioPages();
  for (const page of pages) {
    const directory = path.join(buildDirectory, page.relativePath);
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, 'index.html'), renderPage(page));
  }
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map(({ metadata }) => `<url><loc>${escapeHtml(metadata.canonical)}</loc></url>`).join('')}</urlset>\n`;
  await writeFile(path.join(buildDirectory, 'sitemap.xml'), sitemap);
  log(`Generated ${pages.length} directly reachable portfolio pages and sitemap.xml`);
} finally {
  await server.close();
}
