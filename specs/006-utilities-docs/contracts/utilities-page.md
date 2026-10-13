# Contract: Utilities Group (Breakpoints + Direction)

**Feature**: `006-utilities-docs`
**Folder**: `content/(design-system)/get-started/utilities/`
**Nav group URL**: expandable under Get started (no index page; folder expands only)
**Child pages**:
- `breakpoints.mdx` → `/get-started/utilities/breakpoints` (title **Breakpoints**)
- `direction.mdx` → `/get-started/utilities/direction` (title **Direction**)

## MUST

1. `utilities/meta.json`: `title: Utilities`, `icon: WrenchScrewdriver`, `defaultOpen: false`, `pages` lists `breakpoints`, `direction` (and future utility pages).
2. Get started nav (`content/(design-system)/get-started/meta.json`) lists `utilities` after skills / theming (folder entry; no `mcp` while runtime off).
3. `breakpoints.mdx` frontmatter: `title: Breakpoints`, non-stub `description` about viewport-conditional markup, `pageActions: false`.
4. Breakpoints lead: helper is optional beyond Setup’s Dialog/Tooltip/Toast overlay shell; **ViraUI-custom**; link to `/get-started/setup`.
5. Breakpoints Base UI utilities section (**first body section**, before lead): short handoff — RTL → `/get-started/utilities/direction`; other Base UI built-ins (focus, portals, …) → [base-ui.com](https://base-ui.com).
6. Breakpoints body: when to use vs prefer CSS; five named default em thresholds; custom map replaces defaults; client wrap + `useBreakpoints` guidance; Common examples via `<Example>` + `breakpoints-demo` (no sandbox resize — matches are `window.matchMedia` on the mounting document); pointer to package specs / `viraui-design`.
7. `direction.mdx` frontmatter: `title: Direction`, non-stub description (RTL / Base UI re-export), `pageActions: false`.
8. Direction page: Base UI handoff Card first (`href` verbatim from DS `direction-provider` meta `base_ui`), then short how-it-works (transparent re-export; provider ≠ HTML `dir`; pair with portal ancestor `dir`, usually `html`; import from `@viraui/react`). Two fence examples max (RTL subtree + `useDirection`). Full API stays on Base UI — no prop encyclopedia.
9. Discursive concise English; speak **to the consumer** (`you` / imperative)—no meta “this page covers / keep this page / not documented here” (see `.cursor/rules/02-docs-consumer-voice.mdc`).
10. IA: `specs/001-llm-first-docs-site/contracts/ia-tree.md` lists Utilities group + both child URLs; Get started order … → utilities group.
11. Setup: brief optional ViraUI providers/utilities note linking Breakpoints + Direction (no Breakpoints/RTL recipes on Setup).

## MUST NOT

1. Restate Setup’s Dialog/Tooltip/Toast overlay shell recipe as Utilities content.
2. Prop tables, framework import atlases, or pasted package-spec XML.
3. Expand Direction into a Base UI API mirror — Card + thin how-it-works + ≤2 examples only.
4. Invent undocumented ViraUI utilities beyond Breakpoints / Direction without a follow-up change.
5. Treat Breakpoints or Direction as required bootstrap.
6. Duplicate Breakpoints defaults/examples or RTL recipes on Setup.
7. Ship Utilities as a flat single MDX page at `/get-started/utilities` (must be expandable folder).

## Related file changes (same feature)

| File | Change |
| --- | --- |
| `content/(design-system)/get-started/utilities/meta.json` | Expandable Utilities group; pages `breakpoints`, `direction` |
| `content/(design-system)/get-started/utilities/breakpoints.mdx` | Breakpoints page (ex-`use-breakpoints`) |
| `content/(design-system)/get-started/utilities/direction.mdx` | Thin DirectionProvider handoff |
| `content/(design-system)/get-started/setup.mdx` | Brief handoff links to Breakpoints + Direction |
| `specs/001-llm-first-docs-site/contracts/ia-tree.md` | Group + child URLs + nav order |

## Relationship to other contracts

- IA tree (`001` ia-tree): owns public URL listing; this feature updates it.
- Setup (`004` setup-page): owns overlay shell; Utilities owns opt-in helpers; Setup only links.
- Skills: unchanged owners; Utilities group follows skills / theming in Get started nav.
- Direction uses Base UI Card shape from `.cursor/rules/07-docs-base-ui-card.mdc` (instructional page, not ComponentPage shell).
- Breakpoints does **not** use Component Page Shell (`PreviewSlot`).
