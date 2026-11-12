import { expect, test } from '@playwright/test';

test.use({ javaScriptEnabled: false });

test('serves each public view as crawlable terminal HTML without JavaScript', async ({ page }) => {
  const pages = [
    ['blog/', 'Blog Posts:'],
    ['blog/welcome/', 'Welcome to My Terminal'],
    [
      'blog/ai-slop-era/',
      'The AI Slop Era: Why Your Project Needs a Concrete Wall of Linters, Tests, and Strict CI/CD',
    ],
    ['resume/', 'Bogdan Shchavinskyi'],
    ['projects/', 'Featured Projects:'],
    ['projects/neovim-practice/', 'Neovim Practice'],
    ['projects/local-ai-lab/', 'Local AI Lab'],
  ];
  for (const [pathname, heading] of pages) {
    const response = await page.goto(pathname);
    expect(response?.status()).toBe(200);
    const output = page.getByRole('region', { name: 'Command output' });
    await expect(output.getByRole('heading', { name: heading, exact: true })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Terminal command' })).toBeVisible();
    await expect(page.getByText('Initializing system...')).toHaveCount(0);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://master-bogdan.github.io/${pathname}`,
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      'content',
      await page.title(),
    );
    await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute(
      'content',
      await page.title(),
    );
    expect(
      (await page.locator('meta[name="description"]').getAttribute('content'))?.length,
    ).toBeGreaterThan(20);
  }
  const screenshot = page.getByRole('img', {
    name: 'Local AI Lab terminal interface showing the model picker',
  });
  const src = await screenshot.getAttribute('src');
  expect(src).toBeTruthy();
  expect((await page.request.get(src!)).status()).toBe(200);
});

test('includes all content URLs in the generated sitemap and serves certification images locally', async ({
  page,
  request,
}) => {
  const sitemap = await request.get('sitemap.xml');
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  for (const pathname of [
    '',
    'blog/',
    'blog/welcome/',
    'blog/ai-slop-era/',
    'resume/',
    'projects/',
    'projects/neovim-practice/',
    'projects/local-ai-lab/',
  ]) {
    expect(xml).toContain(`<loc>https://master-bogdan.github.io/${pathname}</loc>`);
  }
  await page.goto('resume/');
  await expect(page.getByRole('link', { name: '[Download PDF]' })).toBeVisible();
  await expect(page.getByRole('link', { name: '[View LinkedIn profile]' })).toBeVisible();
  await expect(page.getByText('Certifications', { exact: true })).toHaveCount(0);
  for (const filename of ['cka.svg', 'ckad.svg']) {
    const imageUrl = new URL(`../certifications/${filename}`, page.url());
    const response = await request.get(imageUrl.href);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/svg+xml');
  }
});
