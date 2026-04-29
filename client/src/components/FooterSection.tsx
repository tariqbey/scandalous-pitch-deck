export default function FooterSection() {
  return (
    <footer style={{
      background: "#000",
      borderTop: "1px solid rgba(212,175,55,0.15)",
      padding: "3rem 1.5rem",
      textAlign: "center",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", color: "#D4AF37", letterSpacing: "0.1em" }}>
            SCANDALOUS: BLOODLINE BETRAYAL
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em" }}>
            © 2025 UPSCALE PROMOTIONS & ENTERTAINMENT, INC. · ALL RIGHTS RESERVED · CONFIDENTIAL
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em" }}>
            WRITTEN BY MALIK DAVIS
          </div>
        </div>
      </div>
    </footer>
  );
}
