import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: { baseURL: 'http://localhost:3100' },
  projects: [
    { name: 'e2e', testDir: 'tests/e2e' },
    // Snapshot baselines are platform specific (darwin here), so CI does not run this project.
    { name: 'visual', testDir: 'tests/visual', expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.002 } } },
  ],
  webServer: {
    command: 'npm run build && npx next start -p 3100',
    url: 'http://localhost:3100',
    reuseExistingServer: true,
    timeout: 300_000,
  },
});
