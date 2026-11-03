# Contract: Charts Get started pages

**Feature**: `008-charts-docs`

## overview (`/charts/get-started/overview`)

Package intro for `@viraui/charts`: token-styled visx primitives, optional beside `@viraui/react`, peers, links to setup and chart pages. Short agent brief OK. `pageActions: false` optional like other instructional pages.

## setup (`/charts/get-started/setup`)

Same **form** as Design System Setup (lead → Requirements → Steps → Manual fallback). Different **job**: add charts to an already-themed ViraUI app — not a second full DS bootstrap / skills install.

1. Requirements: themed `@viraui/react` app (link `/get-started/setup`); package manager; coding agent; `@visx/visx` peer
2. Steps: install `@viraui/charts` + `@visx/visx` → Setup / Verify prompt tabs for a sample plot (fluid host + theme colors)
3. Manual fallback secondary (no extra CSS entry; import from package root)

Prompts stay consumer intents. Do not re-teach skills install, theme CSS order, fonts, or overlay roots — link `/get-started/setup`.

## responsive / tooltips / overrides

Instructional + Common examples: one plot per Example, minimal `ChartExampleFrame` (no under-chart chrome), teaching Code tab. Responsive previews use resizable `ViraSandbox`. Source stories: `charts-responsive`, `charts-tooltip`, `charts-overrides` (+ Line Mobile scrub on responsive).
