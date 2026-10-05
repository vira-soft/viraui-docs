"use client";

import * as React from "react";
import { Elevator, Stack, Surface, Text, Title } from "@viraui/react";
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

type ElevatorDemoProps = {
  /**
   * Preview canvas height in pixels.
   * @defaultValue 220
   */
  height?: number;
  /**
   * Sandbox color mode — pass through for foundation pages that pin light.
   * @defaultValue Inherited from the docs chrome
   */
  mode?: ViraSandboxMode;
};

/**
 * Hover-lift card — resting 1, lifts to 4 on pointer hover.
 * Shared with foundation `/foundation/elevation`.
 */
export const ElevatorDemo: React.FC<ElevatorDemoProps> = ({
  height = 220,
  mode,
}) => (
  <SandboxShell
    height={height}
    label="Elevator card with resting elevation 1 and hover elevation 4"
    mode={mode}
  >
    <Elevator resting={1} hover={4}>
      <Surface
        border="all"
        color={1}
        hPadding="l"
        radius="m"
        render={<Stack rowGap="s" minWidth="14rem" />}
        vPadding="l"
      >
        <Text size="m" weight="semibold">
          Studio Pro
        </Text>
        <Text size="s" tone="muted">
          Hover to lift from resting 1 to 4
        </Text>
      </Surface>
    </Elevator>
  </SandboxShell>
);

/** Resting-only elevation on a Surface card — no hover override. */
export const ElevatorRestingDemo: React.FC = () => (
  <SandboxShell label="Elevator resting elevation on a feature card">
    <Elevator resting={1}>
      <Surface
        border="all"
        color={1}
        hPadding="l"
        radius="l"
        render={<Stack rowGap="s" minWidth="16rem" />}
        vPadding="l"
      >
        <Title render={<h3 />} size="5">
          Atlas workspace
        </Title>
        <Text size="s" tone="muted">
          Baseline column packing with a soft resting shadow
        </Text>
      </Surface>
    </Elevator>
  </SandboxShell>
);

/** Shadow cast direction — default bottom vs top for a floating bar. */
export const ElevatorDirectionDemo: React.FC = () => (
  <SandboxShell
    height={260}
    label="Elevator shadow cast direction bottom and top"
  >
    <Stack columnGap="l" direction="row" wrap>
      <Elevator resting={2}>
        <Surface
          border="all"
          color={1}
          hPadding="m"
          radius="m"
          render={<Stack rowGap="2xs" minWidth="10rem" />}
          vPadding="m"
        >
          <Text size="s" weight="semibold">
            Page card
          </Text>
          <Text size="s" tone="muted">
            Casts toward the bottom
          </Text>
        </Surface>
      </Elevator>
      <Elevator resting={2} direction="top">
        <Surface
          border="all"
          color={1}
          hPadding="m"
          radius="m"
          render={<Stack rowGap="2xs" minWidth="10rem" />}
          vPadding="m"
        >
          <Text size="s" weight="semibold">
            Floating bar
          </Text>
          <Text size="s" tone="muted">
            Casts toward the top
          </Text>
        </Surface>
      </Elevator>
    </Stack>
  </SandboxShell>
);

export type { ElevatorDemoProps };
