# Shopify mobile Store Editor: Phase 2 draft review

Status: **Complete — narrative recommendations incorporated 2026-09-03**

Date: 2026-09-03

Draft reviewed:
[`content/projects/shopify-mobile-store-editor.md`](../../content/projects/shopify-mobile-store-editor.md)

## Review method

The draft was reviewed separately for three audiences. Each review asks whether the
story gives that reader enough information, whether its claims remain within the Phase
1 evidence boundary, and which changes belong to narrative revision versus the visual
work planned for Phase 3.

## Recruiter review

### What works

- The title communicates a product outcome rather than presenting the work as an
  isolated UI component.
- The first screen establishes the product, role, inherited starting point, individual
  ownership, and shipped result.
- The thesis—turning an early two-state component into an integrated mobile Store Editor
  experience—is specific and defensible.
- The draft demonstrates cross-functional range without blurring the distinction
  between inherited design direction and Bernardo's implementation ownership.
- The reflection shows judgment and does not end with a generic lesson.

### What may slow a 30-second scan

- The result row appropriately avoids presenting an unverified number as fact, but it
  is less concrete than the ownership and implementation rows. The attributed number
  appears only near the end of the article.
- The engineering section is the longest part of the story. Its headings are useful,
  but a scanning reader has no short summary of the three most important contributions
  before entering the details.
- The at-a-glance table contains long sentences that may be difficult to scan on a
  narrow screen. This is primarily a Phase 3 layout issue.
- A project period and compact team description would normally help, but the approved
  source material does not currently provide them. They should not be invented merely
  to complete a conventional case-study template.

### Recruiter recommendation

Keep the current thesis and title. During revision, tighten the result row and consider
a compact three-item contribution summary near the start. Do not trade the careful
outcome attribution for a stronger-looking but unsupported impact claim.

## Product and interaction-design review

### What works

- The central constraint is clear: editing capability and the live preview both had to
  survive the move to a narrow viewport.
- Each resting position is tied to a distinct purpose instead of being described as a
  purely visual state.
- The drag-versus-scroll boundary is a concrete example of resolving competing touch
  interactions.
- The collapsed-sheet bounce explains how a change in editing context was made visible
  without forcing the sheet open.
- The nested-sheet section presents a real design disagreement, the shipped compromise,
  and a more direct alternative Bernardo would explore today.
- The draft is transparent that team feedback and physical-device testing were not
  formal merchant validation.

### What remains weak or unsupported

- The draft implies a set of success criteria but does not gather them in one place.
  Explicitly stating capability parity, persistent preview context, and workable touch
  behavior would make later decisions easier to evaluate.
- The reason for choosing the exact intermediate height is unavailable. The story may
  explain the purpose of the state and its viewport-relative implementation, but it
  cannot claim that research or comparative testing established the height.
- There is no evidence that alternative overall interaction models were prototyped or
  pressure-tested. The story correctly omits the old comparison table.
- The current Phase 4 definition of done expects readers to understand why rejected
  alternatives were weaker. That criterion conflicts with the recovered evidence and
  should instead ask whether readers understand the shipped model and its known nested-
  navigation tradeoff.
- The three positions are difficult to compare from prose alone. The existing state
  frames should solve this in Phase 3.

### Design recommendation

Add a short success-criteria passage during narrative revision. Preserve the honest
validation boundary. In Phase 3, use the three state frames as an explanatory sequence
and use the nested-sheet evidence to support the tradeoff section.

## Engineering review

### What works

- The draft gives a clear component boundary: a parent owned sheet state and supplied
  state-dependent content height through a CSS custom property.
- The 58-pixel header constraint connects a visible product requirement to the
  viewport calculation.
- The gesture section distinguishes velocity overrides from position-based drop zones
  and identifies which capabilities came from `dnd-kit` versus custom work.
- Restricting dragging to the handle is a concrete and understandable solution to the
  scroll-versus-drag conflict.
- The state-dependent preview-selection behavior and nested-sheet lifecycle make the
  integration story more substantial than component styling.
- The draft correctly avoids invented state types, formulas, thresholds, component
  names, performance measurements, and platform-specific fixes.

### What could be clearer

- A small event/state diagram would communicate the resting states, handle taps,
  velocity overrides, position-based releases, and nested-sheet branch more efficiently
  than prose. This belongs to Phase 3.
- “Predictable” describes the intended behavior rather than a measured usability
  result. The final edit should retain it only as design intent, not validation.
- Physical-device and screen-reader testing are confirmed, but only physical-device
  testing appears in the draft. A concise mention of ongoing screen-reader checks would
  make the testing account more complete, provided it does not imply a specific finding
  or accessibility conformance.
- Adaptation of Store Editor controls and coordination with Polaris are part of the
  confirmed ownership story, but the available evidence is too general for a useful
  technical subsection. Keeping this as a brief scope item is more credible than
  expanding it.

### Engineering recommendation

Retain the current technical depth and evidence boundaries. Add the qualified
screen-reader-testing statement during revision, then create a compact interaction-flow
diagram in Phase 3. Do not fill unrecovered implementation details with plausible
reconstructions.

## Consolidated revision queue

The Phase 2 narrative items below have been incorporated into the unified article. The
Phase 3 items remain future visual and layout work.

### Phase 2 narrative revisions

1. Add a compact statement of the three success criteria.
2. Consider a shorter contribution summary for scanning readers.
3. Add a qualified mention of screen-reader testing.
4. Ensure “predictable” is framed as interaction intent rather than a validated result.
5. Tighten the at-a-glance result without overstating the reported outcome.
6. Replace the unsupported “rejected alternatives” definition-of-done criterion in the
   plan.

### Phase 3 visual and layout work

1. Pair the collapsed, partial, and full-state frames as one explanatory sequence.
2. Create an interaction-flow diagram only if it adds information beyond the frames.
3. Use the nested-sheet clip or frame to support the navigation tradeoff.
4. Replace or restyle the at-a-glance table for narrow screens.

## Conclusion

The draft succeeds as an evidence-bounded first narrative. A recruiter can identify the
problem and ownership quickly; a design reader can understand the purposes of the three
states and the main tradeoff; and an engineer can follow several meaningful
implementation decisions. The remaining issues are refinements rather than a need to
restructure the story.
