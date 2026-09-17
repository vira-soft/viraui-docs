# React components

Apply whenever creating or editing React components.

## Shape

- Components are always **named `const` arrow functions** (export named or not as needed).

```tsx
const MyComponent = () => (
  // ...
)

export const MyComponent = () => {
  // ...
}
```

- Every component is typed with **`React.FC<>`** when they have props, with props passed to the generic. Otherwise just `React.FC`.

```tsx
import React from 'react'

const MyComponent: React.FC<MyComponentProps> = () => (
  // ...
)
```

## React utility types

- Prefer the **`React.`** namespace for React utility types — `React.FC`, `React.ComponentPropsWithRef`, `React.ComponentPropsWithoutRef`, `React.CSSProperties`, etc.
- Use a single React import (`import React from 'react'` or `import * as React from 'react'`, matching the project). **Do not** named-import those utilities from `'react'` (avoids import clutter).

```tsx
// Prefer
import React from 'react'
const dynamicStyle: React.CSSProperties = {}

// Avoid
import type { CSSProperties, FC, ComponentPropsWithRef } from 'react'
```

## Props type

- Every component has a **`ComponentNameProps`** type. Export it when callers need it outside the module (reuse, inference, wrapping). Otherwise leave it unexported.
- Do **not** export helper or file-internal types unless consumers need them, or they are already surfaced through other exported types (composition, indexed access, `typeof`, etc.). See also type-export guidance in [`style.md`](style.md).
- Prefer props that **extend the HTML (or component) props of the outermost wrapper** — the element/component that receives the props spread.
- Use **`React.ComponentPropsWithRef`** / **`React.ComponentPropsWithoutRef`** as appropriate. In React 19, **`ref` is a normal prop** (no `forwardRef` required for that reason alone).
- Props must always have a TSDoc comment that describes them and an `@defaultValue` marker with the default value assigned to the prop
- When a prop’s type must be inferred from another type or inherited, do not redeclare it — use the original type if you have access. Example:

```tsx
export type MyComponentProps = {
  padding?: StackProps["padding"];
}
```

Or inherit it from the component itself using `typeof`

```tsx
export type MyComponentProps = React.ComponentPropsWithRef<'div'> & {
  /**
   * Panel title shown in the header.
   * @defaultValue 'Panel'
   */
  title?: string
}

export type MyComponentProps = React.ComponentPropsWithRef<typeof OtherComponent> & {
  /**
   * Accent highlight on the card.
   * @defaultValue false
   */
  accent?: boolean
}
```

Use `React.ComponentPropsWithoutRef` when the wrapper must not accept `ref`.

## Destructuring and spread

- Destructure props. Prefer spreading the rest onto the wrapper for props not handled directly.
- Place the spread so it either **preserves defaults** or **lets callers override** — choose deliberately.

```tsx
type MyComponentProps = {
  prop1: string
  prop2?: string
}

const MyComponent: React.FC<MyComponentProps> = ({
  prop1,
  ...otherProps
}) => <div data-prop={prop1} {...otherProps} />
```

## Default values

- Prefer **default values in the parameter list** (including when combined with spread):

```tsx
type MyComponentProps = {
  prop1?: string
  prop2?: string
}

const MyComponent: React.FC<MyComponentProps> = ({
  prop1 = 'default',
  ...otherProps
}) => <div data-prop={prop1} {...otherProps} />
```

## Markup branching

- Prefer **`&&`** when a branch returns `null` (render nothing).
- Prefer a **ternary** when both branches render something — **never nest** ternaries.

```tsx
return (
  <div>
    {condition && <p />}
    {condition2 ? <p /> : <figure />}
  </div>
)
```

## Nullish coalescing

- Prefer **nullish coalescing** (`??`) where possible.

```tsx
const myConst = condition ?? condition2
```

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

For styling conventions, use the `authoring-css` skill when present. For JS/TS/JSX syntax and lint-style constraints, see [`style.md`](style.md).

## TypeScript path aliases and imports

- When TypeScript path aliases are configured in the project, always use them where applicable.
- When no TypeScript path aliases are configured, recommend that the user configures them.
- Never use deep imports when an exported relative `index` module is available; import from that index instead.

## Prefer project tools

- Avoid custom code or excessive scripting when project tools already cover the need and can shrink the code.

## Performance

- Keep React code performant for re-renders, loading, and data fetching.
- Evaluate when to use `useMemo`, `useCallback`, `React.memo`, `useOptimistic`, `Suspense`, and similar — apply them when they reduce real cost, not by default everywhere. Prioritize performant UX (reactiveness) and optimistic loadings.

## Event handlers

- Never write callback functions inline in the markup.
- Declare them in the component body as **named arrow functions** with relevant memoizing and deps when necessary.

```tsx
const MyComponent: React.FC<MyComponentProps> = ({
  prop1 = 'default',
  ...otherProps
}) => {
  const handleClick = () => {}

  return <div onClick={handleClick} {...otherProps} />
}
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

Folder and file placement: see [`filesystem.md`](filesystem.md).

## Checklist

- [ ] `const` named arrow function
- [ ] `React.FC` with props generic
- [ ] React utility types via `React.*` — no named imports (`FC`, `CSSProperties`, `ComponentPropsWithRef`, …)
- [ ] `ComponentNameProps` (export only if callers need it; no unused internal type exports)
- [ ] Custom props: TSDoc + `@defaultValue` matching assigned default
- [ ] Prop types reused via indexed access / `typeof` — no redeclared copies
- [ ] Extends `React.ComponentPropsWithRef` / `React.ComponentPropsWithoutRef` of the outer wrapper when spreading
- [ ] Destructure + residual spread; spread order intentional
- [ ] Defaults in param list when possible
- [ ] Markup: `&&` for null branch; flat ternary otherwise
- [ ] Prefer `??` where applicable
- [ ] CSS modules → `styles` import; plain CSS → side-effect import
- [ ] Use configured TypeScript path aliases where applicable; otherwise recommend configuring them
- [ ] Avoid deep imports; import through the relative `index` module when available
- [ ] Outer wrapper `className`: merge with project util, else leave on spread
- [ ] Prefer project tools over custom/extra scripting
- [ ] Performance considered (memo / Suspense / etc. when warranted)
- [ ] No inline callbacks in JSX — named handlers in body
- [ ] Prefer `data-*` + `dynamicStyle: React.CSSProperties` (+ memo when needed); `dynamicStyle` sets only `--*` custom props, never raw CSS properties
- [ ] `data-*` values are `"true"` / `"false"` strings, not booleans
