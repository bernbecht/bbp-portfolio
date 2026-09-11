# Visual-regression case study plan

Status: **Completed**

Last updated: 2026-09-11

## Purpose

Strengthen the Axonify visual-regression case study as credible evidence of product-minded
front-end engineering: identify an unowned risk, make a build-versus-buy trade-off, build a
reliable system, and introduce it so teams can use it.

## Evidence boundaries

| Publishable from source notes | Do not present as historical fact |
| --- | --- |
| End-to-end ownership; Storybook `index.json` discovery; Playwright screenshots; PR diffs; coverage-gap scripts; deterministic setup; phased rollout | Exact CI provider, baseline storage, runtime, number of teams, specific regression-rate reduction, rollout feedback, or future scaling proposals |
| Cost comparison based on expected snapshot volume | ~$10k as realized savings or paid licenses eliminated |

## Implemented approach

- Keep the outcome-led title and add an at-a-glance summary for recruiter scanning.
- Reframe the article around detection, coverage, reliability, and adoption rather than only screenshot testing.
- Label the dollar amount as projected avoided paid-tool spend as adoption scaled; retain the `50 × 10 × 2` calculation only as an illustrative planning model.
- Add accessible, portfolio-native conceptual figures for the pipeline and PR-review decision; they must not resemble or claim to be internal Axonify interfaces.
- Add a project-specific Open Graph card and preserve the existing fallback metadata for other posts.

## Verification

- Review the post and figures at mobile and desktop widths for reading order, contrast, and text legibility.
- Confirm the social card resolves at `/projects/catching-ui-regressions/opengraph-image`.
- Run `npm run lint` and `npm run build`.
