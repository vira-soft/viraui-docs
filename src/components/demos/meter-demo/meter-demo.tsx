"use client";

import * as React from "react";
import { Meter, Stack } from "@viraui/react";
import { ViraSandbox } from "../../common/vira-sandbox";

type SandboxShellProps = {
  children: React.ReactNode;
  label: string;
  height?: number;
};

const SandboxShell: React.FC<SandboxShellProps> = ({
  children,
  label,
  height = 220,
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

/** Labeled meter with default `renderValue` formatting. */
export const MeterLabeledDemo: React.FC = () => (
  <SandboxShell label="Labeled Meter with default value readout">
    <Stack fullWidth maxWidth="20rem" minWidth="16rem" rowGap="m">
      <Meter
        description="74 GB of 100 GB used."
        label="Storage"
        renderValue
        value={74}
      />
    </Stack>
  </SandboxShell>
);

/** Custom `renderValue` formatter — units beside the label. */
export const MeterCustomValueDemo: React.FC = () => (
  <SandboxShell label="Meter with custom renderValue units">
    <Stack fullWidth maxWidth="20rem" minWidth="16rem" rowGap="m">
      <Meter
        description="42 GB of 100 GB used."
        label="Storage used"
        renderValue={(_formatted, value) => `${value} GB`}
        value={42}
      />
    </Stack>
  </SandboxShell>
);

/** Three highlight `variant` meters stacked for color-coded metrics. */
export const MeterHighlightDemo: React.FC = () => (
  <SandboxShell height={360} label="Highlight variant meters">
    <Stack fullWidth maxWidth="20rem" minWidth="16rem" rowGap="xl">
      <Meter
        description="Uptime across the last 30 days."
        label="Health"
        renderValue
        value={92}
        variant="green"
      />
      <Meter
        description="p95 response time vs budget."
        label="Latency"
        renderValue
        value={38}
        variant="yellow"
      />
      <Meter
        description="Failed requests this hour."
        label="Errors"
        renderValue
        value={12}
        variant="red"
      />
    </Stack>
  </SandboxShell>
);
