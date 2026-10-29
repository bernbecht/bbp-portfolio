import { expect, test } from '@playwright/test';

const PATH = '/projects/shopify-mobile-store-editor';

const openOf = (page: import('@playwright/test').Page, frame: string) =>
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
