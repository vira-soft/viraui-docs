"use client";

import * as React from "react";
import { Check, ImagesLayered } from "@viraui/icons/react";
import { Beam, Button, Stack, Surface, Text, Title } from "@viraui/react";
import { usePrefersReducedMotion } from "../../../hooks/use-prefers-reduced-motion";
import { useViraSandboxCss, ViraSandbox } from "../../common/vira-sandbox";
import css from "./motion-demo-playful.module.css?inline";
import styles from "./motion-demo-playful.module.css";

const VISIBLE_MS = 2600;
const HIDDEN_MS = 1100;
const START_DELAY_MS = 350;
const DEFAULT_HEIGHT = 340;

type MotionDemoPlayfulProps = {
  /**
   * Preview canvas height in pixels.
   * @defaultValue 340
   */
  height?: number;
};

type MotionDemoPlayfulSceneProps = {
  visible: boolean;
};

const MotionDemoPlayfulScene: React.FC<MotionDemoPlayfulSceneProps> = ({
  visible,
}) => {
  useViraSandboxCss(css);

  const visibleAttr = visible ? "true" : "false";

  return (
    <div className={styles.Stage}>
      <Surface
        border="all"
        className={styles.Card}
        color={1}
        overflow="hidden"
        radius="l"
      >
        <Stack
          hAlign="center"
          hPadding="l"
          rowGap="l"
          vPadding={["2xl", "2xl"]}
        >
            <Surface
              border="all"
              className={styles.Icon}
              color="oklab(from var(--highlight-green) l a b / 10%)"
              data-visible={visibleAttr}
              hPadding="m"
              radius="full"
              vPadding="m"
            >
              <Check size={32} color="var(--highlight-green)" />
            </Surface>

          <Stack
            className={styles.Copy}
            data-visible={visibleAttr}
            hAlign="center"
            rowGap="s"
          >
            <Title align="center" size="4" render={<h4 />}>
              Distribute Track
            </Title>
            <Text align="center" maxWidth="18rem" size="s" tone="muted">
              Upload your first master to start reaching listeners on Spotify,
              Apple Music, and more.
            </Text>
          </Stack>

          <div className={styles.Action} data-visible={visibleAttr}>
            <Button variant="secondary">Create Release</Button>
          </div>
        </Stack>
      </Surface>
    </div>
  );
};

/**
 * Playful motion: Distribute Track parts enter and exit with staggered delays.
 */
export const MotionDemoPlayful: React.FC<MotionDemoPlayfulProps> = ({
  height = DEFAULT_HEIGHT,
}) => {
  const reduced = usePrefersReducedMotion();
  const [visible, setVisible] = React.useState(reduced);

  React.useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }

    let cancelled = false;
    let timer = 0;
    let nextVisible = false;

    const tick = () => {
      if (cancelled) {
        return;
      }

      nextVisible = !nextVisible;
      setVisible(nextVisible);
      timer = window.setTimeout(tick, nextVisible ? VISIBLE_MS : HIDDEN_MS);
    };

    timer = window.setTimeout(tick, START_DELAY_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [reduced]);

  return (
    <ViraSandbox
      label="Distribute Track parts entering and leaving with a staggered loop"
      dialogShell={false}
      height={height}
      inert
      vAlign="center"
    >
      <MotionDemoPlayfulScene visible={visible} />
    </ViraSandbox>
  );
};

export type { MotionDemoPlayfulProps };
