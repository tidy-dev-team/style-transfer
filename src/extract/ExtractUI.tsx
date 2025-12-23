import {
  Container,
  Divider,
  Dropdown,
  DropdownOption,
  IconButton,
  Muted,
  Text,
  VerticalSpace,
} from "@create-figma-plugin/ui";
import { emit, on } from "@create-figma-plugin/utilities";
import { h, Fragment } from "preact";
import { useCallback, useMemo, useState, useEffect } from "preact/hooks";

import {
  SelectionInfo,
  ExtractionItem,
  VariableMapping,
  NotifyHandler,
  GetComponentVariantsHandler,
  ComponentVariantsHandler,
  ComponentVariantsResult,
  ComponentVariantProperty,
} from "../types";
import {
  DS4DS_COMPONENT_CATEGORIES,
  getComponentsByCategory,
  RADIUS_SEMANTIC_VARIABLES,
  searchVariables,
} from "../shared/ds4ds-schema";

// =============================================================================
// STYLES
// =============================================================================

const styles = {
  section: {
    marginBottom: "16px",
  },
  sectionTitle: {
    fontSize: "11px",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
    color: "#666",
    marginBottom: "8px",
  },
  selectionCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: "6px",
    padding: "12px",
  },
  selectionName: {
    fontSize: "13px",
    fontWeight: 600,
    marginBottom: "4px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap" as const,
  },
  selectionMeta: {
    fontSize: "11px",
    color: "#666",
  },
  propertyRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "8px",
  },
  colorSwatch: {
    width: "24px",
    height: "24px",
    borderRadius: "4px",
    border: "1px solid rgba(0,0,0,0.1)",
    flexShrink: 0,
  },
  propertyLabel: {
    flex: 1,
    fontSize: "12px",
  },
  dropdownWrapper: {
    flex: 2,
  },
  extractionList: {
    backgroundColor: "#f5f5f5",
    borderRadius: "6px",
    padding: "8px",
    maxHeight: "200px",
    overflowY: "auto" as const,
  },
  extractionItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px",
    backgroundColor: "white",
    borderRadius: "4px",
    marginBottom: "4px",
  },
  emptyState: {
    textAlign: "center" as const,
    padding: "24px",
    color: "#999",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",
    padding: "8px 16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: 500,
  },
  primaryButton: {
    backgroundColor: "#18A0FB",
    color: "white",
  },
  secondaryButton: {
    backgroundColor: "#f0f0f0",
    color: "#333",
  },
  buttonRow: {
    display: "flex",
    gap: "8px",
  },
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function figmaColorToHex(color: { r: number; g: number; b: number }): string {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`.toUpperCase();
}

function generateId(): string {
  return `ext_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Build category options for dropdown
function getCategoryOptions(): DropdownOption[] {
  return Object.entries(DS4DS_COMPONENT_CATEGORIES).map(([key, value]) => ({
    value: key,
    text: value.label,
  }));
}

// Build component options for a category
function getComponentOptions(category: string): DropdownOption[] {
  const components = getComponentsByCategory(category);
  return components.map((c) => ({
    value: c.key,
    text: c.name,
  }));
}

// Get suggested variable for a radius value
function suggestRadiusVariable(radius: number): string | null {
  const semantic = RADIUS_SEMANTIC_VARIABLES.find((v) => {
    const desc = v.description || "";
    const match = desc.match(/^(\d+)px/);
    if (match) {
      return parseInt(match[1], 10) === radius;
    }
    return false;
  });
  return semantic?.name || null;
}

// Get color variable suggestions based on component type
function suggestColorVariables(category: string): string[] {
  const suggestions: Record<string, string[]> = {
    button: ["system/bg/primary", "system/fg/primary", "system/fg/inverse"],
    input: ["components/input/bg-default", "system/border/interactive/02-idle"],
    card: ["system/bg/01", "system/border/static/03"],
    badge: ["system/bg/primary", "system/fg/inverse"],
    toggle: ["components/toggle/bg-on-default", "system/bg/primary"],
    chips: ["components/chip/bg", "system/fg/01"],
    tooltip: ["components/tooltip/bg", "system/fg/01"],
  };
  return suggestions[category] || ["system/bg/primary", "system/fg/primary"];
}

// =============================================================================
// PROPS
// =============================================================================

interface ExtractUIProps {
  selection: SelectionInfo | null;
  extractions: ExtractionItem[];
  onAddExtraction: (item: ExtractionItem) => void;
  onRemoveExtraction: (id: string) => void;
  onExport: () => void;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function ExtractUI({
  selection,
  extractions,
  onAddExtraction,
  onRemoveExtraction,
  onExport,
}: ExtractUIProps) {
  // Component selection state
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedComponentKey, setSelectedComponentKey] =
    useState<string | null>(null);

  // Mapping state - which variables are selected for each property
  const [fillVariable, setFillVariable] = useState<string | null>(null);
  const [radiusVariable, setRadiusVariable] = useState<string | null>(null);

  // Variant properties state
  const [variantProperties, setVariantProperties] = useState<
    ComponentVariantProperty[]
  >([]);
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >({});
  const [isLoadingVariants, setIsLoadingVariants] = useState(false);

  // Listen for variant response
  useEffect(() => {
    const unsubscribe = on<ComponentVariantsHandler>(
      "COMPONENT_VARIANTS",
      (result: ComponentVariantsResult) => {
        console.log("[ExtractUI] Received variant result:", result);
        setIsLoadingVariants(false);

        if (result.error) {
          console.warn("[ExtractUI] Variant fetch error:", result.error);
          setVariantProperties([]);
          return;
        }

        // Filter to only VARIANT type properties
        const variants = result.variantProperties.filter(
          (p) => p.type === "VARIANT"
        );
        setVariantProperties(variants);

        // Set default values for each variant
        const defaults: Record<string, string> = {};
        variants.forEach((prop) => {
          if (prop.defaultValue && typeof prop.defaultValue === "string") {
            defaults[prop.name] = prop.defaultValue;
          } else if (prop.variantOptions && prop.variantOptions.length > 0) {
            defaults[prop.name] = prop.variantOptions[0];
          }
        });
        setSelectedVariants(defaults);
      }
    );
    return unsubscribe;
  }, []);

  // Fetch variants when component is selected
  useEffect(() => {
    if (selectedComponentKey) {
      console.log("[ExtractUI] Fetching variants for:", selectedComponentKey);
      setIsLoadingVariants(true);
      setVariantProperties([]);
      setSelectedVariants({});
      emit<GetComponentVariantsHandler>(
        "GET_COMPONENT_VARIANTS",
        selectedComponentKey
      );
    } else {
      setVariantProperties([]);
      setSelectedVariants({});
    }
  }, [selectedComponentKey]);

  // Handle variant selection change
  const handleVariantChange = useCallback((propName: string, value: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [propName]: value,
    }));
  }, []);

  // Category dropdown options
  const categoryOptions = useMemo(() => getCategoryOptions(), []);

  // Component dropdown options (based on selected category)
  const componentOptions = useMemo(() => {
    if (!selectedCategory) return [];
    return getComponentOptions(selectedCategory);
  }, [selectedCategory]);

  // Color variable options
  const colorVariableOptions = useMemo((): DropdownOption[] => {
    const suggestions = selectedCategory
      ? suggestColorVariables(selectedCategory)
      : ["system/bg/primary", "system/fg/primary"];

    // Get more options from search
    const allColorVars = searchVariables("system/").filter(
      (v) => v.type === "COLOR"
    );
    const allOptions = new Set([
      ...suggestions,
      ...allColorVars.map((v) => v.name),
    ]);

    return Array.from(allOptions)
      .slice(0, 20)
      .map((name) => ({
        value: name,
        text: name,
      }));
  }, [selectedCategory]);

  // Radius variable options
  const radiusVariableOptions = useMemo((): DropdownOption[] => {
    return RADIUS_SEMANTIC_VARIABLES.map((v) => ({
      value: v.name,
      text: `${v.name} (${v.description})`,
    }));
  }, []);

  // Handle category change
  const handleCategoryChange = useCallback((e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    setSelectedCategory(value);
    setSelectedComponentKey(null);

    // Reset mappings and suggest new ones
    const suggestions = suggestColorVariables(value);
    setFillVariable(suggestions[0] || null);
  }, []);

  // Handle component change
  const handleComponentChange = useCallback((e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    setSelectedComponentKey(value);
  }, []);

  // Handle fill variable change
  const handleFillVariableChange = useCallback((e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    setFillVariable(value);
  }, []);

  // Handle radius variable change
  const handleRadiusVariableChange = useCallback((e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    setRadiusVariable(value);
  }, []);

  // Auto-suggest radius when selection changes
  useMemo(() => {
    if (selection?.cornerRadius && typeof selection.cornerRadius === "number") {
      const suggested = suggestRadiusVariable(selection.cornerRadius);
      if (suggested) {
        setRadiusVariable(suggested);
      }
    }
  }, [selection?.cornerRadius]);

  // Handle add to collection
  const handleAdd = useCallback(() => {
    if (!selection || !selectedCategory || !selectedComponentKey) {
      emit<NotifyHandler>("NOTIFY", "Please select a component to map to");
      return;
    }

    // Find the component info
    const component = getComponentsByCategory(selectedCategory).find(
      (c) => c.key === selectedComponentKey
    );
    if (!component) return;

    // Build mappings
    const mappings: VariableMapping[] = [];

    if (fillVariable && selection.fills.length > 0) {
      const fill = selection.fills[0];
      mappings.push({
        property: "fill",
        extractedValue: fill.hex || "",
        variableName: fillVariable,
      });
    }

    if (
      radiusVariable &&
      selection.cornerRadius &&
      typeof selection.cornerRadius === "number"
    ) {
      mappings.push({
        property: "radius",
        extractedValue: selection.cornerRadius,
        variableName: radiusVariable,
      });
    }

    const item: ExtractionItem = {
      id: generateId(),
      timestamp: Date.now(),
      sourceNode: {
        id: selection.id,
        name: selection.name,
      },
      dsComponent: {
        category: selectedCategory,
        name: component.name,
        key: component.key,
        variants:
          Object.keys(selectedVariants).length > 0
            ? selectedVariants
            : undefined,
      },
      properties: {
        fills: selection.fills,
        strokes: selection.strokes,
        cornerRadius: selection.cornerRadius,
      },
      mappings,
    };

    onAddExtraction(item);
    emit<NotifyHandler>("NOTIFY", `Added "${selection.name}" mapping`);
  }, [
    selection,
    selectedCategory,
    selectedComponentKey,
    selectedVariants,
    fillVariable,
    radiusVariable,
    onAddExtraction,
  ]);

  // Get primary fill color for display
  const primaryFill = selection?.fills.find((f) => f.type === "SOLID");
  const primaryFillHex =
    primaryFill?.hex ||
    (primaryFill?.color ? figmaColorToHex(primaryFill.color) : null);

  return (
    <Container space="medium">
      <VerticalSpace space="medium" />

      {/* Selected Element Section */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Selected Element</div>
        {selection ? (
          <div style={styles.selectionCard}>
            <div style={styles.selectionName}>{selection.name}</div>
            <div style={styles.selectionMeta}>
              {selection.type} • {Math.round(selection.width)}×
              {Math.round(selection.height)}
              {selection.fills.length > 0 &&
                ` • ${selection.fills.length} fill${
                  selection.fills.length > 1 ? "s" : ""
                }`}
              {typeof selection.cornerRadius === "number" &&
                ` • radius: ${selection.cornerRadius}`}
            </div>
          </div>
        ) : (
          <div style={styles.emptyState}>
            <Muted>Select an element in Figma</Muted>
          </div>
        )}
      </div>

      {selection && (
        <Fragment>
          <Divider />
          <VerticalSpace space="medium" />

          {/* Map to DS4DS Component Section */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>Map to DS4DS Component</div>

            <Text>
              <Muted>Category</Muted>
            </Text>
            <VerticalSpace space="extraSmall" />
            <Dropdown
              onChange={handleCategoryChange}
              options={categoryOptions}
              value={selectedCategory}
              placeholder="Select category..."
            />
            <VerticalSpace space="small" />

            {selectedCategory && (
              <Fragment>
                <Text>
                  <Muted>Component</Muted>
                </Text>
                <VerticalSpace space="extraSmall" />
                <Dropdown
                  onChange={handleComponentChange}
                  options={componentOptions}
                  value={selectedComponentKey}
                  placeholder="Select component..."
                />
              </Fragment>
            )}

            {/* Variant Selectors */}
            {selectedComponentKey && (
              <Fragment>
                {isLoadingVariants ? (
                  <Fragment>
                    <VerticalSpace space="small" />
                    <Text>
                      <Muted>Loading variants...</Muted>
                    </Text>
                  </Fragment>
                ) : variantProperties.length > 0 ? (
                  <Fragment>
                    <VerticalSpace space="medium" />
                    <div style={styles.sectionTitle}>Variant Properties</div>
                    {variantProperties.map((prop) => (
                      <Fragment key={prop.name}>
                        <Text>
                          <Muted>{prop.name}</Muted>
                        </Text>
                        <VerticalSpace space="extraSmall" />
                        <Dropdown
                          onChange={(e: Event) => {
                            const value = (e.target as HTMLInputElement).value;
                            handleVariantChange(prop.name, value);
                          }}
                          options={
                            prop.variantOptions?.map((opt) => ({
                              value: opt,
                              text: opt,
                            })) || []
                          }
                          value={selectedVariants[prop.name] || null}
                          placeholder={`Select ${prop.name}...`}
                        />
                        <VerticalSpace space="small" />
                      </Fragment>
                    ))}
                  </Fragment>
                ) : null}
              </Fragment>
            )}
          </div>

          <Divider />
          <VerticalSpace space="medium" />

          {/* Property Mappings Section */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>Property → Variable Mapping</div>

            {/* Fill mapping */}
            {primaryFillHex && (
              <div style={styles.propertyRow}>
                <div
                  style={{
                    ...styles.colorSwatch,
                    backgroundColor: primaryFillHex,
                  }}
                />
                <div style={styles.propertyLabel}>
                  <Text>Fill {primaryFillHex}</Text>
                </div>
                <div style={styles.dropdownWrapper}>
                  <Dropdown
                    onChange={handleFillVariableChange}
                    options={colorVariableOptions}
                    value={fillVariable}
                    placeholder="Select variable..."
                  />
                </div>
              </div>
            )}

            {/* Radius mapping */}
            {typeof selection.cornerRadius === "number" && (
              <div style={styles.propertyRow}>
                <div
                  style={{
                    ...styles.colorSwatch,
                    backgroundColor: "#e0e0e0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "10px",
                    color: "#666",
                  }}
                >
                  ⌒
                </div>
                <div style={styles.propertyLabel}>
                  <Text>Radius {selection.cornerRadius}px</Text>
                </div>
                <div style={styles.dropdownWrapper}>
                  <Dropdown
                    onChange={handleRadiusVariableChange}
                    options={radiusVariableOptions}
                    value={radiusVariable}
                    placeholder="Select variable..."
                  />
                </div>
              </div>
            )}
          </div>

          {/* Add Button */}
          <div style={styles.buttonRow}>
            <button
              style={{ ...styles.button, ...styles.primaryButton, flex: 1 }}
              onClick={handleAdd}
              disabled={!selectedComponentKey}
            >
              <span>+</span> Add to Collection
            </button>
          </div>
        </Fragment>
      )}

      <VerticalSpace space="medium" />
      <Divider />
      <VerticalSpace space="medium" />

      {/* Extraction Collection Section */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>
          Extraction Collection ({extractions.length})
        </div>
        {extractions.length > 0 ? (
          <div style={styles.extractionList}>
            {extractions.map((item) => {
              const fillMapping = item.mappings.find(
                (m) => m.property === "fill"
              );
              const radiusMapping = item.mappings.find(
                (m) => m.property === "radius"
              );
              return (
                <div key={item.id} style={styles.extractionItem}>
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: 500 }}>
                      {item.dsComponent.name}
                    </div>
                    <div style={{ fontSize: "10px", color: "#666" }}>
                      {fillMapping && fillMapping.extractedValue}
                      {fillMapping && radiusMapping && ", "}
                      {radiusMapping && `r:${radiusMapping.extractedValue}`}
                    </div>
                  </div>
                  <IconButton onClick={() => onRemoveExtraction(item.id)}>
                    <span style={{ fontSize: "16px" }}>×</span>
                  </IconButton>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <Muted>No extractions yet</Muted>
          </div>
        )}
      </div>

      {/* Export Button */}
      {extractions.length > 0 && (
        <button
          style={{ ...styles.button, ...styles.secondaryButton, width: "100%" }}
          onClick={onExport}
        >
          Export JSON
        </button>
      )}

      <VerticalSpace space="medium" />
    </Container>
  );
}
