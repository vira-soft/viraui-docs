# Research: LLM-First Human Docs Site

## Decision: Fumapress as site generator

- **Decision**: Use Fumapress (`npm create fumapress` / manual Vite + fumapress) for `viraui-docs`.
- **Rationale**: Stakeholder chose https://press.fumadocs.dev/docs; opinionated docs UX, MDX content tree, built-in llms.txt/search, Vercel adapter.
- **Alternatives considered**: Full Fumadocs+Next (more control, more boilerplate); Docusaurus/Nextra (weaker LLM-first defaults).

## Decision: Default render mode (server API for MCP)

- **Decision**: `mode: "default"` in `press.config.tsx` (prerender pages + emit API routes).
- **Rationale**: Preset already covers sitemap / robots.txt / llms.txt / RSS / FlexSearch / OG. MCP needs a server and is incompatible with `mode: "static"` ([deployment](https://press.fumadocs.dev/docs/deployment), [MCP plugin](https://press.fumadocs.dev/docs/plugins/mcp)). Link validation runs at build. Vercel adapter serves `dist/public` + serverless for `/mcp`.
- **Ask AI**: not enabled — Fumapress Ask AI requires a paid model provider (OpenAI/etc.); no free built-in LLM. MCP stays (free: exposes search / get_page / list_pages to MCP clients).
- **Alternatives considered**: `static` — used for first structure ship; dropped once MCP required.

## Decision: Content IA under `content/`

- **Decision**: Single docs collection at site root (`content/` → `/`). Intro pages (`why`, `principles`, `layers`, `skills`) sit at first level next to `index` (Introduction). Folders: `get-started/`, `foundation/`, `components/{category}/{component}.mdx`.
- **Rationale**: Matches FR-004–FR-007; Fumapress meta.json controls order + `defaultOpen` for expandable categories.
- **Alternatives considered**: `/docs` prefix — rejected (product host is already `docs.viraui.dev`).

## Decision: Component page shell (not prop tables)

- **Decision**: Shared MDX sections + `PreviewSlot` (placeholder interactive region) + titled fenced code blocks for LLM prompts. Stub copy only.
- **Rationale**: FR-008/FR-009; content pass later fills prompts/examples.
- **Alternatives considered**: Auto-generated props from TS — rejected by product model (LLM-first).

## Decision: Hosting = Vercel CLI, no Git integration

- **Decision**: Create Vercel project via CLI (`vercel` / `vercel --prod`); do not link GitHub. Optional later: GitHub Actions + `VERCEL_TOKEN`.
- **Rationale**: FR-011 explicit.
- **Alternatives considered**: Vercel GitHub App — rejected; Cloudflare Pages — not requested.

## Decision: DNS CNAME `docs` → Vercel

- **Decision**: After first Vercel deploy, add Namecheap CNAME `docs` → `cname.vercel-dns.com` (or project-specific target Vercel shows), then attach domain in Vercel.
- **Rationale**: `viraui.dev` already registered (Namecheap, expires 2030); basic registrar DNS.
- **Alternatives considered**: A/AAAA to Vercel IPs — less portable.

## Decision: Private GitHub `vira-soft/viraui-docs`

- **Decision**: Create private repo under `vira-soft`, set as sole `origin`, push `main`.
- **Rationale**: FR-010.
- **Note**: At plan time `gh` token invalid for account; implement must attempt refresh / leave blocked task with recovery steps.

## Decision: Package manager

- **Decision**: `pnpm` to align with Vira monorepo habits if create-fumapress allows; else npm lock from scaffolder, migrate later only if needed.
- **Rationale**: Fewer surprises vs sister repos; not a product requirement.
