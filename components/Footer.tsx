'use client';

import Logo from '@assets/logo.svg';
import { useEffect, useRef, useState } from 'react';

type CopyStatus = 'idle' | 'copied' | 'error';

const emailAddress = 'bernbechtold@gmail.com';
const copyResetDelayMs = 1_800;
const clockRefreshIntervalMs = 30_000;

function formatSaoPauloTime() {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());
}

export function Footer() {
  const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle');
  const [saoPauloTime, setSaoPauloTime] = useState('--:--');
  const copyResetTimer = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    const updateTime = () => setSaoPauloTime(formatSaoPauloTime());
    updateTime();
    const clockInterval = setInterval(updateTime, clockRefreshIntervalMs);

    return () => {
      clearInterval(clockInterval);
      if (copyResetTimer.current) clearTimeout(copyResetTimer.current);
    };
  }, []);

  async function handleCopy() {
    if (copyResetTimer.current) clearTimeout(copyResetTimer.current);

    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(emailAddress);
      setCopyStatus('copied');
    } catch {
      setCopyStatus('error');
    }

    copyResetTimer.current = setTimeout(() => {
      setCopyStatus('idle');
      copyResetTimer.current = null;
    }, copyResetDelayMs);
  }

  function handleBackToTop() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  const actionLabel = copyStatus === 'copied'
    ? 'Copied to clipboard ✓'
    : copyStatus === 'error'
      ? 'Select address manually'
      : 'Copy address ↗';

  return (
    <footer id="footer" aria-labelledby="footer-heading" className="bg-[#11130f] text-[#f2f4e9]">
      <div className="border-y border-black bg-[#d9ff5b] text-black">
        <div className="content-container flex items-center justify-between py-3 font-mono text-[10px] uppercase tracking-[0.16em] sm:text-xs">
          <span>Workshop channel · Open</span>
          <span className="flex items-center gap-2"><span className="size-2 animate-pulse rounded-full bg-black motion-reduce:animate-none" aria-hidden="true" />Accepting select collaborations</span>
        </div>
      </div>

      <div className="content-container py-16 md:py-24">
        <div className="mb-12 grid gap-8 layout:grid-cols-[0.7fr_1.3fr]">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#9caa88]">/04 · Start a new thread</p>
          <div>
            <h2 id="footer-heading" className="max-w-4xl text-[clamp(3.5rem,8vw,7rem)] leading-[0.86] tracking-[-0.06em]">
              Bring me the messy part.
            </h2>
            <p className="section__paragraph mt-8 max-w-2xl text-lg leading-relaxed text-neutral-400 md:text-xl">
              A tangled workflow, an interface that won&apos;t scale, or a gap between design and delivery. That&apos;s usually where the useful work begins.
            </p>
          </div>
        </div>

        <div className="border border-neutral-600 bg-[#181a17] shadow-[8px_8px_0_#b8c4ff]">
          <div className="flex items-center justify-between border-b border-neutral-600 px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-neutral-400">
            <span>new-message.txt</span><span>Ready to send</span>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            aria-describedby="copy-email-feedback"
            aria-label={`Copy ${emailAddress}`}
            className="group flex w-full cursor-pointer flex-col items-start justify-between gap-6 p-5 text-left transition-colors hover:bg-[#d9ff5b] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d9ff5b] focus-visible:ring-offset-4 focus-visible:ring-offset-[#11130f] sm:flex-row sm:items-center md:p-8"
          >
            <span className="min-w-0 break-all text-2xl tracking-tight sm:text-3xl md:text-5xl">{emailAddress}</span>
            <span className="shrink-0 border border-current px-3 py-2 font-mono text-[10px] uppercase tracking-wider">{actionLabel}</span>
          </button>
        </div>
        <span id="copy-email-feedback" aria-live="polite" className="sr-only">
          {copyStatus === 'copied' ? 'Email copied to clipboard' : ''}
          {copyStatus === 'error' ? 'Clipboard unavailable. The email address is visible on screen.' : ''}
        </span>

        <div className="mt-16 grid border-l border-t border-neutral-700 font-mono text-[10px] uppercase tracking-wider sm:grid-cols-2 layout:grid-cols-4">
          <div className="flex min-h-28 flex-col justify-between border-b border-r border-neutral-700 p-4">
            <span className="text-neutral-500">01 · Base</span><span>São Paulo · {saoPauloTime}</span>
          </div>
          <div className="flex min-h-28 flex-col justify-between border-b border-r border-neutral-700 p-4">
            <span className="text-neutral-500">02 · Status</span><span><span className="mr-2 text-[#d9ff5b]" aria-hidden="true">●</span>Available selectively</span>
          </div>
          <a href="https://br.linkedin.com/in/bbechtold" target="_blank" rel="noopener noreferrer" className="group flex min-h-28 flex-col justify-between border-b border-r border-neutral-700 p-4 transition-colors hover:bg-[#b8c4ff] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            <span className="text-neutral-500 group-hover:text-black/60">03 · Network</span><span className="flex justify-between">LinkedIn <span className="transition-transform motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1">↗</span></span>
          </a>
          <button type="button" onClick={handleBackToTop} className="group flex min-h-28 cursor-pointer flex-col justify-between border-b border-r border-neutral-700 p-4 text-left transition-colors hover:bg-[#ff6b55] hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            <span className="text-neutral-500 group-hover:text-black/60">04 · Navigation</span><span className="flex justify-between">Back to top <span className="transition-transform motion-safe:group-hover:-translate-y-1">↑</span></span>
          </button>
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-wider text-neutral-500">
          <div className="bg-[#f1f0e8] p-1"><Logo role="img" aria-label="Bernardo Bechtold" className="size-7" /></div>
          <span>Designed and engineered in Brazil · © 2026</span>
        </div>
      </div>
    </footer>
  );
}
