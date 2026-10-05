"use client";

import * as React from "react";
import { Stack, Text, Title } from "@viraui/react";
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

/** Muted helper line under a section Title. */
export const TextMutedHelperDemo: React.FC = () => (
  <SandboxShell label="Muted helper line under a section title">
    <Stack fullWidth maxWidth="22rem" rowGap="2xs">
      <Title render={<h2 />} size="4">
        Notification preferences
      </Title>
      <Text maxWidth="36ch" size="s" tone="muted">
        Choose which product emails you still want. You can change this later.
      </Text>
    </Stack>
  </SandboxShell>
);

/** Semantic `p` and `label` roots that keep Text styling. */
export const TextSemanticRootDemo: React.FC = () => (
  <SandboxShell height={260} label="Text rendered as paragraph and label">
    <Stack fullWidth maxWidth="24rem" rowGap="m">
      <Text maxWidth="42ch" render={<p />}>
        Workspace members can invite teammates, manage billing, and publish
        shared libraries. Owners keep the last word on deletion.
      </Text>
      <Text render={<label />} size="s" weight="semibold">
        Workspace name
      </Text>
    </Stack>
  </SandboxShell>
);

/** Nested Text inherits size; nested tones carry the emphasis. */
export const TextNestedTonesDemo: React.FC = () => (
  <SandboxShell label="Nested Text tones inside running copy">
    <Stack fullWidth maxWidth="28rem">
      <Text size="l" tone="muted">
        Deploy finished with{" "}
        <Text tone="danger" weight="semibold">
          3 failing checks
        </Text>{" "}
        and{" "}
        <Text tone="positive" weight="semibold">
          18 passing
        </Text>
        . Review the failed jobs before you merge.
      </Text>
    </Stack>
  </SandboxShell>
);
