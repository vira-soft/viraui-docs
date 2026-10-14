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
import { useViraSandboxCss, ViraSandbox } from "../../common/vira-sandbox";

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

/**
 * Layers inherit root `border-radius` (ships in `@viraui/react`). Sandbox
 * inject covers older installs until docs bumps the package.
 */
const LAYER_RADIUS_CSS = `
[data-direction] > span[aria-hidden='true'] {
  border-radius: inherit;
}
`;

const Panel: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useViraSandboxCss(LAYER_RADIUS_CSS);
  return <>{children}</>;
};

const panelStyle = {
  position: "relative",
  blockSize: "28rem",
  inlineSize: "100%",
  maxInlineSize: "24rem",
  marginInline: "auto",
} satisfies React.CSSProperties;

/**
 * No Surface `overflow` here — Chromium drops masked backdrop-filter under
 * overflow+radius. Scroll clips; blur band matches Surface `radius="l"` via
 * `border-radius` + layer inherit.
 */
const scrollStyle = {
  blockSize: "100%",
  containerType: "size",
  overflow: "auto",
  overscrollBehavior: "contain",
} satisfies React.CSSProperties;

const scrollBlurShellStyle = {
  position: "sticky",
  top: 0,
  blockSize: 0,
  pointerEvents: "none",
  zIndex: 1,
} satisfies React.CSSProperties;

const scrollBlurViewportStyle = {
  position: "absolute",
  insetInline: 0,
  top: 0,
  blockSize: "100cqb",
  pointerEvents: "none",
} satisfies React.CSSProperties;

const bottomBlurStyle = {
  position: "absolute",
  insetInline: 0,
  bottom: 0,
  blockSize: "8rem",
  borderRadius: "0 0 var(--radius-l) var(--radius-l)",
} satisfies React.CSSProperties;

const topBlurStyle = {
  position: "absolute",
  insetInline: 0,
  top: 0,
  blockSize: "9rem",
  borderRadius: "var(--radius-l) var(--radius-l) 0 0",
  zIndex: 1,
  background:
    "linear-gradient(to bottom, color-mix(in oklab, var(--global-background) 88%, transparent), transparent)",
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
      Tomorrow we ship the quieter build — fewer flourishes, tighter spacing, and
      the same coastal light on the bench.
    </Text>
  </Stack>
);

/** Bottom-edge blur over a tall scroll article with a footer CTA. */
export const ProgressiveBlurBottomDemo: React.FC = () => (
  <SandboxShell label="Bottom progressive blur over a scrollable article">
    <Panel>
      <Surface border="all" color={1} radius="l" style={panelStyle}>
        <div style={scrollStyle}>
          <div aria-hidden style={scrollBlurShellStyle}>
            <div style={scrollBlurViewportStyle}>
              <ProgressiveBlur
                blur="24px"
                direction="bottom"
                style={bottomBlurStyle}
              />
            </div>
          </div>
          <ScrollArticle />
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
          <Button>Continue reading</Button>
        </Stack>
      </Surface>
    </Panel>
  </SandboxShell>
);

/** Top-edge blur under sticky chrome so content fades as it scrolls up. */
export const ProgressiveBlurTopDemo: React.FC = () => (
  <SandboxShell label="Top progressive blur under sticky article chrome">
    <Panel>
      <Surface border="all" color={1} radius="l" style={panelStyle}>
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
            Field notes
          </Title>
          <Text size="xs" tone="muted">
            Oct 2026 · Coastal studio
          </Text>
        </Stack>
        <div style={scrollStyle}>
          <div aria-hidden style={scrollBlurShellStyle}>
            <div style={scrollBlurViewportStyle}>
              <ProgressiveBlur
                blur="28px"
                direction="top"
                style={topBlurStyle}
              />
            </div>
          </div>
          <ScrollArticle bottomPad="2rem" topPad="7rem" />
        </div>
      </Surface>
    </Panel>
  </SandboxShell>
);

/** Dual-edge reader: content softens under both header and footer veils. */
export const ProgressiveBlurDualDemo: React.FC = () => (
  <SandboxShell
    height={560}
    label="Top and bottom progressive blur on a tall reader panel"
  >
    <Panel>
      <Surface
        border="all"
        color={1}
        radius="l"
        style={{
          ...panelStyle,
          blockSize: "30rem",
          maxInlineSize: "26rem",
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
            Issue 12
          </Title>
        </Stack>
        <div style={scrollStyle}>
          <div aria-hidden style={scrollBlurShellStyle}>
            <div style={scrollBlurViewportStyle}>
              <ProgressiveBlur
                blur="24px"
                direction="top"
                style={topBlurStyle}
              />
              <ProgressiveBlur
                blur="24px"
                direction="bottom"
                style={bottomBlurStyle}
              />
            </div>
          </div>
          <ScrollArticle bottomPad="7rem" topPad="7rem" />
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
    </Panel>
  </SandboxShell>
);
