import { describe, expect, it } from 'vitest';
import { contentHref, routeCommand } from '..';

describe('Public terminal URLs', () => {
  it('maps content URLs to commands, including trailing-slash normalization', () => {
    expect(routeCommand('/blog/ai-slop-era/')).toBe('blog ai-slop-era');
    expect(routeCommand('/projects/local-ai-lab')).toBe('projects local-ai-lab');
    expect(routeCommand('/resume/')).toBe('resume');
    expect(contentHref('projects', 'local-ai-lab')).toBe('/projects/local-ai-lab/');
  });
  it.each([
    '/',
    '/resume/file/',
    '/blog/a/b/',
    '/blog/%2e%2e/',
    '/blog/a--b/',
    '/hidden/',
    'https://example.com/blog/',
  ])('does not interpret %s as a public command', (pathname) => {
    expect(routeCommand(pathname)).toBeNull();
  });
});
