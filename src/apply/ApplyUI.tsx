import {
  Checkbox,
  Container,
  Divider,
  Muted,
  Text,
  Textbox,
  VerticalSpace,
} from "@create-figma-plugin/ui";
import { emit, on } from "@create-figma-plugin/utilities";
import { h, Fragment } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";

import {
  ApplyPreview,
  VariablePreviewItem,
  FigmaColor,
  CollectionInfo,
  ParseJsonHandler,
  ParseResultHandler,
  ApplyChangesHandler,
  ApplyResultHandler,
  GetCollectionsHandler,
  CollectionsResultHandler,
  NotifyHandler,
} from "../types";

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
  importCard: {
    backgroundColor: "#f5f5f5",
    borderRadius: "6px",
    padding: "12px",
  },
  textarea: {
    width: "100%",
    minHeight: "80px",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontFamily: "monospace",
    fontSize: "11px",
    resize: "vertical" as const,
  },
  metaCard: {
    backgroundColor: "#e8f5e9",
    borderRadius: "6px",
    padding: "12px",
    border: "1px solid #a5d6a7",
  },
  metaTitle: {
    fontSize: "13px",
    fontWeight: 600,
    marginBottom: "4px",
  },
  metaInfo: {
    fontSize: "11px",
    color: "#666",
  },
  errorCard: {
    backgroundColor: "#ffebee",
    borderRadius: "6px",
    padding: "12px",
    border: "1px solid #ef9a9a",
    color: "#c62828",
    fontSize: "12px",
  },
  modeRow: {
    display: "flex",
    gap: "16px",
    alignItems: "center",
  },
  previewList: {
    backgroundColor: "#f5f5f5",
    borderRadius: "6px",
    padding: "8px",
    maxHeight: "250px",
    overflowY: "auto" as const,
  },
  previewItem: {
    padding: "8px",
    backgroundColor: "white",
    borderRadius: "4px",
    marginBottom: "4px",
  },
  previewItemError: {
    padding: "8px",
    backgroundColor: "#fff3e0",
    borderRadius: "4px",
    marginBottom: "4px",
    border: "1px solid #ffcc80",
  },
  previewName: {
    fontSize: "12px",
    fontWeight: 500,
    marginBottom: "4px",
  },
  previewValues: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "11px",
    color: "#666",
  },
  colorSwatch: {
    width: "16px",
    height: "16px",
    borderRadius: "3px",
    border: "1px solid rgba(0,0,0,0.1)",
    display: "inline-block",
  },
  arrow: {
    color: "#999",
  },
  statusIcon: {
    fontSize: "14px",
    marginRight: "4px",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",
    padding: "10px 16px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 500,
    width: "100%",
  },
  primaryButton: {
    backgroundColor: "#18A0FB",
    color: "white",
  },
  secondaryButton: {
    backgroundColor: "#f0f0f0",
    color: "#333",
  },
  successButton: {
    backgroundColor: "#4caf50",
    color: "white",
  },
  disabledButton: {
    backgroundColor: "#e0e0e0",
    color: "#999",
    cursor: "not-allowed",
  },
  buttonRow: {
    display: "flex",
    gap: "8px",
  },
  emptyState: {
    textAlign: "center" as const,
    padding: "32px",
    color: "#999",
  },
  resultCard: {
    backgroundColor: "#e8f5e9",
    borderRadius: "6px",
    padding: "16px",
    border: "1px solid #a5d6a7",
    textAlign: "center" as const,
  },
  resultCardError: {
    backgroundColor: "#fff3e0",
    borderRadius: "6px",
    padding: "16px",
    border: "1px solid #ffcc80",
  },
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function figmaColorToHex(color: FigmaColor): string {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`.toUpperCase();
}

function figmaColorToRgba(color: FigmaColor): string {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  const a = color.a ?? 1;
  if (a < 1) {
    return `rgba(${r},${g},${b},${a.toFixed(2)})`;
  }
  return figmaColorToHex(color);
}

function formatValue(value: FigmaColor | number | null | undefined): string {
  if (value === null || value === undefined) {
    return "alias";
  }
  if (typeof value === "number") {
    return String(value);
  }
  return figmaColorToRgba(value);
}

function isColor(value: FigmaColor | number | null | undefined): value is FigmaColor {
  return typeof value === "object" && value !== null && "r" in value;
}

// =============================================================================
// COMPONENT
// =============================================================================

export function ApplyUI() {
  // JSON input state
  const [jsonInput, setJsonInput] = useState("");
  const [isParsing, setIsParsing] = useState(false);

  // Preview state
  const [preview, setPreview] = useState<ApplyPreview | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);

  // Collections and modes
  const [collections, setCollections] = useState<CollectionInfo[]>([]);
  const [selectedModes, setSelectedModes] = useState<Set<string>>(
    new Set(["Light", "Dark"])
  );

  // Apply state
  const [isApplying, setIsApplying] = useState(false);
  const [applyResult, setApplyResult] =
    useState<{
      success: boolean;
      appliedCount: number;
      errors: string[];
    } | null>(null);

  // Request collections on mount
  useEffect(() => {
    emit<GetCollectionsHandler>("GET_COLLECTIONS");
  }, []);

  // Listen for collections result
  useEffect(() => {
    const unsubscribe = on<CollectionsResultHandler>(
      "COLLECTIONS_RESULT",
      (result) => {
        console.log("[ApplyUI] Received collections:", result);
        setCollections(result);

        // Find theme collection and set its modes as selected by default
        const themeCollection = result.find(
          (c) => c.name.toLowerCase() === "theme"
        );
        if (themeCollection) {
          setSelectedModes(new Set(themeCollection.modes.map((m) => m.name)));
        }
      }
    );
    return unsubscribe;
  }, []);

  // Listen for parse result
  useEffect(() => {
    const unsubscribe = on<ParseResultHandler>("PARSE_RESULT", (result) => {
      console.log("[ApplyUI] Parse result:", result);
      setIsParsing(false);

      if (result.success && result.preview) {
        setPreview(result.preview);
        setParseError(null);
      } else {
        setPreview(null);
        setParseError(result.error || "Failed to parse JSON");
      }
    });
    return unsubscribe;
  }, []);

  // Listen for apply result
  useEffect(() => {
    const unsubscribe = on<ApplyResultHandler>("APPLY_RESULT", (result) => {
      console.log("[ApplyUI] Apply result:", result);
      setIsApplying(false);
      setApplyResult(result);
    });
    return unsubscribe;
  }, []);

  // Handle JSON input change
  const handleJsonChange = useCallback((e: Event) => {
    const value = (e.target as HTMLTextAreaElement).value;
    setJsonInput(value);
    // Reset states when input changes
    setParseError(null);
    setApplyResult(null);
  }, []);

  // Handle parse button click
  const handleParse = useCallback(() => {
    if (!jsonInput.trim()) {
      emit<NotifyHandler>("NOTIFY", "Please paste JSON first");
      return;
    }

    setIsParsing(true);
    setParseError(null);
    setPreview(null);
    setApplyResult(null);
    emit<ParseJsonHandler>("PARSE_JSON", jsonInput);
  }, [jsonInput]);

  // Handle paste from clipboard
  const handlePasteFromClipboard = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setJsonInput(text);
        setParseError(null);
        setApplyResult(null);
        // Auto-parse after paste
        setIsParsing(true);
        emit<ParseJsonHandler>("PARSE_JSON", text);
      }
    } catch (error) {
      emit<NotifyHandler>("NOTIFY", "Failed to read clipboard");
    }
  }, []);

  // Handle mode toggle
  const handleModeToggle = useCallback((modeName: string, checked: boolean) => {
    setSelectedModes((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(modeName);
      } else {
        next.delete(modeName);
      }
      return next;
    });
  }, []);

  // Handle apply button click
  const handleApply = useCallback(() => {
    if (!preview) return;

    const readyItems = preview.items.filter((i) => i.status === "ready");
    if (readyItems.length === 0) {
      emit<NotifyHandler>("NOTIFY", "No valid mappings to apply");
      return;
    }

    setIsApplying(true);
    setApplyResult(null);
    emit<ApplyChangesHandler>("APPLY_CHANGES", {
      modes: Array.from(selectedModes),
      items: readyItems,
    });
  }, [preview, selectedModes]);

  // Handle clear button click
  const handleClear = useCallback(() => {
    setJsonInput("");
    setPreview(null);
    setParseError(null);
    setApplyResult(null);
  }, []);

  // Get unique modes from all collections
  const availableModes = Array.from(
    new Set(collections.flatMap((c) => c.modes.map((m) => m.name)))
  );

  const readyCount = preview?.readyCount ?? 0;

  return (
    <Container space="medium">
      <VerticalSpace space="medium" />

      {/* Import Section */}
      <div style={styles.section}>
        <div style={styles.sectionTitle}>Import Styles</div>

        {!preview && !applyResult && (
          <Fragment>
            <div style={styles.importCard}>
              <textarea
                style={styles.textarea}
                value={jsonInput}
                onInput={handleJsonChange}
                placeholder="Paste exported JSON here..."
              />
              <VerticalSpace space="small" />
              <div style={styles.buttonRow}>
                <button
                  style={{
                    ...styles.button,
                    ...styles.secondaryButton,
                    flex: 1,
                  }}
                  onClick={handlePasteFromClipboard}
                >
                  📋 Paste from Clipboard
                </button>
                <button
                  style={{
                    ...styles.button,
                    ...styles.primaryButton,
                    flex: 1,
                  }}
                  onClick={handleParse}
                  disabled={isParsing || !jsonInput.trim()}
                >
                  {isParsing ? "Parsing..." : "Parse JSON"}
                </button>
              </div>
            </div>

            {parseError && (
              <Fragment>
                <VerticalSpace space="small" />
                <div style={styles.errorCard}>⚠️ {parseError}</div>
              </Fragment>
            )}
          </Fragment>
        )}

        {/* Meta info when preview is loaded */}
        {preview && !applyResult && (
          <div style={styles.metaCard}>
            <div style={styles.metaTitle}>📄 {preview.meta.sourceFileName}</div>
            <div style={styles.metaInfo}>
              {preview.meta.totalMappings} mappings •{" "}
              {new Date(preview.meta.exportedAt).toLocaleDateString()}
            </div>
          </div>
        )}
      </div>

      {/* Mode Selection */}
      {preview && !applyResult && (
        <Fragment>
          <Divider />
          <VerticalSpace space="medium" />

          <div style={styles.section}>
            <div style={styles.sectionTitle}>Apply to Modes</div>
            <div style={styles.modeRow}>
              {availableModes.length > 0 ? (
                availableModes.map((modeName) => (
                  <Checkbox
                    key={modeName}
                    value={selectedModes.has(modeName)}
                    onChange={(e) =>
                      handleModeToggle(
                        modeName,
                        (e.target as HTMLInputElement).checked
                      )
                    }
                  >
                    <Text>{modeName}</Text>
                  </Checkbox>
                ))
              ) : (
                <Text>
                  <Muted>No modes found</Muted>
                </Text>
              )}
            </div>
          </div>

          <Divider />
          <VerticalSpace space="medium" />

          {/* Preview List */}
          <div style={styles.section}>
            <div style={styles.sectionTitle}>
              Preview Changes ({preview.readyCount} ready
              {preview.errorCount > 0 && `, ${preview.errorCount} errors`})
            </div>

            <div style={styles.previewList}>
              {preview.items.map((item, idx) => (
                <div
                  key={idx}
                  style={
                    item.status === "ready"
                      ? styles.previewItem
                      : styles.previewItemError
                  }
                >
                  <div style={styles.previewName}>
                    <span style={styles.statusIcon}>
                      {item.status === "ready" ? "✓" : "⚠"}
                    </span>
                    {item.variableName}
                  </div>
                  <div style={styles.previewValues}>
                    {item.status === "ready" ? (
                      <Fragment>
                        {isColor(item.currentValue) && (
                          <span
                            style={{
                              ...styles.colorSwatch,
                              backgroundColor: figmaColorToHex(item.currentValue),
                            }}
                          />
                        )}
                        <span>{formatValue(item.currentValue)}</span>
                        <span style={styles.arrow}>→</span>
                        {isColor(item.newValue) && (
                          <span
                            style={{
                              ...styles.colorSwatch,
                              backgroundColor: figmaColorToHex(item.newValue),
                            }}
                          />
                        )}
                        <span>{formatValue(item.newValue)}</span>
                      </Fragment>
                    ) : (
                      <span style={{ color: "#e65100" }}>
                        {item.errorMessage}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={styles.buttonRow}>
            <button
              style={{ ...styles.button, ...styles.secondaryButton, flex: 1 }}
              onClick={handleClear}
            >
              Clear
            </button>
            <button
              style={{
                ...styles.button,
                ...(readyCount > 0 && selectedModes.size > 0
                  ? styles.successButton
                  : styles.disabledButton),
                flex: 2,
              }}
              onClick={handleApply}
              disabled={
                readyCount === 0 || selectedModes.size === 0 || isApplying
              }
            >
              {isApplying
                ? "Applying..."
                : `Apply ${readyCount} Change${readyCount !== 1 ? "s" : ""}`}
            </button>
          </div>
        </Fragment>
      )}

      {/* Apply Result */}
      {applyResult && (
        <Fragment>
          <VerticalSpace space="medium" />
          <div
            style={
              applyResult.success ? styles.resultCard : styles.resultCardError
            }
          >
            <div style={{ fontSize: "24px", marginBottom: "8px" }}>
              {applyResult.success ? "✅" : "⚠️"}
            </div>
            <div
              style={{ fontSize: "16px", fontWeight: 600, marginBottom: "4px" }}
            >
              {applyResult.success
                ? "Successfully Applied!"
                : "Applied with Errors"}
            </div>
            <div style={{ fontSize: "13px", color: "#666" }}>
              {applyResult.appliedCount} variable
              {applyResult.appliedCount !== 1 ? "s" : ""} updated
            </div>
            {applyResult.errors.length > 0 && (
              <div
                style={{
                  marginTop: "12px",
                  fontSize: "11px",
                  color: "#e65100",
                  textAlign: "left" as const,
                }}
              >
                <strong>Errors:</strong>
                <ul style={{ margin: "4px 0", paddingLeft: "16px" }}>
                  {applyResult.errors.slice(0, 5).map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                  {applyResult.errors.length > 5 && (
                    <li>...and {applyResult.errors.length - 5} more</li>
                  )}
                </ul>
              </div>
            )}
          </div>
          <VerticalSpace space="medium" />
          <button
            style={{ ...styles.button, ...styles.secondaryButton }}
            onClick={handleClear}
          >
            Import Another
          </button>
        </Fragment>
      )}

      {/* Empty state */}
      {!preview && !parseError && !jsonInput && (
        <div style={styles.emptyState}>
          <div style={{ fontSize: "32px", marginBottom: "12px" }}>📋</div>
          <Text>
            <Muted>
              Paste an exported JSON to apply styles to DS4DS variables
            </Muted>
          </Text>
        </div>
      )}

      <VerticalSpace space="medium" />
    </Container>
  );
}
