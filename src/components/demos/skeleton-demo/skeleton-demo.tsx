"use client";

import * as React from "react";
import { flushSync } from "react-dom";
import {
  Button,
  Skeleton,
  Stack,
  Surface,
  Text,
  Title,
} from "@viraui/react";
import {
  useViraSandboxCss,
  useViraSandboxDocument,
  ViraSandbox,
  type ViraSandboxMode,
} from "../../common/vira-sandbox";
import revealCss from "./skeleton-reveal.module.css?inline";
import revealStyles from "./skeleton-reveal.module.css";

type SandboxShellProps = {
  children: React.ReactNode;
  label: string;
  height?: number;
  mode?: ViraSandboxMode;
};

const SandboxShell: React.FC<SandboxShellProps> = ({
  children,
  label,
  height = 220,
  mode,
}) => (
  <ViraSandbox
    dialogShell={false}
    height={height}
    label={label}
    mode={mode}
    vAlign="center"
  >
    {children}
  </ViraSandbox>
);

type SkeletonDemoProps = {
  /**
   * Preview canvas height in pixels.
   * @defaultValue 220
   */
  height?: number;
  /**
   * Sandbox color mode — pass through when a page pins light.
   * @defaultValue Inherited from the docs chrome
   */
  mode?: ViraSandboxMode;
};

/** Profile row: circular avatar skeleton beside two text-line blocks. */
export const SkeletonAvatarTextDemo: React.FC<SkeletonDemoProps> = ({
  height = 200,
  mode,
}) => (
  <SandboxShell
    height={height}
    label="Loading profile row with avatar and text skeletons"
    mode={mode}
  >
    <Surface
      aria-busy="true"
      aria-label="Loading profile"
      border="all"
      color={1}
      hPadding="m"
      radius="l"
      role="region"
      vPadding="m"
    >
      <Stack columnGap="m" direction="row" vAlign="center">
        <Skeleton height="3rem" radius="full" width="3rem" />
        <Stack expandChildren rowGap="s">
          <Skeleton height="1rem" width="8rem" />
          <Skeleton height="0.875rem" width="5rem" />
        </Stack>
      </Stack>
    </Surface>
  </SandboxShell>
);

/** Overlay pulse sized by real Title and Text so layout matches the loaded card. */
export const SkeletonOverlayDemo: React.FC<SkeletonDemoProps> = ({
  height = 240,
  mode,
}) => (
  <SandboxShell
    height={height}
    label="Skeleton overlays matching title and body layout"
    mode={mode}
  >
    <Surface
      aria-busy="true"
      aria-label="Loading workspace card"
      border="all"
      color={1}
      radius="l"
      role="region"
    >
      <Stack
        expandChildren
        hPadding="l"
        minWidth="18rem"
        rowGap="m"
        vPadding="l"
      >
        <Skeleton.Overlay>
          <Title render={<h3 />} size="5">
            Atlas workspace
          </Title>
        </Skeleton.Overlay>
        <Skeleton.Overlay>
          <Text size="s" tone="muted">
            Shared boards, billing, and teammate invites for this workspace.
          </Text>
        </Skeleton.Overlay>
      </Stack>
    </Surface>
  </SandboxShell>
);

/** Equal-width action placeholders via Stack expandChildren. */
export const SkeletonEqualActionsDemo: React.FC<SkeletonDemoProps> = ({
  height = 200,
  mode,
}) => (
  <SandboxShell
    height={height}
    label="Equal-width skeleton action buttons"
    mode={mode}
  >
    <Surface
      aria-busy="true"
      aria-label="Loading actions"
      border="all"
      color={1}
      hPadding="m"
      radius="l"
      role="region"
      vPadding="m"
    >
      <Stack columnGap="s" direction="row" expandChildren minWidth="16rem">
        <Skeleton height="2.5rem" radius="l" width="100%" />
        <Skeleton height="2.5rem" radius="l" width="100%" />
      </Stack>
    </Surface>
  </SandboxShell>
);

const OVERVIEW_IMAGE =
  "https://framerusercontent.com/images/mZScWFiiv4AA7KSFH4dODuaU.png?width=1922&height=818";

/** Overlay card that wipes to real content via View Transitions. */
const SkeletonRevealScene: React.FC = () => {
  const { document: frameDoc } = useViraSandboxDocument();
  useViraSandboxCss(revealCss);
  const [loading, setLoading] = React.useState(true);

  function revealContent() {
    if (!frameDoc?.startViewTransition) {
      React.startTransition(() => setLoading(false));
      return;
    }

    frameDoc.startViewTransition(() => {
      flushSync(() => setLoading(false));
    });
  }

  return (
    <div className={revealStyles.Reveal}>
      <Surface
        aria-busy={loading}
        aria-label={loading ? "Loading overview card" : "Overview card"}
        border="all"
        color={1}
        overflow="hidden"
        radius="l"
        role="region"
      >
        <Stack hPadding="m" rowGap="m" vPadding="m">
          {loading ? (
            <>
              <Stack maxWidth="20ch" rowGap="xs">
                <Skeleton.Overlay>
                  <Title render={<h2 />} size="6">
                    Ledger overview
                  </Title>
                </Skeleton.Overlay>
                <Skeleton.Overlay>
                  <Text size="s" tone="muted">
                    Updated 2 hours ago
                  </Text>
                </Skeleton.Overlay>
              </Stack>

              <Skeleton.Overlay>
                <Surface color={2} radius="l">
                  <img
                    alt=""
                    aria-hidden="true"
                    className={revealStyles.Media}
                    draggable={false}
                    loading="eager"
                    src={OVERVIEW_IMAGE}
                  />
                </Surface>
              </Skeleton.Overlay>

              <Skeleton.Overlay>
                <Text size="s">
                  Next payout scheduled for Friday with FX risk: low and 3
                  actions pending
                </Text>
              </Skeleton.Overlay>
            </>
          ) : (
            <>
              <Stack rowGap="xs">
                <Title render={<h2 />} size="6">
                  Ledger overview
                </Title>
                <Text size="s" tone="muted">
                  Updated 2 hours ago
                </Text>
              </Stack>

              <Surface color={2} radius="l">
                <img
                  alt=""
                  aria-hidden="true"
                  className={revealStyles.Media}
                  draggable={false}
                  loading="eager"
                  src={OVERVIEW_IMAGE}
                />
              </Surface>

              <Text size="s">
                Next payout scheduled for Friday with FX risk: low and 3
                actions pending
              </Text>
            </>
          )}

          <Stack columnGap="s" direction="row" expandChildren>
            {loading ? (
              <>
                <Button onClick={revealContent} size="s">
                  Show content
                </Button>
                <Skeleton.Overlay>
                  <Button size="s" variant="secondary">
                    Secondary action
                  </Button>
                </Skeleton.Overlay>
              </>
            ) : (
              <>
                <Button size="s" variant="secondary">
                  Primary action
                </Button>
                <Button size="s" variant="secondary">
                  Secondary action
                </Button>
              </>
            )}
          </Stack>
        </Stack>
      </Surface>
    </div>
  );
};

/** Click Show content to wipe Skeleton.Overlay into the loaded card. */
export const SkeletonRevealDemo: React.FC<SkeletonDemoProps> = ({
  height = 420,
  mode,
}) => (
  <SandboxShell
    height={height}
    label="Skeleton overlay reveal wipe into loaded content"
    mode={mode}
  >
    <SkeletonRevealScene />
  </SandboxShell>
);

export type { SkeletonDemoProps };
