import type { BlogPost, BlogPostSource } from '../types/blogPost.ts';
import { parseBlogPost } from './parseBlogPost.ts';

export const createBlogPosts = (sources: readonly BlogPostSource[]): readonly BlogPost[] => {
  const posts = sources.map(parseBlogPost);
  const seenSlugs = new Set<string>();

  for (const post of posts) {
    if (seenSlugs.has(post.slug)) {
      throw new Error(`Duplicate blog post slug '${post.slug}'`);
    }

    seenSlugs.add(post.slug);
  }

  return posts.toSorted((left, right) => {
    return right.date.localeCompare(left.date) || left.slug.localeCompare(right.slug);
  });
};
