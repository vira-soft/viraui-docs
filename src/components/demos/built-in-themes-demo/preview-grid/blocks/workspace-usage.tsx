"use client";

import * as React from "react";
import { Sun } from "@phosphor-icons/react";
import { Button, Meter, Stack, Surface, Text, Title } from "@viraui/react";

type WorkspaceUsageBlockProps = React.ComponentPropsWithoutRef<typeof Surface>;

/** Design Kitchen Workspace Usage card — Meter stack + upgrade footer. */
export const WorkspaceUsageBlock: React.FC<WorkspaceUsageBlockProps> = ({
  ...otherProps
}) => (
  <Surface
    border="all"
    color={1}
    radius="l"
    render={<Stack rowGap="l" />}
    style={{ overflow: "hidden" }}
    {...otherProps}
  >
    <Stack hPadding="m" rowGap="2xl" vPadding="m">
      <Stack rowGap="xs">
        <Title render={<h2 />} size="6">
          Workspace Usage
        </Title>
        <Text size="s" tone="muted">
          Acme Corp · Pro plan · resets in 12 days
        </Text>
      </Stack>

      <Stack rowGap="l">
        <Meter
          description="74 GB of 100 GB"
          label="Storage"
          renderValue
          value={74}
        />
        <Meter
          description={
            <>
              <code>18,400</code> of <code>25,000</code> requests this month
            </>
          }
          format={{ maximumFractionDigits: 0 }}
          label="API quota"
          locale="en-US"
          max={25000}
          min={0}
          renderValue
          value={18400}
        />
        <Meter
          label={
            <Stack columnGap="xs" direction="row" vAlign="center">
              <Sun aria-hidden size={16} />
              <span>Backup health</span>
            </Stack>
          }
          renderValue
          value={91}
        />
      </Stack>
    </Stack>

    <Surface
      color={2}
      hPadding="l"
      render={
        <Stack direction="row" hAlign="space-between" vAlign="center" />
      }
      vPadding="m"
    >
      <Button variant="secondary">View details</Button>
      <Button>Upgrade plan</Button>
    </Surface>
  </Surface>
);
