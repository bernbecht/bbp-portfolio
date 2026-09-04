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
    <figure className="not-prose my-10 rounded-xl border border-neutral-200 bg-neutral-50 p-5 sm:p-6">
      <figcaption className="mb-6 max-w-2xl">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">
          Conceptual layout comparison
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-neutral-900">
          The same workflow had to fit a different geometry
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
          Desktop could keep controls and the live preview side by side. On mobile,
          both still mattered, but they competed for one narrow viewport.
        </p>
      </figcaption>

      <div className="grid items-center gap-8 sm:grid-cols-2">
        <div>
          <p className="mb-3 text-center font-mono text-xs font-medium uppercase tracking-wider text-neutral-500">
            Desktop
          </p>
          <div
            className="aspect-[16/10] overflow-hidden rounded-lg border border-neutral-300 bg-white p-2"
            role="img"
            aria-label="Conceptual desktop layout with editing controls and storefront preview visible side by side."
          >
            <div className="flex h-full gap-2">
              <div className="flex w-2/5 items-center justify-center rounded-md bg-neutral-200 px-2 text-center text-sm font-medium text-neutral-700">
                Editing controls
              </div>
              <div className="flex flex-1 items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 px-2 text-center text-sm font-medium text-neutral-700">
                Live preview
              </div>
            </div>
          </div>
          <p className="mt-3 text-center text-sm font-medium text-neutral-700">
            Both remain visible
          </p>
        </div>

        <div>
          <p className="mb-3 text-center font-mono text-xs font-medium uppercase tracking-wider text-neutral-500">
            Mobile
          </p>
          <div
            className="mx-auto aspect-[9/14] w-full max-w-40 overflow-hidden rounded-[1.25rem] border-4 border-neutral-800 bg-white p-2"
            role="img"
            aria-label="Conceptual mobile layout showing editing controls and storefront preview competing for the same narrow viewport."
          >
            <div className="grid h-full grid-rows-[1fr_auto_1fr]">
              <div className="flex items-center justify-center rounded-t-md border border-neutral-200 bg-neutral-50 px-2 text-center text-sm font-medium text-neutral-700">
                Live preview
              </div>
              <div className="relative z-10 -my-3 flex items-center justify-center">
                <span className="flex size-9 items-center justify-center rounded-full border border-neutral-300 bg-white font-mono text-xs font-semibold uppercase text-neutral-500">
                  or
                </span>
              </div>
              <div className="flex items-center justify-center rounded-b-md bg-neutral-200 px-2 text-center text-sm font-medium text-neutral-700">
                Editing controls
              </div>
            </div>
          </div>
          <p className="mt-3 text-center text-sm font-medium text-neutral-700">
            Both still remain required
          </p>
        </div>
      </div>

      <p className="mt-6 border-t border-neutral-200 pt-4 text-xs leading-relaxed text-neutral-500">
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
      className="not-prose my-14 border-y border-neutral-200 py-10"
    >
      <div className="mb-6 max-w-2xl">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">
          Interaction model
        </p>
        <h2
          id="sheet-visual-heading"
          className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl"
        >
          Three positions, three purposes
        </h2>
        <p className="mt-3 text-base leading-relaxed text-neutral-600">
          Each stable position changes the balance between storefront context and
          editing space.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {SHEET_STATES.map((state, index) => (
          <figure key={state.name} className="min-w-0">
            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">
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
                <span className="font-mono text-xs text-neutral-400">
                  0{index + 1}
                </span>
                <h3 className="text-base font-semibold text-neutral-900">
                  {state.name}
                </h3>
              </div>
              <p className="mt-1 text-sm font-medium text-neutral-700">
                {state.purpose}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-neutral-600">
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
    <figure className="not-prose my-8 rounded-xl border border-neutral-200 bg-neutral-50 p-5 sm:p-6">
      <figcaption className="mb-6 max-w-2xl">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">
          Viewport anatomy
        </p>
        <h4 className="mt-2 text-lg font-semibold tracking-tight text-neutral-900">
          The header defined the sheet&rsquo;s usable range
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
          The storefront header was removed from the available height before the
          remaining viewport was divided into three release zones.
        </p>
      </figcaption>

      <div className="grid items-center gap-8 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div
          className="mx-auto aspect-[9/16] w-full max-w-56 overflow-hidden rounded-[1.5rem] border-4 border-neutral-800 bg-white p-2"
          role="img"
          aria-label="Simplified mobile viewport with a reserved 58-pixel storefront header above three release zones. The top zone maps to fully expanded, the middle zone to partially expanded, and the bottom zone to collapsed."
        >
          <div className="grid h-full grid-rows-[auto_1fr] overflow-hidden rounded-xl border border-neutral-200">
            <div className="flex min-h-16 items-center justify-center border-b-2 border-neutral-500 bg-neutral-200 px-3 text-center">
              <div>
                <p className="font-mono text-xs font-semibold text-neutral-700">
                  58px
                </p>
                <p className="mt-1 text-xs text-neutral-600">
                  Storefront header
                </p>
              </div>
            </div>

            <div className="grid grid-rows-3">
              <div className="flex items-center justify-between border-b border-dashed border-neutral-300 bg-white px-3">
                <span className="font-mono text-xs text-neutral-500">
                  Top zone
                </span>
                <span className="text-xs font-semibold text-neutral-800">
                  Full
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-dashed border-neutral-300 bg-neutral-100 px-3">
                <span className="font-mono text-xs text-neutral-500">
                  Middle zone
                </span>
                <span className="text-xs font-semibold text-neutral-800">
                  Partial
                </span>
              </div>
              <div className="flex items-center justify-between bg-neutral-200 px-3">
                <span className="font-mono text-xs text-neutral-600">
                  Bottom zone
                </span>
                <span className="text-xs font-semibold text-neutral-800">
                  Collapsed
                </span>
              </div>
            </div>
          </div>
        </div>

        <ol className="m-0 list-none space-y-5 p-0">
          <li className="grid grid-cols-[auto_1fr] gap-3">
            <span className="font-mono text-xs text-neutral-400">01</span>
            <div>
              <p className="text-sm font-semibold text-neutral-900">
                Reserve the header
              </p>
              <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                The sheet&rsquo;s upper position stopped below the 58-pixel storefront
                header instead of covering it.
              </p>
            </div>
          </li>
          <li className="grid grid-cols-[auto_1fr] gap-3">
            <span className="font-mono text-xs text-neutral-400">02</span>
            <div>
              <p className="text-sm font-semibold text-neutral-900">
                Divide the usable height
              </p>
              <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                The remaining viewport supplied three positional drop zones.
              </p>
            </div>
          </li>
          <li className="grid grid-cols-[auto_1fr] gap-3">
            <span className="font-mono text-xs text-neutral-400">03</span>
            <div>
              <p className="text-sm font-semibold text-neutral-900">
                Map position to state
              </p>
              <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                A slower release settled into collapsed, partially expanded, or
                fully expanded according to its zone.
              </p>
            </div>
          </li>
        </ol>
      </div>

      <p className="mt-6 border-t border-neutral-200 pt-4 text-xs leading-relaxed text-neutral-500">
        Simplified explanation, not to scale. The original percentages and exact
        calculations are no longer available.
      </p>
    </figure>
  );
}

export function ShopifyDragResolutionFigure() {
  return (
    <figure className="not-prose my-8 rounded-xl border border-neutral-200 bg-neutral-50 p-5 sm:p-6">
      <figcaption className="mb-5">
        <h4 className="text-lg font-semibold text-neutral-900">
          How a drag resolves
        </h4>
        <p className="mt-1 text-sm leading-relaxed text-neutral-600">
          Direction takes priority during a fast gesture. Position decides the
          state when the release is slower.
        </p>
      </figcaption>

      <div className="grid items-stretch gap-3 sm:grid-cols-[minmax(0,0.8fr)_auto_minmax(0,2fr)]">
        <div className="flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 py-4 text-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-neutral-500">
              Input
            </p>
            <p className="mt-1 font-semibold text-neutral-900">
              Release the handle
            </p>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="flex items-center justify-center text-xl text-neutral-400 max-sm:rotate-90"
        >
          →
        </div>

        <ol className="grid list-none gap-2 p-0 sm:grid-cols-3">
          {ENDPOINTS.map((endpoint) => (
            <li
              key={endpoint.condition}
              className="rounded-lg border border-neutral-200 bg-white px-4 py-3"
            >
              <p className="font-mono text-xs text-neutral-500">
                {endpoint.condition}
              </p>
              <p className="mt-1 text-sm font-semibold leading-snug text-neutral-900">
                {endpoint.result}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-4 border-t border-neutral-200 pt-4 text-sm leading-relaxed text-neutral-600">
        Dragging starts only at the handle. Vertical gestures within the sheet
        remain available for scrolling through controls.
      </p>
    </figure>
  );
}

export function ShopifyDragScrollBoundaryFigure() {
  return (
    <figure className="not-prose my-8 rounded-xl border border-neutral-200 bg-neutral-50 p-5 sm:p-6">
      <figcaption className="mb-6 max-w-2xl">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">
          Gesture boundary
        </p>
        <h4 className="mt-2 text-lg font-semibold tracking-tight text-neutral-900">
          The starting point determined the gesture
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
          The interface did not need to infer whether the merchant meant to move
          the sheet or scroll its controls.
        </p>
      </figcaption>

      <div className="grid items-center gap-8 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="relative mx-auto w-full max-w-64 overflow-hidden rounded-xl border border-neutral-300 bg-neutral-100">
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
            className="absolute left-1/2 top-[46%] flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-neutral-900 font-mono text-xs font-semibold text-white shadow-md"
          >
            1
          </span>
          <span
            aria-hidden="true"
            className="absolute right-[7%] top-[70%] flex size-7 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-neutral-900 font-mono text-xs font-semibold text-white shadow-md"
          >
            2
          </span>
        </div>

        <ol className="m-0 list-none space-y-6 p-0">
          <li className="grid grid-cols-[auto_1fr] gap-3">
            <span className="flex size-7 items-center justify-center rounded-full bg-neutral-900 font-mono text-xs font-semibold text-white">
              1
            </span>
            <div>
              <p className="text-sm font-semibold text-neutral-900">
                Start on the handle
              </p>
              <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                A vertical gesture beginning here dragged the entire sheet between
                positions.
              </p>
            </div>
          </li>
          <li className="grid grid-cols-[auto_1fr] gap-3">
            <span className="flex size-7 items-center justify-center rounded-full bg-neutral-900 font-mono text-xs font-semibold text-white">
              2
            </span>
            <div>
              <p className="text-sm font-semibold text-neutral-900">
                Start inside the content
              </p>
              <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                The same vertical gesture scrolled through controls instead of
                moving the sheet.
              </p>
            </div>
          </li>
        </ol>
      </div>

      <p className="mt-6 border-t border-neutral-200 pt-4 text-xs leading-relaxed text-neutral-500">
        Numbered markers identify the two gesture regions in the shipped interface.
      </p>
    </figure>
  );
}

export function ShopifyPreviewSelectionFigure() {
  return (
    <figure className="not-prose my-8 rounded-xl border border-neutral-200 bg-neutral-50 p-5 sm:p-6">
      <figcaption className="mb-6 max-w-2xl">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">
          Selection feedback
        </p>
        <h4 className="mt-2 text-lg font-semibold tracking-tight text-neutral-900">
          A preview selection redirected attention to its controls
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
          Selecting the logo changed the editing context. Motion from the collapsed
          sheet pointed toward the controls that had updated below the viewport.
        </p>
      </figcaption>

      <div className="grid items-center gap-8 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="mx-auto w-full max-w-64 overflow-hidden rounded-[1.5rem] border-4 border-neutral-800 bg-neutral-900 shadow-lg">
          <video
            className="aspect-[9/16] w-full bg-neutral-950 object-cover"
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
            <span className="font-mono text-xs text-neutral-400">01</span>
            <div>
              <p className="text-sm font-semibold text-neutral-900">
                Select in the preview
              </p>
              <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                The merchant chose the logo directly on the storefront.
              </p>
            </div>
          </li>
          <li className="grid grid-cols-[auto_1fr] gap-3">
            <span className="font-mono text-xs text-neutral-400">02</span>
            <div>
              <p className="text-sm font-semibold text-neutral-900">
                Update the editing context
              </p>
              <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                The sheet loaded the controls associated with that selection.
              </p>
            </div>
          </li>
          <li className="grid grid-cols-[auto_1fr] gap-3">
            <span className="font-mono text-xs text-neutral-400">03</span>
            <div>
              <p className="text-sm font-semibold text-neutral-900">
                Signal the off-screen change
              </p>
              <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                The collapsed sheet moved without forcing the editing controls open.
              </p>
            </div>
          </li>
        </ol>
      </div>

      <p className="mt-6 border-t border-neutral-200 pt-4 text-xs leading-relaxed text-neutral-500">
        Recent capture of the shipped interaction. The clip has no audio.
      </p>
    </figure>
  );
}

export function ShopifyNestedControlsFigure() {
  return (
    <figure className="not-prose my-8 rounded-xl border border-neutral-200 bg-neutral-50 p-5 sm:p-6">
      <figcaption className="mb-6 max-w-2xl">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">
          Nested navigation
        </p>
        <h4 className="mt-2 text-lg font-semibold tracking-tight text-neutral-900">
          A second editing context opened above the first
        </h4>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
          A nested color control opened partially over the parent sheet, expanded
          for focused editing, then returned the merchant to the original controls.
        </p>
      </figcaption>

      <div className="grid items-center gap-8 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="mx-auto w-full max-w-64 overflow-hidden rounded-[1.5rem] border-4 border-neutral-800 bg-neutral-900 shadow-lg">
          <video
            className="aspect-[9/16] w-full bg-neutral-950 object-cover"
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
            <span className="font-mono text-xs text-neutral-400">01</span>
            <div>
              <p className="text-sm font-semibold text-neutral-900">
                Begin in the original sheet
              </p>
              <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                The main editing controls remained the parent context.
              </p>
            </div>
          </li>
          <li className="grid grid-cols-[auto_1fr] gap-3">
            <span className="font-mono text-xs text-neutral-400">02</span>
            <div>
              <p className="text-sm font-semibold text-neutral-900">
                Open above the parent
              </p>
              <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                A second sheet began partially expanded while a backdrop made the
                parent non-interactive.
              </p>
            </div>
          </li>
          <li className="grid grid-cols-[auto_1fr] gap-3">
            <span className="font-mono text-xs text-neutral-400">03</span>
            <div>
              <p className="text-sm font-semibold text-neutral-900">
                Expand, then return
              </p>
              <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                The nested sheet expanded fully; selecting Done closed it and
                restored interaction with the parent.
              </p>
            </div>
          </li>
        </ol>
      </div>

      <p className="mt-6 border-t border-neutral-200 pt-4 text-xs leading-relaxed text-neutral-500">
        Recent capture of the shipped navigation sequence. The clip has no audio.
      </p>
    </figure>
  );
}
