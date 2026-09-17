# Data Model: Get Started Skills Page

**Feature**: `005-skills-docs` | **Date**: 2026-09-18

Content entities (no runtime persistence beyond Git MDX).

## PageDocument

| Field | Rules |
| --- | --- |
| `path` | `content/get-started/skills.mdx` |
| `public_url` | `/get-started/skills` |
| `locale` | English |
| `frontmatter.title` | `Skills` |
| `frontmatter.description` | Non-stub orientation summary (agent playbooks / when to use) |
| `frontmatter.icon` | `OrbitSparkle` |
| `frontmatter.pageActions` | `false` |
| `stub_copy` | Absent (including stub ask-agent fence) |
| `prompt_fences` | No How titled Ask-your-agent / bootstrap-verify fence; ~2 example usage prompts per skill OK |
| `install_one_liner` | Absent |

## LeadSection (what)

| Field | Rules |
| --- | --- |
| `framing` | Skills = publishable consumer agent playbooks; keep ViraUI on-pattern |
| `api_authority` | Deep API = package agent specs / skill destinations—not this page |
| `boundaries` | Skills ≠ Setup (bootstrap) ≠ MCP (network docs search) |

## HowSection

| Field | Rules |
| --- | --- |
| `install` | Prose + link to `/get-started/setup` only |
| `usage` | Agents discover/load by task; humans may name a skill in a prompt (prose) |
| `bans` | No install command; no How titled Ask-your-agent fence |

## SkillProseBlock (×4)

| Field | Rules |
| --- | --- |
| `order` | `viraui-setup` → `viraui-design` → `viraui-a11y` → `viraui-motion` |
| `heading` | Skill name visible |
| `body` | ~2–3 sentences: one job + use when / not when |
| `presentation` | Prose blocks only — not a comparison table |
| `depth` | No hub routers, ref inventories, or skill-file paste |

## McpMention

| Field | Rules |
| --- | --- |
| `required` | Yes |
| `href` | `/get-started/mcp` |
| `content` | Brief Skills vs MCP distinction |
| `tutorial` | Absent |

## NavMeta

| Field | Rules |
| --- | --- |
| `file` | `content/get-started/meta.json` |
| `pages` | Already includes `skills` between `setup` and `mcp` — no change expected |

## Relationships

- `PageDocument` has one `LeadSection`, one `HowSection`, four `SkillProseBlock`s, one `McpMention`.
- `HowSection.install` points at Setup page (external content owner).
- `McpMention` points at MCP page (external content owner).
- Complements Setup (install/bootstrap) without merging.

## Validation rules (editorial)

1. All four skill names present as prose blocks in fixed order.
2. No comparison table as primary what/when.
3. No install one-liner; Setup link works.
4. No How titled Ask-your-agent / bootstrap-verify fence; ~2 example prompts per skill OK.
5. MCP brief mention + working link.
6. Stub ask-agent fence gone; description non-stub.
7. No pasted skill hubs / monorepo paths / prop atlases.
