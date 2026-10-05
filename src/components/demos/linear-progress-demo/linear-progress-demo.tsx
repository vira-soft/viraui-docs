"use client";

import * as React from "react";
import { LinearProgress, Stack, Surface, Text } from "@viraui/react";
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

/** Labeled determinate bar with percentage and helper description. */
export const LinearProgressLabeledDemo: React.FC = () => (
  <SandboxShell label="Labeled determinate LinearProgress for an upload">
    <Stack fullWidth maxWidth="20rem" minWidth="16rem" rowGap="m">
      <LinearProgress
        description="Uploading selected files."
        label="Upload"
        renderValue
        value={42}
      />
    </Stack>
  </SandboxShell>
);

/** Custom `renderValue` formatter — units beside the label. */
export const LinearProgressCustomValueDemo: React.FC = () => (
  <SandboxShell label="LinearProgress with custom renderValue units">
    <Stack fullWidth maxWidth="20rem" minWidth="16rem" rowGap="m">
      <LinearProgress
        description="Batch export running."
        label="Export"
        renderValue={(_formatted, value) =>
          value == null ? "…" : `${value} of 100 files`
        }
        value={64}
      />
    </Stack>
  </SandboxShell>
);

/** Indeterminate sync row — duration unknown. */
export const LinearProgressIndeterminateDemo: React.FC = () => (
  <SandboxShell label="Indeterminate LinearProgress for background sync">
    <Stack fullWidth maxWidth="20rem" minWidth="16rem" rowGap="m">
      <LinearProgress
        description="Checking for updates."
        label="Syncing"
        value={null}
      />
    </Stack>
  </SandboxShell>
);

/** Compact track-only bar inside a goal Surface card. */
export const LinearProgressGoalDemo: React.FC = () => (
  <SandboxShell height={280} label="Track-only LinearProgress inside a goal card">
    <Surface
      color={2}
      hPadding="m"
      radius="m"
      render={<Stack maxWidth="18rem" minWidth="16rem" rowGap="m" />}
      vPadding="m"
    >
      <Text family="mono" size="xs" tone="muted">
        RETIREMENT
      </Text>
      <Text size="2xl">$420,000</Text>
      <LinearProgress aria-label="Retirement progress" value={65} />
      <Stack columnGap="s" direction="row" hAlign="space-between" vAlign="center">
        <Text tone="muted">65% achieved</Text>
        <Text weight="semibold">$273,000</Text>
      </Stack>
    </Surface>
  </SandboxShell>
);
