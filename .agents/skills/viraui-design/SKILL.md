---
name: viraui-design
description: >-
  Use when building, editing, debugging, or styling any UI in a ViraUI /
  @viraui/react consumer app — forms, overlays, page or shell layout, spacing,
  typography, icons, responsive or RTL, compounds, or visual polish — even if
  the user never names Vira, @viraui/react, or this skill. Also use when tempted
  to invent CSS modules, Tailwind utilities, raw HTML flex/grid, or restyle
  controls instead of public Vira props and parts. Load for login/settings/
  dashboard screens, Dialog/Menu/Toast compose, Stack/Surface/Grid/Masonry,
  icon-only controls, missing or unstyled Vira after bootstrap, or props-vs-CSS
  questions.
license: MIT
metadata:
  author: Vira Software
  version: '2026.10.16'
---

# viraui-design

Thin router for `@viraui/react`. When UI/task fit is ~1%+, **read this hub before JSX, CSS, or invented props.** Durable API facts → package specs; skill pages = discipline only. Works on **any** Agent Skills host (Cursor, Claude Code, Codex, Gemini, …) — same hub, same gates.

## Step 0 — props before CSS (hard)

Before any new `.module.css`, visual `className`, or Tailwind utility on a **Vira root**:

1. Open that surface’s `props.xml` **and** `usage.xml` (index → units).
2. If a public prop or Stack/layout pattern covers it → **use it**. Stop. No className.
3. Else if a public `--vui-*` covers it → set the hook.
4. Else: app chrome the system does not own, **or** consumer **expressly asked** for an override → minimal CSS for that ask only.

Unsolicited reshape CSS on Vira roots = protocol fail. Detail → [styling.md](styling.md), [layout.md](layout.md). Mid-draft: after first JSX, scan reinvented props-as-CSS **before** polish.

## Stance: compose WITH the system

Build from Vira **parts + public props**. Open units before JSX/CSS.

- **Do:** index → `meta`/`props`/`usage` → assemble; prefer another Vira part/prop when something looks missing; custom CSS for **app chrome** only.
- **Do not (default):** invent CSS on Vira roots “to match the mock” **unless the consumer expressly requested** that customization.

Missing global styles → **viraui-setup** first. Vague intent / anti-pattern map → [symptoms.md](symptoms.md). Rationalization table → [red-flags.md](red-flags.md) (**read with this hub**).

## Mandatory load

| Signal                                                      | Action                                                |
| ----------------------------------------------------------- | ----------------------------------------------------- |
| Any `@viraui/react` compose, edit, debug, or styling task   | Read this hub first                                   |
| User never said “viraui-design”                             | Still load — description is discovery only            |
| Composing a screen (forms, shell, overlays, page chrome)    | Also read [accessibility.md](accessibility.md)        |
| Transitions, hover/press, overlay motion, custom motion CSS | **viraui-motion** hub + one ref                       |
| Missing global styles                                       | **viraui-setup** before inventing CSS workarounds     |
| Explicit APG audit / SR-keyboard debug                      | **viraui-a11y** (not this skill for structured audit) |
| After JSX/CSS for this task — before claiming done          | **Read [verify.md](verify.md)**; emit ship report     |

## Action router

| Need                                                            | Read                                                                                         |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Vague intent / which anti-pattern                               | [symptoms.md](symptoms.md)                                                                   |
| Choose component or inspect API                                 | [discovery.md](discovery.md) → package specs index + units (`props` **and** `usage` do/dont) |
| Intent → component id shortcut                                  | [component-matrix.md](component-matrix.md) — confirm in specs index/units                    |
| Forms, Dialog, Popover, Menu, Toast, compounds                  | [composition.md](composition.md) → then specs `patterns`/`usage`/`props`                     |
| Layout / density / Stack·Grid·Masonry                           | [layout.md](layout.md); prop names in units                                                  |
| Mobile-first / `@media` / `useBreakpoints` / RTL                | [responsive.md](responsive.md) → specs `breakpoints` + `direction-provider` units            |
| Props, `--vui-*`, elevation, motion **engine**                  | [styling.md](styling.md)                                                                     |
| Readable text measure / leading / `wrap` / `whiteSpace` / align | [typography.md](typography.md) → Text / Title / Prose / plain HTML                           |
| Bare HTML lists / prose / tables / link chrome                  | [preflight-baseline.md](preflight-baseline.md) → `foundation/modules.xml`                    |
| Compose-time accessibility (not full audit)                     | [accessibility.md](accessibility.md)                                                         |
| Motion tokens / reduced-motion                                  | **viraui-motion**; engine preference → [styling.md](styling.md) modern CSS                   |
| APG audit / keyboard or SR debug                                | **viraui-a11y**                                                                              |
| Consumer `data-*` / vibrancy / elevation attrs                  | [custom-attributes.md](custom-attributes.md) → `specs/foundation/attributes.xml`             |
| Icons / glyphs / icon slots (any library)                       | [icons.md](icons.md)                                                                         |
| Excuses / STOP table                                            | [red-flags.md](red-flags.md)                                                                 |
| End of work / before claiming done                              | [verify.md](verify.md) — ship report required; 0 critical                                    |

## Authority (in order)

1. **Package specs** — `index.xml` + `activity-hints.xml` + scoped units.
2. **Base UI API** — when `meta.xml` has `<base_ui href>`, after Vira props. Still unsure → ask.
3. **Types / source** — verify after units. Never first discovery.
4. **Stories** — examples only; never API authority.
5. **Skills** — routers and playbooks only; never a second props encyclopedia.

## Filesystem recipe

Prefer `@viraui/react/specs/*`. On disk: `node_modules/@viraui/react/dist/specs/` (`PROTOCOL.md`, `index.xml`, `activity-hints.xml`, `components/<id>/*.xml`, `foundation/*.xml`).

## FORBIDDEN discovery

Do **not** `ls` / `rg` / `grep` `dist/components/**` or `*.d.ts` trees to discover Vira API **before** specs index + target units. Read a specific `.d.ts` only to verify after units.

## Consumer contract

1. **Compose with ViraUI** — public parts + props from units. Reshape with custom CSS **only when the consumer expressly asks**.
2. Import from `@viraui/react`. Icon slots take any `ReactNode`.
3. Index-first units; omit equals-default props. Base UI: follow `meta` `base_ui` after Vira props.
4. **Props before CSS** — Step 0. No exceptions for “I already know Button.”
5. Layout → [layout.md](layout.md). Responsive/RTL → [responsive.md](responsive.md). Visual ladder → [styling.md](styling.md). Measure → [typography.md](typography.md).
6. Icon-only: icon slots + accessible name — never `children` on `IconButton` / `IconButtonLink` / `ToggleButton`. Omit glyph `size` / width / height — [icons.md](icons.md).
7. Prefer documented consumer `data-*` — [custom-attributes.md](custom-attributes.md).
8. Bare HTML lists/prose/tables/links — preflight owns them — [preflight-baseline.md](preflight-baseline.md).
9. Landmarks, heading outline, semantic hosts (`render`); do not re-apply widget ARIA Base UI emits — [accessibility.md](accessibility.md).

## Before done (non-optional)

After JSX/CSS for any task that loaded this skill:

1. **Read [verify.md](verify.md)**.
2. Run the adversarial checklist against the **final** diff.
3. **Emit the ship report** in the final reply (template in verify.md). Silent mental checklist = fail.
4. Fix every critical → re-run → claim done only at **0 critical** with `adversarial verify: pass`.

## Out of scope

Monorepo Vira authoring, npm release, APG structured audit (→ **viraui-a11y**), first-time bootstrap (→ **viraui-setup**).

## Next skill

Structured APG audit → **viraui-a11y**. Screen motion → **viraui-motion** hub + one ref.
