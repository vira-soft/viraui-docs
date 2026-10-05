"use client";

import * as React from "react";
import { AvatarGroup, Stack, Text } from "@viraui/react";
import { ViraSandbox } from "../../common/vira-sandbox";

type SandboxShellProps = {
  children: React.ReactNode;
  label: string;
  height?: number;
};

const SandboxShell: React.FC<SandboxShellProps> = ({
  children,
  label,
  height = 200,
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

const COLLABORATORS = [
  {
    alt: "Lucas Meyer",
    fallback: "LM",
    src: "https://mockmind-api.uifaces.co/content/human/222.jpg",
  },
  {
    alt: "Mia Chen",
    fallback: "MC",
    src: "https://mockmind-api.uifaces.co/content/human/221.jpg",
  },
  {
    alt: "Elena Rossi",
    fallback: "ER",
    src: "https://mockmind-api.uifaces.co/content/human/220.jpg",
  },
  {
    alt: "Noah Patel",
    fallback: "NP",
    src: "https://mockmind-api.uifaces.co/content/human/219.jpg",
  },
  {
    alt: "Lara Thompson",
    fallback: "LT",
    src: "https://mockmind-api.uifaces.co/content/human/80.jpg",
  },
] as const;

/** Horizontal overlap with overflow pill — names live beside the group. */
export const AvatarGroupOverflowDemo: React.FC = () => (
  <SandboxShell label="Overlapping avatars with overflow pill">
    <Stack columnGap="m" direction="row" vAlign="center">
      <AvatarGroup
        avatars={[...COLLABORATORS]}
        maxVisible={3}
        overflowText="+2"
      />
      <Text size="s" tone="muted">
        5 collaborators
      </Text>
    </Stack>
  </SandboxShell>
);

/** Block-axis overlap when the strip should stack, not catalog sizes. */
export const AvatarGroupVerticalDemo: React.FC = () => (
  <SandboxShell height={280} label="Vertical overlapping avatar group">
    <Stack columnGap="m" direction="row" vAlign="center">
      <AvatarGroup
        avatars={COLLABORATORS.slice(0, 3)}
        direction="vertical"
      />
      <Text size="s" tone="muted">
        Reviewers
      </Text>
    </Stack>
  </SandboxShell>
);
