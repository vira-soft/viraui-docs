# Implementation Plan: Foundation Overview Page

**Branch**: `007-foundation-docs` | **Date**: 2026-09-21 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/007-foundation-docs/spec.md`

**Note**: Artifacts under `viraui-docs/specs/007-foundation-docs/` per `.specify/feature.json`. Rewrite existing stub `content/(design-system)/foundation/index.mdx` only.

## Summary

Ship finished Foundation hub at `/foundation`: lead (what Foundation is) → short how-it-works block → Cards grid of eight topic links (title + image, no body copy). Cards use temporary Core / shared `SpotIllustration` stand-ins; reserved `foundation-*` names documented for a later Spotkit pass. No `meta.json` / IA changes. Consumer voice; no token tables or child essays.

## Technical Context

**Language/Version**: MDX + TypeScript/React 19 (existing Fumapress docs app)

**Primary Dependencies**: fumapress / fumadocs-mdx; `Cards` / `Card`; local `SpotIllustration` (`src/components/spot-illustration.tsx`)

**Storage**: Git-backed MDX under `content/(design-system)/foundation/` (N/A runtime DB)

**Testing**: Manual quickstart checklist (dev/build smoke + FR acceptance walk); no automated suite

**Target Platform**: Docs site (`docs.viraui.dev` when deployed)

**Project Type**: Documentation content page (single existing web app)

**Performance Goals**: Reader finishes lead + how-it-works + picks a card in ~5 minutes; no new runtime weight beyond normal MDX

**Constraints**: English; title `Overview`; `pageActions: false`; keep nav `icon: Eye`; no new SVGs this slice; stand-in spots only from existing `SpotIllustrationName` keys; consumer voice rule; no Ask-agent fence

**Scale/Scope**: One MDX rewrite (`foundation/index.mdx`); contract + MEMORY router already pointed; Spotkit SVG authorship out of scope

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Constitution file remains Spec Kit template placeholders (not ratified). **Pass with note**: follow feature spec + this plan. Same stance as `001`–`006`.

**Post–Phase 1**: Still pass — content-only page rewrite; no new constitutional surface.

## Project Structure

### Documentation (this feature)

```text
specs/007-foundation-docs/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── foundation-page.md
├── checklists/
│   └── requirements.md
└── tasks.md              # /speckit-tasks — not this command
```

### Source Code (repository root)

```text
viraui-docs/
├── content/(design-system)/foundation/
│   ├── index.mdx         # REWRITE — finished Overview hub
│   ├── meta.json         # unchanged (pages list already complete)
│   └── {topic}.mdx       # stubs unchanged
├── src/components/spot-illustration.tsx   # no change this slice (stand-ins use existing keys)
├── src/illustrations/    # no new SVGs this slice; foundation-* added in Spotkit follow-up
└── press.config.tsx      # no change expected
```

**Structure Decision**: Content feature. Single MDX rewrite + page contract. Spotkit follow-up later extends `SpotIllustration` ART map + SVG files; this plan only reserves names and stand-in mapping.

## Complexity Tracking

> None — no constitution violations; single page rewrite + deferred art.
