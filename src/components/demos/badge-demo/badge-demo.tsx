"use client";

import * as React from "react";
import { Bell } from "@phosphor-icons/react";
import { Avatar, Badge, IconButton, Stack, Switch } from "@viraui/react";
import { ViraSandbox } from "../../common/vira-sandbox";

type SandboxShellProps = {
  children: React.ReactNode;
  label: string;
  height?: number;
};

const SandboxShell: React.FC<SandboxShellProps> = ({
  children,
  label,
  height = 220,
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

/** Presence on an Avatar — Switch toggles decorative `show`. */
export const BadgePresenceDemo: React.FC = () => {
  const [online, setOnline] = React.useState(true);

  const handleOnlineChange = (next: boolean) => {
    setOnline(next);
  };

  return (
    <SandboxShell height={240} label="Online badge on avatar with toggle">
      <Stack columnGap="l" direction="row" vAlign="center">
        <Badge color="green" show={online}>
          <Avatar
            alt="Lara Thompson"
            fallback="LT"
            size="m"
            src="https://mockmind-api.uifaces.co/content/human/80.jpg"
          />
        </Badge>
        <Switch
          checked={online}
          label="Online"
          onCheckedChange={handleOnlineChange}
        />
      </Stack>
    </SandboxShell>
  );
};

/** Unread dot on IconButton — name lives on the button, not the badge. */
export const BadgeUnreadDemo: React.FC = () => (
  <SandboxShell height={180} label="Unread badge on notifications IconButton">
    <Badge show>
      <IconButton aria-label="Notifications" icon={<Bell />} />
    </Badge>
  </SandboxShell>
);
