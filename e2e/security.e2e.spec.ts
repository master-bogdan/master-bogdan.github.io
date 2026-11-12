import { expect, test } from '@playwright/test';

import { collectBrowserErrors } from './utils/collect-browser-errors';

test('keeps the terminal usable under the production content security policy', async ({ page }) => {
  const errors = collectBrowserErrors(page);

  for (const pathname of ['./', 'resume/', 'blog/welcome/', 'projects/local-ai-lab/']) {
    await page.goto(pathname);
    await expect(page.locator('html')).toHaveClass(/\bjs\b/);
    await expect(page.getByRole('textbox', { name: 'Terminal command' })).toBeVisible();
    await expect(page.locator('meta[http-equiv="Content-Security-Policy"]')).toHaveAttribute(
      'content',
      /script-src 'self' 'sha256-/,
    );
    await expect(page.locator('meta[name="referrer"]')).toHaveAttribute(
      'content',
      'strict-origin-when-cross-origin',
    );
  }

  expect(errors).toEqual([]);
});

test('blocks unapproved inline scripts while commands continue to work', async ({ page }) => {
  await page.goto('resume/');
  await expect(page.locator('meta[http-equiv="Content-Security-Policy"]')).toHaveAttribute(
    'content',
    /script-src 'self' 'sha256-/,
  );
  const directive = await page.evaluate(
    () =>
      new Promise<string>((resolve) => {
        document.addEventListener(
          'securitypolicyviolation',
          (event) => resolve(event.effectiveDirective),
          { once: true },
        );
        const script = document.createElement('script');
        script.textContent = "document.documentElement.setAttribute('data-unapproved-script', '')";
        document.body.append(script);
        script.remove();
      }),
  );

  expect(directive).toBe('script-src-elem');
  await expect(page.locator('html')).not.toHaveAttribute('data-unapproved-script');
  const input = page.getByRole('textbox', { name: 'Terminal command' });
  await input.fill('constructor');
  await input.press('Enter');
  await expect(page.getByText('Command not found: constructor', { exact: false })).toBeVisible();
  await expect(input).toBeFocused();
});
