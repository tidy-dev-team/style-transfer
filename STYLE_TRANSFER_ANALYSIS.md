# Style Transfer Plugin - Analysis & Planning

## Project Context

**Company:** UI/UX design company specializing in custom Design Systems
**Main Product:** Custom Design Systems for clients (primarily delivered as Figma files)
**Base System:** DS4DS (comprehensive internal design system)

---

## The Problem

Working with clients during ideation produces styled artifacts (components with client-approved styling). Currently in:
- Figma design files
- Figma Make
- Future: Lovable, other AI tools

**Goal:** Automate creation of new full-scale DS for client based on DS4DS by transferring styles from ideation artifacts.

---

## Proposed Workflow

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Ideation      │     │    Style        │     │   DS4DS Copy    │
│   File          │ ──▶ │    Extraction   │ ──▶ │   (Target)      │
│   (Source)      │     │    & Mapping    │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

1. Create copy of DS4DS
2. Index elements in DS (all components and variants)
3. Map elements in ideation file and extract properties:
   - Component type (button, dropdown, etc.)
   - Variant (primary, secondary, size M, etc.)
   - Properties (background, foreground, border-radius, etc.)
4. Apply extracted styles to matching elements in DS4DS copy

---

## Reference Files

### DS4DS (Kido-DS)
- **URL:** https://www.figma.com/design/WNOcZbybSn7dAGjTMimIsJ/Kido---DS
- **File Key:** `WNOcZbybSn7dAGjTMimIsJ`
- **Uses Figma Variables:** YES
- **Components bound to variables:** YES

### Sample Ideation File (Figma Make)
- **URL:** https://www.figma.com/make/q78LigHm1xdFOL2cB6s3qJ/MVS---Figma-make-Main
- **Structure:** Flat shapes (likely generic names like "Frame 47", "Rectangle 12")
- **Needs Investigation:** Exact output structure of Figma Make

---

## Technical Options Analyzed

### Option A: Figma Plugin Only
**Architecture:**
- Single plugin handles extraction and application
- Works within Figma sandbox

**Pros:**
- Works entirely within Figma
- Full access to Figma APIs (variables, components, styles)
- Best UX for designers

**Cons:**
- Can't work across files simultaneously without REST API
- Complex mapping UI

**Feasibility:** HIGH

---

### Option B: Figma REST API + External Tool
**Architecture:**
- External service reads both files via REST API
- Processes and writes back

**Pros:**
- Can work across multiple files
- More processing power for AI/ML semantic matching

**Cons:**
- REST API has write limitations (can't create components, limited variable access)
- Requires authentication setup

**Feasibility:** MEDIUM (REST API write limitations)

---

### Option C: Hybrid (Plugin + REST API) - RECOMMENDED
**Architecture:**
```
Plugin in Ideation File ──▶ Export JSON ──▶ Plugin in DS Copy
         │                                         │
         ▼                                         ▼
    Extract styles                           Apply styles
    Index elements                           Match & update
```

**Pros:**
- Best of both worlds
- Plugin handles what REST can't
- JSON as intermediate format is portable

**Cons:**
- Two plugins or two-step process
- Manual file switching

**Feasibility:** HIGH

---

### Option D: Variables-First Approach
Since DS4DS uses Figma Variables and components are bound to them:

**Approach:**
- Extract color/spacing/radius values from ideation
- Map to DS4DS variable structure
- Update variables → Components auto-update

**Pros:**
- Cleanest solution
- Figma-native workflow
- Variables can be exported/imported via plugin

**Cons:**
- Semantic mapping still needed ("their blue" = "our primary")
- Ideation files may not have semantic structure

**Feasibility:** HIGH (given DS4DS is variable-driven)

---

## Recommended Approach

**Hybrid Plugin with Variables-First mindset**

### Phase 1: Style Extraction Plugin
- Select elements in ideation file
- Tag them semantically ("this is button/primary/M")
- Extract properties (fills, strokes, radii, typography)
- Export as structured JSON

### Phase 2: Style Application Plugin
- Open in DS4DS copy
- Import the JSON
- Show mapping UI (source property → target variable)
- Apply with preview

---

## Proposed Data Structure

```json
{
  "extraction": {
    "timestamp": "2024-...",
    "source_file": "Client X Ideation",
    "elements": [
      {
        "semantic_tag": "button/primary/idle/M",
        "properties": {
          "fills": [{"type": "SOLID", "color": {"r": 0.2, "g": 0.4, "b": 1}}],
          "cornerRadius": 8,
          "paddingLeft": 16,
          "paddingRight": 16,
          "typography": {
            "fontFamily": "Inter",
            "fontWeight": 600,
            "fontSize": 14
          }
        }
      }
    ]
  }
}
```

---

## Open Questions

1. **Figma Make output:** Need to investigate exact structure - are there any semantic hints in layer names or is it purely flat shapes?

2. **Mapping complexity:** 
   - 1:1 naming convention possible?
   - Or need AI/manual semantic inference?

3. **DS4DS variable structure:** What's the naming convention? (e.g., `colors/primary/500`, `spacing/md`)

4. **Scale:** How many components/variants in DS4DS?

5. **Variable modes:** Does DS4DS use modes (light/dark, brand variations)?

---

## Next Steps

1. [ ] Investigate Figma Make output structure in detail
2. [ ] Document DS4DS variable naming convention
3. [ ] Decide on mapping approach (manual tagging vs. inference)
4. [ ] Build proof-of-concept plugin for property extraction
5. [ ] Design mapping UI/UX

---

## Technical Stack (for Plugin)

Based on project's AGENTS.md:
- **Framework:** create-figma-plugin
- **UI Library:** Preact
- **Language:** TypeScript
- **Build Tool:** esbuild

---

*Last Updated: December 18, 2024*
*Status: Initial Analysis Complete*
