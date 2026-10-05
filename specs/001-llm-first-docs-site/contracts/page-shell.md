# Contract: Component & Instruction Page Shell

Audience: **humans who use LLMs as the central tool** to build UI with ViraUI. Docs help decide and review; agents execute. Readers must not need to memorize APIs, prop inventories, or token catalogs. Deep API authority stays in `@viraui/react/specs` and consumer skills.

**AI-centric** = ViraUI is built so agents compose against a stable contract. Humans stay in the loop for intent, review, and doubt. Product label stays; voice stays human-readable.

Voice: `.cursor/rules/02-docs-consumer-voice.mdc`.
Code fences: `.cursor/rules/06-docs-code-fence-placeholders.mdc`.
Base UI card: `.cursor/rules/07-docs-base-ui-card.mdc`.
Example titles: `.cursor/rules/09-docs-example-titles.mdc`.
No surface catalogs: `.cursor/rules/03-docs-no-surface-catalog.mdc`.

## Voice split

| Page kind | Voice |
| --- | --- |
| Design System intro (`/`, `/principles`, `/layers`) | Product-story: what ViraUI is, capabilities, how layers fit |
| Get started / Foundation | Instructional: how the system works + prompt-first paths where required |
| ComponentPage | Task-oriented: when to use, when not, vs siblings, then examples + agent prompts |

## ComponentPage (required order)

Every **ComponentPage** MDX MUST include, in order:

1. Title (frontmatter)
2. **Base UI handoff (when applicable)** — first body section, before lead narrative: a `## Base UI` section with one linked `Card`. Required when sibling DS `packages/react/src/components/<id>/specs/meta.xml` has `<base_ui href="…"/>` (or `shared_contract` resolving to a unit that does). Copy that `href` **verbatim** into the Card (keep `#api-reference`). Omit when meta has no `<base_ui>` after resolve. Set `external` on the Card. Title = Base UI name from the URL path segment. Do not invent mappings — specs own them. Rule: `.cursor/rules/07-docs-base-ui-card.mdc`. After the Cards block, put a thematic break (`---`).
3. **Lead narrative** — task-oriented: what this part is for, how it behaves in use. About **2–3 short paragraphs** before the next `##`. Prefer blank-line separation over one dense block. Use bullets, Callouts, or extra headings when a list assimilates faster than prose. After the lead, put a thematic break (`---`) before the next section.
4. **Optional decision blocks** (any subset, after lead, before Common examples) — use when they clarify choice; omit when the lead already covers it:
   - `## When to use`
   - `## When not to use`
   - `## Related` (sibling / alternative components with links)

   Put a thematic break (`---`) after the when / when-not block (before Related when present) and after Related (before Common examples).
5. `## Common examples` with at least one live preview (`ViraSandbox` demo component) or `PreviewSlot` stub (“preview pending” allowed until the demo lands). Each `###` under Common examples MUST title the **pattern / use case** (dual thumbs, grouped options, as a link) — not the demo’s product scene (price range, teammate search, equalizer). Demo UI copy stays in the preview and prose. Rule: `.cursor/rules/09-docs-example-titles.mdc`. When a section has both a live demo and a **teaching source fence** (`tsx` / `jsx` / `css` / `html`, …), wrap them in `<Example preview={…}>` — Fumadocs `Tabs` via `src/components/common/example` (`src/mdx-components.ts`). Preview is the default tab; Code holds the fence(s). Each `Example` keeps independent tab state (no shared `groupId`). Tab panels are flush (`p-0`) so sandbox and codeblock fill the chrome. Do not stack demo + teaching fence vertically. Code-only, preview-only, and `PreviewSlot` stubs stay outside `Example`. Agent prompt fences (`text` / `text tab="…"`) stay **outside** `Example` — they are not the Code tab. Ask-your-agent tab labels stay consumer intents; they MUST NOT dictate the `###` pattern titles.
6. `## Ask your agent` with a titled fenced code block (`text` + `title="…"`) for a copy-ready compose / config prompt seed (TODO prompt text allowed on stubs)

## ComponentPage MUST NOT

- Exhaustive prop-table as primary documentation
- Prop / variant / size inventories — name values inside examples and prose only
- “What’s next” / next-steps tour sections
- Static code fences filled with incidental product copy — self-closing placeholders (`<Title />`, `<Button />`, …) for siblings that are not the teaching point; live demos keep real consumer copy (`.cursor/rules/06-docs-code-fence-placeholders.mdc`)
- Stack a live demo and its teaching source fence as siblings when both exist — use `Example` (Preview / Code tabs)
- Put Ask-your-agent / `text` prompt fences inside `Example` Code
- Surface catalogs of the ViraUI API (`.cursor/rules/03-docs-no-surface-catalog.mdc`)
- Text walls: long unbroken paragraphs; telegraph stacks of tiny sentences; habitual em-dashes

## Instructional pages (Get started)

Every **instructional** page under Get started MUST include a titled prompt code block region as the **primary** path; manual steps only when strictly necessary and secondary.

Same prose rules: short paragraphs, structure with headings / bullets / Callouts when clearer, no API memorize, keep example prompts as consumer intents.

## Design System intro pages

Product-story voice. Same anti-wall / anti-catalog / rare em-dash rules. Prompt fences only when the page’s job is to hand the reader an agent seed (otherwise link Setup / Skills).
