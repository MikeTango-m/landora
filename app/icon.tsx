import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          borderRadius: 7,
          background: "linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)",
        }}
      />
    ),
    { ...size },
  );
}
