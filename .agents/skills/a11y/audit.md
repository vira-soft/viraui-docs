**When to read:** Running a structured APG audit or shaping the audit report for any UI screen.

# APG audit

Structured audit when the user asks for audit / APG / WCAG widget / keyboard / screen-reader review. Ordinary compose without an audit ask → [`compose.md`](compose.md) (still load this skill).

## First step (mandatory)

Read [APG Read Me First](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/) (**No ARIA is better than Bad ARIA**) before fetching patterns or recommending ARIA fixes.

## Checklist

1. Read [Read Me First](https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/).
2. Inventory interactive widgets, landmarks, and names (source **and** rendered DOM).
3. Map each project / DS widget via [`project-map.md`](project-map.md). Unmapped DOM `role` → [`roles.md`](roles.md). Unmapped `aria-*` → [`properties.md`](properties.md).
4. Fetch **only** those pattern URLs. Skip patterns with no widget in scope.
5. Per pattern: keyboard, roles/states, naming, focus. Compare to rendered DOM — treat library/framework-owned chrome as already present when the DOM shows it.
6. Page-level still required: landmarks, heading outline, names on icon-only controls, live status.
7. Report with the shape below. Fixes → project DS / framework API + page semantics (no duplicate widget ARIA).

## Defaults

| Choice | Default |
| --- | --- |
| Mapping entry | [`project-map.md`](project-map.md) for project / DS components |
| Unknown DOM | [`roles.md`](roles.md) / [`properties.md`](properties.md) |
| APG fetch | Pattern page only; `examples/` only for a concrete keyboard Q |
| Missing ARIA in source | Inspect rendered DOM first |
| Widget chrome fail | Fix via project props / API — do not stamp APG sample attrs |

## Gotchas

- **Never fetch** the [APG example-index](https://www.w3.org/WAI/ARIA/apg/example-index/) HTML. Folder tables **are** the index.
- Do **not** copy APG sample `role` / `aria-*` onto primitives that already emit widget chrome (native HTML, CDK, Radix, Base UI, Material, bits-ui, etc.).
- Prefer [`project-map.md`](project-map.md) over inventing a pattern from a raw `role` when the widget is a known project component.
- “No aria in source” ≠ broken — inspect rendered output.
- Separate **page** landmarks/status/focus from **widget** behavior the library owns.
- Stack-agnostic: Angular / Vue / React / Svelte / plain HTML — same APG rules; only the mapping source changes.

## Validation

Stop when any of these is true:

- Read Me First was skipped
- Example-index was fetched or browsed
- Report recommends adding `role` / `aria-*` that the library already emits
- Fixes invent widget ARIA instead of project API + page semantics

## Report

```md
## APG audit

Scope: <files or screen>
Patterns fetched: <url list>

| Widget        | APG          | Result            | Note       |
| ------------- | ------------ | ----------------- | ---------- |
| <project/DOM> | <pattern id> | pass / fail / n/a | <one line> |

Page: <landmarks / headings / names — pass or gaps>
Do not add: widget `role`/`aria-*` the library already emits
```

`n/a` = no APG pattern, or layout/decorative/page-only semantics.
