# Feature Specification: ViraUI Layers Page

**Feature Branch**: `003-layers-docs`

**Created**: 2026-09-18

**Status**: Draft

**Input**: User description: "Write documentation for `content/layers.mdx`: strong foundation, UI components, motion guidelines, AI-native by design. Expand and refine the definitions from https://viraui.dev. Include a copyable prompt at the bottom for asking an AI to explain what ViraUI is, its principles, and its layers."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - See how ViraUI is composed as stacked layers (Priority: P1)

A designer, engineer, or product lead opens Layers and can explain—in their own words—that ViraUI is not a bag of unrelated parts but four working layers that compose into one coherent system: foundation, UI components, motion guidelines, and AI-native consumption.

**Why this priority**: This page’s job is orientation. Without a clear composition story, later docs feel disconnected.

**Independent Test**: Read Layers alone and correctly name the four layers in order, plus restate that they work together (change foundation → brand shifts; components stay; motion stays consistent; agents learn the same system).

**Acceptance Scenarios**:

1. **Given** a first-time visitor on Layers, **When** they read the opening, **Then** they see Layers framed as how ViraUI’s working pieces stack into one system—not a marketing feature list and not a substitute for Principles.
2. **Given** that framing, **When** they scan the page, **Then** they encounter exactly four Core layers in a stable order: AI-native by design → Strong foundation → UI components → Motion guidelines.
3. **Given** the four layers, **When** they finish the page, **Then** they understand composition (each layer builds on the ones below) rather than four unrelated product bullets.

---

### User Story 2 - Understand each Core layer beyond marketing slogans (Priority: P1)

A reader who saw the short blurbs on [viraui.dev](https://viraui.dev) wants deeper, clearer definitions of what each layer is for, what it includes conceptually, and what problem it solves—without turning Layers into an implementation tutorial.

**Why this priority**: User asked to expand and define better than the site copy; shallow slogans fail the page’s purpose.

**Independent Test**: For each of the four layers, a reader can state purpose + what changes when that layer is strong vs missing, without needing code samples.

**Acceptance Scenarios**:

1. **Given** Strong foundation, **When** the reader finishes that section, **Then** they understand ViraUI starts from design tokens / brandable foundations (color, type, space, elevation, motion primitives, themes) so teams shape brand without rewriting the system—same components, different brands; tokens do the work.
2. **Given** UI components, **When** the reader finishes that section, **Then** they understand ViraUI ships production UI building blocks (accessible patterns, documented props, modern styling) that implement the foundation—not one-off markup reinvented per screen.
3. **Given** Motion guidelines, **When** the reader finishes that section, **Then** they understand shared motion language (duration, easing, reduced-motion, functional-first motion) so interfaces feel consistent without inventing animation per screen; evocative motion only when it earns it.
4. **Given** AI-native by design, **When** the reader finishes that section, **Then** they understand skills, guides, and consumption metadata teach agents to ship real ViraUI—not generic HTML dressed as components—and that the system is spec-driven for humans and models.
5. **Given** marketing site wording, **When** content is compared to Layers, **Then** Layers expands and clarifies those ideas rather than pasting the homepage bullets unchanged.

---

### User Story 3 - Copy a prompt that teaches ViraUI overview (Priority: P1)

A reader (or teammate spinning up an agent) wants a ready-to-paste prompt that asks an AI to explain what ViraUI is, its principles, and its layers—so onboarding does not start from a blank chat.

**Why this priority**: Explicit user ask; matches the docs site’s LLM-first pattern already stubbed on the page.

**Independent Test**: Copy the prompt alone into an LLM chat; with access to docs/context, the agent can produce a coherent overview covering identity, principles, and the four layers.

**Acceptance Scenarios**:

1. **Given** the Layers page, **When** the reader reaches the end, **Then** they find a copy-ready LLM prompt region (same pattern as other overview docs), not a placeholder.
2. **Given** that prompt, **When** they inspect its text, **Then** it instructs the AI to explain (a) what ViraUI is, (b) the principles behind it, and (c) the working layers—and to stay accurate to ViraUI docs rather than invent a generic design-system pitch.
3. **Given** a reader who has not yet opened Principles, **When** they use the prompt, **Then** the prompt still asks for principles-level explanation (and may point the agent to Principles/Layers), without requiring the Layers page itself to restate the full Principles essay.

---

### User Story 4 - Know where to go next without duplicating other sections (Priority: P2)

After understanding composition, a reader knows which deeper docs to open (foundation, components, motion, skills/principles) without Layers becoming those pages.

**Why this priority**: Orientation must convert into navigation; over-copy creates drift with sibling stubs/pages.

**Independent Test**: Next-step links exist; none of those destinations are required to finish understanding the four-layer model.

**Acceptance Scenarios**:

1. **Given** a reader who finished the four layers, **When** they look for next steps, **Then** the page links into relevant destinations such as Principles, Foundation, Components, Motion (foundation), and Skills—without replacing those pages’ content.
2. **Given** Principles already links to Layers, **When** Layers is written, **Then** it complements Principles (composition/how-built) rather than repeating the worldview essay.

---

### Edge Cases

- Reader confuses Layers with Principles: page states Layers = composition of working pieces; Principles = why the system exists that way; cross-link, do not merge essays.
- Reader expects Pro (Studio / prompt directory) detail on Layers: Core four layers are in scope; Pro offerings may be named briefly as optional acceleration outside Core, without roadmap/timeline claims.
- Reader expects token pipelines, package names, or install commands: keep conceptual; point to Get started / Foundation / Components for how-to.
- Reader expects a full motion or a11y cookbook: define the layer’s job; deep guidance stays on Motion / Skills / component docs.
- Stub copy still present: shipping this feature means replacing the stub and placeholder prompt with finished English content.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The Layers page (`content/layers.mdx`) MUST publish finished English editorial content that replaces the current stub messaging.
- **FR-002**: The page MUST define four Core layers, in this order and with these identities: (1) AI-native by design, (2) Strong foundation, (3) UI components, (4) Motion guidelines.
- **FR-003**: Opening copy MUST state that these layers compose into one coherent system (foundation under components; motion as shared behavior language; AI-native surface teaching the same system to agents).
- **FR-004**: Strong foundation MUST expand the [viraui.dev](https://viraui.dev) idea that ViraUI starts from design tokens / brandable foundations compiled from source so brand can change without rewriting the system—same components, different brands.
- **FR-005**: UI components MUST expand the site idea of free, production-ready interface components with strong documentation and modern patterns—framed for stakeholders as the executable UI layer on top of foundation (avoid turning the page into a stack tutorial).
- **FR-006**: Motion guidelines MUST expand the site idea of shared motion language (duration, easing, reduced-motion) so motion stays consistent; functional first, evocative when it earns it.
- **FR-007**: AI-native by design MUST expand the site idea that skills, guides, and consumption metadata teach agents to ship real ViraUI (spec-driven for humans and models)—not generic markup.
- **FR-008**: Each layer section MUST explain purpose and what breaks or drifts when that layer is missing or ignored—not only a one-line slogan.
- **FR-009**: Page MUST preserve the docs site’s LLM-first pattern: human narrative plus a copy-ready LLM prompt region at the bottom.
- **FR-010**: The bottom prompt MUST ask an AI to explain what ViraUI is, the principles behind it, and the layers—and MUST instruct the agent to prefer official ViraUI docs/context over inventing a generic system.
- **FR-011**: Page MUST NOT require a dedicated Next/Cards region; deeper docs stay reachable via global nav. Lead MAY link Principles. Layer prose stays orientation-only (no duplicate sibling essays).
- **FR-012**: Page metadata (title, description) MUST accurately describe Layers as the composition/overview page, not a stub.
- **FR-013**: Tone MUST be clear overview/essay quality: expand and refine marketing definitions; do not ship unexplained bullet slogans or paste-only homepage copy.
- **FR-014**: Content MUST be English only for this feature.
- **FR-015**: Page MUST NOT claim Pro Studio/Prompts timelines or treat Pro as required to understand Core layers.

### Key Entities

- **Layer**: One of the four Core working pieces (foundation, UI components, motion guidelines, AI-native) that compose the system.
- **Composition**: The idea that layers stack and reinforce each other rather than competing sources of truth.
- **Foundation**: Brandable tokenized substrate (visual and motion primitives) that themes the system without rewriting components.
- **UI component surface**: The shipped interactive building blocks humans and agents compose into product UI.
- **Motion guidelines**: Shared rules for timing, easing, and reduced-motion so motion stays coherent across screens.
- **AI-native surface**: Skills/guides/metadata that teach agents to use the real system.
- **Overview prompt**: Copy-ready instruction for an LLM to explain ViraUI identity, principles, and layers.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: After reading Layers once, 9 of 10 test readers can name all four Core layers in the correct order without looking back.
- **SC-002**: For each layer, 9 of 10 test readers can state one sentence of purpose that goes beyond the homepage slogan (mentions tokens/brand, production components, shared motion rules, or agent teaching—respectively).
- **SC-003**: 9 of 10 readers can distinguish Layers (composition) from Principles (worldview) when asked which page answers which question.
- **SC-004**: Copying the bottom prompt into a fresh LLM chat yields an answer that covers ViraUI identity, principles, and the four layers in a single response (verified by checklist against those three topics).
- **SC-005**: Editorial review finds no remaining stub/placeholder wording on Layers and no required dependency on Pro product claims to understand Core layers.
- **SC-006**: A first-time stakeholder completes orientation (skim Layers + follow one next-step link) in under 10 minutes.

## Assumptions

- Target readers are designers, engineers, PMs, and agents onboarding to ViraUI docs—not only frontend implementers.
- Source marketing definitions come from the ViraUI Core section on [viraui.dev](https://viraui.dev) (“Strong foundation”, “React components”, “Motion that fits the system”, “AI-native by design”); this page renames the component layer to **UI components** for stakeholder clarity while remaining consistent with a React delivery surface.
- Layers complements `002-principles-docs`: Principles = why; Layers = how the system is composed.
- Deep token tables, component APIs, motion recipes, and skill install commands stay on sibling pages; Layers only orients.
- Pro (Studio, prompt directory) is out of scope except an optional brief “acceleration beyond Core” mention with no timeline.
- English-only; same LLM prompt UX pattern already used/stubbed across overview pages (`pageActions` / fenced prompt block as the site already models).
- No change to site IA/nav required beyond replacing `content/layers.mdx` content (route already exists).
