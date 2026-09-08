import Portrait from '@/components/Portrait';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="hero-frame grid grid-cols-1 border-x border-t border-strong layout:grid-cols-12">
      <div className="col-span-full flex items-center justify-between border-b border-strong px-4 py-3 font-mono text-[11px] uppercase tracking-[0.14em] sm:px-6">
        <p>Independent design engineer</p>
        <p className="hidden items-center gap-2 text-secondary sm:flex">
          <span className="size-2 rounded-full bg-availability" aria-hidden="true" />
          São Paulo · Available selectively
        </p>
        <p className="sm:hidden">SP · BR</p>
      </div>

      <div className="col-span-full px-4 pb-12 pt-8 sm:px-6 layout:col-span-8 layout:border-r layout:border-strong layout:pb-16 layout:pt-12">
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.16em] text-muted">
          Product thinking, expressed in code
        </p>
        <h1 className="max-w-4xl type-display">
          I make complex products feel{' '}
          <span className="font-serif italic tracking-[-0.045em]">obvious.</span>
        </h1>
        <p className="section__paragraph mt-8 max-w-2xl type-body text-secondary md:text-xl">
          I&apos;m Bernardo, a front-end engineer with a designer&apos;s eye. I turn
          tangled workflows into clear interfaces—and the systems that keep
          them clear as teams scale.
        </p>

        <div className="mt-9 flex flex-wrap gap-3 type-meta">
          <Link
            href="/projects"
            className="pressable-button inline-flex min-h-12 items-center border border-strong bg-inverse px-5 text-on-inverse transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
          >
            See selected work <span className="ml-3" aria-hidden="true">↗</span>
          </Link>
          <a
            href="#what"
            className="pressable-button inline-flex min-h-12 items-center border border-strong px-5 transition-colors hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2"
          >
            How I work <span className="ml-3" aria-hidden="true">↓</span>
          </a>
        </div>
      </div>

      <Portrait />

      <div className="col-span-full grid grid-cols-3 border-t border-strong font-mono text-[10px] uppercase tracking-wider sm:text-xs">
        <p className="border-r border-strong px-3 py-3 sm:px-5">01 · Interfaces</p>
        <p className="border-r border-strong px-3 py-3 sm:px-5">02 · Systems</p>
        <p className="px-3 py-3 sm:px-5">03 · Outcomes</p>
      </div>
    </section>
  );
}
