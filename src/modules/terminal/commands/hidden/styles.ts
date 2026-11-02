import { ThemeColors } from '@/shared';

const terminalText = {
  fontFamily: 'var(--font-mono)',
  fontSize: '14px',
} as const;

export const hiddenCommandStyles = {
  asciiArtContainer: {
    flex: '0 0 auto',
  },
  text: {
    ...terminalText,
    color: ThemeColors.WHITE,
  },
  greenText: {
    ...terminalText,
    color: ThemeColors.GREEN,
  },
  cyanText: {
    ...terminalText,
    color: ThemeColors.CYAN,
  },
  mutedText: {
    ...terminalText,
    color: ThemeColors.MUTED,
  },
  errorText: {
    ...terminalText,
    color: ThemeColors.ERROR,
  },
  magentaText: {
    ...terminalText,
    color: '#ff00ff',
  },
  rickrollLine: {
    ...terminalText,
    color: '#ff00ff',
    mb: 1,
  },
  rickrollMessage: {
    ...terminalText,
    color: ThemeColors.CYAN,
    mt: 2,
  },
  secondaryMessage: {
    ...terminalText,
    color: ThemeColors.MUTED,
    mt: 1,
  },
  spacedErrorText: {
    ...terminalText,
    color: ThemeColors.ERROR,
    mb: 1,
  },
  spacedText: {
    ...terminalText,
    color: ThemeColors.WHITE,
    mb: 1,
  },
  successMessage: {
    ...terminalText,
    color: ThemeColors.GREEN,
    mt: 1,
  },
  cyanMessage: {
    ...terminalText,
    color: ThemeColors.CYAN,
    mt: 1,
  },
  neofetchRoot: {
    display: 'flex',
    gap: 2,
    flexWrap: 'wrap',
  },
  asciiArt: {
    ...terminalText,
    color: '#dd4814',
    m: 0,
  },
  systemDetails: {
    flex: '1 1 auto',
    minWidth: '300px',
  },
  systemName: {
    ...terminalText,
    color: ThemeColors.CYAN,
    fontWeight: 'bold',
  },
  label: {
    color: ThemeColors.CYAN,
  },
  line: {
    ...terminalText,
    color: ThemeColors.CYAN,
    mb: 0.5,
  },
  completeLine: {
    ...terminalText,
    color: ThemeColors.GREEN,
    mb: 0.5,
  },
  matrixLine: {
    fontFamily: 'var(--font-mono)',
    fontSize: '12px',
    color: ThemeColors.GREEN,
    lineHeight: 1.2,
  },
  preformatted: {
    ...terminalText,
    color: ThemeColors.WHITE,
  },
  coffee: {
    ...terminalText,
    color: '#8b4513',
  },
} as const;
