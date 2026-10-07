**When to read:** Auditing unknown DOM by `role` when the widget is not a mapped project / DS component.

# APG examples by role

Source: [APG example index](https://www.w3.org/WAI/ARIA/apg/example-index/) (do **not** fetch that HTML). Links below are **pattern pages**. Fetch only rows that match widgets in the UI. Need a concrete example? Open the pattern page, then one `examples/` link from there.

Prefer [`project-map.md`](project-map.md) when the widget is a known project / DS component.

## Checklist

1. Confirm the widget is **not** covered by [`project-map.md`](project-map.md) widget kind.
2. Read the rendered `role` (not source alone).
3. Fetch only matching pattern URLs from the table.
4. Compare keyboard/states to rendered DOM; do not paste APG sample attrs onto library-owned chrome.

## Gotchas

- **Never fetch** the example-index page — this table is the role index.
- Do **not** copy APG roles onto primitives that already emit correct chrome.
- Prefer [`project-map.md`](project-map.md) over guessing from `role="button"` on a custom div when a project Button exists.
- One `role` may list several patterns; pick the one that matches the UI, then fetch that URL only.

| Role | Patterns |
| --- | --- |
| `alert` | [`alert`](https://www.w3.org/WAI/ARIA/apg/patterns/alert/) [`alertdialog`](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/) |
| `alertdialog` | [`alertdialog`](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/) |
| `article` | [`disclosure`](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/) [`feed`](https://www.w3.org/WAI/ARIA/apg/patterns/feed/) |
| `banner` | [`menubar`](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) [`treeview`](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/) [`landmarks`](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/) |
| `button` | [`button`](https://www.w3.org/WAI/ARIA/apg/patterns/button/) |
| `cell` | [`table`](https://www.w3.org/WAI/ARIA/apg/patterns/table/) |
| `checkbox` | [`checkbox`](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/) |
| `columnheader` | [`table`](https://www.w3.org/WAI/ARIA/apg/patterns/table/) |
| `combobox` | [`combobox`](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) |
| `complementary` | [`landmarks`](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/) |
| `contentinfo` | [`menubar`](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) [`treeview`](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/) [`landmarks`](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/) |
| `dialog` | [`combobox`](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) [`dialog-modal`](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) |
| `feed` | [`feed`](https://www.w3.org/WAI/ARIA/apg/patterns/feed/) |
| `form` | [`landmarks`](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/) |
| `grid` | [`combobox`](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) [`dialog-modal`](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) [`grid`](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) |
| `gridcell` | [`combobox`](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) [`grid`](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) [`treegrid`](https://www.w3.org/WAI/ARIA/apg/patterns/treegrid/) |
| `group` | [`carousel`](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) [`checkbox`](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/) [`listbox`](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) [`menubar`](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) [`slider`](https://www.w3.org/WAI/ARIA/apg/patterns/slider/) [`spinbutton`](https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/) [`switch`](https://www.w3.org/WAI/ARIA/apg/patterns/switch/) [`treeview`](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/) |
| `link` | [`link`](https://www.w3.org/WAI/ARIA/apg/patterns/link/) |
| `listbox` | [`combobox`](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) [`listbox`](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) |
| `main` | [`landmarks`](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/) |
| `menu` | [`menu-button`](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) [`menubar`](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) [`toolbar`](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) |
| `menubar` | [`menubar`](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) |
| `menuitem` | [`menu-button`](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) [`menubar`](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) |
| `menuitemcheckbox` | [`menubar`](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) |
| `menuitemradio` | [`menubar`](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) [`toolbar`](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) |
| `meter` | [`meter`](https://www.w3.org/WAI/ARIA/apg/patterns/meter/) |
| `navigation` | [`menubar`](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) [`treeview`](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/) [`landmarks`](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/) |
| `none` | [`menu-button`](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) [`menubar`](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) [`radio`](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) [`slider-multithumb`](https://www.w3.org/WAI/ARIA/apg/patterns/slider-multithumb/) [`slider`](https://www.w3.org/WAI/ARIA/apg/patterns/slider/) [`treeview`](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/) |
| `option` | [`combobox`](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) [`listbox`](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/) |
| `radio` | [`radio`](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) [`toolbar`](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) |
| `radiogroup` | [`radio`](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) [`toolbar`](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) |
| `region` | [`accordion`](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) [`carousel`](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) [`menubar`](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) [`treeview`](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/) [`landmarks`](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/) |
| `row` | [`combobox`](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/) [`grid`](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) [`table`](https://www.w3.org/WAI/ARIA/apg/patterns/table/) [`treegrid`](https://www.w3.org/WAI/ARIA/apg/patterns/treegrid/) |
| `rowgroup` | [`table`](https://www.w3.org/WAI/ARIA/apg/patterns/table/) |
| `search` | [`landmarks`](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/) |
| `separator` | [`menubar`](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) |
| `slider` | [`slider-multithumb`](https://www.w3.org/WAI/ARIA/apg/patterns/slider-multithumb/) [`slider`](https://www.w3.org/WAI/ARIA/apg/patterns/slider/) |
| `spinbutton` | [`spinbutton`](https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/) [`toolbar`](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) |
| `switch` | [`switch`](https://www.w3.org/WAI/ARIA/apg/patterns/switch/) |
| `tab` | [`carousel`](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) [`tabs`](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) |
| `table` | [`table`](https://www.w3.org/WAI/ARIA/apg/patterns/table/) |
| `tablist` | [`carousel`](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) [`tabs`](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) |
| `tabpanel` | [`carousel`](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) [`tabs`](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) |
| `toolbar` | [`toolbar`](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/) |
| `tree` | [`treeview`](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/) |
| `treegrid` | [`treegrid`](https://www.w3.org/WAI/ARIA/apg/patterns/treegrid/) |
| `treeitem` | [`treeview`](https://www.w3.org/WAI/ARIA/apg/patterns/treeview/) |

## Experimental

Index lists experimental examples under listbox and tabs. Fetch those pattern pages only if the UI matches: [listbox](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/), [tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/).
