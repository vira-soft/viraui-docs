# Tasks: ViraUI Layers Page

**Input**: Design documents from `/specs/003-layers-docs/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/layers-page.md, quickstart.md

**Tests**: Not requested in spec — manual validation via `quickstart.md` only (no automated test tasks).

**Organization**: One MDX file (`content/layers.mdx`); stories are sequential editorial slices that stay independently checkable against acceptance scenarios.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Parallelizable (different files / no incomplete deps)
- **[Story]**: `[US1]`…`[US4]` for story phases only
- Every task includes an exact file path

## Path Conventions

Single docs app at repo root — primary edit: `content/layers.mdx`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm feature docs + target file ready; no new packages

- [x] T001 Verify feature docs present (`spec.md`, `plan.md`, `research.md`, `data-model.md`, `contracts/layers-page.md`, `quickstart.md`) under `specs/003-layers-docs/`
- [x] T002 Confirm Layers is listed in `content/meta.json` and stub exists at `content/layers.mdx`
- [x] T003 [P] Confirm titled fenced code blocks (`text` + `title="…"`) and `Steps`/`Step` + `Cards`/`Card` patterns from `content/principles.mdx` / `content/index.mdx` for reuse on Layers

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Replace stub shell so story sections can land without leftover stub copy

**⚠️ CRITICAL**: No user-story prose until this phase completes

- [x] T004 Replace frontmatter in `content/layers.mdx`: keep `title: Layers`, `icon: StackPerspective`, `pageActions: false`; set non-stub `description` per FR-012 / `specs/003-layers-docs/contracts/layers-page.md`
- [x] T005 Remove all stub body copy from `content/layers.mdx` (“Stub: foundation tokens…”, “Prompt placeholder…”) and insert skeleton: lead TBD slot + `<Steps>` with four `<Step>` H3 headings exactly (`Strong foundation`, `UI components`, `Motion guidelines`, `AI-native by design`) + empty `## Next` + bare titled prompt code block (`title="Ask your agent"`)
- [x] T006 Diff skeleton `content/layers.mdx` against MUST NOT list in `specs/003-layers-docs/contracts/layers-page.md` (no prop tables, no install recipes, no Pro timelines, no Principles essay dump)

**Checkpoint**: Skeleton page builds; stub gone; four layer headings present for story fills

---

## Phase 3: User Story 1 — Composition framing (Priority: P1) 🎯 MVP

**Goal**: Reader sees Layers as how four Core pieces stack into one system—not marketing bullets, not Principles worldview

**Independent Test**: Read lead + scan four Step headings alone; name all four layers in order and restate composition vs bag-of-parts

### Implementation for User Story 1

- [x] T007 [US1] Write lead in `content/layers.mdx` stating four working layers compose one coherent system; briefly contrast Principles (`/principles` = why) vs Layers (composition/how) without restating the Principles essay (FR-003, SC-003)
- [x] T008 [US1] Confirm Step order and H3 titles in `content/layers.mdx` match FR-002 exactly: Strong foundation → UI components → Motion guidelines → AI-native by design
- [x] T009 [US1] Tone pass on US1 lead in `content/layers.mdx`: clear overview, not slogan-only; English essay quality (FR-013, FR-014)

**Checkpoint**: US1 acceptance scenarios 1–3 satisfiable from lead + heading scan (SC-001 path)

---

## Phase 4: User Story 2 — Expand each Core layer (Priority: P1)

**Goal**: Each layer defined beyond [viraui.dev](https://viraui.dev) slogans: purpose, conceptual includes, what breaks when missing

**Independent Test**: For each Step body alone, state purpose + failure mode without needing code samples (SC-002)

### Implementation for User Story 2

- [x] T010 [US2] Write Strong foundation Step body in `content/layers.mdx` covering FR-004 + FR-008 (tokens/brandable foundations; same components different brands; what drifts without foundation); expand viraui.dev, do not paste-only
- [x] T011 [US2] Write UI components Step body in `content/layers.mdx` covering FR-005 + FR-008 (production building blocks on foundation; accessible/documented composition; what breaks without shared components)
- [x] T012 [US2] Write Motion guidelines Step body in `content/layers.mdx` covering FR-006 + FR-008 (duration/easing/reduced-motion; functional first; evocative when earned; what breaks without shared motion language)
- [x] T013 [US2] Write AI-native by design Step body in `content/layers.mdx` covering FR-007 + FR-008 (skills/guides/metadata teach real ViraUI; spec-driven for humans and models; what breaks when agents invent generic markup)
- [x] T014 [US2] Depth/ban pass on all four Step bodies in `content/layers.mdx`: no token tables, prop dumps, install cookbooks, motion encyclopedia, or Pro-as-required / Pro timeline claims (FR-015, contract MUST NOT)

**Checkpoint**: US2 acceptance scenarios 1–5 satisfied from four Step bodies

---

## Phase 5: User Story 3 — Overview LLM prompt (Priority: P1)

**Goal**: Copy-ready prompt asks AI to explain what ViraUI is, principles, and layers—grounded in official docs

**Independent Test**: Copy prompt alone into an LLM chat; answer covers identity + principles + four layers (SC-004)

### Implementation for User Story 3

- [x] T015 [US3] Replace bare prompt placeholder in `content/layers.mdx` with finished seed text in titled fenced `text` code block (`title="Ask your agent"`) per FR-009 / FR-010
- [x] T016 [US3] Ensure prompt in `content/layers.mdx` instructs the agent to cover (a) what ViraUI is, (b) principles, (c) working layers, and to prefer official ViraUI docs/context (Principles/Layers/Introduction) over inventing a generic design-system pitch
- [x] T017 [US3] Confirm prompt does not require restating the full Principles essay inside Layers body prose in `content/layers.mdx` (US3 acceptance scenario 3)

**Checkpoint**: US3 acceptance scenarios 1–3 satisfied

---

## Phase 6: User Story 4 — Next-step orientation (Priority: P2)

**Goal**: Reader knows where to go deeper without Layers duplicating sibling pages

**Independent Test**: Next region links work; understanding of four-layer model does not require those destinations

### Implementation for User Story 4

- [x] T018 [US4] Fill `## Next` in `content/layers.mdx` with `Cards`/`Card` links including `/principles` and `/get-started/skills`, plus `/foundation`, `/components`, and `/foundation/motion` per research recommended set / FR-011
- [x] T019 [US4] Keep Next cards as pointers only in `content/layers.mdx` (short blurbs; no duplicate foundation/component/skills essays)
- [x] T020 [US4] Confirm Layers complements Principles/Introduction in `content/layers.mdx` (composition deep-dive, not worldview essay, not index Card paste)

**Checkpoint**: US4 acceptance scenarios 1–2 satisfied

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Full-page contract + quickstart gate

- [x] T021 Walk full MUST / MUST NOT checklist in `specs/003-layers-docs/contracts/layers-page.md` against `content/layers.mdx`
- [x] T022 [P] Compare tone/length to `content/principles.mdx` and Core teaser in `content/index.mdx`; trim sloganizing; ensure English-only (FR-014); stub/placeholder absent (SC-005)
- [x] T023 Run `pnpm build` in `/Users/mattia/Workspaces/vira/viraui-ds/viraui-docs` and fix any MDX/build errors from `content/layers.mdx`
- [x] T024 Execute validation scenarios V1–V7 in `specs/003-layers-docs/quickstart.md` (`pnpm dev` + `/layers` walk)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Immediate
- **Foundational (Phase 2)**: After Setup — **BLOCKS** all story prose
- **US1 → US2 → US3 → US4**: Same file `content/layers.mdx` → prefer **sequential** (priority order)
- **Polish**: After all desired stories

### User Story Dependencies

- **US1 (P1)**: After Phase 2 — MVP slice (lead + ordered headings)
- **US2 (P1)**: After Phase 2; best after US1 lead exists so layer bodies sit under composition frame
- **US3 (P1)**: After Phase 2; can draft prompt anytime, best after US2 so prompt topics match page truth
- **US4 (P2)**: Best after US1–US2 so Next doesn’t orphan empty Steps; can land before or after US3

### Parallel Opportunities

- T003 parallel with T001/T002 (read-only)
- T022 parallel with T021 (editorial vs checklist) if two reviewers
- **Not parallel**: T004–T020 all write `content/layers.mdx` — one writer at a time

### Parallel Example

```bash
# Setup only — safe parallel reads:
Task: "T001 Verify feature docs under specs/003-layers-docs/"
Task: "T003 Confirm Steps/Cards/prompt patterns from principles and index"

# Do NOT parallelize story body tasks on content/layers.mdx
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Phase 1 + 2 (skeleton)
2. Phase 3 US1 (lead + four headings in order)
3. **STOP**: Validate US1 independent test (name four layers + composition claim)
4. Continue US2–US4 for publishable page (full ship needs expanded layers + prompt + Next per FR-002 / FR-009 / FR-011)

### Incremental Delivery

1. Skeleton → US1 → demo composition frame
2. US2 → expanded four layers
3. US3 → overview prompt
4. US4 → Next cards → polish + `pnpm build` + quickstart

### Suggested full ship

Complete Phases 1–7 (all four stories). MVP demo can stop after US1; production Layers page needs US1–US4.

---

## Notes

- Single-file feature: avoid `[P]` on story body tasks
- No automated tests unless later requested
- Copy source of truth: `spec.md` + `research.md` headings/links + `contracts/layers-page.md`
- Skills href: `/get-started/skills` (not orphan root `/skills`)
- Next command: `/speckit-implement`
