// @vitest-environment node
import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

type Rgb = [number, number, number];
type Tokens = Record<string, string>;

const root = path.resolve(__dirname, '../../..');
const globals = fs.readFileSync(path.join(root, 'app/globals.css'), 'utf8');
const featureCss = fs.readFileSync(
  path.join(root, 'components/editor-animations/editor-animations.css'),
  'utf8',
);

/** Custom properties declared in the first block that follows `selector`. */
function declarations(css: string, selector: string): Tokens {
  const start = css.indexOf(selector);
  if (start === -1) throw new Error(`Selector not found: ${selector}`);
  const block = css.slice(css.indexOf('{', start) + 1, css.indexOf('\n}', start));
  const tokens: Tokens = {};
  for (const match of block.matchAll(/(--[\w-]+):\s*([^;]+);/g)) tokens[match[1]] = match[2].trim();
  return tokens;
}

function hexToRgb(hex: string): Rgb {
  const h = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)) as Rgb;
}

/** Resolves hex values, `var()` references and `color-mix(in srgb, A p%, B)`. */
function resolve(value: string, tokens: Tokens): Rgb {
  const v = value.trim();
  if (v.startsWith('#')) return hexToRgb(v);
  const ref = v.match(/^var\((--[\w-]+)\)$/);
  if (ref) {
    if (!(ref[1] in tokens)) throw new Error(`Unknown token ${ref[1]}`);
    return resolve(tokens[ref[1]], tokens);
  }
  const mix = v.match(/^color-mix\(in srgb,\s*(var\(--[\w-]+\))\s+(\d+)%,\s*(var\(--[\w-]+\))\)$/);
  if (mix) {
    const share = Number(mix[2]) / 100;
    const a = resolve(mix[1], tokens);
    const b = resolve(mix[3], tokens);
    return a.map((c, i) => c * share + b[i] * (1 - share)) as Rgb;
  }
  throw new Error(`Unsupported color value: ${v}`);
}

function luminance([r, g, b]: Rgb): number {
  const [lr, lg, lb] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
}

function contrast(a: Rgb, b: Rgb): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const light = declarations(globals, ':root {');
const dark = { ...light, ...declarations(globals, ":root[data-theme='dark']") };
const feature = declarations(featureCss, '.ea-group');

const themes: [string, Tokens][] = [
  ['light', { ...light, ...feature }],
  ['dark', { ...dark, ...feature }],
];

describe.each(themes)('FR-010 essential non-text contrast (%s theme)', (_name, tokens) => {
  const color = (token: string) => resolve(`var(${token})`, tokens);
  const pairs: [string, Rgb, Rgb][] = [
    ['frame outline vs page background', color('--border-strong'), color('--background')],
    ['sheet edge vs preview', color('--border-strong'), color('--ea-preview')],
    ['skeleton vs preview', color('--ea-skeleton'), color('--ea-preview')],
    ['skeleton vs sheet', color('--ea-skeleton'), color('--background')],
    ['skeleton border vs preview header', color('--ea-skeleton'), color('--ea-preview-bar')],
  ];

  it.each(pairs)('%s is at least 3:1', (_label, a, b) => {
    expect(contrast(a, b)).toBeGreaterThanOrEqual(3);
  });
});
