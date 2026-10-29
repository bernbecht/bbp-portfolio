# Research: Performance Budget Enforcement

## Preliminary baseline (single run, local, not the recorded baseline)

Lighthouse 13.6.0, mobile profile, performance category only, run against `next start` of the
production build on the maintainer's machine. One run per route, so this is indicative only.
**Version caveat**: `@lhci/cli` 0.15.1 bundles Lighthouse 12.6.1, so the CI numbers can differ from
these (scoring curves and audits change between major versions). The recorded baseline in
`docs/performance-baseline.md` (task T009) is the reference, not this table. The
recorded baseline (3 runs, median, CI environment) is task 1 of the feature.

| Route | Score | LCP | CLS | TBT |
|-------|-------|-----|-----|-----|
| / | 0.73 | 0.9 s | 0 | 1,650 ms |
| /projects | 0.85 | 0.9 s | 0 | 600 ms |
| /projects/axonify-component-library | 0.75 | 0.9 s | 0 | 1,310 ms |
| /projects/catching-ui-regressions | 0.87 | 0.9 s | 0 | 540 ms |
| /projects/shopify-mobile-store-editor | 0.92 | 0.9 s | 0 | 340 ms |
| /experiments | 0.89 | 0.9 s | 0 | 450 ms |

Findings:

- LCP and CLS already pass everywhere. The score is dragged down by Total Blocking Time.
- Total JavaScript is small (about 309 KiB of transfer on the home page), so this is not a bundle size
  problem. One 36 KB chunk contains the `howler` audio library (pulled in by `use-sound` in
  `ThemeToggle`) and accounts for about 960 ms of scripting under mobile CPU throttling.
- The experiments page does not render the dot field today (it says "coming soon"), so lazy loading the
  dot field is not needed for this feature.
- The shopify write-up scores best although it has a 4.5 MB video and a 10 MB evidence folder, so
  video delivery is not a current problem. It stays under watch because new write-ups may add video.

## Decisions

### D1. Lab measurement tool

- **Decision**: Lighthouse CI (`@lhci/cli` 0.15.1, which bundles Lighthouse 12.6.1) as a devDependency, config in `lighthouserc.cjs`.
- **Rationale**: It is the standard runner for "N runs, take the median, assert thresholds" and it
  supports per-URL assertion overrides, which the exceptions policy needs. It reports through exit code
  and readable messages that name the URL, audit, value, and limit (FR-006).
- **Alternatives**: Running the `lighthouse` package directly would need us to write the median and
  assertion logic. Hosted services (PageSpeed API, web.dev measure) cannot test an unmerged PR build.
  Playwright-based metrics are not Lighthouse scores, so they would not match Principle VIII.

### D2. Where it measures

- **Decision**: CI builds the site, starts `next start` on a fixed port, and measures `http://localhost`.
  `NEXT_PUBLIC_SITE_URL` is set so metadata is stable. Results are uploaded as a workflow artifact, with
  no use of the public temporary storage upload.
- **Rationale**: Matches the assumption "controlled environment on the production build". Keeps
  pre-merge builds private and independent of network conditions.
- **Alternatives**: Measuring Vercel preview URLs adds a dependency on the deploy finishing and on
  preview protection. Rejected for the first version.

### D3. INP in the lab

- **Decision**: Assert Total Blocking Time at most 200 ms as the lab stand-in for INP. Real INP comes
  from the field data (D5).
- **Rationale**: Lighthouse page loads cannot produce INP. TBT is the documented lab proxy, and 200 ms
  is the upper bound of its "good" range in Lighthouse's scoring curve.

### D3b. Lab LCP limit (decided during implementation)

- **Decision**: The lab LCP limit is 3,000 ms. Google's 2.5 s "good" threshold applies to real visitors
  (p75), monitored with Speed Insights (D5).
- **Why**: Lighthouse's simulated slow-mobile profile (1.6 Mbps, 4x CPU slowdown) reports 2.1 to 2.9 s
  for pages whose real LCP is about 50 ms, because the estimate is dominated by about 165 KB of React and
  Next JavaScript and three fonts. After removing the avoidable costs (audio library, below-the-fold video
  posters), four pages still sat at 2.6 to 2.9 s. Holding a simulated number to a field threshold would
  have forced either design changes or exceptions on most pages.
- **Alternatives**: Per-page exceptions for four of six pages (rejected, it defeats the mechanism).
  Cutting more JavaScript by disabling link prefetch (rejected, it changes navigation behavior).
- **Consequence**: Principle VIII's wording is clarified in the constitution amendment (task T027).

### D4. One budget file, derived URL list

- **Decision**: `performance-budget.json` holds the default limits and an `exceptions` array
  (`path`, `reason`, and the page's limits). `lighthouserc.cjs` reads it and builds the assertion matrix.
  The URL list is `/`, `/projects`, `/experiments`, plus `/projects/{slug}` for every file in
  `content/projects/`.
- **Rationale**: Satisfies FR-003 and SC-006 (no hand-maintained page list) and the "Budget stored once"
  entity. An exception without a reason makes the config throw, so the check cannot silently pass.
- **Alternatives**: Listing pages in YAML or in the workflow file would drift from the content model,
  the exact problem Principle I exists to prevent.

### D5. Real-user monitoring

- **Decision**: `@vercel/speed-insights` 2.0.0, rendered next to `<Analytics />` in `app/layout.tsx`.
  It needs Speed Insights to be enabled once in the Vercel project settings, a manual step outside the
  repository.
- **Justification (Principle VI)**: The need is p75 LCP, INP, and CLS per route from real visitors. The
  current stack has no way to collect that. This package is from the same provider as the analytics
  already installed, is cookie-free, loads asynchronously, and is the smallest option.
- **Alternatives**: `useReportWebVitals` plus our own endpoint needs storage and a dashboard, which is
  more code and more privacy surface. The `web-vitals` library alone has the same problem.

### D6. Fix strategy, ordered by expected impact

1. Defer the audio library. `ThemeToggle` calls `useSound` at load, which pulls `howler` and
   initialises it on every page. Load it on the first pointer or focus intent on the toggle (dynamic
   import), so the first click is still instant and nothing plays on load.
2. Check `web-haptics` in `Header` the same way, and measure before and after.
3. Re-measure. Only if a page is still short, look at the remaining main-thread cost (hydration of
   client components such as `Footer` and `HowTechList`, or unused JavaScript flagged by Lighthouse).
4. Pages that cannot reach 0.95 after step 3 get a documented exception under FR-011a.

The spec's candidate fixes for LCP image priority, video preload and posters, and dot field lazy
loading are not supported by the baseline, so they are dropped unless the recorded baseline disagrees.

### D7. Run count, tolerance, and time

- **Decision**: 3 runs per URL, median aggregation. 6 URLs gives 18 runs, roughly 4 to 6 minutes on a
  hosted runner including build, inside the 10 minute target. If variance exceeds 0.03 (SC-004) in
  practice, raise to 5 runs.
- **Rationale**: Spec requires at least three. Hosted runners are noisier than a laptop, so the plan
  expects post-fix scores of 0.97 or more to leave margin under the 0.95 line.

### D8. Enforcement and branch protection

- **Decision**: A separate `performance` job in `ci.yml`, run on pull requests and pushes to `main`.
  Making it a required status check is a GitHub repository setting, documented as a follow-up for the
  maintainer.

### D9. Constitution update

- **Decision**: Principle VIII's enforcement note changes from "manual check until it lands" to a
  description of the automated check. The Quality Gates list gains the performance job. MINOR bump to
  1.5.0 with a Sync Impact Report.
