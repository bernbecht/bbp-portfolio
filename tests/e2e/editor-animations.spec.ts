import type { Page } from '@playwright/test';
import { expect, test } from '@playwright/test';

const PATH = '/projects/shopify-mobile-store-editor';

const openOf = (page: Page, frame: string) =>
  page.locator(`[data-ea-frame="${frame}"]`).evaluate((el) =>
    Number((el as HTMLElement).style.getPropertyValue('--ea-open')),
  );

test('state frames start collapsed and move to their destinations', async ({ page }) => {
  await page.goto(PATH);
  const group = page.getByRole('region', { name: /three positions/i });
  await group.scrollIntoViewIfNeeded();
  await expect(group.getByRole('button')).toHaveCount(0);
  await expect
    .poll(() => openOf(page, 'full'), { timeout: 6000, intervals: [30] })
    .toBeGreaterThan(0.85);
  expect(await openOf(page, 'partial')).toBeGreaterThan(0.45);
  expect(await openOf(page, 'collapsed')).toBeLessThan(0.25);
  await expect
    .poll(() => openOf(page, 'full'), { timeout: 6000, intervals: [30] })
    .toBeLessThan(0.2);
});

test('comparison has no controls and the fast release diverges', async ({ page }) => {
  await page.goto(PATH);
  const figure = page.getByRole('figure', { name: /how a drag resolves/i });
  await figure.scrollIntoViewIfNeeded();
  await expect(figure.getByRole('button')).toHaveCount(0);
  await expect
    .poll(() => openOf(page, 'velocity'), { timeout: 12000, intervals: [50] })
    .toBeGreaterThan(0.85);
  expect(await openOf(page, 'position')).toBeCloseTo(0.5, 1);
  await expect(figure.getByRole('table')).toBeVisible();
});

test('reduced motion shows static content without controls', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto(PATH);
  const figure = page.getByRole('figure', { name: /how a drag resolves/i });
  await figure.scrollIntoViewIfNeeded();
  await expect(figure.getByRole('button')).toHaveCount(0);
  await expect(figure.getByRole('table')).toBeVisible();
  await expect(figure.getByText('Static illustration, reduced motion.')).toBeVisible();
  expect(await openOf(page, 'velocity')).toBeCloseTo(0.9);
  const states = await page.locator('[data-ea-frame="full"]').first();
  expect(Number(await states.evaluate((el) => (el as HTMLElement).style.getPropertyValue('--ea-open')))).toBeCloseTo(0.9);
  await context.close();
});

test('no scripting keeps the explanations without inert buttons', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(PATH);
  await expect(page.getByRole('heading', { name: 'Partially expanded' })).toBeVisible();
  await expect(page.getByRole('table', { name: '' }).first()).toBeAttached();
  await expect(page.getByRole('button', { name: /state animations|comparison/ })).toHaveCount(0);
  await context.close();
});

test('no horizontal overflow at 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto(PATH);
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(overflow).toBe(false);
});

// T021: lifecycle and robustness cases. Unsupported APIs and multi-instance ids are covered in
// components/editor-animations/__tests__/components.test.tsx, because removing
// IntersectionObserver in a real browser breaks the host app itself.

async function trackFrames(page: Page) {
  await page.addInitScript(() => {
    const w = window as unknown as { __raf: Set<number> };
    w.__raf = new Set();
    const raf = window.requestAnimationFrame.bind(window);
    const caf = window.cancelAnimationFrame.bind(window);
    window.requestAnimationFrame = (cb) => {
      const id = raf((t) => {
        w.__raf.delete(id);
        cb(t);
      });
      w.__raf.add(id);
      return id;
    };
    window.cancelAnimationFrame = (id) => {
      w.__raf.delete(id);
      caf(id);
    };
  });
}

const pendingFrames = (page: Page) =>
  page.evaluate(() => (window as unknown as { __raf: Set<number> }).__raf.size);

test('ids in the article are unique and every labelled group resolves its heading', async ({ page }) => {
  await page.goto(PATH);
  const result = await page.evaluate(() => {
    const ids = [...document.querySelectorAll('[id]')].map((e) => e.id);
    const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
    const dangling = [...document.querySelectorAll('[aria-labelledby], [aria-describedby]')].flatMap((e) =>
      [e.getAttribute('aria-labelledby'), e.getAttribute('aria-describedby')]
        .filter((v): v is string => Boolean(v))
        .flatMap((v) => v.split(' '))
        .filter((id) => !document.getElementById(id)),
    );
    return { duplicates, dangling };
  });
  expect(result).toEqual({ duplicates: [], dangling: [] });
});

test('resizing during playback keeps the phase', async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.goto(PATH);
  await page.getByRole('region', { name: /three positions/i }).scrollIntoViewIfNeeded();
  await expect
    .poll(() => openOf(page, 'full'), { timeout: 6000, intervals: [30] })
    .toBeGreaterThan(0.3);
  const before = await openOf(page, 'full');
  await page.setViewportSize({ width: 375, height: 800 });
  const after = await openOf(page, 'full');
  expect(Math.abs(after - before)).toBeLessThan(0.4);
});

test('a zero-sized container recovers playback', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(PATH);
  const group = page.locator('[aria-labelledby="sheet-states-heading"]');
  await group.scrollIntoViewIfNeeded();
  await expect
    .poll(() => openOf(page, 'full'), { timeout: 6000, intervals: [30] })
    .toBeGreaterThan(0.85);
  await group.evaluate((el) => ((el as HTMLElement).style.display = 'none'));
  await page.waitForTimeout(400);
  await group.evaluate((el) => ((el as HTMLElement).style.display = ''));
  await group.scrollIntoViewIfNeeded();
  await expect
    .poll(() => openOf(page, 'full'), { timeout: 6000, intervals: [30] })
    .toBeLessThan(0.3);
  expect(errors).toEqual([]);
});

test('offscreen and hidden tabs stop scheduling animation frames', async ({ page }) => {
  await trackFrames(page);
  await page.goto(PATH);
  await page.waitForTimeout(500);
  const offscreen = await pendingFrames(page);

  const group = page.getByRole('region', { name: /three positions/i });
  await group.scrollIntoViewIfNeeded();
  await expect.poll(() => pendingFrames(page), { timeout: 3000 }).toBeGreaterThan(offscreen);

  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, get: () => true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await expect.poll(() => pendingFrames(page), { timeout: 3000 }).toBeLessThanOrEqual(offscreen);
  const frozen = await openOf(page, 'full');
  await page.waitForTimeout(1500);
  expect(await openOf(page, 'full')).toBe(frozen);

  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, get: () => false });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await expect.poll(() => pendingFrames(page), { timeout: 3000 }).toBeGreaterThan(offscreen);

  await page.evaluate(() => window.scrollTo(0, 0));
  await expect.poll(() => pendingFrames(page), { timeout: 3000 }).toBeLessThanOrEqual(offscreen);
});

test('leaving the route and ten client side remounts leave no feature frame scheduled', async ({ page }) => {
  await trackFrames(page);
  await page.goto('/');
  await page.waitForTimeout(500);
  const baseline = await pendingFrames(page);

  await page.goto(PATH);
  await page.getByRole('region', { name: /three positions/i }).scrollIntoViewIfNeeded();
  await expect.poll(() => pendingFrames(page), { timeout: 3000 }).toBeGreaterThan(baseline);
  for (let i = 0; i < 10; i += 1) {
    await page.getByRole('link', { name: 'Home' }).click();
    await page.waitForURL('**/');
    await page.goBack();
    await page.waitForURL(`**${PATH}`);
    await page.getByRole('region', { name: /three positions/i }).scrollIntoViewIfNeeded();
  }
  await page.getByRole('link', { name: 'Home' }).click();
  await page.waitForURL('**/');
  await page.waitForTimeout(500);
  expect(await pendingFrames(page)).toBeLessThanOrEqual(baseline);
});
