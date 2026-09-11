---
title: 'Catching UI regressions before they ship'
date: '2025-11-08T12:00:00.000Z'
description: >-
  Building a visual-regression system with Playwright and Storybook that made UI changes reviewable before merge and avoided an estimated $10k/year in paid-tool spend at scale.
socialImage: '/projects/catching-ui-regressions/opengraph-image'
---

## At a glance

| | |
|---|---|
| **Role** | Design-system engineer and end-to-end owner |
| **Scope** | Visual-regression detection, coverage reporting, test stability, and rollout |
| **Problem** | Shared-component changes could break product UI without being caught before merge |
| **Constraint** | Increase confidence without adding a usage-priced testing service |
| **Outcome** | UI changes became reviewable in pull requests; the paid-tool alternative was estimated at up to ~$5k/year as adoption scaled |

## A gap between component tests and the interface

At Axonify, I worked on the team responsible for evolving and maintaining the Design System used across our product.

As the system grew, so did its blast radius. Shared components and design tokens were consumed by multiple teams in production, which meant that a seemingly small change to a foundational component could unintentionally affect interfaces across the entire product.

We had strong automated coverage for component behavior, but there was a gap: **we had no automated way to detect unintended visual changes.**

This created a recurring trade-off. Developers could either rely on manual verification, adding pressure to an already busy QA team, or accept the risk that visual regressions would reach production.

The problem did not have a clear owner, so I took the initiative to investigate how we could close that gap.

The question I wanted to answer was:

> **How could we make UI changes safer to ship, without adding significant recurring costs or creating more work for QA?**

## What is visual regression testing?

Traditional automated tests can verify whether a component behaves correctly, but they usually cannot tell whether it still **looks** correct.

Visual regression testing fills that gap by comparing the rendered UI against a previously approved screenshot, called a **baseline**.

The process is simple: render the component in a known state, capture a screenshot, and compare it with the baseline. If there is a difference, a **visual diff** highlights what changed.

That difference is then reviewed: if the change is intentional, the new screenshot becomes the baseline; if it is not, the implementation needs to be fixed.

<!-- case-study-visual:visual-regression-explainer -->

In our case, Storybook provided the known component states, while Playwright rendered, captured, and compared them automatically.

## Build vs. buy

With the problem defined, I evaluated two main approaches: adopting a managed visual-testing service built around Storybook or building the capability into our existing testing infrastructure.

A managed solution offered the fastest path to adoption and required little engineering effort upfront. The trade-off was its usage-based pricing model: as the Design System grew, costs would increase with the number of snapshots, browsers, pull requests, and teams using it.

The alternative was to build the workflow around Playwright, which we were already using for automated testing. This required a larger upfront engineering investment and meant owning the infrastructure ourselves, but it gave us full control over the workflow and a much more predictable cost as adoption increased.

I also considered Selenium, but it would have required additional tooling and infrastructure to provide the same visual-testing capabilities.

| Option | Engineering cost | Monetary cost | Scalability |
| --- | ---: | ---: | --- |
| Managed visual-testing service | Low | Usage-based | Cost grows with adoption |
| Playwright + Storybook | Medium upfront | Near zero | Predictable and flexible |
| Selenium | High | Low | Additional tooling required |

At our projected testing volume, the managed solution was estimated to cost roughly **$5,000 per year**, with the potential to increase as coverage and adoption expanded.

That changed the decision from simply choosing the easiest tool to evaluating where we wanted to pay the cost.

**Instead of paying an increasing recurring fee for convenience, I chose to invest engineering time upfront and build a visual regression pipeline around Playwright and Storybook.**

This gave us a solution that could scale alongside the Design System while keeping costs predictable and the testing workflow under our control.


## Designing for trust

Adding screenshot comparisons was the easy part. The harder problem was building a system developers could actually trust and adopt.

For visual regression testing to become part of our development workflow, I identified four requirements: **detect meaningful changes, make coverage measurable, produce deterministic results, and integrate without creating friction.**

### 1. Detection

I chose Playwright because screenshot comparison was a native capability, it integrated well with CI, and the investment could later support broader end-to-end testing.

Instead of maintaining a separate suite of visual tests, I used Storybook as the source of truth. The pipeline automatically discovered documented stories and rendered each one in isolation before comparing it against its approved baseline.

This created an important property: **visual coverage could grow with the Design System itself.**

When developers added new component states to Storybook, those states could automatically enter the visual-testing pipeline without requiring a second test to be manually registered and maintained.

### 2. Coverage

Automation is only valuable when you know what it covers.

A component without a Storybook story was effectively invisible to the visual-testing pipeline, so I built project-analysis scripts to identify components without stories, stories outside the testing flow, and other coverage gaps.

This turned coverage from an implicit assumption into something we could measure and improve.

More importantly, it connected two quality goals: improving Storybook documentation also increased our visual regression coverage.

### 3. Reliability

Visual tests quickly lose credibility when they produce false positives.

A late-loading font, an animation captured between frames, a relative date, or changing API data could all generate a visual diff without any meaningful UI regression.

I therefore treated **deterministic rendering as part of the testing architecture**, not as a later optimization.

The pipeline controlled the variables that could affect rendering:

- fixed viewport and browser environment
- standardized fonts
- disabled animations and transitions
- frozen dates and time-dependent behavior
- mocked dynamic data

The goal was simple: **the same story at the same commit should produce the same image.**

This dramatically narrowed the meaning of a failed check. Instead of first investigating whether the environment had changed, reviewers could focus on the component, styling, or story state affected by the pull request.

Reliability was therefore a prerequisite for adoption. If developers learned to ignore noisy visual diffs, the entire system would lose its value.

### 4. Adoption

A technically sound system still fails if developers see it as an obstacle.

Rather than making visual regression testing mandatory from day one, I introduced it incrementally. I started with a small group of teams, collected feedback, fixed stability and developer-experience issues, and expanded adoption as confidence in the pipeline grew.

The goal was to make visual testing part of the existing development workflow rather than introduce another process developers had to manage.

By the time coverage expanded, the check was already understood as a useful review signal rather than an unexplained CI gate.


## The architecture: Storybook as the source of truth

<!-- case-study-visual:visual-regression-pipeline -->

The pipeline started with the component states already documented in Storybook. Its `index.json` exposed those stories, and Playwright opened each story iframe, captured a screenshot, and compared it with a baseline. A difference became a pull-request review decision before merge.


## Catching a regression

When a screenshot changed, the pull request made the difference visible before merge. The reviewer could decide whether the changed render was intentional and update the baseline, or treat it as a regression and correct the implementation. That moved visual quality from a late discovery to a concrete engineering decision.

<!-- case-study-visual:visual-regression-review -->

## Outcome and trade-offs

The result was more than a screenshot-testing pipeline. Visual changes became part of the pull request review process, giving developers an automated signal when a change to a shared component affected its rendered output.

The system also made coverage visible. We could identify gaps in Storybook documentation and visual testing instead of relying on teams to discover them manually, while the Playwright infrastructure created a foundation we could extend into broader testing scenarios over time.

Just as importantly, the solution addressed the original organizational constraint: **increasing confidence in UI changes without making QA the bottleneck or introducing a recurring cost that scaled with adoption.**

At the expected testing volume, I estimated that a comparable managed solution could reach **up to roughly $5,000 per year** as adoption grew. This was a projected avoided cost based on expected usage, rather than an existing license expense that was eliminated.

The trade-off was intentional. We exchanged the convenience and lower maintenance of a managed platform for ownership of the pipeline, baseline management, and ongoing support.

In return, we gained control over the testing workflow, predictable costs, and infrastructure that could evolve alongside the Design System.

**We were not eliminating the cost of visual testing. We were choosing to invest that cost in engineering capability rather than recurring tooling fees.**

---

## What I'd do differently

If I were designing the system again, I would treat **observability as a first-class requirement from the beginning.**

The pipeline made visual coverage measurable, but I would go further and track the health of the testing system itself: execution time, snapshot growth, failure rate, flakiness, and false positives.

Those signals would help answer an important question as adoption increased: **are developers still able to trust the feedback the system gives them?**

I would also automate coverage reporting further, making changes in Storybook and visual-test coverage visible over time rather than relying primarily on point-in-time analysis.

At a larger scale, I would expect the architecture to evolve as well. Running every visual test on every change is simple and predictable, but eventually becomes inefficient. I would investigate impact-based test selection and parallel or distributed execution to keep feedback fast as the component library grew.

Finally, I would introduce more explicit baseline governance: clearer ownership, review rules, and processes for approving intentional visual changes.

These are not features the original system needed to succeed. They are the next set of problems I would expect to solve as adoption and complexity increased.
