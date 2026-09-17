# Filesystem layout

Apply when scaffolding or reorganizing React-related files and folders.

## Scope

**Primary target: components.** The full folder layout below (kebab folder, `index.ts`, co-located `.tsx` + CSS + subcomponents) is for UI components.

**Same spirit, not the same file kinds** for non-component units — functions, scripts, libs, utilities, custom providers, hooks, and similar:

- Prefer the same **kebab-case folder + `index.ts` export** pattern when the unit deserves its own folder.
- Choose **`.ts` vs `.tsx` by need**: use `.tsx` only when the file contains JSX. Do **not** create a `.tsx` file “for consistency” if there is no JSX.
- Skip CSS / subcomponent co-location unless the unit actually has styles or nested UI pieces.

| Unit | Typical extension | Full component layout? |
| --- | --- | --- |
| UI component | `.tsx` | Yes |
| Hook (no JSX) | `.ts` | Folder + `index` OK; no forced `.tsx` / CSS |
| Provider / context with JSX | `.tsx` | Folder + `index` like a component |
| Lib / util / helper / script | `.ts` | Folder + `index` optional; never force `.tsx` |

## File layout (components)

- Each component typically has **its own kebab-case folder** with scoped files, plus co-located subcomponents that belong to the same unit and are exported from the same `index`.
- Include **`index.ts`** that exports the component `.tsx` and any props types as needed.
- The folder may also hold the related CSS (`.css` or `.module.css`) depending on the project. For styling rules, use the `authoring-css` skill when present.

```
/my-component
-- index.ts
-- my-component.module.css
-- my-component.tsx
-- my-component-subcomponent.tsx
```

### Non-component example (hook, no JSX)

```
/use-local-storage
-- index.ts
-- use-local-storage.ts
```

## Checklist

**Components**

- [ ] Kebab-case folder for the component
- [ ] `index.ts` exports component (+ props types as needed)
- [ ] Co-located subcomponents exported from the same `index`
- [ ] Scoped CSS beside the component when styles are added (`.css` / `.module.css` per project)

**Hooks / libs / utils / scripts / providers**

- [ ] Same kebab + `index` patterns when scaffolding a folder unit
- [ ] `.tsx` only if the file has JSX — otherwise `.ts`
- [ ] No decorative CSS or fake component files
