import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import StateAnimations from '../StateAnimations';
import VelocityPositionComparison from '../VelocityPositionComparison';

let reduced = false;

beforeEach(() => {
  reduced = false;
  vi.stubGlobal(
    'matchMedia',
    (query: string) => ({
      matches: reduced && query.includes('reduce'),
      addEventListener: () => {},
      removeEventListener: () => {},
    }),
  );
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(private cb: (e: { isIntersecting: boolean }[]) => void) {}
      observe() {
        this.cb([{ isIntersecting: true }]);
      }
      disconnect() {}
    },
  );
  vi.stubGlobal('requestAnimationFrame', () => 1);
  vi.stubGlobal('cancelAnimationFrame', () => {});
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe('StateAnimations', () => {
  it('renders three labeled states with hidden decorative frames', async () => {
    const { container } = render(<StateAnimations id="s" />);
    expect(screen.getByRole('region', { name: /three positions/i })).toBeTruthy();
    for (const name of ['Collapsed', 'Partially expanded', 'Fully expanded']) {
      expect(screen.getByRole('heading', { name })).toBeTruthy();
    }
    const frames = container.querySelectorAll('[data-ea-frame]');
    expect(frames).toHaveLength(3);
    frames.forEach((f) => expect(f.getAttribute('aria-hidden')).toBe('true'));
    expect(container.querySelectorAll('[tabindex]')).toHaveLength(0);
  });

  it('renders no playback controls', async () => {
    render(<StateAnimations id="s" />);
    await act(async () => {});
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('keeps static poses at the destination before enhancement', () => {
    vi.stubGlobal('IntersectionObserver', undefined);
    const { container } = render(<StateAnimations id="s" />);
    const opens = [...container.querySelectorAll<HTMLElement>('[data-ea-frame]')].map((f) =>
      f.style.getPropertyValue('--ea-open'),
    );
    expect(opens).toEqual(['0.16', '0.5', '0.9']);
  });
});

describe('VelocityPositionComparison', () => {
  it('renders both outcomes statically with no controls', async () => {
    render(<VelocityPositionComparison id="c" />);
    await act(async () => {});
    expect(screen.getByRole('table')).toBeTruthy();
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('supports multiple instances with unique ids', () => {
    const { container } = render(
      <>
        <VelocityPositionComparison id="a" />
        <VelocityPositionComparison id="b" />
      </>,
    );
    const ids = [...container.querySelectorAll('[id]')].map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
