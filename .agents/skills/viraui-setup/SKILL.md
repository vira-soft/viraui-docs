---
name: viraui-setup
description: Use when initializing a consumer ViraUI React app (Next.js, Remix, Astro, Vite), installing publishable ViraUI agent skills, fixing bootstrap or import-order bugs, configuring theme or foundation presets, mounting root overlay providers, or setting preflight data attributes. Symptoms include missing styles, unstyled components, toasts not appearing, dialog indent missing, wrong theme/preflight order, or first-time @viraui/react integration.
license: MIT
metadata:
  author: Vira Software
  version: '2026.1.2'
---

# viraui-setup

Consumer bootstrap for `@viraui/react`. Load when setup, theme, preflight, or root-provider symptoms match — **not** for routine UI compose (that is **viraui-design**).

## When to load

- New project or first `@viraui/react` integration
- Installing or refreshing publishable ViraUI agent skills (`viraui-*`)
- Missing styles, unstyled components, wrong typography baseline
- Theme swap, custom token overrides, or foundation preset choice
- `data-mode`, elevation, vibrancy, or flex opt-out attributes
- Import-order bugs (theme after components, CSS `@import` bootstrap)
- Toasts not appearing, dialog indent missing, overlay providers missing from root

## When not to load

- Choosing components, layout, props, or styling on a bootstrapped app → **viraui-design**
- APG audit or keyboard/SR debug → **viraui-a11y**
- Motion on custom CSS while composing → **viraui-design** then **viraui-motion** hub
- Generic `skills find` / skills.sh search unrelated to ViraUI

## Action router

| User intent                                 | Read                                                                                                                              |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Install packages / first-time bootstrap     | [bootstrap.md](bootstrap.md)                                                                                                      |
| Install or refresh agent skills             | [bootstrap.md](bootstrap.md) (Agent skills section)                                                                               |
| Next.js / Remix / Astro / Vite import sites | [frameworks.md](frameworks.md)                                                                                                    |
| Toast / Dialog / Tooltip root providers     | [bootstrap.md](bootstrap.md) then [frameworks.md](frameworks.md)                                                                  |
| Custom theme or token overrides             | [theme.md](theme.md)                                                                                                              |
| Foundation preset or brand export           | [foundation-exports.md](foundation-exports.md)                                                                                    |
| Preflight and consumer `data-*` bootstrap   | [preflight.md](preflight.md) — compose when/how → **viraui-design** [custom-attributes.md](../viraui-design/custom-attributes.md) |

## Setup checklist

1. Install publishable agent skills (`npx skills add https://skills.sh/p/W6CiDSj87OlBuTgR`). See [bootstrap.md](bootstrap.md).
2. Install `@viraui/react` and peers (`react`, `react-dom`, `@base-ui/react`). See [bootstrap.md](bootstrap.md).
3. Load **one** compatible theme CSS before any Vira component renders. See [theme.md](theme.md) or [foundation-exports.md](foundation-exports.md).
4. Load consumer-owned font CSS matching theme `--font-family-*`. Preflight does not load fonts.
5. Import `@viraui/react/preflight.css` after theme and fonts. See [preflight.md](preflight.md).
6. Place bootstrap imports as **JavaScript side-effect imports** in the app root entry — never CSS `@import`. See [frameworks.md](frameworks.md).
7. Wrap the tree in canonical overlay providers (`Dialog.Provider` + indent parts, `Tooltip.Provider`, `Toast.Provider` + viewport). See [bootstrap.md](bootstrap.md).
8. Import public components from `@viraui/react` root only; component CSS follows the JS graph.
9. Set `data-mode` on `<html>` or a wrapper when using explicit light/dark/inverted modes.

## Machine JSON (authoritative paths)

After `@viraui/react` is installed, read from `node_modules` before guessing:

| File                                   | Purpose                                                 |
| -------------------------------------- | ------------------------------------------------------- |
| `@viraui/react/consumption.json`       | Packages, import order, root providers, framework rules |
| `@viraui/react/theme-surface.json`     | Required semantic CSS variable groups                   |
| `@viraui/react/preflight-surface.json` | Preflight `data-*` and related custom properties        |

Optional presets: `@viraui/foundation` CSS/JSON — see [foundation-exports.md](foundation-exports.md).

## Red flags — STOP

| Excuse                                          | Reality                                                    |
| ----------------------------------------------- | ---------------------------------------------------------- |
| “I'll `@import` preflight in global.css”        | Bootstrap is JS side-effect imports in app root only       |
| “Toast works if I add Provider on this page”    | Overlay providers belong in root layout once               |
| “Components unstyled — import Button CSS”       | Fix theme → fonts → preflight order first                  |
| “User asked for a form — load setup every time” | Bootstrapped app → **viraui-design**                       |
| “I'll guess Remix entry paths”                  | Read [frameworks.md](frameworks.md) and `consumption.json` |

## Out of scope

Monorepo component authoring, Vira repo CSS Modules, Storybook, workspace-only packages (`@viraui/postcss-config`, `@viraui/style-dictionary-utils`, `@viraui/tsconfig`, etc.).

## Next skill

When bootstrap is complete, load **viraui-design** to discover and compose UI. When composing screens with motion, **viraui-design** routes to **viraui-motion** (hub only, then one ref).
