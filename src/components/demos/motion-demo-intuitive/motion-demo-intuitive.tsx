"use client";

import * as React from "react";
import {
  AvatarGroup,
  Badge,
  Button,
  Stack,
  Surface,
  Text,
  Title,
} from "@viraui/react";
import { usePrefersReducedMotion } from "../../../hooks/use-prefers-reduced-motion";
import { useViraSandboxCss, ViraSandbox } from "../../common/vira-sandbox";
import css from "./motion-demo-intuitive.module.css?inline";
import styles from "./motion-demo-intuitive.module.css";

const AVATARS = [
  {
    alt: "Team member one",
    fallback: "AL",
    src: "https://mockmind-api.uifaces.co/content/human/80.jpg",
  },
  {
    alt: "Team member two",
    fallback: "MR",
    src: "https://mockmind-api.uifaces.co/content/human/219.jpg",
  },
  {
    alt: "Team member three",
    fallback: "MR",
    src: "https://mockmind-api.uifaces.co/content/human/128.jpg",
  },
] as const;

const PHASES = [
  "idle",
  "approach",
  "hover",
  "press",
  "hover",
  "retreat",
] as const;

type DemoPhase = (typeof PHASES)[number];

const PHASE_MS: Record<DemoPhase, number> = {
  idle: 700,
  approach: 450,
  hover: 900,
  press: 280,
  retreat: 700,
};

const DEFAULT_HEIGHT = 380;

type MotionDemoIntuitiveProps = {
  /**
   * Preview canvas height in pixels.
   * @defaultValue 380
   */
  height?: number;
};

type MotionDemoIntuitiveSceneProps = {
  phase: DemoPhase;
  showBadge: boolean;
};

const FakeCursor: React.FC<{ phase: DemoPhase }> = ({ phase }) => (
  <svg
    aria-hidden="true"
    className={styles.Cursor}
    data-phase={phase}
    fill="none"
    height={22}
    viewBox="0 0 18 22"
    width={18}
  >
    <path
      d="M1 1L1 16.5L5.2 13.2L8.4 20.2L11 19L7.8 12L13.2 12Z"
      fill="var(--base-1)"
      stroke="var(--global-foreground)"
      strokeLinejoin="round"
      strokeWidth="1.2"
    />
  </svg>
);

const MotionDemoIntuitiveScene: React.FC<MotionDemoIntuitiveSceneProps> = ({
  phase,
  showBadge,
}) => {
  useViraSandboxCss(css);

  const hovering = phase === "hover" || phase === "press";
  const pressed = phase === "press";

  return (
    <div className={styles.Stage}>
      <Surface
        border="all"
        color={1}
        data-vibrant
        hPadding="m"
        radius="l"
        vPadding="m"
      >
        <Stack
          className={styles.Dashed}
          hAlign="center"
          hPadding="l"
          rowGap="m"
          vPadding="2xl"
        >
          <AvatarGroup avatars={[...AVATARS]} size="m" />

          <Title align="center" size="5" render={<h3 />}>
            No Team Members
          </Title>
          <Text align="center" maxWidth="14rem" size="s" tone="muted">
            Invite your team to collaborate on this project.
          </Text>

          <Badge color="green" show={showBadge}>
            <Button
              className={styles.Invite}
              data-demo-hover={hovering ? "true" : undefined}
              data-demo-pressed={pressed ? "true" : undefined}
            >
              Invite Members
            </Button>
          </Badge>
        </Stack>
      </Surface>

      <FakeCursor phase={phase} />
    </div>
  );
};

/**
 * Intuitive motion: empty-team card with a fake cursor that hovers and presses the button.
 */
export const MotionDemoIntuitive: React.FC<MotionDemoIntuitiveProps> = ({
  height = DEFAULT_HEIGHT,
}) => {
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = React.useState<DemoPhase>(
    reduced ? "hover" : "idle",
  );
  const [showBadge, setShowBadge] = React.useState(reduced);

  React.useEffect(() => {
    if (reduced) {
      setPhase("hover");
      setShowBadge(true);
      return;
    }

    let cancelled = false;
    let phaseIndex = 0;
    let timer = 0;

    const tick = () => {
      if (cancelled) {
        return;
      }

      const next = PHASES[phaseIndex % PHASES.length] ?? "idle";
      phaseIndex += 1;
      setPhase(next);

      if (next === "press") {
        setShowBadge(true);
      }
      if (next === "idle") {
        setShowBadge(false);
      }

      timer = window.setTimeout(tick, PHASE_MS[next]);
    };

    timer = window.setTimeout(tick, 200);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [reduced]);

  return (
    <ViraSandbox
      label="Empty team card with a fake cursor hovering and pressing Invite Members"
      dialogShell={false}
      height={height}
      inert
      vAlign="center"
    >
      <MotionDemoIntuitiveScene phase={phase} showBadge={showBadge} />
    </ViraSandbox>
  );
};

export type { MotionDemoIntuitiveProps };
