**When to read:** Running a structured APG audit or shaping the audit report for a ViraUI screen.

# APG audit

Audit only. Compose rules and “what aria for this control?” live in **viraui-design** [accessibility.md](../viraui-design/accessibility.md). Overlay part trees: [composition.md](../viraui-design/composition.md).

## Checklist

1. Inventory interactive widgets, landmarks, and names (source **and** rendered DOM).
2. Map each Vira widget via [vira-map.md](vira-map.md). Unmapped DOM `role` → [roles.md](roles.md). Unmapped `aria-*` → [properties.md](properties.md).
3. Fetch **only** those pattern URLs. Skip patterns with no widget in scope.
4. Per pattern: keyboard, roles/states, naming, focus. Compare to guide `accessibility` / `baseUIApi` — treat primitive-owned chrome as already present.
5. Page-level still required: landmarks, heading outline, names on icon-only controls, live status → **viraui-design** [accessibility.md](../viraui-design/accessibility.md).
6. Report with the shape below. Fixes → **viraui-design** (no duplicate widget ARIA).

## Defaults

| Choice                     | Default                                                       |
| -------------------------- | ------------------------------------------------------------- |
| Mapping entry              | [vira-map.md](vira-map.md) for Vira components                |
| Unknown DOM                | [roles.md](roles.md) / [properties.md](properties.md)         |
| APG fetch                  | Pattern page only; `examples/` only for a concrete keyboard Q |
| Missing ARIA in JSX source | Inspect rendered DOM first                                    |
| Widget chrome fail         | Fix via guide / props — do not stamp APG sample attrs         |

## Gotchas

- **Never fetch** the [APG example-index](https://www.w3.org/WAI/ARIA/apg/example-index/) HTML. Folder tables **are** the index.
- Do **not** copy APG sample `role` / `aria-*` onto Vira parts — Base UI already emits widget chrome.
- Prefer [vira-map.md](vira-map.md) over inventing a pattern from a raw `role`.
- “No aria in source” ≠ broken — inspect rendered output.
- Separate **page** landmarks/status/focus from **widget** behavior Vira/Base UI owns.
- Custom CSS motion found during audit → **viraui-motion** (do not invent ms/easing here).

## Validation

Stop when any of these is true:

- Example-index was fetched or browsed
- Report recommends adding `role` / `aria-*` that Base UI already emits
- Audit mixed with ordinary compose without an audit ask or design→a11y route
- Fixes invent widget ARIA instead of guide + `baseUIApi`

## Report

```md
## APG audit

Scope: <files or screen>
Patterns fetched: <url list>

| Widget        | APG          | Result            | Note       |
| ------------- | ------------ | ----------------- | ---------- |
| <Vira or DOM> | <pattern id> | pass / fail / n/a | <one line> |

Page: <landmarks / headings / names — pass or gaps>
Do not add: widget `role`/`aria-*` Base UI already emits
```

`n/a` = no APG pattern, or Vira has no primitive (consumer page semantics only).
