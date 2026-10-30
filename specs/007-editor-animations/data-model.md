# Data Model

This feature has no persisted data, API payloads, user data or database migrations.

## Geometry

`SheetState = collapsed | partial | full`.

`Geometry`: virtual viewport width 240, height 360; sheet height 336; snap openness `{collapsed: 0.16, partial: 0.50, full: 0.90}`. Openness `p` means fraction of the 360-unit frame exposed by the sheet, not fraction of the sheet's own height. Top coordinate `y = 360 × (1 − p)`. Sheet width fills the viewport; bottom overflow is clipped. Full means full editing mode within the miniature, leaving 36 units of preview/header visible. It is not a browser modal.

Validate finite dimensions >0, finite openness in [0,1], strictly ordered snap points, and sufficient sheet height for maximum exposed region (336 ≥ 324).

## Scenario

`ComparisonScenario`: id `slow-up | fast-up`; start openness 0.50; release openness 0.60; duration 900 ms or 180 ms; upward normalized release velocity 0.111111/s or 0.555556/s, derived from linear travel of 0.10. Destination rules and units are normative in motion-contract.md.

`MotionSample`: phase, scenarioId, openness for each panel, marker visibility, released flag and selected target. Pure function of active elapsed time, geometry and scenario. No DOM reads or random input.

`StateDemo`: id, destination openness (all start at collapsed 0.16), static caption and deterministic cycle timing. State ID and caption do not change during playback.

## Playback group

Fields: `reducedMotion` boolean, `documentVisible` boolean, `intersecting` boolean, `supported` boolean, `elapsedActiveMs` ≥0, `lastFrameTimestamp` nullable. Initial elapsed is 0; no scheduling before all eligibility checks complete.

Effective states, in precedence order:

1. `static`: reducedMotion or unsupported; no scheduled frame.
2. `suspended`: document hidden or group offscreen; keep sample and no scheduled frame.
3. `playing`: all gates eligible; exactly one frame callback chain per group.

Transitions:

| Event | State effect |
|---|---|
| Becomes hidden/offscreen | Freeze elapsed; clear timestamp and scheduled callback |
| Becomes visible/onscreen | Resume if eligible; initialize timestamp without adding suspended time |
| Reduced motion enabled | Stop; elapsed=0; render static variants |
| Reduced motion disabled | Resume automatically when eligible |
| Resize | Recompute scale only; normalized phase and position unchanged |
| Unmount | Cancel callback; remove all subscriptions/listeners/observers |

Multiple groups do not share elapsed time; the two comparison panels always do.
