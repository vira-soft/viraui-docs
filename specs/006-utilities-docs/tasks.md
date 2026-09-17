# Tasks: Get Started Utilities Page

**Input**: Design documents from `/specs/006-utilities-docs/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/utilities-page.md, quickstart.md

**Tests**: Not requested in spec — manual validation via `quickstart.md` only (no automated test tasks).

**Organization**: Primary file `content/get-started/utilities.mdx` + Setup handoff + nav/IA. Stories sequential editorial slices; independently checkable.

**Note**: Content implementation landed before this tasks file; Phase 3–6 marked complete where artifacts already match the contract. Remaining work = quickstart validation if not yet run.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Parallelizable (different files / no incomplete deps)
- **[Story]**: `[US1]`…`[US4]` for story phases only
- Every task includes an exact file path

## Path Conventions

Single docs app at repo root — primary edit: `content/get-started/utilities.mdx`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm feature docs + paths ready; no new packages

- [x] T001 Verify feature docs present (`spec.md`, `plan.md`, `research.md`, `data-model.md`, `contracts/utilities-page.md`, `quickstart.md`) under `specs/006-utilities-docs/`
- [x] T002 Confirm `.specify/feature.json` points at `specs/006-utilities-docs`
- [x] T003 [P] Confirm Setup overlay shell lives in `content/get-started/setup.mdx` and MCP exists at `content/get-started/mcp.mdx` (Utilities follows MCP)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Page shell + nav/IA so story content has a home

**⚠️ CRITICAL**: No user-story prose until this phase completes

- [x] T004 Create `content/get-started/utilities.mdx` frontmatter: `title: Utilities`, `icon: WrenchScrewdriver`, `pageActions: false`, non-stub `description` (FR-001)
- [x] T005 Update `content/get-started/meta.json` `pages` to include `utilities` after `mcp` (FR-002)
- [x] T006 Update `specs/001-llm-first-docs-site/contracts/ia-tree.md` with `/get-started/utilities` and Get started order … mcp → utilities (FR-003)
- [x] T007 Replace body skeleton in `content/get-started/utilities.mdx`: Lead TBD + Breakpoints TBD + Base UI handoff TBD (no overlay-shell recipe)

**Checkpoint**: `/get-started/utilities` route exists in nav after MCP; IA lists URL

---

## Phase 3: User Story 1 — Optional framing (Priority: P1) 🎯 MVP

**Goal**: Reader grasps Utilities = opt-in helpers; Setup = required overlay shell

**Independent Test**: Lead alone → optional vs required + Setup link (SC-001 / US1)

### Implementation for User Story 1

- [x] T008 [US1] Write discursive lead in `content/get-started/utilities.mdx`: opt-in beyond Setup overlay shell; link `/get-started/setup` (FR-004)

**Checkpoint**: US1 acceptance scenarios 1–3 satisfiable from lead + nav

---

## Phase 4: User Story 2 — Breakpoints (Priority: P1)

**Goal**: When/not-when, defaults, replace-map, wrap + hook examples

**Independent Test**: Breakpoints section alone answers use/CSS preference/defaults/replace/wiring (SC-001)

### Implementation for User Story 2

- [x] T009 [US2] Write Breakpoints when/not-when + prefer CSS guidance in `content/get-started/utilities.mdx` (FR-005)
- [x] T010 [US2] Document five named default em thresholds in `content/get-started/utilities.mdx` (FR-005)
- [x] T011 [US2] Document replace-not-merge custom map rule (Callout OK) in `content/get-started/utilities.mdx` (FR-005)
- [x] T012 [US2] Add provider + `useBreakpoints` TSX examples and specs/skill depth pointer in `content/get-started/utilities.mdx` (FR-005)

**Checkpoint**: US2 acceptance scenarios 1–4 satisfied

---

## Phase 5: User Story 3 — Base UI handoff (Priority: P2)

**Goal**: Short link-out for Base UI built-ins; Utilities = ViraUI-custom only

**Independent Test**: Find Base UI section; confirm link-out, no recipes (US3)

### Implementation for User Story 3

- [x] T013 [US3] Write Base UI utilities handoff in `content/get-started/utilities.mdx` linking `https://base-ui.com` (FR-006); remove any RTL/DirectionProvider recipe

**Checkpoint**: US3 acceptance scenarios 1–2 satisfied

---

## Phase 6: User Story 4 — Setup handoff (Priority: P1)

**Goal**: Setup points to Utilities; no Breakpoints recipe on Setup

**Independent Test**: Setup has link, no Breakpoints defaults/examples (SC-004)

### Implementation for User Story 4

- [x] T014 [US4] Replace Breakpoints recipe (if any) on `content/get-started/setup.mdx` with brief optional providers/utilities note linking `/get-started/utilities` (FR-007)
- [x] T015 [US4] Confirm `content/get-started/utilities.mdx` does not restate overlay shell recipe (FR-009)

**Checkpoint**: US4 acceptance scenarios 1–3 satisfied

---

## Phase 7: Polish & Validation

**Purpose**: Contract + quickstart + MEMORY alignment

- [x] T016 Walk MUST / MUST NOT in `specs/006-utilities-docs/contracts/utilities-page.md` against `content/get-started/utilities.mdx`, `meta.json`, `setup.mdx`, and IA tree
- [x] T017 Update `MEMORY.md` spec router + Get started order to include Utilities / `006-utilities-docs`
- [ ] T018 Execute validation scenarios V1–V7 in `specs/006-utilities-docs/quickstart.md` (`pnpm dev` + `/get-started/utilities` walk + `pnpm build`)

---

## Dependencies & Execution Order

- Phase 1 → 2 → US1 → US2 → US3 → US4 → Polish
- US3 can follow US2; US4 can run after US1 once Utilities URL exists
- T018 remains open until manual quickstart run

## Parallel opportunities

- T003 with T001/T002
- After T007: T008 then T009–T012 sequential on same file
- T016 / T017 after content stable

## Implementation strategy

MVP = US1 + US2 + nav/IA + Setup handoff. Base UI handoff is small P2. Validate with quickstart before merge.
