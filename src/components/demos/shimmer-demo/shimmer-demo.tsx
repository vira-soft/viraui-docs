"use client";

import * as React from "react";
import { Shimmer, Stack, Surface, Text, Title } from "@viraui/react";
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

/** Streaming status label with static muted helper. */
export const ShimmerStatusDemo: React.FC = () => (
  <SandboxShell label="Shimmering streaming status label">
    <Surface
      aria-busy="true"
      aria-label="Assistant is summarizing"
      border="all"
      color={2}
      hPadding="m"
      radius="l"
      role="region"
      vPadding="m"
    >
      <Stack maxWidth="20rem" rowGap="m">
        <Text tone="muted">
          <Shimmer>Summarizing your request…</Shimmer>
        </Text>
        <Text size="s" tone="muted">
          This usually takes a few seconds. You can keep editing the prompt.
        </Text>
      </Stack>
    </Surface>
  </SandboxShell>
);

/** Shimmer nested inside a Title. */
export const ShimmerTitleDemo: React.FC = () => (
  <SandboxShell height={240} label="Shimmer wrapping a Title">
    <Stack
      aria-busy="true"
      aria-label="Generating weekly report"
      fullWidth
      maxWidth="24rem"
      role="region"
      rowGap="s"
    >
      <Title color="var(--global-muted)" render={<h2 />} size="3">
        <Shimmer>Generating weekly report…</Shimmer>
      </Title>
      <Text size="s" tone="muted">
        The heading stays in place so the layout does not jump when the real
        title arrives.
      </Text>
    </Stack>
  </SandboxShell>
);
