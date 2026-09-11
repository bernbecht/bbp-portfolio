# Experiments dot field plan

## Purpose

Replace the Dot field coming-soon card on `/experiments` with a finished, monochrome guided playground. It should teach the core ideas behind the Omarchy hero effect while remaining a polished portfolio study.

The reference effect is a canvas pixel field that combines a grid, drifting noise, ordered dithering, and pointer response. This study will reproduce those underlying techniques, not copy its wordmark, audio response, click stamps, or theme system. The original implementation is available in the [Omarchy hero pixel field source](https://github.com/omacom/omarchy-site/blob/master/src/components/HeroPixelField.tsx).

## Experience

- Keep `/experiments` as a curated portfolio lab, not a general-purpose sandbox.
- Preserve the current page heading and introduction.
- Replace the Dot field placeholder with an interactive dark canvas stage, using neutral dots and the portfolio's existing typography, borders, and spacing.
- Place the finished visual first, followed by compact labelled controls and a concise explanation. Do not publish a large code block.
- Explain the effect in three plain-language layers: the pixel grid, moving field values, and the pointer's circular glow.

## Implementation

- Create a focused client component, `DotFieldExperiment`, and embed it in the existing Server Component page.
- Define a local typed configuration object with `dotSize`, `density`, and `cursorRadius`. Keep all state inside the experiment and add no dependency or public route.
- Render the canvas at its measured size with `ResizeObserver`; cap device pixel ratio at 2 so the cells remain sharp without unnecessary render cost.
- Draw a grid of square cells. Build two deterministic, smoothly sampled noise fields that drift at different speeds, then convert their combined luminance into visible cells with an 8 by 8 Bayer threshold and stable per-cell jitter.
- On fine pointers, brighten cells within a squared radial falloff from the cursor. Keep the drawing local to the canvas rather than installing page-wide pointer listeners.
- Provide labelled native range inputs and a Reset button:

| Control | Range | Default |
| --- | --- | --- |
| Dot size | 4 to 14 px | 8 px |
| Field density | 15% to 55% | 30% |
| Cursor radius | 48 to 224 px | 128 px |

- Use `IntersectionObserver` to stop the animation when the stage is off-screen.
- Respect `prefers-reduced-motion` by rendering a stable, non-animated field. The canvas remains decorative with `aria-hidden`; controls retain visible labels and native keyboard operation.

## Out of scope

- Click ripples, logo stamps, wordmark formation, audio response, and theme switching.
- A separate experiment detail route, code viewer, or new third-party dependency.
- A redesign of the experiments page, Header navigation, sitemap, or existing discovery links.

## Verification checklist

1. Run `npm run lint` and `npm run build`.
2. Confirm the canvas resizes cleanly at mobile and desktop widths, with no blurred or clipped cells.
3. Confirm each control changes only its named property and Reset returns every value to its default.
4. Confirm the cursor glow works with a fine pointer and that the stable fallback is legible with reduced motion.
5. Confirm the animation pauses off-screen and all controls are focusable and clearly labelled.

## Decisions recorded

- Teaching format: guided playground with concise concepts, not a code walkthrough.
- First interaction scope: drifting dithered field and cursor glow only.
- Visual direction: a dark monochrome experiment stage that fits the existing portfolio, rather than a green terminal replica.
