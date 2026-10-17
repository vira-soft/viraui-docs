# Preflight HTML baseline

**When to read:** bare HTML prose, lists, tables, links, inline chrome (`code`/`kbd`/`mark`/…), or any urge to “reset” / restyle native tags under ViraUI.

Preflight (`@viraui/react/preflight.css`) already owns the document baseline after theme + fonts. Do **not** treat lists, paragraphs, or tables as unstyled.

## Authority (index-first)

1. `@viraui/react/specs/foundation/modules.xml` — `baseline` + `typography` modules
2. `@viraui/react/specs/foundation/attributes.xml` — `data-no-link-style`, `data-layout-fixed`, `data-table-separators`, …
3. Bootstrap / missing styles → **viraui-setup** [preflight.md](../viraui-setup/preflight.md)

Skill table below = orientation only. Confirm ownership in those units.

## Stance

1. Prefer semantic tags (`ul`/`ol`/`p`/`a`/`table`/…) and `Text`/`Title` `render` hosts.
2. Assume preflight chrome is present when bootstrap is correct.
3. Do **not** invent CSS for list markers, list padding, link underlines, inline `code`/`kbd` pills, `mark`/`del`/`ins` chips, or table collapse/cell padding **unless the consumer expressly asks** for an override.
4. Missing styles → fix setup (theme → fonts → preflight), not per-tag CSS patches.

## Already owned (do not reinvent)

| Surface                         | Preflight covers (summary)                                   | Prefer instead                                       |
| ------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------- |
| `p`, `small`, `strong`/`b`, `s` | Body size/leading, weight, strikethrough tone                | `Text` props when in Vira copy; bare `p` OK in prose |
| `a:any-link`                    | Interactive color + animated underline                       | Keep for prose; chrome → `data-no-link-style`        |
| `ul` / `ol` / `li`              | Padding, muted `::marker` (`ol` tabular-nums)                | Bare lists; Stack `render={<ul/>}` for flex frames   |
| Nested lists                    | `font-size: initial` so parent list does not shrink children | No extra nested-list size CSS                        |
| `code` / `kbd` / `abbr`         | Inline pill / dashed underline; `pre code` drops code shadow | Bare tags; no hand-rolled pill chrome                |
| `mark` / `del` / `ins`          | Highlight-tinted chips                                       | Bare tags                                            |
| `dt` / `dd`                     | Semibold term; zero dd margin/padding                        | Bare definition lists                                |
| `img` / `svg`                   | Block/full img; svg without `fill` → `currentcolor`          | No default black-fill SVG hacks                      |
| `button` / `fieldset`           | Unstyled baseline (Vira controls re-skin)                    | Vira `Button` / form compounds — not raw restyles    |
| `table`                         | Collapse, full width, cell padding, thead hairline           | `data-layout-fixed` / `data-table-separators`        |

Headings (`h1`–`h6`) are **not** preflight-typed — use `Title` + `render={<h*/>}` ([accessibility.md](accessibility.md)).

Readable measure / leading / `wrap` (default `pretty`) for wrapping copy (Vira Text/Title/Prose **and** bare HTML columns) → [typography.md](typography.md). Preflight owns tag chrome; measure discipline still applies.

## Links

Every prose anchor keeps preflight underline unless `data-no-link-style` is set. Class alone does **not** opt out. Detail → [custom-attributes.md](custom-attributes.md).

## Tables

Baseline table chrome is always on. Opt-in only:

- `data-layout-fixed` → `table-layout: fixed`
- `data-table-separators` → hairline between body rows

Do not invent equivalent `table-layout` / `tr + tr` border CSS.

## Checklist

- [ ] Opened `foundation/modules.xml` (`baseline` + `typography`) before inventing tag CSS
- [ ] No `list-style` / marker / ul-ol padding CSS without an express consumer override ask
- [ ] No reinvented link underline / code-kbd pills / mark chips
- [ ] Tables use documented `data-*` instead of hand-rolled layout/separators
- [ ] Unstyled page → **viraui-setup**, not per-element reset CSS

## Gotchas

| Mistake                                       | Fix                                                   |
| --------------------------------------------- | ----------------------------------------------------- |
| “Lists look bare — add list-style CSS”        | Preflight already styles `ul`/`ol` — keep native tags |
| “Need table row lines — border on every `tr`” | `data-table-separators` on the `table`                |
| “Classed `<a>` drops underline”               | Only `data-no-link-style` opts out                    |
| “Unstyled — CSS reset for `p`/`button`”       | Fix theme/fonts/preflight order — **viraui-setup**    |
