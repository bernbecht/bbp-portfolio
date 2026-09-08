# Portfolio public copy review

Status: Copy suggestions preserved. Integration reverted at Bernardo's request.
Date: 2026-09-08

This is the complete proposed public UI copy pass. The integration was reverted;
the site retains its pre-integration copy. Source support means consistency with Bernardo's supplied records,
not independent verification. Long-form Markdown and its frontmatter remain unchanged.

## Sources

Paths below are relative to the user-supplied professional folder:
`/Users/bernardobechtold/obsidian-notes/job hunting v2`.

| ID | Source | Relevant sections |
| --- | --- | --- |
| CV | `Master CV.md` | Profile, Core Skills, Professional Experience, Education |
| AX | `STAR stories/Story 1 - Axonify and testing.md` | Situation, Architecture, Result, About the playwright solution / Cost problem |
| SH | `STAR stories/Story 3 - Shopify.md` | Action, Tradeoff, Result |
| COL | `STAR stories/Tell me about a time you collaborated closely with designers on a complex interaction.md` | Collaboration, bottom sheet implementation, result |
| SN | Repository: `docs/case-studies/shopify-mobile-store-editor-source-notes.md` | Approved historical notes; uncertain details remain labeled as such |

The master CV is the primary career record. Tailored application documents and job
postings were not used as additional evidence. Private contact details and unrelated
application information are excluded from this review.

## Proposed hero

- Role: **Senior frontend engineer**
- Headline: **I design and build interfaces for complex product workflows.** (10 words)
- Introduction: **I’m Bernardo, a senior frontend engineer with experience in interface design and design systems. My work includes mobile editing at Shopify and shared components and visual testing tools at Axonify.** (33 words)
- Remove the “Product thinking, expressed in code” eyebrow.
- Keep “See selected work” and “How I work”.
- Use **Brazil** for the hero and footer location, including mobile, per Bernardo’s correction.
- Remove availability wording and its green indicator; the sources do not establish current availability.
- Bottom labels: **01 · Interfaces**, **02 · Design systems**, **03 · Testing**.

Support: CV Profile and Axonify/Shopify entries; SH Action; SN for design ownership.
“Senior frontend engineer” follows the CV's profile and senior role history rather
than asserting current employment. The headline describes documented work.

## Proposed homepage sections

### /01 · Practice

Heading: **How I work**

Introduction: **I work through product constraints, interaction behavior, and implementation with designers and engineers.**

Remove the additional “Currently focused on complex, high-stakes product environments” sentence.

| Step | Title | Description | Support |
| --- | --- | --- | --- |
| 01 | Understand the constraints | I clarify the workflow, technical limits, and tradeoffs with the team. | SH Action/Tradeoff; COL |
| 02 | Define the interaction | I work through interface states, gestures, and accessibility before and during implementation. | COL; CV Axonify/Core Skills |
| 03 | Build and review | I build components, document their use, and add tests for shared behavior and appearance. | CV Axonify; AX Architecture |

These describe documented practice, without promising that every project follows an
identical process.

### /02 · Selected work

Heading: **Selected projects**

Keep “View all work”, case-study numbers, and “Read the story”.

| Card | Company/role label | Date | Title | Summary | Support |
| --- | --- | --- | --- | --- | --- |
| Shopify | Shopify · Design + frontend | 2022–2023 | Designing and building the mobile Store Editor bottom sheet | I designed and built a three-state bottom sheet that kept editing controls and the live preview available on small screens. | CV Shopify dates; SH Action; SN design and interaction notes |
| Axonify | Axonify · Design systems | 2025 | Building visual regression checks for shared components | I built a Playwright and Storybook workflow to review visual changes in pull requests without a paid visual testing service. | CV Axonify; AX Architecture and Cost problem; existing project year retained within CV employment period |

Use these same titles and summaries for the two active `lib/projects.ts` entries.
Keep slugs, links, dates, and inactive entries unchanged. Case-study titles inside
Markdown remain outside this UI pass.

### /03 · Experience

Heading: **Experience across product teams**

Introduction: **I’ve worked at Shopify, SAP, CI&T, and Axonify, across mobile interfaces, analytics tools, and design systems.**

Support: CV Professional Experience, specifically the corresponding four entries.
Keep the existing company links and logos; use “CI&T” for its accessible name.

### /04 · Toolkit

Heading: **Tools I use**

Introduction: **My work combines React and TypeScript with component documentation, visual testing, and accessibility practices.**

List: React, TypeScript, Node.js, Storybook, Playwright, Design tokens, Material UI,
Accessibility. All appear in CV Core Skills or Axonify responsibilities. Node.js is
included as a skill, without implying it was used on every featured project.

## Shared navigation and footer

- Keep navigation: **Work**, **Let’s talk**, and the home/name link.
- Remove footer eyebrow “/ Let’s make something”.
- Footer heading: **Get in touch**.
- Footer introduction: **Contact me to discuss a role or project.**
- Keep the existing email address, LinkedIn link, clock, copyright, and back-to-top control.
- Clipboard labels: **Copy email ↗**, **Email copied ✓**, **Copy unavailable**.
- Keep existing screen-reader success and failure messages.
- Remove “Available for select work” and its marker. Do not replace it with a current availability assertion.

These are functional/editorial changes. Email and LinkedIn match the CV. The clock
remains the existing São Paulo clock, not a claim established by the CV.

## Projects and metadata

- Projects page heading: **Projects**.
- Introduction: **Selected projects and implementation notes.**
- Group label: **Recent work** (retain).
- Keep breadcrumbs, dates, “Project link”, “Site home”, “Related page”, and article fallback messages.
- Root title: **Bernardo Bechtold | Senior Frontend Engineer**.
- Root description: **Bernardo Bechtold is a senior frontend engineer with experience in interface design, design systems, and visual testing. Explore selected projects and implementation notes.**
- Projects title: **Projects | Bernardo Bechtold | Senior Frontend Engineer**.
- Projects description: **Selected projects, timelines, and implementation notes by Bernardo Bechtold.**
- Article title suffix: **Bernardo Bechtold | Senior Frontend Engineer**.
- Person JSON-LD jobTitle: **Senior Frontend Engineer**.
- Reuse root/projects wording in their corresponding Open Graph and Twitter fields.
- Preserve article descriptions and article social metadata derived from frontmatter.

Support: CV Profile, Axonify responsibilities, and Core Skills. This removes the
separate UI/UX Designer job-title claim while preserving documented design experience.

## Claims omitted or qualified

| Claim | Source finding | Decision |
| --- | --- | --- |
| Shopify 10% mobile adoption | SH Result says adoption; CV Shopify and COL say merchant launch rate | Omit metric from UI summaries. These measures cannot be treated as interchangeable. Existing case-study prose is preserved for the separate editorial project |
| Axonify $10k/year saved | AX Result says savings; later Cost problem describes projected subscription expense at expected scale | Omit the number. State the supported implementation and absence of a paid testing service; do not equate avoided licensing with net savings |
| Independently employed / selectively available | CV does not establish current working arrangement or availability | Omit |
| High-stakes focus, obvious products, durable/resilient systems | Promotional or generalized interpretations | Replace with specific responsibilities |
| Shopify market strategy | Historical notes flag disclosure/accuracy questions | Omit from public UI summaries |
| 10+ years, 3.5M+ platform users, 50+ engineers | Present in CV but unnecessary for this concise pass | Omit; avoid implying individual reach or ownership |
| Current São Paulo residence | Existing site says São Paulo; CV only says Brazil | Retain existing location copy, do not call it newly verified |

## Approval record and integration checklist

Pending Bernardo's approval of this exact copy set. The supplied folder resolves the
source-access dependency but is not itself wording approval. The redesign plan's
Phase 3 explicitly requires submitting the copy review before changing site wording.

After approval:

- Apply this set to hero, homepage, footer, toolkit labels, company accessible name,
  active project listings, metadata, and Person JSON-LD.
- Replace all four section-label em dashes with middle dots.
- Require zero em dashes in shared public UI sources, excluding preserved long-form
  content and bespoke case-study components.
- Confirm no Markdown, frontmatter, route slug, or content schema changed.
- Run lint and build; complete the pending browser QA when a browser is connected.


### Subsequent decisions

Bernardo approved this copy set with the correction to use Brazil instead of São
Paulo. After integration, Bernardo requested restoration of the code from before
that copy pass while retaining this document. All copy-pass code changes, including
the location change, were reverted. The Brazil correction remains in these saved
suggestions for any future integration. Technical redesign changes remain intact.
