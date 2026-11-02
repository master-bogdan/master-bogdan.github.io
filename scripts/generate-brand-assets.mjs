import { readFile } from 'node:fs/promises';
import { fileURLToPath, URL } from 'node:url';
import { chromium } from '@playwright/test';

const publicDirectory = new URL('../public/', import.meta.url);
const [favicon, banner] = await Promise.all([
  readFile(new URL('favicon.svg', publicDirectory), 'utf8'),
  readFile(new URL('banner.svg', publicDirectory), 'utf8'),
]);
const browser = await chromium.launch();

try {
  const page = await browser.newPage({ deviceScaleFactor: 1 });

  for (const [size, filename] of [
    [96, 'favicon-96.png'],
    [180, 'apple-touch-icon.png'],
  ]) {
    await page.setViewportSize({ width: size, height: size });
    await page.setContent(
      `<style>body { margin: 0; } svg { display: block; width: 100vw; height: 100vh; }</style>${favicon}`,
    );
    await page.screenshot({
      path: fileURLToPath(new URL(filename, publicDirectory)),
      omitBackground: true,
    });
  }

  await page.setViewportSize({ width: 1200, height: 630 });
  await page.setContent(
    `<style>body { margin: 0; min-height: 100vh; display: flex; align-items: center; background: #05070b; } svg { width: 1200px; height: 300px; }</style>${banner}`,
  );
  await page.locator('svg').evaluate((svg) => {
    svg.pauseAnimations();
    svg.setCurrentTime(0);
  });
  await page.screenshot({ path: fileURLToPath(new URL('social-preview.png', publicDirectory)) });
} finally {
  await browser.close();
}
