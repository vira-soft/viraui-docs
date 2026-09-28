# Contributing

English human documentation for the ViraUI design system.

**Positioning:** ViraUI is **LLM-first**. Agents and skills are the primary way to use the system; humans step in for advanced intervention. Package agent specs remain the deep API authority — these pages narrate, show common examples, and ship prompts.

Public site: [https://docs.viraui.dev](https://docs.viraui.dev)  
GitHub: [vira-soft/viraui-docs](https://github.com/vira-soft/viraui-docs) (private)

## Local

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

Output: `dist/public` (pages) + `dist/server` (MCP `/mcp`). Render `mode: "default"`.

**Preset (auto):** sitemap, robots.txt, llms.txt, RSS, FlexSearch, OG, image opts.  
**Extra plugins:** link validation (build), MCP (`https://docs.viraui.dev/mcp`).  
Ask AI not enabled — needs a paid model provider.

## Deploy (Vercel, no Git link)

**CI:** push (or PR merge) to `main` → `.github/workflows/deploy.yml`.

Repo secrets:

| Secret | Value |
| --- | --- |
| `VERCEL_TOKEN` | [Account token](https://vercel.com/account/tokens) (CLI cannot create; paste once) |
| `VERCEL_ORG_ID` | from local `.vercel/project.json` → `orgId` |
| `VERCEL_PROJECT_ID` | from local `.vercel/project.json` → `projectId` |

```bash
# one-time after creating the token in the Vercel dashboard
gh secret set VERCEL_TOKEN -R vira-soft/viraui-docs
```

**Local:**

```bash
vercel --prod
```

Do **not** link the Vercel project to GitHub. Private source: [vira-soft/viraui-docs](https://github.com/vira-soft/viraui-docs).

## Spec Kit

Feature: `specs/001-llm-first-docs-site/`

## Status (2026-09-17)

- Local Fumapress scaffold + full IA stubs: done
- Build (`pnpm build` → `dist/public` + server APIs): done
- Private GitHub [vira-soft/viraui-docs](https://github.com/vira-soft/viraui-docs): connected
- Vercel project `viraui-docs` (CLI, no GitHub link): live at https://docs.viraui.dev
- GitHub Actions production deploy on `main`: configured
- Plugins: preset + link validation + MCP (`/mcp`). Ask AI skipped (paid provider)
