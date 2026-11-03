/**
 * Docs-local mirror of `@viraui/charts` theme token strings.
 * Override via component props — not a `--vui-charts-*` CSS layer.
 */

export const seriesStroke = "var(--highlight-blue)";
export const seriesFill = "oklab(from var(--highlight-blue) l a b / 24%)";

export const contrastStroke = "var(--global-contrast)";
export const foregroundFill = "var(--global-foreground)";
export const mutedLabel = "var(--global-muted)";
/** Hover / active column wash — secondary chrome + alpha. */
export const hoverFill = "oklab(from var(--global-muted) l a b / 24%)";

export const bodyFontFamily = "var(--font-family-body)";
export const bodyFontSizeS = "var(--font-scale-body-s)";
export const bodyFontSizeXs = "var(--font-scale-body-xs)";

export const mutedChromeStyle = {
  color: mutedLabel,
  fontFamily: bodyFontFamily,
  fontSize: bodyFontSizeS,
} as const;
