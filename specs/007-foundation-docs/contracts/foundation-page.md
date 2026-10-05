# Contract: Foundation Overview Page

**Feature**: `007-foundation-docs`
**File**: `content/(design-system)/foundation/index.mdx`
**URL**: `/foundation`

## MUST

1. Frontmatter: `title: Overview`; non-stub `description` about what Foundation is and how it works basically; `icon: Eye`; `pageActions: false`.
2. Lead: Foundation = shared visual substrate (design tokens / brandable primitives); not a component catalog; not a restatement of the four Core layers essay. MAY link `/layers`.
3. How-it-works: short `##` section immediately after the lead covering: change foundation values to shape brand/look; listed topics are facets of that substrate; components and agents consume the same foundation. MAY link `/components`. No per-topic mini-essays.
4. After how-it-works: one `Cards` grid with exactly these eight cards in order (title + `href` + `SpotIllustration`; no card body copy). Theme loading / `@viraui/foundation` lives under Get started Theming (`/get-started/theming/…`) (not a Foundation card). Use the reserved final `name` values (stand-ins retired):

   | Title | href | `SpotIllustration` `name` |
   | --- | --- | --- |
   | Colors | `/foundation/colors` | `foundation-colors` |
   | Motion | `/foundation/motion` | `foundation-motion` |
   | Elevation | `/foundation/elevation` | `foundation-elevation` |
   | Effects | `/foundation/effects` | `foundation-effects` |
   | Typography | `/foundation/typography` | `foundation-typography` |
   | Spacing | `/foundation/spacing` | `foundation-space` |
   | Radius | `/foundation/radius` | `foundation-radius` |
   | Iconography | `/foundation/iconography` | `foundation-icons` |

5. English AI-centric consumer voice per `.cursor/rules/02-docs-consumer-voice.mdc` and `001` page-shell — how Foundation works for humans steering agents; no meta “this page covers / keep this page / not documented here”; no “What’s next”.
6. Remove prior stub copy (“Browse child topics…”) and any Ask-agent placeholder fence.

## MUST NOT

1. Exhaustive token tables, package install recipes, component prop/API dumps, or full child-topic essays.
2. Restate the full Layers four-layer composition essay.
3. Remove Foundation children from nav without updating IA (`ia-tree.md`) + Overview cards.
4. Reuse Pro spots (`studio`, `prompts`) as stand-ins on this hub.
5. Leave empty image slots on topic cards.
6. Revert topic cards to pre-final stand-in SpotIllustration names.

## Related file changes (same feature)

| File | Change |
| --- | --- |
| `content/(design-system)/foundation/index.mdx` | Finished Overview hub |
| `src/illustrations/foundation-*.svg` | Topic illustrations (landed) |
| `src/components/spot-illustration.tsx` | `foundation-*` names registered (landed) |

## Relationship to other contracts

- Layers (`003` layers-page): composition stack; Overview deepens Strong foundation into topic hub.
- Introduction Core Cards: short Foundation teaser; keeps Core art names (`foundation`, `motion`, …).
- IA tree (`001` ia-tree): `/foundation` + token facet children; themes wiring = `/get-started/theming/…`.
- Does **not** use Component Page Shell (`PreviewSlot`).
