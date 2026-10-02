"use client";

import * as React from "react";
import { Field } from "@base-ui/react";
import {
  Checkbox,
  CheckboxGroup,
  Fieldset,
  Radio,
  RadioGroup,
  Separator,
  Stack,
  Surface,
  Textfield,
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

const FieldShell: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Stack
    expandChildren
    fullWidth
    style={{
      inlineSize: "100%",
      maxInlineSize: "24rem",
      marginInline: "auto",
    }}
  >
    {children}
  </Stack>
);

/** Section legend over related Textfields — no RadioGroup / CheckboxGroup merge. */
export const FieldsetBillingDemo: React.FC = () => (
  <SandboxShell height={280} label="Billing details Fieldset with Textfields">
    <FieldShell>
      <Surface border="all" overflow="hidden" radius="l" hPadding="l" vPadding="l">
        <Fieldset label="Billing details">
          <Stack rowGap="m">
            <Separator />
            <Textfield
              defaultValue="Vira Soft"
              label="Company"
              name="company"
              placeholder="Enter company name"
            />
            <Textfield
              defaultValue="IT12345678901"
              label="Tax ID"
              name="taxId"
              placeholder="Enter fiscal number"
            />
          </Stack>
        </Fieldset>
      </Surface>
    </FieldShell>
  </SandboxShell>
);

type DeliveryValue = "standard" | "express" | "overnight";

const DELIVERY_OPTIONS: {
  value: DeliveryValue;
  label: string;
  description: string;
}[] = [
  {
    value: "standard",
    label: "Standard",
    description: "3–5 business days.",
  },
  {
    value: "express",
    label: "Express",
    description: "1–2 business days.",
  },
  {
    value: "overnight",
    label: "Overnight",
    description: "Next business morning.",
  },
];

/** Fieldset merges RadioGroup through render — shared legend + group description. */
export const FieldsetDeliveryDemo: React.FC = () => {
  const [value, setValue] = React.useState<DeliveryValue>("express");

  return (
    <SandboxShell height={340} label="Delivery RadioGroup inside Fieldset">
      <FieldShell>
        <Field.Root name="delivery">
          <Fieldset
            description="Choose one option for this shipment."
            label="Delivery"
            render={
              <RadioGroup
                onValueChange={(next) => setValue(next as DeliveryValue)}
                value={value}
              />
            }
          >
            <Stack rowGap="m">
              <Separator />
              {DELIVERY_OPTIONS.map((option) => (
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

const PLAN_OPTIONS = [
  {
    value: "free",
    label: "Free",
    description: "For getting started.",
  },
  {
    value: "pro",
    label: "Pro",
    description: "For growing teams.",
  },
] as const;

/** Group error on Fieldset — Field.Root carries invalid; Surface owns card chrome. */
export const FieldsetPlanErrorDemo: React.FC = () => {
  const [value, setValue] = React.useState<string[]>([]);
  const empty = value.length === 0;

  return (
    <SandboxShell height={360} label="Plan cards with Fieldset group error">
      <FieldShell>
        <Field.Root dirty invalid={empty} name="plan">
          <Fieldset
            description="Pick every plan tier this workspace may trial."
            error={empty ? "Select a plan to continue." : undefined}
            label="Plan"
            render={
              <CheckboxGroup onValueChange={setValue} value={value} />
            }
          >
            <Stack expandChildren rowGap="s">
              <Separator />
              {PLAN_OPTIONS.map((option) => (
                <Surface
                  key={option.value}
                  border="all"
                  radius="m"
                  {...(value.includes(option.value) ? { color: 3 } : {})}
                >
                  <Checkbox
                    description={option.description}
                    hPadding="m"
                    label={option.label}
                    value={option.value}
                    vPadding="m"
                  />
                </Surface>
              ))}
            </Stack>
          </Fieldset>
        </Field.Root>
      </FieldShell>
    </SandboxShell>
  );
};
