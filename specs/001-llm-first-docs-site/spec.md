# Feature Specification: LLM-First Human Docs Site

**Feature Branch**: `001-llm-first-docs-site`

**Created**: 2026-09-17

**Status**: Draft

**Input**: User description: "Create English human documentation for the ViraUI design system in viraui-docs, powered by Fumapress, published at docs.viraui.dev (Namecheap DNS + Vercel). Docs emphasize LLM-first usage with humans for advanced intervention. Structure only (no full content yet): intro, get started with setup prompts, foundation, components by Storybook categories with narrative + prompt placeholders + interactive previews (not 1:1 prop tables). Private GitHub repo vira-soft/viraui-docs; prefer Vercel project not linked to GitHub."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Reach public docs on the branded host (Priority: P1)

A designer or engineer opens `https://docs.viraui.dev` and lands on an English documentation site that clearly presents ViraUI as an LLM-first design system, with a navigable skeleton matching the agreed information architecture (intro, get started, foundation, components).

**Why this priority**: Without a reachable public site and IA shell, later content and prompts have nowhere to live.

**Independent Test**: Visit the production host; confirm SSL, home/intro entry, and top-level nav sections exist with stub pages.

**Acceptance Scenarios**:

1. **Given** DNS and hosting are configured, **When** a visitor opens `docs.viraui.dev`, **Then** the site loads over HTTPS without certificate or DNS errors.
2. **Given** the site is live, **When** a visitor views the landing/intro area, **Then** messaging states that ViraUI is meant to be used first with LLMs and second by humans for advanced work.
3. **Given** the site is live, **When** a visitor expands the main navigation, **Then** they see Intro, Get started, Foundation, and Components as top-level areas.

---

### User Story 2 - Browse structure without finished editorial content (Priority: P1)

A human contributor or stakeholder walks the docs tree and finds every planned section and component category represented as placeholder pages, so content can be written later without reshaping navigation.

**Why this priority**: User asked for structure-first setup; empty shells must still be complete and discoverable.

**Independent Test**: Traverse nav and confirm each planned leaf exists (even if marked “coming soon” / stub).

**Acceptance Scenarios**:

1. **Given** the docs site is running, **When** a visitor opens Get started, **Then** they see a page reserved for setup prompts and short explanations (stub copy allowed).
2. **Given** Foundation is open, **When** a visitor lists its children, **Then** they see at least themes & brand, colors, motion, elevation, typography, and stubs for remaining foundation topics.
3. **Given** Components overview is open, **When** a visitor views categories, **Then** categories match the Storybook groupings used by ViraUI (Actions, Dialogs, Effects, Inputs, Layout, Loading, Navigation, Overlays, Typography, Widgets).
4. **Given** a category section, **When** a visitor opens it, **Then** each public component in that category has its own page stub.

---

### User Story 3 - Use component pages the LLM-first way (Priority: P2)

An advanced human opens a component page and finds a short narrative about the component, slots for common usage examples with interactive previews, and a prompt placeholder to Ask your agent for descriptive prop/usage guidance—not a mirrored API prop table.

**Why this priority**: Defines the component-doc product model; full prompts/examples come in a later content pass, but page shape must be fixed now.

**Independent Test**: Open any component stub; confirm narrative zone, example/preview zone, and LLM-prompt zone exist; confirm absence of exhaustive prop-table-as-source-of-truth.

**Acceptance Scenarios**:

1. **Given** a component page stub, **When** a reader scrolls the page, **Then** they see distinct regions for story/narrative, common examples (with interactive preview capability), and an LLM prompt block.
2. **Given** a component page stub, **When** a reader looks for complete prop-by-prop API documentation as the primary content, **Then** that pattern is not present; guidance instead points toward LLM-assisted discovery.
3. **Given** interactive preview support is enabled for examples, **When** a reader interacts with a demo on a page that includes one, **Then** the preview responds in-page without leaving the docs site.

---

### User Story 4 - Maintain private source, deploy without GitHub↔Vercel coupling (Priority: P2)

A maintainer keeps the docs source in the private `vira-soft/viraui-docs` GitHub repository and publishes updates to Vercel without requiring a Vercel GitHub integration on that project.

**Why this priority**: Matches org preference (private repo + Vercel project not linked to GitHub) while still shipping `docs.viraui.dev`.

**Independent Test**: Confirm remote exists and is private; confirm Vercel project deploys via non-Git-linked path (e.g. CLI/CI token deploy); confirm custom domain attached.

**Acceptance Scenarios**:

1. **Given** the local docs project, **When** a maintainer checks the GitHub remote, **Then** it points at private `vira-soft/viraui-docs`.
2. **Given** a release-ready build, **When** a maintainer publishes, **Then** production on Vercel updates without the Vercel project being linked to the GitHub repository.
3. **Given** Namecheap DNS for the parent domain, **When** `docs.viraui.dev` is configured, **Then** it resolves to the Vercel deployment serving this docs site.

---

### Edge Cases

- Visitor hits an unfinished stub page: page still loads with clear “structure ready / content later” messaging; no broken nav links.
- Component added later in the design system: IA must allow adding a new leaf under the correct category without renaming top-level sections.
- DNS not yet propagated: maintainers can still validate via Vercel preview/default host before cutting over the custom domain.
- Search or LLM prompt blocks empty during structure phase: placeholders remain visible and labeled so content authors know where to fill.
- Interactive preview unavailable on a given stub: page still shows narrative + prompt regions; preview marked as pending rather than broken.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The project MUST publish an English-language human documentation site for the ViraUI design system at `docs.viraui.dev`.
- **FR-002**: Site messaging and information architecture MUST center LLM-first usage (agents/skills first; humans for advanced intervention).
- **FR-003**: Setup scope MUST deliver navigable structure and page shells only; full editorial content and final prompt copy are out of scope for this feature (later content pass).
- **FR-004**: Top-level nav MUST include: Introduction (home), why/how, principles, layers & composition, Get started (setup, skills, MCP), Foundation, and Components.
- **FR-005**: Foundation MUST expose child pages for themes & brand, colors, motion, elevation, typography, plus stubs for other foundation topics already treated as first-class in the design system (e.g. space, radius, icons) so the tree is complete.
- **FR-006**: Components MUST start with an overview listing the same category set as Storybook: Actions, Dialogs, Effects, Inputs, Layout, Loading, Navigation, Overlays, Typography, Widgets.
- **FR-007**: Each category MUST be a navigable, expandable group containing one page per public component in that category.
- **FR-008**: Component pages MUST prioritize narrative, common-example interactive previews, and an LLM prompt region for descriptive props/usage guidance; they MUST NOT treat a 1:1 code prop table as the primary documentation surface.
- **FR-009**: Where instructions appear (including Get started), page templates MUST reserve space for an accompanying LLM prompt block even when prompt text is still placeholder.
- **FR-010**: Source MUST live in a private GitHub repository `vira-soft/viraui-docs`, linked from the local project as the canonical remote.
- **FR-011**: Production hosting MUST use a Vercel project that is not linked to the GitHub repository; deploys MUST be possible via CLI or equivalent non-Git-integration path.
- **FR-012**: DNS for `docs.viraui.dev` MUST be configurable via the Namecheap account that controls `viraui.dev`, pointing at the Vercel project.
- **FR-013**: Local Spec Kit init already present in the repo MUST remain the governance home for this docs product; this feature’s artifacts live under `specs/001-llm-first-docs-site/`.
- **FR-014**: Site generator choice is Fumapress (Fumadocs-based), as selected by stakeholders for this product; structure and deploy must be compatible with that choice.

### Key Entities

- **Docs Site**: Public English documentation product for humans, complementary to agent-oriented package knowledge; primary URL `docs.viraui.dev`.
- **Section**: Top-level IA node (Intro, Get started, Foundation, Components).
- **Foundation Topic Page**: Leaf explaining a foundation concern (theme/brand, color, motion, elevation, typography, …).
- **Component Category**: Grouping aligned with Storybook titles (Actions, Dialogs, Effects, Inputs, Layout, Loading, Navigation, Overlays, Typography, Widgets).
- **Component Page**: Narrative + example/preview + LLM prompt shell for one public component.
- **Prompt Placeholder**: Reserved block on instructional and component pages for later LLM prompt copy.
- **Deployment Target**: Vercel project + Namecheap DNS record for the docs subdomain; GitHub private repo as source of truth without Vercel Git link.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Within one business day of DNS cutover, `https://docs.viraui.dev` resolves and serves the docs home with valid HTTPS for 100% of smoke checks from two networks.
- **SC-002**: 100% of planned top-level sections and Foundation child stubs are reachable from navigation with zero dead primary-nav links.
- **SC-003**: 100% of design-system Storybook component categories appear on the Components overview, and each listed public component has a dedicated page stub.
- **SC-004**: On a sample of at least 5 component stubs, reviewers confirm presence of narrative, example/preview, and LLM-prompt regions, and absence of exhaustive prop-table-as-primary-docs.
- **SC-005**: A new reader can state, after viewing only the intro stubs, that ViraUI is LLM-first (spot-check: ≥4 of 5 reviewers agree).
- **SC-006**: Maintainers can publish a production update through a documented path that does not require linking the hosting project to the Git hosting integration (one successful dry-run counted as pass).
- **SC-007**: The private org repository named for this docs product exists and is the sole configured remote for the local docs working tree.

## Assumptions

- Domain `viraui.dev` is (or will be) under the org’s Namecheap account; this feature covers `docs` subdomain configuration, not purchasing a new apex domain.
- Public component inventory and category names follow current ViraUI Storybook groupings; stubs track today’s public surface and can grow later.
- Full prose, final prompts, and polished interactive demos are a follow-on content feature; this feature only requires shells and deploy plumbing.
- Agent-facing package specs/skills remain the deep API authority; human docs deliberately stay narrative + prompt-oriented.
- Vercel CLI (or CI using a Vercel token) satisfies “project not linked to GitHub.”
- Docs language for v1 is English only.
- Local repo path `/Users/mattia/Workspaces/vira/viraui-ds/viraui-docs` is the working tree that will be pushed to `vira-soft/viraui-docs`.
- Fumapress remains the chosen site generator (stakeholder decision after reviewing https://press.fumadocs.dev/docs).

## Out of Scope

- Writing final documentation copy and production prompt text.
- Replacing Storybook or agent package specs as systems of record.
- Public open-sourcing of the docs repository.
- Automatic Vercel deploys from GitHub App/integration.
- Multi-language localization.
- Documenting every prop 1:1 with source code.
