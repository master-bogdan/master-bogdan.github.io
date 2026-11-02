import type { BlogPost, BlogPostSource } from './types';
import { createBlogPosts } from './utils';

const markdownByPath = import.meta.glob<string>('/content/blog/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
});

const blogPostSources: readonly BlogPostSource[] = Object.entries(markdownByPath).map(
  ([path, markdown]) => ({ path, markdown }),
);

const blogPosts = createBlogPosts(blogPostSources);

export const getBlogPosts = (): readonly BlogPost[] => {
  return blogPosts;
};

export const getBlogPost = (slug: string): BlogPost | undefined => {
  const normalizedSlug = slug.trim().toLowerCase();
  return blogPosts.find((post) => post.slug === normalizedSlug);
};
