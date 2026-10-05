"use client";

import * as React from "react";
import { CopySimple, MagnifyingGlass } from "@phosphor-icons/react";
import { Button, IconButton, Stack, Textfield } from "@viraui/react";
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

/** Labeled email field with helper copy and Field validation. */
export const TextfieldEmailDemo: React.FC = () => (
  <SandboxShell height={280} label="Email Textfield with validation">
    <FieldShell>
      <Stack rowGap="l">
        <Textfield
          autoComplete="email"
          description="We will send a magic link — no password required."
          fullWidth
          label="Email"
          name="email"
          placeholder="your@email.com"
          type="email"
          validate={(value: unknown) => {
            const trimmed = String(value ?? "").trim();

            if (!trimmed) {
              return "Enter an email address.";
            }

            if (!trimmed.includes("@")) {
              return "Enter a valid email address.";
            }

            return null;
          }}
          validationMode="onChange"
        />
        <Button type="button">Send magic link</Button>
      </Stack>
    </FieldShell>
  </SandboxShell>
);

/** Start and end addons inside the shared control group. */
export const TextfieldAddonsDemo: React.FC = () => (
  <SandboxShell height={320} label="Textfield addons: search, currency, verify">
    <FieldShell>
      <Stack rowGap="m">
        <Textfield
          aria-label="Search holdings or tickers"
          fullWidth
          placeholder="Search holdings or tickers…"
          startAddon={<MagnifyingGlass aria-hidden size={16} />}
          type="search"
        />
        <Textfield
          defaultValue="1,000.00"
          fullWidth
          label="Amount to invest"
          name="amount"
          startAddon={<>$</>}
        />
        <Textfield
          defaultValue="Synthetic Horizons Music LLC"
          endAddon={
            <Button
              aria-label="Verify account holder"
              size="s"
              type="button"
              variant="secondary"
            >
              Verify
            </Button>
          }
          fullWidth
          label="Account holder"
          name="account-holder"
        />
      </Stack>
    </FieldShell>
  </SandboxShell>
);

/** Shipping address stack with equal-width city / ZIP row. */
export const TextfieldAddressDemo: React.FC = () => (
  <SandboxShell height={360} label="Shipping address Textfields">
    <FieldShell>
      <Stack rowGap="m">
        <Textfield
          defaultValue="123 Main Street"
          fullWidth
          label="Street address"
          name="street"
          required
        />
        <Textfield
          defaultValue="Apt 4B"
          fullWidth
          label="Apt / Suite"
          name="suite"
        />
        <Stack columnGap="m" direction="row" expandChildren>
          <Textfield defaultValue="San Francisco" label="City" name="city" />
          <Textfield defaultValue="94102" label="ZIP Code" name="zip" />
        </Stack>
      </Stack>
    </FieldShell>
  </SandboxShell>
);

/** Native date / time types with pickers in Chrome, Safari, and Firefox. */
export const TextfieldDateTimeDemo: React.FC = () => (
  <SandboxShell height={360} label="Date and time Textfield types">
    <FieldShell>
      <Stack rowGap="m">
        <Stack columnGap="m" direction="row" expandChildren>
          <Textfield
            defaultValue="2026-10-05"
            label="Date"
            name="date"
            type="date"
          />
          <Textfield
            defaultValue="09:30"
            label="Time"
            name="time"
            type="time"
          />
        </Stack>
        <Textfield
          defaultValue="2026-10-05T09:30"
          fullWidth
          label="Date and time"
          name="datetime-local"
          type="datetime-local"
        />
      </Stack>
    </FieldShell>
  </SandboxShell>
);

/** Inline fitContent value with a copy action in endAddon. */
export const TextfieldFitContentDemo: React.FC = () => (
  <SandboxShell height={200} label="Share code Textfield with fitContent">
    <Stack hAlign="center">
      <Textfield
        aria-label="Preset share code"
        endAddon={
          <IconButton
            aria-label="Copy preset code"
            icon={<CopySimple />}
            size="s"
            type="button"
            variant="flat"
          />
        }
        fitContent
        readOnly
        value="vira-preset-abc123"
      />
    </Stack>
  </SandboxShell>
);
