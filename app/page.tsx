import { CompaniesGrid } from '@/components/CompaniesGrid';
import { Hero } from '@/components/Hero';
import HowTechList from '@/components/HowTechList';
import { PersonJsonLd } from '@/components/PersonJsonLd';
import { Section, SectionParagraph } from '@/components/Section';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: { url: '/' },
};

const PRACTICE_STEPS = [
  ['01', 'Frame the problem', 'Find the real friction before polishing the visible symptoms.'],
  ['02', 'Design the behavior', 'Make workflows, states, and accessibility part of the architecture.'],
  ['03', 'Build the system', 'Ship resilient React interfaces that teams can confidently extend.'],
] as const;

export default function Home() {
  return (
    <div className="fade-up">
      <PersonJsonLd />
      <div className="content-container"><Hero /></div>

      <Section id="what" label="/01 — Practice">
        <div className="grid gap-10 md:grid-cols-[1.15fr_0.85fr] md:gap-16">
          <p className="font-serif text-3xl leading-tight tracking-tight md:text-5xl">
            The best interface is only half the job. The other half is making it durable.
          </p>
          <div>
            <SectionParagraph>
              I move between product intent, interaction design, and production
              code—closing the gaps where good ideas usually lose their shape.
            </SectionParagraph>
            <p className="font-mono text-xs uppercase tracking-wider text-neutral-500">
              Currently focused on complex, high-stakes product environments.
            </p>
          </div>
        </div>

        <ol className="mt-14 border-t border-black">
          {PRACTICE_STEPS.map(([number, title, copy]) => (
            <li key={number} className="group grid gap-3 border-b border-black py-6 sm:grid-cols-[4rem_1fr_1.3fr] sm:items-baseline">
              <span className="font-mono text-xs text-neutral-500">{number}</span>
              <h2 className="text-xl font-semibold tracking-tight transition-transform motion-safe:group-hover:translate-x-1">{title}</h2>
              <p className="section__paragraph text-neutral-600">{copy}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="work" label="/02 — Selected work" tone="dark">
        <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <h2 className="max-w-2xl font-serif text-4xl leading-tight tracking-tight md:text-6xl">Systems built for real-world pressure.</h2>
          <Link href="/projects" className="w-fit border-b border-current pb-1 font-mono text-xs uppercase tracking-wider transition-opacity hover:opacity-60">View all work ↗</Link>
        </div>

        <div className="grid border border-neutral-700 md:grid-cols-2">
          <Link href="/projects/shopify-mobile-store-editor" className="group flex min-h-80 flex-col justify-between border-b border-neutral-700 p-6 transition-colors hover:bg-white hover:text-black md:border-b-0 md:border-r">
            <div className="flex justify-between font-mono text-xs uppercase tracking-wider text-neutral-400 group-hover:text-neutral-600"><span>Shopify · Product + code</span><span>2022–23</span></div>
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-wider">Case study 01</p>
              <h3 className="text-3xl leading-tight tracking-tight md:text-4xl">Designing the mobile Store Editor bottom sheet</h3>
              <p className="section__paragraph mt-4 max-w-md text-neutral-400 group-hover:text-neutral-700">A three-state editing surface that helped increase mobile adoption by 10%.</p>
            </div>
            <span className="mt-8 font-mono text-sm transition-transform motion-safe:group-hover:translate-x-2">Read the story →</span>
          </Link>
          <Link href="/projects/how-stopped-visual-regressions" className="group flex min-h-80 flex-col justify-between p-6 transition-colors hover:bg-white hover:text-black">
            <div className="flex justify-between font-mono text-xs uppercase tracking-wider text-neutral-400 group-hover:text-neutral-600"><span>Axonify · Platform systems</span><span>2025</span></div>
            <div>
              <p className="mb-4 font-mono text-xs uppercase tracking-wider">Case study 02</p>
              <h3 className="text-3xl leading-tight tracking-tight md:text-4xl">Stopping visual regressions before they shipped</h3>
              <p className="section__paragraph mt-4 max-w-md text-neutral-400 group-hover:text-neutral-700">An in-house confidence layer that saved about $10k/year and made refactoring safer.</p>
            </div>
            <span className="mt-8 font-mono text-sm transition-transform motion-safe:group-hover:translate-x-2">Read the story →</span>
          </Link>
        </div>
      </Section>

      <Section id="where" label="/03 — Experience">
        <div className="mb-10 grid gap-8 md:grid-cols-2 md:items-end">
          <h2 className="font-serif text-4xl leading-tight tracking-tight md:text-5xl">From global platforms to growing product teams.</h2>
          <SectionParagraph>I&apos;ve worked across product, design, and engineering, building interfaces and foundations used in real production environments.</SectionParagraph>
        </div>
        <CompaniesGrid />
      </Section>

      <Section id="how" label="/04 — Toolkit">
        <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          <div>
            <h2 className="font-serif text-4xl leading-tight tracking-tight md:text-5xl">Design judgment, engineering depth.</h2>
            <p className="section__paragraph mt-6 text-lg leading-relaxed text-neutral-600">Tools change. The goal stays the same: reduce uncertainty, make behavior explicit, and leave the product easier to evolve.</p>
          </div>
          <HowTechList className="divide-y divide-neutral-300 border-y border-black font-mono text-2xl [&>li]:flex [&>li]:items-center [&>li]:justify-between [&>li]:py-3 [&>li]:after:text-xs [&>li]:after:text-neutral-400 [&>li]:after:content-['↗'] md:text-3xl" />
        </div>
      </Section>
    </div>
  );
}
