# Implementation Plan: Get Started Skills Page

**Branch**: `005-skills-docs` | **Date**: 2026-09-18 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/005-skills-docs/spec.md`

**Note**: `setup-plan.sh` resolved via git branch on sibling `vira-ui` (wrong tree). Artifacts written explicitly under `viraui-docs/specs/005-skills-docs/` per `.specify/feature.json`.

## Summary

Ship finished Skills at `content/get-started/skills.mdx` (`/get-started/skills`): short framing of what consumer skills are, per-skill prose blocks (job + when/not-when) for `viraui-setup`, `viraui-design`, `viraui-a11y`, `viraui-motion`, how-to prose that links Setup for install (no one-liner, no ask-agent fence), and a brief MCP distinction + link. Discursive English; orientation only—not skill-file mirrors or Setup bootstrap.

## Technical Context

**Language/Version**: MDX + TypeScript/React 19 (existing Fumapress docs app)

**Primary Dependencies**: fumapress / fumadocs-mdx; plain MDX headings + prose (no Tabs required); optional `Steps`/`Callout` only if how-to reads cleaner—YAGNI default = headings + paragraphs

**Storage**: Git-backed MDX under `content/get-started/` (N/A runtime DB)

**Testing**: Manual quickstart checklist (dev/build smoke + FR acceptance walk); no automated suite

**Target Platform**: Docs site (`docs.viraui.dev` when deployed)

**Project Type**: Documentation content page (single existing web app)

**Performance Goals**: Reader finishes what/when/how orientation in ~2 minutes; no new runtime weight beyond normal MDX

**Constraints**: English; no comparison table as primary what/when; no install one-liner; no titled prompt fences; no skill-hub dumps; no Setup bootstrap duplicate; required brief MCP mention; keep icon `OrbitSparkle`; `pageActions: false` to match instructional siblings

**Scale/Scope**: One page rewrite (`skills.mdx`); nav `meta.json` already lists `skills`—no rename; no pack/repo changes in `viraui-skills`

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Constitution file remains Spec Kit template placeholders (not ratified). **Pass with note**: follow feature spec + this plan. Same stance as `001`–`004`.

**Post–Phase 1**: Still pass — content only; no new constitutional surface.

## Project Structure

### Documentation (this feature)

```text
specs/005-skills-docs/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── skills-page.md
├── checklists/
│   └── requirements.md
└── tasks.md             # /speckit-tasks — not this command
```

### Source Code (repository root)

```text
viraui-docs/
├── content/
│   └── get-started/
│       ├── meta.json      # already: setup, skills, mcp — no change expected
│       ├── setup.mdx      # install command owner; keep Skills inbound links valid
│       ├── skills.mdx     # REPLACE stub with finished page
│       └── mcp.mdx        # MCP tutorial owner; Skills only links
├── press.config.tsx       # no change expected
└── specs/001-llm-first-docs-site/contracts/ia-tree.md  # already lists /get-started/skills
```

**Structure Decision**: Content feature. Rewrite `skills.mdx` only. No new packages, plugins, nav entries, or deploy work. Skill pack source of truth stays in sibling `viraui-skills` (out of scope to edit).

## Complexity Tracking

> None — no constitution violations; single MDX rewrite.
