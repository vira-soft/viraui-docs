"use client";

import * as React from "react";
import {
  ArrowsClockwiseIcon,
  CaretLeftIcon,
  CaretRightIcon,
  DownloadSimpleIcon,
  ShareNetworkIcon,
} from "@phosphor-icons/react";
import {
  Avatar,
  Badge,
  Chip,
  IconButton,
  Separator,
  SROnly,
  Stack,
  Surface,
  Text,
  Title,
} from "@viraui/react";
import { ViraSandbox } from "../../common/vira-sandbox";
import { BellIcon } from "lucide-react";

type SandboxShellProps = {
  children: React.ReactNode;
  label: string;
  height?: number;
};

const SandboxShell: React.FC<SandboxShellProps> = ({
  children,
  label,
  height = 320,
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
  maxWidth?: string;
}> = ({ children, maxWidth = "26rem" }) => (
  <Stack fullWidth hAlign="safe center">
    <Stack expandChildren fullWidth maxWidth={maxWidth}>
      {children}
    </Stack>
  </Stack>
);

const MESSAGES = [
  {
    alt: "Lara Thompson",
    fallback: "LT",
    name: "Lara Thompson",
    preview: "Shared Harbor mark with the studio.",
    src: "https://mockmind-api.uifaces.co/content/human/80.jpg",
    time: "2m",
  },
  {
    alt: "Noah Patel",
    fallback: "NP",
    name: "Noah Patel",
    preview: "Invoice #1842 is ready to review.",
    src: "https://mockmind-api.uifaces.co/content/human/83.jpg",
    time: "1h",
  },
] as const;

const PROJECTS = [
  {
    name: "Harbor mark",
    status: "Active" as const,
    meta: "Brand · Updated today",
  },
  {
    name: "Northwind billing",
    status: "Review" as const,
    meta: "Finance · Due Fri",
  },
] as const;

/** Inbox card — visible chrome stays clean; unread count lives in SROnly. */
export const SROnlyInboxDemo: React.FC = () => (
  <SandboxShell height={340} label="Inbox panel with AT-only unread count">
    <PanelShell>
      <Surface border="all" color={1} radius="l">
        <Stack hPadding="m" rowGap="m" vPadding="m">
          <Stack direction="row" hAlign="space-between" vAlign="center">
            <Stack columnGap="s" direction="row" vAlign="center">
              <Title render={<h2 />} size="5">
                Inbox
              </Title>
              <SROnly>3 unread messages</SROnly>
            </Stack>
            <Badge color="yellow" show>
              <IconButton
                aria-label="Notifications"
                icon={<BellIcon />}
                size="s"
                variant="flat"
              />
            </Badge>
          </Stack>

          <Separator />

          <Stack rowGap="m">
            {MESSAGES.map((message) => (
              <Stack
                key={message.name}
                columnGap="m"
                direction="row"
                vAlign="center"
              >
                <Avatar
                  alt={message.alt}
                  fallback={message.fallback}
                  size="m"
                  src={message.src}
                />
                <Stack expandChildren rowGap="2xs">
                  <Stack
                    columnGap="m"
                    direction="row"
                    hAlign="space-between"
                    vAlign="baseline"
                  >
                    <Text size="s" weight="semibold">
                      {message.name}
                    </Text>
                    <Text size="xs" tone="muted" whiteSpace="nowrap">
                      {message.time}
                    </Text>
                  </Stack>
                  <Text size="s" tone="muted">
                    {message.preview}
                  </Text>
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Surface>
    </PanelShell>
  </SandboxShell>
);

/** Asset toolbar only — refresh named via SROnly + aria-labelledby. */
export const SROnlyAssetToolbarDemo: React.FC = () => (
  <SandboxShell height={140} label="Asset toolbar with SROnly-named refresh">
    <PanelShell maxWidth="28rem">
      <Surface border="all" color={1} hPadding={["m", "s"]} radius="m" vPadding="s">
        <Stack direction="row" hAlign="space-between" vAlign="center">
          <Stack rowGap="s">
            <Text size="s" weight="semibold">
              Harbor mark
            </Text>
            <Text size="xs" tone="muted">
              SVG · Edited 2m ago
            </Text>
          </Stack>
          <Stack columnGap="s" direction="row" vAlign="center">
            <SROnly id="asset-refresh-label">Refresh canvas</SROnly>
            <IconButton
              aria-labelledby="asset-refresh-label"
              icon={<ArrowsClockwiseIcon />}
              size="s"
              variant="flat"
            />
            <IconButton
              aria-label="Download asset"
              icon={<DownloadSimpleIcon />}
              size="s"
              variant="flat"
            />
            <IconButton
              aria-label="Share asset"
              icon={<ShareNetworkIcon />}
              size="s"
              variant="flat"
            />
          </Stack>
        </Stack>
      </Surface>
    </PanelShell>
  </SandboxShell>
);

/** Project library — filter chips, AT-only count, compact page phrasing. */
export const SROnlyLibraryDemo: React.FC = () => (
  <SandboxShell
    height={420}
    label="Project library with AT-only count and page phrasing"
  >
    <PanelShell maxWidth="28rem">
      <Surface border="all" color={1} radius="l">
        <Stack hPadding="m" rowGap="m" vPadding="m">
          <Stack rowGap="xs">
            <Title render={<h2 />} size="5">
              Projects
            </Title>
            <Text size="s" tone="muted">
              Active work across design and billing.
            </Text>
          </Stack>

          <Stack columnGap="s" direction="row" vAlign="center" wrap>
            <Chip>Design</Chip>
            <Chip>Active</Chip>
            <SROnly>Showing 12 of 48 projects</SROnly>
          </Stack>

          <Stack rowGap="m">
            {PROJECTS.map((project) => (
              <Surface
                key={project.name}
                border="all"
                color={2}
                hPadding="m"
                radius="m"
                vPadding="m"
              >
                <Stack
                  columnGap="m"
                  direction="row"
                  hAlign="space-between"
                  vAlign="center"
                >
                  <Stack rowGap="s">
                    <Text size="s" weight="semibold">
                      {project.name}
                    </Text>
                    <Text size="xs" tone="muted">
                      {project.meta}
                    </Text>
                  </Stack>
                  <Chip
                    variant={
                      project.status === "Active" ? "green" : "secondary"
                    }
                  >
                    {project.status}
                  </Chip>
                </Stack>
              </Surface>
            ))}
          </Stack>

          <Separator />

          <Stack
            columnGap="s"
            direction="row"
            hAlign="center"
            render={<nav aria-label="Pagination" />}
            vAlign="center"
          >
            <IconButton
              aria-label="Previous page"
              icon={<CaretLeftIcon />}
              size="s"
              variant="flat"
            />
            <Text size="s">
              <SROnly>Page </SROnly>
              2
              <SROnly> of </SROnly>
              <span aria-hidden="true"> / </span>
              12
            </Text>
            <IconButton
              aria-label="Next page"
              icon={<CaretRightIcon />}
              size="s"
              variant="flat"
            />
          </Stack>
        </Stack>
      </Surface>
    </PanelShell>
  </SandboxShell>
);
