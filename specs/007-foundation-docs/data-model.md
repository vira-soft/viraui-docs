# Data Model: Foundation Overview Page

**Feature**: `007-foundation-docs` | **Date**: 2026-09-21

Content entities (no runtime persistence beyond Git MDX).

## PageDocument

| Field | Rules |
| --- | --- |
| `path` | `content/(design-system)/foundation/index.mdx` |
| `public_url` | `/foundation` |
| `locale` | English |
| `frontmatter.title` | `Overview` |
| `frontmatter.description` | Non-stub: what Foundation is + how it works basically |
| `frontmatter.icon` | `Eye` (unchanged) |
| `frontmatter.pageActions` | `false` |
| `ask_agent_fence` | Absent |

## LeadSection

| Field | Rules |
| --- | --- |
| `job` | Define Foundation as shared visual substrate (tokens / brandable primitives) |
| `not` | Component catalog; four-layer composition essay |
| `layers_href` | MAY link `/layers` |

## HowItWorksSection

| Field | Rules |
| --- | --- |
| `heading` | Short `##` (e.g. How it works) |
| `model` | Change foundation values → brand/look; topics = facets; components + agents consume same substrate |
| `length` | Brief; no per-topic mini-essays |
| `components_href` | MAY link `/components` |
| `position` | After lead, before Cards |

## TopicCard

| Field | Rules |
| --- | --- |
| `title` | Matches child page title |
| `href` | Matching `/foundation/{slug}` |
| `illustration` | `SpotIllustration` with stand-in name (this slice) or reserved `foundation-*` (follow-up) |
| `body` | Empty / omitted |

## TopicCardSet

Ordered list (nav order):

| title | slug | stand-in | reserved final |
| --- | --- | --- | --- |
| Colors | `colors` | `foundation` | `foundation-colors` |
| Motion | `motion` | `motion` | `foundation-motion` |
| Elevation | `elevation` | `layers-foundation` | `foundation-elevation` |
| Effects | `effects` | `foundation` | `foundation-effects` |
| Typography | `typography` | `components` | `foundation-typography` |
| Spacing | `spacing` | `foundation` | `foundation-space` |
| Radius | `radius` | `foundation` | `foundation-radius` |
| Icons | `icons` | `components` | `foundation-icons` |

## NavMeta

| Field | Rules |
| --- | --- |
| `file` | `content/(design-system)/foundation/meta.json` |
| `change` | None this feature |

## SpotkitFollowUp (out of this implement slice)

| Field | Rules |
| --- | --- |
| `svgs` | Eight `foundation-*.svg` under `src/illustrations/` |
| `registry` | Add keys to `SpotIllustration` ART map |
| `mdx` | Swap stand-in `name` props → reserved finals |

## Relationships

- `PageDocument` has one `LeadSection`, one `HowItWorksSection`, one `TopicCardSet`.
- Each `TopicCard` points at an existing Foundation child stub page (content unchanged).
- Complements Layers + Introduction; does not own four-layer essay or Core teaser art.

## Validation rules (editorial)

1. Structure order: lead → how-it-works → Cards.
2. Exactly eight topic cards; titles + hrefs match nav children.
3. Every card has an image (stand-in this slice).
4. No stub/placeholder Ask-agent copy.
5. No token tables / install recipes / prop dumps / child essays.
