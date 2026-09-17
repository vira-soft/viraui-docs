---
name: authoring-css
description: >-
  Use when writing, editing, refactoring, or reviewing CSS — stylesheets, CSS
  modules, component styles, nesting, selectors, colors, gradients, OKLCH/OKLAB,
  relative colors, animations, @property, or .css/.module.css files — even if
  the user does not name this skill. Use whenever the task writes or changes
  styles. Do not skip for convenience.
license: MIT
metadata:
  author: equinusocio
  version: "1.3.0"
---

# CSS authoring

Personal conventions for CSS. Follow this skill whenever the task writes or changes styles — auto-apply from the task; no explicit user load required.

## Hard contract

1. Apply these conventions on **every** CSS change (new files, edits, refactors, reviews that produce styles).
2. **No opt-out** for convenience, “generic style”, or habit.
3. **Consumer project guidelines** — before writing, check whether the consumer project already documents guidelines, best practices, style guides, lint/format conventions, or similar for this work:
   - **None found** → apply this skill’s rules.
   - **Found** → do **not** silently pick. Ask with structured UI (`AskQuestion` when available; otherwise clear numbered options) which source to follow for this task: this skill, the project guidelines, or a stated mix. Wait for the answer before coding.
   - **Unclear or absent answer** and local project rules exist → follow the **local project rules** for that conflict.
4. **Force majeure only** — skip or bend a rule when:
   - the user explicitly overrides it for this task, or
   - following it would break the project’s established CSS pattern or fail to build.

When force majeure applies, follow the local project pattern for that conflict only; keep every other rule.

## Router

Read sibling refs **before** writing matching styles:

| When | Read |
| --- | --- |
| Creating or editing stylesheets / CSS modules / component CSS (classes, nesting, selectors, colors, gradients, motion, `@property`) | [`authoring.md`](authoring.md) |

If the task mixes concerns, read every matching ref.

## Out of scope

- React / TypeScript component structure (use the `authoring-react` skill when present).
- Preprocessor-only dialects (SCSS/Less mixins) unless converting to plain CSS.
- Utility-first frameworks (Tailwind class strings) unless authoring real CSS alongside them.

Those do not waive this skill when the same task also touches CSS.
