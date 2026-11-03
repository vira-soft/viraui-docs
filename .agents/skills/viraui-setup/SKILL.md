---
name: viraui-setup
description: Use when initializing a consumer ViraUI React app (Next.js, Remix, Astro, Vite), installing publishable ViraUI agent skills, fixing bootstrap or import-order bugs, choosing default @viraui/foundation vs App Studio custom theme.css, configuring theme or foundation presets, mounting root overlay providers, setting preflight data attributes, coexisting with Tailwind/Bootstrap or other CSS-framework preflight/reset, deciding whether @viraui/icons is required, or using lucide-react or another icon library in Vira slots. Symptoms include missing styles, unstyled components, toasts not appearing, dialog indent missing, wrong theme/preflight order, framework reset fighting Vira, or first-time @viraui/react integration.
license: MIT
metadata:
  author: Vira Software
  version: '2026.10.16'
---

# viraui-setup

Consumer bootstrap for `@viraui/react`. Load when setup, theme, preflight, or root-provider symptoms match — **not** for routine UI compose (that is **viraui-design**). Portable across Agent Skills hosts (Cursor, Claude Code, Codex, Gemini, …) via `npx skills add vira-soft/viraui-skills`.

Durable bootstrap facts live in `@viraui/react/specs/foundation/bootstrap.xml` (and related foundation units). This hub is a thin checklist + router.

## When to load

- New project / first `@viraui/react` integration, or refreshing `viraui-*` agent skills
- Missing styles, wrong typography, theme/preflight/import-order bugs
- Default foundation vs App Studio / custom `theme.css`; foundation preset choice
- Bootstrap `data-*`, overlay providers missing, CSS-framework reset coexistence
- Whether `@viraui/icons` is required vs another icon library

## When not to load

- Routine UI compose → **viraui-design**; APG audit → **viraui-a11y**; motion tokens → **viraui-motion** via design; unrelated skills.sh search

## Action router

| User intent                                        | Read                                                                                                                              |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Install packages / first-time bootstrap            | [bootstrap.md](bootstrap.md) + `@viraui/react/specs/foundation/bootstrap.xml`, then [theme.md](theme.md)                          |
| Install or skip `@viraui/icons` or other icon libs | [bootstrap.md](bootstrap.md) + bootstrap.xml                                                                                      |
| Install or refresh agent skills                    | Hub (Agent skills) + optional [agents-project-note.md](agents-project-note.md)                                                    |
| Next.js / Remix / Astro / Vite import sites        | [frameworks.md](frameworks.md)                                                                                                    |
| Toast / Dialog / Tooltip root providers            | [bootstrap.md](bootstrap.md) + bootstrap.xml `root_providers` + [frameworks.md](frameworks.md)                                    |
| Default vs App Studio / custom theme               | [theme.md](theme.md) — **ask before** foundation or font installs                                                                 |
| Custom theme or token overrides                    | [theme.md](theme.md)                                                                                                              |
| Foundation preset or brand export                  | [foundation-exports.md](foundation-exports.md) (only after default answer)                                                        |
| Preflight and consumer `data-*` bootstrap          | [preflight.md](preflight.md) — compose when/how → **viraui-design** [custom-attributes.md](../viraui-design/custom-attributes.md) |
| Tailwind / Bootstrap / other CSS reset coexistence | [css-framework-coexistence.md](css-framework-coexistence.md) — warn, ask, omit third-party preflight                              |

## Setup checklist

1. Install publishable agent skills: `npx skills add vira-soft/viraui-skills` (all hosts). Optional: [agents-project-note.md](agents-project-note.md) into consumer `AGENTS.md`.
2. Install `@viraui/react` and peers (`react`, `react-dom`, `@base-ui/react`). `@viraui/icons` is optional — icon slots take any ReactNode.
3. **Ask** default Vira theme (`@viraui/foundation`) vs App Studio custom `theme.css` — do **not** install foundation/fonts until answered. See [theme.md](theme.md).
4. Load **one** compatible theme CSS before any Vira component renders.
5. Load consumer-owned font CSS matching theme `--font-family-*` / Studio fontsource ids.
6. Import `@viraui/react/preflight.css` after theme and fonts. See [preflight.md](preflight.md).
7. If Tailwind / Bootstrap / other CSS-framework reset is present: **warn**, **ask**, prefer omit third-party preflight. See [css-framework-coexistence.md](css-framework-coexistence.md).
8. Place bootstrap imports as **JavaScript side-effect imports** in the app root entry — never CSS `@import`. See [frameworks.md](frameworks.md).
9. Wrap the tree in canonical overlay providers (`Dialog.Provider` + indent parts, `Tooltip.Provider`, `Toast.Provider` + viewport) — exact tree in `foundation/bootstrap.xml`.
10. Import public components from `@viraui/react` root only; component CSS follows the JS graph.
11. Set `data-mode` on `<html>` or a wrapper when using explicit light/dark/inverted modes.

## Package specs (authoritative)

After `@viraui/react` is installed, read from `node_modules` before guessing:

| Path                                              | Purpose                                                 |
| ------------------------------------------------- | ------------------------------------------------------- |
| `@viraui/react/specs/PROTOCOL.md`                 | Index-first authority order                             |
| `@viraui/react/specs/index.xml`                   | Navigation index                                        |
| `@viraui/react/specs/foundation/bootstrap.xml`    | Packages, import order, root providers, framework rules |
| `@viraui/react/specs/foundation/theme-topics.xml` | Required semantic CSS variable groups                   |
| `@viraui/react/specs/foundation/attributes.xml`   | Preflight `data-*` and related custom properties        |

On disk: `node_modules/@viraui/react/dist/specs/…`. Do **not** shell-parse `dist/components/**` or `*.d.ts` for bootstrap discovery.

Optional presets: `@viraui/foundation` CSS/JSON — only after default theme answer — see [foundation-exports.md](foundation-exports.md).

## Red flags — STOP

| Excuse                                          | Reality                                                                                                               |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| “I'll install foundation + fonts by default”    | Ask default vs App Studio first; Studio path skips foundation                                                         |
| “I'll `@import` preflight in global.css”        | Bootstrap is JS side-effect imports in app root only                                                                  |
| “Toast works if I add Provider on this page”    | Overlay providers belong in root layout once                                                                          |
| “Components unstyled — import Button CSS”       | Fix theme → fonts → preflight order first                                                                             |
| “Tailwind/Bootstrap already there — ignore it”  | Warn + ask; third-party preflight/reset can break Vira ([css-framework-coexistence.md](css-framework-coexistence.md)) |
| “Drop Vira preflight; keep Tailwind preflight”  | Keep Vira preflight; omit third-party reset (e.g. Tailwind theme+utilities)                                           |
| “User asked for a form — load setup every time” | Bootstrapped app → **viraui-design**                                                                                  |
| “Must install `@viraui/icons` for IconButton”   | Optional. Slots take any ReactNode (`lucide-react`, custom SVG, Vira glyphs)                                          |
| “I'll guess Remix entry paths”                  | Read [frameworks.md](frameworks.md) and `foundation/bootstrap.xml`                                                    |
| “Bootstrap done — summarize in prose only”      | End with setup-recap table (`done` / `skipped` / `blocked`)                                                           |

## Out of scope

Monorepo component authoring, Vira repo CSS Modules, Storybook, workspace-only packages.

## Done — setup recap (required)

When bootstrap / fix work **finishes**, or when the agent **stops mid-checklist**, end the reply with a **visual recap** — not a prose-only dump.

```markdown
## Setup recap

| Step                               | Status | What landed                       |
| ---------------------------------- | ------ | --------------------------------- |
| Agent skills                       |        |                                   |
| Packages (`@viraui/react` + peers) |        |                                   |
| Theme choice                       |        | default foundation / App Studio   |
| Theme CSS                          |        | import path or file               |
| Fonts                              |        | packages / skipped                |
| Preflight                          |        |                                   |
| CSS framework coexistence          |        | Tailwind/Bootstrap reset handling |
| Framework entry                    |        | file path                         |
| Overlay providers                  |        | Dialog / Tooltip / Toast          |
| `data-mode` / attrs                |        |                                   |
| Icons                              |        | optional / third-party / skipped  |
```

## Next skill

When bootstrap is complete, load **viraui-design** to discover and compose UI. When composing screens with motion, **viraui-design** routes to **viraui-motion**.
