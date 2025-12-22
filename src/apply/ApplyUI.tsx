import { Container, Muted, Text, VerticalSpace } from "@create-figma-plugin/ui";
import { h } from "preact";

// =============================================================================
// STYLES
// =============================================================================

const styles = {
  placeholder: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    height: "300px",
    textAlign: "center" as const,
  },
  icon: {
    fontSize: "48px",
    marginBottom: "16px",
  },
};

// =============================================================================
// COMPONENT
// =============================================================================

export function ApplyUI() {
  return (
    <Container space="medium">
      <VerticalSpace space="extraLarge" />
      <div style={styles.placeholder}>
        <div style={styles.icon}>📋</div>
        <Text>
          <Muted>Apply Mode</Muted>
        </Text>
        <VerticalSpace space="small" />
        <Text>
          <Muted>Import a JSON file to apply styles to DS4DS variables.</Muted>
        </Text>
        <VerticalSpace space="medium" />
        <Text>
          <Muted>(Coming in Phase 4)</Muted>
        </Text>
      </div>
    </Container>
  );
}
