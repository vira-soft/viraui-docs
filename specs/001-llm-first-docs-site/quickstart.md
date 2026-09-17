# Quickstart Validation

## Prerequisites

- Node ≥ 20 (prefer 24 like sister repos)
- pnpm or npm
- Vercel CLI logged in
- Namecheap DNS access for `viraui.dev`
- GitHub auth for `vira-soft` (private repo create)

## Local

```bash
cd /Users/mattia/Workspaces/vira/viraui-ds/viraui-docs
pnpm install   # or npm install
pnpm dev       # http://localhost:3000
```

Checks:

- [ ] Home states LLM-first positioning
- [ ] Nav: Intro, Get started, Foundation, Components
- [ ] Foundation children stubs open
- [ ] Components overview lists 10 categories
- [ ] Sample component page has narrative + PreviewSlot + titled prompt code block

## Build

```bash
pnpm build
# dist/public present
```

## Deploy (no Git link)

**CI:** merge/push to `main` runs `.github/workflows/deploy.yml` (needs `VERCEL_TOKEN` + org/project id secrets).

**Local:**

```bash
vercel --prod
# attach docs.viraui.dev in Vercel dashboard/CLI
```

## DNS

Namecheap: CNAME `docs` → `cname.vercel-dns.com` (or Vercel-provided target)

## Git remote

```bash
gh repo create vira-soft/viraui-docs --private --source=. --remote=origin --push
```
