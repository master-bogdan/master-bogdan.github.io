import { expect, test } from '@playwright/test';

for (const viewport of [
  { width: 1280, height: 720 },
  { width: 390, height: 844 },
  { width: 844, height: 390 },
]) {
  test(`keeps terminal controls fixed while output scrolls at ${viewport.width}x${viewport.height}`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.clock.install();
    await page.goto('./');

    const input = page.getByRole('textbox', { name: 'Terminal command' });
    await input.fill('whoami');
    await input.press('Enter');
    await page.clock.runFor(40_000);

    const fixedElements = [
      page.getByRole('img', { name: /^Bogdan Shchavinskyi/ }),
      page.getByRole('link', { name: 'blog', exact: true }),
      page.getByText('$ whoami', { exact: true }),
      input,
    ];
    const initialBounds = [];
    for (const element of fixedElements) {
      await expect(element).toBeInViewport({ ratio: 1 });
      initialBounds.push(await element.boundingBox());
    }

    const output = page.getByRole('region', { name: 'Command output' });
    await expect
      .poll(() => output.evaluate((element) => element.scrollHeight > element.clientHeight))
      .toBe(true);
    const outputBounds = await output.boundingBox();
    if (!outputBounds) {
      throw new Error('Command output must have a visible scroll area');
    }
    await page.mouse.move(
      outputBounds.x + outputBounds.width / 2,
      outputBounds.y + outputBounds.height / 2,
    );
    await page.mouse.wheel(0, 500);
    await expect.poll(() => output.evaluate((element) => element.scrollTop)).toBeGreaterThan(0);

    for (const [index, element] of fixedElements.entries()) {
      expect(await element.boundingBox()).toEqual(initialBounds[index]);
      await expect(element).toBeInViewport({ ratio: 1 });
    }
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
    expect(
      await page.evaluate(() => document.documentElement.scrollHeight <= window.innerHeight),
    ).toBe(true);

    await input.fill('blog ai-slop-era');
    await input.press('Enter');
    await expect(output.getByText(/Keep the garbage out of your project/)).toBeVisible({
      timeout: 1000,
    });
    await expect.poll(() => output.evaluate((element) => element.scrollTop)).toBe(0);
    await expect(input).toBeFocused();
  });
}
