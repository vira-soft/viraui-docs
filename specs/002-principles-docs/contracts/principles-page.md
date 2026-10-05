# Contract: Principles Page Content

**Feature**: `002-principles-docs`  
**File**: `content/(design-system)/principles.mdx`

## MUST

1. Frontmatter `title: Principles` and a non-stub `description`.
2. Lead paragraph(s) framing the design system as a shared language in product (not a static component deck), with agent-composes / human-reviews framing when natural.
3. Three principle sections, in order (H2 or `Steps` / `###` equivalent):
   - One truth beats five surfaces
   - The browser is the canvas
   - Accessibility built into the loop
4. Section 1 covers FR-003, FR-004, FR-004a (drift; AI multiplies SoR alignment; disposable sketch / LLM handoff allowed).
5. Section 2 covers FR-005, FR-006, FR-007 (canvas concept; code center; foundation substrate; no product timeline). Link [Layers](/layers) inline where the stack is referenced — no “What’s next” tour.
6. Section 3 covers FR-008 (APG link; skills overview; href `/get-started/skills`; no skill IDs).
7. A titled fenced prompt code block for applying/restating principles (FR-010), typically under `## Ask your agent`.
8. English essay prose (FR-013, FR-014) that follows `001` page-shell + consumer-voice (short paragraphs, rare em-dash, no telegraph stacks).

## MUST NOT

1. Exhaustive prop tables or component API dumps.
2. Full ARIA APG how-to / pattern catalog.
3. Named skill package IDs (e.g. `viraui-a11y`).
4. App Studio / Pro / release-timeline claims for the canvas concept.
5. “What’s next” / next-steps tour sections (page-shell). Required outbound links to `/get-started` or `/components` as a tour (global nav may still list them).
6. Leave prior stub copy (“Stub: prefer skills…”) in the published body.

## Relationship to other contracts

- Does **not** use Component Page Shell (`PreviewSlot` + Common examples) from `001`.
- Follows instructional prompt-region expectation from `001` page-shell (titled code block present).
- Voice and anti-tour-wall rules defer to `001` `page-shell.md` and `.cursor/rules/02-docs-consumer-voice.mdc`.
