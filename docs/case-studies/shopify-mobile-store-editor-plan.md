# Shopify mobile Store Editor case study plan

Status: **Phase 2 review complete — applying revisions pending**

Last updated: 2026-09-03

## Purpose

Turn the existing Shopify post into a case study that demonstrates product thinking,
interaction design, and front-end engineering to three audiences:

1. Technical practitioners
2. Engineers
3. Recruiters and hiring managers

The finished post should show not only what shipped, but how the problem was framed,
which tradeoffs were made, what Bernardo personally owned, how the interaction worked,
and what evidence supports the outcome.

## Working principles

- Prefer specific examples and evidence over UX or engineering terminology by itself.
- Distinguish Bernardo's contribution from the work of the broader team.
- Do not reveal confidential Shopify information.
- Do not claim a technique, test, implementation detail, or result unless it can be
  verified from memory, an artifact, or a public source.
- Preserve the careful attribution of the 10% adoption increase unless stronger causal
  evidence is available.
- Make the page useful to a recruiter scanning for 30 seconds and rewarding to an
  engineer reading the complete story.

## Decisions made

- Frame the work as resolving a mobile product conflict, not merely building a bottom
  sheet.
- Keep the final demonstration video, but support it with annotated stills or a state
  diagram that explains why the interaction works.
- Expand the engineering story, especially state transitions, drag-versus-scroll
  behavior, cross-platform behavior, and preview synchronization.
- Connect UX concepts to concrete decisions instead of listing design principles.
- Put role, scope, timeline, ownership, and outcome near the top of the page.
- Keep outcome language explicit about contribution rather than isolated causation.
- Add a specific reflection or "what I would do differently" section.

## Questions to answer before rewriting

These answers are the source material for the case study. Record short, factual notes;
polished prose is not necessary yet.

### Product and user context

- [ ] What editing task is the clearest example of the mobile problem?
- [ ] What did merchants experience before this solution?
- [ ] Which user evidence identified the main friction points?
- [ ] Was mobile use an existing workflow, an underserved workflow, or a strategic bet?
- [ ] What functionality absolutely could not be removed?

### Ownership and collaboration

- [ ] What was already decided when Bernardo joined the work?
- [ ] Which product, interaction, visual, and technical decisions did Bernardo own?
- [ ] Who were the principal partners, described by role rather than name if needed?
- [ ] Who implemented adjacent parts of the Store Editor experience?
- [ ] What feedback or constraints from partners materially changed the solution?

### Exploration and validation

- [ ] How were the three alternatives explored: sketches, prototypes, engineering
  spikes, critiques, research sessions, or analytics?
- [ ] Why were three sheet states preferable to two states or a continuously positioned
  sheet?
- [ ] How was the partially expanded height chosen?
- [ ] Which usability or device-testing scenarios were used?
- [ ] What problem was discovered during testing, and how did the design change?

### Engineering

- [ ] What component or state model represented collapsed, partial, expanded, dragging,
  and settling behavior?
- [ ] What events triggered transitions between states?
- [ ] How were drag distance, velocity, thresholds, and snap destinations calculated?
- [ ] How did the implementation arbitrate between dragging the sheet and scrolling its
  contents?
- [ ] Why was `dnd-kit` selected, and what did it provide versus custom pointer handling?
- [ ] What differed between iOS, Android, emulators, and physical devices?
- [ ] What caused preview synchronization or visual-jump problems, and how were they
  fixed?
- [ ] How were viewport changes, safe-area insets, orientation, and the virtual keyboard
  handled, if applicable?
- [ ] Which accessibility behaviors were implemented: focus, semantics, keyboard
  controls, touch targets, screen readers, or reduced motion?
- [ ] Was animation or rendering performance measured? If so, how?
- [ ] Which technical compromise would be made differently today?

### Outcome

- [ ] What exactly did "mobile adoption" measure?
- [ ] Is the 10% change relative growth or a percentage-point increase?
- [ ] What was the measurement window?
- [ ] Were there qualitative outcomes or follow-up signals in addition to adoption?
- [ ] Which other changes shipped during the same period?
- [ ] Is there a public or safely paraphrased source for the result?

## Proposed story

### 1. Opening: the conflict

Open with a concrete merchant editing task. Establish that desktop could show controls
and preview side by side, while mobile appeared to force a choice between them.

Reader takeaway: this was a product and interaction problem, not a request for a new UI
component.

### 2. At a glance

Present role, team, period, responsibilities, platform, and outcome in a compact,
responsive summary. Include one direct sentence describing personal ownership.

Reader takeaway: a recruiter can understand scope and impact without reading the full
post.

### 3. Define what could not be lost

Describe the product's live feedback loop and the constraints the mobile solution had to
preserve. Separate user needs, product constraints, and technical constraints.

Reader takeaway: the success criteria were intentional and testable.

### 4. Explore the interaction model

Compare the alternatives and explain how they were evaluated. Show why the bottom sheet
won and why its added interaction complexity was justified.

Reader takeaway: the solution followed from tradeoffs rather than preference.

### 5. Explain the three states

Use annotated stills or a diagram for collapsed, partially expanded, and fully expanded.
For each state, explain the user's goal, what remains visible, and the available next
actions.

Connect applicable concepts to decisions:

- Progressive disclosure
- Spatial continuity
- Visibility of system state
- User control
- Mode-switching cost
- Reachability and touch ergonomics

Reader takeaway: each state exists for a specific user need.

### 6. Engineering deep dive

Organize verified details into short subsections:

- Interaction state and allowed transitions
- Snap-point and gesture behavior
- Drag-versus-scroll arbitration
- Editor and preview synchronization
- Cross-platform, accessibility, and performance considerations

Include a state or event-flow diagram if it makes the implementation easier to
understand.

Reader takeaway: Bernardo can translate interaction intent into robust production code.

### 7. Validation and iteration

Describe how the work was evaluated, what was learned, and one concrete change made in
response. Clearly distinguish design validation, implementation testing, and business
measurement.

Reader takeaway: the solution was tested rather than merely shipped.

### 8. Outcome and attribution

State the adoption result with its definition and measurement context, if available.
Name confounding work and preserve careful attribution.

Reader takeaway: the impact is meaningful and credibly described.

### 9. Reflection

Replace the broad closing lesson with a specific lesson and what Bernardo would measure,
design, or engineer differently today.

Reader takeaway: the project produced reusable judgment, not only a shipped feature.

## Layout work

- [ ] Move scope and outcome above the hero video.
- [ ] Replace or restyle the Markdown summary table for narrow screens.
- [ ] Create a three-state visual using approved screenshots or frames from the existing
  video.
- [ ] Annotate the user purpose and relevant interaction boundary in each state.
- [ ] Decide whether an interaction-state or event-flow diagram adds distinct value.
- [ ] Break the engineering section into scannable subsections.
- [ ] Confirm figures have useful alt text and captions.
- [ ] Create a project-specific social image instead of using the profile photo, if the
  scope permits.
- [ ] Check the finished page at mobile and desktop widths.

## Copy work

- [ ] Choose a problem-led title. Working options:
  - Rebuilding Shopify's Store Editor for mobile
  - Preserving live storefront editing on mobile
  - Designing a mobile Store Editor without losing the preview
- [ ] Rewrite the description after the outcome terminology is verified.
- [ ] Draft the opening around one concrete merchant task.
- [ ] Replace vague phrases such as "pressure-tested," "tuned," and "coordinated" with
  observable actions and decisions.
- [ ] Remove repetition of the preview-versus-controls conflict once later sections
  provide evidence for it.
- [ ] Check every technical and UX claim against the research notes.
- [ ] Edit for short paragraphs and useful headings.
- [ ] Perform a final confidentiality review.

## Suggested execution phases

### Phase 1: Recover the evidence

- [x] Answer the source-material questions above.
- [x] Inventory available screenshots, prototypes, diagrams, metrics, and public sources.
- [x] Mark information that cannot be published or cannot be verified.

Deliverable: factual notes and an approved evidence set. **Completed 2026-09-03.**

### Phase 2: Build the narrative

- [x] Confirm the central thesis and title direction.
- [x] Map evidence to the proposed story.
- [x] Write a rough draft without polishing individual sentences.
- [ ] Review the draft separately as a recruiter, designer, and engineer.

Deliverable: structurally complete draft.

### Phase 3: Build the visual explanation

- [ ] Extract or source the three state images.
- [ ] Create annotations and, if useful, the technical diagram.
- [ ] Add any page component needed for the at-a-glance summary or figures.
- [ ] Verify mobile layout, media loading, and accessibility.

Deliverable: complete case-study page with supporting visuals.

### Phase 4: Edit and verify

- [ ] Tighten the copy and remove unsupported claims.
- [ ] Verify outcome terminology and attribution.
- [ ] Review ownership and confidentiality language.
- [ ] Check heading hierarchy, links, captions, alt text, and metadata.
- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Review the rendered page on mobile and desktop.

Deliverable: publication-ready post.

## Definition of done

- A recruiter can identify role, ownership, problem, solution, and impact in 30 seconds.
- An engineer can understand at least one meaningful implementation challenge and the
  reasoning behind its solution.
- A design reader can connect each interaction state to a user need and understand the
  known tradeoff in the nested-navigation model.
- The story contains at least one concrete iteration or validation example.
- The outcome has an unambiguous definition and appropriately cautious attribution.
- Every substantial claim is verified and safe to publish.
- Visuals explain the interaction rather than merely decorate the page.
- The page is responsive, accessible, lint-clean, and build-clean.

## Decision log

Use this table as decisions are made so context is not lost.

| Date | Decision | Reason |
|---|---|---|
| 2026-08-24 | Keep the project plan in `docs/case-studies/`. | Planning material should be versioned without being parsed as a journal post. |
| 2026-08-24 | Treat the rewrite as an evidence, narrative, visual, and implementation project. | The case study must serve both fast-scanning recruiters and technical readers. |
| 2026-08-24 | Lead with the mobile editing conflict rather than the UI component. | This better communicates product judgment and transferable impact. |
| 2026-08-24 | Preserve cautious attribution of the 10% increase. | Multiple improvements shipped during the same redesign period. |
| 2026-09-03 | Close Phase 1 and begin Phase 2. | The existing video, poster, extracted frames, and clips are recent captures of the current mobile browser experience; further captures are optional supplements rather than a Phase 1 requirement. |
| 2026-09-03 | Use “Preserving Shopify's live Store Editor on mobile” as the Phase 2 title direction. | It leads with the product problem while the description and opening clarify the implementation. |
| 2026-09-03 | Center the narrative on turning an early two-state component into an integrated mobile Store Editor experience. | This accurately distinguishes inherited work from Bernardo's ownership and supports both the interaction-design and engineering story. |
| 2026-09-03 | Replace the definition-of-done requirement about rejected alternatives with the verified nested-navigation tradeoff. | No evidence establishes that alternative overall interaction models were explored; retaining that criterion would encourage an unsupported narrative. |

## Working notes

### Phase 2 evidence map

| Story section | Supporting evidence | Boundary |
|---|---|---|
| Mobile editing conflict | Product requirements, representative homepage-editing task, public Shopify product context | Present the task as an example, not a research finding. |
| Starting point and ownership | Source interview recollections | Do not claim authorship of the original component, Figma direction, or Store Editor. |
| Three resting positions | Source interview and present-day state frames/video | Do not claim Bernardo originated the three-state concept. |
| Viewport sizing and header constraint | Source interview recollection of parent state, CSS custom property, and 58-pixel header | Omit exact percentages, formulas, and variable names. |
| Gesture behavior | Source interview recollection of velocity override, drop zones, handle taps, and `dnd-kit` responsibilities | Omit unrecovered thresholds and velocity formula. |
| Drag-versus-scroll boundary | Source interview recollection | State only that dragging began at the handle and content remained scrollable. |
| Preview-selection feedback | Source interview and present-day clip | Describe the visible bounce without claiming a synchronization fix. |
| Nested controls | Source interview and present-day frame/clip | Treat the Google Maps comparison as design rationale, not validation. |
| Validation | Recollection of team feedback, screen-reader checks, and physical-device testing | Do not claim merchant research, specific findings, or accessibility conformance. |
| Outcome | Product manager's remembered report | Attribute the approximate 10-percentage-point increase; disclose missing definition, baseline, window, and confounding releases. |
| Reflection | Bernardo's retrospective assessment | Keep the nested-navigation alternative distinct from what shipped. |

The rough draft now lives in
`content/projects/shopify-mobile-store-editor.md`. The three-audience review and
consolidated revision queue are recorded in
`docs/case-studies/shopify-mobile-store-editor-phase-2-review.md`.
