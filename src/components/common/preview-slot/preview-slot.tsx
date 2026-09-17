import type { ReactNode } from "react";

/**
 * Interactive example region for component docs.
 * Structure phase: visual shell only; live demos come later.
 */
export function PreviewSlot({
  label = "Interactive preview",
  children,
}: {
  label?: string;
  children?: ReactNode;
}) {
  return (
    <div className="my-6 not-prose">
      <p className="mb-2 text-xs font-medium tracking-wide text-fd-muted-foreground uppercase">
        {label}
      </p>
      <div className="flex min-h-28 items-center justify-center rounded-xl border border-dashed border-fd-border bg-fd-card p-6 text-center text-sm text-fd-muted-foreground">
        {children ?? "Preview pending — structure stub for a later interactive example."}
      </div>
    </div>
  );
}
