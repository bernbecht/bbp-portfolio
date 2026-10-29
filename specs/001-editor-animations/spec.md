# Feature Specification: Shopify Editor Explanatory Animations

**Feature Branch**: `001-editor-animations` (proposed)  
**Created**: 2026-10-28  
**Status**: Ready for repository integration discovery; visual defaults are proposed  
**Input**: Three minimal looping bottom-sheet state animations (collapsed, partial, full), plus a synchronized Velocity vs Position comparison in the Shopify Mobile Store Editor case study.

## User Scenarios & Testing

### User Story 1 — Understand each sheet state (Priority: P1)

As a case-study reader, I can understand the three sheet states through three separate, quiet illustrations without learning a playground.

**Why this priority**: The states explain the core interaction model and provide a useful standalone increment.

**Independent Test**: Render only the state group, observe one cycle, then pause it. The three labeled states and their relationship to the editor preview remain clear.

**Acceptance Scenarios**:

1. **Given** normal motion and a visible section, **when** it becomes active, **then** three labeled illustrations all start at the Collapsed pose and each moves to its own destination (Collapsed, Partially expanded, Fully expanded), holds, returns to Collapsed and repeats smoothly. Starting every sheet from the same pose communicates that the three states belong to one component.
2. **Given** a running group, **when** the group leaves the viewport or the tab is hidden, **then** playback suspends and resumes without catching up. No playback controls are shown.
3. **Given** reduced motion or unavailable scripting, **when** the article is read, **then** three meaningful static state illustrations (resting at their destination poses) and descriptions are available immediately.
4. **Given** a 320 CSS px viewport or 200% text zoom, **when** reading the group, **then** labels, controls and captions remain readable and the page has no horizontal overflow.

### User Story 2 — Compare release decisions (Priority: P2)

As a reader, I can compare a position-only rule with a velocity-aware rule using an explicitly shared release position and direction, so the destination difference is understandable.

**Why this priority**: Makes the interaction rationale concrete after the basic state vocabulary is established. Can ship independently with its own static explanation.

**Independent Test**: Render only the comparison. At the slow release both panels choose partial; at the fast upward release from the same position, Position chooses partial and Velocity chooses full.

**Acceptance Scenarios**:

1. **Given** a slow upward gesture, **when** release occurs in both panels, **then** both settle to partial and the caption explains why.
2. **Given** a fast upward gesture with the same release position, **when** both release in the same sampled frame, **then** Position settles to partial and Velocity settles to full; the labels identify the rules and direction.
3. **Given** repeated cycles, **when** ten cycles complete, **then** both panels still share the same phase, release instant and scenario; neither drifts independently.
4. **Given** a narrow container, **when** the panels stack, **then** Position precedes Velocity and synchronization and labels remain intact.
5. **Given** reduced motion, **when** the comparison is viewed, **then** a static two-scenario table communicates both outcomes without requiring playback.

### Edge Cases

- Preference switches to reduced motion mid-gesture: stop immediately and show static explanatory poses; switching back resumes playback automatically when the group is eligible.
- Hidden tab or offscreen group: suspend time without catching up on return. No sudden reset or elapsed-time burst.
- Resize during a gesture: preserve normalized position and phase; do not restart or separate comparison clocks.
- Zero-sized container, unavailable animation API, missing observer, hydration delay, JavaScript failure: retain static content; no repeated exceptions.
- Multiple instances on a page: unique accessible IDs; independent group controls and lifecycle cleanup.

## Requirements

### Functional Requirements

- **FR-001**: Provide exactly three state demonstrations labeled Collapsed, Partial and Full, plus one two-panel comparison labeled Position and Velocity. Reuse the article's language; these English strings are defaults.
- **FR-002**: Each state demonstration MUST emphasize its named resting state for at least half of its loop, make a restrained excursion and return to that same state. Do not implement a single carousel that substitutes for the three demonstrations.
- **FR-003**: Comparison panels MUST share scenario, normalized geometry, release position, release instant, gesture duration and clock. Only the destination rule differs. Fast and slow scenarios are illustrative inputs, not measured user gestures.
- **FR-004**: Show the slow case followed by the fast case on every comparison cycle, with readable persistent scenario labels and outcome descriptions. Exact proposed behavior is in the motion contract.
- **FR-005** (revised 2026-10-28): Neither group shows playback controls (no Pause, Resume or Replay) and there is no drag surface, slider or tuning UI. Both loop indefinitely while eligible. **Accepted deviation**: this does not meet WCAG 2.2.2 (Pause, Stop, Hide) for content that moves for more than five seconds. The product owner chose this explicitly; mitigations are static content for reduced motion and no scripting, suspension when offscreen or hidden, no flashing, and captions that carry all meaning.
- **FR-006**: Automatically start only when motion is allowed, the document is visible and the group intersects the viewport. Suspend when any automatic condition fails and resume when all pass.
- **FR-007**: Reduced-motion users MUST receive static explanatory content with no animated transforms, cursor, pulse or crossfade. Do not offer an animation override while that preference is active.
- **FR-008**: Static first render and no-script fallback MUST preserve all educational meaning. Animation enhances rather than gates article comprehension. Decorative internals MUST be excluded from the accessibility tree.
- **FR-009**: Every group MUST have an accessible name and description. The illustrations contain nothing focusable. No simulated dialog semantics or focus trap for illustrative sheets.
- **FR-010**: Avoid per-frame screen-reader announcements. Use stable captions; any textual scenario update is not an automatic live region. Identify outcomes through text/shape as well as color. Meet WCAG AA text contrast and 3:1 essential non-text contrast; no flashing. Contrast covers: the frame outline against the article background, the preview area against the frame and sheet, the sheet against the preview, and every skeleton block against the surface it sits on, in both light and dark themes.
- **FR-011**: State cards use three columns when each can be at least 200 CSS px wide, otherwise stack. Comparison uses two columns when each can be at least 240 CSS px wide, otherwise stacks. Respect host gutters and article max width. Captions stay outside scaled illustration artwork.
- **FR-012**: Illustrations MUST remain clipped to their local frame with no article overlay, scroll capture, pointer interception or navigation effects. Maintain reserved dimensions before enhancement to prevent layout shift.
- **FR-013**: Use the host site's typography, theme tokens, corner language and spacing. Keep a neutral editor preview, restrained surface contrast, simple handle and abstract content blocks. Avoid photorealism, device chrome excess and unsupported Shopify logos/assets.
- **FR-014**: Animation MUST release observers, media listeners, subscriptions and frame callbacks on unmount. Unsupported features degrade to static illustrations.
- **FR-015**: Do not add remote media, analytics, Shopify API access, user tracking or persistence. Playback requires no network request after the page bundle loads.
- **FR-016**: Unit, browser, accessibility, visual and performance verification specified in quickstart.md are required before implementation is considered complete.

### Key Entities

- State demonstration: named resting state, normalized pose, cycle phase and caption.
- Comparison scenario: input gesture, shared release position and velocity, two rule outcomes.
- Playback group: motion preference, visibility, elapsed active time and effective playback status.

## Success Criteria

- **SC-001**: All five illustrations (three state frames and two comparison frames) remain readable at 320, 375, 768, 1024 and 1440 CSS px viewport widths and 200% text zoom, without horizontal page scrolling.
- **SC-002**: Every specified release and resting pose matches the contract; after ten comparison cycles, paired release phase skew is zero in deterministic sampling and no more than one display frame in browser capture.
- **SC-003**: No element inside the illustrations is focusable or in the accessibility tree; no playback controls exist.
- **SC-004**: Reduced-motion and scripting-disabled runs communicate all three states and both comparison outcomes with zero automatic motion.
- **SC-005**: During a 20-second isolated capture on the recorded reference device, at least 95% of active frame intervals are ≤20 ms at 60 Hz, feature-attributable layout shift is 0, and no feature-attributable main-thread task exceeds 50 ms. Document device/browser/build and separate unrelated page work.
- **SC-006**: After suspension or unmount, no feature animation callback remains scheduled; over a ten-second hidden/offscreen inspection there is no animation work from the feature.
- **SC-007**: Incremental compressed production JavaScript for the feature is ≤20 KiB, including any newly introduced dependency attributable to it. No new runtime dependency without an explicit recorded budget assessment.

## Assumptions and Boundaries

The site is an article-oriented web application; actual framework is unknown. This package defines an explanatory model, not a production Shopify gesture algorithm. Normalized snap points and timing are proposed defaults because the prior visuals and article content were unavailable. Verify captions against the article before integration; resolve factual conflicts in research.md and update all dependent contracts/tests together.

In scope: local illustrations, responsive layout, static alternatives, lifecycle behavior and tests. Out of scope: functional mobile editor, real drag interaction, production physics fidelity, scroll-linked animation, new article sections unrelated to these explanations, redesign, backend, API endpoints, authentication, deployment and analytics.
