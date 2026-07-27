import { ImageResponse } from "next/og";
import { posts } from "@/lib/data/blog";

export const runtime = "edge";

export const alt = "Ali Razzaq — Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const recentTitles = [...posts]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 3)
    .map((p) => p.title);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0a0a0c",
          padding: "72px",
          position: "relative",
          color: "#f5f5f7",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            right: "-200px",
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,109,255,0.4) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            fontSize: "24px",
            color: "#c5c5cd",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, #8b6dff 0%, #a892ff 100%)",
              color: "#fff",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            AR
          </div>
          <div style={{ display: "flex" }}>Ali Razzaq</div>
          <div style={{ display: "flex", color: "#4a4a55" }}>·</div>
          <div style={{ display: "flex" }}>alirazzaq.dev/blog</div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "60px",
          }}
        >
          <div
            style={{
              fontSize: "96px",
              fontWeight: 600,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              color: "#f5f5f7",
              display: "flex",
            }}
          >
            Notes from
          </div>
          <div
            style={{
              fontSize: "96px",
              marginTop: "8px",
              color: "#a892ff",
              fontStyle: "italic",
              fontFamily: "Georgia, serif",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              display: "flex",
            }}
          >
            production.
          </div>
        </div>

        {/* Latest posts list */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
            gap: "12px",
            color: "#c5c5cd",
            fontSize: "24px",
          }}
        >
          {recentTitles.map((t, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: "16px",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  color: "#8a8a95",
                  fontFamily: "monospace",
                  fontSize: "18px",
                  width: "40px",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div
                style={{
                  display: "flex",
                  maxWidth: "900px",
                  overflow: "hidden",
                }}
              >
                {t.length > 70 ? t.slice(0, 67) + "…" : t}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
