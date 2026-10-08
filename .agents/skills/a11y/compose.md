**When to read:** Writing or editing UI — components, templates, HTML, markup, interactive controls — including compose-time “what aria for this?”.

# Compose a11y

Apply on **every** UI write. Structured audit report → [`audit.md`](audit.md) only when the user asks for an audit / APG review.

## First step (mandatory)

**Before** adding `role` / `aria-*`, inventing custom widgets, or recommending ARIA fixes, read:

[APG Read Me First](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/)

Internalize especially:

- **No ARIA is better than Bad ARIA**
- **A role is a promise** (keyboard + behavior must match the role)
- ARIA can **cloak** native semantics — do not override without intent

Do **not** skip this page because the task “looks simple.”

## Checklist

1. Read [Read Me First](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/).
2. Prefer **native HTML** semantics (`button`, `a`, `input`, `dialog`, `details`, landmarks, headings, labels) over ARIA.
3. Prefer **project / DS primitives** that already emit correct chrome over hand-rolled `role` / `aria-*`.
4. If building a custom interactive widget: map kind via [`project-map.md`](project-map.md); fetch that **pattern** page only when behavior is unclear — never the [example-index](https://www.w3.org/WAI/ARIA/apg/example-index/).
5. Name every interactive control (visible text, `<label>`, or `aria-label` / `aria-labelledby` when icon-only).
6. Page chrome: landmarks, heading outline, focus order, live status when content updates asynchronously.
7. Omit duplicate attrs the library already emits — inspect expected rendered output / DS docs.

## Defaults

| Choice | Default |
| --- | --- |
| Semantics | Native HTML first |
| Custom widget | Project DS API → else APG pattern for that kind |
| Extra ARIA | Omit unless required (No ARIA > Bad ARIA) |
| `role` on native control | Avoid — cloaks semantics |
| Icon-only control | Accessible name required |
| APG browse | Pattern URL only — never example-index |

## Gotchas

- Copying APG sample markup into a DS that already owns chrome = Bad ARIA / dup.
- `role="button"` on a `<div>` without Enter/Space (+ expected behaviors) breaks the role promise.
- `aria-label` that replaces visible text can cloak — use only when needed.
- Layout / decorative wrappers are not widgets — do not force Accordion/Tabs patterns onto them.
- CSS-only tasks without markup changes → out of scope for this skill.

## Validation

Stop when any of these is true:

- Wrote or recommended ARIA without reading Read Me First
- Added `role` / `aria-*` “just in case”
- Copied APG example attrs onto library-owned chrome
- Fetched or browsed the example-index
