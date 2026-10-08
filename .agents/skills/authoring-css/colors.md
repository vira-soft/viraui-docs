# Colors

Apply when writing hardcoded colors, gradients, alpha/derivation from tokens or literals, or choosing OKLCH/OKLAB vs `color-mix()`.

Core classes / nesting / shorthand: [`authoring.md`](authoring.md). Motion / `@property`: [`motion.md`](motion.md).

## Rules

- Prefer design tokens (`var(--…)`) when they exist.
- When inserting **hardcoded** colors (not tokens), prefer HDR formats **OKLCH** and **OKLAB** — especially for **gradients** (better interpolation).
- When deriving colors or changing transparency from a variable or a hardcoded color: **do not** use `color-mix()`; use **relative colors**. Use color-mix() only to create new color from the combination of two colors.

```css
color: oklch(from var(--my-color) l calc(c + 0.2) h / 20%);
```

## Checklist

- [ ] Prefer tokens when they exist
- [ ] Hardcoded colors: OKLCH/OKLAB (esp. gradients)
- [ ] Derive/alpha via relative colors — no `color-mix()` for that job
