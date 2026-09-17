# Component selection matrix

**When to read:** quick intent → public component id. **Not** API authority.

Confirm the candidate in `@viraui/react/specs/index.xml`, then open that surface’s units (`meta` → `props` → …). Discovery order → [discovery.md](discovery.md).

Ids below are package folder / index ids (co-located exports share a parent folder — e.g. `ButtonLink` → `button`).

## Action vs display vs progress

| Need                                | Component                                | Specs id          |
| ----------------------------------- | ---------------------------------------- | ----------------- |
| Labeled click action                | `Button`                                 | `button`          |
| Navigate looking like `Button`      | `ButtonLink`                             | `button`          |
| Icon-only action                    | `IconButton`                             | `icon-button`     |
| Icon-only navigation                | `IconButtonLink`                         | `icon-button`     |
| Two-state icon toggle               | `ToggleButton`                           | `toggle-button`   |
| Mutually exclusive icon toggles     | `ToggleGroup` + `ToggleButton`           | `toggle-group`    |
| Small label/tag                     | `Chip`                                   | `chip`            |
| Corner status-dot overlay           | `Badge`                                  | `badge`           |
| In-progress / indeterminate         | `LinearProgress`                         | `linear-progress` |
| Determinate metric (storage, score) | `Meter`                                  | `meter`           |
| Loading placeholder                 | `Skeleton` (block or `Skeleton.Overlay`) | `skeleton`        |
| Inline loading indicator            | `Spinner`                                | `spinner`         |

## Overlays and notifications

| Need                        | Component | Specs id  |
| --------------------------- | --------- | --------- |
| Bottom sheet / focused task | `Dialog`  | `dialog`  |
| Anchored contextual panel   | `Popover` | `popover` |
| Action / account menu       | `Menu`    | `menu`    |
| Hover/focus hint            | `Tooltip` | `tooltip` |
| Transient notification      | `Toast`   | `toast`   |

**Dialog vs Popover:** Dialog interrupts with sheet + scrim; Popover anchors for lightweight context. **Menu** owns portal + list keyboard — do not wrap Menu in Popover.

## Layout and structure

| Need                    | Component                                | Specs id      |
| ----------------------- | ---------------------------------------- | ------------- |
| Flex row/column         | `Stack`                                  | `stack`       |
| CSS grid tracks         | `Grid`                                   | `grid`        |
| Themed panel/card       | `Surface`                                | `surface`     |
| Break out of padding    | `Bleed`                                  | `bleed`       |
| Column masonry grid     | `Masonry`                                | `masonry`     |
| Divider                 | `Separator`                              | `separator`   |
| Shadow/elevation helper | `Elevator`                               | `elevator`    |
| Viewport match helper   | `BreakpointsProvider` + `useBreakpoints` | `breakpoints` |

## Typography

| Need                          | Component    | Specs id     |
| ----------------------------- | ------------ | ------------ |
| Body text                     | `Text`       | `text`       |
| Heading/display               | `Title`      | `title`      |
| Multi-line clamp              | `ClampText`  | `clamp-text` |
| Fit copy to inline width      | `FitText`    | `fit-text`   |
| Decorative shimmer text       | `Shimmer`    | `shimmer`    |
| Decorative typewriter         | `Typewriter` | `typewriter` |
| Decorative arrow/note callout | `Annotate`   | `annotate`   |

## Forms

| Need                       | Component              | Specs id       |
| -------------------------- | ---------------------- | -------------- |
| Single-line input          | `Textfield`            | `textfield`    |
| Multi-line input           | `Textarea`             | `textarea`     |
| Dropdown select            | `Select`               | `select`       |
| Free-form suggest / filter | `Autocomplete`         | `autocomplete` |
| Boolean option             | `Checkbox`             | `checkbox`     |
| Multi-select group         | `CheckboxGroup`        | `checkbox`     |
| Single-select group        | `RadioGroup` + `Radio` | `radio`        |
| Group legend/copy          | `Fieldset`             | `fieldset`     |
| Toggle on/off              | `Switch`               | `switch`       |
| Numeric range              | `Slider`               | `slider`       |

`Field` is from `@base-ui/react`, not Vira. Textfield / Textarea / Select / Autocomplete own their Field root.

## Navigation patterns

| Need                     | Component   | Specs id    |
| ------------------------ | ----------- | ----------- |
| Tabbed sections          | `Tabs`      | `tabs`      |
| Expand/collapse sections | `Accordion` | `accordion` |

## Media and identity

| Need                | Component     | Specs id       |
| ------------------- | ------------- | -------------- |
| User avatar         | `Avatar`      | `avatar`       |
| Overlapping avatars | `AvatarGroup` | `avatar-group` |

Icons / glyphs / icon slots (any library) → [icons.md](icons.md).

## Effects (decorative)

Use sparingly — `Glow`, `Beam`, `StaticNoise`, `ProgressiveBlur` are GPU/memory/CPU-heavy and hurt performance when stacked or repeated. Prefer **one focal effect per view**; confirm do/dont in that component’s `usage.xml`.

| Need                            | Component         | Specs id           |
| ------------------------------- | ----------------- | ------------------ |
| Noise overlay                   | `StaticNoise`     | `static-noise`     |
| Progressive blur overlay        | `ProgressiveBlur` | `progressive-blur` |
| Pointer-driven border highlight | `Glow`            | `glow`             |
| Animated border / line / pulse  | `Beam`            | `beam`             |

## Surface sync (monorepo authors)

When a public `@viraui/react` component is added/changed/removed, update this intent table and `viraui-a11y/vira-map.md` in the **same change**. Do not reintroduce encyclopedia pages.

## Gotchas

| Mistake                                            | Use instead                              |
| -------------------------------------------------- | ---------------------------------------- |
| Treating this matrix as props authority            | Specs units + types after units          |
| `Button` with icon only                            | `IconButton` + `aria-label`              |
| `Surface elevation={…}`                            | `Elevator` around `Surface`              |
| Raw html + `display:flex` / `grid` / CSS `columns` | `Stack` / `Grid` / `Masonry`             |
| Invented props from stories                        | Specs `meta`/`props`/`patterns` + source |

## Machine catalog

`@viraui/react/catalog.json` is a small tooling index. Narrative discovery uses `@viraui/react/specs/index.xml` + units.
