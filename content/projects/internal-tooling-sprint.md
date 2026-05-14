---
title: 'Internal tooling sprint'
date: '2024-07-01T08:00:00.000Z'
description: >-
  Short mock post to exercise a minimal body, edge-case spacing, and a single markdown image.
---

## Minimal body

This file intentionally stays small: one `h2`, one paragraph, a tight table, and an image—plus the
few extra blocks the full mock suite expects.

| Check   | Status |
| ------- | ------ |
| Smoke   | OK     |
| Rollout | Mock   |

1. Wire CI for the internal CLI.
2. Add a read-only dashboard for job history.
3. Hand off runbooks to the platform team.

- One bullet
- Two bullets

`pnpm build` should stay green after content lands.

```ts
const queue = new BullMQ('exports', { connection: redis });
```

> Short blockquote: keep copy terse so spacing and typography stay readable on small viewports.

![Dither placeholder](/dither.svg)
