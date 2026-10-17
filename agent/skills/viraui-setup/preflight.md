# Preflight, data-mode, and layout attrs

**When to read:** importing preflight, setting bootstrap `data-*`, or debugging layers / mode / elevation / vibrancy at setup time.

Compose when/how for attrs in UI → **viraui-design** [custom-attributes.md](../viraui-design/custom-attributes.md).

## Authority (index-first)

1. `@viraui/react/specs/index.xml`
2. `@viraui/react/specs/foundation/attributes.xml`
3. Related: `modules.xml`, `elevation.xml`, `toggles.xml`, `bootstrap.xml`

Skill tables below are orientation only — confirm values and semantics in those units.

## Defaults

| Choice    | Default                                                                            |
| --------- | ---------------------------------------------------------------------------------- |
| Import    | `@viraui/react/preflight.css` after theme + fonts ([frameworks.md](frameworks.md)) |
| Mode      | Set `data-mode` on `<html>` when product uses explicit light/dark/inverted         |
| Elevation | Prefer `Elevator` / `getElevationProps` in React; attrs for raw DOM                |
| Vibrancy  | `data-vibrant` when theme sets `--effect-vibrancy` — not hand-rolled blur          |
| Layers    | `@layer viraui.preflight, viraui.components, viraui.overrides`                     |

## Checklist

- [ ] Theme + font CSS already loaded
- [ ] Side-effect import of preflight in root entry ([frameworks.md](frameworks.md))
- [ ] `data-mode` on `html`/`body`/wrapper if modes are product features
- [ ] Consumer `data-*` changes also update `core/specs/attributes.xml` + **viraui-design** `custom-attributes.md`
- [ ] Cross-check attrs vs `foundation/attributes.xml` before inventing hooks
- [ ] Validate: typography baseline applies; elevation/vibrancy respond when theme effects are on

## Import

```tsx
import '@viraui/react/preflight.css';
```

Layer order: `viraui.preflight` → `viraui.components` → author `@layer viraui.overrides` (sibling, not nested). Unlayered app CSS beats all Vira layers.

## What preflight provides

Confirm module list in `foundation/modules.xml`. Typical surface: font-scale derivation (`--font-scale-*` from typescale ratios), modes, core baseline (reset, body font, img/svg, button/fieldset, tables), typography (prose, lists, links, inline chrome), elevations, flex `data-grow`/`data-shrink`, vibrancy.

Compose agents: bare HTML lists/prose/tables are **already styled** — do not reinvent as app CSS. Discipline → **viraui-design** [preflight-baseline.md](../viraui-design/preflight-baseline.md) + `foundation/modules.xml`.

## Attribute pointer

Full attribute contracts → `foundation/attributes.xml`. Compose recipes → **viraui-design** [custom-attributes.md](../viraui-design/custom-attributes.md).

Key bootstrap hooks: `data-mode` (`light` \| `dark` \| `inverted`), `data-vibrant`, `data-elevation*`, `data-grow` / `data-shrink`, `data-no-link-style` (only way to opt out of preflight link chrome — class does not suppress), `data-layout-fixed` / `data-table-separators` on `table`. Product `auto` / system preference for mode is app-owned.

## Gotchas

| Mistake                                              | Fix                                                                                                                                   |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Elevation attrs without preflight                    | Import preflight after theme/fonts                                                                                                    |
| `data-mode` instead of loading theme CSS             | Mode ≠ theme; load compatible sheet first ([theme.md](theme.md))                                                                      |
| Expecting preflight to load fonts                    | Consumer font CSS in bootstrap                                                                                                        |
| Hand-rolled `backdrop-filter` / `box-shadow`         | Use `data-vibrant` / elevation hooks when theme effects are on                                                                        |
| New consumer `data-*` without skill/XML sync         | Update `core/specs/attributes.xml` + **viraui-design** `custom-attributes.md`                                                         |
| Expect class on `<a>` to drop link underline         | Opt out only with `data-no-link-style` (prose Text/Title-as-a keep underline)                                                         |
| Restyle `ul`/`ol` / invent table row borders         | Preflight owns lists + table baseline — compose via **viraui-design** [preflight-baseline.md](../viraui-design/preflight-baseline.md) |
| Third-party Tailwind/Bootstrap preflight beside Vira | Warn + ask; omit third-party reset — [css-framework-coexistence.md](css-framework-coexistence.md)                                     |

## Machine paths

- `@viraui/react/specs/foundation/attributes.xml`
- `@viraui/react/specs/foundation/bootstrap.xml`
- `@viraui/react/specs/foundation/modules.xml`
- `@viraui/react/specs/foundation/theme-topics.xml`
