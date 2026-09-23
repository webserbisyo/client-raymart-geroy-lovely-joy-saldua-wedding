import { ImageResponse } from "next/og";
import { loadPublicEvent } from "@/app/public-event-loader";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateSocialPreviewImage(): Promise<ImageResponse> {
  await loadPublicEvent();

  const coupleHeadline = "Raymart & Joy";
  const dateText = "Nov 21 2026";
  const venueText = "Taal, Batangas";
  const subtitle = `${dateText} • ${venueText}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#17313D",
          backgroundImage: "radial-gradient(circle at 100% 0%, #204150 0%, #17313D 75%)",
          padding: "48px",
          fontFamily: "serif",
          position: "relative",
          border: "16px solid #17313D",
        }}
      >
        {/* Dual Hairline Champagne Sand & Dusty Blue Accent Borders */}
        <div
          style={{
            position: "absolute",
            inset: "20px",
            top: "20px",
            left: "20px",
            right: "20px",
            bottom: "20px",
            border: "2px solid #D6C3A7",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: "24px",
            top: "24px",
            left: "24px",
            right: "24px",
            bottom: "24px",
            border: "1px solid rgba(116, 152, 171, 0.4)",
            display: "flex",
          }}
        />

        {/* Left Column: Monogram Wax Seal */}
        <div
          style={{
            width: "360px",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "220px",
              height: "220px",
              borderRadius: "50%",
              backgroundColor: "#1b3323",
              border: "4px solid #D4AF37",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
            }}
          >
            <span
              style={{
                fontSize: "68px",
                color: "#D4AF37",
                fontFamily: "serif",
                fontWeight: 700,
                letterSpacing: "3px",
                lineHeight: 1,
              }}
            >
              R &amp; J
            </span>
            <span
              style={{
                fontSize: "12px",
                color: "#E5C158",
                letterSpacing: "4px",
                textTransform: "uppercase",
                marginTop: "8px",
              }}
            >
              Wedding
            </span>
          </div>
        </div>

        {/* Right Column: Editorial Wedding Heading */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: "32px",
          }}
        >
          {/* Eyebrow Label */}
          <span
            style={{
              fontSize: "14px",
              letterSpacing: "6px",
              color: "#7498AB",
              textTransform: "uppercase",
              marginBottom: "16px",
              fontFamily: "sans-serif",
              fontWeight: 600,
            }}
          >
            The Wedding Celebration Of
          </span>

          {/* Couple Display Name */}
          <h1
            style={{
              fontSize: "58px",
              color: "#F8F4EC",
              lineHeight: 1.1,
              margin: "0 0 16px 0",
              fontWeight: "normal",
            }}
          >
            {coupleHeadline}
          </h1>

          {/* Subtitle / Date */}
          <span
            style={{
              fontSize: "18px",
              letterSpacing: "4px",
              color: "#D6C3A7",
              textTransform: "uppercase",
              marginBottom: "28px",
              fontFamily: "sans-serif",
              fontWeight: 600,
            }}
          >
            {subtitle}
          </span>

          {/* Date & Venue Container */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              borderTop: "1px solid rgba(214, 195, 167, 0.4)",
              paddingTop: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "18px", color: "#F8F4EC" }}>📅 {dateText}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "16px", color: "#7498AB" }}>📍 {venueText}</span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
