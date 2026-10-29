Measured on 2026-10-29 at commit 666e47b. Median of the runs per page, mobile profile.

| Page | Score | LCP (ms) | CLS | TBT (ms) | Runs | Budget |
|------|-------|----------|-----|----------|------|--------|
| / | 0.85 | 2257 | 0.000 | 537 | 3 | default |
| /experiments | 0.86 | 2623 | 0.000 | 447 | 3 | default |
| /projects | 0.87 | 2622 | 0.000 | 383 | 3 | default |
| /projects/axonify-component-library | 0.86 | 2623 | 0.000 | 438 | 3 | default |
| /projects/catching-ui-regressions | 0.88 | 2115 | 0.000 | 435 | 3 | default |
| /projects/shopify-mobile-store-editor | 0.73 | 5031 | 0.000 | 347 | 3 | default |

## Notes

- Measured with the Lighthouse bundled in `@lhci/cli` 0.15.1 (12.6.1), 3 runs per page, mobile profile. The
  preliminary numbers in `specs/001-performance-budget-enforcement/research.md` used Lighthouse 13.6.0 and
  are not comparable (LCP there was 0.9 s, here 2.1 to 5.0 s).
- Two full collections on unchanged code differed by at most 0.02 in score per page, inside the 0.03 limit
  (SC-004), so 3 runs per page is kept.
- Every page fails the default budget: scores are 0.73 to 0.88, LCP is above 2.5 s on four pages, and TBT is
  above 200 ms on all of them. CLS is 0 everywhere.
- The LCP element on every page is the theme toggle button in the header, and 79% to 91% of LCP is "render
  delay", meaning the main thread is busy with JavaScript when the button could be painted. So the script
  cost is also what holds LCP back.
- `/projects/shopify-mobile-store-editor` is the worst page (score 0.73, LCP 5.0 s), well above the others,
  so it has page-specific cost beyond the shared header scripts.

## After fixes

Same setup as the baseline, after: loading the audio library only on first intent with the theme toggle
(`components/ThemeToggle.tsx`, `use-sound` replaced by a direct `howler` dependency), deferring the poster
and metadata of the two below-the-fold videos on the Shopify write-up (`components/LazyPosterVideo.tsx`),
and giving the serif font `subsets` so it is preloaded (`app/fonts.ts`). Speed Insights was added after
these fixes and did not change the results.

| Page | Score | LCP (ms) | CLS | TBT (ms) | Runs | Budget |
|------|-------|----------|-----|----------|------|--------|
| / | 0.99 | 2266 | 0.000 | 9 | 3 | default |
| /experiments | 0.97 | 2635 | 0.000 | 12 | 3 | default |
| /projects | 0.97 | 2631 | 0.000 | 10 | 3 | default |
| /projects/axonify-component-library | 0.97 | 2630 | 0.000 | 11 | 3 | default |
| /projects/catching-ui-regressions | 0.99 | 2262 | 0.000 | 11 | 3 | default |
| /projects/shopify-mobile-store-editor | 0.95 | 2932 | 0.000 | 11 | 3 | default |

- TBT fell from 340 to 540 ms down to about 10 ms on every page, and scores are 0.95 to 0.99.
- LCP is 2.3 to 2.9 s in the lab. The LCP measured in the browser is about 50 ms; the lab number is a
  simulated slow-network estimate dominated by about 165 KB of framework JavaScript (React and Next) and
  three preloaded fonts. Because of that the lab LCP limit is 3,000 ms while real visitors are held to
  Google's 2.5 s through Speed Insights (research.md D3b).
- `web-haptics` in `components/Header.tsx` costs almost nothing now, so it was left unchanged.
- The Shopify write-up scores exactly 0.95, so it has no margin. If CI variance makes it flaky, look at its
  hero video poster and the evidence images first.
- Before and after screenshots of all pages at 390 and 1280 px differ only in the footer's live clock and a
  few antialiasing pixels (checked with a pixel diff).
- No page needed an exception. `exceptions` in `performance-budget.json` is empty.
