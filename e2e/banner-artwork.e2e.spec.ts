import { expect, test } from '@playwright/test';

const banners = [
  { filename: 'banner.svg', width: 1200, height: 300 },
  { filename: 'banner-wide.svg', width: 1600, height: 280 },
  { filename: 'banner-tablet.svg', width: 900, height: 190 },
  { filename: 'banner-mobile.svg', width: 400, height: 208 },
  { filename: 'banner-compact.svg', width: 1600, height: 180 },
] as const;

for (const { filename, width, height } of banners) {
  test(`keeps the octopus workstation inside ${filename}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    const response = await page.goto(filename);
    expect(response?.status()).toBe(200);
    expect(response?.headers()['content-type']).toContain('image/svg+xml');
    await page.locator('svg').evaluate((svg: SVGSVGElement) => {
      svg.pauseAnimations();
      svg.setCurrentTime(0);
    });
    const mascot = page.locator('#octopus');
    await expect(mascot).toBeVisible();
    const artwork = await mascot.boundingBox();
    const frame = await page.locator('svg > rect[stroke]').first().boundingBox();
    if (!artwork || !frame) {
      throw new Error('Published banner must include a visible mascot and frame');
    }
    expect(artwork.x).toBeGreaterThanOrEqual(frame.x + 4);
    expect(artwork.y).toBeGreaterThanOrEqual(frame.y + 4);
    expect(artwork.x + artwork.width).toBeLessThanOrEqual(frame.x + frame.width - 4);
    expect(artwork.y + artwork.height).toBeLessThanOrEqual(frame.y + frame.height - 4);
    await page.locator('text').evaluateAll((texts: SVGTextElement[]) => {
      for (const text of texts) {
        text.style.visibility = 'hidden';
      }
    });
    await expect(mascot).toHaveScreenshot(filename.replace('.svg', '-mascot.png'), {
      maxDiffPixels: 10,
    });
  });
}
