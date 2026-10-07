"use client";

import * as React from "react";
import {
  ViraSandbox,
  type ViraSandboxTheme,
} from "../../common/vira-sandbox";
import { PreviewGrid } from "./preview-grid";

const THEME_LABEL: Record<ViraSandboxTheme, string> = {
  vira: "Vira",
  "vira-condensed": "Vira Condensed",
  sunburst: "Sunburst",
  cinder: "Cinder",
};

type BuiltInThemeDemoProps = {
  /**
   * Built-in foundation brand for this tab preview.
   * @defaultValue 'vira'
   */
  theme: ViraSandboxTheme;
};

/** One sandbox + shared PreviewGrid for a built-in foundation brand. */
const BuiltInThemeDemo: React.FC<BuiltInThemeDemoProps> = ({ theme }) => (
  <ViraSandbox
    dialogShell={false}
    height={640}
    label={`${THEME_LABEL[theme]} built-in theme preview`}
    theme={theme}
    vAlign="start"
  >
    <PreviewGrid />
  </ViraSandbox>
);

/** Vira preset — default brand kitchen sample. */
export const BuiltInThemeViraDemo: React.FC = () => (
  <BuiltInThemeDemo theme="vira" />
);

/** Vira Condensed preset — tighter typescale kitchen sample. */
export const BuiltInThemeViraCondensedDemo: React.FC = () => (
  <BuiltInThemeDemo theme="vira-condensed" />
);

/** Sunburst preset — Merriweather heading kitchen sample. */
export const BuiltInThemeSunburstDemo: React.FC = () => (
  <BuiltInThemeDemo theme="sunburst" />
);

/** Cinder preset — Oxanium kitchen sample. */
export const BuiltInThemeCinderDemo: React.FC = () => (
  <BuiltInThemeDemo theme="cinder" />
);
