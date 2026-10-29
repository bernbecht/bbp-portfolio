# Motion Contract — normative proposed defaults

## Coordinates and rendering

Use geometry from data-model.md. Increasing openness `p` moves upward; positive normalized velocity `v` means upward, in frame-heights per second. Translate the full sheet to `y=360(1−p)` inside a clipped 240×360 virtual frame. At rest: collapsed top=302.4, partial top=180, full top=36. Scale artwork uniformly to fit available width (maximum artwork width 240 CSS px); do not scale captions or controls. The underlying preview is stationary.

All phase durations use active time in milliseconds. Interpolate snap/reset/excursion phases with `E(u)=3u²−2u³`, clamped `u` in [0,1]. No overshoot, bounce, spring integration or random jitter. At adjacent phase boundaries the pose must match exactly. Hidden time is never included.

## Three state loops (revised 2026-10-28)

All three cards share one 4000 ms cycle and **start from the same Collapsed pose (p=0.16)**. Each then moves to its own destination, which shows that the three states are positions of one component. Labels never change.

| Card | Start p | Destination p | Meaning |
|---|---:|---:|---|
| Collapsed | 0.16 | 0.21 (small pulse) | Compact controls keep most preview visible |
| Partially expanded | 0.16 | 0.50 | Editing controls and store preview share space |
| Fully expanded | 0.16 | 0.90 | Expanded editing workspace |

| Active time | Behavior |
|---|---|
| 0–800 | Hold Collapsed (0.16) |
| 800–1500 | Ease to destination |
| 1500–3000 | Hold destination |
| 3000–3700 | Ease back to 0.16 |
| 3700–4000 | Hold Collapsed; next cycle begins at the identical pose |

No cursor is required. Static alternatives (server render, no script, reduced motion) show the exact destination poses: collapsed 0.16, partial 0.50, full 0.90. The loop repeats indefinitely while eligible; there are no playback controls (see FR-005 accepted deviation).

## Contrast

All colors derive from site tokens so both themes work. Required contrast: frame outline, preview area, sheet edge and every skeleton block must reach at least 3:1 against the surface they sit on (or against the adjacent surface for fills), measured on the resolved light and dark theme colors and recorded in the validation report. Skeleton blocks mix `--foreground` into `--background`; the exact percentages are tuned until the ratios pass.

## Release rules

Snap set S = [0.16, 0.50, 0.90]. Position rule chooses the nearest point to release openness. Equal-distance ties choose the lower openness. Thus boundaries are 0.33 and 0.70.

Velocity-aware rule: if `abs(v) < 0.45/s`, use the position rule. At or above that threshold, choose the endpoint in the velocity direction (full for upward, collapsed for downward), matching the case study. The position rule approximates the article's three drop zones. This rule is illustrative; it is not presented as Shopify's proprietary implementation.

Mandatory fixtures:

| Release p | Velocity /s | Position target | Velocity-aware target |
|---:|---:|---|---|
| 0.60 | +0.111111 | partial | partial |
| 0.60 | +0.555556 | partial | full |
| 0.60 | +0.45 | partial | full |
| 0.60 | −0.45 | partial | collapsed |
| 0.33 | 0 | collapsed | collapsed |
| 0.70 | 0 | partial | partial |
| 0.95 | +0.60 | full | full |
| 0.10 | −0.60 | collapsed | collapsed |
| 0.30 | +0.60 | collapsed | full |

Clamp finite release openness to [0,1]; reject nonfinite test inputs. Use explicit tie handling rather than unstable iteration order.

## Synchronized comparison cycle

Cycle length: 10000 ms. Both panels start partial at p=0.50. Both use the exact same linear gesture position at every pre-release sample. Slow and fast travel the same distance (0.10) but in different durations. Both panels within a scenario receive identical motion; the fast scenario is intentionally shorter than the slow scenario. Derive the velocity from that scenario's gesture duration, not an unrelated label.

| Time | Scenario / phase | Position panel | Velocity panel |
|---|---|---|---|
| 0–1000 | Slow: ready | Hold 0.50 | Hold 0.50 |
| 1000–1900 | Slow: drag | Linear 0.50→0.60 | Same |
| 1900 | Slow: release | v=+0.111111/s | Same |
| 1900–2500 | Slow: settle | Ease 0.60→0.50 | Same |
| 2500–4000 | Slow: result | Hold partial | Hold partial |
| 4000–4500 | Slow: reset | Hold 0.50 | Hold 0.50 |
| 4500–5000 | Fast: ready | Hold 0.50 | Hold 0.50 |
| 5000–5180 | Fast: drag | Linear 0.50→0.60 | Same |
| 5180 | Fast: release | v=+0.555556/s | Same |
| 5180–5780 | Fast: settle | Ease 0.60→0.50 | Ease 0.60→0.90 |
| 5780–8500 | Fast: result | Hold partial | Hold full |
| 8500–9200 | Fast: reset | Hold 0.50 | Ease 0.90→0.50 |
| 9200–10000 | Fast: ready for repeat | Hold 0.50 | Hold 0.50 |

Scenario label changes at 4500 ms and wraps at 10000 ms. Optional simple gesture dot is visible only during drag; it tracks the handle, is decorative, and disappears at release without pulsing. Outcome captions explain both cases permanently, so comprehension never depends on catching a 180 ms gesture.

Each sample computes `t = elapsedActiveMs mod 10000`. Phase intervals include their start and exclude their end; the next phase owns the exact boundary. At exact release, drag is complete, the marker is hidden and settling starts at p=0.60. At exact loop wrap both panels are at p=0.50. Screenshot tests sample phase boundaries directly, not by wall-clock delays.

## Static content and playback

Three state cards show their resting poses. Comparison shows fast-case results side by side, with visible text: “Same release position. Position chooses the nearest state (partial). Velocity also considers the fast upward release (full).” Include slow-case agreement in the static outcome table. Localize with the article.

Shared timestamp and active-time accumulation apply to both panels even when stacked. No independent timer or animation instance may choose a different scenario. Pause freezes every sampled property; automatic suspension resumes without accumulating hidden time. Preference changes and replay follow data-model.md.
