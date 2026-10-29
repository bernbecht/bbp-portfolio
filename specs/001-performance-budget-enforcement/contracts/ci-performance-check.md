# Contract: CI performance check

The interface this feature exposes to contributors and to GitHub.

## Commands

| Command | Behavior |
|---------|----------|
| `npm run perf:measure` | Builds, serves the production build, measures every public page (3 runs, mobile), asserts the budget. Exit 0 if every page meets its budget, exit 1 otherwise. Needs Chrome available locally. |
| `npm run perf:collect` | Builds and measures like `perf:measure` but does not assert. Used to record a baseline. |
| `npm run perf:report` | Prints the median table from the last run in `.lighthouseci/`. With `--write docs/performance-baseline.md` it writes the baseline document with date and commit. |

## CI job

- Name: `performance` (a separate job in `.github/workflows/ci.yml`).
- Triggers: pull requests, and pushes to `main`.
- Output: a table in the job summary, and `.lighthouseci/` uploaded as a workflow artifact.
- Failure message, one per violated assertion, contains: page URL, audit name, measured value, limit.
  Example: `/projects/x  largest-contentful-paint  3520 > 3000`.
- Fails (does not pass) when a page produced no result, when the budget file is invalid, or when an
  exception lacks a reason or names an unmeasured page.

## Inputs

- `performance-budget.json` (schema: [performance-budget.schema.json](performance-budget.schema.json)).
- `content/projects/*.md`, used only to discover write-up URLs.

## Not guaranteed

- Real-user INP in the lab. The lab asserts Total Blocking Time as the stand-in.
- Identical scores between a laptop and a CI runner. Only CI results gate a PR.
