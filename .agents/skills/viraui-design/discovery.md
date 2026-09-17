# Component discovery

**When to read:** before choosing a component, inventing a prop/part, or reading a story for API truth.

## Authority order

1. `@viraui/react/specs/index.xml` (+ `activity-hints.xml`) — pick the surface; **index-first, always**.
2. Scoped units under `@viraui/react/specs/components/<id>/` — typically `meta` → `props` → `usage` → `a11y` / `patterns`.
3. Foundation units under `@viraui/react/specs/foundation/` for attributes, toggles, elevation, bootstrap, theme-topics.
4. **Base UI API** (when `meta.xml` has `<base_ui href="…"/>`) — after Vira `props`/`usage`, open that href for pass-through / native props. Never invent from memory.
5. Installed **types / source** — verify accepted props, inherited pass-through, and defaults **after** units (+ Base UI when linked). Never first discovery.
6. Stories — examples only. Never derive API or defaults from them.

Skills are routers only. Do **not** treat deleted encyclopedias or legacy surface JSON as API authority.

On disk: `node_modules/@viraui/react/dist/specs/…`. Package export: `@viraui/react/specs/*`.

**FORBIDDEN:** `ls` / `rg` / `grep` on `dist/components/**` or `*.d.ts` trees before the index and target units. Failure to route is an index/content defect — not permission to tree-walk.

## Activity playbooks

| Activity                     | Load sequence (stop when sufficient)                                                                                                     |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Choose a component           | `index.xml` (+ hints) → matrix pointer optional → **not** every props.xml                                                                |
| Implement component Y        | index → `components/<id>/` meta → props → **usage (do/dont)** → if `meta` has `base_ui`, open that Base UI API → a11y/patterns as needed |
| Compound overlay / form tree | [composition.md](composition.md) → specs `patterns`/`usage`/`props`                                                                      |
| Foundation attrs / vibrancy  | index → `foundation/attributes.xml` (+ toggles / elevation as needed)                                                                    |
| Layout spacing / density     | [layout.md](layout.md) → specs `patterns/compose-layout-first` (+ related patterns) → confirm props in stack/surface/grid/masonry units  |
| Mobile-first / breakpoints   | [responsive.md](responsive.md) → specs `breakpoints` units                                                                               |

## Layout discipline

Full rules + examples → [layout.md](layout.md). Summary: density default **medium**; every used layout root gets spacing props; flex→`Stack`, tracks→`Grid`, ragged→`Masonry`; confirm prop names in units.

## Imports

```tsx
import { Button, Dialog, IconButton, Stack } from '@viraui/react';
import { X } from 'lucide-react';
// Icons (any lib) — playbook: icons.md
// Optional Vira: import { Xmark } from '@viraui/icons/react';
```

Root barrels for Vira components. Icon slots take any `ReactNode`. Icon a11y + import discipline → [icons.md](icons.md). `Field` is Base UI, not a Vira export:

```tsx
import { Field } from '@base-ui/react';
```

## CSS identities

Catalog / index ids usually match component folder ids. Co-located exports (`ButtonLink`, `IconButtonLink`) live under the parent folder units (`button`, `icon-button`).

CSS keys in `props.xml` are **suffixes**. Full hook: `--vui-{shared_contract}-{suffix}` — contract folder from `meta.xml` `shared_contract`. Confirm before inventing a prefix. Ignore `--__*` — not consumer hooks.

## Public API discipline

**Default:** use only unit + source/type props and public parts. Omit equals-default props.

**Before custom CSS on a Vira root:** open that surface’s `props.xml`. If a React prop covers the visual (`tracking` / `transform` on Text·Title, spacing on layout roots, `tone`, …) → use the prop. CSS / `--vui-*` only after units prove the gap. Full ladder → [styling.md](styling.md).

### Base UI pass-through (required when linked)

Many Vira surfaces wrap `@base-ui/react`. After Vira `props.xml` (+ `usage`):

1. Read `meta.xml`. If `<base_ui href="…"/>` exists → open that Base UI API reference **before** inventing pass-through props.
2. Vira usually **extends** Base UI props, but may also:
   - wrap / rename the underlying surface (e.g. Dialog → Base UI Drawer);
   - regroup several Base UI parts into one Vira part (e.g. Sheet / Popup owning Portal + Positioner + Popup).
3. Do **not** assume 1:1 part or prop names with Base UI. Meta summary + `base_ui` href own the mapping.
4. Still unsure after Vira units + Base UI API → **ask the user**. Do not guess.

No `base_ui` in meta → Vira-only surface; skip Base UI.

| Control                                                | Slot                                      | Never                  |
| ------------------------------------------------------ | ----------------------------------------- | ---------------------- |
| `IconButton` / `IconButtonLink`                        | `icon`                                    | `children`             |
| `ToggleButton`                                         | `restingIcon` (+ optional `pressedIcon`)  | `children`             |
| Visible text action                                    | `Button` / `ButtonLink`                   | hacking icon-only APIs |
| Visible value on `Slider` / `Meter` / `LinearProgress` | `renderValue` (`true` or Value formatter) | `showValue`            |

## Validation loop

1. Pick candidate from `index.xml` (matrix is a thin intent shortcut only).
2. Open units for that installed package version (`meta` → `props` → `usage`).
3. If `meta` has `<base_ui>` → open that Base UI API for pass-through / native props.
4. Verify against types/source if needed.
5. Diff planned props/parts against `props.xml` / `meta.xml`, Base UI (when linked), and source defaults.
6. Apply `usage.xml` **do/dont** before writing CSS — treat donts as hard stops.
7. Still unsure → ask. Missing from those sources → stop; do not invent.

## Gotchas

- First discovery via `dist/components` or `*.d.ts` shell-parse.
- Inventing props from another library, Figma names, or stories.
- Assuming Base UI prop/part names without opening `meta` `base_ui` (or inventing when Vira wrapped/regrouped).
- Guessing pass-through instead of asking after Vira units + Base UI API.
- Writing CSS for a job a public prop already owns (skipping `props.xml`).
- Inventing `width: 100%` / `w-full` on Button etc. instead of Stack fill props / control `fullWidth`.
- Passing documented defaults “for clarity.”
- `children` on icon-only controls.
- Inferring `--vui-*` prefix without `shared_contract`.
- Loading every `props.xml` instead of index-first selective units.

## Machine paths

- `@viraui/react/specs/PROTOCOL.md`
- `@viraui/react/specs/index.xml`
- `@viraui/react/specs/activity-hints.xml`
- `@viraui/react/specs/components/<id>/*.xml`
- `@viraui/react/specs/foundation/*.xml`
- `@viraui/react/catalog.json` (tooling index only)

Intent shortcut → [component-matrix.md](component-matrix.md). Confirm always in specs index/units.
