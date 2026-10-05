# Session memory

Not source of truth. Specs win. This file = map so agent skip re-explore.

Load once per session. Then open **only** owning spec for the task.
Update when durable map/gotchas change. No WIP, no contract copies, no page inventories.

## Identity

- Repo `vira-soft/viraui-docs` — English human docs for ViraUI (LLM-first narrative)
- Public host `https://docs.viraui.dev`
- Sibling DS monorepo `../vira-ui` (package API authority = `@viraui/react/specs`)
- Sibling skills `../viraui-skills`
- Sibling website (shared cover art) — optional; TokenSave peers via sibling MCP when needed
- Tooling `pnpm@10.28`, Node `24.15` (`.node-version`), TypeScript `7`, React `19.2`, Fumapress `1.3` / Fumadocs, Vite `8`, Tailwind `4`
- Dev `pnpm dev` → Fumapress; build `pnpm build` → `dist/public` + `dist/server` (MCP `/mcp`)
- No root `AGENTS.md` yet — Spec Kit under `specs/`; consumer `README.md` (logo + docs link); local/dev/deploy in `CONTRIBUTING.md`

## Spec router (open one)

| Task | Spec |
| ---- | ---- |
| Site scaffold / IA / deploy / page shell | `specs/001-llm-first-docs-site/` |
| IA URLs + nav icons contract | `specs/001-llm-first-docs-site/contracts/ia-tree.md` |
| Page regions (narrative / preview / prompt) | `specs/001-llm-first-docs-site/contracts/page-shell.md` |
| Vercel / GH Actions deploy | `specs/001-llm-first-docs-site/contracts/deploy.md` |
| Component stub inventory | `specs/001-llm-first-docs-site/contracts/component-inventory.txt` |
| Principles essay page | `specs/002-principles-docs/` (+ `contracts/principles-page.md`) |
| Layers composition page | `specs/003-layers-docs/` (+ `contracts/layers-page.md`) |
| Get started Setup page | `specs/004-setup-docs/` (+ `contracts/setup-page.md`) |
| Get started Skills page | `specs/005-skills-docs/` (+ `contracts/skills-page.md`) |
| Get started Utilities group | `specs/006-utilities-docs/` (+ `contracts/utilities-page.md`) |
| Foundation overview hub | `specs/007-foundation-docs/` (+ `contracts/foundation-page.md`) |
| Spec Kit skills | `.agents/skills/speckit-*` |

Consumer `README.md` = face + docs link. Contributor how-to = `CONTRIBUTING.md`. Specs win. Constitution stub in `.specify/memory/` — not filled.

## Paths

| What | Where |
| ---- | ----- |
| MDX pages + nav meta | `content/` (`meta.json` trees; DS under `(design-system)/` folder group; categories under `content/components/{category}/`) |
| Site config / plugins / MDX components | `press.config.tsx` |
| Local React helpers | `src/components/{common,demos}/`, `src/lib/`, `src/hooks/` |
| MDX custom tags | `src/mdx-components.ts` (+ `demos/index.ts`) → spread in `press.config` `getMdxComponents` |
| Spot SVGs | `src/illustrations/` |
| Vira icon loaders + nav plugin | `src/lib/vira-icon-loaders.ts`, `src/lib/vira-icons-plugin.tsx` |
| Shared cover | `public/cover.jpg` → OG / Twitter |
| Feature specs | `specs/001-llm-first-docs-site/` … `specs/007-foundation-docs/` |
| Deploy workflow | `.github/workflows/` (`release.yml` prod on `main`; `pr-quality.yml`) |
| Issue templates | `.github/ISSUE_TEMPLATE/` — bug only; blank issues off; Q&A / Ideas / General → Discussions |
| Discussion forms | `.github/DISCUSSION_TEMPLATE/{q-a,ideas}.yml` — match category slugs `q-a`, `ideas` |
| Vercel project link (local only) | `.vercel/project.json` — never commit |

## Product model

- Human docs for **humans who use LLMs as the central tool** — not LLM-only docs, not memorize-the-API study guides. Default path: agent does work, human reviews; docs help when deciding / doubting. Teach overview, capabilities, layers, when/why to pick a part.
- Prose = use cases + when-to-use (+ when-not / vs siblings on component pages). Short paragraphs (lead ≈2–3). Bullets / Callouts / headings OK when they help assimilation — prefer lists over long paragraphs when list is clearer. No text walls, no surface catalogs. Em-dashes rare. No telegraph short-sentence stacks. Keep **Ask your agent** prompts. Deep API stays in `@viraui/react/specs` / skills.
- Voice split: DS intro pages = product-story; component pages = task-oriented. Base UI Card stays top of ComponentPage body.
- Voice contract: `page-shell.md` + `.cursor/rules/02-docs-consumer-voice.mdc` (update when this model drifts).
- Setup order: install skills pack → reload editor → bootstrap prompt → verify prompt. Skills install is never nested inside the bootstrap prompt. Brand/theme = user choice; font import follows (built-in theme fonts vs custom) — not a hard “theme gate” that blocks foundation/font install.
- Component categories = Storybook-aligned: actions, dialogs, effects, inputs, layout, loading, navigation, overlays, typography, widgets.
- Intro top-level: `/`, `/principles`, `/layers` (no `/why` page); separators Get started / Foundation under **Design System** root. **Components** = second root (`root: "docs"` dropdown under search). Folder group `content/(design-system)/` keeps DS URLs unprefixed.
- Content rewrite landed on `docs/human-llm-prose-rewrite` (PR #1): page-shell + voice, drop `/why`, all DS + component MDX task/product-story rewrite; 1 commit per group.

## Context habits

- Code hunt: TokenSave `tokensave_context` (this repo graph; TokenSave initialized under `.tokensave/`)
- TokenSave MCP: **project-local only** — each repo with `.tokensave/` gets gitignored `.cursor/mcp.json` (`serve -p <that-repo>`). Sibling set: `vira-ui`, `viraui-app`, `viraui-docs`, `viraui-website`, (+ `llm-web-test-equinusocio` if open). No tokensave in `~/.cursor/mcp.json`. New repo: `tokensave init` then `tokensave install --agent cursor --local` (+ pin `-p`). Reload Window after MCP change; expect project MCP id, not `user-tokensave`
- Max 3 parallel agents; serial work = no spawn
- `.cursor/rules/` already in session — do not re-read
- Content/IA change → check owning feature contracts + `content/meta.json` trees
- New public component in DS → stub page under matching category + inventory sync when regenerating

## Durable gotchas

- Issues: only bug template; `blank_issues_enabled: false`; questions / feature requests → Discussions (`q-a`, `ideas`)
- `mode: "default"` (not static) — need server for MCP `/mcp` + link-validation plugin
- Ask AI **off** — needs paid model provider; MCP stays
- `githubUrl: "https://github.com/vira-soft/viraui-docs"` in `defaultLayoutProps` — nav GitHub icon (private repo; `site.git` also set)
- Page actions: Copy Markdown + `OpenWithPopover` only; frontmatter `pageActions: false` hides both
- Nav icons: `@viraui/icons` via `viraIconsPlugin` + shared `<Icon name="…" />` — sync duo barrel; avoid `import.meta.glob` over full icon set
- Content icons in MDX fences + `src/components/demos/**`: `@phosphor-icons/react` only — never `@viraui/icons` there. Rule `.cursor/rules/05-docs-demo-icons-phosphor.mdc`. Foundation icons page may still demo Lucide/Phosphor/sprite side-by-side
- Do **not** link Vercel project to GitHub — deploy via GH Actions secrets `VERCEL_TOKEN` / `VERCEL_ORG_ID` / `VERCEL_PROJECT_ID`
- Site cover: static `https://docs.viraui.dev/cover.jpg`; plugin `{ name: "core:takumi" }` skips per-page generated OG
- Banner: docs under construction (in `press.config.tsx` `renderRoot`)
- Sidebar CTA: `sidebar.footer` in `renderLayout` — "Get ViraUI Pro" → `https://viraui.dev/#pro` (both roots, below page tree)
- MDX paths: Design System pages live under `content/(design-system)/` (folder group); Components under `content/components/`. Root `meta.json` lists both roots only.
- Principles (`002`): no product/timeline claim for “browser as canvas”; Figma OK as disposable low-fi only; a11y → generic skills + link `/get-started/skills`; next links `/layers` + `/get-started/skills` only
- Layers (`003`): Cards use `layers-*` spotkit stack (one slab lit); intro Core Cards keep `foundation`/`components`/`motion`/`ai`
- Intro Spotkit (`core-*` / `pro-*`): **no fade mask**; contained panels; composition centered in 160 (same treatment as `foundation-*`)
- Setup (`004`): page = `content/(design-system)/get-started/setup.mdx` → `/get-started/setup` (not category `index`); icon `CubeSettings`; **skills install + editor reload before** bootstrap/verify prompts; Manual demoted
- Consumer voice: `.cursor/rules/02-docs-consumer-voice.mdc` + `page-shell.md` — AI-centric tool, human decide/review; short paras / bullets OK; em-dash rare; no telegraph stacks; no What's next
- Skills (`005`): page = `content/(design-system)/get-started/skills.mdx` → `/get-started/skills`; icon `OrbitSparkle`; orientation only (no install one-liner, no ask-agent fence); Setup owns install; brief MCP link required
- Utilities (`006`): expandable group `content/(design-system)/get-started/utilities/` (`defaultOpen: false`); child `use-breakpoints.mdx` → `/get-started/utilities/use-breakpoints`; owns BreakpointsProvider / `useBreakpoints` live Examples (`breakpoints-demo`, no sandbox resize — `matchMedia` is document viewport); not under Layout; Base UI = link-out
- Foundation overview (`007`): `/foundation` = lead → how-it-works → 8 Cards (title+image); title `Overview`; children = colors → motion → elevation → effects → typography → spacing → radius → icons
- Foundation Colors: `/foundation/colors` — browse `--global-*` / `--highlight-*` / `--color-*` swatches (`GlobalColorTokens`, `HighlightColorTokens`, `PrimitiveColorTokens` in `src/components/demos/color-tokens/`); theme retune → UI follows; “Change or extend” → Theming / Studio (no agent/skills CTA on foundation)
- Foundation Motion: flat `/foundation/motion` (`motion.mdx`, icon `AnimationFast`) — principles + functional/evocative; components already follow duration/easing; theme retune for pace. No skill CTA. Demos: `motion-demo-discreet` (Toast), `motion-demo-assistive` (4× Textfield), `motion-demo-intuitive` (EmptyTeam + fake cursor), `motion-demo-playful` (Distribute Track + Beam), `motion-demo-functional` (Accordion), `motion-demo-evocative` (Dialog); shared `hooks/use-prefers-reduced-motion/`.
- Docs root CSS: **no** full `vira.css` / preflight on `src/app.css` — they clash with Tailwind `@theme` (`--radius-*`, `--color-*-50/60/70`). Thin bridge `src/lib/vira-docs-bridge.ts` (`--global-*` / `--highlight-*` from `vira/nested`) injected in `press.config` `meta.root`. Spotkit / tab colors / foundation-colors art use bridge. Color swatches paint from nested JSON inline (not root `--color-*`). Full theme+preflight = **only** `ViraSandbox` iframe.
- `ViraSandbox` (`src/components/common/vira-sandbox/`): iframe `srcDoc` + `createPortal`; theme+preflight + **all** `@viraui/react` component CSS via `import.meta.glob(.../components/*/*.css?url)` (no manual list). Auto `data-mode` from parent `.dark`, or force via `mode` (`light` | `dark` | `inverted`). Always `data-vira-sandbox-auto-height` so content `scrollHeight` is measurable. Props: `height` / `minHeight` = **minimum** canvas (iframe grows with content); `resizable` = horizontal resize only; `vAlign` default **`center`** (`justifyContent` + `alignItems: center`; padding `1.25rem` when `padded`); use `start` / `padded={false}` only for edge-anchored patterns. Prefer per-demo height / `vPadding` for extra vertical air — do not force stage `alignItems: stretch`. `useViraSandboxDocument()` + portal `container={frameDoc.body}` for Dialog/Toast in-frame. Demo CSS modules do **not** apply across the iframe — inject with `useViraSandboxCss(import("./x.module.css?inline"))` from inside sandbox children.
- Theming: expandable group `content/(design-system)/get-started/theming/` (`defaultOpen: false`, icon `ColorPalette2`); children `what-is-a-theme` → `built-in-themes` → `custom-themes`. Not a Foundation child. Spot `foundation-themes-and-brand` registered but unused on hub. Built-ins: Vira, Vira Condensed (`vira-condensed.css`), Sunburst, Cinder
- Foundation Spotkit set (`foundation-*`): **no fade mask**; contained panels only; composition centered in 160; no bottom fake bars; done: colors, motion (bezier), elevation (hub: slight stack), effects (Glow border-ring on card), typography (raised specimen), spacing art key `foundation-space` (gap ladder exponential), radius (corner zoom: concentric R / R+p / R+2p), icons (outline mono vs fill duo, Vira sun/shield/cube); `foundation-themes-and-brand` exists (Get started theme page art optional)
- Foundation Elevation page (`/foundation/elevation`): elevation/`Elevator` = **shadow depth**, not `z-index` (same `0`–`4` numbers usually align; mechanisms independent). Essay plane → 4; shadows gate on theme; no skill CTA. Art = `foundation-elevation-layers`. Applying: `ElevatorDemo` + short `Elevator` snippet
- Foundation Effects page (`/foundation/effects`): `--effect-*` gates (empty/unset = on, `initial` = off). Pattern + examples, **no** enumerated effect inventory. Theme flip → UI follows; no spot; no skill CTA. Not Components/effects (Glow/Beam/…)
- Foundation Typography page (`/foundation/typography`): `Title` vs `Text` = separate typescales; Title `size` vs `render`; fluid = `100vi` (viewport), Title default on / Text default off (`fluid` prop). `TypographyFluidDemo` = resizable Surface + demo-only `--__*-fluid` remap to `100cqi` (handle works; product still `vi`). Theme owns fonts/typescale; no size inventory; no spot; no skill CTA
- Foundation Spacing page (`/foundation/spacing`): prefer layout props (`Stack`/`Grid`/`Surface`); CSS only for one-offs via `--space-*`; retune theme scale; no inventory; no spot; no skill CTA
- Foundation Radius page (`/foundation/radius`): prefer `radius` props; CSS only for one-offs via `--radius-*`; concentric nested corners = `radius="auto"` (Surface context − padding); live toggle demo `RadiusConcentricDemo` (equal token vs `auto`); retune theme scale; no token inventory; no spot; no skill CTA
- Foundation voice: substrate essays teach how Vira already wires look; consumer job = change theme. Skill/agent CTAs live on Get started Skills / Setup—not Foundation topic leads
- Get started order: setup → Theming group → skills → mcp → Utilities group
- MDX voice: speak to consumer (`you` / imperative); no meta “this page / keep this page / not here” — rule `.cursor/rules/02-docs-consumer-voice.mdc` (`content/**/*.mdx`)
- MDX: no 1:1 ViraUI surface catalogs unless page is a browser — `.cursor/rules/03-docs-no-surface-catalog.mdc`
- Component pages: live previews = demo components wrapping `ViraSandbox` (register via `src/mdx-components.ts` / demos barrel); `PreviewSlot` = stub only. Pattern set by Button (`src/components/demos/button-demo/`). Demo + teaching source fence (`tsx`/…) → `<Example preview={<XDemo />}>` (Fumadocs Tabs Preview/Code, independent, flush panels; `src/components/common/example`). Agent `text` prompts stay outside. No vertical demo+fence stack. Demo-only (motion, fluid typography) / prompt-only beside demo (icons empty-state) = no `Example`. **Co-locate link twins:** ButtonLink on `/components/actions/button`; IconButtonLink on `/components/actions/icon-button` (same chrome). No prop/variant inventories — name values inside examples. **Example `###` titles = pattern / use case** (Dual thumbs), not demo product UI (Price range) — `.cursor/rules/09-docs-example-titles.mdc`. Ask-your-agent tabs stay consumer intents. Page shell: `specs/001-llm-first-docs-site/contracts/page-shell.md`
- Base UI handoff Card: first body section after frontmatter (before lead narrative), only when sibling `meta.xml` has `<base_ui href>` (or via `shared_contract`). Copy `href` verbatim — rule `.cursor/rules/07-docs-base-ui-card.mdc`
- MDX code fences: incidental content → self-closing placeholders — `.cursor/rules/06-docs-code-fence-placeholders.mdc` (+ `page-shell.md`). Live demos keep real consumer copy.
- Docs Avatars: prefer photo `src` (`mockmind-api.uifaces.co/content/human/{n}.jpg`); keep required `fallback` but do not stage initials-only faces unless teaching missing/broken image — `.cursor/rules/08-docs-demo-avatars.mdc`
- Vite RSC: `lucide-react` → `optimizeDeps.exclude` in `vite.config.ts` (else “inconsistently optimized” warn)
- Generated / install: `dist/`, `node_modules/`, `.tokensave/`, `.pnpm-store/` — do not hand-edit

## Quality (owning spec wins)

| Area | Command |
| ---- | ------- |
| Types | `pnpm run types:check` |
| Build / link validation | `pnpm build` |
| Local preview | `pnpm dev` |

## MCP

- TokenSave: this repo graph (from sibling `../vira-ui` MCP, pass local checkout as `graph_root`)
- Docs MCP (runtime): `https://docs.viraui.dev/mcp` — search / get_page / list_pages; human page `/get-started/mcp`
- Browser GET `/mcp` → `Session ID required` = expected (Streamable HTTP needs POST initialize)
