import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { getBlogPost, getBlogPosts } from '../blogPosts';
import type { BlogPost } from '../types';
import { transformMarkdownUrl } from '../utils';
import { blogCommandStyles } from './styles';

const DisallowedElements = ['script', 'iframe', 'form', 'input', 'button', 'style', 'link'];
const RemarkPlugins = [remarkGfm];

const blogPostListOutput = (onSelectPost: (slug: string) => void): ReactElement => {
  const posts = getBlogPosts();

  return (
    <Box>
      <Typography sx={blogCommandStyles.title}>Blog Posts:</Typography>
      {posts.map((post, index) => (
        <Box key={post.slug} sx={blogCommandStyles.listItem}>
          <Typography sx={blogCommandStyles.listItemText}>
            {index + 1}.{' '}
            <Link
              component="button"
              onClick={() => onSelectPost(post.slug)}
              sx={blogCommandStyles.postLink}
            >
              {post.title}
            </Link>
          </Typography>
          <Typography sx={blogCommandStyles.date}>Date: {post.date}</Typography>
        </Box>
      ))}
      <Typography sx={blogCommandStyles.hint}>
        Click on a post title to read it, or use: blog [slug]
      </Typography>
    </Box>
  );
};

const blogPostErrorOutput = (slug: string): ReactElement => {
  return (
    <Typography sx={blogCommandStyles.error}>
      Error: Post &apos;{slug}&apos; not found. Use &apos;blog&apos; to list all posts.
    </Typography>
  );
};

const blogPostContentOutput = (post: BlogPost): ReactElement => {
  return (
    <Box>
      <Typography sx={blogCommandStyles.title}>{post.title}</Typography>
      <Typography sx={blogCommandStyles.publishedDate}>Published: {post.date}</Typography>
      <Box sx={blogCommandStyles.markdown}>
        <ReactMarkdown
          skipHtml
          disallowedElements={DisallowedElements}
          remarkPlugins={RemarkPlugins}
          urlTransform={transformMarkdownUrl}
        >
          {post.content}
        </ReactMarkdown>
      </Box>
    </Box>
  );
};

export const blogCommand = (
  args: readonly string[],
  onSelectPost: (slug: string) => void,
): ReactElement => {
  if (args.length === 0) {
    return blogPostListOutput(onSelectPost);
  }

  const slug = args[0];
  const post = getBlogPost(slug);

  if (!post) {
    return blogPostErrorOutput(slug);
  }

  return blogPostContentOutput(post);
};
