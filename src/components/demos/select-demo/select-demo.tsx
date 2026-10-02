"use client";

import * as React from "react";
import { Lightning, Moon } from "@phosphor-icons/react";
import { Select, Stack, Text, Textfield } from "@viraui/react";
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

/** Wait for iframe body so the popup portals inside the sandbox. */
const PortalHost: React.FC<PortalHostProps> = ({ children }) => {
  const { document: frameDoc } = useViraSandboxDocument();

  if (!frameDoc?.body) {
    return null;
  }

  return children(frameDoc.body);
};

type FieldShellProps = {
  children: React.ReactNode;
  /** Caps shell width. @defaultValue '24rem' */
  maxInlineSize?: string;
};

const FieldShell: React.FC<FieldShellProps> = ({
  children,
  maxInlineSize = "24rem",
}) => (
  <Stack
    expandChildren
    fullWidth
    style={{
      inlineSize: "100%",
      maxInlineSize,
      marginInline: "auto",
    }}
  >
    {children}
  </Stack>
);

const timezoneItems = {
  "europe-london": "London (GMT)",
  "europe-paris": "Paris (CET)",
  "america-new_york": "New York (EST)",
  "america-los_angeles": "Los Angeles (PST)",
} as const;

const stateItems = {
  california: "California",
  texas: "Texas",
} as const;

const themeItems = {
  vivid: "Vivid",
  dusk: "Dusk",
} as const;

const LONG_LIST_COUNT = 24;

const longListItems = Object.fromEntries(
  Array.from({ length: LONG_LIST_COUNT }, (_, index) => [
    `opt-${index}`,
    `Option ${index + 1}`,
  ]),
);

/** Grouped timezone Select — default closed-choice pattern. */
export const SelectTimezoneDemo: React.FC = () => (
  <SandboxShell label="Timezone Select with grouped regions">
    <PortalHost>
      {(container) => (
        <FieldShell>
          <Select
            container={container}
            defaultValue="america-new_york"
            description="Used for reports, digests, and scheduled jobs."
            items={timezoneItems}
            label="Timezone"
            placeholder="Select a timezone"
          >
            <Select.Group label="Europe">
              <Select.Option value="europe-london">London (GMT)</Select.Option>
              <Select.Option value="europe-paris">Paris (CET)</Select.Option>
            </Select.Group>
            <Select.Separator />
            <Select.Group label="Americas">
              <Select.Option value="america-new_york">
                New York (EST)
              </Select.Option>
              <Select.Option value="america-los_angeles">
                Los Angeles (PST)
              </Select.Option>
            </Select.Group>
          </Select>
        </FieldShell>
      )}
    </PortalHost>
  </SandboxShell>
);

/** City Textfield beside State Select — equal-width form row. */
export const SelectAddressDemo: React.FC = () => (
  <SandboxShell height={280} label="City Textfield beside State Select">
    <PortalHost>
      {(container) => (
        <FieldShell maxInlineSize="36rem">
          <Stack columnGap="m" direction="row" expandChildren>
            <Textfield defaultValue="San Francisco" label="City" />
            <Select
              container={container}
              defaultValue="california"
              items={stateItems}
              label="State"
            >
              <Select.Option value="california">California</Select.Option>
              <Select.Option value="texas">Texas</Select.Option>
            </Select>
          </Stack>
        </FieldShell>
      )}
    </PortalHost>
  </SandboxShell>
);

type ThemeValue = keyof typeof themeItems;

const themeAddons: Record<ThemeValue, React.ReactNode> = {
  vivid: <Lightning aria-hidden size={16} />,
  dusk: <Moon aria-hidden size={16} />,
};

/** Theme Select with leading option addons and multi-line labels. */
export const SelectThemeDemo: React.FC = () => {
  const [value, setValue] = React.useState<ThemeValue>("vivid");

  return (
    <SandboxShell label="Theme Select with option addons">
      <PortalHost>
        {(container) => (
          <FieldShell maxInlineSize="16rem">
            <Select
              addon={themeAddons[value]}
              alignListWithTrigger={false}
              container={container}
              description="Root addon mirrors the selected option icon."
              items={themeItems}
              label="Theme"
              placeholder="Select theme"
              value={value}
              onValueChange={(next) => {
                setValue(next as ThemeValue);
              }}
            >
              <Select.Option
                addon={themeAddons.vivid}
                label="Vivid"
                value="vivid"
              >
                <Stack>
                  Vivid
                  <Text size="xs" tone="muted">
                    High-contrast default
                  </Text>
                </Stack>
              </Select.Option>
              <Select.Option addon={themeAddons.dusk} label="Dusk" value="dusk">
                <Stack>
                  Dusk
                  <Text size="xs" tone="muted">
                    Dim evening chrome
                  </Text>
                </Stack>
              </Select.Option>
            </Select>
          </FieldShell>
        )}
      </PortalHost>
    </SandboxShell>
  );
};

/** Long option list — popup scrolls with built-in scroll arrows. */
export const SelectLongListDemo: React.FC = () => (
  <SandboxShell height={420} label="Select with a long scrolling option list">
    <PortalHost>
      {(container) => (
        <FieldShell>
          <Select
            container={container}
            defaultValue="opt-11"
            description="Long lists scroll inside the elevated popup."
            items={longListItems}
            label="Workspace"
            placeholder="Pick a workspace"
          >
            {Array.from({ length: LONG_LIST_COUNT }, (_, index) => (
              <Select.Option key={index} value={`opt-${index}`}>
                {`Option ${index + 1}`}
              </Select.Option>
            ))}
          </Select>
        </FieldShell>
      )}
    </PortalHost>
  </SandboxShell>
);
