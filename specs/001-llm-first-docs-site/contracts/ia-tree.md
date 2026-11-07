# Contract: Information Architecture Tree

Public URLs (no `/docs` prefix; host is docs.viraui.dev):

```
/                          → Introduction (Core + Pro overview)
/principles                → principles
/layers                    → layers & composition
/get-started               → Get started overview
/get-started/setup         → setup prompts & explanations
/get-started/theming/…     → Theming group (expandable; defaultOpen false)
/get-started/theming/what-is-a-theme → theme model, tokens, light/dark
/get-started/theming/built-in-themes → @viraui/foundation presets + Fontsource
/get-started/theming/custom-themes → custom CSS, App Studio, agent sheets
/get-started/skills        → consumer skills for agents
/get-started/utilities/…   → Utilities group (expandable; defaultOpen false)
/get-started/utilities/breakpoints → Breakpoints (opt-in viewport match helper)
/get-started/utilities/direction → Direction (Base UI DirectionProvider re-export / RTL)
/foundation                → foundation overview
/foundation/colors
/foundation/motion
/foundation/elevation
/foundation/effects
/foundation/typography
/foundation/spacing
/foundation/radius
/foundation/iconography
/components                → components overview (category cards → first component page)
/components/{category}/{component}  → component page (category folders expandable in nav; no category index)
/charts/get-started/overview → Charts package intro
/charts/get-started/setup    → charts setup prompts
/charts/get-started/responsive → parent size / ScaleSVG / mobile scrub
/charts/get-started/tooltips → tooltip compose patterns
/charts/get-started/overrides → series + chrome token overrides
/charts/{line,area,bar,pie,radar} → chart type pages (flat under Charts separator)
```

Sidebar roots (Fumadocs root type `"docs"` — dropdown under search, not version numbers):

| Root title | Content folder | URL prefix |
| --- | --- | --- |
| Design System | `content/(design-system)/` (folder group — no slug prefix) | none (`/`, `/principles`, `/foundation/…`) |
| Components | `content/components/` | `/components` |
| Charts | `content/charts/` | `/charts` |

Sidebar footer (all roots, below the page tree): **Explore ViraUI Pro** → `https://pro.viraui.dev`. Not a content page.

**Design System** sidebar: intro pages at first level; **Get started** and **Foundation** separator titles with extracted children (Get started order: setup → Theming group → skills → Utilities group). No Components separator here. Docs MCP page/route removed (static deploy).

**Components** sidebar: category folders only (nested component pages, `defaultOpen: false`; no category index) — no **Components** separator/title in the tree (the root dropdown label covers it). Overview lives at `/components` only.

**Charts** sidebar: **Get started** separator (overview → setup → responsive → tooltips → overrides) then **Charts** separator with flat leaves `line`, `area`, `bar`, `pie`, `radar`. No Cartesian/Pie/Radar category folders. Tooltip and Overrides stay under Get started only. Contract: `specs/008-charts-docs/contracts/charts-ia.md`.

Theming and Utilities are expandable folders (`defaultOpen: false`) with child pages. Theming children: `what-is-a-theme`, `built-in-themes`, `custom-themes`. Utilities children: `breakpoints`, `direction`. Nav icons are `@viraui/icons` names via local `viraIconsPlugin` + shared `<Icon name="…" />` (sync duo barrel — same file-count tradeoff as Lucide plugin; avoid `import.meta.glob` over the full set).

Categories (Storybook-aligned): actions, dialogs, effects, inputs, layout, loading, navigation, overlays, typography, widgets.

Component inventory source of truth for stubs: `contracts/component-inventory.txt` (generated from ViraUI Storybook titles). Human docs may co-locate Storybook siblings that share chrome on one page — ButtonLink lives on Button; IconButtonLink lives on IconButton — so the inventory lists the docs page, not every Storybook title.
