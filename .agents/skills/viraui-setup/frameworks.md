# Framework entry points

**When to read:** choosing where theme/preflight imports and `ViraProviders` mount (Next.js, Remix, Astro, Vite).

## Default

Same bootstrap everywhere:

1. JS side-effect imports: **theme → fonts → preflight** (then app CSS)
2. Copy `ViraProviders` from [bootstrap.md](bootstrap.md); mount once around the app tree
3. Never bootstrap via CSS `@import` in a global stylesheet

Authority: `@viraui/react/consumption.json` → `nextJsAppRouter`, `rootProviders`.

## Canonical import block

```tsx
import '@viraui/foundation/vira.css';
import '@fontsource-variable/geist/wght.css';
import '@fontsource-variable/geist-mono/wght.css';
import '@viraui/react/preflight.css';
```

Swap theme line for custom CSS when not using a foundation preset. Match font packages to `--font-family-*`.

## Next.js (App Router) — default

| Rule      | Detail                                                               |
| --------- | -------------------------------------------------------------------- |
| CSS entry | `app/layout.tsx` (Server Component OK)                               |
| Providers | Client module wrapping `{children}` — not the layout module itself   |
| Forbidden | `@import '@viraui/*'` or font-package `@import` in `app/globals.css` |
| Modes     | `data-mode` on `<html>` when using light/dark/inverted               |

```tsx
// app/layout.tsx
import '@viraui/foundation/vira.css';
import '@fontsource-variable/geist/wght.css';
import '@fontsource-variable/geist-mono/wght.css';
import '@viraui/react/preflight.css';
import './globals.css';
import { ViraProviders } from './vira-providers'; // 'use client' + shell from bootstrap.md

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-mode="light">
      <body>
        <ViraProviders>{children}</ViraProviders>
      </body>
    </html>
  );
}
```

## Remix

| Rule      | Detail                                                      |
| --------- | ----------------------------------------------------------- |
| Entry     | `app/root.tsx` (or framework-equivalent root)               |
| CSS       | Same side-effect imports at top of root, before outlet      |
| Providers | Wrap `<Outlet />` (no `'use client'` unless setup needs it) |
| Links     | Theme/preflight via JS imports — not `<link>` for bootstrap |

```tsx
// app/root.tsx — imports + ViraProviders around <Outlet />
```

## Astro

| Rule      | Detail                                                                                  |
| --------- | --------------------------------------------------------------------------------------- |
| CSS       | Root layout frontmatter once (`Layout.astro`)                                           |
| Providers | React island that **owns** overlays (`client:load`). Context does **not** cross islands |
| Islands   | Nested `client:*` = separate trees — repeat shell inside each overlay-consuming island  |

Prefer one island for the Vira UI tree (providers + pages). Wrapping `<slot />` in providers does not give context to sibling islands.

```astro
---
// Layout.astro — theme → fonts → preflight side-effect imports here
import { ViraApp } from '../components/ViraApp.tsx'; // client:load → ViraProviders
---
<html lang="en" data-mode="light">
  <body>
    <ViraApp client:load>{/* Toast / Dialog indent / Tooltip consumers */}</ViraApp>
  </body>
</html>
```

## Vite / CRA

| Rule  | Detail                                                                   |
| ----- | ------------------------------------------------------------------------ |
| Entry | `src/main.tsx` or `src/index.tsx`                                        |
| CSS   | Bootstrap imports before `createRoot`                                    |
| Tree  | Wrap `<App />` in `ViraProviders`                                        |
| HMR   | Keep side-effect CSS in entry; do not duplicate bootstrap in lazy chunks |

```tsx
// src/main.tsx — theme → fonts → preflight, then:
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
- `toastManager.add` needs root `Toast.Provider` + mapped viewport ([bootstrap.md](bootstrap.md))

## Gotchas

| Mistake                                         | Fix                                            |
| ----------------------------------------------- | ---------------------------------------------- |
| Next.js bootstrap in `globals.css` `@import`    | Move Vira/font imports to `app/layout.tsx`     |
| Providers exported from Server Component layout | Separate `'use client'` wrapper                |
| Astro: providers on layout, overlays in island  | Same island owns providers + overlay consumers |
| Remix: theme via `<link>` only                  | JS side-effect imports in root                 |
| Duplicate bootstrap in route/lazy chunks        | One root entry only                            |
| Guessing entry paths                            | This file + `consumption.json`                 |

## Stop — validate

- [ ] Theme/fonts/preflight import from the framework root entry above
- [ ] No `@viraui/*` in stylesheet `@import`
- [ ] One `ViraProviders` wraps the tree that uses overlays
- [ ] `data-mode` present when product uses explicit modes
