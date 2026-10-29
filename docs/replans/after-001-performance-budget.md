# Replanning after spec 001 (performance budget enforcement)

Triggered by: spec 001, merged in PR #7 on 2026-10-29. Branch: `replan/after-001-performance-budget`.

## What the spec taught us

- The preliminary baseline and the CI baseline disagreed because the Lighthouse versions differed (13.6.0
  against the 12.6.1 bundled with `@lhci/cli`). Pin the tool that CI uses before measuring.
- The slow-network LCP estimate in the lab is not the browser LCP. It forced a looser lab limit (3.0 s)
  while real-user monitoring turned out to be paid, so the 2.5 s field threshold is now unmonitored.
- A decision made for one reason (3.0 s because field data covers 2.5 s) silently lost its reason when a
  later decision removed the field data. Decisions need their dependencies written next to them.

## Constitution changes in this round

- Added the replanning convention to Development Workflow and Quality Gates (version 1.6.0).

## Findings for follow-up specs (not changed in this round)

1. **Rules the code already violates.** En and em dashes appear in user-facing text
   (`app/page.tsx`, `components/Footer.tsx`, `lib/projects.ts`). Make the dash rule checkable.
2. **Exception in the wrong place.** The decision to keep `@vercel/analytics` lives in
   `docs/reference.md`, a descriptive file. Move it into the constitution.
3. **Principle IX gaps.** "Cannot start billing" is not verifiable, and hosting, CI minutes, and fonts
   are not covered. Add a short list of approved free services with the reason for each, and re-check CI
   if the repository becomes private.
4. **Lighthouse can verify more.** Add the accessibility and SEO categories to the existing run, so
   Principles IV and V get an automated check.
5. **Structure.** Split Principle IV into numbered parts (a11y, motion and sound, theme, voice). Shorten
   Principle VIII and point to `performance-budget.json` for numbers other than the 0.95 floor.
6. **Gaps.** Security (use of `dangerouslySetInnerHTML`, `npm audit` in CI), commit message style, and a
   CI check that the constitution version changes when the file changes.
7. **Ambiguities.** What to review on a major framework upgrade, and scoping the English-only rule to
   site content.

## Suggested order of follow-up specs

1. Dashes rule, approved services list, and moving the analytics exception (items 1 to 3).
2. Lighthouse accessibility and SEO (item 4).
3. Constitution restructuring and the remaining gaps (items 5 to 7).
