# Contract: Layers Page Content

**Feature**: `003-layers-docs`
**File**: `content/layers.mdx`

## MUST

1. Frontmatter `title: Layers` and a non-stub `description` about composition of working layers.
2. Lead stating four Core layers compose one coherent system; MAY contrast with Principles (`/principles`) without restating the Principles essay.
3. Four layer sections as Fumapress `Steps` / `Step` with an H3 title, a dedicated spotkit `SpotIllustration` (`layers-*`) in the Step body **before** the prose, in order:
   - AI-native by design
   - Strong foundation
   - UI components
   - Motion guidelines
4. The four illustrations share one stack metaphor (top→bottom matches Step order); each lights the referenced layer (lift + accent) while siblings stay dim.
5. Strong foundation covers FR-004 + FR-008 (tokens/brandable foundations; same components different brands; what breaks without it) in short Step copy.
6. UI components covers FR-005 + FR-008 in short Step copy.
7. Motion guidelines covers FR-006 + FR-008 in short Step copy.
8. AI-native by design covers FR-007 + FR-008 in short Step copy.
9. Content expands [viraui.dev](https://viraui.dev) Core ideas rather than pasting homepage bullets unchanged (FR-013).
10. English overview/essay prose (FR-014).
11. Lead MAY link `/principles`; Step prose MAY deep-link foundation / components / motion / skills.

## MUST NOT

1. Exhaustive token tables, package install recipes, or component prop/API dumps.
2. Full motion cookbook or accessibility encyclopedia.
3. Treat Pro (Studio / prompt directory) as required to understand Core layers, or claim Pro timelines (FR-015).
4. Restate the full Principles worldview essay on this page.
5. Leave prior stub copy or “Prompt placeholder” text in the published body.
6. Require new routes or `meta.json` changes for this feature.
7. Use a dedicated Next section or layout `Cards` for the four layers on this page.
8. Reuse Introduction Core teaser art (`foundation` / `components` / `motion` / `ai`) for these four Steps — Layers uses the shared-stack `layers-*` set.

## Relationship to other contracts

- Complements Principles page contract (`002-principles-docs`): why vs composition (both may use `Steps`).
- Complements Introduction Core Cards (`content/index.mdx`): short teaser vs expanded layer definitions with stack-highlight art.
- Does **not** use Component Page Shell (`PreviewSlot` + Common examples) from `001`.
- Ask-an-LLM prompt region is optional for this page unless reintroduced.
