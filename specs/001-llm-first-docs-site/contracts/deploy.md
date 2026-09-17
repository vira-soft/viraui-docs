# Contract: Deploy & DNS

1. Build: `pnpm build` → `dist/public` (prerendered pages) + `dist/server` (MCP `/mcp`). Render `mode: "default"` (not `static`) so MCP works.
2. Host: Vercel project **without** Vercel↔GitHub integration (CLI-linked project only). Vercel adapter emits static + serverless function.
3. Publish:
   - **CI (preferred):** GitHub Actions `.github/workflows/deploy.yml` on push to `main` → `vercel pull` → `vercel build --prod` → `vercel deploy --prebuilt --prod`.
   - **Local:** `vercel --prod`.
4. Secrets (repo `vira-soft/viraui-docs`): `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` (from `.vercel/project.json` locally; never commit `.vercel/`).
5. Domain: attach `docs.viraui.dev` in Vercel; Namecheap CNAME `docs` → Vercel DNS target.
6. Git: private `https://github.com/vira-soft/viraui-docs.git` as sole origin.
