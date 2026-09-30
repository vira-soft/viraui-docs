"use client";

import * as React from "react";
import { Download, FloppyDisk, Trash } from "@viraui/icons/react";
import { Button, Stack } from "@viraui/react";
import { ViraSandbox } from "../../common/vira-sandbox";

type SandboxShellProps = {
  children: React.ReactNode;
  label: string;
  height?: number;
};

const SandboxShell: React.FC<SandboxShellProps> = ({
  children,
  label,
  height = 112,
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
    <Stack columnGap="m" direction="row" rowGap="m" vAlign="center" wrap>
      <Button loading>Publishing…</Button>
      <Button loading variant="secondary">
        Saving
      </Button>
    </Stack>
  </SandboxShell>
);

/** Typical footer strip: Cancel, Delete, Save. */
export const ButtonActionRowDemo: React.FC = () => (
  <SandboxShell height={120} label="Footer action row with Cancel, Delete, and Save">
    <Stack columnGap="m" direction="row" hAlign="end" rowGap="m" wrap>
      <Button variant="secondary">Cancel</Button>
      <Button variant="destructive">Delete</Button>
      <Button addon={<FloppyDisk />}>Save</Button>
    </Stack>
  </SandboxShell>
);
