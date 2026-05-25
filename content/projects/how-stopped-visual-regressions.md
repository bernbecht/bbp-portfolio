---
title: 'How we stopped visual regressions from breaking our design system — without paying for it'
date: '2025-11-08T12:00:00.000Z'
description: >-
  A practical story about building an in-house visual regression pipeline using Playwright and Storybook, saving ~$10k/year and giving multiple teams the confidence to refactor freely.
---


## The problem no one owned

Our design system was a living thing — tokens changing, base components being refactored, legacy pieces gradually migrated. Meanwhile, multiple teams were actively building on top of it. Any update had the potential to silently break something in a far corner of the product.

The issue wasn't just technical. No one explicitly owned this problem. Visual regressions were noticed after the fact, in QA or in production, by a designer or a frustrated engineer comparing screenshots side by side. We needed a systematic answer.

> "We had frequent visual regressions while evolving the design system, and paid tools didn't fit our cost constraints. So I stepped in."

---

## Evaluating the options

The first instinct was to look at established tooling. Chromatic is purpose-built for this, integrates tightly with Storybook, and has a great developer experience. But the pricing model tied cost directly to snapshot volume — and with multiple teams, multiple PRs, and multiple browsers, the numbers added up quickly.

| Option | Engineering cost | Monetary cost | Scalability |
|---|---|---|---|
| Chromatic | Low | Unpredictable | Cost scales with snapshots |
| Playwright (custom) | Medium upfront | Near zero | Predictable, flexible |
| Selenium | High | Low | Extra tooling for visual testing |

The framing that made this decision easy: you're paying one way or another — either with money or engineering time. Chromatic buys you convenience but scales unpredictably. Building in-house has upfront cost, but the marginal cost of more snapshots is zero. Given our PR volume, the math was clear.

I estimated Chromatic at roughly `50 components × 10 PRs × 2 browsers = 1,000 snapshots per cycle`, putting annual cost in the several-thousand-dollar range as adoption grew. Playwright was the call.

---

## The architecture: Storybook as source of truth

Playwright was chosen for a few reasons beyond just cost. It has native screenshot capabilities, no extra tooling required, and it opens the door to E2E and interaction testing down the line — compounding the investment.

The core idea: use Storybook's `index.json` to automatically discover all component stories, then drive Playwright to capture snapshots of each story via the iframe endpoint. This means the test suite grows automatically as new stories are added — no manual test writing per component.

**1. PR is opened**
GitHub Actions picks up the trigger and checks out the branch.

**2. Storybook is built and served**
The branch's Storybook is compiled and served statically in CI. The pipeline waits until it's ready.

**3. Playwright runs against story iframes**
Viewport is fixed, dynamic data is mocked, animations are disabled. Snapshots are captured per story state.

**4. Diffs compared against baselines**
Baseline snapshots live in the repo, versioned alongside code. CI compares new captures against them.

**5. Pass or block**
No diffs → merge allowed. Diffs found → build fails, artifacts uploaded for review. Intentional changes → developer updates baselines locally and commits.

---

## Making tests stable (the unglamorous part)

Visual tests are notoriously flaky if you don't address the sources of non-determinism upfront. The work here was mostly about control: locking viewport dimensions, mocking any dynamic data that could change between runs, and disabling CSS animations so snapshots don't capture mid-transition states.

We didn't skip validation either. Before rolling out broadly, we tested with a few teams, gathered real feedback on signal-to-noise ratio, and iterated. A visual regression tool that cries wolf destroys trust fast.

---

## Results

- Eliminated paid tooling dependency — Playwright runs entirely in CI with no per-snapshot cost (~$10k/year saved)
- Significantly reduced visual regressions during design system changes
- Developers could refactor shared components without anxiety about unintended UI changes
- Established a scalable foundation — the same pipeline is extensible to E2E and accessibility testing
- Baselines versioned with code means the test suite evolves naturally with the product

---

## What I'd do differently

The biggest ongoing cost is maintenance. Snapshot tests need updating when designs intentionally change, and the update flow (run locally, commit baselines) adds friction. A smoother review UI for approving snapshot updates would reduce that burden — something worth investing in if the team grows.

The upfront setup also required discipline around Storybook coverage. Components that lacked stories simply weren't tested. Pairing this with automated story generation (we used AI-assisted rules to surface gaps) helped, but complete coverage is a long game.

---

*Built at Axonify. Part of an ongoing effort to mature the design system without accumulating tool sprawl or budget overhead.*