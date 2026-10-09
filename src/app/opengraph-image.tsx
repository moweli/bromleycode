import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Bromley Code, the pipeline between your documents and the decision";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// The brand-kit logo, read once at module scope. Satori cannot decode WebP, so
// this is the kit's 960px PNG.
const logoSrc = `data:image/png;base64,${await readFile(
  join(process.cwd(), "public/assets/brand/logo/bromleycode-logo-960.png"),
  "base64",
)}`;

/**
 * Generated rather than designed as a file, so the copy stays in code. A pale
 * ground, because the kit's full-colour logo is made for light surfaces; cobalt
 * and mint washes echo the mark. System fonts only — loading a webfont here
 * costs a request on every social render for no visible gain at this size.
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
          background: "#F2F5FA",
          backgroundImage:
            "radial-gradient(900px 520px at 100% -10%, rgba(56,102,255,0.16), transparent 62%), radial-gradient(700px 480px at -6% 112%, rgba(72,229,194,0.2), transparent 60%)",
          color: "#14213D",
          fontFamily: "sans-serif",
        }}
      >
        {/* 960×219 intrinsic, so 64px tall keeps the ratio. */}
        <img src={logoSrc} width={281} height={64} alt="" />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 62, fontWeight: 700, letterSpacing: -3.1, lineHeight: 1.05, maxWidth: 940 }}>
            The pipeline between your documents and the decision.
          </div>
          <div style={{ fontSize: 26, color: "#4B5568", marginTop: 28, maxWidth: 860 }}>
            Retrieval, extraction, enrichment and evaluation, engineered for enterprise data.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 28,
            fontSize: 20,
            color: "#2444CC",
            letterSpacing: 2,
            textTransform: "uppercase",
          }}
        >
          <div>Data intelligence consultancy</div>
          <div style={{ color: "#9AA3B5" }}>·</div>
          <div style={{ color: "#5B6475" }}>bromleycode.com</div>
        </div>
      </div>
    ),
    size,
  );
}
