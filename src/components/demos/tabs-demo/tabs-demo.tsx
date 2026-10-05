"use client";

import * as React from "react";
import { GearSix, Target } from "@phosphor-icons/react";
import {
  Button,
  Chip,
  Stack,
  Surface,
  Tabs,
  Text,
  Title,
} from "@viraui/react";
import { ViraSandbox } from "../../common/vira-sandbox";

type SandboxShellProps = {
  children: React.ReactNode;
  label: string;
  height?: number;
};

const SandboxShell: React.FC<SandboxShellProps> = ({
  children,
  label,
  height = 280,
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

const PanelFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Stack fullWidth maxWidth="24rem" minWidth="16rem">
    {children}
  </Stack>
);

const PanelCopy: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => (
  <Stack hAlign="center" rowGap="xs">
    <Title align="center" render={<h3 />} size="3">
      {title}
    </Title>
    <Text align="center" tone="muted">
      {description}
    </Text>
  </Stack>
);

const PanelBody: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Stack hAlign="center" rowGap="m" vPadding="m">
    {children}
  </Stack>
);

const SCROLLABLE_TABS = [
  { label: "Overview", panel: "Workspace summary.", value: "overview" },
  { label: "Analytics", panel: "Adoption trends.", value: "analytics" },
  { label: "Reports", panel: "Saved report views.", value: "reports" },
  { label: "Team members", panel: "Roles and invites.", value: "team" },
  { label: "Billing", panel: "Plans and invoices.", value: "billing" },
  { label: "Security", panel: "SSO and audit logs.", value: "security" },
  { label: "Notifications", panel: "Email and digests.", value: "notifications" },
  { label: "API keys", panel: "Tokens and scopes.", value: "api-keys" },
  { label: "Webhooks", panel: "Delivery endpoints.", value: "webhooks" },
  { label: "Integrations hub", panel: "Connected apps.", value: "integrations" },
] as const;

/** Default in-page tabbed panels — centered list + paired panels. */
export const TabsPanelsDemo: React.FC = () => (
  <SandboxShell label="Settings tabs with paired panels">
    <PanelFrame>
      <Tabs defaultValue="general" listAlignment="center">
        <Tabs.List>
          <Tabs.Tab value="general">General</Tabs.Tab>
          <Tabs.Tab value="billing">Billing</Tabs.Tab>
          <Tabs.Tab value="goals">Goals</Tabs.Tab>
        </Tabs.List>
        <Tabs.Viewport>
          <Tabs.Panel value="general">
            <PanelBody>
              <PanelCopy
                description="Workspace profile and digest preferences."
                title="General"
              />
            </PanelBody>
          </Tabs.Panel>
          <Tabs.Panel value="billing">
            <PanelBody>
              <PanelCopy
                description="Plan summary and payment methods."
                title="Billing"
              />
            </PanelBody>
          </Tabs.Panel>
          <Tabs.Panel value="goals">
            <PanelBody>
              <PanelCopy
                description="Quarterly adoption targets."
                title="Goals"
              />
            </PanelBody>
          </Tabs.Panel>
        </Tabs.Viewport>
      </Tabs>
    </PanelFrame>
  </SandboxShell>
);

/** Decorative start/end addons on tab labels. */
export const TabsAddonsDemo: React.FC = () => (
  <SandboxShell label="Tabs with icon and Chip addons">
    <PanelFrame>
      <Tabs defaultValue="general" listAlignment="center">
        <Tabs.List>
          <Tabs.Tab addon={<GearSix />} value="general">
            General
          </Tabs.Tab>
          <Tabs.Tab
            addon={<Chip variant="green">New</Chip>}
            addonPosition="end"
            value="billing"
          >
            Billing
          </Tabs.Tab>
          <Tabs.Tab addon={<Target />} value="goals">
            Goals
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Viewport>
          <Tabs.Panel value="general">
            <PanelBody>
              <PanelCopy
                description="Icons and chips stay decorative beside the label."
                title="General"
              />
            </PanelBody>
          </Tabs.Panel>
          <Tabs.Panel value="billing">
            <PanelBody>
              <PanelCopy
                description="Trailing Chip marks a new billing surface."
                title="Billing"
              />
            </PanelBody>
          </Tabs.Panel>
          <Tabs.Panel value="goals">
            <PanelBody>
              <PanelCopy
                description="Leading icon for the goals view."
                title="Goals"
              />
            </PanelBody>
          </Tabs.Panel>
        </Tabs.Viewport>
      </Tabs>
    </PanelFrame>
  </SandboxShell>
);

/** Stretch list fills the tab chrome width. */
export const TabsStretchDemo: React.FC = () => (
  <SandboxShell label="Stretch-aligned clone source tabs">
    <PanelFrame>
      <Surface
        border="all"
        color={1}
        hPadding="m"
        overflow="hidden"
        radius="m"
        vPadding="m"
      >
        <Tabs defaultValue="local" listAlignment="stretch">
          <Tabs.List>
            <Tabs.Tab value="codespaces">Codespaces</Tabs.Tab>
            <Tabs.Tab value="local">Local</Tabs.Tab>
          </Tabs.List>
          <Tabs.Viewport>
            <Tabs.Panel value="codespaces">
              <PanelBody>
                <PanelCopy
                  description="Create a cloud workspace from this repository."
                  title="Codespaces"
                />
              </PanelBody>
            </Tabs.Panel>
            <Tabs.Panel value="local">
              <PanelBody>
                <PanelCopy
                  description="Clone with the repository web URL."
                  title="Local"
                />
              </PanelBody>
            </Tabs.Panel>
          </Tabs.Viewport>
        </Tabs>
      </Surface>
    </PanelFrame>
  </SandboxShell>
);

/** Long label sets scroll horizontally inside the list. */
export const TabsScrollableDemo: React.FC = () => (
  <SandboxShell height={240} label="Scrollable tab list overflow">
    <Stack fullWidth maxWidth="20rem" minWidth="16rem">
      <Tabs defaultValue="overview" listAlignment="center">
        <Tabs.List>
          {SCROLLABLE_TABS.map((item) => (
            <Tabs.Tab key={item.value} value={item.value}>
              {item.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>
        <Tabs.Viewport>
          {SCROLLABLE_TABS.map((item) => (
            <Tabs.Panel key={item.value} value={item.value}>
              <PanelBody>
                <Text align="center">{item.panel}</Text>
              </PanelBody>
            </Tabs.Panel>
          ))}
        </Tabs.Viewport>
      </Tabs>
    </Stack>
  </SandboxShell>
);

/** Controlled selection — profile panel jumps to peer billing tab. */
export const TabsProgrammaticDemo: React.FC = () => {
  const [tab, setTab] = React.useState("profile");

  return (
    <SandboxShell label="Programmatic jump from profile to billing">
      <PanelFrame>
        <Tabs
          listAlignment="center"
          onValueChange={(next) => {
            setTab(String(next));
          }}
          value={tab}
        >
          <Tabs.List>
            <Tabs.Tab value="profile">Profile</Tabs.Tab>
            <Tabs.Tab value="billing">Billing</Tabs.Tab>
            <Tabs.Tab value="security">Security</Tabs.Tab>
          </Tabs.List>
          <Tabs.Viewport>
            <Tabs.Panel value="profile">
              <PanelBody>
                <PanelCopy
                  description="Name, email, and avatar for this account."
                  title="Profile"
                />
                <Button
                  onClick={() => {
                    setTab("billing");
                  }}
                  type="button"
                  variant="secondary"
                >
                  View billing plan
                </Button>
              </PanelBody>
            </Tabs.Panel>
            <Tabs.Panel value="billing">
              <PanelBody>
                <PanelCopy
                  description="Plan, seats, and invoices for this workspace."
                  title="Billing"
                />
                <Button
                  onClick={() => {
                    setTab("profile");
                  }}
                  type="button"
                  variant="secondary"
                >
                  Open profile
                </Button>
              </PanelBody>
            </Tabs.Panel>
            <Tabs.Panel value="security">
              <PanelBody>
                <PanelCopy
                  description="Password, SSO, and active sessions."
                  title="Security"
                />
              </PanelBody>
            </Tabs.Panel>
          </Tabs.Viewport>
        </Tabs>
      </PanelFrame>
    </SandboxShell>
  );
};
