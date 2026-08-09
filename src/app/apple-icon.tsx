import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/**
 * Home-screen icon. iOS rounds and shadows this itself, so it ships square and
 * full-bleed. At 180px the full mark has room, including the outlined box the
 * 32px tab icon has to drop.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
        }}
      >
        <div
          style={{
            width: 108,
            height: 108,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 13,
            padding: 20,
            border: "5px solid #FFFFFF",
            borderRadius: 12,
          }}
        >
          <div style={{ width: 62, height: 9, background: "#FFFFFF", display: "flex" }} />
          <div style={{ width: 44, height: 9, background: "#FFFFFF", display: "flex" }} />
          <div style={{ width: 26, height: 9, background: "#E0245A", display: "flex" }} />
        </div>
      </div>
    ),
    size,
  );
}
