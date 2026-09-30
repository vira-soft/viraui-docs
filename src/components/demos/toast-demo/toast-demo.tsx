"use client";

import * as React from "react";
import { Button, Stack, Toast } from "@viraui/react";
import {
  useViraSandboxDocument,
  ViraSandbox,
} from "../../common/vira-sandbox";

type SandboxShellProps = {
  children: React.ReactNode;
  label: string;
  height?: number;
};

const SandboxShell: React.FC<SandboxShellProps> = ({
  children,
  label,
  height = 320,
}) => (
  <ViraSandbox height={height} label={label} vAlign="center">
    {children}
  </ViraSandbox>
);

type ToastRegionProps = {
  children: (args: {
    close: ReturnType<typeof Toast.useToastManager>["close"];
    container: HTMLElement;
    toasts: ReturnType<typeof Toast.useToastManager>["toasts"];
  }) => React.ReactNode;
};

/** Wait for iframe body so Portal mounts inside the sandbox, not the docs document. */
const ToastRegion: React.FC<ToastRegionProps> = ({ children }) => {
  const { document: frameDoc } = useViraSandboxDocument();
  const { close, toasts } = Toast.useToastManager();

  if (!frameDoc?.body) {
    return null;
  }

  return children({ close, container: frameDoc.body, toasts });
};

const stackedToastManager = Toast.createToastManager();

const stackedSamples = [
  { title: "File saved", description: "Your changes are on the server." },
  { title: "Item deleted", description: "You can undo this action." },
  { title: "Link copied", description: "Paste it anywhere you need it." },
] as const;

/** Stacked save/delete feedback with clear-all. */
export const ToastStackedDemo: React.FC = () => {
  const sampleIndexRef = React.useRef(0);

  return (
    <SandboxShell label="Stacked Toast banners">
      <Toast.Provider toastManager={stackedToastManager}>
        <Stack columnGap="s" direction="row">
          <Button
            onClick={() => {
              const sample =
                stackedSamples[sampleIndexRef.current % stackedSamples.length]!;
              sampleIndexRef.current += 1;
              stackedToastManager.add({
                description: sample.description,
                title: sample.title,
              });
            }}
          >
            Show toast
          </Button>
          <Button
            onClick={() => {
              stackedToastManager.close();
              sampleIndexRef.current = 0;
            }}
            variant="secondary"
          >
            Clear all
          </Button>
        </Stack>
        <ToastRegion>
          {({ container, toasts }) => (
            <Toast.Portal container={container}>
              <Toast.Viewport>
                {toasts.map((toast) => (
                  <Toast.Banner
                    key={toast.id}
                    description={toast.description}
                    toast={toast}
                  />
                ))}
              </Toast.Viewport>
            </Toast.Portal>
          )}
        </ToastRegion>
      </Toast.Provider>
    </SandboxShell>
  );
};

const undoToastManager = Toast.createToastManager();

/** Delete feedback with Undo Toast.Action. */
export const ToastUndoDemo: React.FC = () => (
  <SandboxShell label="Toast with Undo action">
    <Toast.Provider toastManager={undoToastManager}>
      <Button
        onClick={() => {
          undoToastManager.close();
          undoToastManager.add({
            description: "You can undo this action.",
            title: "Item deleted",
          });
        }}
        variant="destructive"
      >
        Delete item
      </Button>
      <ToastRegion>
        {({ close, container, toasts }) => (
          <Toast.Portal container={container}>
            <Toast.Viewport>
              {toasts.map((toast) => (
                <Toast.Banner
                  key={toast.id}
                  description={toast.description}
                  toast={toast}
                >
                  <Toast.Action
                    onClick={() => {
                      close(toast.id);
                    }}
                    render={<Button variant="destructive" />}
                  >
                    Undo
                  </Toast.Action>
                </Toast.Banner>
              ))}
            </Toast.Viewport>
          </Toast.Portal>
        )}
      </ToastRegion>
    </Toast.Provider>
  </SandboxShell>
);

const anchoredToastManager = Toast.createToastManager();

/** Short confirmation anchored to the trigger control. */
export const ToastAnchoredDemo: React.FC = () => {
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  return (
    <SandboxShell label="Anchored Toast near trigger">
      <Toast.Provider toastManager={anchoredToastManager}>
        <Button
          ref={triggerRef}
          onClick={() => {
            anchoredToastManager.close();
            anchoredToastManager.add({
              description: "Copied to clipboard.",
              positionerProps: {
                anchor: triggerRef.current,
                sideOffset: 8,
              },
              timeout: 1500,
            });
          }}
        >
          Copy
        </Button>
        <ToastRegion>
          {({ container, toasts }) => (
            <Toast.Portal container={container}>
              <Toast.Viewport position="anchored">
                {toasts.map((toast) => {
                  if (!toast.positionerProps?.anchor) {
                    return null;
                  }

                  return (
                    <Toast.Positioner key={toast.id} toast={toast}>
                      <Toast.Banner
                        description={toast.description}
                        dismissable={false}
                        toast={toast}
                      />
                    </Toast.Positioner>
                  );
                })}
              </Toast.Viewport>
            </Toast.Portal>
          )}
        </ToastRegion>
      </Toast.Provider>
    </SandboxShell>
  );
};
