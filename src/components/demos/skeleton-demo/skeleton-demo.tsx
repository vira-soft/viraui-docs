"use client";

import * as React from "react";
import {
  Skeleton,
  Stack,
  Surface,
  Text,
  Title,
} from "@viraui/react";
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

type SkeletonDemoProps = {
  /**
   * Preview canvas height in pixels.
   * @defaultValue 220
   */
  height?: number;
  /**
   * Sandbox color mode — pass through when a page pins light.
   * @defaultValue Inherited from the docs chrome
   */
  mode?: ViraSandboxMode;
};

/** Profile row: circular avatar skeleton beside two text-line blocks. */
export const SkeletonAvatarTextDemo: React.FC<SkeletonDemoProps> = ({
  height = 200,
  mode,
}) => (
  <SandboxShell
    height={height}
    label="Loading profile row with avatar and text skeletons"
    mode={mode}
  >
    <Surface
      aria-busy="true"
      aria-label="Loading profile"
      border="all"
      color={1}
      hPadding="m"
      radius="l"
      role="region"
      vPadding="m"
    >
      <Stack columnGap="m" direction="row" vAlign="center">
        <Skeleton height="3rem" radius="full" width="3rem" />
        <Stack expandChildren rowGap="s">
          <Skeleton height="1rem" width="8rem" />
          <Skeleton height="0.875rem" width="5rem" />
        </Stack>
      </Stack>
    </Surface>
  </SandboxShell>
);

/** Overlay pulse sized by real Title and Text so layout matches the loaded card. */
export const SkeletonOverlayDemo: React.FC<SkeletonDemoProps> = ({
  height = 240,
  mode,
}) => (
  <SandboxShell
    height={height}
    label="Skeleton overlays matching title and body layout"
    mode={mode}
  >
    <Surface
      aria-busy="true"
      aria-label="Loading workspace card"
      border="all"
      color={1}
      radius="l"
      role="region"
    >
      <Stack
        expandChildren
        hPadding="l"
        minWidth="18rem"
        rowGap="m"
        vPadding="l"
      >
        <Skeleton.Overlay>
          <Title render={<h3 />} size="5">
            Atlas workspace
          </Title>
        </Skeleton.Overlay>
        <Skeleton.Overlay>
          <Text size="s" tone="muted">
            Shared boards, billing, and teammate invites for this workspace.
          </Text>
        </Skeleton.Overlay>
      </Stack>
    </Surface>
  </SandboxShell>
);

/** Equal-width action placeholders via Stack expandChildren. */
export const SkeletonEqualActionsDemo: React.FC<SkeletonDemoProps> = ({
  height = 200,
  mode,
}) => (
  <SandboxShell
    height={height}
    label="Equal-width skeleton action buttons"
    mode={mode}
  >
    <Surface
      aria-busy="true"
      aria-label="Loading actions"
      border="all"
      color={1}
      hPadding="m"
      radius="l"
      role="region"
      vPadding="m"
    >
      <Stack columnGap="s" direction="row" expandChildren minWidth="16rem">
        <Skeleton height="2.5rem" radius="l" width="100%" />
        <Skeleton height="2.5rem" radius="l" width="100%" />
      </Stack>
    </Surface>
  </SandboxShell>
);

export type { SkeletonDemoProps };
