"use client";

import * as React from "react";
import { Bell } from "@phosphor-icons/react";
import {
  Avatar,
  Button,
  IconButton,
  Popover,
  Stack,
  Surface,
  Text,
  Textfield,
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
  height = 360,
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

/** Wait for iframe body so the sheet portals inside the sandbox. */
const PortalHost: React.FC<PortalHostProps> = ({ children }) => {
  const { document: frameDoc } = useViraSandboxDocument();

  if (!frameDoc?.body) {
    return null;
  }

  return children(frameDoc.body);
};

const teamMembers = [
  {
    id: "sarah-chen",
    name: "Sarah Chen",
    role: "Product Design",
    email: "sarah@ledger.io",
    bio: "Leads design systems and interaction patterns across the portfolio experience.",
    src: "https://mockmind-api.uifaces.co/content/human/80.jpg",
    fallback: "SC",
  },
  {
    id: "marcus-reed",
    name: "Marcus Reed",
    role: "Engineering",
    email: "marcus@ledger.io",
    bio: "Owns trading infrastructure and settlement pipelines for high-volume accounts.",
    src: "https://mockmind-api.uifaces.co/content/human/219.jpg",
    fallback: "MR",
  },
  {
    id: "elena-voss",
    name: "Elena Voss",
    role: "Compliance",
    email: "elena@ledger.io",
    bio: "Reviews payout flows and audit trails for regulated markets in the EU and UK.",
    src: "https://mockmind-api.uifaces.co/content/human/128.jpg",
    fallback: "EV",
  },
] as const;

type TeamMemberProfile = (typeof teamMembers)[number];

/** Titled sheet with body copy and Done dismiss — default non-modal panel. */
export const PopoverSheetDemo: React.FC = () => (
  // Tall canvas: centered trigger + Sheet must fit below without iframe scroll/flip.
  <SandboxShell height={560} label="Titled Options Popover sheet">
    <PortalHost>
      {(container) => (
        <Popover>
          <Popover.Trigger
            render={<Button variant="secondary">Options</Button>}
          />
          <Popover.Sheet
            container={container}
            description="Choose an action"
            side="bottom"
            title="Options"
          >
            <Stack rowGap="m">
              <Text render={<p />} tone="muted">
                Keep body copy short; put dense command lists in Menu instead.
              </Text>
              <Popover.Close
                render={<Button variant="secondary">Done</Button>}
              />
            </Stack>
          </Popover.Sheet>
        </Popover>
      )}
    </PortalHost>
  </SandboxShell>
);

/** Notifications panel from an icon-only bell trigger. */
export const PopoverNotificationsDemo: React.FC = () => (
  <SandboxShell height={560} label="Notifications Popover from IconButton">
    <PortalHost>
      {(container) => (
        <Popover>
          <Popover.Trigger
            render={
              <IconButton
                aria-label="Open notifications"
                icon={<Bell />}
                variant="secondary"
              />
            }
          />
          <Popover.Sheet
            container={container}
            description="You are all caught up"
            side="bottom"
            title="Notifications"
          >
            <Stack rowGap="m">
              <Text render={<p />} tone="muted">
                No new alerts for this workspace.
              </Text>
              <Popover.Close
                render={<Button variant="secondary">Dismiss</Button>}
              />
            </Stack>
          </Popover.Sheet>
        </Popover>
      )}
    </PortalHost>
  </SandboxShell>
);

/** Form sheet with focus trap so Tab cycles stay inside while open. */
export const PopoverFocusTrapDemo: React.FC = () => (
  <SandboxShell height={640} label="Popover form with trap-focus modal">
    <PortalHost>
      {(container) => (
        <Popover modal="trap-focus">
          <Popover.Trigger render={<Button>Sign in</Button>} />
          <Popover.Sheet
            container={container}
            description="Focus stays inside the popover while open."
            side="bottom"
            title="Sign in"
          >
            <Stack rowGap="m">
              <Textfield label="Email" placeholder="you@example.com" />
              <Stack columnGap="s" direction="row">
                <Button>Submit</Button>
                <Button variant="secondary">Reset</Button>
                <Popover.Close
                  render={<Button variant="flat">Close</Button>}
                />
              </Stack>
            </Stack>
          </Popover.Sheet>
        </Popover>
      )}
    </PortalHost>
  </SandboxShell>
);

/** Shared createHandle — whole row hover/click morphs one sheet. */
export const PopoverHandleDemo: React.FC = () => {
  const [handle] = React.useState(() =>
    Popover.createHandle<TeamMemberProfile>(),
  );

  return (
    <SandboxShell height={520} label="Shared Popover handle across team rows">
      <PortalHost>
        {(container) => (
          <Stack maxWidth="22rem" rowGap="s">
            {teamMembers.map((member) => (
              <Popover.Trigger
                key={member.id}
                closeDelay={100}
                handle={handle}
                openOnHover
                payload={member}
                render={
                  <Surface
                    color={2}
                    hPadding="m"
                    radius="m"
                    render={<button type="button" />}
                    vPadding="m"
                  />
                }
              >
                <Stack columnGap="m" direction="row" vAlign="center">
                  <Avatar
                    alt={member.name}
                    fallback={member.fallback}
                    size="s"
                    src={member.src}
                  />
                  <Stack rowGap="s">
                    <Text weight="semibold">{member.name}</Text>
                    <Text size="s" tone="muted">
                      {member.role}
                    </Text>
                  </Stack>
                </Stack>
              </Popover.Trigger>
            ))}

            <Popover handle={handle}>
              {({ payload }) => {
                if (!payload) {
                  return null;
                }

                const member = payload as TeamMemberProfile;

                return (
                  <Popover.Sheet
                    container={container}
                    description={member.role}
                    headerAlign="center"
                    side="inline-end"
                    title={member.name}
                  >
                    <Stack hAlign="center" rowGap="m">
                      <Avatar
                        alt={member.name}
                        fallback={member.fallback}
                        size="l"
                        src={member.src}
                      />
                      <Text
                        align="center"
                        lineHeight="s"
                        maxWidth="25ch"
                        render={<p />}
                        size="s"
                        tone="muted"
                      >
                        {member.bio}
                      </Text>
                      <Text align="center" family="mono" size="s">
                        {member.email}
                      </Text>
                      <Popover.Close
                        render={
                          <Button size="s" variant="secondary">
                            View profile
                          </Button>
                        }
                      />
                    </Stack>
                  </Popover.Sheet>
                );
              }}
            </Popover>
          </Stack>
        )}
      </PortalHost>
    </SandboxShell>
  );
};
