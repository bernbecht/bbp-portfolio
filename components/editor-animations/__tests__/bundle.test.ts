// @vitest-environment node
import { build } from 'esbuild';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
import { expect, it } from 'vitest';

const BUDGET_BYTES = 20 * 1024;

it('feature JavaScript and CSS stay within 20 KiB gzipped (React external)', async () => {
  const dir = path.resolve(__dirname, '..');
  const result = await build({
    stdin: {
      contents:
        "export { default as A } from '@/components/editor-animations/StateAnimations';\nexport { default as B } from './VelocityPositionComparison';",
      resolveDir: dir,
      loader: 'ts',
    },
    bundle: true,
    minify: true,
    write: false,
    format: 'esm',
    jsx: 'automatic',
    outdir: path.join(dir, '.bundle-check'),
    external: ['react', 'react-dom', 'react/jsx-runtime'],
    define: { 'process.env.NODE_ENV': '"production"' },
    logLevel: 'silent',
  });
  const total = result.outputFiles.reduce((sum, f) => sum + gzipSync(f.contents).length, 0);
  console.log(`editor-animations gzip bytes: ${total}`);
  expect(result.outputFiles.length).toBeGreaterThan(0);
  expect(total).toBeLessThanOrEqual(BUDGET_BYTES);
});
