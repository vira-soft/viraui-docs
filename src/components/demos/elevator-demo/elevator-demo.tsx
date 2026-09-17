"use client";

import * as React from "react";
import { Elevator, Stack, Surface, Text } from "@viraui/react";
import { ViraSandbox } from "../../common/vira-sandbox";

const DEFAULT_HEIGHT = 220;

type ElevatorDemoProps = {
  /**
   * Preview canvas height in pixels.
   * @defaultValue 220
   */
  height?: number;
};

/**
 * Live Elevator demo: card at resting 1, lifts to 2 on hover.
 */
export const ElevatorDemo: React.FC<ElevatorDemoProps> = ({
  height = DEFAULT_HEIGHT,
}) => (
  <ViraSandbox
    label="Elevator card with resting elevation 1 and hover elevation 2"
    dialogShell={false}
    height={height}
    mode="light"
    vAlign="center"
  >
    <Elevator resting={1} hover={4}>
      <Surface
        color={1}
        radius="m"
        hPadding="l"
        vPadding="l"
        render={<Stack rowGap="s" minWidth="14rem" />}
      >
        <Text size="m">Elevated card</Text>
        <Text size="s" tone="muted">
          Hover to lift from 1 to 4
        </Text>
      </Surface>
    </Elevator>
  </ViraSandbox>
);

export type { ElevatorDemoProps };
