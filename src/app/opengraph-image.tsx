import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Ali Razzaq — Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0a0a0c",
          padding: "80px",
          position: "relative",
          color: "#f5f5f7",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Soft accent glow */}
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

        {/* Top: Status pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            color: "#8a8a95",
            fontSize: "22px",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#5cd9a4",
              display: "flex",
            }}
          />
          <div style={{ display: "flex" }}>Available for new projects</div>
        </div>

        {/* Middle: Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
            marginBottom: "auto",
          }}
        >
          <div
            style={{
              fontSize: "108px",
              fontWeight: 600,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              color: "#f5f5f7",
              display: "flex",
            }}
          >
            Ali Razzaq
          </div>
          <div
            style={{
              fontSize: "60px",
              marginTop: "20px",
              color: "#c5c5cd",
              letterSpacing: "-0.02em",
              display: "flex",
            }}
          >
            Full-Stack Developer
          </div>
          <div
            style={{
              fontSize: "32px",
              marginTop: "30px",
              color: "#a892ff",
              fontStyle: "italic",
              fontFamily: "Georgia, serif",
              display: "flex",
            }}
          >
            I build thoughtful software for the web.
          </div>
        </div>

        {/* Bottom: Tech + location */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "#8a8a95",
            fontSize: "22px",
          }}
        >
          <div style={{ display: "flex", gap: "20px" }}>
            <div style={{ display: "flex" }}>Python</div>
            <div style={{ display: "flex", color: "#4a4a55" }}>·</div>
            <div style={{ display: "flex" }}>Java</div>
            <div style={{ display: "flex", color: "#4a4a55" }}>·</div>
            <div style={{ display: "flex" }}>JavaScript</div>
            <div style={{ display: "flex", color: "#4a4a55" }}>·</div>
            <div style={{ display: "flex" }}>AWS</div>
            <div style={{ display: "flex", color: "#4a4a55" }}>·</div>
            <div style={{ display: "flex" }}>AI</div>
          </div>
          <div style={{ display: "flex" }}>Lahore, Pakistan</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
