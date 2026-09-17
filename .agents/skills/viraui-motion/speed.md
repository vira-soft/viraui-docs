**When to read:** Picking `--duration-*` (or JS duration from foundation nested tokens).

# Speed

Duration = how long. Pair with [timing.md](timing.md) for easing. **Never hardcode `ms`/`s`.**

Theme scale (CSS vars on the loaded theme; same strings in preset JSON):

| Token                | Nested JSON (`duration.*`) | Use                                                        |
| -------------------- | -------------------------- | ---------------------------------------------------------- |
| `--duration-instant` | `"0.10s"`                  | Press, menu/select popup, small nudges                     |
| `--duration-fast`    | `"0.20s"`                  | Default functional: hover, disclosure, tabs, most overlays |
| `--duration-normal`  | `"0.30s"`                  | Larger overlay travel (dialog sheet)                       |
| `--duration-slow`    | `"0.60s"`                  | Evocative enter (toast)                                    |
| `--duration-slowest` | `"1.00s"`                  | Decorative loops (shimmer) only                            |

## Checklist

1. Pick by **kind** then **distance**: functional shorter than evocative; small travel → instant/fast; large travel → normal (rarely slow).
2. Exit/dismiss/collapse → **shorter** than enter.
3. Dragging → `transition-duration: 0s` (or swipe-strength var at `0`); resume tokens on release.
4. JS/WAAPI → foundation nested or computed CSS var — never invent 180/200/480.

## Defaults

| Move                           | Duration                                |
| ------------------------------ | --------------------------------------- |
| Hover / indicator / disclosure | `--duration-fast`                       |
| Press / small popup            | `--duration-instant`                    |
| Dialog sheet travel            | `--duration-normal` enter; shorter exit |
| Toast evocative                | `--duration-slow`                       |
| Shimmer loop                   | `--duration-slowest` only               |

```css
.sheet {
  transition:
    opacity var(--duration-fast) var(--easing-entrance),
    transform var(--duration-normal) var(--easing-entrance);
}

.sheet[data-ending-style] {
  transition-duration: var(--duration-instant);
  transition-timing-function: var(--easing-exit);
}

.card:hover {
  translate: 0 -0.25rem;
}

.card {
  transition: translate var(--duration-fast) var(--easing-standard);
}
```

## JS / WAAPI

Prefer CSS `transition` with `var(--duration-*)`. If JS must time:

1. Built-in preset: `@viraui/foundation/<brand>/nested` (`duration.fast`). Do not hardcode.
2. Custom theme: `getComputedStyle(el).getPropertyValue('--duration-fast')`.
3. Never invent 180 / 200 / 480.

JSON values are CSS times (`"0.20s"`), not milliseconds.

```ts
import tokens from '@viraui/foundation/vira/nested';

function cssTimeToMs(value: string) {
  const n = Number.parseFloat(value);
  return value.trim().endsWith('ms') ? n : n * 1000;
}

const fastMs = cssTimeToMs(tokens.duration.fast);
const easing = tokens.easing.standard;
```

Match the loaded CSS brand (`vira-condensed` / `sunburst` / `cinder` → that `/nested` path). Flat `@viraui/foundation/vira/json` uses `'duration-fast'`. Export map: **viraui-setup** `foundation-exports.md`.

## Gotchas

- **Tokens only** — `180ms`, `0.3s`, `transition: all 300ms ease` are failures.
- No `--duration-medium` / `250ms` — that token does not exist.
- Same duration for modal enter and exit = wrong (exits shorter).
- `--duration-slowest` on hover = wrong.
- **Do not skip custom CSS** — same table applies to consumer chrome.
- **Do not load the whole motion folder** — need easing next? Open [timing.md](timing.md) only.
- Copying numeric scales from other design systems = wrong.

## Validation

- Every duration is a `--duration-*` or `tokens.duration.*`
- Exit ≤ enter for the same surface
- Reduced-motion honored ([principles.md](principles.md))
