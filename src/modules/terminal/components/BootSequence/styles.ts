import { ThemeColors } from '@/shared';

export const bootSequenceStyles = {
  message: {
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--terminal-font-size, 16px)',
    color: ThemeColors.GREEN,
    mb: 0.5,
  },
} as const;
