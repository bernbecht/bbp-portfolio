## Summary

<!-- What changed and why. -->

## Constitution compliance

<!-- Rules live in .specify/memory/constitution.md. Check what applies, delete what does not. -->

- [ ] `npm run lint`, `npm run check:content`, and `npm run build` pass (CI runs them too)
- [ ] Content or route change: Principle I verified (`check:content` is green)
- [ ] Rendering, images, fonts, scripts, or dependencies changed: Lighthouse Performance is at least
      0.95 on affected routes (Principle VIII), result noted here
- [ ] New runtime dependency: justified here (Principle VI): <!-- name and the need it meets -->
- [ ] New `'use client'` component: justified here (Principle II): <!-- the client-only API it needs -->
- [ ] Rule changed: constitution amended in this PR (version bump and Sync Impact Report)
- [ ] Descriptive fact changed: `docs/reference.md` updated

## Interactive behavior (Principle VII)

<!-- Required when touching the theme toggle, sound, haptics, or experiments. Otherwise write N/A. -->

- [ ] Theme: toggle persists across reload, no flash of the wrong theme on load
- [ ] Sound: nothing plays on load, and it can be silenced
- [ ] Motion: behaves with `prefers-reduced-motion: reduce`
- [ ] Keyboard: control is reachable, named, and shows a focus-visible style
- [ ] Other: <!-- what you exercised and what you saw -->

## Deviations

<!-- Any principle intentionally not followed, and why. Otherwise write None. -->
