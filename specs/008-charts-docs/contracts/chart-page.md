# Contract: Chart type page

**Feature**: `008-charts-docs`
**Files**: `content/charts/{line,area,bar,pie,radar}.mdx`

## MUST

1. Frontmatter: `title`, `description` (no leaf `icon` required).
2. **No** Base UI Card (charts are `@viraui/charts` / visx compose, not Base UI wrappers).
3. Lead (≈2–3 short paragraphs) → thematic break → optional When to use / When not → `## Common examples` → `## Ask your agent` → optional `## Related` (last).
4. Omit Anatomy by default (compose-from-primitives, not compound `.` parts).
5. Each Common example = one demo + one teaching `tsx` fence in the Code tab. Fence = **full chart composition matching the preview** (scales, `svg`/`Group`, marks, axes/grid as shown) — not mark-only fragments. Omit mock data arrays and noisy props; name fixtures (`data`, `months`, `yMax`) as given. Never stack multiple plots in one preview.
6. Live demos wrap plot in minimal `ChartExampleFrame` (centered width only — no headline / trend / subtitle under the chart). Prefer plot-only chrome inside the sandbox too.
7. Keep distinct patterns as separate `###` examples (including curve, label, grid, indicator variants). `###` titles = pattern / use case (`09-docs-example-titles`).
8. Cartesian demos: sparse ticks (`numTicks={3}` on grids / Y when present); width-aware X `tickValues` via `thinDomainTicks` (or equivalent) for dense domains. Omit value `AxisLeft` unless the example teaches Y axis, horizontal category labels, or sticky scrub Y.
9. Code tab fences are real teaching `tsx`, not empty stubs or comment-only placeholders. Skip tooltip/hover wiring unless the example is tooltip-focused.
10. Ask-your-agent prompts = consumer intents (no token/prop dumps).

## MUST NOT

- Exhaustive export / prop inventories
- Storybook iframe embeds
- “What’s next” tours
