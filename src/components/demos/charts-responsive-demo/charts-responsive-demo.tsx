"use client";

import * as React from "react";
import { ChartExampleFrame } from "../../common/chart-example-frame";
import { ViraSandbox } from "../../common/vira-sandbox";
import { MobileScrubLine } from "../charts-line-demo/plots";
import {
  FluidChart,
  ParentSizeDemo,
  ScaleSvgDemo,
  UseParentSizeDemo,
  UseScreenSizeDemo,
  plotArea,
  plotBar,
  plotPie,
  plotRadar,
} from "./plots";

type SandboxShellProps = {
  children: React.ReactNode;
  label: string;
  height?: number;
};

/** Horizontally resizable sandbox — drag iframe edge so sizing hooks reflow. */
const SandboxShell: React.FC<SandboxShellProps> = ({
  children,
  label,
  height = 400,
}) => (
  <ViraSandbox dialogShell={false} height={height} label={label} resizable>
    {children}
  </ViraSandbox>
);

export const ChartsResponsiveUseParentSizeDemo: React.FC = () => (
  <SandboxShell label="Resizable sandbox — useParentSize">
    <ChartExampleFrame fluid label="useParentSize">
      <UseParentSizeDemo />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsResponsiveParentSizeDemo: React.FC = () => (
  <SandboxShell label="Resizable sandbox — ParentSize">
    <ChartExampleFrame fluid label="ParentSize">
      <ParentSizeDemo />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsResponsiveUseScreenSizeDemo: React.FC = () => (
  <SandboxShell label="Resizable sandbox — useScreenSize">
    <ChartExampleFrame fluid label="useScreenSize">
      <UseScreenSizeDemo />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsResponsiveScaleSvgDemo: React.FC = () => (
  <SandboxShell label="Resizable sandbox — ScaleSVG fixed viewBox chart">
    <ChartExampleFrame fluid label="ScaleSVG">
      <ScaleSvgDemo />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsResponsiveBarDemo: React.FC = () => (
  <SandboxShell label="Resizable sandbox — fluid bar chart">
    <ChartExampleFrame fluid label="Responsive bar chart">
      <FluidChart label="Responsive bar chart" plot={plotBar} />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsResponsiveAreaDemo: React.FC = () => (
  <SandboxShell label="Resizable sandbox — fluid area chart">
    <ChartExampleFrame fluid label="Responsive area chart">
      <FluidChart label="Responsive area chart" plot={plotArea} />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsResponsivePieDemo: React.FC = () => (
  <SandboxShell label="Resizable sandbox — fluid pie chart">
    <ChartExampleFrame fluid label="Responsive pie chart">
      <FluidChart label="Responsive pie chart" height={320} plot={plotPie} />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsResponsiveRadarDemo: React.FC = () => (
  <SandboxShell label="Resizable sandbox — fluid radar chart">
    <ChartExampleFrame fluid label="Responsive radar chart">
      <FluidChart label="Responsive radar chart" height={360} plot={plotRadar} />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsResponsiveMobileScrubDemo: React.FC = () => (
  <SandboxShell height={480} label="Resizable sandbox — mobile scrub line chart">
    <ChartExampleFrame fluid label="Mobile scrub line chart">
      <MobileScrubLine />
    </ChartExampleFrame>
  </SandboxShell>
);
