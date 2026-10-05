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

/** Page hero Title as h1 with balanced wrap and helper Text. */
export const TitleSemanticPageDemo: React.FC = () => (
  <SandboxShell height={260} label="Semantic page title with helper copy">
    <Stack fullWidth maxWidth="28rem" rowGap="s">
      <Title balanced render={<h1 />} size="1">
        Ship the next release without the guesswork
      </Title>
      <Text maxWidth="42ch" size="s" tone="muted">
        One outline for the screen. Supporting sentences stay on the body
        scale underneath.
      </Text>
    </Stack>
  </SandboxShell>
);

/** Quiet visual size on a semantic h1. */
export const TitleVisualVsSemanticDemo: React.FC = () => (
  <SandboxShell label="Quiet visual size on a semantic page heading">
    <Stack fullWidth maxWidth="22rem" rowGap="2xs">
      <Title render={<h1 />} size="5">
        Notifications
      </Title>
      <Text size="s" tone="muted">
        This screen still starts with one page title. The look stays closer to
        a section heading.
      </Text>
    </Stack>
  </SandboxShell>
);
