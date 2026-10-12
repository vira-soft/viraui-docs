# Contract: Deploy & DNS

1. Build: `pnpm build` → `dist/public` (prerendered HTML + `/RSC` payloads). Render `mode: "static"` — CDN-only, no Vercel Function (avoids Fluid Active CPU on soft-nav `/RSC`). Docs MCP runtime + `/get-started/mcp` page removed.
2. Host: Vercel project **without** Vercel↔GitHub integration (CLI-linked project only). Static adapter output only (no serverless).
3. Publish:
   - **CI (preferred):** GitHub Actions `.github/workflows/deploy.yml` on push to `main` → `vercel pull` → `vercel build --prod` → `vercel deploy --prebuilt --prod`.
   - **Local:** `vercel --prod`.
4. Secrets (repo `vira-soft/viraui-docs`): `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` (from `.vercel/project.json` locally; never commit `.vercel/`).
5. Domain: attach `docs.viraui.dev` in Vercel; Namecheap CNAME `docs` → Vercel DNS target.
6. Git: private `https://github.com/vira-soft/viraui-docs.git` as sole origin.
