# Research: Foundation Overview Page

**Feature**: `007-foundation-docs` | **Date**: 2026-09-21

## 1. Page delivery vehicle

**Decision**: Rewrite existing `content/(design-system)/foundation/index.mdx` (`/foundation`). No `meta.json`, route, or `001` IA-tree changes.

**Rationale**: FR-001, FR-011; IA already lists `/foundation` + eight children.

**Alternatives considered**: New sibling hub page — rejected (would duplicate Overview). Expand each child now — rejected (out of scope; stubs stay).

## 2. Page outline

**Decision**:

1. **Frontmatter** — `title: Overview`; non-stub `description`; keep `icon: Eye`; `pageActions: false`.
2. **Lead** — what Foundation is (shared visual substrate / tokens & brandable primitives); not the component catalog; MAY one-line link Layers for stack context.
3. **How it works** — short `##` block: change foundation → brand/look shifts; topics are facets; components + agents consume the same substrate; MAY link `/components`.
4. **Cards** — one `Cards` grid, nav order, eight children; each `Card` = `title` + `href` + `SpotIllustration` only (no body copy).

**Rationale**: Clarify session (lead → how-it-works → cards); FR-003–007; SC-003.

**Alternatives considered**: Lead-only + cards — rejected (clarify B). Post-grid Next section — rejected (clarify: not required; links in prose OK).

## 3. Temporary stand-in art mapping

**Decision**: Wire cards to existing `SpotIllustrationName` keys (no new SVGs / no ART map edits this slice). Multiple topics may share a spot.

| Topic (title) | href | Stand-in `name` |
| --- | --- | --- |
| Colors | `/foundation/colors` | `foundation` |
| Motion | `/foundation/motion` | `motion` |
| Elevation | `/foundation/elevation` | `layers-foundation` |
| Effects | `/foundation/effects` | `foundation` |
| Typography | `/foundation/typography` | `components` |
| Spacing | `/foundation/spacing` | `foundation` |
| Radius | `/foundation/radius` | `foundation` |
| Iconography | `/foundation/iconography` | `components` |

**Rationale**: Clarify C (stand-ins); FR-008; avoid Pro `studio`/`prompts` on Core foundation hub; thematic nearest-neighbor among Core + `layers-foundation`.

**Alternatives considered**: Empty image slots until Spotkit — rejected (clarify). Title-only cards — rejected (clarify). Reuse Pro art — rejected (wrong product layer).

## 4. Reserved final Spotkit names (follow-up)

**Decision**: Future pass authors one SVG per topic and registers them in `spot-illustration.tsx`. Reserved names:

| Final `name` | File (planned) |
| --- | --- |
| `foundation-colors` | `src/illustrations/foundation-colors.svg` |
| `foundation-motion` | `src/illustrations/foundation-motion.svg` |
| `foundation-elevation` | `src/illustrations/foundation-elevation.svg` |
| `foundation-effects` | `src/illustrations/foundation-effects.svg` |
| `foundation-typography` | `src/illustrations/foundation-typography.svg` |
| `foundation-space` | `src/illustrations/foundation-space.svg` |
| `foundation-radius` | `src/illustrations/foundation-radius.svg` |
| `foundation-icons` | `src/illustrations/foundation-icons.svg` |

Note: Themes & brand wiring moved to `/get-started/theming/…`; `foundation-themes-and-brand` SVG remains registered but is not a Foundation Overview card.

Swap MDX `SpotIllustration name=…` from stand-ins → finals without rewriting lead/how-it-works (SC-005).

**Rationale**: Spec Assumptions; Layers used `layers-*` family pattern; Introduction keeps Core teaser names (`foundation`, `motion`, …) unchanged.

**Alternatives considered**: Overwrite Core teaser SVGs — rejected (breaks Introduction). Skip reserved names until Spotkit — rejected (plan must land names per clarify / FR-008).

## 5. Relationship to Layers / Introduction / children

**Decision**:

| Surface | Job vs this page |
| --- | --- |
| Introduction Core Card “Foundation” | Short teaser → `/foundation` |
| Layers “Strong foundation” Step | Stack composition; links here |
| This Overview | Substrate hub: what + how-it-works + topic Cards |
| Child topic stubs | Deep guidance later; overview only links |

Do not restate four-layer essay; do not invent child content.

**Rationale**: FR-004, US3, edge cases.

## 6. Voice and bans

**Decision**: Consumer voice (`you` / imperative). Remove stub (“Browse child topics…”) and Ask-agent placeholder fence. No token tables, install recipes, prop dumps, or per-topic mini-essays on Cards.

**Rationale**: FR-009–013; `.cursor/rules/02-docs-consumer-voice.mdc`.

## 7. Validation approach

**Decision**: Manual quickstart against FR/SC + `pnpm build` (link validation for eight card hrefs).

**Rationale**: Same as `002`–`006` content features.
