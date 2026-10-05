"use client";

import * as React from "react";
import {
  Archive,
  CaretDown,
  Copy,
  CreditCard,
  DotsThreeVertical,
  Eye,
  LinkSimple,
  PencilSimple,
  SignOut,
  Trash,
  User,
} from "@phosphor-icons/react";
import {
  Avatar,
  Button,
  IconButton,
  Menu,
  Stack,
  Surface,
  Text,
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
  height = 420,
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

/** Wait for iframe body so the menu portals inside the sandbox. */
const PortalHost: React.FC<PortalHostProps> = ({ children }) => {
  const { document: frameDoc } = useViraSandboxDocument();

  if (!frameDoc?.body) {
    return null;
  }

  return children(frameDoc.body);
};

const account = {
  name: "Maya Chen",
  email: "maya@ledger.io",
  fallback: "MC",
  src: "https://mockmind-api.uifaces.co/content/human/80.jpg",
} as const;

type ProfileSummaryProps = {
  compact?: boolean;
};

const ProfileSummary: React.FC<ProfileSummaryProps> = ({ compact = false }) => (
  <Stack columnGap="s" direction="row" vAlign="center">
    <Avatar
      alt={account.name}
      fallback={account.fallback}
      size={compact ? "s" : "m"}
      src={account.src}
    />
    <Stack rowGap="s">
      <Text weight="semibold">{account.name}</Text>
      <Text size="s" tone="muted">
        {account.email}
      </Text>
    </Stack>
  </Stack>
);

/** IconButton more-menu on a report row — rename through destructive delete. */
export const MenuMoreDemo: React.FC = () => (
  <SandboxShell height={420} label="Row more-menu with IconButton trigger">
    <PortalHost>
      {(container) => (
        <Stack
          style={{
            marginInline: "auto",
            maxInlineSize: "22rem",
            inlineSize: "100%",
          }}
        >
          <Surface border="all" color={2} hPadding="m" radius="m" vPadding="m">
            <Stack
              columnGap="m"
              direction="row"
              hAlign="space-between"
              vAlign="center"
            >
              <Stack rowGap="s">
                <Text weight="semibold">Q2 payout report</Text>
                <Text size="s" tone="muted">
                  PDF · Updated 2 hours ago
                </Text>
              </Stack>
              <Menu>
                <Menu.Trigger
                  render={
                    <IconButton
                      aria-label="More actions for Q2 payout report"
                      icon={<DotsThreeVertical />}
                      size="s"
                      variant="flat"
                    />
                  }
                />
                <Menu.Popup align="end" container={container} side="bottom">
                  <Menu.Item addon={<PencilSimple aria-hidden />}>
                    Rename
                  </Menu.Item>
                  <Menu.Item addon={<Copy aria-hidden />}>Duplicate</Menu.Item>
                  <Menu.Item addon={<Archive aria-hidden />}>Archive</Menu.Item>
                  <Menu.Separator />
                  <Menu.Item
                    addon={<Trash aria-hidden />}
                    sentiment="destructive"
                  >
                    Delete
                  </Menu.Item>
                </Menu.Popup>
              </Menu>
            </Stack>
          </Surface>
        </Stack>
      )}
    </PortalHost>
  </SandboxShell>
);

/** Account chip trigger (Surface) plus static profile header in the popup. */
export const MenuAccountDemo: React.FC = () => (
  <SandboxShell height={440} label="Account menu with Surface chip trigger">
    <PortalHost>
      {(container) => (
        <Stack hAlign="center" style={{ marginInline: "auto" }}>
          <Menu>
            <Menu.Trigger
              render={
                <Surface
                  border="all"
                  color={1}
                  hPadding="s"
                  radius="m"
                  render={<button type="button" />}
                  vPadding="s"
                />
              }
            >
              <Stack
                columnGap="m"
                direction="row"
                hAlign="space-between"
                style={{ inlineSize: "16rem" }}
                vAlign="center"
              >
                <ProfileSummary compact />
                <CaretDown aria-hidden size={16} />
              </Stack>
            </Menu.Trigger>
            <Menu.Popup align="start" container={container} side="bottom">
              <Menu.Item addon={<User aria-hidden />}>Account</Menu.Item>
              <Menu.Item addon={<CreditCard aria-hidden />}>Billing</Menu.Item>
              <Menu.Separator />
              <Menu.Item addon={<SignOut aria-hidden />} sentiment="destructive">
                Log out
              </Menu.Item>
            </Menu.Popup>
          </Menu>
        </Stack>
      )}
    </PortalHost>
  </SandboxShell>
);

/** Toolbar Actions menu — groups, checkboxes, radio sort, Share submenu. */
export const MenuActionsDemo: React.FC = () => {
  const [showTotals, setShowTotals] = React.useState(true);
  const [compactRows, setCompactRows] = React.useState(false);
  const [sortBy, setSortBy] = React.useState("date");

  return (
    <SandboxShell
      height={640}
      label="Advanced Actions menu with groups and submenu"
    >
      <PortalHost>
        {(container) => (
          <Stack
            style={{
              marginInline: "auto",
              maxInlineSize: "24rem",
              inlineSize: "100%",
            }}
          >
            <Surface border="all" color={2} hPadding="m" radius="m" vPadding="m">
              <Stack
                columnGap="l"
                direction="row"
                hAlign="space-between"
                vAlign="center"
              >
                <Stack rowGap="s">
                  <Text weight="semibold">Quarterly payout report</Text>
                  <Text size="s" tone="muted">
                    Updated 2 hours ago
                  </Text>
                </Stack>
                <Menu>
                  <Menu.Trigger
                    render={
                      <Button
                        addon={<CaretDown aria-hidden />}
                        size="s"
                        variant="secondary"
                      >
                        Actions
                      </Button>
                    }
                  />
                  <Menu.Popup align="end" container={container} side="bottom">
                    <Menu.Group label="Edit">
                      <Menu.Item addon={<PencilSimple aria-hidden />} note="⌘E">
                        Rename report
                      </Menu.Item>
                      <Menu.Item addon={<Copy aria-hidden />} note="⌘D">
                        Duplicate
                      </Menu.Item>
                      <Menu.Item addon={<Archive aria-hidden />}>
                        Archive
                      </Menu.Item>
                    </Menu.Group>
                    <Menu.Separator />
                    <Menu.Group label="View">
                      <Menu.CheckboxItem
                        addon={<Eye aria-hidden />}
                        checked={showTotals}
                        onCheckedChange={(checked) => {
                          setShowTotals(checked === true);
                        }}
                      >
                        Show totals row
                      </Menu.CheckboxItem>
                      <Menu.CheckboxItem
                        checked={compactRows}
                        onCheckedChange={(checked) => {
                          setCompactRows(checked === true);
                        }}
                      >
                        Compact table rows
                      </Menu.CheckboxItem>
                    </Menu.Group>
                    <Menu.Separator />
                    <Menu.RadioGroup
                      label="Sort by"
                      onValueChange={(value) => {
                        setSortBy(value ?? "date");
                      }}
                      value={sortBy}
                    >
                      <Menu.RadioItem value="date">Date</Menu.RadioItem>
                      <Menu.RadioItem value="amount">Amount</Menu.RadioItem>
                      <Menu.RadioItem value="recipient">Recipient</Menu.RadioItem>
                    </Menu.RadioGroup>
                    <Menu.Separator />
                    <Menu.Submenu>
                      <Menu.SubmenuTrigger addon={<LinkSimple aria-hidden />}>
                        Share
                      </Menu.SubmenuTrigger>
                      <Menu.Popup container={container} side="inline-end">
                        <Menu.LinkItem href="#">Copy link</Menu.LinkItem>
                        <Menu.Item note="⌘⇧E">Export PDF</Menu.Item>
                        <Menu.Item>Send to team</Menu.Item>
                      </Menu.Popup>
                    </Menu.Submenu>
                    <Menu.Separator />
                    <Menu.Item
                      addon={<Trash aria-hidden />}
                      sentiment="destructive"
                    >
                      Delete report
                    </Menu.Item>
                  </Menu.Popup>
                </Menu>
              </Stack>
            </Surface>
          </Stack>
        )}
      </PortalHost>
    </SandboxShell>
  );
};
