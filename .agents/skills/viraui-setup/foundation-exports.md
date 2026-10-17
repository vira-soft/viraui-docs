# @viraui/foundation exports

**When to read:** after consumer picks **default** theme — installing foundation, picking a preset brand, or resolving CSS/JSON/type export paths.

## Install gate

Install `@viraui/foundation` **only** when the consumer chose the **default Vira theme** path ([theme.md](theme.md)). App Studio / custom CSS → skip this package.

## Defaults

| Choice        | Default                                                                          |
| ------------- | -------------------------------------------------------------------------------- |
| Preset brand  | `vira` → `@viraui/foundation/vira.css`                                           |
| Install?      | Only after default-theme answer — not for Studio/custom themes                   |
| Motion tokens | Nested JSON from the **same brand** as loaded CSS → **viraui-motion** `speed.md` |

`@viraui/react` does **not** depend on foundation at runtime. Compatible custom CSS alone is enough if it matches `@viraui/react/specs/foundation/theme-topics.xml` ([theme.md](theme.md)).

## Checklist

- [ ] Consumer answered **default** (not Studio custom) before install
- [ ] Need a shipped brand look or preset token JSON/types → install `@viraui/foundation`
- [ ] Custom / Studio theme with semantic vars → skip foundation
- [ ] Import one `*.css` preset before fonts/preflight (`foundation/bootstrap.xml` / hub checklist)
- [ ] Match font packages to that brand's `--font-family-*`

## Preset brands

| Brand            | Character                                                    | CSS import                              | Font packages (typical)                               |
| ---------------- | ------------------------------------------------------------ | --------------------------------------- | ----------------------------------------------------- |
| `vira`           | Default Vira look                                            | `@viraui/foundation/vira.css`           | `@fontsource-variable/geist` (+ `geist-mono` if used) |
| `vira-condensed` | Tighter space; heading typescale 1.125; body typescale 1.125 | `@viraui/foundation/vira-condensed.css` | `@fontsource-variable/geist`                          |
| `sunburst`       | Warm amber; expanded radius/spacing; Merriweather headings   | `@viraui/foundation/sunburst.css`       | `@fontsource-variable/merriweather`                   |
| `cinder`         | Cool indigo; zero radius; Oxanium                            | `@viraui/foundation/cinder.css`         | `@fontsource-variable/oxanium`                        |

Legacy alias: `@viraui/foundation/web.css` → same as `vira.css`.

Always verify `--font-family-*` in the chosen preset CSS and install matching `@fontsource-variable/*` packages. Skip CSS generics (`monospace`, `Arial`, …).

## CSS exports

```tsx
import '@viraui/foundation/vira.css';
```

Also: `vira-condensed.css`, `sunburst.css`, `cinder.css`. Deprecated aliases (still resolve): `@viraui/foundation/vira/css`, `@viraui/foundation/web`.

## JSON exports

| Path                                                   | Content                            |
| ------------------------------------------------------ | ---------------------------------- |
| `@viraui/foundation/vira/json`                         | Flat token JSON                    |
| `@viraui/foundation/vira/nested`                       | Nested token JSON (runtime lookup) |
| `@viraui/foundation/vira-condensed/json`, `.../nested` | Vira Condensed                     |
| `@viraui/foundation/sunburst/json`, `.../nested`       | Sunburst                           |
| `@viraui/foundation/cinder/json`, `.../nested`         | Cinder                             |

Use nested for theme pickers / debug panels. JS motion: `duration.*` / `easing.*` from the **same brand** as the CSS.

## Type exports

| Path                                      | Content                       |
| ----------------------------------------- | ----------------------------- |
| `@viraui/foundation`                      | `ThemeTypes` (type-only root) |
| `@viraui/foundation/vira/types`           | Vira brand unions             |
| `@viraui/foundation/vira-condensed/types` | Vira Condensed                |
| `@viraui/foundation/sunburst/types`       | Sunburst                      |
| `@viraui/foundation/cinder/types`         | Cinder                        |

Convenience unions include `colors`, `space`, `radius`, `vibrancy`, `effect` where emitted.

## When to install

| Scenario                                  | Install? |
| ----------------------------------------- | -------- |
| Consumer chose default + preset brand     | Yes      |
| App Studio exported `theme.css`           | No       |
| Custom theme CSS with semantic vars       | No       |
| Types or JSON for preset tokens           | Yes      |
| Components only + external compatible CSS | No       |

## Bootstrap example (default path)

```tsx
import '@viraui/foundation/cinder.css';
import '@fontsource-variable/oxanium/wght.css';
import '@viraui/react/preflight.css';
```

## Gotchas

| Mistake                                             | Fix                                                   |
| --------------------------------------------------- | ----------------------------------------------------- |
| Installing foundation before theme-choice ask       | Ask first — [theme.md](theme.md)                      |
| Treating foundation as required for `@viraui/react` | Optional; custom / Studio theme CSS is valid          |
| Mixing brand CSS with another brand's nested JSON   | Same brand for CSS + nested token reads               |
| Using deprecated `vira/css` / `web` as new code     | Prefer `vira.css` / `web.css` aliases only for legacy |
| Wrong fonts for brand (e.g. cinder without oxanium) | Match `--font-family-*` from that preset              |
| Deep-importing workspace Style Dictionary packages  | Foundation public exports only                        |

## Stop — validate

- [ ] Default theme answer recorded before install
- [ ] Chosen CSS path resolves
- [ ] Import order: foundation CSS → fonts → preflight
- [ ] Nested/types path brand matches loaded CSS (if used)
