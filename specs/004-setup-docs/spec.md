# Feature Specification: Get Started Setup Page

**Feature Branch**: `004-setup-docs`

**Created**: 2026-09-18

**Status**: Draft

**Input**: User description: "Write `content/get-started/index.mdx` (Setup page). Recap setup requirements, note that beyond the React platform the only peer dependency is Base UI (with link), and state the required toolchain. Instructions must be AI-centered with AI / Manual tabs: AI shows a copyable LLM prompt that performs full setup; Manual shows dependency and skills installation with a link to `/get-started/skills` for detail. Discursive prose (not choppy short consecutive lines); omit consumer-useless detail; do not overuse em dashes."

## Clarifications

### Session 2026-09-18

- Q: Should the Setup page live at `/get-started` (current `index.mdx`) or move to `/get-started/setup` to match the IA tree and the Skills page link? → A: Option B — rename to `setup.mdx` → `/get-started/setup`; update `meta.json`; align with IA
- Q: After Manual package and skills install, should the Manual tab stop there, or also show a short “what to wire next” handoff (theme gate, preflight, root providers) without becoming a full playbook? → A: Option C — each tab shows the full bootstrap process; steps shared by both paths are documented once outside the tabs (not duplicated inside each tab)
- Q: Should Setup include a separate copyable verify prompt (smoke-check theme, preflight, providers, sample render), or fold verification into the shared full-process steps only? → A: Option C — verify prompt inside the AI tab only; Manual uses checklist wording for the same smoke checks

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Know what Setup asks of their project (Priority: P1)

A developer or agent operator opens Setup before installing anything and can tell what the project needs: platform expectations, the Base UI peer relationship, and the toolchain required to run and install ViraUI.

**Why this priority**: Without a clear prerequisites recap, people either over-install or miss Base UI and blame ViraUI.

**Independent Test**: Read only the requirements/toolchain section (ignore install tabs) and correctly restate: React app context, Base UI as the sole non-React peer, and what toolchain is expected.

**Acceptance Scenarios**:

1. **Given** a first-time visitor on Setup, **When** they read the opening and requirements recap, **Then** they understand Setup is the bootstrap entry for integrating ViraUI into an existing React app—not a product tour and not a duplicate of Skills or MCP.
2. **Given** that recap, **When** they look for dependencies, **Then** they see that beyond React / React DOM as the app platform, the only required peer package is Base UI, with a working link to Base UI’s site.
3. **Given** the same section, **When** they look for toolchain, **Then** they see a short, consumer-useful statement of what tooling they need (package install + an agent environment for the AI path), without dumping internal monorepo versions or authoring tooling.

---

### User Story 2 - Let an agent do the full setup from a copied prompt (Priority: P1)

A reader prefers AI-led bootstrap. They open the AI path, copy the prompt(s) for the full process, paste into their LLM/agent, and complete the same end-to-end setup the Manual path covers—without the page itself inventing a second conflicting playbook.

**Why this priority**: Explicit user ask; matches the docs site’s LLM-first model and the existing stub’s “agent applies setup” intent.

**Independent Test**: Copy the AI-tab prompt material alone into an agent with project access; the agent is instructed through full consumer setup and points at official setup/skills authority rather than guessing.

**Acceptance Scenarios**:

1. **Given** Setup, **When** the reader chooses the AI path, **Then** they find copy-ready prompt material covering the full bootstrap process, not a placeholder and not an install-only stub.
2. **Given** that material, **When** they inspect it, **Then** it tells the agent to perform full ViraUI consumer setup for the current project—including installing publishable skills, installing packages and peers, respecting the theme choice gate, applying bootstrap order, and mounting root overlay providers—and to follow published setup/skills authority rather than guessing.
3. **Given** shared steps documented outside the tabs, **When** the reader uses only the AI tab plus those shared sections, **Then** they can complete bootstrap intent without opening Manual.
4. **Given** the AI tab, **When** the reader reaches verification, **Then** they find a separate copy-ready verify prompt (smoke-check theme, preflight, providers, sample render)—not only setup prompt material.

---

### User Story 3 - Install and wire manually with the same full process (Priority: P1)

A reader who prefers hands-on work opens the Manual path and follows the full bootstrap process (packages, skills, theme gate, preflight, root providers)—the same outcomes as the AI path—while shared explanations live once outside the tabs. Skills detail still links out to [Skills](/get-started/skills).

**Why this priority**: Clarified dual-path parity; Manual must remain a complete human path, not a thin install teaser.

**Independent Test**: Follow Manual plus shared outside-tab sections alone (no AI tab) and complete the same bootstrap outcomes the AI path targets.

**Acceptance Scenarios**:

1. **Given** Setup, **When** the reader chooses Manual, **Then** they see the full human process for required packages (`@viraui/react` and peers including Base UI), skills install, theme gate, theme/fonts/preflight order, and root overlay providers—stated briefly and accurately, not as an encyclopedia.
2. **Given** Manual, **When** they reach skills install, **Then** they see the publishable skills install command (or equivalent one-liner) and a link to [Skills](/get-started/skills) for what the skills cover.
3. **Given** steps common to AI and Manual, **When** those steps appear on the page, **Then** they are written once outside the tabs; each tab only carries path-specific material (prompt vs manual commands/checklist), not a duplicated copy of the shared narrative.
4. **Given** Manual verification, **When** the reader finishes wiring, **Then** they see checklist-style “done when” smoke checks (same outcomes as the AI verify prompt) without a second copyable verify prompt fence.

---

### User Story 4 - Read prose that guides without feeling like a telegram (Priority: P2)

A reader experiences Setup as connected paragraphs and clear sections—discursive enough to feel human, short enough to stay scannable—without choppy one-line stacks, em-dash spam, or trivia that does not help them ship.

**Why this priority**: Explicit voice/quality ask; poor voice undermines trust even when facts are right.

**Independent Test**: Spot-check that requirements and tab intros use flowing sentences; no dense “fact. fact. fact.” telegram style; no unnecessary em dashes; no internal DS authoring noise.

**Acceptance Scenarios**:

1. **Given** the finished page, **When** a reviewer reads it aloud, **Then** transitions between ideas feel continuous rather than a list of disconnected fragments.
2. **Given** consumer focus, **When** content is audited, **Then** it omits monorepo-only, Storybook-kitchen, and unpublished-path details that do not help an app team bootstrap.

---

### Edge Cases

- Reader confuses Setup with Skills: Setup = get ViraUI running (deps, skills install entry, bootstrap intent); Skills = what agents use those skills for. Cross-link; do not merge pages.
- Reader confuses peer Base UI with “ViraUI has many dependencies”: page states Base UI as the only required peer beyond React / React DOM; optional packages (foundation presets, icons) stay clearly optional and only appear if needed for honesty—not as a second dependency laundry list.
- Project already has Tailwind/Bootstrap or another CSS reset: page may briefly note coexistence is handled during bootstrap (agent/skill territory) without turning Setup into a CSS-framework essay.
- Theme not chosen yet: AI prompt and any Manual next-step language must not assume foundation/fonts are installed by default; theme choice remains a gate.
- Broken or outdated skills link: Manual MUST link `/get-started/skills`; Setup’s canonical URL is `/get-started/setup`.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Setup MUST ship as `content/get-started/setup.mdx` at public URL `/get-started/setup` (rename from the current `index.mdx` stub), with finished consumer-facing content and frontmatter title/description updated to match; `meta.json` MUST list `setup` (not `index` as the Setup page).
- **FR-002**: Setup MUST open with a short discursive framing: what you are setting up and why bootstrap stays thin (agent + skills do the heavy lifting).
- **FR-003**: Setup MUST include a requirements recap covering (a) React app platform expectations, (b) Base UI as the only required peer beyond React / React DOM, with an external link to Base UI, and (c) the toolchain needed to install packages and, for the AI path, run an agent against the project.
- **FR-004**: Setup MUST present instructions in two alternative paths labeled AI and Manual (tabbed or equivalent mutually exclusive UI), with AI as the primary/default emphasis. Each path MUST cover the full bootstrap process (same outcomes).
- **FR-005**: The AI path MUST contain copy-ready prompt material that asks an LLM/agent to perform full ViraUI consumer setup for the current project—including skills install, package/peer install, theme-choice gate, theme/fonts/preflight order, and root overlay providers—and to follow published setup/skills guidance. The AI path MUST also include a separate copy-ready verify prompt for smoke-checking theme, preflight, providers, and a sample render.
- **FR-006**: The Manual path MUST show the full human bootstrap process for the same outcomes as FR-005 (required packages including Base UI, publishable skills install, theme gate, theme/fonts/preflight order, root overlay providers), and MUST link to Skills (`/get-started/skills`) where skills purpose needs more detail. Manual verification MUST use checklist wording for the same smoke-check outcomes as the AI verify prompt—not a second copyable verify prompt.
- **FR-006a**: Steps shared by AI and Manual MUST be documented once outside the tabs (requirements recap, shared process explanations). Tabs MUST NOT paste duplicate copies of that shared narrative; each tab only adds path-specific material (prompts vs manual commands/checklists). Path-specific verify (AI prompt vs Manual checklist) stays inside each tab.
- **FR-007**: Setup MUST NOT become an exhaustive prop table, framework-by-framework import atlas, or full skills catalog; deeper skill purpose stays on Skills; MCP, Foundation, and Components pages stay separate. Full bootstrap process on Setup is in scope when kept consumer-brief.
- **FR-008**: Prose MUST be discursive and continuous (avoid stacks of ultra-short consecutive sentences); MUST avoid overusing em dashes; MUST omit details that do not help a consumer complete setup.
- **FR-009**: Setup MUST keep titled copyable prompt region(s) on the AI path consistent with instructional Get started page-shell expectations (setup prompt plus verify prompt).
- **FR-010**: Canonical Setup URL is `/get-started/setup`. Related Get started pages (e.g. Skills) that already point there MUST keep working; any leftover `/get-started` Setup assumptions MUST be removed. A separate Get started overview at `/get-started` is out of scope for this feature unless added later.

### Key Entities

- **Setup page**: Get started entry that orients prerequisites and offers AI vs Manual full-process bootstrap paths with shared steps outside tabs.
- **AI setup path**: Copy-ready setup prompt plus a separate copy-ready verify prompt.
- **Manual setup path**: Human-readable full bootstrap process with checklist-style verify (same smoke outcomes as AI verify); link to Skills for skill purpose.
- **Shared process section**: Explanations common to both paths, documented once outside the tabs.
- **Base UI peer**: Sole required peer package beyond React / React DOM; linked externally for authority.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A new reader can state, after one pass of the requirements section, that Base UI is the only required peer beyond React / React DOM, and can open the Base UI link successfully.
- **SC-002**: At least 90% of reviewers in a quick content check correctly identify AI as the recommended path and can copy a non-placeholder setup prompt in under 30 seconds.
- **SC-003**: A reader using only Manual plus shared outside-tab sections can complete the same bootstrap outcomes as the AI path (packages, skills, theme gate, preflight, providers) and can reach Skills via an in-page link.
- **SC-004**: In editorial review, zero critical “telegram prose” or em-dash-abuse notes remain, and no monorepo-only trivia blocks consumer understanding.
- **SC-005**: Setup no longer contains stub/placeholder copy for AI setup/verify prompts, Manual full-process steps, or the requirements recap.
- **SC-006**: Shared process content appears once outside the tabs; AI and Manual tabs do not duplicate that shared narrative.
- **SC-007**: AI tab includes a non-placeholder verify prompt; Manual tab verifies with checklist wording for the same smoke-check outcomes.

## Assumptions

- Target readers are app teams adding ViraUI to a React project (or an agent acting for them), not DS maintainers.
- “No dependencies besides Base UI” means: beyond React / React DOM as the platform peers, `@base-ui/react` is the only required peer; `@viraui/foundation` and `@viraui/icons` remain optional / theme-gated and are not sold as mandatory deps on this page.
- Base UI external link defaults to the official Base UI site (`https://base-ui.com`).
- Publishable skills install remains the skills.sh pack command already documented in consumer setup guidance; Manual shows it in the full process; AI prompt embeds the same expectation.
- Both AI and Manual tabs cover the full bootstrap process (same outcomes). Shared steps/explanations live once outside the tabs; tabs only add path-specific material. Verification: AI tab has a dedicated verify prompt; Manual uses checklist wording for the same checks.
- Toolchain statement stays high level (Node-capable package manager + agent host for AI path); exact Node/pnpm pins belong to release notes or package engines, not this page.
- Page file is `content/get-started/setup.mdx` at `/get-started/setup` (rename from current `index.mdx` stub; update `meta.json`). No separate Get started overview in this feature.
- Fumadocs/Fumapress `Tabs` / `Tab` (already registered in the docs app) is an acceptable presentation for AI vs Manual; the requirement is the dual path UX, not a specific component brand in stakeholder language.
- Voice matches sibling overview pages (Principles, Layers): English, calm, consumer-facing; Italian in the request was process language only.

## Out of Scope

- Full Skills encyclopedia, MCP connection tutorial, per-framework entry-file matrices, App Studio deep-dive, CSS-framework coexistence essay, component usage tutorials. (Full consumer bootstrap process on Setup is in scope; encyclopedic skill/API dumps are not.)
- Changing publishable skill pack contents or `@viraui/react` peer ranges (docs reflect current consumer truth; package changes are separate).
