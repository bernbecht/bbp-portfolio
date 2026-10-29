# Ideas

**Last updated:** 2026-10-29  
**Current focus:** Add an accessibility check to the build.

## Idea inbox

Just jot the idea, one per line, and move on. Do not prioritize here. The `roadmap-curator` agent
(`/roadmap`) empties this inbox on every round and sends each item to the table below, to Rejected, or to
Completed. Prioritized ideas that become specs get a row in [`roadmap.md`](roadmap.md).


## Prioritized ideas roadmap

| Priority | Initiative | Value | Effort | Why now | Status |
| --- | --- | ---: | ---: | --- | --- |
| P0 | Add an accessibility check to the build | High | S | Turns accessibility from a portfolio claim into demonstrated engineering practice. Folded into spec 003 (Lighthouse a11y and SEO), which is already on the roadmap. | Planned (roadmap 003) |
| P1 | Create a Storybook for this portfolio | High | L | A durable portfolio artifact showing component, token, state, and accessibility-system practice. Best after 003 so stories inherit the a11y check. | Planned |
| P1 | Add a design × engineering intersection diagram | Medium | S | Clarifies positioning quickly and supports the homepage narrative. Small and independent. | Planned |
| P2 | Ship the dot field experiment on the Experiments page | Medium | M | `app/experiments/page.tsx` still says "Coming soon" and `components/DotFieldExperiment.tsx` is not used by any route. Finishing it makes a public, sitemap-listed page real. Needs the Principle VII checklist and a Principle VIII check. | Planned (roadmap 005) |
| P2 | Run CI performance job only when relevant | Medium | S | Skips Lighthouse on docs-only PRs and saves CI minutes (Principle IX spirit). Principle VIII says the job runs on every PR, so it needs a constitution amendment; fold it into the spec 004 restructure. | Planned (roadmap 006) |
| P2 | Add audience controls to the blog | Medium | M | Prioritize only after validating distinct recruiter, designer, and engineer needs. | Validate |
| P2 | Add a Thoughts section | Medium | M | Builds a long-term point of view, provided a sustainable publishing cadence exists. | Later |
| P2 | Coordinate multiple agents working on specs in parallel | Low | M | Process improvement. Spec Kit handles one feature at a time and `docs/roadmap.md` already encodes dependencies, so revisit after 003 and 004 show real parallel work. | Later |
| P3 | Add i18n | Low | L | Valuable only when it supports a specific audience goal. It also conflicts in spirit with the English-only rule, so it needs a constitution change. | Backlog |
| P3 | Style "code" in the hero headline | Low | S | A visual refinement with limited impact. `components/Hero.tsx` still renders "code" as plain text. | Backlog |

## Proposals from the curator

Written by the `roadmap-curator` agent, each with evidence. Accept one by telling the agent, or reject it
(it moves to Rejected and is not proposed again).

1. **Retire `app/BACKLOG.md`.** Evidence: it is a second, stale backlog inside `app/`. It lists "Add dark theme" as open, but `components/ThemeToggle.tsx` is shipped, and its other items (click sound, logo, mobile hover) appear nowhere in `docs/ideas.md`. Move live items into the inbox and delete the file, so there is one idea store.
2. **Automated check for the theme toggle and sound rules.** Evidence: Principle IV (no flash of wrong theme, sound never autoplays) and Principle VII depend only on a PR checklist, and the constitution's deferred items say no test runner exists. A small free Playwright smoke test would turn two MUSTs into checks. Playwright is open source (Principle IX).
3. **Dependency and security automation.** Evidence: replan finding 6 lists `npm audit` in CI, and `.github/workflows/ci.yml` has no audit step or update tooling. Dependabot is free on GitHub. Candidate to bundle with spec 004.
4. **Guard against dropped inbox items.** Evidence: the "Reliability in Axonify" idea was in `main:docs/ideas.md` but vanished from the inbox on `feat/roadmap-curator-agent` with no Rejected or Completed entry. A tiny check that fails when a line leaves `ideas.md` unaccounted for would enforce the "never delete silently" rule.

## Questions for you

Items the agent could not triage without your answer.

None.

## Rejected

| Idea | Reason |
| --- | --- |
| None yet | |

## Completed

| Initiative | Completed |
| --- | --- |
| Improve the visual-regression case study | Yes |
| Shorten the “/02 · Selected work” title and reflect the change on the Work page | Yes |
| Add dark/light themes | Yes (`components/ThemeToggle.tsx` in the header; checked in the inbox) |
| Create an Experiments page | Yes (`app/experiments/page.tsx`; the dot field content is still pending, see roadmap 005) |
| Create an agent that updates the roadmap and ideas | Yes (`.claude/agents/roadmap-curator.md`, constitution 1.8.0) |
