import { Terminal } from '@/modules/terminal';
import type { ReactElement } from 'react';
import { AppThemeProvider } from './providers';

export function App(): ReactElement {
  return (
    <AppThemeProvider>
      <main aria-label="Interactive portfolio terminal">
        <Terminal />
      </main>
    </AppThemeProvider>
  );
}
