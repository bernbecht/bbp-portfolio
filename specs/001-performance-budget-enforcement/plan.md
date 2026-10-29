# Implementation Plan: Performance Budget Enforcement

**Branch**: `001-performance-budget-enforcement` | **Date**: 2026-10-29 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-performance-budget-enforcement/spec.md`

## Summary

Make constitution Principle VIII a checked rule. Add a Lighthouse CI job that builds the site, serves
the production build, measures every public route on the mobile profile (median of 3 runs), and fails
the PR when a route is below its budget. Budgets live in one file, `performance-budget.json`, with a
default and a list of documented per-page exceptions. Fix what the baseline shows below budget. Real-user
monitoring was dropped because the available tool is paid (constitution Principle IX).

A preliminary single-run baseline (see [research.md](research.md)) shows LCP is already 0.9 s and CLS
is 0 on every route. Scores of 0.73 to 0.92 come from Total Blocking Time, and the largest single cost
is the `howler` audio library, loaded on every page by the theme toggle. The fix work is therefore
about script cost on load, not images or video.

## Technical Context

**Language/Version**: TypeScript 5 (strict), Node 22.18+ for scripts, CI on Node 22

**Primary Dependencies**: `@lhci/cli` 0.15.1 (devDependency, free and open source, lab measurement). No
other additions; `howler` replaces `use-sound` as a direct dependency.

**Storage**: Files only: `performance-budget.json` (budget and exceptions), `docs/performance-baseline.md`
(recorded baseline). CI reports are uploaded as workflow artifacts, nothing is stored externally.

**Testing**: The Lighthouse CI job is the test. A scripted deliberate regression verifies it (see
[quickstart.md](quickstart.md)). The repository has no unit test runner, and none is added.

**Target Platform**: Static and server-rendered Next.js site on Vercel. Lab runs on GitHub Actions
`ubuntu-latest` with the preinstalled Chrome.

**Project Type**: Single Next.js web application (App Router).

**Performance Goals**: Per page: performance score at least 0.95, simulated lab LCP at most 3.0 s (real-user p75 LCP at most 2.5 s), CLS at most 0.1,
and Total Blocking Time at most 200 ms as the lab stand-in for INP. Real users: p75 of LCP, INP, CLS in
the "good" range.

**Constraints**: CI performance job under 10 minutes (SC-003). Score variance under 0.03 between
unchanged runs (SC-004). No visual or content change (FR-011). Sound stays user-initiated (Principle IV).

**Scale/Scope**: 6 measured URLs today (home, projects index, experiments, and 3 write-ups), growing with
each new write-up, discovered automatically from `content/projects/`.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Content Model Alignment | Pass | The measured URL list is derived from `content/projects/*.md`, the same source `getAllSlugs()` uses. No content changes. |
| II. Server-First React | Pass | The audio fix keeps `'use client'` in the existing leaf components only. |
| III. Typed, Consistent Code | Pass | New scripts follow the `scripts/check-content.mts` style. ESLint stays green. |
| IV. Accessible, Semantic UI | Pass, watch | Deferring audio loading must keep sound user-initiated, silenceable, and never autoplay. |
| V. SEO and Canonical Correctness | Pass | No metadata changes. |
| VI. Performance by Default | Pass, justified | Two new dependencies, justified in [research.md](research.md) and to be repeated in the PR description. |
| VII. Verification of Interactive Behavior | Applies | `ThemeToggle` and `Header` change, so the PR's interactive checklist is required. |
| VIII. Performance Budget | Subject | This feature implements it and replaces its manual-check note. |
| Quality Gates | Amend | Adding a performance job changes the gate list, so the constitution is amended to 1.5.0 in the same PR. |

No violations. Complexity Tracking is empty.

**Post-design re-check**: unchanged. The design adds no client-side components and no new rendering paths.

## Project Structure

### Documentation (this feature)

```text
specs/001-performance-budget-enforcement/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── performance-budget.schema.json
│   └── ci-performance-check.md
└── tasks.md             # created later by /speckit-tasks
```

### Source Code (repository root)

```text
performance-budget.json            # default budget and documented exceptions (single source)
lighthouserc.cjs                   # Lighthouse CI config: URL discovery, runs, assertions from the budget
scripts/
└── perf-report.mts                # median table from .lighthouseci results; --write for the baseline doc
docs/
└── performance-baseline.md        # recorded baseline: date, commit, per-route table
.github/workflows/ci.yml           # new `performance` job
.github/pull_request_template.md   # manual Lighthouse item replaced by a note
components/
├── ThemeToggle.tsx                # defer audio library until first interaction intent
└── Header.tsx                     # defer haptics library likewise, if the baseline shows it matters
package.json                       # scripts perf:measure, perf:report; dependencies
.specify/memory/constitution.md    # 1.5.0: enforcement note and Quality Gates
docs/reference.md                  # commands, budget, exceptions list, how to read results
```

**Structure Decision**: Single Next.js project. All new files sit at the repository root or in the
existing `scripts/`, `docs/`, and `.github/` folders. No new top-level source directory.

## Complexity Tracking

No constitution violations to justify.
