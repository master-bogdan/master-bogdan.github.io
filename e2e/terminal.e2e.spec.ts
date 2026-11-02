import { expect, test } from '@playwright/test';

test('boots, accepts keyboard commands, and opens a Markdown post', async ({ page }) => {
  await page.goto('./');

  await expect(page.getByText('Initializing system...')).toBeVisible();

  const commandInput = page.getByRole('textbox', { name: 'Terminal command' });
  await expect(commandInput).toBeFocused();
  await expect(page.getByText('Available Commands:')).toBeVisible();

  await commandInput.fill('couple words');
  await commandInput.press('Tab');
  await commandInput.click({ position: { x: 1, y: 1 } });
  await page.keyboard.type(' again');
  await expect(commandInput).toHaveValue('couple words again');
  await page.keyboard.press('Backspace');
  await expect(commandInput).toHaveValue('couple words agai');

  await commandInput.fill('whoami');
  await commandInput.press('Enter');
  await expect(page.getByText('Bogdan Shchavinskyi', { exact: true })).toBeVisible();

  await page.getByRole('button', { name: 'blog', exact: true }).click();
  await page.getByRole('button', { name: 'Welcome to My Terminal' }).click();

  await expect(page.getByRole('heading', { name: 'Welcome to My Terminal' })).toBeVisible();
  await expect(page.getByText('Why a Terminal?')).toBeVisible();

  await expect(
    page.getByAltText(
      'BogdanLabs.dev — Bogdan Shchavinskyi, Tech Lead and Senior Software Engineer',
    ),
  ).toHaveAttribute('src', new URL('banner.svg', page.url()).pathname);

  const bannerResponse = await page.request.get(new URL('banner.svg', page.url()).href);
  expect(bannerResponse.ok()).toBeTruthy();
  expect(bannerResponse.headers()['content-type']).toContain('image/svg+xml');

  await commandInput.fill('resume');
  await commandInput.press('Enter');
  await expect(page.getByRole('link', { name: '[View LinkedIn profile]' })).toHaveAttribute(
    'href',
    'https://www.linkedin.com/in/b-shchavinskyi-fullstack',
  );
  await expect(page.getByRole('link', { name: '[Download PDF]' })).toHaveCount(0);
});
