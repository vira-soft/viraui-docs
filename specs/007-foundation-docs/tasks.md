# Tasks: Foundation Overview Page

**Input**: Design documents from `/specs/007-foundation-docs/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/foundation-page.md, quickstart.md

**Tests**: Not requested in spec — manual validation via `quickstart.md` only (no automated test tasks).

**Organization**: Single MDX rewrite `content/(design-system)/foundation/index.mdx`. Stories = sequential editorial slices on that file; independently checkable. Spotkit SVG authorship is **out of scope** (follow-up).

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Parallelizable (different files / no incomplete deps)
- **[Story]**: `[US1]`…`[US3]` for story phases only
- Every task includes an exact file path

## Path Conventions

Single docs app at repo root — primary edit: `content/(design-system)/foundation/index.mdx`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm feature docs + paths ready; no new packages

- [x] T001 Verify feature docs present (`spec.md`, `plan.md`, `research.md`, `data-model.md`, `contracts/foundation-page.md`, `quickstart.md`) under `specs/007-foundation-docs/`
- [x] T002 Confirm `.specify/feature.json` points at `specs/007-foundation-docs`
- [x] T003 [P] Confirm stub exists at `content/(design-system)/foundation/index.mdx` and child stubs + `meta.json` list eight topics (no meta edits this feature)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Frontmatter + clear body shell so story prose has a home

**⚠️ CRITICAL**: No user-story prose until this phase completes

- [x] T004 Set frontmatter on `content/(design-system)/foundation/index.mdx`: `title: Overview`, `icon: Eye`, `pageActions: false`, non-stub `description` (FR-002 / FR-014)
- [x] T005 Replace stub body in `content/(design-system)/foundation/index.mdx`: remove “Browse child topics…” and Ask-agent placeholder fence; leave ordered placeholders Lead / How it works / Cards TBD (FR-013)

**Checkpoint**: `/foundation` frontmatter correct; stub junk gone; skeleton ready for US1–US3

---

## Phase 3: User Story 1 — Understand what Foundation is (Priority: P1) 🎯 MVP

**Goal**: Lead + short how-it-works so reader grasps substrate model (not component catalog, not Layers essay)

**Independent Test**: Read lead + how-it-works alone → restate Foundation = shared substrate; change values → brand/look; topics = facets; components/agents consume (SC-001 / US1)

### Implementation for User Story 1

- [x] T006 [US1] Write consumer-facing lead in `content/(design-system)/foundation/index.mdx`: what Foundation is (tokens / brandable primitives); not a component catalog (FR-003 / FR-009)
- [x] T007 [US1] Add short `## How it works` (or equivalent) block after the lead in `content/(design-system)/foundation/index.mdx`: values shape brand/look; topics are facets; components + agents consume same substrate; no per-topic mini-essays (FR-003a / FR-004)

**Checkpoint**: Page structure lead → how-it-works; US1 acceptance scenarios 1–4 satisfiable without Cards

---

## Phase 4: User Story 2 — Browse topics via Cards (Priority: P1)

**Goal**: Eight Cards (title + stand-in image + href) in nav order

**Independent Test**: From Cards alone, name all eight topics and open matching `/foundation/...` children; each card shows an image (SC-002 / US2)

### Implementation for User Story 2

- [x] T008 [US2] Add `Cards` grid after how-it-works in `content/(design-system)/foundation/index.mdx` with eight `Card`s in contract order: Themes & brand, Colors, Motion, Elevation, Typography, Spacing, Radius, Icons (FR-005)
- [x] T009 [US2] Wire each card `title` + `href` to matching `/foundation/{slug}` in `content/(design-system)/foundation/index.mdx` (FR-006 / FR-007)
- [x] T010 [US2] Add `SpotIllustration` stand-ins per `specs/007-foundation-docs/contracts/foundation-page.md` table (`foundation` / `motion` / `layers-foundation` / `components`) in `content/(design-system)/foundation/index.mdx`; no card body copy; no new SVGs (FR-006 / FR-008)

**Checkpoint**: US2 acceptance scenarios 1–4 satisfied with temporary stand-in art

---

## Phase 5: User Story 3 — Layers / Components orientation (Priority: P2)

**Goal**: Reader can reach Layers and Components without this page absorbing those essays

**Independent Test**: Working links to `/layers` and `/components` from lead and/or how-it-works; overview still finishes without opening them (US3)

### Implementation for User Story 3

- [x] T011 [US3] Add in-prose link to `/layers` in lead or how-it-works of `content/(design-system)/foundation/index.mdx` without restating four-layer essay (FR-004 / US3)
- [x] T012 [US3] Add in-prose link to `/components` in lead or how-it-works of `content/(design-system)/foundation/index.mdx` without becoming a component index (US3)

**Checkpoint**: US3 acceptance scenarios 1–2 satisfied

---

## Phase 6: Polish & Validation

**Purpose**: Contract + quickstart + MEMORY alignment

- [x] T013 Walk MUST / MUST NOT in `specs/007-foundation-docs/contracts/foundation-page.md` against `content/(design-system)/foundation/index.mdx`
- [x] T014 [P] Confirm `MEMORY.md` router lists `007-foundation-docs` + `contracts/foundation-page.md` and durable gotcha for stand-ins / reserved `foundation-*`
- [x] T015 Confirm `content/(design-system)/foundation/meta.json` unchanged (FR-011)
- [x] T016 Execute validation scenarios V1–V5 in `specs/007-foundation-docs/quickstart.md` (`pnpm dev` + `/foundation` walk + `pnpm build`)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Start immediately
- **Foundational (Phase 2)**: After Setup — blocks all stories
- **US1 (Phase 3)**: After Foundational — MVP prose
- **US2 (Phase 4)**: After US1 (same file; Cards after how-it-works)
- **US3 (Phase 5)**: After US1 (links in lead/how-it-works); can run before or after US2
- **Polish (Phase 6)**: After desired stories complete

### User Story Dependencies

- **US1 (P1)**: No story deps — MVP
- **US2 (P1)**: Needs US1 structure (Cards after how-it-works)
- **US3 (P2)**: Needs US1 prose regions for links; independent of Cards content

### Parallel Opportunities

- T003 with T001/T002
- T014 with T013/T015 after content stable
- US3 (T011–T012) can overlap late US2 if careful on same file — prefer sequential to avoid conflict
- Spotkit follow-up (new SVGs + ART map) is **not** in this task list

### Parallel Example: After Foundational

```bash
# Sequential on same MDX (preferred):
Task: "T006 [US1] Write lead in content/(design-system)/foundation/index.mdx"
Task: "T007 [US1] Add how-it-works in content/(design-system)/foundation/index.mdx"
Task: "T008–T010 [US2] Cards + hrefs + stand-ins in content/(design-system)/foundation/index.mdx"
Task: "T011–T012 [US3] Layers + Components links in content/(design-system)/foundation/index.mdx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Phase 1–2
2. Phase 3 US1 (lead + how-it-works)
3. **STOP** — validate SC-001 from prose alone
4. Then add Cards (US2) for navigable hub

### Incremental Delivery

1. Setup + Foundational → shell ready
2. US1 → orientation MVP
3. US2 → full topic navigation with stand-ins
4. US3 → cross-links
5. Polish + quickstart before merge

### Notes

- Do **not** author `foundation-*.svg` or edit `src/components/spot-illustration.tsx` in this feature
- Reserved final names stay documented in contract for Spotkit follow-up
- Commit after each phase or logical group
- Implement 2026-09-21: all T001–T016 done; also fixed Setup link `/get-started/foundation` → `/foundation` (build link-validation)
