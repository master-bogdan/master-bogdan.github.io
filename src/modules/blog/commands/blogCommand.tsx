import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import type { ReactElement } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { appConfig, profile } from '@/config';
import { contentHref } from '@/modules/navigation';

import { getBlogPost, getBlogPosts } from '../blogPosts';
import type { BlogPost } from '../types';
import { transformMarkdownUrl } from '../utils';
import { blogCommandStyles } from './styles';

const DisallowedElements = ['script', 'iframe', 'form', 'input', 'button', 'style', 'link'];
const RemarkPlugins = [remarkGfm];
const ArticleDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeZone: 'UTC' });

const blogPostListOutput = (): ReactElement => {
  const posts = getBlogPosts();

  return (
    <Box>
      <Typography component="h1" sx={blogCommandStyles.title}>
        Blog Posts:
      </Typography>
      {posts.map((post, index) => (
        <Box key={post.slug} sx={blogCommandStyles.listItem}>
          <Typography sx={blogCommandStyles.listItemText}>
            {index + 1}.{' '}
            <Link href={contentHref('blog', post.slug)} sx={blogCommandStyles.postLink}>
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
  const body = post.content
    .replace(/^\s*# [^\r\n]+\r?\n+/, '')
    .replace(/^By \*\*[^\r\n]+\*\*\r?\n+/, '');

  return (
    <Box component="article" sx={blogCommandStyles.article}>
      <Link href={contentHref('blog')} sx={blogCommandStyles.backLink}>
        ← All posts
      </Link>
      <Typography component="h1" sx={blogCommandStyles.articleTitle}>
        {post.title}
      </Typography>
      <Box sx={blogCommandStyles.articleMetadata}>
        <Link href={appConfig.basePath} sx={blogCommandStyles.author}>
          {profile.name}
        </Link>
        <Box component="span" aria-hidden="true">
          ·
        </Box>
        <Box component="time" dateTime={post.date}>
          {ArticleDate.format(new Date(`${post.date}T00:00:00Z`))}
        </Box>
      </Box>
      {post.previewImage ? (
        <Box
          component="img"
          src={`${appConfig.basePath}${post.previewImage.slice(1)}`}
          alt={`Article artwork for ${post.title}`}
          width={2400}
          height={720}
          sx={blogCommandStyles.articleArtwork}
        />
      ) : null}
      <Box sx={blogCommandStyles.markdown}>
        <ReactMarkdown
          skipHtml
          disallowedElements={DisallowedElements}
          remarkPlugins={RemarkPlugins}
          urlTransform={transformMarkdownUrl}
        >
          {body}
        </ReactMarkdown>
      </Box>
      <Box sx={blogCommandStyles.articleFooter}>
        <Link href={contentHref('blog')} sx={blogCommandStyles.backLink}>
          ← All posts
        </Link>
      </Box>
    </Box>
  );
};

export const blogCommand = (args: readonly string[]): ReactElement => {
  if (args.length === 0) {
    return blogPostListOutput();
  }

  const slug = args[0];
  const post = getBlogPost(slug);

  if (!post) {
    return blogPostErrorOutput(slug);
  }

  return blogPostContentOutput(post);
};
