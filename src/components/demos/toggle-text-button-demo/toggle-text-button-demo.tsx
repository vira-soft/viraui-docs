"use client";

import * as React from "react";
import { Bell, Moon, PushPin, Sun } from "@phosphor-icons/react";
import {
  Button,
  Chip,
  Stack,
  Surface,
  Text,
  Title,
  ToggleButton,
  ToggleGroup,
  ToggleTextButton,
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
  height = 112,
  vAlign = "center",
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

/** Resting flat + pressedVariant so the on state reads in quiet chrome. */
export const ToggleTextButtonPressedVariantDemo: React.FC = () => (
  <SandboxShell label="ToggleTextButton pressedVariant">
    <Stack columnGap="m" direction="row" wrap>
      <ToggleTextButton pressedVariant="secondary">Bold</ToggleTextButton>
      <ToggleTextButton defaultPressed pressedVariant="secondary">
        Italic
      </ToggleTextButton>
    </Stack>
  </SandboxShell>
);

/** Button-family addon beside the visible label. */
export const ToggleTextButtonAddonDemo: React.FC = () => (
  <SandboxShell label="ToggleTextButton with addon">
    <ToggleTextButton
      addon={<Bell />}
      pressedVariant="secondary"
    >
      Notify
    </ToggleTextButton>
  </SandboxShell>
);

/** Controlled pressed + onPressedChange for product side effects. */
export const ToggleTextButtonControlledDemo: React.FC = () => {
  const [pressed, setPressed] = React.useState(false);

  return (
    <SandboxShell height={140} label="ToggleTextButton controlled press">
      <Stack hAlign="center" rowGap="s">
        <ToggleTextButton
          onPressedChange={setPressed}
          pressed={pressed}
          pressedVariant="secondary"
        >
          Sync
        </ToggleTextButton>
        <Text size="s" tone="muted">
          {pressed ? "Syncing on" : "Syncing off"}
        </Text>
      </Stack>
    </SandboxShell>
  );
};

/** Exclusive labeled strip in ToggleGroup with Surface toolbar chrome. */
export const ToggleTextButtonGroupDemo: React.FC = () => (
  <SandboxShell label="ToggleTextButton in ToggleGroup">
    <Surface border="all" color={1} hPadding="2xs" radius="m" vPadding="2xs">
      <ToggleGroup aria-label="Text style" defaultValue={["bold"]}>
        <ToggleTextButton pressedVariant="secondary" value="bold">
          Bold
        </ToggleTextButton>
        <ToggleTextButton pressedVariant="secondary" value="italic">
          Italic
        </ToggleTextButton>
        <ToggleTextButton
          addon={<Bell />}
          pressedVariant="secondary"
          value="notify"
        >
          Notify
        </ToggleTextButton>
      </ToggleGroup>
    </Surface>
  </SandboxShell>
);

/** Mix ToggleTextButton and ToggleButton children in one group. */
export const ToggleTextButtonMixedGroupDemo: React.FC = () => (
  <SandboxShell label="Mixed ToggleTextButton and ToggleButton group">
    <Surface border="all" color={1} hPadding="2xs" radius="m" vPadding="2xs">
      <ToggleGroup aria-label="Editor options" defaultValue={["bold"]}>
        <ToggleTextButton pressedVariant="secondary" value="bold">
          Bold
        </ToggleTextButton>
        <ToggleTextButton
          addon={<Bell />}
          pressedVariant="secondary"
          value="notify"
        >
          Notify
        </ToggleTextButton>
        <ToggleButton
          aria-label="Pin"
          pressedVariant="secondary"
          restingIcon={<PushPin />}
          value="pin"
        />
        <ToggleButton
          aria-label="Dark mode"
          pressedIcon={<Sun />}
          pressedVariant="secondary"
          restingIcon={<Moon />}
          value="dark"
        />
      </ToggleGroup>
    </Surface>
  </SandboxShell>
);

/** Exclusive content choice on a pricing card — annual / monthly, not Tabs. */
export const ToggleTextButtonExclusiveOptionsDemo: React.FC = () => {
  const [period, setPeriod] = React.useState<string[]>(["annual"]);
  const annual = period.includes("annual");

  return (
    <SandboxShell
      height={340}
      label="ToggleTextButton exclusive options on a pricing card"
    >
      <Stack fullWidth maxWidth="28rem">
        <Surface
          border="all"
          color={1}
          hPadding="l"
          radius="m"
          vPadding="l"
        >
          <Stack rowGap="xl">
            <Stack
              columnGap="m"
              direction="row"
              hAlign="space-between"
              vAlign="center"
              wrap
            >
              <Stack columnGap="s" direction="row" vAlign="center">
                <Title render={<h3 />} size="5">
                  Pro
                </Title>
                <Chip variant="secondary">Most Popular</Chip>
              </Stack>
              <Surface
                border="all"
                color={2}
                hPadding="2xs"
                radius="m"
                vPadding="2xs"
              >
                <ToggleGroup
                  aria-label="Billing period"
                  onValueChange={setPeriod}
                  value={period}
                >
                  <ToggleTextButton
                    pressedVariant="secondary"
                    size="s"
                    value="annual"
                  >
                    Annual
                  </ToggleTextButton>
                  <ToggleTextButton
                    pressedVariant="secondary"
                    size="s"
                    value="monthly"
                  >
                    Monthly
                  </ToggleTextButton>
                </ToggleGroup>
              </Surface>
            </Stack>

            <Stack columnGap="m" direction="row" vAlign="center">
              <Title lineHeight="s" render={<p />} size="1">
                {annual ? "199 USD" : "19 USD"}
              </Title>
              <Text size="s" tone="muted">
                {annual ? "/yr" : "/mo"}
              </Text>
            </Stack>

            <Text render={<p />} size="m">
              For professionals who ship magic every day.
            </Text>

            <Button>Unlock Pro</Button>
          </Stack>
        </Surface>
      </Stack>
    </SandboxShell>
  );
};
