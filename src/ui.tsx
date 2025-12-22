import { render, Tabs, TabsOption } from "@create-figma-plugin/ui";
import { emit, on } from "@create-figma-plugin/utilities";
import { h } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";

import { ExtractUI } from "./extract/ExtractUI";
import { ApplyUI } from "./apply/ApplyUI";
import {
  ExtractionItem,
  FileInfoHandler,
  GetFileInfoHandler,
  PluginMode,
  RequestSelectionHandler,
  SelectionChangedHandler,
  SelectionInfo,
  StyleTransferExport,
} from "./types";

// =============================================================================
// STYLES
// =============================================================================

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    height: "100%",
  },
  tabsWrapper: {
    borderBottom: "1px solid #e5e5e5",
  },
  content: {
    flex: 1,
    overflow: "auto" as const,
  },
};

// =============================================================================
// MAIN PLUGIN COMPONENT
// =============================================================================

function Plugin() {
  // Mode state
  const [mode, setMode] = useState<PluginMode>("extract");

  // Selection state
  const [selection, setSelection] = useState<SelectionInfo | null>(null);

  // Extraction collection state
  const [extractions, setExtractions] = useState<ExtractionItem[]>([]);

  // File info state
  const [fileInfo, setFileInfo] =
    useState<{ fileName: string; fileKey: string } | null>(null);

  // Tab options
  const tabOptions: TabsOption[] = [
    { value: "extract", children: "🎨 Extract" },
    { value: "apply", children: "📋 Apply" },
  ];

  // Handle mode change
  const handleModeChange = useCallback((e: Event) => {
    const value = (e.target as HTMLInputElement).value as PluginMode;
    setMode(value);
  }, []);

  // Listen for selection changes from main
  useEffect(() => {
    const handler = (info: SelectionInfo | null) => {
      setSelection(info);
    };
    on<SelectionChangedHandler>("SELECTION_CHANGED", handler);

    // Request initial selection
    emit<RequestSelectionHandler>("REQUEST_SELECTION");

    // Request file info
    emit<GetFileInfoHandler>("GET_FILE_INFO");
  }, []);

  // Listen for file info
  useEffect(() => {
    const handler = (info: { fileName: string; fileKey: string }) => {
      setFileInfo(info);
    };
    on<FileInfoHandler>("FILE_INFO", handler);
  }, []);

  // Handle add extraction
  const handleAddExtraction = useCallback((item: ExtractionItem) => {
    setExtractions((prev) => [...prev, item]);
  }, []);

  // Handle remove extraction
  const handleRemoveExtraction = useCallback((id: string) => {
    setExtractions((prev) => prev.filter((item) => item.id !== id));
  }, []);

  // Handle export
  const handleExport = useCallback(() => {
    const exportData: StyleTransferExport = {
      meta: {
        version: "1.0.0",
        exportedAt: new Date().toISOString(),
        sourceFileName: fileInfo?.fileName || "Unknown",
        sourceFileKey: fileInfo?.fileKey || "",
      },
      extractions,
      derivedTokens: {},
      variableMappings: extractions.flatMap((ext) =>
        ext.mappings.map((m) => ({
          variableName: m.variableName,
          newValue:
            m.property === "fill"
              ? ext.properties.fills[0]?.color || { r: 0, g: 0, b: 0 }
              : typeof ext.properties.cornerRadius === "number"
              ? ext.properties.cornerRadius
              : 0,
          modes: ["Light", "Dark"],
        }))
      ),
    };

    // Create and download JSON file
    const json = JSON.stringify(exportData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `style-transfer-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [extractions, fileInfo]);

  return (
    <div style={styles.container}>
      <div style={styles.tabsWrapper}>
        <Tabs onChange={handleModeChange} options={tabOptions} value={mode} />
      </div>
      <div style={styles.content}>
        {mode === "extract" ? (
          <ExtractUI
            selection={selection}
            extractions={extractions}
            onAddExtraction={handleAddExtraction}
            onRemoveExtraction={handleRemoveExtraction}
            onExport={handleExport}
          />
        ) : (
          <ApplyUI />
        )}
      </div>
    </div>
  );
}

export default render(Plugin);
