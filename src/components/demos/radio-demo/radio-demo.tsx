"use client";

import * as React from "react";
import { Field } from "@base-ui/react";
import {
  Fieldset,
  Grid,
  Radio,
  RadioGroup,
  Separator,
  Stack,
  Surface,
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

type FieldShellProps = {
  children: React.ReactNode;
  /** Caps shell width when not fit-content. @defaultValue '24rem' */
  maxInlineSize?: string;
  /** Size shell to children and center — skip full-width stretch. @defaultValue false */
  fitContent?: boolean;
};

const FieldShell: React.FC<FieldShellProps> = ({
  children,
  maxInlineSize = "24rem",
  fitContent = false,
}) => (
  <Stack
    expandChildren={!fitContent}
    fullWidth={!fitContent}
    style={
      fitContent
        ? { inlineSize: "fit-content", marginInline: "auto" }
        : {
            inlineSize: "100%",
            maxInlineSize,
            marginInline: "auto",
          }
    }
  >
    {children}
  </Stack>
);

type PlanValue = "starter" | "pro" | "enterprise";

const PLAN_OPTIONS: {
  value: PlanValue;
  label: string;
  description: string;
}[] = [
  {
    value: "starter",
    label: "Starter",
    description: "Solo workspaces and early experiments.",
  },
  {
    value: "pro",
    label: "Pro",
    description: "Shared seats, roles, and priority support.",
  },
  {
    value: "enterprise",
    label: "Enterprise",
    description: "SSO, audit logs, and custom limits.",
  },
];

/** Fieldset-backed RadioGroup — default single-choice pattern. */
export const RadioPlansDemo: React.FC = () => {
  const [value, setValue] = React.useState<PlanValue>("starter");

  return (
    <SandboxShell height={360} label="Billing plan RadioGroup inside Fieldset">
      <FieldShell>
        <Field.Root name="plan">
          <Fieldset
            description="Choose one plan for this workspace."
            label="Plan"
            render={
              <RadioGroup
                onValueChange={(next) => setValue(next as PlanValue)}
                value={value}
              />
            }
          >
            <Stack rowGap="m">
              <Separator />
              {PLAN_OPTIONS.map((option) => (
                <Radio
                  key={option.value}
                  description={option.description}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Stack>
          </Fieldset>
        </Field.Root>
      </FieldShell>
    </SandboxShell>
  );
};

type ContactValue = "email" | "sms" | "push";

const CONTACT_OPTIONS: {
  value: ContactValue;
  label: string;
  description: string;
}[] = [
  {
    value: "email",
    label: "Email",
    description: "Daily digest to your inbox.",
  },
  {
    value: "sms",
    label: "SMS",
    description: "Urgent alerts to your phone.",
  },
  {
    value: "push",
    label: "Push",
    description: "In-app and device notifications.",
  },
];

/** RadioGroup alone in Field.Root — no Fieldset without a shared legend. */
export const RadioContactDemo: React.FC = () => {
  const [value, setValue] = React.useState<ContactValue>("email");

  return (
    <SandboxShell height={280} label="Contact RadioGroup without Fieldset">
      <FieldShell fitContent>
        <Field.Root name="preferred-contact">
          <RadioGroup
            onValueChange={(next) => setValue(next as ContactValue)}
            value={value}
          >
            <Stack rowGap="m">
              {CONTACT_OPTIONS.map((option) => (
                <Radio
                  key={option.value}
                  description={option.description}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Stack>
          </RadioGroup>
        </Field.Root>
      </FieldShell>
    </SandboxShell>
  );
};

type PayoutValue = "bank" | "paypal";

const PAYOUT_OPTIONS: {
  value: PayoutValue;
  label: string;
  description: string;
}[] = [
  {
    value: "bank",
    label: "Bank transfer",
    description: "SWIFT / IBAN.",
  },
  {
    value: "paypal",
    label: "PayPal",
    description: "Instant payout.",
  },
];

/** Each Radio fills a bordered Surface — padding on the control, color when selected. */
export const RadioSurfaceCardsDemo: React.FC = () => {
  const [value, setValue] = React.useState<PayoutValue>("bank");

  return (
    <SandboxShell height={240} label="Payout method Radio cards">
      <FieldShell maxInlineSize="36rem">
        <Field.Root name="receiving-method">
          <Fieldset
            label="Receiving method"
            render={
              <RadioGroup
                onValueChange={(next) => setValue(next as PayoutValue)}
                value={value}
              />
            }
          >
            <Grid columnGap="m" columns={2}>
              {PAYOUT_OPTIONS.map((option) => (
                <Surface
                  key={option.value}
                  border="all"
                  color={value === option.value ? 3 : 1}
                  radius="m"
                >
                  <Radio
                    description={option.description}
                    hPadding="m"
                    label={option.label}
                    value={option.value}
                    vPadding="m"
                  />
                </Surface>
              ))}
            </Grid>
          </Fieldset>
        </Field.Root>
      </FieldShell>
    </SandboxShell>
  );
};
