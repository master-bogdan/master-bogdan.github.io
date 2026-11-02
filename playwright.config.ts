import { defineConfig, devices } from '@playwright/test';
import { loadEnv } from 'vite';

import { normalizeBasePath } from './src/config/normalizeBasePath';

const environment = loadEnv('production', import.meta.dirname, 'VITE_');
const basePath = normalizeBasePath(environment.VITE_BASE_PATH ?? '/personal-website/');
const BaseUrl = `http://127.0.0.1:4173${basePath}`;

export default defineConfig({
  testDir: './e2e',
  outputDir: 'test-results',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  timeout: 60_000,
  use: {
    baseURL: BaseUrl,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run build && npm run preview -- --host 127.0.0.1 --port 4173',
    url: BaseUrl,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
