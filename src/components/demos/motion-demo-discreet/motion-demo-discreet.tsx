"use client";

import * as React from "react";
import { Toast } from "@viraui/react";
import { usePrefersReducedMotion } from "../../../hooks/use-prefers-reduced-motion";
import { ViraSandbox } from "../../common/vira-sandbox";
import { MotionDemoDiscreetToast } from "./motion-demo-discreet-toast";

const toastManager = Toast.createToastManager();

const LOOP_MS = 4200;
const START_DELAY_MS = 600;
const TOAST_TIMEOUT_MS = 2400;
const DEFAULT_HEIGHT = 320;

type MotionDemoDiscreetProps = {
  /**
   * Preview canvas height in pixels.
   * @defaultValue 320
   */
  height?: number;
};

/**
 * Discreet motion: toast slides in over a low-fi app shell, holds, then exits.
 */
export const MotionDemoDiscreet: React.FC<MotionDemoDiscreetProps> = ({
  height = DEFAULT_HEIGHT,
}) => {
  const reduced = usePrefersReducedMotion();

  React.useEffect(() => {
    const show = () => {
      toastManager.close();
      toastManager.add({
        title: "Saved",
        description: "Workspace settings updated.",
        timeout: reduced ? 0 : TOAST_TIMEOUT_MS,
      });
    };

    if (reduced) {
      show();
      return () => {
        toastManager.close();
      };
    }

    const start = window.setTimeout(show, START_DELAY_MS);
    const loop = window.setInterval(show, LOOP_MS);

    return () => {
      window.clearTimeout(start);
      window.clearInterval(loop);
      toastManager.close();
    };
  }, [reduced]);

  return (
    <ViraSandbox
      label="App shell with a toast entering and leaving from the bottom-right"
      dialogShell={false}
      height={height}
      inert
      padded={false}
      vAlign="start"
    >
      <MotionDemoDiscreetToast height={height} toastManager={toastManager} />
    </ViraSandbox>
  );
};

export type { MotionDemoDiscreetProps };
