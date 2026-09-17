"use client";

import * as React from "react";
import { Button, Dialog, Stack, Text } from "@viraui/react";
import { useViraSandboxDocument } from "../../common/vira-sandbox";
import styles from "./motion-demo-evocative.module.css";

type MotionDemoEvocativeDialogProps = {
  /**
   * Whether the dialog sheet is open.
   * @defaultValue false
   */
  open: boolean;
  /**
   * Called when open state should change.
   */
  onOpenChange: (next: boolean) => void;
};

/**
 * Dialog content for the evocative demo — waits for the sandbox iframe body
 * so the sheet portals inside the frame, not the docs document.
 */
const MotionDemoEvocativeDialog: React.FC<MotionDemoEvocativeDialogProps> = ({
  open,
  onOpenChange,
}) => {
  const { document: frameDoc } = useViraSandboxDocument();

  if (!frameDoc?.body) {
    return null;
  }

  return (
    <div className={styles.Stage}>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <Dialog.Trigger render={<Button>Open dialog</Button>} />
        <Dialog.Sheet
          key="sandbox-sheet"
          container={frameDoc.body}
          title="You're all set"
          description="A short celebratory moment — noticed on purpose."
          showHandle={false}
          headerAlign="center"
          maxHeight="85%"
        >
          <Stack direction="row" hPadding="l" columnGap="s" rowGap="s" hAlign="center">
            <Dialog.Close render={<Button variant="primary">Confirm</Button>} />
            <Dialog.Close render={<Button variant="secondary">Close</Button>} />
          </Stack>
        </Dialog.Sheet>
      </Dialog>
    </div>
  );
};

export type { MotionDemoEvocativeDialogProps };
export { MotionDemoEvocativeDialog };
