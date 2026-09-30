# Contract: Information Architecture Tree

Public URLs (no `/docs` prefix; host is docs.viraui.dev):

```
/                          → Introduction (Core + Pro overview)
/why                       → why & how
/principles                → principles
/layers                    → layers & composition
/get-started               → Get started overview
/get-started/setup         → setup prompts & explanations
/get-started/theming/…     → Theming group (expandable; defaultOpen false)
/get-started/theming/what-is-a-theme → theme model, tokens, light/dark
/get-started/theming/built-in-themes → @viraui/foundation presets + Fontsource
/get-started/theming/custom-themes → custom CSS, App Studio, agent sheets
/get-started/skills        → consumer skills for agents
/get-started/mcp           → docs MCP (Streamable HTTP) setup + examples
/get-started/utilities/…   → Utilities group (expandable; defaultOpen false)
/get-started/utilities/use-breakpoints → useBreakpoints (opt-in viewport match helper)
/foundation                → foundation overview
/foundation/colors
/foundation/motion
/foundation/elevation
/foundation/effects
/foundation/typography
/foundation/spacing
/foundation/radius
/foundation/icons
/components                → components overview (category cards → first component page)
/components/{category}/{component}  → component page (category folders expandable in nav; no category index)
```

Sidebar roots (Fumadocs root type `"docs"` — dropdown under search, not version numbers):

| Root title | Content folder | URL prefix |
| --- | --- | --- |
| Design System | `content/(design-system)/` (folder group — no slug prefix) | none (`/`, `/principles`, `/foundation/…`) |
| Components | `content/components/` | `/components` |

Sidebar footer (both roots, below the page tree): **Get ViraUI Pro** → `https://viraui.dev/#pro`. Not a content page.

**Design System** sidebar: intro pages at first level; **Get started** and **Foundation** separator titles with extracted children (Get started order: setup → Theming group → skills → mcp → Utilities group). No Components separator here.

**Components** sidebar: category folders only (nested component pages, `defaultOpen: false`; no category index) — no **Components** separator/title in the tree (the root dropdown label covers it). Overview lives at `/components` only.

Theming and Utilities are expandable folders (`defaultOpen: false`) with child pages. Theming children: `what-is-a-theme`, `built-in-themes`, `custom-themes`. Utilities children: currently `use-breakpoints`. Nav icons are `@viraui/icons` names via local `viraIconsPlugin` + shared `<Icon name="…" />` (sync duo barrel — same file-count tradeoff as Lucide plugin; avoid `import.meta.glob` over the full set).

Categories (Storybook-aligned): actions, dialogs, effects, inputs, layout, loading, navigation, overlays, typography, widgets.

Component inventory source of truth for stubs: `contracts/component-inventory.txt` (generated from ViraUI Storybook titles).
