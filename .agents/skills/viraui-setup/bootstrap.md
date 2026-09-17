# Bootstrap packages and import order

**When to read:** installing `@viraui/react`, installing agent skills, fixing missing styles / wrong import order, or mounting root overlay providers.

## Defaults

| Need             | Default                                                              |
| ---------------- | -------------------------------------------------------------------- |
| Agent skills     | `npx skills add https://skills.sh/p/W6CiDSj87OlBuTgR` (see below)    |
| Theme            | `@viraui/foundation/vira.css` (custom CSS OK if `theme-surface` fit) |
| Fonts            | Consumer `@font-face` / `@fontsource-variable/*` matching theme      |
| Preflight        | `@viraui/react/preflight.css` after theme + fonts                    |
| Import mechanism | JS side-effect imports in root entry — never CSS `@import`           |
| Overlay shell    | `Dialog` + `Tooltip` + `Toast` providers once at app root            |
| Components       | `@viraui/react` root barrel only                                     |

Authority: `@viraui/react/consumption.json` (`importOrder`, `requiredPackages`, `importMechanism`, `rootProviders`).

## Checklist

- [ ] Install publishable agent skills (`viraui-setup`, `viraui-design`, `viraui-motion`, `viraui-a11y`)
- [ ] Install `@viraui/react` + peers: `react`, `react-dom`, `@base-ui/react`
- [ ] Optional: `@viraui/foundation` for presets; `@viraui/icons` for content glyphs only
- [ ] Root entry: theme CSS → font CSS → preflight (then app globals)
- [ ] Mount provider shell once (see below); framework mount site → [frameworks.md](frameworks.md)
- [ ] Components from `@viraui/react`; content icons from `@viraui/icons/react` if installed
- [ ] Validate: semantic `--global-*` resolve; `toastManager.add` paints a `Toast.Banner`

## Agent skills

Source of truth is private repo [vira-soft/viraui-skills](https://github.com/vira-soft/viraui-skills), distributed as a [skills.sh](https://skills.sh) pack. Do **not** tell consumers to clone the monorepo or install deprecated npm `@viraui/skills`.

```bash
npx skills add https://skills.sh/p/W6CiDSj87OlBuTgR
```

Installs with [vercel-labs/skills](https://github.com/vercel-labs/skills). Pick agents when prompted (or pass `-a` / `-y` per that CLI).

Do not use `npx @viraui/skills`, `npm view @viraui/skills dist.tarball`, or hard-coded registry `.tgz` URLs.

## Packages

| Package               | Required? | Role                                                         |
| --------------------- | --------- | ------------------------------------------------------------ |
| `@viraui/react`       | Yes       | Components, preflight, machine JSON                          |
| `react` / `react-dom` | Yes       | Peers                                                        |
| `@base-ui/react`      | Yes       | Peer for wrapped primitives                                  |
| `@viraui/foundation`  | No        | Preset brand CSS / types / JSON                              |
| `@viraui/icons`       | No        | Content icons (`@viraui/icons/react`); chrome icons built-in |

Agent skills are not an app dependency — install via the pack URL above.

Custom-theme apps skip foundation if CSS matches `@viraui/react/theme-surface.json`.

## Supported paths

| Path                                                                                               | Support    | Rule                                                                     |
| -------------------------------------------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------ |
| `@viraui/react`                                                                                    | Yes        | Public components (not `Icon`)                                           |
| `@viraui/react/preflight.css`                                                                      | Yes        | Once, after theme + fonts                                                |
| `@viraui/react/*.css`                                                                              | Optional   | Debug / explicit tree-shake — not bootstrap                              |
| `catalog.json`, `consumption.json`, `theme-surface.json`, `preflight-surface.json`, `*.guide.json` | Yes        | Under `@viraui/react/`                                                   |
| `@viraui/icons`, `@viraui/icons/react`, `@viraui/icons/icon.guide.json`                            | Yes        | Metadata + named sync icons                                              |
| `@viraui/icons/react/icons/<variant>/<Name>`                                                       | Optional   | Deep per-icon modules                                                    |
| Compatible theme CSS / `@viraui/foundation` presets                                                | Theme req. | See [theme.md](theme.md), [foundation-exports.md](foundation-exports.md) |
| `@viraui/foundation/vira/css`, `web`                                                               | Deprecated | Alias to preset CSS                                                      |
| `@viraui/postcss-config`, `@viraui/style-dictionary-utils`, `@viraui/tsconfig`                     | No         | Workspace-only                                                           |
| Deep React component JS / raw `@viraui/icons` SVG                                                  | No         | Public barrels only                                                      |

## Import order

In the app **root entry** ([frameworks.md](frameworks.md)):

1. Theme CSS — preset, custom, or theme-builder export
2. Font CSS — matches `--font-family-heading|body|mono`
3. `@viraui/react/preflight.css`
4. App-owned globals (e.g. `./globals.css`)

CSS alone does not enable overlays — wrap the tree in the provider shell next.

## Root providers

Mount **once** at framework root. Overlay part trees: `*.guide.json` + **viraui-design** `composition.md`.

| Part                                                            | Role                                                                                                      |
| --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `Dialog.Provider` + `Dialog.IndentBackground` + `Dialog.Indent` | Sheet indent. `IndentBackground` / `Indent` are **siblings** under `Provider`; `Indent` wraps app content |
| `Tooltip.Provider`                                              | Shared open/close delay                                                                                   |
| `Toast.createToastManager()`                                    | Module-scope (not inside render); pass to `Toast.Provider`                                                |
| `Toast.Provider` + portal viewport                              | Map `Toast.useToastManager().toasts` → `Toast.Banner`                                                     |

```tsx
import { Dialog, Toast, Tooltip } from '@viraui/react';

const toastManager = Toast.createToastManager();

function ToastRegion() {
  const { toasts } = Toast.useToastManager();
  return (
    <Toast.Portal>
      <Toast.Viewport>
        {toasts.map((toast) => (
          <Toast.Banner key={toast.id} description={toast.description} toast={toast} />
        ))}
      </Toast.Viewport>
    </Toast.Portal>
  );
}

export function ViraProviders({ children }: { children: React.ReactNode }) {
  return (
    <Dialog.Provider>
      <Dialog.IndentBackground />
      <Dialog.Indent>
        <Tooltip.Provider>
          <Toast.Provider toastManager={toastManager}>
            {children}
            <ToastRegion />
          </Toast.Provider>
        </Tooltip.Provider>
      </Dialog.Indent>
    </Dialog.Provider>
  );
}
```

Anchored toasts: second manager + `Toast.Viewport position="anchored"` + `Toast.Positioner` → **viraui-design** `composition.md`. RTL: Base UI `DirectionProvider direction="rtl"` + `dir="rtl"` on a portal ancestor (usually `<html>`).

## Component imports

```tsx
import { Button, Stack } from '@viraui/react';
import { Xmark } from '@viraui/icons/react';
```

Component CSS rides the JS module graph. Do not add per-component CSS to bootstrap unless debugging.

## Gotchas

| Mistake                                             | Fix                                                                   |
| --------------------------------------------------- | --------------------------------------------------------------------- |
| `@import '@viraui/*'` in `globals.css`              | JS side-effect imports in root entry ([frameworks.md](frameworks.md)) |
| CSS-only layout then `toastManager.add`             | Mount shell; viewport must map toasts → `Toast.Banner`                |
| `import { Indent }` / standalone indent             | Use `Dialog.Indent` + `Dialog.IndentBackground`                       |
| Providers in a Next.js Server Component             | Client wrapper around `children`; CSS stays in layout                 |
| Astro providers in a different island than overlays | Same React island as Dialog/Tooltip/Toast consumers                   |
| Theme CSS expected to load fonts                    | Separate font CSS in step 2 of import order                           |
| Override only raw `--color-*`                       | Override semantic vars ([theme.md](theme.md))                         |
| Workspace infra packages as consumer deps           | Public packages only                                                  |
| Render Vira before theme/preflight loads            | Fix import order before chasing component CSS                         |

## Stop — validate

| Check     | Expected                                                  |
| --------- | --------------------------------------------------------- |
| Theme     | `--global-*` resolve in DevTools before first Vira render |
| Preflight | Baseline typography / elevation utilities apply           |
| Barrel    | `import { Button } from '@viraui/react'` resolves         |
| Providers | Dialog / Tooltip / Toast providers wrap app               |
| Toast     | `toastManager.add` shows `Toast.Banner`                   |
| Fonts     | `@font-face` family names match theme `--font-family-*`   |
