import { ImageResponse } from "next/og";

export const alt = "Bromely Code — the pipeline between your documents and the decision";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated rather than designed as a file, so it stays in sync with the
 * wordmark and the palette. System fonts only — loading a webfont here costs a
 * request on every social render for no visible gain at this size.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#080C12",
          backgroundImage:
            "radial-gradient(900px 500px at 8% -10%, rgba(245,165,36,0.16), transparent 60%), radial-gradient(700px 500px at 95% 10%, rgba(66,122,168,0.20), transparent 62%)",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 40,
              height: 40,
              border: "3px solid #FFFFFF",
              borderRadius: 4,
              display: "flex",
            }}
          />
          <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: -1 }}>Bromely Code</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 62, fontWeight: 700, letterSpacing: -2.6, lineHeight: 1.05, maxWidth: 940 }}>
            The pipeline between your documents and the decision.
          </div>
          <div style={{ fontSize: 26, color: "#A9B6C4", marginTop: 28, maxWidth: 860 }}>
            Retrieval, extraction, enrichment and evaluation — engineered for enterprise data.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 28,
            fontSize: 20,
            color: "#F5A524",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <div>Data intelligence consultancy</div>
          <div style={{ color: "#4A5866" }}>·</div>
          <div style={{ color: "#7C8B9C" }}>bromelycode.com</div>
        </div>
      </div>
    ),
    size,
  );
}
