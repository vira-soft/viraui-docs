# Layout

**When to read:** page/section flex layout, Surface panels, Grid/Masonry/Bleed, or container queries on Vira roots.

## Default: Stack-first

Prefer Vira layout props before custom flex CSS.

```tsx
<Stack rowGap="medium" hPadding="large" vPadding="large">
  <Title render={<h2 />}>Section</Title>
  <Surface color={1} radius="medium" hPadding="medium" vPadding="medium">
    <Text>Body copy</Text>
  </Surface>
</Stack>
```

| Prop / pattern | Rule                                                                              |
| -------------- | --------------------------------------------------------------------------------- |
| `direction`    | Default column — omit `direction="column"`                                        |
| Gaps           | `rowGap` / `columnGap` (tokens)                                                   |
| Align          | `hAlign` / `vAlign`                                                               |
| Padding        | `hPadding` / `vPadding` — one token or `[start, end]`. **No** `padding` prop      |
| `fillChildren` | Opt-in; omit when children should not grow                                        |
| Semantics      | `Stack` / `Surface` are presentational — set semantic roots with `render`         |
| Nested radius  | `Surface radius="auto"` → concentric with nearest ancestor Surface radius/padding |

## Grid

- Bare `columns={N}` → fluid `1fr` tracks that fit the parent.
- `columns={N}` + explicit `colMinWidth` → fixed-breadth tracks; parent needs `overflow: auto` to scroll.
- Omit default `colMinWidth`. Passing it with `columns` opts into fixed-breadth.

## Elevation

`Surface` has **no** `elevation` prop. Layers, `Elevator`, z-index → [styling.md](styling.md#elevation-and-stacking).

## Container queries

`Stack` / `Surface` create named inline-size containers only with `enableContainer`. `Masonry` always exposes `masonry`.

```tsx
<Surface enableContainer>{/* queried descendants */}</Surface>
```

```css
@container surface (max-width: 24rem) {
  .details {
    display: none;
  }
}
```

Use `enableContainer` only when descendants need that component’s rendered inline-size (containment can affect nested Masonry cards). Prefer named containers over viewport media queries for component-local intent.

## Bleed and Masonry

- `Bleed amount="medium"` escapes matching inline padding; `Bleed full` spans viewport width.
- `Masonry` = read-only mixed-height content.
- `breakpointCols` keys = unitless CSS px minima against the Masonry **root**, not viewport breakpoints.
- Masonry column changes alter DOM / reading / keyboard order — avoid interactive collections inside.

## Checklist

- [ ] Layout via `Stack` / `Surface` / `Grid` props before custom flex
- [ ] No `Stack padding=…` or `Surface elevation=…`
- [ ] No explicit equals-default props
- [ ] Semantics via `render` + landmarks/headings, not Stack alone
- [ ] Card-local responsive → `@container surface` / `@container stack` when enabled

## Gotchas

- `Stack padding={…}` → use `hPadding` / `vPadding`.
- `Surface elevation={…}` → wrap with `Elevator` ([styling.md](styling.md)).
- Explicit defaults: `direction="column"`, `fillChildren={false}`.
- Viewport MQ for card innards when a named container fits.
- Interactive controls inside `Masonry` (order breaks).
- Treating `Stack` as document semantics without landmarks/headings.

Machine truth: target guide + `@viraui/react/catalog.json`. Consumer `data-grow` / `data-shrink` → [custom-attributes.md](custom-attributes.md).
