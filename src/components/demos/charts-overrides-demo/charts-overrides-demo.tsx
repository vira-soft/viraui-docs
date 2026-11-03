"use client";

import * as React from "react";
import { ChartExampleFrame } from "../../common/chart-example-frame";
import { ViraSandbox } from "../../common/vira-sandbox";
import {
  OverrideBaseRamp,
  OverrideComposition,
  OverrideHueScale,
  OverrideOpacityRamp,
} from "./plots";

type SandboxShellProps = {
  children: React.ReactNode;
  label: string;
  height?: number;
};

const SandboxShell: React.FC<SandboxShellProps> = ({
  children,
  label,
  height = 400,
}) => (
  <ViraSandbox dialogShell={false} height={height} label={label}>
    {children}
  </ViraSandbox>
);

export const ChartsOverridesDemo: React.FC = () => (
  <SandboxShell label="Series and chrome token overrides">
    <ChartExampleFrame label="Series and chrome token overrides">
      <OverrideComposition />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsOverridesHueScaleDemo: React.FC = () => (
  <SandboxShell label="Same-hue highlight bar scale">
    <ChartExampleFrame label="Same-hue highlight bar scale">
      <OverrideHueScale />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsOverridesBaseRampDemo: React.FC = () => (
  <SandboxShell label="Neutral base ramp bar fills">
    <ChartExampleFrame label="Neutral base ramp bar fills">
      <OverrideBaseRamp />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsOverridesOpacityRampDemo: React.FC = () => (
  <SandboxShell label="Single-hue opacity bar ramp">
    <ChartExampleFrame label="Single-hue opacity bar ramp">
      <OverrideOpacityRamp />
    </ChartExampleFrame>
  </SandboxShell>
);
