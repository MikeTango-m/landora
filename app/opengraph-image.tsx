import { ImageResponse } from "next/og";

export const alt = "Landora — A tua marca merece uma página que vende.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TITLE = "A tua marca merece uma página que vende.";

/** Fetches only the glyphs this image needs, subset by Google Fonts. */
async function loadGoogleFont(family: string, weight: number, text: string) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`,
  ).then((res) => res.text());
  const match = css.match(/src: url\(([^)]+)\) format\('(?:opentype|truetype)'\)/);
  if (!match) throw new Error(`Could not load font: ${family}`);
  return fetch(match[1]).then((res) => res.arrayBuffer());
}

export default async function Image() {
  const [interBold, interSemiBold] = await Promise.all([
    loadGoogleFont("Inter", 800, TITLE),
    loadGoogleFont("Inter", 600, "Landora"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 84px",
          background: "#05070d",
          backgroundImage:
            "radial-gradient(120% 90% at 82% 8%, rgba(37,99,235,0.35) 0%, rgba(5,7,13,0) 58%), radial-gradient(70% 60% at 4% 100%, rgba(56,189,248,0.16) 0%, rgba(5,7,13,0) 60%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              display: "flex",
              width: 20,
              height: 20,
              borderRadius: 5,
              background: "linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)",
            }}
          />
          <span
            style={{
              fontFamily: "Inter",
              fontWeight: 600,
              fontSize: 28,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#ffffff",
            }}
          >
            Landora
          </span>
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "Inter",
            fontWeight: 800,
            fontSize: 64,
            lineHeight: 1.15,
            letterSpacing: -1.5,
            color: "#ffffff",
            maxWidth: 920,
          }}
        >
          {TITLE}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: interBold, weight: 800, style: "normal" },
        { name: "Inter", data: interSemiBold, weight: 600, style: "normal" },
      ],
    },
  );
}
