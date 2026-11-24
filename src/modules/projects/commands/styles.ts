import { ThemeColors } from '@/shared';

export const projectStyles = {
  root: {
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--terminal-font-size, 16px)',
    color: ThemeColors.WHITE,
    lineHeight: 1.7,
    '& h1': { fontSize: { xs: '24px', md: '28px' }, color: ThemeColors.CYAN, m: 0, mb: 1 },
    '& h2': { fontSize: { xs: '20px', md: '22px' }, color: ThemeColors.CYAN, mt: 3, mb: 1 },
    '& p': { mt: 0, mb: 1.5 },
    '& a': {
      color: ThemeColors.GREEN,
      textDecoration: 'none',
      '&:hover': { textDecoration: 'underline' },
    },
  },
  card: { borderLeft: `2px solid ${ThemeColors.CYAN}`, pl: 2, mb: 3 },
  technologies: { color: ThemeColors.MUTED, fontSize: '14px' },
  preview: {
    display: 'block',
    width: '100%',
    maxWidth: '760px',
    height: 'auto',
    mt: 2,
    borderRadius: '4px',
  },
  update: { mb: 2, '& time': { color: ThemeColors.MUTED, display: 'block', fontSize: '14px' } },
} as const;
