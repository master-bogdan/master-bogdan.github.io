import { ThemeColors } from '@/shared';

const terminalText = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--terminal-font-size, 16px)',
} as const;

export const commandStyles = {
  title: {
    ...terminalText,
    color: ThemeColors.CYAN,
    mb: 1,
  },
  text: {
    ...terminalText,
    color: ThemeColors.WHITE,
    mb: 0.5,
  },
  muted: {
    ...terminalText,
    color: ThemeColors.MUTED,
  },
  link: {
    color: ThemeColors.GREEN,
    textDecoration: 'none',
    '&:hover': { textDecoration: 'underline' },
  },
  downloadLink: {
    ...terminalText,
    color: ThemeColors.GREEN,
    textDecoration: 'none',
    '&:hover': { textDecoration: 'underline' },
  },
  commandRow: {
    display: 'flex',
    gap: 1,
    mb: 1,
  },
  commandName: {
    ...terminalText,
    color: ThemeColors.GREEN,
    minWidth: '10ch',
  },
  commandDescription: {
    ...terminalText,
    color: ThemeColors.WHITE,
  },
  hiddenTitle: {
    ...terminalText,
    color: '#ff00ff',
    mb: 1,
  },
  hiddenCommandName: {
    ...terminalText,
    color: '#ff00ff',
    minWidth: '10ch',
  },
  helpFooter: {
    ...terminalText,
    color: ThemeColors.MUTED,
    mt: 2,
  },
  unknownCommand: {
    ...terminalText,
    color: ThemeColors.ERROR,
  },
} as const;
