import { expect, test } from '@playwright/test';

test('centers a bounded desktop panel and shows when the prompt has focus', async ({ page }) => {
  await page.setViewportSize({ width: 2048, height: 1188 });
  await page.goto('./');
  const input = page.getByRole('textbox', { name: 'Terminal command' });
  await expect(input).toBeFocused();

  const panel = page.getByRole('region', { name: 'Command output' }).locator('..');
  const bounds = await panel.boundingBox();
  if (!bounds) {
    throw new Error('Terminal panel must be visible');
  }
  expect(bounds.height).toBeLessThan(900);
  expect(bounds.height).toBeGreaterThan(700);
  expect(Math.abs(bounds.y - (1188 - bounds.y - bounds.height))).toBeLessThan(2);

  const form = page.locator('form');
  await expect(form).toHaveCSS('border-top-color', 'rgb(0, 255, 0)');
  await page.getByRole('link', { name: 'blog', exact: true }).focus();
  await expect(input).not.toBeFocused();
  await expect(form).toHaveCSS('border-top-color', 'rgba(0, 0, 0, 0)');
  await input.click();
  await expect(form).toHaveCSS('border-top-color', 'rgb(0, 255, 0)');
});

test('selects readable mobile and tablet banners when resized', async ({ page }) => {
  await page.setViewportSize({ width: 425, height: 808 });
  await page.goto('./');
  const banner = page.getByRole('img');
  await banner.waitFor();

  for (const [width, height, filename] of [
    [425, 808, 'banner-mobile.svg'],
    [768, 1024, 'banner-tablet.svg'],
    [1280, 900, 'banner.svg'],
  ] as const) {
    await page.setViewportSize({ width, height });
    const assetUrl = new URL(filename, page.url()).href;
    await expect
      .poll(() => banner.evaluate((image) => (image as HTMLImageElement).currentSrc))
      .toBe(assetUrl);
    const response = await page.request.get(assetUrl);
    expect(response.ok()).toBe(true);
    expect(response.headers()['content-type']).toContain('image/svg+xml');
    await expect(banner).toBeInViewport({ ratio: 1 });
  }
});

test('keeps the complete tablet banner comfortably inside its frame', async ({ page }) => {
  await page.goto('banner-tablet.svg');
  await expect(
    page.locator('text').filter({ hasText: 'Building software products, cloud platforms,' }),
  ).toBeVisible();
  await expect(page.locator('#penguin')).toBeVisible();
  const margins = await page.locator('svg').evaluate((svg) => {
    const border = svg.querySelector<SVGRectElement>('rect[stroke]');
    if (!border) {
      throw new Error('Tablet banner must have a frame');
    }
    const frame = border.getBoundingClientRect();
    const scale = frame.width / border.width.baseVal.value;
    return [...svg.querySelectorAll('text')].map((text) => {
      const bounds = text.getBoundingClientRect();
      return {
        text: text.textContent,
        top: (bounds.y - frame.y) / scale,
        bottom: (frame.y + frame.height - bounds.y - bounds.height) / scale,
        left: (bounds.x - frame.x) / scale,
        right: (frame.x + frame.width - bounds.x - bounds.width) / scale,
      };
    });
  });
  expect(margins.length).toBeGreaterThan(0);
  for (const { text, top, bottom, left, right } of margins) {
    for (const margin of [top, bottom, left, right]) {
      expect(margin, `Padding around "${text}"`).toBeGreaterThanOrEqual(10);
    }
  }
});
