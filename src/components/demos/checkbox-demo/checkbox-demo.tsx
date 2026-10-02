"use client";

import * as React from "react";
import { Field } from "@base-ui/react";
import {
  Checkbox,
  CheckboxGroup,
  Fieldset,
  Separator,
  Stack,
  Surface,
  Text,
  Textfield,
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

const ALERT_OPTIONS = [
  {
    value: "product",
    label: "Product updates",
    description: "New features, changelog notes, and roadmap posts.",
  },
  {
    value: "security",
    label: "Security alerts",
    description: "Login attempts, password changes, and device trust.",
  },
  {
    value: "marketing",
    label: "Marketing",
    description: "Occasional tips, webinars, and partner offers.",
  },
] as const;

/** Fieldset-backed CheckboxGroup for multi-select preferences. */
export const CheckboxPreferencesDemo: React.FC = () => {
  const [value, setValue] = React.useState<string[]>(["product", "security"]);

  return (
    <SandboxShell
      height={340}
      label="Email alerts CheckboxGroup inside Fieldset"
    >
      <FieldShell>
        <Field.Root name="email-alerts">
          <Fieldset
            description="Pick every channel this workspace may email."
            label="Email alerts"
            render={
              <CheckboxGroup onValueChange={setValue} value={value} />
            }
          >
            <Stack rowGap="m">
              <Separator />
              {ALERT_OPTIONS.map((option) => (
                <Checkbox
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

/** Standalone boolean under Textfield rows — no Fieldset without a shared legend. */
export const CheckboxFormFooterDemo: React.FC = () => {
  const [saveDefault, setSaveDefault] = React.useState(true);

  return (
    <SandboxShell height={280} label="Form footer Checkbox under address fields">
      <FieldShell>
        <Stack rowGap="l">
          <Textfield
            defaultValue="214 Market Street"
            label="Street address"
            required
          />
          <Textfield defaultValue="Suite 400" label="Apt / Suite" />
          <Field.Root name="save-as-default">
            <Checkbox
              checked={saveDefault}
              label="Save as default address"
              onCheckedChange={setSaveDefault}
            />
          </Field.Root>
        </Stack>
      </FieldShell>
    </SandboxShell>
  );
};

/** Checkbox fills a bordered Surface — padding on the control, color when checked. */
export const CheckboxSurfaceCardDemo: React.FC = () => {
  const [checked, setChecked] = React.useState(false);

  return (
    <SandboxShell height={200} label="Checkbox inside bordered Surface card">
      <FieldShell>
        <Field.Root name="terms">
          <Surface
            border="all"
            radius="m"
            {...(checked ? { color: 3 } : {})}
          >
            <Checkbox
              checked={checked}
              description="Required before payouts leave this workspace."
              hPadding="m"
              label="Accept terms of service"
              onCheckedChange={setChecked}
              vPadding="m"
            />
          </Surface>
        </Field.Root>
      </FieldShell>
    </SandboxShell>
  );
};

const NOTIFICATION_KEYS = [
  "transaction",
  "security",
  "milestones",
  "market",
] as const;

type NotificationKey = (typeof NOTIFICATION_KEYS)[number];

const NOTIFICATION_OPTIONS: {
  value: NotificationKey;
  label: string;
  description: string;
}[] = [
  {
    value: "transaction",
    label: "Transaction alerts",
    description: "Deposits, withdrawals, and transfers.",
  },
  {
    value: "security",
    label: "Security alerts",
    description: "Login attempts and account changes.",
  },
  {
    value: "milestones",
    label: "Goal milestones",
    description: "Updates at 25%, 50%, 75%, and 100%.",
  },
  {
    value: "market",
    label: "Market updates",
    description: "Daily portfolio summary and price alerts.",
  },
];

/** Per-row Field.Root list with a select-all row driven by indeterminate. */
export const CheckboxSelectAllDemo: React.FC = () => {
  const [selected, setSelected] = React.useState<NotificationKey[]>([
    "transaction",
    "security",
  ]);

  const allChecked = selected.length === NOTIFICATION_KEYS.length;
  const someChecked = selected.length > 0 && !allChecked;

  const setKeyChecked = (key: NotificationKey, next: boolean) => {
    setSelected((current) => {
      if (next) {
        return current.includes(key) ? current : [...current, key];
      }

      return current.filter((item) => item !== key);
    });
  };

  return (
    <SandboxShell
      height={420}
      label="Notification list with select-all indeterminate"
    >
      <FieldShell>
        <Surface border="all" overflow="hidden" radius="l">
          <Stack hPadding="l" rowGap="m" vPadding="l">
            <Stack rowGap="xs">
              <Title render={<h2 />} size="6">
                Notifications
              </Title>
              <Text size="s" tone="muted">
                Choose what you want to be notified about.
              </Text>
            </Stack>

            <Separator />

            <Field.Root name="select-all-notifications">
              <Checkbox
                checked={allChecked}
                indeterminate={someChecked}
                label="Select all"
                onCheckedChange={(nextChecked) => {
                  setSelected(nextChecked ? [...NOTIFICATION_KEYS] : []);
                }}
              />
            </Field.Root>

            {NOTIFICATION_OPTIONS.map((option) => (
              <Field.Root key={option.value} name={option.value}>
                <Checkbox
                  checked={selected.includes(option.value)}
                  description={option.description}
                  label={option.label}
                  onCheckedChange={(nextChecked) => {
                    setKeyChecked(option.value, nextChecked);
                  }}
                />
              </Field.Root>
            ))}
          </Stack>
        </Surface>
      </FieldShell>
    </SandboxShell>
  );
};
