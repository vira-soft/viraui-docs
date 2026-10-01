# Contract: Component & Instruction Page Shell

Every **ComponentPage** MDX MUST include, in order:

1. Title + discursive narrative explaining **how this part works** (AI-centric; not a human study checklist)
2. `## Common examples` with at least one live preview (`ViraSandbox` demo component) or `PreviewSlot` stub (“preview pending” allowed until the demo lands)
3. `## Ask your agent` with a titled fenced code block (`text` + `title="…"`) for a copy-ready compose / config prompt seed (TODO prompt text allowed on stubs)
4. **Base UI handoff (when applicable)** — after Ask your agent, a `## Base UI` section with one linked `Card`. Required when sibling DS `packages/react/src/components/<id>/specs/meta.xml` has `<base_ui href="…"/>` (or `shared_contract` resolving to a unit that does). Copy that `href` **verbatim** into the Card (keep `#api-reference`). Omit when meta has no `<base_ui>` after resolve. Set `external` on the Card. Title = Base UI name from the URL path segment. Do not invent mappings — specs own them. Rule: `.cursor/rules/07-docs-base-ui-card.mdc`.

MUST NOT include exhaustive prop-table as primary documentation.
MUST NOT maintain prop / variant / size inventories — name values inside examples and prose only.
MUST NOT add “What’s next” / next-steps tour sections.
MUST NOT fill static code fences with incidental product copy — self-closing placeholders (`<Title />`, `<Button />`, …) for siblings that are not the teaching point; live demos keep real consumer copy (`.cursor/rules/06-docs-code-fence-placeholders.mdc`).

Every **instructional** page under Get started MUST include a titled prompt code block region as the primary path; manual steps only when strictly necessary and secondary.

Voice: `.cursor/rules/02-docs-consumer-voice.mdc`.
Code fences: `.cursor/rules/06-docs-code-fence-placeholders.mdc`.
Base UI card: `.cursor/rules/07-docs-base-ui-card.mdc`.
