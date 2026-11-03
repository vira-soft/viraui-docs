# Bootstrap packages and import order

**When to read:** installing `@viraui/react`, installing agent skills, deciding charts / `@viraui/icons` vs another icon library, fixing missing styles / wrong import order, or mounting root overlay providers.

**Authority:** `@viraui/react/specs/foundation/bootstrap.xml` (packages, import order, root providers, framework rules). Charts install after yes → also `@viraui/charts/specs/foundation/bootstrap.xml`. Theme groups → `foundation/theme-topics.xml`. This page is the **playbook**; do not invent paths that contradict bootstrap.xml.

## Theme choice — hard gate

**Before** installing `@viraui/foundation` or `@fontsource-variable/*`, ask:

1. **Default Vira theme** → install foundation + matching fonts ([foundation-exports.md](foundation-exports.md), [theme.md](theme.md))
2. **Custom App Studio theme** → skip foundation; paste/save Studio `theme.css`; install fonts detected in that CSS ([theme.md](theme.md) Studio path)

Do not assume default. Do not install foundation/fonts until answered.

## Charts intent — hard gate

**Early in bootstrap** (with package installs, before or beside theme choice), ask:

> Will this app use charts / graphs / data visualization?

| Answer                                                       | Action                                                                                                                                       |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Yes** (or consumer already named charts/dashboards/graphs) | Default: `pnpm add @viraui/charts @visx/visx` (with React peers already planned). Single visx peer = `@visx/visx` — not every `@visx/<pkg>`. |
| **No**                                                       | Skip charts packages. Recap marks Charts skipped.                                                                                            |
| Consumer names another chart stack (Recharts, Chart.js, …)   | Follow that ask — do **not** force `@viraui/charts`.                                                                                         |
| Unanswered                                                   | **Blocked** — do not auto-install charts packages.                                                                                           |

Charts does **not** replace theme/preflight. Compose authority after install → **viraui-design** [charts.md](../viraui-design/charts.md) → installed `@viraui/charts/specs/*` (index-first). Setup is not a charts API encyclopedia.

## Defaults

| Need             | Default                                                                           |
| ---------------- | --------------------------------------------------------------------------------- |
| Agent skills     | `npx skills add vira-soft/viraui-skills`                                          |
| Theme            | Ask first — foundation preset **or** Studio/custom CSS (`theme-topics` fit)       |
| Charts           | Ask first — yes → `@viraui/charts` + `@visx/visx`; no → skip                      |
| Fonts            | After theme choice — `@fontsource-variable/*` matching that theme                 |
| Preflight        | `@viraui/react/preflight.css` after theme + fonts                                 |
| Import mechanism | JS side-effect imports in root entry — never CSS `@import`                        |
| Overlay shell    | `Dialog` + `Tooltip` + `Toast` providers once at app root                         |
| Content icons    | Optional. `@viraui/icons` for Vira glyphs; any ReactNode (other libs, custom SVG) |
| Components       | `@viraui/react` root barrel only                                                  |

## Checklist

- [ ] Install publishable agent skills (`viraui-setup`, `viraui-design`, `viraui-motion`, `viraui-a11y`)
- [ ] Install `@viraui/react` + peers: `react`, `react-dom`, `@base-ui/react`
- [ ] **Ask charts intent** — yes → `@viraui/charts` + `@visx/visx`; no → skip; unanswered → blocked
- [ ] Ask default vs App Studio custom **before** foundation/font installs
- [ ] Theme path: foundation presets **or** saved Studio/custom CSS — [theme.md](theme.md)
- [ ] Optional: `@viraui/icons` only for Vira content glyphs
- [ ] Root entry: theme CSS → font CSS → preflight (then app globals)
- [ ] If Tailwind/Bootstrap/other CSS reset present: warn → ask → omit third-party preflight — [css-framework-coexistence.md](css-framework-coexistence.md)
- [ ] Mount provider shell once; framework mount site → [frameworks.md](frameworks.md) + bootstrap.xml `root_providers`
- [ ] Components from `@viraui/react` root. Icon slots take any ReactNode
- [ ] Validate: semantic `--global-*` resolve; `toastManager.add` paints a `Toast.Banner`

## Agent skills

```bash
npx skills add vira-soft/viraui-skills
```

Same pack for Cursor, Claude Code, Codex, Gemini, and other Agent Skills hosts — no per-host forks.

Do **not** use deprecated npm `@viraui/skills` / tarball install paths.

Optional belt: paste the portable project note into consumer `AGENTS.md` (or host-equivalent) — [agents-project-note.md](agents-project-note.md). Primary enforcement stays in skill descriptions + hubs; do not rely on Cursor-only rules.

## Packages (summary)

| Package               | Required? | Role                                                                |
| --------------------- | --------- | ------------------------------------------------------------------- |
| `@viraui/react`       | Yes       | Components, preflight, package specs                                |
| `react` / `react-dom` | Yes       | Peers                                                               |
| `@base-ui/react`      | Yes       | Peer for wrapped primitives                                         |
| `@viraui/foundation`  | No*       | Preset brand CSS — only after **default** theme answer              |
| `@viraui/icons`       | No        | Optional Vira glyphs; slots accept any ReactNode                    |
| `@viraui/charts`      | No†       | Optional token-styled visx primitives + `@viraui/charts/specs`      |
| `@visx/visx`          | No†       | Required peer when charts is installed (meta — not every `@visx/*`) |

\*Required for default presets; never auto-install. Studio/custom path skips it.
†Only after **yes** to charts intent (or consumer already named charts). Default yes-path installs both.

Full supported/forbidden path list → `foundation/bootstrap.xml` (+ [foundation-exports.md](foundation-exports.md)).

## Import order

In the app **root entry** ([frameworks.md](frameworks.md)):

1. Theme CSS — preset, custom, or theme-builder export
2. Font CSS — matches `--font-family-heading|body|mono`
3. `@viraui/react/preflight.css`
4. App-owned globals (e.g. `./globals.css`)

CSS alone does not enable overlays — wrap the tree in the provider shell next.

## Root providers

Mount **once** at framework root. Exact tree → `foundation/bootstrap.xml` `root_providers`. Overlay compose shapes → **viraui-design** [composition.md](../viraui-design/composition.md).

Typical shell: `Dialog.Provider` (+ indent parts when using indent), `Tooltip.Provider`, `Toast.Provider` + viewport mapping. Do not remount providers per page.

## Gotchas

- Installing foundation/fonts before theme choice answer.
- Installing `@viraui/charts` / `@visx/visx` without charts-intent answer — or skipping the ask entirely.
- Listing every `@visx/<pkg>` as a peer instead of `@visx/visx` only.
- Treating setup prose as charts API — compose via **viraui-design** charts.md → `@viraui/charts/specs`.
- CSS `@import` for preflight instead of JS side-effect imports.
- Provider on a single page instead of root layout.
- Per-component CSS to “fix” missing styles.
- Treating `@viraui/icons` as mandatory for icon slots.
- Guessing framework entry paths — [frameworks.md](frameworks.md) + bootstrap.xml.

## Stop — validate

Semantic tokens resolve; overlays paint; setup recap table on the hub. Then **viraui-design** for UI compose.
