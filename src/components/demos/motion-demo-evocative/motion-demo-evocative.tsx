"use client";

import * as React from "react";
import { usePrefersReducedMotion } from "../../../hooks/use-prefers-reduced-motion";
import { ViraSandbox } from "../../common/vira-sandbox";
import { MotionDemoEvocativeDialog } from "./motion-demo-evocative-dialog";

const LOOP_MS = 2800;
const START_DELAY_MS = 900;

/**
 * Evocative motion demo: button opens a Dialog sheet inside the sandbox iframe.
 */
export const MotionDemoEvocative: React.FC = () => {
  const reduced = usePrefersReducedMotion();
  const [open, setOpen] = React.useState(reduced);

  React.useEffect(() => {
    if (reduced) {
      setOpen(true);
      return;
    }

    let nextOpen = false;
    setOpen(false);

    const tick = () => {
      nextOpen = !nextOpen;
      setOpen(nextOpen);
    };

    const start = window.setTimeout(tick, START_DELAY_MS);
    const loop = window.setInterval(tick, LOOP_MS);

    return () => {
      window.clearTimeout(start);
      window.clearInterval(loop);
    };
  }, [reduced]);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
  };

  return (
    <ViraSandbox
      label="Button opening a Dialog sheet inside a ViraUI canvas"
      height={400}
      inert
      vAlign="center"
    >
      <MotionDemoEvocativeDialog open={open} onOpenChange={handleOpenChange} />
    </ViraSandbox>
  );
};
