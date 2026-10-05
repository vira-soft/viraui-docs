"use client";

import * as React from "react";
import { UserGroup } from "lucide-react";
import { TrayIcon } from "@phosphor-icons/react";
import { Stack, Surface, Text, Title } from "@viraui/react";
import { ViraSandbox } from "../../common/vira-sandbox";

const ICON_SIZE = 32;
const DEFAULT_HEIGHT = 280;

const FolderSpriteIcon: React.FC = () => (
  <>
    <svg width={0} height={0} aria-hidden style={{ position: "absolute" }}>
      <symbol id="vira-icons-demo-folder" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"
        />
      </symbol>
    </svg>
    <svg width={ICON_SIZE} height={ICON_SIZE} aria-hidden>
      <use href="#vira-icons-demo-folder" />
    </svg>
  </>
);

type EmptyStateCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const EmptyStateCard: React.FC<EmptyStateCardProps> = ({
  icon,
  title,
  description,
}) => (
  <Surface border="all" color={1} radius="l" hPadding="m" vPadding="m">
    <Stack
      rowGap="m"
      hPadding="m"
      vPadding="l"
      hAlign="center"
      maxWidth="11rem"
      minWidth="11rem"
    >
      <span aria-hidden>{icon}</span>
      <Title align="center" size="5" render={<h3 />}>
        {title}
      </Title>
      <Text size="s" align="center" tone="muted">
        {description}
      </Text>
    </Stack>
  </Surface>
);

type IconsEmptyStatesDemoProps = {
  /**
   * Preview canvas height in pixels for each sandbox.
   * @defaultValue 280
   */
  height?: number;
};

/**
 * Three empty-state sandboxes in a row: Lucide, Phosphor, and an SVG sprite glyph.
 */
export const IconsEmptyStatesDemo: React.FC<IconsEmptyStatesDemoProps> = ({
  height = DEFAULT_HEIGHT,
}) => (
  <div className="not-prose my-6 grid gap-3 lg:grid-cols-3">
    <ViraSandbox
      label="Empty state with a Lucide React icon"
      dialogShell={false}
      height={height}
      vAlign="center"
    >
      <EmptyStateCard
        icon={<TrayIcon size={ICON_SIZE} weight="duotone" />}
        title="No messages"
        description="phosphor-icons"
      />
    </ViraSandbox>

    <ViraSandbox
      label="Empty state with a Phosphor React icon"
      dialogShell={false}
      height={height}
      vAlign="center"
    >
      <EmptyStateCard
        icon={<UserGroup size={ICON_SIZE} strokeWidth={1.5} />}
        title="Team is empty"
        description="lucide-react"
      />
    </ViraSandbox>

    <ViraSandbox
      label="Empty state with an SVG sprite icon"
      dialogShell={false}
      height={height}
      vAlign="center"
    >
      <EmptyStateCard
        icon={<FolderSpriteIcon />}
        title="No files yet"
        description="Raw SVG"
      />
    </ViraSandbox>
  </div>
);

export type { IconsEmptyStatesDemoProps };
