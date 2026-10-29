<!--
Sync Impact Report
- Version change: 1.1.0 -> 1.1.1 (PATCH)
- Modified principles: none
- Clarified: Markdown constraint no longer references rehype-raw as if installed; unused
  rehype-raw and rehype-slug were removed from package.json
- Added/removed sections: none
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

### II. Server-First React
Components MUST be Server Components by default. `'use client'` MUST be added only when a
client-only API is required, and new interactivity MUST be isolated in small leaf components.
Rationale: this keeps client JavaScript minimal for a content-focused site.

### III. Typed, Consistent Code
TypeScript strict mode MUST pass. Imports MUST use the `@/*` alias, with `import type` for type-only
imports. Props MUST be declared in an interface before the component, wrapped in `Readonly<>`, and
destructured in the signature; children use `React.ReactNode`. Pages and components use default
exports; utilities use named exports. New code MUST prefer single quotes and trailing commas, and
edits MUST match the nearest file's style.

### IV. Accessible, Semantic UI
Markup MUST be semantic HTML. Images MUST have meaningful `alt` text, interactive controls MUST
have accessible names (`aria-label` where needed), and focus-visible styling MUST be present.
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
Pages MUST ship as little client JavaScript as practical. Raster images MUST be served through
`next/image` (or have a documented reason not to) with explicit dimensions to avoid layout shift.
New runtime dependencies MUST be justified by a need the current stack cannot meet, and the
justification MUST be recorded in the PR description.
Rationale: a portfolio is judged on first impressions, and speed is part of the craft being shown.

### VII. Verification of Interactive Behavior
Interactive features (theme toggle, sound, experiments such as the dot field) MUST be verified
before shipping, either by an automated test or by a manual checklist recorded in the PR
description. If an automated test runner is introduced, its command MUST be added to
`docs/reference.md` and to the Quality Gates below.
Rationale: lint and build do not catch behavioral or visual regressions.

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

- Before shipping content or route changes, `npm run lint` and `npm run build` MUST both pass.
- Changes touching `PROJECT_GROUPS`, `content/projects/`, or `app/projects/[slug]/page.tsx` MUST be
  verified against Principle I.
- A PR that changes a rule MUST amend this constitution in the same PR. A PR that changes only a
  descriptive fact MUST update `docs/reference.md` instead.
- `AGENTS.md` MUST remain a minimal pointer to this file and MUST NOT carry rules of its own.

## Governance

This constitution supersedes other practices and documents where they conflict. Amendments MUST be
made by editing this file with a Sync Impact Report, a version bump, and an updated Last Amended
date. Versioning follows semantic versioning: MAJOR for backward incompatible principle removals or
redefinitions, MINOR for added principles or materially expanded guidance, PATCH for clarifications
and wording fixes. Every PR or review MUST verify compliance with these principles, and any
deviation MUST be justified in the PR description. Contributors and agents MUST read this file
before making changes.

**Version**: 1.1.1 | **Ratified**: 2026-10-29 | **Last Amended**: 2026-10-29
