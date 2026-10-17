# High-risk composition

**When to read:** Field ownership, Dialog / Popover / Menu / Toast / ToggleGroup / Select / Autocomplete / OTPField / NumberField trees, or any compound assembly before inventing parts.

Canonical **shapes** only. Complete props/defaults → specs `components/<id>/` (`meta` → `props` → `usage` → `patterns`) + types verify. Prefer high-level parts (`Sheet`, `Popup`, `Banner`) over reimplementing Portal/Positioner.

Lower-risk compounds (`Accordion`, `Disclosure`, `Grid`, `Masonry`, `Skeleton`, `Tabs`, `Tooltip`): follow that surface’s units (`Tooltip.Provider` for shared delay; `Skeleton.Overlay` for child-sized placeholders; `Disclosure` = `Trigger` + `Panel` for one section — not Accordion). Overlay enter/exit motion → **viraui-motion**.

`BreakpointsProvider` / `DirectionProvider` are **opt-in**, not part of the Dialog/Tooltip/Toast overlay shell. Full discipline (mobile-first map, RTL + `dir` on `html`, Stack flex vs LTR/RTL) → [responsive.md](responsive.md) → specs `breakpoints` / `direction-provider` units.

## Field ownership

`Field` from `@base-ui/react`, not `@viraui/react`. `Textfield` (unless `controlOnly`), `Textarea`, `Select`, `Autocomplete`, `OTPField`, `NumberField` already own `Field.Root` — never double-wrap.

Standalone `Checkbox` validation needs Base UI Field:

```tsx
import { Field } from '@base-ui/react';
import { Checkbox } from '@viraui/react';

<Field.Root name="terms">
  <Checkbox label="Accept terms" />
</Field.Root>;
```

Use `Fieldset` only when a choice group needs shared legend, description, or error. Without shared group copy, `RadioGroup` / `CheckboxGroup` may sit directly in `Field.Root`.

## Dialog

Root indent shell is bootstrap — **viraui-setup** [bootstrap.md](../viraui-setup/bootstrap.md) / [frameworks.md](../viraui-setup/frameworks.md). Exact parts → `components/dialog/patterns.xml` + `usage.xml`.

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

Indent parts optional. Without the effect: `Dialog`, `Trigger`, required-title `Sheet`, optional `Close`. Nested `Dialog` inside `Sheet` supports drill-down. Non-modal: confirm props in units (no invented `showBackdrop`).

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

Unstyled sheet owns chrome and must compose accessible heading — see `components/popover` units. Detached/multiple triggers: `Popover.createHandle()` when documented. Do not invent non-public parts (e.g. `Popover.Arrow`).

## Menu

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

Do not wrap `Menu` in `Popover` — Menu owns portal, positioning, and keyboard behavior. Confirm part names in `components/menu` units.

## Toast

Root `Toast.Provider` + viewport mapping is bootstrap — **viraui-setup**. Manager / Banner mapping shapes:

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

Anchored / action children → confirm in `components/toast` units. Viewport alone does not render notifications — map manager toasts to `Toast.Banner`.

## ToggleGroup

```tsx
<ToggleGroup aria-label="Editor options">
  <ToggleButton aria-label="Pin" restingIcon={<Pin />} value="pin" />
  <ToggleButton aria-label="Mute" restingIcon={<Mute />} value="mute" />
</ToggleGroup>
```

Every item needs distinct `value`, icon slot, and accessible name. Never pass `ToggleButton` children.

## OTPField

Compound `OTPField` / `Input` / `Separator` (no public `.Root`). One Field for label/helper. List exactly `length` Inputs — OTPField does not auto-spawn slots. Default slots compose Textfield `controlOnly`; host is always native `input` (no Input `render`). Group with Stack + `Separator`. Equal-grow via `fullWidth`. Invalid+dirty (and `onValueInvalid`) play a built-in one-shot slot wiggle — keep error copy. Confirm remaining-slot names in `components/otp-field` units.

```tsx
<OTPField length={6} label="Verification code">
  <OTPField.Input />
  <OTPField.Input />
  <OTPField.Input />
  <OTPField.Input />
  <OTPField.Input />
  <OTPField.Input />
</OTPField>
```

## NumberField

Single public `NumberField` (no `.Root` / `.Input`). Owns Base UI value/bounds/`name`, Field chrome, steppers, scrub, width. Do not export Group/Decrement/Increment/ScrubArea. Confirm placement / scrub / `fullWidth` (input grows, steppers compact) in `components/number-field` units.

```tsx
<NumberField defaultValue={100} name="amount" label="Amount" description="Local currency." />
```

## Select and Autocomplete

Both own field and popup chrome. Do not add `Field.Root`. Confirm `Option` / `Group` / `Item` / `empty` / `modal` in units — do not invent parts.

```tsx
<Select label="Status">
  <Select.Option value="open">Open</Select.Option>
</Select>

<Autocomplete label="Tag" empty="No tags found">
  <Autocomplete.Item value="feature">feature</Autocomplete.Item>
</Autocomplete>
```

## Validation loop

1. Open specs `patterns` / `usage` + types for the compound.
2. Diff planned parts against units — stop on undocumented names.
3. If `meta` has `<base_ui>` → open that Base UI API for pass-through (Vira may wrap/regroup parts) — [discovery.md](discovery.md). Still unsure → ask.
4. Confirm Field ownership (no double-wrap; Base UI `Field` when required).
5. Confirm overlay titles / names; omit dup widget ARIA — [accessibility.md](accessibility.md).
6. Motion on enter/exit → **viraui-motion** hub + one ref.

## Gotchas

- Invented parts (`Dialog.Body`, `Popover.Arrow`, `showBackdrop`).
- Double-wrapping Textfield/Select/Autocomplete/OTPField/NumberField in `Field.Root`.
- Importing `Field` from `@viraui/react`.
- Wrapping `Menu` in `Popover`.
- `ToggleButton` / icon-only controls with `children`.
- Toast viewport without mapping toasts → `Banner`.
- Copying APG sample roles onto Dialog/Popover parts.
- Skipping required styled `Sheet` `title` when units require it.

Routing → [component-matrix.md](component-matrix.md). Props → [discovery.md](discovery.md) → specs units.
