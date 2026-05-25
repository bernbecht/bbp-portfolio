---
title: 'How a bottom sheet lifted mobile adoption by 10% on Shopify Store Editor'
date: '2025-11-08T12:00:00.000Z'
description: >-
  A case study in interaction design: solving screen real estate constraints without sacrificing functionality, in one of Shopify's most-used features.
---

## The context

The Store Editor is one of Shopify's most heavily used features. Merchants use it to manage the look and feel of their storefronts — adjusting layouts, editing content, tweaking components in real time. It's a powerful, controls-dense interface.

Mobile adoption, however, was lower than expected. This was especially visible in markets like Brazil and India, where a large share of merchants run their businesses primarily from mobile devices. These are exactly the markets where friction matters most.

---

## The hypothesis

We had a hunch about what was going wrong. The Store Editor's core value proposition is the live preview — you make a change and see it reflected immediately. But on a small screen, showing both the editing controls and the live preview at the same time is a real estate problem. Something has to give.

The result was an interface that felt cramped and overwhelming on mobile, with too many controls competing for space and users constantly losing context when switching between editing and previewing.

> "Mobile adoption was low because the UI didn't handle limited screen space well. The challenge was improving it without removing key functionality or compromising the editing experience."

---

## Exploring the solution space

Before landing on an approach, we worked with product and design to map out the real friction points and pressure-test alternatives.

**Option 1: Keep controls always visible**
The status quo. Controls stay on screen alongside the preview. The problem: cluttered, overwhelming, and particularly bad on smaller devices. This wasn't a solution — it was the problem.

**Option 2: Separate screens for editing and preview**
Split the experience. Edit in one view, switch to preview in another. This reduced clutter but broke the live feedback loop entirely. Merchants couldn't see the impact of their changes in real time, which undermined the core reason the editor exists.

**Option 3: Progressive disclosure via a bottom sheet**
Surface the live preview as the primary focus and move contextual controls into a bottom sheet — a panel that can be dragged up when needed and collapsed when not. Controls are accessible but don't dominate the screen by default.

The third option preserved what made the editor valuable — the live preview — while addressing the density problem head on.

---

## The implementation

The interaction had to feel native. A bottom sheet that felt janky or imprecise would introduce a different kind of friction, so the implementation details mattered.

We used `dnd-kit` to handle the drag-and-expand behavior, giving us fine-grained control over gesture handling and state transitions. The sheet supports three states: collapsed (preview-first), partially expanded (quick access to controls), and fully expanded (full editing mode).

A few things required particular care:

**Gesture handling on the web** — adding touch gestures to a web-based app means testing across a wide range of devices and browsers. Android and iOS handle touch events differently, and edge cases show up in places you don't expect. We built in a testing pass across real devices, not just emulators.

**State synchronization** — the live preview needed to stay in sync with edits made inside the sheet regardless of its expansion state. Getting that right without introducing lag or visual jumps required careful coordination between the sheet's animation state and the editor's rendering cycle.

**Transition clarity** — every state change needed to feel intentional. We paid close attention to easing curves and transition timing so the sheet's movement communicated its affordances clearly. A smooth gesture that lands in an ambiguous state is worse than no gesture at all.

---

## The tradeoff

Bottom sheets add interaction complexity. There's more surface area for bugs, more device-specific edge cases, and more cognitive load on the implementation side. A simpler layout change would have been easier to build and easier to maintain.

But a simpler layout change would have required removing controls or compromising the live preview. The bottom sheet let us keep both control density and usability — the tradeoff was worth it.

---

## Results

- Mobile adoption of the Store Editor increased by 10%
- Improved usability in mobile-first markets, particularly Brazil and India
- Validated that interaction design investment directly moves product metrics

On attribution: we tracked usage before and after the change and compared engagement on mobile flows. Multiple improvements shipped in the same period, but this interaction change was a key part of the redesign tied to the adoption increase.

---

## What this reinforced

The most useful outcome wasn't the metric — it was the pattern. Constraints on screen real estate are often framed as a reason to remove features. Progressive disclosure is a way to reframe the problem: instead of asking "what do we cut?", you ask "what does the user need right now, and what can wait a gesture away?"

That distinction changes what's possible on mobile considerably.

---

*Part of the Store Editor team's broader effort to close the experience gap between desktop and mobile merchants.*