import Box from '@mui/material/Box';
import type { ReactElement } from 'react';

import { appConfig, profile } from '@/config';

import { bannerStyles } from './styles';

export function Banner(): ReactElement {
  return (
    <Box component="a" href={appConfig.basePath} aria-label="Reset terminal" sx={bannerStyles.link}>
      <picture>
        <source
          media="(max-height: 600px) and (min-width: 600px)"
          srcSet={`${appConfig.basePath}banner-compact.svg`}
        />
        <source media="(max-width: 599px)" srcSet={`${appConfig.basePath}banner-mobile.svg`} />
        <source media="(max-width: 1199px)" srcSet={`${appConfig.basePath}banner-tablet.svg`} />
        <source srcSet={`${appConfig.basePath}banner-wide.svg`} />
        <Box
          component="img"
          src={`${appConfig.basePath}banner.svg`}
          alt={`${profile.name} — ${profile.role} — ${profile.tagline}`}
          sx={bannerStyles.image}
        />
      </picture>
    </Box>
  );
}
