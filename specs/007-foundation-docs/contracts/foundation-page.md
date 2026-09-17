# Contract: Foundation Overview Page

**Feature**: `007-foundation-docs`
**File**: `content/(design-system)/foundation/index.mdx`
**URL**: `/foundation`

## MUST

1. Frontmatter: `title: Overview`; non-stub `description` about what Foundation is and how it works basically; `icon: Eye`; `pageActions: false`.
2. Lead: Foundation = shared visual substrate (design tokens / brandable primitives); not a component catalog; not a restatement of the four Core layers essay. MAY link `/layers`.
3. How-it-works: short `##` section immediately after the lead covering: change foundation values to shape brand/look; listed topics are facets of that substrate; components and agents consume the same foundation. MAY link `/components`. No per-topic mini-essays.
4. After how-it-works: one `Cards` grid with exactly these eight cards in order (title + `href` + `SpotIllustration`; no card body copy). Theme loading / `@viraui/foundation` lives under Get started Theming (`/get-started/theming/…`) (not a Foundation card).

   | Title | href | Stand-in `SpotIllustration` `name` | Reserved final `name` |
   | --- | --- | --- | --- |
   | Colors | `/foundation/colors` | `foundation` | `foundation-colors` |
   | Motion | `/foundation/motion` | `motion` | `foundation-motion` |
   | Elevation | `/foundation/elevation` | `layers-foundation` | `foundation-elevation` |
   | Effects | `/foundation/effects` | `foundation` | `foundation-effects` |
   | Typography | `/foundation/typography` | `components` | `foundation-typography` |
   | Spacing | `/foundation/spacing` | `foundation` | `foundation-space` |
   | Radius | `/foundation/radius` | `foundation` | `foundation-radius` |
   | Icons | `/foundation/icons` | `components` | `foundation-icons` |

5. English AI-centric consumer voice per `.cursor/rules/02-docs-consumer-voice.mdc` — how Foundation works; no meta “this page covers / keep this page / not documented here”; no “What’s next”.
6. Remove prior stub copy (“Browse child topics…”) and any Ask-agent placeholder fence.

## MUST NOT

1. Create new Spotkit SVGs or edit `spot-illustration.tsx` ART map in this feature’s content slice (deferred Spotkit follow-up).
2. Exhaustive token tables, package install recipes, component prop/API dumps, or full child-topic essays.
3. Restate the full Layers four-layer composition essay.
4. Remove Foundation children from nav without updating IA (`ia-tree.md`) + Overview cards.
5. Fill child topic stub bodies as part of this feature.
6. Reuse Pro spots (`studio`, `prompts`) as stand-ins on this hub.
7. Leave empty image slots on topic cards.

## Related file changes (same feature)

| File | Change |
| --- | --- |
| `content/(design-system)/foundation/index.mdx` | Finished Overview hub |

## Deferred (Spotkit follow-up — not this feature)

| File | Change |
| --- | --- |
| `src/illustrations/foundation-*.svg` | Eight new topic illustrations |
| `src/components/spot-illustration.tsx` | Register `foundation-*` names |
| `foundation/index.mdx` | Swap stand-in `name` → reserved finals |

## Relationship to other contracts

- Layers (`003` layers-page): composition stack; Overview deepens Strong foundation into topic hub.
- Introduction Core Cards: short Foundation teaser; keeps Core art names (`foundation`, `motion`, …).
- IA tree (`001` ia-tree): `/foundation` + token facet children; themes wiring = `/get-started/theming/…`.
- Does **not** use Component Page Shell (`PreviewSlot`).
