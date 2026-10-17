# Red flags — STOP

**When to read:** with the hub on every compose/edit — before inventing CSS, skipping units, or rationalizing shortcuts.

| Excuse                                                       | Reality                                                                                                                                  |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| “Small UI tweak — skip the skill”                            | ~1% UI fit → Read hub                                                                                                                    |
| “I know Button — CSS module first, specs later”              | **Compose with** units first — unsolicited CSS on Vira roots = protocol fail; override only if consumer expressly asked                  |
| “rg/ls dist/components or *.d.ts first”                      | Specs index + units first — FORBIDDEN shell-parse                                                                                        |
| “Story shows this prop — ship it”                            | Specs units + source own API                                                                                                             |
| “Default prop for clarity”                                   | Omit documented defaults                                                                                                                 |
| “CSS letter-spacing / text-transform on Text”                | `tracking` / `transform` props — open `props.xml`                                                                                        |
| “Full-bleed UI paragraph — CSS line-height / max-width”      | Measure ~10–12 words **scaled to size** + `lineHeight` / `maxWidth` / `wrap` — [typography.md](typography.md)                            |
| “Lists need list-style / custom bullets — preflight bare”    | Preflight already styles `ul`/`ol` — [preflight-baseline.md](preflight-baseline.md) / `modules.xml`                                      |
| “Hand-roll table row borders / table-layout”                 | `data-table-separators` / `data-layout-fixed` — [custom-attributes.md](custom-attributes.md)                                             |
| “Guess the prop — skip units”                                | Index → units → then decide CSS                                                                                                          |
| “Invent Base UI pass-through from memory”                    | `meta` `base_ui` → Base UI API; ask if still unsure                                                                                      |
| “Button / IconButton needs width:100% / inline-size class”   | **Never** — Stack `fullWidth` / `expandChildren` or control `fullWidth`; fixed-size controls stay content-sized — [layout.md](layout.md) |
| “Panels need height:100% / block-size:100% CSS”              | **Never** — Stack `fullHeight` + `expandChildren` + stretch align (Stack `patterns.xml`) — [layout.md](layout.md)                        |
| “Need bottom padding — style paddingBlockEnd”                | **Never** — `vPadding={[0, 'l']}` / `hPadding` tuples on Stack/Surface/Grid — [layout.md](layout.md)                                     |
| “Bare Stack/Grid/Surface is omit-defaults”                   | Unset gap/padding = 0 — [layout.md](layout.md)                                                                                           |
| “Plain `div`/`header` + display:flex”                        | Flex framing = `Stack`; tag via `render`                                                                                                 |
| “CSS grid / columns instead of Grid/Masonry”                 | Tracks → `Grid`; ragged pack → `Masonry`                                                                                                 |
| “Desktop-first max-width media”                              | Mobile-first — [responsive.md](responsive.md)                                                                                            |
| “768px media beside BreakpointsProvider”                     | Same em map as provider / defaults                                                                                                       |
| “matchMedia hook instead of useBreakpoints”                  | Markup/prop branches → `useBreakpoints`                                                                                                  |
| “DirectionProvider alone = RTL” / “Stack direction=rtl”      | Provider + `dir` on `html`; Stack `direction` = flex only — [responsive.md](responsive.md)                                               |
| “Import @base-ui/react/direction-provider”                   | Re-export from `@viraui/react`                                                                                                           |
| “Unstyled — import component CSS”                            | **viraui-setup**                                                                                                                         |
| “Scroll reveal needs IntersectionObserver”                   | [styling.md](styling.md) CSS timelines first                                                                                             |
| “Must use `@viraui/icons/react` for every slot”              | Any ReactNode — [icons.md](icons.md)                                                                                                     |
| “Always set `size={16}` / `size="1rem"` on slot icons”       | **Never by default** — omit; host CSS / icon default — [icons.md](icons.md)                                                              |
| “Dynamic import map of every icon”                           | Static named imports — [icons.md](icons.md)                                                                                              |
| “Bare glyph = accessible name”                               | Wrap control + parent name — [icons.md](icons.md)                                                                                        |
| “Title size = heading level; skip h3 for style”              | `size` visual; `render={<h*/>}` = outline; no skipped levels — [accessibility.md](accessibility.md)                                      |
| “Date/result as plain Text span” / “only listed tags matter” | Most-correct semantic host via `render` (table = examples) — [accessibility.md](accessibility.md)                                        |
| “Ship now — verify later” / “Looks fine — skip adversarial”  | Hard gate — [verify.md](verify.md) before done; emit ship report                                                                         |
