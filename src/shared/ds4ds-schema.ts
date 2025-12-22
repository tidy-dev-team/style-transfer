/**
 * DS4DS (Kido-DS) Variable Schema
 *
 * This file contains the complete schema of variables from the DS4DS design system.
 * Source: https://www.figma.com/design/WNOcZbybSn7dAGjTMimIsJ/Kido---DS
 *
 * Generated from Figma Variables export (tokens.ts)
 * Last updated: 2024-12-22
 */

// =============================================================================
// TYPES
// =============================================================================

export type VariableType = "COLOR" | "NUMBER";
export type ThemeMode = "Light" | "Dark";

export interface VariableDefinition {
  name: string;
  type: VariableType;
  collection: string;
  description?: string;
  /** Reference to another variable (e.g., "{indigo.500}") */
  reference?: string;
}

// =============================================================================
// COLLECTIONS
// =============================================================================

export const COLLECTIONS = {
  SPACING: "spacing",
  BORDER: "border",
  THEME: "theme",
  TAILWIND: "Tailwind CSS v4.0.0",
} as const;

export const THEME_MODES: ThemeMode[] = ["Light", "Dark"];

// =============================================================================
// SPACING COLLECTION
// =============================================================================

export const SPACING_VALUES = [
  2, 4, 8, 10, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72,
  76, 80, 120, -24, -16, -12, -8, -4, -2,
] as const;

export const SPACING_VARIABLES: VariableDefinition[] = SPACING_VALUES.map(
  (value) => ({
    name: String(value),
    type: "NUMBER" as VariableType,
    collection: COLLECTIONS.SPACING,
    description: `${value}px spacing`,
  })
);

// =============================================================================
// BORDER COLLECTION - WIDTH
// =============================================================================

export const WIDTH_VARIABLES: VariableDefinition[] = [
  {
    name: "width/thin",
    type: "NUMBER",
    collection: COLLECTIONS.BORDER,
    description: "0.5px",
  },
  {
    name: "width/default",
    type: "NUMBER",
    collection: COLLECTIONS.BORDER,
    description: "1px",
  },
  {
    name: "width/medium",
    type: "NUMBER",
    collection: COLLECTIONS.BORDER,
    description: "1.5px",
  },
  {
    name: "width/thick",
    type: "NUMBER",
    collection: COLLECTIONS.BORDER,
    description: "2px",
  },
  {
    name: "width/extra-thick",
    type: "NUMBER",
    collection: COLLECTIONS.BORDER,
    description: "4px",
  },
];

// =============================================================================
// BORDER COLLECTION - RADIUS
// =============================================================================

export const RADIUS_SEMANTIC_VARIABLES: VariableDefinition[] = [
  {
    name: "radius/semantic/sharp",
    type: "NUMBER",
    collection: COLLECTIONS.BORDER,
    description: "0 - No radius",
    reference: "{radius.global.none}",
  },
  {
    name: "radius/semantic/tiny-elements",
    type: "NUMBER",
    collection: COLLECTIONS.BORDER,
    description: "2px",
    reference: "{radius.global.2}",
  },
  {
    name: "radius/semantic/small-elements",
    type: "NUMBER",
    collection: COLLECTIONS.BORDER,
    description: "4px",
    reference: "{radius.global.4}",
  },
  {
    name: "radius/semantic/small-controls",
    type: "NUMBER",
    collection: COLLECTIONS.BORDER,
    description: "6px - Checkboxes, small inputs",
    reference: "{radius.global.6}",
  },
  {
    name: "radius/semantic/large-controls",
    type: "NUMBER",
    collection: COLLECTIONS.BORDER,
    description: "8px - Buttons, inputs",
    reference: "{radius.global.8}",
  },
  {
    name: "radius/semantic/default-surface",
    type: "NUMBER",
    collection: COLLECTIONS.BORDER,
    description: "8px - Cards, panels",
    reference: "{radius.global.8}",
  },
  {
    name: "radius/semantic/large-surface",
    type: "NUMBER",
    collection: COLLECTIONS.BORDER,
    description: "12px - Modals, dialogs",
    reference: "{radius.global.12}",
  },
  {
    name: "radius/semantic/max",
    type: "NUMBER",
    collection: COLLECTIONS.BORDER,
    description: "1000px - Pills, avatars",
    reference: "{radius.global.max}",
  },
];

export const RADIUS_GLOBAL_VARIABLES: VariableDefinition[] = [
  {
    name: "radius/global/none",
    type: "NUMBER",
    collection: COLLECTIONS.BORDER,
    description: "0",
  },
  {
    name: "radius/global/2",
    type: "NUMBER",
    collection: COLLECTIONS.BORDER,
    description: "2px",
  },
  {
    name: "radius/global/4",
    type: "NUMBER",
    collection: COLLECTIONS.BORDER,
    description: "4px",
  },
  {
    name: "radius/global/6",
    type: "NUMBER",
    collection: COLLECTIONS.BORDER,
    description: "6px",
  },
  {
    name: "radius/global/8",
    type: "NUMBER",
    collection: COLLECTIONS.BORDER,
    description: "8px",
  },
  {
    name: "radius/global/12",
    type: "NUMBER",
    collection: COLLECTIONS.BORDER,
    description: "12px",
  },
  {
    name: "radius/global/16",
    type: "NUMBER",
    collection: COLLECTIONS.BORDER,
    description: "16px",
  },
  {
    name: "radius/global/20",
    type: "NUMBER",
    collection: COLLECTIONS.BORDER,
    description: "20px",
  },
  {
    name: "radius/global/24",
    type: "NUMBER",
    collection: COLLECTIONS.BORDER,
    description: "24px",
  },
  {
    name: "radius/global/32",
    type: "NUMBER",
    collection: COLLECTIONS.BORDER,
    description: "32px",
  },
  {
    name: "radius/global/max",
    type: "NUMBER",
    collection: COLLECTIONS.BORDER,
    description: "1000px",
  },
];

// =============================================================================
// THEME COLLECTION - SYSTEM COLORS
// =============================================================================

export const SYSTEM_BG_VARIABLES: VariableDefinition[] = [
  {
    name: "system/bg/primary",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "Primary brand background",
    reference: "{indigo.500}",
  },
  {
    name: "system/bg/inverse",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "Inverse background",
  },
  {
    name: "system/bg/01",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "Background level 01",
  },
  {
    name: "system/bg/02",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "Background level 02",
  },
  {
    name: "system/bg/03",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "Background level 03",
  },
  {
    name: "system/bg/04",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "Background level 04",
  },
  {
    name: "system/bg/disabled",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "Disabled background",
  },
  {
    name: "system/bg/disabled-inverse",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "Disabled background on inverse",
  },
];

export const SYSTEM_FG_VARIABLES: VariableDefinition[] = [
  {
    name: "system/fg/primary",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "Primary brand foreground",
    reference: "{indigo.500}",
  },
  {
    name: "system/fg/inverse",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "Inverse foreground",
  },
  {
    name: "system/fg/01",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "Primary text",
  },
  {
    name: "system/fg/02",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "Secondary text",
  },
  {
    name: "system/fg/03",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "Tertiary text",
  },
  {
    name: "system/fg/white",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "White foreground",
  },
  {
    name: "system/fg/black",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "Black foreground",
  },
  {
    name: "system/fg/hover",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "Hover state foreground",
  },
  {
    name: "system/fg/active",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "Active state foreground",
  },
  {
    name: "system/fg/selected",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "Selected state foreground",
  },
  {
    name: "system/fg/disabled",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "Disabled foreground",
  },
  {
    name: "system/fg/disabled-inverse",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "Disabled foreground on inverse",
  },
];

export const SYSTEM_BORDER_STATIC_VARIABLES: VariableDefinition[] = [
  {
    name: "system/border/static/01",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "Static border level 01",
  },
  {
    name: "system/border/static/02",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "Static border level 02",
  },
  {
    name: "system/border/static/03",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "Static border level 03",
  },
];

export const SYSTEM_BORDER_INTERACTIVE_VARIABLES: VariableDefinition[] = [
  {
    name: "system/border/interactive/01-idle",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "Interactive border 01 idle",
  },
  {
    name: "system/border/interactive/02-idle",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "Interactive border 02 idle",
  },
  {
    name: "system/border/interactive/03-idle",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "Interactive border 03 idle",
  },
  {
    name: "system/border/interactive/03-idle-inverse",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "Interactive border 03 idle on inverse",
  },
  {
    name: "system/border/interactive/hover",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "Interactive border hover",
  },
  {
    name: "system/border/interactive/hover-inverse",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "Interactive border hover on inverse",
  },
  {
    name: "system/border/interactive/active",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "Interactive border active",
  },
  {
    name: "system/border/interactive/active-inverse",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "Interactive border active on inverse",
  },
  {
    name: "system/border/interactive/selected",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "Interactive border selected",
  },
  {
    name: "system/border/interactive/focused",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "Interactive border focused",
  },
  {
    name: "system/border/interactive/disabled",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "Interactive border disabled",
  },
  {
    name: "system/border/interactive/disabled-inverse",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "Interactive border disabled on inverse",
  },
];

export const SYSTEM_FEEDBACK_VARIABLES: VariableDefinition[] = [
  // Danger
  {
    name: "system/feedback/danger/subtle",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  {
    name: "system/feedback/danger/medium",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  {
    name: "system/feedback/danger/strong",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  // Success
  {
    name: "system/feedback/success/subtle",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  {
    name: "system/feedback/success/medium",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  {
    name: "system/feedback/success/strong",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  // Warning
  {
    name: "system/feedback/warning/subtle",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  {
    name: "system/feedback/warning/medium",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  {
    name: "system/feedback/warning/strong",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  // Info
  {
    name: "system/feedback/info/subtle",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  {
    name: "system/feedback/info/medium",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  {
    name: "system/feedback/info/strong",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  // Neutral
  {
    name: "system/feedback/neutral/subtle",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  {
    name: "system/feedback/neutral/medium",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  {
    name: "system/feedback/neutral/strong",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
];

export const SYSTEM_SEVERITY_VARIABLES: VariableDefinition[] = [
  {
    name: "system/severity/critical",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  {
    name: "system/severity/medium",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  { name: "system/severity/low", type: "COLOR", collection: COLLECTIONS.THEME },
  {
    name: "system/severity/info",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
];

export const SYSTEM_OVERLAYS_VARIABLES: VariableDefinition[] = [
  {
    name: "system/overlays/overlay-hover-on-color",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "Hover overlay on colored background",
  },
  {
    name: "system/overlays/overlay-active-on-color",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "Active overlay on colored background",
  },
  {
    name: "system/overlays/overlay-hover",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "Hover overlay on neutral background",
  },
  {
    name: "system/overlays/overlay-active",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "Active overlay on neutral background",
  },
  {
    name: "system/overlays/tonal-offset-lighter",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "Tonal offset lighter",
  },
  {
    name: "system/overlays/tonal-offset-darker",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "Tonal offset darker",
  },
];

// =============================================================================
// THEME COLLECTION - COMPONENT COLORS
// =============================================================================

export const COMPONENT_BUTTON_VARIABLES: VariableDefinition[] = [
  // Contained inverse
  {
    name: "components/button/contained-inverse/bg-idle",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  // Outlined
  {
    name: "components/button/outlined/bg-hover",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "primary @ 20%",
  },
  {
    name: "components/button/outlined/bg-pressed",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
    description: "primary @ 38%",
  },
  // Outlined inverse
  {
    name: "components/button/outlined-inverse/bg-hover",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  {
    name: "components/button/outlined-inverse/bg-pressed",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  // Text
  {
    name: "components/button/text/fg-idle",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  {
    name: "components/button/text/fg-hover",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  {
    name: "components/button/text/fg-active",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  // Text inverse
  {
    name: "components/button/text-inverse/fg-idle",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  {
    name: "components/button/text-inverse/fg-hover",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  {
    name: "components/button/text-inverse/fg-active",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
];

export const COMPONENT_INPUT_VARIABLES: VariableDefinition[] = [
  {
    name: "components/input/bg-default",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  {
    name: "components/input/bg-active",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
];

export const COMPONENT_OTHER_VARIABLES: VariableDefinition[] = [
  // Avatar
  {
    name: "components/avatar/bg",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  // Chip
  { name: "components/chip/bg", type: "COLOR", collection: COLLECTIONS.THEME },
  // Slider
  {
    name: "components/slider/bg",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  // Link
  {
    name: "components/link/idle",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  {
    name: "components/link/pressed",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  // Tooltip
  {
    name: "components/tooltip/bg",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  {
    name: "components/tooltip/bg-inverse",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  // Toggle
  {
    name: "components/toggle/bg-off-default",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  {
    name: "components/toggle/bg-on-default",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  {
    name: "components/toggle/bg-on-disabled",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  {
    name: "components/toggle/knob-on-disabled",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  {
    name: "components/toggle/knob-off-disabled",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  {
    name: "components/toggle/fg-off-on-knob-disabled",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  {
    name: "components/toggle/fg-on-on-knob-disabled",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  // Table
  {
    name: "components/table/bg-default",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  {
    name: "components/table/bg-alt",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
];

// =============================================================================
// THEME COLLECTION - ALPHA COLORS
// =============================================================================

const ALPHA_LEVELS = ["4p", "8p", "12p", "20p", "38p", "50p"] as const;

export const ALPHA_PRIMARY_VARIABLES: VariableDefinition[] = [
  ...ALPHA_LEVELS.map((level) => ({
    name: `alpha/primary/500-${level}`,
    type: "COLOR" as VariableType,
    collection: COLLECTIONS.THEME,
    description: `Primary color at ${level.replace("p", "%")} opacity`,
  })),
  {
    name: "alpha/primary/400-20p",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  {
    name: "alpha/primary/400-38p",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
];

export const ALPHA_NEUTRAL_VARIABLES: VariableDefinition[] = ALPHA_LEVELS.map(
  (level) => ({
    name: `alpha/neutral/500-${level}`,
    type: "COLOR" as VariableType,
    collection: COLLECTIONS.THEME,
    description: `Neutral color at ${level.replace("p", "%")} opacity`,
  })
);

export const ALPHA_WHITE_VARIABLES: VariableDefinition[] = [
  { name: "alpha/white/4p", type: "COLOR", collection: COLLECTIONS.THEME },
  { name: "alpha/white/6p", type: "COLOR", collection: COLLECTIONS.THEME },
  { name: "alpha/white/10p", type: "COLOR", collection: COLLECTIONS.THEME },
  { name: "alpha/white/12p", type: "COLOR", collection: COLLECTIONS.THEME },
  { name: "alpha/white/15p", type: "COLOR", collection: COLLECTIONS.THEME },
  { name: "alpha/white/20p", type: "COLOR", collection: COLLECTIONS.THEME },
  { name: "alpha/white/38p", type: "COLOR", collection: COLLECTIONS.THEME },
  { name: "alpha/white/50p", type: "COLOR", collection: COLLECTIONS.THEME },
];

export const ALPHA_BLACK_VARIABLES: VariableDefinition[] = [
  {
    name: "alpha/black/black-4p",
    type: "COLOR",
    collection: COLLECTIONS.THEME,
  },
  { name: "alpha/black/6p", type: "COLOR", collection: COLLECTIONS.THEME },
  { name: "alpha/black/8p", type: "COLOR", collection: COLLECTIONS.THEME },
  { name: "alpha/black/10p", type: "COLOR", collection: COLLECTIONS.THEME },
  { name: "alpha/black/12p", type: "COLOR", collection: COLLECTIONS.THEME },
  { name: "alpha/black/20p", type: "COLOR", collection: COLLECTIONS.THEME },
  { name: "alpha/black/38p", type: "COLOR", collection: COLLECTIONS.THEME },
  { name: "alpha/black/50p", type: "COLOR", collection: COLLECTIONS.THEME },
];

export const ALPHA_SEMANTIC_VARIABLES: VariableDefinition[] = [
  // Danger
  ...ALPHA_LEVELS.map((level) => ({
    name: `alpha/danger/500-${level}`,
    type: "COLOR" as VariableType,
    collection: COLLECTIONS.THEME,
  })),
  // Success
  ...ALPHA_LEVELS.map((level) => ({
    name: `alpha/success/500-${level}`,
    type: "COLOR" as VariableType,
    collection: COLLECTIONS.THEME,
  })),
  // Info
  ...ALPHA_LEVELS.map((level) => ({
    name: `alpha/info/500-${level}`,
    type: "COLOR" as VariableType,
    collection: COLLECTIONS.THEME,
  })),
  // Warning
  ...ALPHA_LEVELS.map((level) => ({
    name: `alpha/warning/500-${level}`,
    type: "COLOR" as VariableType,
    collection: COLLECTIONS.THEME,
  })),
];

// =============================================================================
// THEME COLLECTION - SHADOWS
// =============================================================================

export const SHADOW_VARIABLES: VariableDefinition[] = [
  { name: "shadows/s/color-1", type: "COLOR", collection: COLLECTIONS.THEME },
  { name: "shadows/s/color-2", type: "COLOR", collection: COLLECTIONS.THEME },
  { name: "shadows/m/color-1", type: "COLOR", collection: COLLECTIONS.THEME },
  { name: "shadows/m/color-2", type: "COLOR", collection: COLLECTIONS.THEME },
  { name: "shadows/l/color-1", type: "COLOR", collection: COLLECTIONS.THEME },
  { name: "shadows/l/color-2", type: "COLOR", collection: COLLECTIONS.THEME },
];

// =============================================================================
// PRIMITIVE COLORS (TAILWIND PALETTE)
// =============================================================================

const COLOR_SCALES = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "950",
] as const;

const TAILWIND_COLOR_NAMES = [
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
] as const;

export const PRIMITIVE_COLOR_VARIABLES: VariableDefinition[] = [
  { name: "transparent", type: "COLOR", collection: COLLECTIONS.TAILWIND },
  { name: "black", type: "COLOR", collection: COLLECTIONS.TAILWIND },
  { name: "white", type: "COLOR", collection: COLLECTIONS.TAILWIND },
  ...TAILWIND_COLOR_NAMES.flatMap((colorName) =>
    COLOR_SCALES.map((scale) => ({
      name: `${colorName}/${scale}`,
      type: "COLOR" as VariableType,
      collection: COLLECTIONS.TAILWIND,
    }))
  ),
];

// =============================================================================
// AGGREGATED EXPORTS
// =============================================================================

export const ALL_SYSTEM_VARIABLES: VariableDefinition[] = [
  ...SYSTEM_BG_VARIABLES,
  ...SYSTEM_FG_VARIABLES,
  ...SYSTEM_BORDER_STATIC_VARIABLES,
  ...SYSTEM_BORDER_INTERACTIVE_VARIABLES,
  ...SYSTEM_FEEDBACK_VARIABLES,
  ...SYSTEM_SEVERITY_VARIABLES,
  ...SYSTEM_OVERLAYS_VARIABLES,
];

export const ALL_COMPONENT_VARIABLES: VariableDefinition[] = [
  ...COMPONENT_BUTTON_VARIABLES,
  ...COMPONENT_INPUT_VARIABLES,
  ...COMPONENT_OTHER_VARIABLES,
];

export const ALL_ALPHA_VARIABLES: VariableDefinition[] = [
  ...ALPHA_PRIMARY_VARIABLES,
  ...ALPHA_NEUTRAL_VARIABLES,
  ...ALPHA_WHITE_VARIABLES,
  ...ALPHA_BLACK_VARIABLES,
  ...ALPHA_SEMANTIC_VARIABLES,
];

export const ALL_THEME_VARIABLES: VariableDefinition[] = [
  ...ALL_SYSTEM_VARIABLES,
  ...ALL_COMPONENT_VARIABLES,
  ...ALL_ALPHA_VARIABLES,
  ...SHADOW_VARIABLES,
];

export const ALL_BORDER_VARIABLES: VariableDefinition[] = [
  ...WIDTH_VARIABLES,
  ...RADIUS_SEMANTIC_VARIABLES,
  ...RADIUS_GLOBAL_VARIABLES,
];

export const ALL_VARIABLES: VariableDefinition[] = [
  ...SPACING_VARIABLES,
  ...ALL_BORDER_VARIABLES,
  ...ALL_THEME_VARIABLES,
  ...PRIMITIVE_COLOR_VARIABLES,
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get all variable names as a flat array
 */
export function getAllVariableNames(): string[] {
  return ALL_VARIABLES.map((v) => v.name);
}

/**
 * Get variables by type
 */
export function getVariablesByType(type: VariableType): VariableDefinition[] {
  return ALL_VARIABLES.filter((v) => v.type === type);
}

/**
 * Get variables by collection
 */
export function getVariablesByCollection(
  collection: string
): VariableDefinition[] {
  return ALL_VARIABLES.filter((v) => v.collection === collection);
}

/**
 * Search variables by name pattern
 */
export function searchVariables(pattern: string): VariableDefinition[] {
  const lowerPattern = pattern.toLowerCase();
  return ALL_VARIABLES.filter((v) =>
    v.name.toLowerCase().includes(lowerPattern)
  );
}

/**
 * Get variable by exact name
 */
export function getVariableByName(
  name: string
): VariableDefinition | undefined {
  return ALL_VARIABLES.find((v) => v.name === name);
}

/**
 * Get all color variables (for style transfer)
 */
export function getColorVariables(): VariableDefinition[] {
  return ALL_VARIABLES.filter((v) => v.type === "COLOR");
}

/**
 * Get semantic radius variables (most commonly used for style transfer)
 */
export function getSemanticRadiusVariables(): VariableDefinition[] {
  return RADIUS_SEMANTIC_VARIABLES;
}

// =============================================================================
// STYLE TRANSFER - KEY VARIABLES FOR MAPPING
// =============================================================================

/**
 * Primary tokens that should be mapped when transferring styles.
 * These are the "high impact" variables that define the brand look.
 */
export const STYLE_TRANSFER_PRIMARY_TARGETS = {
  /** Primary brand color - affects buttons, links, focus states */
  primaryColor: [
    "system/bg/primary",
    "system/fg/primary",
    "system/fg/hover",
    "system/fg/active",
    "system/fg/selected",
    "system/border/interactive/hover",
    "system/border/interactive/active",
    "system/border/interactive/selected",
  ],

  /** Derived alpha colors from primary */
  primaryAlpha: [
    "alpha/primary/500-4p",
    "alpha/primary/500-8p",
    "alpha/primary/500-12p",
    "alpha/primary/500-20p",
    "alpha/primary/500-38p",
    "alpha/primary/500-50p",
    "components/button/outlined/bg-hover",
    "components/button/outlined/bg-pressed",
    "system/border/interactive/focused",
  ],

  /** Border radius - defines the overall shape language */
  radius: [
    "radius/semantic/small-controls",
    "radius/semantic/large-controls",
    "radius/semantic/default-surface",
    "radius/semantic/large-surface",
  ],

  /** Neutral text colors */
  textColors: ["system/fg/01", "system/fg/02", "system/fg/03"],

  /** Background colors */
  backgrounds: ["system/bg/01", "system/bg/02", "system/bg/03", "system/bg/04"],
} as const;

// =============================================================================
// COMPONENT → VARIABLE MAPPINGS
// =============================================================================

/**
 * Maps semantic component selections to DS4DS variable targets
 */
export const COMPONENT_TO_VARIABLE_MAP = {
  button: {
    contained: {
      background: ["system/bg/primary"],
      text: ["system/fg/inverse", "system/fg/white"],
      hoverOverlay: ["system/overlays/overlay-hover-on-color"],
      activeOverlay: ["system/overlays/overlay-active-on-color"],
      radius: ["radius/semantic/large-controls"],
    },
    outlined: {
      background: [
        "components/button/outlined/bg-hover",
        "components/button/outlined/bg-pressed",
      ],
      border: [
        "system/border/interactive/hover",
        "system/border/interactive/active",
      ],
      text: ["system/fg/primary", "system/fg/hover", "system/fg/active"],
      radius: ["radius/semantic/large-controls"],
    },
    ghost: {
      background: [
        "system/overlays/overlay-hover",
        "system/overlays/overlay-active",
      ],
      text: ["system/fg/primary", "system/fg/hover", "system/fg/active"],
      radius: ["radius/semantic/large-controls"],
    },
    text: {
      text: [
        "components/button/text/fg-idle",
        "components/button/text/fg-hover",
        "components/button/text/fg-active",
      ],
    },
  },
  input: {
    default: {
      background: ["components/input/bg-default", "components/input/bg-active"],
      border: [
        "system/border/interactive/02-idle",
        "system/border/interactive/hover",
        "system/border/interactive/focused",
      ],
      text: ["system/fg/01"],
      placeholder: ["system/fg/03"],
      radius: ["radius/semantic/large-controls"],
    },
  },
  toggle: {
    default: {
      trackOff: ["components/toggle/bg-off-default"],
      trackOn: ["components/toggle/bg-on-default", "system/bg/primary"],
      radius: ["radius/semantic/max"],
    },
  },
  card: {
    default: {
      background: ["system/bg/01", "system/bg/02"],
      border: ["system/border/static/03"],
      radius: [
        "radius/semantic/default-surface",
        "radius/semantic/large-surface",
      ],
    },
  },
  chip: {
    default: {
      background: ["components/chip/bg"],
      text: ["system/fg/01"],
      radius: ["radius/semantic/max"],
    },
  },
  tooltip: {
    default: {
      background: ["components/tooltip/bg"],
      text: ["system/fg/01"],
      radius: ["radius/semantic/small-elements"],
    },
    inverse: {
      background: ["components/tooltip/bg-inverse"],
      text: ["system/fg/inverse"],
    },
  },
} as const;

// =============================================================================
// SCHEMA STATS
// =============================================================================

export const SCHEMA_STATS = {
  totalVariables: ALL_VARIABLES.length,
  spacingVariables: SPACING_VARIABLES.length,
  borderVariables: ALL_BORDER_VARIABLES.length,
  themeVariables: ALL_THEME_VARIABLES.length,
  primitiveColorVariables: PRIMITIVE_COLOR_VARIABLES.length,
  themeModes: THEME_MODES,
  lastUpdated: "2024-12-22",
  sourceFile: "https://www.figma.com/design/WNOcZbybSn7dAGjTMimIsJ/Kido---DS",
};
