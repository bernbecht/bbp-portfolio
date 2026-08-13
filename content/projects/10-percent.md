---
  title: "Designing and building Shopify's mobile Store Editor bottom sheet"
  date: '2025-11-08T12:00:00.000Z'
  description: >-
    How I preserved live editing on small screens with progressive disclosure—and contributed to a 10%
    increase in mobile Store Editor adoption.
  heroVideo:
    src: '/projects/10-percent/store-editor-bottom-sheet.mp4'
    poster: '/projects/10-percent/store-editor-bottom-sheet-poster.jpg'
    caption: 'The bottom sheet moving between collapsed, partially expanded, and fully expanded editing
    states.'
    ariaLabel: 'Demonstration of the mobile Shopify Store Editor bottom sheet'
---

## At a glance

| | |
|---|---|
| **Role** | Interaction design and front-end implementation |
| **Product** | Shopify Online Store Editor |
| **Contribution** | Designed and built a three-state mobile bottom sheet |
| **Outcome** | Contributed to a 10% increase in mobile adoption |

> **Hardest design decision:** Preserving both the live preview and the full editing controls on a small screen. I resolved it with a three-state bottom sheet that progressively disclosed controls without breaking the editor's feedback loop.

## The product problem

Merchants use Shopify's Store Editor to shape their storefronts, adjusting layouts and content while seeing every change in a live preview. That immediate feedback is the product's central value, but the desktop interface placed a dense set of controls beside the preview. On a phone, both could not comfortably remain visible.

The mobile experience became cramped and made merchants repeatedly lose context as they moved between editing and previewing. My task was to make the editor usable on a small screen without removing important controls or weakening the live feedback loop.

## My role and constraints

I designed the interaction and built its front-end implementation, working with product and design partners to identify the main friction points and validate the direction.

The solution needed to:

- Keep the storefront preview visible while merchants edited it
- Preserve the controls available on desktop
- Work with touch, scrolling, and the browser's own gestures
- Make each interaction state understandable without instructions
- Keep edits and the preview synchronized throughout the transition

## Choosing progressive disclosure

I pressure-tested three approaches before committing to the interaction:

| Approach | Benefit | Why it did or did not work |
|---|---|---|
| Controls always visible | Everything stays immediately available | The interface remained crowded and left too little room for the preview |
| Separate edit and preview screens | Each screen became simpler | Switching screens broke the immediate feedback loop |
| Three-state bottom sheet | Controls remain available while the preview stays in context | Added interaction complexity, but preserved the editor's core value |

I chose the bottom sheet because its complexity served a meaningful purpose: merchants could decide how much space the controls occupied without losing sight of the storefront they were changing.

## What I designed and built

The sheet supports three intentional states:

1. **Collapsed:** the storefront preview is the focus.
2. **Partially expanded:** frequently used controls are within quick reach while enough preview remains visible to understand their effect.
3. **Fully expanded:** the sheet provides room for detailed editing when the controls need full attention.

I used `dnd-kit` for the drag interaction and tuned the thresholds, easing, and snap behavior so the component felt predictable rather than merely animated. Each stopping point needed to communicate what would happen next and avoid leaving the interface in an ambiguous position.

Gesture handling required particular care. Touch input, content scrolling, and browser gestures behave differently across iOS and Android, so I tested the interaction on physical devices as well as emulators. I also coordinated the sheet's animation state with the editor's render cycle so changes remained synchronized with the live preview without visual jumps.

## Validation and outcome

The bottom sheet shipped as part of a broader effort to close the gap between desktop and mobile editing. Mobile adoption of the Store Editor increased by 10% during that redesign period.

Several improvements shipped in the same period, so I describe the bottom sheet as contributing to that increase rather than claiming it as an isolated causal result. The outcome nevertheless supported the core design decision: preserving both context and capability made the editor more useful on mobile.

## What I learned

Screen constraints do not automatically require removing functionality. The more useful question is what the user needs in the current moment and what can remain one clear gesture away.

Progressive disclosure worked here because it protected the product's defining behavior—seeing an edit take effect immediately—while allowing a complex tool to adapt to a much smaller screen.
