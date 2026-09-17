# Feature Specification: Get Started Skills Page

**Feature Branch**: `005-skills-docs`

**Created**: 2026-09-18

**Status**: Draft

**Input**: User description: "Create the docs page `content/get-started/skills.mdx`. Explain what the skills do (without being verbose or too detailed), how to use them, and when to use them."

## Clarifications

### Session 2026-09-18

- Q: Must the Skills page include a short copyable “ask your agent” prompt, or keep how-to prose only with no prompt fence? → A: Option B — omit titled How-section ask-agent fence; how-to = prose + Setup link only
- Q: May each skill block show short example usage prompts? → A: Yes — about two short copyable example prompts per skill; still no Setup-style titled Ask-your-agent / bootstrap-verify fence on How
- Q: How should the page present the four skills’ what/when guidance? → A: Option B — short prose block per skill (heading + 2–3 sentences each); no comparison table
- Q: Should Skills show the publishable skills install one-liner on the page, or only link to Setup for install? → A: Option B — Setup link only; no install command on Skills
- Q: Must Skills briefly mention and link the docs MCP, or leave MCP out of this page entirely? → A: Option A — required brief mention + link to `/get-started/mcp` (no connection tutorial)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand what consumer skills are for (Priority: P1)

A developer or agent operator opens Skills after Setup (or from a Principles/Layers handoff) and quickly grasps that publishable ViraUI skills teach agents how to bootstrap and compose real ViraUI—without reading an encyclopedia or confusing skills with human API docs or the docs MCP.

**Why this priority**: Without a clear “what,” readers skip install or misuse skills as prop tables.

**Independent Test**: Read only the opening + “what” framing (ignore install/when tables) and correctly restate: skills = agent playbooks for consumer ViraUI work; deep API stays in package specs; this page is orientation, not the skill bodies themselves.

**Acceptance Scenarios**:

1. **Given** a first-time visitor on Skills, **When** they read the opening, **Then** they understand Skills orients agents and humans to the consumer skill pack—not Setup wiring steps, not MCP connection, not per-component prop dumps.
2. **Given** that framing, **When** they look for purpose, **Then** they see a short explanation that skills guide agents to follow ViraUI patterns (setup, compose, a11y audit, motion) instead of inventing markup or guessing APIs.
3. **Given** consumer focus, **When** content is audited, **Then** it does not paste skill-hub routers, eval notes, or monorepo authoring rules.

---

### User Story 2 - Know when to use each skill (Priority: P1)

A reader (or someone writing a prompt for an agent) can match a common intent to the right skill—setup vs design vs a11y vs motion—without opening every skill file.

**Why this priority**: Explicit user ask (“quando usarle”); wrong skill load is the main failure mode after install.

**Independent Test**: Given four short intent prompts (bootstrap broken styles; build a form; APG audit; add transitions), map each to the correct skill name from the per-skill prose blocks alone (no comparison table required).

**Acceptance Scenarios**:

1. **Given** Skills, **When** the reader scans the when-to-use guidance, **Then** they see all four published consumer skills named: `viraui-setup`, `viraui-design`, `viraui-a11y`, `viraui-motion`, each under its own short heading/block.
2. **Given** those four, **When** they compare intents, **Then** each block gives a brief one-job statement plus clear “use when / not when” cues in 2–3 sentences (e.g. setup for bootstrap/theme/preflight; design for routine UI compose; a11y for explicit audits; motion when composing and motion applies—usually via design)—not a comparison table.
3. **Given** overlap risk, **When** they read the guidance, **Then** they understand design is the default for building UI; setup only when bootstrap is missing or broken; a11y is audit-not-compose; motion is not a substitute for design.

---

### User Story 3 - Know how to use skills in a project (Priority: P1)

A reader learns the practical how: install the pack once (canonical command lives on Setup; Skills links there), then let the agent load the matching skill for the task—described in prose, with short example prompts under each skill—without this page becoming a second Setup playbook.

**Why this priority**: Explicit user ask (“come usarle”); install already lives on Setup and must not fork.

**Independent Test**: Follow Skills alone for “how”; reach Setup for the install command; leave with a clear prose pattern plus per-skill example prompts—and confirm How has no Setup-style titled Ask-your-agent / bootstrap-verify fence.

**Acceptance Scenarios**:

1. **Given** Skills, **When** the reader looks for install, **Then** they are directed to [Setup](/get-started/setup) for the publishable pack install (and any bootstrap wiring)—Skills shows no install command/one-liner of its own.
2. **Given** skills already installed (or after Setup), **When** they look for usage, **Then** they see that agents discover/load skills by task description; humans can name a skill in a prompt when they want a specific path.
3. **Given** each skill block, **When** they look for examples, **Then** they find about two short copyable usage prompts that name that skill; How still has no titled Ask-your-agent / bootstrap-verify fence; Setup keeps bootstrap/verify prompts and the install command.
4. **Given** network docs for agents, **When** the reader finishes orientation, **Then** they see a brief distinction that skills are project playbooks while the docs MCP searches/fetches human docs over the network, with a working link to [MCP](/get-started/mcp)—and no MCP connection tutorial on Skills.

---

### User Story 4 - Stay brief and scannable (Priority: P2)

A reader finishes Skills in one short pass: connected prose, scannable when/how sections, no telegram stacks, no em-dash spam, no trivia that does not help them choose or invoke a skill.

**Why this priority**: Explicit “senza essere prolissi o troppo dettagliate”; voice must match sibling Get started / overview pages.

**Independent Test**: Spot-check that the page stays orientation-length; no per-skill reference dumps; no internal DS authoring noise; prose reads continuous.

**Acceptance Scenarios**:

1. **Given** the finished page, **When** a reviewer times a first read of the core what/when/how sections, **Then** a typical reader can finish orientation in under about two minutes without hunting missing intent.
2. **Given** editorial review, **When** verbosity is checked, **Then** there are no pasted skill-file contents, no full action-router tables from hubs, and no monorepo-only paths.

---

### Edge Cases

- Reader confuses Skills with Setup: Setup = install packages + skills pack + bootstrap; Skills = what those skills are for and when to load them. Cross-link; do not merge.
- Reader confuses Skills with MCP: MCP = search/fetch human docs over the network; Skills = agent playbooks installed in the project. Brief pointer only.
- Reader wants prop/API encyclopedia: page states deep API authority stays in package agent specs / skill destinations—not on this page.
- Skill pack gains/renames skills later: page MUST list the current published four; future skills need a follow-up docs change (out of scope to invent placeholders).
- Agent already has skills: “how” still explains when to load which skill; install link remains for first-time / refresh.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Skills MUST ship as `content/get-started/skills.mdx` at public URL `/get-started/skills`, replacing the stub with finished consumer-facing content; frontmatter title/description MUST match the finished page intent; nav already lists `skills` under Get started.
- **FR-002**: Skills MUST open with a short discursive framing of what consumer skills are: agent-oriented playbooks that keep ViraUI work on-pattern, paired with package specs as API authority—not human prop tables and not Setup itself.
- **FR-003**: Skills MUST briefly explain what each of the four published skills does—`viraui-setup`, `viraui-design`, `viraui-a11y`, `viraui-motion`—in plain language (one clear job each), without embedding hub routers or reference-file inventories.
- **FR-004**: Skills MUST present what/when as a short prose block per skill (heading + about 2–3 sentences covering job and use/not-when cues). MUST NOT use a comparison table as the primary what/when presentation. Reader must still map common intents to the right skill without opening skill bodies.
- **FR-005**: Skills MUST explain how to use skills in practice in prose: install via Setup (link only—no install command on Skills); then rely on agent discovery and/or naming the skill in a prompt for the matching task.
- **FR-006**: Skills MUST link to Setup (`/get-started/setup`) for install/bootstrap detail and MUST NOT show the publishable pack install one-liner, duplicate Setup’s full AI/Manual bootstrap process, package peer lists, or theme-gate playbook.
- **FR-007**: How-to MUST stay prose plus Setup/MCP links—no titled Ask-your-agent / bootstrap-verify fence on How. Each of the four skill blocks MUST include about two short copyable example usage prompts that name that skill. Bootstrap/verify prompts remain on Setup only.
- **FR-008**: Skills MUST briefly mention the docs MCP and link to `/get-started/mcp`, clarifying skills (project playbooks) vs MCP (search/fetch human docs)—without a connection tutorial.
- **FR-009**: Prose MUST stay concise and discursive (avoid telegram stacks and em-dash spam); MUST omit monorepo authoring, eval harness, and unpublished skill details that do not help a consumer choose or invoke skills.
- **FR-010**: Skills MUST NOT become an exhaustive skill-file mirror, per-component API atlas, accessibility WCAG course, or motion token encyclopedia.

### Key Entities

- **Skills page**: Get started orientation for the publishable consumer skill pack—what, when, how—at `/get-started/skills`.
- **Consumer skill**: Named agent playbook (`viraui-setup`, `viraui-design`, `viraui-a11y`, `viraui-motion`) installed via the published pack.
- **Setup handoff**: Canonical install + bootstrap page; Skills links there for commands and wiring.
- **Skill prose block**: Per-skill heading plus short paragraph(s) for job + when/not-when; not a comparison table.
- **How-to prose**: Install and usage guidance in connected sentences; no Setup-style titled Ask-your-agent fence on How.
- **Example prompt**: Short copyable usage prompt under a skill block (~two per skill); names the skill; not a Setup bootstrap/verify playbook.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: After one pass of the what/when sections, at least 90% of reviewers in a quick content check correctly map bootstrap, compose, a11y audit, and motion intents to the four skill names.
- **SC-002**: A new reader can state, after one pass, that skills are agent playbooks (not prop docs) and that install lives on Setup—and can open the Setup link successfully.
- **SC-003**: A typical reader can finish the core what/when/how orientation in under about two minutes without needing skill-repo files.
- **SC-004**: Editorial review finds zero critical verbosity notes (no pasted hub routers / reference dumps) and no telegram/em-dash-abuse that blocks scanning.
- **SC-005**: Skills no longer contains stub-only placeholder copy; what, when, and how are all present and non-empty; the stub ask-agent prompt fence is gone.
- **SC-006**: Skills does not restate Setup’s full bootstrap AI/Manual process and does not show the install one-liner; install detail is reached via in-page link to Setup only.
- **SC-007**: A reader can open the in-page MCP link and state that Skills ≠ MCP (playbooks vs network docs search) after reading the brief mention.

## Assumptions

- Target readers are app teams (and agents acting for them) consuming ViraUI—not skill authors or DS maintainers.
- The published consumer pack currently contains exactly four skills: `viraui-setup`, `viraui-design`, `viraui-a11y`, `viraui-motion`; page content reflects that set.
- Install command and bootstrap wiring remain owned by Setup; Skills only orients and links—no install one-liner on Skills.
- Default usage model: agents load skills from task descriptions after pack install; naming a skill in a prompt is optional guidance described in prose, not a copyable fence on Skills.
- Stub copyable “Ask your agent” block on Skills is removed when the page is finished.
- Voice matches sibling overview/Get started pages: English, calm, consumer-facing; Italian in the request was process language only. What/when = short prose per skill, not a comparison table.
- Existing stub icon (`OrbitSparkle`) and Get started nav entry stay unless a separate IA change says otherwise.
- Deep API and playbook detail remain in package specs and installed skill files; this page stays orientation-only.
- Skills includes a required brief MCP mention + link; MCP connection steps stay on the MCP page.

## Out of Scope

- Changing skill pack contents, skill hub text, evals, or skills.sh packaging.
- Duplicating Setup bootstrap (AI/Manual tabs, peers, theme gate, providers).
- MCP connection tutorial; Foundation/Components tutorials; WCAG/APG course content; motion token tables.
- Per-framework agent path encyclopedias or monorepo-only (`.cursor/skills`) maintenance skills.
- A separate Get started overview page.
