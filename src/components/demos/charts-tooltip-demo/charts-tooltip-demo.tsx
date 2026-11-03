"use client";

import * as React from "react";
import { ChartExampleFrame } from "../../common/chart-example-frame";
import { ViraSandbox } from "../../common/vira-sandbox";
import {
  ActiveEnergyArea,
  ActivityStackedBar,
  HeartRateLine,
  SleepBars,
  StepsBars,
  bpmValue,
  customLabelTitle,
  heartDateTitle,
  isoTitle,
  kcalValue,
  longDateTitle,
  sleepTitle,
  stepsDateTitle,
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

/** Activity stacks — tall swatch rows for Move / Exercise. */
export const ChartsTooltipIndicatorLineDemo: React.FC = () => (
  <SandboxShell label="Activity tooltip with line indicator">
    <ChartExampleFrame label="Activity tooltip with line indicator">
      <ActivityStackedBar titleFor={isoTitle} indicator="line" />
    </ChartExampleFrame>
  </SandboxShell>
);

/** Heart Rate line — value rows only, no swatch. */
export const ChartsTooltipIndicatorNoneDemo: React.FC = () => (
  <SandboxShell label="Heart Rate tooltip with no indicator">
    <ChartExampleFrame label="Heart Rate tooltip with no indicator">
      <HeartRateLine titleFor={heartDateTitle} indicator="none" formatValue={bpmValue} />
    </ChartExampleFrame>
  </SandboxShell>
);

/** Sleep bars — fixed "Sleep" title. */
export const ChartsTooltipLabelCustomDemo: React.FC = () => (
  <SandboxShell label="Sleep tooltip with custom title">
    <ChartExampleFrame label="Sleep tooltip with custom title">
      <SleepBars titleFor={sleepTitle} indicator="line" />
    </ChartExampleFrame>
  </SandboxShell>
);

/** Steps — long-form date title. */
export const ChartsTooltipLabelLongDateDemo: React.FC = () => (
  <SandboxShell label="Steps tooltip with long date">
    <ChartExampleFrame label="Steps tooltip with long date">
      <StepsBars titleFor={stepsDateTitle} indicator="dot" defaultOpenIndex={2} />
    </ChartExampleFrame>
  </SandboxShell>
);

/** Active Energy area — body rows only. */
export const ChartsTooltipLabelNoneDemo: React.FC = () => (
  <SandboxShell label="Active Energy tooltip with no title">
    <ChartExampleFrame label="Active Energy tooltip with no title">
      <ActiveEnergyArea indicator="none" defaultOpenIndex={2} />
    </ChartExampleFrame>
  </SandboxShell>
);

/** Heart Rate — bpm unit formatter. */
export const ChartsTooltipFormatterDemo: React.FC = () => (
  <SandboxShell label="Heart Rate tooltip value formatter">
    <ChartExampleFrame label="Heart Rate tooltip value formatter">
      <HeartRateLine indicator="none" formatValue={bpmValue} defaultOpenIndex={8} />
    </ChartExampleFrame>
  </SandboxShell>
);

/** Activity — series icons instead of swatches. */
export const ChartsTooltipIconsDemo: React.FC = () => (
  <SandboxShell label="Activity tooltip with series icons">
    <ChartExampleFrame label="Activity tooltip with series icons">
      <ActivityStackedBar titleFor={customLabelTitle} indicator="icon" defaultOpenIndex={2} />
    </ChartExampleFrame>
  </SandboxShell>
);

/** Activity — indicator + kcal formatter + total. */
export const ChartsTooltipAdvancedDemo: React.FC = () => (
  <SandboxShell label="Activity tooltip with total">
    <ChartExampleFrame label="Activity tooltip with total">
      <ActivityStackedBar
        titleFor={longDateTitle}
        indicator="dot"
        formatValue={kcalValue}
        showTotal
        defaultOpenIndex={4}
      />
    </ChartExampleFrame>
  </SandboxShell>
);
