# Tasks: Shopify Editor Explanatory Animations

**Input**: spec.md, plan.md, research.md, data-model.md and contracts/ in this feature directory.  
**Tests**: Required by FR-016. Write behavior tests first, observe their meaningful failure, then implement.  
**Format**: `- [ ] Tnnn [P] [USn] Description with path`. `[P]` denotes independent files/work after prerequisites, not authorization to spawn agents.

All source paths below are proposed relative to the eventual application repository. T002 must replace them with verified host equivalents before coding. Feature documentation paths are `specs/001-editor-animations/`. Checked tasks are implemented and verified with evidence in `validation-report.md`. T013, T019 and T021 to T024 are partially covered or pending; see that report.

## Phase 1 — Setup and repository reconciliation

- [x] T001 Inspect actual repository instructions, `.specify/memory/constitution.md`, templates, framework, scripts, lockfile, article source and existing motion/test infrastructure; record evidence, exact article insertion path/anchors and constitution gates in `specs/001-editor-animations/research.md` and `specs/001-editor-animations/plan.md`.
- [x] T002 Map proposed source/test paths to host conventions and update every task and source tree in `specs/001-editor-animations/tasks.md` and `specs/001-editor-animations/plan.md`; reconcile feature number and installed Spec Kit workflow without overwriting local conventions.
- [x] T003 Inspect the article and any available original diagrams, confirm locale and tokens, and reconcile the proposed snap semantics/copy; record changes in `specs/001-editor-animations/research.md` and update `specs/001-editor-animations/contracts/motion-contract.md` with any justified changes before tests.

**Checkpoint**: Actual repository, source route, paths, commands and applicable rules are known. If access is still missing, report that concrete limitation; do not fabricate a framework or passing gate.

## Phase 2 — Shared foundations

- [x] T004 Write geometry, nearest-snap, velocity-threshold/tie/boundary and phase-continuity tests from the contract in `src/components/case-study/editor-animations/__tests__/motion.test.ts`; include deterministic ten-cycle samples.
- [x] T005 [P] Write controller transition tests for pause, suspension, replay, preference changes and cleanup in `src/components/case-study/editor-animations/__tests__/playback.test.ts` using an injected clock and visibility adapters.
- [x] T006 Implement validated normalized snap geometry in `src/components/case-study/editor-animations/geometry.ts` and pure rule/sampling functions in `src/components/case-study/editor-animations/motion.ts`; pass T004.
- [x] T007 Implement one active-time clock per group and eligibility/cleanup behavior in `src/components/case-study/editor-animations/playback.ts`; pass T005, preserve explicit pause across all automatic transitions.
- [x] T008 Build decorative static frame and scoped frame styles in `src/components/case-study/editor-animations/EditorFrame.tsx` and `src/components/case-study/editor-animations/editor-animations.css`, using actual host tokens, clipped translated sheets and reserved aspect ratio.

**Checkpoint**: Pure contracts pass; controller is independently tested; static frame renders without scripting and has no focusable internals.

## Phase 3 — US1: Three state demonstrations (P1, MVP)

**Independent test**: Mount the state group alone; verify each named loop, pause/resume, reduced motion and static content.

- [x] T009 [US1] Add state-group semantic, keyboard, no-script/reduced-motion and resting-pose assertions in `src/components/case-study/editor-animations/__tests__/components.test.tsx` before implementing the group.
- [x] T010 [US1] Build three distinct labeled static figures and descriptions in `src/components/case-study/editor-animations/StateAnimations.tsx`; do not expose fake editor controls.
- [x] T011 [US1] Enhance `src/components/case-study/editor-animations/StateAnimations.tsx` with the 4000 ms loops, shared group clock, native Pause/Resume control and preference/visibility behavior; keep controls absent until enhancement succeeds.
- [x] T012 [US1] Add responsive state-grid rules and focus/contrast styles in `src/components/case-study/editor-animations/editor-animations.css`; use available container width, not viewport-only assumptions.
- [ ] T013 [US1] Add browser and deterministic visual coverage for three resting states, excursion peaks, keyboard pause, narrow layout and static fallbacks in `tests/e2e/editor-animations.spec.ts` and `tests/visual/editor-animations.spec.ts`.
- [x] T014 [US1] Integrate the group at the exact article path/anchor recorded by T001 in `specs/001-editor-animations/research.md`; preserve heading hierarchy and original copy, and record standalone US1 acceptance evidence in `specs/001-editor-animations/validation-report.md`.

**Checkpoint**: US1 can be reviewed and shipped independently. Required accessibility and lifecycle behavior are part of this increment.

## Phase 4 — US2: Velocity vs Position (P2)

**Independent test**: Mount comparison alone; slow input settles partial/partial, fast input settles partial/full, synchronized at release and after ten cycles.

- [x] T015 [US2] Extend `src/components/case-study/editor-animations/__tests__/components.test.tsx` with shared controls, replay-keeps-pause, scenario text, static outcome-table and unique-ID cases; extend `src/components/case-study/editor-animations/__tests__/motion.test.ts` for every comparison phase boundary.
- [x] T016 [US2] Build static Position/Velocity figures, permanent explanation and reduced-motion outcome table in `src/components/case-study/editor-animations/VelocityPositionComparison.tsx` using shared frame geometry.
- [x] T017 [US2] Add the synchronized 10000 ms slow/fast cycle, shared scenario label, one controller and group Pause/Resume/Replay controls in `src/components/case-study/editor-animations/VelocityPositionComparison.tsx`; derive each panel from the same sample.
- [x] T018 [US2] Add responsive side-by-side/stacked comparison rules in `src/components/case-study/editor-animations/editor-animations.css`, preserving Position-then-Velocity reading order and readable text.
- [ ] T019 [US2] Extend `tests/e2e/editor-animations.spec.ts` and `tests/visual/editor-animations.spec.ts` for exact release/result samples, ten-cycle synchronization, stacked playback, preference changes and replay while paused.
- [x] T020 [US2] Integrate at the article release-decision anchor recorded by T001 in `specs/001-editor-animations/research.md`; reconcile captions with article claims and record standalone US2 acceptance in `specs/001-editor-animations/validation-report.md`.

**Checkpoint**: US2 remains independently renderable and tested; both groups share primitives without depending on each other's presence.

## Phase 5 — Cross-cutting validation and delivery

- [ ] T021 Extend `tests/e2e/editor-animations.spec.ts` with multi-instance IDs, resize-during-drag, zero-sized container recovery, unsupported APIs, offscreen/hidden suspension, route cleanup and ten mount/unmount cycles.
- [ ] T022 [P] Perform responsive/200%-zoom, contrast, keyboard and screen-reader checks from `specs/001-editor-animations/quickstart.md`; record viewport/browser/assistive-technology evidence and defects in `specs/001-editor-animations/validation-report.md`.
- [ ] T023 Measure production bundle delta, 20-second active frame capture, feature-attributable CLS/tasks and ten-second suspended windows using `specs/001-editor-animations/quickstart.md`; record device, exact versions, actual metrics and trace locations in `specs/001-editor-animations/validation-report.md` and fix budget failures in affected feature source files.
- [ ] T024 Run the host's build/type/lint and required regression commands recorded by T001; review integrated visuals and factual captions, recheck constitution in `specs/001-editor-animations/plan.md`, and complete `specs/001-editor-animations/checklists/requirements.md` only where evidence exists.

## Dependencies and execution order

T001 → T002 → T003. T004 and T005 may proceed independently after setup. T006 depends on T004; T007 depends on T005 and geometry in T006; T008 uses T006. Both stories require T006–T008. Within US1: T009 → T010 → T011 → T012 → T013 → T014. Within US2: T015 → T016 → T017 → T018 → T019 → T020. Sequential MVP delivery is preferred: US1, then US2. Shared test/style files prohibit simultaneous edits without coordination.

T021 follows both stories. T022 can run independently of T021 after both story checkpoints; T023 follows final lifecycle changes and requires a stable production build. T024 follows all verification and fixes. Rerun affected checks after fixes; do not repeat unrelated test suites without a reason.

## Requirement traceability

| Requirements / outcomes | Implementation and validation tasks |
|---|---|
| FR-001–002; US1 | T008–T014 |
| FR-003–004; US2; SC-002 | T004, T006, T015–T020 |
| FR-005–006; SC-003 | T005, T007, T009, T011, T015, T017, T019, T021–T022 |
| FR-007–010; SC-004 | T005, T007–T011, T013, T015–T017, T019, T021–T022 |
| FR-011–013; SC-001 | T003, T008, T012–T014, T018–T020, T022 |
| FR-014; SC-006 | T005, T007, T021, T023 |
| FR-015; SC-007 | T001, T008, T023–T024 |
| FR-016; SC-005 | T004–T005, T009, T013, T015, T019, T021–T024 |

## Completion boundaries

This task list covers implementation and verification, not deployment. A checked box means implemented and verified with evidence, not simply authored. Do not mark unavailable browser/device checks as passed. Document any exception and its acceptance impact before claiming completion.

## Phase 6 — Revision 2026-10-28 (contrast, no controls, shared Collapsed start)

- [x] T025 Update spec.md, contracts, data-model, quickstart, plan and research for the three requested changes (spec first).
- [x] T026 Rewrite the state loop tests in `components/editor-animations/__tests__/motion.test.ts` for the shared Collapsed start; remove pause/replay from `__tests__/playback.test.ts`; confirm failures first.
- [x] T027 Implement the new `sampleStateLoop` in `components/editor-animations/motion.ts` and remove pause/resume/replay from `playback.ts` and `usePlaybackGroup.ts`.
- [x] T028 Remove buttons from `StateAnimations.tsx` and `VelocityPositionComparison.tsx`; update component and e2e tests.
- [x] T029 Raise contrast in `editor-animations.css` and `EditorFrame.tsx`; compute ratios for both themes and record them in `validation-report.md`.
