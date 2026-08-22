'use client';

import { cn } from '@/lib/cn';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const MODES = ['Design', 'Combined', 'Engineering'] as const;
type Mode = (typeof MODES)[number];

const MODE_COPY: Record<Mode, { eyebrow: string; headline: string; intro: string }> = {
  Design: {
    eyebrow: 'Experience · behavior · clarity',
    headline: 'I make complex products feel clear.',
    intro: 'I frame messy workflows, prototype the behavior, and shape interfaces around how people actually think and work.',
  },
  Combined: {
    eyebrow: 'Design judgment × engineering depth',
    headline: 'The interesting problems need both.',
    intro: 'I move from product intent to interaction design to production code—keeping the idea intact through every handoff.',
  },
  Engineering: {
    eyebrow: 'Architecture · systems · delivery',
    headline: 'I make clear products stay clear.',
    intro: 'I build accessible React systems, durable component APIs, and delivery foundations that teams can safely extend.',
  },
};

const PROJECTS = [
  {
    href: '/projects/shopify-mobile-store-editor',
    company: 'Shopify',
    year: '2022–23',
    title: 'Mobile Store Editor',
    design: 'A three-state interaction model kept live editing usable on small screens.',
    engineering: 'Production-ready React behavior handled gestures, state, and responsive constraints.',
    outcome: '+10% mobile adoption',
  },
  {
    href: '/projects/how-stopped-visual-regressions',
    company: 'Axonify',
    year: '2025',
    title: 'Visual confidence system',
    design: 'A review workflow made visual quality legible across product teams.',
    engineering: 'Playwright and Storybook automated comparison inside CI/CD.',
    outcome: '≈$10k saved yearly',
  },
] as const;

export function DualModeHome() {
  const [mode, setMode] = useState<Mode>('Combined');
  const copy = MODE_COPY[mode];

  return (
    <div className={cn('dual-home', mode === 'Design' && 'is-design', mode === 'Engineering' && 'is-engineering')}>
      <section className="content-container pb-24 pt-6 md:pb-32">
        <div className="mb-8 flex flex-col justify-between gap-4 border-y border-black py-3 sm:flex-row sm:items-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-600">Choose a lens</p>
          <div className="grid grid-cols-3 border border-black font-mono text-[10px] uppercase tracking-wider" aria-label="Portfolio perspective">
            {MODES.map((item) => (
              <button key={item} type="button" onClick={() => setMode(item)} aria-pressed={mode === item} className={cn('cursor-pointer border-r border-black px-3 py-2.5 transition-colors last:border-r-0 sm:px-5', mode === item ? item === 'Design' ? 'bg-[#ee5d3f] text-white' : item === 'Engineering' ? 'bg-[#3155d9] text-white' : 'bg-black text-white' : 'hover:bg-black/5')}>
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-10 layout:grid-cols-[1.25fr_0.75fr] layout:items-stretch">
          <div className="flex flex-col justify-between py-4 layout:py-10">
            <div>
              <p className="mb-7 font-mono text-xs uppercase tracking-[0.18em] text-neutral-500">{copy.eyebrow}</p>
              <h1 className="max-w-4xl text-[clamp(4rem,9vw,8rem)] leading-[0.82] tracking-[-0.07em] transition-all">{copy.headline}</h1>
            </div>
            <div className="mt-10 grid gap-8 sm:grid-cols-[1fr_auto] sm:items-end">
              <p className="section__paragraph max-w-2xl text-lg leading-relaxed text-neutral-700 md:text-xl">{copy.intro}</p>
              <Link href="/projects" className="dual-action inline-flex size-20 items-center justify-center rounded-full border border-black font-mono text-xs uppercase transition-transform motion-safe:hover:rotate-[-8deg] motion-safe:hover:scale-105">Work ↗</Link>
            </div>
          </div>

          <div className="relative min-h-[28rem] overflow-hidden border border-black bg-neutral-200 layout:min-h-[39rem]">
            <Image src="/profile.jpeg" alt="Bernardo Bechtold, portrait" fill priority sizes="(min-width: 900px) 34vw, 100vw" className="object-cover grayscale" />
            <div className={cn('absolute inset-y-0 left-0 overflow-hidden bg-[#ee5d3f]/35 mix-blend-color transition-[width] duration-500', mode === 'Design' ? 'w-full' : mode === 'Engineering' ? 'w-0' : 'w-1/2')} />
            <div className={cn('absolute inset-y-0 right-0 border-l border-white/70 bg-[linear-gradient(rgba(49,85,217,.22)_1px,transparent_1px),linear-gradient(90deg,rgba(49,85,217,.22)_1px,transparent_1px)] bg-[size:18px_18px] transition-[width] duration-500', mode === 'Engineering' ? 'w-full' : mode === 'Design' ? 'w-0' : 'w-1/2')} />
            <div className="absolute inset-x-3 bottom-3 flex justify-between font-mono text-[10px] uppercase tracking-wider text-white mix-blend-difference"><span>Human behavior</span><span>System behavior</span></div>
          </div>
        </div>
      </section>

      <section className="border-y border-black bg-white py-20 md:py-28">
        <div className="content-container">
          <div className="mb-12 grid gap-6 layout:grid-cols-[0.5fr_1.5fr]">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-neutral-500">/ Selected intersections</p>
            <h2 className="max-w-4xl text-4xl leading-[0.95] tracking-[-0.045em] md:text-6xl">One outcome.<br /><span className="font-serif italic">Two kinds of thinking.</span></h2>
          </div>

          <div className="border border-black">
            {PROJECTS.map((project) => (
              <Link key={project.title} href={project.href} className="group block border-b border-black last:border-b-0">
                <div className="flex items-center justify-between border-b border-black px-4 py-3 font-mono text-[10px] uppercase tracking-wider"><span>{project.company}</span><span>{project.year} · {project.outcome}</span></div>
                <div className="grid layout:grid-cols-[0.65fr_1fr_1fr]">
                  <h3 className="border-b border-black p-6 text-3xl tracking-tight layout:border-b-0 layout:border-r md:p-8">{project.title}</h3>
                  <div className={cn('border-b border-black p-6 transition-opacity layout:border-b-0 layout:border-r md:p-8', mode === 'Engineering' && 'opacity-30')}><p className="mb-5 font-mono text-[10px] uppercase tracking-wider text-[#c23f29]">Design lens</p><p className="section__paragraph text-neutral-700">{project.design}</p></div>
                  <div className={cn('p-6 transition-opacity md:p-8', mode === 'Design' && 'opacity-30')}><p className="mb-5 font-mono text-[10px] uppercase tracking-wider text-[#3155d9]">Engineering lens</p><p className="section__paragraph text-neutral-700">{project.engineering}</p><span className="mt-8 inline-block font-mono text-xs transition-transform motion-safe:group-hover:translate-x-2">Open case study →</span></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="dual-split-section border-b border-black py-20 md:py-28">
        <div className="content-container">
          <p className="mb-12 font-mono text-xs uppercase tracking-[0.18em] text-neutral-500">/ The shared middle</p>
          <div className="grid gap-px border border-black bg-black layout:grid-cols-2">
            <div className="bg-[#f4c9bb] p-7 md:p-10"><p className="mb-20 font-mono text-xs uppercase tracking-wider">Design contributes</p><h2 className="text-4xl leading-tight tracking-tight md:text-5xl">Research<br />Interaction models<br />Accessible patterns<br />Visual language</h2></div>
            <div className="bg-[#cbd6ff] p-7 md:p-10"><p className="mb-20 font-mono text-xs uppercase tracking-wider">Engineering contributes</p><h2 className="text-4xl leading-tight tracking-tight md:text-5xl">React architecture<br />Component APIs<br />Design tokens<br />Confidence in CI</h2></div>
          </div>
          <div className="mx-auto -mt-px max-w-2xl border border-black bg-[#f5f1e8] p-6 text-center shadow-[6px_6px_0_#171717] md:p-8"><p className="font-mono text-xs uppercase tracking-wider">The overlap</p><p className="mt-4 font-serif text-3xl leading-tight md:text-4xl">Products that make sense to use—and to maintain.</p></div>
        </div>
      </section>
    </div>
  );
}
