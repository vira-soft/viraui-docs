"use client";

import * as React from "react";
import { Button, Stack, Surface, Text, Title } from "@viraui/react";
import { ViraSandbox } from "../../common/vira-sandbox";

type SandboxShellProps = {
  children: React.ReactNode;
  label: string;
  height?: number;
};

const SandboxShell: React.FC<SandboxShellProps> = ({
  children,
  label,
  height = 280,
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

const PanelShell: React.FC<{
  children: React.ReactNode;
  maxInlineSize?: string;
}> = ({ children, maxInlineSize = "28rem" }) => (
  <Stack
    expandChildren
    fullWidth
    style={{
      inlineSize: "100%",
      maxInlineSize,
      marginInline: "auto",
    }}
  >
    {children}
  </Stack>
);

const RAMP_PANELS = [
  {
    color: 1 as const,
    title: "Overview",
    body: "Open workspaces, recent drafts, and pinned boards.",
  },
  {
    color: 2 as const,
    title: "Active sprint",
    body: "Twelve tickets in progress — three blocked on review.",
  },
  {
    color: 3 as const,
    title: "Needs attention",
    body: "Billing failed for Northwind Labs. Retry the invoice.",
  },
] as const;

/** Base ramp layers 1–3 as stacked workspace panels. */
export const SurfaceColorRampDemo: React.FC = () => (
  <SandboxShell height={360} label="Surface color ramp panels at layers 1–3">
    <PanelShell>
      <Stack rowGap="s">
        {RAMP_PANELS.map((panel) => (
          <Surface
            key={panel.title}
            border="all"
            color={panel.color}
            hPadding="m"
            radius="m"
            vPadding="m"
          >
            <Stack rowGap="xs">
              <Text size="s" weight="semibold">
                {panel.title}
              </Text>
              <Text size="s" tone="muted">
                {panel.body}
              </Text>
            </Stack>
          </Surface>
        ))}
      </Stack>
    </PanelShell>
  </SandboxShell>
);

const FILE_ROWS = [
  { name: "brand-tokens.css", meta: "Edited 2h ago" },
  { name: "hero-cover.jpg", meta: "Uploaded yesterday" },
  { name: "release-notes.md", meta: "Shared with design" },
] as const;

/** Contrast borders on selected sides — rail edge and list dividers. */
export const SurfaceBorderSidesDemo: React.FC = () => (
  <SandboxShell height={320} label="Surface border sides on rail and file list">
    <PanelShell maxInlineSize="32rem">
      <Surface border="all" color={1} overflow="hidden" radius="l">
        <Stack direction="row" expandChildren>
          <Surface
            border="right"
            color={2}
            hPadding="l"
            vPadding="l"
            render={<Stack minWidth="8rem" rowGap="s" />}
          >
            <Text size="xs" weight="semibold">
              Assets
            </Text>
            <Text size="s" tone="muted">
              Library
            </Text>
            <Text size="s" tone="muted">
              Uploads
            </Text>
          </Surface>
          <Stack expandChildren>
            {FILE_ROWS.map((row, index) => (
              <Surface
                key={row.name}
                border={index < FILE_ROWS.length - 1 ? "bottom" : undefined}
                hPadding="l"
                vPadding="m"
              >
                <Stack
                  columnGap="m"
                  direction="row"
                  hAlign="space-between"
                  vAlign="center"
                >
                  <Text size="s" weight="semibold">
                    {row.name}
                  </Text>
                  <Text size="xs" tone="muted">
                    {row.meta}
                  </Text>
                </Stack>
              </Surface>
            ))}
          </Stack>
        </Stack>
      </Surface>
    </PanelShell>
  </SandboxShell>
);

/** Outer token radius with nested `radius="auto"` inset planes. */
export const SurfaceNestedConcentricDemo: React.FC = () => (
  <SandboxShell height={380} label="Nested Surfaces with concentric radius auto">
    <PanelShell maxInlineSize="24rem">
      <Surface
        border="all"
        color={1}
        hPadding="l"
        radius="2xl"
        vPadding="l"
      >
        <Stack rowGap="m">
          <Stack rowGap="xs">
            <Title render={<h2 />} size="6">
              Invite teammates
            </Title>
            <Text size="s" tone="muted">
              Share this workspace with editors and reviewers.
            </Text>
          </Stack>
          <Surface
            border="all"
            color={2}
            hPadding="s"
            radius="auto"
            vPadding="s"
          >
            <Surface
              border="all"
              color={3}
              hPadding="m"
              radius="auto"
              vPadding="m"
            >
              <Stack
                columnGap="m"
                direction="row"
                hAlign="space-between"
                vAlign="center"
              >
                <Stack rowGap="xs">
                  <Text size="s" weight="semibold">
                    Editor seats
                  </Text>
                  <Text size="s" tone="muted">
                    3 of 5 seats used
                  </Text>
                </Stack>
                <Button size="s" type="button" variant="secondary">
                  Invite
                </Button>
              </Stack>
            </Surface>
          </Surface>
        </Stack>
      </Surface>
    </PanelShell>
  </SandboxShell>
);

/** Alternating padding via `[start, end]` tuples (both sides inset). */
export const SurfaceAxisPaddingDemo: React.FC = () => (
  <SandboxShell
    height={280}
    label="Surface axis padding with [start, end] tuples"
  >
    <PanelShell maxInlineSize="24rem">
      <Stack rowGap="s">
        <Surface
          border="all"
          color={2}
          hPadding={["l", "m"]}
          radius="m"
          vPadding={["s", "m"]}
        >
          <Stack rowGap="xs">
            <Text size="s" weight="semibold">
              Release notes
            </Text>
            <Text size="s" tone="muted">
              More start and bottom inset than end and top — still clears the
              border.
            </Text>
          </Stack>
        </Surface>
        <Surface
          border="all"
          color={1}
          hPadding={["m", "l"]}
          radius="m"
          vPadding={["m", "s"]}
        >
          <Stack
            columnGap="m"
            direction="row"
            hAlign="space-between"
            vAlign="center"
          >
            <Text size="s">Draft ready for review</Text>
            <Button size="s" type="button" variant="secondary">
              Open
            </Button>
          </Stack>
        </Surface>
      </Stack>
    </PanelShell>
  </SandboxShell>
);

/** Token padding on Surface; Stack owns child gaps on one composed host. */
export const SurfacePaddingComposeDemo: React.FC = () => (
  <SandboxShell height={360} label="Surface padding with Stack-composed body">
    <PanelShell maxInlineSize="24rem">
      <Stack
        render={
          <Surface border="all" color={1} overflow="hidden" radius="l" />
        }
      >
        <Stack hPadding="l" rowGap="l" vPadding="l">
          <Stack rowGap="xs">
            <Title render={<h2 />} size="6">
              Workspace defaults
            </Title>
            <Text maxWidth="18rem" size="s" tone="muted">
              Choose how new projects inherit brand and review settings.
            </Text>
          </Stack>
          <Stack rowGap="s">
            <Text size="s" weight="semibold">
              Default brand
            </Text>
            <Text size="s" tone="muted">
              Northwind Labs — indigo seed, soft shadows.
            </Text>
          </Stack>
          <Stack rowGap="s">
            <Text size="s" weight="semibold">
              Review policy
            </Text>
            <Text size="s" tone="muted">
              Two approvals before publish.
            </Text>
          </Stack>
        </Stack>
        <Surface color={2} hPadding="l" vPadding="m">
          <Stack
            columnGap="m"
            direction="row"
            hAlign="space-between"
            vAlign="center"
          >
            <Button type="button" variant="secondary">
              Reset
            </Button>
            <Button type="button">Save defaults</Button>
          </Stack>
        </Surface>
      </Stack>
    </PanelShell>
  </SandboxShell>
);
