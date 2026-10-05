"use client";

import * as React from "react";
import { ArrowSquareOut, CheckCircle, Tag } from "@phosphor-icons/react";
import { Chip, Stack } from "@viraui/react";
import { ViraSandbox } from "../../common/vira-sandbox";

type SandboxShellProps = {
  children: React.ReactNode;
  label: string;
  height?: number;
};

const SandboxShell: React.FC<SandboxShellProps> = ({
  children,
  label,
  height = 160,
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

/** Status pills: filled, muted, and one highlight — not a color inventory. */
export const ChipStatusDemo: React.FC = () => (
  <SandboxShell label="Status chips: Paid, Pending, Overdue">
    <Stack columnGap="s" direction="row" wrap>
      <Chip>Paid</Chip>
      <Chip variant="secondary">Pending</Chip>
      <Chip variant="red">Overdue</Chip>
    </Stack>
  </SandboxShell>
);

/** Decorative Phosphor addons — label carries meaning; slot is aria-hidden. */
export const ChipAddonDemo: React.FC = () => (
  <SandboxShell label="Chips with start and end addons">
    <Stack columnGap="s" direction="row" wrap>
      <Chip addon={<CheckCircle />} variant="outline">
        Verified
      </Chip>
      <Chip addon={<Tag />} addonPosition="end" variant="outline">
        Billing
      </Chip>
    </Stack>
  </SandboxShell>
);

/** Chip as a link via Base UI `render` — still a pill, not a commit button. */
export const ChipLinkDemo: React.FC = () => {
  const handleHoldLink = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
  };

  return (
    <SandboxShell label="Chip rendered as a documentation link">
      <Chip
        addon={<ArrowSquareOut />}
        addonPosition="end"
        render={<a href="#" onClick={handleHoldLink} />}
      >
        API docs
      </Chip>
    </SandboxShell>
  );
};
