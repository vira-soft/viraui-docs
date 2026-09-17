# Data Model: Get Started Utilities Group

**Feature**: `006-utilities-docs` | **Date**: 2026-09-18

Content entities (no runtime persistence beyond Git MDX).

## NavGroup

| Field | Rules |
| --- | --- |
| `path` | `content/get-started/utilities/` |
| `meta` | `meta.json`: title `Utilities`, icon `WrenchScrewdriver`, `defaultOpen: false` |
| `pages` | Includes `use-breakpoints` (and future utility slugs) |
| `index` | Absent (folder expands only; no `/get-started/utilities` index page) |

## PageDocument (useBreakpoints)

| Field | Rules |
| --- | --- |
| `path` | `content/get-started/utilities/use-breakpoints.mdx` |
| `public_url` | `/get-started/utilities/use-breakpoints` |
| `locale` | English |
| `frontmatter.title` | `useBreakpoints` |
| `frontmatter.description` | Non-stub: viewport-conditional markup helper |
| `frontmatter.pageActions` | `false` |
| `overlay_shell_recipe` | Absent (Setup owns that) |

## LeadSection

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

## BaseUiHandoff

| Field | Rules |
| --- | --- |
| `required` | Yes (brief) |
| `content` | Base UI built-ins live on Base UI docs |
| `href` | `https://base-ui.com` |
| `recipes` | Absent (no DirectionProvider/RTL/focus tutorials) |

## SetupHandoff

| Field | Rules |
| --- | --- |
| `file` | `content/get-started/setup.mdx` |
| `content` | Brief optional providers/utilities note |
| `href` | `/get-started/utilities/use-breakpoints` |
| `breakpoints_recipe` | Absent on Setup |

## NavMeta

| Field | Rules |
| --- | --- |
| `file` | `content/get-started/meta.json` |
| `pages` | `setup`, `skills`, `mcp`, `utilities` (utilities last, folder) |

## IaTree

| Field | Rules |
| --- | --- |
| `file` | `specs/001-llm-first-docs-site/contracts/ia-tree.md` |
| `url` | Utilities group + `/get-started/utilities/use-breakpoints` listed |
| `order` | Get started … mcp → utilities group |

## Relationships

- `NavGroup` contains `PageDocument` (useBreakpoints).
- `PageDocument` has one `LeadSection`, one `BreakpointsBody`, one `BaseUiHandoff`.
- `SetupHandoff` points at useBreakpoints; Lead points at Setup.
- Complements Setup without merging overlay shell.

## Validation rules (editorial)

1. Utilities group after MCP in nav + IA.
2. Optional framing + Setup link present on useBreakpoints.
3. Defaults + replace-map + examples present.
4. Base UI handoff present; no Base UI recipes.
5. Setup handoff only; no Breakpoints recipe on Setup.
