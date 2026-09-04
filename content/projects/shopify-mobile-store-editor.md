---
  title: "Preserving Shopify's live Store Editor on mobile"
  date: '2025-11-08T12:00:00.000Z'
  description: >-
    How I turned an early two-state bottom-sheet component into an integrated mobile editing
    experience with three working positions, nested controls, and touch-driven state changes.
  leadSectionBeforeHero: true
  heroVideo:
    src: '/projects/shopify-mobile-store-editor/store-editor-bottom-sheet.mp4'
    poster: '/projects/shopify-mobile-store-editor/store-editor-bottom-sheet-poster.jpg'
    caption: 'A recent capture of the shipped interaction moving between collapsed, partially
    expanded, and fully expanded editing states.'
    ariaLabel: 'Demonstration of the mobile Shopify Store Editor bottom sheet'
---

## At a glance

| | |
|---|---|
| **Role** | Front-end engineer working across interaction design and implementation |
| **Product** | Shopify Online Store Editor |
| **Ownership** | Sole engineer responsible for integrating the bottom sheet into the Store Editor |
| **Starting point** | An early React component with collapsed and fully expanded states |
| **Shipped** | A three-state mobile editing experience connecting controls and the storefront preview |
| **Reported outcome** | Approximately 10 percentage points more frequent mobile use during the broader redesign; reported by the product manager, with the underlying analytics no longer available |

> I took an early two-state bottom-sheet component and turned it into an integrated mobile Store Editor experience.

My contribution centered on three areas:

- Integrating Store Editor navigation and controls into the sheet
- Completing its state model and touch interactions
- Coordinating the sheet with storefront selection and nested settings

## The conflict on a small screen

A merchant editing a homepage section might change its text, replace an image, or
adjust its settings while watching the storefront preview update. On desktop, the
Store Editor could place those controls beside the preview. A narrow mobile viewport
could not preserve the same relationship.

The mobile interface still needed to provide the editing capabilities available on
desktop. It also needed to keep the storefront visible so merchants could see the
effect of a change. Capability parity did not require copying the desktop layout, but
it did require a mobile interaction that protected this feedback loop.

This work became more important as Shopify increased its focus on markets including
Brazil and India, where mobile devices played a significant role in internet access.
The Store Editor team saw an opportunity to make storefront editing more practical in
that context.

## What the mobile experience had to preserve

The implementation had three practical success criteria:

- Retain the editing capabilities available on desktop
- Keep the storefront preview visible enough to understand an edit in context
- Support dragging, scrolling, and control interaction without making their gestures
  compete

These criteria shaped the sheet integration and provided a way to evaluate each
interaction decision without requiring the mobile layout to mirror desktop.

## The component I inherited

The direction did not begin with me. A designer had created early interaction mocks,
and another developer had built a generic bottom-sheet component in React. By the time
I took responsibility for the work, that component had two working positions:
collapsed and fully expanded.

It was not yet an integrated Store Editor experience. The sheet needed to contain the
editor's sections, panels, and controls; support navigation into nested settings; and
respond coherently when a merchant selected something in the storefront preview. Its
upper position could also overlap the storefront's primary header.

I became the sole engineer responsible for that integration. My work included adding
the third working position, adapting editing controls to the mobile context,
implementing nested navigation, preventing header overlap, testing on physical mobile
devices, and adding feedback when the selected storefront element changed.

<!-- case-study-visual:shopify-sheet-states -->

## Engineering movement around clear rules

### Sizing around the storefront

A parent component owned the sheet state and calculated the height available at each
resting position. It passed the resulting content height into the sheet through a CSS
custom property.

The calculation accounted for the storefront header, which occupied 58 pixels. The
sheet's upper boundary stopped below that header instead of covering it. The resting
positions were therefore relative to the usable viewport rather than arbitrary fixed
coordinates.

### Combining velocity with drop zones

The implementation used `dnd-kit` for the draggable sheet, its droppable targets, and
a modifier that restricted movement to the vertical axis. The interaction also needed
behavior that the library did not provide: using drag velocity to influence the final
position.

I added a custom movement calculation so a sufficiently fast upward gesture expanded
the sheet fully and a sufficiently fast downward gesture collapsed it. For slower
gestures, the remaining viewport—after subtracting the 58-pixel header—was divided into
three vertical drop zones. Releasing the handle in a zone selected the corresponding
resting position.

<!-- case-study-visual:shopify-drag-resolution -->

This combined two kinds of intent. Position handled deliberate placement, while
velocity let a quick flick communicate direction without requiring the pointer to
cross an exact threshold.

Tapping the handle provided a second path through the states. From collapsed it opened
the sheet to the intermediate position; from either open position it collapsed the
sheet.

### Separating dragging from scrolling

A sheet full of form controls creates an input conflict: the same vertical gesture
could mean “move the sheet” or “scroll its contents.” I avoided making that decision
dynamically. Dragging could begin only from the sheet's handle, while gestures inside
the content area remained available for scrolling and interacting with controls.

That boundary made the interaction easier to predict and kept the implementation from
depending on the content's current scroll position to infer intent.

### Signaling a changed selection

When the sheet was collapsed, a merchant could select a different editable element
directly in the storefront preview. The sheet remained collapsed, but its contents had
changed outside the merchant's immediate focus.

I added a short bounce to the collapsed sheet to point back to the newly loaded
controls. When the sheet was already open, the controls changed without the bounce or
a state transition because the update was already visible.

### Navigating nested controls

Some settings opened a second sheet above the first. The nested sheet began partially
expanded, placed a backdrop over the original sheet, and could expand fully or close.
Selecting **Done** returned control to the original sheet.

I questioned whether stacking sheets was the clearest model. Replacing the original
sheet's contents and providing a Back or Done action could have expressed navigation
more directly, especially with a transition showing where the merchant had moved. The
team did not have time to redesign and implement that alternative, so we retained the
stacked approach. Similar patterns in products such as Google Maps gave us some
confidence that the interaction would be recognizable, though that comparison was not
a substitute for usability research.

## Validation and reported outcome

The work received feedback from the product team. Throughout implementation, I checked
the experience with a screen reader and tested it on physical mobile devices. I no
longer have records of particular accessibility findings or changes, so I do not claim
specific remediations or conformance. We did not conduct formal merchant research for
this interaction, and I do not present internal feedback or device testing as user
validation.

After the broader mobile redesign shipped, the product manager told the team that the
frequency of mobile Store Editor use had increased by approximately 10 percentage
points. I no longer have the underlying report, metric definition, measurement window,
or baseline, and multiple changes shipped during the same period. I therefore treat
that number as a remembered, team-reported result—not as an independently verified
measurement or an effect attributable to the bottom sheet alone.

The result provides useful context, but the durable evidence of my contribution is the
interaction itself: the component moved from an incomplete container to a mobile editor
that coordinated preview, controls, navigation, scrolling, and touch-driven state
changes.

## What I would change today

I would revisit the stacked nested sheets. I would prototype replacing the original
sheet's content, add a transition that preserves spatial continuity, and compare the
two approaches with merchants before committing to the navigation model.

More broadly, this project changed how I think about adapting desktop products. Mobile
is not simply the same interface at a narrower width. Touch input, limited space, and
the situations in which people use a phone change how capabilities need to be
organized—even when the underlying product remains the same.
