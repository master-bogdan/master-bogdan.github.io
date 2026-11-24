import { expect, test } from '@playwright/test';

import { collectBrowserErrors } from './utils/collect-browser-errors';
import { responsiveViewports } from './utils/viewports';

for (const viewport of responsiveViewports) {
  test(`reads a complete article with a sticky header at ${viewport.width}x${viewport.height}`, async ({
    page,
  }) => {
    const errors = collectBrowserErrors(page);
    await page.setViewportSize(viewport);
    await page.clock.install();
    const response = await page.goto('blog/lost-interest-found-again/');
    expect(response?.status()).toBe(200);
    expect(await response?.text()).toContain('My favorite animal is octopus');

    const article = page.getByRole('article');
    await expect(article.getByText(/My favorite animal is octopus/)).toBeVisible();
    await expect(article.getByRole('heading', { level: 1 })).toHaveCount(1);
    await expect(page.getByRole('textbox', { name: 'Terminal command' })).toHaveCount(0);
    await expect(page.getByRole('img', { name: /^Bogdan Shchavinskyi/ })).toHaveCount(0);
    const cover = article.getByRole('img', { name: /^Article artwork for/ });
    await expect(cover).toHaveAttribute(
      'src',
      new URL('../lost-interest-found-again-header.png', page.url()).pathname,
    );
    await expect
      .poll(() => cover.evaluate((image: HTMLImageElement) => image.naturalWidth))
      .toBe(2400);
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(
      false,
    );

    await page.mouse.wheel(0, viewport.height);
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
    const header = page.locator('header');
    await expect.poll(async () => (await header.boundingBox())?.y).toBe(0);
    for (const name of ['Blog', 'Projects', 'Contact & CV', 'Terminal']) {
      await expect(header.getByRole('link', { name, exact: true })).toBeInViewport({ ratio: 1 });
    }
    expect(errors).toEqual([]);
  });
}
