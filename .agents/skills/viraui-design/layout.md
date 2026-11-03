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

### Scale floor (required — read before picking a token)

Theme space scale: `2xs` 2px · `xs` 4px · `s` 8px · `m` 16px · `l` 24px · `xl` 32px · … (confirm in theme / units).

`m` is the baseline. Values below `m` are **exceptions, not defaults**. Picking `xs` / `2xs` for container spacing is the #1 cause of cramped, muddy layouts — whitespace is what makes hierarchy readable.

| Token      | Allowed for                                                                                                                           | Never for                                                       |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `m`        | Baseline container gap, panel/card inset, field-to-field gap, label-to-control                                                        | —                                                               |
| `l` / `xl` | Page and section rhythm, screen-level padding, airy profiles, hero/empty-state breathing room                                         | dense control rows                                              |
| `s`        | Tight in-row clusters (icon + label + trailing action), toolbar/sidebar item gaps, one-step nested tightening inside an `m` container | page/section gap, card inset, field-to-field gap                |
| `xs`       | Optical micro pairs only — glyph↔label inside one control, dot↔caption, stacked meta lines under a title                              | any `Stack`/`Grid`/`Surface`/`Masonry` container gap or padding |
| `2xs`      | Hairline optical tuning only — chip/tag innards, separator rhythm, 1–2px nudge to align optical centers                               | any container gap/padding; never a layout decision              |

Rules:

1. **Container floor = `m`.** Any gap between sibling blocks (sections, fields, cards, tiles) and any root inset (`hPadding`/`vPadding`, Masonry `gap`) starts at `m`. Go below only when the element is a _controlled cluster_ (`s`) or _optical pair_ (`xs`/`2xs`).
2. **"Compact" ≠ `small everywhere`.** Compact profiles reduce the _optional_ air — they do not take container spacing under `m`. A dense admin table may use `s` for row gaps; a settings panel still uses `m` between fields.
3. **Balance, not minimum.** If a screen reads cramped, the fix is one step _up_, never a blanket step down. Check the whole screen: dense middle + airy edges reads broken; aim for consistent rhythm.
4. **Nested rule.** Inner cluster may sit one step below its container (container `m` → cluster `s`), never two. Container `m` with `xs`/`2xs` children is the cramped pattern to avoid.
5. **Never invent below-scale values.** No raw `2px`/`0.25rem` for spacing; if `2xs` feels too big, the structure is wrong, not the scale.

### Density → token recipe

| Profile          | Container gaps (`rowGap` / `columnGap` / Masonry `gap`)   | Section gaps | Padding (`hPadding` / `vPadding`) / Bleed `amount` |
| ---------------- | --------------------------------------------------------- | ------------ | -------------------------------------------------- |
| compact          | `m` (tight in-row clusters `s`; micro pairs `xs` / `2xs`) | `l`          | `m`                                                |
| medium (default) | `m` (in-row clusters `s`)                                 | `l` / `xl`   | `m`                                                |
| airy             | `l` (in-row clusters `m`)                                 | `xl` / `2xl` | `l`                                                |

Nested: outer section often one step larger than inner cluster; still props-only. A profile never pushes container spacing below `m`.

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
  hAlign="safe center"
  hPadding="l"
  style={{ position: 'absolute', insetInline: 0, bottom: 0, zIndex: 2, paddingBlockEnd: '1rem' }}
>

{/* GOOD — tuple owns the inset; style only for true positioning chrome */}
<Stack
  hAlign="safe center"
  hPadding="l"
  vPadding={[0, 'l']}
  style={{ position: 'absolute', insetInline: 0, bottom: 0, zIndex: 2 }}
>
```

## Alignment (`hAlign` / `vAlign`) — prefer `safe` (required)

`hAlign` / `vAlign` accept full CSS `justify-content` / `align-items` values (which property maps depends on `direction`) — including overflow-position keywords (`safe` / `unsafe`). Confirm in stack `props.xml`.

**Hard rule:** never invent `style` / CSS module / Tailwind for `justify-content` / `align-items` / `place-content` on a Stack when `hAlign`/`vAlign` cover it — including solely to write `safe center`.

**Default preference:** content-position values that can overflow → prefix **`safe`**.

| Goal                    | Prefer                                                        | Avoid                                                      |
| ----------------------- | ------------------------------------------------------------- | ---------------------------------------------------------- |
| Center on an axis       | `hAlign="safe center"` / `vAlign="safe center"`               | bare `center`; `style={{ justifyContent: 'safe center' }}` |
| End / bottom / trailing | `safe end`                                                    | bare `end` + custom CSS                                    |
| Start (explicit)        | `safe start` or `start`                                       | CSS `align-items`/`justify-content`                        |
| Cross-axis fill         | `stretch` (no `safe`)                                         | —                                                          |
| Main-axis distribution  | `space-between` / `space-around` / `space-evenly` (no `safe`) | —                                                          |
| Browser / unset         | `initial`                                                     | —                                                          |

```text
Need Stack alignment?
  content-position (center / end / start / flex-*)?
    yes → hAlign/vAlign with `safe …` (e.g. safe center, safe end)
  stretch or space-* or initial?
    yes → bare token — do not invent `safe stretch` / `safe space-between`
→ never style={{ justifyContent / alignItems: 'safe center' }} (or CSS module) for that job
```

```tsx
{/* BAD — reinvented safe alignment as inline style */}
<Stack direction="row" style={{ justifyContent: 'safe center', alignItems: 'safe center' }}>

{/* GOOD — props own overflow-safe alignment */}
<Stack direction="row" hAlign="safe center" vAlign="safe center" columnGap="m">
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
<Stack direction="row" columnGap="m" expandChildren fullHeight vAlign="stretch">
  <Stack>{/* panel */}</Stack>
  <Stack>{/* panel */}</Stack>
</Stack>;

{
  /* COLUMN — children expand main (block) + cross (inline) */
}
<Stack rowGap="m" expandChildren fullWidth fullHeight hAlign="stretch">
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
         (default hAlign initial/normal ≈ stretch). Do not fight with hAlign="safe center" then CSS-width children.
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
<Stack fullWidth rowGap="m">
  <Button type="submit">Continue with Email</Button>  {/* stretch via Stack — no width CSS */}
</Stack>
```

### Example: full-bleed auth actions

```tsx
<Stack fullWidth rowGap="m">
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
    vAlign="safe center"
    columnGap="m"
    hPadding="m"
    vPadding="m"
    render={<header />}
  >
    <Title render={<h1 />}>Settings</Title>
    <Button>Save</Button>
  </Stack>
  <Stack direction="row" columnGap="m" expandChildren render={<main />}>
    <Stack rowGap="s" hPadding="m" vPadding="m" render={<nav aria-label="Settings" />}>
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
    <Stack rowGap="m">{/* fields */}</Stack>
  </Surface>
</Stack>
```

## Gotchas

- Bare multi-child layout roots with no spacing props.
- **Cramped default:** `xs` / `2xs` (or `s` everywhere) used as container `rowGap`/`columnGap`/`hPadding`/`vPadding`. Container floor is `m`; below is only for tight clusters (`s`) and optical micro pairs (`xs`/`2xs`).
- Reading "compact" / "dense" as "smallest token everywhere" — compact trims optional air, never container spacing under `m`.
- CSS `gap`/`padding` on Vira layout roots instead of public props.
- `style` / CSS `paddingBlock*` / `paddingInline*` / side paddings on Stack/Surface/Grid/… when `vPadding`/`hPadding` tuples cover one-sided inset (`[0, 'l']`, `['l', 0]`, …).
- Bare `center` / `end` on `hAlign`/`vAlign` when `safe center` / `safe end` is the better default; inventing `style`/`justifyContent`/`alignItems` solely for `safe …`.
- **Any** `width` / `height` / `inline-size` / `block-size: 100%` / `w-full` / size-fill `className` on Stack or Vira controls — including when it would do nothing (square `IconButton`). Use Stack `fullWidth` / `fullHeight` / `expandChildren` + stretch align (Stack `patterns.xml`) or the control’s own `fullWidth`.
- Using `expandChildren` when only the Stack root must fill parent — that is `fullWidth` / `fullHeight`.
- Reaching for `height: 100%` on row/column panel children instead of the both-axes recipes above.
- Raw `div`/`header`/`main` + `display:flex`/`grid` / CSS `columns`.
- Skipping Grid/Masonry spacing because Stack/Surface already have gaps.
- `Surface elevation={…}` → wrap with `Elevator` ([styling.md](styling.md)).

Viewport / mobile-first / `useBreakpoints` / aligned `@media` / RTL `DirectionProvider` → [responsive.md](responsive.md). Discovery / index-first → [discovery.md](discovery.md). Visual overrides → [styling.md](styling.md).
