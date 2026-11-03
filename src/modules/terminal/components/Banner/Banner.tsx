import Box from '@mui/material/Box';
import type { ReactElement } from 'react';

import { appConfig } from '@/config';

import { bannerStyles } from './styles';

export function Banner(): ReactElement {
  return (
    <picture>
      <source media="(max-width: 599px)" srcSet={`${appConfig.basePath}banner-mobile.svg`} />
      <source media="(max-width: 899px)" srcSet={`${appConfig.basePath}banner-tablet.svg`} />
      <Box
        component="img"
        src={`${appConfig.basePath}banner.svg`}
        alt="BogdanLabs.dev — Bogdan Shchavinskyi, Tech Lead / Senior Software Engineer — Backend Infrastructure, DevOps and Platform Engineering"
        sx={bannerStyles.image}
      />
    </picture>
  );
}
