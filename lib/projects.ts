/**
 * Portfolio project listings: edit groups and entries here without touching page layout.
 */

export type ProjectEntry = Readonly<{
  title: string;
  period: string;
  href?: string;
  /** Matches `content/projects/{slug}.md` filename without extension. */
  journalSlug?: string;
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
    monoLabel: "/recent",
    title: "Recent work",
    entries: [
      {
        title: "How I stopped visual regressions",
        period: "2025",
        company: "Axonify",
        href: "/",
        journalSlug: "how-stopped-visual-regressions",
        tags: ["Accessibility", "Visual regression", "Playwright", "Storybook"],
        summary:
          "How I built an in-house visual regression pipeline using Playwright and Storybook, saving ~$10k/year and giving multiple teams the confidence to refactor freely.",
      },
      {
        title:
          "How a bottom sheet lifted mobile adoption by 10% on Shopify Store Editor",
        period: "2022–2023",
        company: "Shopify",
        href: "https://example.com",
        journalSlug: "10-percent",
        tags: ["Interaction design", "Mobile", "Shopify"],
        summary:
          "A case study in interaction design: solving screen real estate constraints without sacrificing functionality, in one of Shopify's most-used features.",
      },
    ],
  },
];
