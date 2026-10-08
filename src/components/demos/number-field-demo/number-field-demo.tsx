"use client";

import * as React from "react";
import { NumberField, Stack, Textfield } from "@viraui/react";
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

/** Overnight stay guest count with helper copy — default split steppers. */
export const NumberFieldLabeledDemo: React.FC = () => (
  <SandboxShell height={260} label="Guests NumberField with helper">
    <NumberField
      defaultValue={2}
      description="Max 8 guests."
      fitContent
      label="Guests"
      max={8}
      min={1}
      step={1}
    />
  </SandboxShell>
);

/** Restaurant party size with both steppers at inline-end. */
export const NumberFieldGroupedDemo: React.FC = () => (
  <SandboxShell height={240} label="Party size">
    <NumberField
      defaultValue={4}
      description="Seats to hold."
      fitContent
      label="Party size"
      max={20}
      min={1}
      step={1}
      stepperPlacement="grouped"
    />
  </SandboxShell>
);

/** API retry limit — plain label, no scrub (accidental drag would change a policy). */
export const NumberFieldScrubOffDemo: React.FC = () => (
  <SandboxShell height={240} label="Retry limit without label scrub">
    <NumberField
      defaultValue={3}
      description="Before job stops."
      fitContent
      label="Retry limit"
      labelScrub={false}
      max={10}
      min={0}
      step={1}
    />
  </SandboxShell>
);

/** Tip below the house minimum — error replaces description while invalid and dirty. */
export const NumberFieldInvalidDemo: React.FC = () => (
  <SandboxShell height={260} label="Invalid tip NumberField">
    <NumberField
      defaultValue={2}
      description="Min $5."
      dirty
      error="At least $5."
      fitContent
      invalid
      label="Tip"
      max={100}
      min={5}
      step={1}
    />
  </SandboxShell>
);

/** Wire transfer row — account Textfield beside amount NumberField. */
export const NumberFieldSiblingDemo: React.FC = () => (
  <SandboxShell height={240} label="Account Textfield and amount NumberField">
    <Stack columnGap="m" direction="row" hAlign="center">
      <Textfield
        defaultValue="Operating · ••4821"
        label="Account"
      />
      <NumberField
        defaultValue={150}
        fitContent
        label="Amount"
        max={10000}
        min={1}
        step={1}
      />
    </Stack>
  </SandboxShell>
);
