# a11y

**APG a11y** for any UI stack (React, Vue, Angular, Svelte, plain HTML, design systems). Auto-applies on **every UI compose** (components / HTML / templates) **and** on accessibility audit, APG review, keyboard/screen-reader debug, or ARIA validation.

**Version:** 1.2.0 · **Hub:** [`SKILL.md`](./SKILL.md)

```bash
npx skills add equinusocio/skills --skill a11y
```

← [All skills](../../README.md)

## Mandatory first read

Before ARIA or custom widgets: [APG Read Me First](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/) — **No ARIA is better than Bad ARIA**.

## Conflict with project guidelines

Auto-apply = skill matches the task. In a repo that **already** documents a11y conventions, agent asks before composing/fixing (does not silently override).

**Task:** “Add a Dialog with an icon close button”

| Source | Rule |
| --- | --- |
| **Project** (`ACCESSIBILITY.md` / eslint-plugin-jsx-a11y) | Project-specific naming / landmark / lint rules |
| **This skill** | Read Me First → native/DS first → project-map; never example-index; no Bad ARIA |

**Agent asks** (AskQuestion or numbered options): (1) this skill · (2) project guidelines · (3) mix you specify — then waits.

No project a11y guide → this skill applies with no question. Full contract: [root README](../../README.md#shared-hard-contract).

## Example report (audit ask)

```md
## APG audit

Scope: settings/SettingsPage
Patterns fetched: tabs, dialog-modal, button

| Widget | APG | Result | Note |
| --- | --- | --- | --- |
| Tabs | tabs | pass | Arrow keys + tablist ok in DOM |
| Dialog | dialog-modal | fail | Focus not trapped on open |
| Icon close | button | fail | Missing accessible name |

Page: landmarks ok; h1 missing under main
Do not add: widget role/aria-* the DS already emits
```

## Contents

| File | Role |
| --- | --- |
| [`SKILL.md`](./SKILL.md) | Hub: contract, router, red flags |
| [`compose.md`](./compose.md) | Compose-time a11y (every UI write) |
| [`audit.md`](./audit.md) | Structured audit checklist + report |
| [`project-map.md`](./project-map.md) | Discover project/DS widgets → APG patterns |
| [`roles.md`](./roles.md) | DOM `role` → APG patterns |
| [`properties.md`](./properties.md) | `aria-*` → APG patterns |

## Highlights

- Always on for UI markup/components — not audit-only
- Read Me First before any ARIA
- Stack-agnostic APG; map from **this** project’s components
- Never fetch APG example-index — skill tables are the index
- Native HTML / DS chrome first; No ARIA > Bad ARIA

## Out of scope

CSS-only with no markup change ([`authoring-css`](../authoring-css/README.md)), non-UI TypeScript, README/API-only work. React structure still uses [`authoring-react`](../authoring-react/README.md) alongside this skill.
