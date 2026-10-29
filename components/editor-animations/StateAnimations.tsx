'use client';

import { useCallback } from 'react';
import EditorFrame from './EditorFrame';
import { SNAP } from './geometry';
import type { SheetState } from './geometry';
import { sampleStateLoop } from './motion';
import { resetFrame, setFrameVars, usePlaybackGroup } from './usePlaybackGroup';

interface StateAnimationsProps {
  id: string;
  title?: string;
  className?: string;
}

const STATES: readonly {
  state: SheetState;
  name: string;
  purpose: string;
  description: string;
}[] = [
  {
    state: 'collapsed',
    name: 'Collapsed',
    purpose: 'Preview first',
    description:
      'Most of the storefront remains visible while the handle keeps editing within reach.',
  },
  {
    state: 'partial',
    name: 'Partially expanded',
    purpose: 'Edit in context',
    description:
      'Controls and storefront share the viewport so the merchant can connect an edit to its result.',
  },
  {
    state: 'full',
    name: 'Fully expanded',
    purpose: 'Controls first',
    description:
      'The sheet uses the available height for detailed controls without covering the storefront header.',
  },
];

export default function StateAnimations({
  id,
  title = 'Three positions, three purposes',
  className,
}: Readonly<StateAnimationsProps>) {
  const apply = useCallback((root: HTMLElement, ms: number | null) => {
    root.querySelectorAll<HTMLElement>('[data-ea-frame]').forEach((frame) => {
      if (ms === null) return resetFrame(frame);
      setFrameVars(frame, sampleStateLoop(frame.dataset.eaFrame as SheetState, ms));
    });
  }, []);
  const { rootRef } = usePlaybackGroup(apply);

  const headingId = `${id}-heading`;
  const descriptionId = `${id}-description`;

  return (
    <section
      aria-labelledby={headingId}
      aria-describedby={descriptionId}
      className={`not-prose my-14 border-y border-subtle py-10 ${className ?? ''}`}
    >
      <div className="mb-6 max-w-2xl">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-muted">
          Interaction model
        </p>
        <h2
          id={headingId}
          className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
        >
          {title}
        </h2>
        <p
          id={descriptionId}
          className="mt-3 text-base leading-relaxed text-secondary"
        >
          Each stable position changes the balance between storefront context and
          editing space.
        </p>
      </div>

      <div ref={rootRef} className="ea-group">
        <div className="ea-states">
          {STATES.map((item, index) => (
            <figure key={item.state} className="min-w-0">
              <EditorFrame openness={SNAP[item.state]} frameId={item.state} />
              <figcaption className="mt-3">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs text-muted">0{index + 1}</span>
                  <h3 className="text-base font-semibold text-foreground">
                    {item.name}
                  </h3>
                </div>
                <p className="mt-1 text-sm font-medium text-secondary">
                  {item.purpose}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-secondary">
                  {item.description}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

      </div>
    </section>
  );
}
