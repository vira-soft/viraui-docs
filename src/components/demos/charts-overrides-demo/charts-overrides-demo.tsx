"use client";

import * as React from "react";
import { ChartExampleFrame } from "../../common/chart-example-frame";
import { ViraSandbox } from "../../common/vira-sandbox";
import { OverrideComposition } from "./plots";

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
  <ViraSandbox dialogShell={false} height={height} label={label} vAlign="start">
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
