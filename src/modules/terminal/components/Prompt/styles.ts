import { ThemeColors } from '@/shared';

export const promptStyles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
  },
  text: {
    fontFamily: 'var(--font-mono)',
    fontSize: '14px',
  },
  identity: {
    color: ThemeColors.GREEN,
  },
  path: {
    color: ThemeColors.CYAN,
  },
  punctuation: {
    color: ThemeColors.WHITE,
  },
  cursor: {
    display: 'inline-block',
    width: '10px',
    height: '18px',
    backgroundColor: ThemeColors.GREEN,
    ml: 0.5,
    animation: 'blink 1s step-end infinite',
    '@keyframes blink': {
      '0%, 50%': { opacity: 1 },
      '51%, 100%': { opacity: 0 },
    },
  },
} as const;
