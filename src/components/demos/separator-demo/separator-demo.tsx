"use client";

import * as React from "react";
import {
  FloppyDisk,
  MagnifyingGlass,
  TextAlignLeft,
  TextB,
  TextItalic,
} from "@phosphor-icons/react";
import {
  IconButton,
  Separator,
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
  height = 280,
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

const METRIC_ROWS = [
  { label: "Expense ratio", value: "0.03%" },
  { label: "APY", value: "4.82%" },
  { label: "Dividend yield", value: "2.14%" },
] as const;

/** Horizontal Separators between stacked metric rows inside a Surface. */
export const SeparatorListDemo: React.FC = () => (
  <SandboxShell height={260} label="Horizontal Separators between fund metrics">
    <PanelShell>
      <Surface border="all" color={1} hPadding="m" radius="m" vPadding="m">
        <Stack rowGap="m">
          {METRIC_ROWS.map((row, index) => (
            <React.Fragment key={row.label}>
              {index > 0 ? <Separator /> : null}
              <Stack
                columnGap="m"
                direction="row"
                hAlign="space-between"
                vAlign="center"
              >
                <Text size="s">{row.label}</Text>
                <Text weight="semibold">{row.value}</Text>
              </Stack>
            </React.Fragment>
          ))}
        </Stack>
      </Surface>
    </PanelShell>
  </SandboxShell>
);

/** Vertical Separator splits formatting tools from save in a toolbar. */
export const SeparatorToolbarDemo: React.FC = () => (
  <SandboxShell height={140} label="Vertical Separator in editor toolbar">
    <Surface border="all" color={1} hPadding="2xs" radius="m" vPadding="2xs">
      <Stack columnGap="2xs" direction="row" vAlign="stretch">
        <IconButton
          aria-label="Bold"
          icon={<TextB />}
          size="s"
          variant="flat"
        />
        <IconButton
          aria-label="Italic"
          icon={<TextItalic />}
          size="s"
          variant="flat"
        />
        <IconButton
          aria-label="Align left"
          icon={<TextAlignLeft />}
          size="s"
          variant="flat"
        />
        <Separator orientation="vertical" />
        <IconButton
          aria-label="Find in document"
          icon={<MagnifyingGlass />}
          size="s"
          variant="flat"
        />
        <IconButton
          aria-label="Save draft"
          icon={<FloppyDisk />}
          size="s"
          variant="flat"
        />
      </Stack>
    </Surface>
  </SandboxShell>
);

/** One-sided and alternating padding via `[start, end]` tuples. */
export const SeparatorAxisPaddingDemo: React.FC = () => (
  <SandboxShell
    height={260}
    label="Separator axis padding with [start, end] tuples"
  >
    <PanelShell>
      <Surface border="all" color={1} overflow="hidden" radius="l">
        <Stack rowGap="m" vPadding="l">
          <Stack hPadding="l" rowGap="xs">
            <Title render={<h2 />} size="6">
              Invoice preview
            </Title>
            <Text maxWidth="22rem" size="s" tone="muted">
              Rule insets more on the end so it clears a trailing status chip.
            </Text>
          </Stack>
          <Separator hPadding={["l", "2xl"]} size="m" />
          <Stack hPadding="l" rowGap="s">
            <Stack
              columnGap="m"
              direction="row"
              hAlign="space-between"
              vAlign="center"
            >
              <Text size="s">Northwind Labs</Text>
              <Text size="xs" tone="muted">
                Due Fri
              </Text>
            </Stack>
            <Stack
              columnGap="m"
              direction="row"
              hAlign="space-between"
              vAlign="center"
            >
              <Text size="s">Amount</Text>
              <Text family="mono" size="s" weight="semibold">
                $840.00
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Surface>
    </PanelShell>
  </SandboxShell>
);

/** size and hPadding inset a section rule under a panel title. */
export const SeparatorThicknessDemo: React.FC = () => (
  <SandboxShell
    height={280}
    label="Inset Separator with medium thickness under title"
  >
    <PanelShell>
      <Surface border="all" color={1} overflow="hidden" radius="l">
        <Stack rowGap="l" vPadding="l">
          <Stack hPadding="l" rowGap="xs">
            <Title render={<h2 />} size="6">
              Claimable balance
            </Title>
            <Text maxWidth="22rem" size="s" tone="muted">
              Royalties ready to move after the next settlement window.
            </Text>
          </Stack>
          <Separator hPadding="l" size="m" variant="dashed" />
          <Stack hPadding="l" rowGap="m">
            <Stack
              columnGap="m"
              direction="row"
              hAlign="space-between"
              vAlign="center"
            >
              <Text size="s" tone="muted">
                Net royalties
              </Text>
              <Text family="mono" size="s">
                $1,240.00
              </Text>
            </Stack>
            <Stack
              columnGap="m"
              direction="row"
              hAlign="space-between"
              vAlign="center"
            >
              <Text size="s" tone="muted">
                Processing fee
              </Text>
              <Text family="mono" size="s">
                −$12.40
              </Text>
            </Stack>
            <Separator />
            <Stack
              columnGap="m"
              direction="row"
              hAlign="space-between"
              vAlign="center"
            >
              <Text size="s" tone="muted">
                Total ready to claim
              </Text>
              <Text family="mono" size="s" weight="semibold">
                $1,227.60 USD
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Surface>
    </PanelShell>
  </SandboxShell>
);
