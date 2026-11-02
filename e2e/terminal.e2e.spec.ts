import { readFile } from 'node:fs/promises';

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
      'BogdanLabs.dev — Bogdan Shchavinskyi, Tech Lead / Senior Software Engineer — Backend Infrastructure, DevOps and Platform Engineering',
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
  const resumeLink = page.getByRole('link', { name: '[Download PDF]' });
  const resumeUrl = new URL('Bogdan_Shchavinskyi_CV.pdf', page.url());
  await expect(resumeLink).toHaveAttribute('href', resumeUrl.pathname);
  await expect(resumeLink).toHaveAttribute('download', 'Bogdan_Shchavinskyi_CV.pdf');

  const downloadPromise = page.waitForEvent('download');
  await resumeLink.click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('Bogdan_Shchavinskyi_CV.pdf');
  expect(await download.failure()).toBeNull();

  const resumeResponse = await page.request.get(resumeUrl.href);
  expect(resumeResponse.ok()).toBeTruthy();
  expect(resumeResponse.headers()['content-type']).toContain('application/pdf');
  expect(await resumeResponse.body()).toEqual(
    await readFile(new URL('../public/Bogdan_Shchavinskyi_CV.pdf', import.meta.url)),
  );
});

test('keeps the CV download in view after typing in a short window', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 500 });
  await page.goto('./');

  const commandInput = page.getByRole('textbox', { name: 'Terminal command' });
  await commandInput.fill('resume');
  await commandInput.press('Enter');

  const resumeLink = page.getByRole('link', { name: '[Download PDF]' });
  await expect(resumeLink).toBeInViewport({ ratio: 1 });

  const downloadPromise = page.waitForEvent('download');
  await resumeLink.click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('Bogdan_Shchavinskyi_CV.pdf');
  expect(await download.failure()).toBeNull();
});
