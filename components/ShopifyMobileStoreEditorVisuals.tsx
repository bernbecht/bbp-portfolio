import Image from 'next/image';

const SHEET_STATES = [
  {
    name: 'Collapsed',
    purpose: 'Preview first',
    description:
      'Most of the storefront remains visible while the handle keeps editing within reach.',
    src: '/projects/shopify-mobile-store-editor/evidence/sheet-collapsed.png',
    alt: 'Shopify mobile Store Editor with the editing sheet collapsed at the bottom and most of the storefront preview visible.',
  },
  {
    name: 'Partially expanded',
    purpose: 'Edit in context',
    description:
      'Controls and storefront share the viewport so the merchant can connect an edit to its result.',
    src: '/projects/shopify-mobile-store-editor/evidence/sheet-partial.png',
    alt: 'Shopify mobile Store Editor with the editing sheet partially expanded over the lower half of the storefront preview.',
  },
  {
    name: 'Fully expanded',
    purpose: 'Controls first',
    description:
      'The sheet uses the available height for detailed controls without covering the storefront header.',
    src: '/projects/shopify-mobile-store-editor/evidence/sheet-full.png',
    alt: 'Shopify mobile Store Editor with the editing sheet fully expanded below the storefront header.',
  },
] as const;

const ENDPOINTS = [
  {
    condition: 'Fast upward drag',
    result: 'Fully expanded',
  },
  {
    condition: 'Fast downward drag',
    result: 'Collapsed',
  },
  {
    condition: 'Slower release',
    result: 'State matching its drop zone',
  },
] as const;

export function ShopifyViewportConflictFigure() {
  return (
    <figure className="not-prose my-10 rounded-xl border border-subtle bg-surface p-5 sm:p-6">
      <figcaption className="mb-6 max-w-2xl">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted">
          Conceptual layout comparison
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
          The same workflow had to fit a different geometry
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-secondary">
          Desktop could keep controls and the live preview side by side. On mobile,
          both still mattered, but they competed for one narrow viewport.
        </p>
      </figcaption>

      <div className="grid items-center gap-8 sm:grid-cols-2">
        <div>
          <p className="mb-3 text-center font-mono text-xs font-medium uppercase tracking-wider text-muted">
            Desktop
          </p>
          <div
            className="aspect-[16/10] overflow-hidden rounded-lg border border-subtle bg-background p-2"
            role="img"
            aria-label="Conceptual desktop layout with editing controls and storefront preview visible side by side."
          >
            <div className="flex h-full gap-2">
              <div className="flex w-2/5 items-center justify-center rounded-md bg-subtle px-2 text-center text-sm font-medium text-secondary">
                Editing controls
              </div>
              <div className="flex flex-1 items-center justify-center rounded-md border border-subtle bg-surface px-2 text-center text-sm font-medium text-secondary">
                Live preview
              </div>
            </div>
          </div>
          <p className="mt-3 text-center text-sm font-medium text-secondary">
            Both remain visible
          </p>
        </div>

        <div>
          <p className="mb-3 text-center font-mono text-xs font-medium uppercase tracking-wider text-muted">
            Mobile
          </p>
          <div
            className="mx-auto aspect-[9/14] w-full max-w-40 overflow-hidden rounded-[1.25rem] border-4 border-strong bg-background p-2"
            role="img"
            aria-label="Conceptual mobile layout showing editing controls and storefront preview competing for the same narrow viewport."
          >
            <div className="grid h-full grid-rows-[1fr_auto_1fr]">
              <div className="flex items-center justify-center rounded-t-md border border-subtle bg-surface px-2 text-center text-sm font-medium text-secondary">
                Live preview
              </div>
              <div className="relative z-10 -my-3 flex items-center justify-center">
                <span className="flex size-9 items-center justify-center rounded-full border border-subtle bg-background font-mono text-xs font-semibold uppercase text-muted">
                  or
                </span>
              </div>
              <div className="flex items-center justify-center rounded-b-md bg-subtle px-2 text-center text-sm font-medium text-secondary">
                Editing controls
              </div>
            </div>
          </div>
          <p className="mt-3 text-center text-sm font-medium text-secondary">
            Both still remain required
          </p>
        </div>
      </div>

      <p className="mt-6 border-t border-subtle pt-4 text-xs leading-relaxed text-muted">
        This diagram explains the spatial constraint; it is not a reconstruction
        of the previous mobile interface.
      </p>
    </figure>
  );
}

export function ShopifySheetStatesFigure() {
  return (
    <section
      aria-labelledby="sheet-visual-heading"
      className="not-prose my-14 border-y border-subtle py-10"
    >
      <div className="mb-6 max-w-2xl">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted">
          Interaction model
        </p>
        <h2
          id="sheet-visual-heading"
          className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          Three positions, three purposes
        </h2>
        <p className="mt-3 text-base leading-relaxed text-secondary">
          Each stable position changes the balance between storefront context and
          editing space.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {SHEET_STATES.map((state, index) => (
          <figure key={state.name} className="min-w-0">
            <div className="overflow-hidden rounded-xl border border-subtle bg-surface-hover">
              <Image
                src={state.src}
                alt={state.alt}
                width={756}
                height={1326}
                className="h-auto w-full"
                sizes="(min-width: 640px) 15rem, calc(100vw - 2rem)"
              />
            </div>
            <figcaption className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-xs text-muted">
                  0{index + 1}
                </span>
                <h3 className="text-base font-semibold text-foreground">
                  {state.name}
                </h3>
              </div>
              <p className="mt-1 text-sm font-medium text-secondary">
                {state.purpose}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-secondary">
                {state.description}
              </p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function ShopifyViewportAnatomyFigure() {
  return (
    <figure className="not-prose my-8 rounded-xl border border-subtle bg-surface p-5 sm:p-6">
      <figcaption className="mb-6 max-w-2xl">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted">
          Viewport anatomy
        </p>
        <h4 className="mt-2 text-lg font-semibold tracking-tight text-foreground">
          The header defined the sheet&rsquo;s usable range
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-secondary">
          The storefront header was removed from the available height before the
          remaining viewport was divided into three release zones.
        </p>
      </figcaption>

      <div className="grid items-center gap-8 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div
          className="mx-auto aspect-[9/16] w-full max-w-56 overflow-hidden rounded-[1.5rem] border-4 border-strong bg-background p-2"
          role="img"
          aria-label="Simplified mobile viewport with a reserved 58-pixel storefront header above three release zones. The top zone maps to fully expanded, the middle zone to partially expanded, and the bottom zone to collapsed."
        >
          <div className="grid h-full grid-rows-[auto_1fr] overflow-hidden rounded-xl border border-subtle">
            <div className="flex min-h-16 items-center justify-center border-b-2 border-strong bg-subtle px-3 text-center">
              <div>
                <p className="font-mono text-xs font-semibold text-secondary">
                  58px
                </p>
                <p className="mt-1 text-xs text-secondary">
                  Storefront header
                </p>
              </div>
            </div>

            <div className="grid grid-rows-3">
              <div className="flex items-center justify-between border-b border-dashed border-subtle bg-background px-3">
                <span className="font-mono text-xs text-muted">
                  Top zone
                </span>
                <span className="text-xs font-semibold text-foreground">
                  Full
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-dashed border-subtle bg-surface-hover px-3">
                <span className="font-mono text-xs text-muted">
                  Middle zone
                </span>
                <span className="text-xs font-semibold text-foreground">
                  Partial
                </span>
              </div>
              <div className="flex items-center justify-between bg-subtle px-3">
                <span className="font-mono text-xs text-secondary">
                  Bottom zone
                </span>
                <span className="text-xs font-semibold text-foreground">
                  Collapsed
                </span>
              </div>
            </div>
          </div>
        </div>

        <ol className="m-0 list-none space-y-5 p-0">
          <li className="grid grid-cols-[auto_1fr] gap-3">
            <span className="font-mono text-xs text-muted">01</span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Reserve the header
              </p>
              <p className="mt-1 text-sm leading-relaxed text-secondary">
                The sheet&rsquo;s upper position stopped below the 58-pixel storefront
                header instead of covering it.
              </p>
            </div>
          </li>
          <li className="grid grid-cols-[auto_1fr] gap-3">
            <span className="font-mono text-xs text-muted">02</span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Divide the usable height
              </p>
              <p className="mt-1 text-sm leading-relaxed text-secondary">
                The remaining viewport supplied three positional drop zones.
              </p>
            </div>
          </li>
          <li className="grid grid-cols-[auto_1fr] gap-3">
            <span className="font-mono text-xs text-muted">03</span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Map position to state
              </p>
              <p className="mt-1 text-sm leading-relaxed text-secondary">
                A slower release settled into collapsed, partially expanded, or
                fully expanded according to its zone.
              </p>
            </div>
          </li>
        </ol>
      </div>

      <p className="mt-6 border-t border-subtle pt-4 text-xs leading-relaxed text-muted">
        Simplified explanation, not to scale. The original percentages and exact
        calculations are no longer available.
      </p>
    </figure>
  );
}

export function ShopifyDragResolutionFigure() {
  return (
    <figure className="not-prose my-8 rounded-xl border border-subtle bg-surface p-5 sm:p-6">
      <figcaption className="mb-5">
        <h4 className="text-lg font-semibold text-foreground">
          How a drag resolves
        </h4>
        <p className="mt-1 text-sm leading-relaxed text-secondary">
          Direction takes priority during a fast gesture. Position decides the
          state when the release is slower.
        </p>
      </figcaption>

      <div className="grid items-stretch gap-3 sm:grid-cols-[minmax(0,0.8fr)_auto_minmax(0,2fr)]">
        <div className="flex items-center justify-center rounded-lg border border-subtle bg-background px-4 py-4 text-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-muted">
              Input
            </p>
            <p className="mt-1 font-semibold text-foreground">
              Release the handle
            </p>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="flex items-center justify-center text-xl text-muted max-sm:rotate-90"
        >
          →
        </div>

        <ol className="grid list-none gap-2 p-0 sm:grid-cols-3">
          {ENDPOINTS.map((endpoint) => (
            <li
              key={endpoint.condition}
              className="rounded-lg border border-subtle bg-background px-4 py-3"
            >
              <p className="font-mono text-xs text-muted">
                {endpoint.condition}
              </p>
              <p className="mt-1 text-sm font-semibold leading-snug text-foreground">
                {endpoint.result}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-4 border-t border-subtle pt-4 text-sm leading-relaxed text-secondary">
        Dragging starts only at the handle. Vertical gestures within the sheet
        remain available for scrolling through controls.
      </p>
    </figure>
  );
}

export function ShopifyDragScrollBoundaryFigure() {
  return (
    <figure className="not-prose my-8 rounded-xl border border-subtle bg-surface p-5 sm:p-6">
      <figcaption className="mb-6 max-w-2xl">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted">
          Gesture boundary
        </p>
        <h4 className="mt-2 text-lg font-semibold tracking-tight text-foreground">
          The starting point determined the gesture
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-secondary">
          The interface did not need to infer whether the merchant meant to move
          the sheet or scroll its controls.
        </p>
      </figcaption>

      <div className="grid items-center gap-8 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="relative mx-auto w-full max-w-64 overflow-hidden rounded-xl border border-subtle bg-surface-hover">
          <Image
            src="/projects/shopify-mobile-store-editor/evidence/sheet-partial.png"
            alt="Shopify mobile Store Editor with the sheet partially expanded, showing its drag handle above a scrollable area of editing controls."
            width={756}
            height={1326}
            className="h-auto w-full"
            sizes="16rem"
          />
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-[46%] flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-inverse font-mono text-xs font-semibold text-on-inverse shadow-md"
          >
            1
          </span>
          <span
            aria-hidden="true"
            className="absolute right-[7%] top-[70%] flex size-7 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-inverse font-mono text-xs font-semibold text-on-inverse shadow-md"
          >
            2
          </span>
        </div>

        <ol className="m-0 list-none space-y-6 p-0">
          <li className="grid grid-cols-[auto_1fr] gap-3">
            <span className="flex size-7 items-center justify-center rounded-full bg-inverse font-mono text-xs font-semibold text-on-inverse">
              1
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Start on the handle
              </p>
              <p className="mt-1 text-sm leading-relaxed text-secondary">
                A vertical gesture beginning here dragged the entire sheet between
                positions.
              </p>
            </div>
          </li>
          <li className="grid grid-cols-[auto_1fr] gap-3">
            <span className="flex size-7 items-center justify-center rounded-full bg-inverse font-mono text-xs font-semibold text-on-inverse">
              2
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Start inside the content
              </p>
              <p className="mt-1 text-sm leading-relaxed text-secondary">
                The same vertical gesture scrolled through controls instead of
                moving the sheet.
              </p>
            </div>
          </li>
        </ol>
      </div>

      <p className="mt-6 border-t border-subtle pt-4 text-xs leading-relaxed text-muted">
        Numbered markers identify the two gesture regions in the shipped interface.
      </p>
    </figure>
  );
}

export function ShopifyPreviewSelectionFigure() {
  return (
    <figure className="not-prose my-8 rounded-xl border border-subtle bg-surface p-5 sm:p-6">
      <figcaption className="mb-6 max-w-2xl">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted">
          Selection feedback
        </p>
        <h4 className="mt-2 text-lg font-semibold tracking-tight text-foreground">
          A preview selection redirected attention to its controls
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-secondary">
          Selecting the logo changed the editing context. Motion from the collapsed
          sheet pointed toward the controls that had updated below the viewport.
        </p>
      </figcaption>

      <div className="grid items-center gap-8 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="mx-auto w-full max-w-64 overflow-hidden rounded-[1.5rem] border-4 border-strong bg-inverse shadow-lg">
          <video
            className="aspect-[9/16] w-full bg-inverse object-cover"
            controls
            muted
            playsInline
            preload="metadata"
            poster="/projects/shopify-mobile-store-editor/evidence/sheet-collapsed.png"
            aria-label="Demonstration of selecting the storefront logo and the mobile editing sheet responding with the corresponding controls"
          >
            <source
              src="/projects/shopify-mobile-store-editor/evidence/preview-selection-feedback.mp4"
              type="video/mp4"
            />
            Your browser does not support embedded video.
          </video>
        </div>

        <ol className="m-0 list-none space-y-5 p-0">
          <li className="grid grid-cols-[auto_1fr] gap-3">
            <span className="font-mono text-xs text-muted">01</span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Select in the preview
              </p>
              <p className="mt-1 text-sm leading-relaxed text-secondary">
                The merchant chose the logo directly on the storefront.
              </p>
            </div>
          </li>
          <li className="grid grid-cols-[auto_1fr] gap-3">
            <span className="font-mono text-xs text-muted">02</span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Update the editing context
              </p>
              <p className="mt-1 text-sm leading-relaxed text-secondary">
                The sheet loaded the controls associated with that selection.
              </p>
            </div>
          </li>
          <li className="grid grid-cols-[auto_1fr] gap-3">
            <span className="font-mono text-xs text-muted">03</span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Signal the off-screen change
              </p>
              <p className="mt-1 text-sm leading-relaxed text-secondary">
                The collapsed sheet moved without forcing the editing controls open.
              </p>
            </div>
          </li>
        </ol>
      </div>

      <p className="mt-6 border-t border-subtle pt-4 text-xs leading-relaxed text-muted">
        Recent capture of the shipped interaction. The clip has no audio.
      </p>
    </figure>
  );
}

export function ShopifyNestedControlsFigure() {
  return (
    <figure className="not-prose my-8 rounded-xl border border-subtle bg-surface p-5 sm:p-6">
      <figcaption className="mb-6 max-w-2xl">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted">
          Nested navigation
        </p>
        <h4 className="mt-2 text-lg font-semibold tracking-tight text-foreground">
          A second editing context opened above the first
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-secondary">
          A nested color control opened partially over the parent sheet, expanded
          for focused editing, then returned the merchant to the original controls.
        </p>
      </figcaption>

      <div className="grid items-center gap-8 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="mx-auto w-full max-w-64 overflow-hidden rounded-[1.5rem] border-4 border-strong bg-inverse shadow-lg">
          <video
            className="aspect-[9/16] w-full bg-inverse object-cover"
            controls
            muted
            playsInline
            preload="metadata"
            poster="/projects/shopify-mobile-store-editor/evidence/nested-sheet-interaction-poster.png"
            aria-label="Demonstration of a nested color-control sheet opening partially over its parent, expanding fully, and closing with Done"
          >
            <source
              src="/projects/shopify-mobile-store-editor/evidence/nested-sheet-interaction.mp4"
              type="video/mp4"
            />
            Your browser does not support embedded video.
          </video>
        </div>

        <ol className="m-0 list-none space-y-5 p-0">
          <li className="grid grid-cols-[auto_1fr] gap-3">
            <span className="font-mono text-xs text-muted">01</span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Begin in the original sheet
              </p>
              <p className="mt-1 text-sm leading-relaxed text-secondary">
                The main editing controls remained the parent context.
              </p>
            </div>
          </li>
          <li className="grid grid-cols-[auto_1fr] gap-3">
            <span className="font-mono text-xs text-muted">02</span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Open above the parent
              </p>
              <p className="mt-1 text-sm leading-relaxed text-secondary">
                A second sheet began partially expanded while a backdrop made the
                parent non-interactive.
              </p>
            </div>
          </li>
          <li className="grid grid-cols-[auto_1fr] gap-3">
            <span className="font-mono text-xs text-muted">03</span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Expand, then return
              </p>
              <p className="mt-1 text-sm leading-relaxed text-secondary">
                The nested sheet expanded fully; selecting Done closed it and
                restored interaction with the parent.
              </p>
            </div>
          </li>
        </ol>
      </div>

      <p className="mt-6 border-t border-subtle pt-4 text-xs leading-relaxed text-muted">
        Recent capture of the shipped navigation sequence. The clip has no audio.
      </p>
    </figure>
  );
}
