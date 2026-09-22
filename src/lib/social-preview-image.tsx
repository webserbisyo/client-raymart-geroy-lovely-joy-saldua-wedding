import { ImageResponse } from "next/og";
import { loadPublicEvent } from "@/app/public-event-loader";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateSocialPreviewImage(): Promise<ImageResponse> {
  const result = await loadPublicEvent();
  const event = result.status === "available" ? result.event : undefined;

  // --- Resolve partner names from API data ---
  const rawCouple = event?.raw?.sectionsByKey?.host_info as Record<string, unknown> | undefined;
  let partner1Name =
    typeof rawCouple?.groomName === "string"
      ? rawCouple.groomName
      : typeof rawCouple?.partner1Name === "string"
        ? rawCouple.partner1Name
        : "";
  let partner2Name =
    typeof rawCouple?.brideName === "string"
      ? rawCouple.brideName
      : typeof rawCouple?.partner2Name === "string"
        ? rawCouple.partner2Name
        : "";

  // Fallback: split coupleDisplayName on common delimiters to derive initials
  const coupleDisplay =
    event?.coupleDisplayName ||
    (partner1Name && partner2Name ? `${partner1Name} & ${partner2Name}` : "") ||
    event?.title ||
    "Raymart Geroy ❤️ Lovely Joy";

  if (!partner1Name || !partner2Name) {
    const DELIMITERS = ["❤️", " & ", " and ", " • "];
    for (const delim of DELIMITERS) {
      if (coupleDisplay.includes(delim)) {
        const parts = coupleDisplay.split(delim).map((s: string) => s.trim());
        if (parts[0]) partner1Name = parts[0];
        if (parts[1]) partner2Name = parts[1];
        break;
      }
    }
  }

  // Extract first letters — default to R & L for this client
  const initial1 = (partner1Name.charAt(0) || "R").toUpperCase();
  const initial2 = (partner2Name.charAt(0) || "L").toUpperCase();

  const venueSection = event?.sections?.find(
    (s) => s.key === "venue" || s.key === "main_event" || s.key === "ceremony",
  );
  const vContent = venueSection?.content as Record<string, unknown> | undefined;
  const rawVenue =
    typeof vContent?.venueName === "string"
      ? vContent.venueName
      : typeof vContent?.name === "string"
        ? vContent.name
        : typeof (event?.raw?.venue as Record<string, unknown> | undefined)?.venueName === "string"
          ? ((event?.raw?.venue as Record<string, unknown>).venueName as string)
          : null;

  const date = event?.eventDateLabel || event?.eventDate || "Save The Date";
  const venue = rawVenue?.trim() || "The Grand Pavilion";

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
              width: "240px",
              height: "240px",
              borderRadius: "50%",
              backgroundColor: "#1B2A20",
              border: "4px solid #D4AF37",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
            }}
          >
            {/* Dual-initial monogram: e.g. R & L */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                color: "#FAF7F2",
                fontFamily: "serif",
                fontWeight: 700,
                fontSize: "52px",
                lineHeight: 1,
                letterSpacing: "2px",
              }}
            >
              <span>{initial1}</span>
              <span style={{ fontSize: "36px", color: "#D4AF37", fontWeight: 400 }}>&amp;</span>
              <span>{initial2}</span>
            </div>
            <span
              style={{
                fontSize: "13px",
                color: "#D4AF37",
                letterSpacing: "5px",
                marginTop: "6px",
                fontFamily: "sans-serif",
                fontWeight: 600,
                textTransform: "uppercase",
              }}
            >
              WEDDING
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
            {coupleDisplay}
          </h1>

          {/* Subtitle */}
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
            Wedding Celebration
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
              <span style={{ fontSize: "18px", color: "#F8F4EC" }}>📅 {date}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "16px", color: "#7498AB" }}>📍 {venue}</span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
