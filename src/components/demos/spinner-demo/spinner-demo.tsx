"use client";

import * as React from "react";
import { Button, Chip, Spinner, Stack, Text } from "@viraui/react";
import {
  ViraSandbox,
  type ViraSandboxMode,
} from "../../common/vira-sandbox";

type SandboxShellProps = {
  children: React.ReactNode;
  label: string;
  height?: number;
  mode?: ViraSandboxMode;
};

const SandboxShell: React.FC<SandboxShellProps> = ({
  children,
  label,
  height = 220,
  mode,
}) => (
  <ViraSandbox
    dialogShell={false}
    height={height}
    label={label}
    mode={mode}
    vAlign="center"
  >
    {children}
  </ViraSandbox>
);

/** Centered status region — decorative Spinner + muted wait copy. */
export const SpinnerCenteredDemo: React.FC = () => (
  <SandboxShell label="Centered Spinner status with muted wait copy">
    <Stack rowGap="s" hAlign="center" role="status" vPadding="l">
      <Spinner aria-hidden />
      <Text align="center" size="s" tone="muted">
        Fetching latest data
      </Text>
    </Stack>
  </SandboxShell>
);

/** Non-interactive Chip with trailing Spinner addon. */
export const SpinnerChipDemo: React.FC = () => (
  <SandboxShell height={140} label="Chip with trailing Spinner addon">
    <Chip addon={<Spinner aria-hidden size="s" />} addonPosition="end" variant="blue">
      Deploying
    </Chip>
  </SandboxShell>
);

/** Prefer Button `loading` over nesting a Spinner. */
export const SpinnerButtonLoadingDemo: React.FC = () => (
  <SandboxShell height={140} label="Idle Button beside Button with loading">
    <Stack columnGap="m" direction="row" wrap>
      <Button>Save</Button>
      <Button loading>Save</Button>
    </Stack>
  </SandboxShell>
);
