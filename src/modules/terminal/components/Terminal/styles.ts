import { ThemeColors } from '@/shared';

export const terminalStyles = {
  viewport: {
    minHeight: '100vh',
    backgroundColor: ThemeColors.BACKGROUND,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: { xs: 1, sm: 2 },
  },
  container: {
    maxWidth: { xs: '100%', sm: '90ch', md: '120ch' },
    backgroundColor: ThemeColors.BACKGROUND,
    padding: { xs: 1.5, sm: 2, md: 3 },
    border: '1px solid #333',
    borderRadius: '4px',
    boxShadow: '0 0 20px rgba(0, 255, 0, 0.1)',
  },
  output: {
    minHeight: { xs: '50vh', sm: '60vh' },
    maxHeight: { xs: '70vh', sm: '80vh' },
    overflowY: 'auto',
    overflowX: 'auto',
    mb: 2,
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
  currentOutput: {
    mt: 2,
  },
  commandLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: { xs: '12px', sm: '14px' },
    color: ThemeColors.MUTED,
    mb: 1,
  },
} as const;
