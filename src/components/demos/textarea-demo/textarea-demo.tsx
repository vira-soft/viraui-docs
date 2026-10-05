"use client";

import * as React from "react";
import { Button, Stack, Textarea } from "@viraui/react";
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

/** Labeled message body with Field validation after edit. */
export const TextareaMessageDemo: React.FC = () => (
  <SandboxShell height={360} label="Feedback message Textarea with validation">
    <FieldShell>
      <Stack rowGap="l">
        <Textarea
          description="Tell us what went wrong or what would help next time."
          label="Message"
          name="message"
          placeholder="Describe the issue in a few sentences…"
          rows={4}
          validate={(value: unknown) => {
            const trimmed = String(value ?? "").trim();

            if (!trimmed) {
              return "Enter a message.";
            }

            if (trimmed.length < 12) {
              return "Message must be at least 12 characters.";
            }

            return null;
          }}
          validationMode="onChange"
        />
        <Button type="button">Send feedback</Button>
      </Stack>
    </FieldShell>
  </SandboxShell>
);

const FIT_CONTENT_SEED =
  "Ship notes for the next release.\n\n• Document Textarea fitContent\n• Keep sandbox tall enough to show growth";

/** Content-sized Textarea — grows with typed lines via fitContent. */
export const TextareaFitContentDemo: React.FC = () => (
  <SandboxShell height={440} label="Release notes Textarea that grows with content">
    <FieldShell>
      <Textarea
        defaultValue={FIT_CONTENT_SEED}
        description="The field grows as you add lines — no drag handle needed."
        fitContent
        label="Release notes"
        name="release-notes"
        placeholder="Add a line…"
        rows={2}
      />
    </FieldShell>
  </SandboxShell>
);

/** Vertical CSS resize plus fitContent for drag-and-grow notes. */
export const TextareaResizeDemo: React.FC = () => (
  <SandboxShell height={400} label="Notes Textarea with vertical resize and fitContent">
    <FieldShell>
      <Stack rowGap="l">
        <Textarea
          description="Grows with the value; drag the corner when you want more room."
          fitContent
          label="Notes"
          name="notes"
          placeholder="Add any notes for this payout configuration…"
          resize="vertical"
          rows={3}
        />
        <Button type="button">Save notes</Button>
      </Stack>
    </FieldShell>
  </SandboxShell>
);
