# CSS authoring

Apply whenever creating or editing stylesheets, CSS modules, or component styles.

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

## Colors

- Prefer design tokens (`var(--…)`) when they exist.
- When inserting **hardcoded** colors (not tokens), prefer HDR formats **OKLCH** and **OKLAB** — especially for **gradients** (better interpolation).
- When deriving colors or changing transparency from a variable or a hardcoded color: **do not** use `color-mix()`; use **relative colors**. Use color-mix() only to create new color from the combination of two colors.

```css
color: oklch(from var(--my-color) l calc(c + 0.2) h / 20%);
```

## Motion and `@property`

- Prefer animations and transitions on **performant** properties (`transform` and similar compositor-friendly props) when there is an alternative to `opacity` / `filter`.
- Prefer **`@property`** to animate custom-property values.
- When a component needs `@property` registrations: create **`my-component.props.css`** beside the component (kebab name matching the component file), register the props there, and **import** that file from the component’s `.css` / `.module.css`.
- Defaults that **cannot** be set inside `@property` (e.g. `var(...)`) go on the component **root** class.

```css
/* accent-badge.props.css */
@property --accent-angle {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}
```

```css
/* accent-badge.module.css */
@import "./accent-badge.props.css";

.AccentBadge {
  --accent-color: var(--color-brand);
}
```

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
- [ ] Hardcoded colors: OKLCH/OKLAB (esp. gradients); derive/alpha via relative colors — no `color-mix()`
- [ ] Motion on performant props when possible; `@property` + `*.props.css` when animating custom props; `var()` defaults on root class
