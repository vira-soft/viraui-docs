"use client";

import * as React from "react";
import { ChartExampleFrame } from "../../common/chart-example-frame";
import { ViraSandbox } from "../../common/vira-sandbox";
import { RadarChart } from "./plots";

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

export const ChartsRadarDefaultDemo: React.FC = () => (
  <SandboxShell label="Default radar chart">
    <ChartExampleFrame label="Default radar chart">
      <RadarChart title="Radar Chart" />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsRadarDotsDemo: React.FC = () => (
  <SandboxShell label="Radar chart with dots">
    <ChartExampleFrame label="Radar chart with dots">
      <RadarChart title="Radar Chart - Dots" dots="always" />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsRadarLinesDemo: React.FC = () => (
  <SandboxShell label="Radar chart stroke-only series">
    <ChartExampleFrame label="Radar chart stroke-only series">
      <RadarChart
        title="Radar Chart - Lines"
        series={["desktop", "mobile"]}
        seriesPaint="stroke"
        dots="none"
        tooltipStyle="card"
      />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsRadarGridPolygonDemo: React.FC = () => (
  <SandboxShell label="Radar chart polygon grid">
    <ChartExampleFrame label="Radar chart polygon grid">
      <RadarChart title="Radar Chart - Grid" dots="none" />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsRadarGridCircleDemo: React.FC = () => (
  <SandboxShell label="Radar chart circle grid">
    <ChartExampleFrame label="Radar chart circle grid">
      <RadarChart
        title="Radar Chart - Grid Circle"
        grid="circle"
        dots="always"
        tooltipStyle="pill"
      />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsRadarGridFilledDemo: React.FC = () => (
  <SandboxShell label="Radar chart filled grid">
    <ChartExampleFrame label="Radar chart filled grid">
      <RadarChart title="Radar Chart - Grid Filled" gridFilled dots="none" tooltipStyle="pill" />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsRadarLabelsDemo: React.FC = () => (
  <SandboxShell height={560} label="Radar with value labels">
    <ChartExampleFrame label="Radar with value labels">
      <RadarChart
        title="Radar Chart - Labels"
        series={["desktop", "mobile"]}
        labels="values"
        dots="none"
        tooltipStyle="card"
      />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsRadarMultipleDemo: React.FC = () => (
  <SandboxShell label="Multiple radar series">
    <ChartExampleFrame label="Multiple radar series">
      <RadarChart title="Radar Chart - Multiple" series={["desktop", "mobile"]} dots="hover" />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsRadarLegendDemo: React.FC = () => (
  <SandboxShell label="Radar with legend">
    <ChartExampleFrame label="Radar with legend">
      <RadarChart
        title="Radar Chart - Legend"
        series={["desktop", "mobile"]}
        legend
        dots="hover"
      />
    </ChartExampleFrame>
  </SandboxShell>
);
