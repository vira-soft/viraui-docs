# Data Model: Get Started Utilities Group

**Feature**: `006-utilities-docs` | **Date**: 2026-09-18 (updated 2026-10-13)

Content entities (no runtime persistence beyond Git MDX).

## NavGroup

| Field | Rules |
| --- | --- |
| `path` | `content/(design-system)/get-started/utilities/` |
| `meta` | `meta.json`: title `Utilities`, icon `WrenchScrewdriver`, `defaultOpen: false` |
| `pages` | `breakpoints`, `direction` (and future utility slugs) |
| `index` | Absent (folder expands only; no `/get-started/utilities` index page) |

## PageDocument (Breakpoints)

| Field | Rules |
| --- | --- |
| `path` | `content/(design-system)/get-started/utilities/breakpoints.mdx` |
| `public_url` | `/get-started/utilities/breakpoints` |
| `locale` | English |
| `frontmatter.title` | `Breakpoints` |
| `frontmatter.description` | Non-stub: viewport-conditional markup helper |
| `frontmatter.pageActions` | `false` |
| `overlay_shell_recipe` | Absent (Setup owns that) |

## PageDocument (Direction)

| Field | Rules |
| --- | --- |
| `path` | `content/(design-system)/get-started/utilities/direction.mdx` |
| `public_url` | `/get-started/utilities/direction` |
| `locale` | English |
| `frontmatter.title` | `Direction` |
| `frontmatter.description` | Non-stub: Base UI DirectionProvider re-export / RTL |
| `frontmatter.pageActions` | `false` |
| `depth` | Base UI Card + thin how-it-works + ≤2 fence examples |

## LeadSection (Breakpoints)

| Field | Rules |
| --- | --- |
| `optional_framing` | Helper is opt-in beyond Setup overlay shell |
| `setup_href` | `/get-started/setup` |

## BreakpointsBody

| Field | Rules |
| --- | --- |
| `when_to_use` | Viewport-conditional React markup |
| `prefer_css` | Media/container queries for layout-only |
| `defaults` | Five named em thresholds listed |
| `replace_map` | Custom map replaces whole defaults (callout OK) |
| `examples` | Provider wrap + named hook; optional custom map fence |
| `depth_pointer` | Package specs breakpoints units + design skill |

## BaseUiHandoff (Breakpoints)

| Field | Rules |
| --- | --- |
| `required` | Yes (brief) |
| `content` | RTL → Direction page; other Base UI built-ins → base-ui.com |
| `direction_href` | `/get-started/utilities/direction` |
| `href` | `https://base-ui.com` |
| `recipes` | Absent on Breakpoints (Direction owns thin RTL handoff) |

## SetupHandoff

| Field | Rules |
| --- | --- |
| `file` | `content/(design-system)/get-started/setup.mdx` |
| `content` | Brief optional providers/utilities note |
| `hrefs` | `/get-started/utilities/breakpoints`, `/get-started/utilities/direction` |
| `breakpoints_recipe` | Absent on Setup |
| `rtl_recipe` | Absent on Setup |

## NavMeta

| Field | Rules |
| --- | --- |
| `file` | `content/(design-system)/get-started/meta.json` |
| `pages` | includes `utilities` (folder) |

## IaTree

| Field | Rules |
| --- | --- |
| `file` | `specs/001-llm-first-docs-site/contracts/ia-tree.md` |
| `url` | Utilities group + `/breakpoints` + `/direction` listed |
| `order` | Get started … → utilities group |

## Relationships

- `NavGroup` contains `PageDocument` (Breakpoints) and `PageDocument` (Direction).
- Breakpoints has one `LeadSection`, one `BreakpointsBody`, one `BaseUiHandoff`.
- `SetupHandoff` points at both children; Breakpoints lead points at Setup.
- Complements Setup without merging overlay shell.

## Validation rules (editorial)

1. Utilities group in nav + IA with both children.
2. Optional framing + Setup link present on Breakpoints.
3. Defaults + replace-map + examples present on Breakpoints.
4. Direction: Base UI Card + ≤2 examples; no API encyclopedia.
5. Setup handoff only; no Breakpoints/RTL recipes on Setup.
