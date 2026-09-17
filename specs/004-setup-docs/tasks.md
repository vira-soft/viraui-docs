# Tasks: Get Started Setup Page

**Input**: Design documents from `/specs/004-setup-docs/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/setup-page.md, quickstart.md

**Tests**: Not requested in spec — manual validation via `quickstart.md` only (no automated test tasks).

**Organization**: Primary file `content/get-started/setup.mdx` (+ `meta.json`, delete `index.mdx`). Stories are sequential editorial slices on one page; stay independently checkable against acceptance scenarios.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Parallelizable (different files / no incomplete deps)
- **[Story]**: `[US1]`…`[US4]` for story phases only
- Every task includes an exact file path

## Path Conventions

Single docs app at repo root — primary edit: `content/get-started/setup.mdx`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm feature docs + MDX chrome ready; no new packages

- [x] T001 Verify feature docs present (`spec.md`, `plan.md`, `research.md`, `data-model.md`, `contracts/setup-page.md`, `quickstart.md`) under `specs/004-setup-docs/`
- [x] T002 Confirm Get started stub at `content/get-started/index.mdx` and `content/get-started/meta.json`; confirm Skills already links `/get-started/setup` in `content/get-started/skills.mdx`
- [x] T003 [P] Confirm `Tabs`/`Tab` registered in `press.config.tsx` and titled fenced `text` + `title="…"` prompt pattern from `content/get-started/skills.mdx` / `content/principles.mdx` for reuse

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Canonical route + page skeleton so story prose lands without leftover stub

**⚠️ CRITICAL**: No user-story prose until this phase completes

- [x] T004 Create `content/get-started/setup.mdx` by moving/renaming content from `content/get-started/index.mdx`; delete `content/get-started/index.mdx` so Setup is not served as category index
- [x] T005 Update `content/get-started/meta.json` `pages` to `["setup", "skills", "mcp"]` per FR-001 / `specs/004-setup-docs/contracts/setup-page.md`
- [x] T006 Replace frontmatter in `content/get-started/setup.mdx`: `title: Setup`, `icon: Gear`, `pageActions: false`, non-stub `description` about consumer bootstrap
- [x] T007 Replace body in `content/get-started/setup.mdx` with skeleton only: lead TBD slot + Requirements TBD + Shared process TBD + `<Tabs>` with `<Tab value="AI">` (first) and `<Tab value="Manual">` (second) containing TBD markers for path-specific content (no stub “Prompt placeholder” / “commands arrive later” left as final copy)
- [x] T008 Diff skeleton `content/get-started/setup.mdx` + `meta.json` against MUST NOT list in `specs/004-setup-docs/contracts/setup-page.md` (no prop tables, no framework atlas, Setup not on `index.mdx`)

**Checkpoint**: `/get-started/setup` route exists in nav; stub index gone; AI/Manual tab shell present

---

## Phase 3: User Story 1 — Requirements recap (Priority: P1) 🎯 MVP

**Goal**: Reader knows platform expectations, Base UI as sole required peer beyond React, and short toolchain—before install tabs

**Independent Test**: Read only lead + Requirements (ignore tabs); restate React context, Base UI peer + link, toolchain (SC-001)

### Implementation for User Story 1

- [x] T009 [US1] Write discursive lead in `content/get-started/setup.mdx`: bootstrap into a React app; thin bootstrap; agents/skills do heavy lifting; Setup ≠ Skills ≠ MCP (FR-002)
- [x] T010 [US1] Write Requirements section (outside tabs) in `content/get-started/setup.mdx`: React / React DOM platform; Base UI sole required peer beyond that with link `https://base-ui.com`; short toolchain (package manager + agent host for AI path); optional foundation/icons only if clearly optional (FR-003)
- [x] T011 [US1] Write Shared process section (outside tabs) in `content/get-started/setup.mdx` covering sequence skills → packages/peers → theme gate → theme → fonts → preflight → root providers, including theme-choice gate and at most a brief CSS-reset coexistence note (FR-006a / research §3)

**Checkpoint**: US1 acceptance scenarios 1–3 satisfiable from lead + Requirements alone; shared process present for later tabs

---

## Phase 4: User Story 2 — AI full path + verify prompt (Priority: P1)

**Goal**: AI tab drives full bootstrap via copy-ready setup prompt + separate verify prompt

**Independent Test**: Copy AI setup prompt alone; it covers full setup intent; verify prompt present and non-placeholder (SC-002 / SC-007)

### Implementation for User Story 2

- [x] T012 [US2] Fill AI tab in `content/get-started/setup.mdx` with short path-specific intro (no duplicate of shared process essay) pointing to the copy-ready prompts
- [x] T013 [US2] Write titled setup prompt fence in AI tab of `content/get-started/setup.mdx` instructing full consumer setup: skills pack `npx skills add https://skills.sh/p/IQZPjm9biEMkAZOP`, `@viraui/react` + peers including `@base-ui/react`, theme gate before foundation/fonts, theme→fonts→preflight JS side-effect imports, root Dialog/Tooltip/Toast providers, follow `viraui-setup` / package specs (FR-005 / research §5)
- [x] T014 [US2] Write separate titled verify prompt fence in AI tab of `content/get-started/setup.mdx` for smoke-check theme tokens, preflight, providers, sample Button/Stack (or toast) render (FR-005 / FR-009)
- [x] T015 [US2] Confirm AI is first/default tab and prompts are non-placeholder in `content/get-started/setup.mdx` (SC-002 / SC-005)

**Checkpoint**: US2 acceptance scenarios 1–4 satisfied from AI tab + shared sections

---

## Phase 5: User Story 3 — Manual full path + checklist verify (Priority: P1)

**Goal**: Manual tab completes same bootstrap outcomes with human steps; checklist verify; Skills link

**Independent Test**: Follow Manual + shared sections alone; same outcomes as AI path; no verify prompt fence (SC-003 / SC-007)

### Implementation for User Story 3

- [x] T016 [US3] Fill Manual tab in `content/get-started/setup.mdx` with full human process for packages (`@viraui/react`, React peers, `@base-ui/react`), skills install one-liner, theme gate, theme/fonts/preflight, root providers—path-specific only, no duplicate shared essay (FR-006 / FR-006a)
- [x] T017 [US3] Add skills install command plus link to `/get-started/skills` in Manual tab of `content/get-started/setup.mdx` (FR-006)
- [x] T018 [US3] Add checklist-style verify (“done when…”) in Manual tab of `content/get-started/setup.mdx` matching AI verify smoke outcomes; do **not** add a verify prompt fence (FR-006 / SC-007)
- [x] T019 [US3] Confirm `content/get-started/skills.mdx` still links to `/get-started/setup` and that Manual Skills link resolves (FR-010)

**Checkpoint**: US3 acceptance scenarios 1–4 satisfied

---

## Phase 6: User Story 4 — Discursive voice (Priority: P2)

**Goal**: Connected prose; no telegram stacks; no em-dash spam; no monorepo trivia

**Independent Test**: Read-aloud / editorial skim of `content/get-started/setup.mdx` passes SC-004

### Implementation for User Story 4

- [x] T020 [US4] Tone pass on lead + Requirements + Shared process in `content/get-started/setup.mdx`: discursive paragraphs; cut ultra-short consecutive fragments; reduce em dashes (FR-008)
- [x] T021 [US4] Tone pass on AI and Manual tab copy in `content/get-started/setup.mdx`: keep path-specific material scannable but not telegram; strip monorepo-only / Storybook-kitchen trivia (FR-008 / SC-004)
- [x] T022 [US4] Ban pass on `content/get-started/setup.mdx`: no prop tables, framework import atlas, skills encyclopedia, mandatory foundation/icons, foundation-before-theme-gate (contract MUST NOT)

**Checkpoint**: US4 acceptance scenarios 1–2 satisfied

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Full-page contract + quickstart gate

- [x] T023 Walk full MUST / MUST NOT checklist in `specs/004-setup-docs/contracts/setup-page.md` against `content/get-started/setup.mdx` and `content/get-started/meta.json`
- [x] T024 [P] Confirm shared process not duplicated inside both tabs and AI has two prompt fences while Manual has checklist-only verify in `content/get-started/setup.mdx` (SC-006 / SC-007)
- [x] T025 Run `pnpm build` in `/Users/mattia/Workspaces/vira/viraui-ds/viraui-docs` and fix any MDX/link errors from Setup rename
- [x] T026 Execute validation scenarios V1–V8 in `specs/004-setup-docs/quickstart.md` (`pnpm dev` + `/get-started/setup` walk)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Immediate
- **Foundational (Phase 2)**: After Setup — **BLOCKS** all story prose
- **US1 → US2 → US3 → US4**: Same primary file `content/get-started/setup.mdx` → prefer **sequential**
- **Polish**: After all desired stories

### User Story Dependencies

- **US1 (P1)**: After Phase 2 — MVP (lead + requirements + shared process)
- **US2 (P1)**: After US1 shared process exists (tabs must not restate it)
- **US3 (P1)**: After US1; can parallel with US2 only if two writers split AI vs Manual carefully—prefer after or with US2 sequentially
- **US4 (P2)**: After US1–US3 copy exists (tone pass on finished prose)

### Parallel Opportunities

- T003 parallel with T001/T002 (read-only)
- T024 parallel with T023 if two reviewers
- **Not parallel**: T004–T022 primarily write `setup.mdx` / `meta.json` — one writer at a time
- T019 can run after T004–T005 (link check) in parallel with later Manual prose if Skills file untouched

### Parallel Example

```bash
# Setup only — safe parallel reads:
Task: "T001 Verify feature docs under specs/004-setup-docs/"
Task: "T003 Confirm Tabs/Tab and prompt fence patterns"

# Do NOT parallelize body tasks on content/get-started/setup.mdx
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Phase 1 + 2 (route + skeleton)
2. Phase 3 US1 (lead + requirements + shared process)
3. **STOP**: Validate US1 independent test (Base UI peer + toolchain from Requirements alone)
4. Continue US2–US4 for publishable Setup (full ship needs both tabs + voice)

### Incremental Delivery

1. Rename/skeleton → US1 requirements
2. US2 AI prompts
3. US3 Manual full path
4. US4 voice → polish + `pnpm build` + quickstart

### Suggested full ship

Complete Phases 1–7 (all four stories). MVP demo can stop after US1; production Setup page needs US1–US4.

### Task count

| Phase | Tasks |
| --- | --- |
| Setup | T001–T003 (3) |
| Foundational | T004–T008 (5) |
| US1 | T009–T011 (3) |
| US2 | T012–T015 (4) |
| US3 | T016–T019 (4) |
| US4 | T020–T022 (3) |
| Polish | T023–T026 (4) |
| **Total** | **26** |

---

## Notes

- Single-file feature: avoid `[P]` on story body tasks that touch `setup.mdx`
- No automated tests unless later requested
- Copy authority: `spec.md` + `research.md` + `contracts/setup-page.md`; bootstrap facts from `viraui-setup` / package peers—do not invent paths
- Skills href: `/get-started/skills`; Setup URL: `/get-started/setup`
- Next command: `/speckit-implement`
