"use client";

import * as React from "react";
import { Stack, Text, Textfield, Title } from "@viraui/react";
import { usePrefersReducedMotion } from "../../../hooks/use-prefers-reduced-motion";
import { useViraSandboxCss, ViraSandbox } from "../../common/vira-sandbox";
import css from "./motion-demo-assistive.module.css?inline";
import styles from "./motion-demo-assistive.module.css";

const DIGITS = ["1", "2", "3", "4"] as const;
const CELL_COUNT = DIGITS.length;

const FILL_STEP_MS = 380;
const HOLD_VALID_MS = 500;
const SHAKE_MS = 700;
const HOLD_INVALID_MS = 1400;
const RESET_GAP_MS = 600;
const START_DELAY_MS = 700;
const DEFAULT_HEIGHT = 240;

type MotionDemoAssistiveProps = {
  /**
   * Preview canvas height in pixels.
   * @defaultValue 240
   */
  height?: number;
};

type MotionDemoAssistiveSceneProps = {
  filled: number;
  invalid: boolean;
  shakeKey: number;
};

const MotionDemoAssistiveScene: React.FC<MotionDemoAssistiveSceneProps> = ({
  filled,
  invalid,
  shakeKey,
}) => {
  useViraSandboxCss(css);

  const values = DIGITS.map((digit, index) =>
    index < filled ? digit : "",
  );

  return (
    <Stack className={styles.Panel} rowGap="m" hAlign="center">
      <Stack rowGap="xs" hAlign="center">
        <Title align="center" size="6" render={<h3 />}>
          Enter code
        </Title>
        <Text align="center" size="s" tone="muted">
          We sent a 4-digit code to your email.
        </Text>
      </Stack>

      <div
        className={styles.Fields}
        data-shake={shakeKey > 0 ? "true" : undefined}
        key={shakeKey > 0 ? `shake-${shakeKey}` : "fields"}
      >
        {values.map((value, index) => (
          <Textfield
            key={DIGITS[index]}
            aria-label={`Digit ${index + 1}`}
            className={styles.Digit}
            dirty={invalid}
            inputMode="numeric"
            invalid={invalid}
            maxLength={1}
            readOnly
            value={value}
          />
        ))}
      </div>

      <Text align="center" className={styles.Error} size="s" tone="danger">
        {invalid ? "That code is incorrect. Try again." : "\u00A0"}
      </Text>
    </Stack>
  );
};

/**
 * Assistive motion: four Textfields fill digit-by-digit, then turn invalid and shake.
 */
export const MotionDemoAssistive: React.FC<MotionDemoAssistiveProps> = ({
  height = DEFAULT_HEIGHT,
}) => {
  const reduced = usePrefersReducedMotion();
  const [filled, setFilled] = React.useState(reduced ? CELL_COUNT : 0);
  const [invalid, setInvalid] = React.useState(reduced);
  const [shakeKey, setShakeKey] = React.useState(0);

  React.useEffect(() => {
    if (reduced) {
      setFilled(CELL_COUNT);
      setInvalid(true);
      setShakeKey(0);
      return;
    }

    let cancelled = false;
    const timers: number[] = [];

    const schedule = (fn: () => void, ms: number) => {
      timers.push(window.setTimeout(fn, ms));
    };

    const runCycle = () => {
      if (cancelled) {
        return;
      }

      setFilled(0);
      setInvalid(false);
      setShakeKey(0);

      let elapsed = START_DELAY_MS;

      for (let i = 1; i <= CELL_COUNT; i += 1) {
        const count = i;
        schedule(() => {
          setFilled(count);
        }, elapsed);
        elapsed += FILL_STEP_MS;
      }

      elapsed += HOLD_VALID_MS;

      schedule(() => {
        setInvalid(true);
        setShakeKey((key) => key + 1);
      }, elapsed);

      elapsed += SHAKE_MS + HOLD_INVALID_MS;

      schedule(() => {
        setFilled(0);
        setInvalid(false);
        setShakeKey(0);
      }, elapsed);

      elapsed += RESET_GAP_MS;

      schedule(runCycle, elapsed);
    };

    runCycle();

    return () => {
      cancelled = true;
      for (const id of timers) {
        window.clearTimeout(id);
      }
    };
  }, [reduced]);

  return (
    <ViraSandbox
      label="Four text fields filling digits, then shaking into an invalid state"
      dialogShell={false}
      height={height}
      inert
      vAlign="center"
    >
      <MotionDemoAssistiveScene
        filled={filled}
        invalid={invalid}
        shakeKey={shakeKey}
      />
    </ViraSandbox>
  );
};

export type { MotionDemoAssistiveProps };
