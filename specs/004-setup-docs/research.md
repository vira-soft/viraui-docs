# Research: Get Started Setup Page

**Feature**: `004-setup-docs` | **Date**: 2026-09-18

## 1. Page delivery vehicle and URL

**Decision**: Ship Setup as `content/get-started/setup.mdx` at `/get-started/setup`. Remove `content/get-started/index.mdx`. Update `content/get-started/meta.json` `pages` to `["setup", "skills", "mcp"]`.

**Rationale**: Clarification Option B; IA contract already names `/get-started/setup`; Skills already links there. Keeping Setup on category `index` would leave Skills/IA drift.

**Alternatives considered**: Keep `index.mdx` at `/get-started` — rejected in clarify. Dual overview + setup — out of scope this feature.

## 2. Category landing without index

**Decision**: No replacement Get started overview page in this feature. Nav separator `---Get started---` + folder children is enough. Visiting bare `/get-started` may 404 or redirect depending on Fumapress defaults — acceptable; primary CTA is Setup in sidebar.

**Rationale**: Spec FR-010 / Out of Scope; YAGNI for overview essay.

**Alternatives considered**: Thin redirect `index.mdx` → setup — defer unless build/link-check forces it during implement.

## 3. Page outline (shared outside tabs + dual full paths)

**Decision**: Use this outline (maps to FR-002–009, clarifications):

1. **Frontmatter** — `title: Setup`; non-stub `description`; keep or set `icon: Gear`; `pageActions: false` (match overview instructional siblings).
2. **Lead** — discursive framing: bootstrap ViraUI into a React app; keep bootstrap thin; agents + skills do heavy lifting; Setup ≠ Skills ≠ MCP.
3. **Requirements** (shared, outside tabs) — React / React DOM platform; Base UI sole required peer beyond that, link `https://base-ui.com`; short toolchain (Node-capable package manager + agent host for AI path). Optional packages (`@viraui/foundation`, `@viraui/icons`) mentioned only as optional / theme-gated, not a laundry list.
4. **Shared process** (outside tabs) — one narrative of the full bootstrap sequence so tabs do not restate it: skills pack → packages/peers → **theme choice gate** → theme CSS → fonts → preflight → root overlay providers. Brief coexistence note (Tailwind/other resets → handled in bootstrap / skill) without essay.
5. **Tabs** — default/first tab **AI**, second **Manual**. Each covers full process outcomes; only path-specific material inside:
   - **AI**: titled setup prompt fence + titled verify prompt fence.
   - **Manual**: human commands/checklist for same steps + checklist-style verify (no verify prompt fence). Link to `/get-started/skills` at skills step.
6. **Optional close** — one sentence next to Skills or MCP; no second encyclopedia.

**Rationale**: Clarifications C (full process both tabs) + shared once outside + verify C (AI prompt / Manual checklist).

**Alternatives considered**: Install-only Manual — rejected. Duplicate full narrative inside both tabs — rejected. Shared verify outside only — rejected in favor of path-specific verify.

## 4. MDX components

**Decision**:

| Need | Component |
| --- | --- |
| AI / Manual switch | `Tabs` / `Tab` from fumadocs-ui (already in `press.config.tsx`) |
| Prompts | Fenced ` ```text title="…" ` ` blocks |
| Shared sequence (optional) | `Steps`/`Step` or numbered prose — pick whichever stays discursive; avoid telegram fragments |
| Callouts | Use sparingly (theme gate, Base UI peer) |

No `PreviewSlot` (not a component page).

**Rationale**: Tabs already registered; matches FR-004. Prompt fences match Get started page-shell + FR-009.

**Alternatives considered**: Two stacked H2 sections without tabs — weaker AI-primary affordance. Custom React tab component — YAGNI.

## 5. Prompt and Manual content authority

**Decision**:

- **AI setup prompt** MUST instruct agent to: install publishable skills (`npx skills add https://skills.sh/p/IQZPjm9biEMkAZOP`), install `@viraui/react` + peers (`react`, `react-dom`, `@base-ui/react`), ask default foundation vs App Studio/custom theme **before** foundation/fonts, apply theme → fonts → `@viraui/react/preflight.css` as JS side-effect imports in app root, mount Dialog/Tooltip/Toast root providers once, follow `viraui-setup` / package specs — do not invent paths.
- **AI verify prompt** MUST ask agent to smoke-check: semantic tokens resolve, preflight present, providers mounted, sample Button/Stack (or equivalent) renders / toast paints.
- **Manual** mirrors same outcomes with copyable install commands and short wiring checklist; skills purpose → link Skills page; verify as checklist bullets matching verify prompt outcomes.
- Do **not** dump per-framework entry-file matrices (Next/Remix/Astro/Vite) — point agent/skill at framework guidance.

**Rationale**: Aligns with `viraui-setup` bootstrap.md / skill hub without turning Setup into the skill file. FR-005–007.

**Alternatives considered**: Paste entire skill markdown — rejected (drift + encyclopedia). Omit theme gate — violates bootstrap hard gate.

## 6. Dependency framing language

**Decision**: Consumer-facing line: beyond React and React DOM, the only required peer is Base UI (`@base-ui/react`), with link to https://base-ui.com. Do not claim “zero dependencies.” Optional foundation/icons stay clearly optional.

**Rationale**: User ask + package `peerDependencies`; Assumptions in spec.

**Alternatives considered**: List every transitive dep — noise. Hide React peers — confusing for greenfield.

## 7. Toolchain framing

**Decision**: High level only: a Node-capable package manager to install packages; for the AI path, an agent/LLM that can edit the project and run installs. No monorepo Node/pnpm pins on this page.

**Rationale**: Spec Assumptions; FR-003(c).

## 8. Tone

**Decision**: Discursive connected paragraphs (match Principles/Layers calm English). Ban telegram stacks of ultra-short sentences; avoid em-dash overuse; no stub/placeholder leftovers.

**Rationale**: FR-008, SC-004, user voice ask.

## 9. Validation approach

**Decision**: Manual quickstart against FR/SC + `pnpm build` (link validation). Confirm `/get-started/setup` loads; Skills link works; Base UI external link present.

**Rationale**: Same as `002`/`003` content features.

**Alternatives considered**: Playwright tab assertions — YAGNI.
