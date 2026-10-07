"use client";

import { Dialog } from "@viraui/react";
import * as React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import viraThemeCssUrl from "@viraui/foundation/vira.css?url";
import viraCondensedThemeCssUrl from "@viraui/foundation/vira-condensed.css?url";
import sunburstThemeCssUrl from "@viraui/foundation/sunburst.css?url";
import cinderThemeCssUrl from "@viraui/foundation/cinder.css?url";
import preflightCssUrl from "@viraui/react/preflight.css?url";

/**
 * Every published component stylesheet under @viraui/react.
 * New components with a `name/name.css` build artifact are picked up automatically.
 */
const COMPONENT_CSS_URLS = Object.values(
  import.meta.glob(
    "../../../../node_modules/@viraui/react/dist/components/*/*.css",
    { eager: true, query: "?url", import: "default" },
  ),
) as string[];

/** Built-in foundation sheets loaded into the iframe. */
export type ViraSandboxTheme =
  | "vira"
  | "vira-condensed"
  | "sunburst"
  | "cinder";

/** `data-mode` on the iframe `<html>` — force or inherit parent docs theme. */
export type ViraSandboxMode = "light" | "dark" | "inverted";

const THEME_CSS_URL: Record<ViraSandboxTheme, string> = {
  vira: viraThemeCssUrl,
  "vira-condensed": viraCondensedThemeCssUrl,
  sunburst: sunburstThemeCssUrl,
  cinder: cinderThemeCssUrl,
};

const GEIST_FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Geist:ital,wght@0,100..900;1,100..900&display=swap";
const GEIST_MONO_FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&display=swap";
const MERRIWEATHER_FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Merriweather:ital,opsz,wght@0,18..144,300..900;1,18..144,300..900&display=swap";
const OXANIUM_FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Oxanium:wght@200..800&display=swap";

/** Theme tokens name `* Variable`; Google CSS registers the short family. */
const THEME_FONT_HREFS: Record<ViraSandboxTheme, readonly string[]> = {
  vira: [GEIST_FONT_HREF, GEIST_MONO_FONT_HREF],
  "vira-condensed": [GEIST_FONT_HREF, GEIST_MONO_FONT_HREF],
  sunburst: [MERRIWEATHER_FONT_HREF],
  cinder: [OXANIUM_FONT_HREF],
};

const THEME_FONT_REMAP_CSS: Record<ViraSandboxTheme, string> = {
  vira: `:root {
  --font-family-heading: Geist, "Geist Variable", system-ui, sans-serif;
  --font-family-body: Geist, "Geist Variable", system-ui, sans-serif;
  --font-family-mono: "Geist Mono", "Geist Mono Variable", ui-monospace, monospace;
}`,
  "vira-condensed": `:root {
  --font-family-heading: Geist, "Geist Variable", system-ui, sans-serif;
  --font-family-body: Geist, "Geist Variable", system-ui, sans-serif;
  --font-family-mono: "Geist Mono", "Geist Mono Variable", ui-monospace, monospace;
}`,
  sunburst: `:root {
  --font-family-heading: Merriweather, "Merriweather Variable", Georgia, serif;
}`,
  cinder: `:root {
  --font-family-heading: Oxanium, "Oxanium Variable", system-ui, sans-serif;
  --font-family-body: Oxanium, "Oxanium Variable", system-ui, sans-serif;
}`,
};

const SANDBOX_LAYOUT_CSS = `
html, body {
  margin: 0;
  min-block-size: 100%;
  block-size: 100%;
  background: var(--global-background);
  color: var(--global-foreground);
  overflow: hidden;
  position: relative;
}
/* Content-sized iframe: let the document grow with the portal root. */
html[data-vira-sandbox-auto-height],
html[data-vira-sandbox-auto-height] body {
  block-size: auto;
  min-block-size: 0;
  overflow: visible;
}
#vira-sandbox-root {
  box-sizing: border-box;
  min-block-size: 100%;
  position: relative;
  isolation: isolate;
}
html[data-vira-sandbox-auto-height] #vira-sandbox-root {
  min-block-size: 0;
}
`;

const frameStylesheetHrefs = (theme: ViraSandboxTheme) => [
  THEME_CSS_URL[theme],
  preflightCssUrl,
  ...COMPONENT_CSS_URLS,
];
type SandboxDocContextValue = {
  document: Document | null;
  window: Window | null;
};

const ViraSandboxDocContext = createContext<SandboxDocContextValue>({
  document: null,
  window: null,
});

/** Iframe document/window for portals (Dialog.Sheet `container`, etc.). */
export function useViraSandboxDocument() {
  return useContext(ViraSandboxDocContext);
}

/**
 * Inject demo CSS into the sandbox iframe `<head>`.
 * Parent-bundled CSS modules do not apply to portaled iframe content — call with
 * `import css from "./demo.module.css?inline"`.
 */
export function useViraSandboxCss(css: string) {
  const { document: frameDoc } = useViraSandboxDocument();

  useEffect(() => {
    if (!frameDoc?.head || !css) {
      return;
    }

    const style = frameDoc.createElement("style");
    style.setAttribute("data-vira-sandbox-demo", "");
    style.textContent = css;
    frameDoc.head.appendChild(style);

    return () => {
      style.remove();
    };
  }, [frameDoc, css]);
}

function DialogShell({ children }: { children: ReactNode }) {
  return (
    <Dialog.Provider>
      <Dialog.IndentBackground />
      {children}
    </Dialog.Provider>
  );
}

type SandboxErrorBoundaryProps = {
  children: ReactNode;
};

type SandboxErrorBoundaryState = {
  hasError: boolean;
  message: string;
};

/** Keep portal crashes inside the iframe — do not blank the docs page. */
class SandboxErrorBoundary extends React.Component<
  SandboxErrorBoundaryProps,
  SandboxErrorBoundaryState
> {
  state: SandboxErrorBoundaryState = { hasError: false, message: "" };

  static getDerivedStateFromError(error: unknown): SandboxErrorBoundaryState {
    const message =
      error instanceof Error
        ? error.message
        : typeof error === "string"
          ? error
          : "Unknown error";
    return { hasError: true, message };
  }

  componentDidCatch(error: unknown) {
    console.error("[ViraSandbox]", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            boxSizing: "border-box",
            padding: "1.25rem",
            color: "var(--global-muted, CanvasText)",
            fontFamily: "system-ui, sans-serif",
            fontSize: "0.875rem",
            whiteSpace: "pre-wrap",
          }}
        >
          Preview failed to render.
          {this.state.message ? `\n${this.state.message}` : null}
        </div>
      );
    }
    return this.props.children;
  }
}

export type ViraSandboxProps = {
  children: ReactNode;
  /** Accessible name for the canvas chrome. */
  label?: string;
  /**
   * Built-in foundation theme sheet for the iframe.
   * @defaultValue 'vira'
   */
  theme?: ViraSandboxTheme;
  /**
   * Force `data-mode` on the iframe `<html>` (`light` | `dark` | `inverted`).
   * Omit to follow the parent docs theme (`.dark` → `dark`, else `light`).
   * @defaultValue inherits parent
   */
  mode?: ViraSandboxMode;
  /** Mount Dialog.Provider + Indent shell (default true). */
  dialogShell?: boolean;
  /** Disable pointer events (autoplay demos). */
  inert?: boolean;
  /** Inner padding around children. */
  padded?: boolean;
  /**
   * Minimum preview canvas height in pixels. Iframe grows with portal
   * content so padded/centered demos keep equal whitespace (never clip it).
   * @defaultValue 200
   */
  height?: number;
  /**
   * Alias for `height` (kept for existing call sites).
   * @defaultValue 200
   */
  minHeight?: number;
  /**
   * Horizontal CSS `resize` on the iframe. Height still tracks portal content.
   * @defaultValue false
   */
  resizable?: boolean;
  /**
   * Alignment of portal children inside the canvas (block + inline).
   * Prefer `center` so demos sit in equal whitespace; use `start` only when
   * the pattern needs top/edge anchoring (full-bleed media, tall scroll).
   * @defaultValue center
   */
  vAlign?: "start" | "center";
  className?: string;
  style?: CSSProperties;
};

/**
 * Isolated ViraUI canvas for docs demos.
 * iframe `srcDoc` + `createPortal`. Theme, preflight, and all component sheets
 * are linked inside the frame via `import.meta.glob` (no manual CSS list).
 */
export function ViraSandbox({
  children,
  label = "ViraUI preview",
  theme = "vira",
  mode: modeProp,
  dialogShell = true,
  inert = false,
  padded = true,
  height,
  minHeight,
  resizable = false,
  vAlign = "center",
  className = "",
  style,
}: ViraSandboxProps) {
  const canvasHeight = height ?? minHeight ?? 200;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  /** Until user drags CSS resize, iframe width always tracks wrapper 100%. */
  const followWrapperWidthRef = useRef(true);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const [frameDoc, setFrameDoc] = useState<Document | null>(null);
  const [contentHeight, setContentHeight] = useState(canvasHeight);
  const [wrapperWidth, setWrapperWidth] = useState<number | null>(null);
  /** Skip iframe `srcDoc` on SSR — huge theme+component CSS payloads abort RSC streams. */
  const [clientReady, setClientReady] = useState(false);
  const [autoMode, setAutoMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    setClientReady(true);
  }, []);

  useEffect(() => {
    if (modeProp) {
      return;
    }
    const root = document.documentElement;
    const sync = () =>
      setAutoMode(root.classList.contains("dark") ? "dark" : "light");
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, [modeProp]);

  const mode: ViraSandboxMode = modeProp ?? autoMode;

  const srcDoc = useMemo(() => {
    const modeAttr = mode ? ` data-mode="${mode}"` : "";
    // Always auto-height so ResizeObserver can read true content size (fixed
    // 100% html/body clamps scrollHeight and eats centered padding).
    const fontLinks = THEME_FONT_HREFS[theme]
      .map(
        (href) =>
          `<link rel="stylesheet" href="${href}" data-vira-sandbox="font" />`,
      )
      .join("\n  ");
    const links = frameStylesheetHrefs(theme)
      .map(
        (href) =>
          `<link rel="stylesheet" href="${href}" data-vira-sandbox="frame" />`,
      )
      .join("\n  ");
    const baseCss = `${SANDBOX_LAYOUT_CSS}\n${THEME_FONT_REMAP_CSS[theme]}`;
    return `<!DOCTYPE html>
<html${modeAttr} data-vira-sandbox-auto-height="">
<head>
  <meta charset="utf-8" />
  <base target="_parent" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  ${fontLinks}
  ${links}
  <style data-vira-sandbox="base">${baseCss}</style>
</head>
<body>
  <div id="vira-sandbox-root"></div>
</body>
</html>`;
  }, [mode, theme]);

  const attach = useCallback(() => {
    const iframe = iframeRef.current;
    const doc = iframe?.contentDocument;
    if (!doc) {
      return;
    }
    const root = doc.getElementById("vira-sandbox-root");
    if (!root) {
      return;
    }

    doc.documentElement.setAttribute("data-mode", mode);
    doc.documentElement.setAttribute("data-vira-sandbox-auto-height", "");

    setFrameDoc(doc);
    setMountNode(root);
  }, [mode]);

  useEffect(() => {
    setMountNode(null);
    setFrameDoc(null);
    const id = window.requestAnimationFrame(() => attach());
    return () => window.cancelAnimationFrame(id);
  }, [srcDoc, attach]);

  useEffect(() => {
    if (!frameDoc) {
      return;
    }
    frameDoc.documentElement.setAttribute("data-mode", mode);
  }, [frameDoc, mode]);

  // Grow iframe with content (floor = canvasHeight) so center + padding never clip.
  useEffect(() => {
    if (!mountNode || !iframeRef.current) {
      return;
    }

    const iframe = iframeRef.current;
    const measureEl = mountNode.firstElementChild ?? mountNode;
    const sync = () => {
      const next = Math.max(
        measureEl.scrollHeight,
        mountNode.scrollHeight,
        canvasHeight,
      );
      setContentHeight(next);
      iframe.style.height = `${next}px`;
    };

    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(measureEl);
    if (measureEl !== mountNode) {
      ro.observe(mountNode);
    }
    return () => ro.disconnect();
  }, [mountNode, canvasHeight]);

  // Follow wrapper width until user manually resizes; always cap at wrapper 100%.
  useEffect(() => {
    if (!resizable) {
      followWrapperWidthRef.current = true;
      return;
    }
    const wrapper = wrapperRef.current;
    const iframe = iframeRef.current;
    if (!wrapper || !iframe) {
      return;
    }

    const syncWrapperWidth = () => {
      const next = wrapper.clientWidth;
      setWrapperWidth(next);
      if (followWrapperWidthRef.current || iframe.offsetWidth > next) {
        iframe.style.width = `${next}px`;
      }
    };

    // CSS resize handle is on the iframe — pointerup after drag decides follow vs lock.
    const onPointerDown = () => {
      const onPointerUp = () => {
        const max = wrapper.clientWidth;
        followWrapperWidthRef.current =
          Math.abs(iframe.offsetWidth - max) <= 1;
        if (followWrapperWidthRef.current) {
          iframe.style.width = `${max}px`;
        }
        window.removeEventListener("pointerup", onPointerUp);
      };
      window.addEventListener("pointerup", onPointerUp);
    };

    syncWrapperWidth();
    const wrapperRo = new ResizeObserver(syncWrapperWidth);
    wrapperRo.observe(wrapper);
    iframe.addEventListener("pointerdown", onPointerDown);
    return () => {
      wrapperRo.disconnect();
      iframe.removeEventListener("pointerdown", onPointerDown);
    };
  }, [resizable, mountNode]);

  const docContext = useMemo(
    () => ({
      document: frameDoc,
      window: frameDoc?.defaultView ?? null,
    }),
    [frameDoc],
  );

  const centered = "center" === vAlign;
  const frameHeight = contentHeight;

  const body = (
    <div
      style={{
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: centered ? "center" : "flex-start",
        alignItems: centered ? "center" : "stretch",
        inlineSize: "100%",
        minBlockSize: canvasHeight,
        padding: padded ? "1.25rem" : 0,
        pointerEvents: inert ? "none" : undefined,
      }}
    >
      {dialogShell ? <DialogShell>{children}</DialogShell> : children}
    </div>
  );

  return (
    <div
      ref={wrapperRef}
      className={`not-prose mb-3 -mx-1 overflow-hidden rounded-lg border border-fd-border/60 bg-fd-muted/40 ${className}`}
      style={style}
      role="img"
      aria-label={label}
    >
      {clientReady ? (
        <iframe
          ref={iframeRef}
          title={label}
          srcDoc={srcDoc}
          onLoad={attach}
          style={{
            display: "block",
            ...(resizable
              ? {
                  maxWidth: wrapperWidth ?? "100%",
                  minWidth: "12rem",
                  overflow: "auto",
                  resize: "horizontal",
                }
              : {
                  width: "100%",
                  overflow: "hidden",
                }),
            height: frameHeight,
            border: 0,
            background: "transparent",
          }}
        />
      ) : (
        <div style={{ display: "block", width: "100%", height: canvasHeight }} />
      )}
      {mountNode
        ? createPortal(
            <ViraSandboxDocContext.Provider value={docContext}>
              <SandboxErrorBoundary>{body}</SandboxErrorBoundary>
            </ViraSandboxDocContext.Provider>,
            mountNode,
          )
        : null}
    </div>
  );
}
