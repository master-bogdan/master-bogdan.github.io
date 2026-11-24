import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import type { ReactElement } from 'react';

import { appConfig, profile } from '@/config';
import { contentHref } from '@/modules/navigation';

import { articleHeaderStyles } from './styles';

export function ArticleHeader(): ReactElement {
  return (
    <Box component="header" sx={articleHeaderStyles.root}>
      <Box sx={articleHeaderStyles.inner}>
        <Link href={appConfig.basePath} sx={articleHeaderStyles.identity}>
          <Box
            component="img"
            src={`${appConfig.basePath}favicon.svg`}
            alt=""
            width={36}
            height={36}
            sx={articleHeaderStyles.logo}
          />
          {profile.name}
        </Link>
        <Box component="nav" aria-label="Article navigation" sx={articleHeaderStyles.navigation}>
          <Box sx={articleHeaderStyles.links}>
            <Link href={contentHref('blog')} sx={articleHeaderStyles.activeLink}>
              Blog
            </Link>
            <Link href={contentHref('projects')} sx={articleHeaderStyles.link}>
              Projects
            </Link>
            <Link href={contentHref('contacts')} sx={articleHeaderStyles.link}>
              Contact &amp; CV
            </Link>
          </Box>
          <Link href={appConfig.basePath} sx={articleHeaderStyles.terminal}>
            Terminal
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
