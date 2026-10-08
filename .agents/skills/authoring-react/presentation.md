# Presentation (className / style / data-*)

Apply when wiring CSS imports, outer `className`, `dynamicStyle` / CSS variables, or `data-*` attributes on React components.

Component shape / props: [`authoring.md`](authoring.md). Imperative DOM: [`dom.md`](dom.md). Full CSS conventions: `authoring-css` skill when present.

## CSS imports

- CSS modules: import as `styles`.
- Plain CSS: side-effect import (no binding).

```tsx
import styles from './my-component.module.css'

const MyComponent: React.FC = () => <div className={styles.MyClass} />
```

```tsx
import './my-component.css'

const MyComponent: React.FC = () => <div className="MyComponent" />
```

## className on the outer wrapper

- If the outermost wrapper gets a CSS class: destructure `className` from props and apply it on that element.
- If the project has a class-merge utility (`clsx`, `cn`, etc.), use it. Otherwise **do not** destructure `className` — let it pass through the spread.

```tsx
const MyComponent: React.FC<MyComponentProps> = ({
  className,
  ...otherProps
}) => <div className={clsx(styles.MyComponent, className)} {...otherProps} />
```

## Dynamic `style` and custom attributes

- Prefer controlling CSS via **custom HTML attributes** (`data-*`) and **`dynamicStyle`**.
- When the component manipulates `style`: destructure it from props, build `dynamicStyle` as `React.CSSProperties`, pass it to the element.
- **Never** put raw CSS properties (e.g. `color`, `padding`, `margin`, `transform`) in `dynamicStyle` or other dynamic inline styles — always set **CSS custom properties** (`--*`) and consume them in CSS with `var()`.
- Decide `useMemo` (or not) when inline style identity would cause excess re-renders.
- Place `...style` first or last deliberately (defaults vs consumer overwrite).

```tsx
const MyComponent: React.FC<MyComponentProps> = ({
  style,
  amount,
  full,
  ...otherProps
}) => {
  const dynamicStyle: React.CSSProperties = {
    ...style,
    ...(amount && !full && { '--vui-bleed-amount': `var(--space-${amount})` }),
    // or ...style at the end to allow consumer overwrite
  }

  // [data-prop] is then used in css to customize style
  return <div style={dynamicStyle} data-prop={prop1} {...otherProps} />
}
```

## `data-*` attribute values

- Custom HTML attributes (`data-*`) always receive the strings **`"true"`** or **`"false"`**.
- Do **not** toggle attribute presence with booleans (`<div {...(bool && { "data-prop": bool })} />`).

```tsx
// data-prop becomes [data-prop="true"] or [data-prop="false"].
<div style={dynamicStyle} data-prop={prop1} {...otherProps} />
```

## Checklist

- [ ] CSS modules → `styles` import; plain CSS → side-effect import
- [ ] Outer wrapper `className`: merge with project util, else leave on spread
- [ ] Prefer `data-*` + `dynamicStyle: React.CSSProperties` (+ memo when needed); `dynamicStyle` sets only `--*` custom props, never raw CSS properties
- [ ] `data-*` values are `"true"` / `"false"` strings, not booleans
