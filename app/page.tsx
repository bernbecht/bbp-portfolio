import { CompaniesGrid } from "@/components/CompaniesGrid";
import { Hero } from "@/components/Hero";
import HowTechList from "@/components/HowTechList";
import { PersonJsonLd } from "@/components/PersonJsonLd";
import { Section, SectionParagraph } from "@/components/Section";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const PRACTICE_STEPS = [
  [
    "01",
    "Frame the problem",
    "Clarify the workflow, constraints, and tradeoffs before shaping the solution.",
  ],
  [
    "02",
    "Design the behavior",
    "Work through interaction states, gestures, and accessibility alongside the implementation.",
  ],
  [
    "03",
    "Build the system",
    "Build reusable components, document their use, and test their behavior and appearance.",
  ],
] as const;

export default function Home() {
  return (
    <main className="fade-up">
      <PersonJsonLd />
      <div className="content-container">
        <Hero />
      </div>

      <Section id="what" label="/01 · Practice">
        <div className="grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
          <p className="font-serif text-3xl leading-tight tracking-tight md:text-5xl">
            The best interface is only half the job. The other half is making it
            durable.
          </p>
          <div>
            <SectionParagraph>
              I move between product intent, interaction design, and production
              code.
            </SectionParagraph>
          </div>
        </div>

        <ol className="mt-14 border-t border-strong">
          {PRACTICE_STEPS.map(([number, title, copy]) => (
            <li
              key={number}
              className="group grid gap-3 border-b border-strong py-6 sm:grid-cols-[4rem_1fr_1.3fr] sm:items-baseline"
            >
              <span className="font-mono text-xs text-muted">{number}</span>
              <h2 className="text-xl font-semibold tracking-tight transition-transform motion-safe:group-hover:translate-x-1">
                {title}
              </h2>
              <p className="section__paragraph text-secondary">{copy}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="work" label="/02 · Selected work" tone="dark">
        <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <Link
            href="/projects"
            className="w-fit border-b border-current pb-1 type-label transition-opacity hover:opacity-60"
          >
            View all work ↗
          </Link>
        </div>

        <div className="grid border border-inverse-border md:grid-cols-2">
          <Link
            href="/projects/shopify-mobile-store-editor"
            className="group flex min-h-80 flex-col justify-between border-b border-inverse-border p-6 transition-colors hover:bg-background hover:text-foreground md:border-b-0 md:border-r"
          >
            <div className="flex justify-between type-label text-inverse-muted group-hover:text-secondary">
              <span>Shopify · Product + code</span>
              <span>2022–23</span>
            </div>
            <div>
              <p className="mb-4 type-label">Case study 01</p>
              <h2 className="text-3xl leading-tight tracking-tight md:text-4xl">
                Making room for editing and preview
              </h2>
              <p className="section__paragraph mt-4 max-w-md text-inverse-muted group-hover:text-secondary">
                A three-state editing surface that kept editing controls and the
                live preview within reach on small screens.
              </p>
            </div>
            <span className="mt-8 type-meta transition-transform motion-safe:group-hover:translate-x-2">
              Read the story →
            </span>
          </Link>
          <Link
            href="/projects/catching-ui-regressions"
            className="group flex min-h-80 flex-col justify-between p-6 transition-colors hover:bg-background hover:text-foreground"
          >
            <div className="flex justify-between type-label text-inverse-muted group-hover:text-secondary">
              <span>Axonify · Platform systems</span>
              <span>2025</span>
            </div>
            <div>
              <p className="mb-4 type-label">Case study 02</p>
              <h2 className="text-3xl leading-tight tracking-tight md:text-4xl">
                Catching UI regressions before they ship
              </h2>
              <p className="section__paragraph mt-4 max-w-md text-inverse-muted group-hover:text-secondary">
                An in-house visual testing workflow that helped teams catch
                interface changes before shipping.
              </p>
            </div>
            <span className="mt-8 type-meta transition-transform motion-safe:group-hover:translate-x-2">
              Read the story →
            </span>
          </Link>
        </div>
      </Section>

      <Section id="where" label="/03 · Experience">
        <div className="mb-10 grid gap-8 md:grid-cols-2 md:items-end">
          <h2 className="font-serif type-heading">
            Working at the intersection of design and engineering.
          </h2>
          <SectionParagraph>
            I&apos;ve worked across product, design, and engineering, building
            interfaces and foundations used in real production environments.
          </SectionParagraph>
        </div>
        <CompaniesGrid />
      </Section>

      <Section id="how" label="/04 · Toolkit">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          <div>
            <h2 className="font-serif type-heading">
              From components to testing, the tools behind the work.
            </h2>
            <p className="section__paragraph mt-6 type-body text-secondary">
              Tools change. The goal stays the same: reduce uncertainty, make
              behavior explicit, and leave the product easier to evolve.
            </p>
            <Link
              href="/experiments"
              className="mt-8 inline-flex border-b border-current pb-1 type-label transition-opacity hover:opacity-60"
            >
              Explore experiments ↗
            </Link>
          </div>
          <HowTechList className="divide-y divide-subtle border-y border-strong font-mono text-2xl [&>li]:flex [&>li]:items-center [&>li]:justify-between [&>li]:py-3 [&>li]:after:text-xs [&>li]:after:text-inverse-muted [&>li] md:text-3xl" />
        </div>
      </Section>
    </main>
  );
}
