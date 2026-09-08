# Portfolio redesign implementation plan

Status: **Technical implementation complete; copy approval/integration and browser QA pending**

Last updated: 2026-09-08

## Purpose

Turn the current redesign prototype into a restrained, hiring-focused portfolio that
communicates Bernardo's experience clearly and credibly.

The finished site should:

- Use a practical design-token system that Bernardo can understand and maintain.
- Present professional evidence without exaggerated or promotional language.
- Use a narrower and more intentional desktop layout.
- Hide the portrait when it does not help the mobile composition.
- Add one memorable interaction without making the site feel gimmicky.
- Remain responsive, accessible, fast, and easy to evolve.

## Working principles

- Prefer facts, responsibilities, decisions, and supported outcomes over slogans.
- Give every visible sentence a useful purpose.
- Treat the professional source material as the authority for career claims.
- Separate shared design decisions from values that belong to one illustration or
  component.
- Use the redesign as a practical design-token lesson, not only as a refactor.
- Preserve the established monochrome editorial direction and dither motif.
- Keep new interactivity inside a small client component.
- Add no runtime dependency unless the approved interaction cannot reasonably be built
  with the existing stack.
- Do not use em dashes to join sentences in public UI copy. En dashes remain valid for
  date and numeric ranges.

## Decisions made

- Write primarily for hiring teams evaluating design-engineering experience.
- Reduce the shared desktop content frame from 72rem to 64rem.
- Use an approximately 42rem measure for long-form reading.
- Apply semantic design tokens to the shared shell, homepage, projects index, and
  article typography.
- Keep bespoke case-study diagrams locally styled unless a value has a genuine
  site-wide meaning.
- Hide the portrait below the existing 900px `layout` breakpoint.
- Keep the portrait on desktop and make it the signature interaction.
- Use a pointer-responsive dither-to-color reveal for the portrait.
- Revise public UI copy while preserving long-form case-study prose for a separate
  editorial project.
- Prepare a source-backed copy review for Bernardo's approval before integration.
- Create a design-token guide with rationale and small exercises.
- Keep deployment outside this project unless it is requested separately.

## Phase 1: Define the design system

### Goal

Create a small, coherent token vocabulary before changing individual components.

### Tasks

- [x] Inventory repeated color, typography, spacing, layout, border, and motion values.
- [x] Sort the inventory into foundation values, semantic tokens, and local component
  values.
- [x] Define semantic colors for the canvas, surfaces, text levels, borders, focus,
  inverse surfaces, and availability status.
- [x] Define the 64rem content frame, 42rem reading measure, responsive gutters, and
  responsive section spacing.
- [x] Define reusable type roles for display text, section headings, body copy, labels,
  and metadata.
- [x] Define shared motion durations and easing values.
- [x] Map the semantic tokens into Tailwind 4 without replacing the existing framework
  configuration.
- [x] Create `docs/design-tokens.md`.
- [x] Explain how foundation, semantic, and component token layers differ.
- [x] Include examples showing how one token changes several related surfaces.
- [x] Include a short exercise for changing layout, color, and motion without editing
  component markup.
- [x] Document when a local value should not become a global token.

### Deliverable

An approved token vocabulary and a design-token learning guide.

### Completion gate

- Every token has a clear responsibility.
- Shared tokens have multiple consumers or a strong semantic reason to exist.
- The token layers can be understood without reading individual components.
- Case-study-specific values have not been promoted into the global system without a
  shared purpose.

## Phase 2: Apply layout and responsive foundations

### Goal

Use the token system to fix the shared layout before adding new copy or interaction
behavior.

### Tasks

- [x] Implement the approved tokens in the global stylesheet.
- [x] Change the shared content frame from 72rem to 64rem.
- [x] Add the 42rem reading measure for long text.
- [x] Apply responsive gutters of 1rem by default, 1.5rem from the small breakpoint,
  and 2rem from the 900px layout breakpoint.
- [x] Apply the shared section-spacing tokens.
- [x] Migrate the header, footer, homepage, projects index, and article typography to
  semantic tokens.
- [x] Preserve local values inside bespoke case-study diagrams and demonstrations.
- [x] Hide the portrait below 900px.
- [x] Let the hero copy occupy the complete row when the portrait is hidden.
- [x] Remove eager loading from the noncritical portrait.
- [x] Confirm that project routes and Markdown rendering remain structurally unchanged.
- [x] Run `npm run lint`.
- [x] Run `npm run build`.

### Deliverable

A token-driven shared layout with the approved desktop width and mobile portrait
behavior.

### Completion gate

- Shared surfaces use semantic tokens instead of repeated visual values.
- The content frame is consistently capped at 64rem.
- Long-form paragraphs retain a readable measure.
- The mobile hero contains no empty portrait column.
- Existing project and journal routes build successfully.
- Lint and production build pass.

## Phase 3: Recover evidence and sharpen the copy

### Required input

Access to Bernardo's CV and professional-material folder.

### Goal

Replace promotional language with concise, source-backed copy that helps hiring teams
understand Bernardo's experience.

### Tasks

- [x] Inventory public UI copy across the homepage, shared navigation, footer, projects
  index, metadata, structured person data, and active project summaries.
- [x] Extract verified facts about roles, responsibilities, experience, outcomes, and
  availability from the approved professional sources.
- [x] Create `docs/portfolio-redesign-copy-review.md`.
- [x] Map each proposed claim to its source.
- [x] Mark uncertain, unsupported, confidential, or outdated claims for omission.
- [x] Draft replacements using direct and qualified first-person language.
- [x] Keep the hero headline to approximately 10 words.
- [x] Keep the hero introduction between approximately 25 and 40 words.
- [x] Keep section introductions to approximately 30 words or fewer.
- [x] Keep project summaries concise while preserving supported responsibilities and
  outcomes.
- [ ] Remove redundant positioning, slogans, unsupported adjectives, and decorative
  sentences.
- [ ] Replace sentence-style em dashes with periods, commas, parentheses, or colons.
- [ ] Preserve en dashes in legitimate date and numeric ranges.
- [x] Submit the copy review to Bernardo before changing the site.
- [ ] Integrate only the approved wording.
- [ ] Keep the metadata and structured person data aligned with the visible copy.

### Deliverable

Approved, source-backed public UI copy and a preserved copy decision record.

### Completion gate

- Every substantial professional claim is supported by the provided material.
- A hiring reader can quickly identify role, relevant experience, representative work,
  and the contact path.
- No public UI sentence contains an em dash.
- Metadata and structured data do not overstate the visible positioning.
- Long-form Markdown case studies remain unchanged.

## Phase 4: Build the signature portrait interaction

### Goal

Give the desktop portrait a playful purpose while keeping the experience optional and
accessible.

### Tasks

- [x] Create a focused client-side portrait component.
- [x] Render a grayscale base image and a color reveal layer.
- [x] Reveal color through a soft dithered lens that follows pointer movement.
- [x] Let clicking the portrait toggle the complete color reveal.
- [x] Expose the toggle through a meaningful accessible label and pressed state.
- [x] Support keyboard focus, Enter, and Space.
- [x] Use shared color, border, and motion tokens.
- [x] Disable pointer-following movement when reduced motion is requested.
- [x] For reduced motion, switch directly between grayscale and color.
- [x] Provide a simple opacity fallback when CSS masking is unavailable.
- [x] Keep the entire interaction hidden with the portrait below 900px.
- [x] Avoid React state updates for every pointer movement by updating CSS custom
  properties on the interaction element.
- [x] Add no canvas or animation dependency.

### Deliverable

An accessible dither-to-color portrait interaction for desktop layouts.

### Completion gate

- Pointer, click, and keyboard input produce consistent outcomes.
- The component has visible focus and correct pressed-state semantics.
- Reduced-motion behavior is clear and stable.
- Failure of CSS masking leaves a usable grayscale-to-color treatment.
- The interaction does not delay, obscure, or shift the hero copy.

## Phase 5: Edit, verify, and prepare for release

### Goal

Review the redesign as one experience and close factual, visual, responsive, and
technical gaps.

### Tasks

- [ ] Review the complete page for factual tone and unnecessary copy.
- [x] Check the implementation for accidental one-off values that should use an
  approved token.
- [x] Confirm that local case-study values have not been forced into the global token
  vocabulary.
- [ ] Verify heading hierarchy, landmarks, focus styles, image semantics, and link
  behavior.
- [ ] Confirm metadata and structured person data match the approved copy.
- [ ] Search public UI sources for the em dash character and require zero occurrences.
- [ ] Confirm portrait visibility and hero layout on both sides of the 900px breakpoint.
- [ ] Confirm the interaction fallback and reduced-motion treatment.
- [ ] Confirm the shared frame and reading measure across the migrated routes.
- [x] Run `npm run lint`.
- [x] Run `npm run build`.
- [x] Record completed work, approved changes, and deferred improvements in this plan.

### Deliverable

A release-ready portfolio redesign.

### Completion gate

- A hiring reader can understand Bernardo's role and evidence without promotional
  interpretation.
- The design-token guide supports future visual changes without component-by-component
  editing.
- The portrait interaction adds personality while remaining optional and accessible.
- Public UI copy follows the approved voice and punctuation rules.
- Existing routes, project content, media, metadata, and links remain functional.
- Lint and production build pass.

## Definition of done

- The shared site surfaces use an intentional and documented token system.
- The main desktop frame is 64rem and long-form copy uses a narrower reading measure.
- The portrait is absent below 900px and does not leave unused layout space.
- The desktop portrait offers a responsive, keyboard-operable color reveal.
- Reduced-motion and unsupported-mask fallbacks remain usable.
- Public UI copy is concise, humble, factual, and approved.
- Every professional claim can be traced to supplied source material.
- Public UI sentences contain no em dashes.
- Case-study Markdown content and content schemas remain intact.
- The site is responsive, accessible, lint-clean, and build-clean.

## Decision log

Use this table as implementation decisions are made so their context is not lost.

| Date | Decision | Reason |
|---|---|---|
| 2026-09-04 | Keep the redesign plan in `docs/portfolio-redesign-plan.md`. | Planning material should be versioned without being parsed as published journal content. |
| 2026-09-04 | Write primarily for hiring teams. | The portfolio should make role, experience, evidence, and ownership easy to evaluate. |
| 2026-09-04 | Use a 64rem shared content frame and a 42rem reading measure. | The current 72rem frame feels too wide, while articles still need a deliberately narrow text measure. |
| 2026-09-04 | Tokenize shared surfaces but preserve local case-study styling. | A token should represent a reusable decision rather than every visual value in the repository. |
| 2026-09-04 | Hide the portrait below the 900px layout breakpoint. | The portrait should not consume scarce mobile space or interrupt the introduction. |
| 2026-09-04 | Use the portrait for the signature interaction. | It gives the image a purpose and extends the existing dither language without adding a promotional section. |
| 2026-09-04 | Review source-backed copy before integration. | Career claims and tone require Bernardo's approval before becoming public. |
| 2026-09-04 | Preserve long-form case studies during the public UI copy pass. | Their evidence and narrative need a separate editorial process. |

## Working notes

- Phase 3 source review is complete using the supplied Master CV and STAR stories. Exact proposed wording is ready for approval in the copy-review document.
- `docs/design-tokens.md` will become the teaching reference created during Phase 1.
- `docs/portfolio-redesign-copy-review.md` will preserve the evidence and approval trail
  created during Phase 3.
- This document is the authoritative status tracker for the redesign.
- Update the status, task checkboxes, completion dates, and decision log at the end of
  each phase.


## Implementation record: 2026-09-08

- Phase 1 implementation complete: palette foundations, semantic color/layout/type/
  motion tokens, Tailwind mapping, and `docs/design-tokens.md` with exercises.
  Vocabulary follows the plan's authorized design direction; no separate approval
  of new copy is implied.
- Phase 2 complete: 64rem frame, responsive gutters and section spacing, 42rem text
  measure, shared surface migration, portrait hidden below 900px, and lazy images.
  Labels now sit inside the fluid frame to avoid the former fixed grid overflow.
  Markdown parsing, routes, content schemas, and case-study files are untouched.
- Phase 3 pending: prepared `docs/portfolio-redesign-copy-review.md` with surface
  inventory, provisional replacements, source register, and unresolved claims.
  Requested the CV and professional-material folder location. No proposed career
  copy has been integrated and no unprovided approval has been recorded.
- Phase 4 implementation complete: small client component, native button semantics,
  pointer CSS properties, dither mask, complete color toggle, reduced-motion handling,
  and opacity fallback. Browser interaction verification is still pending.
- Phase 5 partial: lint and production build passed; static generation retains all
  existing routes. Homepage now has a main landmark; projects group headings no
  longer depend on an introductory heading. `git diff --check` passed.
  Browser QA could not run because no browser is connected to the UI tool.

### Remaining release gates

1. Receive and review professional sources, finalize source-to-claim mappings,
   obtain Bernardo's wording approval, and integrate across UI/metadata/JSON-LD.
2. Repeat em-dash audit after integration. Eight existing occurrences across homepage,
   hero, footer, and projects metadata remain intentionally pending copy approval.
3. In a connected browser, inspect 375px, 640px, 899px, 900px, 1024px, and 1440px;
   check overflow, frame and reading measure, keyboard focus, pointer lens, click,
   Enter/Space toggles, reduced motion, and disabled CSS masking.
4. Re-run lint and build after approved copy integration. Deployment remains outside
   this project as specified in the plan.

| Date | Decision | Reason |
|---|---|---|
| 2026-09-08 | Place section labels inside the content frame. | Fixed-width side-label tracks could overflow near the layout breakpoint. |
| 2026-09-08 | Retain current professional copy pending sources and approval. | The plan explicitly requires source-backed review before integration. |
| 2026-09-08 | Use a native button and CSS masking for the portrait. | Keyboard semantics are built in; pointer updates avoid React renders and require no dependency. |
| 2026-09-08 | Record browser verification as pending. | No browser is available through the connected UI tool; build success cannot establish visual correctness. |


### Source review update: 2026-09-08

Received the professional folder location and reviewed `Master CV.md`, Axonify and
Shopify STAR stories, and the collaboration story. The copy-review document now
contains exact proposed wording and source mappings for all affected surfaces.
Seniority, company history, design-systems work, and toolkit claims are supported
by the supplied records. Shopify's metric definition conflicts across records;
Axonify's cost figure mixes reported savings with projected licensing expense.
Both numbers are omitted from proposed UI summaries. No public wording has changed.

Source access is resolved. Next gate: Bernardo's approval of the concrete copy set,
then integration and final validation. Browser QA remains pending.


### Copy integration rollback

Bernardo approved the suggested copy with Brazil as the location, then requested
that the code return to its pre-copy-integration state. The copy pass was reverted
while preserving the technical redesign and copy suggestions document. Copy
integration is deferred by user request. Lint and diff whitespace checks pass.
