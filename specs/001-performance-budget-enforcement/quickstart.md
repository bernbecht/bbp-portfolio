# Quickstart: validating performance budget enforcement

Prerequisites: Node 22.18+, Chrome installed locally, dependencies installed with `npm ci`.

## 1. Measure locally

```sh
npm run perf:measure   # exit 0 means every page is within budget
npm run perf:report    # median table per page
```

Expected: a table with one row per public page (home, projects, experiments, each write-up), 3 runs per
row, and no violations.

## 2. Prove the check can fail (SC-002)

1. Add a deliberately heavy synchronous script to `app/projects/page.tsx` (for example a client component
   that loops for 2 seconds on mount) on a throwaway branch.
2. Run `npm run perf:measure`.
3. Expected: exit 1, with a line naming `/projects`, the audit (`total-blocking-time` or the score), the
   measured value, and the limit.
4. Revert, run again, expect exit 0.

## 3. Prove new pages are picked up (SC-006)

1. Copy any file in `content/projects/` to `content/projects/zz-temp.md` with a new title.
2. Run `npm run perf:measure` and confirm `/projects/zz-temp` appears in the report without editing any
   config. Delete the file.

## 4. Exceptions

1. Add an exception with no `reason` to `performance-budget.json`. Expected: the run fails immediately
   with a message about the missing reason. Remove it.

## 5. Field data spot check (optional, free)

Open the production URL in PageSpeed Insights. When the site has enough traffic, its "real users" section
shows Core Web Vitals from the public Chrome UX Report. There is no monitoring in the repository.

## 6. Interactive behavior after the audio change (Principle VII)

Fill the PR's interactive checklist: theme toggle persists, no sound on load, sound plays on the first
click, sound can be silenced, `prefers-reduced-motion` still respected, toggle reachable and named by
keyboard.

## 7. CI

Open a PR. The `performance` job runs, shows the table in the job summary, and uploads `.lighthouseci/`.
