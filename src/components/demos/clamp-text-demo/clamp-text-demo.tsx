"use client";

import * as React from "react";
import { ClampText, Stack, Surface, Text, Title } from "@viraui/react";
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

const cardDescription =
  "Northwind Analytics keeps shared dashboards, scheduled exports, and access reviews in one workspace so regional teams can publish without duplicating reports.";

/** Two-line clamped description inside a card tile. */
export const ClampTextCardDemo: React.FC = () => (
  <SandboxShell height={260} label="Two-line clamped card description">
    <Surface
      border="all"
      color={2}
      hPadding="m"
      radius="l"
      vPadding="m"
    >
      <Stack maxWidth="16rem" rowGap="s">
        <Title render={<h3 />} size="5">
          Northwind Analytics
        </Title>
        <ClampText
          render={<Text size="s" tone="muted" />}
          rows={2}
          title={cardDescription}
        >
          {cardDescription}
        </ClampText>
      </Stack>
    </Surface>
  </SandboxShell>
);

/** One-line clamp nested inside Title. */
export const ClampTextHeadingDemo: React.FC = () => (
  <SandboxShell label="One-line clamped title">
    <Stack fullWidth maxWidth="16rem">
      <Title render={<h3 />} size="4">
        <ClampText title="Q3 pipeline review for EMEA enterprise renewals">
          Q3 pipeline review for EMEA enterprise renewals
        </ClampText>
      </Title>
    </Stack>
  </SandboxShell>
);

/** Inline clamp inside running Text. */
export const ClampTextInlineDemo: React.FC = () => (
  <SandboxShell height={240} label="Inline clamped fragment inside Text">
    <Stack fullWidth maxWidth="22rem">
      <Text render={<p />} size="s">
        Assigned to{" "}
        <ClampText
          inline
          rows={1}
          title="Amelia Chen · Staff engineer, Platform reliability"
        >
          Amelia Chen · Staff engineer, Platform reliability. Amelia Chen · Staff engineer, Platform reliability. Amelia Chen.
        </ClampText>{" "}
        until Friday.
      </Text>
    </Stack>
  </SandboxShell>
);
