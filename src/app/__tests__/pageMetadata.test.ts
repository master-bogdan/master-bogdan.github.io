import { afterEach, describe, expect, it, vi } from 'vitest';
import * as blog from '@/modules/blog';
import { pageMetadata } from '../pageMetadata';

describe('Public page metadata', () => {
  afterEach(() => vi.restoreAllMocks());
  it.each([
    ['/', 'Bogdan Shchavinskyi | Senior Software Engineer & Tech Lead', 'Person'],
    ['/resume/', 'Resume | Bogdan Shchavinskyi', 'Person'],
    ['/blog/', 'Blog | Bogdan Shchavinskyi', 'CollectionPage'],
    ['/blog/welcome/', 'Welcome to My Terminal | Bogdan Shchavinskyi', 'BlogPosting'],
    ['/projects/', 'Projects | Bogdan Shchavinskyi', 'CollectionPage'],
    ['/projects/neovim-practice/', 'Neovim Practice | Bogdan Shchavinskyi', 'CreativeWork'],
    ['/projects/local-ai-lab/', 'Local AI Lab | Bogdan Shchavinskyi', 'CreativeWork'],
  ])('describes %s using its actual content and production URL', (pathname, title, schemaType) => {
    const metadata = pageMetadata(pathname);
    expect(metadata.title).toBe(title);
    expect(metadata.canonical).toBe(`https://master-bogdan.github.io${pathname}`);
    expect(metadata.description.length).toBeGreaterThan(20);
    expect(JSON.parse(metadata.structuredData)['@type']).toBe(schemaType);
    expect(metadata.noindex).toBe(false);
    expect(pageMetadata(`${pathname}index.html`)).toEqual(metadata);
  });
  it('uses article metadata for authored posts and excludes missing content from indexing', () => {
    expect(pageMetadata('/blog/ai-slop-era/').ogType).toBe('article');
    expect(pageMetadata('/blog/missing/').noindex).toBe(true);
    expect(pageMetadata('/projects/missing/').noindex).toBe(true);
  });
  it('escapes authored text that could otherwise terminate a JSON-LD script', () => {
    const title = '</script><script>alert(1)</script>';
    vi.spyOn(blog, 'getBlogPost').mockReturnValue({
      slug: 'example',
      title,
      date: '2026-11-12',
      content: '<script>example</script>',
    });
    const metadata = pageMetadata('/blog/example/');
    expect(metadata.structuredData).not.toContain('<');
    expect(JSON.parse(metadata.structuredData).headline).toBe(title);
    expect(metadata.title).toContain(title);
  });
});
