# Experiments page plan

## Purpose

Create a public, curated `/experiments` page for small studies in interaction, motion, and interface behavior. The first release is intentionally simple: one honest placeholder for a future Omarchy-inspired dot animation.

This page is part of the portfolio, not a replacement for Storybook. A future Storybook should remain a separate component catalog, linked externally when it exists.

## First release

### 1. Create the route

Add `app/experiments/page.tsx` as a Server Component.

- Export metadata with title `Experiments`, description `Small studies in interaction, motion, and interface behavior.`, and canonical path `/experiments`.
- Follow the page structure already used by the portfolio: `fade-up` on the main content and `content-container` for layout.
- Add an introductory label, `/ Experiments`.
- Use the heading: `A place to test ideas in public.`
- Explain briefly that the page contains small, deliberate interface studies.

### 2. Add the initial placeholder

Render a semantic list containing one static `<article>` card.

| Field | Content |
| --- | --- |
| Title | `Dot field` |
| Status | `In progress` |
| Description | `An Omarchy-inspired dot animation study. Coming soon.` |

- Use the current bordered-card, typography, and colour-token conventions.
- Do not add a fake preview, disabled controls, client-side code, or new media assets.
- The placeholder should clearly communicate unfinished work rather than imitate an interactive demo.

### 3. Make it discoverable

- Add a visible internal link to `/experiments` below the explanatory copy in the homepage Toolkit section.
- Add a compact internal `Experiments` link near the social links in the footer, using `next/link`.
- Do not change the Header navigation. It should remain focused on Work and the contact action.

### 4. Add route SEO

- Add `/experiments` to `app/sitemap.ts`.
- Use a monthly change frequency and a priority below `/projects`.
- Use the existing global robots policy and Open Graph defaults. No dedicated social image is needed for this release.

## Adding future experiments

Keep the initial card markup within the page because there is only one entry. When adding a second experiment:

1. Move experiment information into a typed local data list.
2. Extract a small reusable `ExperimentCard` component.
3. Give each entry a title, status, description, route or demo destination, and optional technology labels.
4. Keep individual demos as focused components. Mark only components that need browser APIs, animation frames, or user interaction with `'use client'`.
5. For any motion-based experiment, support `prefers-reduced-motion` and provide an accessible static fallback.

## Verification checklist

1. Run `npm run lint`.
2. Run `npm run build`.
3. Check `/experiments` at mobile and desktop widths for spacing, focus visibility, and horizontal overflow.
4. Confirm both homepage Toolkit and footer links reach `/experiments`.
5. Confirm the main Header navigation is unchanged.
6. Confirm `/sitemap.xml` includes `/experiments`.

## Decisions recorded

- Page role: curated portfolio lab, not an open sandbox.
- Initial entry: a static coming-soon card for the dot animation.
- Discovery: homepage Toolkit and footer, not main navigation.
- Storybook: separate future artifact, not embedded in the Experiments page.
