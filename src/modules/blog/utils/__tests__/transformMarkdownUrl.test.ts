import type { UrlTransform } from 'react-markdown';
import { describe, expect, it, vi } from 'vitest';

vi.mock('@/config', () => ({
  appConfig: { basePath: '/personal-website/' },
}));

import { transformMarkdownUrl } from '../transformMarkdownUrl';

type MarkdownNode = Parameters<UrlTransform>[2];

const markdownNode = (tagName: 'a' | 'img'): MarkdownNode => ({
  type: 'element',
  tagName,
  properties: {},
  children: [],
});

describe('transformMarkdownUrl', () => {
  it('adds the application base path to local post images', () => {
    expect(transformMarkdownUrl('/blog/diagram.png', 'src', markdownNode('img'))).toBe(
      '/personal-website/blog/diagram.png',
    );
  });

  it('preserves safe external images and local links', () => {
    expect(transformMarkdownUrl('https://example.com/image.png', 'src', markdownNode('img'))).toBe(
      'https://example.com/image.png',
    );
    expect(transformMarkdownUrl('/contact', 'href', markdownNode('a'))).toBe('/contact');
  });

  it('removes unsafe protocols', () => {
    expect(transformMarkdownUrl('javascript:alert(1)', 'href', markdownNode('a'))).toBe('');
  });
});
