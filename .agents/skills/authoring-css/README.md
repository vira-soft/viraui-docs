# authoring-css

Personal conventions for **CSS**. Auto-applies when writing or changing stylesheets, CSS modules, nesting, selectors, colors, gradients, motion, or `@property`.

**Version:** 1.3.0 · **Hub:** `[SKILL.md](./SKILL.md)`

```bash
npx skills add equinusocio/skills --skill authoring-css
```

← [All skills](../../README.md)

## Example output

```css
.StatusPanel {
  padding: var(--space-300);
  border: 1px solid var(--border);
  border-radius: 8px;

  &[data-accent='true'] {
    border-color: var(--status-panel-accent, var(--color-brand));
  }
}

.Title {
  color: oklch(from var(--color-foreground) l c h);
}
```



## Contents


| File                             | Role                                                                        |
| -------------------------------- | --------------------------------------------------------------------------- |
| `[SKILL.md](./SKILL.md)`         | Hub: contract, router, out of scope                                         |
| `[authoring.md](./authoring.md)` | Classes, nesting, Baseline, colors, shorthand/longhand, motion, `@property` |




## Highlights

- PascalCase classes (`.MyClass`); root class matches component name (`.Stack` for `Stack`)
- Module children: element name only (`.Content`) as top-level siblings — no `Component_` prefix; do not nest class-in-class for DOM structure
- Native CSS nesting only for that selector’s own variants/states/media/`&` rules; modern selectors (`:has`, `:is`, `:where`, …) when useful
- Prefer Baseline / project browserslist; ask when target unclear
- Hardcoded colors: OKLCH/OKLAB (esp. gradients); derive/alpha with relative colors — no `color-mix()`
- Prefer shorthand (≤5 values); longhand only when shorthand would need >5 values; no autoprefixer-redundant prefixes
- Motion on performant props; `@property` in `*.props.css` imported from the component stylesheet



## Out of scope

React component structure (use `[authoring-react](../authoring-react/README.md)`), SCSS/Less-only dialects, Tailwind class strings alone.