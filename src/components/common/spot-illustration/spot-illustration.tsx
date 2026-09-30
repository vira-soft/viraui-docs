import foundation from "../../../illustrations/core-foundation.svg?raw";
import components from "../../../illustrations/core-components.svg?raw";
import motion from "../../../illustrations/core-motion.svg?raw";
import ai from "../../../illustrations/core-ai.svg?raw";
import studio from "../../../illustrations/pro-studio.svg?raw";
import prompts from "../../../illustrations/pro-prompts.svg?raw";
import layersFoundation from "../../../illustrations/layers-foundation.svg?raw";
import layersComponents from "../../../illustrations/layers-components.svg?raw";
import layersMotion from "../../../illustrations/layers-motion.svg?raw";
import layersAi from "../../../illustrations/layers-ai.svg?raw";
import foundationThemesAndBrand from "../../../illustrations/foundation-themes-and-brand.svg?raw";
import foundationColors from "../../../illustrations/foundation-colors.svg?raw";
import foundationMotion from "../../../illustrations/foundation-motion.svg?raw";
import foundationElevation from "../../../illustrations/foundation-elevation.svg?raw";
import foundationElevationLayers from "../../../illustrations/foundation-elevation-layers.svg?raw";
import foundationEffects from "../../../illustrations/foundation-effects.svg?raw";
import foundationTypography from "../../../illustrations/foundation-typography.svg?raw";
import foundationSpace from "../../../illustrations/foundation-space.svg?raw";
import foundationRadius from "../../../illustrations/foundation-radius.svg?raw";
import foundationIcons from "../../../illustrations/foundation-icons.svg?raw";
import componentsActions from "../../../illustrations/components-actions.svg?raw";
import componentsDialogs from "../../../illustrations/components-dialogs.svg?raw";
import componentsEffects from "../../../illustrations/components-effects.svg?raw";

const ART = {
  foundation,
  components,
  motion,
  ai,
  studio,
  prompts,
  "layers-foundation": layersFoundation,
  "layers-components": layersComponents,
  "layers-motion": layersMotion,
  "layers-ai": layersAi,
  "foundation-themes-and-brand": foundationThemesAndBrand,
  "foundation-colors": foundationColors,
  "foundation-motion": foundationMotion,
  "foundation-elevation": foundationElevation,
  "foundation-elevation-layers": foundationElevationLayers,
  "foundation-effects": foundationEffects,
  "foundation-typography": foundationTypography,
  "foundation-space": foundationSpace,
  "foundation-radius": foundationRadius,
  "foundation-icons": foundationIcons,
  "components-actions": componentsActions,
  "components-dialogs": componentsDialogs,
  "components-effects": componentsEffects,
} as const;

export type SpotIllustrationName = keyof typeof ART;

/** Inline spotkit SVG so `--il-*` tokens follow light/dark theme. */
export function SpotIllustration({ name }: { name: SpotIllustrationName }) {
  return (
    <div
      className="not-prose mb-3 -mx-1 overflow-hidden rounded-lg border border-fd-border/60 bg-fd-muted/40 [&_svg]:block [&_svg]:w-full [&_svg]:h-auto"
      // ponytail: raw SVG markup — CSS vars need inline, not <img>
      dangerouslySetInnerHTML={{ __html: ART[name] }}
    />
  );
}
