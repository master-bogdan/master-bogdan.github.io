import { expect, test } from '@playwright/test';

test.use({ javaScriptEnabled: false });

test('serves each public view as crawlable terminal HTML without JavaScript', async ({ page }) => {
  const pages = [
    ['blog/', 'Blog Posts:'],
    ['blog/welcome/', 'Welcome to My Terminal'],
    [
      'blog/lost-interest-found-again/',
      'How I lost interest in coding and found it again in AI agents',
    ],
    [
      'blog/ai-slop-era/',
      'The AI Slop Era: Why Your Project Needs a Concrete Wall of Linters, Tests, and Strict CI/CD',
    ],
    ['contacts/', 'Contact & CV'],
    ['resume/', 'Contact & CV'],
    ['projects/', 'Featured Projects:'],
    ['projects/neovim-practice/', 'Neovim Practice'],
    ['projects/local-ai-lab/', 'Local AI Lab'],
  ];
  for (const [pathname, heading] of pages) {
    const response = await page.goto(pathname);
    expect(response?.status()).toBe(200);
    const output = page.getByRole('region', { name: 'Command output' });
    await expect(output.getByRole('heading', { name: heading, exact: true })).toBeVisible();
    const isArticle = pathname.startsWith('blog/') && pathname !== 'blog/';
    const input = page.getByRole('textbox', { name: 'Terminal command' });
    if (isArticle) {
      await expect(input).toHaveCount(0);
      await expect(page.locator('article')).toBeVisible();
    } else {
      await expect(input).toBeVisible();
    }
    await expect(page.getByText('Initializing system...')).toHaveCount(0);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `https://master-bogdan.github.io/${pathname === 'resume/' ? 'contacts/' : pathname}`,
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
    'blog/lost-interest-found-again/',
    'blog/ai-slop-era/',
    'contacts/',
    'projects/',
    'projects/neovim-practice/',
    'projects/local-ai-lab/',
  ]) {
    expect(xml).toContain(`<loc>https://master-bogdan.github.io/${pathname}</loc>`);
  }
  expect(xml).not.toContain('<loc>https://master-bogdan.github.io/resume/</loc>');
  const locations = xml.match(/<loc>[^<]+<\/loc>/g) ?? [];
  expect(new Set(locations).size).toBe(locations.length);
  await page.goto('resume/');
  await expect(page.getByRole('link', { name: 'Download CV (PDF)' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'View LinkedIn profile' })).toBeVisible();
  await expect(page.getByText('Certifications', { exact: true })).toHaveCount(0);
  for (const filename of ['cka.svg', 'ckad.svg']) {
    const imageUrl = new URL(`../certifications/${filename}`, page.url());
    const response = await request.get(imageUrl.href);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('image/svg+xml');
  }
});

test('serves article artwork and sharing metadata in the initial HTML', async ({ page }) => {
  await page.goto('blog/lost-interest-found-again/');
  const imageUrl = 'https://master-bogdan.github.io/blog/lost-interest-found-again-header.png';
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', imageUrl);
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', imageUrl);
  const artwork = page.getByRole('img', { name: /^Article artwork/ });
  await expect(artwork).toBeVisible();
  const source = await artwork.getAttribute('src');
  if (!source) {
    throw new Error('Published article must include its artwork URL');
  }
  const response = await page.request.get(source);
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('image/png');
});
