"use client";

import * as React from "react";
import { Stack, Surface, Text, Title } from "@viraui/react";
import { useViraSandboxCss, ViraSandbox } from "../../common/vira-sandbox";
import css from "./typography-fluid-demo.module.css?inline";
import styles from "./typography-fluid-demo.module.css";

const DEFAULT_HEIGHT = 340;

const TypographyFluidCanvas: React.FC = () => {
  useViraSandboxCss(css);

  return (
    <Surface
      border="all"
      className={styles.TypographyFluidDemo}
      color={1}
      enableContainer
      hPadding="m"
      overflow="auto"
      radius="m"
      vPadding="m"
    >
      <Stack expandChildren rowGap="l" hPadding="m" vPadding="m" >
        <Title size="1" lineHeight="s">Type that follows the frame</Title>
        <Text render={<p />} size="2xl" tone="muted">
          Narrow the frame and this paragraph eases toward the step below.
          Widen it and the type grows back, still one size apart from the
          heading.
        </Text>
      </Stack>
    </Surface>
  );
};

export type TypographyFluidDemoProps = {
  /**
   * Preview canvas height in pixels.
   * @defaultValue 240
   */
  height?: number;
};

/**
 * Horizontally resizable frame. Title and Text track the frame width
 * through the fluid container range.
 */
export const TypographyFluidDemo: React.FC<TypographyFluidDemoProps> = ({
  height = DEFAULT_HEIGHT,
}) => (
  <ViraSandbox
    dialogShell={false}
    height={height}
    label="Resizable frame showing fluid title and body text"
  >
    <TypographyFluidCanvas />
  </ViraSandbox>
);
