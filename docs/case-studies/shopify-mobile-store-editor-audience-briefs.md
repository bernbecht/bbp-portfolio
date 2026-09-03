# Shopify mobile Store Editor: future audience briefs

Status: **Planning material for a future role-personalized case study**

Last updated: 2026-09-03

These briefs preserve the editorial inputs for a future case-study controller that can
adapt the narrative for recruiters, designers, and engineers. They are not alternate
published posts. Until that feature is designed, the single layered article in
`content/projects/shopify-mobile-store-editor.md` remains the source presented to every
reader.

## Shared factual core

Every audience version must preserve these facts:

- An early mobile bottom-sheet direction and generic React component already existed.
- The inherited component had collapsed and fully expanded working positions.
- Bernardo was the sole engineer responsible for integrating it into the Store Editor.
- His contribution included the partial state, nested navigation, mobile control
  adaptations, header-overlap prevention, physical-device testing, screen-reader
  checks, and storefront-selection feedback.
- A parent component owned sheet state and supplied state-dependent content height
  through a CSS custom property.
- Slow releases used three viewport-relative drop zones after accounting for the
  58-pixel storefront header; sufficiently fast vertical gestures overrode position.
- Dragging began only at the handle, leaving the content area available for scrolling
  and control interaction.
- A present-day browser recording and its derivatives show the visible shipped
  interaction.
- The product manager reported an approximately 10-percentage-point increase in the
  frequency of mobile Store Editor use during a broader redesign. The definition,
  baseline, window, underlying report, and effect of concurrent releases are not
  available.

The Phase 1 source notes remain authoritative when this summary and the detailed record
differ.

## Recruiter brief

### Reader goal

Understand the problem, Bernardo's ownership, shipped contribution, and reported impact
within approximately 30 seconds, with enough detail afterward to establish credibility.

### Emphasize

- The one-sentence thesis and the inherited-versus-owned boundary
- The business reason for improving mobile editing
- The three most important contribution areas
- The shipped three-state experience
- The attributed outcome and its limitations in compact language
- The specific reflection about what Bernardo would change today

### De-emphasize

- Detailed gesture routing and component data flow on the first screen
- `dnd-kit`, CSS custom properties, and drop-zone mechanics until later in the article
- Lengthy caveats that can be expressed accurately in one sentence

### Best supporting artifacts

- Hero demonstration video
- One visual comparing the three resting positions
- A concise at-a-glance summary

## Designer brief

### Reader goal

Understand how the mobile constraints shaped the interaction, what purpose each state
served, and how feedback and navigation tradeoffs were handled.

### Emphasize

- Capability parity without copying the desktop layout
- Preserving preview context while exposing editing controls
- The purpose of collapsed, partially expanded, and fully expanded states
- The handle boundary between dragging and content scrolling
- The bounce that signaled a changed storefront selection
- The stacked nested-sheet compromise and the alternative Bernardo would test today
- The difference between team feedback, device testing, and merchant validation

### De-emphasize

- Low-level component boundaries unless they explain a visible interaction
- The outcome number as proof of a particular design decision

### Best supporting artifacts

- Collapsed, partial, and full-state frames
- Preview-selection-feedback clip
- Nested-sheet frame or clip

## Engineer brief

### Reader goal

Understand how interaction intent became a concrete stateful implementation and where
the library boundary ended.

### Emphasize

- The inherited component boundary and Store Editor integration ownership
- Parent-owned sheet state and CSS-custom-property content sizing
- The 58-pixel header constraint and viewport-relative resting positions
- `dnd-kit` draggable, droppable, and vertical-axis modifier responsibilities
- Custom velocity calculation versus position-based drop zones
- Handle-only dragging as a deterministic scroll-versus-drag rule
- State-dependent storefront-selection feedback
- Nested-sheet lifecycle and the known navigation compromise
- Physical-device and screen-reader testing with no unsupported claims about findings

### De-emphasize

- Exact types, formulas, thresholds, component names, platform fixes, or performance
  measurements because those details have not been recovered
- Accessibility conformance or remediations not supported by an artifact

### Best supporting artifacts

- State-transition clip
- Preview-selection and nested-sheet clips
- A future state/event-flow diagram grounded in the verified transitions

## Claims to qualify or omit in every version

- Do not say Bernardo created the original concept, bottom-sheet component, Store
  Editor, or live-preview architecture.
- Do not say alternative overall designs were pressure-tested.
- Do not claim formal merchant research or user validation.
- Do not invent iOS/Android differences, preview-jump fixes, formulas, thresholds,
  performance measurements, or accessibility findings.
- Do not present the reported adoption change as independently verified or caused by
  the bottom sheet alone.
- Treat the Google Maps comparison as contemporaneous design rationale, not usability
  evidence.

## Future interaction intent

The eventual case-study controller should:

- Offer recruiter, designer, and engineer choices with an explicit visible label.
- Change already-delivered local content without fetching or reloading the page.
- Preserve the reader's position or clearly communicate any layout movement.
- Animate the content change without obscuring meaning or delaying interaction.
- Respect `prefers-reduced-motion` with an immediate or minimal transition.
- Use semantic controls with keyboard operation, visible focus, and an announced
  selected state.
- Keep the complete factual core available in every version; personalization changes
  emphasis and ordering, not the underlying history.

The future data schema, URL persistence, animation implementation, and React component
architecture remain intentionally undecided until the feature is scheduled.
