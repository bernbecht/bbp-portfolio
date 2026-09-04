# Portfolio redesign implementation plan

Status: **Planning complete, implementation not started**

Last updated: 2026-09-04

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

- [ ] Inventory repeated color, typography, spacing, layout, border, and motion values.
- [ ] Sort the inventory into foundation values, semantic tokens, and local component
  values.
- [ ] Define semantic colors for the canvas, surfaces, text levels, borders, focus,
  inverse surfaces, and availability status.
- [ ] Define the 64rem content frame, 42rem reading measure, responsive gutters, and
  responsive section spacing.
- [ ] Define reusable type roles for display text, section headings, body copy, labels,
  and metadata.
- [ ] Define shared motion durations and easing values.
- [ ] Map the semantic tokens into Tailwind 4 without replacing the existing framework
  configuration.
- [ ] Create `docs/design-tokens.md`.
- [ ] Explain how foundation, semantic, and component token layers differ.
- [ ] Include examples showing how one token changes several related surfaces.
- [ ] Include a short exercise for changing layout, color, and motion without editing
  component markup.
- [ ] Document when a local value should not become a global token.

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

- [ ] Implement the approved tokens in the global stylesheet.
- [ ] Change the shared content frame from 72rem to 64rem.
- [ ] Add the 42rem reading measure for long text.
- [ ] Apply responsive gutters of 1rem by default, 1.5rem from the small breakpoint,
  and 2rem from the 900px layout breakpoint.
- [ ] Apply the shared section-spacing tokens.
- [ ] Migrate the header, footer, homepage, projects index, and article typography to
  semantic tokens.
- [ ] Preserve local values inside bespoke case-study diagrams and demonstrations.
- [ ] Hide the portrait below 900px.
- [ ] Let the hero copy occupy the complete row when the portrait is hidden.
- [ ] Remove eager loading from the noncritical portrait.
- [ ] Confirm that project routes and Markdown rendering remain structurally unchanged.
- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.

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

- [ ] Inventory public UI copy across the homepage, shared navigation, footer, projects
  index, metadata, structured person data, and active project summaries.
- [ ] Extract verified facts about roles, responsibilities, experience, outcomes, and
  availability from the approved professional sources.
- [ ] Create `docs/portfolio-redesign-copy-review.md`.
- [ ] Map each proposed claim to its source.
- [ ] Mark uncertain, unsupported, confidential, or outdated claims for omission.
- [ ] Draft replacements using direct and qualified first-person language.
- [ ] Keep the hero headline to approximately 10 words.
- [ ] Keep the hero introduction between approximately 25 and 40 words.
- [ ] Keep section introductions to approximately 30 words or fewer.
- [ ] Keep project summaries concise while preserving supported responsibilities and
  outcomes.
- [ ] Remove redundant positioning, slogans, unsupported adjectives, and decorative
  sentences.
- [ ] Replace sentence-style em dashes with periods, commas, parentheses, or colons.
- [ ] Preserve en dashes in legitimate date and numeric ranges.
- [ ] Submit the copy review to Bernardo before changing the site.
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

- [ ] Create a focused client-side portrait component.
- [ ] Render a grayscale base image and a color reveal layer.
- [ ] Reveal color through a soft dithered lens that follows pointer movement.
- [ ] Let clicking the portrait toggle the complete color reveal.
- [ ] Expose the toggle through a meaningful accessible label and pressed state.
- [ ] Support keyboard focus, Enter, and Space.
- [ ] Use shared color, border, and motion tokens.
- [ ] Disable pointer-following movement when reduced motion is requested.
- [ ] For reduced motion, switch directly between grayscale and color.
- [ ] Provide a simple opacity fallback when CSS masking is unavailable.
- [ ] Keep the entire interaction hidden with the portrait below 900px.
- [ ] Avoid React state updates for every pointer movement by updating CSS custom
  properties on the interaction element.
- [ ] Add no canvas or animation dependency.

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
- [ ] Check the implementation for accidental one-off values that should use an
  approved token.
- [ ] Confirm that local case-study values have not been forced into the global token
  vocabulary.
- [ ] Verify heading hierarchy, landmarks, focus styles, image semantics, and link
  behavior.
- [ ] Confirm metadata and structured person data match the approved copy.
- [ ] Search public UI sources for the em dash character and require zero occurrences.
- [ ] Confirm portrait visibility and hero layout on both sides of the 900px breakpoint.
- [ ] Confirm the interaction fallback and reduced-motion treatment.
- [ ] Confirm the shared frame and reading measure across the migrated routes.
- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Record completed work, approved changes, and deferred improvements in this plan.

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

- Phase 3 cannot begin until the CV and professional-material folder are available.
- `docs/design-tokens.md` will become the teaching reference created during Phase 1.
- `docs/portfolio-redesign-copy-review.md` will preserve the evidence and approval trail
  created during Phase 3.
- This document is the authoritative status tracker for the redesign.
- Update the status, task checkboxes, completion dates, and decision log at the end of
  each phase.
