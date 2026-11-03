"use client";

import type { ReactNode } from "react";

export type ChartExampleFrameProps = {
  children: ReactNode;
  /** Accessible name for the example region. */
  label?: string;
  /**
   * Fill the sandbox width (no 480px cap). Use with resizable responsive demos
   * so `ParentSize` / `useParentSize` track the dragged iframe.
   */
  fluid?: boolean;
};

/** Docs-only centered width wrapper around a chart plot. Not a `@viraui/charts` export. */
export function ChartExampleFrame({
  children,
  label,
  fluid = false,
}: ChartExampleFrameProps) {
  return (
    <div
      aria-label={label}
      style={
        fluid
          ? {
              // Stretch cross-axis when sandbox `vAlign="center"` shrink-wraps children.
              alignSelf: "stretch",
              inlineSize: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }
          : {
              inlineSize: "100%",
              maxInlineSize: 480,
              marginInline: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }
      }
    >
      {children}
    </div>
  );
}
