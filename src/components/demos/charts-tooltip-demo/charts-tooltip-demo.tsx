"use client";

import * as React from "react";
import { ChartExampleFrame } from "../../common/chart-example-frame";
import { ViraSandbox } from "../../common/vira-sandbox";
import {
  ActivityStackedBar,
  customLabelTitle,
  isoTitle,
  kcalValue,
  longDateTitle,
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

export const ChartsTooltipIndicatorLineDemo: React.FC = () => (
  <SandboxShell label="Tooltip with line indicator">
    <ChartExampleFrame label="Tooltip with line indicator">
      <ActivityStackedBar titleFor={isoTitle} indicator="line" />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsTooltipIndicatorNoneDemo: React.FC = () => (
  <SandboxShell label="Tooltip with no indicator">
    <ChartExampleFrame label="Tooltip with no indicator">
      <ActivityStackedBar titleFor={isoTitle} indicator="none" />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsTooltipLabelCustomDemo: React.FC = () => (
  <SandboxShell label="Tooltip with custom label">
    <ChartExampleFrame label="Tooltip with custom label">
      <ActivityStackedBar titleFor={customLabelTitle} indicator="line" />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsTooltipLabelLongDateDemo: React.FC = () => (
  <SandboxShell label="Tooltip with long date label">
    <ChartExampleFrame label="Tooltip with long date label">
      <ActivityStackedBar titleFor={longDateTitle} indicator="dot" defaultOpenIndex={2} />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsTooltipLabelNoneDemo: React.FC = () => (
  <SandboxShell label="Tooltip with no label">
    <ChartExampleFrame label="Tooltip with no label">
      <ActivityStackedBar indicator="none" defaultOpenIndex={2} />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsTooltipFormatterDemo: React.FC = () => (
  <SandboxShell label="Tooltip value formatter">
    <ChartExampleFrame label="Tooltip value formatter">
      <ActivityStackedBar indicator="none" formatValue={kcalValue} defaultOpenIndex={3} />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsTooltipIconsDemo: React.FC = () => (
  <SandboxShell label="Tooltip with series icons">
    <ChartExampleFrame label="Tooltip with series icons">
      <ActivityStackedBar indicator="icon" defaultOpenIndex={2} />
    </ChartExampleFrame>
  </SandboxShell>
);

export const ChartsTooltipAdvancedDemo: React.FC = () => (
  <SandboxShell label="Advanced tooltip with total">
    <ChartExampleFrame label="Advanced tooltip with total">
      <ActivityStackedBar
        indicator="dot"
        formatValue={kcalValue}
        showTotal
        defaultOpenIndex={4}
      />
    </ChartExampleFrame>
  </SandboxShell>
);
