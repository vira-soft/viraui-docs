"use client";

import * as React from "react";
import {
  Button,
  Stack,
  StaticNoise,
  Surface,
  Text,
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

const overlayStyle = {
  position: "absolute",
  inset: 0,
  zIndex: 1,
} satisfies React.CSSProperties;

const contentStyle = {
  position: "relative",
  zIndex: 2,
} satisfies React.CSSProperties;

/** Film grain wash over a gradient hero panel. */
export const StaticNoiseHeroDemo: React.FC = () => (
  <SandboxShell height={380} label="Hero panel with film grain">
    <Surface
      overflow="hidden"
      radius="l"
      style={{
        position: "relative",
        inlineSize: "100%",
        maxInlineSize: "28rem",
        marginInline: "auto",
        backgroundImage:
          "linear-gradient(145deg, var(--highlight-indigo) 0%, var(--highlight-blue) 48%, var(--highlight-green) 100%)",
      }}
    >
      <StaticNoise opacity={0.28} style={overlayStyle} />
      <Stack
        hPadding="xl"
        rowGap="m"
        style={contentStyle}
        vPadding="xl"
      >
        <Stack rowGap="s">
          <Title render={<h3 />} size="3" style={{ color: "white" }}>
            Northline Studio
          </Title>
          <Text
            render={<p />}
            size="s"
            style={{ color: "color-mix(in oklab, white 78%, transparent)" }}
          >
            Quiet tools for night shoots — grade, mask, and ship without
            leaving the dock.
          </Text>
        </Stack>
        <Button>Open workspace</Button>
      </Stack>
    </Surface>
  </SandboxShell>
);

/** Living animated grain on a vibrant product card. */
export const StaticNoiseAnimatedDemo: React.FC = () => (
  <SandboxShell height={320} label="Product card with living grain">
    <Surface
      border="all"
      color={2}
      data-vibrant
      overflow="hidden"
      radius="l"
      style={{
        position: "relative",
        inlineSize: "100%",
        maxInlineSize: "22rem",
        marginInline: "auto",
      }}
    >
      <StaticNoise animate opacity={0.22} style={overlayStyle} />
      <Stack
        hPadding="l"
        rowGap="m"
        style={contentStyle}
        vPadding="l"
      >
        <Stack rowGap="s">
          <Title render={<h3 />} size="4">
            Signal room
          </Title>
          <Text render={<p />} size="s" tone="muted">
            Live feed from dock 4 — latency under 40ms, encrypted end to end.
          </Text>
        </Stack>
        <Button variant="secondary">Join channel</Button>
      </Stack>
    </Surface>
  </SandboxShell>
);

/** Soft-light grain over photography for an archive print look. */
export const StaticNoisePhotoDemo: React.FC = () => (
  <SandboxShell height={400} label="Archive print with soft-light grain">
    <Surface
      overflow="hidden"
      radius="l"
      style={{
        position: "relative",
        inlineSize: "100%",
        maxInlineSize: "24rem",
        marginInline: "auto",
        blockSize: "22rem",
        backgroundImage:
          "url(https://picsum.photos/seed/vira-static-noise/960/720)",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <StaticNoise
        baseFrequency={0.65}
        mixBlendMode="soft-light"
        opacity={1}
        style={overlayStyle}
      />
      <Stack
        hPadding="l"
        rowGap="xs"
        style={{
          ...contentStyle,
          position: "absolute",
          insetInline: 0,
          bottom: 0,
          paddingBlock: "1.25rem",
          background:
            "linear-gradient(to top, color-mix(in oklab, black 55%, transparent), transparent)",
        }}
      >
        <Title render={<h3 />} size="5" style={{ color: "white" }}>
          Archive print 214
        </Title>
        <Text
          size="xs"
          style={{ color: "color-mix(in oklab, white 72%, transparent)" }}
        >
          Harbor fog · October scan
        </Text>
      </Stack>
    </Surface>
  </SandboxShell>
);
