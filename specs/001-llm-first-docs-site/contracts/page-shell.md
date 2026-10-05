# Contract: Component & Instruction Page Shell

Every **ComponentPage** MDX MUST include, in order:

1. Title (frontmatter)
2. **Base UI handoff (when applicable)** — first body section, before lead narrative: a `## Base UI` section with one linked `Card`. Required when sibling DS `packages/react/src/components/<id>/specs/meta.xml` has `<base_ui href="…"/>` (or `shared_contract` resolving to a unit that does). Copy that `href` **verbatim** into the Card (keep `#api-reference`). Omit when meta has no `<base_ui>` after resolve. Set `external` on the Card. Title = Base UI name from the URL path segment. Do not invent mappings — specs own them. Rule: `.cursor/rules/07-docs-base-ui-card.mdc`.
3. Discursive narrative explaining **how this part works** (AI-centric; not a human study checklist)
4. `## Common examples` with at least one live preview (`ViraSandbox` demo component) or `PreviewSlot` stub (“preview pending” allowed until the demo lands). Each `###` under Common examples MUST title the **pattern / use case** (dual thumbs, grouped options, as a link) — not the demo’s product scene (price range, teammate search, equalizer). Demo UI copy stays in the preview and prose. Rule: `.cursor/rules/09-docs-example-titles.mdc`. When a section has both a live demo and a **teaching source fence** (`tsx` / `jsx` / `css` / `html`, …), wrap them in `<Example preview={…}>` — Fumadocs `Tabs` via `src/components/common/example` (`src/mdx-components.ts`). Preview is the default tab; Code holds the fence(s). Each `Example` keeps independent tab state (no shared `groupId`). Tab panels are flush (`p-0`) so sandbox and codeblock fill the chrome. Do not stack demo + teaching fence vertically. Code-only, preview-only, and `PreviewSlot` stubs stay outside `Example`. Agent prompt fences (`text` / `text tab="…"`) stay **outside** `Example` — they are not the Code tab. Ask-your-agent tab labels stay consumer intents; they MUST NOT dictate the `###` pattern titles.
5. `## Ask your agent` with a titled fenced code block (`text` + `title="…"`) for a copy-ready compose / config prompt seed (TODO prompt text allowed on stubs)

MUST NOT include exhaustive prop-table as primary documentation.
MUST NOT maintain prop / variant / size inventories — name values inside examples and prose only.
MUST NOT add “What’s next” / next-steps tour sections.
MUST NOT fill static code fences with incidental product copy — self-closing placeholders (`<Title />`, `<Button />`, …) for siblings that are not the teaching point; live demos keep real consumer copy (`.cursor/rules/06-docs-code-fence-placeholders.mdc`).
MUST NOT stack a live demo and its teaching source fence as siblings when both exist — use `Example` (Preview / Code tabs).
MUST NOT put Ask-your-agent / `text` prompt fences inside `Example` Code.

Every **instructional** page under Get started MUST include a titled prompt code block region as the primary path; manual steps only when strictly necessary and secondary.

Voice: `.cursor/rules/02-docs-consumer-voice.mdc`.
Code fences: `.cursor/rules/06-docs-code-fence-placeholders.mdc`.
Base UI card: `.cursor/rules/07-docs-base-ui-card.mdc`.
Example titles: `.cursor/rules/09-docs-example-titles.mdc`.
