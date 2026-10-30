# Validation Report

## Package validation — 2026-10-28

Documentation only. Checked local Markdown links, required artifacts, unique sequential task IDs, requirement references and archive contents. No application source was supplied; no implementation tests, browser accessibility audit, visual sign-off or performance measurements have been performed.

## Implementation evidence (2026-10-28, branch `shopify-animations`, uncommitted)

Environment: macOS, Chromium headless shell 156 via Playwright, production build (`next build` + `next start`).

| Area | Status | Evidence |
|---|---|---|
| Repository/path discovery and constitution | Done | research.md integration record; no constitution exists |
| Pure motion rules and controller tests | Pass | `npm test`: 34 tests (motion 18, playback 9, components 7) |
| US1 independent acceptance | Pass (automated + one screenshot review) | components.test.tsx; e2e keyboard pause/resume keeps focus and freezes poses |
| US2 independent acceptance / ten-cycle sync | Pass | motion.test.ts zero-skew check after ten cycles; e2e replay resets both panels |
| Reduced motion, no script | Pass | e2e: no buttons, outcome table visible, static velocity pose 0.9; JS-disabled page keeps headings and no inert buttons |
| Keyboard and screen-reader review | Keyboard only | Keyboard covered by e2e. VoiceOver/NVDA not run |
| Responsive/zoom/themes and visual review | Partial | 320px no horizontal overflow (e2e); 1024 and 375 screenshots inspected for light theme. 200% zoom, dark theme and 768/1440 not run; no visual snapshot suite |
| Build, types and lint | Pass | `npm run build`, `npx tsc --noEmit`, `npm run lint` |
| Bundle delta, frame timing, CLS and tasks | Not measured | SC-005 and SC-007 unverified |
| Offscreen, tab hidden, cleanup and repeated mounts | Unit only | playback.test.ts covers suspension, no catch-up and dispose; no browser trace or ten-remount e2e |
| Article copy/factual reconciliation | Done | Rule aligned to article, see research.md |
| Final constitution check | Done 2026-10-29 | Retroactive, see the Constitution Check table in plan.md |

Known gaps: T013/T019 visual snapshots, T021 remaining e2e cases (resize during drag, zero-size container, remount loop), T022 assistive technology and zoom checks, T023 performance measurements.

## Revision 2026-10-28 (contrast, no controls, shared Collapsed start)

Changes: preview, skeleton and sheet colors derive from site tokens; Pause/Resume/Replay removed (accepted WCAG 2.2.2 deviation, see spec FR-005); all state cards start at Collapsed and move to their destination.

| Check | Result |
|---|---|
| `npm test` | 32 tests pass (motion, controller without pause API, components) |
| `npm run test:e2e` | 5 pass: no buttons, frames start collapsed and reach 0.5 and 0.9, fast release diverges (velocity above 0.85, position 0.5), reduced motion static, no script, 320 px overflow |
| `npm run lint`, `tsc --noEmit`, `npm run build` | Pass |
| Visual review | Screenshots at 1024 px in light and dark at t0 and destination inspected; skeletons and sheet are clearly visible. Comparison figure captured in both themes but only the layout was checked. 375 px not rechecked after this revision |

Computed contrast on resolved colors (sRGB mix, WCAG formula), light / dark:

| Pair | Light | Dark |
|---|---:|---:|
| Frame outline vs page background | 17.9 | 7.1 |
| Sheet edge vs preview | 14.6 | 5.5 |
| Skeleton vs preview | 3.3 | 4.4 |
| Skeleton vs sheet | 4.0 | 5.7 |
| Skeleton border vs preview header (12% mix) | about 3.1 | 3.6 |

The 12% header value was computed after the 16% value gave 2.86 in light; it is not covered by a separate automated test.

Still not run: bundle size, frame timing and CLS, VoiceOver/NVDA, 200% zoom, 768 and 1440 px, visual snapshot suite.

Manual check, 2026-10-28 (product owner): reduced motion works as specified, including switching the preference while the page is open. No-script also checked manually and passes.

## Automated quality checks (added 2026-10-28)

Run on macOS, Chromium headless shell 156 against a production build. Policy in quickstart.md.

| Check | Result |
|---|---|
| axe-core, both groups, light and dark | 0 violations (`tests/e2e/editor-animations-quality.spec.ts`) |
| Widths 320, 375, 768, 1024, 1440 | No page overflow; state grid 3 columns only at container width 648 px or more, comparison 2 columns at 504 px or more |
| 200% text zoom at 375 and 1024 px | Groups do not overflow. The outcome table is wider than the viewport at 375 px and scrolls inside its own region. The page itself overflows at 200% because of the site header button, outside this feature (not fixed here) |
| Layout shift | 0 entries attributable to the feature |
| Bundle (esbuild, minified, gzipped, React external) | 4423 bytes of the 20480 byte budget (`__tests__/bundle.test.ts`). Measured on the feature in isolation, not as a delta of the Next build |
| Cleanup | Ten mount/unmount cycles leave no scheduled frame (jsdom, fake rAF) |
| Frame intervals, 20 s, headless, recorded only | 1201 frames, p95 16.8 ms, 100% at 20 ms or less. Headless on a dev machine, not the reference device protocol |
| Totals | `npm test`: 34 pass. `npm run test:e2e`: 16 pass. Lint and `tsc` clean |

Still not done: visual snapshot suite (T013, T019), resize during playback and zero-size container e2e cases (T021), VoiceOver/NVDA and a real mobile device (T022, T023), 20 s capture on the reference device, long-task measurement.

## Migration into the lifecycle (2026-10-29)

The work moved from branch `shopify-animations` to `007-editor-animations`, cut from `main`. Changes: spec
renumbered from 001 to 007, paths mapped to the repository, retroactive Constitution Check in plan.md,
relative imports replaced by the `@/` alias (Principle III), constitution 1.9.0, CI jobs `test` and `e2e`.

| Check | Result |
|---|---|
| `npm run lint`, `npx tsc --noEmit`, `npm run check:content`, `npm run build` | Pass |
| `npm test` | 34 pass |
| `npm run test:e2e` | 16 pass |
| `npm run perf:measure` (Principle VIII) | Pass. `/projects/shopify-mobile-store-editor`: score 0.95, LCP 2931 ms, CLS 0, TBT 9 ms (post-fix baseline: 0.95, 2932 ms). The route is at the score limit, so any extra weight on it needs a new measurement |

Still pending: T013/T019 visual snapshots, T021 remaining e2e cases, T022 VoiceOver/NVDA, 200% zoom with
the site header, T023 reference-device measurements. Run `speckit-converge` to turn them into tasks.

## Convergence round (2026-10-29)

Environment: MacBook (Apple M1, macOS 15.7.2), Node 26.10.0, Chromium headless shell 156.0.8078.4 via
Playwright 1.64.1, Next 16.1.1 production build (`next build` + `next start -p 3100`), axe-core/playwright
4.14.0, Vitest 3.2.7. This Mac is the recorded reference device for the numbers below. No real mobile device.

| Task | Result | Evidence |
|---|---|---|
| T030 page overflow at 200% text zoom | Pass | At 375 px the page scrolled to 507 px. Two causes outside the feature, both fixed: the header nav (`components/Header.tsx`, `flex-wrap`) and the single column grid of `ShopifyViewportConflictFigure` (`grid-cols-[minmax(0,1fr)]`). The e2e zoom test now asserts page level overflow at 375 and 1024 px |
| T031 contrast | Pass | `__tests__/contrast.test.ts` resolves the CSS tokens of both themes and requires 3:1 for five pairs, including the 12% header mix. It reads `app/globals.css` and `editor-animations.css`, so a token change is checked |
| T013, T019 visual suite | Pass | `tests/visual/editor-animations.spec.ts`, project `visual`, 23 tests, two runs without differences. Instants from quickstart.md: states at 0, 2900, 3700 ms; comparison at 1900, 2500, 5180, 5780, 9200, 10000 ms; static fallbacks at 375 and 1440 px; light and dark. Poses come from the pure samplers under reduced motion. Baselines are darwin only (`npm run test:visual`), so CI does not run them |
| T021 lifecycle e2e | Pass | Unique and resolvable ids; resize during playback keeps the phase (change under 0.4); `display: none` then restore resumes playback; offscreen and hidden tab leave no pending frame callbacks and freeze the pose; ten client side remounts end with no more pending frames than the home page. Unsupported APIs and multi-instance ids stay in `components.test.tsx`, because deleting `IntersectionObserver` in a real browser crashes the host app |
| T023 production metrics | Pass on this device | See the table below |
| Focus order | Pass | e2e: nothing inside `.ea-frame` is focusable, no buttons, the only tab stop in the groups is the "Comparison outcomes" region (scrollable table) |

T023 measurements (`next start`, 1024x900 viewport, Chromium headless):

| Metric | Baseline (`main`, 5b4e604) | With feature | Delta / result |
|---|---:|---:|---|
| JavaScript transferred, `/projects/shopify-mobile-store-editor` (median of 3, encoded) | 168443 B | 171607 B | +3164 B |
| CSS transferred (same method) | 16674 B | 17791 B | +1117 B |
| Total delta | | | 4281 B, 4.2 KiB of the 20 KiB budget (SC-007) |
| Frame intervals, 20 s, states group in view | | 1201 frames | p95 16.8 ms, max 16.8 ms, 100% at 20 ms or less |
| Frame intervals, 20 s, comparison in view | | 1201 frames | p95 16.7 ms, max 16.8 ms, 100% at 20 ms or less |
| Long tasks (over 50 ms) during both captures | | 0 | none |
| Layout shifts | | 0 entries, 0 attributable to the feature | CLS 0 |
| Scrolled away for 10 s | | 1 distinct `--ea-open` value | no animation work (SC-006), plus the pending frame counts in the e2e test |

Raw numbers come from console output of the capture script; no trace file was saved.

`npm run perf:measure` (Principle VIII), all six routes pass: `/projects/shopify-mobile-store-editor`
score 0.95, LCP 2931 ms, CLS 0, TBT 10 ms. This equals the pre-change baseline (0.95, 2932 ms), so the
header and grid fixes did not move it. The route is still at the score limit.

Regression: `npm run lint`, `npx tsc --noEmit`, `npm run check:content`, `npm run build` pass.
`npm test`: 44 pass. `npm run test:e2e`: 22 pass. `npm run test:visual`: 23 pass.

Still open (needs a person or a device): VoiceOver/Safari and NVDA/Firefox review and a real mobile smoke
capture (T022); human review of the integrated visuals and captions, and completing
`checklists/requirements.md` (T024). I looked at two snapshots (comparison light at 5780 ms, states dark at
2900 ms) and they match the contract, but that is not the reviewer sign-off.

### Draft PR description (T032)

Client-only APIs behind each `'use client'` file (Principle II):

| File | API |
|---|---|
| `components/editor-animations/usePlaybackGroup.ts` | `requestAnimationFrame`, `IntersectionObserver`, `window.matchMedia`, `document.visibilityState` |
| `components/editor-animations/StateAnimations.tsx` | uses the hook above and writes CSS custom properties on its frames |
| `components/editor-animations/VelocityPositionComparison.tsx` | same, plus `useState` for the scenario label |

Deviations:
- FR-005: the groups loop with no pause control, which does not meet WCAG 2.2.2 (Pause, Stop, Hide). The
  product owner accepted it. Mitigations: static content for reduced motion and no scripting, suspension
  offscreen or in a hidden tab, no flashing, and captions that carry all meaning.
- Principle VIII: `/projects/shopify-mobile-store-editor` is at score 0.95, the limit. Measured 0.95 after
  this change.
- Two edits outside `components/editor-animations/` were needed for SC-001 at 200% text zoom:
  `components/Header.tsx` (nav wraps) and `ShopifyViewportConflictFigure` in
  `components/ShopifyMobileStoreEditorVisuals.tsx` (grid column cannot grow past the container).
- No new runtime dependency. New dev dependencies (Vitest, Testing Library, jsdom, Playwright, axe-core)
  are open source and need no account (Principle IX; constitution 1.9.0).
- `npm run test:visual` is local only: screenshot baselines are darwin specific.
