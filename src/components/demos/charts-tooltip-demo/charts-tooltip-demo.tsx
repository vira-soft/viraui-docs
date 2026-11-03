"use client";

import * as React from "react";
import { ChartExampleFrame } from "../../common/chart-example-frame";
import { ViraSandbox } from "../../common/vira-sandbox";
import {
  ActiveEnergyArea,
  ActivityStackedBar,
  DistanceLine,
  HeartRateLine,
  MacroStackedArea,
  SleepArea,
  StepsLine,
  WorkoutPie,
  bpmValue,
  distanceDateTitle,
  heartDateTitle,
  isoTitle,
  kmValue,
  sleepTitle,
  stepsDateTitle,
  workoutTitle,
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

/** Stacked Move / Exercise bars — tall swatch rows. */
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

/** Sleep area — fixed Sleep title. */
export const ChartsTooltipLabelCustomDemo: React.FC = () => (
  <SandboxShell label="Sleep tooltip with custom title">
    <ChartExampleFrame label="Sleep tooltip with custom title">
      <SleepArea titleFor={sleepTitle} indicator="line" />
    </ChartExampleFrame>
  </SandboxShell>
);

/** Steps line — long-form date title. */
export const ChartsTooltipLabelLongDateDemo: React.FC = () => (
  <SandboxShell label="Steps tooltip with long date">
    <ChartExampleFrame label="Steps tooltip with long date">
      <StepsLine titleFor={stepsDateTitle} indicator="dot" defaultOpenIndex={2} />
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

/** Walk distance — km unit formatter. */
export const ChartsTooltipFormatterDemo: React.FC = () => (
  <SandboxShell label="Distance tooltip value formatter">
    <ChartExampleFrame label="Distance tooltip value formatter">
      <DistanceLine
        titleFor={distanceDateTitle}
        indicator="none"
        formatValue={kmValue}
        defaultOpenIndex={6}
      />
    </ChartExampleFrame>
  </SandboxShell>
);

/** Workout pie — series icons instead of swatches. */
export const ChartsTooltipIconsDemo: React.FC = () => (
  <SandboxShell label="Workout pie tooltip with series icons">
    <ChartExampleFrame label="Workout pie tooltip with series icons">
      <WorkoutPie titleFor={workoutTitle} indicator="icon" defaultOpenIndex={1} />
    </ChartExampleFrame>
  </SandboxShell>
);

/** Macro stack — indicator + gram formatter + total. */
export const ChartsTooltipAdvancedDemo: React.FC = () => (
  <SandboxShell label="Macro stack tooltip with total">
    <ChartExampleFrame label="Macro stack tooltip with total">
      <MacroStackedArea indicator="dot" showTotal defaultOpenIndex={3} />
    </ChartExampleFrame>
  </SandboxShell>
);
