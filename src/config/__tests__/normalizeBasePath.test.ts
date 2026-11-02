import { describe, expect, it } from 'vitest';

import { normalizeBasePath } from '../normalizeBasePath';

describe('normalizeBasePath', () => {
  it.each([
    ['', '/'],
    ['/', '/'],
    ['public/personal-website-ui', '/public/personal-website-ui/'],
    ['/public/personal-website-ui/', '/public/personal-website-ui/'],
  ])('normalizes %j to %j', (input, expected) => {
    expect(normalizeBasePath(input)).toBe(expected);
  });

  it.each([
    '../../escape',
    '//cdn.example.com/app',
    '/app?debug=true',
    '/app#section',
    '/app\\file',
  ])('rejects unsafe path %j', (input) => {
    expect(() => normalizeBasePath(input)).toThrow(
      'VITE_BASE_PATH must be a root-relative URL path without traversal or special characters',
    );
  });
});
