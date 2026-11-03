"use client";

import * as React from "react";
import { ChartExampleFrame } from "../../common/chart-example-frame";
import { ViraSandbox } from "../../common/vira-sandbox";
import {
  DonutPie,
  InteractivePie,
  LabelListPie,
  LabelPie,
  LegendPie,
  SimplePie,
  StackedPie,
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

export const ChartsPieSimpleDemo: React.FC = () => (
  <SandboxShell label="Simple pie chart">
    <ChartExampleFrame label="Simple pie chart">
      <SimplePie />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsPieLabelsDemo: React.FC = () => (
  <SandboxShell label="Pie chart with slice labels">
    <ChartExampleFrame label="Pie chart with slice labels">
      <LabelPie />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsPieCustomTooltipDemo: React.FC = () => (
  <SandboxShell label="Pie chart with custom tooltip">
    <ChartExampleFrame label="Pie chart with custom tooltip">
      <LabelPie customTooltip />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsPieLabelListDemo: React.FC = () => (
  <SandboxShell label="Pie chart with label list">
    <ChartExampleFrame label="Pie chart with label list">
      <LabelListPie />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsPieLegendDemo: React.FC = () => (
  <SandboxShell label="Pie chart with legend">
    <ChartExampleFrame label="Pie chart with legend">
      <LegendPie />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsPieDonutDemo: React.FC = () => (
  <SandboxShell label="Donut chart">
    <ChartExampleFrame label="Donut chart">
      <DonutPie />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsPieDonutTextDemo: React.FC = () => (
  <SandboxShell label="Donut chart with center text">
    <ChartExampleFrame label="Donut chart with center text">
      <DonutPie withText />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsPieStackedDemo: React.FC = () => (
  <SandboxShell label="Stacked pie chart">
    <ChartExampleFrame label="Stacked pie chart">
      <StackedPie />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsPieInteractiveDemo: React.FC = () => (
  <SandboxShell label="Interactive pie chart">
    <ChartExampleFrame label="Interactive pie chart">
      <InteractivePie />
    </ChartExampleFrame>
  </SandboxShell>
);
