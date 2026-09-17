# Consumer `data-*`

**When to read:** mode islands, flex grow/shrink, elevation on raw DOM, vibrancy, or link chrome opt-out — before inventing equivalent CSS.

Stable hooks apps set for mode, layout, elevation, vibrancy, and link opt-out. Prefer these over inventing CSS. Require theme + `@viraui/react/preflight.css`.

## Authority (index-first)

1. `@viraui/react/specs/index.xml`
2. `@viraui/react/specs/foundation/attributes.xml` (source: `packages/react/src/core/specs/attributes.xml`)
3. Related: `foundation/elevation.xml`, `foundation/toggles.xml`

Skill prose is a pointer only — do not invent attributes missing from those units.

## Quick map (confirm in attributes.xml)

| Attribute                   | Typical values                   | Use                                         |
| --------------------------- | -------------------------------- | ------------------------------------------- |
| `data-mode`                 | `light`, `dark`, `inverted`      | Scope runtime color scheme                  |
| `data-no-link-style`        | presence                         | Keep custom chrome on an anchor             |
| `data-elevation`            | `0`–`4`                          | Resting shadow on raw DOM                   |
| `data-elevation-hover`      | `0`–`4`                          | Hover shadow                                |
| `data-elevation-direction`  | `bottom`, `top`, `left`, `right` | Shadow cast direction                       |
| `data-grow` / `data-shrink` | `true`, `false`                  | Flex growth/shrink **on that element only** |
| `data-vibrant`              | presence                         | Theme-gated backdrop vibrancy               |

**Default:** omit an attribute when default behavior is already correct. `data-mode="auto"` is app-owned — **not** implemented by preflight.

## React-first patterns

- Elevation on React nodes: prefer `Elevator` / `getElevationProps` — [styling.md](styling.md) + `foundation/elevation.xml`. `Surface` has no `elevation` prop. Raw `data-elevation*` only when those utilities do not fit.
- `data-vibrant` needs `--effect-vibrancy`. On `Surface`, omit `color` for a page-level frosted shell; pass `color` for a tinted frosted fill. Confirm Surface padding/radius in `components/surface/props.xml`.
- `data-elevation*` needs `--effect-shadows` — do not hand-roll `box-shadow`.

Per-component state attributes are separate contracts — only hooks documented in that component’s specs units.

## Checklist

- [ ] Attribute exists in published `foundation/attributes.xml`
- [ ] Equals-default attributes omitted
- [ ] Elevation on React nodes prefers `Elevator` / `getElevationProps`
- [ ] Theme effect tokens present when using elevation / vibrancy hooks
- [ ] No invented `data-*` for mode / shadow / flex / vibrancy

## Machine paths

- `@viraui/react/specs/foundation/attributes.xml`
- `@viraui/react/specs/foundation/elevation.xml`
- `@viraui/react/specs/foundation/toggles.xml`
