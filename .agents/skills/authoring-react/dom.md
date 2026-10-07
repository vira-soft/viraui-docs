# Stay inside React

Apply when the task reaches into the DOM, attaches listeners imperatively, toggles classes/attrs outside JSX, mounts third-party non-React libs, or tempts `querySelector` / similar escapes.

React owns the UI tree it renders. Prefer React’s model (props, state, refs, JSX events, effects) over escaping to raw DOM APIs on nodes React already manages. Imperative DOM is an **escape hatch**, not the default.

Component shape / props / handlers: [`authoring.md`](authoring.md). `className` / `dynamicStyle` / `data-*`: [`presentation.md`](presentation.md).

## Forbidden on React-owned DOM

Do **not** use these to find, mutate, or listen to elements that React renders (or should render):

| Escape (avoid) | Prefer |
| --- | --- |
| `document.querySelector` / `querySelectorAll` | `useRef`, callback ref, `ref` prop |
| `getElementById` / `getElementsBy*` / `closest` from globals | Ref to the node (or pass data via props/context) |
| `element.addEventListener` / `removeEventListener` | JSX handlers (`onClick`, `onKeyDown`, …) + named functions in the body |
| `element.classList.add/remove/toggle` | `className` (+ project merge util), or `data-*` + CSS — see [`presentation.md`](presentation.md) |
| `element.setAttribute` / `removeAttribute` / `element.style.* =` | JSX props, `dynamicStyle` / CSS variables — see [`presentation.md`](presentation.md) |
| `element.innerHTML` / `insertAdjacentHTML` | JSX children; `dangerouslySetInnerHTML` only when unavoidable |
| `document.createElement` + `appendChild` / `removeChild` for UI | JSX / conditional render / keys / portals |
| `ReactDOM.render` / `createRoot` into a node React already owns | Compose components; one root owns that subtree |
| Reading the DOM to rediscover state React already has | Props, state, context, derived values |

Also avoid: string refs, `findDOMNode`, `isMounted` (see [`style.md`](style.md)).

```tsx
// Avoid — leaves React’s lifecycle
useEffect(() => {
  document.querySelectorAll('.row').forEach((el) => {
    el.addEventListener('click', onRowClick)
    el.classList.toggle('is-open', isOpen)
  })
}, [isOpen])

// Prefer — stay in React
const panelRef = useRef<HTMLDivElement>(null)

useEffect(() => {
  panelRef.current?.focus()
}, [isOpen])

return (
  <div
    ref={panelRef}
    className={clsx(styles.Panel, isOpen && styles.isOpen)}
    data-open={isOpen ? 'true' : 'false'}
    onClick={handleClick}
  />
)
```

## Correct React approaches

- **UI from data:** render from props/state; re-render updates the DOM. Do not sync “truth” by mutating nodes by hand.
- **Refs:** `useRef` / callback refs / `ref` as a prop (React 19) when you need the instance (focus, measure, scroll, third-party host node).
- **Effects:** `useEffect` / `useLayoutEffect` for post-commit side effects tied to that ref or external system — with **cleanup**. Not for deriving render output.
- **Lists:** `map` + stable `key`; do not query `.item` nodes to attach behavior.
- **Portals:** `createPortal` to render outside the parent DOM node — not manual `appendChild` of React output.
- **Forms:** controlled or uncontrolled React inputs (`value`/`onChange` or `defaultValue` + ref). Do not drive the form by hunting `form.elements` / querySelector unless integrating a non-React API.
- **Visibility / branches:** conditional JSX (`&&`, ternary), not `display` / `hidden` toggled via DOM APIs when React can unmount or flip props instead.

## Escape hatches (allowed when justified)

Use refs + effects (cleanup required) only when React has no good declarative API:

- Focus, selection, scroll, resize/measure (`getBoundingClientRect`, `ResizeObserver`)
- Media, canvas, WebSocket, geolocation, and similar browser APIs
- Third-party **non-React** libraries that require a mount node
- Integrating with non-React legacy widgets

Rules for escape hatches:

1. Obtain the node via **ref**, never via global selectors into React’s tree.
2. Create / update / tear down in an **effect**; return a cleanup that disposes listeners and library instances.
3. Do **not** let the external code fight React over the same children/attributes React also controls.
4. Prefer a thin host component (`ChartHost`, `MapHost`) so the escape hatch stays localized.

```tsx
const ChartHost: React.FC<ChartHostProps> = ({ data, ...otherProps }) => {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = hostRef.current
    if (!el) {
      return
    }

    const chart = createThirdPartyChart(el, data)
    return () => {
      chart.destroy()
    }
  }, [data])

  return <div ref={hostRef} {...otherProps} />
}
```

## Mental check

Before writing DOM API code inside a component/hook: “Does React already expose this via props, state, JSX events, refs, or portal?” If yes → use that. If no → ref + effect escape hatch, scoped and cleaned up.

## Checklist

- [ ] No `querySelector` / `getElementById` / `addEventListener` / `classList` / `innerHTML` / `createElement` on React-owned UI
- [ ] Prefer props, state, JSX events, refs, portals
- [ ] Imperative DOM only as escape hatch: ref + effect + cleanup (third-party host, focus, measure, etc.)
