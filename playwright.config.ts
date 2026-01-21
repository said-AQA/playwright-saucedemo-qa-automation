import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  timeout: 30_000,

  expect: {
    timeout: 5_000,
  },

  retries: 1,

  // Rapport HTML, mais ne s'ouvre pas tout seul
  reporter: [['html', { open: 'never' }]],

 use: {
  baseURL: 'https://www.saucedemo.com/',
  locale: 'fr-FR',
  headless: true,
  viewport: { width: 1280, height: 800 },
  trace: 'on-first-retry',
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
}
,

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});


