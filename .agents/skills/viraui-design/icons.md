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

## Slot size — omit by default

**Hard rule:** when passing an icon into a Vira slot, **do not** set `size`, `width`, or `height` on the glyph.

Hosts already size the SVG:

| Slot                                                                                 | Host                                                                              |
| ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| `Button` / `ButtonLink` `addon`                                                      | CSS `--vui-button-icon-size` (fraction of `--vui-button-height` / control `size`) |
| `IconButton` / `IconButtonLink` `icon`                                               | same (via Button)                                                                 |
| `ToggleButton` `restingIcon` / `pressedIcon`                                         | same                                                                              |
| `Chip` `addon`                                                                       | CSS `--vui-chip-icon-size`                                                        |
| `Disclosure.Trigger` icon slots                                                      | CSS fixed glyph box                                                               |
| Other addons (`Menu.Item`, `Select`, Textfield/`Autocomplete` chrome, `Tabs.Tab`, …) | icon-library default (e.g. `@viraui/icons` ≈ 18)                                  |

Set glyph `size` / dimensions **only** when the consumer expressly wants a non-default. Prefer the host/library default — omit the prop.

Do **not** confuse with control `size="s"|"m"|"l"` on Button / IconButton / ToggleButton (chrome scale). That is separate; still omit when it equals the documented default (`m`).

```tsx
// Good — slot owns glyph size
<IconButton aria-label="Close" icon={<Xmark />} />
<Button addon={<ShareUpRight />}>Share</Button>
<ToggleButton aria-label="Mute" restingIcon={<BellSlash />} pressedIcon={<BellOn />} />

// Bad — redundant size noise (agents copy this from stories / other libs)
<IconButton aria-label="Close" icon={<Xmark size={16} />} />
<Button addon={<ShareUpRight size="1rem" />}>Share</Button>
```

## Accessibility

- Glyphs are decorative by default — parent control or label carries meaning
- Never use an icon as the only accessible name for an action
- When the glyph carries unique meaning, expose that meaning on the interactive parent (`aria-label` / `aria-labelledby`)

Icon-only compose patterns → [accessibility.md](accessibility.md). Related surfaces: `Button` / `IconButton` → [component-matrix.md](component-matrix.md) + specs units.

## Anti-patterns

| Do not                                         | Do instead                                            |
| ---------------------------------------------- | ----------------------------------------------------- |
| `size={16}` / `size="1rem"` on every slot icon | Omit — host CSS or icon default                       |
| Dynamic `() => import()` maps of every icon    | Static named imports for app code                     |
| Icon alone as the accessible name              | Interactive parent (`IconButton` / `Button`) + name   |
| Force one icon library for every slot          | Any `ReactNode` — lucide / custom SVG / Vira all fine |

## Optional: `@viraui/icons`

Vira named glyphs when the app wants that set:

```tsx
import { iconNames, type IconName } from '@viraui/icons';
import { Xmark, Plus } from '@viraui/icons/react';
// deep escape hatch: '@viraui/icons/react/icons/<variant>/<Name>'
```

Flat barrel = default variant. Enumerate with `iconNames` / `IconName` — not a deleted package guide JSON. Full set browse in monorepo Design Kitchen uses workspace `import.meta.glob` (not a published consumer map).
