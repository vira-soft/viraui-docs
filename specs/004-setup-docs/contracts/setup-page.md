# Contract: Setup Page Content

**Feature**: `004-setup-docs`
**File**: `content/(design-system)/get-started/setup.mdx`
**URL**: `/get-started/setup`

## MUST

1. Frontmatter `title: Setup` and a non-stub `description` about consumer bootstrap.
2. Short lead: bootstrap as thin shell; agents/skills do heavy lifting; skills must load before any bootstrap prompt. Not a Skills or MCP duplicate.
3. Requirements as a bullet list: React platform, Base UI as sole required peer beyond React / React DOM with link to `https://base-ui.com`, short toolchain, foundation/icons optional with links.
4. **Primary path — `<Steps>`**:
   1. **Install skills first** — titled `npx skills add https://skills.sh/p/IQZPjm9biEMkAZOP` command (Setup owns this install entry). Explicit note that the editor (or agent session) must be **reloaded** after install so `viraui-setup` registers before any bootstrap prompt.
   2. Tabbed copy-ready prompt fences (`tab="Setup"` / `tab="Verify"`): Setup uses `viraui-setup` for packages/peers, user brand/theme choice then matching fonts (built-in theme fonts vs custom), theme/fonts/preflight order, and root providers — **do not** nest skills-pack install inside that prompt; Verify covers theme, preflight, providers, sample render.
5. **Secondary path** (optional, demoted): short Manual fallback for packages/theme/CSS/providers when wiring by hand is unavoidable after skills are installed; checklist-style verify matching AI verify outcomes (no verify prompt fence on Manual). Do not present Manual as equal weight to the prompt path.
6. No separate “How bootstrap works” essay before install — mechanism stays in the short lead and Manual fallback.
7. Discursive English prose per `.cursor/rules/02-docs-consumer-voice.mdc`; no telegram stacks; sparse spaced em-dashes; consumer-useful only (FR-008).
8. Ship via `setup.mdx`; `meta.json` lists `setup` (not Setup-as-`index`); remove old `index.mdx` Setup stub.
9. `pageActions: false` unless product later requires otherwise (match overview instructional pages).

## MUST NOT

1. Exhaustive prop tables, per-framework import atlases, or full skills catalog.
2. Treat `@viraui/foundation` / `@viraui/icons` as mandatory deps.
3. Frame brand/theme choice as a hard agent quiz that blocks foundation or font install. The user chooses brand/theme; font import follows that choice (built-in theme fonts vs custom).
4. Make Manual the default or equal primary path.
5. Put a copyable verify prompt on the Manual section.
6. Leave stub/placeholder prompt text or “exact commands arrive later” copy.
7. Reintroduce Setup at `/get-started` via `index.mdx` as the canonical Setup page.
8. Turn Setup into MCP tutorial or CSS-framework coexistence essay.
9. Add “What’s next” sections.
10. Ask the agent to install the skills pack inside the bootstrap prompt, or present the bootstrap prompt before skills install + reload.

## Related file changes (same feature)

| File | Change |
| --- | --- |
| `content/(design-system)/get-started/meta.json` | `pages`: `setup`, `skills`, `mcp`, … |
| `content/(design-system)/get-started/skills.mdx` | Keep link to `/get-started/setup` (verify still valid) |

## Relationship to other contracts

- Instructional Get started shell (`001` page-shell): titled/tabbed prompt regions required — satisfied by Setup/Verify tabs after skills install.
- IA tree (`001` ia-tree): `/get-started/setup` already listed.
- Skills page: purpose/overview; Setup owns install entry + bootstrap process (skills before prompt).
- Utilities (`006` utilities-page): owns opt-in helpers (useBreakpoints under Utilities group); Setup only brief-links `/get-started/utilities/use-breakpoints` after overlay shell — no Breakpoints recipes on Setup.
- Does **not** use Component Page Shell (`PreviewSlot`).
