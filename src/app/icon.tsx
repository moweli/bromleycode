import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Tab icon, generated rather than shipped as a file so it stays in step with
 * the palette tokens.
 *
 * The wordmark's mark is a document ruled into chunks, resolving to a single
 * accent point. At 32px the outlined box and the three rules turn to mush, so
 * this keeps only the part that survives: three bars, the last one accent and
 * short, on the brand black.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 4,
          padding: "0 6px",
          background: "#000000",
        }}
      >
        <div style={{ width: 20, height: 3.5, background: "#FFFFFF", display: "flex" }} />
        <div style={{ width: 14, height: 3.5, background: "#FFFFFF", display: "flex" }} />
        <div style={{ width: 8, height: 3.5, background: "#E0245A", display: "flex" }} />
      </div>
    ),
    size,
  );
}
