# Feature Specification: Foundation Overview Page

**Feature Branch**: `007-foundation-docs`

**Created**: 2026-09-21

**Status**: Draft

**Input**: User description: "Write `content/(design-system)/foundation/index.mdx` as an introduction to the ViraUI foundation: how it is composed and how it works at a basic level. Include a Cards grid that links to each foundation section. Each card has a Title and an Image (Spotkit); do not create the illustrations in this pass—follow-up Spotkit pass later."

## Clarifications

### Session 2026-09-21

- Q: Before Spotkit art exists, how should Foundation topic cards look on the published overview? → A: Temporary stand-in art (reuse existing Core spots) until the real foundation topic set lands.
- Q: How deep should the intro explain how Foundation pieces relate before the card grid? → A: Lead + short how-it-works block, then cards.
- Q: What should the Foundation hub page’s frontmatter title be? → A: `Overview` (nav folder = Foundation).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand what Foundation is (Priority: P1)

A designer, engineer, or agent-operator opens `/foundation` and can explain—in their own words—that Foundation is the shared visual substrate of ViraUI (tokens and brandable primitives), how the pieces relate, and how changing foundation values reshapes brand without rewriting components.

**Why this priority**: Overview page’s job is orientation. Without a clear “what / how it works” story, child stubs feel like a random list.

**Independent Test**: Read Foundation overview alone (no child pages required) and correctly restate: Foundation = shared substrate; composed of the listed topic areas; components and agents consume it rather than invent local visual rules.

**Acceptance Scenarios**:

1. **Given** a first-time visitor on Foundation overview, **When** they read the opening, **Then** they see Foundation framed as the design-system substrate (tokens / brandable foundations)—not a component catalog and not a duplicate of Layers.
2. **Given** that framing, **When** they continue past the lead into the how-it-works block, **Then** they understand the basic operating model: change foundation values to shape brand and look; the same components and skills keep working on top; topic pages are facets of that substrate.
3. **Given** Layers already defines “Strong foundation” as one Core layer, **When** they finish this page, **Then** they understand this hub deepens that layer into navigable topics rather than restating the four-layer stack essay.
4. **Given** the page structure, **When** they scan top to bottom, **Then** they encounter lead → short how-it-works block → topic Cards grid (no full child essays between those regions).

---

### User Story 2 - Browse into foundation topics via Cards (Priority: P1)

A reader who wants a specific concern (color, type, space, …) scans a card grid, recognizes each topic by title (and image once art lands), and follows the card into the matching foundation page.

**Why this priority**: Explicit user ask; converts orientation into navigation for all foundation children.

**Independent Test**: From the card grid alone, name every foundation child topic and open its linked destination; titles match the child page titles.

**Acceptance Scenarios**:

1. **Given** the Foundation overview, **When** the reader reaches the navigation region, **Then** they see one Cards grid covering every foundation child listed in the Foundation nav (excluding the overview itself).
2. **Given** that grid, **When** they inspect a card, **Then** each card shows a title and an image (stand-in or final Spotkit)—no requirement for body copy on the card.
3. **Given** a card title, **When** they activate the card, **Then** they land on the matching `/foundation/...` child page (colors, motion, elevation, effects, typography, spacing, radius, iconography).
4. **Given** dedicated foundation Spotkit art is not ready yet, **When** this feature’s content pass ships, **Then** every topic card still shows an image via temporary stand-in spots (existing Core / shared illustrations), plus complete titles and hrefs; the follow-up Spotkit pass replaces stand-ins with the real foundation topic set.

---

### User Story 3 - Know where this sits vs Layers and Components (Priority: P2)

After the intro, a reader knows Foundation is the substrate hub, Layers is the stack map, and Components are the building blocks that implement the foundation—without this page absorbing those essays.

**Why this priority**: Prevents IA confusion already called out on Layers; keeps one job per page.

**Independent Test**: Next-step or in-prose links exist to Layers and/or Components where useful; reader can finish the Foundation model without opening them.

**Acceptance Scenarios**:

1. **Given** a reader who finished the intro, **When** they look for composition context, **Then** they can reach Layers (`/layers`) without this page restating all four Core layers.
2. **Given** a reader ready to build UI, **When** they look for components, **Then** they can reach Components (`/components`) without this page becoming a component index.

---

### Edge Cases

- Reader confuses Foundation overview with Layers: page states Foundation = substrate topics / how tokens and brand primitives work; Layers = four Core pieces stacked; cross-link, do not merge.
- Reader expects full token tables or Theme Studio how-tos on the overview: page stays conceptual + navigation; deep guidance lives on child stubs (filled later).
- Child pages still stubbed: cards still link; overview does not invent child-page content.
- Dedicated foundation Spotkit assets missing during early implement: cards use temporary stand-in art from existing Core / shared spots; Spotkit follow-up swaps stand-ins for the real topic set without rewriting intro prose.
- Stand-in reuse may map multiple topic cards onto fewer existing spots: acceptable temporarily; final set MUST give each topic its own illustration.
- Duplicate of Introduction’s Foundation teaser: overview expands into the full topic set; final Spotkit set MUST NOT leave every topic card on the same Core teaser forever.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Foundation overview MUST live at `content/(design-system)/foundation/index.mdx` and remain the page for `/foundation`.
- **FR-002**: Frontmatter title MUST be `Overview`. Description MUST be non-stub and state what Foundation is and how it works at a basic level.
- **FR-003**: Page MUST open with a consumer-facing lead explaining what Foundation is (shared visual substrate / design tokens and brandable primitives).
- **FR-003a**: Immediately after the lead (before the Cards grid), page MUST include a short how-it-works block: foundation values shape brand/look; topic areas are facets of that substrate; components and agents consume the same foundation rather than inventing local visual rules. The block MUST stay brief—no per-topic mini-essays.
- **FR-004**: Intro (lead + how-it-works) MUST complement Layers’ “Strong foundation” idea without restating the full four-layer composition essay.
- **FR-005**: After the how-it-works block, page MUST include one Cards grid that links to every Foundation child topic currently in nav order: Colors, Motion, Elevation, Effects, Typography, Spacing, Radius, Icons. Theme loading lives under `/get-started/theming/…` (MAY be linked from how-it-works prose; MUST NOT be a Foundation Overview card).
- **FR-006**: Each card MUST expose a title matching the destination page’s title and an image (`SpotIllustration`); card body copy is optional and not required.
- **FR-007**: Each card MUST link to the correct child route under `/foundation/...` for that topic.
- **FR-008**: Dedicated Spotkit SVG assets for foundation topic cards MUST be a follow-up pass (reserved names in plan/contract). Until that pass, this feature’s content implement MUST wire each card to a temporary stand-in using an existing Core / shared illustration so every card already shows an image—no empty image slots and no new SVG authorship in this slice.
- **FR-009**: Page MUST use consumer voice (second person / imperative); no meta asides about the page’s own scope.
- **FR-010**: Page MUST be English human docs prose aligned with the site’s LLM-first docs model (orientation for humans; point agents at package specs/skills where relevant without dumping APIs).
- **FR-011**: Page MUST NOT require new routes or Foundation `meta.json` page-list changes for this feature.
- **FR-012**: Page MUST NOT include exhaustive token tables, package install recipes, component prop/API dumps, or full child-topic essays.
- **FR-013**: Prior stub copy (“Browse child topics…”, placeholder Ask-agent fences) MUST be removed from the published body when content ships.
- **FR-014**: Ask-an-LLM prompt region is out of scope unless reintroduced later; `pageActions` MAY be disabled to match sibling overview pages.

### Key Entities

- **Foundation Overview Page**: Hub at `/foundation` that explains the substrate and links to topic pages.
- **Foundation Topic Card**: Navigational card with title + Spotkit image linking to one child topic.
- **Foundation Topic Page**: Existing child stub under `/foundation/{topic}` (content of those stubs is out of scope here).
- **Spotkit Illustration (deferred + stand-in)**: Final abstract SVG per topic card (later Spotkit pass). Until then, cards point at temporary existing Core / shared spots.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: After reading the overview alone, at least 9 in 10 test readers can correctly state that Foundation is the shared substrate (tokens/brand primitives) that components consume—not the component library itself.
- **SC-002**: After scanning the card grid, at least 9 in 10 test readers can name all eight destination topics and open the matching child page on the first try.
- **SC-003**: A five-minute first visit is enough to finish lead + how-it-works + choose a next topic from the Cards without needing child pages filled in.
- **SC-004**: Reviewers find zero leftover stub/placeholder strings on the overview once the content pass is marked done.
- **SC-005**: Spotkit follow-up can replace temporary stand-in card images with the real foundation topic set without rewriting the intro’s “what / how it works” narrative.

## Assumptions

- Frontmatter title stays `Overview`; Foundation remains the folder / nav group label only.
- Page structure for this feature: lead → short how-it-works block → Cards (no dedicated post-grid next-step section required; Layers/Components links MAY appear in lead or how-it-works prose).
- Card set = the eight Foundation children in `content/(design-system)/foundation/meta.json` (same order as nav; `effects` after `elevation`). Theme wiring = Get started `/get-started/theming/…`.
- Card UI pattern matches existing Fumapress `Cards` / `Card` + `SpotIllustration` usage on Introduction (title + image; short description optional—default omit per user ask).
- Until the Spotkit follow-up, card images reuse existing Core / shared spots as temporary stand-ins (exact mapping chosen at plan/implement).
- Final illustration naming follows Spotkit conventions (e.g. a dedicated `foundation-*` set); exact final names land in the page contract during `/speckit-plan`; SVG authorship stays in the later Spotkit pass.
- Child topic pages remain stubs until their own features; overview only links to them.
- Layers and Introduction stay owners of the four-layer stack story and Core teaser art respectively.
- Consumer voice rule under `content/` applies.
- Constitution stub in `.specify/memory/` is not yet filled; site-wide docs conventions from `001` and sibling overview specs still apply.
