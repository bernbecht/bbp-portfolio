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

## Section-by-section revision history

This review preserves the original proposals above. Record subsequent wording and
its rationale here as each section is discussed. Later confirmed decisions supersede
earlier proposals for the same element. Discussion does not change site code.

### Review opened: 2026-09-08

- Bernardo requested a guided review, one section at a time, with questions and an
  additional history section for modifications.
- Start with the hero, then practice, selected work, experience, toolkit, navigation
  and footer, and projects/metadata.
- Brazil remains the previously confirmed location correction.
- Hero role, headline, introduction, availability, and supporting labels are open
  for this review. No new wording decision has been made yet.

### Revision 1: Bernardo's section feedback — 2026-09-08

These decisions supersede the conflicting original proposals above. They are
recorded for the copy review; site implementation remains pending.

#### Hero

- Keep the current availability wording and dot. Bernardo explicitly confirmed
  this preference; the earlier recommendation to remove them is superseded.
- Do not mention companies in the introduction.
- Use Brazil for the location, including the mobile version.
- Exact introduction wording remains open, as do the role, headline, eyebrow,
  and supporting labels from the ongoing hero review.

#### Practice

- Keep the current headline: **The best interface is only half the job. The other
  half is making it durable.**
- Keep the current introduction: **I move between product intent, interaction
  design, and production code—closing the gaps where good ideas usually lose
  their shape.**
- Remove **Currently focused on complex, high-stakes product environments.**
- Use a neutral tone in the steps, avoiding repeated “I”. Exact step wording
  remains open; the original first-person proposals are superseded.
- Preserving this introduction takes precedence over the earlier blanket
  zero-em-dash recommendation.

#### Selected work

- Remove the additional section headline. Retain the Selected work section label
  and View all work link.
- Match featured project titles to their corresponding titles on the Work
  (`/projects`) page. Current listing titles are:
  - **Designing and building Shopify's mobile Store Editor bottom sheet**
  - **How I stopped visual regressions**
- Keep the style and substance of the current summaries. Limit revisions to the
  difficult-to-substantiate results, particularly 10% adoption and ~$10k/year.
  Removing a number must not leave an equally unsupported outcome claim.
- Review those targeted revisions across featured cards and active Work listings;
  the earlier wholesale summary rewrites are superseded. Exact wording is pending.

#### Experience

- Keep the current introduction: **I've worked across product, design, and
  engineering, building interfaces and foundations used in real production
  environments.**
- Find a more informative heading with personality. Bernardo finds the current
  **From global platforms to growing product teams.** uninformative, and the
  proposed **Experience across product teams** too bland.
- Replacement heading remains open.

#### Toolkit

- Find a more informative heading with personality. Bernardo finds the current
  **Design judgment, engineering depth.** uninformative, and **Tools I use** too
  bland.
- Replacement heading remains open. No new decision on the introduction or tool
  labels was made in this feedback.

#### Shared navigation and footer

- Keep the current footer as the baseline, including **Have a complex idea?**,
  availability wording and dot, and existing controls.
- Replace the eyebrow **/ Let's make something**; exact wording remains open.
- Use the proposed role/project invitation as the basis for a friendlier
  introduction. **Contact me to discuss a role or project.** is direction, not
  final wording.
- Change the displayed location from São Paulo to Brazil, consistent with the hero.
  The clock's existing timezone can remain unchanged.
- No additional navigation changes were requested.

#### Next discussion: hero introduction

Candidate for discussion, not approved:

> I'm Bernardo, a frontend engineer with a designer's eye. I build clear
> interfaces and the systems that help teams keep them consistent as products grow.

This retains the personal design-and-engineering framing of the current copy,
removes company references, and describes the work more concretely.

### Revision 2: Hero introduction approved — 2026-09-08

Bernardo approved the introduction proposed in Revision 1:

> I'm Bernardo, a frontend engineer with a designer's eye. I build clear
> interfaces and the systems that help teams keep them consistent as products grow.

This replaces the original company-specific introduction proposal. Availability
and its dot remain; the displayed location will be Brazil. This approval concerns
the introduction only; other open hero wording still needs review. Site code has
not been changed.

### Revision 3: Hero headline approved — 2026-09-08

Bernardo felt the current headline, **I make complex products feel obvious.**,
was too strong and did not feel confident making that claim.

Approved replacement:

> Thoughtful interfaces, from design to code.

This supersedes both the current headline and the original review's proposed
headline. It describes a focus connecting design and engineering without
promising an outcome. Site code has not been changed.

### Revision 4: Hero role label approved — 2026-09-08

Bernardo approved **Senior frontend engineer** as the hero role label, replacing
**Independent design engineer**. The role is explicit; the approved headline and
introduction communicate the design experience. Site code has not been changed.

### Revision 5: Hero eyebrow removal approved — 2026-09-08

Bernardo approved removing **Product thinking, expressed in code** from the hero.
The approved headline already connects design and code, making the eyebrow
redundant. Site code has not been changed.

### Revision 6: Hero supporting labels approved — 2026-09-08

Bernardo approved **01 · Interfaces**, **02 · Design systems**, and
**03 · Testing** as the hero's supporting labels, replacing **Interfaces ·
Systems · Outcomes**. These describe concrete areas of work.

The hero role, headline, introduction, eyebrow removal, supporting labels,
availability indicator, and Brazil location now have recorded decisions.
Site code has not been changed. The review moves to the practice steps, with
its current headline and introduction retained as recorded in Revision 1.

### Revision 7: Practice steps approved — 2026-09-08

Bernardo approved keeping the current step titles with these neutral descriptions:

| Step | Title | Description |
| --- | --- | --- |
| 01 | Frame the problem | Clarify the workflow, constraints, and tradeoffs before shaping the solution. |
| 02 | Design the behavior | Work through interaction states, gestures, and accessibility alongside the implementation. |
| 03 | Build the system | Build reusable components, document their use, and test their behavior and appearance. |

These supersede the original first-person step proposals. The current practice
headline and introduction remain, and the “Currently focused…” sentence will be
removed, as recorded in Revision 1. Site code has not been changed.

### Revision 8: Shopify selected-work summary approved — 2026-09-08

Bernardo approved this replacement for the homepage Shopify card summary:

> A three-state editing surface that kept editing controls and the live preview
> within reach on small screens.

This replaces the 10% mobile-adoption claim with a description of the interface's
behavior. The corresponding Work listing still needs its targeted summary wording
reviewed; this approval does not change long-form case-study content. Site code has
not been changed.

### Revision 9: Axonify selected-work summary approved — 2026-09-08

Bernardo approved this replacement for the homepage Axonify card summary:

> An in-house visual testing workflow that helped teams catch interface changes
> before shipping.

This replaces the savings and safer-refactoring claims with the workflow's
purpose. The corresponding Work listing still needs its targeted summary wording
reviewed. Site code has not been changed.

### Revision 10: Work-page summaries approved — 2026-09-08

Bernardo approved these targeted revisions to the active Work-page listings:

- **Shopify:** I designed and built a three-state bottom sheet that preserved live editing on small screens.
- **Axonify:** How I built an in-house visual regression pipeline using Playwright and Storybook to help teams review interface changes before shipping.

These remove the numerical outcome claims while retaining the listings' more
detailed descriptions. Homepage summaries remain as approved in Revisions 8 and 9;
featured titles will match the Work-page titles as recorded in Revision 1.
Long-form case-study content remains unchanged. Site code has not been changed.

### Revision 11: Experience heading provisionally accepted — 2026-09-08

Bernardo accepted this heading “for now”:

> Working at the intersection of design and engineering.

This is the provisional choice and can be revisited. Keep the current Experience
introduction as recorded in Revision 1.

Discussion history:

- **Building interfaces at Shopify, SAP, CI&T, and Axonify.** was rejected because
  the company names already appear on the cards.
- **A career connecting design and engineering.** had the desired connection,
  but “career” felt too strong.
- The accepted wording retains that connection with a more modest description
  of the work.

Site code has not been changed.

### Revision 12: Toolkit heading approved — 2026-09-08

Bernardo approved this Toolkit heading:

> From components to testing, the tools behind the work.

This supersedes both **Design judgment, engineering depth.** and the original
proposal **Tools I use**. The Toolkit introduction and tool labels remain open
for review. Site code has not been changed.

### Revision 13: Toolkit introduction retained — 2026-09-08

Bernardo approved keeping the current Toolkit introduction:

> Tools change. The goal stays the same: reduce uncertainty, make behavior
> explicit, and leave the product easier to evolve.

This supersedes the original proposed Toolkit introduction. The heading remains
as approved in Revision 12. Site code has not been changed.

### Revision 14: Footer eyebrow approved — 2026-09-08

Bernardo approved **/ Let's connect** as the footer eyebrow, replacing
**/ Let's make something**. Keep the existing **Have a complex idea?** heading,
as recorded in Revision 1. The friendlier role/project invitation remains open
for review. Site code has not been changed.

### Revision 15: Footer headline and introduction approved — 2026-09-08

Bernardo chose to move the role/project question into the headline and retain
the warm invitation as the introduction:

- **Eyebrow:** / Let's connect
- **Headline:** Have a role or project in mind?
- **Introduction:** I'd love to hear about it.

This supersedes the Revision 1 decision to retain **Have a complex idea?**.
The question appears only in the headline, avoiding consecutive questions.
The availability wording and dot remain, and the displayed location will be
Brazil, as previously agreed. Site code has not been changed.

### Revision 16: Projects page introduction approved — 2026-09-08

Bernardo approved the Projects page introduction:

> Selected projects and implementation notes.

This confirms the original proposal for this element. Search and social metadata
remain to be reviewed. Site code has not been changed.

### Revision 17: Root search and social metadata approved — 2026-09-08

Bernardo approved:

- **Title:** Bernardo Bechtold | Senior Frontend Engineer
- **Description:** Bernardo Bechtold is a senior frontend engineer with experience in interface design, design systems, and visual testing. Explore selected projects and implementation notes.

Use these for the root search metadata and corresponding social previews.
This confirms the original proposal for these elements. Site code has not been
changed.

### Revision 18: Projects search and social metadata approved — 2026-09-08

Bernardo approved:

- **Title:** Projects | Bernardo Bechtold
- **Description:** Selected projects and implementation notes by Bernardo Bechtold.

Use these for Projects page search metadata and corresponding social previews.
These supersede the original longer Projects title and description. Site code
has not been changed.

### Revision 19: Case-study browser title format approved — 2026-09-08

Bernardo approved this case-study browser title format:

> [Case-study title] | Bernardo Bechtold

This supersedes the original proposal to include Senior Frontend Engineer in
the article title suffix. Article titles and descriptions sourced from Markdown
remain unchanged. Site code has not been changed.

### Revision 20: Toolkit label normalization approved — 2026-09-08

Bernardo approved changing **Node** to **Node.js** and **Design Tokens** to
**Design tokens**, keeping the rest of the Toolkit list unchanged.

Final list: React, TypeScript, Node.js, Storybook, Playwright, Design tokens,
Material UI, Accessibility. Site code has not been changed.

### Revision 21: Specialized positioning approved — 2026-09-08

Bernardo liked **Senior UI Engineer · Design Systems** as the main role label.
This supersedes the **Senior frontend engineer** hero label approved in Revision 4.
He also requested retaining the frontend aspect in metadata to support discovery
by recruiters looking for frontend roles.

Exact revised metadata wording remains proposed, not approved:

- **Root title:** Bernardo Bechtold | Senior Frontend & UI Engineer
- **Root description:** Senior frontend and UI engineer specializing in design systems, accessibility, and frontend architecture. Explore Bernardo Bechtold's work and projects.

This metadata proposal preserves the familiar frontend role alongside the UI
specialization. Other positioning suggestions from the discussion, including a
revised hero introduction and supporting labels, remain unapproved; earlier
approved wording for those elements is retained pending review. Site code has
not been changed.

### Revision 22: Frontend-inclusive metadata approved — 2026-09-08

Bernardo approved the combination proposed in Revision 21:

- **Hero role:** Senior UI Engineer · Design Systems
- **Root search/social title:** Bernardo Bechtold | Senior Frontend & UI Engineer
- **Root search/social description:** Senior frontend and UI engineer specializing in design systems, accessibility, and frontend architecture. Explore Bernardo Bechtold's work and projects.

This supersedes the root metadata approved in Revision 17. Projects and case-study
metadata decisions remain unchanged. Retain “frontend” naturally in the visible
hero introduction; its exact revised wording still needs review. Site code has
not been changed.

### Revision 23: Specialized hero introduction approved — 2026-09-08

Bernardo approved:

> I'm Bernardo, a frontend and UI engineer focused on design systems and
> accessibility. I build interfaces, reusable components, and tools that help
> teams develop and test their UI.

This supersedes the introduction approved in Revision 2. It retains “frontend”
while making the design-systems and accessibility specialization explicit.
The hero role and root metadata remain as approved in Revision 22. Site code
has not been changed.

### Revision 24: Specialized hero supporting labels approved — 2026-09-08

Bernardo approved **01 · UI engineering**, **02 · Design systems**, and
**03 · Accessibility** as the hero's supporting labels.

These supersede **Interfaces · Design systems · Testing**, approved in Revision 6,
to align with the specialized positioning. Testing remains explicit in the hero
introduction and Axonify project. Site code has not been changed.
