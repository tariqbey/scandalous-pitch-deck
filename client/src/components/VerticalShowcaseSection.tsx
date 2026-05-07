import { useEffect, useRef, useState } from "react";

const PHONE_VIDEO = "/manus-storage/hf_20260507_063323_bf5dc302-e160-4540-9977-3a05b28bf5a9_efbd086d.mp4";

export default function VerticalShowcaseSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="vertical-showcase" ref={ref} className="resp-section" style={{ background: "#050505", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr)",
          gap: "3rem",
          alignItems: "center",
        }}
          className="vshowcase-grid"
        >
          {/* Left: cover art */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-40px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
            display: "flex",
            justifyContent: "center",
          }}>
            <div style={{ position: "relative", maxWidth: 280, width: "100%" }}>
              {/* Phone frame */}
              <div style={{
                border: "2px solid rgba(212,175,55,0.4)",
                borderRadius: "2rem",
                overflow: "hidden",
                boxShadow: "0 0 80px rgba(212,175,55,0.15), 0 40px 80px rgba(0,0,0,0.8)",
                background: "#000",
                aspectRatio: "9/16",
              }}>
                <video
                  src={PHONE_VIDEO}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
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
            <h2 className="display-heading" style={{ fontSize: "clamp(1.6rem, 5vw, 3rem)", marginBottom: "1.5rem" }}>
              Built for the<br />Scroll Generation
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.82rem, 2vw, 0.9rem)", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
              Every episode is engineered for vertical mobile viewing — 9:16 aspect ratio, 60-second runtime, cold-open hook in the first 5 seconds, and a cliffhanger that makes skipping impossible. This is not television adapted for phones. This is drama born in the feed.
            </p>

            {/* Feature list */}
            {[
              { icon: "📱", label: "9:16 Vertical Format", sub: "Native to TikTok, Reels, YouTube Shorts" },
              { icon: "⏱", label: "60-Second Episodes", sub: "Maximum tension, zero filler" },
              { icon: "🎬", label: "60 Episodes Pre-Written", sub: "Full arc locked, production-ready" },
              { icon: "📍", label: "4 Standing Sets", sub: "Lean production, high output" },
              { icon: "🔥", label: "Cliffhanger Every Episode", sub: "Engineered for binge retention" },
            ].map((item) => (
              <div key={item.label} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1.25rem" }}>
                <span style={{ fontSize: "1.2rem", marginTop: 2, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.8rem, 2vw, 0.85rem)", fontWeight: 600, color: "#fff", marginBottom: "0.15rem" }}>{item.label}</div>
                  <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "clamp(0.7rem, 1.8vw, 0.75rem)", color: "rgba(255,255,255,0.45)" }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive grid: stack on mobile, 2-col on tablet+ */}
      <style>{`
        @media (min-width: 768px) {
          .vshowcase-grid {
            grid-template-columns: minmax(0,1fr) minmax(0,1fr) !important;
            gap: 4rem !important;
          }
        }
      `}</style>
    </section>
  );
}
