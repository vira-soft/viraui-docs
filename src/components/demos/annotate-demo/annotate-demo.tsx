"use client";

import * as React from "react";
import { Annotate, Stack, Text } from "@viraui/react";
import { ViraSandbox } from "../../common/vira-sandbox";

type SandboxShellProps = {
  children: React.ReactNode;
  label: string;
  height?: number;
};

const SandboxShell: React.FC<SandboxShellProps> = ({
  children,
  label,
  height = 420,
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

/** Top-side note with highlighter mark — note is decorative; copy repeats nearby. */
export const AnnotateMarkDemo: React.FC = () => (
  <SandboxShell height={440} label="Annotate with mark and top-side note">
    <Stack hPadding="2xl" vPadding="2xl">
      <Text>
        Every workspace includes{" "}
        <Annotate mark note="Best value">
          unlimited storage
        </Annotate>{" "}
        so teams are not counting gigabytes. Best value sits in this sentence
        too — the arrow is decoration only.
      </Text>
    </Stack>
  </SandboxShell>
);

/** Top-end placement with highlight color — one other compass point, not a catalog. */
export const AnnotateEndDemo: React.FC = () => (
  <SandboxShell height={360} label="Annotate note on the top-end side">
    <Stack hPadding="2xl" rowGap="m" vPadding="2xl">
      <Text>
        Ship the{" "}
        <Annotate color="blue" note="New this week" side="top-end">
          public changelog
        </Annotate>
        .
      </Text>
      <Text size="s" tone="muted">
        The notes are new this week. The arrow is decoration only.
      </Text>
    </Stack>
  </SandboxShell>
);
