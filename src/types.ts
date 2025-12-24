import { EventHandler } from "@create-figma-plugin/utilities";

// =============================================================================
// PLUGIN MODES
// =============================================================================

export type PluginMode = "extract" | "apply";

// =============================================================================
// SELECTION & EXTRACTION
// =============================================================================

export interface FigmaColor {
  r: number;
  g: number;
  b: number;
  a?: number;
}

export interface ExtractedFill {
  type: "SOLID" | "GRADIENT" | "OTHER";
  color?: FigmaColor;
  hex?: string;
  opacity?: number;
}

export interface ExtractedStroke {
  color: FigmaColor;
  hex: string;
  weight: number;
}

export interface SelectionInfo {
  id: string;
  name: string;
  type: string;
  width: number;
  height: number;
  fills: ExtractedFill[];
  strokes: ExtractedStroke[];
  cornerRadius: number | "mixed" | null;
  cornerRadii?: {
    topLeft: number;
    topRight: number;
    bottomRight: number;
    bottomLeft: number;
  };
}

// =============================================================================
// VARIABLE MAPPING
// =============================================================================

export interface VariableMapping {
  property: "fill" | "stroke" | "radius" | "strokeWeight";
  extractedValue: string | number;
  variableName: string;
}

// =============================================================================
// EXTRACTION COLLECTION
// =============================================================================

export interface ExtractionItem {
  id: string;
  timestamp: number;
  sourceNode: {
    id: string;
    name: string;
  };
  dsComponent: {
    category: string;
    name: string;
    key: string;
    variants?: Record<string, string>;
  };
  properties: {
    fills: ExtractedFill[];
    strokes: ExtractedStroke[];
    cornerRadius: number | "mixed" | null;
  };
  mappings: VariableMapping[];
}

// =============================================================================
// JSON EXPORT FORMAT
// =============================================================================

export interface StyleTransferExport {
  meta: {
    version: string;
    exportedAt: string;
    sourceFileName: string;
    sourceFileKey: string;
  };
  extractions: ExtractionItem[];
  derivedTokens: {
    primaryColor?: {
      base: string;
      alpha: Record<string, string>;
    };
  };
  variableMappings: Array<{
    variableName: string;
    newValue: FigmaColor | number;
    modes: string[];
    derived?: boolean;
  }>;
}

// =============================================================================
// EVENT HANDLERS - Main ↔ UI Communication
// =============================================================================

export interface SelectionChangedHandler extends EventHandler {
  name: "SELECTION_CHANGED";
  handler: (selection: SelectionInfo | null) => void;
}

export interface RequestSelectionHandler extends EventHandler {
  name: "REQUEST_SELECTION";
  handler: () => void;
}

export interface ExportJsonHandler extends EventHandler {
  name: "EXPORT_JSON";
  handler: (data: StyleTransferExport) => void;
}

export interface ApplyMappingsHandler extends EventHandler {
  name: "APPLY_MAPPINGS";
  handler: (mappings: StyleTransferExport["variableMappings"]) => void;
}

export interface ApplyCompleteHandler extends EventHandler {
  name: "APPLY_COMPLETE";
  handler: (result: {
    success: boolean;
    appliedCount: number;
    errors: string[];
  }) => void;
}

export interface CloseHandler extends EventHandler {
  name: "CLOSE";
  handler: () => void;
}

export interface NotifyHandler extends EventHandler {
  name: "NOTIFY";
  handler: (message: string) => void;
}

export interface GetFileInfoHandler extends EventHandler {
  name: "GET_FILE_INFO";
  handler: () => void;
}

export interface FileInfoHandler extends EventHandler {
  name: "FILE_INFO";
  handler: (info: { fileName: string; fileKey: string }) => void;
}

// =============================================================================
// COMPONENT VARIANTS
// =============================================================================

export interface ComponentVariantProperty {
  name: string;
  type: "VARIANT" | "BOOLEAN" | "INSTANCE_SWAP" | "TEXT";
  variantOptions?: string[];
  defaultValue?: string | boolean;
}

export interface ComponentVariantsResult {
  componentKey: string;
  componentSetName?: string;
  variantProperties: ComponentVariantProperty[];
  error?: string;
}

export interface GetComponentVariantsHandler extends EventHandler {
  name: "GET_COMPONENT_VARIANTS";
  handler: (componentKey: string) => void;
}

export interface GetSelectionVariantsHandler extends EventHandler {
  name: "GET_SELECTION_VARIANTS";
  handler: () => void;
}

export interface ComponentVariantsHandler extends EventHandler {
  name: "COMPONENT_VARIANTS";
  handler: (result: ComponentVariantsResult) => void;
}

// =============================================================================
// APPLY MODE
// =============================================================================

export interface VariablePreviewItem {
  variableName: string;
  variableId?: string;
  collection?: string;
  currentValue?: FigmaColor | number | null;
  newValue: FigmaColor | number;
  status: "ready" | "not-found" | "type-mismatch";
  errorMessage?: string;
}

export interface ApplyPreview {
  meta: {
    sourceFileName: string;
    exportedAt: string;
    totalMappings: number;
  };
  items: VariablePreviewItem[];
  readyCount: number;
  errorCount: number;
}

export interface CollectionInfo {
  id: string;
  name: string;
  modes: { name: string; modeId: string }[];
}

export interface ParseJsonHandler extends EventHandler {
  name: "PARSE_JSON";
  handler: (jsonString: string) => void;
}

export interface ParseResultHandler extends EventHandler {
  name: "PARSE_RESULT";
  handler: (result: {
    success: boolean;
    preview?: ApplyPreview;
    error?: string;
  }) => void;
}

export interface ApplyChangesHandler extends EventHandler {
  name: "APPLY_CHANGES";
  handler: (options: { modes: string[]; items: VariablePreviewItem[] }) => void;
}

export interface ApplyResultHandler extends EventHandler {
  name: "APPLY_RESULT";
  handler: (result: {
    success: boolean;
    appliedCount: number;
    errors: string[];
  }) => void;
}

export interface GetCollectionsHandler extends EventHandler {
  name: "GET_COLLECTIONS";
  handler: () => void;
}

export interface CollectionsResultHandler extends EventHandler {
  name: "COLLECTIONS_RESULT";
  handler: (collections: CollectionInfo[]) => void;
}
