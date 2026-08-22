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
    <footer id="footer" aria-labelledby="footer-heading" className="border-t border-black bg-[#f5f1e8] text-black">
      <div className="grid layout:grid-cols-2">
        <div className="border-b border-black bg-[#ee5d3f] p-6 text-white sm:p-10 layout:border-b-0 layout:border-r layout:p-16">
          <p className="font-mono text-xs uppercase tracking-[0.18em]">Design asks</p>
          <p className="mt-16 max-w-xl text-4xl leading-tight tracking-tight md:text-6xl">Does it make sense to the person using it?</p>
        </div>
        <div className="border-b border-black bg-[#3155d9] p-6 text-white sm:p-10 layout:p-16">
          <p className="font-mono text-xs uppercase tracking-[0.18em]">Engineering asks</p>
          <p className="mt-16 max-w-xl text-4xl leading-tight tracking-tight md:text-6xl">Will it keep making sense as the product grows?</p>
        </div>
      </div>

      <div className="content-container py-16 md:py-24">
        <div className="grid gap-8 layout:grid-cols-[0.55fr_1.45fr]">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-neutral-500">/ Let&apos;s solve both</p>
          <div>
            <h2 id="footer-heading" className="max-w-4xl text-[clamp(3.5rem,8vw,7rem)] leading-[0.86] tracking-[-0.065em]">Have a problem that lives in the middle?</h2>
            <p className="section__paragraph mt-8 max-w-2xl text-lg leading-relaxed text-neutral-600 md:text-xl">Tell me what your users need, what your system needs, and where those two things stopped agreeing.</p>
          </div>
        </div>

        <button type="button" onClick={copyEmail} aria-describedby="copy-feedback" aria-label={`Copy ${emailAddress}`} className="group mt-12 grid w-full cursor-pointer border border-black bg-white text-left transition-shadow hover:shadow-[8px_8px_0_#171717] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4 sm:grid-cols-[1fr_auto]">
          <span className="min-w-0 break-all p-5 text-2xl tracking-tight sm:p-7 sm:text-4xl">{emailAddress}</span>
          <span className="flex items-center border-t border-black bg-black px-5 py-4 font-mono text-xs uppercase tracking-wider text-white transition-colors group-hover:bg-[#ee5d3f] sm:border-l sm:border-t-0">{label}</span>
        </button>
        <span id="copy-feedback" aria-live="polite" className="sr-only">{copyStatus === 'copied' ? 'Email copied to clipboard' : copyStatus === 'error' ? 'Clipboard unavailable. The email is visible.' : ''}</span>

        <div className="mt-16 grid border-l border-t border-black font-mono text-[10px] uppercase tracking-wider sm:grid-cols-2 layout:grid-cols-4">
          <div className="flex min-h-24 flex-col justify-between border-b border-r border-black p-4"><span className="text-neutral-500">Based</span><span>São Paulo · {time}</span></div>
          <div className="flex min-h-24 flex-col justify-between border-b border-r border-black p-4"><span className="text-neutral-500">Status</span><span><span className="mr-2 text-emerald-600">●</span>Available selectively</span></div>
          <a href="https://br.linkedin.com/in/bbechtold" target="_blank" rel="noopener noreferrer" className="group flex min-h-24 flex-col justify-between border-b border-r border-black p-4 transition-colors hover:bg-[#ee5d3f] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"><span className="text-neutral-500 group-hover:text-white/60">Connect</span><span className="flex justify-between">LinkedIn <span>↗</span></span></a>
          <button type="button" onClick={backToTop} className="group flex min-h-24 cursor-pointer flex-col justify-between border-b border-r border-black p-4 text-left transition-colors hover:bg-[#3155d9] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"><span className="text-neutral-500 group-hover:text-white/60">Navigate</span><span className="flex justify-between">Back to top <span>↑</span></span></button>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-wider text-neutral-500">
          <Logo role="img" aria-label="Bernardo Bechtold" className="size-8" />
          <span>Design × Engineering · © 2026</span>
        </div>
      </div>
    </footer>
  );
}
