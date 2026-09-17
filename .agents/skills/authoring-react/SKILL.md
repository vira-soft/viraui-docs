---
name: authoring-react
description: >-
  Use when creating, editing, refactoring, or reviewing React or TypeScript UI
  code — components, hooks, JSX/TSX, props types, or .tsx/.jsx files — even if
  the user does not name this skill. Use whenever the task writes or changes
  React/TypeScript for the UI. Do not skip for convenience.
license: MIT
metadata:
  author: equinusocio
  version: "1.5.1"
---

# React + TypeScript authoring

Personal conventions for React and TypeScript UI code. Follow this skill whenever the task writes or changes that code — auto-apply from the task; no explicit user load required.

## Hard contract

1. Apply these conventions on **every** React/TypeScript UI change (new files, edits, refactors, reviews that produce code).
2. **No opt-out** for convenience, “generic style”, or habit.
3. **Consumer project guidelines** — before writing, check whether the consumer project already documents guidelines, best practices, style guides, lint/format conventions, or similar for this work:
   - **None found** → apply this skill’s rules.
   - **Found** → do **not** silently pick. Ask with structured UI (`AskQuestion` when available; otherwise clear numbered options) which source to follow for this task: this skill, the project guidelines, or a stated mix. Wait for the answer before coding.
   - **Unclear or absent answer** and local project rules exist → follow the **local project rules** for that conflict.
4. **Force majeure only** — skip or bend a rule when:
   - the user explicitly overrides it for this task, or
   - following it would break the project’s established import/type pattern or fail to compile.

When force majeure applies, follow the local project pattern for that conflict only; keep every other rule.

## Router

Read sibling refs **before** writing matching code:

| When | Read |
| --- | --- |
| Creating or editing React components (JSX/TSX, props, wrappers) | [`authoring.md`](authoring.md) |
| Writing or editing JS/TS/JSX/TSX — syntax, imports, types, hooks, JSX lint-style constraints | [`style.md`](style.md) |
| Scaffolding or moving folders/files — components, hooks, libs, utils, providers (`index.ts`, kebab folders, `.ts` vs `.tsx`) | [`filesystem.md`](filesystem.md) |

If the task mixes concerns, read every matching ref.

## Out of scope

- Non-React TypeScript (Node scripts, server-only modules with no UI).
- CSS/styling authoring (use the `authoring-css` skill when present).
- Non-React frameworks (Vue, Angular, Svelte templates).

Those do not waive this skill when the same task also touches React/TSX.
