# Contract: Skills Page Content

**Feature**: `005-skills-docs`
**File**: `content/get-started/skills.mdx`
**URL**: `/get-started/skills`

## MUST

1. Frontmatter `title: Skills`, non-stub `description`, `icon: OrbitSparkle`, `pageActions: false`.
2. Lead framing: consumer skills are agent playbooks that keep ViraUI on-pattern; deep API stays in package specs; page is orientation—not Setup, not MCP, not prop dumps.
3. How-to prose: install via link to `/get-started/setup`; agents load by task; naming a skill in a prompt is optional guidance in prose.
4. Four short prose blocks (heading + ~2–3 sentences each) for `viraui-setup`, `viraui-design`, `viraui-a11y`, `viraui-motion` in that order, covering job + use when / not when.
5. About two short copyable example usage prompts per skill block (name that skill; illustrative only).
6. Brief MCP mention clarifying skills (project playbooks) vs MCP (search/fetch human docs), with link to `/get-started/mcp`.
7. Discursive concise English; consumer-useful only (FR-009).

## MUST NOT

1. Comparison table as the primary what/when presentation.
2. Publishable pack install one-liner (`npx skills add …` or equivalent) on this page.
3. Setup-style titled Ask-your-agent / bootstrap-verify fence on the How section (per-skill example prompts are allowed).
4. Duplicate Setup’s AI/Manual bootstrap, peers list, or theme-gate playbook.
5. Paste skill-hub routers, reference inventories, eval notes, or monorepo-only paths.
6. Become a WCAG/APG course, motion token encyclopedia, or per-component API atlas.
7. Teach MCP connection/init steps (link only).

## Related file changes (same feature)

| File | Change |
| --- | --- |
| `content/get-started/skills.mdx` | Replace stub with finished page |
| `content/get-started/meta.json` | No change expected (`setup`, `skills`, `mcp`) |
| `content/get-started/setup.mdx` | Unchanged owner of install command; keep Skills inbound link valid |

## Relationship to other contracts

- IA tree (`001` ia-tree): `/get-started/skills` already listed.
- Setup (`004` setup-page): owns install + bootstrap; Skills owns purpose/when/how orientation.
- MCP page: owns connection tutorial; Skills only distinguishes and links.
- Does **not** use Component Page Shell (`PreviewSlot`).
- Instructional Get started shell titled Ask-your-agent fence: **does not apply** to Skills How; per-skill example prompts are allowed. Setup retains bootstrap/verify prompts.
