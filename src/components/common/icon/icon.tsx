import { getViraIcon, type IconSvgProps } from "../../../lib/vira-icon-loaders";

export type IconProps = IconSvgProps & {
  name: string;
};

/** `@viraui/icons` glyph by PascalCase name (duo). Shared by sidebar + MDX. */
export function Icon({ name, ...props }: IconProps) {
  const Comp = getViraIcon(name);
  if (!Comp) {
    if (import.meta.env.DEV) {
      console.warn(`[vira-icon] unknown icon: ${name}`);
    }
    return null;
  }
  return <Comp {...props} />;
}
