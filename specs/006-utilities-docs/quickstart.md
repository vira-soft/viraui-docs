# Quickstart: Validate Utilities Group

**Feature**: `006-utilities-docs`

## Prerequisites

- Repo: `viraui-ds/viraui-docs`
- Node + `pnpm` available
- Spec: [spec.md](./spec.md) · Contract: [contracts/utilities-page.md](./contracts/utilities-page.md)

## Setup

```bash
cd /Users/mattia/Workspaces/vira/viraui-ds/viraui-docs
pnpm install
pnpm dev
```

Open `/get-started/utilities/use-breakpoints` (local Fumapress URL).

## Validation scenarios

### V1 — Route and nav

1. Confirm Utilities is expandable in Get started nav after MCP (`defaultOpen: false`).
2. Confirm child `useBreakpoints` opens at `/get-started/utilities/use-breakpoints`.
3. Confirm useBreakpoints frontmatter title; description non-stub; `pageActions: false`.
4. **Expect**: Finished group + child after MCP (SC-002 / FR-001–002).

### V2 — Optional framing

1. Read lead only.
2. Follow Setup link.
3. **Expect**: Opt-in beyond overlay shell; Setup link works (SC-001 / FR-004).

### V3 — Breakpoints body

1. Confirm when/not-when (React swaps vs CSS).
2. Confirm five default names + em lengths.
3. Confirm replace-not-merge callout/rule.
4. Confirm provider + hook example(s).
5. **Expect**: SC-001 / FR-005 satisfied without prop tables.

### V4 — Base UI handoff

1. Find Base UI utilities section.
2. Confirm link to base-ui.com; no DirectionProvider/RTL recipe on page.
3. **Expect**: FR-006 / US3.

### V5 — Setup handoff

1. Open `/get-started/setup` root-providers end.
2. Confirm brief utilities pointer + working `/get-started/utilities/use-breakpoints` link.
3. Confirm Setup has no Breakpoints defaults/examples recipe.
4. **Expect**: SC-004 / FR-007.

### V6 — Voice and bans

1. Skim for prop tables, overlay-shell duplicate, Base UI API dumps, telegram spam, pasted XML.
2. Time lead + body + Base UI handoff (~3 minutes).
3. **Expect**: SC-003 / SC-006 / FR-008–009.

### V7 — Build smoke

```bash
pnpm build
```

**Expect**: Build + link validation succeed; Setup ↔ useBreakpoints links resolve (SC-005).

## Done when

All V1–V7 pass and contract MUST/MUST NOT checklist is satisfied.
