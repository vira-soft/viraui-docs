"use client";

import * as React from "react";
import { Prose, Stack, Text, Title } from "@viraui/react";
import { ViraSandbox } from "../../common/vira-sandbox";

type SandboxShellProps = {
  children: React.ReactNode;
  label: string;
  height?: number;
};

const SandboxShell: React.FC<SandboxShellProps> = ({
  children,
  label,
  height = 320,
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

const ArticleShell: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Stack fullWidth maxWidth="36rem" style={{ marginInline: "auto" }}>
    {children}
  </Stack>
);

/** Article region with Title/Text as real heading and paragraph tags. */
export const ProseArticleDemo: React.FC = () => (
  <SandboxShell height={360} label="Article with heading-aware Prose rhythm">
    <ArticleShell>
      <Prose render={<article />}>
        <Title lineHeight="s" render={<h2 />} size="2">
          Heading-aware document rhythm
        </Title>
        <Text render={<p />}>
          Prose spaces direct heading and block children with em gaps. Title and
          Text keep type; this wrapper does not paint font size or color.
        </Text>
        <Text render={<p />}>
          Body after body uses the block gap. The first child keeps no extra
          start margin.
        </Text>
      </Prose>
    </ArticleShell>
  </SandboxShell>
);

/** Native list and blockquote as one spaced block each. */
export const ProseNativeBlocksDemo: React.FC = () => (
  <SandboxShell height={400} label="Prose with native list and quote">
    <ArticleShell>
      <Prose>
        <Title lineHeight="s" render={<h2 />} size="2">
          What stays on the page
        </Title>
        <Text render={<p />}>
          Keep the heading and paragraphs, then add a short bullet list and a
          quote as native blocks in the same rhythm.
        </Text>
        <ul>
          <li>
            <Text>List items live inside the list; Prose gaps the list once.</Text>
          </li>
          <li>
            <Text>Quote chrome stays consumer CSS or theme.</Text>
          </li>
        </ul>
        <blockquote>
          <Text>
            A native blockquote is a matching block. Items inside do not get a
            second Prose gap.
          </Text>
        </blockquote>
      </Prose>
    </ArticleShell>
  </SandboxShell>
);

/** Compact density with region text-align. */
export const ProseDensityAlignDemo: React.FC = () => (
  <SandboxShell height={260} label="Compact centered Prose region">
    <ArticleShell>
      <Prose align="center" gap="s">
        <Title lineHeight="s" render={<h3 />} size="3">
          Release notes
        </Title>
        <Text render={<p />}>
          One region align sets text-align for the copy. Title and Text that omit
          align inherit it.
        </Text>
      </Prose>
    </ArticleShell>
  </SandboxShell>
);

/** Line height stays on Title and Text; Prose only spaces between blocks. */
export const ProseLineHeightDemo: React.FC = () => (
  <SandboxShell height={320} label="Prose with mixed paragraph leading">
    <ArticleShell>
      <Prose>
        <Title lineHeight="s" render={<h2 />} size="2">
          Keep the heading tight
        </Title>
        <Text lineHeight="l" render={<p />}>
          The first paragraph gets more air between lines. Prose still only
          spaces the gap between this block and the next.
        </Text>
        <Text lineHeight="s" render={<p />}>
          The second paragraph sits denser on the line while the block gap stays
          the same.
        </Text>
      </Prose>
    </ArticleShell>
  </SandboxShell>
);

/** Default span hosts skip heading and block gaps. */
export const ProseSpanHostsDemo: React.FC = () => (
  <SandboxShell height={280} label="Span hosts stay out of Prose rhythm">
    <ArticleShell>
      <Prose>
        <Title lineHeight="s" size="4">
          Default Title stays a span
        </Title>
        <Text>Default Text stays a span and does not join Prose rhythm.</Text>
        <Text render={<p />}>
          This paragraph is a matching block and does take the gap.
        </Text>
      </Prose>
    </ArticleShell>
  </SandboxShell>
);
