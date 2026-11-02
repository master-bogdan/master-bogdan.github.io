import { ThemeColors } from '@/shared';

const terminalText = {
  fontFamily: 'var(--font-mono)',
  fontSize: '14px',
} as const;

export const whoamiStyles = {
  root: {
    maxWidth: '100ch',
    pb: 1,
  },
  identity: {
    borderLeft: `2px solid ${ThemeColors.GREEN}`,
    background: 'linear-gradient(90deg, rgba(0, 255, 0, 0.08), transparent)',
    pl: 2,
    py: 0.75,
    mb: 2.5,
  },
  name: {
    ...terminalText,
    color: ThemeColors.GREEN,
    fontSize: { xs: '18px', sm: '22px' },
    fontWeight: 700,
    letterSpacing: '0.04em',
    mb: 0.25,
  },
  role: {
    ...terminalText,
    color: ThemeColors.CYAN,
    fontSize: { xs: '13px', sm: '15px' },
    fontWeight: 600,
    mb: 1,
  },
  summary: {
    ...terminalText,
    color: ThemeColors.WHITE,
    lineHeight: 1.65,
    maxWidth: '82ch',
  },
  section: {
    mb: 2.5,
  },
  sectionTitle: {
    ...terminalText,
    color: ThemeColors.CYAN,
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.1em',
    mb: 1,
  },
  paragraph: {
    ...terminalText,
    color: ThemeColors.WHITE,
    lineHeight: 1.65,
    mb: 1.25,
    maxWidth: '90ch',
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 0.75,
    listStyle: 'none',
    p: 0,
    m: 0,
  },
  tag: {
    ...terminalText,
    color: ThemeColors.WHITE,
    fontSize: '12px',
    border: '1px solid rgba(24, 199, 255, 0.35)',
    backgroundColor: 'rgba(24, 199, 255, 0.06)',
    borderRadius: '3px',
    px: 1,
    py: 0.35,
  },
  impactGrid: {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, minmax(0, 1fr))' },
    gap: 1,
  },
  impactCard: {
    border: '1px solid rgba(0, 255, 0, 0.28)',
    backgroundColor: 'rgba(0, 255, 0, 0.04)',
    borderRadius: '3px',
    p: 1.25,
  },
  metric: {
    ...terminalText,
    color: ThemeColors.GREEN,
    fontSize: '18px',
    fontWeight: 700,
    mb: 0.5,
  },
  impactDescription: {
    ...terminalText,
    color: ThemeColors.WHITE,
    fontSize: '12px',
    lineHeight: 1.5,
  },
} as const;
