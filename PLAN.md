# Style Transfer Plugin - Implementation Plan

## Overview

A Figma plugin that extracts styles from ideation files (client designs, Figma Make outputs) and applies them to DS4DS (Kido-DS) to quickly generate client-specific design systems.

**Single plugin, two operational modes:**
- **Extract Mode** - Run in source/ideation file to capture styles
- **Apply Mode** - Run in target DS file to apply captured styles

---

## DS4DS Variable Structure Reference

Based on analysis of Kido-DS (`WNOcZbybSn7dAGjTMimIsJ`):

### Naming Conventions

```
system/{category}/{subcategory}/{variant}
components/{component}/{variant}/{property}-{state}
radius/semantic/{size}
width/{type}
{typography-role}/{size}
```

### Key Token Categories

| Category | Examples | Notes |
|----------|----------|-------|
| System BG | `system/bg/primary`, `system/bg/01`, `system/bg/inverse` | Background colors |
| System FG | `system/fg/01`, `system/fg/primary`, `system/fg/disabled` | Foreground/text colors |
| System Border | `system/border/interactive/hover`, `system/border/static/03` | Border colors |
| System Overlays | `system/overlays/overlay-hover`, `system/overlays/overlay-active` | Overlay colors with opacity |
| Component Tokens | `components/button/outlined/bg-hover` | Component-specific |
| Radius | `radius/semantic/small-controls` (6), `radius/semantic/large-controls` (8) | Border radius |
| Spacing | `4`, `8`, `10`, `12`, `16`, `20` | Raw number tokens |
| Width | `width/default` (1), `width/thick` (2) | Stroke widths |
| Typography | `label/m`, `body/l-medium` | Font styles |

### Important Patterns

1. **Inverse via naming**: No variable modes - uses `-inverse` suffix instead
   - `system/fg/disabled` vs `system/fg/disabled-inverse`

2. **Primary color derivation**: `#615fff` appears in multiple forms:
   - `#615fff` - base (100%)
   - `#615fff33` - hover (20% opacity)
   - `#615fff61` - pressed (38% opacity)
   - `#615fff80` - focused (50% opacity)

3. **State tokens**: Button states are explicit tokens
   - `bg-idle`, `bg-hover`, `bg-pressed`
   - `fg-idle`, `fg-hover`, `fg-active`

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
│   │   ├── spacing.ts         # Padding/gap extraction
│   │   └── typography.ts      # [Future] Font extraction
│   └── derivation.ts          # Color derivation logic (opacity variants)
│
├── apply/
│   ├── ApplyUI.tsx            # Apply mode UI component
│   ├── mapper.ts              # JSON → Variable mapping logic
│   ├── preview.ts             # Generate preview of changes
│   └── applicator.ts          # Write to Figma Variables API
│
├── shared/
│   ├── semantic-tags.ts       # Component/variant tag definitions
│   ├── variable-schema.ts     # DS4DS variable schema/index
│   └── json-schema.ts         # Export/import JSON format
│
└── utils/
    ├── figma-helpers.ts       # Figma API utilities
    ├── color-utils.ts         # Color conversion, opacity calc
    └── storage.ts             # Plugin data persistence
```

### Data Flow

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           EXTRACT MODE                                   │
│  (Run in ideation/source file)                                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  1. Designer selects element(s) in Figma                                │
│                    ↓                                                    │
│  2. Plugin reads selection, shows properties                            │
│                    ↓                                                    │
│  3. Designer tags element semantically:                                 │
│     • Component type: Button                                            │
│     • Variant: contained                                                │
│     • Size: M                                                           │
│     • State: idle                                                       │
│                    ↓                                                    │
│  4. Plugin extracts properties:                                         │
│     • fills, strokes, cornerRadius, padding                             │
│                    ↓                                                    │
│  5. Plugin derives opacity variants from base colors                    │
│                    ↓                                                    │
│  6. Extraction added to collection                                      │
│                    ↓                                                    │
│  7. Designer exports collection as JSON                                 │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
                                   ↓
                            JSON FILE (portable)
                                   ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                            APPLY MODE                                    │
│  (Run in DS4DS copy / target file)                                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  1. Designer imports JSON file                                          │
│                    ↓                                                    │
│  2. Plugin parses and validates                                         │
│                    ↓                                                    │
│  3. Plugin generates variable mappings:                                 │
│     • Extracted primary → system/bg/primary, system/fg/primary, etc.   │
│     • Extracted radius → radius/semantic/large-controls                 │
│                    ↓                                                    │
│  4. Plugin shows preview:                                               │
│     • "system/bg/primary: #615fff → #3366ff"                           │
│     • "radius/semantic/large-controls: 8 → 12"                         │
│                    ↓                                                    │
│  5. Designer confirms / adjusts mappings                                │
│                    ↓                                                    │
│  6. Plugin applies changes via Figma Variables API                      │
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
    "exportedAt": "2024-12-18T12:00:00Z",
    "sourceFileName": "Client X - Ideation",
    "sourceFileKey": "abc123"
  },
  "extractions": [
    {
      "id": "ext_001",
      "semanticTag": {
        "component": "button",
        "variant": "contained",
        "size": "m",
        "state": "idle"
      },
      "sourceNode": {
        "id": "123:456",
        "name": "Primary Button"
      },
      "properties": {
        "fills": [
          {
            "type": "SOLID",
            "color": { "r": 0.2, "g": 0.4, "b": 1, "a": 1 },
            "hex": "#3366FF"
          }
        ],
        "strokes": [],
        "cornerRadius": 12,
        "padding": {
          "top": 12,
          "right": 24,
          "bottom": 12,
          "left": 24
        }
      }
    }
  ],
  "derivedTokens": {
    "colors": {
      "primary": {
        "base": "#3366FF",
        "hover": "#3366FF33",
        "pressed": "#3366FF61",
        "focused": "#3366FF80"
      }
    },
    "radii": {
      "large-controls": 12
    },
    "spacing": [12, 24]
  },
  "variableMappings": [
    {
      "variableName": "system/bg/primary",
      "newValue": "#3366FF",
      "sourceExtraction": "ext_001"
    },
    {
      "variableName": "components/button/outlined/bg-hover",
      "newValue": "#3366FF33",
      "derived": true,
      "derivedFrom": "primary @ 20%"
    }
  ]
}
```

---

## Semantic Tag System

### Component Types (MVP)

```typescript
const COMPONENT_TYPES = [
  'button',
  'input',
  'checkbox',
  'toggle',
  'card',
  'badge',
] as const;

const BUTTON_VARIANTS = ['contained', 'outlined', 'ghost', 'text'] as const;
const SIZES = ['xs', 's', 'm', 'l', 'xl'] as const;
const STATES = ['idle', 'hover', 'pressed', 'focused', 'disabled'] as const;
const INVERSE = ['normal', 'inverse'] as const;
```

### Semantic Tag → Variable Mapping

```typescript
// Example: button/contained/m/idle → variable mappings
const BUTTON_CONTAINED_MAPPINGS = {
  fill: [
    'system/bg/primary',
  ],
  fillDerived: {
    hover: 'system/overlays/overlay-hover-on-color',
    pressed: 'system/overlays/overlay-active-on-color',
  },
  textColor: [
    'system/fg/inverse',
    'system/fg/white',
  ],
  radius: [
    'radius/semantic/large-controls',
  ],
};

const BUTTON_OUTLINED_MAPPINGS = {
  stroke: [
    'system/border/interactive/hover',
    'system/border/interactive/active',
  ],
  fillDerived: {
    hover: 'components/button/outlined/bg-hover',      // 20% opacity
    pressed: 'components/button/outlined/bg-pressed',  // 38% opacity
  },
  // ...
};
```

---

## Color Derivation Logic

```typescript
// Primary color → derived variants
function derivePrimaryColorTokens(primaryHex: string): DerivedColors {
  const base = hexToRgba(primaryHex);
  
  return {
    base: primaryHex,
    hover: rgbaToHex({ ...base, a: 0.20 }),      // 20% opacity
    pressed: rgbaToHex({ ...base, a: 0.38 }),   // 38% opacity
    focused: rgbaToHex({ ...base, a: 0.50 }),   // 50% opacity
  };
}

// Active/darker variant (for system/fg/active, etc.)
function deriveActiveColor(primaryHex: string): string {
  // Darken by ~10-15%
  return darken(primaryHex, 0.12);
}
```

---

## Implementation Phases

### Phase 1: Project Setup & Core Types
**Effort: 0.5 day**

- [ ] Initialize create-figma-plugin project
- [ ] Set up TypeScript configuration
- [ ] Define core types (`types.ts`)
- [ ] Create semantic tag constants
- [ ] Set up UI component structure with mode tabs

### Phase 2: Extract Mode - UI
**Effort: 1 day**

- [ ] Selection listener (show selected node info)
- [ ] Semantic tag builder UI (dropdowns for component/variant/size/state)
- [ ] Extraction collection list UI
- [ ] Export JSON button

### Phase 3: Extract Mode - Property Extraction
**Effort: 1.5 days**

- [ ] Fill extractor (solid colors, handle gradients gracefully)
- [ ] Stroke extractor (color, weight)
- [ ] Radius extractor (uniform + individual corners)
- [ ] Spacing extractor (auto-layout padding, gap)
- [ ] Color derivation logic (opacity variants)

### Phase 4: Apply Mode - UI
**Effort: 1 day**

- [ ] JSON import UI (file upload or paste)
- [ ] Mapping preview list
- [ ] Edit mapping UI (dropdown to change target variable)
- [ ] Apply button with confirmation

### Phase 5: Apply Mode - Variable Updates
**Effort: 1.5 days**

- [ ] Read existing variables from file
- [ ] Build mapping between extracted values and variables
- [ ] Preview generation (before → after)
- [ ] Apply changes via `variable.setValueForMode()`
- [ ] Handle errors (variable not found, type mismatch)

### Phase 6: Polish & Edge Cases
**Effort: 1.5 days**

- [ ] Error handling and user feedback
- [ ] Loading states
- [ ] Validation (JSON format, required fields)
- [ ] Empty states
- [ ] Settings persistence (last used mappings)
- [ ] UI polish

---

## MVP Milestones

| Milestone | Deliverable | Est. Effort |
|-----------|-------------|-------------|
| **M1** | Project setup, types, UI shell with tabs | 0.5 day |
| **M2** | Extract mode UI complete | 1 day |
| **M3** | Property extraction working (fills, radius, spacing) | 1.5 days |
| **M4** | JSON export functional | 0.5 day |
| **M5** | Apply mode UI complete | 1 day |
| **M6** | Variable mapping & preview | 1 day |
| **M7** | Apply to variables working | 1 day |
| **M8** | Polish, error handling, edge cases | 1.5 days |

**Total estimated effort: ~8 days**

---

## Future Enhancements (Post-MVP)

### Phase 7: Typography Support
- Font family extraction
- Font weight, size, line-height
- Map to typography tokens

### Phase 8: Effects Support
- Shadow extraction
- Blur extraction
- Map to effect tokens (if DS4DS uses them)

### Phase 9: Smart Features
- Auto-detect component types from ideation
- Suggest mappings based on color similarity
- Batch operations

### Phase 10: Presets & Profiles
- Save client-specific mapping profiles
- Quick-apply for repeat clients
- Template system

---

## Technical Notes

### Figma Variables API

```typescript
// Read variables
const variables = figma.variables.getLocalVariables();
const colorVars = variables.filter(v => v.resolvedType === 'COLOR');

// Get variable by name
const variable = variables.find(v => v.name === 'system/bg/primary');

// Update variable value
const modeId = Object.keys(variable.valuesByMode)[0]; // Get first mode
variable.setValueForMode(modeId, newColorValue);
```

### Color Format Conversion

```typescript
// Figma uses 0-1 range for RGB
interface FigmaColor {
  r: number;  // 0-1
  g: number;  // 0-1
  b: number;  // 0-1
}

// Convert hex to Figma color
function hexToFigmaColor(hex: string): FigmaColor {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return { r, g, b };
}
```

### UI ↔ Main Communication

```typescript
// main.ts
import { emit, on, showUI } from '@create-figma-plugin/utilities';

export default function () {
  showUI({ width: 360, height: 500 });
  
  // Listen for extraction request
  on('EXTRACT_SELECTION', () => {
    const selection = figma.currentPage.selection;
    const extracted = extractProperties(selection[0]);
    emit('EXTRACTION_RESULT', extracted);
  });
  
  // Listen for apply request
  on('APPLY_MAPPINGS', (mappings) => {
    applyToVariables(mappings);
    emit('APPLY_COMPLETE', { success: true });
  });
}
```

---

## Open Items / Decisions Made

| Item | Decision |
|------|----------|
| Plugin architecture | Single plugin with two modes (Extract/Apply) |
| Variable modes | DS4DS uses single mode; inverse via naming convention |
| Source selection | Manual designer selection (no auto-detect for MVP) |
| Color derivation | Auto-calculate opacity variants (20%, 38%, 50%) |
| MVP scope | Colors + radii + spacing; modular for expansion |
| Post-apply workflow | Manual completion → rename file → publish (user's choice) |

---

## Ready to Implement

This plan covers:
1. ✅ DS4DS variable structure analysis
2. ✅ Architecture and file structure
3. ✅ Data flow and JSON format
4. ✅ Semantic tagging system
5. ✅ Color derivation logic
6. ✅ Implementation phases with estimates
7. ✅ Technical implementation details

**Next step:** Review this plan and confirm to begin implementation.
