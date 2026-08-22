import { Hero } from '@/components/Hero';
import { PersonJsonLd } from '@/components/PersonJsonLd';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
  openGraph: { url: '/' },
};

const PROJECTS = [
  {
    number: '01',
    company: 'Shopify',
    title: 'A mobile editing surface that stays out of the way',
    summary: 'Designed and built a three-state bottom sheet that preserved live editing on small screens and helped increase mobile adoption by 10%.',
    meta: ['Product design', 'React', 'Mobile'],
    href: '/projects/shopify-mobile-store-editor',
    color: 'bg-[#ff6b55]',
  },
  {
    number: '02',
    company: 'Axonify',
    title: 'A visual safety net built into delivery',
    summary: 'Created an in-house regression pipeline that made refactoring safer while saving roughly $10k each year.',
    meta: ['Playwright', 'Storybook', 'CI/CD'],
    href: '/projects/how-stopped-visual-regressions',
    color: 'bg-[#b8c4ff]',
  },
] as const;

export default function Home() {
  return (
    <div className="fade-up">
      <PersonJsonLd />
      <div className="content-container"><Hero /></div>

      <section id="workbench" className="scroll-mt-24 border-y border-neutral-500 bg-[#f1f0e8] py-20 md:py-28">
        <div className="content-container">
          <div className="mb-12 grid gap-8 layout:grid-cols-[0.7fr_1.3fr]">
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-neutral-500">/01 · Selected builds</div>
            <div>
              <h2 className="max-w-3xl text-4xl leading-[0.95] tracking-[-0.045em] md:text-6xl">Production work,<br /><span className="font-serif italic">opened on the bench.</span></h2>
              <p className="section__paragraph mt-6 max-w-2xl text-lg text-neutral-600">Not polished artifacts behind glass—decisions, constraints, experiments, and the systems that made the outcome possible.</p>
            </div>
          </div>

          <div className="border border-black bg-white">
            {PROJECTS.map((project) => (
              <Link key={project.number} href={project.href} className="group grid border-b border-black last:border-b-0 layout:grid-cols-[4rem_1fr_18rem]">
                <div className="border-b border-black p-4 font-mono text-xs layout:border-b-0 layout:border-r">{project.number}</div>
                <div className="p-6 md:p-8">
                  <div className="mb-14 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-wider">
                    <span className={`${project.color} border border-black px-2 py-1`}>{project.company}</span>
                    {project.meta.map((item) => <span key={item} className="border border-neutral-400 px-2 py-1 text-neutral-600">{item}</span>)}
                  </div>
                  <h3 className="max-w-2xl text-3xl leading-tight tracking-tight md:text-4xl">{project.title}</h3>
                  <p className="section__paragraph mt-4 max-w-2xl text-neutral-600">{project.summary}</p>
                </div>
                <div className="flex min-h-40 items-end justify-between border-t border-black bg-[#e1e5d9] p-6 font-mono text-xs uppercase layout:border-l layout:border-t-0">
                  <span>Open case file</span><span className="text-2xl transition-transform motion-safe:group-hover:translate-x-2">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#d9ff5b] py-20 text-black md:py-28">
        <div className="content-container grid gap-12 layout:grid-cols-[0.75fr_1.25fr]">
          <div className="font-mono text-xs uppercase tracking-[0.18em]">/02 · Operating system</div>
          <div>
            <h2 className="max-w-3xl text-4xl leading-[0.95] tracking-[-0.045em] md:text-6xl">One practice.<br />Three active lenses.</h2>
            <ol className="mt-12 border-t border-black">
              {[
                ['Understand', 'Observe the workflow, expose assumptions, and frame the problem worth solving.'],
                ['Prototype', 'Make behavior tangible early—from rough interaction models to production-shaped components.'],
                ['Systematize', 'Encode the decisions in accessible APIs, tests, tokens, and shared language.'],
              ].map(([title, copy], index) => (
                <li key={title} className="grid gap-3 border-b border-black py-6 sm:grid-cols-[3rem_0.7fr_1.3fr]">
                  <span className="font-mono text-xs">0{index + 1}</span><h3 className="text-xl font-semibold">{title}</h3><p className="section__paragraph">{copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-[#181a17] py-20 text-white md:py-28">
        <div className="content-container">
          <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div><p className="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-[#9caa88]">/03 · Bench inventory</p><h2 className="text-4xl tracking-tight md:text-6xl">What I reach for.</h2></div>
            <p className="section__paragraph max-w-md text-neutral-400">The tools are secondary. The useful part is knowing when each one reduces uncertainty.</p>
          </div>
          <ul className="grid border-l border-t border-neutral-700 sm:grid-cols-2 layout:grid-cols-4">
            {['React systems', 'Interaction models', 'Design tokens', 'Accessibility', 'TypeScript', 'Visual testing', 'Component APIs', 'Product research'].map((item, index) => (
              <li key={item} className="flex min-h-32 flex-col justify-between border-b border-r border-neutral-700 p-4 transition-colors hover:bg-[#b8c4ff] hover:text-black"><span className="font-mono text-[10px] text-neutral-500">{String(index + 1).padStart(2, '0')}</span><span className="text-lg">{item}</span></li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
