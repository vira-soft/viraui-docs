# Quickstart: Validate Principles Page

**Feature**: `002-principles-docs`

## Prerequisites

- Repo: `viraui-docs`
- Node + `pnpm` available
- Spec: [spec.md](./spec.md) · Contract: [contracts/principles-page.md](./contracts/principles-page.md)

## Setup

```bash
cd /Users/mattia/Workspaces/vira/viraui-ds/viraui-docs
pnpm install
pnpm dev
```

Open `/principles` (local Fumapress URL).

## Validation scenarios

### V1 — Stub gone, three principles present

1. Open Principles.
2. Confirm no “Stub:” body copy.
3. Confirm H2s: One truth beats five surfaces · The browser is the canvas · Accessibility built into the loop.
4. **Expect**: Finished English essay; &lt;5 min readable (SC-001).

### V2 — Multi-surface + sketch allowance

1. Read first principle.
2. **Expect**: Drift / many systems of record; AI multiplies that; disposable low-fi / LLM→ViraUI allowed; not SoR.

### V3 — Browser canvas concept + code center

1. Read second principle.
2. **Expect**: Browser renders code visually ≈ canvas (concept); code is center; no Studio/Pro timeline; foundation/substrate mentioned.

### V4 — Accessibility + skills link

1. Read third principle.
2. Confirm link to https://www.w3.org/WAI/ARIA/apg/
3. Confirm link to `/skills`; no skill package IDs in text.
4. **Expect**: Complete principles-level overview, not APG encyclopedia.

### V5 — Next + prompt code block

1. Scroll to Next / end.
2. **Expect**: Links to `/layers` and `/skills`; titled prompt code block present; no required Get started/Why/Components next cards.

### V6 — Build smoke

```bash
pnpm build
```

**Expect**: Build succeeds with updated `principles.mdx`.

## Done when

All V1–V6 pass and contract MUST/MUST NOT checklist is satisfied.
