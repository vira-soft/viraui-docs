"use client";

import * as React from "react";
import { Form } from "@base-ui/react/form";
import { Button, OTPField, Stack, Text, Title } from "@viraui/react";
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
    fullWidth
    hAlign="center"
    style={{
      inlineSize: "100%",
      maxInlineSize: "28rem",
      marginInline: "auto",
    }}
  >
    {children}
  </Stack>
);

type CenteredFieldProps = {
  children: (titleId: string) => React.ReactNode;
  label: string;
  description?: string;
  /** Replaces description above the cluster when set. */
  error?: string;
};

/** Custom Title + helper/error above a hugging OTP cluster — both centered. */
const CenteredField: React.FC<CenteredFieldProps> = ({
  children,
  description,
  error,
  label,
}) => {
  const titleId = React.useId();

  return (
    <Stack hAlign="center" rowGap="m">
      <Stack hAlign="center" rowGap="xs">
        <Title align="center" id={titleId} render={<h3 />} size="6">
          {label}
        </Title>
        {error ? (
          <Text align="center" maxWidth="20rem" size="s" tone="danger">
            {error}
          </Text>
        ) : description ? (
          <Text align="center" maxWidth="20rem" size="s" tone="muted">
            {description}
          </Text>
        ) : null}
      </Stack>
      {children(titleId)}
    </Stack>
  );
};

const OTP_LENGTH = 6;

const otpSlots = (length: number, firstLabelledBy?: string) =>
  Array.from({ length }, (_, slotIndex) => (
    <OTPField.Input
      key={`character-${slotIndex + 1}`}
      {...(slotIndex === 0 && firstLabelledBy
        ? { "aria-labelledby": firstLabelledBy }
        : {})}
    />
  ));

/** Six-slot code with built-in Root label and helper — field centered. */
export const OtpFieldLabeledDemo: React.FC = () => (
  <SandboxShell height={260} label="Labeled OTPField with helper">
    <FieldShell>
      <OTPField label="Verification code" length={OTP_LENGTH}>
        {otpSlots(OTP_LENGTH)}
      </OTPField>
    </FieldShell>
  </SandboxShell>
);

/** Two groups of three with Separator — custom centered title. */
export const OtpFieldGroupedDemo: React.FC = () => (
  <SandboxShell height={280} label="OTPField grouped with Separator">
    <FieldShell>
      <CenteredField
        description="Separator is a visual break, not a typed character."
        label="Verification code"
      >
        {(titleId) => (
          <OTPField length={OTP_LENGTH}>
            <Stack columnGap="s" direction="row">
              <OTPField.Input aria-labelledby={titleId} />
              <OTPField.Input />
              <OTPField.Input />
            </Stack>
            <OTPField.Separator />
            <Stack columnGap="s" direction="row">
              <OTPField.Input />
              <OTPField.Input />
              <OTPField.Input />
            </Stack>
          </OTPField>
        )}
      </CenteredField>
    </FieldShell>
  </SandboxShell>
);

/** Form with autoSubmit — custom centered title. */
export const OtpFieldFormDemo: React.FC = () => {
  const [submitted, setSubmitted] = React.useState("");

  return (
    <SandboxShell height={340} label="OTPField form with autoSubmit">
      <FieldShell>
        <Form
          onFormSubmit={(values) => {
            const code = values.verificationCode;
            setSubmitted(typeof code === "string" ? code : "");
          }}
        >
          <Stack hAlign="center" rowGap="m">
            <CenteredField
              description="Completing the code submits the form."
              label="Verification code"
            >
              {(titleId) => (
                <OTPField
                  autoSubmit
                  length={OTP_LENGTH}
                  name="verificationCode"
                >
                  {otpSlots(OTP_LENGTH, titleId)}
                </OTPField>
              )}
            </CenteredField>
            <Button type="submit">Submit</Button>
            {submitted ? (
              <Text align="center" size="s">
                Submitted: {submitted}
              </Text>
            ) : null}
          </Stack>
        </Form>
      </FieldShell>
    </SandboxShell>
  );
};

/** Invalid + dirty after complete — error replaces helper above. */
export const OtpFieldInvalidDemo: React.FC = () => {
  const [rejected, setRejected] = React.useState(false);

  return (
    <SandboxShell height={300} label="OTPField invalid complete">
      <FieldShell>
        <CenteredField
          description="Enter any 6-digit code."
          error={rejected ? "This code is not valid." : undefined}
          label="Verification code"
        >
          {(titleId) => (
            <OTPField
              dirty={rejected}
              invalid={rejected}
              length={OTP_LENGTH}
              onValueComplete={() => {
                setRejected(true);
              }}
            >
              {otpSlots(OTP_LENGTH, titleId)}
            </OTPField>
          )}
        </CenteredField>
      </FieldShell>
    </SandboxShell>
  );
};

/** Masked characters — custom centered title. */
export const OtpFieldMaskedDemo: React.FC = () => (
  <SandboxShell height={280} label="Masked OTPField access code">
    <FieldShell>
      <CenteredField
        description="Characters stay hidden on shared screens."
        label="Access code"
      >
        {(titleId) => (
          <OTPField length={OTP_LENGTH} mask>
            {otpSlots(OTP_LENGTH, titleId)}
          </OTPField>
        )}
      </CenteredField>
    </FieldShell>
  </SandboxShell>
);
