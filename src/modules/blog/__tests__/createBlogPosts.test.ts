import { describe, expect, it } from 'vitest';

import { createBlogPosts, type BlogPostSource } from '..';

const createSource = (path: string, frontMatter: string, content = '# Post\n'): BlogPostSource => ({
  path,
  markdown: `---\n${frontMatter}\n---\n${content}`,
});

describe('createBlogPosts', () => {
  it('normalizes slugs and sorts newest posts first', () => {
    const posts = createBlogPosts([
      createSource('content/blog/older.md', 'title: Older\ndate: 2025-01-01\nslug: OLDER'),
      createSource('content/blog/b.md', 'title: B\ndate: 2026-01-01\nslug: b'),
      createSource('content/blog/a.md', 'title: A\ndate: 2026-01-01\nslug: a'),
    ]);

    expect(posts.map((post) => post.slug)).toEqual(['a', 'b', 'older']);
  });

  it('rejects duplicate slugs', () => {
    const firstPost = createSource(
      'content/blog/first.md',
      'title: First\ndate: 2026-01-01\nslug: repeated',
    );
    const secondPost = createSource(
      'content/blog/second.md',
      'title: Second\ndate: 2026-01-02\nslug: REPEATED',
    );

    expect(() => createBlogPosts([firstPost, secondPost])).toThrow(
      "Duplicate blog post slug 'repeated'",
    );
  });

  it('rejects files without YAML front matter', () => {
    expect(() =>
      createBlogPosts([{ path: 'content/blog/plain.md', markdown: '# Plain post\n' }]),
    ).toThrow('content/blog/plain.md: expected YAML front matter at the start of the file');
  });

  it('rejects non-object front matter', () => {
    expect(() =>
      createBlogPosts([createSource('content/blog/scalar.md', 'just a scalar')]),
    ).toThrow('content/blog/scalar.md: front matter must be a YAML object');
  });

  it('identifies the file containing malformed YAML', () => {
    const source = createSource('content/blog/malformed.md', 'title: [unfinished');

    expect(() => createBlogPosts([source])).toThrow(
      'content/blog/malformed.md: invalid YAML front matter',
    );
  });

  it('rejects YAML aliases in front matter', () => {
    const source = createSource(
      'content/blog/alias.md',
      'title: &shared Shared\ndate: 2026-01-01\nslug: *shared',
    );

    expect(() => createBlogPosts([source])).toThrow(
      'content/blog/alias.md: invalid YAML front matter',
    );
  });

  it.each(['title', 'date', 'slug'])('rejects a missing %s', (missingField) => {
    const metadata = {
      title: 'Title',
      date: '2026-01-01',
      slug: 'post',
    };
    const frontMatter = Object.entries(metadata)
      .filter(([field]) => field !== missingField)
      .map(([field, value]) => `${field}: ${value}`)
      .join('\n');

    expect(() => createBlogPosts([createSource('content/blog/missing.md', frontMatter)])).toThrow(
      `content/blog/missing.md: front matter field '${missingField}' must be a non-empty string`,
    );
  });

  it.each(['2026-02-30', '01-01-2026'])('rejects invalid date %s', (date) => {
    const source = createSource(
      'content/blog/invalid-date.md',
      `title: Invalid date\ndate: ${date}\nslug: invalid-date`,
    );

    expect(() => createBlogPosts([source])).toThrow(
      "content/blog/invalid-date.md: front matter field 'date' must use YYYY-MM-DD",
    );
  });

  it.each(['two words', '../escape', '-leading-hyphen'])('rejects invalid slug %s', (slug) => {
    const source = createSource(
      'content/blog/invalid-slug.md',
      `title: Invalid slug\ndate: 2026-01-01\nslug: ${slug}`,
    );

    expect(() => createBlogPosts([source])).toThrow(
      "content/blog/invalid-slug.md: front matter field 'slug' must use letters, numbers, and single hyphens",
    );
  });
});
