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

## Ideas not yet scheduled

See the prioritized table in [`ideas.md`](ideas.md). The accessibility check in the build (P0) is covered
by spec 003.
