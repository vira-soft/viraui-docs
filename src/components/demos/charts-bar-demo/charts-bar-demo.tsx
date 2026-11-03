"use client";

import * as React from "react";
import { ChartExampleFrame } from "../../common/chart-example-frame";
import { ViraSandbox } from "../../common/vira-sandbox";
import {
  DenseBar,
  HorizontalBar,
  LabelBar,
  LabelHorizontalBar,
  MixedBar,
  MixedHorizontalBar,
  MultipleBar,
  NegativeBar,
  SimpleBar,
  StackedBar,
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

export const ChartsBarSimpleDemo: React.FC = () => (
  <SandboxShell label="Simple bar chart">
    <ChartExampleFrame label="Simple bar chart">
      <SimpleBar />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsBarYAxisDemo: React.FC = () => (
  <SandboxShell label="Bar chart with Y axis">
    <ChartExampleFrame label="Bar chart with Y axis">
      <SimpleBar showYAxis ariaLabel="Bar chart with Y axis" />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsBarDenseDemo: React.FC = () => (
  <SandboxShell label="Dense bar chart with hover">
    <ChartExampleFrame label="Dense bar chart with hover">
      <DenseBar />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsBarHorizontalDemo: React.FC = () => (
  <SandboxShell label="Horizontal bar chart">
    <ChartExampleFrame label="Horizontal bar chart">
      <HorizontalBar />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsBarMultipleDemo: React.FC = () => (
  <SandboxShell label="Grouped multiple bar chart">
    <ChartExampleFrame label="Grouped multiple bar chart">
      <MultipleBar />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsBarStackedDemo: React.FC = () => (
  <SandboxShell label="Stacked bar chart">
    <ChartExampleFrame label="Stacked bar chart">
      <StackedBar />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsBarLabelsDemo: React.FC = () => (
  <SandboxShell label="Vertical bar chart with value labels">
    <ChartExampleFrame label="Vertical bar chart with value labels">
      <LabelBar />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsBarHorizontalLabelsDemo: React.FC = () => (
  <SandboxShell label="Horizontal bar chart with value labels">
    <ChartExampleFrame label="Horizontal bar chart with value labels">
      <LabelHorizontalBar />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsBarMixedDemo: React.FC = () => (
  <SandboxShell label="Mixed active vertical bar chart">
    <ChartExampleFrame label="Mixed active vertical bar chart">
      <MixedBar />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsBarMixedHorizontalDemo: React.FC = () => (
  <SandboxShell label="Mixed active horizontal bar chart">
    <ChartExampleFrame label="Mixed active horizontal bar chart">
      <MixedHorizontalBar />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsBarNegativeDemo: React.FC = () => (
  <SandboxShell label="Bar chart with negative values">
    <ChartExampleFrame label="Bar chart with negative values">
      <NegativeBar />
    </ChartExampleFrame>
  </SandboxShell>
);
