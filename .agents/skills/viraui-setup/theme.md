# Theme CSS and token overrides

**When to read:** choosing/loading a compatible theme, custom token overrides, or forking a foundation preset.

## Defaults

| Choice              | Default                                                              |
| ------------------- | -------------------------------------------------------------------- |
| Theme path          | `@viraui/foundation/vira.css`                                        |
| Custom theme source | Fork `vira.css` / `vira/nested` — do not start blank                 |
| Override target     | Semantic groups (`--global-*`, `--space-*`, …) — not raw `--color-*` |
| Fonts               | Separate CSS matching `--font-family-*`; theme never loads fonts     |
| Scale edits         | Keep Vira radius/space/base ratios unless user asks to rebuild       |

Authority: `@viraui/react/theme-surface.json`. Preset paths → [foundation-exports.md](foundation-exports.md). Import order → [bootstrap.md](bootstrap.md).

## Checklist

- [ ] One compatible theme CSS before any Vira component renders
- [ ] Semantic var names match `theme-surface.json` (values may differ)
- [ ] Font CSS after theme, before preflight
- [ ] Custom work: change only requested tokens; leave others at Vira defaults
- [ ] Validate: `--global-*` resolve; font families match loaded faces

## Theme paths

| Path                        | Foundation? | Use                      |
| --------------------------- | ----------- | ------------------------ |
| Preset Vira brand           | Yes         | Default / quick start    |
| Custom theme CSS            | No          | External design systems  |
| Future theme builder export | No          | Generated compatible CSS |

## Semantic groups (override these)

| Group      | Pattern                                                                               | Purpose                                                                                                                                                    |
| ---------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Base       | `--base-*`                                                                            | Neutral ramp                                                                                                                                               |
| Global     | `--global-*`                                                                          | Foreground, background, primary, muted, interactive, disabled, contrast                                                                                    |
| Highlight  | `--highlight-*`                                                                       | Status / decorative                                                                                                                                        |
| Effects    | `--effect-vibrancy`, `--effect-corner-shape`, `--effect-holofoil`, `--effect-shadows` | Empty/unset = on, `initial` = off; brand holofoil defaults `initial`; shadows on → preflight `data-elevation*`; holofoil on → preflight `body::after` foil |
| Vibrancy   | `--vibrancy-blur`, `--vibrancy-brightness`                                            | Glass params                                                                                                                                               |
| Radius     | `--radius-*`, `--corner-shape`                                                        | Radius scale + corner-shape                                                                                                                                |
| Space      | `--space-*`                                                                           | Spacing scale                                                                                                                                              |
| Typography | `--font-root-size`, `--font-scale-*`, `--font-leading-*`, `--font-family-*`           | Root size (UA-default %), sizes, leading, families                                                                                                         |
| Motion     | `--duration-*`, `--easing-*`                                                          | Animation tokens → compose with **viraui-motion**                                                                                                          |

Raw `--color-{palette}-{step}` (`0`–`70` by tens) exist for presets; prefer semantic aliases.

## Preset import

```tsx
import '@viraui/foundation/vira.css';
```

Also: `vira-condensed.css`, `sunburst.css`, `cinder.css` — [foundation-exports.md](foundation-exports.md).

## Custom theme (LLM / derived)

1. Copy `@viraui/foundation/vira.css` (or read `@viraui/foundation/vira/nested`) as baseline.
2. Change only what the user asked; keep other semantic vars at Vira defaults.

| Token group  | Unless user asks to rebuild…              |
| ------------ | ----------------------------------------- |
| `--base-*`   | Keep step count and lightness progression |
| `--radius-*` | Keep scale and relative ratios            |
| `--space-*`  | Keep scale and relative ratios            |

Targeted single-step tweaks (e.g. only `--space-medium`) are fine.

**Base / neutral color edits (only when requested):** prefer OKLCH chroma/saturation shifts; keep lightness aligned with Vira's ramp unless they ask to lighten/darken. If they did not ask for base changes, leave `--base-*` as in `vira.css`.

Brand/accent (`--global-*`, `--highlight-*`) may move more freely when requested; still inherit untouched groups.

```tsx
import './my-theme.css'; // before preflight
import '@viraui/react/preflight.css';
```

## Runtime overrides

After a full compatible sheet:

```css
:root {
  --global-primary: oklch(55% 0.2 250);
  --space-medium: 1rem;
}
```

Scoped wrappers work the same way.

## Runtime enhancements

| Goal                | Mechanism                                                                  |
| ------------------- | -------------------------------------------------------------------------- |
| Light/dark/inverted | `data-mode` on `html`/`body`/wrapper — [preflight.md](preflight.md)        |
| Brand swap          | Swap/inject another compatible theme CSS                                   |
| Token lookup in JS  | `@viraui/foundation/<brand>/nested` (motion: **viraui-motion** `speed.md`) |

Mode switching ≠ brand switching.

## Gotchas

| Mistake                                | Fix                                                  |
| -------------------------------------- | ---------------------------------------------------- |
| Rename semantic vars in custom themes  | Keep documented names; change values only            |
| Load fonts from theme CSS              | Separate font CSS in bootstrap                       |
| Theme only raw `--color-*`             | Override `--global-*`, `--space-*`, etc.             |
| Components before theme CSS            | Fix root import order ([bootstrap.md](bootstrap.md)) |
| Blank-sheet custom theme               | Fork `vira.css`; change only requested vars          |
| Rebuild radius/space/base without ask  | Keep Vira ratios                                     |
| Shift base neutrals via lightness only | Prefer chroma/saturation when bases change           |
| `data-mode` as brand swap              | Mode narrows scheme; brand = different theme CSS     |

## Stop — validate

- [ ] Theme sheet defines required semantic groups from `theme-surface.json`
- [ ] Import order: theme → fonts → preflight
- [ ] No renamed `--global-*` / `--space-*` keys
- [ ] Font family strings match loaded faces
