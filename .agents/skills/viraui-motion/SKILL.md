---
name: viraui-motion
description: Use when viraui-design is composing or styling a ViraUI screen and motion applies — adding, skipping, or debugging transitions, hover or press feedback, overlay enter/exit, micro-interactions, --duration-* / --easing-* tokens, or prefers-reduced-motion — including custom consumer CSS, not only @viraui/react components.
license: MIT
metadata:
  author: Vira Software
  version: '2026.1.0'
---

# viraui-motion

Motion is **product, not polish**. Same tokens for `@viraui/react` **and** custom consumer CSS.

Load this hub when **viraui-design** composes or styles a screen. Read **one** sibling ref from the router — not the whole folder.

Do **not** auto-load independently of compose context. **viraui-design** routes here; this skill does not replace design for component choice or API.

## When to load

- **viraui-design** is active on a screen and you add/skip/debug motion
- Hover, press, focus, expand/collapse, overlay open/close on Vira or custom CSS
- Token choice (`--duration-*`, `--easing-*`) or `prefers-reduced-motion` behavior
- Replacing raw `ms`, `ease`, or animation libraries on UI feedback

## When not to load

- Bootstrap, theme, preflight → **viraui-setup**
- Component/prop/layout choice without motion symptom → **viraui-design** only
- APG audit → **viraui-a11y**
- Load all four refs “to be safe” → hub + **one** matching ref only

## Action router

| Need                               | Read                           |
| ---------------------------------- | ------------------------------ |
| Whether to animate; reduced-motion | [principles.md](principles.md) |
| Functional vs evocative            | [animations.md](animations.md) |
| Duration, exits, distance          | [speed.md](speed.md)           |
| Which easing                       | [timing.md](timing.md)         |

## Motion contract

1. **Whole interface** — “Vira already animates” is not an exemption for custom CSS.
2. Hover, press, focus, expand/collapse, overlay open/close → **functional** motion unless `prefers-reduced-motion: reduce`.
3. Tokens only, e.g. `transition: transform var(--duration-fast) var(--easing-standard);`  
   Duration: `--duration-instant` \| `--duration-fast` \| `--duration-normal` \| `--duration-slow` \| `--duration-slowest`.  
   Easing: `--easing-standard` \| `--easing-entrance` \| `--easing-exit` \| `--easing-elastic` \| `--easing-wiggle`.
4. Every animation you add includes `@media (prefers-reduced-motion: reduce) { transition: none; }` (or equivalent). Motion never carries meaning alone.

Theme group `motion` in `@viraui/react/theme-surface.json`. Preset JS: `@viraui/foundation/<brand>/nested` (`duration.*`, `easing.*`) — see [speed.md](speed.md).

## Red flags — STOP

| Excuse                                   | Reality                                  |
| ---------------------------------------- | ---------------------------------------- |
| “Polish / next sprint / skip custom CSS” | Functional motion required               |
| “200ms ease-in-out is fine”              | `--duration-*` + `--easing-*`            |
| “Framer/GSAP for hover”                  | Token CSS unless explicitly out of scope |
| “Read all motion refs first”             | Hub + one ref from router                |
| “Motion without viraui-design context”   | Compose routes here                      |

## Rationalization counters

- **JS `180`/`480` literals** → foundation nested tokens — [speed.md](speed.md).
- **Blur/loop/bounce spectacle** → [animations.md](animations.md) evocative limits.
- **No reduced-motion** → [principles.md](principles.md) — non-negotiable.
- **Only Vira components animate** → custom sidebar/card CSS still covered.

## Out of scope

Monorepo Vira component implementation, bootstrap, APG audit, inventing component APIs.

## Next skill

Compose and API → **viraui-design**. Structured a11y audit → **viraui-a11y**. Bootstrap → **viraui-setup**.
