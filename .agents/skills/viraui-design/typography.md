# Typography (readable measure)

**When to read:** body/heading copy that wraps — `Text`, `Title`, `Prose`, bare HTML `p`/`h*`, hero blurbs, empty states, docs/privacy walls. Prop names / defaults → package specs units (`text` / `title` / `prose` / `stack`). This page = **discipline only**.

## Goal

Readable line length + leading matched to type **size**. Default UI copy aims ~**10–12 words per line**. Cap with `maxWidth` — **prefer `ch`** in patterns/examples (not `rem`); not CSS `max-width` / `line-height` on Vira roots.

**Hard rule:** column / paragraph width **tracks `size`**. Smaller type → **narrower** measure. Larger type → **wider** measure. Keep ~10–12 words/line. Never one fixed shell (e.g. always `65ch`–`75ch`) for every size.

```text
Copy wraps / looks hard to read?
  → text wall (docs, privacy, long article)? → Prose path below
  → else UI short copy → measure (from size) + leading + wrap (+ align if needed)
Confirm props in units. No invented typography CSS on Text/Title.
```

## Measure (~10–12 words / line, scaled by size)

| Approach                                                          | Use                                                                         |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `Text` / `Title` `maxWidth`                                       | Cap that block for its `size`                                               |
| Parent `Stack` `maxWidth` (+ `fullWidth` under `hAlign="center"`) | Shared column — pick width from the **dominant body `size`** in that column |
| CSS `max-width` on Text/Title                                     | **Forbidden** — public prop covers it                                       |

Rough caps in **`ch`** (tune per content; confirm units — not a second API). Ladder = smaller → narrower. Patterns/examples use `ch`, not `rem`.

| `Text` `size` | Typical `maxWidth`                             | Notes                                |
| ------------- | ---------------------------------------------- | ------------------------------------ |
| `xs` / `s`    | `~36ch`–`50ch`                                 | Helpers, empty states, captions      |
| `m`           | `~55ch`–`65ch`                                 | Default body                         |
| `l`           | `~60ch`–`70ch`                                 | Comfortable body                     |
| `xl` / `2xl`  | `~65ch`–`75ch`                                 | Large leads                          |
| `3xl` / `4xl` | Wider `ch`, or shorter wrap + `wrap="balance"` | Display-ish body; still ~10–12 words |

| `Title` `size`    | Typical `maxWidth`         | Notes                                  |
| ----------------- | -------------------------- | -------------------------------------- |
| display / `1`–`2` | `~24ch`–`40ch`             | Often `wrap="balance"` when multi-line |
| `3`–`6`           | narrower than large titles | Section / card — scale down            |

**Do not** leave marketing/UI paragraphs full-bleed across a wide shell unless they are a true text wall (below). **Do not** reuse a large-body `72ch` shell for `size="s"` copy.

## Leading (`lineHeight`)

Tokens: `'none' | 'xs' | 's' | 'm' | 'l'` → foundation `--font-leading-*`. Confirm defaults in units.

| Context                           | Prefer                                      | Why                                               |
| --------------------------------- | ------------------------------------------- | ------------------------------------------------- |
| Root `Text` body                  | Omit (`m`) or `l` when open                 | Default leading; roomier for larger/`fluid` body  |
| Dense chrome / tight labels       | `s`                                         | Less air in UI clusters                           |
| Nested `Text` inside outer `Text` | **Omit** `lineHeight`                       | Inherits outer                                    |
| `Title` alone (UI)                | Omit (`m`) or `s` when wrapping large sizes | Patterns often use `lineHeight="s"` on big titles |
| `Title` **inside `Prose`**        | `lineHeight="s"`                            | Prose usage — headings sit denser than body       |
| `Text` inside long `Prose`        | Per block (`m` / `l` / `s`)                 | Prose does **not** own leading                    |

Never invent CSS `line-height` on Text/Title when `lineHeight` covers it.

## `wrap` vs `whiteSpace` + `align`

| Prop            | Rule                                                                                                                                                                                                                                                                                                                      |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `wrap`          | CSS `text-wrap` — wrapping **algorithm** / wrap on-off. Default **`pretty`** (orphan-aware) on Text / Title / Prose. Prefer `wrap="balance"` on short multi-line heads/blurbs that need even line lengths. `wrap="nowrap"` only when you need no wrap **without** changing space collapse. Do not invent CSS `text-wrap`. |
| `whiteSpace`    | CSS `white-space` — collapse/preserve spaces and newlines (Text/Title only). Prefer **`whiteSpace="nowrap"`** for single-line metrics/chrome (also collapses spaces). Not a substitute for `wrap="balance"` / `pretty`.                                                                                                   |
| `align`         | Omit so copy inherits parent. Pass only to override (`center`, `end`, …).                                                                                                                                                                                                                                                 |
| `Prose` `wrap`  | Region default `pretty`; inherits to descendants unless a child overrides.                                                                                                                                                                                                                                                |
| `Prose` `align` | Set **once** on the region; omit Title/Text `align` so they inherit.                                                                                                                                                                                                                                                      |

Both `wrap="nowrap"` and `whiteSpace="nowrap"` can stop wrapping — **prefer `whiteSpace` for metrics**; use `wrap` for pretty/balance/stable algorithms.

## Paths by surface

### `Text` / `Title` (UI short copy)

1. Pick `size` (visual). Heading tag → `Title` `render={<h*/>}` — [accessibility.md](accessibility.md).
2. Cap measure with `maxWidth` (or parent Stack) **from that size** — smaller → narrower.
3. Set `lineHeight` when default is wrong for the size/context.
4. Default `wrap="pretty"`; pass `wrap="balance"` when short multi-line needs even rag.
5. `align` only when intentional.

```tsx
<Stack rowGap="m" expandChildren maxWidth="70ch">
  <Title size="1" render={<h1 />} maxWidth="36ch" lineHeight="s" wrap="balance">
    Ship readable hero lines
  </Title>
  <Text size="2xl" tone="muted" maxWidth="68ch" wrap="balance">
    One short supporting sentence stays near ten to twelve words per line.
  </Text>
</Stack>
```

```tsx
<Stack hAlign="center" rowGap="s" maxWidth="36ch">
  <Title align="center" size="5" render={<h3 />} wrap="balance">
    Empty team
  </Title>
  <Text size="s" align="center" maxWidth="40ch" tone="muted" wrap="balance">
    Invite people to collaborate on this workspace.
  </Text>
</Stack>
```

### `Prose` (text walls)

Use for **articles, docs, privacy/terms, long editorial** — not every card blurb.

- Rhythm → `Prose` `gap` (`s` / `m` / `l`, default `l`). Do **not** wrap Prose blocks in Stack just for vertical rhythm.
- Region `align` on Prose once.
- Region `wrap` defaults to `pretty` (inherits); override with `wrap="balance"` only when short even-rag blocks need it.
- Title inside Prose → `lineHeight="s"`.
- Body leading → each `Text` `lineHeight` as needed.
- Single-line metrics inside Prose → child Text/Title `whiteSpace="nowrap"`.
- Measure: reading column via Stack/`maxWidth` sized for the **body Text `size`** in the article (see ladder above). Default body `m` → mid band; dense `s` prose → narrower; large `xl` lead → wider. Not a fixed `65ch`–`75ch` for every article. Edge-to-edge wall of text is not OK.

```tsx
{
  /* Body size m → mid reading column (not the xl band); prefer ch */
}
<Stack maxWidth="60ch" fullWidth>
  <Prose render={<article />} gap="l">
    <Title size="2" lineHeight="s" render={<h2 />}>
      Privacy policy
    </Title>
    <Text render={<p />} lineHeight="l">
      Long legal paragraphs use Prose for block gaps. Leading stays on Text. Column width follows body size — smaller
      type, narrower Stack maxWidth.
    </Text>
    <Text render={<p />}>Following paragraphs omit lineHeight when m is fine. Prefer render p for outline rhythm.</Text>
  </Prose>
</Stack>;
```

### Plain HTML

Preflight already styles bare `p` / inline chrome — [preflight-baseline.md](preflight-baseline.md). Headings are **not** preflight-typed → prefer `Title` + `render={<h*/>}`.

| Need                                   | Prefer                                                       |
| -------------------------------------- | ------------------------------------------------------------ |
| Body in Vira UI                        | `Text` (+ `render={<p/>}` when a paragraph host matters)     |
| Cap a bare HTML column                 | Parent `Stack` `maxWidth` — not ad-hoc CSS on every `p`      |
| Long HTML article                      | `Prose` wrapping Title/Text (or semantic hosts via `render`) |
| Override preflight leading on bare `p` | Only if consumer expressly asks — else use `Text`            |

## Props before CSS (typography)

| Temptation                                        | Use instead                                         |
| ------------------------------------------------- | --------------------------------------------------- |
| CSS `line-height`                                 | `lineHeight`                                        |
| CSS `max-width` / `max-inline-size` on Text/Title | `maxWidth` or Stack `maxWidth`                      |
| CSS `text-wrap` / `text-wrap: balance` / `pretty` | `wrap` (default `pretty`)                           |
| CSS `white-space: nowrap` for metrics             | `whiteSpace="nowrap"` (not `wrap="nowrap"`)         |
| CSS `text-align` on every child in Prose          | Prose `align` once                                  |
| CSS `letter-spacing` / `text-transform`           | `tracking` / `transform` — [styling.md](styling.md) |

## Checklist

- [ ] Opened `text` / `title` / `prose` (and Stack if shell) `props.xml` + `usage.xml`
- [ ] UI short copy capped ~10–12 words/line; `maxWidth` / Stack **scaled to `size`** (smaller → narrower) — not full-bleed
- [ ] `lineHeight` matched to size/context (Title in Prose → `s`)
- [ ] Default `wrap` is `pretty`; short even-rag blocks use `wrap="balance"`; metrics use `whiteSpace="nowrap"`
- [ ] `align` omitted unless override; Prose region align once
- [ ] Text walls → `Prose` + reading column sized for body `size` — not Stack-for-rhythm, not one fixed ch for all sizes
- [ ] No reinvented typography CSS on Vira text roots

## Gotchas

| Mistake                                        | Fix                                                         |
| ---------------------------------------------- | ----------------------------------------------------------- |
| Full-width hero blurb across 1200px shell      | `maxWidth` from size (~10–12 words); often `wrap="balance"` |
| Same `72ch` / `65ch` shell for `s` and `2xl`   | Scale column with `size` — smaller type → narrower cap      |
| CSS module `line-height` / `max-width` on Text | Props — open units                                          |
| CSS `text-wrap` instead of `wrap`              | Public `wrap` prop                                          |
| `wrap="nowrap"` for a dollar metric            | Prefer `whiteSpace="nowrap"`                                |
| Every Title/Text `align="center"` inside Prose | One Prose `align`                                           |
| Card blurb wrapped in Prose “for leading”      | Prose = text walls; use Text/Title props                    |
| Nested Text re-sets `size`/`lineHeight`        | Omit so outer owns type                                     |
| Bare `h1` + CSS type scale                     | `Title` + `render={<h1/>}`                                  |
