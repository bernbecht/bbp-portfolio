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
| Final constitution check | N/A | No constitution; AGENTS.md rules followed |

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
