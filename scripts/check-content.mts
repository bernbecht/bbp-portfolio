/**
 * Enforces constitution Principle I (content model alignment). Run with `npm run check:content`.
 * Relies on Node's built-in TypeScript type stripping (Node 22.18+).
 */

import fs from 'node:fs';
import path from 'node:path';

import { getAllSlugs, getPostBySlug } from '../lib/project-posts.ts';
import { PROJECT_GROUPS } from '../lib/projects.ts';

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, 'content', 'projects');
const ISO_DATE = /^\d{4}-\d{2}-\d{2}(T[\d:.]+(Z|[+-]\d{2}:\d{2})?)?$/;

const errors: string[] = [];
const warnings: string[] = [];

const files = fs.existsSync(CONTENT_DIR)
  ? fs.readdirSync(CONTENT_DIR).filter((name) => name.endsWith('.md'))
  : [];
const fileSlugs = files.map((name) => name.slice(0, -'.md'.length));

// Post media must live under public/projects/{slug}/ and exist on disk.
function checkMedia(slug: string, body: string, extra: readonly (string | undefined)[]): void {
  const refs = new Set<string>();
  for (const match of body.matchAll(/\]\((\/projects\/[^)\s]+)\)|src="(\/projects\/[^"]+)"/g)) {
    refs.add(match[1] ?? match[2]);
  }
  for (const ref of extra) {
    if (ref?.startsWith('/projects/')) refs.add(ref);
  }
  for (const ref of refs) {
    const mediaPath = ref.split(/[?#]/)[0];
    if (!mediaPath.startsWith(`/projects/${slug}/`)) {
      errors.push(`${slug}: media ${mediaPath} must live under public/projects/${slug}/`);
    } else if (!fs.existsSync(path.join(ROOT, 'public', mediaPath))) {
      errors.push(`${slug}: media file public${mediaPath} does not exist`);
    }
  }
}

// Frontmatter: title, description, and ISO date (parsing throws on missing or empty fields).
for (const slug of fileSlugs) {
  try {
    const post = getPostBySlug(slug);
    if (!post) {
      errors.push(`${slug}: getPostBySlug returned null for an existing file`);
      continue;
    }
    if (!ISO_DATE.test(post.date) || Number.isNaN(Date.parse(post.date))) {
      errors.push(`${slug}: "date" is not a parseable ISO date (${post.date})`);
    }
    // socialImage is skipped on purpose: it may point at a generated route (opengraph-image).
    checkMedia(slug, post.content, [post.heroVideo?.src, post.heroVideo?.poster]);
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error));
  }
}

// Listing rows: every journalSlug must match an existing post, once.
const seen = new Set<string>();
for (const group of PROJECT_GROUPS) {
  for (const entry of group.entries) {
    const { journalSlug } = entry;
    if (!journalSlug) continue;
    if (!fileSlugs.includes(journalSlug)) {
      errors.push(
        `"${entry.title}": journalSlug "${journalSlug}" has no content/projects/${journalSlug}.md`,
      );
    }
    if (seen.has(journalSlug)) {
      errors.push(`journalSlug "${journalSlug}" is used by more than one listing row`);
    }
    seen.add(journalSlug);
  }
}

for (const slug of fileSlugs) {
  if (!seen.has(slug)) {
    warnings.push(`${slug}: post is routable but not linked from PROJECT_GROUPS`);
  }
}

// getPostBySlug must reject unsafe slugs.
for (const unsafe of ['', '..', '../secret', 'a/b', 'a\\b', 'a..b']) {
  if (getPostBySlug(unsafe) !== null) {
    errors.push(`getPostBySlug(${JSON.stringify(unsafe)}) must return null`);
  }
}

// Static params come from getAllSlugs(), which must cover every file.
const routed = new Set(getAllSlugs());
for (const slug of fileSlugs) {
  if (!routed.has(slug)) errors.push(`${slug}: missing from getAllSlugs()`);
}

for (const warning of warnings) console.warn(`warn  ${warning}`);
for (const error of errors) console.error(`error ${error}`);

if (errors.length > 0) {
  console.error(`\ncheck:content failed with ${errors.length} error(s)`);
  process.exit(1);
}
console.log(`check:content ok (${fileSlugs.length} posts, ${seen.size} linked)`);
