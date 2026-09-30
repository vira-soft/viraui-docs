# Component selection matrix

**When to read:** choose among shipped `@viraui/react` guides, or sync matrix rows after a public component add/rename/remove.

Routing for all 46 shipped React guides. Confirm intent in the guide and accepted props/defaults in source/types. Discovery order → [discovery.md](discovery.md). High-risk trees → [composition.md](composition.md).

## Action vs display vs progress

| Need                                | Component                                       | Guide                         |
| ----------------------------------- | ----------------------------------------------- | ----------------------------- |
| Labeled click action                | `Button`                                        | `button.guide.json`           |
| Navigate looking like `Button`      | `ButtonLink`                                    | `button-link.guide.json`      |
| Icon-only action                    | `IconButton`                                    | `icon-button.guide.json`      |
| Icon-only navigation                | `IconButtonLink`                                | `icon-button-link.guide.json` |
| Two-state icon toggle               | `ToggleButton`                                  | `toggle-button.guide.json`    |
| Mutually exclusive icon toggles     | `ToggleGroup` + `ToggleButton`                  | `toggle-group.guide.json`     |
| Small label/tag                     | `Chip`                                          | `chip.guide.json`             |
| Corner status-dot overlay           | `Badge`                                         | `badge.guide.json`            |
| In-progress / indeterminate         | `LinearProgress`                                | `linear-progress.guide.json`  |
| Determinate metric (storage, score) | `Meter`                                         | `meter.guide.json`            |
| Loading placeholder                 | `Skeleton` (block or `Skeleton.Overlay`)        | `skeleton.guide.json`         |
| Inline loading indicator            | `Spinner` (set `aria-hidden`; parent owns busy) | `spinner.guide.json`          |

## Overlays and notifications

| Need                        | Component | Guide                |
| --------------------------- | --------- | -------------------- |
| Bottom sheet / focused task | `Dialog`  | `dialog.guide.json`  |
| Anchored contextual panel   | `Popover` | `popover.guide.json` |
| Action / account menu       | `Menu`    | `menu.guide.json`    |
| Hover/focus hint            | `Tooltip` | `tooltip.guide.json` |
| Transient notification      | `Toast`   | `toast.guide.json`   |

**Dialog vs Popover:** Dialog interrupts with sheet + scrim; Popover anchors to trigger for lightweight context. **Menu** owns portal + list keyboard — do not wrap Menu in Popover.

## Layout and structure

| Need                    | Component   | Guide                  |
| ----------------------- | ----------- | ---------------------- |
| Flex row/column         | `Stack`     | `stack.guide.json`     |
| CSS grid tracks         | `Grid`      | `grid.guide.json`      |
| Themed panel/card       | `Surface`   | `surface.guide.json`   |
| Break out of padding    | `Bleed`     | `bleed.guide.json`     |
| Column masonry grid     | `Masonry`   | `masonry.guide.json`   |
| Divider                 | `Separator` | `separator.guide.json` |
| Shadow/elevation helper | `Elevator`  | `elevator.guide.json`  |

## Typography

| Need                          | Component    | Guide                   |
| ----------------------------- | ------------ | ----------------------- |
| Body text                     | `Text`       | `text.guide.json`       |
| Heading/display               | `Title`      | `title.guide.json`      |
| Multi-line clamp              | `ClampText`  | `clamp-text.guide.json` |
| Fit copy to inline width      | `FitText`    | `fit-text.guide.json`   |
| Decorative shimmer text       | `Shimmer`    | `shimmer.guide.json`    |
| Decorative typewriter         | `Typewriter` | `typewriter.guide.json` |
| Decorative arrow/note callout | `Annotate`   | `annotate.guide.json`   |

## Forms

| Need                       | Component              | Guide                     |
| -------------------------- | ---------------------- | ------------------------- |
| Single-line input          | `Textfield`            | `textfield.guide.json`    |
| Multi-line input           | `Textarea`             | `textarea.guide.json`     |
| Dropdown select            | `Select`               | `select.guide.json`       |
| Free-form suggest / filter | `Autocomplete`         | `autocomplete.guide.json` |
| Boolean option             | `Checkbox`             | `checkbox.guide.json`     |
| Multi-select group         | `CheckboxGroup`        | `checkbox.guide.json`     |
| Single-select group        | `RadioGroup` + `Radio` | `radio.guide.json`        |
| Group legend/copy          | `Fieldset`             | `fieldset.guide.json`     |
| Toggle on/off              | `Switch`               | `switch.guide.json`       |
| Numeric range              | `Slider`               | `slider.guide.json`       |

`Field` is imported from `@base-ui/react`, not Vira. Textfield, Textarea, Select, and Autocomplete already own their Field root. Use external `Field.Root` for standalone Checkbox validation and RadioGroup/CheckboxGroup validation.

## Navigation patterns

| Need                     | Component   | Guide                  |
| ------------------------ | ----------- | ---------------------- |
| Tabbed sections          | `Tabs`      | `tabs.guide.json`      |
| Expand/collapse sections | `Accordion` | `accordion.guide.json` |

## Media and identity

| Need                | Component     | Guide                     |
| ------------------- | ------------- | ------------------------- |
| User avatar         | `Avatar`      | `avatar.guide.json`       |
| Overlapping avatars | `AvatarGroup` | `avatar-group.guide.json` |

Named icons come from `@viraui/icons/react`; their separate package guide is `@viraui/icons/icon.guide.json` and is not one of the 46 React guides.

## Effects (decorative)

| Need                            | Component         | Guide                         |
| ------------------------------- | ----------------- | ----------------------------- |
| Noise overlay                   | `StaticNoise`     | `static-noise.guide.json`     |
| Progressive blur overlay        | `ProgressiveBlur` | `progressive-blur.guide.json` |
| Pointer-driven border highlight | `Glow`            | `glow.guide.json`             |

Consumer owns positioning; `StaticNoise` / `ProgressiveBlur` default `aria-hidden`. `Glow` highlight is decorative CSS only. `StaticNoise` and `Glow` are memory-heavy — use sparingly (rarely).

## Surface sync (monorepo authors)

When a public `@viraui/react` component is added/changed/removed, update in the **same change**: every shipped `*.guide.json` row here; [composition.md](composition.md) for compound trees; a11y/layout/styling refs when taught behavior changes; `viraui-a11y/vira-map.md` on add/rename/remove. Accuracy over brevity — do not drop matrix rows.

## Gotchas

| Mistake                                              | Use instead                                                         |
| ---------------------------------------------------- | ------------------------------------------------------------------- |
| `Button` with icon only                              | `IconButton` + `aria-label`                                         |
| `Button`/`IconButton` with `render={<a />}` for nav  | `ButtonLink` / `IconButtonLink`                                     |
| `Chip` for corner presence dot                       | `Badge`                                                             |
| `Select` when free-form text allowed                 | `Autocomplete`                                                      |
| `ClampText` when copy must fill width                | `FitText`                                                           |
| `Meter` for loading bars                             | `LinearProgress`                                                    |
| `LinearProgress` for storage percentage              | `Meter` with `renderValue`                                          |
| `showValue` on `Slider` / `Meter` / `LinearProgress` | `renderValue` (`true` or Value formatter)                           |
| `Popover` for modal tasks                            | `Dialog`                                                            |
| `Popover` wrapping `Menu`                            | `Menu` alone                                                        |
| `Dialog` for hover hints                             | `Tooltip`                                                           |
| Raw flex CSS for standard gaps                       | `Stack` with token gaps                                             |
| Viewport MQ for card innards                         | `@container surface` / `@container stack`                           |
| `Surface elevation={…}`                              | `Elevator` around `Surface`                                         |
| `Stack padding={…}`                                  | `hPadding` / `vPadding`                                             |
| `Field` from `@viraui/react`                         | `Field` from `@base-ui/react`                                       |
| Wrapping Textfield/Select/Autocomplete in Field      | Use their built-in Field root                                       |
| Invented props/parts from stories                    | Guide `structure` + source/types                                    |
| Icon-only `children`                                 | `icon` / `restingIcon` (+ `aria-label`)                             |
| Dup widget `role`/`aria-*`                           | Omit — Base UI already emits ([accessibility.md](accessibility.md)) |

## Machine catalog

Read `@viraui/react/catalog.json`; co-located `button-link.guide.json` and `icon-button-link.guide.json` may not have separate catalog rows but remain public guides above.
