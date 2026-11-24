import { ThemeColors } from '@/shared';

export const quickCommandsStyles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1,
    mb: 2,
    justifyContent: 'flex-start',
    '@media (max-height: 600px)': { mb: 1, gap: 0.75 },
  },
  command: {
    fontFamily: 'var(--font-mono)',
    fontSize: { xs: '13px', sm: '15px' },
    backgroundColor: ThemeColors.PAPER,
    color: ThemeColors.CYAN,
    border: `1px solid ${ThemeColors.CYAN}`,
    cursor: 'pointer',
    height: { xs: '32px', sm: '38px' },
    '@media (max-height: 600px)': { height: '28px', fontSize: '12px' },
    '&:hover': {
      backgroundColor: '#2a2a2a',
      borderColor: ThemeColors.GREEN,
      color: ThemeColors.GREEN,
    },
  },
} as const;
