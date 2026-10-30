export type SheetState = 'collapsed' | 'partial' | 'full';

export const FRAME_WIDTH = 240;
export const FRAME_HEIGHT = 360;
export const SHEET_HEIGHT = 336;

export const SNAP: Readonly<Record<SheetState, number>> = {
  collapsed: 0.16,
  partial: 0.5,
  full: 0.9,
};

export function topFor(openness: number): number {
  return FRAME_HEIGHT * (1 - clampOpenness(openness));
}

export function clampOpenness(p: number): number {
  return Math.min(1, Math.max(0, p));
}

export const TOP_Y: Readonly<Record<SheetState, number>> = {
  collapsed: topFor(SNAP.collapsed),
  partial: topFor(SNAP.partial),
  full: topFor(SNAP.full),
};

export function validateGeometry(): void {
  const values = [SNAP.collapsed, SNAP.partial, SNAP.full];
  if (!values.every((v) => Number.isFinite(v) && v >= 0 && v <= 1)) {
    throw new Error('Snap openness must be finite in [0, 1]');
  }
  if (!(values[0] < values[1] && values[1] < values[2])) {
    throw new Error('Snap points must be strictly ordered');
  }
  if (SHEET_HEIGHT < FRAME_HEIGHT * SNAP.full) {
    throw new Error('Sheet is too short for the largest exposed region');
  }
}
