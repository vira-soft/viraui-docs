# Research: ViraUI Layers Page

**Feature**: `003-layers-docs` | **Date**: 2026-09-18

## 1. Page delivery vehicle

**Decision**: Ship all content in existing `content/layers.mdx` (frontmatter + MDX body). No `meta.json` or route changes.

**Rationale**: Spec assumes route already in IA (`001`); FR-001 is stub replacement only. `content/meta.json` already lists `layers`.

**Alternatives considered**: Split each layer into child pages — rejected (orientation page must stay one skim; deep pages already exist under foundation/components/skills).

## 2. Relationship to Introduction vs Principles

**Decision**:

| Page | Job |
| --- | --- |
| `content/index.mdx` | Short Core teaser Cards |
| `content/principles.mdx` | Worldview / why |
| `content/layers.mdx` | Composition / how the four Core layers stack |

Layers MUST NOT restate the Principles essay. Lead MAY one-line contrast (“Principles = why; Layers = how pieces compose”) and link `/principles`. Layers expands beyond index Card blurbs and beyond [viraui.dev](https://viraui.dev) marketing one-liners.

**Rationale**: FR-003, SC-003, edge case “confuses Layers with Principles.”

**Alternatives considered**: Duplicate index Cards only — fails FR-008 (purpose + what breaks). Paste homepage Core section verbatim — fails FR-013.

## 3. Section outline and headings

**Decision**: Use this outline (maps to FR-002–011):

1. **Frontmatter** — `title: Layers`; non-stub `description` about composition; keep `icon: StackPerspective`; `pageActions: false` (match principles/intro).
2. **Lead** — four working layers compose one coherent system; not a bag of parts; point to Principles for worldview.
3. **Four layer Steps** (Fumapress `Steps`/`Step` + `SpotIllustration` `layers-*` before prose):
   - AI-native by design
   - Strong foundation
   - UI components
   - Motion guidelines
4. **Shared-stack art** — one four-slab metaphor (top→bottom = Step order); each Step lights the referenced layer (lift + accent), siblings dim. Separate from Introduction teaser art.
5. **Ask-an-LLM prompt** — optional on this page.

Each Step: illustration, then short purpose + what breaks when missing (FR-008). Expand viraui.dev Core meanings; do not paste bullets unchanged.

**Rationale**: Steps match Principles rhythm; illustration-first cuts text wall; stack-highlight shows composition at a glance. Order still encodes composition (SC-001).

**Alternatives considered**: Plain H2 essay — text wall. Layout Cards — tried; Steps preferred for sequential read. Reuse index spot art — weaker “same stack, lit layer” story.

## 4. Layer content boundaries (depth vs siblings)

**Decision**:

| Layer | Cover on Layers | Defer to |
| --- | --- | --- |
| Strong foundation | Tokens/brandable substrate; same components different brands; foundation domains conceptually (color, type, space, elevation, motion primitives); theme load under Get started | `/foundation`, `/get-started/theming/…` |
| UI components | Production building blocks on foundation; accessible patterns; documented composition for humans + agents | `/components` |
| Motion guidelines | Shared duration/easing/reduced-motion; functional first; evocative when earned | `/foundation/motion` |
| AI-native by design | Skills, guides, consumption metadata; real ViraUI not generic HTML; spec-driven for humans + models | `/get-started/skills` |

Optional one sentence: Pro (Studio / prompts) can accelerate beyond Core — **no timeline**, not required to understand layers (FR-015). Prefer omit Pro unless a single Callout keeps Core vs Pro clear without roadmap.

**Rationale**: Spec Assumptions + FR-004–007, FR-015; mirrors index Card destinations without dumping APIs.

**Alternatives considered**: Embed package names / install commands — rejected (how-to belongs Get started). Full motion cookbook — rejected.

## 5. Next-step destinations

**Decision**: No Next/Cards region on Layers. Lead links `/principles`. Foundation / Components / Motion / Skills stay in global nav (and Introduction Core Cards).

**Rationale**: User preference — orientation page stays prose + prompt only.

**Alternatives considered**: Full Next Cards set — rejected for this page.

## 6. Overview prompt (LLM region)

**Decision**: Keep pattern:

````mdx
```text title="Ask your agent"
…copy-ready prompt…
```
````

Prompt MUST instruct the agent to explain:

1. What ViraUI is
2. The principles behind it
3. The working layers

…and to prefer official ViraUI docs/context (Principles, Layers, Introduction) over inventing a generic design-system pitch. Prompt MAY tell the agent to open `/principles` and `/layers` when available. Prompt MUST NOT require Layers page to restate the full Principles essay.

**Rationale**: FR-009, FR-010, SC-004; user ask explicit.

**Alternatives considered**: Layers-only prompt — fails user request. Multi-prompt stack — YAGNI.

## 7. MDX component usage

**Decision**: Lead prose + four `##` layer sections + titled `text` fence for prompt. No `Steps`, no Next `Cards`. No `PreviewSlot`.

**Rationale**: Keep page minimal; PreviewSlot is for component pages.

**Alternatives considered**: Heavy Callout per layer — risks sloganizing. Steps + Next Cards — rejected for this page.

## 8. Tone and banned claims

**Decision**: Clear overview/essay; expand marketing definitions. **Ban**: Pro/Studio release timelines; treating Pro as required; token pipeline tutorials; component prop tables; skill package IDs unless needed (prefer generic “skills”); stub/placeholder wording; paste-only homepage bullets.

**Rationale**: FR-012–015, SC-005.

**Alternatives considered**: Hostile anti-marketing rewrite of site — unnecessary; expand and clarify instead.

## 9. Validation approach

**Decision**: Manual quickstart against FR checklist + `pnpm build` smoke. Optional human skim for SC-001/002/003. No new test framework.

**Rationale**: Matches `001` / `002` content-feature stance.

**Alternatives considered**: Playwright heading assertions — YAGNI for one editorial page.
