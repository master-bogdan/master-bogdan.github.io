import Box from '@mui/material/Box';
import type { ReactElement } from 'react';

import { appConfig } from '@/config';

import { bannerStyles } from './styles';

export function Banner(): ReactElement {
  return (
    <Box
      component="img"
      src={`${appConfig.basePath}banner.svg`}
      alt="BogdanLabs.dev — Bogdan Shchavinskyi, Tech Lead / Senior Software Engineer — Backend Infrastructure, DevOps and Platform Engineering"
      sx={bannerStyles.image}
    />
  );
}
