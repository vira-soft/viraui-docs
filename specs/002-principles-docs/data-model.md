# Data Model: ViraUI Principles Page

**Feature**: `002-principles-docs` | **Date**: 2026-09-18

Content entities (no runtime persistence beyond Git MDX).

## Principle

| Field | Rules |
| --- | --- |
| `id` | One of: `multi-surface-drift`, `browser-canvas`, `accessibility-loop` |
| `heading` | Exact H2 from research: “One truth beats five surfaces” / “The browser is the canvas” / “Accessibility built into the loop” |
| `must_cover` | Spec FR set for that principle (see relationships) |
| `must_not` | Product timelines; skill IDs; encyclopedia depth |

**Relationships**: Page has exactly three `Principle` sections in that order.

## SourceOfTruthClaim

| Field | Rules |
| --- | --- |
| `canonical` | Running / implemented interface code |
| `non_canonical` | Static design libraries, orphan docs, duplicate guidelines when treated as systems of record |
| `allowed_secondary` | Disposable sketches / low-fi mockups, including LLM implementation prompts |

## AgentSkillSurface

| Field | Rules |
| --- | --- |
| `description` | Principles-level overview that skills teach agents APG-aligned practices |
| `detail_href` | MUST be `/get-started/skills` |
| `skill_ids_on_page` | Empty (none named) |

## PageDocument

| Field | Rules |
| --- | --- |
| `path` | `content/principles.mdx` |
| `locale` | English |
| `frontmatter.title` | `Principles` |
| `frontmatter.description` | Non-stub worldview summary |
| `next_links` | Exactly `{ /layers, /get-started/skills }` as required next steps |
| `prompt_region` | Present (titled fenced code block) |

## Validation rules (editorial)

1. Every `Principle.must_cover` claim appears in body text (testable via FR checklist).
2. No `must_not` claim appears.
3. APG cited with link to https://www.w3.org/WAI/ARIA/apg/
4. Stub sentence(s) from prior draft fully removed.
