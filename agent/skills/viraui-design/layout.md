# Layout

**When to read:** any compose that uses `Stack`, `Surface`, `Grid`, `Masonry`, `Bleed`, `Prose`, or other Vira layout roots — including page/section flex, panels, galleries, articles, and container queries.

Exact prop names / defaults → `components/<id>/props.xml` (+ types verify). Multi-surface screen recipes → `@viraui/react/specs/patterns/*` (`compose-layout-first`, `settings-*`, `card-grid`, …). Stack-owned fill / Surface-render / page-chrome / equal-width → `components/stack/patterns.xml` (+ stack `usage`). Activity `compose-layout`. This page is **discipline only**.

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
| compact          | `s` (tight clusters `xs`)                             | `s`                                                        |
| medium (default) | `m`                                                   | `m`                                                        |
| airy             | `l` (section chrome `xl`)                             | `l`                                                        |

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

**Omit-defaults:** omit true defaults (`direction="column"`, `expandChildren={false}`, `fullWidth={false}`, `fullHeight={false}`). Unset gap/padding is **not** a blessed screen default — zero spacing is intentional flush only. Map density deliberately even when a source default exists (e.g. Masonry `gap`).

### Axis padding tuples (required)

`hPadding` / `vPadding` accept **one token** (both sides) **or** a `[start, end]` tuple. One side only → tuple with `0` on the empty side. Confirm in that surface’s `props.xml` (Stack, Surface, Grid, Text, Title, …).

**Hard rule:** never invent `padding` / `paddingBlock*` / `paddingInline*` / `paddingTop` / `paddingBottom` / … via `style` or CSS module on a Vira root that owns `hPadding`/`vPadding`. Use space tokens (`'l'`), not raw `1rem`.

```text
Need inset on only one logical side?
  yes → open props.xml for that root
       block axis → vPadding={[start, end]}   e.g. bottom only: vPadding={[0, 'l']}
       inline axis → hPadding={[start, end]}  e.g. end only:   hPadding={[0, 'm']}
  no  → single token: hPadding="m" / vPadding="m"
→ never style={{ paddingBlockEnd: '1rem' }} (or paddingInline*, paddingTop, …)
```

| Goal                         | Prefer                                                                | Avoid (forbidden)                                       |
| ---------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------- |
| Bottom inset only            | `vPadding={[0, 'l']}`                                                 | `style={{ paddingBlockEnd: '1rem' }}` / `paddingBottom` |
| Top inset only               | `vPadding={['l', 0]}`                                                 | `paddingBlockStart` / `paddingTop` CSS                  |
| Inline-end inset only        | `hPadding={[0, 'm']}`                                                 | `paddingInlineEnd` / `paddingRight` CSS                 |
| Absolute overlay + end inset | position/`inset` in chrome CSS; **padding** via `vPadding`/`hPadding` | stuffing padding into the same `style` bag              |

```tsx
{/* BAD — reinvented block-end padding as inline style */}
<Stack
  hAlign="center"
  hPadding="l"
  style={{ position: 'absolute', insetInline: 0, bottom: 0, zIndex: 2, paddingBlockEnd: '1rem' }}
>

{/* GOOD — tuple owns the inset; style only for true positioning chrome */}
<Stack
  hAlign="center"
  hPadding="l"
  vPadding={[0, 'l']}
  style={{ position: 'absolute', insetInline: 0, bottom: 0, zIndex: 2 }}
>
```

## Fill / stretch / full-width (required)

**Hard rule — all Vira controls (default):** never invent `width` / `height` / `inline-size` / `block-size: 100%` / `w-full` / `.fullWidth` / `.Social` / `.Submit` (or any className whose only job is size-fill) on a Vira root **unless the consumer expressly asked** for that size override.

Applies whether the CSS would work **or do nothing**. Fixed-size controls (e.g. square `IconButton`) stay content-sized — do **not** “help” with width/height CSS unsolicited. Stretchable controls get fill from **Stack props** or the control’s own `fullWidth` — never from an unsolicited CSS module.

Canonical both-axes recipes → Stack `patterns.xml` + `usage` (not core `patterns/*`). Open those units when the urge is `height: 100%` / `width: 100%` on Stack or children.

### Canonical: children fill both axes (memorize)

Parent must already be sized (viewport shell, `fullHeight` ancestor, CSS `min-block-size`, …). **Props only** — no size-fill CSS on Stack or children.

| Orientation                            | Main axis grow   | Cross stretch      | Root size                  | Forbidden                                          |
| -------------------------------------- | ---------------- | ------------------ | -------------------------- | -------------------------------------------------- |
| **Row** (share width + fill height)    | `expandChildren` | `vAlign="stretch"` | `fullHeight`               | `style`/`className` height on Stack/children       |
| **Column** (share height + fill width) | `expandChildren` | `hAlign="stretch"` | `fullWidth` + `fullHeight` | `style`/`className` width/height on Stack/children |

```tsx
{
  /* ROW — children expand main (inline) + cross (block) */
}
<Stack direction="row" columnGap="s" expandChildren fullHeight vAlign="stretch">
  <Stack>{/* panel */}</Stack>
  <Stack>{/* panel */}</Stack>
</Stack>;

{
  /* COLUMN — children expand main (block) + cross (inline) */
}
<Stack rowGap="s" expandChildren fullWidth fullHeight hAlign="stretch">
  <Stack>{/* section */}</Stack>
  <Stack>{/* section */}</Stack>
</Stack>;
```

```text
Need something to fill parent inline size or share flex space?
  1. Open that surface’s props.xml — does it own `fullWidth` (e.g. Textfield, Stack, Grid.Item)?
       yes → use the prop. Stop. No className.
  2. Else wrap / place in Stack (confirm stack units + patterns.xml when both axes):
       Stack must fill parent inline size? → fullWidth on that Stack
       Stack must fill parent block size? → fullHeight (never style height/block-size: 100%)
       Direct children grow on main axis (equal row Buttons, tall fillers)? → expandChildren
       Cross-axis stretch? → hAlign="stretch" (column) or vAlign="stretch" (row)
       Children fill BOTH axes? → use the row/column recipe table above (Stack patterns.xml)
       One child grows, siblings stay content-sized? → expandChildren + data-grow="false" on siblings
         (or data-grow="true" on the one child — attributes.xml)
       Column of stretch actions (full-bleed CTAs)? → fullWidth Stack; cross-axis stretch
         (default hAlign initial/normal ≈ stretch). Do not fight with hAlign="center" then CSS-width children.
       Fixed-size children (IconButton, chips of intrinsic size)? → Stack for gap/align only.
         Leave children content-sized. No width CSS. expandChildren will not (and must not) reshape them.
  3. Else documented --vui-* / minimal CSS — rare. Still never width/inline-size/height/block-size on the Vira root.
```

| Goal                              | Prefer                                                             | Avoid (forbidden)                                       |
| --------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------- |
| Action column spans panel         | `Stack fullWidth` (+ stretch cross-axis) around Buttons            | `.Submit { inline-size: 100% }` on Button               |
| Equal-width Buttons in a row      | `Stack direction="row" fullWidth expandChildren`                   | per-Button `flex: 1` / `width: 50%` CSS                 |
| Row panels fill both axes         | `expandChildren` + `fullHeight` + `vAlign="stretch"`               | `style={{ height: '100%' }}` / child `block-size: 100%` |
| Column sections fill both axes    | `expandChildren` + `fullWidth` + `fullHeight` + `hAlign="stretch"` | child `width`/`height: 100%` CSS                        |
| Textfield spans form              | Textfield `fullWidth` (units)                                      | CSS width on Textfield root                             |
| IconButton / social icon cluster  | Stack gap/align; IconButtons stay square                           | `.Social { inline-size: 100% }` on IconButton           |
| Stack shell under centered parent | child `fullWidth` + `maxWidth` (see stack usage)                   | wrapper div + `width: 100%`                             |

`expandChildren` ≠ `fullWidth` / `fullHeight`: grow **children** on the flex main axis vs size **this** Stack (`inline-size` / `block-size: 100%`). Cross-axis fill = `hAlign`/`vAlign="stretch"`. Orthogonal — pair them when the Stack must fill the parent so children have room. Never invent `height` / `block-size: 100%` / width CSS on Stack or children when these props cover it.

### Forbidden: auth form width CSS

```tsx
{/* BAD — invents size-fill classNames */}
<Stack direction="row" columnGap="s" fullWidth>
  <IconButton className={styles.Social} … />  {/* .Social { inline-size: 100% } — forbidden + useless on square IconButton */}
</Stack>
<Button className={styles.Submit}>Continue</Button>  {/* .Submit { inline-size: 100% } — use Stack fullWidth instead */}

{/* GOOD */}
<Stack direction="row" columnGap="s" fullWidth>
  <IconButton aria-label="…" icon={…} variant="secondary" />  {/* no width className */}
</Stack>
<Stack fullWidth rowGap="s">
  <Button type="submit">Continue with Email</Button>  {/* stretch via Stack — no width CSS */}
</Stack>
```

### Example: full-bleed auth actions

```tsx
<Stack fullWidth rowGap="s">
  <Button>Continue</Button>
  <Button variant="secondary">Cancel</Button>
</Stack>
```

### Example: equal-width row actions

```tsx
<Stack direction="row" fullWidth expandChildren columnGap="s">
  <Button variant="secondary">Cancel</Button>
  <Button>Save</Button>
</Stack>
```

## Layout roots (required)

Flex framing → **`Stack`**. CSS grid tracks → **`Grid`**. Mixed-height column pack → **`Masonry`**. Long-form heading/block rhythm → **`Prose`**, not Stack `rowGap`. Readable measure / leading on Text/Title/Prose → [typography.md](typography.md).

`Stack` = default structural box (enriched `div`: flex + gap/padding/align/`fullWidth`/`render`/…). Prefer it over bare wrapper `div`s even for simple nesting.

**Omit default `render` (all components):** never pass `render` that restates the surface’s default root (Stack → no `render={<div />}`). Confirm default in that surface’s `props`/`usage`. Use `render` only to change the host (semantic tag, `Surface`, another component).

```text
Need a wrapper box / flex row/column framing?
  yes → Stack (props first) — not a bare div
    need semantic/native tag (header, main, nav, section, ul, …)?
      yes → Stack render={<tag />}  — never raw tag + display:flex
    need size/scroll/basis CSS props cannot express?
      yes → className on that Stack (enrich) — never replace Stack with raw flex HTML
Need CSS grid tracks?
  yes → Grid — never display:grid / grid-template-* on plain HTML as the layout root
Need masonry / ragged columns?
  yes → Masonry — never CSS columns / column-count for that job
Need long-form heading/block rhythm (article, docs copy)?
  yes → Prose — never Stack `rowGap` as article cadence
```

**Hard rule:** do **not** invent bare wrapper `div`s or `display: flex` / `display: grid` / CSS `columns` on native tags for jobs Stack/Grid/Masonry own. Tag choice ≠ layout engine — pick the tag with `render`, keep the primitive.

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
- `style` / CSS `paddingBlock*` / `paddingInline*` / side paddings on Stack/Surface/Grid/… when `vPadding`/`hPadding` tuples cover one-sided inset (`[0, 'l']`, `['l', 0]`, …).
- **Any** `width` / `height` / `inline-size` / `block-size: 100%` / `w-full` / size-fill `className` on Stack or Vira controls — including when it would do nothing (square `IconButton`). Use Stack `fullWidth` / `fullHeight` / `expandChildren` + stretch align (Stack `patterns.xml`) or the control’s own `fullWidth`.
- Using `expandChildren` when only the Stack root must fill parent — that is `fullWidth` / `fullHeight`.
- Reaching for `height: 100%` on row/column panel children instead of the both-axes recipes above.
- Raw `div`/`header`/`main` + `display:flex`/`grid` / CSS `columns`.
- Skipping Grid/Masonry spacing because Stack/Surface already have gaps.
- `Surface elevation={…}` → wrap with `Elevator` ([styling.md](styling.md)).

Viewport / mobile-first / `useBreakpoints` / aligned `@media` / RTL `DirectionProvider` → [responsive.md](responsive.md). Discovery / index-first → [discovery.md](discovery.md). Visual overrides → [styling.md](styling.md).
