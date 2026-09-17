# Data Model: ViraUI Layers Page

**Feature**: `003-layers-docs` | **Date**: 2026-09-18

Content entities (no runtime persistence beyond Git MDX).

## Layer

| Field | Rules |
| --- | --- |
| `id` | One of: `strong-foundation`, `ui-components`, `motion-guidelines`, `ai-native` |
| `heading` | Exact Card title: “AI-native by design” / “Strong foundation” / “UI components” / “Motion guidelines” |
| `order` | 1 → 2 → 3 → 4 (fixed; matches stack art top→bottom) |
| `must_cover` | Spec FR for that layer (FR-004 / FR-005 / FR-006 / FR-007) plus FR-008 (purpose + failure when missing) |
| `must_not` | Prop tables; install cookbooks; Pro timelines; paste-only homepage slogan |

**Relationships**: Page has exactly four `Layer` sections in that order. Composition narrative treats lower layers as substrate for upper ones.

## CompositionClaim

| Field | Rules |
| --- | --- |
| `statement` | Layers stack into one coherent system (not unrelated product bullets) |
| `contrast_page` | Principles = worldview/why; Layers = composition/how |
| `contrast_href` | `/principles` |

## OverviewPrompt

| Field | Rules |
| --- | --- |
| `topics` | MUST cover: what ViraUI is; principles; layers |
| `grounding` | Prefer official ViraUI docs/context; do not invent generic DS pitch |
| `placement` | Bottom titled fenced `text` code block |
| `title_attr` | e.g. `Ask your agent` (match site pattern) |

## NextLink

| Field | Rules |
| --- | --- |
| `required_set` | Include `/principles` and `/get-started/skills`; plus ≥1 of `/foundation`, `/components`, `/foundation/motion` |
| `recommended_set` | All five: Principles, Foundation, Components, Motion, Skills |

## PageDocument

| Field | Rules |
| --- | --- |
| `path` | `content/layers.mdx` |
| `locale` | English |
| `frontmatter.title` | `Layers` |
| `frontmatter.description` | Non-stub composition/overview summary |
| `frontmatter.pageActions` | `false` (match overview pages) |
| `layer_count` | Exactly 4 |
| `prompt_region` | Present |
| `stub_copy` | Absent |

## Validation rules (editorial)

1. Every `Layer.must_cover` claim appears in that Step’s body.
2. No `must_not` claim appears.
3. Order of layer headings matches `order` 1–4.
4. Overview prompt names the three required topics.
5. Prior stub (“Stub: foundation tokens…”) and placeholder prompt fully removed.
