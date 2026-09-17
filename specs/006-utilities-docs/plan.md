# Implementation Plan: Get Started Utilities Page

**Branch**: `006-utilities-docs` | **Date**: 2026-09-18 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/006-utilities-docs/spec.md`

**Note**: Artifacts written explicitly under `viraui-docs/specs/006-utilities-docs/` per `.specify/feature.json`. Content page may already exist from the same session—plan still owns structure + acceptance.

## Summary

Ship finished Utilities at `content/get-started/utilities.mdx` (`/get-started/utilities`): **ViraUI-custom** opt-in helpers beyond Setup’s overlay shell, with Breakpoints as the primary section and a Base UI link-out for peer built-ins. List Utilities after MCP in Get started nav; update IA tree; keep Setup to a one-line handoff link (no Breakpoints recipes on Setup). Discursive English; orientation + common examples—not package-spec mirrors.

## Technical Context

**Language/Version**: MDX + TypeScript/React 19 (existing Fumapress docs app)

**Primary Dependencies**: fumapress / fumadocs-mdx; headings + prose + fenced `tsx`; optional `Callout` for replace-map rule

**Storage**: Git-backed MDX under `content/get-started/` (N/A runtime DB)

**Testing**: Manual quickstart checklist (dev/build smoke + FR acceptance walk); no automated suite

**Target Platform**: Docs site (`docs.viraui.dev` when deployed)

**Project Type**: Documentation content page (single existing web app)

**Performance Goals**: Reader finishes lead + Breakpoints + Base UI handoff in ~3 minutes; no new runtime weight beyond normal MDX

**Constraints**: English; optional framing clear; no prop tables; no Setup overlay duplicate; Setup handoff link only for Breakpoints depth; icon `WrenchScrewdriver`; `pageActions: false`

**Scale/Scope**: One new page (`utilities.mdx`); `meta.json` + IA tree + Setup handoff sentence; no package/runtime changes

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Constitution file remains Spec Kit template placeholders (not ratified). **Pass with note**: follow feature spec + this plan. Same stance as `001`–`005`.

**Post–Phase 1**: Still pass — content + IA only; no new constitutional surface.

## Project Structure

### Documentation (this feature)

```text
specs/006-utilities-docs/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── utilities-page.md
├── checklists/
│   └── requirements.md
└── tasks.md
```

### Source Code (repository root)

```text
viraui-docs/
├── content/
│   └── get-started/
│       ├── meta.json       # add utilities after mcp
│       ├── setup.mdx       # brief handoff link to Utilities (no Breakpoints recipes)
│       ├── utilities.mdx   # NEW finished page
│       ├── skills.mdx      # unchanged
│       └── mcp.mdx         # unchanged; Utilities follows in nav
├── press.config.tsx        # no change expected
└── specs/001-llm-first-docs-site/contracts/ia-tree.md  # add /get-started/utilities
```

**Structure Decision**: Content feature. New MDX + nav/IA + Setup pointer. Authority for Breakpoints defaults remains sibling package specs; docs narrate consumer-useful facts only.

## Complexity Tracking

> None — no constitution violations; single page + thin cross-links.
