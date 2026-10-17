# End-of-work adversarial verify

**When to read:** after JSX/CSS edits for any task that loaded **viraui-design**; **before** claiming done, shipping, or saying the UI is finished.

**Tone:** attack your own output. Hunt rationalizations. Friendly skim ≠ pass.

Compose-time loops in sibling refs stay in place. This file = **ship-time** gate over the whole diff. Same requirements on every Agent Skills host.

## Hard gate

1. Copy the checklist below into the working notes.
2. Mark each item against the **final** output (not the plan).
3. Any fail = critical → fix → re-run this file from the top.
4. **Emit the ship report** (below) in the **final reply**. Silent mental checklist = fail.
5. Claim done only at **0 critical** with `adversarial verify: pass`.

## Checklist

### Discovery / authority

- [ ] Specs **index-first** for every Vira surface touched (`index.xml` / `@viraui/react/specs` → scoped units). No first discovery via `ls` / `rg` / `grep` on `dist/components/**` or `*.d.ts` trees.
- [ ] **Compose-with:** `props.xml` + `usage.xml` opened **before** any CSS module / utility / size-fill `className` on those Vira roots. No “I already know this control — style first.” Unsolicited reshape CSS forbidden; consumer-requested overrides still need units first.
- [ ] No invented props, parts, hooks, or CSS prefixes. Stories are examples only — never API authority.
- [ ] Surfaces with `meta.xml` `<base_ui>`: Base UI API checked after Vira `props` — no invented pass-through; no assumed 1:1 wrap/regroup; ask if still unsure.
- [ ] `usage.xml` **do/dont** read for each touched surface — no CSS that a listed dont forbids.
- [ ] Types/source opened only to **verify** after units, not to browse the API.

Depth → [discovery.md](discovery.md).

### API hygiene

- [ ] Every equals-default prop **omitted**.
- [ ] Icon-only controls use icon slots + accessible name — never `children` on `IconButton` / `IconButtonLink` / `ToggleButton`.
- [ ] Icons in slots omit `size` / `width` / `height` unless expressly overriding the host/library default ([icons.md](icons.md)).
- [ ] Imports from `@viraui/react` root (icons: any `ReactNode` in slots — [icons.md](icons.md)).
- [ ] No custom CSS reinventing a public prop on the same root (`letter-spacing`→`tracking`, `text-transform`→`transform`, gap/padding→layout props, etc.) — `props.xml` opened first.

### Layout

- [ ] Flex framing → `Stack` (semantic tags via `render`). Tracks → `Grid`. Ragged pack → `Masonry`. No raw HTML/`div` + `display:flex` / `display:grid` / CSS columns glue.
- [ ] No noop `render` that restates the component default root (e.g. Stack `render={<div />}`) — omit unless the host changes ([layout.md](layout.md) / PROTOCOL).
- [ ] Every used layout root has spacing props set (unset gap/padding = 0 — not “omit defaults”).
- [ ] No CSS `gap`/`padding` on Stack / Surface / Grid / Masonry / Bleed roots.
- [ ] **No** `style` / CSS `paddingBlock*` / `paddingInline*` / side paddings on roots that own `hPadding`/`vPadding` — one-sided inset → tuples (`vPadding={[0, 'l']}`, …) with space tokens, not raw `1rem` ([layout.md](layout.md)).
- [ ] **No** invented `width` / `height` / `inline-size` / `block-size: 100%` / `w-full` / size-fill `className` (`.Social`, `.Submit`, `.fullWidth`, …) on Stack or **any** Vira control — including fixed-size `IconButton` where it would do nothing. Both-axes fill → Stack `fullWidth` / `fullHeight` / `expandChildren` + `hAlign`/`vAlign="stretch"` (Stack `patterns.xml`) or the control’s own `fullWidth` ([layout.md](layout.md)). Scan CSS modules / inline `style` in the diff for this.

Depth → [layout.md](layout.md).

### Responsive / direction (if viewport, breakpoint, or RTL work)

- [ ] Mobile-first base; enhance at larger viewports.
- [ ] Markup or prop branches → `BreakpointsProvider` + `useBreakpoints` (not ad-hoc `matchMedia`).
- [ ] CSS-only `@media` uses the same em lengths as the active provider map (override or defaults).
- [ ] RTL → `DirectionProvider` from `@viraui/react` **and** `dir="rtl"` on portal ancestor (`html`); not Stack flex `direction`.

Depth → [responsive.md](responsive.md).

### Styling / attributes — useless custom CSS = critical

- [ ] **No useless custom CSS** on Vira roots: every new module/utility either (a) sets a documented `--vui-*` after units proved the gap, (b) is **app chrome** the system does not own, or (c) is an override the consumer **expressly asked** for. Otherwise delete and use props.
- [ ] Reinvented props-as-CSS count = **0** (gap/padding/width/height/letter-spacing/text-transform/line-height/max-width/list-style/…).
- [ ] No invented `--vui-*`; no consumer `--__*`. Confirm `shared_contract` before any public CSS hook.
- [ ] No hand-rolled elevation/`box-shadow` when Elevator / documented elevation applies; no `z-index` > 4 for app UI.
- [ ] Consumer `data-*` only from [custom-attributes.md](custom-attributes.md) / foundation attributes units.
- [ ] No reinvent of preflight typography/list/table chrome unless consumer expressly asked — [preflight-baseline.md](preflight-baseline.md).

Depth → [styling.md](styling.md), [preflight-baseline.md](preflight-baseline.md).

### Typography (if Text / Title / Prose / wrapping copy)

- [ ] UI short copy capped ~10–12 words/line via `maxWidth` / Stack **scaled to `size`** (smaller → narrower) — not full-bleed; no one fixed ch for every size; no CSS `max-width` / `line-height` on Text/Title when props cover it.
- [ ] `lineHeight` matched to size/context (Title in Prose → `s`); default `wrap` is `pretty`; short even-rag blocks use `wrap="balance"`; metrics use `whiteSpace="nowrap"`.
- [ ] Text walls (docs/privacy/long article) → `Prose` + reading column sized for body `size` — not Stack-for-rhythm; region `align` once.

Depth → [typography.md](typography.md).

### Accessibility (compose-time) — must run

- [ ] **Compose a11y checked** via [accessibility.md](accessibility.md) (not skipped). Full APG audit is separate → **viraui-a11y**.
- [ ] No duplicate widget `role` / `aria-*` Base UI already emits.
- [ ] Page landmarks, status, focus order, names owned by the consumer app.
- [ ] Heading outline sequential — no skipped `h*`; `Title` `size` ≠ tag (`render` sets `h1`–`h6`).
- [ ] Text/Title `render` uses the most correct semantic HTML host for meaning (e.g. `time`/`output`/`p`/…) — examples in accessibility.md, not an exhaustive list; no span/ARIA fakes.
- [ ] Icon-only controls have accessible names; labeled fields wired correctly.

Depth → [accessibility.md](accessibility.md).

### Motion / setup

- [ ] Interactive custom CSS uses `--duration-*` / `--easing-*` and `prefers-reduced-motion` → **viraui-motion**.
- [ ] Missing / unstyled surfaces → **viraui-setup** bootstrap — not per-component CSS imports.

### Compounds (if touched)

- [ ] Parts match specs `meta` / `patterns` — no invented compound names.
- [ ] Field ownership correct; overlays have required titles/names.

Depth → [composition.md](composition.md).

## Ship report (required in final reply)

Copy and fill. Omit = fail (do not claim done).

```markdown
## Adversarial verify

- specs/units: …
- custom CSS on Vira roots: none | list + why (app chrome / explicit ask only)
- reinvented props-as-CSS: 0
- compose a11y (accessibility.md): pass | findings…
- motion tokens if custom CSS: … / n/a
- critical: 0
  adversarial verify: pass
```

## Pass criteria

- **Pass:** ship report present + `adversarial verify: pass` (0 critical).
- **Fail:** list each critical finding + the fix applied; re-run until pass.
- **Never** claim done, ship, or hand off with open critical items or without the ship report.
