import nested from "@viraui/foundation/vira/nested" with { type: "json" };
import type { CSSProperties, ReactNode } from "react";

type GlobalName = keyof typeof nested.global;
type HighlightName = keyof typeof nested.highlight;
type PaletteName = keyof typeof nested.color;

const COLOR_PALETTES = Object.keys(nested.color) as PaletteName[];
const COLOR_STEPS = Object.keys(
  nested.color[COLOR_PALETTES[0] ?? "stone"],
) as (keyof (typeof nested.color)[PaletteName])[];
const HIGHLIGHT_TOKENS = Object.keys(nested.highlight) as HighlightName[];

const GLOBAL_PURPOSE = {
  foreground: "Default text and icons on the page background",
  background: "Page and shell fill",
  primary: "Brand action color for filled buttons and key accents",
  muted: "Secondary, de-emphasized text",
  "interactive-text": "Links and interactive labels",
  "disabled-foreground": "Text on disabled controls",
  "disabled-background": "Fill behind disabled controls",
  contrast: "Subtle separators and reduced-contrast chrome",
  outline: "Focus and outline strokes tied to foreground",
} as const satisfies Record<GlobalName, string>;

const GLOBAL_BORDER = new Set<GlobalName>(["contrast", "outline"]);

const GLOBAL_TOKENS = (Object.keys(nested.global) as GlobalName[]).map((name) => ({
  name,
  purpose: GLOBAL_PURPOSE[name],
  variant: (GLOBAL_BORDER.has(name) ? "border" : "fill") as "fill" | "border",
}));

function SwatchCard({
  title,
  footer,
  preview,
}: {
  title: string;
  footer?: ReactNode;
  preview: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-fd-border bg-fd-card">
      <div className="aspect-4/3 p-3">{preview}</div>
      <div className="space-y-1 border-t border-fd-border px-3 py-2.5">
        <p className="text-sm font-medium capitalize">{title}</p>
        {footer}
      </div>
    </div>
  );
}

/**
 * Paint from foundation nested JSON — not `var(--color-*)` on docs `:root`
 * (those names collide with Tailwind `@theme`).
 */
function ColorFill({
  value,
  variant = "fill",
}: {
  value: string;
  variant?: "fill" | "border";
}) {
  return (
    <div
      className="size-full rounded-lg"
      style={
        variant === "border"
          ? ({
              background: nested.global.background,
              boxShadow: `inset 0 0 0 2px ${value}`,
            } as CSSProperties)
          : ({ background: value } as CSSProperties)
      }
    />
  );
}

/** App-facing semantic tokens (`--global-*`). */
export function GlobalColorTokens() {
  return (
    <div className="not-prose my-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {GLOBAL_TOKENS.map(({ name, purpose, variant }) => (
        <SwatchCard
          key={name}
          title={name.replace(/-/g, " ")}
          footer={<p className="text-xs leading-snug text-fd-muted-foreground">{purpose}</p>}
          preview={<ColorFill value={nested.global[name]} variant={variant} />}
        />
      ))}
    </div>
  );
}

/** Status / decorative named colors (`--highlight-*`). */
export function HighlightColorTokens() {
  return (
    <div className="not-prose my-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {HIGHLIGHT_TOKENS.map((name) => (
        <SwatchCard
          key={name}
          title={name}
          preview={<ColorFill value={nested.highlight[name]} />}
        />
      ))}
    </div>
  );
}

/** Raw palette ramps (`--color-{palette}-{step}`). */
export function PrimitiveColorTokens() {
  return (
    <div className="not-prose my-6 space-y-5">
      {COLOR_PALETTES.map((palette) => (
        <article key={palette} className="space-y-2">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <p className="text-sm font-semibold capitalize">{palette}</p>
          </div>
          <div className="overflow-hidden rounded-xl border border-fd-border">
            <div className="flex">
              {COLOR_STEPS.map((step) => (
                <div key={step} className="min-w-0 flex-1">
                  <div
                    className="h-14"
                    style={{ background: nested.color[palette][step] }}
                  />
                  <p className="border-t border-fd-border bg-fd-card py-1 text-center font-mono text-[0.65rem] text-fd-muted-foreground">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
