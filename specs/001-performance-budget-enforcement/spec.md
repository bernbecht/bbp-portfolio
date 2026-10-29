# Feature Specification: Performance Budget Enforcement

**Feature Branch**: `001-performance-budget-enforcement`

**Created**: 2026-10-29

**Status**: Draft

**Input**: User description: "Performance budget enforcement. Implement automated measurement and enforcement of constitution Principle VIII (Core Web Vitals in the good range and Lighthouse Performance score of at least 0.95 on every public route, mobile profile, median of repeated runs). Scope: measure the current baseline on all public routes and record it; add automated measurement to CI that fails a PR when a route drops below the budget, with thresholds derived from the baseline; add real-user Core Web Vitals monitoring in production; fix whatever currently falls below the budget; update docs and the PR template so the manual-check fallback in Principle VIII can be replaced by the automated check. Out of scope: redesigning pages or changing content."

## Clarifications

### Session 2026-10-29

- Q: If a page cannot reach 0.95 without changing its visuals or content, what happens to it? → A: It gets a documented exception: the reason is recorded and its limit becomes the value measured after the fixes, which may not get worse. All other pages stay at 0.95.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Know where the site stands today (Priority: P1)

The site owner wants a recorded, repeatable measurement of how every public page performs right now, so that the budget in the constitution starts from facts instead of guesses.

**Why this priority**: Every other story depends on it. Thresholds cannot be set, and fixes cannot be prioritized, without a baseline.

**Independent Test**: Can be fully tested by running the measurement for all public pages and reading the recorded report. It delivers a ranked list of pages and metrics that are below budget.

**Acceptance Scenarios**:

1. **Given** the site is built in its production configuration, **When** the owner runs the measurement, **Then** a report lists, for every public page (home, projects index, each project write-up, experiments), the performance score and the three Core Web Vitals values.
2. **Given** the measurement is run twice on unchanged code, **When** the reports are compared, **Then** the reported scores differ by no more than a documented tolerance, because each page's result is the median of repeated runs.
3. **Given** a page is below the budget, **When** the owner reads the report, **Then** the page and the failing metric are identified.

---

### User Story 2 - Stop regressions before they merge (Priority: P1)

A contributor opens a pull request. If the change pushes any public page below the performance budget, the pull request is blocked with a clear explanation of which page and which metric failed.

**Why this priority**: This is the enforcement the constitution currently lacks. It is what turns Principle VIII from a manual request into a guarantee.

**Independent Test**: Can be fully tested by opening a pull request that deliberately degrades one page (for example, adds a large unoptimized image to it) and confirming the check fails, then confirming a clean pull request passes.

**Acceptance Scenarios**:

1. **Given** a pull request that keeps every public page within budget, **When** the automated check runs, **Then** it passes and shows the measured values.
2. **Given** a pull request that drops one page below the budget, **When** the automated check runs, **Then** it fails and names the page, the metric, the measured value, and the limit.
3. **Given** a pull request that adds a new public page, **When** the automated check runs, **Then** the new page is measured without anyone editing a list of pages by hand.
4. **Given** a one-off noisy measurement, **When** the check runs, **Then** the result is based on the median of repeated runs, so a single slow run does not fail an otherwise healthy pull request.

---

### User Story 3 - See how real visitors experience the site (Priority: P2)

The site owner wants to see Core Web Vitals collected from real visitors in production, per page, so that problems the lab measurement cannot reproduce (slow devices, slow networks) are visible.

**Why this priority**: Lab scores can pass while real visitors suffer. It complements the pull request check but does not block anything, so it ranks below it.

**Independent Test**: Can be fully tested by visiting the production site and confirming the visit's metrics appear in the monitoring view for that page.

**Acceptance Scenarios**:

1. **Given** the site is deployed to production, **When** a visitor loads and interacts with a page, **Then** that page's Core Web Vitals appear in the owner's monitoring view.
2. **Given** enough visits have accumulated, **When** the owner opens the monitoring view, **Then** the 75th percentile of each Core Web Vital is shown per page, so it can be compared with the "good" thresholds.
3. **Given** a visitor has asked not to be tracked, **When** they visit, **Then** no personal data is collected beyond what the existing analytics already collects.

---

### User Story 4 - Bring every page up to the budget (Priority: P1)

Every public page that the baseline shows as below budget is improved, without redesigning it or changing its content, so that the enforcement from Story 2 can be switched on with all pages passing.

**Why this priority**: Enforcement is meaningless, and would block every pull request, while pages are failing. It must land before or together with Story 2.

**Independent Test**: Can be fully tested by re-running the baseline measurement after the fixes and confirming every page meets the budget.

**Acceptance Scenarios**:

1. **Given** the baseline lists pages below budget, **When** the fixes are applied, **Then** a new measurement shows every public page at or above a 0.95 performance score and with all three Core Web Vitals in the "good" range.
2. **Given** the fixes are applied, **When** a visitor views any page, **Then** its layout, copy, and imagery look the same as before.
3. **Given** a page's experiment or video is heavy, **When** a visitor loads the page, **Then** the page becomes usable before the heavy asset finishes loading.

---

### User Story 5 - Documentation and checklist match the automation (Priority: P3)

A contributor reading the project documentation and the pull request template sees the automated check described as the way the budget is verified, and no longer is told to run a manual check.

**Why this priority**: It keeps the written rules honest, but it only matters after the automation exists.

**Independent Test**: Can be fully tested by reading the constitution's enforcement note, the reference document, and the pull request template and confirming none of them ask for a manual measurement.

**Acceptance Scenarios**:

1. **Given** the automated check is live, **When** a contributor reads the performance principle, **Then** its enforcement note describes the automated check instead of the manual fallback.
2. **Given** the reference document, **When** a contributor looks for how to run the measurement locally, **Then** the command, the pages covered, and the budget values are documented.
3. **Given** the pull request template, **When** a contributor fills it in, **Then** the manual performance checkbox is gone or replaced by a note that the check runs automatically.

---

### Edge Cases

- A measurement run fails to start or a page returns an error: the check MUST fail loudly, never pass silently with no data.
- A page sits just under the threshold and the median wobbles between runs: the tolerance and number of runs are documented, and the check uses the median rather than a single run.
- A pull request changes only documentation or content text: the check still runs, so a content change that bloats a page (for example, a large new image in a write-up) is caught.
- A new write-up is added with a heavy video: the page is measured automatically and can fail the check, so the author must fix it or justify a deviation.
- The monitoring service is unreachable for a visitor: the page still loads and works normally.
- A contributor needs to ship a page that is knowingly over budget: the constitution's deviation process applies, and the exception is visible in the pull request.
- A page cannot reach the budget without a redesign or content change: it receives a documented exception (reason recorded, limit set to its post-fix measurement), and the check fails if that page gets worse than its recorded limit.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The project MUST provide a single command that measures every public page and reports, per page, the performance score and the three Core Web Vitals (largest content paint, interaction responsiveness, layout shift).
- **FR-002**: The measurement MUST simulate a mobile visitor and MUST report the median of at least three runs per page.
- **FR-003**: The set of pages measured MUST include the home page, the projects index, every project write-up, and the experiments page, and MUST pick up new write-ups automatically.
- **FR-004**: The baseline results MUST be recorded in the repository documentation, with the date and the code version they were taken from.
- **FR-005**: The automated check MUST run on every pull request and on pushes to the main branch, and MUST fail when any measured page has a performance score below 0.95 or a Core Web Vital outside Google's "good" range.
- **FR-006**: A failing check MUST state the page, the metric, the measured value, and the limit.
- **FR-007**: The check MUST fail, not pass, when no measurement data could be produced.
- **FR-008**: Any numeric threshold stricter than the constitution's budget MUST be derived from the recorded baseline and documented with its reason.
- **FR-009**: Real-user Core Web Vitals MUST be collected in production for every public page, and the 75th percentile per page MUST be viewable by the site owner.
- **FR-010**: Real-user monitoring MUST NOT delay page rendering noticeably, MUST NOT break the page if the monitoring service is unreachable, and MUST NOT collect personal data beyond what current analytics collects.
- **FR-011**: Every public page found below budget in the baseline MUST be brought within budget without changing its visual design or content.
- **FR-011a**: A page that cannot reach the budget under FR-011 MUST be listed as an exception with a written reason. Its limits become the values measured after the fixes, the check MUST fail if the page falls below them, and every other page MUST keep the full budget. The list of exceptions MUST be documented in the reference document.
- **FR-012**: Heavy assets (video, interactive experiments) MUST NOT prevent the page from becoming visible and usable before they finish loading.
- **FR-013**: The constitution's performance principle, the reference document, and the pull request template MUST be updated so the manual-check fallback is replaced by the automated check.
- **FR-014**: The constitution amendment MUST follow the project's amendment rules (version bump and sync impact report).
- **FR-015**: Adding the measurement and monitoring capabilities MUST respect the dependency rule in the constitution: each new dependency is justified in the pull request by a need the current stack cannot meet.

### Key Entities

- **Public page**: A route a visitor can open. Has a path and a source (fixed page, or write-up generated from content).
- **Budget**: The pass/fail limits for a page: minimum performance score and the "good" range for each Core Web Vital. Stored once and referenced by the check and the documentation.
- **Exception**: A page-specific budget with a written reason, whose limits are the page's post-fix measurement. It can only be tightened, not loosened, without a constitution-level justification.
- **Measurement report**: One run's output for one page: score, three vitals, date, code version, and number of runs behind the median.
- **Baseline**: The recorded measurement report for every page before the fixes, used to derive thresholds and to show improvement.
- **Field metric**: A Core Web Vital reported by a real visitor's browser, aggregated per page.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of public pages meet their budget in the automated check on the main branch: the full budget (score of at least 0.95 and all three Core Web Vitals in the "good" range) for every page without an exception, and the recorded exception limits for the rest. The number of exceptions is reported next to the result.
- **SC-002**: A pull request that degrades any public page below the budget is blocked 100% of the time in a deliberate-regression test, and a clean pull request passes.
- **SC-003**: The automated check finishes in under 10 minutes for the full set of pages, so contributors are not slowed down noticeably.
- **SC-004**: Repeated measurements of unchanged code vary by no more than 0.03 in performance score for any page.
- **SC-005**: Within one week of deployment, the owner can see the 75th-percentile Core Web Vitals for each public page that has received visits.
- **SC-006**: Adding a new write-up requires zero edits to any list of pages used by the check.
- **SC-007**: After the fixes, a side-by-side visual comparison of every public page before and after shows no intended change to layout, copy, or imagery.
- **SC-008**: No document or template still instructs contributors to run a manual performance check.

## Assumptions

- The site is deployed on its existing hosting platform, which already runs the current analytics, and real-user monitoring from the same provider is acceptable.
- "Public pages" means the routes in the current site: home, projects index, project write-ups, and experiments. Generated image routes and the sitemap and robots files are not measured.
- The 0.95 performance score and the "good" Core Web Vitals ranges from the constitution are the budget. Tighter thresholds are used only where the baseline shows consistent headroom, and are optional.
- Interaction responsiveness cannot be measured by a plain page load in the lab, so the lab check uses a proxy for it (for example, total blocking time), while the real-user data covers the true metric.
- Measurements run in a controlled environment on the production build, not against the live site, so results do not depend on network conditions to the hosting platform.
- Fixes are limited to loading behavior, asset delivery, and script weight. Redesigns and content changes are out of scope, per the feature description. Exceptions (FR-011a) are expected to be rare and are a last resort.
- Contributors already follow the existing pull request and amendment process from the constitution.
