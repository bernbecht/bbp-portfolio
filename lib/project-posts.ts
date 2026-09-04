/**
 * Project journal posts: Markdown files under `content/projects/{slug}.md`.
 * Slug is always the filename without `.md` (see `journalSlug` on `ProjectEntry`).
 */

import fs from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'projects');

export type ProjectPostFrontmatter = Readonly<{
  title: string;
  /** ISO 8601 string; used for ordering and metadata. */
  date: string;
  description: string;
  leadSectionBeforeHero?: boolean;
  heroDemo?: 'component-library';
  heroVideo?: Readonly<{
    src: string;
    poster: string;
    caption: string;
    ariaLabel: string;
  }>;
}>;

export type ProjectPost = ProjectPostFrontmatter &
  Readonly<{
    slug: string;
    /** Markdown body (without frontmatter). */
    content: string;
  }>;

function isSafeSlug(slug: string): boolean {
  if (slug.length === 0) return false;
  if (slug.includes('/') || slug.includes('\\') || slug.includes('..')) return false;
  return true;
}

function assertPostFrontmatter(
  slug: string,
  data: Record<string, unknown>,
): ProjectPostFrontmatter {
  const title = data.title;
  const date = data.date;
  const description = data.description;
  const leadSectionBeforeHero = data.leadSectionBeforeHero;
  const heroDemo = data.heroDemo;
  const heroVideo = data.heroVideo;

  if (typeof title !== 'string' || title.trim() === '') {
    throw new Error(`Invalid or missing "title" in content/projects/${slug}.md frontmatter`);
  }
  if (typeof date !== 'string' || date.trim() === '') {
    throw new Error(`Invalid or missing "date" in content/projects/${slug}.md frontmatter`);
  }
  if (typeof description !== 'string' || description.trim() === '') {
    throw new Error(
      `Invalid or missing "description" in content/projects/${slug}.md frontmatter`,
    );
  }
  if (
    leadSectionBeforeHero !== undefined &&
    typeof leadSectionBeforeHero !== 'boolean'
  ) {
    throw new Error(
      `Invalid "leadSectionBeforeHero" in content/projects/${slug}.md frontmatter`,
    );
  }
  if (heroDemo !== undefined && heroDemo !== 'component-library') {
    throw new Error(
      `Invalid "heroDemo" in content/projects/${slug}.md frontmatter`,
    );
  }
  if (heroVideo !== undefined) {
    if (typeof heroVideo !== 'object' || heroVideo === null || Array.isArray(heroVideo)) {
      throw new Error(
        `Invalid "heroVideo" in content/projects/${slug}.md frontmatter`,
      );
    }

    const video = heroVideo as Record<string, unknown>;
    const fields = ['src', 'poster', 'caption', 'ariaLabel'] as const;
    for (const field of fields) {
      if (typeof video[field] !== 'string' || video[field].trim() === '') {
        throw new Error(
          `Invalid or missing "heroVideo.${field}" in content/projects/${slug}.md frontmatter`,
        );
      }
    }

    return {
      title,
      date,
      description,
      ...(leadSectionBeforeHero ? { leadSectionBeforeHero } : {}),
      ...(heroDemo ? { heroDemo } : {}),
      heroVideo: {
        src: video.src as string,
        poster: video.poster as string,
        caption: video.caption as string,
        ariaLabel: video.ariaLabel as string,
      },
    };
  }

  return {
    title,
    date,
    description,
    ...(leadSectionBeforeHero ? { leadSectionBeforeHero } : {}),
    ...(heroDemo ? { heroDemo } : {}),
  };
}

function parsePostFile(slug: string, raw: string): ProjectPost {
  const { data, content } = matter(raw);
  const frontmatter = assertPostFrontmatter(slug, data as Record<string, unknown>);
  return {
    slug,
    ...frontmatter,
    content,
  };
}

function readPostFromDisk(slug: string): ProjectPost | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const raw = fs.readFileSync(filePath, 'utf8');
  return parsePostFile(slug, raw);
}

/**
 * Returns every post slug under `content/projects/*.md`, newest `date` first.
 */
export function getAllSlugs(): readonly string[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  const dirents = fs.readdirSync(CONTENT_DIR, { withFileTypes: true });
  const dated: { slug: string; time: number }[] = [];

  for (const dirent of dirents) {
    if (!dirent.isFile() || !dirent.name.endsWith('.md')) {
      continue;
    }
    const slug = dirent.name.slice(0, -'.md'.length);
    const post = readPostFromDisk(slug);
    if (!post) {
      continue;
    }
    const time = Date.parse(post.date);
    if (Number.isNaN(time)) {
      throw new Error(`Invalid ISO "date" in content/projects/${slug}.md`);
    }
    dated.push({ slug, time });
  }

  dated.sort((a, b) => b.time - a.time);
  return dated.map((d) => d.slug);
}

/**
 * Loads a single post by slug (filename stem). Returns `null` if missing or slug is unsafe.
 */
export function getPostBySlug(slug: string): ProjectPost | null {
  if (!isSafeSlug(slug)) {
    return null;
  }
  return readPostFromDisk(slug);
}
