import { ThemeColors } from '@/shared';

export const resumeStyles = {
  root: {
    fontFamily: 'var(--font-mono)',
    fontSize: '14px',
    color: ThemeColors.WHITE,
    lineHeight: 1.7,
  },
  name: { fontFamily: 'var(--font-mono)', fontSize: '18px', color: ThemeColors.CYAN, mb: 0.5 },
  role: { fontFamily: 'var(--font-mono)', fontSize: '14px', color: ThemeColors.GREEN, mb: 1.5 },
  links: { display: 'flex', flexWrap: 'wrap', gap: 2, my: 1.5 },
} as const;
