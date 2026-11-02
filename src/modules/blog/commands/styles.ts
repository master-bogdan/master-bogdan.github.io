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
    mb: 2,
  },
  error: {
    ...terminalText,
    color: ThemeColors.ERROR,
  },
  markdown: {
    '& h1': {
      ...terminalText,
      fontSize: '18px',
      color: ThemeColors.CYAN,
      mb: 1,
      mt: 2,
    },
    '& h2': {
      ...terminalText,
      fontSize: '16px',
      color: ThemeColors.GREEN,
      mb: 1,
      mt: 1.5,
    },
    '& p': {
      ...terminalText,
      color: ThemeColors.WHITE,
      mb: 1,
      lineHeight: 1.6,
    },
    '& ul, & ol': {
      ...terminalText,
      color: ThemeColors.WHITE,
      ml: 2,
      mb: 1,
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
      maxWidth: '100%',
      height: 'auto',
    },
  },
} as const;
