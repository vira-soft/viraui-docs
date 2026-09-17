# Implementation Plan: Get Started Setup Page

**Branch**: `004-setup-docs` | **Date**: 2026-09-18 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/004-setup-docs/spec.md`

**Note**: `setup-plan.sh` resolved via git branch on sibling `vira-ui` (wrong tree). Artifacts written explicitly under `viraui-docs/specs/004-setup-docs/` per `.specify/feature.json`.

## Summary

Ship finished Setup at `content/get-started/setup.mdx` (`/get-started/setup`): requirements recap (React platform, Base UI as sole non-React peer + link, toolchain), shared process narrative once outside tabs, then AI / Manual tabs each covering the full bootstrap process. AI tab = setup prompt + verify prompt; Manual = human steps + checklist verify. Rename away from `index.mdx`; update `meta.json`. Discursive English; no telegram prose; no skills encyclopedia.

## Technical Context

**Language/Version**: MDX + TypeScript/React 19 (existing Fumapress docs app)

**Primary Dependencies**: fumapress, fumadocs-mdx, `Tabs`/`Tab` from `fumadocs-ui` (already registered in `press.config.tsx`), titled fenced `text` code blocks for prompts; optional `Steps`/`Callout` if shared process reads cleaner

**Storage**: Git-backed MDX under `content/get-started/` (N/A runtime DB)

**Testing**: Manual quickstart checklist (dev/build smoke + FR acceptance walk); no automated suite

**Target Platform**: Docs site (`docs.viraui.dev` when deployed)

**Project Type**: Documentation content page (single existing web app)

**Performance Goals**: Reader completes prerequisites skim + finds preferred path in &lt;5 minutes; no new runtime weight beyond normal MDX

**Constraints**: English; AI-centered; shared steps outside tabs; full process in each tab; Base UI external link; no monorepo trivia; no em-dash spam; no prop tables / framework import atlas / skills catalog dump

**Scale/Scope**: One primary page (`setup.mdx`); `meta.json` + delete/rename `index.mdx`; Skills link already targets `/get-started/setup`

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Constitution file remains Spec Kit template placeholders (not ratified). **Pass with note**: follow feature spec + this plan. Same stance as `001`–`003`.

**Post–Phase 1**: Still pass — content + nav meta only; no new constitutional surface.

## Project Structure

### Documentation (this feature)

```text
specs/004-setup-docs/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── setup-page.md
├── checklists/
│   └── requirements.md
└── tasks.md             # /speckit-tasks — not this command
```

### Source Code (repository root)

```text
viraui-docs/
├── content/
│   ├── meta.json                    # unchanged (…get-started)
│   └── get-started/
│       ├── meta.json                # REPLACE index → setup in pages list
│       ├── index.mdx                # REMOVE (rename → setup.mdx)
│       ├── setup.mdx                # NEW finished Setup page
│       ├── skills.mdx               # already links /get-started/setup
│       └── mcp.mdx
├── press.config.tsx                 # Tabs/Tab already registered — no change expected
└── specs/001-llm-first-docs-site/contracts/ia-tree.md  # already lists /get-started/setup
```

**Structure Decision**: Content feature. Rename stub to `setup.mdx`, write full editorial, fix get-started `meta.json`. No new packages, plugins, or deploy work. Category landing `/get-started` without an `index` page is acceptable (nav uses children; first child `setup`).

## Complexity Tracking

> None — no constitution violations; content + meta rename.
