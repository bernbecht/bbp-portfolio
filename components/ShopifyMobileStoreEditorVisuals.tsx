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

export default function ShopifyMobileStoreEditorVisuals() {
  return (
    <section
      aria-labelledby="sheet-visual-heading"
      className="mb-14 border-y border-neutral-200 py-10"
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

      <figure className="mt-10 rounded-xl border border-neutral-200 bg-neutral-50 p-5 sm:p-6">
        <figcaption className="mb-5">
          <h3 className="text-lg font-semibold text-neutral-900">
            How a drag resolves
          </h3>
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
    </section>
  );
}
