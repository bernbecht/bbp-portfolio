'use client';

import { useEffect, useRef } from 'react';
import { createPlaybackController } from '@/components/editor-animations/playback';
import type { PlaybackController } from '@/components/editor-animations/playback';

/** Called with active elapsed ms, or null to restore the static poses. */
export type ApplySample = (root: HTMLElement, elapsedMs: number | null) => void;

export function usePlaybackGroup(apply: ApplySample) {
  const rootRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<PlaybackController | null>(null);
  const applyRef = useRef(apply);

  useEffect(() => {
    applyRef.current = apply;
  });

  useEffect(() => {
    const root = rootRef.current;
    const supported =
      root !== null &&
      typeof window.matchMedia === 'function' &&
      typeof IntersectionObserver === 'function' &&
      typeof window.requestAnimationFrame === 'function';
    if (!supported || !root) return;

    const controller = createPlaybackController({
      requestFrame: (cb) => window.requestAnimationFrame(cb),
      cancelFrame: (id) => window.cancelAnimationFrame(id),
    });
    controllerRef.current = controller;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotion = () => controller.setReducedMotion(motion.matches);
    const onVisibility = () => controller.setDocumentVisible(!document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      controller.setIntersecting(entry?.isIntersecting ?? false);
    });

    const offSample = controller.subscribe((ms) => applyRef.current(root, ms));
    const offStatus = controller.onStatusChange((next) => {
      if (next === 'static') applyRef.current(root, null);
      else applyRef.current(root, controller.elapsed());
    });

    onMotion();
    motion.addEventListener('change', onMotion);
    document.addEventListener('visibilitychange', onVisibility);
    observer.observe(root);
    onVisibility();

    return () => {
      motion.removeEventListener('change', onMotion);
      document.removeEventListener('visibilitychange', onVisibility);
      observer.disconnect();
      offSample();
      offStatus();
      controller.dispose();
      controllerRef.current = null;
      applyRef.current(root, null);
    };
  }, []);

  return { rootRef };
}

export function setFrameVars(
  frame: HTMLElement,
  openness: number,
  marker?: boolean,
): void {
  frame.style.setProperty('--ea-open', String(openness));
  if (marker !== undefined) frame.style.setProperty('--ea-marker', marker ? '1' : '0');
}

export function resetFrame(frame: HTMLElement): void {
  frame.style.setProperty('--ea-open', frame.dataset.eaStaticOpen ?? '0.5');
  frame.style.setProperty('--ea-marker', '0');
}
