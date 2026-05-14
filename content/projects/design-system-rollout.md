---
title: 'Design system rollout (mock engagement)'
date: '2024-03-15T09:30:00.000Z'
description: >-
  Placeholder journal entry for a fictional design system program—tables, lists, and code blocks to
  stress-test markdown rendering.
---

## Context

Second mock post with a **different date** than `portfolio-site.md`. Use it to verify ordering, RSS/sitemap dates, and “related project” wiring later.

### Program phases

| Phase        | Focus                         | Outcome (mock)     |
| ------------ | ----------------------------- | ------------------ |
| Discovery    | Audits, token inventory       | Baseline metrics   |
| Build        | Primitives + docs in Storybook| Published library  |
| Adoption     | Office hours, lint rules      | Team usage targets |

## Mixed lists and code

Numbered rollout steps:

1. Align on token naming (`color.text.primary`).
2. Ship `Button`, `Input`, and `Card` with tests.
3. Roll out lint + CI checks for forbidden values.

Bullets for supporting work:

- Figma libraries synced to code
- Accessibility annotations on patterns
- `changesets` for semver bumps

Inline token reference: use `space.4` for default vertical rhythm between sections.

```bash
pnpm storybook
pnpm test --filter=@acme/ui
```

> Quote for blockquote styling: consistency beats novelty when teams depend on your primitives.

![Dither texture placeholder](/dither.svg)
