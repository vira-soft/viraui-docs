# Discovery symptoms (load cues)

**When to read:** after the hub loads, to map vague user intents / anti-patterns onto the action router — not a second props encyclopedia.

These cues used to live in the hub `description` (≤1024 discovery budget). They stay **here** so nothing useful is dropped.

## User intents that mean this skill

- Build / edit / debug / style UI in a ViraUI / `@viraui/react` consumer app
- Forms, overlays (Dialog, Popover, Menu, Toast), compounds
- Page / shell layout, sidebar + main, settings / login / dashboard / checkout screens
- Spacing, density, typography, icons, elevation, Surface vibrancy
- Responsive (mobile-first, `useBreakpoints`, `@media`) or RTL
- Public props, `--vui-*`, consumer `data-*`
- Missing / unstyled Vira after bootstrap → route **viraui-setup**, do not invent per-component CSS
- User never named “viraui-design” / Vira / `@viraui` — still this skill when the app is ViraUI

## Anti-patterns that must trigger this skill

| Temptation                                                                   | Route                                                                                                         |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Raw HTML `div`/`header` + `display:flex` / `display:grid` / CSS columns      | [layout.md](layout.md) — Stack / Grid / Masonry                                                               |
| CSS / Tailwind `gap` / `padding` on Stack / Surface / Grid / Masonry / Bleed | [layout.md](layout.md) — public spacing props                                                                 |
| `style` / CSS `paddingBlock*` / `paddingInline*` / one-side padding          | [layout.md](layout.md) — `hPadding` / `vPadding` `[start, end]` tuples                                        |
| `width:100%` / `w-full` / size-fill `className` on Button or other controls  | [layout.md](layout.md) — Stack `fullWidth` / `expandChildren` or control `fullWidth`                          |
| `height:100%` / `block-size:100%` on panels / Stack children                 | [layout.md](layout.md) — Stack `fullHeight` + `expandChildren` + stretch                                      |
| CSS module / Tailwind first “to match the mock” on a Vira root               | [styling.md](styling.md) — props + `usage` before CSS                                                         |
| `letter-spacing` / `text-transform` / gap / padding reinvented as CSS        | [styling.md](styling.md) / [typography.md](typography.md) — public props                                      |
| Full-bleed paragraph CSS `line-height` / `max-width` / `text-wrap`           | [typography.md](typography.md) — measure ~10–12 words/line; `lineHeight` / `maxWidth` / `wrap` / `whiteSpace` |
| Restyle bare `ul`/`ol` / prose / tables already owned by preflight           | [preflight-baseline.md](preflight-baseline.md)                                                                |
| Always `size={16}` / `size="1rem"` on slot icons                             | [icons.md](icons.md) — omit by default                                                                        |
| Icon-only via `children` on IconButton / ToggleButton                        | [icons.md](icons.md) + [accessibility.md](accessibility.md)                                                   |
| Title `size` as heading level; dates/results as plain Text span              | [accessibility.md](accessibility.md) — `render` hosts (`h*`, `time`/`output`/`p`, …)                          |
| Stack `direction` for RTL; DirectionProvider without `dir` on `html`         | [responsive.md](responsive.md)                                                                                |
| Desktop-first `max-width` media / ad-hoc `matchMedia`                        | [responsive.md](responsive.md)                                                                                |
| Hover / overlay / press CSS without motion tokens                            | **viraui-motion**                                                                                             |

## Depth

Hub action router → sibling refs → `@viraui/react/specs` units. End of work → [verify.md](verify.md).
