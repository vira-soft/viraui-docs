import * as icons from "@viraui/icons/react";
import type { ComponentType, SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & { size?: number | string };

type IconComponent = ComponentType<IconSvgProps>;

const iconMap = icons as Record<string, IconComponent>;

/** Sync registry (same tradeoff as `lucideIconsPlugin`) — avoids Vite emitting ~3k chunks. */
export function hasViraIcon(name: string) {
  return typeof iconMap[name] === "function" || typeof iconMap[name] === "object";
}

export function getViraIcon(name: string): IconComponent | undefined {
  const Comp = iconMap[name];
  if (typeof Comp !== "function" && typeof Comp !== "object") return;
  return Comp;
}
