# Research: Get Started Skills Page

**Feature**: `005-skills-docs` | **Date**: 2026-09-18

## 1. Page delivery vehicle

**Decision**: Rewrite existing `content/get-started/skills.mdx` at `/get-started/skills`. Keep `meta.json` entry `skills`. Keep frontmatter icon `OrbitSparkle`. Set `pageActions: false`. Replace stub body including the ask-agent fence.

**Rationale**: FR-001; IA already lists Skills; clarify removed prompt fence (Q1-B).

**Alternatives considered**: New filename/URL — rejected (nav + Setup/Principles links already target `/get-started/skills`).

## 2. Page outline

**Decision**: Use this outline (maps to FR-002–010 + clarifications):

1. **Frontmatter** — `title: Skills`; non-stub `description` (orientation / agent playbooks); `icon: OrbitSparkle`; `pageActions: false`.
2. **Lead (what)** — discursive framing: publishable consumer skills = agent playbooks that keep ViraUI on-pattern; deep API stays in package specs; Skills ≠ Setup ≠ MCP.
3. **How** — short prose: install the pack via [Setup](/get-started/setup) (link only—no command); agents load by task; humans may name a skill in a prompt. No titled prompt fence. No install one-liner.
4. **Per-skill blocks (what/when)** — four H2/H3 sections in order **setup → design → a11y → motion** (Get started journey + deferred clarify default). Each: skill name as heading + ~2–3 sentences (one job + use when / not when). No comparison table.
5. **MCP close** — one brief sentence: skills = project playbooks; MCP = search/fetch human docs; link `/get-started/mcp`. No connection tutorial.

**Rationale**: Clarifications B/B/B/A; SC-001–007; voice match Principles/Layers/Setup.

**Alternatives considered**: Comparison table — rejected in clarify. Design-first block order — deferred; setup-first aligns with install journey. Tabs — YAGNI (no dual path).

## 3. Per-skill editorial facts (orientation only)

**Decision**: Encode these consumer one-job + when cues (plain language; not hub routers):

| Skill | Job | Use when | Not when |
| --- | --- | --- | --- |
| `viraui-setup` | Bootstrap / fix theme, preflight, providers, pack install | First wire-up; missing styles; theme gate; reset coexistence | Routine UI compose |
| `viraui-design` | Default compose/edit/style with `@viraui/react` | Building or debugging UI after bootstrap | Explicit APG audit; bootstrap-only symptoms (fix setup first) |
| `viraui-a11y` | Structured accessibility / APG audit | User asks for audit or a11y debug | Ordinary compose (use design’s light a11y guidance) |
| `viraui-motion` | Motion tokens / transitions on Vira or custom CSS | Composing a screen and motion applies (usually via design) | Component choice without motion; bootstrap; APG audit |

**Rationale**: Aligns with published skill descriptions without pasting skill files (FR-003–004, FR-010).

**Alternatives considered**: Paste SKILL.md routers — rejected (drift + encyclopedia). Omit not-when — weaker SC-001 mapping.

## 4. Install and prompt boundaries

**Decision**:

- Install command lives only on Setup; Skills links to `/get-started/setup`.
- No `npx skills add …` fence on Skills.
- No titled `Ask your agent` / verify / setup prompt fences on Skills.
- How-to may say humans can name a skill in a prompt, in prose only.

**Rationale**: Clarify Q1-B, Q3-B; FR-005–007; SC-005–006.

**Alternatives considered**: Duplicate one-liner for convenience — rejected (two sources of truth). Keep stub prompt — rejected.

## 5. MCP mention

**Decision**: Required brief distinction + link to `/get-started/mcp` near the end (or after how). No MCP URL/init tutorial.

**Rationale**: Clarify Q4-A; FR-008; SC-007.

**Alternatives considered**: Omit MCP — rejected. Footer link with zero prose — weaker Skills≠MCP clarity.

## 6. Tone and length

**Decision**: Discursive connected paragraphs; ~2 minute read for core sections; ban telegram stacks and em-dash spam; no monorepo / eval / unpublished skill paths.

**Rationale**: FR-009; SC-003–004; user “not verbose.”

## 7. Validation approach

**Decision**: Manual quickstart against FR/SC + `pnpm build` (link validation). Confirm Setup + MCP links resolve; no prompt/install fences remain.

**Rationale**: Same as `002`–`004` content features.

**Alternatives considered**: Automated MDX AST checks — YAGNI.
