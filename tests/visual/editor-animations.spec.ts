import type { Locator, Page } from '@playwright/test';
import { expect, test } from '@playwright/test';
import { sampleComparison, sampleStateLoop } from '@/components/editor-animations/motion';

// Reduced motion keeps the controller static, so poses are set from the pure samplers and the
// snapshots are deterministic. Sample instants come from specs/007-editor-animations/quickstart.md.
test.use({ reducedMotion: 'reduce' });

const PATH = '/projects/shopify-mobile-store-editor';
const STATES = '[aria-labelledby="sheet-states-heading"]';
const COMPARISON = '[aria-labelledby="drag-resolution-heading"]';
const STATE_TIMES = [0, 2900, 3700];
const COMPARISON_TIMES = [1900, 2500, 5180, 5780, 9200, 10000];

async function open(page: Page, width: number, theme: 'light' | 'dark') {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto(PATH);
  await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), theme);
}

async function pose(group: Locator, frame: string, openness: number, marker?: boolean) {
  await group.locator(`[data-ea-frame="${frame}"]`).evaluate(
    (el, [open, show]) => {
      (el as HTMLElement).style.setProperty('--ea-open', String(open));
      if (show !== null) (el as HTMLElement).style.setProperty('--ea-marker', show ? '1' : '0');
    },
    [openness, marker ?? null] as const,
  );
}

async function shoot(group: Locator, name: string) {
  await group.scrollIntoViewIfNeeded();
  await expect(group).toHaveScreenshot(`${name}.png`, { animations: 'disabled' });
}

for (const theme of ['light', 'dark'] as const) {
  test.describe(theme, () => {
    for (const ms of STATE_TIMES) {
      test(`state loop at ${ms} ms (1024 px)`, async ({ page }) => {
        await open(page, 1024, theme);
        const group = page.locator(STATES);
        for (const state of ['collapsed', 'partial', 'full'] as const) {
          await pose(group, state, sampleStateLoop(state, ms));
        }
        await shoot(group, `states-${theme}-${ms}`);
      });
    }

    for (const ms of COMPARISON_TIMES) {
      test(`comparison at ${ms} ms (1024 px)`, async ({ page }) => {
        await open(page, 1024, theme);
        const group = page.locator(COMPARISON);
        const sample = sampleComparison(ms);
        await pose(group, 'position', sample.position, sample.marker);
        await pose(group, 'velocity', sample.velocity, sample.marker);
        await shoot(group, `comparison-${theme}-${ms}`);
      });
    }

    test('static fallbacks at 375 px stack in reading order', async ({ page }) => {
      await open(page, 375, theme);
      await shoot(page.locator(STATES), `states-${theme}-375-static`);
      await shoot(page.locator(COMPARISON), `comparison-${theme}-375-static`);
    });

    test('static fallbacks at 1440 px', async ({ page }) => {
      await open(page, 1440, theme);
      await shoot(page.locator(STATES), `states-${theme}-1440-static`);
      await shoot(page.locator(COMPARISON), `comparison-${theme}-1440-static`);
    });
  });
}

test('samples match the contract at the recorded instants', () => {
  expect(sampleStateLoop('full', 0)).toBeCloseTo(sampleStateLoop('collapsed', 0));
  const slow = sampleComparison(2500);
  expect(slow.position).toBeCloseTo(slow.velocity, 1);
  const fast = sampleComparison(5780);
  expect(fast.velocity).toBeGreaterThan(fast.position);
});
