# Data Model: Performance Budget Enforcement

No database. Entities are files and report rows.

## Budget (`performance-budget.json`)

| Field | Type | Rule |
|-------|------|------|
| `default.minScore` | number 0 to 1 | 0.95 (constitution Principle VIII) |
| `default.maxLcpMs` | number | 3000. Lab-only limit on Lighthouse's simulated slow-mobile LCP. Real users are held to Google's 2.5 s "good" threshold through the field data. |
| `default.maxCls` | number | 0.1 |
| `default.maxTbtMs` | number | 200, the lab stand-in for INP |
| `exceptions` | array of Exception | Empty by default. Rare, last resort. |

## Exception

| Field | Type | Rule |
|-------|------|------|
| `path` | string | URL path such as `/projects/some-slug`. Must start with `/`. Must match a measured page. |
| `reason` | string | Non-empty. Why the page cannot meet the default budget without a redesign or content change. |
| `minScore`, `maxLcpMs`, `maxCls`, `maxTbtMs` | numbers, optional | The page's post-fix measured values (rounded outward). Each field overrides the default for this page only. |

Validation (done when the Lighthouse config loads, so a bad file fails the job):

- A missing or blank `reason` is an error.
- An exception `path` that matches no measured page is an error (stale exception).
- An exception may not be looser than the default without a reason that says so. It may only be
  tightened later, never loosened, without a constitution-level justification in the PR.

## Public page (derived, not stored)

`/`, `/projects`, `/experiments`, and `/projects/{slug}` for each `content/projects/{slug}.md`.

## Measurement report row (CI output)

| Field | Meaning |
|-------|---------|
| `url` | Page measured |
| `score` | Median performance score of the runs |
| `lcpMs`, `cls`, `tbtMs` | Median values |
| `runs` | Number of runs behind the median (at least 3) |
| `budget` | `default` or `exception` |

## Baseline (`docs/performance-baseline.md`)

The report table plus the date and the git commit it was measured on. Regenerated manually when the
budget or the measurement setup changes, not on every PR.
