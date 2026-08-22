'use client';

import { cn } from '@/lib/cn';
import Link from 'next/link';
import { useState } from 'react';

const MODES = ['Design', 'Code'] as const;
type WorkshopMode = (typeof MODES)[number];

export function Hero() {
  const [mode, setMode] = useState<WorkshopMode>('Design');

  return (
    <section className="mb-24 overflow-hidden border border-neutral-700 bg-[#11130f] text-[#f2f4e9] shadow-[10px_10px_0_#b8c4ff]">
      <div className="flex items-center justify-between border-b border-neutral-700 px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-neutral-400">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-[#ff6b55]" />
          <span className="size-2.5 rounded-full bg-[#f4d35e]" />
          <span className="size-2.5 rounded-full bg-[#7bd389]" />
          <span className="ml-2 hidden sm:inline">Bernardo&apos;s interface workshop</span>
        </div>
        <span>Open for interesting problems</span>
      </div>

      <div className="grid layout:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col justify-between border-b border-neutral-700 p-6 sm:p-10 layout:min-h-[38rem] layout:border-b-0 layout:border-r">
          <div>
            <p className="mb-8 font-mono text-xs uppercase tracking-[0.18em] text-[#9caa88]">Designer ↔ Engineer</p>
            <h1 className="max-w-2xl text-[clamp(3.2rem,7vw,6.6rem)] leading-[0.88] tracking-[-0.065em]">I prototype the idea—and the system behind it.</h1>
            <p className="section__paragraph mt-8 max-w-xl text-lg leading-relaxed text-neutral-300 md:text-xl">I turn complicated product behavior into interfaces people can understand and teams can confidently ship.</p>
          </div>
          <div className="mt-10 flex flex-wrap gap-3 font-mono text-xs uppercase tracking-wider">
            <Link href="/projects" className="bg-[#d9ff5b] px-5 py-4 text-black transition-transform motion-safe:hover:-translate-y-1">Explore experiments ↗</Link>
            <a href="#workbench" className="border border-neutral-500 px-5 py-4 transition-colors hover:border-white">Open workbench ↓</a>
          </div>
        </div>

        <div className="flex min-h-[34rem] flex-col bg-[#d8ddd0] text-black">
          <div className="flex items-center justify-between border-b border-black/30 px-4 py-3 font-mono text-xs">
            <span>playground / checkout-card</span>
            <div className="flex border border-black/40" aria-label="Preview mode">
              {MODES.map((item) => (
                <button key={item} type="button" onClick={() => setMode(item)} aria-pressed={mode === item} className={cn('cursor-pointer px-3 py-1.5 transition-colors', mode === item ? 'bg-black text-white' : 'hover:bg-black/10')}>
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="grid flex-1 place-items-center overflow-hidden p-6">
            {mode === 'Design' ? (
              <div className="w-full max-w-sm rotate-[-1deg] border border-black bg-[#fffdf5] shadow-[8px_8px_0_rgba(0,0,0,0.18)] transition-transform motion-safe:hover:rotate-0">
                <div className="flex items-center justify-between border-b border-black p-4 font-mono text-xs uppercase"><span>Order summary</span><span>03 items</span></div>
                <div className="space-y-5 p-5">
                  <div className="h-24 bg-[#b8c4ff] p-4 font-serif text-2xl">Less friction.<br />More momentum.</div>
                  <div className="flex justify-between border-b border-black/30 pb-3"><span>Design system audit</span><span>$—</span></div>
                  <button type="button" className="w-full cursor-pointer bg-black py-3 font-mono text-sm uppercase text-white transition-colors hover:bg-[#5b35d5]">Continue →</button>
                </div>
              </div>
            ) : (
              <pre className="w-full max-w-md overflow-auto border border-black bg-[#181a17] p-5 font-mono text-xs leading-6 text-[#d9ff5b] shadow-[8px_8px_0_rgba(0,0,0,0.18)]"><code>{`<FlowCard\n  intent="checkout"\n  density="comfortable"\n>\n  <Summary items={order} />\n  <Action\n    onPress={continueFlow}\n    accessibleLabel="Continue"\n  />\n</FlowCard>`}</code></pre>
            )}
          </div>

          <div className="grid grid-cols-3 border-t border-black/30 font-mono text-[10px] uppercase tracking-wider">
            <span className="border-r border-black/30 p-3">A11y · AA</span><span className="border-r border-black/30 p-3">State · Ready</span><span className="p-3">Build · Passing</span>
          </div>
        </div>
      </div>
    </section>
  );
}
