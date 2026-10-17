# Framework entry points

**When to read:** choosing where theme/preflight imports and `ViraProviders` mount (Next.js, Remix, Astro, Vite).

## Default

Same bootstrap everywhere:

1. JS side-effect imports: **theme → fonts → preflight** (then app CSS)
2. Mount `ViraProviders` once around the app tree (shell below; confirm in specs)
3. Never bootstrap via CSS `@import` in a global stylesheet

Authority: `@viraui/react/specs/foundation/bootstrap.xml` → Next.js / provider sections.

## Canonical import block

Theme line depends on prior **theme choice** ([theme.md](theme.md)). Do not paste foundation imports until consumer answered.

**Default Vira theme** (after answer):

```tsx
import '@viraui/foundation/vira.css';
import '@fontsource-variable/geist/wght.css';
import '@fontsource-variable/geist-mono/wght.css';
import '@viraui/react/preflight.css';
```

**App Studio / custom theme** (after paste + font detect):

```tsx
import './vira-theme.css'; // consumer-saved Studio or custom CSS
import '@fontsource-variable/<id>/wght.css'; // one import per id found in CSS
import '@viraui/react/preflight.css';
```

Match font packages to `--font-family-*` / Studio `@font-face` fontsource ids — [theme.md](theme.md).

## Overlay shell (`ViraProviders`)

Confirm the exact tree in `foundation/bootstrap.xml`. Minimal consumer wrapper:

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

`BreakpointsProvider` and `DirectionProvider` are **not** part of this overlay shell — add only when needed. Discipline (maps, RTL + `dir`, Stack flex vs LTR/RTL) → **viraui-design** [responsive.md](../viraui-design/responsive.md). Overlay part trees → **viraui-design** discovery + dialog/toast/tooltip specs units.

## Next.js (App Router) — default

| Rule      | Detail                                                                                                                                                     |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CSS entry | `app/layout.tsx` (Server Component OK)                                                                                                                     |
| Providers | Client module wrapping `{children}` — not the layout module itself. Overlay shell above; add `BreakpointsProvider` / `DirectionProvider` only when needed. |
| Forbidden | `@import '@viraui/*'` or font-package `@import` in `app/globals.css`                                                                                       |
| Modes     | `data-mode` on `<html>` when using light/dark/inverted                                                                                                     |

```tsx
// app/layout.tsx — default theme path (after theme-choice ask)
import '@viraui/foundation/vira.css';
import '@fontsource-variable/geist/wght.css';
import '@fontsource-variable/geist-mono/wght.css';
import '@viraui/react/preflight.css';
import './globals.css';
import { ViraProviders } from './vira-providers'; // 'use client' + shell above

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="system">
      <body>
        <ViraProviders>{children}</ViraProviders>
      </body>
    </html>
  );
}
```

Studio custom: replace foundation + default fonts with `./vira-theme.css` and detected `@fontsource-variable/*` imports ([theme.md](theme.md)).

## Remix

| Rule      | Detail                                                      |
| --------- | ----------------------------------------------------------- |
| Entry     | `app/root.tsx` (or framework-equivalent root)               |
| CSS       | Same side-effect imports at top of root, before outlet      |
| Providers | Wrap `<Outlet />` (no `'use client'` unless setup needs it) |
| Links     | Theme/preflight via JS imports — not `<link>` for bootstrap |

## Astro

| Rule      | Detail                                                                                  |
| --------- | --------------------------------------------------------------------------------------- |
| CSS       | Root layout frontmatter once (`Layout.astro`)                                           |
| Providers | React island that **owns** overlays (`client:load`). Context does **not** cross islands |
| Islands   | Nested `client:*` = separate trees — repeat shell inside each overlay-consuming island  |

Prefer one island for the Vira UI tree (providers + pages).

## Vite / CRA

| Rule  | Detail                                                                   |
| ----- | ------------------------------------------------------------------------ |
| Entry | `src/main.tsx` or `src/index.tsx`                                        |
| CSS   | Bootstrap imports before `createRoot`                                    |
| Tree  | Wrap `<App />` in `ViraProviders`                                        |
| HMR   | Keep side-effect CSS in entry; do not duplicate bootstrap in lazy chunks |

```tsx
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ViraProviders>
      <App />
    </ViraProviders>
  </StrictMode>,
);
```

## Shared rules

- `globals.css` / app CSS = **app-owned** styles only
- Toggle `data-mode` on `html`, `body`, or wrapper — details [preflight.md](preflight.md)
- Brand swap = replace theme CSS file; independent from `data-mode` ([theme.md](theme.md))
- `toastManager.add` needs root `Toast.Provider` + mapped viewport (shell above / bootstrap.xml)
- Tailwind / Bootstrap / other CSS resets in the same app → [css-framework-coexistence.md](css-framework-coexistence.md)

## Gotchas

| Mistake                                         | Fix                                            |
| ----------------------------------------------- | ---------------------------------------------- |
| Next.js bootstrap in `globals.css` `@import`    | Move Vira/font imports to `app/layout.tsx`     |
| Providers exported from Server Component layout | Separate `'use client'` wrapper                |
| Astro: providers on layout, overlays in island  | Same island owns providers + overlay consumers |
| Remix: theme via `<link>` only                  | JS side-effect imports in root                 |
| Duplicate bootstrap in route/lazy chunks        | One root entry only                            |
| Guessing entry paths                            | This file + `foundation/bootstrap.xml`         |
| Full `@import "tailwindcss"` + Vira preflight   | Theme+utilities only; see coexistence ref      |

## Stop — validate

- [ ] Theme/fonts/preflight import from the framework root entry above
- [ ] No `@viraui/*` in stylesheet `@import`
- [ ] One `ViraProviders` wraps the tree that uses overlays
- [ ] `data-mode` present when product uses explicit modes
- [ ] Conflicting CSS-framework preflight handled (warn → ask → omit)
