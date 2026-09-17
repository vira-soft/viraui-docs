**When to read:** Picking `--easing-*` (or JS easing from foundation nested tokens).

# Timing

Easing = speed over the duration. **Never invent curves.** Durations: [speed.md](speed.md).

| Token               | Kind         | When                                                              |
| ------------------- | ------------ | ----------------------------------------------------------------- |
| `--easing-standard` | cubic-bezier | Default state change: hover, indicator, accordion, position       |
| `--easing-entrance` | cubic-bezier | Incoming: modal, popover, menu, toast-in, user-triggered reveal   |
| `--easing-exit`     | cubic-bezier | Leaving: dismiss, collapse, close — pairs with a shorter duration |
| `--easing-elastic`  | `linear()`   | Playful overshoot: press, toast. Not errors or data tables        |
| `--easing-wiggle`   | `linear()`   | Attention wiggle. Rare. Never looping on content                  |

Do not paste `linear()` stop lists into app CSS. Call the var. Theme CSS already has the graphs.

## Checklist

1. Default state change → `--easing-standard`.
2. Incoming surface → `--easing-entrance`; leaving → `--easing-exit` + shorter duration.
3. Playful press/toast only → `--easing-elastic` / `--easing-wiggle`.
4. JS that must time → `tokens.easing.*` from `@viraui/foundation/<brand>/nested` (see [speed.md](speed.md)).

## Defaults

```css
.indicator {
  transition: inline-size var(--duration-fast) var(--easing-standard);
}

.popup {
  transition:
    opacity var(--duration-instant) var(--easing-entrance),
    transform var(--duration-instant) var(--easing-entrance);
}

.popup[data-ending-style] {
  transition-timing-function: var(--easing-exit);
  transition-duration: var(--duration-instant);
}

.pressable {
  transition: translate var(--easing-elastic) var(--duration-instant);
}
```

CSS is enough for UI enter/exit/hover. Do not add Framer Motion or GSAP for standard feedback.

## Gotchas

- **Tokens only** — no `ease`, `ease-in-out`, homemade `cubic-bezier`, or invented `--spring`.
- Entrance curve on a dismiss = wrong; use `--easing-exit`.
- Elastic on validation errors or dense tables = wrong ([animations.md](animations.md)).
- “CSS cannot do physics” → `--easing-elastic` already does; no JS spring runtime for that.
- **Do not skip custom CSS** — same easing table for consumer chrome.
- **Do not load the whole motion folder** — this file + [speed.md](speed.md) when both needed; skip [animations.md](animations.md) if style already chosen.
- **`prefers-reduced-motion`** still required ([principles.md](principles.md)).

## Validation

- Every easing is a `--easing-*` or `tokens.easing.*`
- Exit uses `--easing-exit` (not entrance)
- No elastic/wiggle on error/destructive/dense data
