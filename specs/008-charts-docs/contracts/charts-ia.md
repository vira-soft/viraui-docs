# Contract: Charts root IA

**Feature**: `008-charts-docs`
**Folder**: `content/charts/`
**URL prefix**: `/charts`

## Root meta

`content/charts/meta.json`:

- `title`: Charts
- `description`: short package pitch
- `icon`: `Chart3` (nav via `viraIconsPlugin`)
- `root`: `"docs"`
- `pages`: Get started separator + `...get-started`, Charts separator + `line`, `area`, `bar`, `pie`, `radar`

## Get started

`content/charts/get-started/meta.json` pages order:

1. `overview`
2. `setup`
3. `responsive`
4. `tooltips`
5. `overrides`

## Chart leaves

Flat MDX at `content/charts/{line,area,bar,pie,radar}.mdx` — no category folders.

## MUST NOT

- Cartesian / Pie / Radar category folders
- Tooltip or Overrides under the Charts separator (Get started only)
