# Theme CSS and token overrides

**When to read:** choosing/loading a compatible theme, App Studio export, custom token overrides, or forking a foundation preset.

## Theme choice — hard gate

**Before** installing `@viraui/foundation` or any `@fontsource-variable/*` packages, **ask the consumer**:

| Choice                  | Meaning                                                                                 | Next                                                                                                                           |
| ----------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Default Vira theme**  | Shipped `@viraui/foundation` preset (`vira`, `vira-condensed`, `sunburst`, `cinder`, …) | Install foundation + matching fonts — [foundation-exports.md](foundation-exports.md)                                           |
| **Custom (App Studio)** | CSS generated / exported from ViraUI App Studio                                         | Do **not** install foundation. Ask them to paste `theme.css` (or point at the ZIP entry). Follow **Studio custom path** below. |

Do **not** assume default. Do **not** install foundation or fonts until they answer.

Authority: `@viraui/react/specs/foundation/theme-topics.xml`. Preset paths → [foundation-exports.md](foundation-exports.md). Import order → `foundation/bootstrap.xml` / hub checklist.

## Defaults (after choice)

| Choice              | Default                                                              |
| ------------------- | -------------------------------------------------------------------- |
| Default theme path  | `@viraui/foundation/vira.css` (only after default answer)            |
| Custom theme source | Pasted Studio `theme.css` (preferred) or fork `vira.css`             |
| Override target     | Semantic groups (`--global-*`, `--space-*`, …) — not raw `--color-*` |
| Fonts               | Separate CSS matching `--font-family-*`; theme never loads fonts     |
| Scale edits         | Keep Vira radius/space/base ratios unless user asks to rebuild       |

## Checklist

- [ ] Asked default vs App Studio custom — answered before package installs
- [ ] One compatible theme CSS before any Vira component renders
- [ ] Semantic var names match `foundation/theme-topics.xml` (values may differ)
- [ ] Font CSS after theme, before preflight (packages match chosen theme)
- [ ] Custom work: change only requested tokens; leave others at Vira defaults
- [ ] Validate: `--global-*` resolve; font families match loaded faces

## Theme paths

| Path                        | Foundation? | Use                        |
| --------------------------- | ----------- | -------------------------- |
| Preset Vira brand           | Yes         | Default path / quick start |
| App Studio export           | No          | Pasted / ZIP `theme.css`   |
| Custom theme CSS (hand)     | No          | External design systems    |
| Future theme builder export | No          | Generated compatible CSS   |

## Semantic groups (override these)

| Group      | Pattern                                                                                                            | Purpose                                                                                                                                                                                                                                                        |
| ---------- | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Base       | `--base-*`                                                                                                         | Neutral ramp                                                                                                                                                                                                                                                   |
| Global     | `--global-*`                                                                                                       | Foreground, background, primary, muted, interactive, disabled, contrast                                                                                                                                                                                        |
| Highlight  | `--highlight-*`                                                                                                    | Status / decorative                                                                                                                                                                                                                                            |
| Effects    | `--effect-vibrancy`, `--effect-corner-shape`, `--effect-holofoil`, `--effect-shadows`, `--effect-fluid-typography` | Empty/unset = on, `initial` = off; brand holofoil defaults `initial`; shadows on → preflight `data-elevation*`; holofoil on → preflight `body::after` foil; fluid-typography on → Text/Title clamp prev→scale token (off locks `--font-scale-*` for that size) |
| Vibrancy   | `--vibrancy-blur`                                                                                                  | Glass blur amount (px input) for `data-vibrant`                                                                                                                                                                                                                |
| Radius     | `--radius-*`, `--corner-shape`                                                                                     | Radius scale + corner-shape. With `--effect-corner-shape` on, theme `corner-shape` can cap full/pill radius — raw CSS pills need local `corner-shape: unset` (consumer-owned). ViraUI sets internal `--__corner-shape` for token `full` / pills.               |
| Space      | `--space-*`                                                                                                        | Spacing scale                                                                                                                                                                                                                                                  |
| Typography | `--font-root-size`, `--font-heading-typescale`, `--font-body-typescale`, `--font-leading-*`, `--font-family-*`     | Root size (UA-default %), editable modular ratios, leading, families. `--font-scale-*` are **derived by preflight** (not theme overrides)                                                                                                                      |
| Motion     | `--duration-*`, `--easing-*`                                                                                       | Animation tokens → compose with **viraui-motion**                                                                                                                                                                                                              |

Raw `--color-{palette}-{step}` (`0`–`70` by tens) exist for presets; prefer semantic aliases.

## Default path (foundation preset)

Only after consumer picks **default**:

1. Install `@viraui/foundation` + font packages for the brand — [foundation-exports.md](foundation-exports.md).
2. Import preset CSS, then fontsource, then preflight.

```tsx
import '@viraui/foundation/vira.css';
import '@fontsource-variable/geist/wght.css';
import '@fontsource-variable/geist-mono/wght.css';
import '@viraui/react/preflight.css';
```

Also: `vira-condensed.css`, `sunburst.css`, `cinder.css` — [foundation-exports.md](foundation-exports.md).

## Studio custom path

Only after consumer picks **custom (App Studio)**:

1. **Ask** for the exported CSS — paste into chat, or path to `theme.css` from the Studio ZIP (`custom-viraui-theme.zip`).
2. **Write** it into the app (e.g. `src/vira-theme.css` or `app/vira-theme.css`).
3. **Detect fonts present in that CSS** (union of both):
   - `@font-face` `src` URLs containing `cdn.jsdelivr.net/fontsource/fonts/<id>:` or `fontsource/css/<id>:` → collect each `<id>`
   - `--font-family-heading`, `--font-family-body`, `--font-family-mono` (and any other `--font-family-*`): strip quotes and a trailing ` Variable`; kebab-case → candidate id (e.g. `Geist Variable` → `geist`, `Geist Mono Variable` → `geist-mono`, `Raleway Variable` → `raleway`)
   - **Skip** CSS generics / non-fontsource: `monospace`, `serif`, `sans-serif`, `system-ui`, `ui-sans-serif`, `ui-monospace`, `ui-serif`, `cursive`, `fantasy`, `inherit`, `initial`, `Arial`, `Helvetica`, etc.
4. **Install** each unique id as `@fontsource-variable/<id>` (variable fonts from Studio).
5. **Strip** Studio CDN `@font-face` quick-setup blocks from the saved file when replacing them with npm packages (banner in export says CDN faces are temporary). Keep `:root` / semantic tokens.
6. **Import** (JS side-effects in root entry):

```tsx
import './vira-theme.css'; // consumer-saved Studio CSS — not @viraui/foundation
import '@fontsource-variable/raleway/wght.css'; // example ids from step 3
import '@fontsource-variable/geist/wght.css';
import '@viraui/react/preflight.css';
```

7. Do **not** install `@viraui/foundation` on this path.

If CSS has no detectable fontsource fonts (generics only), skip font packages; families still must match whatever faces the app loads.

## Hand-fork custom theme (LLM / derived)

When not using Studio export:

1. Copy `@viraui/foundation/vira.css` (or read `@viraui/foundation/vira/nested`) as baseline — requires foundation installed for the copy source only, or paste from docs.
2. Change only what the user asked; keep other semantic vars at Vira defaults.

| Token group  | Unless user asks to rebuild…              |
| ------------ | ----------------------------------------- |
| `--base-*`   | Keep step count and lightness progression |
| `--radius-*` | Keep scale and relative ratios            |
| `--space-*`  | Keep scale and relative ratios            |

Targeted single-step tweaks (e.g. only `--space-m`) are fine.

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
  --space-m: 1rem;
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

| Mistake                                     | Fix                                                                            |
| ------------------------------------------- | ------------------------------------------------------------------------------ |
| Install foundation before asking            | Theme choice gate first                                                        |
| Use Studio CSS **and** install foundation   | Studio path skips foundation                                                   |
| Leave CDN `@font-face` as only font load    | Prefer `@fontsource-variable/<id>` npm imports                                 |
| Rename semantic vars in custom themes       | Keep documented names; change values only                                      |
| Load fonts from theme CSS alone             | Separate font CSS in bootstrap                                                 |
| Theme only raw `--color-*`                  | Override `--global-*`, `--space-*`, etc.                                       |
| Components before theme CSS                 | Fix root import order (`foundation/bootstrap.xml` / hub checklist)             |
| Blank-sheet custom theme                    | Fork `vira.css` or paste Studio export                                         |
| Rebuild radius/space/base without ask       | Keep Vira ratios                                                               |
| Author `--font-scale-*` in theme CSS        | Override `--font-*-typescale`; preflight derives sizes                         |
| Theme without `@viraui/react/preflight.css` | Import preflight after theme/fonts — `--font-scale-*` come from preflight only |
| Shift base neutrals via lightness only      | Prefer chroma/saturation when bases change                                     |
| `data-mode` as brand swap                   | Mode narrows scheme; brand = different theme CSS                               |

## Stop — validate

- [ ] Theme choice asked and answered before foundation/font installs
- [ ] Theme sheet defines required semantic groups from `foundation/theme-topics.xml`
- [ ] Import order: theme → fonts → preflight
- [ ] No renamed `--global-*` / `--space-*` keys
- [ ] Font family strings match loaded faces
