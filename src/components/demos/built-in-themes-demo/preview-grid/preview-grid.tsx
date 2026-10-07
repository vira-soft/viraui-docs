"use client";

import * as React from "react";
import { Grid, Stack } from "@viraui/react";
import {
  CloneRepositoryBlock,
  EmptyTeamBlock,
  EqualizerBlock,
  NotificationsBlock,
  WorkspaceUsageBlock,
} from "./blocks";

type PreviewGridProps = Omit<
  React.ComponentPropsWithoutRef<typeof Grid>,
  "columns" | "colMinWidth" | "columnGap" | "rowGap" | "children"
>;

/** Compact two-column Design Kitchen sample for built-in brand previews. */
export const PreviewGrid: React.FC<PreviewGridProps> = ({ ...otherProps }) => (
  <Grid
    aria-label="Built-in theme component samples"
    columnGap="m"
    columns={2}
    rowGap="m"
    style={{ inlineSize: "100%" }}
    {...otherProps}
  >
    <Grid.Item>
      <Stack rowGap="m">
        <NotificationsBlock />
        <WorkspaceUsageBlock />
      </Stack>
    </Grid.Item>
    <Grid.Item>
      <Stack rowGap="m">
        <EmptyTeamBlock />
        <CloneRepositoryBlock />
        <EqualizerBlock />
      </Stack>
    </Grid.Item>
  </Grid>
);
