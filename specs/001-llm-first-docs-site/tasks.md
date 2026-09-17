# Tasks: LLM-First Human Docs Site

**Input**: Design documents from `/specs/001-llm-first-docs-site/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

## Format

` - [ ] Txxx [P?] [USn?] Description with file path `

## Phase 1: Setup

- [x] T001 Initialize Fumapress app at repo root (`package.json`, `vite.config.ts`, `press.config.tsx`, `src/app.css`, scripts) in `/Users/mattia/Workspaces/vira/viraui-ds/viraui-docs`
- [x] T002 Create/verify `.gitignore` for Node/Vite/Fumapress (`node_modules/`, `dist/`, `.env*`, `.vercel/`, `.DS_Store`) in `/Users/mattia/Workspaces/vira/viraui-ds/viraui-docs/.gitignore`
- [x] T003 Add stub `README.md` with LLM-first purpose + local/dev/deploy pointers in `/Users/mattia/Workspaces/vira/viraui-ds/viraui-docs/README.md`
- [x] T004 Install dependencies and confirm `dev`/`build` scripts work empty scaffold

## Phase 2: Foundational

- [x] T005 Configure `press.config.tsx`: site name ViraUI Docs, `baseUrl` https://docs.viraui.dev, `mode: "static"`, git user/repo `vira-soft/viraui-docs`
- [x] T006 [P] Prompt regions via titled fenced code blocks (former custom `PromptBlock` removed)
- [x] T007 [P] Implement `PreviewSlot` in `src/components/preview-slot.tsx`
- [x] T008 Wire MDX/components so content pages can import PreviewSlot (prompts = titled fences)
- [x] T009 Create root `content/meta.json` IA order per `contracts/ia-tree.md`

## Phase 3: User Story 1 — Public branded docs shell (P1)

**Goal**: Reachable IA with LLM-first home messaging
**Independent test**: Home + top nav sections load locally

- [x] T010 [US1] Write LLM-first home stub `content/index.mdx`
- [x] T011 [P] [US1] Create intro section pages under `content/intro/` (why, principles, layers, skills) + `meta.json`
- [x] T012 [US1] Ensure top-level nav exposes Intro, Get started, Foundation, Components

## Phase 4: User Story 2 — Full structure stubs (P1)

**Goal**: Complete placeholder tree
**Independent test**: Walk all planned leaves

- [x] T013 [US2] Create get-started stubs `content/get-started/` with titled prompt code block regions
- [x] T014 [P] [US2] Create foundation stubs under `content/foundation/` (themes-and-brand, colors, motion, elevation, typography, space, radius, icons)
- [x] T015 [US2] Create components overview `content/components/index.mdx` listing 10 Storybook categories
- [x] T016 [US2] For each category folder: `meta.json` (defaultOpen) + `index.mdx` + one stub MDX per inventory line in `contracts/component-inventory.txt`

## Phase 5: User Story 3 — Component page shell (P2)

**Goal**: Narrative + preview + prompt regions, no prop tables
**Independent test**: Sample 5 component pages

- [x] T017 [US3] Apply page-shell contract to all component stubs (narrative + PreviewSlot + titled prompt code block)
- [x] T018 [US3] Smoke-check 5 sample pages for missing prop-table-as-primary pattern

## Phase 6: User Story 4 — Git + Vercel + DNS (P2)

**Goal**: Private remote, CLI deploy, docs.viraui.dev
**Independent test**: production URL / documented blockers

- [x] T019 [US4] Create private GitHub repo `vira-soft/viraui-docs`, set `origin`, initial commit+push
- [x] T020 [US4] Build static output (`npm run build` / `pnpm build`) verifying `dist/public`
- [x] T021 [US4] Create Vercel project via CLI **without** GitHub link; `vercel --prod`
- [x] T022 [US4] Attach custom domain `docs.viraui.dev` on Vercel; add Namecheap CNAME `docs`

## Phase 7: Polish

- [x] T023 Verify quickstart.md checklist locally
- [x] T024 Update `specs/001-llm-first-docs-site/tasks.md` checkboxes to done
- [x] T025 Document remaining blockers (auth/DNS propagation) in README if any

## Dependencies

- Phase 1 → Phase 2 → US1 → US2 → US3
- US4 can start after T020 build works; T019 parallel once files exist
- Polish last

## Parallel examples

- T006 || T007
- T011 || T014 (after T009)
- Category stub generation in T016 can batch by category

## MVP

T001–T012 + T020 enough for demoable local+build shell; full MVP for product = through T022.

## Strategy

1. Scaffold Fumapress
2. Helpers + meta IA
3. Stub all content from inventory
4. Build
5. Git/Vercel/DNS as credentials allow
