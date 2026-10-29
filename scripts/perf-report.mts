/**
 * Prints the median Lighthouse result per page from `.lighthouseci/` (written by `npm run perf:collect`).
 * Pass `--write <file>` to also save the table with the date and git commit (the recorded baseline).
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';

const RESULTS_DIR = path.join(process.cwd(), '.lighthouseci');
const budget = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'performance-budget.json'), 'utf8')) as {
  exceptions: { path: string }[];
};

type Run = { score: number; lcpMs: number; cls: number; tbtMs: number };

function median(values: readonly number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 1 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

const lighthouseConfig = createRequire(import.meta.url)('../lighthouserc.cjs') as {
  ci: { collect: { url: string[]; numberOfRuns: number } };
};
const expectedPaths = lighthouseConfig.ci.collect.url.map((url) => new URL(url).pathname);
const expectedRuns = lighthouseConfig.ci.collect.numberOfRuns;

const files = fs.existsSync(RESULTS_DIR)
  ? fs.readdirSync(RESULTS_DIR).filter((name) => /^lhr-.*\.json$/.test(name))
  : [];

if (files.length === 0) {
  console.error('No Lighthouse results in .lighthouseci/. Run `npm run perf:collect` first.');
  process.exit(1);
}

const runsByPath = new Map<string, Run[]>();
for (const file of files) {
  const lhr = JSON.parse(fs.readFileSync(path.join(RESULTS_DIR, file), 'utf8'));
  const pagePath = new URL(lhr.finalDisplayedUrl ?? lhr.finalUrl).pathname;
  const runs = runsByPath.get(pagePath) ?? [];
  runs.push({
    score: lhr.categories.performance.score,
    lcpMs: lhr.audits['largest-contentful-paint'].numericValue,
    cls: lhr.audits['cumulative-layout-shift'].numericValue,
    tbtMs: lhr.audits['total-blocking-time'].numericValue,
  });
  runsByPath.set(pagePath, runs);
}

// A missing or partial measurement must fail, never pass silently (spec FR-007).
const incomplete = expectedPaths.filter((pagePath) => (runsByPath.get(pagePath)?.length ?? 0) < expectedRuns);
if (incomplete.length > 0) {
  for (const pagePath of incomplete) {
    const found = runsByPath.get(pagePath)?.length ?? 0;
    console.error(`error ${pagePath}: expected ${expectedRuns} runs, found ${found}`);
  }
  process.exit(1);
}

const exceptionPaths = new Set(budget.exceptions.map((entry) => entry.path));
const rows = [...runsByPath.entries()]
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([pagePath, runs]) => {
    const score = median(runs.map((run) => run.score));
    const lcp = median(runs.map((run) => run.lcpMs));
    const cls = median(runs.map((run) => run.cls));
    const tbt = median(runs.map((run) => run.tbtMs));
    const budgetKind = exceptionPaths.has(pagePath) ? 'exception' : 'default';
    return `| ${pagePath} | ${score.toFixed(2)} | ${Math.round(lcp)} | ${cls.toFixed(3)} | ${Math.round(tbt)} | ${runs.length} | ${budgetKind} |`;
  });

const table = [
  '| Page | Score | LCP (ms) | CLS | TBT (ms) | Runs | Budget |',
  '|------|-------|----------|-----|----------|------|--------|',
  ...rows,
].join('\n');

console.log(table);

const writeIndex = process.argv.indexOf('--write');
if (writeIndex !== -1) {
  const target = process.argv[writeIndex + 1];
  if (!target) {
    console.error('--write needs a file path');
    process.exit(1);
  }
  const commit = execFileSync('git', ['rev-parse', '--short', 'HEAD']).toString().trim();
  const date = new Date().toISOString().slice(0, 10);
  fs.writeFileSync(target, `Measured on ${date} at commit ${commit}. Median of the runs per page, mobile profile.\n\n${table}\n`);
  console.log(`\nWrote ${target}`);
}
