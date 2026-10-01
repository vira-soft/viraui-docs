"use client";

import * as React from "react";
import {
  Button,
  Stack,
  Surface,
  Text,
  Title,
  Typewriter,
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

/** Stable phrase lists — inline arrays restart the cycle on every parent render. */
const heroTexts: string[] = [
  "Ship real UI at the speed of thought.",
  "Ship real UI at the speed of your LLM.",
  "Ship real UI at the speed of your team.",
];

const wrapTexts: string[] = [
  "We build focused, useful tools for designers and developers.",
  "Ship calm systems that stay steady across teams and releases.",
];

/** Auth-style hero cycle nested in Title with preserveSpace. */
export const TypewriterHeroDemo: React.FC = () => (
  <SandboxShell height={320} label="Hero title with cycling typewriter">
    <Stack
      rowGap="l"
      style={{
        inlineSize: "100%",
        maxInlineSize: "36rem",
        marginInline: "auto",
      }}
    >
      <Title lineHeight="s" maxWidth="32rem" render={<h2 />} size="1">
        <Typewriter
          caret="underscore"
          caretColor="var(--base-5)"
          preserveSpace
          texts={heroTexts}
        />
      </Title>
      <Stack columnGap="m" direction="row" wrap>
        <Button>Start free</Button>
        <Button variant="secondary">View docs</Button>
      </Stack>
    </Stack>
  </SandboxShell>
);

/** Muted subtitle with a themed caret color. */
export const TypewriterMutedDemo: React.FC = () => (
  <SandboxShell height={180} label="Muted subtitle with colored caret">
    <Stack
      hAlign="center"
      maxWidth="28rem"
      rowGap="s"
      style={{ marginInline: "auto", textAlign: "center" }}
    >
      <Title render={<h3 />} size="4">
        Acme Studio
      </Title>
      <Text render={<p />} size="s" tone="muted">
        <Typewriter
          caretColor="var(--highlight-green)"
          delay={200}
          speed={35}
        >
          Quiet tools for night shoots — grade, mask, and ship.
        </Typewriter>
      </Text>
    </Stack>
  </SandboxShell>
);

/** Wrapping Text holds layout through type/delete with preserveSpace. */
export const TypewriterWrapDemo: React.FC = () => (
  <SandboxShell height={360} label="Wrapping subtitle with reserved space">
    <Surface
      border="all"
      color={1}
      hPadding="l"
      radius="l"
      style={{
        inlineSize: "100%",
        maxInlineSize: "22rem",
        marginInline: "auto",
      }}
      vPadding="l"
    >
      <Stack rowGap="m">
        <Title render={<h3 />} size="4">
          Release notes
        </Title>
        <Text maxWidth="33ch" render={<p />} size="2xl" tone="muted">
          <Typewriter
            caret="none"
            delay={800}
            deleteSpeed={30}
            pause={2500}
            preserveSpace
            speed={20}
            texts={wrapTexts}
          />
        </Text>
      </Stack>
    </Surface>
  </SandboxShell>
);
