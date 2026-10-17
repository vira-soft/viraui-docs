**When to read:** Deciding whether to animate, skip, or honor `prefers-reduced-motion` on a composed screen.

# Principles

Motion supports the task. Same tokens for `@viraui/react` **and** custom consumer CSS. Load from **viraui-design** compose — hub + **one** motion ref, not the whole folder.

## Checklist

Before any animation:

| Check      | Fail = skip or simplify                     |
| ---------- | ------------------------------------------- |
| Purpose    | Necessary, or decoration?                   |
| Value      | Helps orientation, feedback, or continuity? |
| Efficiency | Stalls the task or hurts performance?       |

Then:

1. Functional hover/press/focus/expand/overlay → animate with tokens unless reduced-motion.
2. Pair motion with text, chip, focus, or `aria-*` — never meaning by motion alone (see **viraui-design** [accessibility.md](../viraui-design/accessibility.md)).
3. Every authored animation includes a reduced-motion path (or relies on preflight kill — see below).

## Defaults

| Situation                         | Default                                                                            |
| --------------------------------- | ---------------------------------------------------------------------------------- |
| Hover, press, expand, overlay     | Functional tokens (`--duration-fast` / instant)                                    |
| Toast / celebration               | Evocative — [animations.md](animations.md)                                         |
| Error, destructive, dense data    | Functional only — no elastic/wiggle                                                |
| Custom sidebar / card / table CSS | Same contract as Vira components                                                   |
| Duration / easing                 | `--duration-*` / `--easing-*` only — [speed.md](speed.md) / [timing.md](timing.md) |

## Reduced motion

Preflight kills motion globally on `*` with `animation: none !important` and `transition: none !important` so it beats later layers. Component CSS needs extra reduced-motion rules only when behavior must change beyond killing motion (instant final opacity/transform, hide decorative effects).

```css
/* Preflight already kills transition/animation — add only when final state must change */
@media (prefers-reduced-motion: reduce) {
  .overlay[data-starting-style],
  .overlay[data-ending-style] {
    opacity: 1;
    transform: none;
  }
}
```

JS motion (count-up, typewriter): `matchMedia('(prefers-reduced-motion: reduce)')` → jump to final state.

Vestibular-safe: pointer-drag 1:1 (`transition-duration: 0s` while dragging); no exaggerated z-depth; prefer fade over slide when unsure; no autoplay without controls; no blink/flash; no multi-axis chaos.

## Gotchas

- **Tokens only** — no raw `ms`, `ease`, Framer/GSAP for standard UI feedback.
- **`prefers-reduced-motion` is non-negotiable** — preflight covers kill; still handle JS and final-state overrides.
- **Do not skip custom CSS** — “Vira already animates” is not an exemption for consumer chrome.
- **Do not load the whole motion folder** — hub router → one sibling ref.
- Instant show/hide is still a motion choice; expand/collapse gets functional tokens unless reduced-motion.
- Elastic/wiggle = brand personality on press/toast — not errors or data tables.

## Validation

Stop if:

- Hardcoded `200ms` / `ease-in-out` / invented `--spring`
- Custom CSS left unanimated “for later” while Vira parts move
- Motion is the only “saved” / “new” signal
- All four motion refs loaded “to be safe”
