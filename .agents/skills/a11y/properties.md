**When to read:** Auditing unknown DOM by `aria-*` property or state when the widget is not mapped via [`project-map.md`](project-map.md).

# APG examples by property or state

Source: [APG example index](https://www.w3.org/WAI/ARIA/apg/example-index/) (do **not** fetch that HTML). Links below are **pattern pages**. Fetch only rows that match the `aria-*` under review.

Prefer [`project-map.md`](project-map.md) for known project / DS widgets. Omit attrs the library already emits.

## Checklist

1. Confirm the control is **not** covered by [`project-map.md`](project-map.md) + library-owned chrome.
2. Read the rendered `aria-*` (not source alone).
3. Fetch only matching pattern URLs from the table.
4. If the attr duplicates library chrome → fail the audit recommendation to “add” it; route fix through project API / page semantics.

## Gotchas

- **Never fetch** the example-index page — this table is the property index.
- Do **not** copy APG sample `aria-*` onto library-owned parts.
- Prefer [`project-map.md`](project-map.md) before hunting properties on a known project component.
- Presence of an `aria-*` in this index ≠ requirement to set it in consumer source.

| Property or state | Patterns |
| --- | --- |
| `aria-activedescendant` | [`combobox`](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) [`listbox`](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) [`menu-button`](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) [`radio`](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) |
| `aria-atomic` | [`alert`](https://www.w3.org/WAI/ARIA/apg/patterns/alert/) |
| `aria-autocomplete` | [`combobox`](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) |
| `aria-busy` | [`feed`](https://www.w3.org/WAI/ARIA/apg/patterns/feed/) |
| `aria-checked` | [`checkbox`](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/) [`menubar`](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) [`radio`](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) [`switch`](https://www.w3.org/WAI/ARIA/apg/patterns/switch/) [`toolbar`](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) |
| `aria-colcount` | [`grid`](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) |
| `aria-colindex` | [`grid`](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) |
| `aria-controls` | [`accordion`](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) [`carousel`](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) [`checkbox`](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/) [`combobox`](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) [`disclosure`](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/) [`menu-button`](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) [`spinbutton`](https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/) [`tabs`](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) [`toolbar`](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) |
| `aria-current` | [`breadcrumb`](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/) [`disclosure`](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/) [`menubar`](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) [`treeview`](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/) |
| `aria-describedby` | [`alertdialog`](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/) [`combobox`](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) [`dialog-modal`](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) [`feed`](https://www.w3.org/WAI/ARIA/apg/patterns/feed/) [`table`](https://www.w3.org/WAI/ARIA/apg/patterns/table/) |
| `aria-disabled` | [`alertdialog`](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/) [`menubar`](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) [`spinbutton`](https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/) [`toolbar`](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) |
| `aria-errormessage` | [`spinbutton`](https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/) |
| `aria-expanded` | [`accordion`](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) [`combobox`](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) [`disclosure`](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/) [`listbox`](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) [`menu-button`](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) [`menubar`](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) [`toolbar`](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) [`treegrid`](https://www.w3.org/WAI/ARIA/apg/patterns/treegrid/) [`treeview`](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/) |
| `aria-haspopup` | [`combobox`](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) [`listbox`](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) [`menu-button`](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) [`menubar`](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) [`toolbar`](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) |
| `aria-hidden` | [`button`](https://www.w3.org/WAI/ARIA/apg/patterns/button/) [`listbox`](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) [`menubar`](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) [`slider-multithumb`](https://www.w3.org/WAI/ARIA/apg/patterns/slider-multithumb/) [`slider`](https://www.w3.org/WAI/ARIA/apg/patterns/slider/) [`spinbutton`](https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/) [`switch`](https://www.w3.org/WAI/ARIA/apg/patterns/switch/) [`table`](https://www.w3.org/WAI/ARIA/apg/patterns/table/) [`toolbar`](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) |
| `aria-invalid` | [`spinbutton`](https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/) |
| `aria-label` | [`breadcrumb`](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/) [`carousel`](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) [`combobox`](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) [`dialog-modal`](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) [`link`](https://www.w3.org/WAI/ARIA/apg/patterns/link/) [`menubar`](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) [`radio`](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) [`slider-multithumb`](https://www.w3.org/WAI/ARIA/apg/patterns/slider-multithumb/) [`spinbutton`](https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/) [`table`](https://www.w3.org/WAI/ARIA/apg/patterns/table/) [`toolbar`](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) [`treegrid`](https://www.w3.org/WAI/ARIA/apg/patterns/treegrid/) [`treeview`](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/) |
| `aria-labelledby` | [`accordion`](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) [`alertdialog`](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/) [`checkbox`](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/) [`combobox`](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) [`dialog-modal`](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) [`feed`](https://www.w3.org/WAI/ARIA/apg/patterns/feed/) [`grid`](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) [`listbox`](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) [`menu-button`](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) [`menubar`](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) [`meter`](https://www.w3.org/WAI/ARIA/apg/patterns/meter/) [`radio`](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) [`slider`](https://www.w3.org/WAI/ARIA/apg/patterns/slider/) [`spinbutton`](https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/) [`switch`](https://www.w3.org/WAI/ARIA/apg/patterns/switch/) [`tabs`](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) [`treeview`](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/) [`landmarks`](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/) |
| `aria-level` | [`treegrid`](https://www.w3.org/WAI/ARIA/apg/patterns/treegrid/) [`treeview`](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/) |
| `aria-live` | [`alert`](https://www.w3.org/WAI/ARIA/apg/patterns/alert/) [`carousel`](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) [`combobox`](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) [`dialog-modal`](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) |
| `aria-modal` | [`alertdialog`](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/) [`combobox`](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) [`dialog-modal`](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) |
| `aria-multiselectable` | [`listbox`](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) |
| `aria-orientation` | [`slider`](https://www.w3.org/WAI/ARIA/apg/patterns/slider/) |
| `aria-owns` | [`treeview`](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/) |
| `aria-posinset` | [`feed`](https://www.w3.org/WAI/ARIA/apg/patterns/feed/) [`treegrid`](https://www.w3.org/WAI/ARIA/apg/patterns/treegrid/) [`treeview`](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/) |
| `aria-pressed` | [`button`](https://www.w3.org/WAI/ARIA/apg/patterns/button/) [`toolbar`](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) |
| `aria-roledescription` | [`carousel`](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) |
| `aria-rowcount` | [`grid`](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) |
| `aria-rowindex` | [`grid`](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) |
| `aria-selected` | [`carousel`](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) [`combobox`](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) [`dialog-modal`](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) [`listbox`](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) [`tabs`](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) [`treeview`](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/) |
| `aria-setsize` | [`feed`](https://www.w3.org/WAI/ARIA/apg/patterns/feed/) [`treegrid`](https://www.w3.org/WAI/ARIA/apg/patterns/treegrid/) [`treeview`](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/) |
| `aria-sort` | [`grid`](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) [`table`](https://www.w3.org/WAI/ARIA/apg/patterns/table/) |
| `aria-valuemax` | [`meter`](https://www.w3.org/WAI/ARIA/apg/patterns/meter/) [`slider-multithumb`](https://www.w3.org/WAI/ARIA/apg/patterns/slider-multithumb/) [`slider`](https://www.w3.org/WAI/ARIA/apg/patterns/slider/) [`spinbutton`](https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/) [`toolbar`](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) |
| `aria-valuemin` | [`meter`](https://www.w3.org/WAI/ARIA/apg/patterns/meter/) [`slider-multithumb`](https://www.w3.org/WAI/ARIA/apg/patterns/slider-multithumb/) [`slider`](https://www.w3.org/WAI/ARIA/apg/patterns/slider/) [`spinbutton`](https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/) [`toolbar`](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) |
| `aria-valuenow` | [`meter`](https://www.w3.org/WAI/ARIA/apg/patterns/meter/) [`slider-multithumb`](https://www.w3.org/WAI/ARIA/apg/patterns/slider-multithumb/) [`slider`](https://www.w3.org/WAI/ARIA/apg/patterns/slider/) [`spinbutton`](https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/) [`toolbar`](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) |
| `aria-valuetext` | [`slider`](https://www.w3.org/WAI/ARIA/apg/patterns/slider/) [`spinbutton`](https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/) [`toolbar`](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) |
