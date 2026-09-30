# Accessibility

**When to read:** compose-time names, landmarks, icon-only controls, forms, overlays, or decorative parts — not a full APG audit.

Vira owns widget behavior (Base UI); consumers own page semantics. Structured APG audit / SR-keyboard debug → **viraui-a11y** (do not fetch the APG example-index HTML).

Follow [APG Read Me First](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/): no ARIA is better than bad ARIA. Extra state on a real control is a belt — Base UI already adds it.

## Before adding `role` or `aria-*`

1. Read guide `accessibility` + `baseUIApi` (source/types if unsure).
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

`IconButton`, `IconButtonLink`, `ToggleButton`, and icon-only triggers need `aria-label` or `aria-labelledby`. Use icon props — never `children`:

```tsx
<IconButton aria-label="Close dialog" icon={<Xmark />} />
```

Keep tooltip text and the trigger’s accessible name aligned.

## Buttons and loading

`Button` / `ButtonLink`: visible text names the action — do not rely on addon alone; do not add `aria-label` that repeats that text. `loading` sets `aria-busy`; keep the label stable. Spinner inside is decorative when label text exists.

## Forms and selection

- `Textfield` / `Textarea` / `Select` / `Autocomplete` own Field root — provide `label`, `aria-label`, or `aria-labelledby`.
- `Field` from `@base-ui/react`. External `Field.Root` + `Fieldset render={<RadioGroup />}` / `render={<CheckboxGroup />}` when a group needs shared legend, description, validation, or error.
- Each `Radio` / `Checkbox` still needs its own name. Label `Slider` / `Switch` / `Meter` / `LinearProgress`.
- Optional visible value: `renderValue` (`true` or Value `children` formatter). On `Slider`, a function owns the value slot (no `Text` wrapper). Root `format` / `locale` feed Intl into the default label and formatter’s first argument.
- `Meter` = determinate status; indeterminate work → `LinearProgress value={null}`.
- Label `ToggleGroup` root and every child `ToggleButton`.

## Overlays

- `Dialog.Sheet`: always `title`; `description` when needed. Do not also set `role="dialog"` or `aria-modal`.
- Styled `Popover.Sheet`: always `title`. Unstyled: compose `Popover.Title` + optional `Popover.Description`.
- Name Dialog/Popover close controls and Menu triggers. Use `Menu.Group label` / `Menu.RadioGroup label` for sections.
- Toast titles drive banner headings; keep actions and dismiss visibly named.

## Decorative components

- `Spinner`: set `aria-hidden` when decorative; parent region owns loading status.
- `Skeleton` / `Skeleton.Overlay`: decorative (`aria-hidden`); parent owns loading status.
- `StaticNoise` / `ProgressiveBlur`: hardcode `aria-hidden`.
- `Annotate` / `Glow`: decorative; critical meaning stays in real content.
- `Typewriter`: polite live region for completed phrases — not the only critical status source.
- Decorative Badge dots/effects/icons never carry meaning alone.

## Gotchas

- Dup widget ARIA (`role="tablist"`, `aria-pressed`, `aria-modal`) already emitted by Base UI/Vira.
- `aria-label` that cloaks visible text / `label` / `title`.
- `children` on icon-only APIs instead of `icon` / `restingIcon`.
- `role="button"` on `Stack`/`div` instead of `Button` / `IconButton`.
- Copying APG sample markup into consumer JSX for audit optics.
- Using `Spinner` / `Skeleton` as the only loading announcement without parent status.
- Treating compose-time a11y as a substitute for **viraui-a11y** when the user asks for an APG audit.

Compound trees → [composition.md](composition.md). Prop discovery → [discovery.md](discovery.md).
