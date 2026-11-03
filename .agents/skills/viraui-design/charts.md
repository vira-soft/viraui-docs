# Charts (`@viraui/charts`)

Compose data viz in **app code** from token-styled visx primitives. Package ships **no** `LineChart` / `BarChart` / `PieChart` / `DonutChart` / `RadarChart` / `ResponsiveChart`.

**Authority:** installed `@viraui/charts/specs/*` (index-first). This file is a router + install cheat sheet — not a second API encyclopedia.

## Specs first (mandatory)

1. Open `node_modules/@viraui/charts/dist/specs/index.xml` (export `@viraui/charts/specs/index.xml`).
2. Follow `activity-hints.xml` (`bootstrap`, `compose-chart`, `implement-domain`, `responsive-size`).
3. Load only named units (`foundation/*`, `components/<id>/*`, `patterns/compose-*.xml`).
4. Verify types / upstream visx docs **after** units. Stories = examples only.

Package `PROTOCOL.md` wins on discovery order. Skills must not restate prop tables that live in units.

## Install

```bash
pnpm add @viraui/charts react react-dom @visx/visx
```

Theme + `@viraui/react/preflight.css` via **viraui-setup**. Charts does **not** ship `--vui-charts-*` or theme CSS. Single visx peer = **`@visx/visx`** (meta). Do not install every `@visx/<pkg>` as separate peers.

Detail → specs `foundation/bootstrap.xml` + `foundation/exports.xml`.

## Import

```ts
import { LinePath, AxisBottom, GridRows, scaleLinear } from '@viraui/charts';
```

| Kind           | Examples                                                                | Behavior                                                        |
| -------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------- |
| Styled         | `LinePath`, `Bar`, `Axis*`, `Grid*`, `Tooltip`, `Legend*`, …            | Token prop defaults; consumer props win                         |
| Passthrough    | `scaleLinear`, `Group`, `useParentSize`, `ParentSize`, tooltip hooks, … | Re-export only — no Vira paint                                  |
| Preflight-safe | `ScaleSVG`                                                              | Charts wrapper (raw visx collapses under preflight `svg` rules) |

Domain units under `components/<id>/` (shape, axis, grid, tooltip, legend, responsive, …).

## Name collisions

Charts `Text` / `Stack` / `Grid` = **visx**. Specs: `foundation/collisions.xml`.

```ts
import { Stack as ViraStack } from '@viraui/react';
import { Stack as VisxStack, LinePath } from '@viraui/charts';
```

## Defaults & overrides

Specs: `foundation/defaults.xml` + domain `props.xml`. Override with the same props:

```tsx
<LinePath data={data} x={…} y={…} stroke="var(--highlight-acid)" />
```

| Surface                                  | Default paint                                                                                                                         |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Series stroke/fill                       | `--highlight-blue` (+ translucent fill). `Area`/`AreaClosed`: gradient + top edge by default; stacked = translucent path + `LinePath` |
| Grid / axis line / ticks                 | `--global-contrast`                                                                                                                   |
| Axis / legend / annotation chrome labels | `--global-muted`                                                                                                                      |
| Point/series numbers & labels (`Text`)   | `--global-foreground`                                                                                                                 |

Do **not** invent a charts CSS token layer or package composed chart.

## Mobile Cartesian (prefer)

On **mobile / narrow / touch**, all **Cartesian** charts (line, area, bar) prefer the same Health-style shell — do **not** default to desktop floating tooltips:

1. Open `foundation/usage.xml` + `patterns/compose-cartesian-mobile.xml` (default shell; swap series mark only).
2. Selection readout **above** the plot (eyebrow + value + unit + date).
3. Dense domain: scroll the category axis; value axis sticky outside the scrollport.
4. Less clutter: thin ticks/grids, scrubber + active mark; sticky touch selection (never clear on `pointerleave` for touch).

Desktop / wide hover cards stay on `compose-line` / `compose-area*` / `compose-bar*` + `TooltipWithBounds`.

## Compose (load patterns)

| Need                         | Specs unit                                                       |
| ---------------------------- | ---------------------------------------------------------------- |
| Line (desktop / wide hover)  | `patterns/compose-line.xml`                                      |
| Mobile Cartesian (default)   | `patterns/compose-cartesian-mobile.xml` + `foundation/usage.xml` |
| Area (single series)         | `patterns/compose-area.xml`                                      |
| Area step                    | `patterns/compose-area-step.xml`                                 |
| Area overlapping + gradient  | `patterns/compose-area-gradient.xml`                             |
| Area stacked + legend        | `patterns/compose-area-stacked.xml`                              |
| Area 100% stacked / expand   | `patterns/compose-area-stacked-expanded.xml`                     |
| Area dense daily             | `patterns/compose-area-dense.xml`                                |
| Area with Y axis labels      | `patterns/compose-area-axes.xml`                                 |
| Bar (simple vertical)        | `patterns/compose-bar.xml`                                       |
| Bar horizontal               | `patterns/compose-bar-horizontal.xml`                            |
| Bar clustered / multiple     | `patterns/compose-bar-multiple.xml`                              |
| Bar stacked + legend         | `patterns/compose-bar-stacked.xml`                               |
| Bar tooltip body variants    | `patterns/compose-bar-tooltip.xml`                               |
| Bar value labels             | `patterns/compose-bar-label.xml`                                 |
| Bar horizontal in-bar labels | `patterns/compose-bar-label-horizontal.xml`                      |
| Bar mixed-color horizontal   | `patterns/compose-bar-mixed-horizontal.xml`                      |
| Bar mixed + active outline   | `patterns/compose-bar-mixed.xml`                                 |
| Bar positive / negative      | `patterns/compose-bar-negative.xml`                              |
| Bar dense daily              | `patterns/compose-bar-dense.xml`                                 |
| Pie (simple + tooltip)       | `patterns/compose-pie.xml`                                       |
| Pie external value labels    | `patterns/compose-pie-label.xml`                                 |
| Pie in-slice labels          | `patterns/compose-pie-label-list.xml`                            |
| Pie + legend                 | `patterns/compose-pie-legend.xml`                                |
| Donut / center text          | `patterns/compose-pie-donut.xml`                                 |
| Pie concentric rings         | `patterns/compose-pie-stacked.xml`                               |
| Pie interactive selection    | `patterns/compose-pie-interactive.xml`                           |
| Radar (spider + tooltip)     | `patterns/compose-radar.xml`                                     |
| Radar vertex markers         | `patterns/compose-radar-dots.xml`                                |
| Radar stroke-only multi      | `patterns/compose-radar-lines.xml`                               |
| Radar value labels           | `patterns/compose-radar-labels.xml`                              |
| Radar grid variants          | `patterns/compose-radar-grid.xml`                                |
| Radar multi-series tooltip   | `patterns/compose-radar-multiple.xml`                            |
| Radar + legend               | `patterns/compose-radar-legend.xml`                              |
| Parent / window              | `patterns/compose-responsive.xml` + `components/responsive/*`    |

Activity `compose-chart` / `responsive-size` in `activity-hints.xml`. Responsive sizing: prefer `debounceTime={0}`; positive debounce only for many-chart / heavy UIs — ask if unsure (authority: `components/responsive/usage.xml`). CSS-capable part spacing (`LegendItem`/`LegendLabel` `margin`, tooltip padding, …): prefer `var(--space-*)` e.g. `margin="0 var(--space-s) 0 0"`; bare `px` only for fixed literals — plot `Group` margins stay numbers (authority: `foundation/usage.xml` + `components/legend/usage.xml`).

## Deferred

Brush, zoom, drag, bounds, heatmap, voronoi, threshold, stats, wordcloud, network, sankey, chord, geo, xychart, hard-coded Gradient\* presets, shape `Link*` — import `@visx/*` directly. Specs: `foundation/exports.xml`.

## A11y

Specs `foundation/a11y.xml` + domain `a11y`. Name the chart; token contrast for tooltip/legend. Full APG → **viraui-a11y**.

## Related

- Maintainer inventory: `vira-ui` `specs/017-charts-package/contracts/`
- Layout around chart → `@viraui/react/specs` (`Stack` / `Surface`)
