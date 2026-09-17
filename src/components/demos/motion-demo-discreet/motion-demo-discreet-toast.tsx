"use client";

import * as React from "react";
import { Surface, Toast } from "@viraui/react";
import {
  useViraSandboxCss,
  useViraSandboxDocument,
} from "../../common/vira-sandbox";
import css from "./motion-demo-discreet.module.css?inline";
import styles from "./motion-demo-discreet.module.css";

type MotionDemoDiscreetToastProps = {
  /**
   * Toast manager used for the autoplay loop.
   */
  toastManager: ReturnType<typeof Toast.createToastManager>;
};

const ToastRegion: React.FC = () => {
  const { document: frameDoc } = useViraSandboxDocument();
  const { toasts } = Toast.useToastManager();

  if (!frameDoc?.body) {
    return null;
  }

  return (
    <Toast.Portal container={frameDoc.body}>
      <Toast.Viewport position="bottom-right">
        {toasts.map((toast) => (
          <Toast.Banner
            key={toast.id}
            description={
              typeof toast.description === "string"
                ? toast.description
                : undefined
            }
            dismissable={false}
            title={typeof toast.title === "string" ? toast.title : undefined}
            toast={toast}
          />
        ))}
      </Toast.Viewport>
    </Toast.Portal>
  );
};

/**
 * Low-fi app shell + toast region inside the sandbox iframe.
 * Portal mounts on the iframe body so Viewport fixed positioning stays in-frame.
 */
const MotionDemoDiscreetToast: React.FC<MotionDemoDiscreetToastProps> = ({
  toastManager,
}) => {
  useViraSandboxCss(css);

  return (
    <Toast.Provider toastManager={toastManager}>
      <div className={styles.Fill}>
        <Surface border="all" className={styles.Shell} color={2}>
          <aside className={styles.Sidebar} aria-hidden="true">
            <div className={styles.Rail} />
            <div className={styles.Rail} />
            <div className={styles.Rail} />
            <div className={styles.Rail} />
            <div className={styles.Rail} />
          </aside>
          <div className={styles.Main} aria-hidden="true">
            <div className={styles.Chrome} />
            <div className={styles.Card}>
              <div className={styles.Line} />
              <div className={styles.Line} />
              <div className={styles.Line} />
              <div className={styles.Line} />
              <div className={styles.Row}>
                <div className={styles.Tile} />
                <div className={styles.Tile} />
                <div className={styles.Tile} />
              </div>
            </div>
          </div>
        </Surface>
      </div>
      <ToastRegion />
    </Toast.Provider>
  );
};

export type { MotionDemoDiscreetToastProps };
export { MotionDemoDiscreetToast };
