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
// DS4DS COMPONENT REGISTRY
// =============================================================================

export interface ComponentInfo {
  key: string;
  name: string;
  category: string;
}

/**
 * Complete list of DS4DS components with their Figma component keys.
 * Organized by category for UI presentation.
 */
export const DS4DS_COMPONENT_CATEGORIES = {
  avatar: {
    label: "Avatar",
    components: [
      { name: "Avatar", key: "e978573d54b4b61133aaa9fb1287eef36df0e1ed" },
      { name: "Username", key: "06dd30dbb923f224be343051b7b12028a58f7c2a" },
      {
        name: "Avatar Number",
        key: "02be470b66ff4d2c85ada06efbe67317f8cc64f7",
      },
      { name: "Avatar Group", key: "e5496c2a096678c5554623ba200b676372433be7" },
    ],
  },
  badge: {
    label: "Badge",
    components: [
      { name: "Badge", key: "383eda2f42660613057a870cde686c7e8b076904" },
      { name: "Asset Badge", key: "16a4808ca941ac44a9b7cf20c9305578e8b1501a" },
      { name: "Text Badge", key: "0d1e3c485d118955784334f1cd0bdf004b16b155" },
      { name: "Pill Badge", key: "36a77f2b4ad268f7821d3976f21398c1a1900a98" },
    ],
  },
  button: {
    label: "Buttons",
    components: [
      { name: "Buttons", key: "1a45acec266bbb1bd1338744453eb9e33aa2af53" },
      { name: "Button Icon", key: "37a61a1f231653e5fe0d8fb5afeb561f1dfe3807" },
      { name: "Button Text", key: "1484a29ce5e8cd702dc12913d2b79a464d269227" },
    ],
  },
  navigation: {
    label: "Navigation",
    components: [
      { name: "Breadcrumbs", key: "8563670cf1d3591bd4f3af9d0156cc0a7d99dd0b" },
      { name: "Link", key: "7c987b097108e85d6b25ab2037f58013b41648da" },
    ],
  },
  checkbox: {
    label: "Checkbox",
    components: [
      {
        name: "Checkbox Icon",
        key: "0e360b2a80465d5bcbe6c218222fb5896351ed97",
      },
      {
        name: "Checkbox Item Icon",
        key: "0a0e2be0f6ece4620ef8d28b39ee6995656393b2",
      },
      {
        name: "CheckboxVector",
        key: "43e9aef5432cf48a3cf2b727a815872f717ba211",
      },
      {
        name: "Checkbox Item Vector",
        key: "b07ff3f8009f606c7537098bfa932d1e916206ac",
      },
    ],
  },
  chips: {
    label: "Chips",
    components: [
      { name: "Chips", key: "d785439063b42d9fbe449f3d19223cfa825a47bf" },
    ],
  },
  input: {
    label: "Text Input",
    components: [
      {
        name: "Text Input Outlined",
        key: "3fa0112d53708a35080dfd22530ebf3dbbbcdf4d",
      },
      {
        name: "Text Input Contained",
        key: "46e44149a998ceae1bdbff378c85818e4ecd89e6",
      },
      {
        name: "Text Input Underlined",
        key: "2ef5964e087304eaecb3887bb3b2441834450f21",
      },
    ],
  },
  select: {
    label: "Select Input",
    components: [
      {
        name: "Select Input Outlined",
        key: "bb1ce670f2e5eb30645a8381232c4ab166a56834",
      },
      {
        name: "Select Input Contained",
        key: "0aeeec1c853b6245284581b97e9f7c04f63e1f60",
      },
      {
        name: "Select Input Underlined",
        key: "cbba2e72a7ad213bef170e4856c5cc6d25f61025",
      },
    ],
  },
  textarea: {
    label: "Text Area",
    components: [
      {
        name: "Text Area Outlined",
        key: "cd98d2840dfb806c6d4565cf350241e5154b77e6",
      },
      {
        name: "Text Area Contained",
        key: "db19df1e8d74d68586027a3adedd40c52b242c26",
      },
      {
        name: "Text Area Underlined",
        key: "da1e71702ca3f2fa022054c190c88dfa36cb4d7e",
      },
    ],
  },
  numericInput: {
    label: "Numeric Input",
    components: [
      {
        name: "Numeric Input (Arrows) Outlined",
        key: "f6875ee813fd19313ff01f17878ae1bfdf26f188",
      },
      {
        name: "Numeric Input (Arrows) Contained",
        key: "707fc9732016ef5453e1f2bb6c80a484570ebf5e",
      },
      {
        name: "Numeric Input (Arrows) Underlined",
        key: "253d85ed1a71e4becb01a1678160ebc0f6480b47",
      },
      {
        name: "Numeric Input (Buttons) Outlined",
        key: "edafba6ef44ce824e754975cec86f294bc52c665",
      },
      {
        name: "Numeric Input (Buttons) Contained",
        key: "f09ecd4fa12ca25558f7ee9fc62e78a7c2aeb163",
      },
      {
        name: "Numeric Input (Buttons) Underlined",
        key: "c16a73a74fc69dcbd69b8207f268f998a7ff69af",
      },
      {
        name: "Numeric Input / Stepper 1",
        key: "0c7481e296b1aa2fd6a9ee723e862b1fb1bb0879",
      },
      {
        name: "Numeric Input / Stepper 2",
        key: "920d6e95c1ffe44c033a66901f5328e088b31f36",
      },
    ],
  },
  radio: {
    label: "Radio Button",
    components: [
      {
        name: "Radio Button / Icon",
        key: "d03856624a6be9ba50ce2bd04fc6df292ba35426",
      },
      {
        name: "Radio Button Item / Icon",
        key: "67b1272ac6d5fedbf7cba7f4e99224e463abe392",
      },
      {
        name: "Radio Button / Vector",
        key: "217f967a6f658672c005979c9bc388811c3eeeb4",
      },
      {
        name: "Radio Button Item / Vector",
        key: "7f58a9fa0837ad52cf63ae52b08ed7de88c359bd",
      },
    ],
  },
  slider: {
    label: "Slider",
    components: [
      {
        name: "Slider / Basic",
        key: "dd1c2930460d9e768df6faffb9c9ba43417e5484",
      },
      {
        name: "Slider / With Values",
        key: "f4e49f772d47b1af49984231de90d8a542b375ca",
      },
      {
        name: "Slider / With Values and Marks",
        key: "9e2e9be8c6a24798eaa859437c4ff892c3bd0727",
      },
    ],
  },
  search: {
    label: "Search",
    components: [
      {
        name: "Search / Simple / Outlined",
        key: "d1cbee420e90c775a15a3eee0e9e61bd32db4850",
      },
      {
        name: "Search / Simple / Contained",
        key: "76fee6a0f51aa738a7463096bc84059c1ea9dd1b",
      },
      {
        name: "Search / Simple / Underlined",
        key: "6555c6b1e3c06e769073ca627dc9259540b1c36e",
      },
      {
        name: "Search / Label and helper text / Outlined",
        key: "d17ab929f45a9a7fc16af3445762aa4b1ae0a995",
      },
      {
        name: "Search / Label and helper text / Contained",
        key: "c1cacd1f947a8218f0d3339ef2211861f712d2a8",
      },
      {
        name: "Search / Label and helper text / Underlined",
        key: "c03b44ca74712283b95b30126a6512b2bb6e060a",
      },
    ],
  },
  tabs: {
    label: "Tabs",
    components: [
      {
        name: "Tabs / Outline Tab Bar",
        key: "ad5a3f707653e91485fee7dea28e908ef701a8b9",
      },
      {
        name: "Tabs / Underlined Tab Bar 1",
        key: "37f62921ac921adc6f419a92b0080368e6e8f37e",
      },
      {
        name: "Tabs / Underlined Tab Bar 2",
        key: "65116e7221f23ed5e253ffc4b1c6ec03ab481ffd",
      },
      {
        name: "Tabs / Skeuomorphic tab Bar",
        key: "07b61cc201a0ccc2e8f2199b6baa24b20e692069",
      },
      {
        name: "Tabs / Raised tab Bar",
        key: "d12428eb3ea9017202790ad1fe14056e7e6465c3",
      },
      {
        name: "Tabs / Vertical tab Bar",
        key: "d620c1354238b843525344500fc6ec0f62d8d5b8",
      },
    ],
  },
  tooltip: {
    label: "Tooltip",
    components: [
      { name: "Tooltip", key: "f6ee011c5c55ec82079db4ae04cd80cb408daa05" },
      {
        name: "Tooltip / Outlined",
        key: "8dbe59d0fbd67af83c2f1eceb19b13e0e53e8acb",
      },
    ],
  },
  toggle: {
    label: "Toggle",
    components: [
      {
        name: "Toggle / Icon on knob",
        key: "bbe9c3a1d79cbcb7c35b2471d9bc10ca0a42d10e",
      },
      {
        name: "Toggle / Icon on body",
        key: "35e62944ba32040d4f3e90dd9639801da1e105c8",
      },
      {
        name: "Toggle / Text on body",
        key: "5d5898062c6a69ee15036293dfc731fedf5b3da5",
      },
      {
        name: "Toggle / Larger knob",
        key: "6a7c4232f96ecd7dc34a2a1248ecaed9d06d39e2",
      },
      {
        name: "Toggle / Toggle item",
        key: "83bc1f0e7c89e5499a5ea80b96713bc64691ea87",
      },
    ],
  },
  banner: {
    label: "Banner",
    components: [
      {
        name: "Banner / Contained",
        key: "4051ed5436e3160aa971fb070c97a0cd59d688d4",
      },
      {
        name: "Banner / Outlined",
        key: "5a1de1e94297fc047e6be6769178c2f96163c602",
      },
      {
        name: "Banner / With Partial Stroke",
        key: "8f76db1dc8d71f11cf8e6bae30da2121e8c86179",
      },
    ],
  },
  dropdown: {
    label: "Dropdown",
    components: [
      { name: "Dropdown", key: "048ccd15014ac0b119839f23aadee79469b32565" },
    ],
  },
  list: {
    label: "List",
    components: [
      {
        name: "List / Checkbox Items",
        key: "1cdfe656418316693a832522d346f137cf59aa86",
      },
      {
        name: "List / Radio Button Items",
        key: "aa3249c2a8b087154a85cb03fd3f4c80ba2c1528",
      },
      {
        name: "List / Dropdown Items",
        key: "5b6745cb2a4367277398e445de511932c6612d39",
      },
      {
        name: "List / Toggle Items",
        key: "e4227bd1b16933fd533d59c7282662f10acbc447",
      },
    ],
  },
  pagination: {
    label: "Pagination",
    components: [
      { name: "Pagination", key: "dff809ac67db6904c36d5b5fbdc77f6fa21a8488" },
      {
        name: "Pagination / Dots",
        key: "e9639f4d5177258881813e2d9d7d48268fd8d9c2",
      },
      {
        name: "Pagination / Controls",
        key: "22a930fe7e44c1b7abe7797029387fe7e2355bd3",
      },
    ],
  },
  progressBar: {
    label: "Progress Bar",
    components: [
      { name: "Progress Bar", key: "7435404a33616ed08206d7c68e112e7c080158c7" },
    ],
  },
  snackbar: {
    label: "Snackbar",
    components: [
      {
        name: "Snackbar / Basic",
        key: "a33ab6b5570daa01017f2b7886dfd7b50364e9a0",
      },
      {
        name: "Snackbar / Contained",
        key: "c9f564bfdb6c9756358b42dec83e4d597d018ccc",
      },
      {
        name: "Snackbar / Outlined",
        key: "ea0a2b089ca8665129b7e2fdb2daee49eeaca546",
      },
      {
        name: "Snackbar / Partial Stroke",
        key: "d99f6bbafc767e154a136205c201bde33a4676d1",
      },
    ],
  },
  toast: {
    label: "Toast",
    components: [
      {
        name: "Toast / Contained",
        key: "cbd96e5937c39584cdc24c65e77124257b5ec973",
      },
      {
        name: "Toast / Outlined",
        key: "6c025d09de3ac9deae7298b907123a32f733e4ac",
      },
      {
        name: "Toast / Partial Stroke",
        key: "7c5b45911920818e6024cb8815a45829eb6fcce2",
      },
    ],
  },
  card: {
    label: "Card",
    components: [
      { name: "Card / Empty", key: "51d884851eda63c5a84f5050a34e33b3932dc7ea" },
      {
        name: "Card / With Header and Footer",
        key: "7d9e007b76f1f7f33164d2195da568a64a87f74a",
      },
      {
        name: "Card / With Image",
        key: "e08ddcd5497b6fdaf55a9312be53e1d1a6126f18",
      },
    ],
  },
  datePicker: {
    label: "Date Picker",
    components: [
      { name: "Date picker", key: "d2b86bf1c334770e5ca39e9b47959931cd6d02c8" },
      { name: "Year picker", key: "a9df7c00beef7396876b3d3a5b69fa225f5819c9" },
      { name: "Month picker", key: "c9056dd6639510566e205d2ac8b572f0e1511f84" },
    ],
  },
  modal: {
    label: "Modal",
    components: [
      { name: "Modal", key: "b15987de0b80d9a9961b1a581e82ab23ac991c8b" },
    ],
  },
  progressIndicator: {
    label: "Progress Indicator",
    components: [
      {
        name: "Progress Indicator / 1",
        key: "82110e30c92a62c2db92bf3b643f930b30298c57",
      },
      {
        name: "Progress Indicator / 2",
        key: "abc98de5a5c3aa657061a367d38f45fa43d2d000",
      },
    ],
  },
  table: {
    label: "Table",
    components: [
      { name: "Table grid", key: "fd48337e270dce4c2462adb1f29a8869ca6b9d86" },
      {
        name: "Table columns",
        key: "c09bf6bf9d929ab656ad7aa4024a5823b32cb342",
      },
      { name: "Table rows", key: "4320038ee1afde6d5ddbc58355a196d4e03cfd0b" },
    ],
  },
} as const;

/**
 * Flat list of all DS4DS components for quick lookup
 */
export const DS4DS_ALL_COMPONENTS: ComponentInfo[] = Object.entries(
  DS4DS_COMPONENT_CATEGORIES
).flatMap(([categoryKey, category]) =>
  category.components.map((comp) => ({
    ...comp,
    category: categoryKey,
  }))
);

/**
 * Get component by name
 */
export function getComponentByName(name: string): ComponentInfo | undefined {
  return DS4DS_ALL_COMPONENTS.find((c) => c.name === name);
}

/**
 * Get component by key
 */
export function getComponentByKey(key: string): ComponentInfo | undefined {
  return DS4DS_ALL_COMPONENTS.find((c) => c.key === key);
}

/**
 * Get all component names
 */
export function getAllComponentNames(): string[] {
  return DS4DS_ALL_COMPONENTS.map((c) => c.name);
}

/**
 * Get components by category
 */
export function getComponentsByCategory(category: string): ComponentInfo[] {
  return DS4DS_ALL_COMPONENTS.filter((c) => c.category === category);
}

// =============================================================================
// SCHEMA STATS
// =============================================================================

export const SCHEMA_STATS = {
  totalVariables: ALL_VARIABLES.length,
  spacingVariables: SPACING_VARIABLES.length,
  borderVariables: ALL_BORDER_VARIABLES.length,
  themeVariables: ALL_THEME_VARIABLES.length,
  primitiveColorVariables: PRIMITIVE_COLOR_VARIABLES.length,
  totalComponents: DS4DS_ALL_COMPONENTS.length,
  componentCategories: Object.keys(DS4DS_COMPONENT_CATEGORIES).length,
  themeModes: THEME_MODES,
  lastUpdated: "2024-12-22",
  sourceFile: "https://www.figma.com/design/WNOcZbybSn7dAGjTMimIsJ/Kido---DS",
};
