# Component and Integration Contracts

These are local UI contracts, not HTTP endpoints. TypeScript notation communicates shape only; adapt to the actual host framework during T002.

```ts
type SheetState = 'collapsed' | 'partial' | 'full';
type StateAnimationsProps = { id: string; title?: string; className?: string };
type ComparisonProps = { id: string; title?: string; className?: string };
type EditorFrameProps = { openness: number; showMarker?: boolean; frameId?: string };
type PlaybackStatus = 'static' | 'suspended' | 'playing';
type PlaybackController = {
  dispose(): void;
  // subscribe returns an unsubscribe function; sampling does not force host-tree rerenders.
  subscribe(listener: (elapsedActiveMs: number) => void): () => void;
};
```

- `id` must be unique per mounted group and used for heading/description relationships. Invalid duplicate IDs are a development integration error.
- `EditorFrame` is decorative and never focusable. Its outer figure/section supplies the meaning. Clamp finite openness to the frame bounds; invalid nonfinite input renders the safe partial pose in production and reports a development assertion.
- `StateAnimations` renders a named section containing three figures, fixed labels, descriptions and no controls. All three frames start at Collapsed during playback and move to their own destination. Reduced motion renders destination poses.
- `VelocityPositionComparison` renders a named section with Position then Velocity figures, one shared scenario label, an always-available textual summary, and no playback controls. The outcome table is always visible; reduced-motion/no-script rendering includes a two-row outcome table (slow: partial/partial; fast: partial/full). The static visual uses the fast-case settled poses.
- There are no playback buttons. The comparison shows the text “Static illustration, reduced motion” when static.
- Do not use `role=dialog`, drag affordances, editable fields or fake commerce actions. Decorative sample content has `aria-hidden=true`; semantic captions stay outside it.
- Static HTML is canonical before hydration. If enhancement fails, it stays visible and controls remain absent. Avoid duplicate static/animated representations in the accessibility tree.
- Section insertion preserves host heading hierarchy, article width, routing, scroll position and content security policy. No global CSS selectors; scope styles to these components.
- No telemetry, network endpoints, external asset fetching or persisted preferences are part of the contract.
