# Implementation Plan: Shopify Editor Explanatory Animations

**Branch**: `001-editor-animations` (proposed) | **Date**: 2026-10-28 | **Spec**: [spec.md](spec.md)

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

Pre-research check: no repository or constitution was available. Repository compliance is **not evaluated**, not automatically passed. Package principles: accessible static baseline; minimal dependencies; deterministic tested rules; no remote services.

Before source changes, T001 must read applicable AGENTS.md files, `.specify/memory/constitution.md`, local templates and project scripts, if present. Record each applicable principle, result and evidence below. If no constitution exists in the real repository, record that fact without inventing one. Recheck after design/path adaptation and before final delivery. A real conflict blocks the affected implementation until reconciled in the plan.

| Gate | Current status | Required evidence |
|---|---|---|
| Existing project rules | Not evaluated | Actual repository paths and rule summary |
| Accessibility/static baseline | Design satisfied; runtime untested | Reduced-motion/no-script and keyboard evidence |
| Dependency/performance policy | Proposed; unmeasured | Production bundle delta and trace |
| Design consistency | Unverified | Article inspection and visual review |

## Project Structure

Documentation: this directory contains spec.md, plan.md, research.md, data-model.md, quickstart.md, tasks.md, contracts/motion-contract.md, contracts/components.md, checklists/requirements.md and validation-report.md.

Proposed source paths, all relative to the eventual repository root:

```text
src/components/case-study/editor-animations/
  geometry.ts
  motion.ts
  playback.ts
  EditorFrame.tsx
  StateAnimations.tsx
  VelocityPositionComparison.tsx
  editor-animations.css
  __tests__/motion.test.ts
  __tests__/playback.test.ts
  __tests__/components.test.tsx
tests/e2e/editor-animations.spec.ts
tests/visual/editor-animations.spec.ts
```

These paths are planning targets, not discovered files. T002 must map them to real framework equivalents and update every task path before implementation. Article insertion target is deliberately discovered in T001 and recorded in research.md; do not guess a Next.js route from a public URL. Static components can be server-rendered where supported; motion/controller enhancement must run only in the browser.

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
