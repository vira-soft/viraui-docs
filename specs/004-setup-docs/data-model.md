# Data Model: Get Started Setup Page

**Feature**: `004-setup-docs` | **Date**: 2026-09-18

Content entities (no runtime persistence beyond Git MDX).

## PageDocument

| Field | Rules |
| --- | --- |
| `path` | `content/get-started/setup.mdx` |
| `public_url` | `/get-started/setup` |
| `locale` | English |
| `frontmatter.title` | `Setup` |
| `frontmatter.description` | Non-stub bootstrap/setup summary |
| `frontmatter.icon` | `Gear` (or current equivalent) |
| `frontmatter.pageActions` | `false` (match overview instructional pages) |
| `removed_path` | `content/get-started/index.mdx` must not remain as Setup |
| `meta_pages` | `content/get-started/meta.json` lists `setup`, then `skills`, then `mcp` |
| `stub_copy` | Absent |

## RequirementsRecap (shared, outside tabs)

| Field | Rules |
| --- | --- |
| `platform` | React app; React + React DOM as platform peers |
| `required_peer` | Base UI / `@base-ui/react` only required peer beyond React peers |
| `base_ui_href` | `https://base-ui.com` (working external link) |
| `toolchain` | Package manager + (for AI path) agent host — no monorepo version dump |
| `optional_packages` | Foundation / icons only if clearly optional / theme-gated |

## SharedProcessSection (outside tabs)

| Field | Rules |
| --- | --- |
| `sequence` | Skills → packages/peers → theme gate → theme → fonts → preflight → root providers |
| `theme_gate` | Must state: choose default foundation vs custom/Studio **before** foundation/fonts |
| `duplication` | Must not be restated verbatim inside both tabs |
| `coexistence` | At most brief note; not a CSS-framework essay |

## AiPath (inside AI tab)

| Field | Rules |
| --- | --- |
| `setup_prompt` | Present; titled `text` fence; full bootstrap intent (FR-005) |
| `verify_prompt` | Present; separate titled `text` fence; smoke-check theme/preflight/providers/sample render |
| `default_tab` | AI is primary/first tab |

## ManualPath (inside Manual tab)

| Field | Rules |
| --- | --- |
| `full_process` | Same outcomes as AiPath setup (packages, skills, theme gate, wiring) |
| `skills_command` | Publishable skills one-liner present |
| `skills_href` | Link to `/get-started/skills` |
| `verify` | Checklist wording only — no second verify prompt fence |
| `packages` | `@viraui/react` + React peers + `@base-ui/react` |

## NavMeta

| Field | Rules |
| --- | --- |
| `file` | `content/get-started/meta.json` |
| `pages` | `["setup", "skills", "mcp"]` |
| `skills_outbound` | `skills.mdx` continues to link `/get-started/setup` |

## Relationships

- `PageDocument` has one `RequirementsRecap`, one `SharedProcessSection`, one `AiPath`, one `ManualPath`.
- `AiPath.verify_prompt` and `ManualPath.verify` share smoke-check **outcomes**, different presentation.
- Setup complements Skills (purpose of skills) and MCP (docs search) without merging.

## Validation rules (editorial)

1. Shared narrative appears once outside tabs; tabs lack duplicate full shared essay.
2. Both tabs cover full bootstrap outcomes.
3. AI has setup + verify prompts; Manual has checklist verify only.
4. Base UI link present and labeled as sole required peer beyond React peers.
5. No stub/placeholder prompt or “commands arrive later” copy.
6. `index.mdx` Setup stub gone; `/get-started/setup` is canonical.
