import { emit, on, showUI } from "@create-figma-plugin/utilities";

import {
  CloseHandler,
  ExtractedFill,
  ExtractedStroke,
  FileInfoHandler,
  GetFileInfoHandler,
  NotifyHandler,
  RequestSelectionHandler,
  SelectionChangedHandler,
  SelectionInfo,
  GetComponentVariantsHandler,
  GetSelectionVariantsHandler,
  ComponentVariantsHandler,
  ComponentVariantProperty,
} from "./types";

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function figmaColorToHex(color: RGB | RGBA): string {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`.toUpperCase();
}

function extractFills(node: SceneNode): ExtractedFill[] {
  if (!("fills" in node) || !Array.isArray(node.fills)) return [];

  return (node.fills as readonly Paint[])
    .filter(
      (fill): fill is SolidPaint | GradientPaint => fill.visible !== false
    )
    .map((fill): ExtractedFill => {
      if (fill.type === "SOLID") {
        return {
          type: "SOLID",
          color: {
            r: fill.color.r,
            g: fill.color.g,
            b: fill.color.b,
            a: fill.opacity ?? 1,
          },
          hex: figmaColorToHex(fill.color),
          opacity: fill.opacity ?? 1,
        };
      }
      if (fill.type.includes("GRADIENT")) {
        return { type: "GRADIENT" };
      }
      return { type: "OTHER" };
    });
}

function extractStrokes(node: SceneNode): ExtractedStroke[] {
  if (!("strokes" in node) || !Array.isArray(node.strokes)) return [];
  if (!("strokeWeight" in node)) return [];

  return (node.strokes as readonly Paint[])
    .filter(
      (stroke): stroke is SolidPaint =>
        stroke.type === "SOLID" && stroke.visible !== false
    )
    .map(
      (stroke): ExtractedStroke => ({
        color: {
          r: stroke.color.r,
          g: stroke.color.g,
          b: stroke.color.b,
          a: stroke.opacity ?? 1,
        },
        hex: figmaColorToHex(stroke.color),
        weight: typeof node.strokeWeight === "number" ? node.strokeWeight : 1,
      })
    );
}

function extractCornerRadius(node: SceneNode): number | "mixed" | null {
  if (!("cornerRadius" in node)) return null;

  if (typeof node.cornerRadius === "number") {
    return node.cornerRadius;
  }

  // Check if it's mixed (symbol in Figma API)
  if ("topLeftRadius" in node) {
    const tl = (node as any).topLeftRadius;
    const tr = (node as any).topRightRadius;
    const br = (node as any).bottomRightRadius;
    const bl = (node as any).bottomLeftRadius;

    if (tl === tr && tr === br && br === bl) {
      return tl;
    }
    return "mixed";
  }

  return null;
}

function extractSelectionInfo(node: SceneNode): SelectionInfo {
  const info: SelectionInfo = {
    id: node.id,
    name: node.name,
    type: node.type,
    width: "width" in node ? node.width : 0,
    height: "height" in node ? node.height : 0,
    fills: extractFills(node),
    strokes: extractStrokes(node),
    cornerRadius: extractCornerRadius(node),
  };

  // Add individual corner radii if mixed
  if (info.cornerRadius === "mixed" && "topLeftRadius" in node) {
    info.cornerRadii = {
      topLeft: (node as any).topLeftRadius,
      topRight: (node as any).topRightRadius,
      bottomRight: (node as any).bottomRightRadius,
      bottomLeft: (node as any).bottomLeftRadius,
    };
  }

  return info;
}

// =============================================================================
// MAIN PLUGIN
// =============================================================================

export default function () {
  // Show UI
  showUI({
    height: 600,
    width: 400,
  });

  // Send initial selection
  const sendSelection = () => {
    const selection = figma.currentPage.selection;
    if (selection.length > 0) {
      const info = extractSelectionInfo(selection[0]);
      emit<SelectionChangedHandler>("SELECTION_CHANGED", info);
    } else {
      emit<SelectionChangedHandler>("SELECTION_CHANGED", null);
    }
  };

  // Listen for selection changes
  figma.on("selectionchange", sendSelection);

  // Handle UI requests for current selection
  on<RequestSelectionHandler>("REQUEST_SELECTION", sendSelection);

  // Handle file info request
  on<GetFileInfoHandler>("GET_FILE_INFO", () => {
    emit<FileInfoHandler>("FILE_INFO", {
      fileName: figma.root.name,
      fileKey: figma.fileKey || "",
    });
  });

  // Handle notifications
  on<NotifyHandler>("NOTIFY", (message: string) => {
    figma.notify(message);
  });

  // Handle close
  on<CloseHandler>("CLOSE", () => {
    figma.closePlugin();
  });

  // Helper function to import component - tries ComponentSet first, then Component
  async function importComponentOrSet(
    key: string
  ): Promise<ComponentSetNode | ComponentNode> {
    try {
      // First try to import as ComponentSet
      const componentSet = await figma.importComponentSetByKeyAsync(key);
      console.log(
        "[StyleTransfer] Imported as ComponentSet:",
        componentSet.name
      );
      return componentSet;
    } catch (setError) {
      console.log("[StyleTransfer] Not a ComponentSet, trying as Component...");
      try {
        // Fallback to importing as Component
        const component = await figma.importComponentByKeyAsync(key);
        console.log("[StyleTransfer] Imported as Component:", component.name);
        return component;
      } catch (compError) {
        const errorMsg =
          compError instanceof Error ? compError.message : String(compError);
        throw new Error(`Failed to import component: ${errorMsg}`);
      }
    }
  }

  // Handle component variants request
  on<GetComponentVariantsHandler>(
    "GET_COMPONENT_VARIANTS",
    async (componentKey: string) => {
      console.log(
        "[StyleTransfer] Fetching variants for component key:",
        componentKey
      );

      try {
        // Import component or component set from library
        const imported = await importComponentOrSet(componentKey);
        console.log(
          "[StyleTransfer] Imported node:",
          imported.name,
          "type:",
          imported.type
        );

        let componentSet: ComponentSetNode | null = null;

        // Check what we got
        if (imported.type === "COMPONENT_SET") {
          componentSet = imported as ComponentSetNode;
        } else if (imported.type === "COMPONENT") {
          // If it's a component, check if it's part of a ComponentSet
          if (imported.parent && imported.parent.type === "COMPONENT_SET") {
            componentSet = imported.parent as ComponentSetNode;
          }
        }

        if (componentSet) {
          const variantProperties = extractVariantProperties(componentSet);
          console.log(
            "[StyleTransfer] Extracted variant properties:",
            JSON.stringify(variantProperties, null, 2)
          );

          emit<ComponentVariantsHandler>("COMPONENT_VARIANTS", {
            componentKey,
            componentSetName: componentSet.name,
            variantProperties,
          });

          figma.notify(
            `Found ${variantProperties.length} properties for "${componentSet.name}"`
          );
        } else {
          console.log(
            "[StyleTransfer] Component is not part of a ComponentSet"
          );
          emit<ComponentVariantsHandler>("COMPONENT_VARIANTS", {
            componentKey,
            componentSetName: imported.name,
            variantProperties: [],
            error: "Component is not part of a ComponentSet (no variants)",
          });
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        console.error(
          "[StyleTransfer] Error fetching from library:",
          errorMessage
        );

        // Fallback: Try to find from current selection if it's an instance
        const selection = figma.currentPage.selection[0];
        if (selection && selection.type === "INSTANCE") {
          console.log(
            "[StyleTransfer] Trying to get variants from selected instance..."
          );
          const mainComponent = selection.mainComponent;
          if (mainComponent && mainComponent.parent?.type === "COMPONENT_SET") {
            const componentSet = mainComponent.parent as ComponentSetNode;
            const variantProperties = extractVariantProperties(componentSet);

            emit<ComponentVariantsHandler>("COMPONENT_VARIANTS", {
              componentKey,
              componentSetName: componentSet.name,
              variantProperties,
            });

            figma.notify(
              `Found ${variantProperties.length} properties from selected instance`
            );
            return;
          }
        }

        emit<ComponentVariantsHandler>("COMPONENT_VARIANTS", {
          componentKey,
          variantProperties: [],
          error: `${errorMessage}. Try selecting a component instance from the library, or ensure the library is enabled.`,
        });
        figma.notify(
          `Error: Library not accessible. Select a component instance instead.`,
          { error: true }
        );
      }
    }
  );

  // Helper function to extract variant properties from a ComponentSet
  function extractVariantProperties(
    componentSet: ComponentSetNode
  ): ComponentVariantProperty[] {
    console.log("[StyleTransfer] Found ComponentSet:", componentSet.name);
    console.log(
      "[StyleTransfer] componentPropertyDefinitions:",
      JSON.stringify(componentSet.componentPropertyDefinitions, null, 2)
    );

    const variantProperties: ComponentVariantProperty[] = [];

    for (const [propName, propDef] of Object.entries(
      componentSet.componentPropertyDefinitions
    )) {
      console.log(
        `[StyleTransfer] Property: ${propName}, Type: ${propDef.type}`
      );

      if (propDef.type === "VARIANT") {
        variantProperties.push({
          name: propName,
          type: "VARIANT",
          variantOptions: propDef.variantOptions,
          defaultValue: propDef.defaultValue,
        });
      } else if (propDef.type === "BOOLEAN") {
        variantProperties.push({
          name: propName,
          type: "BOOLEAN",
          defaultValue: propDef.defaultValue,
        });
      } else if (propDef.type === "INSTANCE_SWAP") {
        variantProperties.push({
          name: propName,
          type: "INSTANCE_SWAP",
        });
      } else if (propDef.type === "TEXT") {
        variantProperties.push({
          name: propName,
          type: "TEXT",
          defaultValue: propDef.defaultValue,
        });
      }
    }

    return variantProperties;
  }

  // Handle direct selection variants request (doesn't need library access)
  on<GetSelectionVariantsHandler>("GET_SELECTION_VARIANTS", () => {
    console.log("[StyleTransfer] Getting variants from current selection...");

    const selection = figma.currentPage.selection[0];

    if (!selection) {
      emit<ComponentVariantsHandler>("COMPONENT_VARIANTS", {
        componentKey: "",
        variantProperties: [],
        error: "No element selected",
      });
      return;
    }

    let componentSet: ComponentSetNode | null = null;
    let componentKey = "";

    // Check if selection is an instance
    if (selection.type === "INSTANCE") {
      const mainComponent = selection.mainComponent;
      componentKey = mainComponent?.key || "";

      if (mainComponent?.parent?.type === "COMPONENT_SET") {
        componentSet = mainComponent.parent as ComponentSetNode;
      }
    }
    // Check if selection is a component
    else if (selection.type === "COMPONENT") {
      componentKey = selection.key;

      if (selection.parent?.type === "COMPONENT_SET") {
        componentSet = selection.parent as ComponentSetNode;
      }
    }
    // Check if selection is a component set
    else if (selection.type === "COMPONENT_SET") {
      componentSet = selection as ComponentSetNode;
      // Get the key of the default variant
      const defaultVariant = componentSet.defaultVariant;
      componentKey = defaultVariant?.key || "";
    }

    if (componentSet) {
      const variantProperties = extractVariantProperties(componentSet);

      emit<ComponentVariantsHandler>("COMPONENT_VARIANTS", {
        componentKey,
        componentSetName: componentSet.name,
        variantProperties,
      });

      figma.notify(
        `Found ${variantProperties.length} properties for "${componentSet.name}"`
      );
    } else {
      emit<ComponentVariantsHandler>("COMPONENT_VARIANTS", {
        componentKey,
        variantProperties: [],
        error:
          "Selected element is not a component instance, component, or component set",
      });
    }
  });

  // Send initial selection on load
  sendSelection();
}
