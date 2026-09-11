const pipelineSteps = [
  ["01", "Build Storybook", "Compile the documented component states."],
  [
    "02",
    "Read index.json",
    "Discover stories without a hand-maintained test list.",
  ],
  [
    "03",
    "Capture renders",
    "Playwright opens each story and takes a screenshot.",
  ],
  ["04", "Compare baseline", "A visual change becomes a reviewable result."],
] as const;

export function VisualRegressionPipelineFigure(): React.ReactNode {
  return (
    <figure className="not-prose my-12 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50">
      <figcaption className="border-b border-neutral-200 bg-white px-5 py-5 sm:px-7">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">
          Conceptual architecture
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-neutral-900">
          A story became a visual check without a separate test inventory
        </h3>
      </figcaption>

      <ol
        className="grid list-none gap-3 p-5 sm:grid-cols-2 sm:p-7 lg:grid-cols-4"
        aria-label="Visual regression pipeline"
      >
        {pipelineSteps.map(([number, title, description], index) => (
          <li
            key={title}
            className="relative rounded-lg border border-neutral-200 bg-white p-4"
          >
            {index < pipelineSteps.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute -right-2 top-1/2 z-10 hidden size-4 -translate-y-1/2 rotate-45 border-r border-t border-neutral-300 bg-neutral-50 lg:block"
              />
            ) : null}
            <p className="font-mono text-xs text-neutral-400">{number}</p>
            <h4 className="mt-5 text-base font-semibold text-neutral-900">
              {title}
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              {description}
            </p>
          </li>
        ))}
      </ol>

      <div className="grid border-t border-neutral-200 bg-neutral-100 sm:grid-cols-[1fr_auto_1fr] sm:items-stretch">
        <div className="p-5 sm:p-6">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">
            No visual difference
          </p>
          <p className="mt-2 text-sm font-medium text-neutral-800">
            Check passes; the pull request can continue.
          </p>
        </div>
        <div
          aria-hidden="true"
          className="hidden w-px bg-neutral-300 sm:block"
        />
        <div className="border-t border-neutral-200 p-5 sm:border-l-0 sm:border-t-0 sm:p-6">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">
            Visual difference found
          </p>
          <p className="mt-2 text-sm font-medium text-neutral-800">
            Surface the diff in review; fix it or approve an intentional
            baseline update.
          </p>
        </div>
      </div>
    </figure>
  );
}

function SampleRender({
  changed = false,
}: Readonly<{ changed?: boolean }>): React.ReactNode {
  return (
    <div className="rounded-md border border-neutral-200 bg-white p-3 shadow-sm">
      <div className="h-2 w-12 rounded-full bg-neutral-200" />
      <div className="mt-4 h-7 rounded-md bg-neutral-100" />
      <div className="mt-3 flex gap-2">
        <span className="h-5 w-10 rounded bg-neutral-200" />
        <span
          className={`h-5 w-14 rounded ${changed ? "bg-amber-300 ring-2 ring-amber-500" : "bg-neutral-200"}`}
        />
      </div>
      <div className="mt-3 h-2 w-4/5 rounded-full bg-neutral-100" />
      <div className="mt-2 h-2 w-3/5 rounded-full bg-neutral-100" />
    </div>
  );
}

export function VisualRegressionReviewFigure(): React.ReactNode {
  return (
    <figure className="not-prose my-12 rounded-xl border border-neutral-200 bg-white p-5 sm:p-7">
      <figcaption className="max-w-2xl">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">
          Conceptual review loop
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-neutral-900">
          Turn a changed pixel into an explicit decision
        </h3>
      </figcaption>

      <div className="mt-7 grid gap-5 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center">
        <div>
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">
            Baseline
          </p>
          <SampleRender />
        </div>
        <p
          aria-hidden="true"
          className="hidden text-center text-2xl text-neutral-400 lg:block"
        >
          →
        </p>
        <div>
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">
            Current render
          </p>
          <SampleRender changed />
        </div>
        <p
          aria-hidden="true"
          className="hidden text-center text-2xl text-neutral-400 lg:block"
        >
          →
        </p>
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-4">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-amber-800">
            Diff in pull request
          </p>
          <p className="mt-3 text-sm font-semibold text-neutral-900">
            Was this change intentional?
          </p>
          <div className="mt-4 grid gap-2 text-sm text-neutral-700">
            <p className="rounded-md border border-neutral-200 bg-white px-3 py-2">
              <span className="font-medium">No:</span> fix the regression.
            </p>
            <p className="rounded-md border border-neutral-200 bg-white px-3 py-2">
              <span className="font-medium">Yes:</span> approve the new
              baseline.
            </p>
          </div>
        </div>
      </div>
    </figure>
  );
}
