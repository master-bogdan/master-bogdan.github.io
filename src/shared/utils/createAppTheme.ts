import { createTheme, type Theme } from '@mui/material/styles';

import { ThemeColors } from '../constants';

export const createAppTheme = (): Theme => {
  return createTheme({
    palette: {
      mode: 'dark',
      primary: { main: ThemeColors.GREEN },
      secondary: { main: ThemeColors.CYAN },
      background: {
        default: ThemeColors.BACKGROUND,
        paper: ThemeColors.PAPER,
      },
      text: {
        primary: ThemeColors.GREEN,
        secondary: ThemeColors.CYAN,
      },
      error: { main: ThemeColors.ERROR },
    },
    typography: {
      fontFamily: 'var(--font-mono)',
      fontSize: 14,
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: ThemeColors.BACKGROUND,
            color: ThemeColors.GREEN,
            fontFamily: 'var(--font-mono)',
          },
        },
      },
    },
  });
};
