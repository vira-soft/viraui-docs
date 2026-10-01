"use client";

import * as React from "react";
import {
  Button,
  ProgressiveBlur,
  Stack,
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
  height = 520,
}) => (
  <ViraSandbox
    dialogShell={false}
    height={height}
    label={label}
    vAlign="start"
  >
    {children}
  </ViraSandbox>
);

const panelStyle = {
  position: "relative",
  blockSize: "28rem",
  inlineSize: "100%",
  maxInlineSize: "24rem",
} satisfies React.CSSProperties;

const scrollStyle = {
  blockSize: "100%",
  overflow: "auto",
  overscrollBehavior: "contain",
} satisfies React.CSSProperties;

const bottomBlurStyle = {
  position: "absolute",
  insetInline: 0,
  bottom: 0,
  blockSize: "8rem",
  zIndex: 1,
} satisfies React.CSSProperties;

const topBlurStyle = {
  position: "absolute",
  insetInline: 0,
  top: 0,
  blockSize: "9rem",
  zIndex: 1,
} satisfies React.CSSProperties;

const figureStyle = {
  display: "block",
  inlineSize: "100%",
  blockSize: "auto",
  borderRadius: "0.75rem",
  objectFit: "cover",
} satisfies React.CSSProperties;

type ArticleFigureProps = {
  alt: string;
  src: string;
};

const ArticleFigure: React.FC<ArticleFigureProps> = ({ alt, src }) => (
  <img alt={alt} src={src} style={figureStyle} />
);

type ScrollArticleProps = {
  bottomPad?: string;
  topPad?: string;
};

/** Fake long-form article body used across ProgressiveBlur demos. */
const ScrollArticle: React.FC<ScrollArticleProps> = ({
  bottomPad = "6rem",
  topPad,
}) => (
  <Stack
    hPadding="l"
    rowGap="m"
    style={{
      paddingBlockEnd: bottomPad,
      ...(topPad ? { paddingBlockStart: topPad } : undefined),
    }}
    vPadding="l"
  >
    <Title render={<h3 />} size="4">
      Field notes from the coastal studio
    </Title>
    <Text render={<p />} size="s" tone="muted">
      Morning light hits the workbench before anything else. Tools stay out —
      chalk, rulers, a half-finished mock — because the room is meant for
      making, not for looking finished.
    </Text>
    <ArticleFigure
      alt="Sunlit studio workbench with tools and sketches"
      src="https://picsum.photos/seed/vira-progressive-blur-a/960/540"
    />
    <Text render={<p />} size="s" tone="muted">
      We keep prototypes close to the window. Paper yellows a little by noon,
      which somehow makes the next iteration feel less precious and easier to
      discard. That small friction is the point.
    </Text>
    <Text render={<p />} size="s" tone="muted">
      Afternoons are for review. Someone walks the wall of prints, marks what
      still feels honest, and leaves what only looks clever. The cull is quiet —
      no performance, just a stack that gets shorter.
    </Text>
    <ArticleFigure
      alt="Pinned prints and notes on a studio wall"
      src="https://picsum.photos/seed/vira-progressive-blur-b/960/640"
    />
    <Text render={<p />} size="s" tone="muted">
      By evening the desk clears again. Leftover coffee, one open notebook, and
      the next day’s first line already written so tomorrow starts mid-thought
      instead of blank.
    </Text>
    <Text render={<p />} size="s" tone="muted">
      Scroll further if you want the blur to do its job — the last lines should
      soften under the edge veil instead of clipping hard against the frame.
    </Text>
  </Stack>
);

/** Bottom-edge blur over a tall scroll article with a footer CTA. */
export const ProgressiveBlurBottomDemo: React.FC = () => (
  <SandboxShell label="Bottom progressive blur over a scrollable article">
    <Surface
      border="all"
      color={1}
      overflow="hidden"
      radius="l"
      style={{ ...panelStyle, marginInline: "auto" }}
    >
      <div style={scrollStyle}>
        <ScrollArticle />
      </div>
      <ProgressiveBlur blur="24px" direction="bottom" style={bottomBlurStyle} />
      <Stack
        hAlign="center"
        hPadding="l"
        style={{
          position: "absolute",
          insetInline: 0,
          bottom: 0,
          zIndex: 2,
          paddingBlockEnd: "1rem",
        }}
      >
        <Button>Continue reading</Button>
      </Stack>
    </Surface>
  </SandboxShell>
);

/** Top-edge blur under sticky chrome so content fades as it scrolls up. */
export const ProgressiveBlurTopDemo: React.FC = () => (
  <SandboxShell label="Top progressive blur under sticky article chrome">
    <Surface
      border="all"
      color={1}
      overflow="hidden"
      radius="l"
      style={{ ...panelStyle, marginInline: "auto" }}
    >
      <Stack
        hPadding="l"
        rowGap="xs"
        style={{
          position: "absolute",
          insetInline: 0,
          top: 0,
          zIndex: 2,
          paddingBlock: "0.85rem",
        }}
        vPadding="s"
      >
        <Title render={<h3 />} size="5">
          Studio journal
        </Title>
        <Text size="xs" tone="muted">
          Sticky chrome · content fades underneath
        </Text>
      </Stack>
      <ProgressiveBlur blur="28px" direction="top" style={topBlurStyle} />
      <div style={scrollStyle}>
        <ScrollArticle bottomPad="2rem" topPad="1.25rem" />
      </div>
    </Surface>
  </SandboxShell>
);

/** Dual-edge reader: content softens under both header and footer veils. */
export const ProgressiveBlurDualDemo: React.FC = () => (
  <SandboxShell
    height={560}
    label="Top and bottom progressive blur on a tall reader panel"
  >
    <Surface
      border="all"
      color={1}
      overflow="hidden"
      radius="l"
      style={{
        ...panelStyle,
        blockSize: "30rem",
        maxInlineSize: "26rem",
        marginInline: "auto",
      }}
    >
      <Stack
        hAlign="center"
        hPadding="l"
        style={{
          position: "absolute",
          insetInline: 0,
          top: 0,
          zIndex: 2,
          paddingBlock: "0.85rem",
        }}
      >
        <Title align="center" render={<h3 />} size="5">
          Long read
        </Title>
      </Stack>
      <ProgressiveBlur blur="24px" direction="top" style={topBlurStyle} />
      <ProgressiveBlur blur="24px" direction="bottom" style={bottomBlurStyle} />
      <div style={scrollStyle}>
        <ScrollArticle bottomPad="7rem" topPad="1.25rem" />
      </div>
      <Stack
        hAlign="center"
        hPadding="l"
        style={{
          position: "absolute",
          insetInline: 0,
          bottom: 0,
          zIndex: 2,
          paddingBlockEnd: "1rem",
        }}
      >
        <Button variant="secondary">Mark as read</Button>
      </Stack>
    </Surface>
  </SandboxShell>
);
