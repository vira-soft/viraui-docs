"use client";

import * as React from "react";
import { ChartExampleFrame } from "../../common/chart-example-frame";
import { ViraSandbox } from "../../common/vira-sandbox";
import {
  AxesArea,
  DefaultArea,
  DenseArea,
  GradientArea,
  LinearArea,
  StackedArea,
  StackedExpandedArea,
  StepArea,
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

export const ChartsAreaNaturalDemo: React.FC = () => (
  <SandboxShell label="Natural area chart">
    <ChartExampleFrame label="Natural area chart">
      <DefaultArea />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsAreaLinearDemo: React.FC = () => (
  <SandboxShell label="Linear area chart">
    <ChartExampleFrame label="Linear area chart">
      <LinearArea />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsAreaStepDemo: React.FC = () => (
  <SandboxShell label="Step area chart">
    <ChartExampleFrame label="Step area chart">
      <StepArea />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsAreaGradientDemo: React.FC = () => (
  <SandboxShell label="Area chart with gradient fill">
    <ChartExampleFrame label="Area chart with gradient fill">
      <GradientArea />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsAreaStackedDemo: React.FC = () => (
  <SandboxShell label="Stacked area chart">
    <ChartExampleFrame label="Stacked area chart">
      <StackedArea />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsAreaExpandedDemo: React.FC = () => (
  <SandboxShell label="Expanded stacked area chart">
    <ChartExampleFrame label="Expanded stacked area chart">
      <StackedExpandedArea />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsAreaAxesDemo: React.FC = () => (
  <SandboxShell label="Area chart with axes">
    <ChartExampleFrame label="Area chart with axes">
      <AxesArea />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsAreaDenseDemo: React.FC = () => (
  <SandboxShell label="Dense day-level area chart">
    <ChartExampleFrame label="Dense day-level area chart">
      <DenseArea />
    </ChartExampleFrame>
  </SandboxShell>
);
