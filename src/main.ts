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

  // Send initial selection on load
  sendSelection();
}
