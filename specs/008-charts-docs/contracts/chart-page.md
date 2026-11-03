# Contract: Chart type page

**Feature**: `008-charts-docs`
**Files**: `content/charts/{line,area,bar,pie,radar}.mdx`

## MUST

1. Frontmatter: `title`, `description` (no leaf `icon` required).
2. **No** Base UI Card (charts are `@viraui/charts` / visx compose, not Base UI wrappers).
3. Lead (≈2–3 short paragraphs) → thematic break → optional When to use / When not / Related → `## Common examples` → `## Ask your agent`.
4. Omit Anatomy by default (compose-from-primitives, not compound `.` parts).
5. Each Common example = one demo + one teaching `tsx` fence (imports + compose) in the Code tab. Never stack multiple plots in one preview.
6. Live demos wrap plot in minimal `ChartExampleFrame` (centered width only — no headline / trend / subtitle under the chart). Prefer plot-only chrome inside the sandbox too.
7. Keep distinct patterns as separate `###` examples (including curve, label, grid, indicator variants). `###` titles = pattern / use case (`09-docs-example-titles`).
8. Code tab fences are real teaching `tsx`, not empty stubs or comment-only placeholders.
9. Ask-your-agent prompts = consumer intents (no token/prop dumps).

## MUST NOT

- Exhaustive export / prop inventories
- Storybook iframe embeds
- “What’s next” tours
