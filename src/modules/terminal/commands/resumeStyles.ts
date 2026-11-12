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
  sectionTitle: {
    fontFamily: 'var(--font-mono)',
    fontSize: '15px',
    color: ThemeColors.CYAN,
    mt: 2.5,
    mb: 1,
  },
  list: { pl: 2.5, mt: 0, '& li': { mb: 1 } },
  certifications: { display: 'flex', flexWrap: 'wrap', gap: 3, my: 2 },
  certification: { m: 0, maxWidth: '220px', fontSize: '12px' },
  badge: { display: 'block', mb: 1 },
} as const;
