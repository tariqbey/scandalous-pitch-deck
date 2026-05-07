import { useEffect, useRef, useState } from "react";

const WHY_IT_WORKS = [
  { label: "Invisible Danger", desc: "The audience sees Michael panic. The kids do not. Renee does not know why he is calling. The danger stretches instead of exploding too soon." },
  { label: "Six-Person War", desc: "Two marriages, one buried pregnancy, one DNA test. Every character has something to lose — and the truth destroys all of them differently." },
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
          When Michael's daughter brings home her boyfriend, Michael silently recognizes the boy's mother as Renee — the married woman who got pregnant during their affair 20 years ago and refused a DNA test. Now Michael must force Renee to face the truth before their children's relationship goes too far, while both of them fight to keep their spouses from discovering the secret that could destroy two families.
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
      </div>
    </section>
  );
}
