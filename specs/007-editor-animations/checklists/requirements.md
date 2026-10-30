# Feature Quality Checklist

## Documentation readiness

- [x] Two prioritized, independently testable user stories describe the requested scope.
- [x] Functional requirements and measurable success criteria are numbered.
- [x] Three state loops (all starting Collapsed) and a synchronized comparison have deterministic contracts.
- [x] Reduced motion, no script, visibility and cleanup are specified. Playback controls were removed on 2026-10-28 (accepted WCAG 2.2.2 deviation, spec FR-005).
- [x] Responsive, contrast, keyboard, screen-reader and performance acceptance are included.
- [x] Source limitations and all artistic/algorithm assumptions are disclosed.
- [x] Data, local component contracts, implementation tasks and validation guide are present.
- [x] No backend, production Shopify algorithm or repository stack is invented.

## Integration and completion gates

- [x] Real repository instructions, constitution and installed templates reconciled. (AGENTS.md followed; no constitution or templates exist; see research.md)
- [x] Proposed file paths mapped to actual project paths in all tasks. (research.md integration record)
- [x] Article content, existing tokens, insertion anchors and terminology inspected. (rule aligned to the article)
- [x] Required implementation and regression tests pass with recorded evidence. (32 Vitest, 5 Playwright, lint, tsc, build; see validation-report.md)
- [x] Both stories demonstrated independently and integrated into the article. (component tests mount each alone; both live on the case study page)
- [x] Reduced-motion alternative verified manually, including the live preference switch. (product owner, 2026-10-28)
- [x] No-script alternative verified manually. (product owner, 2026-10-28)
- [ ] Accessibility, responsive and performance criteria verified.
- [x] Visual reviewer confirms integrated appearance and editorial accuracy. (reviewed by the product owner, 2026-10-28)
- [ ] Final constitution check completed; validation-report.md has actual results.

Open on purpose, with the reason:

- Accessibility, responsive and performance: automated axe, width, zoom, layout shift and bundle checks pass. Still missing: screen reader, real device, reference-device frame capture, visual snapshots.
- Final constitution check: none exists; validation-report.md results are incomplete.
