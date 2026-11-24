import { appConfig } from '@/config';

export type ContentCommand = 'blog' | 'projects' | 'contacts' | 'resume';

export const contentHref = (command: ContentCommand, slug?: string): string => {
  return `${appConfig.basePath}${command}/${slug ? `${encodeURIComponent(slug)}/` : ''}`;
};

export const routeCommand = (pathname: string): string | null => {
  if (!pathname.startsWith(appConfig.basePath)) {
    return null;
  }

  const relativePath = pathname.slice(appConfig.basePath.length).replace(/\/index\.html$/, '/');
  const match = /^(blog|projects|contacts|resume)(?:\/([a-z0-9]+(?:-[a-z0-9]+)*))?\/?$/.exec(
    relativePath,
  );

  if (!match) {
    return null;
  }
  const isSinglePage = match[1] === 'resume' || match[1] === 'contacts';
  if (isSinglePage && match[2]) {
    return null;
  }

  return match[2] ? `${match[1]} ${match[2]}` : match[1];
};
