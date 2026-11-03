---
name: viraui-design
description: >-
  Use when building, editing, debugging, or styling any UI in a ViraUI /
  @viraui/react consumer app — forms, overlays, page or shell layout, spacing,
  typography, icons, charts / graphs / plots / data visualization / KPI series /
  dashboards that need charts (@viraui/charts + @visx/visx peer), responsive or
  RTL, compounds, or visual polish — even if the user never names Vira,
  @viraui/react, @viraui/charts, or this skill. Also use when tempted to invent
  CSS modules, Tailwind utilities, raw HTML flex/grid, packaged LineChart /
  BarChart / PieChart wrappers, or restyle controls instead of public Vira props
  and parts. Load for login/settings/dashboard screens, Dialog/Menu/Toast
  compose, Stack/Surface/Grid/Masonry, icon-only controls, missing or unstyled
  Vira after bootstrap, or props-vs-CSS questions.
license: MIT
metadata:
  author: Vira Software
  version: '2026.11.03'
---

# viraui-design

Thin router for `@viraui/react` (+ charts → `@viraui/charts`). When UI/task fit is ~1%+, **read this hub before JSX, CSS, or invented props.** Durable API → package specs; skill pages = discipline only. Any Agent Skills host — same hub, same gates.

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

Missing global styles → **viraui-setup** first. Vague intent → [symptoms.md](symptoms.md). Rationalizations → [red-flags.md](red-flags.md) (**read with this hub**).

## Mandatory load

| Signal                                                                       | Action                                                                                               |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Any `@viraui/react` compose / edit / debug / style                           | Read this hub first                                                                                  |
| User never said “viraui-design”                                              | Still load — description is discovery only                                                           |
| Chart / graph / plot / data viz / KPI series / pie·donut·radar·bar·line·area | [charts.md](charts.md) → install `@viraui/charts` + `@visx/visx` if missing → `@viraui/charts/specs` |
| Screen compose (forms, shell, overlays, chrome)                              | Also [accessibility.md](accessibility.md)                                                            |
| Transitions / hover-press / overlay motion CSS                               | **viraui-motion** hub + one ref                                                                      |
| Missing global styles                                                        | **viraui-setup** before CSS workarounds                                                              |
| Explicit APG audit / SR-keyboard debug                                       | **viraui-a11y**                                                                                      |
| After JSX/CSS — before claiming done                                         | **Read [verify.md](verify.md)**; emit ship report                                                    |

## Action router

| Need                                                                | Read                                                                                 |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Vague intent / anti-pattern                                         | [symptoms.md](symptoms.md)                                                           |
| Choose component / inspect API                                      | [discovery.md](discovery.md) → specs index + units                                   |
| Intent → component id                                               | [component-matrix.md](component-matrix.md) — confirm in units                        |
| Forms, Dialog, Popover, Menu, Toast, compounds, custom field labels | [composition.md](composition.md) → specs `patterns`/`usage`/`props`                  |
| Layout / density / Stack·Grid·Masonry / prefer-`safe`               | [layout.md](layout.md)                                                               |
| Mobile-first / `@media` / `useBreakpoints` / RTL                    | [responsive.md](responsive.md)                                                       |
| Props, `--vui-*`, elevation, motion **engine**                      | [styling.md](styling.md)                                                             |
| Text measure / leading / `wrap` / `whiteSpace` / align              | [typography.md](typography.md)                                                       |
| Bare HTML lists / prose / tables / link chrome                      | [preflight-baseline.md](preflight-baseline.md)                                       |
| Compose-time a11y (not full audit)                                  | [accessibility.md](accessibility.md)                                                 |
| Motion tokens / reduced-motion                                      | **viraui-motion**; engine → [styling.md](styling.md)                                 |
| APG audit / keyboard or SR debug                                    | **viraui-a11y**                                                                      |
| Consumer `data-*` / vibrancy / elevation                            | [custom-attributes.md](custom-attributes.md)                                         |
| Icons / glyph slots                                                 | [icons.md](icons.md)                                                                 |
| Charts / graph / plot / data viz / `@viraui/charts`                 | [charts.md](charts.md) → install if missing → `@viraui/charts/specs`; no `LineChart` |
| Excuses / STOP                                                      | [red-flags.md](red-flags.md)                                                         |
| End of work                                                         | [verify.md](verify.md) — ship report; 0 critical                                     |

## Authority (in order)

1. **Package specs** — `index.xml` + `activity-hints.xml` + scoped units (`@viraui/react/specs` UI; `@viraui/charts/specs` charts).
2. **Base UI API** — when `meta.xml` has `<base_ui href>`, after Vira props. Still unsure → ask.
3. **Types / source** — verify after units. Charts: upstream visx docs after units.
4. **Stories** — examples only.
5. **Skills** — routers only; never a second props encyclopedia.

## Filesystem recipe

`@viraui/react/specs/*` → `node_modules/@viraui/react/dist/specs/`. Charts → `@viraui/charts/specs/*` → `node_modules/@viraui/charts/dist/specs/` — [charts.md](charts.md).

## FORBIDDEN discovery

No `ls` / `rg` / `grep` on `dist/components/**` or `*.d.ts` **before** specs index + target units. No monorepo clone / skills prose as charts API when `@viraui/charts` is installed.

## Consumer contract

1. Compose with public parts + props from units. Custom CSS reshape **only** when consumer expressly asks.
2. Import from `@viraui/react`. Icon slots: any `ReactNode`.
3. Index-first; omit equals-default props (incl. color) — [styling.md](styling.md). Base UI via `meta` after Vira props.
4. **Props before CSS** — Step 0.
5. Layout → [layout.md](layout.md). Responsive/RTL → [responsive.md](responsive.md). Ladder → [styling.md](styling.md). Measure → [typography.md](typography.md).
6. Icon-only: slots + accessible name; omit glyph `size`/width/height — [icons.md](icons.md).
7. Documented consumer `data-*` — [custom-attributes.md](custom-attributes.md).
8. Bare HTML lists/prose/tables/links — [preflight-baseline.md](preflight-baseline.md).
9. Landmarks, heading outline, semantic `render`; no duplicate Base UI widget ARIA — [accessibility.md](accessibility.md).

## Before done (non-optional)

1. **Read [verify.md](verify.md)**.
2. Adversarial checklist on **final** diff.
3. **Emit ship report** in final reply. Silent mental checklist = fail.
4. Fix criticals → re-run → done only at **0 critical** with `adversarial verify: pass`.

## Out of scope

Monorepo authoring, npm release, APG structured audit (→ **viraui-a11y**), first-time bootstrap (→ **viraui-setup**).

## Next skill

APG audit → **viraui-a11y**. Screen motion → **viraui-motion**.
