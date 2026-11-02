import { ThemeColors } from '@/shared';

export const quickCommandsStyles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1,
    mb: 2,
    justifyContent: 'flex-start',
  },
  command: {
    fontFamily: 'var(--font-mono)',
    fontSize: { xs: '10px', sm: '12px' },
    backgroundColor: ThemeColors.PAPER,
    color: ThemeColors.CYAN,
    border: `1px solid ${ThemeColors.CYAN}`,
    cursor: 'pointer',
    height: { xs: '24px', sm: '32px' },
    '&:hover': {
      backgroundColor: '#2a2a2a',
      borderColor: ThemeColors.GREEN,
      color: ThemeColors.GREEN,
    },
  },
} as const;
