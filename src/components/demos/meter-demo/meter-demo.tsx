"use client";

import * as React from "react";
import { Eye, EyeSlash } from "@phosphor-icons/react";
import { IconButton, Meter, Stack, Text, Textfield } from "@viraui/react";
import { ViraSandbox } from "../../common/vira-sandbox";

type SandboxShellProps = {
  children: React.ReactNode;
  label: string;
  height?: number;
};

const SandboxShell: React.FC<SandboxShellProps> = ({
  children,
  label,
  height = 220,
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

/** Labeled meter with default `renderValue` formatting. */
export const MeterLabeledDemo: React.FC = () => (
  <SandboxShell label="Labeled Meter with default value readout">
    <Stack fullWidth maxWidth="20rem" minWidth="16rem" rowGap="m">
      <Meter
        description="74 GB of 100 GB used."
        label="Storage"
        renderValue
        value={74}
      />
    </Stack>
  </SandboxShell>
);

/** Custom `renderValue` formatter — units beside the label. */
export const MeterCustomValueDemo: React.FC = () => (
  <SandboxShell label="Meter with custom renderValue units">
    <Stack fullWidth maxWidth="20rem" minWidth="16rem" rowGap="m">
      <Meter
        description="42 GB of 100 GB used."
        label="Storage used"
        renderValue={(_formatted, value) => `${value} GB`}
        value={42}
      />
    </Stack>
  </SandboxShell>
);

/** Three highlight `variant` meters stacked for color-coded metrics. */
export const MeterHighlightDemo: React.FC = () => (
  <SandboxShell height={360} label="Highlight variant meters">
    <Stack fullWidth maxWidth="20rem" minWidth="16rem" rowGap="xl">
      <Meter
        description="Uptime across the last 30 days."
        label="Health"
        renderValue
        value={92}
        variant="green"
      />
      <Meter
        description="p95 response time vs budget."
        label="Latency"
        renderValue
        value={38}
        variant="yellow"
      />
      <Meter
        description="Failed requests this hour."
        label="Errors"
        renderValue
        value={12}
        variant="red"
      />
    </Stack>
  </SandboxShell>
);

const STRENGTH_LABELS = ["—", "Weak", "Fair", "Good", "Strong"] as const;

const RULES = [
  {
    id: "length",
    label: "At least 8 characters",
    test: (password: string) => password.length >= 8,
  },
  {
    id: "number",
    label: "Contains a number",
    test: (password: string) => /\d/u.test(password),
  },
  {
    id: "symbol",
    label: "Contains a symbol",
    test: (password: string) => /[^A-Za-z0-9]/u.test(password),
  },
  {
    id: "mixed-case",
    label: "Mixed case (upper and lower)",
    test: (password: string) => /[a-z]/u.test(password) && /[A-Z]/u.test(password),
  },
] as const;

/** Password strength score driving Meter `value` / `variant`. */
export const MeterPasswordStrengthDemo: React.FC = () => {
  const [password, setPassword] = React.useState("");
  const [visible, setVisible] = React.useState(false);

  const score = RULES.filter((rule) => rule.test(password)).length;

  let strengthTone: "muted" | "warning" | "positive" = "positive";
  if (score === 0) {
    strengthTone = "muted";
  } else if (score <= 2) {
    strengthTone = "warning";
  }

  let variant: "yellow" | "green" | undefined;
  if (score === 0) {
    variant = undefined;
  } else if (score <= 2) {
    variant = "yellow";
  } else {
    variant = "green";
  }

  return (
    <SandboxShell label="Password strength Meter">
      <Stack fullWidth maxWidth="20rem" minWidth="16rem" rowGap="m">
        <Textfield
          autoComplete="new-password"
          endAddon={
            <IconButton
              aria-label={visible ? "Hide password" : "Show password"}
              icon={visible ? <EyeSlash aria-hidden /> : <Eye aria-hidden />}
              onClick={() => {
                setVisible((value) => !value);
              }}
              size="s"
              type="button"
              variant="secondary"
            />
          }
          fullWidth
          label="New password"
          name="password"
          onValueChange={setPassword}
          type={visible ? "text" : "password"}
          value={password}
        />
        <Stack fullWidth rowGap="s">
          <Meter
            aria-label="Password strength"
            max={RULES.length}
            value={score}
            variant={variant}
          />
          <Text size="xs" tone={strengthTone}>
            Strength: {STRENGTH_LABELS[score]}
          </Text>
        </Stack>
      </Stack>
    </SandboxShell>
  );
};
