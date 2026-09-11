"use client";

import { useState } from "react";

type Change = "icon" | "color" | "padding" | "radius";

const changes: readonly Change[] = ["icon", "color", "padding", "radius"];

const changeLabels: Readonly<Record<Change, string>> = {
  icon: "Remove icon",
  color: "Change color",
  padding: "Reduce padding",
  radius: "Reduce radius",
};

function SaveButton({
  activeChanges,
  baseline = false,
}: Readonly<{
  activeChanges: readonly Change[];
  baseline?: boolean;
}>): React.ReactNode {
  const hasChange = (change: Change): boolean => activeChanges.includes(change);
  const showIcon = baseline || !hasChange("icon");
  const changedColor = !baseline && hasChange("color");
  const compact = !baseline && hasChange("padding");
  const sharp = !baseline && hasChange("radius");

  return (
    <button
      type="button"
      tabIndex={-1}
      aria-hidden="true"
      className={`flex w-full items-center justify-center gap-2 bg-blue-600 font-semibold text-white shadow-sm ${changedColor ? "bg-violet-600" : "bg-blue-600"} ${compact ? "px-4 py-2.5" : "px-6 py-4"} ${sharp ? "rounded-md" : "rounded-xl"}`}
    >
      {showIcon ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="size-5"
        >
          <path d="M5 4h11l3 3v13H5z" />
          <path d="M8 4v6h7V4M8 20v-6h8v6" />
        </svg>
      ) : null}
      Save changes
    </button>
  );
}

function RenderCard({
  title,
  subtitle,
  children,
}: Readonly<{
  title: string;
  subtitle: string;
  children: React.ReactNode;
}>): React.ReactNode {
  return (
    <section className="rounded-lg border border-neutral-200 bg-white p-4 sm:p-5">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">
        {title}
      </p>
      <p className="mt-1 text-sm text-neutral-600">{subtitle}</p>
      <div className="mt-5 rounded-md border border-neutral-200 bg-neutral-50 p-5 sm:p-7">
        {children}
      </div>
    </section>
  );
}

export default function VisualRegressionExplainer(): React.ReactNode {
  const [activeChanges, setActiveChanges] = useState<Change[]>(["icon"]);
  const [showDiff, setShowDiff] = useState(true);
  const hasChanges = activeChanges.length > 0;

  function toggleChange(change: Change): void {
    setActiveChanges((current) =>
      current.includes(change)
        ? current.filter((item) => item !== change)
        : [...current, change],
    );
  }

  return (
    <figure className="hidden md:block not-prose my-12 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50">
      <figcaption className="border-b border-neutral-200 bg-white px-5 py-5 sm:px-7">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">
          Interactive example
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight text-neutral-900">
          Make a change, then inspect the visual diff
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
          Toggle an implementation change to see how a baseline and a
          pull-request render diverge.
        </p>
      </figcaption>

      <div className="p-5 sm:p-7">
        <fieldset>
          <legend className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">
            Simulate a component change
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {changes.map((change) => {
              const selected = activeChanges.includes(change);
              return (
                <button
                  key={change}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => toggleChange(change)}
                  className={`rounded-md border px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 ${selected ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-100"}`}
                >
                  {changeLabels[change]}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <RenderCard title="Baseline" subtitle="Approved screenshot">
            <SaveButton activeChanges={[]} baseline />
          </RenderCard>
          <RenderCard title="Current" subtitle="Screenshot from pull request">
            <SaveButton activeChanges={activeChanges} />
          </RenderCard>
          <RenderCard
            title="Visual diff"
            subtitle="Changed areas are highlighted"
          >
            <div className="relative">
              <SaveButton activeChanges={[]} baseline />
              {showDiff && hasChanges ? (
                <>
                  <div className="pointer-events-none absolute inset-0 rounded-xl bg-rose-400/35 mix-blend-multiply" />
                  {activeChanges.includes("icon") ? (
                    <span className="pointer-events-none absolute left-[20%] top-1/2 size-9 -translate-y-1/2 rounded border-2 border-rose-600 bg-rose-300/60" />
                  ) : null}
                  {activeChanges.includes("color") ? (
                    <span className="pointer-events-none absolute inset-0 rounded-xl border-2 border-violet-700 bg-violet-400/25" />
                  ) : null}
                  {activeChanges.includes("padding") ? (
                    <span className="pointer-events-none absolute inset-x-[12%] bottom-0 h-3 border-x-2 border-b-2 border-rose-600 bg-rose-300/50" />
                  ) : null}
                  {activeChanges.includes("radius") ? (
                    <span className="pointer-events-none absolute inset-0 rounded-xl border-2 border-rose-600" />
                  ) : null}
                </>
              ) : null}
            </div>
            <button
              type="button"
              aria-pressed={showDiff}
              onClick={() => setShowDiff((current) => !current)}
              className="mt-4 text-sm font-medium text-neutral-800 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
            >
              {showDiff ? "Hide diff overlay" : "Show diff overlay"}
            </button>
          </RenderCard>
        </div>

        <div
          className={`mt-5 rounded-lg border p-4 sm:flex sm:items-center sm:justify-between sm:gap-6 ${hasChanges ? "border-amber-300 bg-amber-50" : "border-emerald-300 bg-emerald-50"}`}
          aria-live="polite"
        >
          <div>
            <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-neutral-600">
              {hasChanges
                ? "Visual difference detected"
                : "No visual difference"}
            </p>
            <p className="mt-1 text-sm font-medium text-neutral-900">
              {hasChanges
                ? "Review the change before the pull request merges."
                : "The current render matches the approved baseline."}
            </p>
          </div>
          {hasChanges ? (
            <div className="mt-3 flex flex-wrap gap-2 sm:mt-0">
              <span className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-800">
                Regression: fix it
              </span>
              <span className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-800">
                Intentional: approve baseline
              </span>
            </div>
          ) : null}
        </div>
      </div>
    </figure>
  );
}
