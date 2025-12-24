# Style Transfer Plugin - Implementation Plan

## Overview

A Figma plugin that extracts styles from ideation files (client designs, Figma Make outputs) and applies them to DS4DS (Kido-DS) to quickly generate client-specific design systems.

**Single plugin, two operational modes:**

- **Extract Mode** - Run in source/ideation file to capture styles
- **Apply Mode** - Run in target DS file to apply captured styles

---

## DS4DS Structure Reference

Based on actual Figma Variables export from Kido-DS (`WNOcZbybSn7dAGjTMimIsJ`):

### Variable Collections

| Collection              | Mode(s)         | Content                                                |
| ----------------------- | --------------- | ------------------------------------------------------ |
| **spacing**             | Mode 1          | 30 spacing values (2-120px, negatives)                 |
| **border**              | Mode 1          | Width tokens + Radius tokens                           |
| **theme**               | **Light, Dark** | System colors, Component colors, Alpha colors, Shadows |
| **Tailwind CSS v4.0.0** | Mode 1          | Primitive color palette                                |

### Key Token Categories

| Category         | Examples                                                            | Notes                        |
| ---------------- | ------------------------------------------------------------------- | ---------------------------- |
| System BG        | `system/bg/primary`, `system/bg/01`...`04`, `system/bg/inverse`     | Background colors            |
| System FG        | `system/fg/01`...`03`, `system/fg/primary`, `system/fg/disabled`    | Text/foreground colors       |
| System Border    | `system/border/static/01`...`03`, `system/border/interactive/hover` | Border colors                |
| System Overlays  | `system/overlays/overlay-hover`, `overlay-active`                   | Overlay colors               |
| System Feedback  | `system/feedback/danger/subtle\|medium\|strong`                     | Semantic feedback            |
| Component Tokens | `components/button/outlined/bg-hover`                               | Component-specific overrides |
| Radius Semantic  | `radius/semantic/large-controls` (8px), `small-controls` (6px)      | Border radius                |
| Radius Global    | `radius/global/2`, `4`, `6`, `8`, `12`...                           | Raw radius values            |
| Width            | `width/thin` (0.5), `default` (1), `thick` (2)                      | Stroke widths                |
| Alpha            | `alpha/primary/500-20p`, `alpha/white/12p`                          | Opacity variants             |

### Radius Semantic Values

| Token             | Value  | Use Case                 |
| ----------------- | ------ | ------------------------ |
| `sharp`           | 0      | No radius                |
| `tiny-elements`   | 2px    | Very small elements      |
| `small-elements`  | 4px    | Small elements           |
| `small-controls`  | 6px    | Checkboxes, small inputs |
| `large-controls`  | 8px    | Buttons, inputs          |
| `default-surface` | 8px    | Cards, panels            |
| `large-surface`   | 12px   | Modals, dialogs          |
| `max`             | 1000px | Pills, avatars           |

### Alpha Color Levels

Primary color opacity variants: `4p`, `8p`, `12p`, `20p`, `38p`, `50p`

Example: `#615fff` (indigo.500) generates:

- `alpha/primary/500-20p` → `rgba(97, 95, 255, 0.20)` for outlined button hover
- `alpha/primary/500-38p` → `rgba(97, 95, 255, 0.38)` for outlined button pressed

---

## DS4DS Components (89 total)

Full component list organized by category:

| Category    | Components                                                                                                                |
| ----------- | ------------------------------------------------------------------------------------------------------------------------- |
| Avatar      | Avatar, Username, Avatar Number, Avatar Group                                                                             |
| Badge       | Badge, Asset Badge, Text Badge, Pill Badge                                                                                |
| Buttons     | Buttons, Button Icon, Button Text                                                                                         |
| Checkbox    | Checkbox Icon, Checkbox Item Icon, CheckboxVector, Checkbox Item Vector                                                   |
| Chips       | Chips                                                                                                                     |
| Inputs      | Text Input (Outlined/Contained/Underlined), Select Input (3 variants), Text Area (3 variants), Numeric Input (8 variants) |
| Radio       | Radio Button / Icon, Radio Button Item / Icon, etc.                                                                       |
| Slider      | Basic, With Values, With Values and Marks                                                                                 |
| Search      | 6 variants (Simple + Label, each in 3 styles)                                                                             |
| Tabs        | 6 tab bar variants                                                                                                        |
| Toggle      | 5 toggle variants                                                                                                         |
| Tooltip     | Tooltip, Tooltip / Outlined                                                                                               |
| Banner      | Contained, Outlined, With Partial Stroke                                                                                  |
| Dropdown    | Dropdown                                                                                                                  |
| List        | Checkbox Items, Radio Button Items, Dropdown Items, Toggle Items                                                          |
| Pagination  | Pagination, Dots, Controls                                                                                                |
| Progress    | Progress Bar, Progress Indicator (2 variants)                                                                             |
| Snackbar    | Basic, Contained, Outlined, Partial Stroke                                                                                |
| Toast       | Contained, Outlined, Partial Stroke                                                                                       |
| Card        | Empty, With Header and Footer, With Image                                                                                 |
| Date Picker | Date picker, Year picker, Month picker                                                                                    |
| Modal       | Modal                                                                                                                     |
| Table       | Grid, Columns, Rows                                                                                                       |

**All component keys are stored in `src/shared/ds4ds-schema.ts`.**

---

## Architecture

### File Structure

```
src/
├── main.ts                    # Plugin entry, mode switching
├── ui.tsx                     # Main UI with mode tabs
├── types.ts                   # Shared TypeScript types
│
├── extract/
│   ├── ExtractUI.tsx          # Extract mode UI component
│   ├── extractors/
│   │   ├── index.ts           # Extractor registry
│   │   ├── fill.ts            # Fill/color extraction
│   │   ├── stroke.ts          # Stroke extraction
│   │   ├── radius.ts          # Corner radius extraction
│   │   └── spacing.ts         # Padding/gap extraction
│   └── derivation.ts          # Color derivation logic (opacity variants)
│
├── apply/
│   ├── ApplyUI.tsx            # Apply mode UI component
│   ├── mapper.ts              # JSON → Variable mapping logic
│   ├── preview.ts             # Generate preview of changes
│   └── applicator.ts          # Write to Figma Variables API
│
├── shared/
│   ├── ds4ds-schema.ts        # ✅ Complete DS4DS schema (variables + components)
│   └── json-schema.ts         # Export/import JSON format
│
└── utils/
    ├── figma-helpers.ts       # Figma API utilities
    ├── color-utils.ts         # Color conversion, opacity calc
    └── storage.ts             # Plugin data persistence
```

---

## UI Design

### Mode Separation: Tabs with Clear Context

```
┌──────────────────────────────────────────────────────────────┐
│  📦 Style Transfer                                           │
├────────────────────┬─────────────────────────────────────────┤
│  [🎨 Extract]      │  [📋 Apply]                             │
├────────────────────┴─────────────────────────────────────────┤
│                                                              │
│   Tab content changes based on selected mode                 │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

**Tab Visual Distinction:**

- Extract tab: Purple/brand accent
- Apply tab: Green accent
- Active tab has filled background, inactive has outline

---

### Extract Mode UI

```
┌──────────────────────────────────────────────────────────────┐
│  📦 Style Transfer                                           │
├────────────────────┬─────────────────────────────────────────┤
│  [🎨 Extract ✓]    │  [📋 Apply]                             │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  SELECTED ELEMENT                                            │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ "Primary Button"                                       │  │
│  │ Frame • 104×40 • 1 fill • radius: 8                    │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  ─────────────────────────────────────────────────────────   │
│                                                              │
│  MAP TO DS4DS COMPONENT                                      │
│                                                              │
│  Category:   [Button             ▼]                          │
│  Component:  [Buttons            ▼]                          │
│                                                              │
│  ─────────────────────────────────────────────────────────   │
│                                                              │
│  EXTRACTED PROPERTIES → VARIABLE MAPPING                     │
│                                                              │
│  Fill #615FFF                                                │
│  ├─ ● system/bg/primary (suggested)                          │
│  ├─ ○ system/fg/primary                                      │
│  └─ ○ [Browse all...]                                        │
│                                                              │
│  Radius 8px                                                  │
│  └─ ● radius/semantic/large-controls                         │
│                                                              │
│  ─────────────────────────────────────────────────────────   │
│                                                              │
│  EXTRACTION COLLECTION (3)                                   │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ • Button → #615FFF, r:8                         [×]    │  │
│  │ • Input → #F8FAFC, border:#CAD5E2               [×]    │  │
│  │ • Card → #FFFFFF, r:12                          [×]    │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  [+ Add Current Selection]        [Export JSON]              │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Key UI Features:

1. **Hybrid Matching Approach**

   - Dropdown selects DS4DS component category + component
   - Extracted properties show **smart suggestions** based on component type
   - User can accept suggestions or browse all variables

2. **Smart Suggestions Logic**

   ```typescript
   // When user selects "Button" → "Buttons"
   // And extracted fill is #615FFF
   // Suggest: system/bg/primary (because contained buttons use this)

   // When extracted radius is 8px
   // Suggest: radius/semantic/large-controls (exact match)
   ```

3. **Extraction Collection**
   - Shows running list of all extractions
   - Can remove items
   - Persists during session

---

### Apply Mode UI

```
┌──────────────────────────────────────────────────────────────┐
│  📦 Style Transfer                                           │
├────────────────────┬─────────────────────────────────────────┤
│  [🎨 Extract]      │  [📋 Apply ✓]                           │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  IMPORT STYLES                                               │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  [📁 Import JSON File]                                 │  │
│  │  or paste JSON below...                                │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  ─────────────────────────────────────────────────────────   │
│                                                              │
│  PREVIEW CHANGES (12 variables)                              │
│                                                              │
│  Theme Mode: [Light ▼] [Dark ▼] [Both ▼]                     │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Variable                    Current      New           │  │
│  ├────────────────────────────────────────────────────────┤  │
│  │ system/bg/primary           #615FFF  →   #3366FF  ✓    │  │
│  │ system/fg/primary           #615FFF  →   #3366FF  ✓    │  │
│  │ alpha/primary/500-20p       rgba...  →   rgba...  ✓    │  │
│  │ radius/semantic/large-ctrl  8        →   12       ✓    │  │
│  │ ...                                                    │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  ─────────────────────────────────────────────────────────   │
│                                                              │
│  [Cancel]                              [Apply 12 Changes]    │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Data Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           EXTRACT MODE                                   │
│  (Run in ideation/source file)                                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  1. Designer selects element(s) in Figma                                │
│                    ↓                                                    │
│  2. Plugin shows selection properties + DS4DS component picker          │
│                    ↓                                                    │
│  3. Designer selects target component (e.g., Buttons)                   │
│                    ↓                                                    │
│  4. Plugin suggests variable mappings based on:                         │
│     • Component type → expected variables                               │
│     • Property type (fill → color vars, radius → radius vars)           │
│                    ↓                                                    │
│  5. Designer confirms/adjusts mappings, adds to collection              │
│                    ↓                                                    │
│  6. Plugin auto-derives opacity variants from primary colors            │
│                    ↓                                                    │
│  7. Designer exports collection as JSON                                 │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
                                   ↓
                       JSON FILE (portable, versioned)
                                   ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                            APPLY MODE                                   │
│  (Run in DS4DS copy / target file)                                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  1. Designer imports JSON file                                          │
│                    ↓                                                    │
│  2. Plugin validates and parses                                         │
│                    ↓                                                    │
│  3. Plugin shows preview with:                                          │
│     • Variable name                                                     │
│     • Current value (from DS)                                           │
│     • New value (from extraction)                                       │
│                    ↓                                                    │
│  4. Designer selects theme mode(s): Light, Dark, or Both                │
│                    ↓                                                    │
│  5. Designer confirms changes                                           │
│                    ↓                                                    │
│  6. Plugin applies via Figma Variables API:                             │
│     variable.setValueForMode(modeId, newValue)                          │
│                    ↓                                                    │
│  7. Components auto-update (they reference variables)                   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## JSON Export Format

```json
{
  "meta": {
    "version": "1.0.0",
    "exportedAt": "2024-12-22T12:00:00Z",
    "sourceFileName": "Client X - Ideation",
    "sourceFileKey": "abc123"
  },
  "extractions": [
    {
      "id": "ext_001",
      "dsComponent": {
        "category": "button",
        "name": "Buttons",
        "key": "1a45acec266bbb1bd1338744453eb9e33aa2af53"
      },
      "sourceNode": {
        "id": "123:456",
        "name": "Primary Button"
      },
      "properties": {
        "fills": [{ "type": "SOLID", "hex": "#3366FF" }],
        "cornerRadius": 12,
        "strokes": [{ "type": "SOLID", "hex": "#2255EE", "weight": 1 }]
      },
      "mappings": [
        { "property": "fill", "variableName": "system/bg/primary" },
        {
          "property": "radius",
          "variableName": "radius/semantic/large-controls"
        }
      ]
    }
  ],
  "derivedTokens": {
    "primaryColor": {
      "base": "#3366FF",
      "alpha": {
        "4p": "rgba(51, 102, 255, 0.04)",
        "8p": "rgba(51, 102, 255, 0.08)",
        "12p": "rgba(51, 102, 255, 0.12)",
        "20p": "rgba(51, 102, 255, 0.20)",
        "38p": "rgba(51, 102, 255, 0.38)",
        "50p": "rgba(51, 102, 255, 0.50)"
      }
    }
  },
  "variableMappings": [
    {
      "variableName": "system/bg/primary",
      "newValue": { "r": 0.2, "g": 0.4, "b": 1 },
      "modes": ["Light", "Dark"]
    },
    {
      "variableName": "alpha/primary/500-20p",
      "newValue": { "r": 0.2, "g": 0.4, "b": 1, "a": 0.2 },
      "modes": ["Light", "Dark"],
      "derived": true
    },
    {
      "variableName": "radius/semantic/large-controls",
      "newValue": 12,
      "modes": ["Mode 1"]
    }
  ]
}
```

---

## Color Derivation Logic

```typescript
const ALPHA_LEVELS = [0.04, 0.08, 0.12, 0.2, 0.38, 0.5] as const;
const ALPHA_NAMES = ["4p", "8p", "12p", "20p", "38p", "50p"] as const;

interface DerivedAlphaColors {
  [key: string]: RGBA;
}

function derivePrimaryAlphaColors(baseHex: string): DerivedAlphaColors {
  const base = hexToRgba(baseHex);

  const result: DerivedAlphaColors = {};
  ALPHA_LEVELS.forEach((alpha, i) => {
    result[ALPHA_NAMES[i]] = { ...base, a: alpha };
  });

  return result;
}

// Maps to these variables:
// alpha/primary/500-4p
// alpha/primary/500-8p
// alpha/primary/500-12p
// alpha/primary/500-20p  → components/button/outlined/bg-hover
// alpha/primary/500-38p  → components/button/outlined/bg-pressed
// alpha/primary/500-50p  → system/border/interactive/focused
```

---

## Implementation Phases

### Phase 1: Project Setup & Schema ✅

**Status: COMPLETE**

- [x] Initialize create-figma-plugin project
- [x] Set up TypeScript configuration
- [x] Create DS4DS schema with all variables
- [x] Add DS4DS component registry (89 components)

### Phase 2: Extract Mode - UI

**Effort: 1.5 days**

- [ ] Mode tabs UI (Extract/Apply)
- [ ] Selection listener (show selected node info)
- [ ] DS4DS component picker (category → component dropdowns)
- [ ] Property display with suggested variable mappings
- [ ] Extraction collection list
- [ ] Export JSON functionality

### Phase 3: Extract Mode - Extraction Logic

**Effort: 1 day**

- [ ] Fill extractor (solid colors)
- [ ] Stroke extractor (color, weight)
- [ ] Radius extractor (uniform + individual corners)
- [ ] Color derivation (alpha variants)
- [ ] Smart suggestion engine (component → expected variables)

### Phase 4: Apply Mode - UI

**Effort: 1 day**

- [ ] JSON import UI (file upload + paste)
- [ ] Change preview table (current → new)
- [ ] Theme mode selector (Light/Dark/Both)
- [ ] Apply button with confirmation

### Phase 5: Apply Mode - Variable Updates

**Effort: 1.5 days**

- [ ] Read existing variables from file
- [ ] Match variable names to Figma Variable objects
- [ ] Preview generation (before → after values)
- [ ] Apply changes via `variable.setValueForMode(modeId, value)`
- [ ] Handle errors (variable not found, type mismatch)

### Phase 6: Polish & Edge Cases

**Effort: 1 day**

- [ ] Error handling and user feedback
- [ ] Loading states
- [ ] Validation (JSON format, required fields)
- [ ] Empty states
- [ ] Session persistence (extractions survive re-open)

---

## Milestones

| Milestone | Deliverable                       | Est. Effort |
| --------- | --------------------------------- | ----------- |
| **M1**    | Project setup, schema complete    | ✅ Done     |
| **M2**    | Extract mode UI shell             | 1 day       |
| **M3**    | Property extraction + suggestions | 1 day       |
| **M4**    | JSON export working               | 0.5 day     |
| **M5**    | Apply mode UI complete            | 1 day       |
| **M6**    | Variable mapping & preview        | 1 day       |
| **M7**    | Apply to variables working        | 1 day       |
| **M8**    | Polish, error handling            | 1 day       |

**Total estimated effort: ~7 days**

---

## Technical Notes

### Theme Modes

DS4DS uses two theme modes that need to be handled:

- **Light** - Default values
- **Dark** - Inverted values

When applying styles, user chooses:

- Apply to Light only
- Apply to Dark only
- Apply to Both (most common for brand colors)

```typescript
const collection = figma.variables
  .getLocalVariableCollections()
  .find((c) => c.name === "theme");

const lightModeId = collection.modes.find((m) => m.name === "Light")?.modeId;
const darkModeId = collection.modes.find((m) => m.name === "Dark")?.modeId;

// Apply to both modes
variable.setValueForMode(lightModeId, newValue);
variable.setValueForMode(darkModeId, newValue);
```

### Figma Variables API

```typescript
// Read all variables
const allVars = figma.variables.getLocalVariables();

// Find by name
const primaryBg = allVars.find((v) => v.name === "system/bg/primary");

// Update value for specific mode
primaryBg.setValueForMode(modeId, { r: 0.2, g: 0.4, b: 1 });

// Color format (Figma uses 0-1 range)
interface FigmaColor {
  r: number; // 0-1
  g: number; // 0-1
  b: number; // 0-1
  a?: number; // 0-1, optional for alpha
}
```

### UI ↔ Main Communication

```typescript
// main.ts
import { emit, on, showUI } from "@create-figma-plugin/utilities";

export default function () {
  showUI({ width: 400, height: 600 });

  // Selection change listener
  figma.on("selectionchange", () => {
    const selection = figma.currentPage.selection;
    if (selection.length > 0) {
      emit("SELECTION_CHANGED", extractSelectionInfo(selection[0]));
    }
  });

  // Apply request
  on("APPLY_MAPPINGS", (mappings) => {
    const results = applyToVariables(mappings);
    emit("APPLY_COMPLETE", results);
  });
}
```

---

## Key Decisions

| Decision             | Choice                               | Rationale                                |
| -------------------- | ------------------------------------ | ---------------------------------------- |
| Plugin architecture  | Single plugin with tabs              | Simpler UX, shared code                  |
| Theme modes          | Light + Dark                         | DS4DS uses both                          |
| DS data source       | Static schema file                   | Reliable, fast, versioned                |
| Component selection  | Category → Component dropdowns       | Organized, 89 components manageable      |
| Variable suggestions | Smart suggestions + browse all       | Fast for common cases, flexible for edge |
| Color derivation     | Auto-calculate alpha variants        | Consistent with DS4DS patterns           |
| JSON format          | Full extraction + derived + mappings | Portable, debuggable, re-usable          |

---

## Ready to Implement

Schema complete with:

- ✅ All variable collections (spacing, border, theme, primitives)
- ✅ All 89 DS4DS components with keys
- ✅ Component → Variable mappings
- ✅ Helper functions for lookups

**Next step:** Confirm this plan and begin Phase 2 (Extract Mode UI).
