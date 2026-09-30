"use client";

import * as React from "react";
import { Sparkle } from "@phosphor-icons/react";
import {
  Beam,
  Button,
  ButtonLink,
  Stack,
  Surface,
  Text,
  Title,
} from "@viraui/react";
import { ViraSandbox } from "../../common/vira-sandbox";

type SandboxShellProps = {
  children: React.ReactNode;
  label: string;
  height?: number;
};

const SandboxShell: React.FC<SandboxShellProps> = ({
  children,
  label,
  height = 280,
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

/** Keep sandbox iframe from navigating when a demo link is activated. */
const holdHref = {
  href: "#",
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
  },
} as const;

/** Featured card with a rotating colorful border beam. */
export const BeamBorderDemo: React.FC = () => (
  <SandboxShell label="Featured card with rotating border beam" height={260}>
    <Beam color="colorful" fitContent radius="l" variant="border">
      <Surface border="all" color={2} hPadding="l" radius="auto" vPadding="l">
        <Stack maxWidth="18rem" rowGap="m">
          <Stack rowGap="s">
            <Title render={<h3 />} size="4">
              ViraUI Pro
            </Title>
            <Text render={<p />} size="s" tone="muted">
              Unlock advanced components and priority support for your team.
            </Text>
          </Stack>
          <Button>Upgrade</Button>
        </Stack>
      </Surface>
    </Beam>
  </SandboxShell>
);

/** Line travel under a secondary CTA. */
export const BeamLineDemo: React.FC = () => (
  <SandboxShell label="Line beam under a secondary CTA" height={160}>
    <Stack columnGap="m" direction="row" vAlign="center">
      <Button>Send magic link</Button>
      <Text render={<span />} size="s" tone="muted">
        or
      </Text>
      <Beam duration="5s" radius="m" strength={0.8} variant="line">
        <ButtonLink variant="secondary" {...holdHref}>
          Get ViraUI Pro
        </ButtonLink>
      </Beam>
    </Stack>
  </SandboxShell>
);

/** Breathing pulse around an empty-state icon. */
export const BeamPulseDemo: React.FC = () => (
  <SandboxShell label="Pulse beam around an empty-state icon" height={280}>
    <Stack hAlign="center" rowGap="l" vAlign="center">
      <Beam color="primary" fitContent radius="full" variant="pulse-outside">
        <Surface
          aria-hidden
          border="all"
          color={1}
          hPadding="m"
          radius="full"
          vPadding="m"
        >
          <Sparkle size={24} />
        </Surface>
      </Beam>
      <Stack hAlign="center" maxWidth="28ch" rowGap="s">
        <Title align="center" render={<h3 />} size="4">
          No prompts yet
        </Title>
        <Text align="center" render={<p />} size="s" tone="muted">
          Generate or import a prompt to get started.
        </Text>
      </Stack>
    </Stack>
  </SandboxShell>
);
