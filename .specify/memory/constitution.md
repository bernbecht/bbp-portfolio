<!--
Sync Impact Report
- Version change: 1.6.0 -> 1.7.0 (MINOR)
- Workflow: a replanning round must update docs/roadmap.md (order and status of specs)
- History: 1.6.0 added the replanning convention (branch `replan/after-NNN-<slug>`, short-lived, one
  record under docs/replans/ per round); 1.5.0 added Principle IX (No Paid Tooling) and made VIII an automated lab check with the
  lab LCP limit at 3.0 s; 1.4.0 added Principle VIII; 1.3.0 added checkable criteria to II, IV, VI, VII and the PR
  template; 1.2.0 added `npm run check:content` and ESLint-enforced style; 1.1.1 removed unused
  rehype dependencies
- Deferred items: no test runner exists (Playwright is not a project dependency; test-results/ is
  gitignored tool output). Principle VII stays tool-agnostic.
-->
# BBP Portfolio Constitution

This constitution is the single source of truth for the rules of this repository. Descriptive facts
(commands, repository map, stack versions, file-level details) live in `docs/reference.md` and may
change without an amendment. `AGENTS.md` is only a pointer to this file.

## Core Principles

### I. Content Model Alignment (NON-NEGOTIABLE)
Listing rows and journal posts MUST stay aligned. A `ProjectEntry.journalSlug` in
`lib/projects.ts` MUST equal the stem of an existing `content/projects/{slug}.md` file. Every post
MUST have non-empty `title` and `description` and a parseable ISO `date` in its frontmatter.
`getPostBySlug` MUST return `null` for slugs containing `..`, `/`, `\`, or an empty slug. Post
routes MUST be statically generated from `getAllSlugs()` and MUST call `notFound()` for a missing or
invalid post. Post media MUST live under `public/projects/{slug}/`.
Rationale: routes and sitemap are generated from these two layers, so drift causes build failures
or dead links.
Enforcement: `npm run check:content` checks every rule above, plus duplicate `journalSlug` values and
that media referenced in a post exists under `public/projects/{slug}/`.

### II. Server-First React
Components MUST be Server Components by default. `'use client'` MUST be added only when a
client-only API is required, and new interactivity MUST be isolated in small leaf components.
Check: `'use client'` is forbidden in `app/**/page.tsx` and `app/**/layout.tsx` (ESLint). A PR that
adds a `'use client'` file MUST name the client-only API it needs in the PR description.
Rationale: this keeps client JavaScript minimal for a content-focused site.

### III. Typed, Consistent Code
TypeScript strict mode MUST pass. Mechanical style is enforced by ESLint and is not restated here:
the `@/*` alias instead of relative imports, `import type` for type-only imports, and trailing
commas in multiline literals. Props MUST be declared in an interface before the component, wrapped
in `Readonly<>`, and destructured in the signature; children use `React.ReactNode`. Pages and
components use default exports; utilities use named exports. Quote style is not enforced; edits
MUST match the nearest file's style.

### IV. Accessible, Semantic UI
Markup MUST be semantic HTML. Every image MUST have an `alt` attribute (ESLint `jsx-a11y/alt-text`):
informative images describe their content, and purely decorative images use `alt=""`. Controls with
no visible text (icon buttons, toggles) MUST have an `aria-label`, and every interactive element
MUST show a focus-visible style. The last two are checked with the PR checklist, not by tooling.
Animations and transitions MUST respect `prefers-reduced-motion`. Sound MUST be user-initiated,
MUST never autoplay on load, and MUST have a way to be silenced. The theme toggle MUST persist the
choice and MUST NOT cause a visible flash of the wrong theme on load.
User-facing copy MUST NOT contain en dashes or em dashes; use commas, periods, parentheses, or a
colon instead.

### V. SEO and Canonical Correctness
Absolute URLs MUST derive from `resolveSiteUrl()` in `lib/site-url.ts`. Pages MUST set metadata with
`alternates.canonical`; post pages MUST use `generateMetadata` with Open Graph `type: 'article'`
and `publishedTime` from frontmatter. Production deployments MUST set `NEXT_PUBLIC_SITE_URL`.
Rationale: wrong hosts in Open Graph, sitemap, or robots output harm discoverability.

### VI. Performance by Default
Pages MUST NOT ship client JavaScript beyond what Principle II allows. Raster images MUST be served
through `next/image` with explicit dimensions (or `fill` inside a sized container) to avoid layout
shift. A plain `<img>` is allowed only with `eslint-disable-next-line @next/next/no-img-element --
<reason>`, which makes the reason part of the code.
New runtime dependencies MUST be justified by a need the current stack cannot meet, and the
justification MUST be recorded in the PR description.
Rationale: a portfolio is judged on first impressions, and speed is part of the craft being shown.

### VII. Verification of Interactive Behavior
Interactive features (theme toggle, sound, experiments such as the dot field) MUST be verified
before shipping, either by an automated test or by the "Interactive behavior" checklist in
`.github/pull_request_template.md`, completed in the PR description. If an automated test runner is introduced, its command MUST be added to
`docs/reference.md` and to the Quality Gates below.
Rationale: lint and build do not catch behavioral or visual regressions.

### VIII. Performance Budget
Every public route MUST keep a Lighthouse Performance score of at least 0.95 and stay inside the lab
limits for Core Web Vitals. The automated check measures the mobile profile as the median of three
runs and enforces the score (0.95), CLS (0.1), Total Blocking Time (200 ms, the lab stand-in for
INP), and a simulated LCP of at most 3.0 s. The lab LCP limit is looser than Google's field
threshold because the lab profile estimates a slow network and CPU and reports about 2.5 s for pages
that paint in a fraction of that. Real visitors are judged by Google's thresholds (p75 LCP at most
2.5 s, INP at most 200 ms, CLS at most 0.1). These are targets only: nothing monitors them, because
the suitable tools are paid (Principle IX). They MAY be spot-checked for free with PageSpeed
Insights. The limits live in `performance-budget.json`. A change that drops a route below its budget
MUST NOT merge unless the PR's Deviations section justifies it or the route has an exception in
`performance-budget.json` with a written reason. Exceptions may be tightened, never loosened,
without a constitution-level justification.
Enforcement: the `performance` CI job runs `npm run perf:measure` on every PR and on pushes to
`main`. How to run and read the check is a descriptive fact tracked in `docs/reference.md`.
Rationale: a portfolio is judged on first impressions, so the budget is a rule and the tooling is
replaceable.

### IX. No Paid Tooling
The project MUST NOT depend on a tool, service, or dependency that requires payment, including
paid-only products, paid plans, and free trials that convert to paid. A free tier is acceptable only
if it needs no payment method and cannot start billing on its own. Every new tool or service MUST
state in the PR description why it is free. When a needed capability only has paid options, the
capability is dropped or built with free tooling, and the spec records the consequence.
Rationale: this is a personal site, so recurring or surprise costs are not acceptable.

## Stack and Content Constraints

- The stack is Next.js (App Router), React, TypeScript strict, and Tailwind CSS 4 with
  `@tailwindcss/typography`. Exact versions are tracked in `docs/reference.md`. A major version
  upgrade of Next.js, React, or Tailwind MUST be reviewed against this constitution.
- Markdown is rendered with `react-markdown`, `remark-gfm`, and `gray-matter`. Raw HTML in posts
  is not supported. Enabling it (for example with `rehype-raw`) MUST be justified per Principle VI.
- Internal Markdown links MUST start with `/` and render through `next/link`; external `http` links
  MUST open with `target="_blank"` and `rel="noopener noreferrer"`.
- Styling MUST use Tailwind utilities and the tokens and component classes defined in
  `app/globals.css`; layout width is driven by `--content-container-max-width`.
- SVGs are imported as components via `@assets/*` and `@svgr/webpack`.
- Site content and user-facing copy MUST be written in English, and `<html lang>` MUST match.

## Development Workflow and Quality Gates

- Before shipping content or route changes, `npm run lint`, `npm run check:content`, and
  `npm run build` MUST all pass. A change that affects rendering, images, fonts, scripts, or
  dependencies MUST also pass `npm run perf:measure`. CI (`.github/workflows/ci.yml`) runs all four
  on every PR and on pushes to `main`.
- Changes touching `PROJECT_GROUPS`, `content/projects/`, or `app/projects/[slug]/page.tsx` MUST be
  verified against Principle I.
- A PR that changes a rule MUST amend this constitution in the same PR. A PR that changes only a
  descriptive fact MUST update `docs/reference.md` instead.
- `AGENTS.md` MUST remain a minimal pointer to this file and MUST NOT carry rules of its own.
- Spec branches are named `NNN-<slug>` (Spec Kit numbering). Replanning (reviewing the constitution
  and the process after a spec) happens only after that spec is implemented, validated, and merged,
  on its own short-lived branch named `replan/after-NNN-<slug>` cut from an up-to-date `main`. A
  replanning round MUST leave a record in `docs/replans/after-NNN-<slug>.md` (what the spec taught,
  which rules changed and why, which follow-up specs it spawns), amends this constitution when a rule
  changes, and is deleted after its PR merges. Work that needs code or tooling becomes a new spec, not
  part of the replanning PR.
- The order and status of specs live in `docs/roadmap.md`. A replanning round MUST update it (status of
  the finished spec and the follow-up specs it spawns) in the same PR, because the replan record is
  deleted after merge and the roadmap is what remains.

## Governance

This constitution supersedes other practices and documents where they conflict. Amendments MUST be
made by editing this file with a Sync Impact Report, a version bump, and an updated Last Amended
date. Versioning follows semantic versioning: MAJOR for backward incompatible principle removals or
redefinitions, MINOR for added principles or materially expanded guidance, PATCH for clarifications
and wording fixes. Every PR MUST complete the checklist in `.github/pull_request_template.md`, and any deviation MUST
be justified in its "Deviations" section. Contributors and agents MUST read this file
before making changes.

**Version**: 1.7.0 | **Ratified**: 2026-10-29 | **Last Amended**: 2026-10-29
