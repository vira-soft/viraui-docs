---
name: viraui-design
description: Use when building, editing, debugging, or styling any UI with @viraui/react in a consumer app, even if the user never named this skill. Symptoms include choosing components or compound parts, forms, overlays, page layout, public props, --vui-* styling, consumer data attributes, elevation or z-index, icon-only controls, or missing/unstyled Vira surfaces after bootstrap.
license: MIT
metadata:
  author: Vira Software
  version: '2026.1.0'
---

# viraui-design

Mandatory consumer guidance for `@viraui/react`. When UI/task fit is ~1%+, **Read this hub before JSX, CSS, or invented props.**

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

| Need                                             | Read                                                     |
| ------------------------------------------------ | -------------------------------------------------------- |
| Choose component or inspect API                  | [discovery.md](discovery.md), then target `*.guide.json` |
| Forms, Dialog, Popover, Menu, Toast, ToggleGroup | [composition.md](composition.md)                         |
| Page/section layout                              | [layout.md](layout.md)                                   |
| Compose-time accessibility (not full audit)      | [accessibility.md](accessibility.md)                     |
| Motion, transitions, micro-interactions          | **viraui-motion** (hub, then matching ref)               |
| APG audit / keyboard or SR debug                 | **viraui-a11y**                                          |
| Props, classes, `--vui-*`, elevation, z-index    | [styling.md](styling.md)                                 |
| Consumer `data-*`                                | [custom-attributes.md](custom-attributes.md)             |
| Full component routing                           | [component-matrix.md](component-matrix.md)               |

## Authority (in order)

1. Installed source/types — accepted props and defaults.
2. Target `*.guide.json` — intent, structure, Vira-added props, accessibility, anti-patterns, documented `--vui-*`.
3. `baseUIApi` — upstream pass-through when present.
4. Stories — examples only, never API authority.

## Consumer contract

1. Import Vira from `@viraui/react`; icons from `@viraui/icons/react`.
2. Read `catalog.json`, source/types, and target guide before composing.
3. Pass only public props and parts. Never infer API from another library or a story.
4. Omit every prop equal to its documented/source default.
5. Icon-only controls use icon slots + accessible name. Never `children` on `IconButton`, `IconButtonLink`, or `ToggleButton`.
6. Visible text → `Button` / `ButtonLink`; do not hack icon-only APIs.
7. Prefer `Stack`/`Surface`; follow [styling.md](styling.md). Prefer documented consumer `data-*` — [custom-attributes.md](custom-attributes.md). Do not invent props, parts, hooks, or attributes.
8. Consumers own page landmarks, status, focus order, names. Do not re-apply widget `role`/`aria-*` Base UI emits — [accessibility.md](accessibility.md).
9. Interactive custom CSS uses `--duration-*` / `--easing-*` and `prefers-reduced-motion` — **viraui-motion**.

## Machine entry points

- `@viraui/react/catalog.json`
- `@viraui/react/<id>.guide.json`
- `@viraui/react/preflight-surface.json`
- `@viraui/react/consumption.json`

## Red flags — STOP

| Excuse                              | Reality                                              |
| ----------------------------------- | ---------------------------------------------------- |
| “Small UI tweak — skip the skill”   | ~1% UI fit → Read hub                                |
| “Story shows this prop — ship it”   | Guide + source own API                               |
| “Default prop for clarity”          | Omit documented defaults                             |
| “IconButton with text children”     | Wrong component or missing `aria-label` on icon-only |
| “Add role=tablist so audit sees it” | Inspect DOM; omit dup widget ARIA                    |
| “Unstyled — import component CSS”   | **viraui-setup** bootstrap                           |
| “Motion later / Vira-only”          | **viraui-motion** for custom CSS too                 |

## Rationalization counters

- **Explicit default props** → re-read source; omit equals-default.
- **Undocumented compound part** → guide `structure` + [composition.md](composition.md).
- **Hand-rolled shadow/z-index** → [styling.md](styling.md) elevation contract.
- **Raw `200ms ease`** → **viraui-motion** tokens + reduced-motion.

## Out of scope

Monorepo Vira authoring, npm release, APG structured audit (→ **viraui-a11y**), first-time bootstrap (→ **viraui-setup**).

## Next skill

Structured APG audit → **viraui-a11y**. Screen motion → **viraui-motion** hub + one ref.
