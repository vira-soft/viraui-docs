# Implementation Plan: LLM-First Human Docs Site

**Branch**: `001-llm-first-docs-site` | **Date**: 2026-09-17 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-llm-first-docs-site/spec.md`

## Summary

Scaffold Fumapress docs app in `viraui-docs` with full IA stubs (intro, get started, foundation, Storybook-aligned components), LLM-first messaging, titled prompt code blocks / PreviewSlot shells, static build, private GitHub remote, Vercel CLI deploy (no Git link), Namecheap CNAME for `docs.viraui.dev`. No final editorial content.

## Technical Context

**Language/Version**: TypeScript + React 19 (Fumapress/Waku stack)

**Primary Dependencies**: fumapress, fumadocs-ui (@fumadocs/base-ui), fumadocs-core, fumadocs-mdx, Vite, Tailwind CSS v4

**Storage**: Git-backed MDX/meta.json under `content/` (N/A runtime DB)

**Testing**: Manual quickstart smoke (build + nav walk); no automated test suite in v1

**Target Platform**: Static web on Vercel; public URL `https://docs.viraui.dev`

**Project Type**: Documentation website (single project)

**Performance Goals**: Static pages; first contentful paint suitable for docs browsing; build completes for full stub tree

**Constraints**: English only; structure stubs not full content; no Vercel↔GitHub project link; private source repo; no 1:1 prop tables

**Scale/Scope**: ~4 top sections; ~8 foundation pages; 10 categories; ~40+ component stubs

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

Constitution file is still Spec Kit template placeholders (not ratified). **Pass with note**: no enforceable project principles yet; follow feature spec + research decisions. Re-ratify constitution in a later docs-governance change.

## Project Structure

### Documentation (this feature)

```text
specs/001-llm-first-docs-site/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── ia-tree.md
│   ├── page-shell.md
│   ├── deploy.md
│   └── component-inventory.txt
└── tasks.md
```

### Source Code (repository root)

```text
viraui-docs/
├── content/
│   ├── meta.json
│   ├── index.mdx
│   ├── intro/
│   ├── get-started/
│   ├── foundation/
│   └── components/
│       ├── meta.json
│       ├── index.mdx
│       └── {category}/
│           ├── meta.json
│           ├── index.mdx
│           └── {component}.mdx
├── src/
│   ├── app.css
│   └── components/
│       └── preview-slot.tsx
├── press.config.tsx
├── vite.config.ts
├── package.json
├── .gitignore
└── README.md
```

**Structure Decision**: Single Fumapress app at repo root (not monorepo). Content-first layout per Fumapress basics; shared UI helpers under `src/components` for PreviewSlot; prompts use titled fenced code blocks.

## Complexity Tracking

> None — constitution template empty; no gate violations.
