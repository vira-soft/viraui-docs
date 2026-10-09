# React components

Apply whenever creating or editing React components (shape, props, markup, handlers).

Load on demand — do **not** pull every sibling for every task:

| Concern | Read |
| --- | --- |
| DOM / imperative escapes / third-party mount | [`dom.md`](dom.md) |
| CSS imports, `className`, `dynamicStyle`, `data-*` | [`presentation.md`](presentation.md) |
| JS/TS/JSX syntax constraints | [`style.md`](style.md) |
| Folders / file placement | [`filesystem.md`](filesystem.md) |

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
- Prefer exporting the **component props type** (`BadgeProps`) over satellite types (variant unions, option aliases, etc.). Consumers take nested pieces via indexed access: `BadgeProps['variant']`.
- When a union (or other alias) appears **only once** on the props type, **inline it** — do not create a separate named type.

```tsx
// Prefer — union once; export only BadgeProps
export type BadgeProps = React.ComponentPropsWithRef<"span"> & {
  /**
   * Visual status treatment.
   * @defaultValue 'neutral'
   */
  variant?: "neutral" | "positive" | "negative";
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = "neutral",
  ...otherProps
}) => (
  <span {...otherProps} className={clsx(styles.Badge, className)} data-variant={variant}>
    {children}
  </span>
);

// Avoid — unnecessary ChipVariants alias + export
export type ChipVariants = "neutral" | "positive" | "negative";

export type BadgeProps = React.ComponentPropsWithRef<"span"> & {
  variant?: ChipVariants;
};
```

- If a separate alias is still useful inside the file (reused across several props/helpers), keep it **unexported**. Consumers reach it via the props type (`BadgeProps['variant']`), not a second public export.
- Do **not** export helper or file-internal types unless consumers need them as a first-class public API, or they are already surfaced through other exported types (composition, indexed access, `typeof`, etc.). See also type-export guidance in [`style.md`](style.md).
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

## Conditional component props

- Toggle optional React props with a **simple ternary** (or omit the prop). Passing `undefined` omits / falls back to the default — that is intentional, not “useless `undefined`”.
- Do **not** use conditional object spread onto the component. That pattern (`...(cond ? { prop: value } : {})`) is **only** for `dynamicStyle` CSS custom properties — see [`presentation.md`](presentation.md).

```tsx
// Prefer
<Surface color={zebra ? 1 : undefined} />

// Avoid — spread toggle is for dynamicStyle CSS vars only
<Surface {...(zebra ? { color: 1 as const } : {})} />
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

Folder and file placement: see [`filesystem.md`](filesystem.md). Presentation (`className` / style / `data-*`): see [`presentation.md`](presentation.md). DOM escapes: see [`dom.md`](dom.md).

## Checklist

- [ ] `const` named arrow function
- [ ] `React.FC` with props generic
- [ ] React utility types via `React.*` — no named imports (`FC`, `CSSProperties`, `ComponentPropsWithRef`, …)
- [ ] `ComponentNameProps` (export only if callers need it; no satellite union/alias exports — use `Props['prop']`)
- [ ] One-shot unions inlined on the prop; file-local aliases stay unexported
- [ ] Custom props: TSDoc + `@defaultValue` matching assigned default
- [ ] Prop types reused via indexed access / `typeof` — no redeclared copies
- [ ] Extends `React.ComponentPropsWithRef` / `React.ComponentPropsWithoutRef` of the outer wrapper when spreading
- [ ] Destructure + residual spread; spread order intentional
- [ ] Conditional component props: simple ternary (`prop={cond ? value : undefined}`), not `{...(cond ? { prop } : {})}`
- [ ] Defaults in param list when possible
- [ ] Markup: `&&` for null branch; flat ternary otherwise
- [ ] Prefer `??` where applicable
- [ ] Use configured TypeScript path aliases where applicable; otherwise recommend configuring them
- [ ] Avoid deep imports; import through the relative `index` module when available
- [ ] Prefer project tools over custom/extra scripting
- [ ] Performance considered (memo / Suspense / etc. when warranted)
- [ ] No inline callbacks in JSX — named handlers in body
- [ ] Presentation rules when touching class/style/`data-*` → [`presentation.md`](presentation.md)
- [ ] DOM / imperative rules when touching the DOM → [`dom.md`](dom.md)
