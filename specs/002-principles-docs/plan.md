# Implementation Plan: ViraUI Principles Page

**Branch**: `002-principles-docs` | **Date**: 2026-09-18 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-principles-docs/spec.md`

## Summary

Replace the stub at `content/principles.mdx` with finished English essay copy covering three principles: multi-surface drift (static tools OK only as disposable sketches/LLM prompts), browser-as-canvas as a concept with code at the center, and APG-grounded accessibility available to agents via skills (link `/skills`, no skill IDs). Keep LLM-first titled prompt code block, next-step links only to `/layers` and `/skills`. No IA or deploy changes.

## Technical Context

**Language/Version**: MDX + TypeScript/React 19 (existing Fumapress docs app)

**Primary Dependencies**: fumapress, fumadocs-mdx, existing MDX components (`Cards`/`Card`, optional `Callout`) plus titled fenced code blocks for prompts

**Storage**: Git-backed `content/principles.mdx` (N/A runtime DB)

**Testing**: Manual quickstart checklist (dev/build smoke + FR acceptance walk); no automated suite

**Target Platform**: Static docs site (`docs.viraui.dev` when deployed)

**Project Type**: Documentation content page (single existing web app)

**Performance Goals**: Page readable in &lt;5 minutes (SC-001); no new runtime weight beyond normal MDX

**Constraints**: English only; no Studio/Pro timeline claims; no skill IDs; no prop tables / APG encyclopedia; no new routes

**Scale/Scope**: One page (`content/principles.mdx`); frontmatter + narrative + next steps + prompt region

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Constitution file remains Spec Kit template placeholders (not ratified). **Pass with note**: follow feature spec + clarify session + this plan. Same stance as `001-llm-first-docs-site`.

**Post–Phase 1**: Still pass — design is content-only; no new constitutional surface.

## Project Structure

### Documentation (this feature)

```text
specs/002-principles-docs/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── principles-page.md
├── checklists/
│   └── requirements.md
└── tasks.md             # /speckit-tasks — not this command
```

### Source Code (repository root)

```text
viraui-docs/
├── content/
│   ├── meta.json          # unchanged (principles already listed)
│   ├── principles.mdx     # REPLACE stub with full editorial
│   ├── layers.mdx         # link target only
│   └── skills.mdx         # link target only
```

**Structure Decision**: Edit only `content/principles.mdx` (plus titled `text` code fence with `title="…"` prompt seed). No new packages, routes, or deploy work.

## Complexity Tracking

> None — no constitution violations; single-file content change.
