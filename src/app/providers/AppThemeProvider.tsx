import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import type { PropsWithChildren, ReactElement } from 'react';

import { createAppTheme } from '@/shared';

const appTheme = createAppTheme();

export function AppThemeProvider({ children }: PropsWithChildren): ReactElement {
  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
