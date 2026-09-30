"use client";

import * as React from "react";
import {
  ArrowSquareOut,
  ArrowsClockwise,
  Gear,
  House,
  MagnifyingGlass,
  ShareNetwork,
  Trash,
} from "@phosphor-icons/react";
import { IconButton, IconButtonLink, Stack, Surface } from "@viraui/react";
import { ViraSandbox } from "../../common/vira-sandbox";

type SandboxShellProps = {
  children: React.ReactNode;
  label: string;
  height?: number;
  vAlign?: "start" | "center";
};

const SandboxShell: React.FC<SandboxShellProps> = ({
  children,
  label,
  height = 112,
  vAlign = "center",
}) => (
  <ViraSandbox
    dialogShell={false}
    height={height}
    label={label}
    vAlign={vAlign}
  >
    {children}
  </ViraSandbox>
);

/** Keep sandbox iframe from navigating when a demo link is activated. */
const holdHref = {
  href: "#",
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
  },
} as const;

/** Primary / secondary / flat / destructive in one row. */
export const IconButtonVariantsDemo: React.FC = () => (
  <SandboxShell label="IconButton variants: primary, secondary, flat, destructive">
    <Stack columnGap="m" direction="row" rowGap="m" wrap>
      <IconButton aria-label="Settings" icon={<Gear />} />
      <IconButton
        aria-label="Share"
        icon={<ShareNetwork />}
        variant="secondary"
      />
      <IconButton
        aria-label="Search"
        icon={<MagnifyingGlass />}
        variant="flat"
      />
      <IconButton aria-label="Delete" icon={<Trash />} variant="destructive" />
    </Stack>
  </SandboxShell>
);

/** Size steps for denser or roomier chrome. */
export const IconButtonSizesDemo: React.FC = () => (
  <SandboxShell label="IconButton sizes: large, medium, and small">
    <Stack columnGap="m" direction="row" rowGap="m" vAlign="center" wrap>
      <IconButton aria-label="Large settings" icon={<Gear />} size="l" />
      <IconButton aria-label="Medium settings" icon={<Gear />} />
      <IconButton aria-label="Small settings" icon={<Gear />} size="s" />
    </Stack>
  </SandboxShell>
);

/** Loading keeps width stable while the action runs. */
export const IconButtonLoadingDemo: React.FC = () => (
  <SandboxShell label="IconButton loading state with stable width">
    <IconButton aria-label="Refreshing" icon={<ArrowsClockwise />} loading />
  </SandboxShell>
);

/** Compact toolbar strip of icon-only actions. */
export const IconButtonToolbarDemo: React.FC = () => (
  <SandboxShell label="Icon toolbar: settings, share, and delete">
    <Surface border="all" color={1} hPadding="2xs" radius="m" vPadding="2xs">
      <Stack columnGap="2xs" direction="row" vAlign="center">
        <IconButton aria-label="Settings" icon={<Gear />} variant="flat" />
        <IconButton aria-label="Share" icon={<ShareNetwork />} variant="flat" />
        <IconButton
          aria-label="Delete"
          icon={<Trash />}
          variant="destructive"
        />
      </Stack>
    </Surface>
  </SandboxShell>
);

/** IconButtonLink chrome for in-app and external navigation. */
export const IconButtonLinkDemo: React.FC = () => (
  <SandboxShell label="IconButtonLink: home and external docs">
    <Stack columnGap="m" direction="row" rowGap="m" wrap>
      <IconButtonLink {...holdHref} aria-label="Home" icon={<House />} />
      <IconButtonLink
        {...holdHref}
        aria-label="Open documentation"
        icon={<ArrowSquareOut />}
        rel="noreferrer"
        target="_blank"
        variant="flat"
      />
    </Stack>
  </SandboxShell>
);
