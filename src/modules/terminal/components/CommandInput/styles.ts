import { ThemeColors } from '@/shared';

export const commandInputStyles = {
  form: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    border: '1px solid transparent',
    borderRadius: '4px',
    padding: 0.5,
    '&:focus-within': {
      borderColor: ThemeColors.GREEN,
      backgroundColor: 'rgba(0, 255, 0, 0.04)',
    },
    '&:not(:focus-within) [data-terminal-cursor]': {
      backgroundColor: 'transparent',
      outline: `1px solid ${ThemeColors.GREEN}`,
      opacity: 0.6,
    },
  },
  inputContainer: {
    position: 'relative',
    flex: 1,
    fontFamily: 'var(--font-mono)',
    fontSize: { xs: '12px', sm: '14px' },
    color: ThemeColors.GREEN,
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    cursor: 'default',
    border: 'none',
    outline: 'none',
    background: 'transparent',
  },
  visibleInput: {
    fontFamily: 'var(--font-mono)',
    fontSize: { xs: '12px', sm: '14px' },
    color: ThemeColors.GREEN,
    whiteSpace: 'pre',
    pointerEvents: 'none',
  },
  cursor: {
    display: 'inline-block',
    width: { xs: '8px', sm: '10px' },
    height: { xs: '16px', sm: '18px' },
    marginLeft: '2px',
    verticalAlign: 'middle',
  },
  visibleCursor: {
    backgroundColor: ThemeColors.GREEN,
  },
  hiddenCursor: {
    backgroundColor: 'transparent',
  },
} as const;
