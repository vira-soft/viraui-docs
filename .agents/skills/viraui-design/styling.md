# Styling

**When to read:** visual overrides, `--vui-*`, elevation/z-index, or motion **engine** (CSS vs JS). Prop names and defaults → package specs units. Motion **tokens / reduced-motion** → **viraui-motion**.

## Ladder (defaults, not a menu)

1. Public Vira props (specs units + types verify).
2. Existing app styling via public `className`.
3. Documented `--vui-*` hooks (`props.xml` CSS suffixes + `meta.xml` `shared_contract`).
4. Minimal custom CSS (including modern CSS motion — below).
5. Inline `style` only for true runtime values that cannot map to a public prop or documented `--vui-*`.

Never use `style` for Vira-coverable box-model keys on Vira components (`blockSize` / `inlineSize` / `display` / `padding` / `margin` / `gap`) or themeable values (`color` / `radius` / shadows / elevation / z-index). Prefer props, then `className` (CSS module or Tailwind).

Body copy color: prefer `Text` `tone` (`default` | `primary` | `muted` | `interactive` | `positive` | `informative` | `danger` | `warning`) over literal `color` or raw `--global-*` / `--highlight-*` on wrappers. `primary` → `--global-primary`; literal `color` still wins when set.

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

Still Vira for Dialog / Popover / Menu / Tooltip / Toast — do not replace those with raw `popover` + anchor CSS. Anchor / starting-style patterns are for **custom** consumer chrome when Vira has no part. Container queries (`@container`) for CSS layout switches; viewport-conditional **React trees** still use `useBreakpoints` ([component-matrix.md](component-matrix.md) → specs `breakpoints` units).

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

1. Public props in specs units + types verify; omit equals-default.
2. Else documented `--vui-*` (correct `shared_contract`).
3. Else `className` / minimal CSS with theme tokens.
4. Re-check: no `--__*`, no invented `data-*`, no `z-index` > 4, no hand-rolled shadow.
5. Motion/reveal/stagger: CSS timeline / sibling / starting-style / interpolate-size / anchor first; JS only if blocked.

## Gotchas

- Inline gap/padding/radius/color/sizing before checking props.
- Body copy via raw `--global-*` / literal `color` when `Text tone` covers it.
- `Surface elevation={…}` or hand-rolled `box-shadow` instead of `Elevator`.
- `z-index` `999`+ to escape overlays; sticky header above Dialog.
- Setting `--vui-*` on wrappers expecting non-inheriting hooks to flow.
- Importing per-component CSS to “fix” unstyled UI.
- Scroll reveal / stagger via IO / React index when CSS timelines / `sibling-index()` work.
- Replacing Vira overlays with raw CSS anchor/`popover`.
- Custom full radius under `--effect-corner-shape`: set `corner-shape: unset` (or `round`) on that element — no consumer `data-radius` API.

Machine refs: `components/<id>/props.xml`, `@viraui/react/specs/foundation/theme-topics.xml`, `foundation/attributes.xml`, `foundation/elevation.xml`.
