"use client";

import * as React from "react";
import {
  Accordion,
  Button,
  Stack,
  Surface,
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
  height = 420,
}) => (
  <ViraSandbox dialogShell={false} height={height} label={label}>
    {children}
  </ViraSandbox>
);

const PanelShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Stack
    expandChildren
    fullWidth
    style={{
      inlineSize: "100%",
      maxInlineSize: "28rem",
      marginInline: "auto",
    }}
  >
    {children}
  </Stack>
);

const FAQ_ITEMS = [
  {
    value: "arrival-timing",
    trigger: "When do payouts arrive?",
    body: "Payouts trigger when your balance crosses the minimum threshold. ACH transfers land in 2–3 business days; instant payouts post within minutes for eligible accounts.",
  },
  {
    value: "fees",
    trigger: "What fees apply?",
    body: "Standard ACH deposits are free. Instant payouts carry a 1.5% fee capped at $25 per transfer.",
  },
  {
    value: "tax-docs",
    trigger: "Tax documents",
    body: "Annual 1099 forms publish by January 31. Download prior-year statements from Account Settings.",
  },
] as const;

/** Exclusive FAQ — one panel open; default Surface islands. */
export const AccordionExclusiveDemo: React.FC = () => (
  <SandboxShell height={480} label="Exclusive FAQ accordion with Surface islands">
    <PanelShell>
      <Surface border="all" color={1} overflow="hidden" radius="l">
        <Stack rowGap="l">
          <Stack hPadding="m" rowGap="l" vPadding="m">
            <Stack rowGap="xs">
              <Title render={<h2 />} size="6">
                Payout Help
              </Title>
              <Text size="s" tone="muted">
                Royalty deposits and tax reporting
              </Text>
            </Stack>
            <Accordion defaultValue={["tax-docs"]}>
              {FAQ_ITEMS.map((item) => (
                <Accordion.Item
                  key={item.value}
                  border="all"
                  color={2}
                  trigger={item.trigger}
                  value={item.value}
                >
                  <Text tone="muted">{item.body}</Text>
                </Accordion.Item>
              ))}
            </Accordion>
          </Stack>
          <Surface
            color={2}
            hPadding="l"
            render={
              <Stack
                direction="row"
                hAlign="space-between"
                vAlign="center"
              />
            }
            vPadding="m"
          >
            <Button type="button" variant="secondary">
              View all statements
            </Button>
            <Button type="button">Contact support</Button>
          </Surface>
        </Stack>
      </Surface>
    </PanelShell>
  </SandboxShell>
);

const SETTINGS_ITEMS = [
  {
    value: "notifications",
    trigger: "Email notifications",
    body: "Digest summaries every Monday. Instant alerts for failed payouts and tax form readiness.",
  },
  {
    value: "security",
    trigger: "Security & sessions",
    body: "Two-factor authentication is on. Active sessions expire after 30 days of inactivity.",
  },
  {
    value: "exports",
    trigger: "Data exports",
    body: "CSV and PDF exports of royalty ledgers stay available for 90 days after generation.",
  },
] as const;

/** Multiple panels may stay open at once. */
export const AccordionMultipleDemo: React.FC = () => (
  <SandboxShell height={400} label="Accordion with multiple open sections">
    <PanelShell>
      <Accordion defaultValue={["notifications", "exports"]} multiple>
        {SETTINGS_ITEMS.map((item) => (
          <Accordion.Item
            key={item.value}
            border="all"
            color={1}
            trigger={item.trigger}
            value={item.value}
          >
            <Text tone="muted">{item.body}</Text>
          </Accordion.Item>
        ))}
      </Accordion>
    </PanelShell>
  </SandboxShell>
);

const ATTACHED_ITEMS = [
  {
    value: "billing",
    trigger: "Billing contact",
    body: "Invoices go to finance@northwind.studio. Update the contact before the next settlement cycle.",
  },
  {
    value: "locale",
    trigger: "Locale & currency",
    body: "Workspace defaults to English (US) and USD. Editors inherit these unless a project overrides them.",
  },
  {
    value: "retention",
    trigger: "Retention policy",
    body: "Draft assets older than 18 months move to cold storage. Published releases stay indefinitely.",
  },
] as const;

/** `islands={false}` — attached Surface block with shared outer corners. */
export const AccordionAttachedDemo: React.FC = () => (
  <SandboxShell height={360} label="Attached accordion block without island gaps">
    <PanelShell>
      <Accordion defaultValue={["billing"]} islands={false}>
        {ATTACHED_ITEMS.map((item) => (
          <Accordion.Item
            key={item.value}
            border="all"
            color={1}
            trigger={item.trigger}
            value={item.value}
          >
            <Text tone="muted">{item.body}</Text>
          </Accordion.Item>
        ))}
      </Accordion>
    </PanelShell>
  </SandboxShell>
);
