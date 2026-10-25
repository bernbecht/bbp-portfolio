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
    <figure className="not-prose my-12 overflow-hidden rounded-xl border border-subtle bg-surface">
      <figcaption className="border-b border-subtle bg-background px-5 py-5 sm:px-7">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted">
          Conceptual architecture
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
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
            className="relative rounded-lg border border-subtle bg-background p-4"
          >
            {index < pipelineSteps.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute -right-2 top-1/2 z-10 hidden size-4 -translate-y-1/2 rotate-45 border-r border-t border-subtle bg-surface lg:block"
              />
            ) : null}
            <p className="font-mono text-xs text-muted">{number}</p>
            <h4 className="mt-5 text-base font-semibold text-foreground">
              {title}
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-secondary">
              {description}
            </p>
          </li>
        ))}
      </ol>

      <div className="grid border-t border-subtle bg-surface-hover sm:grid-cols-[1fr_auto_1fr] sm:items-stretch">
        <div className="p-5 sm:p-6">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted">
            No visual difference
          </p>
          <p className="mt-2 text-sm font-medium text-foreground">
            Check passes; the pull request can continue.
          </p>
        </div>
        <div
          aria-hidden="true"
          className="hidden w-px bg-subtle sm:block"
        />
        <div className="border-t border-subtle p-5 sm:border-l-0 sm:border-t-0 sm:p-6">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted">
            Visual difference found
          </p>
          <p className="mt-2 text-sm font-medium text-foreground">
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
    <div className="rounded-md border border-subtle bg-background p-3 shadow-sm">
      <div className="h-2 w-12 rounded-full bg-subtle" />
      <div className="mt-4 h-7 rounded-md bg-surface-hover" />
      <div className="mt-3 flex gap-2">
        <span className="h-5 w-10 rounded bg-subtle" />
        <span
          className={`h-5 w-14 rounded ${changed ? "bg-amber-300 ring-2 ring-amber-500 dark:ring-amber-400" : "bg-subtle"}`}
        />
      </div>
      <div className="mt-3 h-2 w-4/5 rounded-full bg-surface-hover" />
      <div className="mt-2 h-2 w-3/5 rounded-full bg-surface-hover" />
    </div>
  );
}

export function VisualRegressionReviewFigure(): React.ReactNode {
  return (
    <figure className="not-prose my-12 rounded-xl border border-subtle bg-background p-5 sm:p-7">
      <figcaption className="max-w-2xl">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted">
          Conceptual review loop
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">
          Turn a changed pixel into an explicit decision
        </h3>
      </figcaption>

      <div className="mt-7 grid gap-5 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center">
        <div>
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted">
            Baseline
          </p>
          <SampleRender />
        </div>
        <p
          aria-hidden="true"
          className="hidden text-center text-2xl text-muted lg:block"
        >
          →
        </p>
        <div>
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted">
            Current render
          </p>
          <SampleRender changed />
        </div>
        <p
          aria-hidden="true"
          className="hidden text-center text-2xl text-muted lg:block"
        >
          →
        </p>
        <div className="rounded-lg border border-amber-300 dark:border-amber-600 bg-amber-50 dark:bg-amber-950 p-4">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-amber-800 dark:text-amber-200">
            Diff in pull request
          </p>
          <p className="mt-3 text-sm font-semibold text-foreground">
            Was this change intentional?
          </p>
          <div className="mt-4 grid gap-2 text-sm text-secondary">
            <p className="rounded-md border border-subtle bg-background px-3 py-2">
              <span className="font-medium">No:</span> fix the regression.
            </p>
            <p className="rounded-md border border-subtle bg-background px-3 py-2">
              <span className="font-medium">Yes:</span> approve the new
              baseline.
            </p>
          </div>
        </div>
      </div>
    </figure>
  );
}
