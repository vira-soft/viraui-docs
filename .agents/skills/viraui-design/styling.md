# Styling

**When to read:** public props vs `className` vs `--vui-*`, elevation/shadows, z-index, or themeable overrides on Vira parts.

## Ladder (defaults, not a menu)

1. Public Vira props (source/types + guide).
2. Existing app styling via public `className`.
3. Documented `--vui-*` hooks.
4. Minimal custom CSS.
5. Inline `style` only for true runtime values that cannot map to a public prop or documented `--vui-*`.

Never use `style` for Vira-coverable box-model keys on Vira components (`blockSize` / `inlineSize` / `display` / `padding` / `margin` / `gap`) or themeable values (`color` / `radius` / shadows / elevation / z-index). Prefer props, then `className` (CSS module or Tailwind).

Layout props first: `Stack` gaps/alignment/`hPadding`/`vPadding`, Surface color/radius/padding, component visual props. Motion tokens → **viraui-motion** (no raw `ms` / `ease`).

## CSS hooks

Guide `properties.css` keys = public suffixes; `properties.react` links props via `refCss` / `refReact`. Derive `--vui-{css-contract-folder}-{suffix}` (contract folder ≠ always guide filename).

- `ButtonLink` / `IconButtonLink` share `--vui-button-*`.
- Compound hooks sit on the documented part root (e.g. `Dialog.Sheet`).

```css
.primaryAction {
  --vui-button-background: var(--global-primary);
  --vui-button-radius: var(--radius-pill);
}
```

```tsx
<Button className={styles.primaryAction}>Save</Button>
```

Only public `--vui-{folder}-*` are consumer hooks. Never set, override, or document `--__{folder}-*` as app hooks. Match registered syntax; set non-inheriting hooks on the public component/part root, not an ancestor wrapper. Do not hand-author `@property` for Vira hooks.

## Elevation and stacking

Shadows (`Elevator`) and `z-index` share layers `0`–`4`. Elevation = visual depth; `z-index` = stacking. Not interchangeable: `Elevator` never sets `z-index`. Preflight elevation needs `--effect-shadows` on the active theme (empty/unset = on, `initial` = off).

`Surface` has no `elevation` prop. Wrap a valid element child with `Elevator` (no extra DOM). Use `getElevationProps` on a host you already own. Raw `data-elevation*` only when those utilities do not fit — [custom-attributes.md](custom-attributes.md).

```tsx
<Elevator resting={1} hover={2}>
  <Surface color={1} radius="medium">
    {/* card */}
  </Surface>
</Elevator>
```

| Layer   | `resting` / `z-index` | Place here                          |
| ------- | --------------------- | ----------------------------------- |
| 0 plane | `0`                   | Page, body, non-lifted backgrounds  |
| 1       | `1`                   | Cards, fields, buttons              |
| 2       | `2`                   | Popover, Tooltip, non-modal sheets  |
| 3       | `3`                   | Sticky header/nav, floating actions |
| 4       | `4`                   | Modal Dialog/drawer, global Toast   |

Vira overlays already own layer 4 (`Dialog.Viewport` / `Toast.Viewport` `z-index: 4`; `Dialog.Sheet` `Elevator resting={4}`). Do not restyle them to “win” stacking. Sticky chrome stays at 3 — Dialog covers it on purpose. Promo/modal above the page → `Dialog`, not a custom overlay with a huge `z-index`.

Do not set `z-index` above `4` unless extremely necessary. In-tree exception: theme holofoil (`body::after` at `999`). App UI never copies `999` / `1000` / `9999` to beat Dialog.

## Loading and selectors

- Component CSS follows the JS import graph. Do **not** import component CSS or `*.props.css` in app bootstrap (missing styles → **viraui-setup**).
- Use only data hooks from the guide or [custom-attributes.md](custom-attributes.md).
- Do not target internal classes or infer stable state selectors from rendered markup.
- Prefer semantic theme vars (`--global-*`, `--space-*`, `--radius-*`, `--highlight-*`, `--duration-*`, `--easing-*`) over raw `--color-*` in overrides.

## Validation loop

1. Check public props on the target guide + source.
2. If covered → use props; omit equals-default.
3. Else check documented `--vui-*` (correct contract folder).
4. Else `className` / minimal CSS with theme tokens.
5. Re-check: no `--__*`, no invented `data-*`, no `z-index` > 4, no hand-rolled shadow.

## Gotchas

- Inline gap/padding/radius/color/sizing before checking props.
- `Surface elevation={…}` or hand-rolled `box-shadow` instead of `Elevator`.
- `z-index` `999` / `1000` / `2000` / `9999` to escape overlays; sticky header above Dialog.
- Setting `--vui-*` on wrappers and expecting non-inheriting hooks to flow.
- Inventing CSS prefix from co-located guide id; copying story styling as contract.
- Importing per-component CSS to “fix” unstyled UI.
- Overriding raw `--color-*` for general theming; `!important` battles with variants.

Machine refs: guide `properties`, `@viraui/react/theme-surface.json`, `@viraui/react/preflight-surface.json`.
