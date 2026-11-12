import { appConfig, profile } from '@/config';
import { getBlogPost } from '@/modules/blog';
import { routeCommand } from '@/modules/navigation';
import { getProject } from '@/modules/projects';

type PageContent = {
  readonly heading: string;
  readonly description: string;
  readonly schemaType: 'Person' | 'BlogPosting' | 'CreativeWork' | 'CollectionPage';
  readonly datePublished?: string;
  readonly noindex?: boolean;
};

type PageMetadata = {
  readonly title: string;
  readonly description: string;
  readonly canonical: string;
  readonly ogType: 'article' | 'website';
  readonly structuredData: string;
  readonly noindex: boolean;
};

const overviewContent: Readonly<Record<string, PageContent>> = {
  '': { heading: profile.role, description: profile.description, schemaType: 'Person' },
  resume: {
    heading: 'Resume',
    description:
      "Download Bogdan Shchavinskyi's CV or view his professional experience on LinkedIn. Senior Software Engineer & Tech Lead.",
    schemaType: 'Person',
  },
  blog: {
    heading: 'Blog',
    description:
      'Technical notes on software engineering, platform engineering, and agentic AI workflows by Bogdan Shchavinskyi.',
    schemaType: 'CollectionPage',
  },
  projects: {
    heading: 'Projects',
    description:
      'Explore Neovim Practice and Local AI Lab: hands-on developer education and private local AI agent tooling by Bogdan Shchavinskyi.',
    schemaType: 'CollectionPage',
  },
};
const missingContent: PageContent = {
  heading: 'Content not found',
  description:
    'The requested content was not found. Explore the blog and projects to find a published page.',
  schemaType: 'CollectionPage',
  noindex: true,
};

const describePage = (command: string | undefined, slug: string | undefined): PageContent => {
  if (!slug) {
    return overviewContent[command ?? ''] ?? overviewContent[''];
  }
  if (command === 'blog') {
    const post = getBlogPost(slug);
    if (!post) {
      return missingContent;
    }
    const excerpt = post.content
      .replace(/^#+ .*$/gm, '')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/[*_`>]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 180);
    return {
      heading: post.title,
      description: excerpt || post.title,
      schemaType: 'BlogPosting',
      datePublished: post.date,
    };
  }
  const project = getProject(slug);
  return project
    ? { heading: project.title, description: project.summary, schemaType: 'CreativeWork' }
    : missingContent;
};

const serializeStructuredData = (content: PageContent, canonical: string): string => {
  const details =
    content.schemaType === 'Person'
      ? {
          name: profile.name,
          jobTitle: profile.role,
          knowsAbout: [
            'Software engineering',
            'DevOps',
            'Platform engineering',
            'Agentic AI workflows',
            'TypeScript',
            'Node.js',
            'Go',
            'Kubernetes',
            'AWS',
          ],
          sameAs: [profile.github, profile.linkedIn],
        }
      : {
          name: content.heading,
          author: { '@type': 'Person', name: profile.name, url: profile.url },
          ...(content.datePublished
            ? {
                headline: content.heading,
                datePublished: content.datePublished,
                mainEntityOfPage: canonical,
              }
            : {}),
        };
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': content.schemaType,
    description: content.description,
    url: canonical,
    ...details,
  }).replace(/</g, '\\u003c');
};

export const pageMetadata = (pathname: string): PageMetadata => {
  const [command, slug] = routeCommand(pathname)?.split(' ') ?? [];
  const content = describePage(command, slug);
  const relativePath = command
    ? pathname.slice(appConfig.basePath.length).replace(/\/?$/, '/')
    : '';
  const canonical = new URL(relativePath, profile.url).href;
  return {
    title: command ? `${content.heading} | ${profile.name}` : `${profile.name} | ${profile.role}`,
    description: content.description,
    canonical,
    ogType: content.schemaType === 'BlogPosting' ? 'article' : 'website',
    structuredData: serializeStructuredData(content, canonical),
    noindex: content.noindex ?? false,
  };
};

export const updatePageMetadata = (pathname: string): void => {
  const metadata = pageMetadata(pathname);
  document.title = metadata.title;
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', metadata.canonical);
  const attributes = {
    'meta[name="description"]': metadata.description,
    'meta[property="og:title"]': metadata.title,
    'meta[property="og:description"]': metadata.description,
    'meta[property="og:url"]': metadata.canonical,
    'meta[property="og:type"]': metadata.ogType,
    'meta[name="twitter:title"]': metadata.title,
    'meta[name="twitter:description"]': metadata.description,
    'meta[name="robots"]': metadata.noindex
      ? 'noindex, follow'
      : 'index, follow, max-image-preview:large',
  };
  for (const [selector, content] of Object.entries(attributes)) {
    document.querySelector(selector)?.setAttribute('content', content);
  }
  const schema = document.querySelector('script[type="application/ld+json"]');
  if (schema) {
    schema.textContent = metadata.structuredData;
  }
};
