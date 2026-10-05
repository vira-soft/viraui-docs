"use client";

import * as React from "react";
import { Avatar, Stack, Surface, Text } from "@viraui/react";
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

/** Photo beside name — fallback stays required for the image-error path. */
export const AvatarNameRowDemo: React.FC = () => (
  <SandboxShell label="Avatar beside name and role">
    <Stack columnGap="m" direction="row" vAlign="center">
      <Avatar
        alt="Lara Thompson"
        fallback="LT"
        src="https://mockmind-api.uifaces.co/content/human/80.jpg"
      />
      <Stack rowGap="xs">
        <Text weight="semibold">Lara Thompson</Text>
        <Text size="s" tone="muted">
          Design lead
        </Text>
      </Stack>
    </Stack>
  </SandboxShell>
);

/** Initials only when teaching a missing image. */
export const AvatarFallbackDemo: React.FC = () => (
  <SandboxShell height={160} label="Avatar fallback initials without a photo">
    <Stack columnGap="m" direction="row" vAlign="center">
      <Avatar fallback="NP" />
      <Stack rowGap="xs">
        <Text weight="semibold">Noah Patel</Text>
        <Text size="s" tone="muted">
          No photo on file
        </Text>
      </Stack>
    </Stack>
  </SandboxShell>
);

/** Two sizes in a compact strip — not an xs through l inventory. */
export const AvatarSizesDemo: React.FC = () => (
  <SandboxShell height={160} label="Small and medium avatars in a toolbar">
    <Surface border="all" color={1} hPadding="s" radius="m" vPadding="s">
      <Stack columnGap="s" direction="row" vAlign="center">
        <Avatar
          alt="Mia Chen"
          fallback="MC"
          src="https://mockmind-api.uifaces.co/content/human/81.jpg"
        />
        <Avatar
          alt="Elena Rossi"
          fallback="ER"
          size="m"
          src="https://mockmind-api.uifaces.co/content/human/82.jpg"
        />
      </Stack>
    </Surface>
  </SandboxShell>
);
