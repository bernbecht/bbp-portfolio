export type PlaybackStatus = 'static' | 'suspended' | 'playing';

export interface FrameEnv {
  requestFrame(callback: (timestamp: number) => void): number;
  cancelFrame(id: number): void;
}

export interface PlaybackOptions {
  supported?: boolean;
}

export interface PlaybackController {
  status(): PlaybackStatus;
  elapsed(): number;
  setReducedMotion(value: boolean): void;
  setDocumentVisible(value: boolean): void;
  setIntersecting(value: boolean): void;
  subscribe(listener: (elapsedActiveMs: number) => void): () => void;
  onStatusChange(listener: (status: PlaybackStatus) => void): () => void;
  dispose(): void;
}

export function createPlaybackController(
  env: FrameEnv,
  { supported = true }: PlaybackOptions = {},
): PlaybackController {
  let reducedMotion = false;
  let documentVisible = false;
  let intersecting = false;
  let elapsedMs = 0;
  let lastTimestamp: number | null = null;
  let frameId: number | null = null;
  let disposed = false;
  let lastStatus: PlaybackStatus | null = null;
  const sampleListeners = new Set<(ms: number) => void>();
  const statusListeners = new Set<(status: PlaybackStatus) => void>();

  const status = (): PlaybackStatus => {
    if (reducedMotion || !supported) return 'static';
    if (!documentVisible || !intersecting) return 'suspended';
    return 'playing';
  };

  const emitSample = () => sampleListeners.forEach((l) => l(elapsedMs));

  const cancel = () => {
    if (frameId !== null) env.cancelFrame(frameId);
    frameId = null;
    lastTimestamp = null;
  };

  const tick = (timestamp: number) => {
    frameId = null;
    if (disposed || status() !== 'playing') return;
    if (lastTimestamp !== null) {
      elapsedMs += Math.max(0, timestamp - lastTimestamp);
      emitSample();
    }
    lastTimestamp = timestamp;
    frameId = env.requestFrame(tick);
  };

  const sync = () => {
    if (disposed) return;
    const next = status();
    if (next === 'playing') {
      if (frameId === null) frameId = env.requestFrame(tick);
    } else {
      cancel();
    }
    if (next !== lastStatus) {
      lastStatus = next;
      statusListeners.forEach((l) => l(next));
    }
  };

  return {
    status,
    elapsed: () => elapsedMs,
    setReducedMotion(value) {
      if (value === reducedMotion) return;
      reducedMotion = value;
      if (value) {
        elapsedMs = 0;
        emitSample();
      }
      sync();
    },
    setDocumentVisible(value) {
      documentVisible = value;
      sync();
    },
    setIntersecting(value) {
      intersecting = value;
      sync();
    },
    subscribe(listener) {
      sampleListeners.add(listener);
      return () => sampleListeners.delete(listener);
    },
    onStatusChange(listener) {
      statusListeners.add(listener);
      return () => statusListeners.delete(listener);
    },
    dispose() {
      disposed = true;
      cancel();
      sampleListeners.clear();
      statusListeners.clear();
    },
  };
}
