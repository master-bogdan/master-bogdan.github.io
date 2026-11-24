import { expect, test } from '@playwright/test';

import { collectBrowserErrors } from './utils/collect-browser-errors';

for (const viewport of [
  { width: 1280, height: 1000 },
  { width: 390, height: 844 },
  { width: 844, height: 390 },
]) {
  test(`opens articles immediately with room to read at ${viewport.width}x${viewport.height}`, async ({
    page,
  }) => {
    const errors = collectBrowserErrors(page);
    await page.setViewportSize(viewport);
    await page.clock.install();
    await page.goto('blog/lost-interest-found-again/');
    const output = page.getByRole('region', { name: 'Command output' });
    const input = page.getByRole('textbox', { name: 'Terminal command' });
    await expect(input).toBeFocused();
    await expect(output.getByText(/My favorite animal is octopus/)).toBeAttached();
    await expect(page.getByRole('img', { name: /^Bogdan Shchavinskyi/ })).toHaveCount(0);
    await expect(output.getByRole('heading', { level: 1 })).toHaveCount(1);
    const cover = output.getByRole('img', {
      name: 'Terminal-style article header with an ASCII octopus',
    });
    await expect(cover).toBeVisible();
    await expect
      .poll(() => cover.evaluate((image: HTMLImageElement) => image.naturalWidth))
      .toBe(2400);
    const geometry = await output.evaluate((element) => ({
      height: element.clientHeight,
      documentOverflows: document.documentElement.scrollHeight > innerHeight,
      horizontalOverflow: element.scrollWidth > element.clientWidth,
    }));
    const minimumReadingRatio = viewport.height < 500 ? 0.4 : 0.7;
    expect(geometry.height).toBeGreaterThan(viewport.height * minimumReadingRatio);
    expect(geometry.documentOverflows).toBe(false);
    expect(geometry.horizontalOverflow).toBe(false);
    const inputBounds = await input.boundingBox();
    await output.evaluate((element) => {
      element.scrollTop = element.scrollHeight;
    });
    await expect(input).toBeInViewport({ ratio: 1 });
    expect(await input.boundingBox()).toEqual(inputBounds);
    await page.getByRole('link', { name: '← All posts' }).click();
    await expect(page.getByRole('img', { name: /^Bogdan Shchavinskyi/ })).toBeVisible();
    await page.goBack();
    await expect(output.getByText(/My favorite animal is octopus/)).toBeAttached();
    await expect(page.getByRole('img', { name: /^Bogdan Shchavinskyi/ })).toHaveCount(0);
    await expect.poll(() => output.evaluate((element) => element.scrollTop)).toBe(0);
    await input.fill('BLOG lost-interest-found-again');
    await input.press('Enter');
    await expect(output.getByText(/My favorite animal is octopus/)).toBeAttached();
    await expect(input).toBeFocused();
    expect(errors).toEqual([]);
  });
}
