"use client";

import * as React from "react";
import {
  ArrowDown,
  ArrowsClockwise,
  CaretLeft,
  CaretRight,
} from "@phosphor-icons/react";
import {
  Chip,
  IconButton,
  SROnly,
  Stack,
  Surface,
  Text,
  Textfield,
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
  height = 200,
}) => (
  <ViraSandbox dialogShell={false} height={height} label={label}>
    {children}
  </ViraSandbox>
);

const PanelShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Stack
    expandChildren
    fullWidth
    style={{
      inlineSize: "100%",
      maxInlineSize: "28rem",
      marginInline: "auto",
    }}
  >
    {children}
  </Stack>
);

/** Visible heading with an AT-only unread count beside it. */
export const SROnlyStatusDemo: React.FC = () => (
  <SandboxShell height={160} label="AT-only status beside inbox heading">
    <PanelShell>
      <Surface border="all" color={1} hPadding="m" radius="m" vPadding="m">
        <Stack columnGap="s" direction="row" vAlign="center">
          <Title render={<h2 />} size="3">
            Inbox
          </Title>
          <SROnly>3 unread messages</SROnly>
        </Stack>
      </Surface>
    </PanelShell>
  </SandboxShell>
);

/** IconButton named by an SROnly sibling via aria-labelledby. */
export const SROnlyLabeledControlDemo: React.FC = () => (
  <SandboxShell height={140} label="IconButton named via SROnly aria-labelledby">
    <PanelShell>
      <Surface border="all" color={1} hPadding="m" radius="m" vPadding="m">
        <Stack columnGap="s" direction="row" hAlign="end" vAlign="center">
          <SROnly id="canvas-refresh-label">Refresh canvas</SROnly>
          <IconButton
            aria-labelledby="canvas-refresh-label"
            icon={<ArrowsClockwise />}
            variant="flat"
          />
        </Stack>
      </Surface>
    </PanelShell>
  </SandboxShell>
);

/** Compact visible page fraction with AT-friendly “Page N of M” phrasing. */
export const SROnlyPaginationDemo: React.FC = () => (
  <SandboxShell height={140} label="Pagination phrasing for screen readers">
    <PanelShell>
      <Surface border="all" color={1} hPadding="m" radius="m" vPadding="m">
        <Stack
          columnGap="s"
          direction="row"
          hAlign="center"
          render={<nav aria-label="Pagination" />}
          vAlign="center"
        >
          <IconButton
            aria-label="Previous page"
            icon={<CaretLeft />}
            size="s"
            variant="flat"
          />
          <Text size="s">
            <SROnly>Page </SROnly>
            2
            <SROnly> of </SROnly>
            <span aria-hidden="true">/</span>
            12
          </Text>
          <IconButton
            aria-label="Next page"
            icon={<CaretRight />}
            size="s"
            variant="flat"
          />
        </Stack>
      </Surface>
    </PanelShell>
  </SandboxShell>
);

/** Visible chips plus an AT-only result count. */
export const SROnlyFilterSummaryDemo: React.FC = () => (
  <SandboxShell height={160} label="Filter chips with AT-only result count">
    <PanelShell>
      <Surface border="all" color={1} hPadding="m" radius="m" vPadding="m">
        <Stack columnGap="s" direction="row" vAlign="center" wrap>
          <Chip>Design</Chip>
          <Chip>Active</Chip>
          <SROnly>Showing 12 of 48 projects</SROnly>
        </Stack>
      </Surface>
    </PanelShell>
  </SandboxShell>
);

/** Password field with AT-only constraints via aria-describedby. */
export const SROnlyFieldHintDemo: React.FC = () => (
  <SandboxShell height={220} label="Password rules only for assistive tech">
    <PanelShell>
      <Surface border="all" color={1} hPadding="m" radius="m" vPadding="m">
        <Stack rowGap="m">
          <Textfield
            aria-describedby="password-rules"
            autoComplete="new-password"
            label="Password"
            type="password"
          />
          <SROnly id="password-rules">
            Use at least 12 characters and include a number.
          </SROnly>
        </Stack>
      </Surface>
    </PanelShell>
  </SandboxShell>
);

/** Sortable column header with AT-only sort direction. */
export const SROnlySortStateDemo: React.FC = () => (
  <SandboxShell height={140} label="Sortable header with AT-only direction">
    <PanelShell>
      <Surface border="all" color={1} hPadding="m" radius="m" vPadding="m">
        <Stack
          columnGap="2xs"
          direction="row"
          render={<div role="columnheader" />}
          vAlign="center"
        >
          <Text size="s" weight="semibold">
            Name
          </Text>
          <IconButton
            aria-label="Sort by name"
            icon={<ArrowDown />}
            size="s"
            variant="flat"
          />
          <SROnly>sorted ascending</SROnly>
        </Stack>
      </Surface>
    </PanelShell>
  </SandboxShell>
);
