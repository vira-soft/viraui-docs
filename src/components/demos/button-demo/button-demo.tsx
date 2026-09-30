"use client";

import * as React from "react";
import {
  ArrowRight,
  ArrowSquareOut,
  BookOpen,
  Download,
  FloppyDisk,
  Trash,
} from "@phosphor-icons/react";
import { Button, ButtonLink, Stack } from "@viraui/react";
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
export const ButtonVariantsDemo: React.FC = () => (
  <SandboxShell label="Button variants: primary, secondary, flat, destructive">
    <Stack columnGap="m" direction="row" rowGap="m" wrap>
      <Button>Save</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="flat">Learn more</Button>
      <Button variant="destructive">Delete</Button>
    </Stack>
  </SandboxShell>
);

/** Leading and trailing addon icons beside the label. */
export const ButtonAddonDemo: React.FC = () => (
  <SandboxShell label="Buttons with leading and trailing icon addons">
    <Stack columnGap="m" direction="row" rowGap="m" wrap>
      <Button addon={<Download />}>Download</Button>
      <Button addon={<FloppyDisk />} addonPosition="end" variant="secondary">
        Save draft
      </Button>
      <Button addon={<Trash />} pill variant="destructive">
        Delete
      </Button>
    </Stack>
  </SandboxShell>
);

/** Loading keeps width stable while the action runs. */
export const ButtonLoadingDemo: React.FC = () => (
  <SandboxShell label="Button loading state with stable width">
    <Button loading>Publishing…</Button>
  </SandboxShell>
);

/** Equal-width footer strip: Cancel, Delete, Save fill the row via Stack. */
export const ButtonActionRowDemo: React.FC = () => (
  <SandboxShell
    height={120}
    label="Full-width footer row: Cancel, Delete, and Save share the strip equally"
  >
    <Stack columnGap="m" direction="row" expandChildren fullWidth>
      <Button variant="secondary">Cancel</Button>
      <Button variant="destructive">Delete</Button>
      <Button addon={<FloppyDisk />}>Save</Button>
    </Stack>
  </SandboxShell>
);

/** ButtonLink chrome for in-app and external navigation. */
export const ButtonLinkDemo: React.FC = () => (
  <SandboxShell label="ButtonLink: documentation, continue, and external docs">
    <Stack columnGap="m" direction="row" rowGap="m" wrap>
      <ButtonLink {...holdHref} addon={<BookOpen />}>
        Documentation
      </ButtonLink>
      <ButtonLink
        {...holdHref}
        addon={<ArrowRight />}
        addonPosition="end"
        variant="secondary"
      >
        Continue
      </ButtonLink>
      <ButtonLink
        {...holdHref}
        addon={<ArrowSquareOut />}
        addonPosition="end"
        rel="noreferrer"
        target="_blank"
        variant="flat"
      >
        External docs
      </ButtonLink>
    </Stack>
  </SandboxShell>
);
