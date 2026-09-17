"use client";

import * as React from "react";
import { Accordion, Stack, Text } from "@viraui/react";
import { usePrefersReducedMotion } from "../../../hooks/use-prefers-reduced-motion";
import { ViraSandbox } from "../../common/vira-sandbox";
import styles from "./motion-demo-functional.module.css";

const ACCORDION_MID = "mid";

const LOOP_MS = 2000;
const START_DELAY_MS = 700;

const DEFAULT_HEIGHT = 260;

type MotionDemoFunctionalProps = {
  /**
   * Preview canvas height in pixels.
   * @defaultValue 260
   */
  height?: number;
};

/**
 * Functional motion demo: middle Accordion item opens and closes in a loop.
 * Item `color` paints open Surface islands (`useSurface` / `islands` stay default).
 */
export const MotionDemoFunctional: React.FC<MotionDemoFunctionalProps> = ({
  height = DEFAULT_HEIGHT,
}) => {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = React.useState<string[]>(
    reduced ? [ACCORDION_MID] : [],
  );

  React.useEffect(() => {
    if (reduced) {
      setValue([ACCORDION_MID]);
      return;
    }

    let open = false;
    setValue([]);

    const tick = () => {
      open = !open;
      setValue(open ? [ACCORDION_MID] : []);
    };

    const start = window.setTimeout(tick, START_DELAY_MS);
    const loop = window.setInterval(tick, LOOP_MS);

    return () => {
      window.clearTimeout(start);
      window.clearInterval(loop);
    };
  }, [reduced]);

  const handleValueChange = (next: string[]) => {
    setValue(next);
  };

  return (
    <ViraSandbox
      label="Accordion with the middle item opening and closing"
      dialogShell={false}
      height={height}
      inert
      vAlign="center"
    >
      <Stack className={styles.Panel} minWidth="30rem">
        <Accordion value={value} onValueChange={handleValueChange}>
          <Accordion.Item
            border="all"
            color={1}
            trigger="Notifications"
            value="first"
          >
            <Text tone="muted">
              Choose how often you want product updates and reminders.
            </Text>
          </Accordion.Item>
          <Accordion.Item
            border="all"
            color={1}
            trigger="Workspace details"
            value={ACCORDION_MID}
          >
            <Text tone="muted">
              Name, timezone, and default language for this workspace.
            </Text>
          </Accordion.Item>
          <Accordion.Item
            border="all"
            color={1}
            trigger="Billing"
            value="last"
          >
            <Text tone="muted">
              Plan, invoices, and payment method stay under this section.
            </Text>
          </Accordion.Item>
        </Accordion>
      </Stack>
    </ViraSandbox>
  );
};

export type { MotionDemoFunctionalProps };
