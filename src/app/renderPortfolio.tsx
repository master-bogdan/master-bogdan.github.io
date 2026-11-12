import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';

import { appConfig } from '@/config';
import { getBlogPosts } from '@/modules/blog';
import { contentHref } from '@/modules/navigation';
import { projects } from '@/modules/projects';

import { App } from './App';
import { pageMetadata } from './pageMetadata';

type RenderedPage = {
  readonly relativePath: string;
  readonly metadata: ReturnType<typeof pageMetadata>;
  readonly html: string;
};

export const renderPortfolioPages = (): readonly RenderedPage[] => {
  const paths = [
    appConfig.basePath,
    contentHref('blog'),
    ...getBlogPosts().map((post) => contentHref('blog', post.slug)),
    contentHref('resume'),
    contentHref('projects'),
    ...projects.map((project) => contentHref('projects', project.slug)),
  ];

  return paths.map((pathname) => ({
    relativePath: pathname.slice(appConfig.basePath.length),
    metadata: pageMetadata(pathname),
    html:
      pathname === appConfig.basePath
        ? ''
        : renderToString(
            <StrictMode>
              <App initialPath={pathname} />
            </StrictMode>,
          ),
  }));
};
