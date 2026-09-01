# Shopify mobile Store Editor case study: source notes

Status: **In progress — source interview and artifact inventory complete; external capture pending**

Last updated: 2026-08-31

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
Bernardo thinks the initial Figma concept contained all three states: collapsed,
partially expanded, and fully expanded. This is a probable memory rather than a fact
confirmed by the original artifact. The partially expanded state was dropped before or
during the initial implementation, possibly because of time constraints. Bernardo was
later asked to restore the functionality when the team had capacity. The reason it was
originally dropped is not confirmed.

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

## Engineering implementation

### State ownership and sheet sizing

A parent component owned the bottom sheet's state. It calculated the sheet height for
the different resting states using CSS custom properties and passed those variables
down to the sheet component.

The precise React state shape, CSS custom-property names, formulas, and component names
are not currently remembered. Do not claim that the implementation used an enum, formal
state machine, or a particular state-management library without artifact verification.

### State transitions and gesture behavior

The sheet responded to drag velocity as well as its position when released:

- A sufficiently fast upward drag sent it to fully expanded.
- A sufficiently fast downward drag sent it to fully collapsed.

When the drag velocity did not determine the destination, the viewport was divided into
three drop zones after subtracting the storefront header height of 58 pixels. Releasing
the sheet within a zone changed its resting state to collapsed, partially expanded, or
fully expanded. This connects the viewport-relative sizing to a concrete interaction:
the header was excluded from the available vertical area before the three zones were
calculated.

Tapping the bottom-sheet handle used these confirmed transitions:

- Collapsed to partially expanded
- Partially expanded to fully collapsed
- Fully expanded to fully collapsed

### Selecting elements in the preview

When the merchant selected an editable storefront element while the sheet was
collapsed, the sheet stayed collapsed and bounced to signal that its controls had
changed. When the sheet was already open, it loaded the newly selected element's
controls without the bounce or another state change.

### Drag-versus-scroll boundary

Dragging the sheet was restricted to its handle. A merchant could not initiate a sheet
drag from the controls or other sheet content, leaving vertical gestures in the content
area available for scrolling. The implementation therefore avoided resolving drag and
scroll intent dynamically based on the content's current scroll position.

### Nested controls and stacked sheets

Some controls opened a second bottom sheet over the original sheet, behaving like a
modal dialog:

- A backdrop visually emphasized the modal relationship and made the original sheet
  non-interactive.
- The nested sheet opened partially expanded.
- It could be expanded fully or closed.
- Selecting its Done action collapsed the nested sheet, removed the backdrop, and made
  the original sheet interactive again.

This behavior was debated. Bernardo felt that replacing the original sheet's content
with the nested controls, together with a Back or Done action, would have produced a
clearer navigation model than stacking sheets. Such a replacement would also have
needed a transition animation to communicate the navigation and preserve spatial
continuity.

The team did not have time to redesign and implement that alternative. Bernardo
accepted the stacked-sheet behavior in part because products such as Google Maps were
already using multiple sheets for navigation, suggesting that users may recognize the
pattern. Treat that comparison as Bernardo's contemporaneous design rationale, not as
usability evidence or proof that the pattern was universally established.

### `dnd-kit` boundary

`dnd-kit` provided three remembered building blocks:

- The draggable object representing the bottom sheet
- The droppable targets used to select a resting state when the sheet was released
- A modifier that restricted dragging to the vertical axis

The library did not provide the drag-velocity measurement needed by this interaction.
Bernardo implemented a custom function that calculated the movement delta so a fast
upward or downward drag could override the position-based drop-zone result. The exact
formula, time sampling, and velocity threshold are not remembered and should not be
invented.

The parent also recalculated the available height for the sheet's content when the
sheet state changed and passed the result down through a CSS custom property. This is
more specific than the earlier recollection of state-dependent sheet sizing: the CSS
variable controlled the content height for the current sheet state. The precise formula
and variable name remain unverified.

### Preview synchronization and visual stability

Bernardo does not recall a specific preview-synchronization or visual-jump problem, its
cause, or a corresponding fix. Do not include such an engineering claim unless an
artifact supplies evidence. The separately confirmed behavior—loading controls and
bouncing the collapsed sheet when an element was selected—can still be described.

### Cross-platform behavior

Bernardo does not recall specific differences or bugs between iOS and Android or
between emulators and physical devices. Do not claim platform-specific accommodations
or test findings without supporting artifacts.

### Viewport and environment changes

Bernardo does not recall how the implementation handled safe-area insets, orientation
changes, browser viewport resizing, or the virtual keyboard opening over inputs. Do not
describe specific handling for these cases without artifact evidence.

### Accessibility

Bernardo remembers testing the implementation with a screen reader throughout the
work. No specific screen-reader issue, design change, focus behavior, semantic
implementation, keyboard interaction, touch-target adjustment, or reduced-motion
behavior is remembered. The final case study may describe ongoing screen-reader
testing, but it must not imply particular findings, remediations, or conformance without
additional evidence.

### Performance measurement

No formal animation or rendering performance measurement is remembered. Do not claim
frame-rate measurement, profiling, performance traces, or a quantified performance
result. Physical-device testing remains confirmed, but it should not be reframed as a
specific performance methodology without evidence.

### Technical compromise in retrospect

The only technical or interaction compromise Bernardo would identify today is the
stacked nested-sheet behavior described above. He does not remember another feature
that was knowingly omitted or implemented incorrectly. In reflection, focus on the
alternative navigation model—replacing content in the original sheet and communicating
the transition—without manufacturing a broader list of shortcomings.

## Reflection

The main lesson Bernardo draws from the work is the importance of treating mobile as a
distinct product and interaction context rather than translating a desktop interface
directly into a smaller viewport.

In Bernardo's reflection, moving a desktop experience to mobile can require more
adaptation than moving a mobile experience to desktop. Desktop offers more forgiving
screen real estate and interactions centered largely on mouse and keyboard. Mobile
design may also need to account for:

- Data usage
- Touch gestures
- Limited screen real estate
- The user's surrounding context, such as commuting or completing a task briefly while
  waiting in line, compared with more stationary desktop use at home or in an office

These are retrospective design considerations, not all confirmed requirements or user
research findings from this Store Editor project. In particular, do not imply that data
usage or commuting scenarios drove the original work unless further evidence supports
that claim. They may be explored in the reflection as examples of the broader mobile
design context.

Bernardo does not recall additional lessons specific to the project. Keep the final
reflection focused rather than manufacturing several takeaways.

## Publication safety and confidentiality

Bernardo considers all topics recovered in this interview safe to publish, including:

- The connection to Shopify's focus on Brazil and India
- The 58-pixel storefront header measurement
- The Store Editor's internal Polaris fork
- The `dnd-kit` creator's connection to Shopify and availability for support
- The debate and compromise around stacked nested sheets
- The product manager's reported adoption increase

This is Bernardo's publication-safety assessment. The final editorial review should
still avoid exposing source code, internal documents, personal names, or additional
company information that was not evaluated here.

## Artifact inventory

### Local project-specific artifacts

#### Demonstration video

- Path: `public/projects/shopify-mobile-store-editor/store-editor-bottom-sheet.mp4`
- Format: H.264 video in a QuickTime-compatible container
- Dimensions: 756 by 1326 pixels
- Frame rate: 60 frames per second
- Duration: approximately 23.9 seconds
- File size: approximately 4.7 MB

Visual review confirms that the video contains frames suitable for explaining:

- The collapsed state with most of the storefront preview visible
- The partially expanded state with controls and preview visible together
- The fully expanded state with the controls occupying most of the viewport
- Selecting an editable element in the storefront preview
- Navigation to nested controls

The video is the strongest available visual evidence and can supply three annotated
stills in Phase 3. Exact timestamps should be selected when those assets are extracted.
It does not expose the code-level velocity calculation, CSS custom properties, exact
drop-zone math, analytics, or the history of the design decision.

The following full-resolution PNG frames have now been extracted from the video:

- `evidence/sheet-collapsed.png` at approximately 0.25 seconds
- `evidence/sheet-partial.png` at approximately 6.5 seconds
- `evidence/sheet-full.png` at approximately 9.5 seconds
- `evidence/nested-sheet-controls.png` at approximately 16.5 seconds

The three state frames cleanly show their different relationships between preview and
controls. The nested-controls frame shows navigation within the editing experience; do
not use that single frame alone to claim the complete stacked-sheet transition,
backdrop, or modal interaction.

Three focused, silent H.264 clips have also been extracted from the historical video:

- `evidence/preview-selection-feedback.mp4`, covering approximately 1.75–5.25 seconds
- `evidence/state-transitions.mp4`, covering approximately 4.75–12.25 seconds
- `evidence/nested-sheet-controls.mp4`, covering approximately 14.75–19.75 seconds

These clips are editorial extracts of the demonstration video, not independent
evidence. Keep the original video as the preserved master.

#### Poster image

- Path: `public/projects/shopify-mobile-store-editor/store-editor-bottom-sheet-poster.jpg`
- Dimensions: 720 by 1262 pixels

The poster is an existing project-specific still and is already referenced by the post's
`heroVideo` frontmatter. It can remain the video poster, but the three-state explanation
will require additional frames from the video.

#### Current case-study Markdown

- Path: `content/projects/shopify-mobile-store-editor.md`

This is an editorial artifact, not independent evidence. It contains several claims
that the interview has corrected or left unverified, including sole design ownership,
pressure-testing three alternatives, cross-platform differences, preview
synchronization without visual jumps, and a loosely defined 10% adoption increase.

### Local artifacts not found

The repository contains no additional project-specific screenshots, Figma exports,
prototype files, implementation source code, technical diagrams, research reports,
analytics reports, or product-manager messages. Git history for the case-study content
does not add earlier evidence beyond the current Markdown, video, poster, and planning
notes.

### Artifact pursuit scope

Bernardo no longer works at Shopify and does not have access to Shopify's internal
systems. The artifact search should therefore not depend on recovering:

- Internal source code, branches, commits, pull requests, or review discussions
- Internal Slack messages or product-manager communications
- Analytics dashboards, metric definitions, or adoption reports
- Internal briefs, RFCs, launch summaries, QA reports, or accessibility reviews
- Private Figma files or version history
- Documentation for Polaris or the Store Editor's internal Polaris fork

Do not ask former colleagues to share material they are not authorized to disclose.
These unavailable artifacts are evidence limitations, not open collection tasks.

The remaining artifact work should focus on sources Bernardo can access and publish:

1. New screenshots and recordings of the current browser experience
2. Frames and short sequences extracted from the existing demonstration video
3. The existing poster image
4. Relevant files in Bernardo's lawful personal archives, if any
5. Public Shopify documentation, archived pages, talks, engineering posts, and
   official `dnd-kit` documentation
6. Bernardo's labeled recollections, used with appropriate qualification

A single bounded search of personal archives is reasonable. Do not leave Phase 1 open
indefinitely for artifacts that are unlikely to be recoverable.

### Public sources

Two public sources can support limited background context:

- [Shopify Help Center: Online store editor for the Shopify app](https://help.shopify.com/en/manual/shopify-admin/shopify-app/mobile-online-store)
  confirms that merchants can customize themes on mobile and edit sections, blocks, and
  theme settings. It does not verify this project's design history or outcome.
- [Shopify Help Center: The theme editor](https://help.shopify.com/en/manual/online-store/themes/customizing-themes/theme-editor)
  confirms that the theme editor presents an automatically updating preview alongside
  customization controls. It supports the product-context description, not the claim
  that this project introduced live feedback.
- [Official `dnd-kit` modifier documentation](https://dndkit.com/extend/modifiers/)
  confirms that modifiers constrain draggable movement, including restriction to the
  vertical axis. The current documentation may differ from the version used during the
  project, so it should support only the general library capability.

A [June 2026 Shopify changelog entry](https://changelog.shopify.com/posts/online-store-editor-with-sidekick-on-mobile)
describes a newer rebuilt mobile Online Store Editor. Because it postdates this project
and may describe a successor implementation, do not use its details as evidence for
Bernardo's work. It may be mentioned only if the final narrative explicitly distinguishes
the later product from the historical project.

No public source was found for the 10-percentage-point usage increase, the internal
Polaris fork, the original Figma concept, the 58-pixel header constraint, the custom
velocity calculation, or the nested-sheet design debate.

### Evidence classification

Approved evidence currently consists of:

- Bernardo's labeled recollections in this file
- The demonstration video and poster
- Public Shopify documentation for general product context
- Official `dnd-kit` documentation for general modifier capability

Bernardo has confirmed that the current mobile Store Editor experience available in a
browser is still the interaction he developed. New captures may therefore corroborate
the shipped behavior. They do not independently establish authorship, chronology,
historical design ownership, code-level implementation details, or business outcomes.

Unverified information must remain qualified or be omitted. The product manager's
reported outcome has no available artifact and should be attributed rather than stated
as independently measured fact. No information recovered in the interview was marked
unpublishable by Bernardo.

## External capture brief

Bernardo has access to a Shopify store that may be used to collect additional
screenshots and videos. He has confirmed that the current browser experience is still
the interaction he developed. These captures should be described as present-day
confirmation of the shipped interaction and paired with the existing demonstration
video as the historical project artifact.

Before publication, verify that the captured behavior still matches the demonstration
video. If a particular interaction has changed, label that capture as present-day
reference and do not use it to establish the historical behavior.

Use a disposable or non-sensitive theme with fictional storefront content. Remove or
crop store identifiers, account information, customer information, unpublished business
data, browser chrome containing personal details, and notifications.

### Required screenshots

Capture the same selected storefront element and device orientation in all three images
so the sheet-height comparison is clear:

1. **Collapsed:** most of the storefront is visible; the sheet handle and collapsed
   label remain legible.
2. **Partially expanded:** controls and the storefront header are both visible, showing
   how editing context is preserved.
3. **Fully expanded:** the controls occupy most of the available viewport and the sheet
   is visibly at its upper stopping position.

For each image:

- Use portrait orientation.
- Prefer a physical phone or a consistent mobile viewport around 390 by 844 CSS pixels.
- Keep the same theme, page, editable element, and scroll position.
- Avoid pointer indicators unless they explain an interaction boundary.
- Capture the clean interface without annotations; annotations will be added later.
- Retain the original-resolution PNG when possible.

### Required videos

Record short, separate clips rather than one long walkthrough:

1. **State transitions:** begin collapsed, tap the handle to reach partial, drag to full,
   then tap the handle to collapse. Pause briefly at each resting state.
2. **Drop zones:** slowly drag and release the handle once in each of the three vertical
   zones so the resulting state is visible.
3. **Velocity override:** demonstrate a quick upward flick to full and a quick downward
   flick to collapsed, if the accessible implementation still behaves this way.
4. **Preview selection feedback:** with the sheet collapsed, select a different editable
   storefront element and capture the sheet's bounce plus its updated label or content;
   repeat with the sheet open to show controls changing without the bounce.
5. **Nested controls:** open a control that creates the second sheet, show its backdrop
   and partially expanded starting position, expand it fully, then select Done to return
   control to the original sheet.
6. **Content scrolling boundary:** scroll controls from within the sheet, then drag only
   from the handle, making the distinct interaction targets visible.

Record at native resolution and 60 frames per second if convenient. Disable taps or
touch indicators for the clean master recording; an additional version with touch
indicators is useful only if the gesture would otherwise be ambiguous. Avoid narration,
background audio, and notifications.

### Optional evidence captures

- A screen-reader recording that demonstrates an actual, understandable interaction is
  useful only if the accessible implementation and spoken output can be shared safely.
- Additional clean frames or short sequences may be extracted from the existing
  demonstration video when they explain an interaction more clearly than a new capture.
- Public historical screenshots, talks, documentation, or archived pages may be kept
  when they directly support product context or visible behavior.
- Relevant screenshots, exports, presentations, or recordings already present in
  Bernardo's lawful personal archives may be considered after a confidentiality review.

Private Figma history, internal messages, source code, and analytics are intentionally
out of scope because Bernardo no longer has access to Shopify's internal systems. The
unverified adoption metric should not remain an artifact-acquisition task; either omit
the number or retain it only as a clearly attributed recollection.

### File organization

Place approved captures under
`public/projects/shopify-mobile-store-editor/evidence/` with descriptive names such as:

- `sheet-collapsed.png`
- `sheet-partial.png`
- `sheet-full.png`
- `state-transitions.mp4`
- `preview-selection-feedback.mp4`
- `nested-sheet-controls.mp4`

Preserve untouched originals outside the public folder until each file has been checked
for sensitive content and approved for publication.

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
Bernardo remembers that "adoption" referred to the frequency of mobile Store Editor use,
not merely opening the editor or completing a particular editing task. The precise
analytics event, population, and denominator are not yet recovered.

Bernardo recalls the magnitude more accurately as a 10-percentage-point increase (in
the sense of a change such as 20% to 30%) rather than 10% relative growth (which would
mean 20% to 22%). The actual starting and ending values are not remembered; 20% and 30%
were used only to clarify the distinction. Verify the percentage-point interpretation
against an artifact before publication.

The team's product manager communicated the result to Bernardo. Bernardo does not
remember the measurement window and does not currently have the underlying analytics
definition or report. Treat the product manager's communication as the remembered
source, not as independently verified analytics.

No public or private artifact is currently available to verify the metric. The product
manager's statement is the only source Bernardo remembers. Any published use of the
result should explicitly attribute it to the team's reported outcome and retain the
uncertainty around its definition and measurement context.

The measurement period remains unknown. Bernardo also does not remember which other
changes shipped during the same period. Because possible concurrent changes cannot be
enumerated or ruled out, preserve contributory rather than sole-causation language in
the final case study.

No qualitative outcome or follow-up signal is remembered. Do not claim merchant
feedback, fewer complaints, post-launch team feedback, or continued investment as
evidence of success.

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

Resume with the exploration and interaction-decision questions below. Question 1 has
been answered with uncertain confidence; continue with question 2.

1. **Answered, with uncertainty:** Bernardo thinks the initial Figma concept contained
   all three states. The artifact should be checked before presenting this as a
   confirmed historical fact.

2. **Answered:** Bernardo does not remember whether these three alternatives were
   genuinely considered or prototyped:
   - Controls always visible
   - Separate edit and preview screens
   - A three-state bottom sheet

   The current post's claim that they were pressure-tested is therefore unverified.
   Remove that claim and the historical comparison unless an artifact confirms them;
   do not reconstruct the exploration as history.

3. **Answered and confirmed:** These descriptions match Bernardo's recollection:
   - **Collapsed:** maximize the storefront preview while retaining access to editing.
   - **Partially expanded:** expose useful controls while keeping enough of the
     storefront visible to understand the edit.
   - **Fully expanded:** provide space for editing controls that need greater attention.

4. **Answered:** The partially expanded height and other stopping positions were based
   on viewport percentages. Their placement also took the storefront header into
   consideration so the sheet would not cover it. The exact percentages and calculation
   are not yet recovered.

5. **Answered:** Bernardo does not remember a concrete issue discovered during
   physical-device testing. The final case study may say that implementation testing
   occurred on physical devices, but it must not attribute a specific discovery or
   design change to that testing without further evidence.

## Remaining interview areas

The source-material interview, repository inventory, public-source inventory, and
artifact pursuit scope are complete. Phase 1 remains open only until the accessible
browser captures are collected and reviewed or explicitly deferred:

- Engineering implementation details (complete)
- Outcome definition and attribution (complete)
- Reflection and what Bernardo would do differently (complete)
- Publication safety and confidentiality review (complete)
- Inventory available screenshots, videos, prototypes, diagrams, metrics, and public
  sources (repository and web complete; external capture brief prepared)

Artifact inventory is Phase 1, Task 2 and is complete. Inaccessible internal Shopify
artifacts are recorded as evidence limitations rather than remaining collection tasks.
