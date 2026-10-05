"use client";

import * as React from "react";
import {
  FloppyDisk,
  MagnifyingGlass,
  TextAlignLeft,
  TextB,
  TextItalic,
} from "@phosphor-icons/react";
import {
  Button,
  IconButton,
  Separator,
  Stack,
  Surface,
  Text,
  Tooltip,
} from "@viraui/react";
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
  height = 240,
}) => (
  <ViraSandbox
    dialogShell={false}
    height={height}
    label={label}
    vAlign="center"
  >
    {children}
  </ViraSandbox>
);

type PortalHostProps = {
  children: (container: HTMLElement) => React.ReactNode;
};

/** Wait for iframe body so the tooltip portals inside the sandbox. */
const PortalHost: React.FC<PortalHostProps> = ({ children }) => {
  const { document: frameDoc } = useViraSandboxDocument();

  if (!frameDoc?.body) {
    return null;
  }

  return children(frameDoc.body);
};

type ToolbarAction = {
  icon: React.ReactNode;
  label: string;
};

const formatActions = [
  { icon: <TextB />, label: "Bold" },
  { icon: <TextItalic />, label: "Italic" },
  { icon: <TextAlignLeft />, label: "Align left" },
] as const satisfies readonly ToolbarAction[];

const utilityActions = [
  { icon: <MagnifyingGlass />, label: "Find in document" },
  { icon: <FloppyDisk />, label: "Save draft" },
] as const satisfies readonly ToolbarAction[];

/** Matching label hint — Provider lives in this demo only. */
export const TooltipLabelDemo: React.FC = () => (
  <SandboxShell label="Button tooltip with matching label">
    <PortalHost>
      {(container) => (
        <Tooltip.Provider closeDelay={0} delay={0}>
          <Tooltip>
            <Tooltip.Trigger render={<Button>Bold</Button>} />
            <Tooltip.Content container={container}>
              <Text>Bold</Text>
            </Tooltip.Content>
          </Tooltip>
        </Tooltip.Provider>
      )}
    </PortalHost>
  </SandboxShell>
);

type ToolbarTooltipProps = {
  action: ToolbarAction;
  container: HTMLElement;
};

const ToolbarTooltip: React.FC<ToolbarTooltipProps> = ({
  action,
  container,
}) => (
  <Tooltip>
    <Tooltip.Trigger
      render={
        <IconButton
          aria-label={action.label}
          icon={action.icon}
          size="s"
          variant="flat"
        />
      }
    />
    <Tooltip.Content container={container}>
      <Text size="s">{action.label}</Text>
    </Tooltip.Content>
  </Tooltip>
);

/** Icon-only toolbar — same chrome as Separator vertical toolbar demo. */
export const TooltipToolbarDemo: React.FC = () => (
  <SandboxShell height={160} label="Icon-only toolbar tooltips">
    <PortalHost>
      {(container) => (
        <Tooltip.Provider closeDelay={0} delay={0}>
          <Surface
            border="all"
            color={1}
            hPadding="2xs"
            radius="m"
            vPadding="2xs"
          >
            <Stack columnGap="2xs" direction="row" vAlign="stretch">
              {formatActions.map((action) => (
                <ToolbarTooltip
                  key={action.label}
                  action={action}
                  container={container}
                />
              ))}
              <Separator orientation="vertical" />
              {utilityActions.map((action) => (
                <ToolbarTooltip
                  key={action.label}
                  action={action}
                  container={container}
                />
              ))}
            </Stack>
          </Surface>
        </Tooltip.Provider>
      )}
    </PortalHost>
  </SandboxShell>
);
