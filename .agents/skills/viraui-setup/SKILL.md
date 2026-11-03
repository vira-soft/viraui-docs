---
name: viraui-setup
description: >-
  Use when initializing a consumer ViraUI React app (Next.js, Remix, Astro, Vite),
  installing publishable ViraUI agent skills, fixing bootstrap or import-order bugs,
  choosing default @viraui/foundation vs App Studio custom theme.css, configuring
  theme or foundation presets, mounting root overlay providers, setting preflight
  data attributes, coexisting with Tailwind/Bootstrap or other CSS-framework
  preflight/reset, deciding whether @viraui/icons is required, using lucide-react
  or another icon library in Vira slots, or asking whether the app will use charts /
  data viz and installing optional @viraui/charts + @visx/visx. Symptoms include
  missing styles, unstyled components, toasts not appearing, dialog indent missing,
  wrong theme/preflight order, framework reset fighting Vira, or first-time
  @viraui/react integration.
license: MIT
metadata:
  author: Vira Software
  version: '2026.11.03'
---

# viraui-setup

Consumer bootstrap for `@viraui/react`. Load when setup, theme, preflight, or root-provider symptoms match — **not** for routine UI compose (that is **viraui-design**). Portable across Agent Skills hosts via `npx skills add vira-soft/viraui-skills`.

Durable bootstrap facts → `@viraui/react/specs/foundation/bootstrap.xml`. This hub = thin checklist + router.

## When to load

- New project / first `@viraui/react` integration, or refreshing `viraui-*` agent skills
- Missing styles, wrong typography, theme/preflight/import-order bugs
- Default foundation vs App Studio / custom `theme.css`; foundation preset choice
- Bootstrap `data-*`, overlay providers missing, CSS-framework reset coexistence
- Whether `@viraui/icons` is required vs another icon library
- Whether the app will use charts / data viz (`@viraui/charts` + `@visx/visx`)

## When not to load

Routine UI compose → **viraui-design**. Chart compose after packages exist → **viraui-design** [charts.md](../viraui-design/charts.md). APG → **viraui-a11y**. Motion → **viraui-motion**. Unrelated skills.sh search → skip.

## Action router

| User intent                                        | Read                                                                                                                                     |
| -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Install packages / first-time bootstrap            | [bootstrap.md](bootstrap.md) + `foundation/bootstrap.xml`, then [theme.md](theme.md)                                                     |
| Charts / data-viz intent during bootstrap          | [bootstrap.md](bootstrap.md) — **ask** first; yes → `@viraui/charts` + `@visx/visx`; compose → design charts.md → `@viraui/charts/specs` |
| Install or skip `@viraui/icons` / other icon libs  | [bootstrap.md](bootstrap.md) + bootstrap.xml                                                                                             |
| Install or refresh agent skills                    | Hub + optional [agents-project-note.md](agents-project-note.md)                                                                          |
| Next.js / Remix / Astro / Vite import sites        | [frameworks.md](frameworks.md)                                                                                                           |
| Toast / Dialog / Tooltip root providers            | [bootstrap.md](bootstrap.md) + bootstrap.xml `root_providers` + [frameworks.md](frameworks.md)                                           |
| Default vs App Studio / custom theme               | [theme.md](theme.md) — **ask before** foundation or font installs                                                                        |
| Custom theme or token overrides                    | [theme.md](theme.md)                                                                                                                     |
| Foundation preset or brand export                  | [foundation-exports.md](foundation-exports.md) (only after default answer)                                                               |
| Preflight and consumer `data-*` bootstrap          | [preflight.md](preflight.md) — compose → **viraui-design** [custom-attributes.md](../viraui-design/custom-attributes.md)                 |
| Tailwind / Bootstrap / other CSS reset coexistence | [css-framework-coexistence.md](css-framework-coexistence.md) — warn, ask, omit third-party preflight                                     |

## Setup checklist

1. Agent skills: `npx skills add vira-soft/viraui-skills`. Optional [agents-project-note.md](agents-project-note.md).
2. Install `@viraui/react` + peers (`react`, `react-dom`, `@base-ui/react`). `@viraui/icons` optional.
3. **Ask charts intent** (early) — yes → default `@viraui/charts` + `@visx/visx`; no → skip; unanswered → blocked. Detail → [bootstrap.md](bootstrap.md). Later compose → design [charts.md](../viraui-design/charts.md) → `@viraui/charts/specs`.
4. **Ask** default foundation vs App Studio `theme.css` — no foundation/fonts until answered — [theme.md](theme.md).
5. One theme CSS before any Vira component renders.
6. Font CSS matching theme `--font-family-*` / Studio fontsource ids.
7. `@viraui/react/preflight.css` after theme + fonts — [preflight.md](preflight.md).
8. Tailwind/Bootstrap/other reset present → **warn**, **ask**, prefer omit third-party preflight — [css-framework-coexistence.md](css-framework-coexistence.md).
9. Bootstrap = JS side-effect imports in app root — never CSS `@import` — [frameworks.md](frameworks.md).
10. Root overlay providers (`Dialog` + indent, `Tooltip`, `Toast` + viewport) — `foundation/bootstrap.xml`.
11. Components from `@viraui/react` root only.
12. `data-mode` on `<html>` or wrapper when using explicit light/dark/inverted.

## Package specs (authoritative)

After `@viraui/react` is installed: `PROTOCOL.md`, `index.xml`, `foundation/bootstrap.xml`, `theme-topics.xml`, `attributes.xml` under `@viraui/react/specs/*` (`node_modules/.../dist/specs/`). Do **not** shell-parse `dist/components/**` or `*.d.ts` for bootstrap discovery. Charts after yes → also `@viraui/charts/specs/foundation/bootstrap.xml`. Presets → [foundation-exports.md](foundation-exports.md) only after default theme answer.

## Red flags — STOP

| Excuse                                    | Reality                                                                             |
| ----------------------------------------- | ----------------------------------------------------------------------------------- |
| “Install foundation + fonts by default”   | Ask default vs App Studio first                                                     |
| “`@import` preflight in global.css”       | JS side-effect imports in app root only                                             |
| “Toast Provider on this page”             | Overlay providers once at root                                                      |
| “Unstyled — import Button CSS”            | Fix theme → fonts → preflight first                                                 |
| “Keep full Tailwind/Bootstrap preflight”  | Warn + ask; prefer omit third-party reset                                           |
| “Drop Vira preflight for Tailwind”        | Keep Vira preflight                                                                 |
| “Form task — always load setup”           | Bootstrapped → **viraui-design**                                                    |
| “Must install `@viraui/icons`”            | Optional; any ReactNode in slots                                                    |
| “Skip charts ask” / “every `@visx/<pkg>`” | Ask early; yes → `@viraui/charts` + `@visx/visx` only; compose via design charts.md |
| “Guess Remix entry” / “prose-only done”   | [frameworks.md](frameworks.md) + bootstrap.xml; end with setup-recap table          |

## Out of scope

Monorepo component authoring, Vira repo CSS Modules, Storybook, workspace-only packages.

## Done — setup recap (required)

When bootstrap / fix work **finishes**, or when the agent **stops mid-checklist**, end with a **visual recap** — not prose-only.

```markdown
## Setup recap

| Step                               | Status | What landed                                                 |
| ---------------------------------- | ------ | ----------------------------------------------------------- |
| Agent skills                       |        |                                                             |
| Packages (`@viraui/react` + peers) |        |                                                             |
| Charts intent                      |        | asked; yes → `@viraui/charts` + `@visx/visx` / no → skipped |
| Theme choice                       |        | default foundation / App Studio                             |
| Theme CSS                          |        | import path or file                                         |
| Fonts                              |        | packages / skipped                                          |
| Preflight                          |        |                                                             |
| CSS framework coexistence          |        | Tailwind/Bootstrap reset handling                           |
| Framework entry                    |        | file path                                                   |
| Overlay providers                  |        | Dialog / Tooltip / Toast                                    |
| `data-mode` / attrs                |        |                                                             |
| Icons                              |        | optional / third-party / skipped                            |
```

## Next skill

Bootstrap complete → **viraui-design**. Motion on screens → design routes to **viraui-motion**.
