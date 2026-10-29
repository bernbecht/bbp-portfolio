'use client';

import { useCallback, useState } from 'react';
import EditorFrame from './EditorFrame';
import { SNAP } from './geometry';
import { sampleComparison } from './motion';
import type { ScenarioId } from './motion';
import { resetFrame, setFrameVars, usePlaybackGroup } from './usePlaybackGroup';

interface ComparisonProps {
  id: string;
  title?: string;
  className?: string;
}

const SCENARIO_LABEL: Record<ScenarioId, string> = {
  'slow-up': 'Slow upward release',
  'fast-up': 'Fast upward release',
};

export default function VelocityPositionComparison({
  id,
  title = 'How a drag resolves',
  className,
}: Readonly<ComparisonProps>) {
  const [scenario, setScenario] = useState<ScenarioId>('fast-up');

  const apply = useCallback((root: HTMLElement, ms: number | null) => {
    if (ms === null) {
      root.querySelectorAll<HTMLElement>('[data-ea-frame]').forEach(resetFrame);
      setScenario('fast-up');
      return;
    }
    const sample = sampleComparison(ms);
    root.querySelectorAll<HTMLElement>('[data-ea-frame]').forEach((frame) => {
      const panel = frame.dataset.eaFrame;
      setFrameVars(
        frame,
        panel === 'position' ? sample.position : sample.velocity,
        sample.marker,
      );
    });
    setScenario(sample.scenario);
  }, []);
  const { rootRef } = usePlaybackGroup(apply);

  const headingId = `${id}-heading`;
  const descriptionId = `${id}-description`;

  return (
    <figure
      aria-labelledby={headingId}
      aria-describedby={descriptionId}
      className={`not-prose my-8 rounded-xl border border-subtle bg-surface p-5 sm:p-6 ${className ?? ''}`}
    >
      <figcaption className="mb-5">
        <h4 id={headingId} className="text-lg font-semibold text-foreground">
          {title}
        </h4>
        <p id={descriptionId} className="mt-1 text-sm leading-relaxed text-secondary">
          Direction takes priority during a fast gesture. Position decides the
          state when the release is slower. Both panels below start from the same
          release position.
        </p>
      </figcaption>

      <div ref={rootRef} className="ea-group">
        <p className="mb-4 font-mono text-xs font-medium uppercase tracking-wider text-muted">
          {SCENARIO_LABEL[scenario]}
        </p>
        <div className="ea-compare">
          <div className="min-w-0">
            <EditorFrame openness={SNAP.partial} frameId="position" showMarker />
            <p className="mt-3 text-center text-sm font-semibold text-foreground">
              Position
            </p>
            <p className="text-center text-sm text-secondary">
              Nearest state to the release point
            </p>
          </div>
          <div className="min-w-0">
            <EditorFrame openness={SNAP.full} frameId="velocity" showMarker />
            <p className="mt-3 text-center text-sm font-semibold text-foreground">
              Velocity
            </p>
            <p className="text-center text-sm text-secondary">
              Also considers how fast the handle moved
            </p>
          </div>
        </div>

        <div
          role="region"
          aria-label="Comparison outcomes"
          tabIndex={0}
          className="mt-5 overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
        >
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-subtle text-muted">
                <th scope="col" className="py-2 pr-4 font-medium">Release</th>
                <th scope="col" className="py-2 pr-4 font-medium">Position</th>
                <th scope="col" className="py-2 font-medium">Velocity</th>
              </tr>
            </thead>
            <tbody className="text-secondary">
              <tr className="border-b border-subtle">
                <th scope="row" className="py-2 pr-4 font-medium">Slow upward</th>
                <td className="py-2 pr-4">Partially expanded</td>
                <td className="py-2">Partially expanded</td>
              </tr>
              <tr>
                <th scope="row" className="py-2 pr-4 font-medium">Fast upward</th>
                <td className="py-2 pr-4">Partially expanded</td>
                <td className="py-2">Fully expanded</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-secondary">
          Same release position. Position chooses the nearest state (partially
          expanded). Velocity also considers the fast upward release (fully
          expanded).
        </p>

        <p className="ea-reduced-note mt-3 text-xs text-muted">
          Static illustration, reduced motion.
        </p>
      </div>

      <p className="mt-4 border-t border-subtle pt-4 text-sm leading-relaxed text-secondary">
        Dragging starts only at the handle. Vertical gestures within the sheet
        remain available for scrolling through controls.
      </p>
    </figure>
  );
}
