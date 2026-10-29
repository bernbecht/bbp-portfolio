import { describe, expect, it } from 'vitest';
import { createPlaybackController } from '../playback';
import type { FrameEnv } from '../playback';

function fakeEnv() {
  let time = 0;
  let nextId = 1;
  const pending = new Map<number, (ts: number) => void>();
  const env: FrameEnv = {
    requestFrame: (cb) => {
      const id = nextId++;
      pending.set(id, cb);
      return id;
    },
    cancelFrame: (id) => {
      pending.delete(id);
    },
  };
  return {
    env,
    pending: () => pending.size,
    advance(ms: number) {
      time += ms;
      const callbacks = [...pending.values()];
      pending.clear();
      callbacks.forEach((cb) => cb(time));
    },
  };
}

function ready(overrides: Partial<Parameters<typeof createPlaybackController>[1]> = {}) {
  const fake = fakeEnv();
  const c = createPlaybackController(fake.env, overrides);
  c.setIntersecting(true);
  c.setDocumentVisible(true);
  return { fake, c };
}

describe('playback controller', () => {
  it('schedules nothing until eligible', () => {
    const fake = fakeEnv();
    const c = createPlaybackController(fake.env);
    expect(c.status()).toBe('suspended');
    expect(fake.pending()).toBe(0);
    c.dispose();
  });

  it('accumulates active time with one frame chain', () => {
    const { fake, c } = ready();
    expect(c.status()).toBe('playing');
    expect(fake.pending()).toBe(1);
    fake.advance(100);
    fake.advance(16);
    fake.advance(16);
    expect(c.elapsed()).toBe(32);
    expect(fake.pending()).toBe(1);
  });

  it('suspends offscreen and hidden without catch up', () => {
    const { fake, c } = ready();
    fake.advance(0);
    fake.advance(50);
    c.setDocumentVisible(false);
    expect(c.status()).toBe('suspended');
    expect(fake.pending()).toBe(0);
    c.setDocumentVisible(true);
    fake.advance(10000);
    fake.advance(16);
    expect(c.elapsed()).toBe(66);
  });

  it('reduced motion stops and resets, then resumes automatically', () => {
    const { fake, c } = ready();
    fake.advance(0);
    fake.advance(300);
    c.setReducedMotion(true);
    expect(c.status()).toBe('static');
    expect(c.elapsed()).toBe(0);
    expect(fake.pending()).toBe(0);
    c.setReducedMotion(false);
    expect(c.status()).toBe('playing');
    expect(fake.pending()).toBe(1);
  });

  it('unsupported environments stay static', () => {
    const { c } = ready({ supported: false });
    expect(c.status()).toBe('static');
  });

  it('cleans up on dispose', () => {
    const { fake, c } = ready();
    let calls = 0;
    c.subscribe(() => calls++);
    fake.advance(0);
    fake.advance(16);
    const before = calls;
    c.dispose();
    expect(fake.pending()).toBe(0);
    fake.advance(16);
    expect(calls).toBe(before);
  });
});
