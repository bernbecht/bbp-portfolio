# Research and Decisions

## Evidence log

- Workspace inspection on 2026-10-27 and 2026-10-28: no application source, Git repository, package manifest, `.specify` or local templates in the supplied directory. Only work/output folders existed.
- Conversation `6ae01259-6c68-83e9-bac3-19318f38af50`, “Ideias de animação interativa”: retrieved user messages request separate minimal state animations, a Velocity vs Position treatment, and Spec Kit documentation. Prior assistant responses contain unresolved content-reference markers; no visual details were recovered.
- [Case study](https://brndux.vercel.app/projects/shopify-mobile-store-editor): web fetch failed; search returned no result and browser inspection did not complete. Its layout, terminology and implementation remain unverified.
- Official Spec Kit [spec](https://raw.githubusercontent.com/github/spec-kit/main/templates/spec-template.md), [plan](https://raw.githubusercontent.com/github/spec-kit/main/templates/plan-template.md), [tasks](https://raw.githubusercontent.com/github/spec-kit/main/templates/tasks-template.md) templates inspected 2026-10-27. Package organization follows these conventions without installing a CLI or asserting a pinned release.

## Decisions

| Decision | Rationale | Alternatives considered |
|---|---|---|
| One feature with two independent stories | Shared frame/controller contracts and one article; each group can still ship alone | Separate feature folders add coordination without separate product boundaries |
| English agent documentation | Precise cross-agent implementation vocabulary; UI copy follows article locale | Portuguese docs are viable but unnecessary for the requested developer audience |
| Three separate target-state loops | Directly honors the move away from a playground | One sequential state carousel would obscure separate state explanations |
| Position-only versus velocity-aware snapping | Explains different release decisions with the same geometry | Merely changing easing would not explain the decision model |
| Slow then fast input | Shows both agreement and divergence, avoiding a universal claim that velocity always chooses full | Fast-only demo lacks a useful control case |
| Shared active-time sampling | Prevents drift, enables pause and deterministic screenshots | Independent CSS loops make cross-panel lifecycle coordination harder |
| DOM/inline SVG, host motion tools if suitable | Small payload, crisp frames, semantic outer content | Video/GIF lacks flexible static alternatives and shared clock control; canvas adds accessibility work |
| No playback controls (revised 2026-10-28) | Product owner found pause and replay unnecessary; indefinite loops are an accepted WCAG 2.2.2 deviation, mitigated by reduced-motion static content and offscreen suspension | Native Pause/Resume (original decision) |
| All state cards start at Collapsed (revised 2026-10-28) | Shows that the three states are positions of one sheet instead of three unrelated sheets appearing | Each card loops around its own resting pose (original) |
| Contrast from site tokens (revised 2026-10-28) | Neutral-100 preview and neutral-200 skeletons vanished on the page background in both themes; derive from foreground/background mixes | Fixed hex colors per theme |
| Static reduced-motion/no-script content | Carries the full explanation without timing dependence | Slower animation still introduces unnecessary motion |

## Proposed design defaults

All geometry, timing, thresholds and copy in the contracts are new editorial proposals. They are neither historical Shopify measurements nor recovered conversation approvals. Use them as deterministic implementation defaults, then inspect actual article content before publishing any behavioral claim. If the article uses different snap semantics, update the scenario, captions, requirements and tests together rather than silently changing the demonstration.

No unresolved question prevents a portable implementation plan. Repository-specific facts are bounded discovery work, not excuses to install an unrelated application or ask the user to select routine implementation details.

## Integration record (completed 2026-10-28)

- Repository: bbp-portfolio, branch `shopify-animations`. Instructions: `AGENTS.md`. No `.specify` or constitution exists.
- Framework: Next 16.1.1, React 19.2.3, TypeScript strict, Tailwind 4, npm lockfile. Added devDependencies: vitest 3, @testing-library/react, jsdom, @playwright/test (vitest 5 was rejected: it needs @types/node 22+).
- Article: `content/projects/shopify-mobile-store-editor.md`. Anchors: `<!-- case-study-visual:shopify-sheet-states -->` (US1) and `<!-- case-study-visual:shopify-drag-resolution -->` (US2), resolved in `app/projects/[slug]/page.tsx`. The old figures in `components/ShopifyMobileStoreEditorVisuals.tsx` now delegate to the new components.
- Tokens: CSS variables from `app/globals.css` (`--surface`, `--border-subtle`, `--focus`...), light and dark.
- Source paths: `components/editor-animations/` (replaces `src/components/case-study/editor-animations/`); tests in `components/editor-animations/__tests__/` and `tests/e2e/`. Visual snapshot suite was not added (see validation report).
- Commands: `npm run lint`, `npm run build`, `npm test`, `npm run test:e2e`.
- Reconciliation with the article (T003): the article says a fast upward gesture expands fully, a fast downward gesture collapses, and slower releases use three drop zones. The velocity rule is therefore: `abs(v) >= 0.45/s` goes to the endpoint in the gesture direction (full or collapsed). The position rule keeps the 0.33 and 0.70 nearest-snap boundaries as an approximation of the drop zones. Labels follow the article: Collapsed, Partially expanded, Fully expanded. The slow/fast comparison scenarios are unchanged (release at 0.60 gives partial/partial and partial/full).
