# Design tokens

Implemented 2026-09-08. The redesign plan authorizes the 64rem frame, 42rem
reading measure, monochrome palette, and responsive portrait treatment.

## Three layers

**Foundations** are raw materials. `--neutral-0` through `--neutral-950` are
palette values, not instructions to make a particular element gray.

**Semantic tokens** describe responsibilities. `--text-secondary` means supporting
text; `--border-subtle` means a quiet divider. Multiple components can use them
without knowing which palette value they reference. Tailwind's `@theme inline`
exposes these as `text-secondary`, `border-subtle`, and similar utilities.

**Local values** describe one composition. The portrait lens radius, dot spacing,
image crop, button displacement, and case-study phone dimensions remain local.
Promote a value only when it represents a shared decision, not merely because the
same number appears twice.

## Inventory and decisions

| Original pattern | Shared responsibility | Consumers |
| --- | --- | --- |
| White/black backgrounds and text | background, foreground, inverse, on-inverse | Header, hero, work cards, footer |
| Neutral 500–700 supporting copy | secondary, muted | Hero, project rows, breadcrumbs |
| Neutral 200–300 and black borders | subtle, strong | Hero frame, lists, article media |
| Dark section dividers and gray copy | inverse-border, inverse-muted | Work cards, footer |
| Black/white focus rings | focus, scoped on inverse surfaces | Links, buttons, portrait |
| Green availability markers | availability, availability-inverse | Hero and footer; factual status still awaits copy review |
| 72rem container and px-4 | 64rem frame, responsive page-gutter | All shared routes |
| Repeated py-20/py-28 | section-space | Homepage sections, footer, hero separation |
| Large headings, serif introductions | display, heading, body | Hero, homepage headings, supporting paragraphs |
| Small mono captions | label, meta | Section labels, portrait control, dates |
| 100–700ms transitions | motion-fast, motion-standard, motion-enter, ease-standard | Press feedback, transitions, entry animation |

Semantic colors live in `app/globals.css`. `surface` is a quiet background;
`surface-hover` is a highlighted surface. `secondary` is supporting prose and
`muted` is metadata. They currently share a legible gray but may evolve separately.
Inverse tokens explicitly support white-on-dark sections. Focus changes to white
inside inverse surfaces. Availability colors are decorative, accompanied by text.

## Layout and typography

The shared frame includes its padding and caps at 64rem. Gutters are 1rem below
640px, 1.5rem from 640px, and 2rem from 900px. Sections use 4rem, 5rem, and 6rem
respectively. Section labels stay inside the frame so intermediate desktop widths
cannot overflow a fixed grid column. The portrait is hidden below 900px.

`type-display`, `type-heading`, `type-body`, `type-label`, and `type-meta` are roles.
Display and heading sizes scale with the viewport. Paragraphs and direct article
text blocks cap at 42rem; figures, tables, and bespoke demonstrations may use the
full frame. The article's prose colors map to the same semantic palette.

## Try it

1. Set `--content-container-max-width` to `60rem`. Compare the header, hero, project
   index, and footer at a wide viewport. They should narrow together. Restore 64rem.
2. Change `--border-subtle` to a darker foundation. Compare project separators,
   article media, and company dividers without editing JSX. Restore the original.
3. Set `--motion-standard` to `400ms`. Compare card hover and portrait reveal.
   Enable reduced motion: transitions disappear and portrait color changes only
   through the toggle. Restore 240ms.

Do not make diagram-specific colors or geometry depend on these exercises. Those
values communicate the case study and belong with the diagram. No runtime library
was added for tokens or the portrait interaction.
