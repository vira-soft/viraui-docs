# Consumer `data-*`

**When to read:** mode islands, flex grow/shrink, elevation on raw DOM, vibrancy, or link chrome opt-out — before inventing equivalent CSS.

Stable hooks apps set for mode, layout, elevation, vibrancy, and link opt-out. Prefer these over inventing CSS. Require theme + `@viraui/react/preflight.css`.

**Machine authority:** `@viraui/react/preflight-surface.json` (diff skill map against that JSON before shipping attribute changes).

| Attribute                  | Values                           | Use                                                              |
| -------------------------- | -------------------------------- | ---------------------------------------------------------------- |
| `data-mode`                | `light`, `dark`, `inverted`      | Scope runtime color scheme; `inverted` contrasts a nested island |
| `data-no-link-style`       | presence                         | Opt out of preflight link chrome (only opt-out; class does **not** suppress) |
| `data-elevation`           | `0`–`4`                          | Resting shadow on raw DOM                                        |
| `data-elevation-hover`     | `0`–`4`                          | Hover shadow paired with resting elevation                       |
| `data-elevation-direction` | `bottom`, `top`, `left`, `right` | Shadow cast direction                                            |
| `data-grow`                | `true`, `false`                  | Force or disable flex growth                                     |
| `data-shrink`              | `true`, `false`                  | Force or disable flex shrinking                                  |
| `data-vibrant`             | presence                         | Theme-gated backdrop vibrancy                                    |

**Default:** omit an attribute when default behavior is already correct. `data-mode="auto"` is app-owned — **not** implemented by preflight.

## React-first patterns

```tsx
<Stack direction="row" columnGap="small" vAlign="center">
  <Icon data-shrink="false" />
  <Text data-grow="true">Flexible label</Text>
</Stack>

<Elevator resting={2} hover={3}>
  <Surface color={1}>{/* content */}</Surface>
</Elevator>
```

**Default for elevation on React elements:** `Elevator` or `getElevationProps`. `Surface` has no `elevation` prop. Raw `data-elevation*` only when those utilities do not fit. Layer pick and z-index cap → [styling.md](styling.md#elevation-and-stacking).

- `data-elevation*` needs `--effect-shadows` on the active theme — do not hand-roll `box-shadow`.
- `data-vibrant` needs `--effect-vibrancy` — do not hand-roll `backdrop-filter`.
- `data-no-link-style` = only opt-out for preflight link chrome (interactive color + animated underline). Class on `<a>` does **not** suppress. Prose `Text`/`Title` as `<a>` keep underline; chrome links (`ButtonLink`, `Chip`, `Menu.LinkItem`, custom Surface-as-a) set the attr.

Per-component state attributes are separate contracts — only hooks documented by that component’s guide; never infer from DOM output.

## Checklist

- [ ] Attribute exists in `preflight-surface.json` (or target guide for component-owned hooks)
- [ ] Equals-default attributes omitted
- [ ] Elevation on React nodes prefers `Elevator` / `getElevationProps`
- [ ] Theme effect tokens present when using elevation / vibrancy hooks
- [ ] No invented `data-*` for mode / shadow / flex / vibrancy

## Gotchas

- Inventing `data-mode="auto"` expecting preflight to resolve it.
- `Surface elevation={…}` instead of `Elevator` / `data-elevation*`.
- Hand-rolled `box-shadow` / `backdrop-filter` instead of elevation / vibrancy hooks.
- Inferring component state selectors from rendered markup.
- Using `data-no-link-style` on ordinary prose links.
- Setting elevation/`data-*` without theme + preflight loaded (**viraui-setup**).

Layout props → [layout.md](layout.md). Stacking layers → [styling.md](styling.md).
