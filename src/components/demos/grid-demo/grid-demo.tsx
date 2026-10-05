"use client";

import * as React from "react";
import {
  Elevator,
  Grid,
  Stack,
  Surface,
  Text,
  Title,
} from "@viraui/react";
import { ViraSandbox } from "../../common/vira-sandbox";

type SandboxShellProps = {
  children: React.ReactNode;
  label: string;
  height?: number;
};

const SandboxShell: React.FC<SandboxShellProps> = ({
  children,
  label,
  height = 360,
}) => (
  <ViraSandbox dialogShell={false} height={height} label={label}>
    {children}
  </ViraSandbox>
);

type TileProps = {
  title: string;
  body: string;
};

const fillHeightStyle: React.CSSProperties = { height: "100%" };

const Tile: React.FC<TileProps> = ({ body, title }) => (
  <Elevator resting={1}>
    <Surface
      border="all"
      color={2}
      hoverColor={3}
      radius="m"
      style={fillHeightStyle}
    >
      <Stack hPadding="l" rowGap="s" vPadding="l">
        <Title render={<h3 />} size="5">
          {title}
        </Title>
        <Text render={<p />} size="s" tone="muted">
          {body}
        </Text>
      </Stack>
    </Surface>
  </Elevator>
);

/** Fixed two-column tracks with token gap and axis padding. */
export const GridFixedColumnsDemo: React.FC = () => (
  <SandboxShell
    height={380}
    label="Two-column Grid with token gap and padding"
  >
    <Grid
      aria-label="Workspace modules"
      columnGap="m"
      columns={2}
      hPadding="m"
      rowGap="m"
      vPadding="m"
    >
      <Grid.Item>
        <Tile
          body="Invite reviewers and set default roles for new teammates."
          title="Team access"
        />
      </Grid.Item>
      <Grid.Item>
        <Tile
          body="Choose which channels get product and security alerts."
          title="Notifications"
        />
      </Grid.Item>
      <Grid.Item>
        <Tile
          body="Connect billing and export invoices for this workspace."
          title="Billing"
        />
      </Grid.Item>
      <Grid.Item>
        <Tile
          body="Rotate API keys and review signed-in devices here."
          title="Security"
        />
      </Grid.Item>
    </Grid>
  </SandboxShell>
);

/** Grid.Item spans — row span, full-width banner. */
export const GridItemSpanDemo: React.FC = () => (
  <SandboxShell height={420} label="Grid with spanning items and full-width banner">
    <Grid
      aria-label="Release dashboard"
      columnGap="m"
      columns={2}
      rowGap="m"
    >
      <Grid.Item>
        <Tile
          body="12 open pull requests waiting on review."
          title="Pull requests"
        />
      </Grid.Item>
      <Grid.Item row="span 2">
        <Tile
          body="Staging is green — promote when checks finish. Last deploy shipped two hours ago."
          title="Deployments"
        />
      </Grid.Item>
      <Grid.Item>
        <Tile
          body="Latency and error rates stay within budget."
          title="Observability"
        />
      </Grid.Item>
      <Grid.Item fullWidth>
        <Elevator resting={1}>
          <Surface border="all" color={3} radius="m">
            <Stack hPadding="l" rowGap="s" vPadding="l">
              <Title render={<h3 />} size="5">
                Release train
              </Title>
              <Text render={<p />} size="s" tone="muted">
                v2.4 ships Thursday — freeze merges after the 14:00 cut.
              </Text>
            </Stack>
          </Surface>
        </Elevator>
      </Grid.Item>
    </Grid>
  </SandboxShell>
);

const EmptyCard: React.FC = () => (
  <Elevator resting={1}>
    <Surface
      aria-hidden
      border="all"
      color={2}
      radius="m"
      style={{ ...fillHeightStyle, minBlockSize: "3.5rem" }}
    />
  </Elevator>
);

/** Cute minimal bento — centered 3-col empty cards with spans. */
export const GridBentoDemo: React.FC = () => (
  <SandboxShell height={480} label="Minimal centered bento Grid">
    <Stack fullWidth hAlign="center">
      <Stack fullWidth maxWidth="22rem">
        <Grid
          aria-hidden
          columnGap="s"
          columns={3}
          rowGap="s"
          rowMinHeight="3rem"
        >
          <Grid.Item column="span 2" row="span 2">
            <EmptyCard />
          </Grid.Item>
          <Grid.Item row="span 3">
            <EmptyCard />
          </Grid.Item>
          <Grid.Item row="span 2">
            <EmptyCard />
          </Grid.Item>
          <Grid.Item>
            <EmptyCard />
          </Grid.Item>
          <Grid.Item column="span 2">
            <EmptyCard />
          </Grid.Item>
          <Grid.Item>
            <EmptyCard />
          </Grid.Item>
          <Grid.Item>
            <EmptyCard />
          </Grid.Item>
          <Grid.Item>
            <EmptyCard />
          </Grid.Item>
        </Grid>
      </Stack>
    </Stack>
  </SandboxShell>
);

/** Auto-fill tracks from filling + colMinWidth. */
export const GridAutoFillDemo: React.FC = () => (
  <SandboxShell height={400} label="Auto-fill Grid tile wall">
    <Grid
      aria-label="Library collections"
      colMinWidth="10rem"
      columnGap="m"
      filling="fill"
      rowGap="m"
    >
      <Grid.Item>
        <Tile
          body="Brand marks, wordmarks, and export presets."
          title="Brand kit"
        />
      </Grid.Item>
      <Grid.Item>
        <Tile
          body="Product shots ready for launch and press."
          title="Screenshots"
        />
      </Grid.Item>
      <Grid.Item>
        <Tile
          body="Looping clips for heroes and empty states."
          title="Motion"
        />
      </Grid.Item>
      <Grid.Item>
        <Tile
          body="Icons and illustrations shared across apps."
          title="Glyphs"
        />
      </Grid.Item>
      <Grid.Item>
        <Tile
          body="Approved type ramps and sample layouts."
          title="Type samples"
        />
      </Grid.Item>
      <Grid.Item>
        <Tile
          body="Palette swatches tied to the active theme."
          title="Color boards"
        />
      </Grid.Item>
    </Grid>
  </SandboxShell>
);
