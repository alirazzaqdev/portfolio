import { ImageResponse } from "next/og";
import { getPost } from "@/lib/data/blog";

export const runtime = "edge";

export const alt = "Ali Razzaq — Blog Post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  const title = post?.title ?? "Ali Razzaq";
  const category = post?.category ?? "Engineering";
  const readTime = post?.readTime ?? "";
  const date = post
    ? new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

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
        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: "-220px",
            left: "-180px",
            width: "640px",
            height: "640px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,109,255,0.35) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Top: brand */}
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
          <div style={{ display: "flex" }}>alirazzaq.dev</div>
        </div>

        {/* Middle: title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
            marginBottom: "auto",
            maxWidth: "1000px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              fontSize: "18px",
              color: "#a892ff",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            }}
          >
            <div style={{ display: "flex" }}>{category}</div>
            {readTime && (
              <>
                <div style={{ display: "flex", color: "#4a4a55" }}>·</div>
                <div style={{ display: "flex" }}>{readTime}</div>
              </>
            )}
          </div>
          <div
            style={{
              fontSize: title.length > 60 ? "60px" : "72px",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "#f5f5f7",
              marginTop: "28px",
              display: "flex",
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom: meta */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "22px",
            color: "#8a8a95",
          }}
        >
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#5cd9a4",
                display: "flex",
              }}
            />
            <div style={{ display: "flex" }}>Notes from production</div>
          </div>
          {date && <div style={{ display: "flex" }}>{date}</div>}
        </div>
      </div>
    ),
    { ...size },
  );
}
