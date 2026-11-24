import { ThemeColors } from '@/shared';

export const bannerStyles = {
  link: {
    display: 'block',
    borderRadius: '14px',
    textDecoration: 'none',
    '&:focus-visible': {
      outline: `2px solid ${ThemeColors.CYAN}`,
      outlineOffset: '4px',
    },
  },
  image: {
    display: 'block',
    width: '100%',
    height: 'auto',
    filter: 'saturate(0.8)',
    mb: { xs: 1, md: 2 },
  },
} as const;
