import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="mb-20 grid grid-cols-1 border-x border-t border-black md:mb-32 layout:grid-cols-12">
      <div className="col-span-full flex items-center justify-between border-b border-black px-4 py-3 font-mono text-[11px] uppercase tracking-[0.14em] sm:px-6">
        <p>Independent design engineer</p>
        <p className="hidden items-center gap-2 text-neutral-600 sm:flex">
          <span className="size-2 rounded-full bg-emerald-500" aria-hidden="true" />
          São Paulo · Available selectively
        </p>
        <p className="sm:hidden">SP · BR</p>
      </div>

      <div className="col-span-full px-4 pb-12 pt-8 sm:px-6 layout:col-span-8 layout:border-r layout:border-black layout:pb-16 layout:pt-12">
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.16em] text-neutral-500">
          Product thinking, expressed in code
        </p>
        <h1 className="max-w-4xl text-[clamp(3.4rem,8vw,6.8rem)] leading-[0.88] tracking-[-0.065em]">
          I make complex products feel{' '}
          <span className="font-serif italic tracking-[-0.045em]">obvious.</span>
        </h1>
        <p className="section__paragraph mt-8 max-w-2xl text-lg leading-relaxed text-neutral-700 md:text-xl">
          I&apos;m Bernardo, a front-end engineer with a designer&apos;s eye. I turn
          tangled workflows into clear interfaces—and the systems that keep
          them clear as teams scale.
        </p>

        <div className="mt-9 flex flex-wrap gap-3 font-mono text-sm">
          <Link
            href="/projects"
            className="pressable-button inline-flex min-h-12 items-center border border-black bg-black px-5 text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          >
            See selected work <span className="ml-3" aria-hidden="true">↗</span>
          </Link>
          <a
            href="#what"
            className="pressable-button inline-flex min-h-12 items-center border border-black px-5 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
          >
            How I work <span className="ml-3" aria-hidden="true">↓</span>
          </a>
        </div>
      </div>

      <div className="relative col-span-full min-h-80 overflow-hidden bg-neutral-200 layout:col-span-4 layout:min-h-[36rem]">
        <Image
          src="/profile.jpeg"
          alt="Bernardo Bechtold, portrait"
          fill
          priority
          sizes="(min-width: 768px) 34vw, 100vw"
          className="object-cover grayscale transition duration-700 hover:grayscale-0 motion-reduce:transition-none"
        />
        <span className="absolute bottom-3 right-3 border border-white/50 bg-black/80 px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-white backdrop-blur">
          Designer × Engineer
        </span>
      </div>

      <div className="col-span-full grid grid-cols-3 border-t border-black font-mono text-[10px] uppercase tracking-wider sm:text-xs">
        <p className="border-r border-black px-3 py-3 sm:px-5">01 · Interfaces</p>
        <p className="border-r border-black px-3 py-3 sm:px-5">02 · Systems</p>
        <p className="px-3 py-3 sm:px-5">03 · Outcomes</p>
      </div>
    </section>
  );
}
