---
name: a11y
description: >-
  Use when creating, editing, refactoring, or reviewing UI — components,
  templates, HTML, JSX/TSX, Vue/Angular/Svelte markup, or interactive controls —
  and when the user asks for an accessibility audit, APG or ARIA validation,
  screen-reader or keyboard-pattern debug, or WCAG widget review. Symptoms
  include building buttons/dialogs/forms/tabs, “what aria-label”, “audit a11y”,
  “APG review”, “is this accessible”, or keyboard trap reports. Do not skip for
  ordinary UI compose.
license: MIT
metadata:
  author: equinusocio
  version: "1.2.0"
---

# Accessibility (APG)

APG a11y for **any** UI stack — compose **and** audit. Auto-apply whenever the task writes or changes UI markup/components, or runs an accessibility / APG / keyboard / screen-reader / WCAG widget review.

**Before any ARIA or custom-widget work:** read [APG Read Me First](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/) (**No ARIA is better than Bad ARIA**). Do not copy APG sample `role` / `aria-*` onto library primitives that already emit widget chrome.

## Hard contract

1. Apply this skill on **every** UI compose (components / HTML / templates / interactive controls) **and** every a11y audit / APG / WCAG widget review.
2. **No opt-out** for convenience, “generic a11y tips”, or habit.
3. **Mandatory first read** — before writing or recommending `role` / `aria-*`, fetch/read [Read Me First](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/).
4. **Consumer project guidelines** — before composing a11y-sensitive UI or recommending fixes, check whether the consumer project already documents accessibility guidelines, best practices, style guides, lint/format conventions, or similar for this work:
   - **None found** → apply this skill’s rules.
   - **Found** → do **not** silently pick. Ask with structured UI (`AskQuestion` when available; otherwise clear numbered options) which source to follow for this task: this skill, the project guidelines, or a stated mix. Wait for the answer before proceeding.
   - **Unclear or absent answer** and local project rules exist → follow the **local project rules** for that conflict.
5. **Force majeure only** — skip or bend a rule when:
   - the user explicitly overrides it for this task, or
   - following it would break the project’s established a11y pattern or fail to build.

When force majeure applies, follow the local project pattern for that conflict only; keep every other rule.

## When to load

- Creating or editing components, HTML, templates, or interactive UI (any stack)
- Compose-time naming / ARIA / keyboard questions on controls
- Accessibility audit, APG review, WCAG widget check, screen-reader or keyboard-pattern debug

## When not to load

- CSS-only / stylesheet work with no markup or control semantics change → `authoring-css` when present
- Non-UI work (API schemas, Node scripts, README-only, pure type/prop refactors with no template/DOM)

Those do not waive this skill when the same task also touches UI markup.

## Action router

| Need | Read |
| --- | --- |
| Compose UI / controls (always first: Read Me First) | [`compose.md`](compose.md) |
| Run audit and shape the report | [`audit.md`](audit.md) |
| Project / DS component → APG pattern | [`project-map.md`](project-map.md) |
| DOM `role` → APG pattern | [`roles.md`](roles.md) |
| `aria-*` → APG pattern | [`properties.md`](properties.md) |

Compose: Read Me First + [`compose.md`](compose.md). Audit: Read Me First + [`audit.md`](audit.md) + **one** mapping ref — not the whole folder upfront.

## Core rules

1. [Read Me First](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/) before ARIA / custom widgets.
2. Native HTML and project DS APIs first; ARIA only when needed.
3. Discover stack and map widgets via [`project-map.md`](project-map.md) (or [`roles.md`](roles.md) / [`properties.md`](properties.md) for unknown DOM).
4. **Never fetch** [APG example-index](https://www.w3.org/WAI/ARIA/apg/example-index/) HTML. Folder tables **are** the index.
5. Fetch only pattern URLs for widgets in scope. Open an APG `examples/` page only when the pattern page is insufficient for a keyboard question.
6. Prefer **rendered DOM** / library output over “ARIA visible in source.”
7. Separate **page** landmarks/status/focus from **widget** chrome the DS / framework owns.
8. Full audit report shape → [`audit.md`](audit.md) when the user asks for an audit — not on every compose.

## Red flags — STOP

| Excuse | Reality |
| --- | --- |
| “Skip Read Me First — simple button” | Forbidden — read it before ARIA / custom roles |
| “Fetch example-index to browse patterns” | Forbidden — use [`project-map.md`](project-map.md) / [`roles.md`](roles.md) / [`properties.md`](properties.md) |
| “Add role in source so it looks accessible” | Bad ARIA / cloak — native HTML or fulfill the role promise |
| “Skip a11y on ordinary compose” | Hard contract — UI write always loads this skill |
| “Copy APG sample onto library Tabs/Dialog” | DS / framework owns widget chrome when it already emits it |
| “Audit = list generic a11y tips” | Follow [`audit.md`](audit.md) report shape |

## Rationalization counters

- **“Source has no aria — must be broken”** → check rendered output first.
- **“More ARIA is safer”** → [Read Me First](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/) — No ARIA is better than Bad ARIA.
- **“I'll add role=button on a div real quick”** → role is a promise; use `<button>` or implement keyboard behavior.
- **“Compose doesn't need a11y skill”** → false — this skill applies on every UI write.

## Out of scope

Implementing design-system primitive internals as a library maintainer task, bootstrap/theme setup, pure CSS authoring with no markup change, inventing motion tokens.

## Alongside other skills

`authoring-react` / `authoring-css` may apply in the same task for structure and styles. Keep each skill’s hard contract (including consumer-guidelines gates). This skill owns a11y semantics for the UI surface.
