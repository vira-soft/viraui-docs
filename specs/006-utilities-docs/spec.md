# Feature Specification: Get Started Utilities Page

**Feature Branch**: `006-utilities-docs`

**Created**: 2026-09-18

**Status**: Draft

**Input**: User description: "Document opt-in providers/utilities as an expandable Get started Utilities group, with Breakpoints (ViraUI-custom) and Direction (Base UI DirectionProvider re-export) as child pages. On Setup, briefly say other providers/utilities may be needed and link those pages."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Find opt-in helpers after bootstrap (Priority: P1)

A developer finishes Setup (overlay shell mounted) and needs a ViraUI-custom helper such as viewport-conditional React markup. They expand Utilities in Get started, open Breakpoints, and understand these helpers are optional—not part of the required overlay shell—and that RTL direction lives on the Direction sibling (Base UI re-export).

**Why this priority**: Without a dedicated page, Setup either overloads with Breakpoints detail or leaves readers guessing.

**Independent Test**: From Breakpoints lead alone, restate: Setup owns required overlay shell; Utilities owns optional helpers; page links back to Setup.

**Acceptance Scenarios**:

1. **Given** a visitor on Breakpoints, **When** they read the opening, **Then** they understand content is opt-in beyond Setup’s Dialog/Tooltip/Toast shell.
2. **Given** that framing, **When** they look for Setup context, **Then** they find a working link to `/get-started/setup`.
3. **Given** Get started nav, **When** they scan order, **Then** Utilities appears as an expandable group with Breakpoints and Direction nested inside.

---

### User Story 2 - Use Breakpoints for markup swaps (Priority: P1)

A reader learns when to use Breakpoints (swap/hide React trees at named min-width thresholds), when to prefer CSS media/container queries instead, default threshold names, that a custom map replaces defaults entirely, and how to wrap + call the match helper under a client provider—with a short example.

**Why this priority**: Explicit user ask to document the Breakpoints part that Setup should not carry.

**Independent Test**: From Breakpoints section alone, answer: use when / not when; defaults named; custom map replaces; must wrap before calling the hook; prefer single-name read when only one flag needed.

**Acceptance Scenarios**:

1. **Given** Breakpoints, **When** the reader opens the page, **Then** they see clear use (viewport-conditional React markup) and prefer-CSS guidance for layout-only shifts.
2. **Given** defaults, **When** they scan thresholds, **Then** they see the five named defaults with em lengths (extra-small through extra-large).
3. **Given** customization, **When** they read the map rule, **Then** they understand a custom map replaces the whole default map (no merge).
4. **Given** wiring, **When** they follow the example, **Then** they see provider wrap + named match helper usage suitable for a client subtree.

---

### User Story 3 - Find Direction / Base UI handoff (Priority: P2)

A reader looking for RTL / direction finds the Direction page: Base UI Card + thin how-it-works + at most two examples. Breakpoints points there for RTL and sends other Base UI built-ins (focus, portals, …) to base-ui.com.

**Why this priority**: DirectionProvider is a transparent re-export; full API must stay upstream, but consumers need a discoverable ViraUI entry.

**Independent Test**: Direction Card href matches DS `direction-provider` meta `base_ui`; page has ≤2 examples; Breakpoints Base UI section links Direction for RTL.

**Acceptance Scenarios**:

1. **Given** Direction, **When** the reader opens the page, **Then** they see a Base UI handoff Card and understand the re-export + `dir` pairing rule.
2. **Given** Breakpoints, **When** the reader seeks RTL, **Then** they find a link to `/get-started/utilities/direction`.
3. **Given** Direction, **When** audited, **Then** the page does not become a Base UI API encyclopedia.

---

### User Story 4 - Setup hands off without overload (Priority: P1)

A reader on Setup finishes the overlay shell and sees a brief note that other providers/utilities may be needed, with links to Breakpoints and Direction—without recipes on Setup.

**Why this priority**: Explicit user ask; keeps Setup thin.

**Independent Test**: Setup has no Breakpoints/RTL code sample; has links to `/get-started/utilities/breakpoints` and `/get-started/utilities/direction`.

**Acceptance Scenarios**:

1. **Given** Setup root-providers section, **When** the reader finishes the overlay shell, **Then** they see a short pointer that other providers/utilities are optional, linking to Breakpoints and Direction under Utilities.
2. **Given** those pointers, **When** they open the links, **Then** both utility pages load.
3. **Given** Setup, **When** audited for Breakpoints/RTL, **Then** Setup does not restate defaults, replace-map rules, or full examples.

---

### Edge Cases

- Reader thinks Breakpoints is required bootstrap: lead + Setup pointer state optional clearly.
- Reader merges sparse custom thresholds onto defaults: page states replace-not-merge.
- Reader calls match helper outside provider: usage warns wrap-first / client subtree.
- Reader wants CSS-only responsive layout: page steers to media/container queries.
- Future ViraUI helpers (beyond Breakpoints): out of scope to invent; add via follow-up docs change.
- Reader wants Base UI RTL/direction: Direction page owns thin handoff; Breakpoints links there—no RTL recipes on Breakpoints or Setup.
- Deep API / agent compose: page points to package specs + design skill—not encyclopedias.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Utilities MUST ship as expandable folder `content/(design-system)/get-started/utilities/` (`meta.json` title Utilities, icon `WrenchScrewdriver`, `defaultOpen: false`)—not a flat `utilities.mdx` page.
- **FR-002**: Get started nav MUST list `utilities` as a folder entry among Get started children.
- **FR-003**: IA contract (`specs/001-llm-first-docs-site/contracts/ia-tree.md`) MUST include the Utilities group plus `/get-started/utilities/breakpoints` and `/get-started/utilities/direction`.
- **FR-004**: Breakpoints MUST open with discursive framing that the helper is optional **ViraUI-custom** beyond Setup’s required overlay shell, MUST link to `/get-started/setup`, and MUST hand RTL to Direction / other Base UI built-ins to base-ui.com.
- **FR-005**: Breakpoints MUST document: when to use vs prefer CSS; named default thresholds; custom map replaces defaults; client wrap + match-helper usage; short TSX examples; pointer to package specs / design skill for depth. Frontmatter title `Breakpoints`, `pageActions: false`, public URL `/get-started/utilities/breakpoints`.
- **FR-006**: Direction MUST be a thin Base UI re-export handoff: Card (`base_ui` href from DS meta), short how-it-works, ≤2 fence examples; frontmatter title `Direction`, URL `/get-started/utilities/direction`. MUST NOT mirror the full Base UI API.
- **FR-007**: Setup MUST briefly state that other providers/utilities may be needed and link to Breakpoints + Direction, and MUST NOT carry Breakpoints or RTL recipes.
- **FR-008**: Prose MUST stay concise and discursive; MUST NOT become a prop table, framework atlas, or package-spec mirror.
- **FR-009**: Breakpoints MUST NOT restate Setup’s Dialog/Tooltip/Toast overlay shell as if it belonged on Utilities.

### Key Entities

- **Utilities group**: Expandable Get started folder for opt-in providers/helpers (`content/(design-system)/get-started/utilities/`).
- **Breakpoints page**: Child page for viewport match provider + hook guidance at `/get-started/utilities/breakpoints`.
- **Direction page**: Child page for transparent Base UI DirectionProvider / `useDirection` re-export at `/get-started/utilities/direction`.
- **Base UI handoff**: Breakpoints points RTL to Direction and other built-ins to base-ui.com; Direction Card points upstream API.
- **Setup handoff**: Brief optional-helpers note + links from Setup to Breakpoints and Direction.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: After one pass of Breakpoints lead + body, a reviewer can correctly state optional vs required-shell and map “swap React at viewport” vs “CSS-only layout” intents.
- **SC-002**: A reader can expand Utilities from Get started nav and open Breakpoints or Direction from the Setup handoff links.
- **SC-003**: A typical reader can finish core Breakpoints orientation (lead + defaults/examples + Base UI handoff) in under about three minutes.
- **SC-004**: Setup no longer embeds Breakpoints/RTL documentation; Utilities children own that detail; editorial check finds zero duplicate recipes.
- **SC-005**: Build/link validation succeeds for `/get-started/utilities/breakpoints`, `/get-started/utilities/direction`, and inbound Setup links.
- **SC-006**: Breakpoints and Direction do not paste package-spec XML or become prop encyclopedias.

## Assumptions

- Target readers are app teams after (or during) Setup bootstrap—not DS maintainers.
- ViraUI-custom utility: Breakpoints. Transparent Base UI re-export: Direction (thin handoff only).
- Voice matches sibling Get started pages: English, calm, consumer-facing.
- Icon `WrenchScrewdriver` is acceptable unless a later IA pass renames icons.
- Deep Breakpoints API stays in `@viraui/react/specs` breakpoints units; Direction deep API stays on Base UI; agent compose via `viraui-design`.
- Page content may already exist when this feature folder is authored; feature docs still own acceptance and drift checks.

## Out of Scope

- Changing Breakpoints or DirectionProvider runtime API in `vira-ui`.
- Full Base UI built-in API docs (focus, portals, …)—link only; Direction is the only thin re-export page in this feature.
- Elevation helpers, toast manager internals, or other utilities not named in this feature—unless added by a follow-up.
- Duplicating Setup overlay shell recipes on Utilities.
- MCP or Skills content changes beyond nav/IA adjacency.
