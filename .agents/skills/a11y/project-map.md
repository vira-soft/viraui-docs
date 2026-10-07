**When to read:** Mapping a **consumer-project** (or DS) component to an APG pattern URL before fetching.

# Project → APG pattern

Fetch the pattern URL, not the example-index page. No matching widget kind = no APG widget pattern; audit page semantics only.

APG rules are **stack-agnostic**. React, Vue, Angular, Svelte, Web Components, plain HTML — same patterns. Only **how you name and find** the widget changes.

## Checklist

1. Detect stack and UI surface: framework, design-system package, shared `components/` / `ui/` folder, Storybook, or raw markup.
2. Prefer project docs (a11y notes, Storybook, DS README, `*accessibility*`) when they map a component to a pattern or forbid consumer ARIA.
3. Identify the **public** component / custom element / directive in scope (not an internal sub-part unless that is what you are auditing).
4. Map it to a **widget kind** in the table below → fetch that pattern URL only.
5. If no kind fits: use [`roles.md`](roles.md) / [`properties.md`](properties.md) from **rendered** `role` / `aria-*`.
6. Layout, decorative, and purely presentational pieces are never APG widgets.

## Gotchas

- **Never fetch** [APG example-index](https://www.w3.org/WAI/ARIA/apg/example-index/). This table + [`roles.md`](roles.md) / [`properties.md`](properties.md) replace it.
- Do **not** copy APG sample markup onto library parts — map → fetch pattern → compare rendered DOM.
- Prefer this file over [`roles.md`](roles.md) when the widget is a known project / DS export.
- Do not force Accordion/Button/etc. onto layout stacks, surfaces, grids, spacers, or decorative effects.
- Component names differ by project (`MatDialog`, `UiModal`, `el-dialog`, `Dialog.Root`) — match by **behavior/kind**, not brand spelling.

## Discover (per audit)

| Step | Look for |
| --- | --- |
| Package / import | Design-system or UI kit imports on the screen |
| Local components | Shared folders the screen imports |
| Framework widgets | e.g. Angular Material / CDK, Vuetify, PrimeNG, shadcn, Radix, Headless UI |
| Native HTML | `<button>`, `<dialog>`, `<details>`, `<select>`, … — still map to APG kinds |
| Docs | Project ACCESSIBILITY.md, Storybook a11y, DS “accessibility” sections |

If consumer guidelines conflict with this skill → hard-contract gate in [`SKILL.md`](SKILL.md).

Base: `https://www.w3.org/WAI/ARIA/apg/patterns/<id>/`

## Widget kind → pattern

| Widget kind (examples) | Pattern | URL |
| --- | --- | --- |
| Accordion / expansion panels | Accordion | https://www.w3.org/WAI/ARIA/apg/patterns/accordion/ |
| Autocomplete / typeahead / searchable select | Combobox | https://www.w3.org/WAI/ARIA/apg/patterns/combobox/ |
| Button / icon button / toggle button | Button | https://www.w3.org/WAI/ARIA/apg/patterns/button/ |
| Link-styled control that navigates | Link | https://www.w3.org/WAI/ARIA/apg/patterns/link/ |
| Checkbox / checkbox group | Checkbox | https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/ |
| Modal dialog | Dialog (Modal) | https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/ |
| Menu triggered by a button | Menu Button | https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/ |
| Meter / determinate gauge | Meter | https://www.w3.org/WAI/ARIA/apg/patterns/meter/ |
| Popover / non-modal disclosure panel | Disclosure | https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/ |
| Radio / radio group | Radio Group | https://www.w3.org/WAI/ARIA/apg/patterns/radio/ |
| Select (custom listbox popup) | Combobox | https://www.w3.org/WAI/ARIA/apg/patterns/combobox/ |
| Native `<select>` (no custom popup) | (often n/a widget row — audit native semantics + labels) | — |
| Slider | Slider | https://www.w3.org/WAI/ARIA/apg/patterns/slider/ |
| Switch | Switch | https://www.w3.org/WAI/ARIA/apg/patterns/switch/ |
| Tabs | Tabs | https://www.w3.org/WAI/ARIA/apg/patterns/tabs/ |
| Toast / assertive status | Alert | https://www.w3.org/WAI/ARIA/apg/patterns/alert/ |
| Toggle group / segmented control | Toolbar | https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/ |
| Tooltip | Tooltip | https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/ |
| Breadcrumb | Breadcrumb | https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/ |
| Carousel | Carousel | https://www.w3.org/WAI/ARIA/apg/patterns/carousel/ |
| Listbox (standalone) | Listbox | https://www.w3.org/WAI/ARIA/apg/patterns/listbox/ |
| Menubar | Menubar | https://www.w3.org/WAI/ARIA/apg/patterns/menubar/ |
| Tree / tree view | Tree View | https://www.w3.org/WAI/ARIA/apg/patterns/treeview/ |
| Grid (interactive data grid) | Grid | https://www.w3.org/WAI/ARIA/apg/patterns/grid/ |
| Table (static data table) | Table | https://www.w3.org/WAI/ARIA/apg/patterns/table/ |
| Spin button | Spinbutton | https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/ |
| Alert dialog | Alertdialog | https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/ |
| Fieldset / group name for radios or checkboxes | Radio Group / Checkbox | https://www.w3.org/WAI/ARIA/apg/patterns/radio/ |
| Page landmarks | Landmarks | https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/ |

Progress bars without a widget pattern, layout primitives, and decorative visuals → `n/a` (page semantics only). Ambiguous custom widgets → [`roles.md`](roles.md) from rendered `role`.
