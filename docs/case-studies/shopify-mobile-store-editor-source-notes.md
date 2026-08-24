# Shopify mobile Store Editor case study: source notes

Status: **In progress — interview paused after ownership and collaboration**

Last updated: 2026-08-24

Related plan: [Shopify mobile Store Editor case study plan](shopify-mobile-store-editor-plan.md)

## Purpose of this file

This file preserves facts recovered for Phase 1, Task 1 of the case study project. It is
source material, not finished blog copy. Confirmed information, representative examples,
uncertain memories, and editorial interpretations are labeled separately so the final
post does not accidentally turn an inference into a historical claim.

## Product and user context

### Representative editing task

Editing a homepage section's text, image, or settings is a truthful representative
example of what merchants were trying to do on mobile. Merchants were trying to perform
the same kinds of store-editing tasks they performed on desktop.

This is a representative scenario, not a remembered research finding about the most
common task. In the final post it should be introduced as an example, not presented as
behavior established through user research.

### Experience before the redesign

The mobile Store Editor largely inherited an interaction model designed for desktop.
The navigation was already understood by the team to be poorly suited to mobile and
occupied too much of the limited viewport.

The precise presentation of the old navigation is not remembered. It may have been a
side panel, fixed bottom panel, or contextual panel, but none of those possibilities is
currently verified. Do not name the previous panel behavior unless an artifact confirms
it.

A defensible description of the structural problem is:

> An interface that could place editing controls beside a preview on desktop could not
> preserve the same relationship within a narrow mobile viewport.

Do not state that merchants repeatedly lost context unless later evidence establishes
that this was observed rather than inferred.

### Why the work became a priority

The poor mobile navigation was a known issue but had not previously been prioritized.
When Shopify increased its focus on Brazil and India, where mobile devices played an
important role in internet access, the Store Editor team wanted to contribute to that
company goal by improving mobile editing.

Before publication, confirm that naming Brazil and India and connecting them directly to
the initiative is both accurate and safe to disclose. If not, use the broader phrase
"mobile-first markets."

### Product requirements

Merchants needed to be able to edit their stores on both mobile and desktop. Capability
parity was an existing requirement; the mobile experience was not intended to be a
reduced companion workflow.

Capability parity did not require an identical interface. Mobile interactions could
differ from desktop as long as merchants retained the same editing capabilities.

Keeping the storefront preview visible was also a requirement from the beginning. It
expressed a core design principle: merchants should receive immediate visual feedback
when they edit their storefront.

## Starting point before Bernardo's work

An initiative to move the Store Editor's mobile navigation into a bottom sheet already
existed. It began as a collaboration between a designer and a developer:

- The designer created brief Figma mocks illustrating the interaction.
- The developer created the bottom sheet as a React component.
- The designer later left and the developer moved to other work.

At that point, the bottom sheet functioned as a generic container, but its Store Editor
integration and interaction polish were incomplete.

The initial implementation had only two working states: collapsed and fully expanded.
It could also overlap the primary header of the store shown in the live preview.

The original interaction direction appears to have included a partially expanded state.
That state was dropped before or during the initial implementation, possibly because of
time constraints. Bernardo was later asked to restore the functionality when the team
had capacity. The reason it was originally dropped is not confirmed.

`dnd-kit` was already the predetermined interaction library. Its creator worked at
Shopify at the time and was available to provide development support, which helped the
work progress more quickly.

## Bernardo's ownership

Bernardo was the sole engineer responsible for integrating the existing bottom-sheet
component into the Store Editor.

Remembered responsibilities include:

- Using the bottom sheet as a container for Store Editor sections, panels, and editing
  controls
- Implementing navigation between nested editing sections inside the sheet
- Adapting editing controls such as radio buttons, text inputs, and input labels to the
  mobile-sheet context
- Coordinating control changes involving Shopify's Polaris design system and the Store
  Editor's internal Polaris fork
- Implementing the three working positions: collapsed, partially expanded, and fully
  expanded
- Preventing the bottom sheet from overlapping the main storefront header in the live
  preview
- Testing changes on physical mobile devices
- Adding a feedback animation to the collapsed sheet when the merchant selected a
  different editable storefront element in the live preview

The bottom-sheet component itself, the initial Figma direction, the underlying Store
Editor, and the live-preview architecture already existed. Do not imply that Bernardo
created the entire bottom sheet or Store Editor from scratch.

A strong, accurate working summary of the contribution is:

> I took an early two-state bottom-sheet component and turned it into an integrated
> mobile Store Editor experience.

An alternative emphasizing ownership is:

> I was the sole engineer responsible for integrating the bottom sheet into the Store
> Editor. I also completed interaction work that had been deferred from the earlier
> concept, including restoring the partially expanded state.

## Interaction feedback detail

When a merchant tapped a different editable part of the storefront preview, the
collapsed sheet bounced to indicate that the corresponding editing content had changed
inside it.

Potential UX interpretation: the animation made a change outside the merchant's
immediate focus visible and pointed toward the location of the newly selected controls.
This relates to visibility of system status and spatial signaling. That interpretation
is editorial analysis and should be checked against Bernardo's intent before it becomes
final copy.

The production term and exact motion are not yet confirmed. It may be more accurate to
describe it as a nudge, bounce, or spring transition after reviewing an artifact.

## Design-system context

Some editing controls required adjustment for use inside the mobile sheet. Input labels
are one remembered example, but the precise problem and changes are not currently
remembered.

Some changes involved the main Polaris design system. For other needs, the Store Editor
used its own Polaris fork and coordination was required. Upstream Polaris releases could
affect the Store Editor, while Polaris did not always provide what the Store Editor
needed.

This is promising technical material, but do not describe exact component API,
accessibility, or styling changes until memory or artifacts can verify them.

## Collaboration

Bernardo's main collaborators were:

- A staff engineer with deep product knowledge who provided guidance about the Store
  Editor and Shopify-specific considerations
- The developer who created the initial bottom-sheet component
- A designer who reviewed interaction changes Bernardo was considering

No specific example is currently remembered in which collaborator feedback changed the
design or implementation. Do not invent one.

## Validation and testing boundary

There was no user validation or formal merchant research for this work. Interaction
feedback came from the product team. Implementation testing was performed on physical
mobile devices.

Do not describe internal feedback as user validation. In the finished case study,
distinguish clearly between:

- Team design feedback
- Physical-device implementation testing
- Business outcome measurement

Bernardo did not own user research, rollout, or analytics work based on the information
recovered so far.

## Outcome information recovered so far

The current published post says the broader redesign period saw a 10% increase in mobile
Store Editor adoption and describes the bottom sheet as contributing to that increase.
No additional definition or verification of that metric has been recovered during the
interview yet.

Questions still to answer include what "adoption" measured, whether 10% was relative or
percentage-point growth, the measurement period, and which other changes shipped during
the same period.

## Corrections to the current post or earlier evaluation

- Do not claim Bernardo originally conceived the three-state model. The partially
  expanded state came from earlier interaction work and was later restored and
  implemented by Bernardo.
- Do not imply the bottom sheet was built from scratch by Bernardo. An initial React
  component already existed.
- Do not claim formal user validation. The work received internal team feedback and was
  tested on physical devices.
- Do not specify how the previous mobile panel behaved without an artifact.
- Do not claim three alternative designs were pressure-tested until that statement is
  confirmed.

## Interview resume point

Resume with the exploration and interaction-decision questions below.

1. Did the initial Figma concept contain three states? Can we confidently say the
   partially expanded state was part of the original design but omitted from the initial
   implementation?

2. Were these three alternatives genuinely considered or prototyped?
   - Controls always visible
   - Separate edit and preview screens
   - A three-state bottom sheet

   The current post claims they were pressure-tested. If that is not remembered, remove
   the comparison rather than reconstructing it as history.

3. Does this description of the states match Bernardo's recollection?
   - **Collapsed:** maximize the storefront preview while retaining access to editing.
   - **Partially expanded:** expose useful controls while keeping enough of the
     storefront visible to understand the edit.
   - **Fully expanded:** provide space for editing controls that need greater attention.

4. How were the partially expanded height and other stopping positions determined? Were
   they fixed dimensions, viewport percentages, calculated around the storefront header,
   inherited from the designs, or adjusted during device testing?

5. Is there a concrete issue remembered from physical-device testing, such as scrolling
   conflicts, browser gestures, snap behavior, keyboard behavior, insufficient visible
   content, or a difference between iOS and Android?

## Remaining interview areas

After exploration and interaction decisions, continue with:

- Engineering implementation details
- Outcome definition and attribution
- Reflection and what Bernardo would do differently
- Publication safety and confidentiality review

Artifact inventory is Phase 1, Task 2 and should begin only after the interview questions
in Task 1 are complete.
