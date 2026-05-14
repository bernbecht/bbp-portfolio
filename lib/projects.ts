/**
 * Portfolio project listings: edit groups and entries here without touching page layout.
 */

export type ProjectEntry = Readonly<{
  title: string;
  period: string;
  href?: string;
  summary?: string;
  company?: string;
  tags?: readonly string[];
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
        company: 'Self',
        href: '/',
        tags: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Accessibility'],
        summary:
          'Personal site built with Next.js and Tailwind. Replace this copy with a real project description.',
      },
      {
        title: 'Design system rollout',
        period: '2023–2024',
        company: 'Acme Corp (mock)',
        href: 'https://example.com',
        tags: ['React', 'Design system', 'Storybook'],
        summary:
          'Mock client engagement: tokens, components, and documentation for product teams.',
      },
      {
        title: 'Internal tooling sprint',
        period: '2024',
        company: 'Northwind Labs (mock)',
        tags: ['Node.js'],
        summary: 'Short engagement with a single tag line—useful for layout checks.',
      },
      {
        title: 'Confidential engagement',
        period: '2022',
        company: 'Redacted Inc. (mock)',
        summary:
          'No public link or tags—row should show title, company, period, and summary only.',
      },
    ],
  },
  {
    monoLabel: '/side',
    title: 'Side projects',
    entries: [
      {
        title: 'CLI color helper',
        period: '2024',
        href: 'https://example.com',
        tags: ['Rust', 'CLI'],
        summary: 'Tags and summary, no company line—side project styling.',
      },
      {
        title: 'Weekend CSS art',
        period: '2023',
        company: 'Personal',
        summary: 'Company + summary only; no tags or outbound link in this mock row.',
      },
      {
        title: 'Bare title row',
        period: '2020',
        summary: 'Minimal mock: period + summary only.',
      },
    ],
  },
];
