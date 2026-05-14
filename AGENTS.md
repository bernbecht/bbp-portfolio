## Commands
- `npm run dev` - Development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint (no test framework configured)

## Project journal content

- **Markdown posts:** `content/projects/{slug}.md` — slug is the filename without `.md` (see `lib/project-posts.ts` and `journalSlug` on `ProjectEntry` in `lib/projects.ts`).
- **Post media (binaries):** Put images and other static assets for a write-up under `public/projects/{slug}/` and reference them from Markdown as `/projects/{slug}/your-file.png` (same `{slug}` as the `.md` stem). Next serves `public/` at the site root, so those URLs map directly to files on disk.
- **Mocks / placeholders:** Until per-post art exists, mock posts may use existing site assets (for example `/profile.jpeg`) in `![alt](/profile.jpeg)` so builds and QA stay green.

## Code Style
- **Imports**: Use absolute imports with `@/*` alias; type-only imports with `import type`
- **Components**: PascalCase, default exports for pages/components, named exports for utilities
- **TypeScript**: Strict mode enabled, define props interfaces before components, use `Readonly<>` for props, explicit type annotations
- **React**: Server components default, semantic HTML, accessibility attributes (aria-label, alt), focus-visible styling
- **Styling**: Tailwind CSS utilities, CSS variables for theming (`--background`, `--foreground`)
- **Formatting**: Trailing commas, single quotes for strings
- **Patterns**: Destructure props in function signatures, use `React.ReactNode` for children