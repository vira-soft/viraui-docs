# CSS framework coexistence (Tailwind, Bootstrap, …)

**When to read:** bootstrap finds Tailwind, Bootstrap, or another CSS framework that ships a global **preflight / reboot / reset**; consumer wants utilities from that stack alongside ViraUI.

## Rule

ViraUI owns the baseline via `@viraui/react/preflight.css`. Third-party **preflight / reboot / reset** sheets often reset the same elements and **can break ViraUI** (typography, margins, borders, box model, form controls).

When a conflicting stack is detected (deps, CSS `@import`, PostCSS plugins, CDN links):

1. **Warn** — name the framework and that its reset can fight Vira preflight.
2. **Ask** — keep third-party reset, drop it, or scope it? Do not silently keep the full framework CSS entry.
3. **Recommend** — keep `@viraui/react/preflight.css`; **omit** the third-party preflight/reset; keep only theme tokens and/or utilities when the stack allows that split.

Do **not** replace Vira preflight with Tailwind/Bootstrap reset.

## Detect

| Signal  | Examples                                                                             |
| ------- | ------------------------------------------------------------------------------------ |
| Deps    | `tailwindcss`, `bootstrap`, `@picocss/pico`, `normalize.css`, `ress`, `sanitize.css` |
| CSS     | `@import "tailwindcss"`, `@tailwind base`, Bootstrap/reboot imports, CDN reset CSS   |
| Tooling | Tailwind Vite/PostCSS plugin with default preflight on                               |

Scan before finishing bootstrap. Record status in the setup-recap table (`CSS framework coexistence` row).

## Tailwind (v4) — recommended

**Avoid** the full entry (includes preflight):

```css
@import 'tailwindcss';
```

**Prefer** theme + utilities only (no preflight/reset):

```css
@import 'tailwindcss/theme.css' layer(theme);
@import 'tailwindcss/utilities.css' layer(utilities);
```

Keep `@viraui/react/preflight.css` as the JS side-effect import in the app root ([frameworks.md](frameworks.md)). Put Tailwind theme/utilities in app-owned CSS after Vira bootstrap imports, or as a separate stylesheet that does **not** pull preflight.

### Tailwind v3 / `@tailwind base`

If the project still uses:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Ask**, then recommend **dropping `@tailwind base`** (that is the reset). Keep `components` / `utilities` if needed. Confirm via Tailwind docs for the installed major when unsure.

## Bootstrap and other resets

| Stack                           | Typical reset                        | Prefer                                                                                  |
| ------------------------------- | ------------------------------------ | --------------------------------------------------------------------------------------- |
| Bootstrap                       | Reboot / `bootstrap.css` full bundle | Ask; recommend utilities-only / scoped import, or drop reboot when coexisting with Vira |
| Pico, normalize, sanitize, ress | Global element reset                 | Ask; omit or scope away from Vira trees                                                 |
| Other UI kits with “base” CSS   | Same class of risk                   | Same warn → ask → no global reset                                                       |

Exact package paths vary — warn + ask first; do not invent a “safe together” claim without checking what the import actually loads.

## Layer / cascade note

Unlayered app CSS beats Vira `@layer` sheets. A third-party reset loaded unlayered (or after preflight) will often win and look like “Vira is broken.” Fix by removing that reset, not by deleting Vira preflight.

## Setup-recap

Add a row when relevant:

| Step                      | Status         | What landed                                      |
| ------------------------- | -------------- | ------------------------------------------------ |
| CSS framework coexistence | done / blocked | e.g. Tailwind theme+utilities; preflight omitted |

## Stop — validate

- [ ] Warned when a third-party preflight/reset is present
- [ ] Asked before changing framework CSS
- [ ] Vira `@viraui/react/preflight.css` still in bootstrap
- [ ] Third-party preflight/reboot omitted or explicitly accepted by consumer (rare)
