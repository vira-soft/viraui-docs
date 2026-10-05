"use client";

import { Dialog } from "@viraui/react";
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
import themeCssUrl from "@viraui/foundation/vira.css?url";
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

const FRAME_STYLESHEET_HREFS = [
  themeCssUrl,
  preflightCssUrl,
  ...COMPONENT_CSS_URLS,
];

/** Built-in foundation sheets — extend when theme swap lands. */
export type ViraSandboxTheme = "vira";

/** `data-mode` on the iframe `<html>` — force or inherit parent docs theme. */
export type ViraSandboxMode = "light" | "dark" | "inverted";

const GEIST_FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Geist:ital,wght@0,100..900;1,100..900&display=swap";

const SANDBOX_BASE_CSS = `
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
/* Theme tokens say "Geist Variable"; Google CSS registers "Geist". */
:root {
  --font-family-heading: Geist, "Geist Variable", system-ui, sans-serif;
  --font-family-body: Geist, "Geist Variable", system-ui, sans-serif;
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

export type ViraSandboxProps = {
  children: ReactNode;
  /** Accessible name for the canvas chrome. */
  label?: string;
  /** Foundation theme sheet (reserved for multi-theme swap). */
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
  theme: _theme = "vira",
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
  const [autoMode, setAutoMode] = useState<"light" | "dark">(() =>
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark")
      ? "dark"
      : "light",
  );

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
    const links = FRAME_STYLESHEET_HREFS.map(
      (href) =>
        `<link rel="stylesheet" href="${href}" data-vira-sandbox="frame" />`,
    ).join("\n  ");
    return `<!DOCTYPE html>
<html${modeAttr} data-vira-sandbox-auto-height="">
<head>
  <meta charset="utf-8" />
  <base target="_parent" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="stylesheet" href="${GEIST_FONT_HREF}" />
  ${links}
  <style data-vira-sandbox="base">${SANDBOX_BASE_CSS}</style>
</head>
<body>
  <div id="vira-sandbox-root"></div>
</body>
</html>`;
  }, [mode]);

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
      {mountNode
        ? createPortal(
            <ViraSandboxDocContext.Provider value={docContext}>
              {body}
            </ViraSandboxDocContext.Provider>,
            mountNode,
          )
        : null}
    </div>
  );
}
