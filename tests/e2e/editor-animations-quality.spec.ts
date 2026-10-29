import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';

const PATH = '/projects/shopify-mobile-store-editor';
const GROUPS = [
  '[aria-labelledby="sheet-states-heading"]',
  '[aria-labelledby="drag-resolution-heading"]',
];

async function setTheme(page: Page, theme: 'light' | 'dark') {
  await page.evaluate((t) => document.documentElement.setAttribute('data-theme', t), theme);
  await page.waitForTimeout(200);
}

for (const theme of ['light', 'dark'] as const) {
  test(`axe finds no violations in either group (${theme})`, async ({ page }) => {
    await page.goto(PATH);
    await setTheme(page, theme);
    for (const selector of GROUPS) {
      await page.locator(selector).scrollIntoViewIfNeeded();
      const results = await new AxeBuilder({ page }).include(selector).analyze();
      expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
    }
  });
}

const WIDTHS = [320, 375, 768, 1024, 1440];

for (const width of WIDTHS) {
  test(`layout at ${width}px: no overflow, expected columns`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(PATH);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflow).toBe(false);

    const info = await page.evaluate(() => {
      const columns = (selector: string) => {
        const grid = document.querySelector<HTMLElement>(selector);
        const group = grid?.closest<HTMLElement>('.ea-group');
        if (!grid || !group) return null;
        return {
          width: group.clientWidth,
          columns: getComputedStyle(grid).gridTemplateColumns.split(' ').length,
        };
      };
      return { states: columns('.ea-states'), compare: columns('.ea-compare') };
    });
    expect(info.states).not.toBeNull();
    expect(info.compare).not.toBeNull();
    expect(info.states!.columns).toBe(info.states!.width >= 648 ? 3 : 1);
    expect(info.compare!.columns).toBe(info.compare!.width >= 504 ? 2 : 1);
  });
}

// Page-level overflow at 200% text is caused by the site header, outside this feature,
// so this check covers only the two groups. The outcome table scrolls inside its own region.
for (const width of [375, 1024]) {
  test(`200% text zoom at ${width}px: groups do not overflow`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(PATH);
    await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
    await page.waitForTimeout(200);
    const overflowing = await page.evaluate((selectors) => {
      const vw = document.documentElement.clientWidth;
      return selectors.flatMap((selector) =>
        [...document.querySelectorAll(`${selector}, ${selector} *`)]
          .filter((e) => !e.closest('[role="region"]'))
          .filter((e) => e.getBoundingClientRect().right > vw + 1)
          .map((e) => `${selector} ${e.tagName}`),
      );
    }, GROUPS);
    expect(overflowing).toEqual([]);
  });
}

test('feature causes no layout shift', async ({ page }) => {
  await page.addInitScript(() => {
    const w = window as unknown as { __shifts: boolean[] };
    w.__shifts = [];
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as unknown as {
        sources?: { node?: Element | null }[];
      }[]) {
        const own = (entry.sources ?? []).some((s) => s.node?.closest?.('.ea-group'));
        w.__shifts.push(own);
      }
    }).observe({ type: 'layout-shift', buffered: true });
  });
  await page.goto(PATH);
  for (const selector of GROUPS) {
    await page.locator(selector).scrollIntoViewIfNeeded();
    await page.waitForTimeout(1500);
  }
  const shifts = await page.evaluate(() => (window as unknown as { __shifts: boolean[] }).__shifts);
  expect(shifts.filter(Boolean)).toHaveLength(0);
});

test('records frame intervals over 20 seconds (not asserted)', async ({ page }, testInfo) => {
  test.setTimeout(60_000);
  await page.goto(PATH);
  await page.locator(GROUPS[0]).scrollIntoViewIfNeeded();
  const stats = await page.evaluate(
    () =>
      new Promise<{ frames: number; p95: number; share20: number }>((resolve) => {
        const intervals: number[] = [];
        let last = performance.now();
        const start = last;
        const tick = (now: number) => {
          intervals.push(now - last);
          last = now;
          if (now - start < 20_000) requestAnimationFrame(tick);
          else {
            const sorted = [...intervals].sort((a, b) => a - b);
            resolve({
              frames: intervals.length,
              p95: sorted[Math.floor(sorted.length * 0.95)],
              share20: intervals.filter((i) => i <= 20).length / intervals.length,
            });
          }
        };
        requestAnimationFrame(tick);
      }),
  );
  testInfo.annotations.push({
    type: 'frame-timing',
    description: `frames=${stats.frames} p95=${stats.p95.toFixed(1)}ms share<=20ms=${(stats.share20 * 100).toFixed(1)}%`,
  });
  console.log('frame-timing', JSON.stringify(stats));
  expect(stats.frames).toBeGreaterThan(0);
});
