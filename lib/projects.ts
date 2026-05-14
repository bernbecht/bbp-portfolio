/**
 * Portfolio project listings: edit groups and entries here without touching page layout.
 */

export type ProjectEntry = Readonly<{
  title: string;
  period: string;
  href?: string;
  summary?: string;
}>;

export type ProjectGroup = Readonly<{
  /** Optional small mono line above the section title (e.g. route-style label). */
  monoLabel?: string;
  /** Section heading shown on the projects page. */
  title: string;
  entries: readonly ProjectEntry[];
}>;

export const PROJECT_GROUPS: readonly ProjectGroup[] = [
  {
    monoLabel: '/recent',
    title: 'Recent work',
    entries: [
      {
        title: 'Portfolio site',
        period: '2025–Present',
        href: 'https://github.com',
        summary:
          'Personal site built with Next.js and Tailwind. Replace this copy with a real project description.',
      },
    ],
  },
  {
    monoLabel: '/side',
    title: 'Side projects',
    entries: [
      {
        title: 'Open-source experiment',
        period: '2024',
        summary: 'Placeholder entry—swap in real titles, links, and time ranges when you are ready.',
      },
    ],
  },
];
