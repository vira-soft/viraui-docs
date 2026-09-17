# @viraui/foundation exports

**When to read:** installing foundation, picking a preset brand, or resolving CSS/JSON/type export paths.

## Defaults

| Choice        | Default                                                                          |
| ------------- | -------------------------------------------------------------------------------- |
| Preset brand  | `vira` → `@viraui/foundation/vira.css`                                           |
| Install?      | Only for presets / preset JSON/types — not required for custom themes            |
| Motion tokens | Nested JSON from the **same brand** as loaded CSS → **viraui-motion** `speed.md` |

`@viraui/react` does **not** depend on foundation at runtime. Compatible custom CSS alone is enough if it matches `@viraui/react/theme-surface.json` ([theme.md](theme.md)).

## Checklist

- [ ] Need a shipped brand look or preset token JSON/types → install `@viraui/foundation`
- [ ] Custom theme with semantic vars → skip foundation
- [ ] Import one `*.css` preset before fonts/preflight ([bootstrap.md](bootstrap.md))
- [ ] Match font packages to that brand's `--font-family-*`

## Preset brands

| Brand            | Character                                                  | CSS import                              |
| ---------------- | ---------------------------------------------------------- | --------------------------------------- |
| `vira`           | Default Vira look                                          | `@viraui/foundation/vira.css`           |
| `vira-condensed` | Tighter space; heading typescale 1.125                     | `@viraui/foundation/vira-condensed.css` |
| `sunburst`       | Warm amber; expanded radius/spacing; Merriweather headings | `@viraui/foundation/sunburst.css`       |
| `cinder`         | Cool indigo; zero radius; Geist Mono headings              | `@viraui/foundation/cinder.css`         |

Legacy alias: `@viraui/foundation/web.css` → same as `vira.css`.

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

| Scenario                                    | Install? |
| ------------------------------------------- | -------- |
| Preset Vira / condensed / sunburst / cinder | Yes      |
| Custom theme CSS with semantic vars         | No       |
| Types or JSON for preset tokens             | Yes      |
| Components only + external compatible CSS   | No       |

## Bootstrap example

```tsx
import '@viraui/foundation/cinder.css';
import '@fontsource-variable/geist-mono/wght.css';
import '@viraui/react/preflight.css';
```

## Gotchas

| Mistake                                             | Fix                                                   |
| --------------------------------------------------- | ----------------------------------------------------- |
| Treating foundation as required for `@viraui/react` | Optional; custom theme CSS is valid                   |
| Mixing brand CSS with another brand's nested JSON   | Same brand for CSS + nested token reads               |
| Using deprecated `vira/css` / `web` as new code     | Prefer `vira.css` / `web.css` aliases only for legacy |
| Wrong fonts for brand (e.g. cinder without mono)    | Match `--font-family-*` from that preset              |
| Deep-importing workspace Style Dictionary packages  | Foundation public exports only                        |

## Stop — validate

- [ ] Chosen CSS path resolves
- [ ] Import order: foundation CSS → fonts → preflight
- [ ] Nested/types path brand matches loaded CSS (if used)
