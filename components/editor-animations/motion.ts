import { SNAP, clampOpenness } from '@/components/editor-animations/geometry';
import type { SheetState } from '@/components/editor-animations/geometry';

export const STATE_CYCLE_MS = 4000;
export const COMPARISON_CYCLE_MS = 10000;
export const VELOCITY_THRESHOLD = 0.45;

export type ScenarioId = 'slow-up' | 'fast-up';

export const DESTINATION: Readonly<Record<SheetState, number>> = {
  collapsed: 0.21,
  partial: SNAP.partial,
  full: SNAP.full,
};

export function ease(u: number): number {
  const c = Math.min(1, Math.max(0, u));
  return 3 * c * c - 2 * c * c * c;
}

function lerp(a: number, b: number, u: number): number {
  if (u <= 0) return a;
  if (u >= 1) return b;
  return a + (b - a) * u;
}

function phaseProgress(t: number, start: number, end: number): number {
  return (t - start) / (end - start);
}

function assertFinite(value: number): void {
  if (!Number.isFinite(value)) {
    throw new RangeError('Expected a finite number');
  }
}

/** Nearest snap point to the release openness; ties choose the lower state. */
export function positionTarget(openness: number): SheetState {
  assertFinite(openness);
  const p = clampOpenness(openness);
  const states: SheetState[] = ['collapsed', 'partial', 'full'];
  let best = states[0];
  let bestDistance = Math.abs(p - SNAP[best]);
  for (const state of states.slice(1)) {
    const d = Math.abs(p - SNAP[state]);
    if (d < bestDistance - 1e-9) {
      best = state;
      bestDistance = d;
    }
  }
  return best;
}

/**
 * Case study rule: a sufficiently fast gesture goes to the endpoint in its
 * direction; slower releases fall back to the position rule.
 */
export function velocityTarget(openness: number, velocity: number): SheetState {
  assertFinite(openness);
  assertFinite(velocity);
  if (Math.abs(velocity) >= VELOCITY_THRESHOLD) {
    return velocity > 0 ? 'full' : 'collapsed';
  }
  return positionTarget(openness);
}

/** Every state starts collapsed, moves to its destination, holds, and returns. */
export function sampleStateLoop(state: SheetState, elapsedMs: number): number {
  const t = ((elapsedMs % STATE_CYCLE_MS) + STATE_CYCLE_MS) % STATE_CYCLE_MS;
  const start = SNAP.collapsed;
  const end = DESTINATION[state];
  if (t < 800) return start;
  if (t < 1500) return lerp(start, end, ease(phaseProgress(t, 800, 1500)));
  if (t < 3000) return end;
  if (t < 3700) return lerp(end, start, ease(phaseProgress(t, 3000, 3700)));
  return start;
}

export interface Scenario {
  id: ScenarioId;
  start: number;
  release: number;
  dragStart: number;
  releaseAt: number;
  velocity: number;
}

const START = SNAP.partial;
const RELEASE = 0.6;

function scenario(id: ScenarioId, dragStart: number, durationMs: number): Scenario {
  return {
    id,
    start: START,
    release: RELEASE,
    dragStart,
    releaseAt: dragStart + durationMs,
    velocity: (RELEASE - START) / (durationMs / 1000),
  };
}

export const SLOW = scenario('slow-up', 1000, 900);
export const FAST = scenario('fast-up', 5000, 180);

export interface ComparisonSample {
  scenario: ScenarioId;
  position: number;
  velocity: number;
  marker: boolean;
  /** Marker openness when visible. */
  markerOpenness: number;
  released: boolean;
}

export function sampleComparison(elapsedMs: number): ComparisonSample {
  const t = ((elapsedMs % COMPARISON_CYCLE_MS) + COMPARISON_CYCLE_MS) % COMPARISON_CYCLE_MS;
  const s = t < 4500 ? SLOW : FAST;
  const scenarioId = s.id;
  const settleEnd = s.releaseAt + 600;

  if (t < s.dragStart) {
    return rest(scenarioId, START, false);
  }
  if (t < s.releaseAt) {
    const p = lerp(START, RELEASE, phaseProgress(t, s.dragStart, s.releaseAt));
    return { scenario: scenarioId, position: p, velocity: p, marker: true, markerOpenness: p, released: false };
  }
  const posTarget = SNAP[positionTarget(s.release)];
  const velTarget = SNAP[velocityTarget(s.release, s.velocity)];
  if (t < settleEnd) {
    const u = ease(phaseProgress(t, s.releaseAt, settleEnd));
    return {
      scenario: scenarioId,
      position: lerp(RELEASE, posTarget, u),
      velocity: lerp(RELEASE, velTarget, u),
      marker: false,
      markerOpenness: RELEASE,
      released: true,
    };
  }
  if (s === SLOW) return rest(scenarioId, posTarget, true);
  // Fast result hold, then velocity panel resets.
  if (t < 8500) return { ...rest(scenarioId, posTarget, true), velocity: velTarget };
  if (t < 9200) {
    return {
      ...rest(scenarioId, posTarget, true),
      velocity: lerp(velTarget, START, ease(phaseProgress(t, 8500, 9200))),
    };
  }
  return rest(scenarioId, START, false);
}

function rest(scenarioId: ScenarioId, p: number, released: boolean): ComparisonSample {
  return { scenario: scenarioId, position: p, velocity: p, marker: false, markerOpenness: p, released };
}
