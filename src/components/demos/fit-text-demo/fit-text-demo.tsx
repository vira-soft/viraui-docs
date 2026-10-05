"use client";

import * as React from "react";
import { FitText, Stack, Title } from "@viraui/react";
import { ViraSandbox } from "../../common/vira-sandbox";

type SandboxShellProps = {
  children: React.ReactNode;
  label: string;
  height?: number;
};

/**
 * Horizontally resizable sandbox. FitText tracks parent width, so drag
 * the iframe edge to watch the title scale with the frame.
 */
const SandboxShell: React.FC<SandboxShellProps> = ({
  children,
  label,
  height = 280,
}) => (
  <ViraSandbox
    dialogShell={false}
    height={height}
    label={label}
    resizable
    vAlign="center"
  >
    {children}
  </ViraSandbox>
);

/** Title fills the sandbox width — drag the edge to see it scale. */
export const FitTextResizeDemo: React.FC = () => (
  <SandboxShell label="Resizable sandbox — FitText fills the frame width">
    <Stack expandChildren fullWidth>
    <FitText>
      <Title render={<h2 />} size="display">
        North
      </Title>
    </FitText>
    </Stack>
  </SandboxShell>
);

/** KPI number filling the frame; maxFontSize caps growth when wide. */
export const FitTextStatDemo: React.FC = () => (
  <SandboxShell label="KPI filling the sandbox with a maxFontSize cap">
    <Stack expandChildren fullWidth>
    <FitText maxFontSize="10.5rem">
      <Title render={<h2 />} size="display">
        12.4
      </Title>
    </FitText>
    </Stack>
  </SandboxShell>
);
