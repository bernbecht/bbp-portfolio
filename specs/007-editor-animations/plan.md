# Implementation Plan: Shopify Editor Explanatory Animations

**Branch**: `007-editor-animations` | **Date**: 2026-10-28 | **Spec**: [spec.md](spec.md)

## Summary

Implement two article-local animation groups sharing geometry and deterministic motion functions. Deliver static semantic content first, then enhance only when playback is eligible. A single active-time clock per group drives all its panels. Separate position-only and velocity-aware destination selection from rendering.

## Technical Context

| Item | Decision / integration obligation |
|---|---|
| Language/version | Unknown host; prefer its existing language. Proposed interfaces are TypeScript-shaped, not a requirement to migrate the site. |
| Framework | Not inspected; reuse existing article/component architecture. No framework installation in this workspace. |
| Dependencies | Prefer current host animation utilities if they support deterministic time and lifecycle control; otherwise native requestAnimationFrame and DOM/SVG. No new physics library required. |
| Storage/backend | None; session-local playback intent only. |
| Tests | Vitest (unit, component, bundle size) and Playwright (e2e, axe, responsive, layout shift). Failing versus recorded-only checks are listed in quickstart.md. |
| Platform | Web, keyboard/touch, current and previous stable Chrome/Edge, Firefox and Safari at integration time; record exact versions. Include iOS Safari and Android Chrome smoke tests. |
| Goals | SC-005–SC-007; transforms/opacity for animated properties; no per-frame application tree rerender. |
| Scope | One existing article, two groups, five miniature editor frames. |

## Constitution Check

Checked against `.specify/memory/constitution.md` v1.9.0 on 2026-10-29, when the work moved from the
`shopify-animations` branch into the Spec Kit lifecycle. The first implementation was written before the
constitution existed, so this is a retroactive check.

| Gate | Result | Evidence |
|---|---|---|
| I. Content model | Pass | `npm run check:content`; no post, slug or media changes |
| II. Server-first | Pass with justification | `'use client'` only in `StateAnimations.tsx`, `VelocityPositionComparison.tsx` and `usePlaybackGroup.ts`. Client-only APIs: `requestAnimationFrame`, `IntersectionObserver`, `matchMedia`, `document.visibilityState`. No route file is a client file |
| III. Typed, consistent code | Pass | `npm run lint` and `npx tsc --noEmit`; relative imports were moved to the `@/` alias during migration |
| IV. Accessible UI | Pass, with one accepted deviation | axe-core 0 violations in both themes; `prefers-reduced-motion` and no-script covered by e2e; no dashes in copy. The missing pause control (WCAG 2.2.2) is recorded in spec FR-005. VoiceOver and NVDA are manual and still pending |
| V. SEO | N/A | No metadata or URL change |
| VI. Performance by default | Pass | No new runtime dependency; feature bundle 4399 of 20480 gzipped bytes (`bundle.test.ts`); route transfer delta against `main` is +4281 bytes |
| VII. Verification of interactive behavior | Pass | Automated: 44 Vitest tests, 22 Playwright e2e tests and 23 visual snapshot tests (local only). The PR checklist is also completed |
| VIII. Performance budget | Pass, at the limit | Route score 0.95, LCP 2931 ms, CLS 0, TBT 10 ms on 2026-10-29, see validation-report.md. Any extra weight on this route needs a new measurement |
| IX. No paid tooling | Pass | Vitest, Playwright, axe-core, Testing Library and jsdom are open source and need no account or payment method |

Introducing a test runner required a constitution amendment (1.9.0, see the Sync Impact Report), done
in the same PR as this migration.

## Project Structure

Documentation: this directory contains spec.md, plan.md, research.md, data-model.md, quickstart.md, tasks.md, contracts/motion-contract.md, contracts/components.md, checklists/requirements.md and validation-report.md.

Source paths, relative to the repository root:

```text
components/editor-animations/
  geometry.ts
  motion.ts
  playback.ts
  usePlaybackGroup.ts
  EditorFrame.tsx
  StateAnimations.tsx
  VelocityPositionComparison.tsx
  editor-animations.css
  __tests__/motion.test.ts
  __tests__/playback.test.ts
  __tests__/components.test.tsx
  __tests__/contrast.test.ts
  __tests__/bundle.test.ts
tests/e2e/editor-animations.spec.ts
tests/e2e/editor-animations-quality.spec.ts
tests/visual/editor-animations.spec.ts
vitest.config.ts
playwright.config.ts
```

These paths were mapped to the repository by T002 and verified against the code on 2026-10-29. Article insertion target is deliberately discovered in T001 and recorded in research.md; do not guess a Next.js route from a public URL. Static components can be server-rendered where supported; motion/controller enhancement must run only in the browser.

## Implementation Strategy

1. Discover route/content ownership, styles, SSR boundaries, existing motion tools and commands. Reconcile this package with local Spec Kit templates and constitution without overwriting them.
2. Implement normalized geometry, pure destination selection and pure time sampling. Tests use injected time rather than arbitrary sleep.
3. Implement a static EditorFrame using DOM or inline SVG. Animate only the sheet translation and optional gesture marker opacity/translation. Keep sheet content upright and unscaled; clip its lower portion inside the frame. Do not animate height, layout, shadow or blur.
4. Add a group controller that owns active elapsed time. It reads preference and visibility and has no user pause; suspension is always automatic. Calculate all panels from one sampled timestamp; use no independent repeating timers. Reserve frame dimensions on first render.
5. Build US1 and validate as the MVP. Build US2 against the same contracts with shared scenario labels and controls. Both must stand alone in a fixture.
6. Insert beside the article's state discussion and release-decision discussion respectively. Preserve original copy and fallback diagrams until replacement equivalence is verified; avoid duplicate accessible explanations when replacing a diagram.
7. Run the complete validation matrix; record commands, versions, evidence and failures in validation-report.md. Complete final constitution check.

## Complexity and Risk

No backend, persistent state or external API contract is needed. Shared pure sampling is justified by comparison synchronization and reproducible visual tests. Primary risks are unverified visual references, inaccurate Shopify claims, framework/path assumptions, and background animation leaks. Discovery, labeled editorial assumptions, explicit path mapping and lifecycle tests address these risks. Do not claim visual sign-off until a reviewer has seen the actual integrated illustrations.
