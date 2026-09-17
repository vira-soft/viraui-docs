# JS / TS / React style

Apply whenever writing or editing JavaScript, TypeScript, JSX, or TSX in a React UI task. These are **authoring constraints** — follow them in the code you produce. Do not assume a specific linter is installed.

Component shape, props, and markup patterns: see [`authoring.md`](authoring.md). Folder layout: see [`filesystem.md`](filesystem.md).

## Conflicts with project syntax / lint rules

Before applying this file, check whether the consumer project already documents JS/TS/React syntax or lint conventions (ESLint, Biome, oxlint, style guides, `CONTRIBUTING`, cursor rules, etc.):

1. **None found** → follow this file.
2. **Found** → ask which source to follow (this skill, project rules, or a stated mix). Wait before coding.
3. **Unclear or absent answer** and local rules exist → **use the local project rules** for the conflict.

## Environment assumptions

- Browser + modern ES (ES2022+).
- `React` may appear as a global; still prefer an explicit React import when the file needs the namespace (see [`authoring.md`](authoring.md)).
- JSX only in `.jsx` / `.tsx` files.

## Imports

- Imports first in the file (before other statements).
- Prefer **`import type`** (or inline `type` specifier) for type-only imports; keep value imports separate.
- Prefer **`export type`** for type-only exports; allow mixed exports with inline `type` specifiers.
- **No** absolute filesystem import paths; **no** webpack loader syntax (`!`); **no** AMD; **no** self-imports; **no** dynamic `require`.
- **No** named default re-export smells (`import { default as X }`, named-as-default / named-as-default-member).
- Mutable exports forbidden (`let` / `var` export bindings).
- Extensions on import paths:
  - **omit** for `.js` / `.jsx` / `.ts` / `.tsx`
  - **keep** for `.json` / `.css` / `.pcss`
  - `.mjs`: follow package convention (`ignorePackages`)
- Default / named / namespace export style: unrestricted (no prefer-default-export / no-default-export).
- Duplicate imports / import sort / max-dependencies: not required by this skill.

```ts
import type { PanelProps } from './types'
import { helper } from './helper'
import data from './data.json'
import styles from './panel.module.css'
import './panel.css'
```

## TypeScript

- **`any` allowed** (`no-explicit-any` off) — still prefer precise types when easy.
- **Export types sparingly:** export only types the consumer needs outside the module, or types that are useful to reuse elsewhere like the main type of a component. Keep file-internal types **unexported** unless required — or unless they are already surfaced through other exported types (composition, indexed access, `typeof`, etc.).
- **No** non-null assertion (`!`). Prefer narrowing, defaults, or explicit checks.
- **No** shadowing (including nested scopes). Use `typescript/no-shadow` discipline; classic `no-shadow` is off in favor of the TS rule.
- Enum members **must** have initializers.
- Array types: **`T[]`** for simple types; **`Array<T>`** when the element type is complex (`array-simple`).
- Prefer **`Record<string, T>`** (or equivalent) over `{ [key: string]: T }` index signatures.
- Assertions: use **`as`**, not angle-bracket. Object-literal assertions only when passed as a parameter (or equivalent allow-as-parameter cases).
- Prefer **`as const`**, optional chaining, nullish coalescing, `includes`, `startsWith` / `endsWith`, `for…of`, function types over call/construct interfaces.
- Prefer **readonly** members where mutation is not needed.
- Mark promise-returning functions **`async`**; **`return await`** in async functions when returning promises; do not leave floating promises (void-as-statement and IIFE ignored).
- `switch` must be exhaustive on unions/enums.
- Ban `// @ts-ignore` / tslint comments; `// @ts-expect-error` only **with a description** (≥ 4 chars). Prefer `@ts-expect-error` over `@ts-ignore`.
- No namespaces (use ES modules); no `require` in TS; no triple-slash `path` references.
- No empty interfaces unless single-extends; no empty object type `{}` misuse; no inferrable annotations that duplicate inference.
- Class literal properties as **getters**; prefer **parameter properties** in constructors when applicable.
- Throw **`Error`** (or subclasses); `unknown` throwable allowed, bare `any` throw not.
- Avoid unsafe `any` flowing into args/assignments/calls/returns; avoid meaningless `void` operator / invalid `void` types.
- Do not `for…in` over arrays; prefer typed reduce type params; restrict `+` and template interpolation to safe types (numbers/any OK in templates).

```ts
import type { User } from './user'

const names: string[] = []
const map: Array<string | number> = []

async function load(): Promise<User> {
  return await fetchUser()
}

// avoid: value!
// avoid: // @ts-expect-error
// ok: // @ts-expect-error legacy API shape
```

## Variables, equality, control flow

- **`const` / `let` only** — no `var`. Prefer `const` when never reassigned.
- **`===` / `!==` always**; `null` may use `== null` / `!= null` (null option ignored).
- **Yoda** comparisons required (`'value' === x`).
- Curly braces for **multi-line** control statements.
- **`default` in `switch`**, or a `// no default` comment matching that pattern.
- No `else` after `return` (no `else if` exception).
- No nested ternaries; no unneeded ternaries; arrow bodies **as-needed** (no required parens return for object literals).
- No `++` / `--`; no `continue`; no bitwise ops; no multi-assign; no labels; no `with`.
- Prefer `**` over `Math.pow`; prefer operator assignment (`+=`, etc.).
- Prefer template strings over concatenation; prefer rest/spread over `arguments` / `.apply`.
- Prefer object shorthand; prefer dot-notation (keywords allowed); prefer destructuring for objects in declarations and for objects/arrays in assignments (renamed props not enforced).
- Prefer `Number.*` static methods (`Number.isNaN`, `Number.parseInt`, …) over global aliases.
- `parseInt` always with **radix**.
- Empty functions forbidden; empty blocks forbidden; no useless `return` / catch / concat / escape.
- `void` only as a **statement** (e.g. floating-promise ignore), not as an expression value.
- Params: **defaults last**; do not reassign params (or their props) except known accumulator / req / res / ctx / event-style names: `acc`, `accumulator`, `e`, `ctx`, `req`, `request`, `res`, `response`, `$scope`, `staticContext`.
- No `new` side-effect-only calls; no `new String` / `Number` / `Function` wrappers; no `Array()` constructor — use `[]`.
- `new`-cap: constructors Capitalized; `Immutable.Map` / `Set` / `List` allowed without `new`.
- Guard `for…in` with `Object.prototype.hasOwnProperty` (or equivalent); prefer `Object.hasOwn` where available and aligned with targets.
- Array callbacks must return a value when required (`allowImplicit` OK).
- Vars declared at top of scope (`vars-on-top`) when `var` legacy appears — prefer block `const`/`let` instead.
- Named function expressions preferred when a name helps (`func-names` warn).
- `alert` → warn (avoid unless intentional); `console` allowed.

```ts
if ('ready' === status) {
  return value ?? fallback
}

const next = count + 1 // not count++
const pow = 2 ** 3

for (const key in map) {
  if (Object.hasOwn(map, key)) {
    use(map[key])
  }
}
```

## Promises and async

- Reject with `Error` values (`allowEmptyReject` OK).
- Do not misuse promises in conditionals; void-return checks off (event handlers returning promises OK).
- `await` only on thenables; no floating promises (unless `void` statement / ignored IIFE).

## React and JSX

- Follow Rules of Hooks; **exhaustive-deps** on hook dependency arrays.
- No duplicate JSX props; PascalCase components (`allowAllCaps` OK).
- Boolean props: **no** `={true}` — write `<Button disabled />`.
- No unnecessary curly braces around string props/children.
- Self-closing when no children; fragments use **short syntax** `<>…</>`.
- `style` prop must be an **object** (not a string).
- No `children` prop when you can nest children; no array **index** as `key`.
- Void DOM elements (`img`, `input`, …) must not receive children.
- Buttons: set **`type`** for `button` and `submit` (`reset` not required by this rule).
- `target="_blank"` → include `rel` safety (`noopener` / enforced dynamic links).
- No string refs; no `findDOMNode`; no `isMounted`; no unknown DOM props; no unescaped entities that break JSX.
- `dangerouslySetInnerHTML` → warn / avoid unless required; never combine with children.
- Prefer ES6 classes over `createClass` if classes appear; no `this` in SFCs.
- React import in scope **not** required (modern JSX transform).
- `display-name`, `jsx-key`, props spreading: not enforced here (keys still required for correctness when rendering lists).

```tsx
<button type="button" disabled className={styles.Button} style={dynamicStyle}>
  {label}
</button>

{items.map((item) => (
  <Row key={item.id} title={item.title} />
))}
```

## Unicorn / Node protocol

- No useless `undefined` (omit it; use bare `return`, optional args, etc.).
- Prefer `node:` protocol on Node core imports when importing Node builtins (`import fs from 'node:fs'`).
- Prefer `Number.isNaN` / `Number.parseInt` / etc. (see above).

## Storybook (`.stories.tsx`)

When editing Storybook story files, these relaxations apply:

- Rules of Hooks off for story setup patterns that would otherwise violate them.
- `console` / `alert` allowed.
- Shadowing relaxations allowed in stories as needed for story locals.

## Explicitly not required

These are **off** or unrestricted — do not invent enforcement:

- `any`, magic numbers, complexity / max-lines / max-params caps
- import cycles, relative-parent bans, prefer-default-export
- `require-await`, capitalized comments, sort-keys / sort-imports
- `no-console`, `prefer-object-spread`
- React `display-name`, `jsx-key` lint rule, props spreading bans

## Checklist

- [ ] `import type` / `export type` where type-only
- [ ] Export only consumer-needed / reusable types; keep file-internal types unexported
- [ ] Import extensions: no ts/js; yes json/css/pcss
- [ ] No `!` non-null assertions; no param reassign (except allowlist)
- [ ] `===` (null `==` OK); yoda; no `else` after `return`
- [ ] No `++` / `continue` / nested ternary / `var`
- [ ] `??` / `?.` / optional chain; `**`; templates; shorthand
- [ ] Hooks: rules-of-hooks + exhaustive-deps
- [ ] JSX: boolean shorthand, self-closing, fragment syntax, `type` on button, no index keys
- [ ] Async: no floating promises; `return await` / `async` on promise fns
- [ ] Project lint conflict asked; unclear answer → local rules
