'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { PointerEvent } from 'react';

export default function Portrait() {
  const [revealed, setRevealed] = useState(false);

  function followPointer(event: PointerEvent<HTMLButtonElement>) {
    const element = event.currentTarget;
    if (event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.dataset.following = 'false';
      return;
    }
    const bounds = element.getBoundingClientRect();
    element.style.setProperty('--pointer-x', `${event.clientX - bounds.left}px`);
    element.style.setProperty('--pointer-y', `${event.clientY - bounds.top}px`);
    element.dataset.following = 'true';
  }

  return (
    <button
      type="button"
      className="portrait hidden focus-visible:z-10 focus-visible:outline-offset-[-4px] layout:col-span-4 layout:block"
      aria-label="Show Bernardo’s portrait in color"
      aria-pressed={revealed}
      onClick={() => setRevealed((value) => !value)}
      onPointerMove={followPointer}
      onPointerLeave={(event) => { event.currentTarget.dataset.following = 'false'; }}
      onPointerCancel={(event) => { event.currentTarget.dataset.following = 'false'; }}
    >
      <Image src="/profile.jpeg" alt="Bernardo Bechtold" fill sizes="(min-width: 1024px) 320px, 33vw" className="object-cover grayscale" />
      <Image src="/profile.jpeg" alt="" aria-hidden="true" fill sizes="(min-width: 1024px) 320px, 33vw" className="portrait-color object-cover" />
      <span aria-hidden="true" className="absolute bottom-3 right-3 border border-inverse-border bg-inverse px-2 py-1 type-label text-on-inverse">
        {revealed ? 'Color on' : 'Explore in color'}
      </span>
    </button>
  );
}
