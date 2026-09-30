# Component discovery

**When to read:** before choosing a component, inventing a prop/part, or reading a story for API truth.

## Authority order

1. [component-matrix.md](component-matrix.md) or `@viraui/react/catalog.json` — pick the component.
2. Installed source/types — accepted props, inherited props, defaults.
3. `@viraui/react/<id>.guide.json` — intent, public part tree, Vira-added props, a11y, anti-patterns, public CSS hooks.
4. Guide `baseUIApi` URL (when present) — upstream pass-through.
5. Stories — examples only. Never derive API or defaults from them.

`structure` = public assembly hint, not a prop list. `properties.react` = Vira-added props only (not every native/Base UI pass-through).

## Imports

```tsx
import { Button, Dialog, Stack } from '@viraui/react';
import { Xmark } from '@viraui/icons/react';
```

Root barrels only. No deep component build paths. `Field` is Base UI, not a Vira export:

```tsx
import { Field } from '@base-ui/react';
```

## Guide / CSS identities

Catalog ids usually match guide filenames (`linear-progress.guide.json`). Co-located guides (`button-link.guide.json`, `icon-button-link.guide.json`) may lack catalog rows; the [matrix](component-matrix.md) still lists every shipped guide.

Guide `properties.css` keys are **suffixes**. Full hook: `--vui-{css-contract-folder}-{suffix}` — contract folder, not always the guide filename:

- `ButtonLink` / `IconButtonLink` → `--vui-button-*`
- Dotted React keys → part contracts (`Sheet.maxHeight` → `--vui-dialog-max-block-size`)

Confirm folder in guide summary/properties or source. Do not invent a prefix from a co-located guide id. Ignore `--__*` — not consumer hooks.

## Public API discipline

**Default:** use only source/type props + public guide parts. Omit any prop equal to its documented default.

| Control                                                | Slot                                      | Never                  |
| ------------------------------------------------------ | ----------------------------------------- | ---------------------- |
| `IconButton` / `IconButtonLink`                        | `icon`                                    | `children`             |
| `ToggleButton`                                         | `restingIcon` (+ optional `pressedIcon`)  | `children`             |
| Visible text action                                    | `Button` / `ButtonLink`                   | hacking icon-only APIs |
| Visible value on `Slider` / `Meter` / `LinearProgress` | `renderValue` (`true` or Value formatter) | `showValue`            |

Do not combine icon slots with fallback children, or fake unsupported content via `render` / wrappers / `className`.

```tsx
<IconButton aria-label="Close" icon={<Xmark />} />
<Button>Save</Button>
<Meter label="Storage used" value={42} renderValue={(_formatted, value) => `${value} GB`} />
```

## Validation loop

1. Pick candidate from matrix/catalog.
2. Open guide + source/types.
3. Diff planned props/parts against guide `structure` / `properties.react` and source defaults.
4. If a prop/part is missing from those sources → stop; do not invent.
5. Proceed only when every prop is accepted and every equals-default prop is omitted.

## Gotchas

- Inventing props from another library, Figma names, or stories.
- Passing documented defaults “for clarity” (`direction="column"`, `fillChildren={false}`).
- `children` on `IconButton` / `IconButtonLink` / `ToggleButton`.
- Inferring `--vui-*` prefix from guide filename (`button-link` → wrong `--vui-button-link-*`).
- Setting or documenting `--__*` internals.
- Deep-importing component paths instead of `@viraui/react` / `@viraui/icons/react`.
- Using `showValue` instead of `renderValue`.

## Machine paths

- `@viraui/react/catalog.json`
- `@viraui/react/<id>.guide.json`
- `@viraui/react/consumption.json`
- `@viraui/react/theme-surface.json`
- `@viraui/react/preflight-surface.json`

Compound trees → [composition.md](composition.md). Full routing table → [component-matrix.md](component-matrix.md).
