import { defaultUrlTransform, type UrlTransform } from 'react-markdown';

import { appConfig } from '@/config';

export const transformMarkdownUrl: UrlTransform = (url, _key, node) => {
  const safeUrl = defaultUrlTransform(url);
  const isLocalImage = node.tagName === 'img' && safeUrl.startsWith('/');

  if (!isLocalImage) {
    return safeUrl;
  }

  return `${appConfig.basePath}${safeUrl.slice(1)}`;
};
