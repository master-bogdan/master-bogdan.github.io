import { defaultUrlTransform, type UrlTransform } from 'react-markdown';

import { appConfig } from '@/config';

export const transformMarkdownUrl: UrlTransform = (url, _key, node) => {
  const safeUrl = defaultUrlTransform(url);
  const isLocalImage = node.tagName === 'img' && safeUrl.startsWith('/');
  const isContentLink = node.tagName === 'a' && /^\/(blog|projects|resume)(\/|$)/.test(safeUrl);

  if (!isLocalImage && !isContentLink) {
    return safeUrl;
  }

  return `${appConfig.basePath}${safeUrl.slice(1)}`;
};
