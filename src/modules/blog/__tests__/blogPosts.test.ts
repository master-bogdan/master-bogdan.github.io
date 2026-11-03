import { describe, expect, it } from 'vitest';

import { getBlogPost, getBlogPosts } from '..';

describe('Blog posts', () => {
  it('loads the authored Markdown post', () => {
    const posts = getBlogPosts();
    const welcomePost = getBlogPost('welcome');

    expect(posts).toContainEqual(welcomePost);
    expect(welcomePost).toMatchObject({
      slug: 'welcome',
      title: 'Welcome to My Terminal',
      date: '2024-01-15',
    });
    expect(welcomePost?.content).toContain('# Welcome to My Terminal');
    expect(welcomePost?.content.endsWith('\n')).toBe(true);
  });

  it('normalizes a requested slug', () => {
    expect(getBlogPost('  WELCOME ')?.slug).toBe('welcome');
  });

  it('returns undefined when a post does not exist', () => {
    expect(getBlogPost('missing-post')).toBeUndefined();
  });
});
