import { ThemeColors } from '@/shared';

export const terminalStyles = {
  viewport: {
    height: '100dvh',
    boxSizing: 'border-box',
    backgroundColor: ThemeColors.BACKGROUND,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: { xs: 1, sm: 2 },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: { xs: '100%', md: 'min(100%, calc(60dvh + 100px))' },
    '@media (max-height: 700px)': { height: '100%' },
    minHeight: 0,
    overflow: 'hidden',
    maxWidth: { xs: '100%', sm: '90ch', md: '120ch' },
    backgroundColor: ThemeColors.BACKGROUND,
    padding: { xs: 1.5, sm: 2, md: 3 },
    border: '1px solid #333',
    borderRadius: '4px',
    boxShadow: '0 0 20px rgba(0, 255, 0, 0.1)',
  },
  header: {
    flexShrink: 0,
  },
  output: {
    flex: 1,
    minHeight: 0,
    overscrollBehavior: 'contain',
    scrollbarGutter: 'stable',
    overflowY: 'auto',
    overflowX: 'auto',
    '&::-webkit-scrollbar': {
      width: '8px',
      height: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: ThemeColors.PAPER,
    },
    '&::-webkit-scrollbar-thumb': {
      background: ThemeColors.GREEN,
      borderRadius: '4px',
    },
  },
  footer: {
    flexShrink: 0,
    mt: 2,
  },
  commandLabel: {
    flexShrink: 0,
    fontFamily: 'var(--font-mono)',
    fontSize: { xs: '12px', sm: '14px' },
    color: ThemeColors.MUTED,
    mb: 1,
  },
} as const;
