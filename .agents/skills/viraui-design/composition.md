# High-risk composition

**When to read:** Field ownership, Dialog / Popover / Menu / Toast / ToggleGroup / Select / Autocomplete trees, or any compound `structure` before inventing parts.

Canonical shapes only. Complete props/defaults → target guide + source/types. Prefer high-level parts (`Sheet`, `Popup`, `Banner`) over reimplementing Portal/Positioner.

Lower-risk compounds (`Accordion`, `Grid`, `Masonry`, `Skeleton`, `Tabs`, `Tooltip`): follow colocated guide (`Tooltip.Provider` for shared delay; `Skeleton.Overlay` for child-sized placeholders). View-transition wipe: `view-transition-name: skeleton-overlay` on the transitioning wrapper (CSS class, not inline style). Overlay enter/exit motion → **viraui-motion**.

## Field ownership

`Field` from `@base-ui/react`, not `@viraui/react`. `Textfield`, `Textarea`, `Select`, `Autocomplete` already own `Field.Root` — never double-wrap.

Standalone `Checkbox` validation needs Base UI Field:

```tsx
import { Field } from '@base-ui/react';
import { Checkbox } from '@viraui/react';

<Field.Root name="terms">
  <Checkbox label="Accept terms" />
</Field.Root>;
```

Use `Fieldset` only when a choice group needs shared legend, description, or error:

```tsx
import { Field } from '@base-ui/react';
import { Checkbox, CheckboxGroup, Fieldset, Radio, RadioGroup } from '@viraui/react';

<Field.Root name="channels">
  <Fieldset label="Channels" render={<CheckboxGroup />}>
    <Checkbox label="Email" value="email" />
    <Checkbox label="SMS" value="sms" />
  </Fieldset>
</Field.Root>;

<Field.Root name="plan">
  <Fieldset label="Plan" render={<RadioGroup<'free' | 'pro'> />}>
    <Radio label="Free" value="free" />
    <Radio label="Pro" value="pro" />
  </Fieldset>
</Field.Root>;
```

Without shared group copy, `RadioGroup` / `CheckboxGroup` may sit directly in `Field.Root`.

## Dialog

Root indent shell is bootstrap — viraui-setup `bootstrap.md` / `frameworks.md`. `IndentBackground` and `Indent` are siblings under `Provider`; dialog lives inside indented app content.

```tsx
<Dialog.Provider>
  <Dialog.IndentBackground />
  <Dialog.Indent>
    <main>
      <Dialog>
        <Dialog.Trigger render={<Button>Open settings</Button>} />
        <Dialog.Sheet title="Settings" description="Manage preferences">
          {/* body */}
          <Dialog.Close render={<Button variant="secondary">Done</Button>} />
        </Dialog.Sheet>
      </Dialog>
    </main>
  </Dialog.Indent>
</Dialog.Provider>
```

Indent parts optional. Without the effect: `Dialog`, `Trigger`, required-title `Sheet`, optional `Close`. Nested `Dialog` inside `Sheet` supports drill-down.

Non-modal: `modal={false}` + `disablePointerDismissal` on `Dialog`; Sheet omits backdrop automatically. No `showBackdrop` prop.

## Popover

Styled sheet:

```tsx
<Popover>
  <Popover.Trigger render={<Button>Options</Button>} />
  <Popover.Sheet title="Options" description="Choose an action">
    {/* body */}
    <Popover.Close render={<Button variant="secondary">Close</Button>} />
  </Popover.Sheet>
</Popover>
```

Unstyled sheet owns chrome and must compose accessible heading:

```tsx
<Popover>
  <Popover.Trigger render={<Button>Details</Button>} />
  <Popover.Sheet unstyled>
    <Surface>
      <Popover.Title render={<Title render={<h2 />} />}>Details</Popover.Title>
      <Popover.Description>Supporting copy</Popover.Description>
    </Surface>
  </Popover.Sheet>
</Popover>
```

Detached/multiple triggers: `Popover.createHandle()`. `Popover.Arrow` is not public.

## Menu

`Menu.RadioGroup` owns radio items and optional label:

```tsx
<Menu>
  <Menu.Trigger render={<Button>Sort</Button>} />
  <Menu.Popup>
    <Menu.RadioGroup defaultValue="asc" label="Order">
      <Menu.RadioItem value="asc">Ascending</Menu.RadioItem>
      <Menu.RadioItem value="desc">Descending</Menu.RadioItem>
    </Menu.RadioGroup>
  </Menu.Popup>
</Menu>
```

Do not wrap `Menu` in `Popover` — Menu owns portal, positioning, and keyboard behavior.

## Toast

Root `Toast.Provider` + viewport mapping is bootstrap — viraui-setup `bootstrap.md` / `frameworks.md`. `Toast` is a namespace. Manager: `Toast.createToastManager()` / `Toast.useToastManager()`. Viewport alone does not render notifications — map manager toasts to `Toast.Banner`.

```tsx
const toastManager = Toast.createToastManager();

function ToastRegion() {
  const { toasts } = Toast.useToastManager();

  return (
    <Toast.Portal>
      <Toast.Viewport>
        {toasts.map((toast) => (
          <Toast.Banner key={toast.id} description={toast.description} toast={toast} />
        ))}
      </Toast.Viewport>
    </Toast.Portal>
  );
}

<Toast.Provider toastManager={toastManager}>
  <App />
  <ToastRegion />
</Toast.Provider>;

toastManager.add({ title: 'Saved', description: 'Changes stored.' });
```

Anchored feedback: `positionerProps.anchor`, `Toast.Viewport position="anchored"`, wrap each mapped banner:

```tsx
<Toast.Positioner key={toast.id} toast={toast}>
  <Toast.Banner description={toast.description} toast={toast} />
</Toast.Positioner>
```

Only `Toast.Action` children inside `Toast.Banner`.

## ToggleGroup

```tsx
<ToggleGroup aria-label="Editor options">
  <ToggleButton aria-label="Pin" restingIcon={<Pin />} value="pin" />
  <ToggleButton aria-label="Mute" restingIcon={<Mute />} value="mute" />
</ToggleGroup>
```

Every item needs distinct `value`, icon slot, and accessible name. Never pass `ToggleButton` children.

## Select and Autocomplete

Both own field and popup chrome. Do not add `Field.Root`.

```tsx
<Select label="Status">
  <Select.Option value="open">Open</Select.Option>
  <Select.Group label="Closed">
    <Select.Option value="done">Done</Select.Option>
  </Select.Group>
</Select>

<Autocomplete label="Tag" empty="No tags found">
  <Autocomplete.Item value="feature">feature</Autocomplete.Item>
  <Autocomplete.Item value="bug">bug</Autocomplete.Item>
</Autocomplete>
```

**Default:** Select = closed single-choice; Autocomplete = free-form suggestions. Keep dynamic `empty` / `status` slots mounted; update content. Grouped data → guide `Autocomplete.Group` + `Autocomplete.Collection`.

## Validation loop

1. Open guide `structure` + source/types for the compound.
2. Diff planned parts against `structure` — stop on undocumented names.
3. Confirm Field ownership (no double-wrap; Base UI `Field` when required).
4. Confirm overlay titles / names; omit dup widget ARIA — [accessibility.md](accessibility.md).
5. Motion on enter/exit → **viraui-motion** hub + one ref.

## Gotchas

- Invented parts (`Dialog.Body`, `Popover.Arrow`, `showBackdrop`).
- Double-wrapping Textfield/Select/Autocomplete in `Field.Root`.
- Importing `Field` from `@viraui/react`.
- Wrapping `Menu` in `Popover`.
- `ToggleButton` / icon-only controls with `children`.
- Toast viewport without mapping toasts → `Banner`.
- Copying APG sample roles onto Dialog/Popover parts.
- Skipping required `Dialog.Sheet` / styled `Popover.Sheet` `title`.

Routing index → [component-matrix.md](component-matrix.md). Discover props → [discovery.md](discovery.md).
