# Research: Get Started Utilities Page

**Feature**: `006-utilities-docs` | **Date**: 2026-09-18 (updated 2026-10-13)

## 1. Page delivery vehicle

**Decision**: Expandable folder `content/(design-system)/get-started/utilities/` (`meta.json` title Utilities, icon `WrenchScrewdriver`, `defaultOpen: false`). Children: `breakpoints.mdx` (title **Breakpoints**) and `direction.mdx` (title **Direction**). Update `001` IA tree. No flat `utilities.mdx` index.

**Rationale**: FR-001–003; discoverable opt-in helpers after Setup.

**Alternatives considered**: Expand Setup Breakpoints section — rejected (Setup overload). Put under Foundation — rejected (these are React helpers post-bootstrap, not token essays). Keep slug `use-breakpoints` — rejected in favor of title-aligned `breakpoints`.

## 2. Page outline

**Decision**:

1. **Breakpoints** — optional ViraUI-custom viewport branch helpers; Base UI section hands RTL to Direction and other built-ins to base-ui.com; live Examples for demos.
2. **Direction** — Base UI Card + thin how-it-works + ≤2 fences; transparent re-export of DirectionProvider / useDirection.

**Rationale**: FR-004–006; SC-001–003.

**Alternatives considered**: Tabs per utility on one page — YAGNI. Full Base UI API on Direction — rejected (drift).

## 3. Breakpoints editorial facts

**Decision**: Encode consumer facts aligned with package `breakpoints` units / `viraui-setup` / `viraui-design` composition notes:

| Topic | Fact |
| --- | --- |
| Job | Swap/hide React markup at named min-width matches |
| Prefer CSS | `@media` / container queries when layout-only |
| Defaults | extra-small 30em … extra-large 100em (hardcoded em, not theme tokens) |
| Custom map | Replaces entire default map |
| Wiring | Client provider; hook only under provider; prefer single-name read |

**Rationale**: FR-005; avoid drift from inventing thresholds.

**Alternatives considered**: Omit numeric defaults — weaker consumer usefulness. Paste props.xml — rejected (encyclopedia).

## 4. Direction editorial facts

**Decision**: Transparent Base UI re-export from `@viraui/react`. Provider feeds context only; pair with `dir` on portal ancestor (usually `html`). Two examples: RTL Slider subtree; `useDirection` probe. Full API → Base UI Direction Provider docs.

**Rationale**: User ask; DS meta `base_ui` owns URL; keep docs thin.

## 5. Setup handoff

**Decision**: One short sentence on Setup after overlay examples: other providers/utilities optional → link Breakpoints + Direction. No recipes on Setup.

**Rationale**: FR-007; SC-004; user ask.

**Alternatives considered**: Inline Breakpoints on Setup + Utilities duplicate — rejected.

## 6. Validation approach

**Decision**: Manual quickstart against FR/SC + `pnpm build` (link validation). Confirm both utility URLs + Setup links resolve.

**Rationale**: Same as `002`–`005` content features.
