# Accessibility

**When to read:** compose-time names, landmarks, icon-only controls, forms, overlays, or decorative parts — not a full APG audit.

Vira owns widget behavior (Base UI); consumers own page semantics. Structured APG audit / SR-keyboard debug → **viraui-a11y** (do not fetch the APG example-index HTML).

Follow [APG Read Me First](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/): no ARIA is better than bad ARIA.

## Before adding `role` or `aria-*`

1. Read the surface’s specs `a11y.xml` (+ `meta` / `props`) and types/source if unsure.
2. If Base UI or Vira already emit that role/state → **omit** it (`role`, `aria-pressed`, `aria-expanded`, `aria-selected`, `aria-checked`, `aria-haspopup`, `aria-controls`, `aria-modal`).
3. Add only consumer-owned names, landmarks, and page status.

Do not fake widgets (`role="button"` on `Stack`/`div` — use `Button` / `IconButton`). Do not stamp `aria-label` on a control that already has visible text, `label`, or `title`. Inspect rendered DOM — do not copy APG sample roles into JSX so an audit “sees ARIA in source.”

```tsx
// Don't: Base UI already emits tablist + aria-pressed; aria-label cloaks "Save"
<Tabs.List role="tablist" />
<ToggleButton aria-pressed={pinned} aria-label="Pin" restingIcon={<Pin />} />
<Button aria-label="Save">Save</Button>

// Do: consumer-owned name only when there is no visible text
<ToggleButton aria-label="Pin" restingIcon={<Pin />} />
<Button>Save</Button>
```

## Compose checklist

- [ ] Real landmarks + logical heading outline (`Title` size is visual — semantic root via `render`)
- [ ] DOM / reading / focus order aligned
- [ ] Interactive controls and regions named
- [ ] Loading via `aria-busy` and/or live status; blocking errors via `role="alert"` (or equivalent)
- [ ] Focus visible; color / elevation / motion never the only state signal
- [ ] Custom transitions honor `prefers-reduced-motion` → **viraui-motion**

## Icon-only controls

`IconButton`, `IconButtonLink`, `ToggleButton`, and icon-only triggers need `aria-label` or `aria-labelledby`. Use icon props — never `children`. Any decorative glyph stays decorative — parent carries the name ([icons.md](icons.md)):

```tsx
<IconButton aria-label="Close dialog" icon={<Xmark />} />
```

## Buttons, forms, overlays, decorative

Confirm labels, Field ownership, Dialog/Popover titles, and decorative `aria-hidden` rules in the target surface’s `a11y.xml` / `usage.xml`. Do not invent widget ARIA from APG samples.

## Gotchas

- Dup widget ARIA already emitted by Base UI/Vira.
- `aria-label` that cloaks visible text / `label` / `title`.
- `children` on icon-only APIs instead of `icon` / `restingIcon`.
- Treating compose-time a11y as a substitute for **viraui-a11y** when the user asks for an APG audit.

Prop / part discovery → [discovery.md](discovery.md). Compound assembly → specs `patterns` / `usage` units.
