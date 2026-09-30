"use client";

import * as React from "react";
import { ArrowRight, ArrowSquareOut, BookOpen } from "@phosphor-icons/react";
import { ButtonLink, Stack } from "@viraui/react";
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

/** Primary / secondary / flat / destructive link chrome. */
export const ButtonLinkVariantsDemo: React.FC = () => (
  <SandboxShell label="ButtonLink variants: primary, secondary, flat, destructive">
    <Stack columnGap="m" direction="row" rowGap="m" wrap>
      <ButtonLink {...holdHref}>Open docs</ButtonLink>
      <ButtonLink {...holdHref} variant="secondary">
        View account
      </ButtonLink>
      <ButtonLink {...holdHref} variant="flat">
        Learn more
      </ButtonLink>
      <ButtonLink {...holdHref} variant="destructive">
        Leave workspace
      </ButtonLink>
    </Stack>
  </SandboxShell>
);

/** Leading and trailing addon icons on navigation links. */
export const ButtonLinkAddonDemo: React.FC = () => (
  <SandboxShell label="ButtonLinks with leading and trailing icon addons">
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
        pill
        rel="noreferrer"
        target="_blank"
        variant="flat"
      >
        External docs
      </ButtonLink>
    </Stack>
  </SandboxShell>
);

/** Loading keeps width stable; link stays activatable under aria-disabled. */
export const ButtonLinkLoadingDemo: React.FC = () => (
  <SandboxShell label="ButtonLink loading state with stable width">
    <Stack columnGap="m" direction="row" rowGap="m" vAlign="center" wrap>
      <ButtonLink {...holdHref} loading>
        Opening…
      </ButtonLink>
      <ButtonLink {...holdHref} loading variant="secondary">
        Preparing
      </ButtonLink>
    </Stack>
  </SandboxShell>
);
