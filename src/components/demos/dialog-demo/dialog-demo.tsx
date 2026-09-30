"use client";

import * as React from "react";
import { Trash } from "@phosphor-icons/react";
import { Button, Dialog, Stack, Text, type DialogSnapPoint } from "@viraui/react";
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
  height = 400,
}) => (
  <ViraSandbox height={height} label={label} vAlign="center">
    {children}
  </ViraSandbox>
);

type SheetHostProps = {
  children: (container: HTMLElement) => React.ReactNode;
};

/** Wait for iframe body so the sheet portals inside the sandbox, not the docs document. */
const SheetHost: React.FC<SheetHostProps> = ({ children }) => {
  const { document: frameDoc } = useViraSandboxDocument();

  if (!frameDoc?.body) {
    return null;
  }

  return children(frameDoc.body);
};

/** Trigger + titled sheet + footer Cancel / Confirm delete. */
export const DialogConfirmDemo: React.FC = () => (
  <SandboxShell label="Delete confirmation Dialog sheet">
    <SheetHost>
      {(container) => (
        <Dialog>
          <Dialog.Trigger
            render={
              <Button addon={<Trash />} variant="destructive">
                Delete project
              </Button>
            }
          />
          <Dialog.Sheet
            container={container}
            description="This removes the project and its settings. You cannot undo this."
            headerAlign="center"
            title="Delete project?"
          >
            <Stack
              columnGap="s"
              direction="row"
              hPadding="m"
              hAlign="center"
              rowGap="s"
              vPadding={["s", 0]}
            >
              <Dialog.Close render={<Button variant="secondary">Cancel</Button>} />
              <Dialog.Close
                render={<Button variant="destructive">Confirm delete</Button>}
              />
            </Stack>
          </Dialog.Sheet>
        </Dialog>
      )}
    </SheetHost>
  </SandboxShell>
);

/** Sheet with the chrome close button and no footer actions. */
export const DialogCloseButtonDemo: React.FC = () => (
  <SandboxShell label="Dialog sheet with chrome close button">
    <SheetHost>
      {(container) => (
        <Dialog>
          <Dialog.Trigger render={<Button variant="secondary">Notifications</Button>} />
          <Dialog.Sheet
            container={container}
            description="You are all caught up."
            headerAlign="center"
            showCloseButton
            title="Notifications"
          />
        </Dialog>
      )}
    </SheetHost>
  </SandboxShell>
);

/** Nested Dialog inside Sheet for drill-down; Escape closes the top layer only. */
export const DialogNestedDemo: React.FC = () => (
  <SandboxShell height={440} label="Nested Dialog sheets for drill-down">
    <SheetHost>
      {(container) => (
        <Dialog>
          <Dialog.Trigger render={<Button>Account</Button>} />
          <Dialog.Sheet
            container={container}
            description="Manage your account details."
            headerAlign="center"
            title="Account"
          >
            <Stack expandChildren hPadding="l" rowGap="m" vPadding={["m", 0]}>
              <Text render={<p />} tone="muted">
                Signed in as you@example.com.
              </Text>
              <Dialog>
                <Dialog.Trigger
                  render={<Button>Security settings</Button>}
                />
                <Dialog.Sheet
                  container={container}
                  description="Review your security options."
                  headerAlign="center"
                  title="Security"
                >
                  <Stack expandChildren hPadding="l" rowGap="s" vPadding={["s", 0]}>
                    <Text render={<p />} tone="muted">
                      Two-factor authentication is enabled.
                    </Text>
                    <Dialog.Close
                      render={<Button variant="secondary">Close security</Button>}
                    />
                  </Stack>
                </Dialog.Sheet>
              </Dialog>
              <Dialog.Close render={<Button variant="flat">Close account</Button>} />
            </Stack>
          </Dialog.Sheet>
        </Dialog>
      )}
    </SheetHost>
  </SandboxShell>
);

const SNAP_PREVIEW: DialogSnapPoint = 0.5;
const SNAP_FULL: DialogSnapPoint = 1;

/** Two snaps: preview shows excerpt + Read more; full hides Read more. */
export const DialogSnapPointsDemo: React.FC = () => {
  const [snapPoint, setSnapPoint] = React.useState<DialogSnapPoint>(SNAP_PREVIEW);
  const atPreview = Object.is(snapPoint, SNAP_PREVIEW);

  return (
    <SandboxShell height={440} label="Dialog sheet with snap points">
      <SheetHost>
        {(container) => (
          <Dialog
            onOpenChange={(open) => {
              if (!open) {
                setSnapPoint(SNAP_PREVIEW);
              }
            }}
            onSnapPointChange={(next) => {
              if (next == null) {
                return;
              }
              setSnapPoint(next);
            }}
            snapPoint={snapPoint}
            snapPoints={[SNAP_PREVIEW, SNAP_FULL]}
          >
            <Dialog.Trigger render={<Button>Terms</Button>} />
            <Dialog.Sheet
              container={container}
              description="Preview the terms, then expand to read the full agreement."
              title="Terms and conditions"
            >
              <Stack expandChildren hPadding="m" rowGap="m" vPadding={["s", "3xl"]}>
                <Text render={<p />}>
                  These terms cover how the product stores project data, who can
                  invite collaborators, and when invoices renew.
                </Text>
                {atPreview ? (
                  <Button
                    onClick={() => setSnapPoint(SNAP_FULL)}
                    variant="secondary"
                  >
                    Read more
                  </Button>
                ) : (
                  <>
                    <Text render={<p />} tone="muted">
                      Collaborators inherit the project role you assign. Billing
                      renews on the anniversary of the workspace plan unless you
                      cancel before the renewal date. Scroll stays inside the sheet
                      while you read.
                    </Text>
                    <Dialog.Close render={<Button>I agree</Button>} />
                  </>
                )}
              </Stack>
            </Dialog.Sheet>
          </Dialog>
        )}
      </SheetHost>
    </SandboxShell>
  );
};
