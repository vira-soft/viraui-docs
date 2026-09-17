"use client";

import * as React from "react";
import { Button, Stack, Surface } from "@viraui/react";
import { ViraSandbox } from "../../common/vira-sandbox";

const SHARED_RADIUS = "l" as const;

const DEFAULT_HEIGHT = 280;

type RadiusConcentricDemoProps = {
  /**
   * Preview canvas height in pixels.
   * @defaultValue 280
   */
  height?: number;
};

/**
 * Nested Surfaces: toggle inner radius between the same token as the outer host and `auto`.
 */
export const RadiusConcentricDemo: React.FC<RadiusConcentricDemoProps> = ({
  height = DEFAULT_HEIGHT,
}) => {
  const [useAuto, setUseAuto] = React.useState(true);

  return (
    <ViraSandbox
      label="Nested Surfaces toggling equal radius versus radius auto"
      dialogShell={false}
      height={height}
      vAlign="center"
    >
      <Surface
        border="all"
        color={1}
        hPadding="s"
        radius={SHARED_RADIUS}
        vPadding="s"
      >
        <Surface
          border="all"
          color={2}
          hPadding="l"
          radius={useAuto ? "auto" : SHARED_RADIUS}
          vPadding="l"
          render={
            <Stack hAlign="center" minWidth="14rem" vAlign="center" />
          }
        >
          <Button
            variant="secondary"
            onClick={() => {
              setUseAuto((current) => !current);
            }}
          >
            {useAuto ? "auto radius: on" : "auto radius: off"}
          </Button>
        </Surface>
      </Surface>
    </ViraSandbox>
  );
};

export type { RadiusConcentricDemoProps };
