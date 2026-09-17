# Quickstart: Validate Layers Page

**Feature**: `003-layers-docs`

## Prerequisites

- Repo: `viraui-ds/viraui-docs`
- Node + `pnpm` available
- Spec: [spec.md](./spec.md) · Contract: [contracts/layers-page.md](./contracts/layers-page.md)

## Setup

```bash
cd /Users/mattia/Workspaces/vira/viraui-ds/viraui-docs
pnpm install
pnpm dev
```

Open `/layers` (local Fumapress URL).

## Validation scenarios

### V1 — Stub gone, four layers in order

1. Open Layers.
2. Confirm no “Stub:” body copy and no “Prompt placeholder”.
3. Confirm layer headings in order: AI-native by design · Strong foundation · UI components · Motion guidelines.
4. **Expect**: Finished English overview; composition framing clear (SC-001 / SC-005).

### V2 — Each layer beyond slogan

1. Read each layer section.
2. **Expect** for each: purpose + conceptual includes + what breaks/drifts when missing (FR-008 / SC-002).
3. Spot-check against [viraui.dev](https://viraui.dev) Core: Layers expands, does not paste-only.

### V3 — Layers ≠ Principles

1. Skim Layers lead + open `/principles`.
2. **Expect**: Layers = composition; Principles = worldview; no full Principles essay duplicated on Layers (SC-003).

### V4 — Next links

1. Scroll to Next.
2. **Expect**: Links include `/principles` and `/get-started/skills`; plus ≥1 of Foundation / Components / Motion.
3. Click one link; page loads (SC-006 path).

### V5 — Overview prompt

1. Copy titled prompt code block into an LLM chat (with docs context if available).
2. **Expect**: Single answer covers (a) what ViraUI is, (b) principles, (c) four layers; prefers official docs over generic DS pitch (SC-004).

### V6 — Pro / banned claims

1. Search page for Studio/Pro timeline language and prop tables / install recipes.
2. **Expect**: None required; no Pro-as-required framing (FR-015).

### V7 — Build smoke

```bash
pnpm build
```

**Expect**: Build succeeds with updated `layers.mdx`.

## Done when

All V1–V7 pass and contract MUST/MUST NOT checklist is satisfied.
