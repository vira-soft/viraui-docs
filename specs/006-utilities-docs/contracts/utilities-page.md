# Contract: Utilities Group + useBreakpoints Page

**Feature**: `006-utilities-docs`
**Folder**: `content/get-started/utilities/`
**Nav group URL**: expandable under Get started (no index page; folder expands only)
**Child page**: `content/get-started/utilities/use-breakpoints.mdx`
**Child URL**: `/get-started/utilities/use-breakpoints`

## MUST

1. `utilities/meta.json`: `title: Utilities`, `icon: WrenchScrewdriver`, `defaultOpen: false`, `pages` lists `use-breakpoints` (and future utility pages).
2. Get started nav (`content/get-started/meta.json`) lists `utilities` after `mcp` (folder entry).
3. `use-breakpoints.mdx` frontmatter: `title: useBreakpoints`, non-stub `description` about viewport-conditional markup, `pageActions: false`.
4. Lead: helper is optional beyond Setup’s Dialog/Tooltip/Toast overlay shell; **ViraUI-custom**; link to `/get-started/setup`.
5. Base UI utilities section (**first body section**, before lead): short handoff that Base UI built-ins (direction, focus, portals, …) live on [base-ui.com](https://base-ui.com)—not documented on this page.
6. Body: when to use vs prefer CSS; five named default em thresholds; custom map replaces defaults; client wrap + `useBreakpoints` guidance; Common examples via `<Example>` + `breakpoints-demo` (no sandbox resize — matches are `window.matchMedia` on the mounting document); pointer to package specs / `viraui-design`.
7. Discursive concise English; speak **to the consumer** (`you` / imperative)—no meta “this page covers / keep this page / not documented here” (see `.cursor/rules/02-docs-consumer-voice.mdc`).
8. IA: `specs/001-llm-first-docs-site/contracts/ia-tree.md` lists Utilities group + `/get-started/utilities/use-breakpoints`; Get started order mcp → utilities group.
9. Setup: brief optional ViraUI providers/utilities note linking `/get-started/utilities/use-breakpoints` (no Breakpoints recipes on Setup).

## MUST NOT

1. Restate Setup’s Dialog/Tooltip/Toast overlay shell recipe as Utilities content.
2. Prop tables, framework import atlases, or pasted package-spec XML.
3. Document Base UI built-ins (RTL/`DirectionProvider`, focus, portals, …) as Utilities content—link out only.
4. Invent undocumented ViraUI utilities beyond Breakpoints without a follow-up change.
5. Treat Breakpoints as required bootstrap.
6. Duplicate Breakpoints defaults/examples on Setup.
7. Ship Utilities as a flat single MDX page at `/get-started/utilities` (must be expandable folder).

## Related file changes (same feature)

| File | Change |
| --- | --- |
| `content/get-started/utilities/meta.json` | Expandable Utilities group |
| `content/get-started/utilities/use-breakpoints.mdx` | Finished useBreakpoints page |
| `content/get-started/meta.json` | List `utilities` after `mcp` |
| `content/get-started/setup.mdx` | Brief handoff link to use-breakpoints |
| `specs/001-llm-first-docs-site/contracts/ia-tree.md` | Group + child URL + nav order |

## Relationship to other contracts

- IA tree (`001` ia-tree): owns public URL listing; this feature updates it.
- Setup (`004` setup-page): owns overlay shell; Utilities owns opt-in helpers; Setup only links.
- Skills / MCP: unchanged owners; Utilities group follows MCP in Get started nav only.
- Does **not** use Component Page Shell (`PreviewSlot`).
