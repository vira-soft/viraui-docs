**When to read:** Choosing functional vs evocative motion (or rejecting bounce on dense UI).

# Animations

Two styles. Most UI is functional. Evocative is rare. Tokens: [speed.md](speed.md) + [timing.md](timing.md). Whether to animate at all: [principles.md](principles.md).

## Defaults

| Style      | Job                          | Typical tokens                                                                        |
| ---------- | ---------------------------- | ------------------------------------------------------------------------------------- |
| Functional | Orient, confirm, complete    | `--duration-instant` / `--duration-fast` + `--easing-standard` or `--easing-entrance` |
| Evocative  | Capture attention on purpose | `--duration-slow` / `--duration-slowest` + `--easing-elastic` or `--easing-wiggle`    |

| Situation                               | Style                               |
| --------------------------------------- | ----------------------------------- |
| Hover, focus, expand, menu, dialog, tab | Functional                          |
| Toast, badge-in, celebration, hero      | Evocative                           |
| Error, destructive, legal, dense data   | Functional only — no elastic/wiggle |
| Stakeholder wants “delight” on a table  | Chip + live region; skip bounce     |

## Functional (consumer CSS)

```css
/* Overlay appear — Menu / Select / Autocomplete pattern */
.popup {
  transition:
    opacity var(--duration-instant) var(--easing-entrance),
    scale var(--duration-instant) var(--easing-entrance),
    translate var(--duration-instant) var(--easing-entrance);
}

/* Indicator / disclosure — Tabs / Accordion pattern */
.indicator {
  transition:
    inset-inline-start var(--duration-fast) var(--easing-standard),
    inline-size var(--duration-fast) var(--easing-standard);
}
```

## Evocative (rare)

```css
.banner {
  transition:
    transform var(--duration-slow) var(--easing-elastic),
    opacity var(--duration-slow) var(--easing-elastic);
}

.pressable {
  transition: translate var(--easing-elastic) var(--duration-instant);
}

.pressable:active {
  translate: 0 1px;
}
```

Still pair with non-motion meaning (**viraui-design** [accessibility.md](../viraui-design/accessibility.md)).

## Gotchas

- **Tokens only** — no invented `--spring` / Framer when `--easing-elastic` exists.
- **Do not skip custom CSS** — copy the functional patterns above into consumer chrome.
- Elastic/wiggle on every card or on errors = wrong style.
- Same showy animation for enter and routine hover = wrong.
- **Do not load the whole motion folder** — this file is enough for style pick; duration/easing only if choosing tokens next.

## Validation

- Functional path uses instant/fast + standard/entrance/exit
- Evocative limited to intentional attention moments
- Dense/error/destructive UI has no elastic/wiggle
- Reduced-motion covered per [principles.md](principles.md)
