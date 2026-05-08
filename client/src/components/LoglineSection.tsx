import { useEffect, useRef, useState } from "react";

const WHY_IT_WORKS = [
  { label: "Two Ticking Bombs", desc: "Renee's bomb: if the truth comes out, Calvin learns she cheated and may have let him raise another man's child. Michael's bomb: if the truth comes out, Tonya learns he cheated and possibly fathered a child outside their marriage." },
  { label: "Mutual Trap", desc: "Renee cannot expose Michael without exposing herself. Michael cannot expose Renee without destroying his own marriage. But if neither tells the truth, their children may be living inside the worst possible lie." },
  { label: "Real-World Source", desc: "Inspired by a viral story with 7M+ documented views across platforms — with zero paid promotion." },
  { label: "Mobile-First Format", desc: "9:16 vertical, 60-second episodes, 60-ep arc — engineered for scroll culture and binge retention." },
];

export default function LoglineSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="logline" ref={ref} style={{ background: "#000", padding: "6rem 1.5rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="section-label">The Hook</div>
        <div className="gold-rule" style={{ maxWidth: 80, margin: "0 0 2rem" }} />

        <blockquote style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(1.2rem, 3vw, 2rem)",
          fontStyle: "italic",
          color: "#fff",
          lineHeight: 1.5,
          borderLeft: "3px solid #D4AF37",
          paddingLeft: "2rem",
          marginBottom: "4rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(-30px)",
          transition: "opacity 0.9s ease, transform 0.9s ease",
        }}>
          Twenty years after Renee and Michael cheated on their spouses and buried a pregnancy without a DNA test, Michael discovers Renee's son is dating his daughter. Now Renee must lead the cover-up to protect her marriage, while Michael pressures her for the truth without exposing his own affair — forcing both former lovers into a dangerous battle where every lie risks destroying two families.
        </blockquote>

        {/* Format specs */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1px",
          background: "rgba(212,175,55,0.15)",
          border: "1px solid rgba(212,175,55,0.15)",
          marginBottom: "4rem",
        }}>
          {[
            { label: "Format", value: "9:16 Vertical" },
            { label: "Episodes", value: "60 LOCKED" },
            { label: "Runtime", value: "60 Seconds" },
            { label: "Locations", value: "4 Standing" },
          ].map((spec) => (
            <div key={spec.label} style={{ background: "#0A0A0A", padding: "1.5rem 2rem" }}>
              <div className="section-label" style={{ marginBottom: "0.5rem" }}>{spec.label}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.85rem", color: "#D4AF37", fontWeight: 700 }}>{spec.value}</div>
            </div>
          ))}
        </div>

        {/* Why it works */}
        <div className="section-label">Why It Works</div>
        <div className="gold-rule" style={{ maxWidth: 80, margin: "0 0 2rem" }} />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "2rem",
        }}>
          {WHY_IT_WORKS.map((item, i) => (
            <div key={item.label} style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: `opacity 0.8s ease ${i * 0.15}s, transform 0.8s ease ${i * 0.15}s`,
            }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "#D4AF37",
                marginBottom: "0.5rem",
              }}>{item.label}</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.75 }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>

        {/* Tagline Options */}
        <div style={{ marginTop: "4rem" }}>
          <div className="section-label">Tagline Options</div>
          <div className="gold-rule" style={{ maxWidth: 80, margin: "0 0 2rem" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              "Two cheaters. Two marriages. One bloodline lie.",
              "They both cheated. Their children paid.",
              "The affair ended. The damage grew up.",
              "Her son. His daughter. Their secret.",
              "One DNA test could destroy two families.",
              "They buried the affair. Their children found it.",
              "Twenty years later, both marriages are on trial.",
            ].map((line, i) => (
              <div key={i} style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: "clamp(1rem, 2.5vw, 1.35rem)",
                color: i === 0 ? "#D4AF37" : "rgba(255,255,255,0.65)",
                borderLeft: `3px solid ${i === 0 ? "#D4AF37" : "rgba(212,175,55,0.25)"}`,
                paddingLeft: "1.5rem",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-20px)",
                transition: `opacity 0.7s ease ${0.1 + i * 0.08}s, transform 0.7s ease ${0.1 + i * 0.08}s`,
              }}>
                "{line}"
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
