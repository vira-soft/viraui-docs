# Research: Get Started Utilities Page

**Feature**: `006-utilities-docs` | **Date**: 2026-09-18

## 1. Page delivery vehicle

**Decision**: Expandable folder `content/get-started/utilities/` (`meta.json` title Utilities, icon `WrenchScrewdriver`, `defaultOpen: false`) listed after `mcp` in Get started nav. Child page `use-breakpoints.mdx` at `/get-started/utilities/use-breakpoints`. Update `001` IA tree. No flat `utilities.mdx` index.

**Rationale**: FR-001–003; user asked for dedicated page after MCP.

**Alternatives considered**: Expand Setup Breakpoints section — rejected (Setup overload). Put under Foundation — rejected (these are React helpers post-bootstrap, not token essays).

## 2. Page outline

**Decision**:

1. **Frontmatter** — as above.
2. **Lead** — optional helpers beyond Setup overlay shell; link Setup.
3. **Breakpoints** — when/not-when; named defaults; replace-map Callout; client wrap; TSX examples; specs/skill pointer.
4. **Base UI utilities** — short handoff to base-ui.com for peer built-ins; no recipes.

**Rationale**: FR-004–006; SC-001–003.

**Alternatives considered**: Tabs per utility — YAGNI (two sections). Full elevation/utilities catalog — out of scope.

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

## 4. Setup handoff

**Decision**: One short sentence on Setup after overlay examples: other providers/utilities optional → link `/get-started/utilities/use-breakpoints`. Remove any Breakpoints recipe from Setup.

**Rationale**: FR-007; SC-004; user ask.

**Alternatives considered**: Inline Breakpoints on Setup + Utilities duplicate — rejected.

## 5. Base UI handoff

**Decision**: One short section: Base UI built-ins (direction, focus, portals, …) → [base-ui.com](https://base-ui.com). Utilities documents ViraUI-custom helpers only.

**Rationale**: FR-006; peer docs are source of truth for Base UI APIs.

**Alternatives considered**: Keep RTL recipe on Utilities — rejected (not ViraUI-custom). Paste Base UI API — rejected (drift).

## 6. Validation approach

**Decision**: Manual quickstart against FR/SC + `pnpm build` (link validation). Confirm nav order mcp → utilities; Setup link resolves.

**Rationale**: Same as `002`–`005` content features.
