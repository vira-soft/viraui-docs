"use client";

import * as React from "react";
import { Stack, Surface, Switch, Text, Title } from "@viraui/react";
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

const PREFERENCE_OPTIONS = [
  {
    name: "push",
    label: "Push notifications",
    description: "Alerts on this device when something needs attention.",
    defaultChecked: true,
  },
  {
    name: "email",
    label: "Email digests",
    description: "A weekly summary of activity in your inbox.",
    defaultChecked: true,
  },
  {
    name: "marketing",
    label: "Marketing",
    description: "Occasional tips, webinars, and partner offers.",
    defaultChecked: false,
  },
] as const;

/** Surface panel with stacked labeled Switches for immediate settings. */
export const SwitchPreferencesDemo: React.FC = () => {
  const [values, setValues] = React.useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      PREFERENCE_OPTIONS.map((option) => [option.name, option.defaultChecked]),
    ),
  );

  return (
    <SandboxShell height={440} label="Preferences panel with labeled Switches">
      <FieldShell>
        <Surface border="all" color={1} overflow="hidden" radius="l">
          <Stack hPadding="l" rowGap="m" vPadding="l">
            <Stack rowGap="xs">
              <Title render={<h2 />} size="6">
                Notifications
              </Title>
              <Text maxWidth="18rem" size="s" tone="muted">
                Changes apply as soon as you toggle a row.
              </Text>
            </Stack>

            {PREFERENCE_OPTIONS.map((option) => (
              <Switch
                key={option.name}
                checked={values[option.name]}
                description={option.description}
                label={option.label}
                name={option.name}
                onCheckedChange={(next) => {
                  setValues((current) => ({
                    ...current,
                    [option.name]: next,
                  }));
                }}
              />
            ))}
          </Stack>
        </Surface>
      </FieldShell>
    </SandboxShell>
  );
};

/** Switch fills a bordered Surface — padding on the control, color when on. */
export const SwitchSurfaceCardDemo: React.FC = () => {
  const [checked, setChecked] = React.useState(true);

  return (
    <SandboxShell height={200} label="Switch inside bordered Surface card">
      <FieldShell>
        <Surface
          border="all"
          color={checked ? 3 : 1}
          radius="m"
        >
          <Switch
            checked={checked}
            description="Elevate interactive surfaces across the editor."
            hPadding="m"
            label="Shadows"
            name="shadows"
            onCheckedChange={setChecked}
            vPadding="m"
          />
        </Surface>
      </FieldShell>
    </SandboxShell>
  );
};

/** Unlabeled Switch trailing a title stack — needs aria-label. */
export const SwitchHeaderControlDemo: React.FC = () => {
  const [enabled, setEnabled] = React.useState(true);

  return (
    <SandboxShell height={200} label="Header row with trailing Switch">
      <FieldShell>
        <Stack
          columnGap="m"
          direction="row"
          hAlign="space-between"
          vAlign="start"
        >
          <Stack rowGap="xs">
            <Title render={<h2 />} size="6">
              Studio EQ
            </Title>
            <Text size="s" tone="muted">
              7-band output equalizer
            </Text>
          </Stack>
          <Switch
            aria-label="Enable equalizer"
            checked={enabled}
            name="eq-power"
            onCheckedChange={setEnabled}
          />
        </Stack>
      </FieldShell>
    </SandboxShell>
  );
};
