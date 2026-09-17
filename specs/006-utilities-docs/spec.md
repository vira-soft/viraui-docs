# Feature Specification: Get Started Utilities Page

**Feature Branch**: `006-utilities-docs`

**Created**: 2026-09-18

**Status**: Draft

**Input**: User description: "Document opt-in providers/utilities (starting with Breakpoints) as an expandable Get started Utilities group after MCP, with useBreakpoints as the child page. On Setup, briefly say other providers/utilities may be needed and link to useBreakpoints."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Find opt-in helpers after bootstrap (Priority: P1)

A developer finishes Setup (overlay shell mounted) and needs a ViraUI-custom helper such as viewport-conditional React markup. They expand Utilities after MCP in Get started, open useBreakpoints, and understand these helpers are optional—not part of the required overlay shell—and that Base UI built-ins live elsewhere.

**Why this priority**: Without a dedicated page, Setup either overloads with Breakpoints detail or leaves readers guessing.

**Independent Test**: From useBreakpoints lead alone, restate: Setup owns required overlay shell; Utilities owns optional helpers; page links back to Setup.

**Acceptance Scenarios**:

1. **Given** a visitor on useBreakpoints, **When** they read the opening, **Then** they understand content is opt-in beyond Setup’s Dialog/Tooltip/Toast shell.
2. **Given** that framing, **When** they look for Setup context, **Then** they find a working link to `/get-started/setup`.
3. **Given** Get started nav, **When** they scan order, **Then** Utilities appears as an expandable group after MCP, with useBreakpoints nested inside.

---

### User Story 2 - Use Breakpoints for markup swaps (Priority: P1)

A reader learns when to use Breakpoints (swap/hide React trees at named min-width thresholds), when to prefer CSS media/container queries instead, default threshold names, that a custom map replaces defaults entirely, and how to wrap + call the match helper under a client provider—with a short example.

**Why this priority**: Explicit user ask to document the Breakpoints part that Setup should not carry.

**Independent Test**: From Breakpoints section alone, answer: use when / not when; defaults named; custom map replaces; must wrap before calling the hook; prefer single-name read when only one flag needed.

**Acceptance Scenarios**:

1. **Given** useBreakpoints, **When** the reader opens the page, **Then** they see clear use (viewport-conditional React markup) and prefer-CSS guidance for layout-only shifts.
2. **Given** defaults, **When** they scan thresholds, **Then** they see the five named defaults with em lengths (extra-small through extra-large).
3. **Given** customization, **When** they read the map rule, **Then** they understand a custom map replaces the whole default map (no merge).
4. **Given** wiring, **When** they follow the example, **Then** they see provider wrap + named match helper usage suitable for a client subtree.

---

### User Story 3 - Know Base UI built-ins live elsewhere (Priority: P2)

A reader looking for Base UI built-ins (direction, focus, portals, and similar) finds a short section that sends them to Base UI docs—useBreakpoints stays ViraUI-custom only.

**Why this priority**: Peer is Base UI; documenting its utilities here duplicates and drifts.

**Independent Test**: Find Base UI utilities section; confirm it links out and does not teach DirectionProvider/RTL recipes.

**Acceptance Scenarios**:

1. **Given** useBreakpoints, **When** the reader seeks Base UI helpers, **Then** they see a short handoff to [base-ui.com](https://base-ui.com).
2. **Given** that section, **When** audited, **Then** the page does not document Base UI built-in APIs beyond naming examples in the handoff.

---

### User Story 4 - Setup hands off without overload (Priority: P1)

A reader on Setup finishes the overlay shell and sees a brief note that other providers/utilities may be needed, with a link to Utilities—without Breakpoints recipes on Setup.

**Why this priority**: Explicit user ask; keeps Setup thin.

**Independent Test**: Setup has no Breakpoints code sample; has link to `/get-started/utilities/use-breakpoints`; useBreakpoints owns Breakpoints detail.

**Acceptance Scenarios**:

1. **Given** Setup root-providers section, **When** the reader finishes the overlay shell, **Then** they see a short pointer that other providers/utilities are optional, linking to useBreakpoints under Utilities.
2. **Given** that pointer, **When** they open the link, **Then** `/get-started/utilities/use-breakpoints` loads.
3. **Given** Setup, **When** audited for Breakpoints, **Then** Setup does not restate Breakpoints defaults, replace-map rules, or full examples.

---

### Edge Cases

- Reader thinks Breakpoints is required bootstrap: lead + Setup pointer state optional clearly.
- Reader merges sparse custom thresholds onto defaults: page states replace-not-merge.
- Reader calls match helper outside provider: usage warns wrap-first / client subtree.
- Reader wants CSS-only responsive layout: page steers to media/container queries.
- Future ViraUI helpers (beyond Breakpoints): out of scope to invent; add via follow-up docs change.
- Reader wants Base UI RTL/direction: Base UI utilities section links out—no recipe on Utilities.
- Deep API / agent compose: page points to package specs + design skill—not encyclopedias.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Utilities MUST ship as expandable folder `content/get-started/utilities/` (`meta.json` title Utilities, icon `WrenchScrewdriver`, `defaultOpen: false`) listed after `mcp` in Get started nav—not a flat `utilities.mdx` page.
- **FR-002**: Get started nav (`content/get-started/meta.json`) MUST list `utilities` after `mcp`.
- **FR-003**: IA contract (`specs/001-llm-first-docs-site/contracts/ia-tree.md`) MUST include the Utilities group and `/get-started/utilities/use-breakpoints`, with Get started order ending utilities after mcp.
- **FR-004**: useBreakpoints MUST open with discursive framing that the helper is optional **ViraUI-custom** beyond Setup’s required overlay shell, MUST link to `/get-started/setup`, and MUST state that Base UI built-ins live on Base UI docs.
- **FR-005**: useBreakpoints MUST document Breakpoints: when to use vs prefer CSS; named default thresholds; custom map replaces defaults; client wrap + match-helper usage; short TSX examples; pointer to package specs / design skill for depth. Frontmatter title `useBreakpoints`, `pageActions: false`, public URL `/get-started/utilities/use-breakpoints`.
- **FR-006**: useBreakpoints MUST include a brief Base UI utilities handoff linking to [base-ui.com](https://base-ui.com) for Base UI built-ins; MUST NOT document those APIs on this page.
- **FR-007**: Setup MUST briefly state that other providers/utilities may be needed and link to `/get-started/utilities/use-breakpoints`, and MUST NOT carry Breakpoints recipes (defaults table, replace-map essay, or full examples).
- **FR-008**: Prose MUST stay concise and discursive; MUST NOT become a prop table, framework atlas, or package-spec mirror.
- **FR-009**: useBreakpoints MUST NOT restate Setup’s Dialog/Tooltip/Toast overlay shell as if it belonged on Utilities.

### Key Entities

- **Utilities group**: Expandable Get started folder for opt-in providers/helpers (`content/get-started/utilities/`).
- **useBreakpoints page**: Child page for viewport match provider + hook guidance at `/get-started/utilities/use-breakpoints`.
- **Base UI handoff**: Short section pointing Base UI built-ins to base-ui.com.
- **Setup handoff**: Brief optional-helpers note + link from Setup to useBreakpoints.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: After one pass of useBreakpoints lead + body, a reviewer can correctly state optional vs required-shell and map “swap React at viewport” vs “CSS-only layout” intents.
- **SC-002**: A reader can expand Utilities from Get started nav after MCP and open useBreakpoints from the Setup handoff link.
- **SC-003**: A typical reader can finish core useBreakpoints orientation (lead + defaults/examples + Base UI handoff) in under about three minutes.
- **SC-004**: Setup no longer embeds Breakpoints documentation; useBreakpoints owns that detail; editorial check finds zero duplicate recipes.
- **SC-005**: Build/link validation succeeds for `/get-started/utilities/use-breakpoints` and inbound Setup link.
- **SC-006**: useBreakpoints does not paste package-spec XML or become a prop encyclopedia.

## Assumptions

- Target readers are app teams after (or during) Setup bootstrap—not DS maintainers.
- Primary ViraUI utility documented now: Breakpoints; Base UI built-ins are link-out only.
- Voice matches sibling Get started pages: English, calm, consumer-facing.
- Icon `WrenchScrewdriver` is acceptable unless a later IA pass renames icons.
- Deep API stays in `@viraui/react/specs` breakpoints units; agent compose via `viraui-design`.
- Page content may already exist when this feature folder is authored; feature docs still own acceptance and drift checks.

## Out of Scope

- Changing Breakpoints runtime API in `vira-ui`.
- Base UI built-in API docs (direction, focus, portals, …)—link only.
- Elevation helpers, toast manager internals, or other utilities not named in this feature—unless added by a follow-up.
- Duplicating Setup overlay shell recipes on Utilities.
- MCP or Skills content changes beyond nav/IA adjacency.
