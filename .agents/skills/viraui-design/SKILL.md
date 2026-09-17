---
name: viraui-design
description: Use when building, editing, debugging, or styling any UI with @viraui/react in a consumer app, even if the user never named this skill. Symptoms include choosing components or compound parts, forms, overlays, page/shell layout, raw HTML flex or CSS grid glue, Stack/Surface/Grid/Masonry/Bleed spacing or density, viewport-conditional React markup or useBreakpoints, public props, --vui-* styling, consumer data attributes, elevation or z-index, icon-only controls, decorative glyphs or icon imports (lucide, custom SVG, @viraui/icons), Surface vibrancy, or missing/unstyled Vira surfaces after bootstrap.
license: MIT
metadata:
  author: Vira Software
  version: '2026.4.4'
---

# viraui-design

Thin router for `@viraui/react`. When UI/task fit is ~1%+, **read this hub before JSX, CSS, or invented props.** Durable API facts live in package specs — skill pages are discipline/playbooks only.

Load **viraui-setup** only when theme, fonts, preflight, or package setup is missing or broken. If styles are missing, fix setup first — do not patch with per-component CSS bootstrap.

When composing a screen, load **viraui-motion** (hub only, then the matching ref). Motion applies to Vira parts **and** custom consumer CSS.

## Mandatory load

| Signal                                                    | Action                                                |
| --------------------------------------------------------- | ----------------------------------------------------- |
| Any `@viraui/react` compose, edit, debug, or styling task | Read this hub first                                   |
| User never said “viraui-design”                           | Still load — description is discovery only            |
| Missing global styles                                     | **viraui-setup** before inventing CSS workarounds     |
| Explicit APG audit / SR-keyboard debug                    | **viraui-a11y** (not this skill for structured audit) |
| Transitions, hover/press, overlay motion                  | **viraui-motion** hub + one ref                       |

## Action router

| Need                                           | Read                                                                             |
| ---------------------------------------------- | -------------------------------------------------------------------------------- |
| Choose component or inspect API                | [discovery.md](discovery.md) → package specs index + units                       |
| Intent → component id shortcut                 | [component-matrix.md](component-matrix.md) — confirm in specs index/units        |
| Forms, Dialog, Popover, Menu, Toast, compounds | [composition.md](composition.md) → then specs `patterns`/`usage`/`props`         |
| Layout / density / Stack·Grid·Masonry          | [layout.md](layout.md); prop names in units                                      |
| Props, `--vui-*`, elevation, motion **engine** | [styling.md](styling.md)                                                         |
| Compose-time accessibility (not full audit)    | [accessibility.md](accessibility.md)                                             |
| Motion tokens / reduced-motion                 | **viraui-motion**; engine preference → [styling.md](styling.md) modern CSS       |
| APG audit / keyboard or SR debug               | **viraui-a11y**                                                                  |
| Consumer `data-*` / vibrancy / elevation attrs | [custom-attributes.md](custom-attributes.md) → `specs/foundation/attributes.xml` |
| Icons / glyphs / icon slots (any library)      | [icons.md](icons.md)                                                             |
| Viewport-conditional React / `useBreakpoints`  | Specs index → `breakpoints` units                                                |
| End of work / before claiming done             | [verify.md](verify.md) — adversarial pass; 0 critical                            |

## Authority (in order)

1. **Package specs** for the installed version — `index.xml` + `activity-hints.xml` + scoped units (`meta` → `props` → `usage` → `a11y` / `patterns`, foundation).
2. **Base UI API** — when `meta.xml` has `<base_ui href>`, open that ref after Vira props (pass-through / wraps / regroupings). Still unsure → ask. Detail → [discovery.md](discovery.md).
3. **Types / source** — verify accepted props, pass-through, and defaults **after** units (+ Base UI when linked). Never first discovery.
4. **Stories** — examples only; never API authority.
5. **Skills** — routers and playbooks only; never a second props encyclopedia.

## Filesystem recipe

Prefer package subpaths (`@viraui/react/specs/*`). On disk under the install:

- `node_modules/@viraui/react/dist/specs/PROTOCOL.md`
- `node_modules/@viraui/react/dist/specs/index.xml`
- `node_modules/@viraui/react/dist/specs/activity-hints.xml`
- `node_modules/@viraui/react/dist/specs/components/<id>/*.xml`
- `node_modules/@viraui/react/dist/specs/foundation/*.xml`

## FORBIDDEN discovery

Do **not** `ls` / `rg` / `grep` `dist/components/**` or `*.d.ts` trees to discover Vira API **before** opening the specs index and target units. Open a specific `.d.ts` with Read only to verify after units. Missing routes = index/content defect upstream — not permission to tree-walk.

## Consumer contract

1. Import Vira from `@viraui/react`. Icon slots take any `ReactNode`.
2. Index-first units before composing; omit equals-default props. Base UI surfaces: follow `meta` `base_ui` after Vira props — ask if still unsure.
3. Layout spacing + density → [layout.md](layout.md). Visual ladder / elevation / CSS motion engine → [styling.md](styling.md).
4. Icon-only: icon slots + accessible name — never `children` on `IconButton` / `IconButtonLink` / `ToggleButton`.
5. Prefer documented consumer `data-*` — [custom-attributes.md](custom-attributes.md).
6. Consumers own page landmarks/status/focus; do not re-apply widget ARIA Base UI emits — [accessibility.md](accessibility.md).

## Red flags — STOP

| Excuse                                          | Reality                                           |
| ----------------------------------------------- | ------------------------------------------------- |
| “Small UI tweak — skip the skill”               | ~1% UI fit → Read hub                             |
| “rg/ls dist/components or *.d.ts first”         | Specs index + units first — FORBIDDEN shell-parse |
| “Story shows this prop — ship it”               | Specs units + source own API                      |
| “Default prop for clarity”                      | Omit documented defaults                          |
| “Invent Base UI pass-through from memory”       | `meta` `base_ui` → Base UI API; ask if still unsure |
| “Bare Stack/Grid/Surface is omit-defaults”      | Unset gap/padding = 0 — [layout.md](layout.md)    |
| “Plain `div`/`header` + display:flex”           | Flex framing = `Stack`; tag via `render`          |
| “CSS grid / columns instead of Grid/Masonry”    | Tracks → `Grid`; ragged pack → `Masonry`          |
| “Unstyled — import component CSS”               | **viraui-setup**                                  |
| “Scroll reveal needs IntersectionObserver”      | [styling.md](styling.md) CSS timelines first      |
| “Must use `@viraui/icons/react` for every slot” | Any ReactNode — [icons.md](icons.md)              |
| “Dynamic import map of every icon”              | Static named imports — [icons.md](icons.md)       |
| “Bare glyph = accessible name”                  | Wrap control + parent name — [icons.md](icons.md) |
| “Ship now — verify later”                       | Hard gate — [verify.md](verify.md) before done    |

## Before done

After JSX/CSS for any task that loaded this skill: **Read [verify.md](verify.md)**. Run the adversarial checklist against the final output. Fix every critical finding and re-run. Claim done only at **0 critical**.

## Out of scope

Monorepo Vira authoring, npm release, APG structured audit (→ **viraui-a11y**), first-time bootstrap (→ **viraui-setup**).

## Next skill

Structured APG audit → **viraui-a11y**. Screen motion → **viraui-motion** hub + one ref.
