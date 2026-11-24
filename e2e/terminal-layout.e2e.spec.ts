import { expect, test } from '@playwright/test';

import { responsiveViewports } from './utils/viewports';

for (const viewport of responsiveViewports) {
  test(`keeps a larger terminal frame and controls stable at ${viewport.width}x${viewport.height}`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.clock.install();
    await page.goto('resume/');
    const input = page.getByRole('textbox', { name: 'Terminal command' });
    const output = page.getByRole('region', { name: 'Command output' });
    const panel = output.locator('..');
    const banner = page.getByRole('img', { name: /^Bogdan Shchavinskyi/ });
    await page.evaluate(() => document.fonts.ready);
    await banner.evaluate((image: HTMLImageElement) => image.decode());
    const bounds = await panel.boundingBox();
    if (!bounds) {
      throw new Error('Terminal frame must be visible');
    }
    expect(bounds.height).toBeGreaterThan(viewport.height * 0.8);
    if (viewport.width === 1920) {
      expect(bounds.width).toBeGreaterThan(1500);
      expect(bounds.width).toBeLessThanOrEqual(1600);
    }
    const imageRatios = await banner.evaluate((image: HTMLImageElement) => ({
      displayed: image.clientWidth / image.clientHeight,
      artwork: image.naturalWidth / image.naturalHeight,
    }));
    expect(Math.abs(imageRatios.displayed / imageRatios.artwork - 1)).toBeLessThan(0.02);

    await input.fill('help');
    await input.press('Enter');
    await page.clock.runFor(5000);
    expect(await panel.boundingBox()).toEqual(bounds);
    await input.fill('whoami');
    await input.press('Enter');
    await page.clock.runFor(40_000);
    expect(await panel.boundingBox()).toEqual(bounds);

    const fixedElements = [banner, page.getByRole('link', { name: 'blog', exact: true }), input];
    const fixedBounds = [];
    for (const element of fixedElements) {
      await expect(element).toBeInViewport({ ratio: 1 });
      fixedBounds.push(await element.boundingBox());
    }
    await expect.poll(() => output.evaluate((el) => el.scrollHeight > el.clientHeight)).toBe(true);
    await output.hover();
    await page.mouse.wheel(0, 500);
    await expect.poll(() => output.evaluate((el) => el.scrollTop)).toBeGreaterThan(0);
    for (const [index, element] of fixedElements.entries()) {
      expect(await element.boundingBox()).toEqual(fixedBounds[index]);
    }
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(
      false,
    );
    expect(await page.evaluate(() => document.documentElement.scrollHeight > innerHeight)).toBe(
      false,
    );

    await input.fill('contacts');
    await input.press('Enter');
    await page.clock.runFor(5000);
    expect(await panel.boundingBox()).toEqual(bounds);
    await expect.poll(() => output.evaluate((el) => el.scrollTop)).toBe(0);
    await expect(input).toBeFocused();
  });
}
