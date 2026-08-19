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
  active?: boolean;
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
    // monoLabel: "/work",
    title: "Recent work",
    entries: [
      {
        title: "Building a flexible component library at Axonify",
        period: "2025",
        company: "Axonify",
        journalSlug: "axonify-component-library",
        tags: ["Design systems", "React", "Accessibility", "Component APIs"],
        summary:
          "How I balanced flexibility and consistency by standardizing interaction rules while giving product teams constrained, composable APIs.",
        active: false,
      },
      {
        title: "How I stopped visual regressions",
        period: "2025",
        company: "Axonify",
        // href: "/",
        journalSlug: "how-stopped-visual-regressions",
        tags: ["Accessibility", "Visual regression", "Playwright", "Storybook"],
        summary:
          "How I built an in-house visual regression pipeline using Playwright and Storybook, saving ~$10k/year and giving multiple teams the confidence to refactor freely.",
        active: true,
      },
      {
        title:
          "Designing and building Shopify's mobile Store Editor bottom sheet",
        period: "2022–2023",
        company: "Shopify",
        journalSlug: "shopify-mobile-store-editor",
        tags: ["Product design", "Front-end", "Mobile"],
        summary:
          "I designed and built a three-state bottom sheet that preserved live editing on small screens and contributed to a 10% increase in mobile Store Editor adoption.",
        active: true,
      },
    ],
  },
];
