"use client";

import * as React from "react";
import { Stack, Text, Title } from "@viraui/react";
import { ViraSandbox } from "../../common/vira-sandbox";

const DEFAULT_HEIGHT = 280;

const TypographyFluidCanvas: React.FC = () => (
  <Stack expandChildren fullWidth rowGap="l" style={{ inlineSize: "100%" }}>
    <Title size="1" lineHeight="s">
      Type that follows the frame
    </Title>
    <Text fluid render={<p />} size="xl" tone="muted">
      Narrow the sandbox and this paragraph eases toward the step below. Widen
      it and the type grows back, still one size apart from the heading.
    </Text>
  </Stack>
);

export type TypographyFluidDemoProps = {
  /**
   * Preview canvas height in pixels.
   * @defaultValue 280
   */
  height?: number;
};

/**
 * Horizontally resizable sandbox. Fluid Title/Text use `100vi`, so clamp
 * tracks the iframe viewport when the user drags the resize handle.
 */
export const TypographyFluidDemo: React.FC<TypographyFluidDemoProps> = ({
  height = DEFAULT_HEIGHT,
}) => (
  <ViraSandbox
    dialogShell={false}
    height={height}
    label="Resizable sandbox showing fluid title and body text"
    resizable
    vAlign="start"
  >
    <TypographyFluidCanvas />
  </ViraSandbox>
);
