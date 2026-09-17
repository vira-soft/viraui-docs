# Research: ViraUI Principles Page

**Feature**: `002-principles-docs` | **Date**: 2026-09-18

## 1. Page delivery vehicle

**Decision**: Ship all content in existing `content/principles.mdx` (frontmatter + MDX body). No new page files or meta.json changes.

**Rationale**: Spec assumes route already in IA (`001`); FR-001 is stub replacement only.

**Alternatives considered**: Split into child pages under `principles/` — rejected (overkill; SC-001 wants one readable page).

## 2. Section outline and H2 titles

**Decision**: Use this outline (maps 1:1 to FR-002–008, FR-011):

1. **Frontmatter** — `title: Principles`; description rewritten (not stub).
2. **Lead** — short framing: design system = shared language in product; AI needs one truth.
3. **## One truth beats five surfaces** — principle (a): multi-surface drift; AI multiplies reconciliation; static tools OK as disposable low-fi / LLM handoff, not system of record.
4. **## The browser is the canvas** — principle (b): browser visually renders code ≈ freeform design canvas (concept only); ViraUI keeps code at the center; substrate (tokens, distribution, versioning, coherent toolchain) makes the slogan real.
5. **## Accessibility built into the loop** — principle (c): grounded in [W3C ARIA APG](https://www.w3.org/WAI/ARIA/apg/); complete principles-level overview; agents via skills; link `/skills`; no skill IDs.
6. **## Next** — `Cards` linking `/layers` and `/skills` only.
7. **Titled prompt code block** — concise prompt seed (`text` fence + `title="…"`) to apply/restate principles in a project (FR-010).

**Rationale**: Clarify deferred exact H2s; these titles are scannable, stakeholder-friendly, and match essay tone without product claims.

**Alternatives considered**: Numbered “Principle 1/2/3” only — weaker scan; “Code as source of truth” as sole H2 for (b) — loses canvas metaphor users asked for.

## 3. MDX component usage

**Decision**: Match intro-page patterns from `content/index.mdx`: prose + optional `Cards`/`Card` for Next; keep a titled fenced code block with seed prompt text. External APG as markdown link. No `PreviewSlot` (not a component page).

**Rationale**: Reuse established chrome; page-shell contract for components does not apply; instructional titled prompt code block does (FR-010).

**Alternatives considered**: Heavy Callout stack — risks sloganizing; SpotIllustrations for each principle — nice-to-have, not required by spec (defer unless copy feels thin).

## 4. Tone and banned claims

**Decision**: Persuasive essay; respectful to Figma/Sketch users; allow disposable sketches → LLM → ViraUI. **Ban**: App Studio / Pro timelines; “shipped visual editor”; skill package IDs; TypeScript-only designer mandate; prop tables; full APG how-to.

**Rationale**: Clarify session answers C/B/A + edge cases.

**Alternatives considered**: Hostile “kill Figma” tone — rejected (SC-006 fairness).

## 5. Validation approach

**Decision**: Manual quickstart against FR checklist + `pnpm build` smoke. No new test framework.

**Rationale**: Matches `001` docs-site testing stance; content feature.

**Alternatives considered**: Playwright copy assertions — YAGNI for one editorial page.
