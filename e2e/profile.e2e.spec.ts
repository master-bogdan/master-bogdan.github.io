import { expect, test } from '@playwright/test';

test.use({ javaScriptEnabled: false });

test('serves profile and sharing metadata without JavaScript', async ({ page }) => {
  await page.goto('./');

  const title = 'Bogdan Shchavinskyi | Tech Lead / Senior Software Engineer';
  const productionUrl = 'https://master-bogdan.github.io/';
  await expect(page).toHaveTitle(title);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', productionUrl);

  const description = await page.locator('meta[name="description"]').getAttribute('content');
  expect(description).toContain('8+ years');
  expect(description).toContain('backend infrastructure, DevOps and platform engineering');
  expect(description).toContain('CKA and CKAD certified');

  for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) {
    await expect(page.locator(selector)).toHaveAttribute('content', title);
  }
  for (const selector of ['meta[property="og:description"]', 'meta[name="twitter:description"]']) {
    await expect(page.locator(selector)).toHaveAttribute('content', description!);
  }
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', productionUrl);
  for (const selector of ['meta[property="og:image"]', 'meta[name="twitter:image"]']) {
    await expect(page.locator(selector)).toHaveAttribute(
      'content',
      `${productionUrl}social-preview.png`,
    );
  }

  const structuredData = await page.locator('script[type="application/ld+json"]').textContent();
  expect(JSON.parse(structuredData!)).toMatchObject({
    '@type': 'Person',
    name: 'Bogdan Shchavinskyi',
    jobTitle: 'Tech Lead / Senior Software Engineer',
    url: productionUrl,
    description,
    knowsAbout: expect.arrayContaining(['DevOps', 'Platform engineering', 'Agentic AI workflows']),
  });
});

test('offers a readable profile and working CV download without JavaScript', async ({ page }) => {
  await page.goto('./');

  await expect(page.getByRole('heading', { name: 'Bogdan Shchavinskyi' })).toBeVisible();
  await expect(
    page.getByText('Tech Lead / Senior Software Engineer', { exact: true }),
  ).toBeVisible();
  await expect(page.getByText(/CKA and CKAD certified/)).toBeVisible();

  const resumeLink = page.getByRole('link', { name: 'Download CV (PDF)' });
  await expect(resumeLink).toHaveAttribute(
    'href',
    new URL('Bogdan_Shchavinskyi_CV.pdf', page.url()).pathname,
  );
  const downloadPromise = page.waitForEvent('download');
  await resumeLink.click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('Bogdan_Shchavinskyi_CV.pdf');
  expect(await download.failure()).toBeNull();
});
