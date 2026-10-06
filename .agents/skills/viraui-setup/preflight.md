# Preflight, data-mode, and layout attrs

**When to read:** importing preflight, setting bootstrap `data-*`, or debugging layers / mode / elevation / vibrancy at setup time.

Compose when/how for attrs in UI → **viraui-design** [custom-attributes.md](../viraui-design/custom-attributes.md). Authority: `@viraui/react/preflight-surface.json`.

## Defaults

| Choice    | Default                                                                          |
| --------- | -------------------------------------------------------------------------------- |
| Import    | `@viraui/react/preflight.css` after theme + fonts ([bootstrap.md](bootstrap.md)) |
| Mode      | Set `data-mode` on `<html>` when product uses explicit light/dark/inverted       |
| Elevation | Prefer `Elevator` / `getElevationProps` in React; attrs for raw DOM              |
| Vibrancy  | `data-vibrant` when theme sets `--effect-vibrancy` — not hand-rolled blur        |
| Layers    | `@layer viraui.preflight, viraui.components, viraui.overrides`                   |

## Checklist

- [ ] Theme + font CSS already loaded
- [ ] Side-effect import of preflight in root entry ([frameworks.md](frameworks.md))
- [ ] `data-mode` on `html`/`body`/wrapper if modes are product features
- [ ] Consumer `data-*` changes also update `preflight-surface.json` + **viraui-design** `custom-attributes.md`
- [ ] Validate: typography baseline applies; elevation/vibrancy respond when theme effects are on

## Import

```tsx
import '@viraui/react/preflight.css';
```

Layer order in preflight (re-declared atop each emitted component CSS): `viraui.preflight` → `viraui.components` → author `@layer viraui.overrides` (sibling, not nested). Unlayered app CSS beats all Vira layers.

## What preflight provides

| Module           | Purpose                                                                                 |
| ---------------- | --------------------------------------------------------------------------------------- |
| `modes.css`      | Runtime `color-scheme` hints                                                            |
| `core.css`       | Root baseline (`html` `font-size` ← `--font-root-size`), `--is-light-mode` registration |
| `typography.css` | Semantic HTML element typography                                                        |
| `elevations.css` | Shadow stacks and transitions                                                           |
| `layout.css`     | Flex grow/shrink data-attribute utilities                                               |
| `vibrancy.css`   | Theme-gated `data-vibrant` backdrop-filter                                              |

## data-mode

| Value      | Effect                                                              |
| ---------- | ------------------------------------------------------------------- |
| `light`    | Forces light `color-scheme` on subtree                              |
| `dark`     | Forces dark `color-scheme` on subtree                               |
| `inverted` | Flips `color-scheme` relative to active theme via `--is-light-mode` |

Set on `html`, `body`, or a subtree wrapper. Narrows color scheme only — does **not** replace theme CSS or swap brands ([theme.md](theme.md)). Product `auto` / system preference is app-owned.

## data-vibrant

Presence attribute. When theme sets `--effect-vibrancy`, preflight applies vibrancy `backdrop-filter`. `Surface` may translucify its fill. Prefer over hand-rolled `backdrop-filter`.

## data-no-link-style

Boolean on anchors to opt out of default preflight link styling (links inside buttons / custom chrome).

## Elevation attributes

When theme sets `--effect-shadows`, preflight applies `data-elevation*` stacks; `--effect-shadows: initial` disables shadows globally while attrs may remain.

| Attribute                  | Values                           | Effect                            |
| -------------------------- | -------------------------------- | --------------------------------- |
| `data-elevation`           | `0`–`4`                          | Resting box-shadow stack          |
| `data-elevation-hover`     | `0`–`4`                          | Hover elevation                   |
| `data-elevation-direction` | `bottom`, `top`, `left`, `right` | Cast direction (default `bottom`) |

Related props: `--shadow-color`, `--extra-shadow`, `--elevation-transition-duration`, `--elevation-transition-easing`.

## Flex (data-grow / data-shrink)

| Attribute             | Effect                                    |
| --------------------- | ----------------------------------------- |
| `data-grow="true"`    | `flex-grow: 1`, `--vira-flex-grow: 1`     |
| `data-grow="false"`   | `flex-grow: 0`, `--vira-flex-grow: 0`     |
| `data-shrink="true"`  | `flex-shrink: 1`, `--vira-flex-shrink: 1` |
| `data-shrink="false"` | `flex-shrink: 0`, `--vira-flex-shrink: 0` |

Omit when default flex behavior is fine.

## Fonts

Preflight sets `html { font-size: var(--font-root-size) }` then element typography from theme `--font-family-*` / `--font-scale-*`. Never loads remote fonts. Themes must expose `--font-root-size` (UA-default %, e.g. `100%` / `125%`).

## Gotchas

| Mistake                                             | Fix                                                                        |
| --------------------------------------------------- | -------------------------------------------------------------------------- |
| Elevation attrs without preflight                   | Import preflight after theme/fonts                                         |
| `data-mode` instead of loading theme CSS            | Mode ≠ theme; load compatible sheet first ([theme.md](theme.md))           |
| Expecting preflight to load fonts                   | Consumer font CSS in bootstrap                                             |
| Hand-rolled `backdrop-filter`                       | Use `data-vibrant` when `--effect-vibrancy` is on                          |
| Hand-rolled `box-shadow` while shadows effect is on | Use `data-elevation*` / `Elevator`                                         |
| New consumer `data-*` without skill/JSON sync       | Update `preflight-surface.json` + **viraui-design** `custom-attributes.md` |
| Nested `@layer viraui.overrides` inside components  | Sibling layer membership is the signal                                     |

## Stop — validate

- [ ] Preflight imported after theme + fonts
- [ ] `data-mode` values only `light` | `dark` | `inverted` (or omit)
- [ ] Effects gated by theme `--effect-*` behave as expected
- [ ] Cross-check attrs vs `preflight-surface.json` before inventing hooks

Also see: `@viraui/react/consumption.json`, `@viraui/react/theme-surface.json`.
