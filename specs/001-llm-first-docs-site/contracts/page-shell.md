# Contract: Component & Instruction Page Shell

Every **ComponentPage** MDX MUST include, in order:

1. Title + discursive narrative explaining **how this part works** (AI-centric; not a human study checklist)
2. `## Common examples` with at least one `PreviewSlot` (may say “preview pending”)
3. `## Ask your agent` with a titled fenced code block (`text` + `title="…"`) for a copy-ready compose / config prompt seed (TODO prompt text allowed on stubs)

MUST NOT include exhaustive prop-table as primary documentation.
MUST NOT add “What’s next” / next-steps tour sections.

Every **instructional** page under Get started MUST include a titled prompt code block region as the primary path; manual steps only when strictly necessary and secondary.

Voice: `.cursor/rules/02-docs-consumer-voice.mdc`.
