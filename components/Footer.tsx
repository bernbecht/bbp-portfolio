'use client';

import Logo from '@assets/logo.svg';
import { useEffect, useRef, useState } from 'react';

type CopyStatus = 'idle' | 'copied' | 'error';
const emailAddress = 'bernbechtold@gmail.com';

function formatSaoPauloTime() {
  return new Intl.DateTimeFormat('en-GB', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit' }).format(new Date());
}

export function Footer() {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle');
  const [time, setTime] = useState('--:--');
  const timer = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    const update = () => setTime(formatSaoPauloTime());
    update();
    const interval = setInterval(update, 30_000);
    return () => { clearInterval(interval); if (timer.current) clearTimeout(timer.current); };
  }, []);

  async function copyEmail() {
    if (timer.current) clearTimeout(timer.current);
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error();
      await navigator.clipboard.writeText(emailAddress);
      setCopyStatus('copied');
    } catch { setCopyStatus('error'); }
    timer.current = setTimeout(() => setCopyStatus('idle'), 1_800);
  }

  function backToTop() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  const label = copyStatus === 'copied' ? 'Copied ✓' : copyStatus === 'error' ? 'Copy unavailable' : 'Copy email ↗';

  return (
    <footer id="footer" aria-labelledby="footer-heading" className="border-t border-black bg-black text-white">
      <div className="grid grid-cols-2">
        <div className="col-start-1 row-start-1 min-h-[38rem] border-r border-black bg-[#ee5d3f] md:min-h-[46rem]" aria-hidden="true" />
        <div className="col-start-2 row-start-1 min-h-[38rem] bg-[#3155d9] md:min-h-[46rem]" aria-hidden="true" />

        <div className="content-container col-span-full row-start-1 grid w-full grid-cols-2 py-8 text-black md:py-12">
          <div className="flex items-start justify-between border-y border-l border-black px-3 py-3 font-mono text-[10px] uppercase tracking-wider sm:px-5">
            <span>Design</span><span aria-hidden="true">01</span>
          </div>
          <div className="flex items-start justify-between border border-black px-3 py-3 font-mono text-[10px] uppercase tracking-wider sm:px-5">
            <span>Engineering</span><span aria-hidden="true">10</span>
          </div>

          <div className="col-span-full flex flex-col items-center px-4 pb-10 pt-14 text-center md:pt-20">
            <p className="mb-7 border border-black bg-[#f5f1e8] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em]">The shared objective</p>
            <h2 id="footer-heading" className="max-w-5xl text-[clamp(3.8rem,9vw,8rem)] leading-[0.82] tracking-[-0.07em]">Let&apos;s make both sides agree.</h2>
            <p className="section__paragraph mt-8 max-w-2xl text-lg leading-relaxed md:text-xl">Bring the user problem and the system constraint. I&apos;ll help find the product that respects both.</p>
          </div>

          <button type="button" onClick={copyEmail} aria-describedby="copy-feedback" aria-label={`Copy ${emailAddress}`} className="group col-span-full mx-2 grid cursor-pointer border border-black bg-[#f5f1e8] text-left text-black shadow-[7px_7px_0_#171717] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-black motion-safe:hover:-translate-y-1 sm:mx-8 sm:grid-cols-[1fr_auto] layout:mx-28">
            <span className="min-w-0 break-all p-5 text-xl tracking-tight sm:p-6 sm:text-3xl md:text-4xl">{emailAddress}</span>
            <span className="flex items-center border-t border-black bg-black px-5 py-4 font-mono text-[10px] uppercase tracking-wider text-white transition-colors group-hover:bg-white group-hover:text-black sm:border-l sm:border-t-0">{label}</span>
          </button>
          <span id="copy-feedback" aria-live="polite" className="sr-only">{copyStatus === 'copied' ? 'Email copied to clipboard' : copyStatus === 'error' ? 'Clipboard unavailable. The email is visible.' : ''}</span>
        </div>
      </div>

      <div className="content-container py-10">
        <div className="grid border-l border-t border-neutral-700 font-mono text-[10px] uppercase tracking-wider sm:grid-cols-2 layout:grid-cols-4">
          <div className="flex min-h-24 flex-col justify-between border-b border-r border-neutral-700 p-4"><span className="text-neutral-500">Based</span><span>São Paulo · {time}</span></div>
          <div className="flex min-h-24 flex-col justify-between border-b border-r border-neutral-700 p-4"><span className="text-neutral-500">Status</span><span><span className="mr-2 text-emerald-400">●</span>Available selectively</span></div>
          <a href="https://br.linkedin.com/in/bbechtold" target="_blank" rel="noopener noreferrer" className="group flex min-h-24 flex-col justify-between border-b border-r border-neutral-700 p-4 transition-colors hover:bg-[#ee5d3f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><span className="text-neutral-500 group-hover:text-white/60">Connect</span><span className="flex justify-between">LinkedIn <span>↗</span></span></a>
          <button type="button" onClick={backToTop} className="group flex min-h-24 cursor-pointer flex-col justify-between border-b border-r border-neutral-700 p-4 text-left transition-colors hover:bg-[#3155d9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><span className="text-neutral-500 group-hover:text-white/60">Navigate</span><span className="flex justify-between">Back to top <span>↑</span></span></button>
        </div>
        <div className="mt-6 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-wider text-neutral-500">
          <div className="bg-[#f5f1e8] p-1"><Logo role="img" aria-label="Bernardo Bechtold" className="size-7" /></div>
          <span>Design × Engineering · © 2026</span>
        </div>
      </div>
    </footer>
  );
}
