# Implementation Plan: ViraUI Layers Page

**Branch**: `003-layers-docs` | **Date**: 2026-09-18 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/003-layers-docs/spec.md`

## Summary

Replace stub at `content/layers.mdx` with finished English overview of four Core layers (AI-native by design → Strong foundation → UI components → Motion guidelines), expanded from [viraui.dev](https://viraui.dev) Core blurbs. Keep composition framing (not Principles worldview essay). End with titled copy-ready prompt that asks an AI to explain what ViraUI is, its principles, and its layers. No IA, route, or deploy changes.

## Technical Context

**Language/Version**: MDX + TypeScript/React 19 (existing Fumapress docs app)

**Primary Dependencies**: fumapress, fumadocs-mdx, existing MDX components (`Steps`/`Step`, `Cards`/`Card`, optional `Callout`, `SpotIllustration`) plus titled fenced `text` code blocks for prompts

**Storage**: Git-backed `content/layers.mdx` (N/A runtime DB)

**Testing**: Manual quickstart checklist (dev/build smoke + FR acceptance walk); no automated suite

**Target Platform**: Static docs site (`docs.viraui.dev` when deployed)

**Project Type**: Documentation content page (single existing web app)

**Performance Goals**: Stakeholder orientation skim + one next link in &lt;10 minutes (SC-006); no new runtime weight beyond normal MDX

**Constraints**: English only; expand not paste homepage; no Pro timelines; no token tables / component APIs / skill install cookbooks; no new routes

**Scale/Scope**: One page (`content/layers.mdx`); frontmatter + lead + four layer sections + next steps + overview prompt

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Constitution file remains Spec Kit template placeholders (not ratified). **Pass with note**: follow feature spec + this plan. Same stance as `001-llm-first-docs-site` and `002-principles-docs`.

**Post–Phase 1**: Still pass — design is content-only; no new constitutional surface.

## Project Structure

### Documentation (this feature)

```text
specs/003-layers-docs/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── layers-page.md
├── checklists/
│   └── requirements.md
└── tasks.md             # /speckit-tasks — not this command
```

### Source Code (repository root)

```text
viraui-docs/
├── content/
│   ├── meta.json              # unchanged (layers already listed)
│   ├── layers.mdx             # REPLACE stub with full editorial
│   ├── principles.mdx         # cross-link target (why)
│   ├── index.mdx              # already teases four Core layers; Layers deepens
│   ├── foundation/            # next-step targets
│   ├── components/            # next-step targets
│   └── get-started/skills.mdx # AI-native next-step target
```

**Structure Decision**: Edit only `content/layers.mdx`. Reuse intro/principles MDX chrome. No new packages, routes, or deploy work.

## Complexity Tracking

> None — no constitution violations; single-file content change.
