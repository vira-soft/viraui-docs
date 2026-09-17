# Quickstart: Validate Skills Page

**Feature**: `005-skills-docs`

## Prerequisites

- Repo: `viraui-ds/viraui-docs`
- Node + `pnpm` available
- Spec: [spec.md](./spec.md) · Contract: [contracts/skills-page.md](./contracts/skills-page.md)

## Setup

```bash
cd /Users/mattia/Workspaces/vira/viraui-ds/viraui-docs
pnpm install
pnpm dev
```

Open `/get-started/skills` (local Fumapress URL).

## Validation scenarios

### V1 — Route and stub gone

1. Confirm `/get-started/skills` loads.
2. Confirm frontmatter title Skills; description non-stub; icon present; `pageActions: false`.
3. Confirm stub ask-agent fence absent; per-skill example prompts present (~2 each).
4. **Expect**: Finished orientation page (SC-005).

### V2 — What framing

1. Read lead only.
2. **Expect**: Skills = agent playbooks; not prop docs; not Setup bootstrap; not MCP tutorial (SC-002 / FR-002).

### V3 — How + Setup link only

1. Find how-to / install guidance.
2. Follow Setup link to `/get-started/setup`.
3. Scan Skills for install one-liner or Setup-style titled Ask-your-agent fence on How.
4. **Expect**: Working Setup link; **no** `npx skills add` (or equivalent) on Skills; **no** How titled Ask-your-agent fence; ~2 example prompts per skill (SC-006 / FR-005–007).

### V4 — Four skill prose blocks

1. Locate blocks for `viraui-setup`, `viraui-design`, `viraui-a11y`, `viraui-motion` (setup → design → a11y → motion).
2. Map intents: broken bootstrap → setup; build UI → design; APG audit → a11y; transitions → motion.
3. Confirm no comparison table as primary presentation.
4. **Expect**: Intent mapping works from prose alone (SC-001 / FR-003–004).

### V5 — MCP mention

1. Find brief Skills vs MCP distinction.
2. Open `/get-started/mcp` from the in-page link.
3. **Expect**: Distinction clear; no MCP connection tutorial on Skills (SC-007 / FR-008).

### V6 — Voice and bans

1. Skim for telegram fragments, em-dash spam, pasted hub routers, prop atlases, monorepo paths.
2. Time a first pass of what/when/how (~2 minutes).
3. **Expect**: Discursive brief prose; bans clean (SC-003–004 / FR-009–010).

### V7 — Build smoke

```bash
pnpm build
```

**Expect**: Build + link validation succeed; `/get-started/skills`, `/get-started/setup`, `/get-started/mcp` links resolve.

## Done when

All V1–V7 pass and contract MUST/MUST NOT checklist is satisfied.
