---

description: "Task list for performance budget enforcement"
---

# Tasks: Performance Budget Enforcement

**Input**: Design documents from `/specs/001-performance-budget-enforcement/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Tests**: No unit test tasks. The repository has no test runner and the spec does not ask for one. The
Lighthouse CI job is the automated check, and each story is verified by the matching
[quickstart.md](quickstart.md) step.

**Organization**: Tasks are grouped by user story. Phase order differs from story numbers on purpose:
US4 (fixes) comes before US2 (enforcement) so the check is switched on with every page already passing.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: User story the task belongs to (US1 to US5)
- Paths are relative to the repository root

## Phase 1: Setup

**Purpose**: Dependencies and ignores. Each new dependency is justified in research.md (D1, D5) and MUST
be repeated in the PR description (constitution Principle VI).

- [ ] T001 Add `@lhci/cli` 0.15.1 as a devDependency with `npm install -D @lhci/cli@0.15.1` in package.json
- [ ] T002 [P] Add `@vercel/speed-insights` 2.0.0 as a dependency with `npm install @vercel/speed-insights@2.0.0` in package.json
- [ ] T003 [P] Add `/.lighthouseci/` to .gitignore

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The budget file and the Lighthouse configuration that US1, US2, and US4 all use.

**CRITICAL**: No user story work can begin until this phase is complete.

- [ ] T004 Create performance-budget.json at the repository root following contracts/performance-budget.schema.json, with `default` set to `minScore` 0.95, `maxLcpMs` 2500, `maxCls` 0.1, `maxTbtMs` 200 and `exceptions` set to `[]`
- [ ] T005 Create lighthouserc.cjs at the repository root that (a) builds the URL list `/`, `/projects`, `/experiments` plus `/projects/{slug}` for every `.md` file in content/projects/ (no hand-written page list), (b) sets `numberOfRuns` to 3, mobile preset, `startServerCommand` to `npm run start -- -p 3100`, and filesystem output to `.lighthouseci/`, (c) builds `assert.assertMatrix` from performance-budget.json with `aggregationMethod: 'median'` for `categories:performance`, `largest-contentful-paint`, `cumulative-layout-shift`, and `total-blocking-time`, and (d) throws at load time if an exception has a missing or blank `reason`, or a `path` that matches no measured URL (data-model.md validation rules)
- [ ] T006 Add `perf:measure` (`next build && lhci autorun --config=lighthouserc.cjs`) and `perf:collect` (`next build && lhci collect --config=lighthouserc.cjs`, no assertions) scripts to package.json

**Checkpoint**: `npm run perf:collect` produces results in `.lighthouseci/` for every public page.

---

## Phase 3: User Story 1 - Know where the site stands today (Priority: P1) 🎯 MVP

**Goal**: A recorded, repeatable baseline for every public page.

**Independent Test**: Run `npm run perf:collect` then `npm run perf:report`. The table lists every public
page with score, LCP, CLS, TBT, and the number of runs. Two runs on unchanged code differ by at most 0.03
in score (SC-004).

- [ ] T007 [US1] Create scripts/perf-report.mts (same style as scripts/check-content.mts): read `.lighthouseci/*.json`, group by URL, compute the median score, LCP (ms), CLS, and TBT (ms), print a markdown table with a `runs` column, and mark each row `default` or `exception`; with `--write <file>` write the table to that file with the current date and `git rev-parse --short HEAD`
- [ ] T008 [US1] Add `perf:report` (`node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON scripts/perf-report.mts`) to package.json
- [ ] T009 [US1] Run `npm run perf:collect` on the unmodified code, then `npm run perf:report -- --write docs/performance-baseline.md` to record the baseline in docs/performance-baseline.md (FR-004). The Lighthouse bundled with `@lhci/cli` 0.15.1 is 12.6.1, not the 13.6.0 used for the preliminary numbers in research.md, so this run is the only reference baseline; if its scores differ from research.md, say so in docs/performance-baseline.md and use these numbers
- [ ] T010 [US1] Run the collection a second time and confirm per-page score differences are at most 0.03; if not, raise `numberOfRuns` to 5 in lighthouserc.cjs and note it in docs/performance-baseline.md

**Checkpoint**: Baseline recorded. The pages below budget and the failing metric for each are known.

---

## Phase 4: User Story 4 - Bring every page up to the budget (Priority: P1)

**Goal**: Every public page meets the budget with no visual or content change.

**Independent Test**: Re-run `npm run perf:collect` and `npm run perf:report`. Every page is at or above
0.95 with LCP, CLS, and TBT within the default limits, or listed as a documented exception. A visual
comparison before and after shows no intended change (SC-007).

- [ ] T011 [US4] Before changing any code, capture "before" screenshots of every public page from the production build (`npm run build`, then `npm run start -- -p 3100`) with headless Chrome, for example `chrome --headless=new --screenshot=<file> --window-size=390,5000 --virtual-time-budget=5000 http://localhost:3100<path>` for the mobile width and `--window-size=1280,5000` for desktop, saving to `.lighthouseci/screenshots/before/` (gitignored by T003) with one file per page and width; the page list is the same one used by lighthouserc.cjs
- [ ] T012 [US4] In components/ThemeToggle.tsx, stop loading the audio library on page load: load `use-sound`/`howler` only on the first pointer-enter, focus, or pointer-down on the toggle (for example through a lazily loaded leaf client component), so the first click still plays its sound with no perceptible delay. Keep sound user-initiated, never autoplay, and silenceable (Principle IV)
- [ ] T013 [US4] Run `npm run perf:collect` and `npm run perf:report`, and compare with docs/performance-baseline.md to confirm the howler chunk no longer runs on load and TBT dropped on `/` and `/projects/axonify-component-library`
- [ ] T014 [US4] If `web-haptics` in components/Header.tsx still shows meaningful main-thread cost in the report from T013, defer its initialisation to first interaction in the same way; otherwise leave Header.tsx unchanged and note the decision in docs/performance-baseline.md
- [ ] T015 [US4] For each page still below budget after T012 to T014, inspect its Lighthouse JSON in `.lighthouseci/` (main-thread work, unused JavaScript), fix the largest remaining cost in the file responsible, and re-measure; repeat until the page passes. Do not change design or content
- [ ] T016 [US4] For any page that cannot pass without a redesign or content change, add an entry to `exceptions` in performance-budget.json with a non-empty `reason` and limits set to its post-fix median values rounded outward (FR-011a); if none is needed, leave `exceptions` empty
- [ ] T017 [US4] Capture "after" screenshots the same way as T011 into `.lighthouseci/screenshots/after/`, then compare each page's before and after images side by side (for example by opening both, or with an image diff) and confirm no intended change to layout, copy, or imagery (SC-007); list any difference found, and fix or justify it, in docs/performance-baseline.md
- [ ] T018 [US4] Update docs/performance-baseline.md with a "after fixes" table next to the baseline, and verify the interactive behavior of the theme toggle by hand (persists across reload, no flash of the wrong theme, no sound on load, first click plays sound, sound can be silenced, `prefers-reduced-motion` respected, keyboard reachable with a visible focus style) for the PR checklist (Principle VII)

**Checkpoint**: Every public page meets its budget. `npm run perf:measure` would exit 0.

---

## Phase 5: User Story 2 - Stop regressions before they merge (Priority: P1)

**Goal**: A PR that pushes any public page below budget is blocked with a clear message.

**Independent Test**: quickstart.md steps 2 to 4: a deliberately slow page fails with the page, audit,
value, and limit named; a new write-up is measured with no config edit; an exception without a reason
fails immediately.

- [ ] T019 [US2] Add a `performance` job to .github/workflows/ci.yml, separate from `quality-gates`, triggered on pull requests and pushes to `main`: checkout, setup Node 22 with npm cache, `npm ci`, `npm run perf:measure` with `NEXT_PUBLIC_SITE_URL` set as in the existing job, `timeout-minutes: 10`
- [ ] T020 [US2] In the same job, always (even on failure) append `npm run perf:report` output to `$GITHUB_STEP_SUMMARY` and upload `.lighthouseci/` as a workflow artifact with `actions/upload-artifact`
- [ ] T021 [US2] Confirm failure messages name the page, audit, measured value, and limit (FR-006) and that a missing result makes the job fail rather than pass (FR-007); adjust lighthouserc.cjs if the default lhci output does not show all four
- [ ] T022 [US2] Run quickstart.md steps 2, 3, and 4 locally on a throwaway branch (deliberate regression, new write-up, exception without reason) and confirm the expected outcomes, then revert the throwaway changes
- [ ] T023 [US2] With the maintainer's approval to push, push the branch and open a pull request against `main` (the job only runs on `pull_request` and on pushes to `main`, not on a bare branch push), then confirm the `performance` job runs, passes, shows the table in the job summary, finishes in under 10 minutes (SC-003), and that three repeated CI runs vary by at most 0.03 (SC-004); if not, raise `numberOfRuns` to 5 in lighthouserc.cjs

**Checkpoint**: A clean PR passes and a regressing PR fails, verified in CI.

---

## Phase 6: User Story 3 - See how real visitors experience the site (Priority: P2)

**Goal**: Real-user Core Web Vitals per page, visible to the site owner.

**Independent Test**: quickstart.md step 5: after deploy, a visit appears in the Speed Insights view.

- [ ] T024 [US3] Render `<SpeedInsights />` from `@vercel/speed-insights/next` next to `<Analytics />` in app/layout.tsx (Server Component, no `'use client'` added)
- [ ] T025 [US3] Run `npm run build` and `npm run perf:measure` to confirm the added component does not push any page below its budget
- [ ] T026 [US3] Document in docs/reference.md that Speed Insights must be enabled once in the Vercel project settings, where to read the p75 values, and that no cookies are set (FR-009, FR-010). Record the manual enablement as a follow-up for the maintainer in the PR description

**Checkpoint**: Real-user data starts flowing once the maintainer enables it in Vercel.

---

## Phase 7: User Story 5 - Documentation and checklist match the automation (Priority: P3)

**Goal**: No document tells contributors to run a manual performance check.

**Independent Test**: Read the constitution, docs/reference.md, and the PR template. None asks for a
manual measurement (SC-008).

- [ ] T027 [P] [US5] Amend .specify/memory/constitution.md to 1.5.0: replace Principle VIII's "Enforcement status" paragraph with a description of the automated `performance` job, add the job to the Quality Gates list and to the CI sentence, and update the Sync Impact Report (FR-013, FR-014)
- [ ] T028 [P] [US5] Update docs/reference.md: add `perf:measure`, `perf:collect`, `perf:report` to Commands, add a "Performance budget" section (budget values, performance-budget.json, the exceptions list and why each exists, how to read the CI summary and artifact, and that Chrome is needed locally), and add `@lhci/cli` and `@vercel/speed-insights` to the stack list
- [ ] T029 [P] [US5] In .github/pull_request_template.md, replace the manual Lighthouse checkbox with a note that the `performance` job runs automatically, keeping the dependency justification item
- [ ] T030 [P] [US5] In specs/001-performance-budget-enforcement/contracts/ci-performance-check.md, add the `perf:collect` command to the commands table

---

## Phase 8: Polish & Cross-Cutting Concerns

- [ ] T031 Run `npm run lint`, `npm run check:content`, and `npm run build`; all must pass
- [ ] T032 Run the full quickstart.md from step 1 to 7 and tick each expected outcome
- [ ] T033 Prepare the PR description: justification for `@lhci/cli` and `@vercel/speed-insights` (research.md D1, D5), the completed interactive checklist from T018, the Vercel Speed Insights enablement follow-up, the branch protection follow-up (make `performance` a required check), and any exceptions with their reasons

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: no dependencies.
- **Foundational (Phase 2)**: depends on T001; blocks all stories.
- **US1 (Phase 3)**: depends on Phase 2. It is the MVP.
- **US4 (Phase 4)**: depends on US1 (it needs the baseline to know what to fix).
- **US2 (Phase 5)**: depends on US4 so enforcement is switched on with all pages passing.
- **US3 (Phase 6)**: depends on T002 and Phase 2; independent of US2 and US4 otherwise.
- **US5 (Phase 7)**: depends on US2 and US3 so the documents describe what exists.
- **Polish (Phase 8)**: depends on all stories.

### Within Stories

- T007 before T008 and T009; T009 before T010.
- T011 before T012 (the "before" screenshots need unmodified code); T012 before T013; T013 before T014, T015, T016; T016 before T017; T017 before T018.
- T019 before T020; T021 and T022 after T020; T023 after a pull request is open.

### Parallel Opportunities

- T002 and T003 in Phase 1.
- T027, T028, T029, and T030 in Phase 7 (four different files).
- US3 (T024 to T026) can run in parallel with US4 and US2 if the work is split, since it touches only app/layout.tsx and docs/reference.md; T025 should be re-run after US4 lands.

---

## Parallel Example: Phase 7

```bash
Task: "Amend .specify/memory/constitution.md to 1.5.0"
Task: "Update docs/reference.md with the performance budget section"
Task: "Replace the manual Lighthouse checkbox in .github/pull_request_template.md"
Task: "Add perf:collect to contracts/ci-performance-check.md"
```

---

## Implementation Strategy

### MVP First (User Story 1 only)

1. Phase 1 Setup, Phase 2 Foundational.
2. Phase 3 (US1): the baseline is recorded and the real problems are known.
3. Stop and validate: compare the table with the preliminary baseline in research.md. Differences are expected because the two use different Lighthouse versions (T009); the recorded baseline wins.

### Incremental Delivery

1. US1 gives the baseline.
2. US4 makes every page pass.
3. US2 turns enforcement on, with no failing pages to block merges.
4. US3 adds real-user data.
5. US5 and Polish align the documents and finish the PR.

---

## Notes

- Commit after each task or logical group, using Conventional Commits.
- Do not change design or content to hit the budget (spec, out of scope). Use an exception instead.
- Two things need the maintainer outside the repository: enabling Speed Insights in Vercel, and making
  the `performance` job a required check in GitHub branch protection.
