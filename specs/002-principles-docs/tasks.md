# Tasks: ViraUI Principles Page

**Input**: Design documents from `/specs/002-principles-docs/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/principles-page.md, quickstart.md

**Tests**: Not requested in spec — manual validation via `quickstart.md` only (no automated test tasks).

**Organization**: One MDX file (`content/principles.mdx`); stories are sequential editorial slices that stay independently checkable against acceptance scenarios.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Parallelizable (different files / no incomplete deps)
- **[Story]**: `[US1]`…`[US4]` for story phases only
- Every task includes an exact file path

## Path Conventions

Single docs app at repo root — primary edit: `content/principles.mdx`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm feature docs + target file ready; no new packages

- [x] T001 Verify feature docs present (`spec.md`, `plan.md`, `research.md`, `data-model.md`, `contracts/principles-page.md`, `quickstart.md`) under `specs/002-principles-docs/`
- [x] T002 Confirm Principles is listed in `content/meta.json` and stub exists at `content/principles.mdx`
- [x] T003 [P] Confirm titled fenced code blocks (`text` + `title="…"`) replace former `PromptBlock` for prompt seeds

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Replace stub shell so story sections can land without leftover stub copy

**⚠️ CRITICAL**: No user-story prose until this phase completes

- [x] T004 Replace frontmatter in `content/principles.mdx`: keep `title: Principles`, `icon: ListChecks`; set non-stub `description` per FR-012 / `contracts/principles-page.md`
- [x] T005 Remove all stub body copy from `content/principles.mdx` (“Stub: prefer skills…”) and insert skeleton: lead placeholder comment or short TBD lead slot + three H2 headings exactly as in research (`## One truth beats five surfaces`, `## The browser is the canvas`, `## Accessibility built into the loop`) + empty `## Next` + bare titled prompt code block placeholder
- [x] T006 Diff `content/principles.mdx` against MUST NOT list in `specs/002-principles-docs/contracts/principles-page.md` (no skill IDs, no Studio/Pro claims, no prop tables)

**Checkpoint**: Skeleton page builds; stub gone; H2s present for story fills

---

## Phase 3: User Story 1 — Multi-surface drift (Priority: P1) 🎯 MVP

**Goal**: Reader understands many systems of record → drift; AI multiplies it; disposable sketches/LLM handoff OK

**Independent Test**: Read only first principle (+ lead if present); restate drift argument + sketch allowance without other sections

### Implementation for User Story 1

- [x] T007 [US1] Write lead framing in `content/principles.mdx` (design system = shared language in product; not a static component deck) per FR-003 opening / contract lead MUST
- [x] T008 [US1] Write body under `## One truth beats five surfaces` in `content/principles.mdx` covering FR-003, FR-004, FR-004a (multi-surface SoR drift; AI multiplies alignment work; Figma/Sketch OK as disposable low-fi / LLM→ViraUI prompts, not SoR)
- [x] T009 [US1] Tone pass on US1 prose in `content/principles.mdx`: persuasive, respectful (no mockery); essay quality not slogan bullets (FR-013, SC-006)

**Checkpoint**: US1 acceptance scenarios 1–4 satisfied from lead + first H2 alone

---

## Phase 4: User Story 2 — Browser as canvas, code center (Priority: P1)

**Goal**: Canvas = concept (browser renders code visually); ViraUI keeps code at center; substrate note; no product timeline

**Independent Test**: Read second H2 alone; restate canvas metaphor + code-as-center without naming a shipped canvas product

### Implementation for User Story 2

- [x] T010 [US2] Write body under `## The browser is the canvas` in `content/principles.mdx` covering FR-005 and FR-006 (visual render ≈ freeform design canvas; code/running interface is center; static = proposal)
- [x] T011 [US2] Add foundation/substrate paragraph in same section of `content/principles.mdx` (distribution, versioning, tokens, coherent toolchain) per FR-007
- [x] T012 [US2] Ban-check US2 prose in `content/principles.mdx`: no App Studio / Pro / release-timeline claims; no “designers must hand-write TypeScript” implication (edge cases)

**Checkpoint**: US2 acceptance scenarios 1–4 satisfied from second H2

---

## Phase 5: User Story 3 — Accessibility built into the loop (Priority: P1)

**Goal**: APG-grounded a11y overview; agents via skills; link `/skills`; no skill IDs; not an APG encyclopedia

**Independent Test**: Read third H2; name APG; say skills + `/skills` without a skill package ID

### Implementation for User Story 3

- [x] T013 [US3] Write body under `## Accessibility built into the loop` in `content/principles.mdx` with complete principles-level overview + markdown link to https://www.w3.org/WAI/ARIA/apg/ (FR-008)
- [x] T014 [US3] State agents get APG-aligned practices via skills and add in-section or clear link to `/skills` in `content/principles.mdx`; do **not** name skill IDs (FR-008 clarify)
- [x] T015 [US3] Keep US3 depth principles-only in `content/principles.mdx` (no pattern catalog / how-to encyclopedia) per SC-005 / edge cases

**Checkpoint**: US3 acceptance scenarios 1–3 satisfied from third H2

---

## Phase 6: User Story 4 — Next + prompt code block (Priority: P2)

**Goal**: Orient to Layers + Skills; LLM prompt region with seed copy

**Independent Test**: End of page shows `/layers` + `/skills` cards/links and usable titled prompt code block; understanding of three principles does not require those pages

### Implementation for User Story 4

- [x] T016 [US4] Fill `## Next` in `content/principles.mdx` with Cards/links to `/layers` and `/skills` only (FR-011); mirror `content/index.mdx` Cards pattern if useful
- [x] T017 [US4] Replace bare prompt placeholder in `content/principles.mdx` with concise seed text in a titled fenced code block that asks an LLM to apply/restate principles in a project context (FR-010)
- [x] T018 [US4] Confirm no required next-step links to `/get-started`, `/why`, or `/components` in `content/principles.mdx` (nav may still list them globally)

**Checkpoint**: US4 acceptance scenarios 1–2 satisfied

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Full-page contract + quickstart gate

- [x] T019 Walk full MUST / MUST NOT checklist in `specs/002-principles-docs/contracts/principles-page.md` against `content/principles.mdx`
- [x] T020 [P] Compare tone/length to `content/index.mdx`; trim sloganizing; ensure English-only (FR-014)
- [x] T021 Run `pnpm build` in `/Users/mattia/Workspaces/vira/viraui-ds/viraui-docs` and fix any MDX/build errors from `content/principles.mdx`
- [x] T022 Execute validation scenarios V1–V6 in `specs/002-principles-docs/quickstart.md` (`pnpm dev` + `/principles` walk)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Immediate
- **Foundational (Phase 2)**: After Setup — **BLOCKS** all story prose
- **US1 → US2 → US3 → US4**: Same file `content/principles.mdx` → prefer **sequential** (priority order)
- **Polish**: After all desired stories

### User Story Dependencies

- **US1 (P1)**: After Phase 2 — MVP slice (lead + first principle)
- **US2 (P1)**: After Phase 2; logically follows US1 in same file (can draft independently then merge carefully)
- **US3 (P1)**: After Phase 2; same single-file caution
- **US4 (P2)**: After principles prose exists (best after US1–US3) so Next/Prompt don’t orphan empty H2s

### Parallel Opportunities

- T003 parallel with T001/T002 (read-only)
- T020 parallel with T019 (editorial vs checklist) if two reviewers
- **Not parallel**: T004–T018 all write `content/principles.mdx` — one writer at a time

### Parallel Example

```bash
# Setup only — safe parallel reads:
Task: "T001 Verify feature docs under specs/002-principles-docs/"
Task: "T003 Confirm titled fenced code blocks for prompt seeds"

# Do NOT parallelize story body tasks on content/principles.mdx
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Phase 1 + 2 (skeleton)
2. Phase 3 US1 (lead + multi-surface principle)
3. **STOP**: Validate US1 independent test
4. Continue US2–US4 for publishable page (full ship needs all three principles per FR-002)

### Incremental Delivery

1. Skeleton → US1 → demo worldview critique
2. US2 → code-center thesis
3. US3 → a11y + skills
4. US4 → Next + prompt code block → polish + `pnpm build` + quickstart

### Suggested full ship

Complete Phases 1–7 (all four stories). MVP demo can stop after US1; production Principles page needs US1–US4.

---

## Notes

- Single-file feature: avoid `[P]` on story body tasks
- No automated tests unless later requested
- Copy source of truth: `spec.md` clarifications + `research.md` H2 titles + `contracts/principles-page.md`
- Next command: `/speckit-implement`
