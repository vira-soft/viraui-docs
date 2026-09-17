**When to read:** Mapping a Vira `@viraui/react` component to an APG pattern URL before fetching.

# Vira → APG pattern

Fetch the pattern URL, not the example-index page. No row = no APG widget pattern; audit page semantics only (see **viraui-design** [accessibility.md](../viraui-design/accessibility.md)).

**Same-change:** new/renamed/removed public `@viraui/react` component updates this file in the same change — APG pattern URL, or the n/a / layout / decorative footnote. Do not rewrite [roles.md](roles.md) / [properties.md](properties.md) for Vira add/remove (W3C index, not the Vira surface). Matrix sync: **viraui-design** [component-matrix.md](../viraui-design/component-matrix.md).

## Checklist

1. Identify the public Vira export (not a raw DOM role).
2. Look up the row below; fetch that pattern URL only.
3. If no row: page semantics / guide only — do not invent a pattern from APG samples.
4. Layout and decorative components are never APG widgets.

## Gotchas

- **Never fetch** [APG example-index](https://www.w3.org/WAI/ARIA/apg/example-index/). This table + [roles.md](roles.md) / [properties.md](properties.md) replace it.
- Do **not** copy APG sample markup onto Vira — map → fetch pattern → compare rendered DOM.
- Prefer this file over [roles.md](roles.md) when the widget is a known Vira component.
- `LinearProgress`, `Stack`, `Surface`, `Grid`, and decorative effects have no widget pattern — do not force Accordion/Button/etc. onto them.

Base: `https://www.w3.org/WAI/ARIA/apg/patterns/<id>/`

| Vira                                     | Pattern                             | URL                                                    |
| ---------------------------------------- | ----------------------------------- | ------------------------------------------------------ |
| `Accordion`                              | Accordion                           | https://www.w3.org/WAI/ARIA/apg/patterns/accordion/    |
| `Autocomplete`                           | Combobox                            | https://www.w3.org/WAI/ARIA/apg/patterns/combobox/     |
| `Button` / `IconButton` / `ToggleButton` | Button                              | https://www.w3.org/WAI/ARIA/apg/patterns/button/       |
| `ButtonLink` / `IconButtonLink`          | Link                                | https://www.w3.org/WAI/ARIA/apg/patterns/link/         |
| `Checkbox` / `CheckboxGroup`             | Checkbox                            | https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/     |
| `Dialog`                                 | Dialog (Modal)                      | https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/ |
| `Menu`                                   | Menu Button                         | https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/  |
| `Meter`                                  | Meter                               | https://www.w3.org/WAI/ARIA/apg/patterns/meter/        |
| `Popover`                                | Disclosure                          | https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/   |
| `Radio` / `RadioGroup`                   | Radio Group                         | https://www.w3.org/WAI/ARIA/apg/patterns/radio/        |
| `Select`                                 | Combobox                            | https://www.w3.org/WAI/ARIA/apg/patterns/combobox/     |
| `Slider`                                 | Slider                              | https://www.w3.org/WAI/ARIA/apg/patterns/slider/       |
| `Switch`                                 | Switch                              | https://www.w3.org/WAI/ARIA/apg/patterns/switch/       |
| `Tabs`                                   | Tabs                                | https://www.w3.org/WAI/ARIA/apg/patterns/tabs/         |
| `Toast`                                  | Alert                               | https://www.w3.org/WAI/ARIA/apg/patterns/alert/        |
| `ToggleGroup`                            | Toolbar                             | https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/      |
| `Tooltip`                                | Tooltip                             | https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/      |
| `Fieldset`                               | Radio Group / Checkbox (group name) | https://www.w3.org/WAI/ARIA/apg/patterns/radio/        |
| Page landmarks                           | Landmarks                           | https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/    |

`LinearProgress` has no APG widget row — determinate vs `value={null}` stays in **viraui-design** [accessibility.md](../viraui-design/accessibility.md). Layout (`Stack`, `Surface`, `Grid`, …) and decorative effects are not APG widgets.
