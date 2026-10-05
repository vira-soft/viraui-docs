"use client";

import * as React from "react";
import {
  CreditCard,
  GearSix,
  Target,
} from "@phosphor-icons/react";
import {
  Button,
  Chip,
  LinearProgress,
  Stack,
  Surface,
  Switch,
  Tabs,
  Text,
  Textfield,
  Title,
} from "@viraui/react";
import { ViraSandbox } from "../../common/vira-sandbox";

type SandboxShellProps = {
  children: React.ReactNode;
  label: string;
  height?: number;
  vAlign?: "start" | "center";
};

const SandboxShell: React.FC<SandboxShellProps> = ({
  children,
  label,
  height = 420,
  vAlign = "start",
}) => (
  <ViraSandbox
    dialogShell={false}
    height={height}
    label={label}
    vAlign={vAlign}
  >
    {children}
  </ViraSandbox>
);

const PanelFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Stack fullWidth maxWidth="28rem" minWidth="16rem" rowGap="m">
    {children}
  </Stack>
);

const SCROLLABLE_TABS = [
  { label: "Overview", panel: "Workspace summary and quick actions.", value: "overview" },
  { label: "Analytics", panel: "Traffic, adoption, and engagement trends.", value: "analytics" },
  { label: "Reports", panel: "Scheduled exports and saved report views.", value: "reports" },
  { label: "Team members", panel: "Roles, invites, and seat usage.", value: "team" },
  { label: "Billing", panel: "Plans, invoices, and payment methods.", value: "billing" },
  { label: "Security", panel: "SSO, audit logs, and access policies.", value: "security" },
  { label: "Notifications", panel: "Email, in-app, and digest preferences.", value: "notifications" },
  { label: "API keys", panel: "Tokens, scopes, and rotation history.", value: "api-keys" },
  { label: "Webhooks", panel: "Delivery logs and endpoint configuration.", value: "webhooks" },
  { label: "Integrations hub", panel: "Connected apps and sync status.", value: "integrations" },
] as const;

/** Default in-page tabbed panels — List / Viewport / Panel pairing. */
export const TabsPanelsDemo: React.FC = () => (
  <SandboxShell label="Settings tabs with paired panels">
    <PanelFrame>
      <Tabs defaultValue="general">
        <Tabs.List>
          <Tabs.Tab value="general">General</Tabs.Tab>
          <Tabs.Tab value="billing">Billing</Tabs.Tab>
          <Tabs.Tab value="goals">Goals</Tabs.Tab>
        </Tabs.List>
        <Tabs.Viewport>
          <Tabs.Panel value="general">
            <Stack rowGap="m" vPadding="m">
              <Stack rowGap="xs">
                <Title render={<h3 />} size="3">
                  Profile & workspace
                </Title>
                <Text tone="muted">
                  Manage how your team appears across projects.
                </Text>
              </Stack>
              <Textfield
                defaultValue="Northwind Labs"
                label="Workspace name"
              />
              <Switch
                defaultChecked
                description="Weekly summary of workspace activity."
                label="Email digests"
              />
            </Stack>
          </Tabs.Panel>
          <Tabs.Panel value="billing">
            <Stack rowGap="m" vPadding="m">
              <Stack rowGap="xs">
                <Title render={<h3 />} size="3">
                  Plan & billing
                </Title>
                <Text tone="muted">Pro renews on April 12, 2026.</Text>
              </Stack>
              <Surface
                border="all"
                color={1}
                hPadding="m"
                radius="m"
                vPadding="m"
              >
                <Stack
                  direction="row"
                  hAlign="space-between"
                  vAlign="center"
                >
                  <Stack rowGap="2xs">
                    <Text weight="semibold">Pro plan</Text>
                    <Text size="s" tone="muted">
                      12 seats · billed monthly
                    </Text>
                  </Stack>
                  <Chip variant="secondary">$29 / seat</Chip>
                </Stack>
              </Surface>
            </Stack>
          </Tabs.Panel>
          <Tabs.Panel value="goals">
            <Stack rowGap="m" vPadding="m">
              <Stack rowGap="xs">
                <Title render={<h3 />} size="3">
                  Quarterly goals
                </Title>
                <Text tone="muted">
                  Track adoption targets for the design system rollout.
                </Text>
              </Stack>
              <LinearProgress
                label="Component coverage"
                renderValue
                value={74}
              />
              <LinearProgress
                label="Storybook adoption"
                renderValue
                value={52}
              />
            </Stack>
          </Tabs.Panel>
        </Tabs.Viewport>
      </Tabs>
    </PanelFrame>
  </SandboxShell>
);

/** Decorative start/end addons on tab labels. */
export const TabsAddonsDemo: React.FC = () => (
  <SandboxShell height={280} label="Tabs with icon and Chip addons">
    <PanelFrame>
      <Tabs defaultValue="general">
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
            <Stack rowGap="xs" vPadding="m">
              <Title render={<h3 />} size="3">
                General
              </Title>
              <Text tone="muted">Workspace profile and digest preferences.</Text>
            </Stack>
          </Tabs.Panel>
          <Tabs.Panel value="billing">
            <Stack rowGap="xs" vPadding="m">
              <Title render={<h3 />} size="3">
                Billing
              </Title>
              <Text tone="muted">Plan summary and payment methods.</Text>
            </Stack>
          </Tabs.Panel>
          <Tabs.Panel value="goals">
            <Stack rowGap="xs" vPadding="m">
              <Title render={<h3 />} size="3">
                Goals
              </Title>
              <Text tone="muted">Quarterly adoption targets.</Text>
            </Stack>
          </Tabs.Panel>
        </Tabs.Viewport>
      </Tabs>
    </PanelFrame>
  </SandboxShell>
);

/** Stretch list fills the tab chrome width. */
export const TabsStretchDemo: React.FC = () => (
  <SandboxShell height={320} label="Stretch-aligned clone source tabs">
    <PanelFrame>
      <Surface border="all" color={1} overflow="hidden" radius="xl">
        <Tabs defaultValue="local" listAlignment="stretch">
          <Tabs.List>
            <Tabs.Tab value="codespaces">Codespaces</Tabs.Tab>
            <Tabs.Tab value="local">Local</Tabs.Tab>
          </Tabs.List>
          <Tabs.Viewport>
            <Tabs.Panel value="codespaces">
              <Stack vPadding="m">
                <Surface
                  border="all"
                  color={2}
                  hPadding="m"
                  radius="l"
                  vPadding="l"
                >
                  <Text tone="muted">
                    Create a cloud workspace from this repository.
                  </Text>
                </Surface>
              </Stack>
            </Tabs.Panel>
            <Tabs.Panel value="local">
              <Stack rowGap="m" vPadding={["m", 0]}>
                <Textfield
                  aria-label="Repository clone URL"
                  readOnly
                  value="https://github.com/vira-soft/vira-ui.git"
                />
                <Text size="s" tone="muted">
                  Clone using the web URL.
                </Text>
              </Stack>
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
      <Tabs defaultValue="overview">
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
              <Text vPadding="m">{item.panel}</Text>
            </Tabs.Panel>
          ))}
        </Tabs.Viewport>
      </Tabs>
    </Stack>
  </SandboxShell>
);

/** Controlled selection — panel action jumps to another tab. */
export const TabsProgrammaticDemo: React.FC = () => {
  const [tab, setTab] = React.useState("details");

  return (
    <SandboxShell height={360} label="Programmatic tab change from panel action">
      <PanelFrame>
        <Tabs
          onValueChange={(next) => {
            setTab(String(next));
          }}
          value={tab}
        >
          <Tabs.List>
            <Tabs.Tab value="details">Details</Tabs.Tab>
            <Tabs.Tab value="billing">Billing</Tabs.Tab>
            <Tabs.Tab value="review">Review</Tabs.Tab>
          </Tabs.List>
          <Tabs.Viewport>
            <Tabs.Panel value="details">
              <Stack rowGap="m" vPadding="m">
                <Stack rowGap="xs">
                  <Title render={<h3 />} size="3">
                    Project details
                  </Title>
                  <Text tone="muted">
                    Confirm the workspace name, then continue to billing.
                  </Text>
                </Stack>
                <Textfield
                  defaultValue="Northwind Labs"
                  label="Workspace name"
                />
                <Stack direction="row" hAlign="end">
                  <Button
                    addon={<CreditCard />}
                    onClick={() => {
                      setTab("billing");
                    }}
                    type="button"
                  >
                    Continue to billing
                  </Button>
                </Stack>
              </Stack>
            </Tabs.Panel>
            <Tabs.Panel value="billing">
              <Stack rowGap="m" vPadding="m">
                <Stack rowGap="xs">
                  <Title render={<h3 />} size="3">
                    Billing
                  </Title>
                  <Text tone="muted">
                    Choose a seat plan before the final review.
                  </Text>
                </Stack>
                <Surface
                  border="all"
                  color={1}
                  hPadding="m"
                  radius="m"
                  vPadding="m"
                >
                  <Stack
                    direction="row"
                    hAlign="space-between"
                    vAlign="center"
                  >
                    <Text weight="semibold">Pro plan</Text>
                    <Chip variant="secondary">$29 / seat</Chip>
                  </Stack>
                </Surface>
                <Stack direction="row" hAlign="end">
                  <Button
                    onClick={() => {
                      setTab("review");
                    }}
                    type="button"
                  >
                    Continue to review
                  </Button>
                </Stack>
              </Stack>
            </Tabs.Panel>
            <Tabs.Panel value="review">
              <Stack rowGap="m" vPadding="m">
                <Stack rowGap="xs">
                  <Title render={<h3 />} size="3">
                    Review
                  </Title>
                  <Text tone="muted">
                    Everything looks ready. Jump back if you need edits.
                  </Text>
                </Stack>
                <Button
                  onClick={() => {
                    setTab("details");
                  }}
                  type="button"
                  variant="secondary"
                >
                  Back to details
                </Button>
              </Stack>
            </Tabs.Panel>
          </Tabs.Viewport>
        </Tabs>
      </PanelFrame>
    </SandboxShell>
  );
};
