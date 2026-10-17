# Responsive + direction

**When to read:** viewport / breakpoint UI (`useBreakpoints`, aligned `@media`) **or** reading direction / RTL (`DirectionProvider`, `useDirection`, `dir` on `html`).

Exact provider/hook API → specs `components/breakpoints/` and `components/direction-provider/` units. This page is **discipline only**.

## Two different `direction`s

| Word        | Surface             | Values               | Meaning                                    |
| ----------- | ------------------- | -------------------- | ------------------------------------------ |
| `direction` | `Stack` (layout)    | `row` / `column` / … | Flex main axis — **not** RTL               |
| `direction` | `DirectionProvider` | `ltr` / `rtl`        | Reading direction for Base UI–backed trees |

Do **not** set `Stack direction="rtl"`. Flex swap at a breakpoint = `Stack direction={isWide ? 'row' : 'column'}` under `useBreakpoints`.

---

# Breakpoints (mobile-first)

## Hard rule: mobile-first

Always author the **narrow** layout as the base. Enhance at larger viewports (`min-width` / `useBreakpoints` flags becoming `true`). Do **not** ship desktop-first (`max-width` as the primary branch) unless the product already owns that pattern and the user insists.

```text
Base = mobile / default props / default CSS
  → at breakpoint N: add or change only what wide needs
```

## Choose the engine

```text
Need different React trees, hide/show parts, or change Vira **props** by viewport?
  yes → BreakpointsProvider + useBreakpoints()  (Client Component)
  no — only CSS values change (padding, gap via custom class, visibility, columns in CSS)?
  yes → CSS @media (min-width: …) — same lengths as the active breakpoint map
Container-sized layout (not viewport)?
  → @container — not useBreakpoints
```

Do **not** invent a parallel system (`window.matchMedia` in ad-hoc hooks, hard-coded `768px` / `1024px`, theme token widths as breakpoints). One map owns the product thresholds.

## `useBreakpoints` (markup / props)

1. Open specs index → `breakpoints` units (`meta` → `props` → `usage`).
2. Wrap the tree that calls the hook in `BreakpointsProvider` inside a Client Component (`'use client'`). Not a Server Component module. Overlay bootstrap (`Dialog` / `Tooltip` / `Toast`) stays separate — do not treat this provider as mandatory root chrome.
3. Prefer `useBreakpoints('small')` (one boolean) when only one flag matters.
4. Compose mobile-first: default JSX = narrow; when the flag is true, swap Stack flex direction / density / children.

```tsx
'use client';

import { BreakpointsProvider, Stack, useBreakpoints } from '@viraui/react';

function SettingsShell() {
  const isMedium = useBreakpoints('medium');

  return (
    <Stack direction={isMedium ? 'row' : 'column'} columnGap="m" rowGap="m" expandChildren>
      {/* narrow = column; medium+ = row */}
    </Stack>
  );
}

export function SettingsPage() {
  return (
    <BreakpointsProvider>
      <SettingsShell />
    </BreakpointsProvider>
  );
}
```

Custom map: `breakpoints` on the provider **replaces** the whole default map (no sparse merge). Defaults (em, mobile-first min-width): `extra-small` 30em, `small` 48em, `medium` 60em, `large` 80em, `extra-large` 100em. Confirm in units for the installed version.

## CSS `@media` (style-only)

When React tree and props stay the same:

1. Read the active map — app `BreakpointsProvider` `breakpoints` prop if set, else the hook defaults above.
2. Write **`min-width`** queries with those **exact** CSS lengths (prefer `em` as shipped).
3. Do not invent px aliases that drift from the map.

```css
/* Matches default `medium` — or copy the app override string verbatim */
@media (min-width: 60em) {
  .panel {
    /* only CSS that props cannot express at this breakpoint */
  }
}
```

If the app overrides the provider map, CSS must use **those** lengths — not the skill defaults.

## Breakpoint gotchas

- mobile-first `min-width` as the main responsive strategy.
- `letter-spacing` / layout props / spacing reinvented in CSS when a public prop + `useBreakpoints` can set them per breakpoint.
- Ad-hoc `matchMedia` / `768px` beside an existing `BreakpointsProvider` map.
- Calling `useBreakpoints` outside the provider.
- Putting the provider in a Server Component file.
- Using theme design tokens as breakpoint widths (not the contract).

---

# Direction (LTR / RTL)

`DirectionProvider` + `useDirection` = **opt-in** transparent Base UI re-export from `@viraui/react`. Not part of Dialog / Tooltip / Toast overlay shell. Setup shell notes → **viraui-setup** [frameworks.md](../viraui-setup/frameworks.md).

Authority: specs `direction-provider` units + https://base-ui.com/react/utils/direction-provider (via `meta` `base_ui`).

## Hard rule: provider + document `dir`

`DirectionProvider` feeds **Base UI context only**. It does **not** set HTML `dir` or CSS `direction`.

For RTL:

1. `DirectionProvider direction="rtl"` around the tree that needs flipped Base UI behavior (menus, selects, sliders, …).
2. `dir="rtl"` on a **portal ancestor** — usually `<html>` — so body-mounted popups inherit CSS direction.
3. Import from `@viraui/react` — never `@base-ui/react/direction-provider` when Vira already re-exports it.

```tsx
// app root (Client) — pair with <html dir="rtl"> (or lang-appropriate)
import { DirectionProvider, Slider } from '@viraui/react';

<DirectionProvider direction="rtl">
  <Slider defaultValue={25} aria-label="Volume" />
</DirectionProvider>;
```

Subtree demo (still need `dir` on an ancestor that covers portals for real apps):

```tsx
<div dir="rtl">
  <DirectionProvider direction="rtl">{/* Menu / Select / Slider */}</DirectionProvider>
</div>
```

## `useDirection`

Use when a portaled component must read context direction without relying on DOM `dir`. Confirm in units.

```tsx
const direction = useDirection(); // 'ltr' | 'rtl'
```

## Direction gotchas

- Provider alone (no `dir` on `html` / portal ancestor) — popups stay LTR in CSS.
- `dir="rtl"` only on a local wrapper when portals mount on `document.body`.
- Importing Base UI path instead of `@viraui/react`.
- Treating DirectionProvider as required bootstrap.
- Confusing Stack flex `direction` with LTR/RTL.

---

Layout roots / density → [layout.md](layout.md). Props before CSS → [styling.md](styling.md). Discovery → [discovery.md](discovery.md). Compounds / overlays → [composition.md](composition.md) (providers still land here for discipline).
