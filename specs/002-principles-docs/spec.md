# Feature Specification: ViraUI Principles Page

**Feature Branch**: `002-principles-docs`

**Created**: 2026-09-18

**Status**: Draft

**Input**: User description: "Write English documentation for the Principles page (`content/principles.mdx`), elaborating the principles behind ViraUI: (1) static design in tools like Figma/Sketch has become double work that cannot keep pace with code and AI-centric flows; (2) the browser is the canvas—designers explore visually, developers edit as code, both on the same artifact, with code as source of truth; (3) accessibility and best practices are built in from the W3C ARIA Authoring Practices Guide and exposed to agents via skills. Supporting essay: multi-surface design systems create drift; AI multiplies that drift; one executable system in the browser is the coherent path."

## Clarifications

### Session 2026-09-18

- Q: When Principles describes “browser as canvas,” should copy treat visual-in-browser design as a capability teams use today, or as the target workflow (including Pro/Studio) without claiming a shipped canvas product? → A: Pure concept — browser can render code visually like a freeform design-tool canvas; with ViraUI, code stays at the center (no product/timeline claim).
- Q: How should Principles treat static tools like Figma or Sketch after arguing they become double work? → A: OK as disposable sketches/low-fi mockups (e.g. feed to an LLM and ask it to build with ViraUI); must not be the system of record.
- Q: When Principles says accessibility practices reach agents via skills, should the page name a specific skill or only point to skills in general? → A: Generic only — complete overview on Principles; link to `/skills` for more details (no specific skill IDs).
- Q: Which next-step destinations MUST Principles link after the three principles? → A: `/layers` + `/skills` only.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand why ViraUI rejects multi-surface design systems (Priority: P1)

A designer, engineer, or product lead opens the Principles page and can explain—in their own words—why treating a design system as a Figma library plus style guide plus separate code creates drift, and why AI does not fix that model.

**Why this priority**: This is the worldview shift the page must land; without it, later principles read as slogans.

**Independent Test**: Read the page alone (no other docs required) and correctly restate the “many truths → drift” argument and the claim that AI multiplies reconciliation work when truth is split.

**Acceptance Scenarios**:

1. **Given** a first-time visitor on Principles, **When** they read the opening argument, **Then** they see a clear statement that a design system is a shared language realized in product (tokens, foundations, components, patterns, coherence rules)—not a deck of static components on a canvas.
2. **Given** that argument, **When** they read about multi-tool workflows, **Then** the page explains that maintaining several copies (static design files, docs, code, guidelines) makes drift inevitable and that AI asked to keep those copies aligned multiplies the problem rather than solving it.
3. **Given** the critique of static tools, **When** they finish that section, **Then** they understand that treating static libraries as the system of record (mock → handoff → document → implement → hope docs match) optimizes for familiarity, not coherence—and that each extra *source-of-truth* surface is another chance to diverge.
4. **Given** a reader who still uses Figma/Sketch, **When** they look for permission to keep sketching, **Then** the page allows disposable low-fi sketches/mockups—including as prompts for an LLM to build with ViraUI—while insisting those files are not the design-system source of truth.

---

### User Story 2 - Grasp “browser as canvas, code as source of truth” (Priority: P1)

A designer and a developer each read the same page and both recognize one concept: the browser can render interface code visually—like a freeform canvas in familiar design tools—while ViraUI keeps that code at the center as the single truth. Different people may explore or edit that same artifact in different modes; neither needs a parallel canonical surface.

**Why this priority**: This is the constructive alternative to the multi-surface model and the core product thesis.

**Independent Test**: After reading, a designer and a developer can each restate “browser renders code visually ≈ canvas” and “code is center” without naming a second source of truth or a specific shipped canvas product.

**Acceptance Scenarios**:

1. **Given** the Principles page, **When** a reader reaches the browser-as-canvas principle, **Then** the page frames it as a worldview concept: the browser visually renders the same interface code, analogous to a freeform design-tool canvas—not as a claim about a named product release.
2. **Given** that principle, **When** the reader looks for “source of truth,” **Then** the page states that with ViraUI, code (the running/implemented interface) is at the center: a static design file is a proposal; the shipped interface is the product.
3. **Given** an AI-assisted workflow, **When** the reader asks why code is central for agents, **Then** the page explains that models work best inside one structured, executable system they can read and write—not across pictures, decks, and duplicate guidelines.
4. **Given** the foundation idea, **When** the reader finishes the section, **Then** they see that keeping code at the center still needs a strong substrate (distribution, versioning, tokens, toolchain coherence)—otherwise “code as source of truth” is only a slogan.

---

### User Story 3 - Trust that accessibility is built in and agent-reachable (Priority: P1)

A team evaluating ViraUI learns that accessibility semantics and interaction practices are not an afterthought: they follow established W3C ARIA Authoring Practices guidance and are made available to agents through skills so composition stays accessible by default.

**Why this priority**: Completes the three named principles; accessibility must be first-class in the narrative, not a footnote.

**Independent Test**: Reader can name the external authority (ARIA APG) and state that agents receive those practices via skills—not only humans via a checklist page.

**Acceptance Scenarios**:

1. **Given** the Principles page, **When** a reader opens the accessibility principle, **Then** the page states that accessibility and related interaction best practices are built into the system, grounded in the [W3C ARIA Authoring Practices Guide (APG)](https://www.w3.org/WAI/ARIA/apg/).
2. **Given** that principle, **When** the reader asks how agents use it, **Then** the page gives a complete overview that those practices are available to agents through skills (without naming individual skill IDs) and links to `/skills` for details.
3. **Given** a stakeholder who fears “AI will invent inaccessible UI,” **When** they finish the section, **Then** they understand ViraUI’s intent is to constrain and teach agents toward APG-aligned patterns rather than leave accessibility as optional polish.

---

### User Story 4 - Orient from Principles into the rest of the docs (Priority: P2)

After absorbing the principles, a reader knows where to go next—Layers & composition and Skills—without the Principles page becoming a full product tour.

**Why this priority**: Principles page must convert belief into action without duplicating other sections.

**Independent Test**: Page ends with clear next-step pointers; none of those destinations are required to finish understanding the three principles.

**Acceptance Scenarios**:

1. **Given** a reader who finished the three principles, **When** they look for next steps, **Then** the page links to `/layers` and `/skills` without replacing those pages’ content (no requirement to link Get started, Why, or Components from Principles).
2. **Given** the site’s LLM-first docs model, **When** the reader views Principles, **Then** an LLM prompt region remains available for asking an agent to apply or restate the principles in a project context.

---

### Edge Cases

- Reader already lives in a mature Figma-first process: page critiques using static libraries as the system of record without mocking practitioners; disposable sketching (including LLM handoff) stays allowed.
- Reader conflates “code as source of truth” with “designers must write TypeScript by hand”: page must clarify that the browser’s visual rendering of code is the canvas analogy—not that craft moves only to hand-typed source.
- Reader expects a full accessibility how-to on Principles: page states the principle and points to APG / skills / component guidance; it does not become an accessibility encyclopedia.
- Reader expects product-roadmap detail for App Studio / Pro on Principles: omit timeline/product claims for the canvas concept; Principles stay worldview, not feature catalog.
- Stub copy still present: shipping this feature means replacing the stub with full English narrative; no “coming soon” for the three core principles.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The Principles page MUST publish finished English editorial content that replaces the current stub messaging.
- **FR-002**: The page MUST elaborate three named principles covering: (a) the cost and drift of static multi-surface design-system workflows; (b) browser-as-canvas as a concept (visual render of code) with ViraUI keeping code at the center; (c) accessibility and interaction best practices built in from the W3C ARIA APG and available to agents via skills.
- **FR-003**: Principle (a) MUST argue that a design system is a shared language in product (tokens, foundations, components, patterns, coherence rules), not a static library of pictures, and that splitting that language across tools *as multiple sources of truth* turns every change into reconciliation work.
- **FR-004**: Principle (a) MUST state that asking AI to keep several *systems of record* aligned (static design libraries, docs, code, guidelines) multiplies drift rather than curing it.
- **FR-004a**: Principle (a) MUST allow static tools for disposable sketches and low-fi mockups—including handing them to an LLM to implement with ViraUI—while stating they MUST NOT be the system of record.
- **FR-005**: Principle (b) MUST present “browser as canvas” as a concept: the browser can render interface code visually in a freeform way comparable to design-tool canvases; it MUST NOT claim a specific shipped canvas product or release timeline.
- **FR-006**: Principle (b) MUST state that with ViraUI, code (running/implemented interface) is at the center as source of truth (static files are proposals; the shipped interface is the product) and that this is why AI works well: one structured, executable object.
- **FR-007**: Principle (b) MUST note that keeping code at the center still requires a strong foundation (distribution, versioning, tokens, coherent toolchain)—not merely a slogan.
- **FR-008**: Principle (c) MUST cite the W3C ARIA Authoring Practices Guide as the authority for built-in accessibility/interaction practices, MUST give a complete principles-level overview of how those practices are available to agents through skills (no individual skill IDs required on this page), and MUST link to `/skills` for further detail.
- **FR-009**: Page copy MUST stay technology-agnostic in spirit where possible for stakeholders (avoid turning Principles into an implementation tutorial), while remaining concrete about workflow outcomes.
- **FR-010**: Page MUST preserve the docs site’s LLM-first pattern: short human narrative plus an LLM prompt region for applying the principles.
- **FR-011**: Page MUST include next-step links to `/layers` and `/skills` only; it MUST NOT be required to link Get started, Why, or Components from Principles (those remain reachable via global nav).
- **FR-012**: Page metadata (title, description) MUST accurately describe Principles as the worldview/principles page, not a stub.
- **FR-013**: Tone MUST be persuasive essay quality: elaborate the user’s provided arguments; do not reduce them to unexplained bullet slogans.
- **FR-014**: Content MUST be English only for this feature.

### Key Entities

- **Principle**: A named worldview claim on the page (problem with multi-surface systems; browser/code unity; built-in accessible practices for humans and agents).
- **Source of truth**: The single artifact teams edit and ship—the implemented interface—contrasted with proposals and secondary copies.
- **Agent skill surface**: The channel through which APG-aligned practices are made available to AI agents composing interfaces.
- **Multi-surface drift**: The failure mode when the same system is maintained in several disconnected places.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A new reader can correctly summarize all three principles in under 5 minutes of reading without opening other pages.
- **SC-002**: In a spot-check with at least 5 target readers (mix of design and engineering), at least 4 of 5 correctly answer: “Where does truth live in the ViraUI model?” with “the running/implemented interface (code), not a static design file.”
- **SC-003**: In the same spot-check, at least 4 of 5 correctly answer that accessibility guidance is grounded in the W3C ARIA APG and that agents get those practices via skills (with `/skills` as the detail destination)—without needing a specific skill ID.
- **SC-004**: Stakeholders reviewing the page rate it as “replaces the stub / ready to publish” with no critical gaps on the three principles (pass/fail editorial review).
- **SC-005**: The page does not become the primary home for prop tables, full APG how-tos, or product-feature catalogs—reviewers confirm those topics are deferred or linked out.
- **SC-006**: After reading, at least 80% of reviewers say the critique of static multi-tool *systems of record* is clear and fair (not hostile), and that disposable sketching / LLM handoff remains allowed.

## Assumptions

- The Principles route already exists in the docs information architecture from the LLM-first docs site feature; this feature fills editorial content, not new IA.
- Static tools remain useful for disposable sketches/low-fi mockups and LLM implementation prompts; they are not the design-system source of truth.
- “Browser as canvas” is conceptual: visual rendering of code ≈ freeform design canvas; ViraUI centers code. No requirement to document a specific visual editor product.
- Citing the ARIA APG as the authority is sufficient at principles level; Principles gives a complete overview and defers skill inventory/details to `/skills` (no skill IDs on Principles).
- Platform/foundation substrate (tokens, distribution, versioning, coherent toolchain) is described at principle depth only; Core vs Pro packaging is out of scope for this page.
- Prompt block copy may be concise; full prompt libraries can mature later as long as a usable prompt region exists.
- Mandatory Principles next-step links are `/layers` and `/skills` only; other sections stay in global nav.
- No localization in this pass.
- Visual chrome of the docs site (layout components, cards) may be used consistently with other intro pages, but layout choices are planning/implementation details outside this specification’s success bar.
