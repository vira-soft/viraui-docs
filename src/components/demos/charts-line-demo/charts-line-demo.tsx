"use client";

import * as React from "react";
import { ChartExampleFrame } from "../../common/chart-example-frame";
import { ViraSandbox } from "../../common/vira-sandbox";
import {
  CategoryLabelsLine,
  DotsLine,
  LinearLine,
  MarkersLine,
  MultipleLine,
  NaturalLine,
  StepLine,
  ValueLabelsLine,
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
  <ViraSandbox dialogShell={false} height={height} label={label} vAlign="start">
    {children}
  </ViraSandbox>
);

export const ChartsLineNaturalDemo: React.FC = () => (
  <SandboxShell label="Natural line chart">
    <ChartExampleFrame label="Natural line chart">
      <NaturalLine />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsLineLinearDemo: React.FC = () => (
  <SandboxShell label="Linear line chart">
    <ChartExampleFrame label="Linear line chart">
      <LinearLine />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsLineStepDemo: React.FC = () => (
  <SandboxShell label="Step line chart">
    <ChartExampleFrame label="Step line chart">
      <StepLine />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsLineYAxisDemo: React.FC = () => (
  <SandboxShell label="Line chart with Y axis">
    <ChartExampleFrame label="Line chart with Y axis">
      <NaturalLine showYAxis ariaLabel="Natural line chart with Y axis" />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsLineMultipleDemo: React.FC = () => (
  <SandboxShell label="Multiple series line chart">
    <ChartExampleFrame label="Multiple series line chart">
      <MultipleLine />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsLineDotsDemo: React.FC = () => (
  <SandboxShell label="Line chart with dots">
    <ChartExampleFrame label="Line chart with dots">
      <DotsLine />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsLineMarkersDemo: React.FC = () => (
  <SandboxShell label="Line chart with custom markers">
    <ChartExampleFrame label="Line chart with custom markers">
      <MarkersLine />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsLineValueLabelsDemo: React.FC = () => (
  <SandboxShell label="Line chart with value labels">
    <ChartExampleFrame label="Line chart with value labels">
      <ValueLabelsLine />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsLineCategoryLabelsDemo: React.FC = () => (
  <SandboxShell label="Line chart with category labels">
    <ChartExampleFrame label="Line chart with category labels">
      <CategoryLabelsLine />
    </ChartExampleFrame>
  </SandboxShell>
);
