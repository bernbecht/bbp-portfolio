---
title: 'Portfolio site: shipping the personal home base'
date: '2025-11-08T12:00:00.000Z'
description: >-
  Notes on standing up this Next.js portfolio—stack choices, accessibility defaults, and what
  changed after the first deploy.
---

## Why rebuild the site

This post is **mock copy** for journal QA: typography, GFM, and SEO plumbing without real narrative yet.

### Stack at a glance

| Layer        | Choice        | Notes                          |
| ------------ | ------------- | ------------------------------ |
| Framework    | Next.js (App) | Server components by default |
| Styling      | Tailwind CSS  | Utility-first, design tokens   |
| Content (QA) | Markdown      | `react-markdown` + `remark-gfm` |

Inline code example: the canonical URL lives in `metadata.alternates.canonical`.

## Checklist style body

1. Ship a readable `/projects` index.
2. Add long-form posts under `/projects/[slug]`.
3. Keep `title` / `description` / `date` in frontmatter aligned with `lib/project-posts` (when wired).

- Bullet for list styling
- Second item with **bold** emphasis

> Blockquote: prefer semantic HTML, focus-visible rings on interactive elements, and meaningful `alt` text on images.

### Fenced code sample

```tsx
export default function Page(): React.ReactNode {
  return <main className="content-container">{/* … */}</main>;
}
```

Sample image (existing public asset for local QA):

![Decorative dither pattern used elsewhere on the site](/dither.svg)
