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

Open `/get-started/utilities/breakpoints` and `/get-started/utilities/direction` (local Fumapress URL).

## Validation scenarios

### V1 — Route and nav

1. Confirm Utilities is expandable in Get started nav (`defaultOpen: false`).
2. Confirm children titled **Breakpoints** and **Direction** at `/get-started/utilities/breakpoints` and `/get-started/utilities/direction`.
3. Confirm frontmatter titles; descriptions non-stub; `pageActions: false`.
4. **Expect**: Finished group + both children (SC-002 / FR-001–003).

### V2 — Optional framing (Breakpoints)

1. Read lead only.
2. Follow Setup link.
3. **Expect**: Opt-in beyond overlay shell; Setup link works (SC-001 / FR-004).

### V3 — Breakpoints body

1. Confirm when/not-when (React swaps vs CSS).
2. Confirm five default names + em lengths.
3. Confirm replace-not-merge callout/rule.
4. Confirm provider + hook example(s).
5. **Expect**: SC-001 / FR-005 satisfied without prop tables.

### V4 — Direction + Base UI handoff

1. On Breakpoints, confirm Base UI section links Direction for RTL and base-ui.com for other built-ins.
2. On Direction, confirm Base UI Card href matches DS `direction-provider` meta; ≤2 fence examples; no API encyclopedia.
3. **Expect**: FR-006 / US3.

### V5 — Setup handoff

1. Open `/get-started/setup` manual optional step.
2. Confirm brief utilities pointer + working Breakpoints and Direction links.
3. Confirm Setup has no Breakpoints/RTL recipes.
4. **Expect**: SC-004 / FR-007.

### V6 — Voice and bans

1. Skim for prop tables, overlay-shell duplicate, Base UI API dumps, telegram spam, pasted XML.
2. Time Breakpoints lead + body (~3 minutes); Direction skim (~1 minute).
3. **Expect**: SC-003 / SC-006 / FR-008–009.

### V7 — Build smoke

```bash
pnpm build
```

**Expect**: Build + link validation succeed; Setup ↔ Breakpoints / Direction links resolve (SC-005).

## Done when

All V1–V7 pass and contract MUST/MUST NOT checklist is satisfied.
