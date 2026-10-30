import type { CSSProperties } from 'react';
import '@/components/editor-animations/editor-animations.css';

interface EditorFrameProps {
  openness: number;
  showMarker?: boolean;
  /** Identifies the frame to the group's sampler. */
  frameId?: string;
}

const SAFE_OPENNESS = 0.5;

function safeOpenness(value: number): number {
  if (!Number.isFinite(value)) {
    if (process.env.NODE_ENV !== 'production') {
      throw new RangeError('EditorFrame openness must be finite');
    }
    return SAFE_OPENNESS;
  }
  return Math.min(1, Math.max(0, value));
}

/** Decorative miniature editor. Meaning lives in the surrounding caption. */
export default function EditorFrame({
  openness,
  showMarker = false,
  frameId,
}: Readonly<EditorFrameProps>) {
  const open = safeOpenness(openness);
  const style = { '--ea-open': open, '--ea-marker': 0 } as CSSProperties;
  return (
    <div
      className="ea-frame"
      aria-hidden="true"
      data-ea-frame={frameId ?? ''}
      data-ea-static-open={open}
      data-ea-marker={showMarker ? '' : undefined}
      style={style}
    >
      <div className="ea-preview">
        <div className="ea-preview__header" />
        <div className="ea-preview__hero" />
        <div className="ea-bar" />
        <div className="ea-bar" style={{ width: '60%' }} />
      </div>
      <div className="ea-sheet">
        <div className="ea-handle">
          {showMarker ? <span className="ea-marker" /> : null}
        </div>
        <div className="ea-sheet__row" />
        <div className="ea-sheet__row ea-sheet__row--short" />
        <div className="ea-sheet__row" />
        <div className="ea-sheet__row ea-sheet__row--short" />
      </div>
    </div>
  );
}
