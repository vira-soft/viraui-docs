# Styling

**When to read:** visual overrides, `--vui-*`, elevation/z-index, or motion **engine** (CSS vs JS). Prop names and defaults → package specs units. Motion **tokens / reduced-motion** → **viraui-motion**.

## Ladder (defaults, not a menu)

**Default job:** compose with public Vira parts and props. CSS is not step 0.

1. Public Vira props + parent layout parts (specs units + types verify) — assemble the screen.
2. Documented `--vui-*` hooks (`props.xml` CSS suffixes + `meta.xml` `shared_contract`) when props cannot express the hook.
3. Minimal custom CSS for **app chrome** the system does not own (page backdrop, document scrollport, true one-offs). Do **not** reshape Vira control geometry or reinvent owned props **unless the consumer expressly asked** for that override / personalization (a future override layer will own formal hooks; until then: units first, then only the asked CSS).
4. Existing app `className` on a Vira root only after units prove the gap — or when the consumer expressly requested a visual override (still not a free pass to skip `props`/`usage`).
5. Inline `style` only for true runtime values that cannot map to a public prop or documented `--vui-*`.

Before inventing CSS on bare HTML tags (`ul`/`ol`/`p`/`a`/`code`/`table`/…): read [preflight-baseline.md](preflight-baseline.md) — preflight already owns that chrome.

### Props before CSS (required)

Do **not** guess. Before any custom CSS (or Tailwind utility) that sets a visual on a Vira root:

1. Open that surface’s `props.xml` **and** `usage.xml` (index → units). Apply **dont** as hard stops.
2. If a public React prop or Stack/layout pattern covers the need → **use it**. Stop. No className.
3. Else if a public `--vui-*` suffix covers it → set the hook via `className`.
4. Else: is this **app chrome** the system does not own, **or** did the consumer **expressly ask** for an override? → minimal CSS for that ask only. Otherwise stop — do not invent.

| Temptation (CSS / utility)                                                           | Check props first (examples — confirm in units)                                                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `letter-spacing`                                                                     | `Text` / `Title` `tracking`                                                                                                                                                                                                                                        |
| `text-transform`                                                                     | `Text` / `Title` `transform`                                                                                                                                                                                                                                       |
| `color` on body copy                                                                 | `Text` `tone` (then literal `color` escape hatch)                                                                                                                                                                                                                  |
| Meter / Chip highlight track or pill fill                                            | `variant` (`primary` or highlight token — confirm in units) before raw `--highlight-*` / `--vui-meter-*`                                                                                                                                                           |
| `gap` / `padding` on layout                                                          | Stack / Surface / Grid / Masonry / Bleed props                                                                                                                                                                                                                     |
| `paddingBlock*` / `paddingInline*` / one-side padding `style`                        | **Forbidden** when the root owns `hPadding`/`vPadding`. One side → tuple `[start, end]` with `0` (`vPadding={[0, 'l']}`) — [layout.md](layout.md). Space tokens, not raw `1rem`.                                                                                   |
| `width` / `height` / `inline-size` / `block-size: 100%` / `w-full` / size-fill class | **Forbidden** on Vira roots. Component `fullWidth` if any; else Stack `fullWidth` / `fullHeight` / `expandChildren` + stretch align (Stack `patterns.xml`) — [layout.md](layout.md). Fixed-size controls (IconButton) stay content-sized — do not “help” with CSS. |
| `font-weight` / size / family                                                        | `weight` / `size` / `family` (and Title equivalents)                                                                                                                                                                                                               |
| `line-height` / `max-width` / `text-wrap` / `white-space`                            | `lineHeight` / `maxWidth` / `wrap` / `whiteSpace` (+ Stack `maxWidth`) — readable measure → [typography.md](typography.md)                                                                                                                                         |
| `list-style` / `::marker` / ul-ol padding                                            | Preflight owns lists — [preflight-baseline.md](preflight-baseline.md) / `modules.xml` typography                                                                                                                                                                   |
| Table `table-layout` / row hairlines                                                 | `data-layout-fixed` / `data-table-separators` — [custom-attributes.md](custom-attributes.md)                                                                                                                                                                       |

Reinventing a documented prop as CSS on the same root = violation. `--vui-*` is for hooks the prop API does not expose as React props, or for theming beyond the prop — not a shortcut around unread units.

Never use `style` for Vira-coverable box-model keys on Vira components (`blockSize` / `inlineSize` / `display` / `padding` / `paddingBlock*` / `paddingInline*` / `margin` / `gap`) or themeable values (`color` / `radius` / shadows / elevation / z-index). Prefer props, then `className` (CSS module or Tailwind). One-sided inset → `vPadding`/`hPadding` `[start, end]` tuples — not `paddingBlockEnd: '1rem'`.

Body copy color: prefer `Text` `tone` (`default` | `primary` | `muted` | `interactive` | `positive` | `informative` | `danger` | `warning`) over literal `color` or raw `--global-*` / `--highlight-*` on wrappers. `primary` → `--global-primary`; literal `color` still wins when set.

Fluid type: Text locks size by default (`fluid` false); pass `fluid` for viewport clamp on page/body copy. Title still clamps by default — use `fluid={false}` on dense chrome headings. Theme `--effect-fluid-typography: initial` locks all instances.

Layout roots first → [layout.md](layout.md). Then layout/visual props from units. Motion **tokens** → **viraui-motion**. Motion **implementation** → prefer modern CSS below before JS/React.

## Modern CSS motion (prefer over JS)

Default: enter/exit, scroll reveal, stagger, size morph, and custom anchored chrome in **CSS**. JS/TS/React (`IntersectionObserver`, rAF, Framer/GSAP, index→`style` delays, `getBoundingClientRect` pinning) only when CSS cannot express the behavior.

Whether to animate, functional vs evocative, tokens, reduced-motion → **viraui-motion**. This section picks the **engine**.

| Job                                               | Prefer                                                                | Avoid first                                     |
| ------------------------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------- |
| Scroll-linked appear / progress                   | `animation-timeline: view()` / `scroll()` + `animation-range`         | `IntersectionObserver` + class toggles          |
| Stagger / sync by list length                     | `sibling-index()` / `sibling-count()` (delay or custom prop)          | `map((item, i) => style={{ animationDelay }})`  |
| Custom anchored UI (non-Vira chrome)              | CSS anchor positioning (`anchor-name`, `position-anchor`, `anchor()`) | `getBoundingClientRect` + `position: fixed`     |
| Enter when shown (`display` / popover / discrete) | `@starting-style` + `transition-behavior: allow-discrete`             | mount-only `useEffect` class flash              |
| Height / block-size to `auto`                     | `interpolate-size: allow-keywords` + size transition                  | `scrollHeight` measure in JS                    |
| Same-document morph / page chrome handoff         | View Transitions (`view-transition-name`, `::view-transition-*`)      | hand-rolled FLIP in React                       |
| Open/hover/focus derived from DOM                 | `:has()`, `:focus-within`                                             | extra open-state classes when selectors suffice |

```css
/* Scroll reveal — view timeline */
.card {
  animation: fade-up var(--duration-normal) var(--easing-entrance) both;
  animation-timeline: view();
  animation-range: entry 0% cover 40%;
}

/* Stagger from sibling position */
.card {
  animation-delay: calc((sibling-index() - 1) * var(--duration-instant));
}

/* Discrete enter (pair with reduced-motion in viraui-motion) */
.panel {
  transition:
    opacity var(--duration-fast) var(--easing-entrance),
    display var(--duration-fast) var(--easing-entrance);
  transition-behavior: allow-discrete;
}

.panel[data-open] {
  opacity: 1;
  display: block;
}

@starting-style {
  .panel[data-open] {
    opacity: 0;
  }
}
```

Still Vira for Dialog / Popover / Menu / Tooltip / Toast — do not replace those with raw `popover` + anchor CSS. Anchor / starting-style patterns are for **custom** consumer chrome when Vira has no part. Container queries (`@container`) for CSS layout switches; viewport React/prop branches, aligned `@media`, and RTL direction → [responsive.md](responsive.md) (specs `breakpoints` / `direction-provider` units).

## CSS hooks

`props.xml` CSS keys = public **suffixes**. Full hook: `--vui-{shared_contract}-{suffix}` — contract folder from `meta.xml` `shared_contract` (not always the export name).

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

Only public `--vui-{folder}-*` are consumer hooks. Never set or document `--__{folder}-*` as app hooks. Set non-inheriting hooks on the public component/part root, not an ancestor wrapper. Do not hand-author `@property` for Vira hooks.

## Elevation and stacking

Shadows (`Elevator`) and `z-index` share layers `0`–`4`. Elevation = visual depth; `z-index` = stacking. Not interchangeable: `Elevator` never sets `z-index`. Preflight elevation needs `--effect-shadows` on the active theme (empty/unset = on, `initial` = off).

`Surface` has no `elevation` prop. Wrap a valid element child with `Elevator` (no extra DOM). Use `getElevationProps` on a host you already own. Raw `data-elevation*` only when those utilities do not fit — [custom-attributes.md](custom-attributes.md) + `specs/foundation/elevation.xml`.

```tsx
<Elevator resting={1} hover={2}>
  <Surface color={1} radius="m" hPadding="m" vPadding="m">
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

Vira overlays already own layer 4. Do not restyle them to “win” stacking. Sticky chrome stays at 3 — Dialog covers it on purpose. Promo/modal above the page → `Dialog`, not a custom overlay with a huge `z-index`.

Do not set `z-index` above `4` unless extremely necessary. In-tree exception: theme holofoil (`body::after` at `999`). App UI never copies `999` / `1000` / `9999` to beat Dialog.

## Loading and selectors

- Component CSS follows the JS import graph. Do **not** import component CSS or `*.props.css` in app bootstrap (missing styles → **viraui-setup**).
- Use only documented consumer `data-*` — [custom-attributes.md](custom-attributes.md).
- Do not target internal classes or invent stable state selectors from markup.
- Prefer semantic theme vars (`--global-*`, `--space-*`, `--radius-*`, `--highlight-*`, `--duration-*`, `--easing-*`) over raw `--color-*`.

## Validation loop

1. Open `props.xml` **and** `usage.xml` (do/dont) for every Vira surface you are about to style.
2. Public props that cover the need → use them; omit equals-default. Treat usage **dont** as a hard stop.
3. Else documented `--vui-*` (correct `shared_contract`).
4. Else `className` / minimal CSS with theme tokens.
5. Re-check: no prop reinvented as CSS; no `--__*`, no invented `data-*`, no `z-index` > 4, no hand-rolled shadow.
6. Motion/reveal/stagger: CSS timeline / sibling / starting-style / interpolate-size / anchor first; JS only if blocked.

## Gotchas

- CSS `letter-spacing` / `text-transform` on `Text`/`Title` instead of `tracking` / `transform`.
- `width` / `height` / `inline-size` / `block-size: 100%` / `w-full` / size-fill `className` on Stack or **any** Vira control (Button, IconButton, …) — including when useless on fixed-size controls. Use Stack fill props (`fullWidth` / `fullHeight` / `expandChildren` + stretch; Stack `patterns.xml`) or the control’s `fullWidth`.
- `style` / CSS `paddingBlockEnd` (etc.) on Stack/Surface/Grid when `vPadding={[0, 'l']}` / `hPadding` tuples cover it.
- Inline gap/padding/radius/color/sizing before checking props.
- Body copy via raw `--global-*` / literal `color` when `Text tone` covers it.
- `list-style` / marker / ul-ol padding, link underline, or inline `code`/`kbd`/`mark` chrome when preflight already owns it — [preflight-baseline.md](preflight-baseline.md).
- `Surface elevation={…}` or hand-rolled `box-shadow` instead of `Elevator`.
- `z-index` `999`+ to escape overlays; sticky header above Dialog.
- Setting `--vui-*` on wrappers expecting non-inheriting hooks to flow.
- Importing per-component CSS to “fix” unstyled UI.
- Scroll reveal / stagger via IO / React index when CSS timelines / `sibling-index()` work.
- Replacing Vira overlays with raw CSS anchor/`popover`.
- Custom full radius under `--effect-corner-shape`: set `corner-shape: unset` (or `round`) on that element — no consumer `data-radius` API.

Machine refs: `components/<id>/props.xml`, `@viraui/react/specs/foundation/theme-topics.xml`, `foundation/attributes.xml`, `foundation/elevation.xml`.
