# Icons (any library)

**When to read:** icon slots, decorative glyphs, lucide / custom SVG / `@viraui/icons`, or icon-only controls — not a props encyclopedia.

Rules below apply to **every** icon source. `@viraui/icons` is optional; slots on `@viraui/react` accept any `ReactNode`.

## When to use

- Decorative glyphs inside buttons, fields, or labels
- Static named imports (tree-shakeable) from whatever set the app uses
- Passing icons into slots that accept `ReactNode`

## When not to use

- Standalone interactive control → wrap `Button` / `IconButton` (confirm props in specs units)
- Meaningful glyph without an accessible name on the parent control

## Accessibility

- Glyphs are decorative by default — parent control or label carries meaning
- Never use an icon as the only accessible name for an action
- When the glyph carries unique meaning, expose that meaning on the interactive parent (`aria-label` / `aria-labelledby`)

Icon-only compose patterns → [accessibility.md](accessibility.md). Related surfaces: `Button` / `IconButton` → [component-matrix.md](component-matrix.md) + specs units.

## Anti-patterns

| Do not                                      | Do instead                                            |
| ------------------------------------------- | ----------------------------------------------------- |
| Dynamic `() => import()` maps of every icon | Static named imports for app code                     |
| Icon alone as the accessible name           | Interactive parent (`IconButton` / `Button`) + name   |
| Force one icon library for every slot       | Any `ReactNode` — lucide / custom SVG / Vira all fine |

## Optional: `@viraui/icons`

Vira named glyphs when the app wants that set:

```tsx
import { iconNames, type IconName } from '@viraui/icons';
import { Xmark, Plus } from '@viraui/icons/react';
// deep escape hatch: '@viraui/icons/react/icons/<variant>/<Name>'
```

Flat barrel = default variant. Enumerate with `iconNames` / `IconName` — not a deleted package guide JSON. Full set browse in monorepo Design Kitchen uses workspace `import.meta.glob` (not a published consumer map).
