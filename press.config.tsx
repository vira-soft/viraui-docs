import { defineConfig } from "fumapress";
import { fumadocsMdx } from "fumapress/adapters/mdx";
import { metaSchema, pageSchema } from "fumapress/adapters/mdx/schema";
import { defineDocs } from "fumadocs-mdx/macro";
import type { Folder } from "fumadocs-core/page-tree";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { TypeTable } from "fumadocs-ui/components/type-table";
import { mcpPlugin } from "@fumapress/ai";
import { linkValidationPlugin } from "fumapress/plugins/link-validation";
import * as customMdx from "./src/mdx-components";
import { ViraLogo } from "./src/components/common/vira-logo";
import { OpenWithPopover } from "./src/components/common/open-with-popover";
import { viraIconsPlugin } from "./src/lib/vira-icons-plugin";
import { viraDocsBridgeCss } from "./src/lib/vira-docs-bridge";
import { MarkdownCopyButton } from "fumadocs-ui/layouts/glass/page";
import { buttonVariants } from "fumadocs-ui/components/ui/button";

import { createDocsLayoutPage } from "fumapress/layouts/docs";
import { createRootLayout } from "fumapress/layouts/root";
// import { Banner } from "fumadocs-ui/components/banner";
import type { CSSProperties } from "react";

/** Frontmatter: `pageActions: false` hides Copy Markdown / Open. */
const docsPageSchema = pageSchema.extend({
  pageActions: pageSchema.shape.full,
});

/** Root-folder → CSS var. Same idea as fumadocs.dev `tabs.transform`. */
function tabColorVar(node: Folder): string {
  const ref = node.$ref;
  const folder = typeof ref === "object" && ref && "folder" in ref ? String(ref.folder ?? "") : "";
  const key = folder.replace(/^\((.+)\)$/, "$1").split("/")[0];
  if (key === "components") return "var(--components-color)";
  if (key === "design-system") return "var(--design-system-color)";
  return "var(--color-fd-foreground)";
}

const RootLayout = createRootLayout();

const DocsLayout = createDocsLayoutPage<typeof config.$context>({
  // keep Copy Markdown + Open; omit GitHub + Scira AI
  renderPageActions: ({ page, props }) => {
    if (page.data.pageActions === false) return null;
    return (
      <div className="flex flex-row gap-2 items-center border-b pt-2 pb-6">
        {props.markdownUrl ? <MarkdownCopyButton markdownUrl={props.markdownUrl} /> : null}
        <OpenWithPopover markdownUrl={props.markdownUrl} />
      </div>
    );
  },
  // colored root-tab icons (Fumadocs docs pattern — not themeSwitch)
  renderLayout: ({ props, next }) =>
    next({
      ...props,
      sidebar: {
        ...props.sidebar,
        footer: (
          <a
            href="https://viraui.dev"
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ color: "primary", className: "w-full mt-4" })}
          >
            Get ViraUI Pro
          </a>
        ),
      },
      tabs: {
        transform(option, node) {
          if (!node.icon) return option;
          return {
            ...option,
            icon: (
              <div
                className="[&_svg]:size-full rounded-lg size-full text-(--tab-color) max-md:bg-(--tab-color)/10 max-md:border max-md:p-1.5"
                style={{ "--tab-color": tabColorVar(node) } as CSSProperties}
              >
                {node.icon}
              </div>
            ),
          };
        },
      },
    }),
});

const docs = defineDocs({
  dir: "content",
  docs: {
    async: true,
    schema: docsPageSchema,
    lastModified: true,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

/** Same asset as viraui-website `public/cover.jpg`. */
const SITE_COVER = "https://docs.viraui.dev/cover.jpg";

/**
 * Preset already ships: sitemap, robots.txt, llms.txt, RSS, FlexSearch, Takumi OG, image opts.
 * Explicit add: link validation + MCP (need server → mode default, not static).
 * Ask AI skipped — needs paid model provider (OpenAI/etc).
 * Site cover: static `/cover.jpg` (shared with viraui-website); `{ name: "core:takumi" }` skips generated OG.
 * @see https://press.fumadocs.dev/docs/config#preset
 * @see https://press.fumadocs.dev/docs/plugins
 */
const config = defineConfig({
  content: docs.toFumadocsSource(),
  renderRoot: ({ lang, children }) =>
    RootLayout({
      lang,
      children: (
        <>
          {/* <Banner>
            Documentation under construction — content is still being assembled.
          </Banner> */}
          {children}
        </>
      ),
    }),
  renderPage: (props) => <DocsLayout {...props} />,
  // default: prerender pages + emit API routes (/mcp)
  mode: "default",

  site: {
    name: "ViraUI Docs",
    baseUrl: "https://docs.viraui.dev",
    git: {
      user: "vira-soft",
      repo: "viraui-docs",
      branch: "main",
    },
  },
  defaultLayoutProps: {
    githubUrl: "https://github.com/vira-soft/viraui-docs",
    nav: {
      title: <ViraLogo />,
      transparentMode: 'top'
    },
  },
  loaderOptions: {
    plugins: [viraIconsPlugin()],
  },
  meta: {
    root() {
      return (
        <>
          <style dangerouslySetInnerHTML={{ __html: viraDocsBridgeCss }} />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link
            href="https://fonts.googleapis.com/css2?family=Geist:ital,wght@0,100..900;1,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap"
            rel="stylesheet"
          />
          <meta property="og:image" content={SITE_COVER} />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta name="twitter:image" content={SITE_COVER} />
        </>
      );
    },
  },
})
  .plugins(
    // same name as preset Takumi → skip per-page generated OG
    { name: "core:takumi" },
    linkValidationPlugin(),
    mcpPlugin({
      server: {
        name: "ViraUI Docs",
        version: "1.0.0",
      },
    }),
  )
  .adapters(
    fumadocsMdx({
      async getMdxComponents() {
        return {
          ...defaultMdxComponents,
          Step,
          Steps,
          Tab,
          Tabs,
          TypeTable,
          ...customMdx,
        };
      },
    }),
  );

export default config;
