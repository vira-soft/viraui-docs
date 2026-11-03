# Optional project agent note (portable)

**When to read:** after installing publishable skills from `vira-soft/viraui-skills`, when the consumer wants a thin project-level reminder for **any** agent host (Cursor, Claude Code, Codex, Gemini, …).

This is an **optional belt**. Primary triggers remain skill `description` fields + hub gates. Do **not** invent Cursor-only `.cursor/rules` as the source of truth — mirror this note into a host-native format only if needed.

## Install skills (same source, all hosts)

```bash
npx skills add vira-soft/viraui-skills
```

## Copy into consumer `AGENTS.md` (or host-equivalent)

Paste near the top of the project agent instructions file:

```markdown
## ViraUI (agent skills)

This app uses `@viraui/react`. Publishable skills install via:
`npx skills add vira-soft/viraui-skills`

- **UI build / edit / style** → load **viraui-design** before JSX or custom CSS. Props and layout parts before CSS modules/Tailwind on Vira roots.
- **Transitions / hover-press / overlay motion / motion tokens** → **viraui-motion** (hub + one ref).
- **Explicit APG / a11y audit** → **viraui-a11y**. Ordinary compose-time a11y stays in viraui-design `accessibility.md`.
- **Bootstrap / theme / preflight / providers** → **viraui-setup**.
- **Before claiming UI done:** follow viraui-design `verify.md` — emit the adversarial ship report (custom CSS inventory, reinvented props-as-CSS: 0, compose a11y, `adversarial verify: pass`). Do not hand off with open criticals.
```

Same wording for every host. No per-host skill forks.
