import Box from '@mui/material/Box';
import type { ReactElement } from 'react';

import { appConfig, profile } from '@/config';

import { bannerStyles } from './styles';

export function Banner(): ReactElement {
  return (
    <picture>
      <source media="(max-width: 599px)" srcSet={`${appConfig.basePath}banner-mobile.svg`} />
      <source media="(max-width: 899px)" srcSet={`${appConfig.basePath}banner-tablet.svg`} />
      <Box
        component="img"
        src={`${appConfig.basePath}banner.svg`}
        alt={`${profile.name} — ${profile.role} — ${profile.tagline}`}
        sx={bannerStyles.image}
      />
    </picture>
  );
}
