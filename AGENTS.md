## Commands
- `npm run dev` - Development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint (no test framework configured)

## Code Style
- **Imports**: Use absolute imports with `@/*` alias; type-only imports with `import type`
- **Components**: PascalCase, default exports for pages/components, named exports for utilities
- **TypeScript**: Strict mode enabled, define props interfaces before components, use `Readonly<>` for props, explicit type annotations
- **React**: Server components default, semantic HTML, accessibility attributes (aria-label, alt), focus-visible styling
- **Styling**: Tailwind CSS utilities, CSS variables for theming (`--background`, `--foreground`)
- **Formatting**: Trailing commas, single quotes for strings
- **Patterns**: Destructure props in function signatures, use `React.ReactNode` for children