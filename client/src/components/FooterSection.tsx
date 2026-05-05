const UPSCALE_LOGO = "https://files.manuscdn.com/user_upload_by_module/session_file/116078281/RtaaZtYQelqLcSao.png";

export default function FooterSection() {
  return (
    <footer style={{
      background: "#000",
      borderTop: "1px solid rgba(212,175,55,0.15)",
      padding: "3rem 1.5rem",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Logo centered */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
          <img
            src={UPSCALE_LOGO}
            alt="Upscale Promotions & Entertainment, Inc."
            style={{ height: 80, objectFit: "contain" }}
          />
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.9rem", color: "#D4AF37", letterSpacing: "0.1em", textAlign: "center" }}>
            BLOODLINE LIES
          </div>
        </div>

        {/* Divider */}
        <div className="gold-rule" style={{ maxWidth: 400, margin: "0 auto 2rem" }} />

        {/* Bottom row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.75rem" }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            © 2026 Upscale Promotions & Entertainment, Inc. All rights reserved.
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.08em", textAlign: "center" }}>
            Legal: The Law Office of Omara S. Harris, Esq, LLC · musicandfilmlaw@omaraharris.com · 404-409-7354
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.6rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Written by Malik Davis · Confidential
          </div>
        </div>
      </div>
    </footer>
  );
}
