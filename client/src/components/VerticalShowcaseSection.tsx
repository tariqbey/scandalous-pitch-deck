import { useEffect, useRef, useState } from "react";

const COVER_IMG = "https://files.manuscdn.com/user_upload_by_module/session_file/116078281/jLzRjqMxYTFeSpoq.jpg";

export default function VerticalShowcaseSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="vertical-showcase" ref={ref} style={{ background: "#050505", padding: "6rem 1.5rem", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)", gap: "5rem", alignItems: "center" }}>
        {/* Left: cover art */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(-40px)",
          transition: "opacity 0.9s ease, transform 0.9s ease",
          display: "flex",
          justifyContent: "center",
        }}>
          <div style={{ position: "relative", maxWidth: 320 }}>
            {/* Phone frame */}
            <div style={{
              border: "2px solid rgba(212,175,55,0.4)",
              borderRadius: "2rem",
              overflow: "hidden",
              boxShadow: "0 0 80px rgba(212,175,55,0.15), 0 40px 80px rgba(0,0,0,0.8)",
              background: "#000",
            }}>
              <img
                src={COVER_IMG}
                alt="SCANDALOUS Cover Art"
                style={{ width: "100%", display: "block" }}
              />
            </div>
            {/* Glow */}
            <div style={{
              position: "absolute",
              inset: -20,
              background: "radial-gradient(ellipse at center, rgba(212,175,55,0.1), transparent 70%)",
              pointerEvents: "none",
            }} />
          </div>
        </div>

        {/* Right: format details */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(40px)",
          transition: "opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s",
        }}>
          <div className="section-label">Format</div>
          <div className="gold-rule" style={{ maxWidth: 80, margin: "0 0 1.5rem" }} />
          <h2 className="display-heading" style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", marginBottom: "1.5rem" }}>
            Built for the<br />Scroll Generation
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
            Every episode is engineered for vertical mobile viewing — 9:16 aspect ratio, 90-second runtime, cold-open hook in the first 5 seconds, and a cliffhanger that makes skipping impossible. This is not television adapted for phones. This is drama born in the feed.
          </p>

          {/* Feature list */}
          {[
            { icon: "📱", label: "9:16 Vertical Format", sub: "Native to TikTok, Reels, YouTube Shorts" },
            { icon: "⏱", label: "90-Second Episodes", sub: "Maximum tension, zero filler" },
            { icon: "🎬", label: "60 Episodes Pre-Written", sub: "Full arc locked, production-ready" },
            { icon: "📍", label: "4 Standing Sets", sub: "Lean production, high output" },
            { icon: "🔥", label: "Cliffhanger Every Episode", sub: "Engineered for binge retention" },
          ].map((item) => (
            <div key={item.label} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1.25rem" }}>
              <span style={{ fontSize: "1.2rem", marginTop: 2 }}>{item.icon}</span>
              <div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "#fff", marginBottom: "0.15rem" }}>{item.label}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.45)" }}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
