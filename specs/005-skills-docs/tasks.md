# Tasks: Get Started Skills Page

**Input**: Design documents from `/specs/005-skills-docs/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/skills-page.md, quickstart.md

**Tests**: Not requested in spec — manual validation via `quickstart.md` only (no automated test tasks).

**Organization**: Primary file `content/get-started/skills.mdx`. Stories are sequential editorial slices on one page; stay independently checkable against acceptance scenarios.

**Note**: `setup-tasks.sh` resolves sibling `vira-ui` by branch (wrong tree). This file lives under `viraui-docs/specs/005-skills-docs/` per `.specify/feature.json`.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Parallelizable (different files / no incomplete deps)
- **[Story]**: `[US1]`…`[US4]` for story phases only
- Every task includes an exact file path

## Path Conventions

Single docs app at repo root — primary edit: `content/get-started/skills.mdx`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm feature docs + current stub ready; no new packages

- [x] T001 Verify feature docs present (`spec.md`, `plan.md`, `research.md`, `data-model.md`, `contracts/skills-page.md`, `quickstart.md`) under `specs/005-skills-docs/`
- [x] T002 Confirm stub at `content/get-started/skills.mdx` and that `content/get-started/meta.json` already lists `skills` between `setup` and `mcp`
- [x] T003 [P] Confirm Setup owns install command in `content/get-started/setup.mdx` and MCP page exists at `content/get-started/mcp.mdx` (Skills will only link)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Frontmatter + page skeleton so story prose lands without leftover stub fence

**⚠️ CRITICAL**: No user-story prose until this phase completes

- [x] T004 Update frontmatter in `content/get-started/skills.mdx`: `title: Skills`, `icon: OrbitSparkle`, `pageActions: false`, non-stub `description` about consumer skill orientation / when to use (FR-001 / contract)
- [x] T005 Replace body in `content/get-started/skills.mdx` with skeleton only: Lead TBD + How TBD + four skill-block TBD headings (`viraui-setup`, `viraui-design`, `viraui-a11y`, `viraui-motion`) + MCP TBD — remove stub ask-agent prompt fence entirely (FR-007 / SC-005)
- [x] T006 Diff skeleton `content/get-started/skills.mdx` against MUST NOT list in `specs/005-skills-docs/contracts/skills-page.md` (no install one-liner, no prompt fence, no comparison table shell)

**Checkpoint**: `/get-started/skills` loads; stub fence gone; section slots present; meta unchanged

---

## Phase 3: User Story 1 — What framing (Priority: P1) 🎯 MVP

**Goal**: Reader grasps skills = agent playbooks; not prop docs, not Setup, not MCP

**Independent Test**: Read only lead (ignore how + skill blocks); restate playbook purpose + API authority boundary (SC-002 / US1)

### Implementation for User Story 1

- [x] T007 [US1] Write discursive lead in `content/get-started/skills.mdx`: publishable consumer skills as agent playbooks that keep ViraUI on-pattern; deep API in package specs; Skills ≠ Setup ≠ MCP (FR-002 / research §2)

**Checkpoint**: US1 acceptance scenarios 1–3 satisfiable from lead alone

---

## Phase 4: User Story 2 — When per skill (Priority: P1)

**Goal**: Four short prose blocks map intents to `viraui-setup` / `viraui-design` / `viraui-a11y` / `viraui-motion`

**Independent Test**: Map bootstrap / compose / APG audit / motion intents from prose blocks alone; no comparison table (SC-001)

### Implementation for User Story 2

- [x] T008 [US2] Write `viraui-setup` prose block in `content/get-started/skills.mdx` (~2–3 sentences: bootstrap/theme/preflight job + use when / not when for routine compose) per research §3
- [x] T009 [US2] Write `viraui-design` prose block in `content/get-started/skills.mdx` (~2–3 sentences: default compose job + use when / not when for audit-only or bootstrap-broken cases) per research §3
- [x] T010 [US2] Write `viraui-a11y` prose block in `content/get-started/skills.mdx` (~2–3 sentences: APG/audit job + use when / not when for ordinary compose) per research §3
- [x] T011 [US2] Write `viraui-motion` prose block in `content/get-started/skills.mdx` (~2–3 sentences: motion tokens/transitions job + use when via design / not when for bootstrap or audit) per research §3
- [x] T012 [US2] Confirm block order setup → design → a11y → motion and no comparison table as primary what/when in `content/get-started/skills.mdx` (FR-003–004)

**Checkpoint**: US2 acceptance scenarios 1–3 satisfied

---

## Phase 5: User Story 3 — How + MCP (Priority: P1)

**Goal**: How-to prose links Setup for install; no command/fence; brief MCP distinction + link

**Independent Test**: Reach Setup via link; no install one-liner or prompt fence on Skills; MCP link works with Skills≠MCP clarity (SC-006 / SC-007)

### Implementation for User Story 3

- [x] T013 [US3] Write How section in `content/get-started/skills.mdx`: install via link to `/get-started/setup` only; agents load by task; humans may name a skill in a prompt (prose)—no install one-liner, no titled prompt fence (FR-005–007)
- [x] T014 [US3] Write brief MCP mention in `content/get-started/skills.mdx` distinguishing project playbooks vs network docs search, with link to `/get-started/mcp` and no connection tutorial (FR-008)
- [x] T015 [US3] Confirm inbound/outbound: Skills → Setup and Skills → MCP resolve; Setup still owns install command in `content/get-started/setup.mdx` (SC-002 / SC-006 / SC-007)

**Checkpoint**: US3 acceptance scenarios 1–4 satisfied

---

## Phase 6: User Story 4 — Brief discursive voice (Priority: P2)

**Goal**: Connected prose; ~2 minute read; no telegram/em-dash spam; no skill-file dumps

**Independent Test**: Editorial skim of `content/get-started/skills.mdx` passes SC-003–004

### Implementation for User Story 4

- [x] T016 [US4] Tone pass on lead + How + MCP in `content/get-started/skills.mdx`: discursive paragraphs; cut ultra-short consecutive fragments; reduce em dashes (FR-009)
- [x] T017 [US4] Tone/length pass on four skill blocks in `content/get-started/skills.mdx`: keep ~2–3 sentences each; strip hub routers, ref inventories, monorepo paths (FR-009–010 / SC-003)
- [x] T018 [US4] Ban pass on `content/get-started/skills.mdx`: no comparison table, install one-liner, prompt fences, prop atlas, WCAG course, motion token tables (contract MUST NOT)

**Checkpoint**: US4 acceptance scenarios 1–2 satisfied

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Full-page contract + quickstart gate

- [x] T019 Walk full MUST / MUST NOT checklist in `specs/005-skills-docs/contracts/skills-page.md` against `content/get-started/skills.mdx`
- [x] T020 [P] Confirm no prompt fences and no install one-liner remain in `content/get-started/skills.mdx`; Setup link + MCP link present (SC-005–007)
- [x] T021 Run `pnpm build` in `/Users/mattia/Workspaces/vira/viraui-ds/viraui-docs` and fix any MDX/link errors from Skills rewrite
- [x] T022 Execute validation scenarios V1–V7 in `specs/005-skills-docs/quickstart.md` (`pnpm dev` + `/get-started/skills` walk)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: Immediate
- **Foundational (Phase 2)**: After Setup — **BLOCKS** all story prose
- **US1 → US2 → US3 → US4**: Same primary file `content/get-started/skills.mdx` → prefer **sequential**
- **Polish**: After all desired stories

### User Story Dependencies

- **US1 (P1)**: After Phase 2 — MVP (lead / what framing)
- **US2 (P1)**: After US1 lead exists (skill blocks sit under orientation)
- **US3 (P1)**: After Phase 2; can follow US1 before or after US2 — prefer after US2 so How sits with finished when-guidance, or place How before blocks if outline prefers research §2 order (Lead → How → blocks → MCP). Implementers: follow research outline order Lead → How → blocks → MCP when writing final page (T013 may land before T008–T012 if rewriting whole body in one pass)
- **US4 (P2)**: After US1–US3 copy exists (tone pass on finished prose)

### Parallel Opportunities

- T003 parallel with T001/T002 (read-only)
- T020 parallel with T019 if two reviewers
- **Not parallel**: T004–T018 primarily write `skills.mdx` — one writer at a time
- T015 link check can run after T013–T014 without waiting for US4

### Parallel Example

```bash
# Setup only — safe parallel reads:
Task: "T001 Verify feature docs under specs/005-skills-docs/"
Task: "T003 Confirm Setup install ownership and MCP page exists"

# Do NOT parallelize body tasks on content/get-started/skills.mdx
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Phase 1 + 2 (frontmatter + skeleton, stub fence removed)
2. Phase 3 US1 (lead / what)
3. **STOP**: Validate US1 independent test (playbooks ≠ prop docs from lead alone)
4. Continue US2–US4 for publishable Skills page

### Incremental Delivery

1. Skeleton → US1 what
2. US2 four skill prose blocks
3. US3 how + MCP
4. US4 voice → polish + `pnpm build` + quickstart

**Preferred final page order** (research §2): Lead → How → four skill blocks → MCP. If implementing story-by-story, reorder sections once before polish so How precedes skill blocks.

### Suggested full ship

Complete Phases 1–7 (all four stories). MVP demo can stop after US1; production Skills page needs US1–US4.

### Task count

| Phase | Tasks |
| --- | --- |
| Setup | T001–T003 (3) |
| Foundational | T004–T006 (3) |
| US1 | T007 (1) |
| US2 | T008–T012 (5) |
| US3 | T013–T015 (3) |
| US4 | T016–T018 (3) |
| Polish | T019–T022 (4) |
| **Total** | **22** |

---

## Notes

- Single-file feature: avoid `[P]` on story body tasks that touch `skills.mdx`
- No automated tests unless later requested
- Copy authority: `spec.md` + `research.md` + `contracts/skills-page.md`; skill one-job cues from research §3 — do not paste skill hubs
- Setup href: `/get-started/setup`; MCP href: `/get-started/mcp`; Skills URL: `/get-started/skills`
- Next command: `/speckit-implement`
