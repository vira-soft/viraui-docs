# CSS authoring

Apply whenever creating or editing stylesheets, CSS modules, or component styles (classes, nesting, Baseline, shorthand).

Load on demand — do **not** pull every sibling for every task:

| Concern | Read |
| --- | --- |
| Hardcoded colors, gradients, relative colors / alpha | [`colors.md`](colors.md) |
| Animations, transitions, `@property`, `*.props.css` | [`motion.md`](motion.md) |

## Class names

- Every class selector uses **PascalCase** in the form `.MyClass`.

```css
.MyClass {
  /* ... */
}
```

- Outermost wrapper of a component: if it has a class, that class **matches the component name**.

Example: `stack.tsx` (`const Stack = () => {}`) → root class `.Stack`.

```css
.Stack {
  /* ... */
}
```

- CSS modules: **do not** prefix child classes with the component name (e.g. `.Stack_Content`). Name the element only. Keep first-level class selectors as **siblings** — do **not** nest one class inside another just because the DOM nests:

```css
.Stack {
  /* ... */
}

.Content {
  /* ... */
}
```

## Modern CSS and targets

- Prefer **modern CSS** and syntax that matches **Baseline** (last 2 evergreen browser versions) or the project’s **browserslist**.
- When target is unclear: **ask — do not assume**.
- Prefer modern selectors where they help: `:has()`, `:where()`, `:is()`, etc.

## Nesting

- Always use **native CSS nesting**. Prefer `&` when the nested rule targets the parent selector.
- Nest **only** rules that belong to that same selector: attribute variants, pseudo-classes/states, `:has` / `:is` / `:where` chains, `@media` / `@supports`, and other parent-relative selectors.
- Do **not** nest other first-level class selectors inside a class block. DOM nesting ≠ CSS nesting. Even if `.Content` is inside `.IntroSection` in JSX, keep both as top-level siblings.

```css
.IntroSection {
  &[data-attr="true"] {}

  @media (min-width: 30em) {}

  &:where(:active, :focus-within) {}
}

.Content {
  &:hover {}

  &:has(...):hover {}
}
```

- Parent-influenced child styling stays on the **child** block with a trailing `&` when needed:

```css
.Content {
  color: red;

  &:disabled {
    color: blue;
  }

  .MyComponentClass[data-attr="true"] & {
    color: cyan;
  }
}
```

## Vendor prefixes

- Do **not** write vendor prefixes except for properties autoprefixer cannot cover (e.g. certain `user-select` cases).

## Longhand vs shorthand

- Prefer **shorthand** for compact declarations with **≤5 values** — e.g. `inset: 0`, `border`, `margin`, `padding`, simple `border-radius`.
- Prefer **longhand** only when the equivalent shorthand would need **more than 5 values** (e.g. elliptical `border-radius` with 8 values → corner longhands; multi-field `animation` → `animation-*`).
- Do **not** expand simple shorthands into longhand for “consistency”.

```css
.Card {
  inset: 0;
  border: 1px solid var(--border);
  border-radius: 8px;
}

/* 8-value radius → longhand, not one giant shorthand */
.Blob {
  border-top-left-radius: 10px 5px;
  border-top-right-radius: 20px 10px;
  border-bottom-right-radius: 30px 15px;
  border-bottom-left-radius: 40px 20px;
}
```

## Avoid useless resets

- Do **not** add useless declarations such as `min-inline-size: 0` or `min-block-size: 0` unless they serve a real purpose. Agents tend to sprinkle them everywhere — skip that habit.

Colors: [`colors.md`](colors.md). Motion / `@property`: [`motion.md`](motion.md).

## Checklist

- [ ] Classes `.PascalCase` (`.MyClass`)
- [ ] Root class matches component name (`.Stack` for `Stack`)
- [ ] Module children: element name only (`.Content`) as top-level sibling — no `Component_` prefix; do not nest class-in-class for DOM structure
- [ ] Modern CSS / Baseline or project browserslist; ask when unsure
- [ ] Modern selectors (`:has`, `:is`, `:where`, …) when useful
- [ ] Native nesting always — only for that selector’s own variants/states/media/`&` rules, not other first-level classes
- [ ] No prefixes autoprefixer can add
- [ ] Shorthand for ≤5 values; longhand when shorthand would need >5 values
- [ ] No useless `min-*-size: 0`
- [ ] Color rules when touching colors/gradients → [`colors.md`](colors.md)
- [ ] Motion / `@property` rules when animating → [`motion.md`](motion.md)
