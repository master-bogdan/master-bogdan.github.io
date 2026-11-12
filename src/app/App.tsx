import { Terminal } from '@/modules/terminal';
import { useEffect, type ReactElement } from 'react';
import { appConfig } from '@/config';
import { AppThemeProvider } from './providers';
import { updatePageMetadata } from './pageMetadata';

type AppProps = { readonly initialPath?: string };

export function App({
  initialPath = typeof window === 'undefined' ? appConfig.basePath : window.location.pathname,
}: AppProps): ReactElement {
  useEffect(() => updatePageMetadata(initialPath), [initialPath]);
  return (
    <AppThemeProvider>
      <main aria-label="Interactive portfolio terminal">
        <Terminal initialPath={initialPath} onNavigate={updatePageMetadata} />
      </main>
    </AppThemeProvider>
  );
}
