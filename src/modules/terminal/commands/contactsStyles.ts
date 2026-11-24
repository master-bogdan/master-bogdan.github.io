import { ThemeColors } from '@/shared';

export const contactsStyles = {
  root: {
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--terminal-font-size, 16px)',
    color: ThemeColors.WHITE,
    lineHeight: 1.7,
  },
  title: {
    fontFamily: 'var(--font-mono)',
    fontSize: { xs: '24px', md: '28px' },
    color: ThemeColors.CYAN,
    mb: 1,
  },
  person: { fontSize: 'inherit', color: '#c4cec8', mb: 3 },
  download: {
    display: 'inline-flex',
    alignItems: 'center',
    fontSize: 'inherit',
    color: ThemeColors.GREEN,
    textDecoration: 'none',
    backgroundColor: '#101b14',
    border: '1px solid #355a43',
    borderRadius: '5px',
    px: 2.5,
    py: 1.25,
    mb: 4,
    '&:hover': { color: ThemeColors.WHITE, borderColor: ThemeColors.GREEN },
  },
  details: {
    display: 'grid',
    gridTemplateColumns: { xs: '1fr', sm: '8ch minmax(0, 1fr)' },
    columnGap: 3,
    rowGap: { xs: 0.5, sm: 2 },
    m: 0,
  },
  label: { color: ThemeColors.MUTED },
  value: { m: 0, minWidth: 0, mb: { xs: 2, sm: 0 }, overflowWrap: 'anywhere' },
  link: {
    color: ThemeColors.CYAN,
    textDecoration: 'none',
    '&:hover': { textDecoration: 'underline' },
  },
} as const;
