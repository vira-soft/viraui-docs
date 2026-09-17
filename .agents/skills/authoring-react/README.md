# authoring-react

Personal conventions for **React + TypeScript UI**. Auto-applies when creating, editing, refactoring, or reviewing components, hooks, JSX/TSX, or props.

**Version:** 1.5.0 · **Hub:** [`SKILL.md`](./SKILL.md)

```bash
npx skills add equinusocio/skills --skill authoring-react
```

← [All skills](../../README.md)

## Conflict with project guidelines

Auto-apply = skill matches the task. In a repo that **already** documents React conventions, agent asks before writing (does not silently override).

**Task:** “Add a `Panel` component”

| Source | Rule |
| --- | --- |
| **Project** (`CONTRIBUTING.md` / `.cursor/rules`) | `export default function` components; `import { FC } from 'react'` |
| **This skill** | Named `const` + `React.FC`; `React.*` utility types — no named imports from `'react'` |

**Agent asks** (AskQuestion or numbered options): (1) this skill · (2) project guidelines · (3) mix you specify — then waits.

No project React guide → this skill applies with no question. Full contract: [root README](../../README.md#shared-hard-contract).

## Example output

```tsx
import React from 'react'
import { Stack, Text } from '@vira-ui/react'
import clsx from 'clsx'
import styles from './status-panel.module.css'

export type StatusPanelProps = React.ComponentPropsWithRef<typeof Stack> & {
  /** Emphasize the panel. @defaultValue false */
  accent?: boolean
}

export const StatusPanel: React.FC<StatusPanelProps> = ({
  accent = false,
  className,
  style,
  children,
  ...otherProps
}) => {
  const dynamicStyle: React.CSSProperties = {
    ...style,
    ...(accent && { '--status-panel-accent': 'var(--color-brand)' }),
  }

  return (
    <Stack
      className={clsx(styles.StatusPanel, className)}
      style={dynamicStyle}
      data-accent={accent ? 'true' : 'false'}
      gap="space-200"
      {...otherProps}
    >
      <Text className={styles.Title}>Status</Text>
      {children}
    </Stack>
  )
}
```

## Contents

| File | Role |
| --- | --- |
| [`SKILL.md`](./SKILL.md) | Hub: contract, router, out of scope |
| [`authoring.md`](./authoring.md) | Component shape, props, markup, handlers, `className` / `style` / `data-*` |
| [`style.md`](./style.md) | JS/TS/React syntax + lint-style authoring constraints |
| [`filesystem.md`](./filesystem.md) | Component folders first; hooks/libs/utils same spirit — `.tsx` only when JSX |

## Highlights

- Named `const` arrow components typed with `React.FC`
- Utility types via `React.*` (`React.ComponentPropsWithRef`, `React.CSSProperties`, …) — no named imports from `'react'`
- Defaults in the parameter list; named handlers (no inline JSX callbacks)
- CSS modules → `styles` import; plain CSS → side-effect import
- Prefer `data-*` (`"true"` / `"false"` strings) + `dynamicStyle: React.CSSProperties`
- Folder: `/my-component` with `index.ts`, `my-component.tsx`, optional module CSS and subcomponents; hooks/libs use `.ts` when no JSX
- `style.md`: `import type`, export only consumer/reusable types, no `!`, exhaustive-deps, JSX/TS constraints; project lint conflict → ask; unclear answer → local rules

## Out of scope

Non-UI TypeScript, Vue/Angular/Svelte, CSS conventions (use [`authoring-css`](../authoring-css/README.md)).
