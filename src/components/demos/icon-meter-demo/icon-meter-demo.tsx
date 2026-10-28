"use client";

import * as React from "react";
import { IconMeter, Stack, Text } from "@viraui/react";
import { ViraSandbox } from "../../common/vira-sandbox";

type SandboxShellProps = {
  children: React.ReactNode;
  label: string;
  height?: number;
};

const SandboxShell: React.FC<SandboxShellProps> = ({
  children,
  label,
  height = 180,
}) => (
  <ViraSandbox
    dialogShell={false}
    height={height}
    label={label}
    vAlign="center"
  >
    {children}
  </ViraSandbox>
);

type RecolorableIconProps = {
  "aria-hidden"?: boolean | "true";
  className?: string;
  fill?: string;
  size?: number | string;
};

/** Minimal heart that honors IconMeter `fill` (solid color or half-gradient url). */
const HeartIcon: React.FC<RecolorableIconProps> = ({
  className,
  fill = "currentColor",
  size = 18,
}) => (
  <svg
    aria-hidden="true"
    className={className}
    fill={fill}
    height={size}
    viewBox="0 0 18 18"
    width={size}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9 15.5S2.5 11.25 2.5 6.75A3.75 3.75 0 0 1 9 4.5a3.75 3.75 0 0 1 6.5 2.25C15.5 11.25 9 15.5 9 15.5" />
  </svg>
);

/** Baseline star row with half fill and default label. */
export const IconMeterDefaultDemo: React.FC = () => (
  <SandboxShell label="Default icon row">
    <IconMeter value={3.5} />
  </SandboxShell>
);

const THRESHOLD_ROWS = [
  [0, "all empty"],
  [0.2, "fraction under 0.25 → empty remainder"],
  [0.5, "mid band → half first icon"],
  [0.8, "fraction ≥ 0.75 → full first icon"],
  [3.5, "three full + half"],
  [5, "all full"],
] as const;

/** Value → empty / half / full paint bands on a five-icon row. */
export const IconMeterThresholdDemo: React.FC = () => (
  <SandboxShell height={420} label="Fill thresholds">
    <Stack rowGap="m">
      {THRESHOLD_ROWS.map(([value, note]) => (
        <Stack key={value} columnGap="m" direction="row" vAlign="center">
          <IconMeter iconCount={5} value={value} />
          <Text size="s" tone="muted" whiteSpace="nowrap">
            {value} — {note}
          </Text>
        </Stack>
      ))}
    </Stack>
  </SandboxShell>
);

/** Compact size steps for dense vs roomy chrome. */
export const IconMeterSizesDemo: React.FC = () => (
  <SandboxShell height={240} label="IconMeter sizes">
    <Stack rowGap="m">
      <IconMeter size="s" value={3} />
      <IconMeter size="m" value={3.5} />
      <IconMeter size="l" value={4} />
    </Stack>
  </SandboxShell>
);

/** CSS color strings for full / half paint. */
export const IconMeterHighlightDemo: React.FC = () => (
  <SandboxShell height={280} label="Highlight colors">
    <Stack rowGap="m">
      <IconMeter highlightColor="var(--global-primary)" value={3.5} />
      <IconMeter highlightColor="var(--highlight-yellow)" value={3.5} />
      <IconMeter highlightColor="var(--highlight-green)" value={4} />
      <IconMeter highlightColor="var(--highlight-red)" value={2.5} />
    </Stack>
  </SandboxShell>
);

/** Default chrome star beside a custom recolorable heart. */
export const IconMeterCustomIconDemo: React.FC = () => (
  <SandboxShell height={220} label="Custom icons">
    <Stack rowGap="m">
      <IconMeter value={3.5} />
      <IconMeter
        highlightColor="var(--highlight-red)"
        icon={HeartIcon}
        value={2.5}
      />
    </Stack>
  </SandboxShell>
);

/** Visible custom label vs hidden label with aria-label. */
export const IconMeterLabelsDemo: React.FC = () => (
  <SandboxShell height={240} label="Labels">
    <Stack rowGap="m">
      <IconMeter value={3.5} />
      <IconMeter label="Quality" value={4} />
      <IconMeter aria-label="Guest rating" hideLabel value={4.5} />
    </Stack>
  </SandboxShell>
);
