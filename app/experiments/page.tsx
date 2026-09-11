import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experiments",
  description: "Small studies in interaction, motion and interface behavior.",
  alternates: {
    canonical: "/experiments",
  },
};

export default function ExperimentsPage() {
  return (
    <main className="fade-up">
      <div className="content-container">
        <p className="mb-6 type-label text-muted">/ Experiments</p>
        <h1 className="max-w-3xl font-serif type-heading">
          A place to test ideas in public.
        </h1>
        <p className="section__paragraph mt-6 max-w-2xl type-body text-secondary">
          Small, deliberate studies in interaction, motion, and interface
          behavior.
        </p>

        <ul className="mt-14 list-none border-t border-strong p-0">
          <li>
            <article className="grid gap-8 border-b border-strong py-6 sm:grid-cols-[1fr_auto] sm:items-end sm:py-8">
              <div>
                <p className="type-label text-muted">Experiment 01</p>

                <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Dot field
                </h2>

                <p className="section__paragraph mt-4 max-w-xl text-secondary">
                  An Omarchy-inspired dot animation study. Coming soon.
                </p>
              </div>

              <p className="w-fit border border-strong px-3 py-2 type-label">
                In progress
              </p>
            </article>
          </li>
        </ul>
      </div>
    </main>
  );
}
