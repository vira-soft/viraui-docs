# Layout

**When to read:** any compose that uses `Stack`, `Surface`, `Grid`, `Masonry`, `Bleed`, or other Vira layout roots — including page/section flex, panels, galleries, and container queries.

Exact prop names / defaults → `components/<id>/props.xml` (+ types verify). This page is **discipline only**.

## Density (required)

```text
Compose layout primitives → density clear?
  yes → map to profile
  no / ambiguous → use medium, ask once: keep medium or switch compact/airy?
→ set each used component’s spacing/align props
```

- **Default:** `m` when unspecified.
- **Ask:** only when density/purpose unclear, **or** after starting with medium to confirm compact/airy.
- Do **not** block every 1-component tweak with a density interview.
- Do **not** re-ask every nested layout once density is chosen for the task.

### Density → token recipe

Theme space scale: `'2xs' | 'xs' | 's' | 'm' | 'l' | 'xl' | …` (confirm in theme / units).

| Profile          | Typical gaps (`rowGap` / `columnGap` / Masonry `gap`) | Typical padding (`hPadding` / `vPadding`) / Bleed `amount` |
| ---------------- | ----------------------------------------------------- | ---------------------------------------------------------- |
| compact          | `s` (tight clusters `xs`)                    | `s`                                                    |
| medium (default) | `m`                                              | `m`                                                   |
| airy             | `l` (section chrome `xl`)                    | `l`                                                    |

Nested: outer section often one step larger than inner cluster; still props-only.

**Required:** on every layout container that owns spacing, set at least one intentional gap and/or padding (or Masonry `gap` / Bleed `amount`) when children need separation or inset. Bare multi-child `Stack` / `Grid` / `Surface` / `Masonry` with no spacing props = violation.

## Per-component spacing props

Confirm names in units. Do not invent CSS `gap`/`padding` on these roots.

| Component | Set when that component owns the layout                                                     |
| --------- | ------------------------------------------------------------------------------------------- |
| `Stack`   | `rowGap` / `columnGap`, `hPadding` / `vPadding`, `hAlign` / `vAlign` when alignment matters |
| `Surface` | `hPadding` / `vPadding` (inset); nest `Stack`/`Grid` for child gaps                         |
| `Grid`    | `rowGap` / `columnGap`, `hPadding` / `vPadding`                                             |
| `Masonry` | `gap` (columns + within-column spacing) — density maps onto `gap`                           |
| `Bleed`   | `amount` when escaping matching padding                                                     |

**Omit-defaults:** omit true defaults (`direction="column"`, `expandChildren={false}`, `fullWidth={false}`). Unset gap/padding is **not** a blessed screen default — zero spacing is intentional flush only. Map density deliberately even when a source default exists (e.g. Masonry `gap`).

## Layout roots (required)

Flex framing → **`Stack`**. CSS grid tracks → **`Grid`**. Mixed-height column pack → **`Masonry`**.

```text
Need flex row/column framing?
  yes → Stack (props first)
    need semantic/native tag (header, main, nav, section, ul, …)?
      yes → Stack render={<tag />}  — never raw tag + display:flex
    need size/scroll/basis CSS props cannot express?
      yes → className on that Stack (enrich) — never replace Stack with raw flex HTML
Need CSS grid tracks?
  yes → Grid — never display:grid / grid-template-* on plain HTML as the layout root
Need masonry / ragged columns?
  yes → Masonry — never CSS columns / column-count for that job
```

**Hard rule:** do **not** invent `display: flex` / `display: grid` / CSS `columns` on native tags for jobs Stack/Grid/Masonry own. Tag choice ≠ layout engine — pick the tag with `render`, keep the primitive.

### Example: page chrome (`Stack` + `render`)

```tsx
<Stack className={styles.Shell} rowGap="m" expandChildren>
  <Stack
    direction="row"
    hAlign="space-between"
    vAlign="center"
    columnGap="m"
    hPadding="m"
    vPadding="m"
    render={<header />}
  >
    <Title render={<h1 />}>Settings</Title>
    <Button>Save</Button>
  </Stack>
  <Stack direction="row" columnGap="m" expandChildren render={<main />}>
    <Stack rowGap="xs" hPadding="s" vPadding="s" render={<nav aria-label="Settings" />}>
      {/* nav links */}
    </Stack>
    <Stack rowGap="l" expandChildren>
      {/* content */}
    </Stack>
  </Stack>
</Stack>
```

CSS module on `styles.Shell` may set `min-block-size` / scroll — **not** `display: flex`.

### Example: medium settings (`Stack` + `Surface`)

```tsx
<Stack rowGap="m" hPadding="m" vPadding="m">
  <Surface color={1} radius="m" hPadding="m" vPadding="m">
    <Stack rowGap="s">{/* fields */}</Stack>
  </Surface>
</Stack>
```

## Gotchas

- Bare multi-child layout roots with no spacing props.
- CSS `gap`/`padding` on Vira layout roots instead of public props.
- Raw `div`/`header`/`main` + `display:flex`/`grid` / CSS `columns`.
- Skipping Grid/Masonry spacing because Stack/Surface already have gaps.
- `Surface elevation={…}` → wrap with `Elevator` ([styling.md](styling.md)).

Discovery / index-first → [discovery.md](discovery.md). Visual overrides → [styling.md](styling.md).
