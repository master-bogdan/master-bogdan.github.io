import { ThemeColors } from '@/shared';

const terminalText = {
  fontFamily: 'var(--font-mono)',
  fontSize: '14px',
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
    mb: 0.5,
  },
  commandName: {
    ...terminalText,
    color: ThemeColors.GREEN,
    minWidth: '120px',
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
    minWidth: '120px',
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
