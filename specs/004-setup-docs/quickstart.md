# Quickstart: Validate Setup Page

**Feature**: `004-setup-docs`

## Prerequisites

- Repo: `viraui-ds/viraui-docs`
- Node + `pnpm` available
- Spec: [spec.md](./spec.md) · Contract: [contracts/setup-page.md](./contracts/setup-page.md)

## Setup

```bash
cd /Users/mattia/Workspaces/vira/viraui-ds/viraui-docs
pnpm install
pnpm dev
```

Open `/get-started/setup` (local Fumapress URL).

## Validation scenarios

### V1 — Route and stub gone

1. Confirm `/get-started/setup` loads.
2. Confirm `content/get-started/setup.mdx` exists; old Setup `index.mdx` removed.
3. Confirm `meta.json` lists `setup`, `skills`, `mcp`.
4. **Expect**: No stub/placeholder body; title Setup (SC-005).

### V2 — Requirements recap

1. Read requirements (outside tabs).
2. **Expect**: React platform; Base UI as sole required peer beyond React peers; working link to base-ui.com; short toolchain without monorepo pins (SC-001 / FR-003).

### V3 — Shared process outside tabs

1. Find shared bootstrap sequence outside AI/Manual tabs.
2. Open both tabs and scan for duplicated essay of that sequence.
3. **Expect**: Shared once; tabs only path-specific (SC-006 / FR-006a).

### V4 — AI full path + verify prompt

1. Open AI tab (default/first).
2. Copy setup prompt; confirm full bootstrap intent (skills, peers, theme gate, preflight, providers).
3. Confirm separate verify prompt fence present.
4. **Expect**: Non-placeholder; AI primary (SC-002 / SC-007 / FR-005).

### V5 — Manual full path + checklist verify

1. Open Manual tab.
2. **Expect**: Packages + skills command + theme gate/wiring steps; link to `/get-started/skills`; checklist verify; **no** verify prompt fence (SC-003 / SC-007 / FR-006).

### V6 — Voice and bans

1. Skim for telegram fragments, em-dash spam, prop tables, framework atlases, mandatory foundation/icons.
2. **Expect**: Discursive prose; bans clean (SC-004 / FR-007–008).

### V7 — Cross-links

1. From Manual, open Skills link.
2. From Skills, follow Setup link back to `/get-started/setup`.
3. **Expect**: Both resolve (FR-010).

### V8 — Build smoke

```bash
pnpm build
```

**Expect**: Build + link validation succeed with `setup.mdx` and without broken `/get-started/setup` references.

## Done when

All V1–V8 pass and contract MUST/MUST NOT checklist is satisfied.
