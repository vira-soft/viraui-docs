import { createElement, type ReactNode } from "react";
import type { LoaderPlugin } from "fumadocs-core/source";
import { Icon } from "../components/common/icon";
import { hasViraIcon } from "./vira-icon-loaders";

/**
 * Resolve frontmatter / meta `icon` strings to `@viraui/icons` via shared `<Icon />`.
 * Drop-in replacement for `lucideIconsPlugin`.
 */
export function viraIconsPlugin(): LoaderPlugin {
  function replaceIcon<T extends { icon?: ReactNode }>(node: T): T {
    if (node.icon === undefined || typeof node.icon === "string") {
      node.icon = resolveIcon(node.icon);
    }
    return node;
  }

  return {
    name: "vira:icons",
    transformPageTree: {
      file: replaceIcon,
      folder: replaceIcon,
      separator: replaceIcon,
    },
  };
}

function resolveIcon(icon?: string): ReactNode {
  if (icon === undefined) return;
  if (!hasViraIcon(icon)) {
    console.warn(`[vira-icons-plugin] Unknown icon: ${icon}`);
    return;
  }
  return createElement(Icon, { name: icon });
}
