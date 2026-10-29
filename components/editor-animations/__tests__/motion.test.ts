import { describe, expect, it } from 'vitest';
import { SNAP, TOP_Y, validateGeometry } from '../geometry';
import {
  COMPARISON_CYCLE_MS,
  STATE_CYCLE_MS,
  positionTarget,
  sampleComparison,
  sampleStateLoop,
  velocityTarget,
} from '../motion';

describe('geometry', () => {
  it('derives sheet tops from openness', () => {
    expect(TOP_Y.collapsed).toBeCloseTo(302.4);
    expect(TOP_Y.partial).toBeCloseTo(180);
    expect(TOP_Y.full).toBeCloseTo(36);
    expect(() => validateGeometry()).not.toThrow();
  });
});

describe('release rules', () => {
  const fixtures: [number, number, string, string][] = [
    [0.6, 0.111111, 'partial', 'partial'],
    [0.6, 0.555556, 'partial', 'full'],
    [0.6, 0.45, 'partial', 'full'],
    [0.6, -0.45, 'partial', 'collapsed'],
    [0.33, 0, 'collapsed', 'collapsed'],
    [0.7, 0, 'partial', 'partial'],
    [0.95, 0.6, 'full', 'full'],
    [0.1, -0.6, 'collapsed', 'collapsed'],
    [0.3, 0.6, 'collapsed', 'full'],
  ];
  it.each(fixtures)('p=%s v=%s', (p, v, pos, vel) => {
    expect(positionTarget(p)).toBe(pos);
    expect(velocityTarget(p, v)).toBe(vel);
  });

  it('clamps and rejects nonfinite input', () => {
    expect(positionTarget(2)).toBe('full');
    expect(positionTarget(-1)).toBe('collapsed');
    expect(() => positionTarget(Number.NaN)).toThrow();
    expect(() => velocityTarget(0.5, Number.POSITIVE_INFINITY)).toThrow();
  });
});

describe('state loops', () => {
  it('starts every state from the collapsed pose', () => {
    for (const state of ['collapsed', 'partial', 'full'] as const) {
      expect(sampleStateLoop(state, 0)).toBeCloseTo(SNAP.collapsed);
      expect(sampleStateLoop(state, 800)).toBeCloseTo(SNAP.collapsed);
    }
  });

  it.each([
    ['collapsed', 0.21],
    ['partial', 0.5],
    ['full', 0.9],
  ] as const)('%s reaches and holds its destination', (state, destination) => {
    expect(sampleStateLoop(state, 1500)).toBeCloseTo(destination);
    expect(sampleStateLoop(state, 2200)).toBeCloseTo(destination);
    expect(sampleStateLoop(state, 3000)).toBeCloseTo(destination);
    expect(sampleStateLoop(state, 3700)).toBeCloseTo(SNAP.collapsed);
    expect(sampleStateLoop(state, STATE_CYCLE_MS)).toBeCloseTo(SNAP.collapsed);
  });

  it('moves monotonically toward the destination', () => {
    let previous = sampleStateLoop('full', 800);
    for (let t = 801; t <= 1500; t += 20) {
      const p = sampleStateLoop('full', t);
      expect(p).toBeGreaterThanOrEqual(previous);
      previous = p;
    }
  });

  it('repeats identically after ten cycles', () => {
    for (const t of [0, 1000, 2500, 3500]) {
      expect(sampleStateLoop('partial', t + STATE_CYCLE_MS * 10)).toBeCloseTo(
        sampleStateLoop('partial', t),
      );
    }
  });
});

describe('comparison cycle', () => {
  it('slow release settles both to partial', () => {
    const s = sampleComparison(1900);
    expect(s.scenario).toBe('slow-up');
    expect(s.marker).toBe(false);
    expect(s.position).toBeCloseTo(0.6);
    expect(sampleComparison(1899).marker).toBe(true);
    const r = sampleComparison(3000);
    expect(r.position).toBeCloseTo(0.5);
    expect(r.velocity).toBeCloseTo(0.5);
  });

  it('fast release diverges', () => {
    expect(sampleComparison(4500).scenario).toBe('fast-up');
    const r = sampleComparison(6000);
    expect(r.position).toBeCloseTo(0.5);
    expect(r.velocity).toBeCloseTo(0.9);
    expect(sampleComparison(5180).velocity).toBeCloseTo(0.6);
    expect(sampleComparison(5780).velocity).toBeCloseTo(0.9);
  });

  it('resets and wraps with identical pre-release samples', () => {
    expect(sampleComparison(8500).velocity).toBeCloseTo(0.9);
    expect(sampleComparison(9200).velocity).toBeCloseTo(0.5);
    expect(sampleComparison(COMPARISON_CYCLE_MS).position).toBeCloseTo(0.5);
    for (let t = 0; t < 5180; t += 37) {
      const s = sampleComparison(t);
      if (t < 1900 || t >= 4500) expect(s.position).toBeCloseTo(s.velocity);
    }
  });

  it('has zero skew after ten cycles', () => {
    for (const t of [1900, 5180, 5779, 9200]) {
      expect(sampleComparison(t + COMPARISON_CYCLE_MS * 10)).toEqual(sampleComparison(t));
    }
  });
});
