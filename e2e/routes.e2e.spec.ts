import { expect, test } from '@playwright/test';

import { collectBrowserErrors } from './utils/collect-browser-errors';

test('keeps direct links, commands, and browser history inside one document', async ({ page }) => {
  const errors = collectBrowserErrors(page);
  await page.clock.install();
  const response = await page.goto('blog/welcome/');
  expect(await response?.text()).toContain('Happy exploring!');
  const siteUrl = new URL('../../', page.url());
  const input = page.getByRole('textbox', { name: 'Terminal command' });
  await expect(input).toHaveCount(0);
  const output = page.getByRole('region', { name: 'Command output' });
  await expect(output.getByText('Happy exploring!')).toBeAttached();
  await page.clock.runFor(8000);
  await expect(output.getByText('Happy exploring!')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Welcome to My Terminal' })).toBeVisible();
  await expect(page.getByText('Initializing system...')).toHaveCount(0);
  await page.evaluate(() => {
    document.documentElement.dataset.navigationTest = 'same-document';
  });
  const panel = page.getByRole('region', { name: 'Command output' }).locator('..');
  const articleBounds = await panel.boundingBox();

  await page.getByRole('link', { name: 'Projects', exact: true }).click();
  await page.clock.runFor(5000);
  await expect(page).toHaveURL(new URL('projects/', siteUrl).href);
  const initialBounds = await panel.boundingBox();
  expect(initialBounds).not.toEqual(articleBounds);
  await page.getByRole('link', { name: 'Neovim Practice', exact: true }).click();
  await page.clock.runFor(1000);
  await expect(page).toHaveURL(new URL('projects/neovim-practice/', siteUrl).href);
  await expect(page).toHaveTitle('Neovim Practice | Bogdan Shchavinskyi');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://master-bogdan.github.io/projects/neovim-practice/',
  );
  await expect(page.locator('html')).toHaveAttribute('data-navigation-test', 'same-document');
  expect(await panel.boundingBox()).toEqual(initialBounds);

  await page.goBack();
  await page.clock.runFor(1000);
  await expect(page.getByRole('heading', { name: 'Featured Projects:' })).toBeVisible();
  await page.goForward();
  await page.clock.runFor(1000);
  await expect(page.getByRole('heading', { name: 'Neovim Practice', exact: true })).toBeVisible();
  await page.reload();
  await page.clock.runFor(1000);
  await expect(page.getByRole('heading', { name: 'Neovim Practice', exact: true })).toBeVisible();
  await expect(input).toBeFocused();

  await input.fill('BLOG ai-slop-era');
  await input.press('Enter');
  await expect(page).toHaveURL(new URL('blog/ai-slop-era/', siteUrl).href);
  await page.clock.runFor(1000);
  await expect(output.getByText('Keep the garbage out of your project')).toBeAttached();
  await expect(input).toHaveCount(0);
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'article');

  await page.getByRole('link', { name: 'Contact & CV', exact: true }).click();
  await input.fill('resume');
  await input.press('Enter');
  await page.clock.runFor(3000);
  await expect(page).toHaveURL(new URL('resume/', siteUrl).href);
  await expect(page.getByRole('link', { name: 'Download CV (PDF)' })).toBeVisible();
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'website');
  await expect(page).toHaveTitle('Contact & CV | Bogdan Shchavinskyi');
  await page.clock.runFor(5000);
  await expect(output.getByText('Keep the garbage out of your project')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('opens a blog link in a separate tab with the requested content', async ({
  page,
  context,
}) => {
  await page.goto('blog/');
  await expect(page.getByRole('region', { name: 'Command output' }).getByRole('img')).toHaveCount(
    0,
  );
  const post = page.getByRole('link', { name: 'Welcome to My Terminal' });
  await expect(post).toHaveAttribute('href', new URL('welcome/', page.url()).pathname);
  const newTabPromise = context.waitForEvent('page');
  await post.click({ modifiers: ['ControlOrMeta'] });
  const newTab = await newTabPromise;
  await expect(newTab.getByRole('heading', { name: 'Welcome to My Terminal' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Blog Posts:' })).toBeVisible();
  await newTab.close();
});

test('reveals static article content when the client bundle fails to load', async ({ page }) => {
  await page.route('**/assets/*.js', (route) => route.abort());
  const response = await page.goto('blog/welcome/');
  expect(response?.status()).toBe(200);
  const output = page.getByRole('region', { name: 'Command output' });
  await expect(output.getByRole('heading', { name: 'Welcome to My Terminal' })).toBeVisible({
    timeout: 6000,
  });
  await expect(output.getByText('Happy exploring!')).toBeVisible();
  await expect(output.getByRole('link', { name: '← All posts' }).first()).toBeVisible();
});

test('hydrates explicit directory index URLs as the requested article', async ({ page }) => {
  const errors = collectBrowserErrors(page);
  await page.clock.install();
  const response = await page.goto('blog/welcome/index.html');
  expect(response?.status()).toBe(200);
  await page.clock.runFor(8000);
  await expect(page.getByRole('heading', { name: 'Welcome to My Terminal' })).toBeVisible();
  await expect(page).toHaveTitle('Welcome to My Terminal | Bogdan Shchavinskyi');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'https://master-bogdan.github.io/blog/welcome/',
  );
  await expect(page.getByText('Initializing system...')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('returns and resets with keyboard links without replaying boot', async ({ page }) => {
  await page.goto('blog/lost-interest-found-again/');
  const siteUrl = new URL('../../', page.url());
  await page.evaluate(() => {
    document.documentElement.dataset.navigationTest = 'same-document';
  });
  const input = page.getByRole('textbox', { name: 'Terminal command' });
  for (const returnLink of [
    page.getByRole('link', { name: 'Terminal', exact: true }),
    page.locator('header').getByRole('link', { name: 'Bogdan Shchavinskyi' }),
    page.locator('article').getByRole('link', { name: 'Bogdan Shchavinskyi' }),
  ]) {
    await returnLink.focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(siteUrl.href);
    await expect(page.locator('html')).toHaveAttribute('data-navigation-test', 'same-document');
    await expect(page.getByText('Initializing system...')).toHaveCount(0);
    await expect(input).toBeFocused();
    await input.fill('blog lost-interest-found-again');
    await input.press('Enter');
    await expect(page.locator('article')).toBeVisible();
  }
  await page.getByRole('link', { name: 'Terminal', exact: true }).click();
  await input.fill('whoami');
  await input.press('Enter');
  await page.getByRole('link', { name: 'Reset terminal' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByText('Available Commands:')).toBeVisible();
  await expect(input).toBeFocused();
  await expect(page.locator('html')).toHaveAttribute('data-navigation-test', 'same-document');
  await expect(page.getByText('Initializing system...')).toHaveCount(0);
});
