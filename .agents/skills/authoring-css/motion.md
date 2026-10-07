# Motion and `@property`

Apply when adding animations, transitions, or registering/animating CSS custom properties.

Core classes / nesting / shorthand: [`authoring.md`](authoring.md). Colors: [`colors.md`](colors.md).

## Rules

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

- [ ] Motion on performant props when possible
- [ ] `@property` + `*.props.css` when animating custom props
- [ ] `var()` defaults on root class (not inside `@property`)
