# Roadmap

**Last updated:** 2026-10-29

This file orders the specs of the repository. Spec Kit handles one feature at a time, so the order and
the dependencies between specs live here.

Lifecycle: an idea in [`ideas.md`](ideas.md) becomes a row below when it is prioritized, and becomes a
folder under `specs/NNN-<slug>/` when `speckit-specify` starts. Each replanning round updates the status
of the finished spec and adds the follow-up specs it spawns. Planned numbers and slugs are provisional
until the spec is created.

## Specs

| Spec | Slug | Goal | Depends on | Status | Origin |
| --- | --- | --- | --- | --- | --- |
| 001 | [performance-budget-enforcement](../specs/001-performance-budget-enforcement/spec.md) | Enforce the Lighthouse performance budget in CI. | None | Done (PR #7) | Principle VIII |
| 002 | free-services-and-dashes | Make the dash rule checkable, list the approved free services, and move the `@vercel/analytics` exception into the constitution. | 001 | Planned | Replan after 001, items 1 to 3 |
| 003 | lighthouse-a11y-seo | Add the accessibility and SEO categories to the Lighthouse run so Principles IV and V get an automated check. | 001 | Planned | Replan after 001, item 4 |
| 004 | constitution-restructure | Split Principle IV, shorten Principle VIII, and close the security, commit style, version check, and ambiguity gaps. | 002, 003 | Planned | Replan after 001, items 5 to 7 |
| 005 | dot-field-experiment | Build the Omarchy-inspired dot field on the Experiments page, with the Principle VII checklist and the performance budget. | 003 | Planned | Ideas: experiments page, dot animation |
| 006 | ci-path-filtering | Run the performance job only when rendering, images, fonts, scripts, or dependencies change, and amend Principle VIII and the quality gates to match. | 004 | Planned | Ideas: run CI only when relevant |
| 007 | [editor-animations](../specs/007-editor-animations/spec.md) | Looping sheet-state animations and a Velocity vs Position comparison in the Shopify case study, with the repository's first test suite. | None | Implemented, validation partial (PR pending) | Migrated from branch `shopify-animations` |

## Ideas not yet scheduled

See the prioritized table in [`ideas.md`](ideas.md). The accessibility check in the build (P0) is covered
by spec 003. The dot field (P2) is spec 005 and CI path filtering (P2) is spec 006. Content ideas (intersection
diagram, Storybook) have no spec row yet. Spec 007 was started before the lifecycle existed and was migrated
into it; it also introduced the test runner that the curator proposed in `ideas.md` (proposal 2).
