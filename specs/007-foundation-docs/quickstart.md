# Quickstart: Validate Foundation Overview Page

**Feature**: `007-foundation-docs`

## Prerequisites

- Repo: `viraui-ds/viraui-docs`
- Node + `pnpm` available
- Spec: [spec.md](./spec.md) · Contract: [contracts/foundation-page.md](./contracts/foundation-page.md)

## Setup

```bash
cd /Users/mattia/Workspaces/vira/viraui-ds/viraui-docs
pnpm install
pnpm dev
```

Open `/foundation` (local Fumapress URL).

## Validation scenarios

### V1 — Route and frontmatter

1. Confirm page at `/foundation`.
2. Confirm title `Overview`; description non-stub; `pageActions` off; icon still Foundation Eye in nav.
3. **Expect**: FR-001–002 / FR-014.

### V2 — Lead + how-it-works

1. Read lead only — Foundation = substrate, not component catalog.
2. Confirm short how-it-works `##` before Cards (values shape brand; topics are facets; components/agents consume).
3. Optionally follow `/layers` and/or `/components` if linked.
4. **Expect**: SC-001 / FR-003–004 / US1 structure (lead → how-it-works → cards).

### V3 — Cards grid

1. Confirm eight cards in nav order: Colors, Motion, Elevation, Effects, Typography, Spacing, Radius, Icons.
2. Confirm each card has title + visible illustration (stand-in OK) and no required body copy.
3. Activate each card; land on matching `/foundation/...` child.
4. **Expect**: SC-002 / FR-005–008.

### V4 — Voice and bans

1. Confirm no stub “Browse child topics…” / Ask-agent placeholder.
2. Confirm no token tables, install recipes, prop dumps, four-layer essay paste.
3. Time lead + how-it-works + card pick (~5 minutes).
4. **Expect**: SC-003–004 / FR-009–013.

### V5 — Build smoke

```bash
pnpm build
```

**Expect**: Build + link validation succeed; eight card hrefs resolve (children may still be stubs).

## Done when

All V1–V5 pass and contract MUST/MUST NOT checklist is satisfied.
