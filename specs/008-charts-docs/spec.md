# Feature Specification: Charts Documentation Area

**Feature Branch**: `008-charts-docs`

**Created**: 2026-11-03

**Status**: Active

**Input**: Third docs root for `@viraui/charts` — Get started (overview, setup, responsive, tooltips, overrides) plus flat Line / Area / Bar / Pie / Radar pages. Examples mirror Storybook with shared chart + data-info chrome.

## User Scenarios & Testing

### User Story 1 - Discover Charts as a docs root (Priority: P1)

A reader opens the docs root dropdown and finds **Charts** beside Design System and Components, with Get started pages and flat chart type pages under a Charts separator.

**Acceptance Scenarios**:

1. **Given** `content/meta.json`, **When** the site loads, **Then** a third root `charts` appears with title Charts.
2. **Given** the Charts sidebar, **When** expanded, **Then** Get started lists overview → setup → responsive → tooltips → overrides, and Charts separator lists line → area → bar → pie → radar (no category folders).

### User Story 2 - Add charts to a themed app (Priority: P1)

A reader on Charts Setup (already past design-system Setup) installs `@viraui/charts` + `@visx/visx`, pastes Setup/Verify prompts for a sample plot, and does not re-run the full design-system bootstrap.

### User Story 3 - Learn chart patterns from live examples (Priority: P1)

On each chart page (and responsive / tooltips / overrides), Common examples show live sandboxed demos in a shared frame (plot + data-info footer) with Preview/Code tabs. Near-duplicate Storybook stories are grouped; distinct patterns stay separate.

### User Story 4 - Consumer voice (Priority: P2)

Chart docs use AI-centric consumer voice; no Base UI Card (charts are not Base UI wrappers); no surface catalogs of every export.

## Requirements

- Update `contracts/ia-tree.md` for the Charts root and URLs.
- Chart pages follow ComponentPage order minus Base UI Card and (default) Anatomy.
- Shared `ChartExampleFrame`: minimal centered plot wrapper (no headline / trend / subtitle). One plot per example.
- Dependencies: `@viraui/charts`, `@visx/visx`, aligned `@viraui/react` / `@viraui/foundation`.
- Demos live under `src/components/demos/`, registered for MDX.

## Success

Site builds; Types check; Charts root navigable; representative examples render in sandbox for each chart page and Get started demo pages.
