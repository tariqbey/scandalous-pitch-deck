const UPSCALE_LOGO = "https://files.manuscdn.com/user_upload_by_module/session_file/116078281/RtaaZtYQelqLcSao.png";

export default function FooterSection() {
  return (
    <footer style={{
      background: "#000",
      borderTop: "1px solid rgba(212,175,55,0.15)",
      padding: "3rem 1.25rem",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Logo centered */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
          <img
            src={UPSCALE_LOGO}
            alt="Upscale Promotions & Entertainment, Inc."
            style={{ height: 70, objectFit: "contain", maxWidth: "80vw" }}
          />
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(0.75rem, 2.5vw, 0.9rem)",
            color: "#D4AF37",
            letterSpacing: "0.1em",
            textAlign: "center",
          }}>
            SCANDALOUS: BLOODLINE LIES
          </div>
        </div>

        {/* Divider */}
        <div className="gold-rule" style={{ maxWidth: 400, margin: "0 auto 2rem" }} />

        {/* Bottom rows — stacked on mobile */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.6rem",
          textAlign: "center",
        }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.5rem, 1.5vw, 0.6rem)", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            © 2026 Upscale Promotions &amp; Entertainment, Inc. All rights reserved.
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.5rem, 1.5vw, 0.6rem)", color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em" }}>
            Legal: The Law Office of Omara S. Harris, Esq, LLC · musicandfilmlaw@omaraharris.com · 404-409-7354
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.5rem, 1.5vw, 0.6rem)", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Written by Del Rivers · Confidential
          </div>
        </div>
      </div>
    </footer>
  );
}
