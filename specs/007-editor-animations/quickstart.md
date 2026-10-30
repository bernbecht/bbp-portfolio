# Integration and Validation Guide

## Prerequisites and setup

1. Place this feature directory in the actual article repository. Read applicable instructions, constitution and local templates before source edits.
2. Complete T001–T003. Record the repository commit, framework, package manager, real component/route paths, browser versions and exact scripts in research.md and plan.md. Do not run invented npm commands or install a framework based on this package.
3. Use the project's lockfile and existing build/test commands. If absent, add the smallest appropriate harness after recording the choice in plan.md. No service credentials or environment secrets are needed.
4. Implement static render first. Mount each group independently in the existing fixture/story/test page, then integrate into the article at verified anchors.
5. Record all validation in validation-report.md. The package itself contains documentation, not a runnable application or passing tests.

## Automated verification

| Layer | Required cases | Evidence |
|---|---|---|
| Pure unit | All snap fixtures; ±threshold; ties; finite/clamped boundaries; phase start/end/wrap; state loop continuity; same pre-release samples; 10-cycle sync | Test command, count and result |
| Controller unit | Hidden time excluded; no controller pause API; live reduced-motion toggle; resize phase preserved; cleanup; unsupported APIs | Fake-clock tests, listener/callback counts |
| Component | Named sections; unique IDs across instances; no focusable mock controls; hidden decorative internals; static descriptions; controls absent before enhancement | Assertions and accessibility scan |
| Browser | No buttons or focusable elements; all state frames start at collapsed; offscreen stop/resume; tab hiding; route unmount/remount; zero-size recovery | Browser trace/video and results |
| Reduced motion | Preference active before load and changed during drag; no transforms or queued frames; returning to no-preference requires Play | Style/sample checks and screenshot |
| No scripting | Article and all explanations remain readable with static drawings; no inert playback buttons | Browser context with JS disabled |
| Visual | Three rest poses, excursion peaks, slow result and fast result; light/dark if host supports them; narrow/wide stacked arrangements | Deterministic snapshots and human review |
| Production | Build/type/lint; bundle delta; isolated 20-second frame trace; layout shift; 10-second suspended window | Build output and recorded metrics |

Write behavior tests before implementation and confirm meaningful failures. Tests should assert user-visible behavior and pure mathematical invariants rather than mirror component internals. Freeze the test clock through a test-only fixture; do not expose public debug controls or production globals. Capture states at 0, 2900, 3700 ms for state loops and 1900, 2500, 5180, 5780, 9200, 10000 ms for comparison.

## Responsive and accessibility review

Test viewports 320×800, 375×812, 768×1024, 1024×768 and 1440×900 CSS px. Additionally test narrow article containers in a wide viewport, 200% text zoom, and reflow at 320 CSS px equivalent. Verify grid thresholds from FR-011, captions outside artwork, controls without clipping and no horizontal page overflow. The comparison must still share one clock when stacked.

Use keyboard-only navigation and at least VoiceOver/Safari plus NVDA/Firefox or the repository's documented equivalent. Confirm reading order: heading, explanation, figure captions, controls. No repeated announcements, fake dialogs or gesture dots are announced. Check contrast in every host-supported theme and visible focus, touch target size, and color-independent outcome labels. Automated accessibility scanning supplements manual review.

## Performance measurement protocol

Use a production build, no development overlay, a recorded 60 Hz reference device/browser, and an isolated feature fixture to attribute costs. Capture 20 seconds with both groups active; report percentage of frame intervals ≤20 ms, any >50 ms feature tasks, CLS and compressed bundle delta against the same build without the feature. On a real representative mobile device, repeat a smoke capture and report differences instead of silently changing the reference.

Suspend via offscreen and document hidden separately for ten seconds; inspect scheduler instrumentation to confirm zero feature frame callbacks, not just apparently stationary pixels. Unmount and verify callbacks/listeners are removed. Repeat mount/unmount ten times to detect duplicate subscriptions. Browser throttling behavior alone is not evidence of cleanup.

## Release acceptance

All FRs, SCs and story scenarios have evidence. No critical accessibility or lifecycle failure remains. A reviewer has confirmed the integrated visuals fit the actual article and that captions do not overstate Shopify behavior. Required repository checks pass. Update final constitution gate and record any deferred work explicitly. Publishing/deployment remains outside this documentation task.

## Automation policy (added 2026-10-28)

Checks that fail the test run (`npm test`, `npm run test:e2e`):
- axe-core scan of both groups in light and dark themes (no violations).
- Viewport widths 320, 375, 768, 1024 and 1440 px: no horizontal overflow; state cards in three columns only when the container allows 200 px each, comparison in two columns only when it allows 240 px each; text zoom emulated at 200%.
- Layout shift: no `layout-shift` entry attributable to the feature's frames.
- Bundle: the feature's minified and gzipped JavaScript and CSS (React external) is at most 20 KiB.
- Cleanup: ten mount/unmount cycles leave no scheduled frame callback (jsdom and browser).
- Contrast: `contrast.test.ts` requires 3:1 for the FR-010 pairs in both themes.
- Zoom: the page itself has no horizontal overflow at 200% text zoom (375 and 1024 px).

Local only (`npm run test:visual`): deterministic screenshots of the poses at the contract instants, in both themes. Baselines are per platform, so CI does not run them.

Recorded only (headless numbers vary by machine, so they never fail the build): frame interval percentiles from a 20 second capture. The result goes in validation-report.md with device and browser.

Manual only: VoiceOver and NVDA, real mobile device, human visual review.
