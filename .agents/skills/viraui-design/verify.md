# End-of-work adversarial verify

**When to read:** after JSX/CSS edits for any task that loaded **viraui-design**; **before** claiming done, shipping, or saying the UI is finished.

**Tone:** attack your own output. Hunt rationalizations. Friendly skim ≠ pass.

Compose-time loops in sibling refs stay in place. This file = **ship-time** gate over the whole diff.

## Hard gate

1. Copy the checklist below into the working notes.
2. Mark each item against the **final** output (not the plan).
3. Any fail = critical → fix → re-run this file from the top.
4. Claim done only at **0 critical**.

## Checklist

### Discovery / authority

- [ ] Specs **index-first** for every Vira surface touched (`index.xml` / `@viraui/react/specs` → scoped units). No first discovery via `ls` / `rg` / `grep` on `dist/components/**` or `*.d.ts` trees.
- [ ] No invented props, parts, hooks, or CSS prefixes. Stories are examples only — never API authority.
- [ ] Surfaces with `meta.xml` `<base_ui>`: Base UI API checked after Vira `props` — no invented pass-through; no assumed 1:1 wrap/regroup; ask if still unsure.
- [ ] `usage.xml` **do/dont** read for each touched surface — no CSS that a listed dont forbids.
- [ ] Types/source opened only to **verify** after units, not to browse the API.

Depth → [discovery.md](discovery.md).

### API hygiene

- [ ] Every equals-default prop **omitted**.
- [ ] Icon-only controls use icon slots + accessible name — never `children` on `IconButton` / `IconButtonLink` / `ToggleButton`.
- [ ] Imports from `@viraui/react` root (icons: any `ReactNode` in slots — [icons.md](icons.md)).
- [ ] No custom CSS reinventing a public prop on the same root (`letter-spacing`→`tracking`, `text-transform`→`transform`, gap/padding→layout props, etc.) — `props.xml` opened first.

### Layout

- [ ] Flex framing → `Stack` (semantic tags via `render`). Tracks → `Grid`. Ragged pack → `Masonry`. No raw HTML/`div` + `display:flex` / `display:grid` / CSS columns glue.
- [ ] Every used layout root has spacing props set (unset gap/padding = 0 — not “omit defaults”).
- [ ] No CSS `gap`/`padding` on Stack / Surface / Grid / Masonry / Bleed roots.
- [ ] No invented `width: 100%` / `w-full` on content-sized controls — use Stack `fullWidth` / `expandChildren` or the control’s own `fullWidth` ([layout.md](layout.md) fill section).

Depth → [layout.md](layout.md).

### Responsive (if viewport / breakpoint work)

- [ ] Mobile-first base; enhance at larger viewports.
- [ ] Markup or prop branches → `BreakpointsProvider` + `useBreakpoints` (not ad-hoc `matchMedia`).
- [ ] CSS-only `@media` uses the same em lengths as the active provider map (override or defaults).

Depth → [responsive.md](responsive.md).

### Styling / attributes

- [ ] No invented `--vui-*`; no consumer `--__*`. Confirm `shared_contract` before any public CSS hook.
- [ ] No hand-rolled elevation/`box-shadow` when Elevator / documented elevation applies; no `z-index` > 4 for app UI.
- [ ] Consumer `data-*` only from [custom-attributes.md](custom-attributes.md) / foundation attributes units.

Depth → [styling.md](styling.md).

### Accessibility (compose-time)

- [ ] No duplicate widget `role` / `aria-*` Base UI already emits.
- [ ] Page landmarks, status, focus order, names owned by the consumer app.
- [ ] Full APG / SR audit **not** claimed done here → **viraui-a11y**.

Depth → [accessibility.md](accessibility.md).

### Motion / setup

- [ ] Interactive custom CSS uses `--duration-*` / `--easing-*` and `prefers-reduced-motion` → **viraui-motion**.
- [ ] Missing / unstyled surfaces → **viraui-setup** bootstrap — not per-component CSS imports.

### Compounds (if touched)

- [ ] Parts match specs `meta` / `patterns` — no invented compound names.
- [ ] Field ownership correct; overlays have required titles/names.

Depth → [composition.md](composition.md).

## Pass criteria

- **Pass:** state briefly `adversarial verify: pass` (0 critical).
- **Fail:** list each critical finding + the fix applied; re-run until pass.
- **Never** claim done, ship, or hand off with open critical items.
