import { ThemeColors } from '@/shared';

const terminalText = {
  fontFamily: 'var(--font-mono)',
  fontSize: '14px',
} as const;

export const blogCommandStyles = {
  title: {
    ...terminalText,
    color: ThemeColors.CYAN,
    mb: 1,
  },
  listItem: {
    mb: 1,
  },
  listItemText: {
    ...terminalText,
    color: ThemeColors.GREEN,
  },
  postLink: {
    ...terminalText,
    color: ThemeColors.GREEN,
    textDecoration: 'none',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
    '&:hover': {
      textDecoration: 'underline',
      color: ThemeColors.CYAN,
    },
  },
  date: {
    ...terminalText,
    color: ThemeColors.MUTED,
    ml: 2,
  },
  hint: {
    ...terminalText,
    color: ThemeColors.MUTED,
    mt: 2,
  },
  publishedDate: {
    ...terminalText,
    fontSize: '12px',
    color: ThemeColors.MUTED,
    mt: 3,
    mb: 1,
  },
  error: {
    ...terminalText,
    color: ThemeColors.ERROR,
  },
  article: {
    fontFamily: 'var(--font-mono)',
    fontSize: { xs: '14px', sm: '16px' },
    maxWidth: '80ch',
    mx: 'auto',
    pb: 2,
    overflowWrap: 'anywhere',
  },
  markdown: {
    '& h1': {
      ...terminalText,
      fontSize: { xs: '22px', sm: '26px' },
      lineHeight: 1.4,
      color: ThemeColors.CYAN,
      mb: 2,
      mt: 0,
    },
    '& h1:has(+ p > img:only-child)': {
      position: 'absolute',
      width: '1px',
      height: '1px',
      padding: 0,
      margin: '-1px',
      overflow: 'hidden',
      clipPath: 'inset(50%)',
      whiteSpace: 'nowrap',
      border: 0,
    },
    '& h2': {
      ...terminalText,
      fontSize: { xs: '18px', sm: '20px' },
      lineHeight: 1.4,
      color: ThemeColors.GREEN,
      mb: 1.5,
      mt: 3,
    },
    '& p': {
      ...terminalText,
      fontSize: 'inherit',
      color: ThemeColors.WHITE,
      mt: 0,
      mb: 2,
      lineHeight: 1.8,
    },
    '& ul, & ol': {
      ...terminalText,
      fontSize: 'inherit',
      color: ThemeColors.WHITE,
      lineHeight: 1.8,
      pl: 3,
      mb: 2,
    },
    '& li': {
      mb: 0.5,
    },
    '& code': {
      fontFamily: 'var(--font-mono)',
      fontSize: '13px',
      color: ThemeColors.GREEN,
      backgroundColor: ThemeColors.PAPER,
      padding: '2px 6px',
      borderRadius: '3px',
    },
    '& pre': {
      fontFamily: 'var(--font-mono)',
      fontSize: '13px',
      color: ThemeColors.GREEN,
      backgroundColor: ThemeColors.PAPER,
      padding: '12px',
      borderRadius: '4px',
      overflow: 'auto',
      mb: 1,
    },
    '& pre code': {
      backgroundColor: 'transparent',
      padding: 0,
    },
    '& a': {
      color: ThemeColors.CYAN,
      textDecoration: 'none',
      '&:hover': { textDecoration: 'underline' },
    },
    '& img': {
      display: 'block',
      maxWidth: '100%',
      height: 'auto',
    },
  },
} as const;
