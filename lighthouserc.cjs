/**
 * Lighthouse CI config for constitution Principle VIII. Limits come from performance-budget.json,
 * and the page list comes from the routes and content/projects/, so nothing is listed by hand.
 */

const fs = require('node:fs');
const path = require('node:path');

const PORT = 3100;
const ORIGIN = `http://localhost:${PORT}`;
const STATIC_PATHS = ['/', '/projects', '/experiments'];

const budget = JSON.parse(fs.readFileSync(path.join(__dirname, 'performance-budget.json'), 'utf8'));

const slugs = fs
  .readdirSync(path.join(__dirname, 'content', 'projects'))
  .filter((name) => name.endsWith('.md'))
  .map((name) => name.slice(0, -'.md'.length))
  .sort();

const paths = [...STATIC_PATHS, ...slugs.map((slug) => `/projects/${slug}`)];

const LIMIT_KEYS = ['minScore', 'maxLcpMs', 'maxCls', 'maxTbtMs'];

for (const key of LIMIT_KEYS) {
  if (typeof budget.default?.[key] !== 'number') {
    throw new Error(`performance-budget.json: default.${key} must be a number`);
  }
}

const seenExceptions = new Set();
for (const exception of budget.exceptions ?? []) {
  const label = `performance-budget.json exception "${exception.path}"`;
  if (typeof exception.reason !== 'string' || exception.reason.trim() === '') {
    throw new Error(`${label} needs a non-empty "reason"`);
  }
  if (!paths.includes(exception.path)) {
    throw new Error(`${label} matches no measured page (stale exception)`);
  }
  if (seenExceptions.has(exception.path)) {
    throw new Error(`${label} is listed more than once`);
  }
  seenExceptions.add(exception.path);
  for (const key of LIMIT_KEYS) {
    if (exception[key] !== undefined && typeof exception[key] !== 'number') {
      throw new Error(`${label}: ${key} must be a number`);
    }
  }
}

function limitsFor(pagePath) {
  const exception = (budget.exceptions ?? []).find((entry) => entry.path === pagePath);
  return { ...budget.default, ...(exception ?? {}) };
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const assertMatrix = paths.map((pagePath) => {
  const limits = limitsFor(pagePath);
  const median = { aggregationMethod: 'median' };
  return {
    matchingUrlPattern: `^${escapeRegExp(ORIGIN + pagePath)}$`,
    assertions: {
      'categories:performance': ['error', { ...median, minScore: limits.minScore }],
      'largest-contentful-paint': ['error', { ...median, maxNumericValue: limits.maxLcpMs }],
      'cumulative-layout-shift': ['error', { ...median, maxNumericValue: limits.maxCls }],
      'total-blocking-time': ['error', { ...median, maxNumericValue: limits.maxTbtMs }],
    },
  };
});

module.exports = {
  ci: {
    collect: {
      url: paths.map((pagePath) => ORIGIN + pagePath),
      numberOfRuns: 3,
      startServerCommand: `npm run start -- -p ${PORT}`,
      startServerReadyPattern: 'Ready',
      startServerReadyTimeout: 60000,
      settings: {
        onlyCategories: ['performance'],
        chromeFlags: '--no-sandbox --headless=new',
      },
    },
    assert: { assertMatrix },
    upload: { target: 'filesystem', outputDir: '.lighthouseci' },
  },
};
