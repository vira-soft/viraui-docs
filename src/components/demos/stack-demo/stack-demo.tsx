"use client";

import * as React from "react";
import { FloppyDisk, Trash } from "@phosphor-icons/react";
import {
  Avatar,
  Button,
  ButtonLink,
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

/** Keep sandbox iframe from navigating when a demo link is activated. */
const holdHref = {
  href: "#",
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
  },
} as const;

const TEAM = [
  {
    name: "Sarah Chen",
    role: "Product Design",
    fallback: "SC",
    src: "https://mockmind-api.uifaces.co/content/human/32.jpg",
  },
  {
    name: "Marcus Rivera",
    role: "Engineering",
    fallback: "MR",
    src: "https://mockmind-api.uifaces.co/content/human/45.jpg",
  },
  {
    name: "Elena Voss",
    role: "Research",
    fallback: "EV",
    src: "https://mockmind-api.uifaces.co/content/human/18.jpg",
  },
] as const;

/** Vertical column of Surface cards with token row gap. */
export const StackColumnDemo: React.FC = () => (
  <SandboxShell height={360} label="Vertical Stack of teammate cards">
    <PanelShell>
      <Stack rowGap="m">
        {TEAM.map((person) => (
          <Surface
            key={person.name}
            border="all"
            color={1}
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
              <Stack columnGap="m" direction="row" vAlign="center">
                <Avatar
                  alt={person.name}
                  fallback={person.fallback}
                  size="s"
                  src={person.src}
                />
                <Stack rowGap="xs">
                  <Text weight="semibold">{person.name}</Text>
                  <Text size="s" tone="muted">
                    {person.role}
                  </Text>
                </Stack>
              </Stack>
              <Button size="s" type="button" variant="secondary">
                Details
              </Button>
            </Stack>
          </Surface>
        ))}
      </Stack>
    </PanelShell>
  </SandboxShell>
);

/** Equal-width footer actions via expandChildren on a row Stack. */
export const StackEqualRowDemo: React.FC = () => (
  <SandboxShell
    height={120}
    label="Equal-width Stack row: Cancel, Delete, and Save"
  >
    <Stack columnGap="m" direction="row" expandChildren fullWidth>
      <Button type="button" variant="secondary">
        Cancel
      </Button>
      <Button addon={<Trash />} type="button" variant="destructive">
        Delete
      </Button>
      <Button addon={<FloppyDisk />} type="button">
        Save
      </Button>
    </Stack>
  </SandboxShell>
);

/** Nested stacks with token padding for a settings panel. */
export const StackNestedDemo: React.FC = () => (
  <SandboxShell height={320} label="Nested Stacks with padded settings panel">
    <PanelShell>
      <Surface border="all" color={1} overflow="hidden" radius="l">
        <Stack rowGap="m">
          <Stack hPadding="l" rowGap="xs" vPadding="l">
            <Title render={<h2 />} size="6">
              Workspace
            </Title>
            <Text maxWidth="22rem" size="s" tone="muted">
              Name, billing contact, and default locale for this studio.
            </Text>
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
              <Button type="button">Save changes</Button>
            </Stack>
          </Surface>
        </Stack>
      </Surface>
    </PanelShell>
  </SandboxShell>
);

/** Semantic root via render — header with brand and nav links. */
export const StackSemanticDemo: React.FC = () => (
  <SandboxShell height={140} label="Semantic Stack header with nav">
    <Stack
      columnGap="s"
      direction="row"
      fullWidth
      hAlign="space-between"
      hPadding="m"
      render={<header />}
      vAlign="center"
      vPadding="m"
    >
      <Text weight="semibold">Vira Studio</Text>
      <Stack
        columnGap="xs"
        direction="row"
        render={<nav aria-label="Primary" />}
        vAlign="center"
      >
        <ButtonLink {...holdHref} size="s" variant="secondary">
          Hub
        </ButtonLink>
        <ButtonLink {...holdHref} size="s" variant="flat">
          Studio
        </ButtonLink>
        <ButtonLink {...holdHref} size="s" variant="flat">
          Prompts
        </ButtonLink>
      </Stack>
    </Stack>
  </SandboxShell>
);
